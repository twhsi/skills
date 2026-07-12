---
name: eight-page-booklet
description: Create, write, design, compile, repair, impose, and validate a printable foldable eight-page mini book or one-sheet zine from text, notes, images, BIRD Graph JSON, iMandalArt/九宮/64＋8＋1, FIRE, daily plans, Bike/Bonsai outlines, templates, or PDFs. Use whenever the user says 八頁小書, 八頁小冊, 八格小書, A4小書, A4一張八頁, 一張紙變八頁, 摺頁書, 折頁小書, 摺疊小書, 迷你書, 小誌, zine, mini zine, booklet, 做成小書, 印成小書, 滿八頁, 單張印出八頁, 幫我拼版, 八頁PDF, 合併八頁, or asks for seven-route pages, a directory-and-keyword dual nine-grid, eight upright page PDFs, an 8-page reading PDF, or the correctly rotated A4 landscape print sheet.
---

# Eight Page Booklet 2.0

Compile source material into a reproducible paper thinking object. Separate content from layout: normalize source into a `BookletManifest 2.0`, then render every output from that manifest.

2.0 is in alpha while deterministic scripts are being implemented. Preserve the verified 1.x direct-PDF workflow as `legacy-direct`; do not claim script-backed validation when a named 2.0 script is absent.

## Output Contract

For a complete build, produce:

```text
booklet-output/
├── booklet-manifest.json
├── companion.md
├── pages/page-01.pdf ... page-08.pdf
├── reading-8-pages.pdf
├── print-a4-landscape.pdf
├── previews/contact-sheet.png
├── previews/print-imposition.png
└── validation-report.json
```

Keep all eight single-page PDFs upright. Generate the reading PDF in page order 1–8. Generate the A4 print sheet only after the single pages pass structural checks.

## Core Workflow

1. Inspect every supplied source before drafting.
2. Select one dominant content mode; combine modes only when the user or material requires it.
3. Normalize content into `BookletManifest 2.0`. Read [references/manifest-schema.md](references/manifest-schema.md) before creating or validating the manifest.
4. Preserve source IDs, BIRD addresses, verified deep links, citations, route references, and explicit ordering.
5. Draft eight page objects before rendering. Give each page one strong idea plus three to five short lines or one readable visual block.
6. Store long context, complete cards, citations, selection reasoning, and cross-route notes in `companion.md`.
7. Render eight upright single pages first. Use existing deterministic scripts when present; during alpha, use the PDF skill and preserve the manifest as the source of truth.
8. Merge pages 1–8 into the reading PDF.
9. Impose the A4 print sheet using the fixed physical map below.
10. Render previews and perform V1–V4 validation. Record results in `validation-report.json`; do not report a check as passed without current-run evidence.

## Source Types

Accept these source types:

- `text`: article, note, chapter, manuscript, reflection, or daily plan.
- `bird_graph`: Book, Route, Keyword, Context, Chunk, Node, and Edge data.
- `imandalart`: center plus eight cells, including standard and の字型 layouts.
- `fire`: Full-D, Index, Route, and Evolution notes.
- `outline`: Bike, Bonsai, Markdown, or another explicit hierarchy.
- `pdf_pages`: existing pages, templates, scans, or prior booklets.
- `mixed`: multiple source types with explicit source mapping.

Use only the analysis skills that the source needs. Do not force FIRE, BIRD, iMandalArt, or Daily Plan semantics onto unrelated material.

## Content Modes

### Classic Eight Pages

Use this default sequence when no stronger structure exists:

1. Cover or center question.
2. Overview or route map.
3. Entry or transition.
4. Core claim or scene.
5. Method, equipment, or risk.
6. Relation, collaboration, or revision.
7. Reflection, tension, or judgment.
8. Next action, gratitude, or return commitment.

Respect user-supplied page headings. Fill a missing page 1 as cover or overview only when needed.

### Seven Routes

Use for BIRD, book deconstruction, knowledge systems, and 64＋8＋1:

- Page 1: one directory nine-grid plus one keyword nine-grid.
- Pages 2–8: seven Route pages.
- Give each Route page one center claim, three to five concise points, and one ordered path.
- If eight source Routes must become seven reading Routes, merge only semantically compatible routes and record the mapping and reason in the manifest.

### Mandala Eight Angles

Use for iMandalArt-centered material:

- Page 1: center and overview grid.
- Pages 2–8: seven readable angle pages.
- If two of eight angles are combined, record both source identities and the merge reason.
- Never silently change the supplied spatial order.

### Daily Paper Loop

Use for daily or weekly planning. Organize capture, frog, calendar, time grid, eight life areas, journal, plan, and review into a writable paper loop.

### PDF Repair

Use when content must remain unchanged. Repair only page order, rotation, merging, safe margins, legibility, or imposition unless the user explicitly requests rewriting.

## BookletManifest Rules

Use `schema_version: "2.0"`. Require exactly eight uniquely numbered page objects. Store content in typed blocks rather than page-specific ad hoc fields.

Initial allowed block types:

- `title`
- `paragraph`
- `bullets`
- `quote`
- `route`
- `mandala`
- `image`
- `qr`
- `write_area`
- `source_note`

Use `source_refs`, `route_refs`, and citation IDs instead of copying long evidence into paper pages. Keep render choices under `render`; keep QA observations under `validation`.

## BIRD Integration

