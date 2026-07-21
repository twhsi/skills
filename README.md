# AI Agent Skills for Chinese Knowledge Workers

> Three Kings 2.2: compress with iMandalArt, address with BIRD, and publish with an A4 eight-page booklet.

iMandalArt, FIRE semantic analysis, planning, and publishing workflows for Claude Code, Codex, and mainstream LLM agents.

[![Hermes All Skills Map](assets/hermes-all-skills-map.png)](assets/hermes-all-skills-map.png)

This repository is TWHSI's public agent-skill system for Chinese knowledge workers. It turns repeatable writing, planning, note-making, and publishing workflows into skills that can be used by Claude Code, Codex, ChatGPT, Gemini, Hermes, and other LLM agents.

The source of truth lives in `skills/*/SKILL.md`; [`skill-tree.json`](skill-tree.json) records the Three Kings relationship, and the website turns the skills into generated LLM manifests, a searchable index, install commands, revisions, and update timestamps.

## What This Repository Is

`twhsi/skills` is an installable, shareable, LLM-readable skill registry. It turns long-running workflows for weekly review, iMandalArt, FIRE analysis, card-based notes, EPUB publishing, HyperCard returns, and desktop work into public procedures that agents can repeat and humans can inspect.

The point is not to make humans behave like faster machines. The point is to let AI spend tokens on repetitive structure, while humans keep judgment, relationships, pace, and the quieter question:

> Which action brings real happiness and peace?

The flagship workflow is **Skills 三大天王 2.2**: [`imandalart`](skills/imandalart/) compresses a source, [`thebrain-bird-address`](skills/thebrain-bird-address/) gives every knowledge object an address and Route, and [`a4-eight-page-booklet`](skills/a4-eight-page-booklet/) returns the structure to a verified paper book.

