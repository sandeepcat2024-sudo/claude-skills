# mba-copilot

An MBA co-pilot plugin for Claude.

- Adds a short MBA briefing to every session and auto-loads the `sandy-mba` skill for MBA messages.
- Commands / skills: `/mba` (menu), `/mba-check [file]`, `/mba-study [course]`, `/mba-sync`.
- Needs the Canvas and Google Drive connections (Composio) for sync and review.

## Install

In Claude Code:

```
/plugin install mba-copilot --marketplace sandeepcat2024-sudo/claude-skills
```

Answer `y` to add the marketplace, then choose the user scope.

Programme details, the Canvas URL and Drive folders are placeholders. Fill in your own in `skills/*/references/mba-knowledge.md` after installing.
