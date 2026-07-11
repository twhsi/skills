---
name: thebrain-bird-address
description: "Apply the formal BIRD 2.0 Knowledge Address protocol to complex manuscript text and TheBrain Thoughts. Use when splitting books into chapter/section/item knowledge nodes, producing BIRD analysis Excel workbooks, assigning Book Address, structured Knowledge Index (Weight, Type, Keyword, Alias), Routes, verified Deep Links, optional BIRD-I 2.1 Semantic Roles, importing a Type/Tag manuscript scaffold into TheBrain, or auditing existing TheBrain/Excel book indexes."
---

# BIRD 2.0 Book Deconstructor

Convert complex structural text into addressable, searchable, cross-linked book nodes for TheBrain, Excel, Obsidian, and AI Agents.

## Formal Protocol

- `B = Book Address`: stable book/project hierarchy address; answer "where in the book?"
- `I = Knowledge Index`: structured index object `W + T + K + A`; answer "what knowledge object?"
- `R = Route`: ordered cross-node or cross-chapter paths; answer "where does it lead?"
- `D = Deep Link`: exact permanent application address; answer "how is it opened?"

Read [`references/bird-2.0-spec.md`](references/bird-2.0-spec.md) before assigning Index Weight, Index Type, or Semantic Role.

Do not use the old `B = Branch` or unstructured `I = title` interpretation. Mark legacy input as `BIRD 1.x` and map it into 2.0.

## Distinguish Two Types

- `StructuralType`: book function, such as `部 / 章 / 節 / 項`.
- `IndexType`: knowledge kind inside `I`, using `C / M / P / B / T / O / E / L / S / A / X`.

Never put `章` into `IndexType`, or `Concept` into `StructuralType`.

## Choose the Mode

- **Single Node**: analyze one existing Thought and output one BIRD object.
- **Deconstruct Text**: split complex prose into chapter, section, and atomic item nodes.
- **Excel Workbook**: create a validated `.xlsx` with BIRD analysis, manuscript Notes, and code tables.
- **TheBrain Scaffold**: turn the validated Excel hierarchy into empty or selectively populated Thoughts with structural Types and workflow Tags.
- **Audit/Migrate**: check or convert existing TheBrain or legacy Excel rows.

## Deconstruct Text

1. Identify book, part, chapter, section, existing numbering, central question, and argument order.
2. Preserve existing addresses. Use `待編` only when no reliable address exists; do not silently renumber.
3. Treat `章` and `節` as structural containers. Treat `項` as the normal manuscript unit: one claim, explanation, evidence/example, and transition.
4. Split when the claim, reader question, independent case, definition, or reusable reasoning step changes. Do not split mechanically by paragraphs.
5. Target 700-1000 Chinese characters per standard item Note; allow 300-600 for bridges/definitions and up to 1200 for an indivisible case.
6. Build one BIRD object per item:
   - assign one `B`;
   - assign one `I.W`, one `I.T`, one canonical `I.K`, and zero or more deduplicated `I.A`;
   - assign two to five meaningful `R` targets when supported;
   - preserve verified `D` byte-for-byte or leave it blank/pending for proposed nodes.
7. Preserve the author's stance, metaphors, examples, and evidence. Mark missing material `待補`; never fabricate support.
8. Return a structure tree, BIRD table, JSON objects, and item Note drafts unless the user requests only one format.

Read [`references/manuscript-structuring.md`](references/manuscript-structuring.md) for segmentation and output templates.

## Assign the Index

For every node, apply this order:

1. Choose `K`: one canonical retrieval term, 4-10 Chinese characters or 2-4 English words.
2. Choose `T`: one code from the controlled Index Type table.
3. Choose `W`: importance to this specific book, not general fame.
4. Add `A`: genuine synonyms, translations, abbreviations, or established alternate spellings. Exclude the canonical keyword itself.
5. Optionally assign `Role` using BIRD-I 2.1 only when graph or hierarchy evidence supports it; otherwise leave blank.

Do not turn every noun into an Index. Create an index object only when the term supports retrieval, interpretation, or routing.

## Build Routes

- Use `B` for the table-of-contents location and `R` for meaningful cross-links.
- Prefer ordered routes such as `FIRE -> 語意索引 -> AI對話`.
- Store Route targets as existing Thought names, Book Addresses, or verified Deep Links.
- Exclude self-links, direct hierarchy repetitions, and nearby siblings without a semantic reason.
- Mark a proposed target `待建` rather than inventing its address.

## Preserve Deep Links

Copy each supplied `D` exactly from `brain://` through the final character. Never decode, encode, normalize, shorten, repair, rename, or regenerate its slug. For a proposed Thought, use a blank cell in Excel and `待建立 Thought 後貼入` in prose.

Before returning, compare every displayed `D` with its source string. Do not claim tool verification unless a tool returned that exact value in the current run.

## Create the Excel Workbook

Read [`references/excel-schema.md`](references/excel-schema.md). Create these sheets:

1. `BIRD分析`: one row per knowledge node with normalized BIRD fields.
2. `拆書正文`: one row per item with Note text and BIRD JSON.
3. `代碼表`: Weight, Index Type, Semantic Role, StructuralType, and Tag dictionaries.

Use a real spreadsheet library. Freeze headers, enable filters, wrap long text, set practical widths, and validate the workbook after saving. Preserve legacy columns only in a separate `舊表對照` sheet when migration is requested.

## Audit Rules

Report the smallest correction for:

- duplicate or missing Book Address;
- invalid Weight or Index Type code;
- empty canonical Keyword;
- Alias duplicating Keyword or another Alias;
- unsupported Semantic Role;
- Route self-link or hierarchy-only repetition;
- missing or transformed Deep Link;
- `StructuralType` and address-depth conflict;
- multiple primary workflow Tags.

Do not move, rename, merge, or delete live Thoughts without explicit authorization.

## Standard BIRD Output

```text
【BIRD 2.0】
B: 全系統/第三部/3.4/3.4.D/3.4.D.B
I:
  W: I3
  T: S | Skill
  K: 八領域週檢視
  A: Weekly Review to 8 Rocks | 八岩週檢視
R: 週檢視 -> 八領域週檢視 -> 週計劃
D: brain://... or 待建立 Thought 後貼入
StructuralType: 項
Tag: 草稿
Role:
```

For Agent interchange, also output:

```json
{
  "version": "BIRD-2.0",
  "bookAddress": "全系統/第三部/3.4/3.4.D/3.4.D.B",
  "index": {
    "weight": "I3",
    "typeCode": "S",
    "type": "Skill",
    "keyword": "八領域週檢視",
    "aliases": ["Weekly Review to 8 Rocks", "八岩週檢視"]
  },
  "route": ["週檢視", "週計劃"],
  "deepLink": "brain://...",
  "structuralType": "項",
  "tag": "草稿",
  "semanticRole": null
}
```

## TheBrain Instructions

- For one current Thought, return [`references/thebrain-instruction.md`](references/thebrain-instruction.md).
- For chapter/section text deconstruction, return [`references/thebrain-manuscript-instruction.md`](references/thebrain-manuscript-instruction.md).
- For bulk Excel-to-TheBrain scaffolds, read [`references/thebrain-scaffold-import.md`](references/thebrain-scaffold-import.md) before creating any Thought, Type, Tag, or Link.