Live site: [https://www.twhsi.com/](https://www.twhsi.com/)  
Live Keyword Graph: [https://keyword-graph-view.twhsi.chatgpt.site/](https://keyword-graph-view.twhsi.chatgpt.site/)

Agent manifest: [https://www.twhsi.com/agent.json](https://www.twhsi.com/agent.json)  
Skill index: [https://www.twhsi.com/skills.json](https://www.twhsi.com/skills.json)  
LLM context: [https://www.twhsi.com/llms.txt](https://www.twhsi.com/llms.txt)

## What It Does

- Convert source material into iMandalArt 2.2 hard-line 9-grid cards.
- Apply FIRE semantic analysis for card-box thinking, retrieval, and writing structure.
- Turn permanent notes into BIRD 2.1 Book Addresses, structured Knowledge Indexes, Routes, verified Deep Links, Semantic Roles, and TheBrain manuscript scaffolds.
- Compress answers with `concise-key-points`: reduce default length by 70% while retaining at least 95% of essential information.
- Compile source material into a verified A4 one-sheet eight-page booklet, synchronized reading PDF, print imposition, and editable DOCX.
- Generate agent-readable metadata through `agent.json`, `skills.json`, and `llms.txt`.
- Route daily planning, weekly planning, booklet, EPUB, Markdown, and knowledge-management workflows.
- Extract eight keywords and render a distributed weighted graph with definitions, evidence, and blacklist control.
- Package Chinese-first workflows so LLM agents can operate on them consistently.

## Copyable Demo

```text
Input: manuscript, notes, PDF, or long conversation
Skills: imandalart 2.2 -> thebrain-bird-address 2.2 -> a4-eight-page-booklet 2.2
Output: eight-angle index -> BIRD addresses and Routes -> reading PDF + print sheet + DOCX
```

## Skills 三大天王 2.2

```text
素材
  -> iMandalArt 2.2：一個中心、八個正交視角
  -> BIRD 拆書分析 2.2：Book Address、W+T+K+A、Route、Deep Link
  -> A4 八頁小書 2.2：八頁閱讀版、折頁列印版、可編輯 DOCX、驗證報告
```

| Skill | Responsibility | Best use |
|---|---|---|
| [`iMandalArt 2.2`](skills/imandalart/) | 壓縮王：把混雜素材壓成中心與八個不重複視角。 | 每日計畫、章節總覽、64＋8＋1、手機九宮卡。 |
| [`BIRD 拆書分析 2.2`](skills/thebrain-bird-address/) | 地址王：把主張變成可定位、可檢索、可跨章連結的知識節點。 | 拆書、TheBrain、Excel、Roam、Obsidian、書稿 Route。 |
| [`A4 八頁小書 2.2`](skills/a4-eight-page-booklet/) | 出版王：把九宮概覽與七條 Routes 變成可讀、可印、可編輯的小書。 | A4 摺頁書、閱讀 PDF、紙本思考、教學與出版驗證。 |

### 2.2 New Functions

- **Shared handoff**：中心、八角度、來源 ID、BIRD Address、Route 與引用一路保留到紙本。
- **Seven-Route publishing**：第 1 頁放 iMandalArt 總覽，第 2–8 頁放七條 BIRD Routes。
- **Backward compatibility**：BIRD 仍輸出 `BIRD-2.1`；小書仍讀取 `BookletManifest 2.0`。
- **Machine-readable tree**：[`skill-tree.json`](skill-tree.json) 記錄三者的版本、成熟度、輸出與解鎖關係。

## Featured: Keyword Graph View

[`keyword-graph-view`](skills/keyword-graph-view/) turns Chinese, English, or mixed text into a distributed network of exactly eight keywords. It removes blacklisted terms, weights co-occurrence edges from `W1` to `W9`, and gives every node a definition, note, and source evidence.

Open the live tool: [keyword-graph-view.twhsi.chatgpt.site](https://keyword-graph-view.twhsi.chatgpt.site/)

## Featured: Weekly Reverse Review

[`weekly-reverse-review`](skills/weekly-reverse-review/) turns an 11-step weekly review into an AI-assisted reverse planning loop.

The skill reads four angles before writing the next week:

- `YEAR`: annual plan and hundred-year life plan.
- `Week`: last weekly plan and weekly review.
- `Day`: daily plans, seven-day diary notes, and calendar evidence.
- `Inbox`: loose tasks, reminders, subscriptions, errands, and collected noise.

It then asks what should be smaller, slower, deleted, delayed, or kept as presence instead of achievement. The center question is:

> Which action brings real happiness and peace?

Default answer:

> Speak less. Stay present. Move slowly.

For an LLM or agent, start with:

```bash
curl -s https://www.twhsi.com/llms.txt
```

## Deep Dive: iMandalArt 2.2

[`imandalart`](skills/imandalart/) turns loose source material into one hard-line 3x3 Mandala index card.

iMandalArt 2.2 is designed around a strict text contract:

- Eight orthogonal surrounding angles labeled `Ⓐ` through `Ⓗ`.
- A double center axis displayed as `◎◎◎◎◎`.
- Exactly 11 physical text lines, so the card survives chat previews, note apps, and clipboard workflows.
- Compact CJK-friendly cells for TheBrain/Cerebro, Hermes, Discord, Codex, and other LLM chat surfaces.

Current status: iMandalArt 2.2 is optimized for CJK workflows, pure-text stability, の字型 identity preservation, and clean handoff to BIRD and booklet Routes.

Conceptual example:

```text
ⒶHealth Reset  ⒷManuscript  ⒸMoney Noise
Move with care  Pull one center  Review first
Build rhythm    Draft before all Fund the work

ⒹFamily Spark  ◎◎◎◎◎    ⒺPeople Path
Ask not lecture Weekly Review Keep three cards
Walk the long   ◎◎◎◎◎    Connect next

ⒻInner Release ⒼLearning    ⒽJoyful Rest
Speak less      Number lines  Sing and loosen
Prove nothing   Build index   Guitar and sun
```

Use it for weekly planning, writing focus, knowledge capture, and CJK note workflows where visual stability matters as much as semantic compression.

## Deep Dive: BIRD and A4 2.2

### BIRD Book Deconstructor 2.2

[`thebrain-bird-address`](skills/thebrain-bird-address/) turns manuscripts and permanent notes into addressable knowledge objects. The 2.2 Skill release applies the backward-compatible BIRD 2.1 protocol: `B = Book Address`, `I = Weight + Type + Keyword + Alias`, `R = Route`, and `D = exact Deep Link`, with optional evidence-based Semantic Roles. It supports Excel, TheBrain scaffolds, Roam JSON, monochrome double nine-grids, and a direct seven-Route booklet handoff.

### Supporting Skill: 言簡意賅｜講重點｜Concise

[`concise-key-points`](skills/concise-key-points/) produces high-information-density answers: conclusion first, three to five key points, minimal repetition, and no unnecessary background. Its default target is 70% shorter while retaining at least 95% of essential information.

### A4 Eight Page Booklet 2.2

[`a4-eight-page-booklet`](skills/a4-eight-page-booklet/) turns text, notes, images, BIRD Graph JSON, iMandalArt grids, 64+8+1 structures, FIRE material, daily plans, Bike or Bonsai outlines, templates, and PDFs into a printable, cuttable, and foldable eight-page booklet made from one A4 sheet.

The skill does more than place content into eight panels. It separates content from layout, normalizes the source into `BookletManifest 2.0`, and generates every reading, printing, preview, and validation artifact from the same manifest.

- Page 1 can hold the cover and overview. In BIRD or 64+8+1 mode, it contains one directory nine-grid and one keyword nine-grid.
- Pages 2–8 can form seven Routes. Each page keeps one central claim, three to five concise points, and one ordered reading path.
- iMandalArt spiral-order coordinates are preserved together with source IDs, BIRD Addresses, citations, and cross-route notes.
- Outputs include eight upright A7 page PDFs, an eight-page reading PDF, an A4 landscape print imposition, an editable DOCX, preview images, and a validation report.
- The fixed imposition order is `6, 7, 8, 1` upright on the top row and `5, 4, 3, 2` rotated 180 degrees on the bottom row.
- Validation checks structure, typography, imposition, visual quality, Apple Pages compatibility, and source fidelity when required.

Full skill specification and installation source: [`skills/a4-eight-page-booklet/SKILL.md`](skills/a4-eight-page-booklet/SKILL.md)

## What This Is

- A GitHub-backed skill registry for Chinese agent workflows.
- A machine-readable index for LLM agents that need routing, install commands, and resource discovery.
- A human-readable map for deciding which workflows should become reusable skills.
- A static website that publishes each skill's semantic version when declared, latest Git revision, and latest update time.

## Core Skill Stack

| Skill | Role |
|---|---|
| [`imandalart`](skills/imandalart/) | iMandalArt 2.2 compression king: one center and eight orthogonal retrieval angles. |
| [`fire-analysis-card`](skills/fire-analysis-card/) | Turn Chinese notes and manuscripts into FIRE semantic analysis cards. |
| [`thebrain-bird-address`](skills/thebrain-bird-address/) | BIRD 2.2 address king: validated knowledge addresses, Routes, Excel, TheBrain, Roam, and printable indexes. |
| [`concise-key-points`](skills/concise-key-points/) | Compress answers to the fewest useful words while retaining essential facts, constraints, and action items. |
| [`todays-daily-plan`](skills/todays-daily-plan/) | Convert spoken planning notes into an Obsidian day-plan Mandala grid. |
| [`weekly-reverse-review`](skills/weekly-reverse-review/) | Turn YEAR, Week, Day, and Inbox evidence into one happiness-and-peace-centered weekly plan. |
| [`keyword-graph-view`](skills/keyword-graph-view/) | Extract eight keywords and build a centerless weighted network with node notes and evidence. |
| [`a4-eight-page-booklet`](skills/a4-eight-page-booklet/) | A4 Booklet 2.2 publishing king: reading PDF, print imposition, editable DOCX, previews, and validation. |
| [`project-note-json-to-epub`](skills/project-note-json-to-epub/) | Turn structured project-note JSON into EPUB and publishing outputs. |
| [`markdown-nine-grid-clipboard`](skills/markdown-nine-grid-clipboard/) | Convert grids and cards into Markdown table workflows. |

## Current Metadata Highlight

[`fire-analysis-card`](skills/fire-analysis-card/) is now on FIRE 2.0:

- `F = Full-D`: stable numbering for temporary, permanent, and project notes.
- `I = Index`: keyword webs and retrieval handles.
- `R = Route`: thinking paths through the material.
- `E = Evolution`: time-based card-box growth for semantic search.

## Skill Versions And Updates

The live website generates freshness metadata from skill files and Git history on every deployment. Each skill entry includes:

- `version`: the semantic skill version when declared, otherwise `Unversioned`
- `revision` and `revision_short`: the latest Git commit for that skill path
- `updated_at`: the latest update timestamp for that skill path

Open the live generated table:

- [https://www.twhsi.com/#updates](https://www.twhsi.com/#updates)
- [https://www.twhsi.com/skills.json](https://www.twhsi.com/skills.json)

Featured release check: iMandalArt, BIRD Book Deconstructor, and A4 Eight Page Booklet are presented together as **Skills 三大天王 2.2**. Their stable interchange formats remain backward compatible.

[`thebrain-bird-address`](skills/thebrain-bird-address/) implements BIRD 2.1: `B = Book Address`, `I = Weight + Type + Keyword + Alias`, `R = Route`, and `D = exact Deep Link`, with optional evidence-based Semantic Roles. It complements FIRE by moving from reusable permanent notes into project notes, chapter structures, and book production.

## Registry Routes

| Route | Purpose | Representative skills |
|---|---|---|
| Time | Daily focus, planning rhythm, calendar actions, weekly review, and long-range training loops. | `weekly-reverse-review`, `todays-daily-plan`, `imandalart`, `personal-athlete-81-grid`, `fantastical-calendar` |
| Cards | FIRE analysis, BIRD book addresses, grid cards, Markdown tables, keyword graphs, and graph views. | `weekly-reverse-review`, `fire-analysis-card`, `thebrain-bird-address`, `markdown-nine-grid-clipboard`, `keyword-graph-view`, `obsidian-graph-view` |
| LLM | Repeatable LLM workflows, structured inputs, scripts, and metadata. | `imandalart`, `thebrain-bird-address`, `a4-eight-page-booklet`, `project-note-json-to-epub` |
| Desktop | Local Mac workflows, clipboard outputs, calendar bridges, and working-desk routines. | `fantastical-calendar`, `markdown-nine-grid-clipboard` |
| Publish | BIRD manuscript scaffolds, booklets, EPUBs, HyperCard returns, and public GitHub publishing paths. | `thebrain-bird-address`, `a4-eight-page-booklet`, `project-note-json-to-epub`, `epub-hypercard-obsidian` |

## Core Files

```text
assets/      public display assets
skills/      installable skills for mainstream LLM workflows
docs/        install notes, book links, and skill index
examples/    sample inputs and outputs
archive/     older drafts and retired skills
Hermes.md    system map and command file
skill-tree.json  Three Kings 2.2 machine-readable relationship map
site/        static website source
dist/        generated website output, ignored by git
```

## Install A Skill Locally

From the repository root:

```bash
cp -R skills/fire-analysis-card ~/.codex/skills/
cp -R skills/thebrain-bird-address ~/.codex/skills/
cp -R skills/concise-key-points ~/.codex/skills/
cp -R skills/todays-daily-plan ~/.codex/skills/
cp -R skills/weekly-reverse-review ~/.codex/skills/
cp -R skills/imandalart ~/.codex/skills/
cp -R skills/keyword-graph-view ~/.codex/skills/
cp -R skills/a4-eight-page-booklet ~/.codex/skills/
```

Then validate a skill:

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/fire-analysis-card
```

## Build The Website

```bash
npm run build
```

The build reads `skills/*/SKILL.md`, extracts frontmatter, detects declared versions, asks Git for latest per-skill revision timestamps, and writes:

- `dist/agent.json`
- `dist/skills.json`
- `dist/llms.txt`
- the static HTML/CSS/JS site

Vercel configuration lives in [`vercel.json`](vercel.json): build command `npm run build`, output directory `dist`.

## Maintenance Rule

When a skill changes, update the skill file first, run validation, rebuild the website, and push to `main`. The live site should always show the latest skill version, revision, and update time.
