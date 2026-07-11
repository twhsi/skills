# TheBrain Manuscript Scaffold Import

Use this workflow when the user wants a validated BIRD Excel hierarchy reproduced as a writing scaffold in TheBrain.

## Field Mapping

| BIRD / Excel | TheBrain | Rule |
|---|---|---|
| `B_BookAddress` | Parent-child hierarchy | Preserve the complete address and numbered Thought name |
| `StructuralType` | Type | Use only `書 / 部 / 章 / 節 / 項` |
| `Tag` | Tag | Use workflow states only |
| `R_Route` | Jump | Add only supported semantic cross-links |
| `D_DeepLink` | Deep Link | Preserve verified values byte-for-byte |
| manuscript text | Note | Import only when the user explicitly requests it |

Default workflow Tags:

```text
待寫 -> 草稿 -> 待補例 / 待修 -> 定稿 -> 可輸出
```

## Safe Import Order

1. Validate unique Book Addresses, parent existence, StructuralType, and one primary workflow Tag per row.
2. Identify the exact target Brain by both name and ID. Stop on zero or multiple matches.
3. Dry-run an import manifest containing `address`, `name`, `parentAddress`, `type`, and `tag`.
4. Create or reuse the five Types and six workflow Tags.
5. Create the hierarchy from shallow to deep. Persist `Book Address -> Thought ID` after every successful creation.
6. Apply Tags only after the hierarchy is complete.
7. Verify normal Thought count, hierarchy links, Type IDs, and every Tag relationship.

Never delete, rename, merge, or move existing user Thoughts without explicit authorization. Never import Notes by default.

## Native Type and Tag Semantics

- A normal Thought receives its structural Type through `typeId`.
- A native Tag is a Thought with `kind = 4`.
- In API exports, a native Tag assignment is a link from the Tag Thought to the content Thought with `relation = 1` and `meaning = 5`.
- Do not represent workflow Tags as ordinary Jump links.
- Treat a successful API response as provisional until the created Thought or Link can be read back.

TheBrain API surfaces may update asynchronously. When a convenience `tags` array or statistics counter is stale, verify the Tag link directly by its two Thought IDs, `relation`, and `meaning`.

## Idempotency

For every row:

1. Reuse a saved Thought ID only after its name and Brain match.
2. Otherwise inspect the expected parent for one exact-name child.
3. Create only when no exact child exists.
4. Stop if multiple same-name children exist under the expected parent.

Save import state after each mutation. A resumed run must continue from the state map instead of searching globally by title, because the same title can appear in different chapters.

## Completion Evidence

Report:

- source Excel row count;
- mapped normal Thought count;
- counts by StructuralType and Tag;
- ensured Type and Tag definitions;
- verified native Tag-link count;
- top-level branch comparison;
- whether Notes were imported;
- errors or unresolved duplicates.
