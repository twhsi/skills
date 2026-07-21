# BIRD 2.1 Monochrome Double Nine-Grid

Use this output when the user requests a printable double nine-grid, a left-directory/right-keyword card, or a picture suitable for black-and-white printing.

## Page contract

- Canvas: A4 landscape, aspect ratio `297:210`.
- Raster deliverable: `3508 × 2480` PNG.
- Print deliverable: one-page A4 landscape PDF.
- Editable source: SVG with a matching `3508 × 2480` viewBox.
- Ink: black only on a pure white background.
- Prohibit cell fills, gray backgrounds, gradients, shadows, textures, decorative illustrations, and color-dependent meaning.
- Distinguish hierarchy with font size, weight, line weight, double borders, solid/dashed borders, or labels—not color.
- Keep a safe outer margin of at least 8 mm. Prevent clipping and text overflow.

## Left grid: contents and Routes

Place the core BIRD object in the center.

| Main content | Route 1 | Main content |
|---|---|---|
| Main content | Core BIRD object | Main content |
| Main content | Route 2 | Route 3 |

- Use five verified or proposed table-of-contents nodes.
- Use exactly three meaningful ordered Routes when the source supports three; otherwise label unsupported cells `待補`, not fabricated paths.
- Show `B`, `StructuralType`, or status only when useful and legible.
- Use `待編` for unverified Book Addresses and `待建立 Thought 後貼入` for proposed Deep Links.

## Right grid: Knowledge Index

Place the core Knowledge Index in the center and eight retrieval-worthy Index objects around it.

For every surrounding cell, show:

1. `INDEX · I.W · I.T`;
2. canonical `I.K`;
3. one-line definition;
4. concise `I.A` or semantic extension when space permits.

Do not turn incidental nouns into Index objects merely to fill eight cells. Use `待補` when fewer than eight supported objects exist.

## Typography and borders

- Prefer `PingFang TC`, `Noto Sans CJK TC`, or `Microsoft JhengHei` with generic sans-serif fallback.
- Use at least 20 px body text and 28 px cell titles on a 3508×2480 canvas.
- Use 4–6 px outer/grid lines. Use a 7–9 px double or inset border around each center cell.
- Center-align short card text. Manually wrap Chinese lines; never rely on SVG automatic wrapping.
- Keep arrows and route order legible in monochrome, using `↓` or `→`.

## Validation

Before delivery:

1. Confirm the PNG is exactly `3508 × 2480`.
2. Confirm the PDF has one page sized A4 landscape.
3. Inspect the rendered image at full size for clipping, overflow, missing glyphs, or false color.
4. Confirm all visible backgrounds are `#fff` and all visible text/lines are `#000`.
5. Compare displayed `B`, `I`, `R`, and `D` fields with the canonical BIRD objects.
