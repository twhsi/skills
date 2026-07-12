const INDEX_WEIGHTS = new Set(["I1", "I2", "I3", "I4"]);
const INDEX_TYPES = new Set(["C", "M", "P", "B", "T", "O", "E", "L", "S", "A", "X"]);
const ROOT_ARRAY_KEYS = ["items", "records", "rows"];

function textValue(...values) {
  for (const value of values) {
    if (value === null || value === undefined) continue;
    const text = String(value).trim();
    if (text) return text;
  }
  return "";
}

function listValue(value, kind) {
  const source = Array.isArray(value) ? value.flat(Infinity) : [value];
  const splitter = kind === "route" ? /\s*(?:\||→|->|\n|;)\s*/ : /\s*(?:\||\n|;)\s*/;
  const seen = new Set();
  const result = [];

  for (const entry of source) {
    if (entry === null || entry === undefined) continue;
    for (const part of String(entry).split(splitter)) {
      const clean = part.trim();
      const key = clean.toLocaleLowerCase();
      if (!clean || seen.has(key)) continue;
      seen.add(key);
      result.push(clean);
    }
  }

  return result;
}

function pageReference(value) {
  if (!value) return "";
  if (value.includes("[[") || value.includes("]]")) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
  return `[[${value}]]`;
}

function noteBlocks(note) {
  return textValue(note)
    .split(/\r?\n\s*\r?\n|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((string) => ({ string }));
}

function bookCode(bookAddress, explicitCode) {
  if (explicitCode) return explicitCode;
  const segments = bookAddress.split("/").map((segment) => segment.trim()).filter(Boolean);
  return segments.at(-1) || bookAddress;
}

function pageTitle(record, code, keyword) {
  const explicit = textValue(record.roamTitle, record.RoamTitle);
  if (explicit) return explicit;

  const label = textValue(record.title, record["標題"], keyword);
  if (!code) return label;
  if (label === code || label.startsWith(`${code} `)) return label;
  return `${code} ${label}`;
}

export function extractBirdRecords(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") {
    throw new Error("BIRD JSON must be an object, an array, or an object containing items, records, or rows.");
  }

  for (const key of ROOT_ARRAY_KEYS) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  return [payload];
}

export function parseBirdJson(source) {
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
}

export function normalizeBirdRecord(record, position = 0) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(`Record ${position + 1} must be a JSON object.`);
  }

  const index = record.index && typeof record.index === "object" && !Array.isArray(record.index)
    ? record.index
    : {};
  const bookAddress = textValue(record.bookAddress, record.B_BookAddress, record.BookAddress);
  const weight = textValue(index.weight, record.I_Weight).toUpperCase();
  const typeCode = textValue(index.typeCode, record.I_TypeCode).toUpperCase();
  const type = textValue(index.type, record.I_Type);
  const keyword = textValue(index.keyword, record.I_Keyword, record.keyword);
  const aliases = listValue(index.aliases ?? record.I_Alias, "alias");
  const route = listValue(record.route ?? record.R_Route, "route");
  const deepLink = textValue(record.deepLink, record.D_DeepLink);
  const structuralType = textValue(record.structuralType, record.StructuralType);
  const tag = textValue(record.tag, record.Tag);
  const semanticRole = textValue(record.semanticRole, record.I_Role, record.SemanticRole);
  const note = textValue(record.note, record.Note, record["Note正文"]);

  if (!bookAddress) throw new Error(`Record ${position + 1} is missing bookAddress / B_BookAddress.`);
  if (!INDEX_WEIGHTS.has(weight)) throw new Error(`Record ${position + 1} has invalid Index Weight: ${weight || "blank"}.`);
  if (!INDEX_TYPES.has(typeCode)) throw new Error(`Record ${position + 1} has invalid Index Type code: ${typeCode || "blank"}.`);
  if (!keyword) throw new Error(`Record ${position + 1} is missing index.keyword / I_Keyword.`);
  if (deepLink && !/^[a-z][a-z0-9+.-]*:/i.test(deepLink)) {
    throw new Error(`Record ${position + 1} has a Deep Link without a valid URI scheme.`);
  }

  const code = bookCode(bookAddress, textValue(record.bookCode, record.BookCode));

  return {
    version: textValue(record.version, record["版本"], "BIRD-2.0"),
    bookAddress,
    bookCode: code,
    title: pageTitle(record, code, keyword),
    index: { weight, typeCode, type, keyword, aliases },
    route,
    deepLink,
    structuralType,
    tag,
    semanticRole,
    note
  };
}

