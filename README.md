# Yongxi LLM Skill Registry

> 讓 AI 協助週檢視、卡片筆記、寫作出版與知識工作流；把重複結構交給 LLM，人保留慢判斷、關係、節奏與幸福感。

This is a public registry of reusable thinking skills for mainstream LLMs: ChatGPT, Claude, Gemini, Codex, Hermes, and other agentic clients.

[![Hermes All Skills Map](assets/hermes-all-skills-map.png)](assets/hermes-all-skills-map.png)

## 這個 repo 是什麼

`twhsi/skills` 是一套可安裝、可分享、可被主流 LLM 讀取的 Skill 庫。它把我長年使用的週檢視、九宮格、FIRE 分析、卡片筆記、EPUB 出版、HyperCard 回流與 Desktop 工作流，整理成可以被 AI 重複執行、被人類檢查與改良的公開流程。

這裡的核心不是讓人變成更快的機器，而是讓 AI 燒 tokens 處理繁瑣的結構工作，讓人腦回到慢生活：身體、家人、朋友、寫作、財務、學習、休閒，以及那個更安靜的問題：

> 那件事情能帶來真正的幸福與寧靜？

最新焦點是 [`weekly-reverse-review`](skills/weekly-reverse-review/)：把年計劃、百年人生計劃、上週檢視、七天日記、行事曆與 inbox 雜事，反向整理成下一週的 8 Big Rocks。

## Featured: iMandalArt 2.01

[`skills/imandalart`](skills/imandalart/) is the featured card skill in this repository.

iMandalArt 2.01 turns any source material into one hard-line 3x3 thinking card:

- Eight orthogonal angles labeled `Ⓐ` through `Ⓗ`.
- A double `◎◎◎◎◎` center axis.
- Exactly 11 physical text lines.
- Compact plain-text output that survives copy/paste into note apps, chat clients, and TheBrain/Cerebro previews.

Current status: iMandalArt 2.01 is optimized for CJK workflows. It uses five-Han-character rows, full-width column spacing, and hard line breaks. An English-native card rhythm is planned for a future version.

Use cases:

- Weekly planning: compress health, writing, money, family, network, study, rest, and next action into one scan.
- Writing focus: turn scattered notes into a center line plus eight non-overlapping editorial directions.
- Knowledge capture: create a stable plain-text card that mainstream LLMs can generate and humans can paste into notes.

Example CJK-friendly 2.01 card:

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

## Featured: Weekly Reverse Review

[`skills/weekly-reverse-review`](skills/weekly-reverse-review/) turns a weekly review into an AI-assisted reverse planning loop.

This skill comes from a weekly review practice that has been iterated for nearly twenty years. The surprising part was not that AI could summarize a week. The surprise was that AI could burn tokens on the exhausting structure work, while the human keeps the most important judgment: which actions bring real happiness and peace.

The review collects four angles before writing the next week:

- `YEAR`: annual plan and hundred-year life plan.
- `Week`: last weekly plan and weekly review.
- `Day`: daily plans, seven-day diary notes, and calendar evidence.
- `Inbox`: loose tasks, reminders, subscriptions, errands, and collected noise.

Why it matters:

- Brain load saved: an 11-step review that used to take two to three uninterrupted hours can become lighter and less draining.
- More perspective: AI can compare long-range meaning, actual days, calendar traces, and inbox noise without forcing everything into one flat task list.
- Better weekly rocks: the output protects health, family, rest, money, writing, people, learning, and inner life in one compact plan.
- Reverse wish list: it asks what should be smaller, slower, deleted, delayed, or kept as presence instead of achievement.

Example weekly output in the fixed weekly layout:

```text
Ⓕ內在放下　Ⓒ財流降噪　Ⓖ日文沉澱
少說更點火　訂閱先盤點　句子先編號
不急證明我　現流養書路　接詞成路徑

Ⓑ書稿收束　◎◎◎◎◎　Ⓓ家人點火
書章拉中心　幸福寧靜週　問夢不說教
青蛙先寫書　◎◎◎◎◎　陪走百年路

Ⓔ人脈成路　Ⓐ健康復節　Ⓗ休閒充電
約談留三卡　羽球慢回身　合唱鬆心身
好友接技能　跑走養節奏　吉他聽太陽
```

Core question:

> 那件事情能帶來真正的幸福與寧靜？

Default answer:

> 少說，陪伴，慢慢做。

## 指揮官入口

先看這裡：**[`Hermes.md`](Hermes.md)**

