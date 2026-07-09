---
name: imandalart
description: "Create iMandalArt 2.01 pure-text 3x3 Mandala index cards with a five-character center axis, eight orthogonal surrounding angles labeled Ⓐ-Ⓗ, compact title cells such as Ⓐ健康復節, and hard-line CJK layout for TheBrain/Cerebro, Hermes, Discord, and notes. Use when the user asks for iMandalArt, iMandalart, I MandalArt, 手機方形曼陀羅, 正方形九宮索引卡, 五字定格, ◎中心, Ⓐ-Ⓗ 九宮卡, TheBrain/Cerebro preview-safe hard-line cards, or a square 3x3 card that is not a Markdown table, visible-border PE2 card, or 81-cell Mandala."
---

# iMandalArt

## Purpose

Use this skill to turn any source material into one iMandalArt 2.01 pure-text 3x3 card.

iMandalArt 2.01 is:

- One center idea.
- Eight orthogonal surrounding angles.
- A pure-text 3x3 card with hard line breaks.
- Three lines per cell: a short title row and two content rows.
- A center axis that displays `◎◎◎◎◎`, one five-Han-character center line, then `◎◎◎◎◎` again.
- A note-friendly thinking object for TheBrain, Hermes, Discord, Codex, other LLM chat surfaces, or clipboard use.

iMandalArt 2.01 is not:

- A Markdown table.
- A visible-border PE2 card.
- An HTML-only visual artifact.
- An 81-cell Mandala.
- A long explanatory essay.

## Default Deliverable

Default to an iMandalArt 2.01 pure-text hard-line card.

1. Read the source material first. If the user provides a file path, JSON, note, article, or pasted text, inspect the content before generating.
2. Identify the central thought and compress it into one five-Han-character center line.
3. Orthogonally decompose the material into eight surrounding angles. Avoid synonym-only repeats.
4. Give each surrounding angle a four-Han-character title directly prefixed by `Ⓐ` through `Ⓗ`.
5. Write two modern, plain-language five-Han-character lines for each surrounding cell.
6. Render the center as `◎◎◎◎◎`, one five-Han-character center line, then `◎◎◎◎◎`.
7. Render the final answer as the 11-line 3x3 card only.

For LLM chat surfaces such as ChatGPT, Claude, Gemini, Codex, or Discord, wrap the card in a fenced `text` code block so hard line breaks and full-width spaces survive rendering.

For TheBrain/Cerebro direct note insertion or clipboard-only workflows, emit the raw 11-line card without a Markdown fence.

## 2.01 Card Contract

The final card has exactly 11 physical text lines:

```text
Ⓐ四字標題　Ⓑ四字標題　Ⓒ四字標題
五字內容一　五字內容一　五字內容一
五字內容二　五字內容二　五字內容二

Ⓓ四字標題　◎◎◎◎◎　Ⓔ四字標題
五字內容一　中心五字句　五字內容一
五字內容二　◎◎◎◎◎　五字內容二

Ⓕ四字標題　Ⓖ四字標題　Ⓗ四字標題
五字內容一　五字內容一　五字內容一
五字內容二　五字內容二　五字內容二
```

Line rules:

- Line 1, 5, and 9 are title lines.
- Lines 2, 3, 10, and 11 contain three five-Han-character surrounding phrases.
- Line 6 contains left and right five-Han-character surrounding phrases plus one five-Han-character center phrase.
- Line 7 contains left and right five-Han-character surrounding phrases plus the center marker `◎◎◎◎◎`.
- Line 4 and line 8 are completely blank.
- Use one full-width space `　` between columns.
- The first visible character of the card is `Ⓐ`.
- The center title cell on line 5 is exactly `◎◎◎◎◎`.
- The center cell on line 7 is also exactly `◎◎◎◎◎` unless the user explicitly asks for a second center sentence.
- Do not add explanations above or below the card unless the user explicitly asks.

## Cell Rules

Surrounding title rows:

- Use the labels `Ⓐ`, `Ⓑ`, `Ⓒ`, `Ⓓ`, `Ⓔ`, `Ⓕ`, `Ⓖ`, `Ⓗ` in that order.
- Do not put a space after the label.
- Use exactly four Han characters after the label when possible, e.g. `Ⓐ輸入來源`.
- Titles should work like index labels, not sentences.
- Titles may preserve a functional role, but must be rewritten to fit the material.

