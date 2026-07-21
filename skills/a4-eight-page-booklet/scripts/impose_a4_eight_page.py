#!/usr/bin/env python3
"""Raster-impose eight semantic booklet pages onto one A4 landscape sheet."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw
from pypdf import PdfReader
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


TOP_BOOKLET_PAGES = (6, 7, 8, 1)
BOTTOM_BOOKLET_PAGES = (5, 4, 3, 2)


def parse_source_order(value: str) -> tuple[int, ...]:
    order = tuple(int(item.strip()) for item in value.split(","))
    if len(order) != 8 or set(order) != set(range(1, 9)):
        raise argparse.ArgumentTypeError(
            "source order must list booklet page numbers 1 through 8 exactly once"
        )
    return order


def parse_source_rotations(value: str) -> tuple[int, ...]:
    rotations = tuple(int(item.strip()) % 360 for item in value.split(","))
    if len(rotations) != 8 or any(item not in (0, 90, 180, 270) for item in rotations):
        raise argparse.ArgumentTypeError(
            "source rotations must contain eight comma-separated values from 0,90,180,270"
        )
    return rotations


def render_source_pages(input_pdf: Path, dpi: int) -> list[Image.Image]:
    if len(PdfReader(str(input_pdf)).pages) != 8:
        raise ValueError("input PDF must contain exactly eight pages")
    executable = shutil.which("pdftoppm")
    if not executable:
        raise RuntimeError("pdftoppm is required; load the PDF workspace runtime first")

    with tempfile.TemporaryDirectory(prefix="a4-eight-page-") as tmp:
        prefix = Path(tmp) / "page"
        subprocess.run(
            [executable, "-png", "-r", str(dpi), str(input_pdf), str(prefix)],
            check=True,
            stdout=subprocess.DEVNULL,
        )
        paths = sorted(Path(tmp).glob("page-*.png"), key=lambda p: int(p.stem.split("-")[-1]))
        if len(paths) != 8:
            raise RuntimeError(f"expected eight rendered pages, found {len(paths)}")
        return [Image.open(path).convert("L").copy() for path in paths]


def fit_panel(image: Image.Image, width: int, height: int) -> Image.Image:
    panel = Image.new("L", (width, height), 255)
    scale = min(width / image.width, height / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.Resampling.LANCZOS,
    )
    panel.paste(resized, ((width - resized.width) // 2, (height - resized.height) // 2))
    return panel


def dashed_line(
    draw: ImageDraw.ImageDraw,
    start: tuple[int, int],
    end: tuple[int, int],
    width: int,
    dash: int,
) -> None:
    x1, y1 = start
    x2, y2 = end
    if x1 == x2:
        for pos in range(y1, y2, dash * 2):
            draw.line((x1, pos, x2, min(pos + dash, y2)), fill=165, width=width)
    elif y1 == y2:
        for pos in range(x1, x2, dash * 2):
            draw.line((pos, y1, min(pos + dash, x2), y2), fill=165, width=width)


def impose(
    input_pdf: Path,
    output_pdf: Path,
    source_order: tuple[int, ...],
    source_rotations: tuple[int, ...],
    guides: bool,
    dpi: int,
    preview: Path | None,
) -> None:
    source_pages = render_source_pages(input_pdf, dpi)
    source_pages = [
        image.rotate(rotation, expand=True, fillcolor=255)
        for image, rotation in zip(source_pages, source_rotations)
    ]
    semantic_pages = {
        booklet_number: source_pages[source_index]
        for source_index, booklet_number in enumerate(source_order)
    }

    sheet_w = round(297 / 25.4 * dpi)
    sheet_h = round(210 / 25.4 * dpi)
    sheet = Image.new("L", (sheet_w, sheet_h), 255)
    x_edges = [round(sheet_w * i / 4) for i in range(5)]
    y_edges = [0, round(sheet_h / 2), sheet_h]

    for col, booklet_number in enumerate(TOP_BOOKLET_PAGES):
        x0, x1 = x_edges[col], x_edges[col + 1]
        y0, y1 = y_edges[0], y_edges[1]
        panel = fit_panel(semantic_pages[booklet_number], x1 - x0, y1 - y0)
        sheet.paste(panel, (x0, y0))

    for col, booklet_number in enumerate(BOTTOM_BOOKLET_PAGES):
        x0, x1 = x_edges[col], x_edges[col + 1]
        y0, y1 = y_edges[1], y_edges[2]
        panel = fit_panel(semantic_pages[booklet_number], x1 - x0, y1 - y0).rotate(180)
        sheet.paste(panel, (x0, y0))

    if guides:
        draw = ImageDraw.Draw(sheet)
        line_width = max(1, round(dpi / 144))
        dash = max(4, round(dpi / 32))
        for x in x_edges[1:-1]:
            dashed_line(draw, (x, 0), (x, sheet_h), line_width, dash)
        mid_y = y_edges[1]
        dashed_line(draw, (0, mid_y), (sheet_w, mid_y), line_width, dash)
        draw.line(
            (x_edges[1], mid_y, x_edges[3], mid_y),
            fill=45,
            width=max(2, round(dpi / 72)),
        )

    if preview:
        preview.parent.mkdir(parents=True, exist_ok=True)
        sheet.save(preview, format="PNG", optimize=True)

    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    page_w, page_h = landscape(A4)
    c = canvas.Canvas(str(output_pdf), pagesize=(page_w, page_h), pageCompression=1)
    c.setTitle("A4 One-sheet Eight-page Booklet")
    c.setSubject("Top 6-7-8-1 upright; bottom 5-4-3-2 inverted")
    c.drawImage(ImageReader(sheet), 0, 0, width=page_w, height=page_h)
    c.showPage()
    c.save()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input_pdf", type=Path)
    parser.add_argument("output_pdf", type=Path)
    parser.add_argument(
        "--source-order",
        type=parse_source_order,
        default=tuple(range(1, 9)),
        help="visible booklet number at each PDF index, e.g. 6,7,8,1,5,4,3,2",
    )
    parser.add_argument(
        "--source-rotations",
        type=parse_source_rotations,
        default=(0, 0, 0, 0, 0, 0, 0, 0),
        help=(
            "rotation applied to each rendered source page to make it upright; "
            "example: 0,0,0,0,180,180,180,180"
        ),
    )
    parser.add_argument("--guides", action="store_true")
    parser.add_argument("--dpi", type=int, default=288)
    parser.add_argument("--preview", type=Path)
    args = parser.parse_args()
    impose(
        args.input_pdf,
        args.output_pdf,
        args.source_order,
        args.source_rotations,
        args.guides,
        args.dpi,
        args.preview,
    )


if __name__ == "__main__":
    main()