`Hermes.md` 是這個 repo 的指揮官，負責統一調度時間聚焦、卡片筆記、LLM Skill、Desktop 工作桌與新書連結。這裡不是單純工具箱，而是一套 Hermes HyperCard Loop：把「收集 → 結構化 → 連結 → 輸出 → 迭代」變成可重複的知識工作流程。

## FIRE 總整理

```text
　　　　　　　　　　【Ⓕ Fact 事實】
　　　　　　　　　　定義：技能總圖
　　　　　　　　　　主張：人機分工
　　　　　　　　　　證據：八類入口


　　　　　↗　　　　　　　　　　　　　　　↘
　　【Ⓘ Index】　　　中【◎核心】　　　【Ⓡ Relation】
　　　重新入口　　　　◎技能中樞　　　　關係網絡
　　　────────　────────　────────
　　　Hermes.md　　　All Skills　　　　時間聚焦
　　　四軸首頁　　　　知識工作　　　　　卡片成書
　　　書籍連結　　　　慢快分工　　　　　LLM沉澱


　　　　　↖　　　　　　　　　　　　　　　↙
　　　　　　　　　　【Ⓔ Encyclopedia】
　　　　　　　　　　概念：技能作業系統
　　　　　　　　　　用途：書稿到桌面
　　　　　　　　　　判斷：人留慢想
```

**F｜Fact**

- 這個 repo 管理多個可安裝、可被主流 LLM 讀取的 Skills，核心是 `Hermes.md`。
- 圖中把技能分成時間聚焦、FIRE 分析、Graph 視圖、九宮卡片、LLM Skill、EPUB 出版、HyperCard 回流、書籍連結。
- 北極星是「重複結構交給 LLM，人保留慢判斷」。

**I｜Index**

- 入口頁：[`Hermes.md`](Hermes.md)
- 書籍連結：[`docs/book-links.md`](docs/book-links.md)
- Skill 索引：[`docs/skill-index.md`](docs/skill-index.md)

**R｜Relation**

- 時間管理產生每日焦點，九宮卡把焦點壓成可讀卡片。
- FIRE 抽取知識骨架，Graph view 建立章節與關鍵字關係。
- JSON、EPUB、HyperCard、Obsidian 形成「出版 → 回流 → 再整理」循環。

**E｜Encyclopedia**

Hermes All Skills 是一個知識工作者的技能作業系統。它把人的慢思考、桌面工作流、主流 LLM、自動化腳本、GitHub 分享與書籍連結放在同一張圖裡，讓每個 Skill 都不是孤立工具，而是能回到日常、書稿與知識庫的循環節點。

## 八個入口

| # | 入口 | 作用 | Skill |
|---|---|---|---|
| 1 | 時間聚焦 | 今日、本週、長期訓練與章節重心 | [`weekly-reverse-review`](skills/weekly-reverse-review/), [`imandalart`](skills/imandalart/), [`personal-athlete-81-grid`](skills/personal-athlete-81-grid/) |
| 2 | FIRE 分析 | Fact / Index / Relation / Encyclopedia | [`fire-analysis-card`](skills/fire-analysis-card/) |
| 3 | Graph 視圖 | 關鍵字、章節、卡片關係圖 | [`obsidian-graph-view`](skills/obsidian-graph-view/) |
| 4 | 九宮卡片 | 邏輯想法、手機可讀、Markdown 九宮 | [`imandalart`](skills/imandalart/), [`markdown-nine-grid-clipboard`](skills/markdown-nine-grid-clipboard/) |
| 5 | LLM Skill | Prompt → JSON → LLM → Hermes | [`docs/skill-index.md`](docs/skill-index.md) |
| 6 | EPUB 出版 | 卡片成書、Project Note、JSON → EPUB | [`project-note-json-to-epub`](skills/project-note-json-to-epub/) |
| 7 | HyperCard 回流 | EPUB → 卡片盒 → Obsidian → 知識循環 | [`epub-hypercard-obsidian`](skills/epub-hypercard-obsidian/) |
| 8 | 書籍連結 | 書中 QR、章節工具入口、Companion Docs | [`docs/book-links.md`](docs/book-links.md) |

## 四軸首頁

### 1. 時間管理軸

把「今天、本週、長期訓練、新書進度」整理成可執行節奏。

