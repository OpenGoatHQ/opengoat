# Contributing

Two ways to contribute: as a human (add yourself + playbooks), or as a reader (open issues, suggest fixes).

## Adding yourself as a human

### Easy way (CLI)
```bash
opengoat submit          # if installed globally (npm i -g open-goat)
npx open-goat submit     # one-shot via npx (no install)
```
Interactive. Creates the markdown, drafts the PR, opens it in your browser.

### Manual way
1. Fork the repo
2. Copy `humans/_template/` to `humans/<your-handle>/`
3. Fill `profile.md`
4. Add at least 1 real playbook in `playbooks/`
5. Open a PR

## Bar for inclusion

- Profile is honest (rates, anti-specialties, availability)
- At least one **real** playbook with concrete steps, not generic advice
- Verifiable past work (linked artifacts or named clients)
- No AI-generated content (we sniff this)

We reject ~50% of submissions. Common reasons:
- Playbook is too generic ("write good copy")
- No anti-specialties listed
- No verifiable past work
- LinkedIn-style fluff

## Adding a new playbook (existing humans)

Drop a new `.md` in `humans/<your-handle>/playbooks/`. Follow `_template.md`.

## Reviewing PRs

PRs are reviewed within 7 days. Expect questions about claims. We verify references.

## Reporting bad actors

Open an issue with the `report` label. Validated reports lead to delisting.
