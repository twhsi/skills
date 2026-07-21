# BIRD 2.1 Manuscript Structuring

## Segmentation Test

Create a new item when the core claim, reader question, independent case, definition, or reusable reasoning step changes. Do not split merely because a paragraph is long, and do not merge two claims to meet a word target.

## Required Output

```text
【結構判斷】
來源層級：章／節／項
核心問題：...
建議結構：1章／N節／N項
拆分理由：...

【章節項樹】
[章編號] 章名
├── [節編號] 節名
│   ├── [項編號] 項名
│   └── [項編號] 項名

【BIRD 2.1 清單】
BookAddress | StructuralType | I.Weight | I.TypeCode | I.Keyword | I.Alias | Role | Route | DeepLink | Tag

【BIRD JSON】
每項一個標準 JSON 物件。

【項 Note】
## [項編號] [I.Keyword]
---
BIRD-Version: 2.0
B: ...
I-Weight: I3
I-Type: M | Method
I-Keyword: ...
I-Alias: ... | ...
I-Role: Bridge
R: ... -> ...
D: 待建立 Thought 後貼入
StructuralType: 項
Tag: 草稿
Question: ...
---

### 破題
...

### 核心說明
...

### 案例或隱喻
...

### 回扣本節
...

### 下一張卡
...
```

For an existing Thought, preserve its verified Deep Link byte-for-byte. For a proposed Thought, keep Deep Link pending.
