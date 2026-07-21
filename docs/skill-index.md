# Skill Index

## a4-eight-page-booklet

- Purpose: Compile text, BIRD Graph JSON, iMandalArt, FIRE, plans, outlines, images, templates, or PDFs into a reproducible A4 foldable eight-page mini book.
- Main file: [`../skills/a4-eight-page-booklet/SKILL.md`](../skills/a4-eight-page-booklet/SKILL.md)
- Current resources: deterministic imposition script, manifest schema, Japanese BIRD lesson mapping, Mandala layout reference, visual style, documentary paper-booklet photo, and `agents/openai.yaml`.
- Outputs: `BookletManifest 2.0`, eight upright A7 page PDFs, reading PDF, A4 print imposition, editable DOCX, previews, companion Markdown, and validation report.
- Keywords: 八頁小書, A4 小書, 摺頁書, 小誌, booklet, zine, 七路八頁, 64＋8＋1.
- Connects to: `thebrain-bird-address`, `imandalart`, `fire-analysis-card`, `project-note-json-to-epub`, and PDF publishing workflows.

## todays-daily-plan

- Purpose: Write spoken daily-plan notes into today's Obsidian Mandala Grid nine-grid time blocks and diary.
- Main file: [`../skills/todays-daily-plan/SKILL.md`](../skills/todays-daily-plan/SKILL.md)
- Current resources: `scripts/update_today_plan.py`, `references/mandala-grid-day-plan.md`, `agents/openai.yaml`
- Keywords: 青蛙, 日計劃, 日計畫, 九宮, 時段, 日記, Mandala Grid.

## personal-athlete-81-grid

- Purpose: Create Ohtani-style editable 81-cell MandalArt training grids for personal athletes.
- Main file: [`../skills/personal-athlete-81-grid/SKILL.md`](../skills/personal-athlete-81-grid/SKILL.md)
- Current resources: `scripts/render_ohtani_81_grid.py`, `assets/yongxi-badminton.json`, `agents/openai.yaml`

## auto-luhmann-numberer

- Purpose: Assign, validate, sanitize, and explain Luhmann-style book and card-box numbers with a public FAST example catalog.
- Main file: [`../skills/auto-luhmann-numberer/SKILL.md`](../skills/auto-luhmann-numberer/SKILL.md)
- Current resources: `references/public-numbering-rules.json`, `references/book-chapter-card-catalog.*`, `scripts/extract_book_codes.mjs`, `scripts/validate_luhmann_catalog.py`, `assets/download.epub`, `agents/openai.yaml`

## project-note-json-to-epub

- Purpose: Convert structured project-note JSON manuscripts into validated EPUB files.
- Main file: [`../skills/project-note-json-to-epub/SKILL.md`](../skills/project-note-json-to-epub/SKILL.md)
- Current resources: `agents/openai.yaml`

## epub-hypercard-obsidian

- Purpose: Convert EPUB card books into Obsidian-ready HyperCard Markdown folders and portable zip files.
- Main file: [`../skills/epub-hypercard-obsidian/SKILL.md`](../skills/epub-hypercard-obsidian/SKILL.md)
- Current resources: `scripts/epub_to_hypercard_obsidian.py`, `assets/hypercard-card-template.md`, `assets/hypercard-folder-layout.txt`, `agents/openai.yaml`

## obsidian-graph-view

- Purpose: Render Obsidian-style weighted graph views from node-link, book, TOC, keyword, or card data.
- Main file: [`../skills/obsidian-graph-view/SKILL.md`](../skills/obsidian-graph-view/SKILL.md)
- Current resources: `scripts/render_obsidian_graph_view.py`, `agents/openai.yaml`

## imandalart

- Purpose: Design and render iMandalArt-style square 3x3 index cards.
- Main file: [`../skills/imandalart/SKILL.md`](../skills/imandalart/SKILL.md)
- Current resources: script, style reference, sample JSON, sample HTML, sample PNG

## weekly-reverse-review

- Purpose: Turn inbox notes, daily plans, diaries, calendars, annual plans, and hundred-year life plans into one happiness-and-peace-centered weekly plan.
- Main file: [`../skills/weekly-reverse-review/SKILL.md`](../skills/weekly-reverse-review/SKILL.md)
- Current resources: `references/weekly-eight-domain-layout.md`, `references/reverse-review-questions.md`, `references/output-json-schema.md`, `agents/openai.yaml`
- Connects to: `fire-analysis-card`, `imandalart`, `markdown-nine-grid-clipboard`, `project-note-json-to-epub`, calendar evidence workflows.

## imessage-nine-grid-hypercard

- Purpose: Create narrow iMessage/PTT Border-Light HyperCard style nine-grid cards with long data moved into Context.
- Main file: [`../skills/imessage-nine-grid-hypercard/SKILL.md`](../skills/imessage-nine-grid-hypercard/SKILL.md)
- Current resources: `agents/openai.yaml`

## markdown-nine-grid-clipboard

- Purpose: Convert text, iMandalArt cards, Obsidian 九宮 notes, or eight-domain outlines into Markdown 3x3 tables with an ◎ center.
- Main file: [`../skills/markdown-nine-grid-clipboard/SKILL.md`](../skills/markdown-nine-grid-clipboard/SKILL.md)
- Current resources: `scripts/copy_grid.py`, `agents/openai.yaml`

## fire-analysis-card

- Purpose: Prepare Chinese notes, articles, and card-box material for semantic search with Full-D, Index, Route, and Evolution.
- Main file: [`../skills/fire-analysis-card/SKILL.md`](../skills/fire-analysis-card/SKILL.md)
- Current resources: `agents/openai.yaml`

## thebrain-bird-address

- Purpose: Turn complex manuscript text and permanent notes into BIRD 2.1 Book Addresses, structured Knowledge Indexes, Routes, verified Deep Links, Semantic Roles, Excel workbooks, TheBrain scaffolds, Roam JSON, and monochrome double nine-grids.
- Main file: [`../skills/thebrain-bird-address/SKILL.md`](../skills/thebrain-bird-address/SKILL.md)
- Current resources: BIRD 2.0 migration reference, BIRD 2.1 specification, Excel schema, manuscript structuring rules, TheBrain instructions, Roam converter and tests, monochrome double-nine-grid rules, and `agents/openai.yaml`
- Keywords: BIRD, Book Address, Knowledge Index, Route, Deep Link, TheBrain, Type, Tag, 拆書, 書稿鷹架.

## concise-key-points

- Purpose: Compress answers to high-density key points, defaulting to 70% shorter while retaining at least 95% of essential information.
- Main file: [`../skills/concise-key-points/SKILL.md`](../skills/concise-key-points/SKILL.md)
- Current resources: `agents/openai.yaml`
- Keywords: 言簡意賅, 講重點, Concise, 精簡回答, 只講重點, brief, TL;DR.

## fire-card-to-epub

- Purpose: Convert FIRE analysis cards or project-note JSON into validated EPUB books with TOC, index cards, backlinks, and attached ebook assets.
- Main file: [`../skills/fire-card-to-epub/SKILL.md`](../skills/fire-card-to-epub/SKILL.md)
- Current resources: `scripts/fire_cards_to_epub.py`, `assets/fire-to-epub-tutorial.json`, `assets/fire-to-epub-tutorial.epub`, `assets/download.epub`, `agents/openai.yaml`

## pdca

- Purpose: Create Chinese monospaced compass-style PDCA or CAPD problem-solving cards.
- Main file: [`../skills/pdca/SKILL.md`](../skills/pdca/SKILL.md)
- Current resources: `agents/openai.yaml`