export function birdRecordToRoamPage(record, position = 0) {
  const bird = normalizeBirdRecord(record, position);
  const typeLabel = bird.index.type ? `${bird.index.typeCode} · ${bird.index.type}` : bird.index.typeCode;
  const children = [
    { string: bird.version, heading: 2 },
    { string: `B:: ${bird.bookAddress}` },
    { string: `I:: ${bird.index.weight} | ${typeLabel} | ${pageReference(bird.index.keyword)}` }
  ];

  if (bird.index.aliases.length) {
    children.push({ string: `A:: ${bird.index.aliases.map(pageReference).join(" | ")}` });
  }
  if (bird.route.length) {
    children.push({ string: `R:: ${bird.route.map(pageReference).join(" → ")}` });
  }
  if (bird.deepLink) children.push({ string: `D:: ${bird.deepLink}` });
  if (bird.structuralType) children.push({ string: `Structural Type:: ${bird.structuralType}` });
  if (bird.tag) children.push({ string: `Workflow Status:: ${bird.tag}` });
  if (bird.semanticRole) children.push({ string: `Semantic Role:: ${bird.semanticRole}` });

  const manuscript = noteBlocks(bird.note);
  if (manuscript.length) {
    children.push({ string: "Manuscript Note", heading: 2, children: manuscript });
  }

  return { title: bird.title, children };
}

function validateBlock(block, path) {
  if (!block || typeof block !== "object" || Array.isArray(block)) {
    throw new Error(`${path} must be a block object.`);
  }
  if (typeof block.string !== "string" || !block.string.trim()) {
    throw new Error(`${path}.string is required.`);
  }
  if ("uid" in block) throw new Error(`${path} contains a uid; BIRD exports omit UIDs by default.`);
  if (block.children !== undefined) {
    if (!Array.isArray(block.children)) throw new Error(`${path}.children must be an array.`);
    block.children.forEach((child, index) => validateBlock(child, `${path}.children[${index}]`));
  }
}

export function validateRoamPages(pages) {
  if (!Array.isArray(pages)) throw new Error("Roam import JSON must be an array of pages.");
  pages.forEach((page, pageIndex) => {
    if (!page || typeof page !== "object" || Array.isArray(page)) {
      throw new Error(`Page ${pageIndex + 1} must be an object.`);
    }
    if (typeof page.title !== "string" || !page.title.trim()) {
      throw new Error(`Page ${pageIndex + 1} is missing title.`);
    }
    if (!Array.isArray(page.children)) throw new Error(`Page ${pageIndex + 1}.children must be an array.`);
    page.children.forEach((block, blockIndex) => validateBlock(block, `pages[${pageIndex}].children[${blockIndex}]`));
  });
  return pages;
}

export function birdToRoamPages(payload) {
  const records = extractBirdRecords(payload);
  if (!records.length) throw new Error("BIRD JSON contains no records.");

  const pages = records.map((record, index) => birdRecordToRoamPage(record, index));
  const titles = new Map();
  pages.forEach((page, index) => {
    const key = page.title.toLocaleLowerCase();
    if (titles.has(key)) {
      throw new Error(`Duplicate Roam page title at records ${titles.get(key) + 1} and ${index + 1}: ${page.title}`);
    }
    titles.set(key, index);
  });

  return validateRoamPages(pages);
}
