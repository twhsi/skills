# BIRD 2.1 Excel Schema

## BIRD分析

Use one knowledge node per row in this exact order:

```text
版本	書名	部	章	節	項	目	StructuralType	標題	B_BookAddress	I_Weight	I_TypeCode	I_Type	I_Keyword	I_Alias	I_Role	R_Route	D_DeepLink	Tag	核心問題	字數	引用	原文起訖	備註
```

Rules:

- Set `版本` to `BIRD-2.1`. Keep Role blank unless it is intentionally assigned from sufficient evidence.
- Keep `B_BookAddress` unique for each structural node.
- Use only `I4/I3/I2/I1` in `I_Weight`.
- Use only controlled codes in `I_TypeCode`; write the matching English type in `I_Type`.
- Put one canonical term in `I_Keyword`; separate aliases with ` | `.
- Leave `I_Role` blank unless supported. Do not fill every row for visual completeness.
- Store ordered routes with ` -> `; use ` | ` only for unordered targets.
- Put only exact verified URIs in `D_DeepLink`; leave new nodes blank.
- Count Chinese manuscript characters consistently and document the counting convention in `備註` when relevant.

## 拆書正文

Use this order:

```text
B_BookAddress	標題	BIRD_JSON	Note正文	來源段落	待補材料
```

Store valid compact JSON in `BIRD_JSON`. Keep source excerpts short enough for traceability; do not duplicate an entire copyrighted source when the user does not own or provide it.

## 代碼表

Create separate table blocks for:

- Weight: `I4/I3/I2/I1` and definitions.
- Index Type: `C/M/P/B/T/O/E/L/S/A/X` and definitions.
- Semantic Role: `Root/Parent/Child/Bridge/Hub/Leaf` and evidence rules.
- StructuralType: `書/部/章/節/項`.
- Tag: `待寫/草稿/待補例/待修/定稿/可輸出`.

## 舊表對照

Create only for legacy migration. Map:

| Legacy | BIRD 2.1 |
|---|---|
| 書名/部/章/節/項/目 | B_BookAddress components |
| 標題 | I_Keyword or display title |
| 標題Alisa | I_Alias |
| URL | D_DeepLink |
| 關鍵字 | candidate I_Keyword/I_Alias |
| 權重第一/二/三 | migrate by analysis; do not copy directly into I_Weight |
| 遠距Jump | R_Route |

## Workbook Validation

- Confirm all required sheets and headers exist.
- Confirm row counts match between item rows in `BIRD分析` and `拆書正文`.
- Confirm valid Weight/Type codes and matching Type names.
- Confirm no duplicate Book Address.
- Confirm Deep Links are blank or begin with a supplied valid scheme and remain unchanged.
- Confirm JSON parses and matches the normalized columns.
- Freeze row 1, enable filters, wrap text, and inspect representative rows visually.
