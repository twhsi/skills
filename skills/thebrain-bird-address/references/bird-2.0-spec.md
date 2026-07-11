# BIRD 2.0 Protocol

## B - Book Address

Use the most specific verified structural address. Prefer a complete path for human display and a compact code for joins when both exist.

```text
BookPath: 全系統/第三部/3.4/3.4.D/3.4.D.B
BookCode: 3.4.D.B
```

Book Address describes publication location. Cross-chapter meaning belongs in Route.

## I - Knowledge Index

Represent Index as `W + T + K + A`.

### W - Weight

Assign importance relative to the current book:

| Code | Name | Rule |
|---|---|---|
| I4 | Core | Required to explain the book's central thesis; recurs across major parts |
| I3 | Primary | Drives one chapter or major section |
| I2 | Secondary | Supports the argument as a person, case, tool, method, or sub-concept |
| I1 | Search | Useful retrieval term appearing locally without structural importance |

Use one Weight only. Do not assign I4 merely because a term is famous or frequently repeated.

### T - Index Type

| Code | Type | Meaning |
|---|---|---|
| C | Concept | idea, theory, abstract construct |
| M | Method | repeatable method, framework, procedure |
| P | Person | person or named thinker |
| B | Book | book or publication |
| T | Tool | software, device, or instrument |
| O | Organization | company, institution, community |
| E | Event | dated or named event |
| L | Place | physical or virtual location |
| S | Skill | executable capability or learned skill |
| A | Agent | autonomous or semi-autonomous actor |
| X | Example | concrete case, story, metaphor, or demonstration |

Choose one primary Index Type. Use Route to connect secondary interpretations.

### K - Keyword

Use one canonical name. Prefer the term the book teaches readers to remember. Keep it concise, discriminating, and stable across chapters.

### A - Alias

Include only genuine synonyms, translations, abbreviations, historical names, and established spelling variants. Deduplicate case-insensitively where practical. Do not include the canonical Keyword itself or explanatory sentences.

## R - Route

Store an ordered list when sequence matters, otherwise store a set of targets. A Route should express conceptual movement, not merely proximity.

Examples:

```text
馬爾薩斯 -> 達爾文 -> TARS -> 半人馬 -> 下一本書
FIRE -> 關鍵字索引 -> 語意搜尋 -> AI對話
```

## D - Deep Link

Store an exact application URI such as `brain://`, `obsidian://`, or another supplied permanent identifier. Never synthesize it from a title.

## BIRD-I 2.1 Semantic Role

Keep `Role` optional in 2.0 and compatible with 2.1:

| Role | Evidence rule |
|---|---|
| Root | explicit origin or governing concept of a route |
| Parent | semantically broader than identified child nodes |
| Child | semantically narrower than an identified parent concept |
| Bridge | connects at least two distinct Book Address branches |
| Hub | graph evidence shows unusually high meaningful connectivity; do not infer from prose alone |
| Leaf | terminal concrete case/example with no narrower route in current scope |

Do not use Role as another importance score. Weight answers importance; Type answers kind; Role answers graph function.

## Canonical JSON

```json
{
  "version": "BIRD-2.1-preview",
  "bookAddress": "4.3.2",
  "index": {
    "weight": "I4",
    "typeCode": "C",
    "type": "Concept",
    "keyword": "卡片盒",
    "aliases": ["Zettelkasten", "Slip Box", "Slip-box"]
  },
  "route": ["4.3.4", "5.1.1"],
  "deepLink": "brain://...",
  "structuralType": "項",
  "tag": "草稿",
  "semanticRole": "Hub"
}
```
