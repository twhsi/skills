# Output JSON Schema

Use this structure when the user asks for JSON or when saving weekly review output.

```json
{
  "date": "YYYY-MM-DD",
  "week": "2026W28",
  "timezone": "Asia/Taipei",
  "center": "幸福寧靜週",
  "sources": {
    "inbox": [],
    "daily_plan": [],
    "calendar": [],
    "year_plan": [],
    "life_plan": []
  },
  "diagnosis": {
    "main_claim": "",
    "strongest_domain": "",
    "weak_domains": [],
    "noise": [],
    "happiness_and_peace": ""
  },
  "weekly_rocks": {
    "A_health": {
      "title": "健康第一",
      "actions": []
    },
    "B_work": {
      "title": "書稿推進",
      "actions": []
    },
    "C_finance": {
      "title": "財流降噪",
      "actions": []
    },
    "D_family": {
      "title": "家人互動",
      "actions": []
    },
    "E_people": {
      "title": "人脈路徑",
      "actions": []
    },
    "F_inner": {
      "title": "去我內在",
      "actions": []
    },
    "G_learning": {
      "title": "日文沉澱",
      "actions": []
    },
    "H_leisure": {
      "title": "開心休閒",
      "actions": []
    }
  },
  "imandalart": {
    "version": "2.01",
    "layout": "weekly-reverse-review",
    "card_lines": []
  },
  "minimum_actions": [],
  "publishable_cards": [],
  "do_less": []
}
```

## Notes

- Keep raw source paths under `sources` when available.
- Put only the final weekly plan under `weekly_rocks`; keep analysis under `diagnosis`.
- `minimum_actions` should protect weak domains.
- `publishable_cards` should be card-sized, not project-sized.
- `do_less` is required for reverse planning.
