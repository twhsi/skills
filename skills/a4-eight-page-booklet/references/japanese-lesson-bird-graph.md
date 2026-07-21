
## Japanese Lesson BIRD Graph Workflow

Use this workflow when the source is a Japanese textbook lesson, especially when the user asks to treat textbook example sentences as Chunks, build a directory, index grammar and keywords, or derive Routes.

### Source hierarchy

- Treat the lesson as the Book container and preserve its printed part/section order.
- Inspect the lesson's `文型`, `例文`, `会話`, and `練習A` through `練習J` before selecting booklet sentences. If a section is not supplied or readable, record it as missing; never reconstruct it from memory and label it as source text.
- Use `Book Address` only for location: `みんなの日本語/第18課/第01部/基本文型/例句01`.
- Treat headings as structural containers and each pedagogically complete example or question-answer pair as a `Chunk` item.
- Keep a question and its answer together when the answer demonstrates the target grammar.
- Put teacher notes, vocabulary digressions, links, and later-lesson grammar under `補充ノート`; never silently mix them into the textbook directory.
- New nodes have an empty Deep Link and prose value `待建立 Thought 後貼入`.

### Canonical graph objects

Produce valid JSON with these top-level keys:

```json
{
  "schema_version": "bird-graph-json-1.0",
  "title": "みんなの日本語 第18課",
  "central_question": "辭書形如何把動作轉成能力、趣味與時間表現？",
  "directory": [],
  "keywords": [],
  "chunks": [],
  "routes": [],
  "edges": [],
  "deep_links": []
}
```

Every Chunk must contain `id`, `book_address`, `structural_type`, `section`, `source_text`, `translation` when supplied, `grammar_refs`, `keyword_refs`, and a canonical BIRD 2.1 `index` object with one Weight, one Index Type, one Keyword, deduplicated Aliases, and an optional evidence-based Semantic Role.

Use controlled BIRD types only. For language lessons, normally choose:

- `S | Skill` for an executable language pattern or production ability.
- `M | Method` for conjugation or sentence-building procedures.
- `C | Concept` for grammatical meaning.
- `X | Example` for a concrete textbook sentence or dialogue Chunk.

### 第18課 directory

```text
みんなの日本語/第18課
├── 第01部 基本文型
├── 第02部 普通に聞きましょう
├── 第03部 会話・趣味は何ですか
├── 第04部 動詞の辞書形
├── 第05部 できます
├── 第06部 趣味
├── 第07部 まえに
├── 第08部 音読・留白練習
├── 第09部 質問応答
├── 第10部 自分のことを話す
└── 補充ノート 教師語彙・延伸文法・外部リンク
```

### 第18課 canonical indexes

| W | T | Keyword | Aliases |
|---|---|---|---|
| I4 | M | 動詞辞書形 | 辞書形; 原型動詞; 普通形 |
| I4 | C | V辞書形＋こと | 動詞名詞化; こと名詞化 |
| I4 | S | V辞書形＋ことができます | 能力表現; 可能表現 |
| I3 | S | Nができます | 名詞能力表現 |
| I3 | S | 趣味はNです | 趣味表現 |
| I3 | S | 趣味はV辞書形＋ことです | 動作型趣味表現 |
| I4 | C | V辞書形＋まえに | 動作之前 |
| I3 | C | Nのまえに | 名詞之前 |
| I2 | C | 期間＋まえに | 時間以前 |
| I2 | S | なかなかVことができません | 不易實現 |
| I2 | S | 辞書形変換・第一類 | 五段動詞変換 |
| I2 | S | 辞書形変換・第二類 | 一段動詞変換 |
| I2 | S | 辞書形変換・第三類 | 不規則動詞変換 |

Vocabulary indexes are selective. Create one only when a word supports retrieval or a Route, such as `漢字`, `運転`, `趣味`, `写真`, `馬`, `北海道`, `食事`, `現金`; ordinary nouns confined to one sentence stay in the Chunk rather than becoming graph hubs.

### 第18課 Routes

Routes must express learning movement, not printed adjacency. Use these seven canonical routes and attach each supporting Chunk by ID:

1. `ます形 → 辞書形 → 辞書形変換三分類`
2. `動詞辞書形 → V＋こと → 動作名詞化`
3. `Nができます → V＋ことができます → 能力問答`
4. `趣味はNです → 趣味はV＋ことです → 個人化発話`
5. `V辞書形＋まえに → Nのまえに → 期間＋まえに`
6. `基本文型 → 会話文脈 → なかなかVことができません → 北海道提案`
7. `音読模倣 → 質問応答 → 自分のことを話す`

Recommended cross-route bridges:

- `読む` links 辞書形, 能力表現, and 基本文型.
- `写真を撮る` links 名詞化, 趣味, and 会話.
- `馬に乗る` links 能力, 趣味, and 北海道会話.
- `寝るまえに` links 辞書形 and 時間順序.

Do not route to `ないといけません`, `ています`, or `意向形` as core 第18課 nodes unless the source textbook section explicitly teaches them. Store those teacher-note extensions as `待建` supplementary targets.

### Booklet mapping

When creating an eight-page booklet from this graph, use Seven Routes mode:

1. Page 1: directory nine-grid plus keyword nine-grid.
2. Pages 2–8: the seven canonical Routes above, one Route per page.

Keep complete Japanese Chunks, translations, BIRD objects, and source distinctions in `companion.md`. Paper pages may shorten examples, but must retain the original Chunk IDs and Route references.

### Large-print and Voice Dream outputs

Create the three learner-facing artifacts from one page manifest:

- `print-a4-landscape.pdf`: one imposed A4 landscape page for physical folding.
- `reading-8-pages.pdf`: eight upright A7 pages for Voice Dream Reader.
- `editable-pages.docx`: eight editable A7 pages for Microsoft Word and Apple Pages.

Rules:

- Use Japanese only in all three learner-facing artifacts.
- Page 1 contains both the directory and grammar/keyword iMandalArt nine-grids.
- Use seven Routes on pages 2–8 and preserve full question-answer or dialogue units.
- Prefer 16–18 pt body text, 20–24 pt headings, strong contrast, short line length, and generous leading.
- Keep each sentence or speaker turn in its own paragraph so text-to-speech pause boundaries are natural.
- Do not place essential Japanese text inside raster images.
- Keep headers and footers short or omit them from the Voice Dream PDF when they would be spoken repeatedly.
- Use paragraph-level `page_break_before` for DOCX page starts. Do not use standalone manual page-break paragraphs, which can create blank pages in Apple Pages.
- Render and inspect all eight DOCX pages after conversion. Exactly eight nonblank pages must remain.

### Validation

- Confirm every textbook sentence appears in at least one Chunk; repeated drills may reference a canonical Chunk instead of duplicating its text.
- Confirm every `grammar_ref`, `keyword_ref`, Route target, and edge endpoint exists.
- Confirm no Route is merely a parent-child hierarchy link.
- Confirm every Index uses valid BIRD 2.1 Weight and Type codes.
- Confirm aliases do not duplicate canonical keywords.
- Confirm textbook content and supplementary notes remain distinguishable.
- Confirm proposed Deep Links are blank; never synthesize a `brain://` URI.
- For booklet output, also run the standard V1–V4 validation gate.
- For Japanese listening booklets, also run V5 source-fidelity and text-to-speech checks.