- [`skills/imandalart/`](skills/imandalart/)：每日重心、章節重心、手機九宮卡。
- [`skills/weekly-reverse-review/`](skills/weekly-reverse-review/)：把年計劃、週檢視、日記、行事曆與 inbox 反向整理成下週 8 Big Rocks。
- [`skills/personal-athlete-81-grid/`](skills/personal-athlete-81-grid/)：長期目標與 8+64 行動展開。
- [`skills/fantastical-calendar/`](skills/fantastical-calendar/)：把 LLM 產生的會議、時段與提醒送進 Fantastical。

### 2. 卡片筆記軸

把文章、筆記、索引、章節拆成可連結、可出版的知識卡片。

- [`skills/fire-analysis-card/`](skills/fire-analysis-card/)：用 FIRE 分析中文文章。
- [`skills/weekly-reverse-review/`](skills/weekly-reverse-review/)：把週檢視材料轉成 FIRE 診斷、反向願望清單與 iMandalArt 週計劃。
- [`skills/imandalart/`](skills/imandalart/)：把概念壓成 3x3 方形索引卡。
- [`skills/markdown-nine-grid-clipboard/`](skills/markdown-nine-grid-clipboard/)：輸出 Obsidian、AIDA、GitHub 可讀的 Markdown 九宮格。
- [`skills/obsidian-graph-view/`](skills/obsidian-graph-view/)：把關鍵字、章節、卡片做成 Obsidian 風格 graph。

### 3. LLM 軸向

把反覆發生的工作沉澱成 Skill，讓主流 LLM 記得流程、格式、驗證方式。

- [`skills/project-note-json-to-epub/`](skills/project-note-json-to-epub/)：把 project-note JSON 變成可驗證 EPUB。
- [`skills/epub-hypercard-obsidian/`](skills/epub-hypercard-obsidian/)：把 EPUB 卡片書轉成 Obsidian HyperCard 資料夾。
- [`docs/skill-index.md`](docs/skill-index.md)：Skill 索引。

### 4. Desktop 軸向

把 LLM 之外的工作桌納入系統：ChatGPT、Claude、Gemini、Codex、Obsidian、AIDA、Bike、Finder、VS Code、紙本、手機、桌面硬體。

- 快速轉換交給 LLM。
- 深層判斷留給人腦。
- 長期記憶交給卡片系統。
- 公開分享交給 GitHub。
- 慢想、重讀、畫線、沉澱交給紙本與桌面環境。

## Install Locally

從 repo 根目錄把需要的 Skill 複製到本機 skills 目錄。以下路徑以 Codex skill runtime 為例：

```bash
cp -R skills/fire-analysis-card ~/.codex/skills/
cp -R skills/imandalart ~/.codex/skills/
cp -R skills/weekly-reverse-review ~/.codex/skills/
cp -R skills/markdown-nine-grid-clipboard ~/.codex/skills/
cp -R skills/obsidian-graph-view ~/.codex/skills/
cp -R skills/personal-athlete-81-grid ~/.codex/skills/
cp -R skills/project-note-json-to-epub ~/.codex/skills/
cp -R skills/epub-hypercard-obsidian ~/.codex/skills/
cp -R skills/fantastical-calendar ~/.codex/skills/
```

更多說明：[`docs/install.md`](docs/install.md)

## Book Links

新書可連到固定 GitHub URL：

```text
https://github.com/twhsi/skills
```

每章延伸工具整理在：[`docs/book-links.md`](docs/book-links.md)

書中可用句型：

```markdown
本章延伸 Skill: https://github.com/twhsi/skills/tree/main/skills/imandalart
```

## Website

這個 repo 也可以部署成免費的 LLM-friendly website：

- Source：`site/`
- Build：`npm run build`
- Output：`dist/`
- LLM endpoints：`/agent.json`、`/skills.json`、`/llms.txt`
- Free deploy：GitHub repo -> Vercel build -> Cloudflare DNS

Vercel 設定已放在 [`vercel.json`](vercel.json)：build command 使用 `npm run build`，output directory 使用 `dist`。

## Repo Layout

```text
assets/      首頁圖像與公開展示素材
skills/      正式、可安裝、可分享的 Skills
docs/        安裝說明、書籍連結、索引與操作文件
examples/    每個 Skill 的輸入、輸出、測試樣本
archive/     舊版、草稿、暫不公開或已退役的 Skill
Hermes.md    四軸管理總控台
README.md    GitHub 首頁與讀者入口
```

## Maintain

建議每次修改 Skill 後驗證：

```bash
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/imandalart
```

每週用 [`Hermes.md`](Hermes.md) 裡的 Weekly Hermes Sync 檢查：哪些 Skill 要升級、補範例、移到 archive，或變成新書章節連結。
