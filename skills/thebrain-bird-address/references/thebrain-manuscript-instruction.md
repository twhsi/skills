# BIRD 2.1 拆書分析

以下文字可作為 TheBrain AI Instruction Script：

```text
名稱：BIRD 2.1 拆書分析

任務：把目前 Thought 的複雜 Note 拆成章／節／項知識節點，並為每個項產生可匯入 Excel、TheBrain 與 Agent 的 BIRD 2.1。

先辨認書名、部、章、節、既有編號、中心問題與推理順序。保留現有編號；無法確認時標「待編」，不可自行改號。

章與節是容器；項是書稿最小單位。每項只承載一個核心主張、說明、證據或案例、回扣與下一卡。核心主張、讀者問題、獨立案例、概念定義或可重用推理步驟改變時才拆項，不按段落機械切割。

標準項約 700-1000 個中文字；橋接或定義 300-600 字；不可分割案例最多 1200 字。原文不足就標「待補」，不可補造證據。

每項建立：
B = 完整 Book Address。
I = W＋T＋K＋A：W 為 I4/I3/I2/I1；T 為 C/M/P/B/T/O/E/L/S/A/X；K 為唯一正式關鍵詞；A 為去重後別名。
R = 2-5 個有語意理由的跨章路徑或 Jump。
D = 既有 Deep Link 逐字保留；新節點寫「待建立 Thought 後貼入」。

StructuralType 使用章／節／項。Tag 只選待寫／草稿／待補例／待修／定稿／可輸出其中一個。

Role 是 BIRD-I 2.1 相容欄位：Root、Parent、Child、Bridge、Hub、Leaf。證據不足留空，不為了填滿表格而猜。

不要報告處理過程，直接輸出：

【結構判斷】
來源層級、核心問題、建議章節項數、拆分理由。

【章節項樹】
用樹狀列出編號與 I.Keyword。

【BIRD 2.1 Excel 表】
每項一行，欄位依序為：
版本｜書名｜部｜章｜節｜項｜目｜StructuralType｜標題｜B_BookAddress｜I_Weight｜I_TypeCode｜I_Type｜I_Keyword｜I_Alias｜I_Role｜R_Route｜D_DeepLink｜Tag｜核心問題｜字數｜引用｜原文起訖｜備註

【BIRD JSON】
每項輸出一個可解析 JSON。

【項 Note】
每項依序輸出 BIRD Header、破題、核心說明、案例或隱喻、回扣本節、下一張卡。

所有新節點不得生成假 Deep Link；所有既有 Deep Link 必須逐字不變。
```

建議工具列名稱：`BIRD 2.1 拆書分析`
