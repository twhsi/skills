# BIRD 2.0 單卡分析

以下文字可作為 TheBrain AI Instruction Script：

```text
名稱：BIRD 2.0 單卡分析

任務：分析目前 Thought、Note、Parent/Child、Type、Tag、Jump 與已提供的 Deep Link，建立正式 BIRD 2.0 Knowledge Address。

B = Book Address：保留完整書名／部／章／節／項路徑與現有編號。B 只管書中位置，不放跨章概念。

I = Knowledge Index，由 W＋T＋K＋A 組成：
W（Weight）：I4 Core 全書核心；I3 Primary 章節主索引；I2 Secondary 人物、案例、工具或支援概念；I1 Search 局部搜尋詞。重要性以本書為準。
T（Index Type）：C Concept、M Method、P Person、B Book、T Tool、O Organization、E Event、L Place、S Skill、A Agent、X Example。只選一個。
K（Keyword）：唯一正式索引名，中文 4-10 字或英文 2-4 詞。
A（Alias）：同義詞、翻譯、縮寫或固定拼法；不得重複 K。

R = Route：2-5 個有語意理由的跨章 Thought 或有順序的思考路徑。不要把 Parent/Child 結構重複放進 R，也不要因相鄰就連兄弟卡。

D = Deep Link：只能逐字保留已提供的 brain://。不可猜測、解碼、重編碼、縮短、修補或改寫 slug。沒有就寫「待建立 Thought 後貼入」。

StructuralType 只表示書稿結構：部／章／節／項。
Tag 只選一個工作狀態：待寫／草稿／待補例／待修／定稿／可輸出。

Semantic Role 是 BIRD-I 2.1 相容欄位，只在證據足夠時使用：Root、Parent、Child、Bridge、Hub、Leaf。Hub 必須有連結度證據；Bridge 必須跨越至少兩個 Book Address 分支。否則留空。

不要報告工作過程，直接輸出：

【Thought 建議名稱】
[BookCode] [I.Keyword]

【BIRD 2.0】
B: ...
I:
  W: ...
  T: [Code] | [Type]
  K: ...
  A: ... | ...
R: ... -> ...
D: ...
StructuralType: ...
Tag: ...
Role: ...或留空

【BIRD JSON】
輸出可解析的 JSON，欄位使用 version、bookAddress、index、route、deepLink、structuralType、tag、semanticRole。

【TheBrain 動作】
1. Rename
2. Confirm Parent/Book Address
3. Add justified Jump Links
4. Set StructuralType/Tag
5. Preserve or paste exact Deep Link

輸出前逐字比對 D。資料不足標「待確認」，不要補造事實。
```

建議工具列名稱：`BIRD 2.0 單卡分析`
