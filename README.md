# Yonghsi Agent Skill Registry

> Fast work for agents, slow judgment for humans.

[![Hermes All Skills Map](assets/hermes-all-skills-map.png)](assets/hermes-all-skills-map.png)

This repository is a public, agent-first registry for reusable Codex and Hermes skills. The source of truth lives in `skills/*/SKILL.md`; the website turns those files into generated agent manifests, a searchable skill index, install commands, version labels, Git revisions, and update timestamps.

Live site: [https://www.twhsi.com/](https://www.twhsi.com/)  
Agent manifest: [https://www.twhsi.com/agent.json](https://www.twhsi.com/agent.json)  
Skill index: [https://www.twhsi.com/skills.json](https://www.twhsi.com/skills.json)  
LLM context: [https://www.twhsi.com/llms.txt](https://www.twhsi.com/llms.txt)

## What This Is

- A GitHub-backed skill registry for Codex and Hermes.
- A machine-readable index for agents that need routing, install commands, and resource discovery.
- A human-readable map for deciding which workflows should become reusable skills.
- A static website that publishes each skill's semantic version when declared, latest Git revision, and latest update time.

## Current Highlight

[`fire-analysis-card`](skills/fire-analysis-card/) is now on FIRE 2.0:

- `F = Full-D`: stable numbering for temporary, permanent, and project notes.
- `I = Index`: keyword webs and retrieval handles.
- `R = Route`: thinking paths through the material.
- `E = Evolution`: time-based card-box growth for semantic search.

## Skill Versions And Updates

The website generates this metadata from skill files and Git history. `Unversioned` means the skill does not yet declare a semantic version inside its `SKILL.md`.

| Skill | Version | Latest revision | Last updated |
|---|---:|---|---|
| [`fire-analysis-card`](skills/fire-analysis-card/) | v2.0 | `87cf7d2` | 2026-07-07 21:53 +08:00 |
| [`auto-luhmann-numberer`](skills/auto-luhmann-numberer/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`epub-hypercard-obsidian`](skills/epub-hypercard-obsidian/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`fantastical-calendar`](skills/fantastical-calendar/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`fire-card-to-epub`](skills/fire-card-to-epub/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`imandalart`](skills/imandalart/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`imessage-nine-grid-hypercard`](skills/imessage-nine-grid-hypercard/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`markdown-nine-grid-clipboard`](skills/markdown-nine-grid-clipboard/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`obsidian-graph-view`](skills/obsidian-graph-view/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`pdca`](skills/pdca/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`personal-athlete-81-grid`](skills/personal-athlete-81-grid/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`project-note-json-to-epub`](skills/project-note-json-to-epub/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |
| [`todays-daily-plan`](skills/todays-daily-plan/) | Unversioned | `bdaab7a` | 2026-06-28 13:53 +08:00 |

## Registry Routes

| Route | Purpose | Representative skills |
|---|---|---|
| Time | Daily focus, planning rhythm, calendar actions, and long-range training loops. | `todays-daily-plan`, `imandalart`, `personal-athlete-81-grid`, `fantastical-calendar` |
| Cards | FIRE analysis, grid cards, Markdown tables, and graph views. | `fire-analysis-card`, `markdown-nine-grid-clipboard`, `obsidian-graph-view` |
| Agent | Repeatable Codex workflows, structured inputs, scripts, and metadata. | `project-note-json-to-epub`, `epub-hypercard-obsidian` |
| Desktop | Local Mac workflows, clipboard outputs, calendar bridges, and working-desk routines. | `fantastical-calendar`, `markdown-nine-grid-clipboard` |
| Publish | Booklets, EPUBs, HyperCard returns, and public GitHub publishing paths. | `project-note-json-to-epub`, `epub-hypercard-obsidian` |

## Core Files

```text
assets/      public display assets
skills/      installable Codex and Hermes skills
docs/        install notes, book links, and skill index
examples/    sample inputs and outputs
archive/     older drafts and retired skills
Hermes.md    system map and command file
site/        static website source
dist/        generated website output, ignored by git
```

## Install A Skill Locally

From the repository root:

```bash
cp -R skills/fire-analysis-card ~/.codex/skills/
cp -R skills/todays-daily-plan ~/.codex/skills/
cp -R skills/imandalart ~/.codex/skills/
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
