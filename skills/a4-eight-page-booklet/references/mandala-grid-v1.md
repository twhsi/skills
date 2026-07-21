---
mandala: true
skill: eight-page-booklet
version: "1.0"
---

# 八頁小書 Skill 1.0｜Mandala-Grid 人工閱讀版

<!--section: 1-->

## 1｜◎八頁小書

把文章、日計畫、FIRE 分析、iMandalArt 九宮、iMessage 九宮 HyperCard，轉成一張 A4 可列印、可折、可剪的八頁小書。核心不是排版炫技，而是讓 AI 協助每天生成一冊可手讀、可手寫、可複習的紙本思考物。

<!--section: 1.1-->

## 1.1｜觸發語

- 八頁小書
- A4 小書
- 可印製檔 PDF
- 滿八頁
- 單張印出八頁
- 折頁小書
- AI 驅動紙本小書
- 把這段文字做成八頁小書

<!--section: 1.2-->

## 1.2｜輸入源

- 原始文章或章節草稿
- 今日日計畫與青蛙任務
- FIRE 分析卡
- iMandalArt 3x3 九宮
- iMessage 九宮 HyperCard
- 使用者提供的舊版八頁小書 PDF 模板
- 手寫版或截圖量化後的 SVG 格線

<!--section: 1.3-->

## 1.3｜內容引擎

- FIRE：把文章拆成 Fact、Index、Relation、Encyclopedia。
- iMandalArt：用中心與八個外圍節點建立小書骨架。
- iMessage 九宮 HyperCard：把第 3-8 頁壓成手機可讀的短卡。
- Daily Plan：把任務、時段、青蛙、回顧變成每日紙本冊。
- Mixed Mode：把知識、行動、回顧放進同一冊。

<!--section: 1.4-->

## 1.4｜八頁模型

1. 封面：主題、日期、中心問題。
2. 總覽：FIRE、九宮或路線圖。
3. 轉場：從輸入材料轉到核心問題。
4. 核心：中心目標或主張。
5. 方法：八領域、流程或關係。
6. 修訂：阻礙、錯誤、待證、重寫。
7. AI：模型如何協助推進。
8. 行動：今天或下一步怎麼做。

<!--section: 1.5-->

## 1.5｜輸出流程

1. 先做 Markdown 或 Mandala-Grid 人工閱讀版。
2. 生成 `page-01.pdf` 到 `page-08.pdf` 八個單頁 PDF。
3. 單頁 PDF 全部保持正向，方便逐頁檢查。
4. 再拼成一張 A4 橫式可印製 PDF。
5. 保留 companion Markdown，放長 Context、路徑、規則與來源。

<!--section: 1.6-->

## 1.6｜拼版規則

- 紙張：A4 landscape。
- 版面：4 欄 x 2 列。
- 上排左到右：`6, 7, 8, 1`，全部正向。
- 下排左到右：`5, 4, 3, 2`，全部旋轉 180 度。
- 這個旋轉只用在 A4 拼版；八個單頁 PDF 不旋轉。
- 若使用者提供模板，要先渲染成 PNG 目視確認，不只看 PDF metadata。

<!--section: 1.7-->

## 1.7｜驗證清單

- A4 拼版 PDF 是一頁。
- A4 尺寸是 landscape。
- 上排倒置、下排正向。
- 中文字型正確顯示，不缺字。
- 沒有文字壓線或互相重疊。
- 至少檢查一張單頁 PDF 是正向。
- 回覆使用者時附上 PDF 路徑、單頁資料夾、預覽圖。

<!--section: 1.8-->

## 1.8｜1.0 邊界

1.0 先求穩定的黑白列印、正確翻轉、可讀內容。先不要追求彩色、複雜圖像、全自動排版美術。長文字放 companion Markdown；紙面只放可讀、可折、可手寫的核心內容。下一版再加入模板座標校準、批次每日生成、Obsidian 日計畫自動取材。
