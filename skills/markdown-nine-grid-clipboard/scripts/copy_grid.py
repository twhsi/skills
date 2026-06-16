#!/usr/bin/env python3
import argparse
import json
import shutil
import subprocess
import sys
import unicodedata
from pathlib import Path

KEYS = [
    "top_left",
    "top_center",
    "top_right",
    "middle_left",
    "center",
    "middle_right",
    "bottom_left",
    "bottom_center",
    "bottom_right",
]


def count_cjk_chars(value):
    return sum(1 for char in value if "CJK" in unicodedata.name(char, ""))


def split_by_cjk_count(value, max_cjk):
    if count_cjk_chars(value) <= max_cjk:
        return [value]

    current = []
    current_cjk = 0
    rest = []
    in_rest = False
    for char in value:
        if not in_rest:
            current.append(char)
            if "CJK" in unicodedata.name(char, ""):
                current_cjk += 1
            if current_cjk >= max_cjk:
                in_rest = True
        else:
            rest.append(char)

    first = "".join(current).strip()
    second = "".join(rest).strip()
    return [part for part in [first, second] if part]


def normalize_line(value):
    return str(value).replace("\n", " ").strip()


def cell_lines(value, max_cjk):
    if isinstance(value, dict):
        title = normalize_line(value.get("title", ""))
        content = normalize_line(value.get("content", ""))
        lines = [line for line in [title, content] if line]
    else:
        text = normalize_line(value)
        if "<br>" in text:
            lines = [part.strip() for part in text.split("<br>") if part.strip()]
        else:
            lines = split_by_cjk_count(text, max_cjk)
    return lines


def format_cell(value, max_cjk):
    lines = cell_lines(value, max_cjk)
    return "<br>".join(lines)


def ensure_center_marker(cells):
    center = cells.get("center", "")
    if isinstance(center, dict):
        title = str(center.get("title", ""))
        content = str(center.get("content", ""))
        if "◎" not in title and "◎" not in content:
            center = dict(center)
            if title:
                center["title"] = "◎" + title
            else:
                center["content"] = "◎" + content
            cells["center"] = center
        return

    center_text = str(center)
    if "◎" not in center_text:
        cells["center"] = "◎" + center_text


def validate_cells(cells):
    missing = [key for key in KEYS if key not in cells]
    if missing:
        return f"Missing required cells: {', '.join(missing)}"

    empty = []
    for key in KEYS:
        value = cells[key]
        if isinstance(value, dict):
            raw = str(value.get("title", "")) + str(value.get("content", ""))
        else:
            raw = str(value)
        if not raw.strip():
            empty.append(key)
    if empty:
        return f"Cells must not be empty: {', '.join(empty)}"

    return None


def markdown_table(cells, max_cjk):
    ensure_center_marker(cells)
    values = {key: format_cell(cells.get(key, ""), max_cjk) for key in KEYS}
    return "\n".join(
        [
            f"| {values['top_left']} | {values['top_center']} | {values['top_right']} |",
            "|---|---|---|",
            f"| {values['middle_left']} | {values['center']} | {values['middle_right']} |",
            f"| {values['bottom_left']} | {values['bottom_center']} | {values['bottom_right']} |",
        ]
    )


def copy_to_clipboard(text):
    if not shutil.which("pbcopy"):
        raise RuntimeError("pbcopy is not available")
    subprocess.run(["pbcopy"], input=text, text=True, check=True)


def write_output(path, text):
    Path(path).write_text(text + "\n", encoding="utf-8")


def append_output(path, text):
    target = Path(path)
    prefix = "\n\n" if target.exists() and target.stat().st_size else ""
    with target.open("a", encoding="utf-8") as handle:
        handle.write(prefix + text + "\n")


def main():
    parser = argparse.ArgumentParser(
        description="Build a Markdown nine-grid table and copy, save, or append it."
    )
    parser.add_argument("--cells", required=True, help="Path to a JSON file with 9 cells.")
    parser.add_argument(
        "--max-line-cjk",
        type=int,
        default=6,
        help="Split string cells after this many CJK characters. Default: 6.",
    )
    parser.add_argument(
        "--target",
        choices=["clipboard", "markdown", "obsidian", "aida"],
        default="clipboard",
        help="Output intent label for app handoff. Default: clipboard.",
    )
    parser.add_argument("--out", help="Write the table to this Markdown file.")
    parser.add_argument("--append-to", help="Append the table to this Markdown file.")
    parser.add_argument(
        "--no-copy", action="store_true", help="Print only; do not copy to clipboard."
    )
    args = parser.parse_args()

    cells = json.loads(Path(args.cells).read_text(encoding="utf-8"))
    validation_error = validate_cells(cells)
    if validation_error:
        print(validation_error, file=sys.stderr)
        return 2

    output = markdown_table(cells, args.max_line_cjk)
    if args.out:
        write_output(args.out, output)
    if args.append_to:
        append_output(args.append_to, output)
    if not args.no_copy:
        copy_to_clipboard(output)
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
