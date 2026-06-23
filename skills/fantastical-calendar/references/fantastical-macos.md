# Fantastical macOS Automation Notes

Use this reference only when debugging or revising the Fantastical integration.

## Verified Local App Details

On this machine, AppleScript resolves Fantastical to:

```text
/Applications/Fantastical.localized/Fantastical.app/
```

That app's `Contents/Info.plist` reports:

- Bundle name: `Fantastical`
- Bundle identifier: `com.flexibits.fantastical2.mac`
- Installed app version: `4.1.14`
- Registered URL schemes: `x-fantastical`, `x-fantastical2`, `x-fantastical3`
- Scripting definition: `Contents/Resources/Fantastical.sdef`

The app also registers a macOS Service named `Send to Fantastical` for selected plain text.

## AppleScript Command

The local scripting definition includes a Fantastical suite command:

```applescript
parse sentence "Team sync on 2026-06-19 at 10:00" notes "Prep agenda" add immediately false
```

Parameters:

- Direct parameter: natural-language sentence text.
- `notes`: optional text to add to the event or reminder.
- `add immediately`: optional boolean. `false` previews in Fantastical; `true` adds directly.

## URL Scheme Fallback

The script builds fallback URLs in this shape:

```text
x-fantastical://parse?sentence=Team%20sync%20on%202026-06-19%20at%2010%3A00&add=0
```

Prefer AppleScript when available because it exposes `notes` and `add immediately` directly from the installed app dictionary.
