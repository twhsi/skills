import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "site");
const distDir = path.join(root, "dist");
const skillsDir = path.join(root, "skills");
const repoUrl = "https://github.com/twhsi/skills";
const generatedAt = new Date().toISOString();

const axisRules = [
  {
    id: "time",
    label: "Time",
    route: "/time",
    summary: "Daily focus, weekly review, planning rhythm, calendar and long-range training loops.",
    match: ["weekly-reverse-review", "todays-daily-plan", "imandalart", "personal-athlete-81-grid", "fantastical-calendar"]
  },
  {
    id: "cards",
    label: "Cards",
    route: "/cards",
    summary: "FIRE analysis, BIRD book addresses, nine-grid cards, Markdown tables, keyword graphs and graph views.",
    match: ["weekly-reverse-review", "fire-analysis-card", "thebrain-bird-address", "imandalart", "markdown-nine-grid-clipboard", "keyword-graph-view", "obsidian-graph-view"]
  },
  {
    id: "llm",
    label: "LLM",
    route: "/llm",
    summary: "Repeatable skills, structured inputs, scripts and metadata for mainstream LLM agents.",
    match: ["project-note-json-to-epub", "epub-hypercard-obsidian", "eight-page-booklet"]
  },
  {
    id: "desktop",
    label: "Desktop",
    route: "/desktop",
    summary: "Mac desktop bridges, calendar actions, clipboard outputs and local workflows.",
    match: ["fantastical-calendar", "markdown-nine-grid-clipboard"]
  },
  {
    id: "publish",
    label: "Publish",
    route: "/publish",
    summary: "BIRD manuscript scaffolds, booklets, EPUBs, HyperCard returns and public GitHub publishing paths.",
    match: ["thebrain-bird-address", "project-note-json-to-epub", "epub-hypercard-obsidian", "eight-page-booklet"]
  }
];

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---")) return {};
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return {};
  const block = markdown.slice(3, end).trim();
  const data = {};

  for (const line of block.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, raw] = match;
    data[key] = raw.replace(/^["']|["']$/g, "").trim();
  }

  return data;
}

function sentence(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function listSkills() {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const slug = entry.name;
    const skillPath = path.join(skillsDir, slug, "SKILL.md");
    if (!existsSync(skillPath)) continue;

    const markdown = await readFile(skillPath, "utf8");
    const frontmatter = parseFrontmatter(markdown);
    const dir = path.join("skills", slug);
    const gitInfo = skillGitInfo(dir);
    const files = await readdir(path.join(skillsDir, slug), { withFileTypes: true });
    const resources = files
      .filter((file) => file.isDirectory() && ["agents", "assets", "references", "scripts"].includes(file.name))
      .map((file) => file.name)
      .sort();

    const axes = axisRules
      .filter((axis) => axis.match.includes(slug))
      .map((axis) => axis.id);

    skills.push({
      slug,
      name: frontmatter.name || slug,
      description: sentence(frontmatter.description || ""),
      version: extractVersion(markdown, frontmatter),
      ...gitInfo,
      axes: axes.length ? axes : ["llm"],
      repo_path: dir,
      skill_file: `${dir}/SKILL.md`,
      github_url: `${repoUrl}/tree/main/${dir}`,
      install_command: `cp -R ${dir} ~/.codex/skills/`,
      resources
    });
  }

  return skills.sort((a, b) => a.slug.localeCompare(b.slug));
}

function gitRevision() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 12);
  try {
    return execSync("git rev-parse --short=12 HEAD", { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "unknown";
  }
}

function skillGitInfo(relativeDir) {
  try {
    const output = execSync(`git log -1 --format=%h%x09%H%x09%cI -- ${relativeDir}`, {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();

    const [revisionShort, revision, updatedAt] = output.split("\t");
    return {
      revision: revision || "unknown",
      revision_short: revisionShort || "unknown",
      updated_at: updatedAt || null
    };
  } catch {
    return {
      revision: "unknown",
      revision_short: "unknown",
      updated_at: null
    };
  }
}

function extractVersion(markdown, frontmatter) {
  if (frontmatter.version) return frontmatter.version.replace(/^v/i, "");

  const patterns = [
    /Current version:\s*`?v?([0-9]+(?:\.[0-9]+){0,2})`?/i,
    /^# .*\b(?:v|version\s*)?([0-9]+(?:\.[0-9]+){1,2})\b/im,
    /\b(?:skill\s+version|version)\s*[:：]\s*`?v?([0-9]+(?:\.[0-9]+){1,2})`?/i
  ];

  for (const pattern of patterns) {
    const match = markdown.match(pattern);
    if (match) return match[1];
  }

  return "Unversioned";
}

function createAgentManifest(skills) {
  return {
    id: "twhsi/skills",
    name: "AI Agent Skills for Chinese Knowledge Workers",
    tagline: "iMandalArt, FIRE, planning, and publishing workflows for mainstream LLM agents",
    north_star: "Package Chinese-first knowledge workflows so LLM agents can handle repeatable structure while humans keep judgment, taste, and pace.",
    audience_split: {
      agent: 0.8,
      human: 0.2
    },
    repository: repoUrl,
    revision: gitRevision(),
    generated_at: generatedAt,
    license: "MIT",
    endpoints: {
      agent_manifest: "/agent.json",
      skills_index: "/skills.json",
      llm_context: "/llms.txt",
      human_home: "/",
      install_guide: "/install"
    },
    axes: axisRules.map(({ match, ...axis }) => ({
      ...axis,
      skills: skills.filter((skill) => match.includes(skill.slug)).map((skill) => skill.slug)
    })),
    skills: skills.map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      axes: skill.axes,
      description: skill.description,
      version: skill.version,
      updated_at: skill.updated_at,
      revision: skill.revision,
      revision_short: skill.revision_short,
      skill_file: skill.skill_file,
      github_url: skill.github_url,
      install_command: skill.install_command,
      resources: skill.resources
    })),
    agent_contract: {
      preferred_entry: "/agent.json",
      use_skills_json_for: "route selection, install commands, metadata, and resource discovery",
      use_llms_txt_for: "short context before browsing the full repository",
      human_review_rule: "Escalate ambiguous judgment, taste, priority, or publishing decisions to the human 20%."
    }
  };
}

