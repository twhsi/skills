#!/usr/bin/env python3
"""Send a natural-language event or reminder to Fantastical on macOS."""

from __future__ import annotations

import argparse
import json
import plistlib
import subprocess
import sys
import urllib.parse
from pathlib import Path
from typing import Iterable


APP_NAME = "Fantastical"
PREFERRED_SCHEMES = ("x-fantastical3", "x-fantastical2", "x-fantastical")
KNOWN_APP_PATHS = (
    Path("/Applications/Fantastical.localized/Fantastical.app"),
    Path("/Applications/Fantastical.app"),
    Path.home() / "Applications/Fantastical.app",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Open or add a Fantastical item from a natural-language sentence."
    )
    parser.add_argument(
        "sentence",
        nargs="+",
        help="Natural-language event/reminder sentence to parse.",
    )
    parser.add_argument(
        "--notes",
        default="",
        help="Optional notes to attach to the event or reminder.",
    )
    parser.add_argument(
        "--add-immediately",
        action="store_true",
        help="Add directly to the calendar instead of opening Fantastical for review.",
    )
    parser.add_argument(
        "--transport",
        choices=("auto", "applescript", "url"),
        default="auto",
        help="Automation transport. Default: auto.",
    )
    parser.add_argument(
        "--no-activate",
        action="store_true",
        help="Do not explicitly activate Fantastical before parsing.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the planned action without opening Fantastical.",
    )
    return parser.parse_args()


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, capture_output=True, text=True, check=False)


def normalize_app_path(path_text: str) -> Path | None:
    path_text = path_text.strip()
    if not path_text:
        return None
    path = Path(path_text)
    if path.exists():
        return path
    return None


def path_from_osascript() -> Path | None:
    result = run(["osascript", "-e", f'POSIX path of (path to application "{APP_NAME}")'])
    if result.returncode != 0:
        return None
    return normalize_app_path(result.stdout)


def find_app_path() -> Path | None:
    app_path = path_from_osascript()
    if app_path:
        return app_path

    for path in KNOWN_APP_PATHS:
        if path.exists():
            return path

    result = run(["mdfind", "kMDItemFSName == 'Fantastical.app'"])
    if result.returncode == 0:
        for line in result.stdout.splitlines():
            path = normalize_app_path(line)
            if path:
                return path

    return None


def url_schemes_from_app(app_path: Path | None) -> list[str]:
    if not app_path:
        return []
    info_plist = app_path / "Contents" / "Info.plist"
    if not info_plist.exists():
        return []
    with info_plist.open("rb") as handle:
        info = plistlib.load(handle)

    schemes: list[str] = []
    for url_type in info.get("CFBundleURLTypes", []):
        for scheme in url_type.get("CFBundleURLSchemes", []):
            if isinstance(scheme, str):
                schemes.append(scheme)
    return schemes


def choose_scheme(schemes: Iterable[str]) -> str:
    available = set(schemes)
    for scheme in PREFERRED_SCHEMES:
        if scheme in available:
            return scheme
    return "x-fantastical3"


def build_url(
    sentence: str,
    notes: str,
    add_immediately: bool,
    scheme: str,
) -> str:
    query = {
        "sentence": sentence,
        "add": "1" if add_immediately else "0",
    }
    if notes:
        query["notes"] = notes
    return f"{scheme}://parse?{urllib.parse.urlencode(query)}"


def run_applescript(sentence: str, notes: str, add_immediately: bool, activate: bool) -> None:
    script = r'''
on run argv
    set theSentence to item 1 of argv
    set shouldAdd to false
    if (count of argv) >= 2 then
        set shouldAdd to ((item 2 of argv) is "true")
    end if
    set theNotes to ""
    if (count of argv) >= 3 then
        set theNotes to item 3 of argv
    end if
    set shouldActivate to true
    if (count of argv) >= 4 then
        set shouldActivate to ((item 4 of argv) is "true")
    end if

    tell application "Fantastical"
        if shouldActivate then activate
        if theNotes is "" then
            parse sentence theSentence add immediately shouldAdd
        else
            parse sentence theSentence notes theNotes add immediately shouldAdd
        end if
    end tell
end run
'''
    result = run(
        [
            "osascript",
            "-e",
            script,
            sentence,
            "true" if add_immediately else "false",
            notes,
            "true" if activate else "false",
        ]
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())


def run_url(url: str) -> None:
    result = run(["open", url])
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())


def emit(payload: dict[str, object]) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def main() -> int:
    args = parse_args()
    sentence = " ".join(args.sentence).strip()
    if not sentence:
        print("Missing sentence.", file=sys.stderr)
        return 2

    app_path = find_app_path()
    schemes = url_schemes_from_app(app_path)
    scheme = choose_scheme(schemes)
    url = build_url(sentence, args.notes, args.add_immediately, scheme)
    activate = not args.no_activate

    plan = {
        "sentence": sentence,
        "notes": args.notes,
        "add_immediately": args.add_immediately,
        "transport": args.transport,
        "activate": activate,
        "app_path": str(app_path) if app_path else None,
        "url_scheme": scheme,
        "url": url,
    }

    if args.dry_run:
        emit({"ok": True, "dry_run": True, **plan})
        return 0

    if args.transport in ("auto", "applescript"):
        try:
            run_applescript(sentence, args.notes, args.add_immediately, activate)
            emit({"ok": True, "used_transport": "applescript", **plan})
            return 0
        except RuntimeError as error:
            if args.transport == "applescript":
                emit({"ok": False, "error": str(error), **plan})
                return 1
            applescript_error = str(error)
    else:
        applescript_error = ""

    try:
        run_url(url)
        emit(
            {
                "ok": True,
                "used_transport": "url",
                "applescript_error": applescript_error,
                **plan,
            }
        )
        return 0
    except RuntimeError as error:
        emit(
            {
                "ok": False,
                "error": str(error),
                "applescript_error": applescript_error,
                **plan,
            }
        )
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
