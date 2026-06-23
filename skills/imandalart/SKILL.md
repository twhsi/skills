---
name: imandalart
description: Design iMandalArt and iMandala 3x3 square index cards. Default output is iMandalArt 九宮卡 1.0: open-card top borders, no vertical dividers, no Markdown table, short 2-4 character headings, five-character plain-language content lines, and an ◎ center. Use when the user asks for iMandalArt, iMandala, I MandalArt, 五字定格, ◎中心, 手機方形曼陀羅, 正方形九宮索引卡, open-card 九宮, or a square 3x3 card that is not an 81-cell Mandala.
---

# iMandalArt

## Hard Default

When the user asks for iMandalArt or iMandala, default to **iMandalArt 九宮卡 1.0**:

- Open-card top borders: `+----------+   +----------+   +----------+`.
- No vertical divider characters around content.
- No Markdown table.
- Center title line uses bracket form, e.g. `[ 年計劃八領域 ]`; maximum 10 Chinese characters, normally 6–8.
- Center cell uses a quiet `◎`, e.g. `◎年計劃`.
- Outer cell headings are short: 2–4 Chinese characters.
- Content/action lines are five Chinese characters when possible, in a plain-language five-character verse rhythm.
- One or two five-character lines normally represent a cell; use up to four lines only for complex source material.

This default overrides older PE2 full-box, terminal-debug, Discord-table, and Markdown-table habits.

Use no-frame output only when the user explicitly asks for 無框 / no-box. Use fully framed PE2 output only when the user explicitly asks for boxed text, PE2, terminal frame, or renderer debugging.

## Purpose

Use this skill to create one square 3x3 index card for Discord, Hermes, Codex, notes, or phone reading.

iMandalArt is:

- One center idea.
- Eight surrounding vectors.
- A phone-readable square card.
- A compact thinking object, not a spreadsheet.

It is not:

- A Markdown table.
- An 81-cell Mandala.
- A long article.
- A bordered terminal UI unless explicitly requested.

## Five-Character Content Rhythm

The normal card body is an open-card grid with top borders and centered content:

```text
[ 年計劃八領域 ]

+----------+   +----------+   +----------+
    健康           工作           財務
 跑步呼吸緩     課程交付好     現金正流向

+----------+   +========+     +----------+
    家庭         ◎年計劃         社群
 時間確認好     八領域平衡     約人一對一

+----------+   +----------+   +----------+
    內在           學習           休閒
 反向週檢視      日文考N5      練合唱吉他

+----------+   +----------+   +----------+
```

Rules:

- The bracketed center title is at most 10 Chinese characters; normally 6–8.
- The center marker is `◎`.
- Each outer heading is 2–4 Chinese characters.
- Content/action lines should be five Chinese characters when possible.
- The writing feel is like a white-language five-character quatrain: compact, rhythmic, actionable.
- One or two five-character lines usually represent a cell; use up to four lines only when the message is complex.
- Center headings and content should be visually centered between the `+` marks using measured display width, not hand-guessed spaces.

Good five-character content lines:

```text
跑步呼吸緩
課程交付好
現金正流向
時間確認好
反向週檢視
練合唱吉他
```

Bad content lines:

```text
跑步
課程交付與追蹤
現金流
```

Fix short rows by sharpening the phrase. Fix long rows by compressing the wording into one or two five-character lines.

## Default Structure

Use this spatial meaning unless the user gives a different map:

```text
觸 發 源　　輸 入 物　　辨 識 法
輸 出 形　　 ◎ 　　流 程 線
保 存 處　　避 免 事　　下 一 步
```

Position logic:

- Top left: trigger, origin, or entry point.
- Top center: input, source, or material.
- Top right: recognition, pattern, or diagnosis.
- Middle left: output, result, or expression.
- Center: core concept, goal, or question.
- Middle right: process, method, or workflow.
- Bottom left: storage, memory, or evidence.
- Bottom center: constraint, risk, or what to avoid.
- Bottom right: next action, next skill, or future path.

## Default Output

Return the open-card 九宮卡 first in a fenced text block.

Use this pattern:

```text
[ 中心標題 ]

+----------+   +----------+   +----------+
    抬頭           抬頭           抬頭
 五字內容句     五字內容句     五字內容句

+----------+   +========+     +----------+
    抬頭          ◎中心詞         抬頭
 五字內容句     五字內容句     五字內容句

+----------+   +----------+   +----------+
    抬頭           抬頭           抬頭
 五字內容句     五字內容句     五字內容句

+----------+   +----------+   +----------+
```

Each cell normally has two visible lines:

- Heading row: 2–4 characters.
- Content row: one five-character plain-language line.

If needed, add a second content row; for complex messages, use up to four five-character content rows inside a cell.

Do not include a Markdown table as the default answer.

## Writing Style

- Use compact Chinese labels when the user writes in Chinese.
- Write like Palm launcher labels or index-card labels.
- Avoid explanations inside cells.
- Put any explanation below the card.
- Keep the center specific.
- Do not output Markdown table structure unless the user explicitly asks for Markdown.
- Do not output framed text unless the user explicitly asks for a frame.

## Quality Gate

Before replying, check:

- There are exactly nine cells.
- The bracketed title is no more than 10 Chinese characters, ideally 6–8.
- The center includes `◎`.
- Each outer heading is 2–4 Chinese characters.
- Content rows are five Chinese characters when possible, unless a mixed token such as `N5` is intentionally needed.
- The card uses open-card top borders and no vertical content rails.
- The card contains no Markdown table.
- The card fits phone reading.
- The final answer starts with the card, not with explanation.

## If The User Says You Forgot

Immediately correct the output into iMandalArt 九宮卡 1.0:

- Use bracketed title, max 10 characters.
- Use open-card top borders.
- Remove vertical content rails and Markdown table structure.
- Keep `◎` in the center.
- Compress headings to 2–4 characters.
- Rewrite content rows into five-character plain-language lines where possible.
- Return only the corrected card unless a brief apology is necessary.

