# Roam Research JSON Import

Use this reference when converting BIRD 2.0 objects or Excel rows into a file that Roam Research can import.

## Official Contract

Roam's public help graph defines these rules:

- The uploaded JSON root is an array of pages.
- A Page requires `title`; supported optional keys include `children`, times, and edit user.
- A Block requires `string`; supported optional keys include `children`, `uid`, times, `heading`, and `text-align`.
- Array order defines block order.
- Matching page titles merge with existing page content.
- A conflicting block `uid` fails the import. Standard Roam UIDs are usually nine characters, but the field is optional.
- Undefined keys are ignored.

Authoritative pages:

- [Roam Help: JSON Schema](https://roamresearch.com/#/app/help/page/Nxz8u0vXU)
- [Roam Help: Import](https://roamresearch.com/#/app/help/page/m6jiiw1bO)

## BIRD Mapping

| BIRD source | Roam destination |
|---|---|
| `BookCode + title/keyword` | Page `title` |
| `version` | Heading block |
| `B_BookAddress` | `B::` attribute block |
| `I_Weight + I_TypeCode + I_Keyword` | `I::` attribute block |
| `I_Alias` | `A::` block with page references |
| `R_Route` | `R::` block with ordered page references |
| `D_DeepLink` | Exact `D::` block text |
| `StructuralType` | `Structural Type::` block |
| `Tag` | `Workflow Status::` block |
| `I_Role` | `Semantic Role::` block |
| `Note正文` | `Manuscript Note` heading with paragraph children |

Do not add BIRD fields as unknown JSON object keys. Put them into supported Roam blocks so they survive import.

## Example

```json
[
  {
    "title": "3.4.D.B Eight Rocks Weekly Review",
    "children": [
      { "string": "BIRD-2.0", "heading": 2 },
      { "string": "B:: Whole System/Part III/3.4/3.4.D.B" },
      { "string": "I:: I3 | S · Skill | [[Eight Rocks Weekly Review]]" },
      { "string": "A:: [[Weekly Review to 8 Rocks]]" },
      { "string": "R:: [[Weekly Review]] → [[Weekly Plan]]" },
      { "string": "D:: brain://example/weekly-review" },
      {
        "string": "Manuscript Note",
        "heading": 2,
        "children": [{ "string": "Review eight life areas, then choose one weekly rock for each." }]
      }
    ]
  }
]
```

## Safe Import

1. Run `node scripts/bird_to_roam_json.mjs bird.json roam-import.json`.
2. Parse the output and confirm the root is an array.
3. Confirm every page has a unique, non-empty `title`.
4. Confirm every block has a non-empty `string` and no `uid` unless intentionally preserved.
5. Compare every `D::` value with the source BIRD record.
6. Import into a new or test graph through Roam's Import Files flow and select JSON.
7. Inspect page counts, hierarchy, routes, and manuscript paragraphs before importing into the main graph.