Content rows:

- Every surrounding content phrase must be exactly five Han characters.
- The center line on line 6 must be exactly five Han characters.
- The center line on line 7 should be `◎◎◎◎◎` by default.
- Do not use English, digits, punctuation, emoji, or spaces in surrounding content phrases or the line 6 center phrase.
- Rewrite terms such as AI, Agent, FIRE, Hermes, JSON, API, and app names into compact Chinese when possible.
- Write in modern plain language. Avoid over-classical phrasing.
- If source material is thin, infer responsibly from the surrounding meaning.

Center cell:

- Use `◎◎◎◎◎` only as the displayed center title.
- Internally choose a specific center title of about five Han characters to guide the card.
- The line 6 center content must summarize and integrate the eight surrounding angles.
- The line 7 center marker creates a visual axis and should remain `◎◎◎◎◎` in 2.01 default output.
- The center should not repeat a surrounding title.

## Orthogonal Eight-Angle Map

Use this order unless the user gives a different map:

- `Ⓐ` source / trigger: Where does this begin?
- `Ⓑ` input / material: What is being read or transformed?
- `Ⓒ` recognition / method: How is the pattern identified?
- `Ⓓ` output / expression: What form does it become?
- `Ⓔ` process / thread: What sequence makes it work?
- `Ⓕ` storage / place: Where is it saved or remembered?
- `Ⓖ` constraint / avoid: What must be avoided?
- `Ⓗ` next action: What is the next concrete move?

For non-process topics, keep the spatial order but rename the titles semantically. The eight angles must still be different kinds of attention, not eight synonyms.

Orthogonality test:

1. Restate the eight roles internally in one short list.
2. Check whether any two cells answer the same question.
3. If two cells overlap, split them by function, time, object, risk, or action.
4. Only output the card after the eight cells are distinct.

## CJK And Hard-Line Rules

Hard line breaks are part of the artifact.

- Do not rely on automatic wrapping to create rows.
- Use actual newline characters between the 11 physical lines.
- Keep each title compact so TheBrain and chat previews are less likely to wrap.
- Use full-width column separators, not tabs.
- Avoid ambiguous layout based on repeated half-width spaces.
- If a preview collapses whitespace, the clipboard text can still be correct; prefer code blocks in chat and raw hard-line text in TheBrain insertion.

## Forbidden Output

Do not output:

- Markdown tables.
- Vertical rails such as `|`.
- ASCII borders such as `+----------+`.
- Box drawing.
- HTML as the primary answer.
- Numbered explanations before the card.
- The internal orthogonality checklist.
- Multiple alternate cards unless asked.

## Example

```text
Ⓐ健康復節　Ⓑ書稿收束　Ⓒ財流降噪
羽球慢回身　書章拉中心　訂閱先盤點
跑走養節奏　青蛙先寫書　現流養書路

Ⓓ家人點火　◎◎◎◎◎　Ⓔ人脈成路
問夢不說教　二九週計劃　約談留三卡
陪走百年路　◎◎◎◎◎　好友接技能

Ⓕ內在放下　Ⓖ日文沉澱　Ⓗ休閒充電
少說更點火　句子先編號　合唱鬆心身
不急證明我　接詞成路徑　吉他聽太陽
```

## Validation Gate

Before returning a 2.01 card, check:

- There are exactly nine cells.
- The output has exactly 11 physical lines.
- Lines 4 and 8 are blank.
- Title rows use `Ⓐ` through `Ⓗ` and center `◎◎◎◎◎`.
- Every surrounding title has four Han characters directly after its label when possible.
- Every surrounding content cell has exactly five Han characters.
- Line 6 center content has exactly five Han characters.
- Line 7 center cell is `◎◎◎◎◎` by default.
- The eight surrounding cells are orthogonal and not synonym repeats.
- No Markdown table, rails, ASCII border, HTML, or explanatory text appears in the default output.

If any check fails, rewrite the card instead of explaining the failure.

## Legacy Modes

Use legacy PE2, bordered, HTML, or renderer-based output only when the user explicitly asks for:

- PE2.
- Boxed text.
- Visible borders.
- Old mobile UI.
- HTML preview.
- Deterministic renderer debugging.

For legacy rendering, use `scripts/imandalart_card.py` and read `references/imandalart-style.md` only when those legacy modes are relevant. Do not use the PE2 renderer for the default 2.01 pure-text card.
