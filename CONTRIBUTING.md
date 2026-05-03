# Contributing

Two ways to contribute: as a human (add yourself + playbooks), or as a reader (open issues, suggest fixes).

## Adding yourself as a human

### Easy way (CLI)
```bash
goat submit                # if installed globally (npm i -g opengoat-cli)
npx opengoat-cli submit    # one-shot via npx (no install)
```
Interactive. Creates the markdown, drafts the PR, opens it in your browser.

### Manual way
1. Fork the repo
2. Copy `humans/_template/` to `humans/<category>/<your-handle>/` (pick the category folder that fits)
3. Fill `profile.md`
4. Add at least 1 real playbook in `playbooks/` (follow `_template.md`)
5. Run `goat verify .` locally
6. Open a PR

## Bar for inclusion

### Profile
- Honest rates, anti-specialties, and availability
- Verifiable past work (linked artifacts or named clients)
- No "growth strategist" vagueness — be specific about what you do

### Playbook (skill manifest)
Each playbook must be readable as a skill manifest. Required frontmatter:

```yaml
name: <Playbook Name>
slug: <kebab-slug>
author: <your-handle>
tags: [...]
category: <one of the 13 categories>
description: <one-line of what this playbook produces>

when_to_use: [...]              # scenarios where this is the right move
when_not_to_use: [...]          # anti-conditions, DIY thresholds
duration: <e.g. 4-6 weeks>
human_required: <true|false>    # is judgement/relationships essential?
cost_hire_min_usd: <number>
```

This is non-optional. Without these fields, agents can't reason about your playbook.

The body (markdown) must include:
- Concrete step-by-step methodology, not generic advice
- A real (anonymized OK) example
- Common mistakes
- Tools mentioned

## Common rejection reasons

- Generic advice ("write good copy", "be authentic")
- AI-generated content (we sniff this)
- Missing or fake `when_not_to_use` (every real playbook has anti-conditions)
- No anti-specialties on profile
- No verifiable past work
- LinkedIn-style fluff

We reject ~50% of submissions. The directory's value is curation.

## Adding another playbook (existing humans)

Drop a new `.md` in `humans/<category>/<your-handle>/playbooks/`. Same schema bar.

## Reviewing PRs

PRs are reviewed within 7 days. Expect questions about claims. We verify references.

## Reporting bad actors

Open an issue with the `report` label. Validated reports lead to delisting.