When the source is BIRD:

- Use Book Address for structural location, not for semantic routing.
- Use Index `W + T + K + A` to choose and label retrieval terms.
- Use Route for ordered cross-page reasoning.
- Preserve verified Deep Links byte-for-byte; leave proposed links blank or pending.
- When 64 Keywords are compressed to eight visible entrances, retain all 64 IDs and record which keywords each entrance represents.
- Keep Context and Chunk content in companion material unless it remains readable on paper.

Use `thebrain-bird-address` for BIRD assignment or audit. Do not invent weights, evidence, or deep links.

## iMandalArt 2.01 Integration

Use `imandalart` for source analysis and complete 11-line text cards. Preserve these の字型 coordinates:

Directory grid:

```text
Ⓕ　Ⓒ　Ⓖ
Ⓑ　◎　Ⓓ
Ⓔ　Ⓐ　Ⓗ
```

Keyword child grid:

```text
⑥　③　⑦
②　◎　④
⑤　①　⑧
```

Treat the center identity as `Ⓘ` when useful but always display `◎`. Preserve `Ⓐ` or `①` as the first semantic item even though it appears at bottom center. Never convert the layout to ordinary reading order. Keep full 11-line cards in the companion Markdown; a simplified paper grid may shorten text but must preserve coordinates. Store citations and cross-route notes outside cramped cells.

## Content Normalization

- Rewrite source into reader-facing paper language.
- Remove meaningless raw labels such as `副題：`, `用途：`, `日期：`, `資訊：`, `格式：`, or `主軸：` unless they carry meaning.
- Preserve personal wording when it carries identity or emotional force.
- Keep each page focused and leave space for handwriting.
- Mark weak claims as `待證`, `推論`, or `需補例`.
- Scan manuscripts and PDFs for user-blocked names, tags, schools, or phrases.

## PDF Generation

Generate upright single pages using A6 portrait proportions derived from A4 quarter pages. Use a fold-safe inset of roughly 16–20 pt. Keep page numbers, footer labels, QR blocks, and frames inside the safe area.

Impose on one A4 landscape page:

- Top row left to right: pages `4, 3, 2, 1`, each rotated 180 degrees.
- Bottom row left to right: pages `5, 6, 7, 8`, upright.

Do not add fold-grid lines unless requested. Preserve blank space around fold paths. Keep the print imposition separate from the upright reading PDF.

## Template And Fold Feedback

Render supplied PDF templates to PNG before inferring visual rotations or coordinates. Do not trust PDF metadata alone.

Treat a photograph or scan of the physically folded booklet as stronger evidence than a screen preview. Preserve paper size and page order while moving content inward or reducing density. Save corrected builds with a clear `foldsafe` suffix without overwriting the prior build.

## Validation Gate

Perform four levels:

### V1 Structure

- Confirm exactly eight unique page numbers.
- Confirm every reference target exists.
- Confirm required manifest fields and source mappings.
- Confirm seven-route or Mandala merges have recorded reasons.

### V2 Typography

- Confirm a Chinese-capable font is embedded or available.
- Confirm pages are upright, nonblank, legible, and unclipped.
- Confirm text stays inside fold-safe bounds.
- Confirm blocked or unwanted labels are absent.

### V3 Imposition

- Confirm the print PDF is exactly one A4 landscape page.
- Confirm top row `4,3,2,1` is upside down.
- Confirm bottom row `5,6,7,8` is upright.
- Confirm the reading PDF has eight equal-size pages.

### V4 Visual

- Render all eight reading pages and the print sheet to PNG.
- Inspect for clipping, overlaps, missing glyphs, wrong rotations, empty pages, and inconsistent margins.
- Prefer a contact sheet for whole-book review and inspect dense pages individually.

Write pass, fail, not-run, evidence path, and notes for every check in `validation-report.json`. If an alpha build lacks automated overflow detection, mark that check as visual/manual rather than automated.

## 1.x Compatibility

Keep the established direct workflow available as `legacy-direct`:

1. Draft companion Markdown.
2. Generate `page-01.pdf` through `page-08.pdf` upright.
3. Merge the reading PDF.
4. Impose the A4 print sheet using the fixed map.
5. Render and inspect previews.

When using `legacy-direct`, create a manifest from the finished page plan so future rerenders have a stable source. Do not remove or rewrite existing user templates during the 2.0 alpha phase.

## Resource Routing

- Read [references/manifest-schema.md](references/manifest-schema.md) for the canonical manifest fields and validation rules.
- Read [references/mandala-grid-v1.md](references/mandala-grid-v1.md) when preserving the existing Mandala-Grid human-readable source format.
- Read [references/visual-style.md](references/visual-style.md) when creating a public preview, repository asset, website showcase, cover, or styled paper output.
- Use the PDF skill for PDF creation, merging, rendering, and visual verification.
- Use Skill Tree Manager when changing version, status, dependencies, cross-app links, or promotion from alpha to active.

## 2.0 Promotion Gate

Keep 2.0 in alpha until all conditions pass:

1. One manifest can deterministically rebuild all outputs.
2. BIRD Seven Routes, Daily Paper Loop, and PDF Repair cases each pass V1–V4.
3. の字型 directory and keyword coordinates have an automated check.
4. At least one physical print, cut, fold, and photo-feedback cycle passes.
5. Skill validation passes and `agents/openai.yaml` matches this contract.
