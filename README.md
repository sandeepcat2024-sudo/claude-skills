# Claude Skills by Sandeep Shekhar

A personal AI operating system built on Claude: one executive-assistant mode, five business-partner skills that each run a separate venture, a compliance reviewer that checks everything before it goes out, and an MBA co-pilot plugin.

I'm a B2B sales and revenue-operations professional (8 years in SaaS, healthcare and finance; MBA in Marketing). These skills encode how I work: diagnose the real goal, do the work end to end, review it, and only ask a human at the points that matter (sending, spending, deleting, installing).

## What's inside

| Skill | What it does |
|---|---|
| [`hey-assistant`](skills/hey-assistant/SKILL.md) | Always-on executive-assistant mode. Diagnoses the goal, picks the right skills and connectors, executes end to end, runs a mandatory self-review, and stops only at a safety gate. |
| [`sandy-gtm-partner`](skills/sandy-gtm-partner/SKILL.md) | Business partner for a go-to-market consulting practice: research, ICP, offers, lead generation, outreach, content, pipeline and weekly reviews. |
| [`sandy-it-services-partner`](skills/sandy-it-services-partner/SKILL.md) | Business partner for an IT services venture: service selection, delivery-partner vetting, positioning, proposals and SOWs, outbound. |
| [`sandy-agri-partner`](skills/sandy-agri-partner/SKILL.md) | Business partner for an agricultural products venture: model selection, mandi and export research, B2B buyers, quality and logistics ops. |
| [`sandy-ebook-partner`](skills/sandy-ebook-partner/SKILL.md) | Business partner for an Amazon KDP children's-books side business: niche research, production pipeline, listings, festival launch calendar. |
| [`sandy-compliance-reviewer`](skills/sandy-compliance-reviewer/SKILL.md) | Checks every post, email, listing, proposal and MBA submission for Indian law (DPDP Act, GST, ASCI, FSSAI, CSR rules), platform policy, IP, privacy and academic integrity. Returns ✅ / ⚠️ / ⛔ per item. |
| [`sandy-mba`](skills/sandy-mba/SKILL.md) | MBA co-pilot: syncs Canvas to Google Drive, reviews and corrects assignments against the brief, tutors any course, and lends MBA frameworks to the business skills. |

| Plugin | What it does |
|---|---|
| [`mba-copilot`](plugins/mba-copilot) | Adds MBA context to every Claude session and the `/mba`, `/mba-check`, `/mba-study` and `/mba-sync` commands. Includes tests. |

## Design principles

- **One setup, one skill.** Each venture has its own skill, brief and learning log. Data never crosses between them.
- **Safety gate.** Skills prepare everything but need an explicit "yes" before sending, posting, spending, deleting or installing.
- **No fabrication.** Every claim is labelled FACT, ESTIMATE, ASSUMPTION or RECOMMENDATION. No invented clients, reviews or numbers.
- **Self-review every time.** Each output ends with what was checked and what was fixed.
- **Self-upgrading.** Each skill keeps a learning log and proposes a new version when enough new rules accumulate.
- **Street-smart, India-first.** Jugaad first, legal always: WhatsApp-first follow-ups, scam checks, local negotiation norms.

## Install

**Skills (Claude app):** download a skill folder, zip it, and upload it in Settings → Capabilities → Skills.

**Skills (Claude Code):** copy a folder from `skills/` into `~/.claude/skills/`.

**Plugin (Claude Code):**

```
/plugin install mba-copilot --marketplace sandeepcat2024-sudo/claude-skills
```

Personal details (contact emails, programme details, file IDs) have been removed or replaced with placeholders. Fill in your own in each skill's `references/brief.md`.

## License

MIT. See [LICENSE](LICENSE).