function createSkillsIndex(skills) {
  return {
    registry: "twhsi/skills",
    repository: repoUrl,
    generated_at: generatedAt,
    count: skills.length,
    axes: axisRules.map(({ match, ...axis }) => ({
      ...axis,
      skills: skills.filter((skill) => match.includes(skill.slug)).map((skill) => skill.slug)
    })),
    skills
  };
}

function createLlmsText(manifest, skillsIndex) {
  const skillLines = skillsIndex.skills
    .map(
      (skill) =>
        `- ${skill.slug}: version ${skill.version}; updated ${skill.updated_at || "unknown"}; revision ${skill.revision_short}. ${skill.description} GitHub: ${skill.github_url}`
    )
    .join("\n");

  const axisLines = manifest.axes
    .map((axis) => `- ${axis.label} (${axis.route}): ${axis.summary} Skills: ${axis.skills.join(", ")}`)
    .join("\n");

  return `# AI Agent Skills for Chinese Knowledge Workers

This is Yunghsi's public agent-skill system for Chinese knowledge workers: Weekly Reverse Review, iMandalArt, FIRE semantic analysis, daily planning, Markdown, EPUB, and booklet workflows for Claude Code, Codex, ChatGPT, Gemini, Hermes, and other LLM agents.

North Star: ${manifest.north_star}
Split: 80% machine-readable LLM endpoints, 20% human-readable map.

## LLM endpoints

- /agent.json: canonical LLM and agent manifest.
- /skills.json: generated skill index from skills/*/SKILL.md frontmatter.
- /llms.txt: compact context for LLMs.
- /install: human and LLM install/deploy guide.

## Featured skills

Weekly Reverse Review turns annual plans, hundred-year life plans, last weekly reviews, seven-day diaries, calendars, and inbox notes into one happiness-and-peace-centered 8 Big Rocks weekly plan. Its center question is: Which action brings real happiness and peace?

iMandalArt 2.01 is the flagship CJK-friendly hard-line 3x3 thinking card format. It uses eight orthogonal angles labeled Ⓐ-Ⓗ, a double ◎◎◎◎◎ center axis, and exactly 11 physical text lines so the card survives chat previews, note apps, and clipboard workflows. An English-native version is planned.

## Copyable demo

Input: annual plan, hundred-year life plan, weekly review, seven-day diaries, calendar, inbox notes, manuscript notes, or Markdown drafts.
Skills: weekly-reverse-review + imandalart + fire-analysis-card + project-note-json-to-epub.
Output: 8 Big Rocks weekly plan + FIRE JSON + iMandalArt 2.01 card + Markdown / EPUB / booklet path.

## Routes

${axisLines}

## Skills

${skillLines}

## Human review rule

LLM agents should handle collection, parsing, indexing, conversion, validation and deployment preparation. Human should review taste, priority, publishing, deletion, overwrites and ambiguous judgment calls.
`;
}

async function copySite() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await cp(sourceDir, distDir, { recursive: true });

  const publicAssetDir = path.join(distDir, "assets");
  await mkdir(publicAssetDir, { recursive: true });

  const mapSource = path.join(root, "assets", "hermes-all-skills-map.png");
  if (existsSync(mapSource)) {
    await cp(mapSource, path.join(publicAssetDir, "hermes-all-skills-map.png"));
  }
}

async function ensureDistIsReadable() {
  const files = ["index.html", "agent.json", "skills.json", "llms.txt", "install/index.html"];
  for (const file of files) {
    const target = path.join(distDir, file);
    const info = await stat(target);
    if (!info.isFile()) throw new Error(`Missing build artifact: ${file}`);
  }
}

const skills = await listSkills();
const manifest = createAgentManifest(skills);
const skillsIndex = createSkillsIndex(skills);

await copySite();
await writeFile(path.join(distDir, "agent.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(path.join(distDir, "skills.json"), `${JSON.stringify(skillsIndex, null, 2)}\n`);
await writeFile(path.join(distDir, "llms.txt"), createLlmsText(manifest, skillsIndex));
await ensureDistIsReadable();

console.log(`Built dist with ${skills.length} skills and ${manifest.axes.length} routes.`);
