# BookletManifest 2.0

Use this schema during the 2.0 alpha phase. Reject missing required fields; preserve unknown extension fields.

## Top Level

```json
{
  "schema_version": "2.0",
  "booklet": {},
  "sources": [],
  "pages": [],
  "routes": [],
  "citations": [],
  "render": {},
  "validation": {}
}
```

## Booklet

Require:

- `id`: stable booklet ID.
- `title`: human-facing title.
- `center_question`: central question or intention.
- `language`: normally `zh-Hant`.
- `page_count`: exactly `8`.
- `mode`: `classic`, `seven-routes`, `mandala-eight-angles`, `daily-paper-loop`, `pdf-repair`, or `legacy-direct`.
- `style`: render style identifier.

## Source

```json
{
  "id": "SRC-01",
  "type": "bird_graph",
  "title": "",
  "path": "",
  "uri": "",
  "summary": "",
  "verified": true
}
```

Do not claim URI or path verification without a successful current-run read. Keep supplied permanent URIs byte-for-byte.

## Page

```json
{
  "number": 1,
  "role": "overview",
  "title": "目錄與關鍵字",
  "subtitle": "1＋8＋64",
  "blocks": [],
  "route_refs": [],
  "source_refs": ["SRC-01"],
  "citation_refs": [],
  "notes": ""
}
```

Require page numbers 1–8 exactly once. Validate every reference against its corresponding collection.

## Block

```json
{
  "id": "P1B1",
  "type": "mandala",
  "variant": "directory-no-order",
  "data": {},
  "source_refs": ["SRC-01"]
}
```

Allow only `title`, `paragraph`, `bullets`, `quote`, `route`, `mandala`, `image`, `qr`, `write_area`, and `source_note` during alpha. Put renderer-specific coordinates in `render`, not in semantic content unless a supplied template requires fixed positions.

## Route

```json
{
  "id": "R1",
  "title": "地址生成網",
  "summary": "",
  "nodes": ["K1", "K2", "K3"],
  "source_route_refs": ["SOURCE-R1"],
  "merge_reason": ""
}
```

Require `merge_reason` when one reading Route represents multiple source Routes.

## Citation

```json
{
  "id": "CIT-01",
  "source_ref": "SRC-01",
  "locator": "",
  "note": "",
  "verified": false
}
```

Keep unverified claims explicit. Do not place long citations in small paper cells; route them to companion Markdown.

## Render

Store paper size, page size, safe inset, template ID, font choice, output names, and preview resolution. The canonical imposition is A4 landscape with top `4,3,2,1` rotated 180 degrees and bottom `5,6,7,8` upright.

## Validation

Represent every check as:

```json
{
  "id": "V3-IMPOSITION",
  "status": "pass",
  "method": "automated",
  "evidence": "previews/print-imposition.png",
  "notes": ""
}
```

Allow `pass`, `fail`, and `not-run`. Allow `automated`, `visual`, `physical`, and `mixed` methods. Never use `pass` without evidence from the current build.

