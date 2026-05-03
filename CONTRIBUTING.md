# Contributing

opengoat indexes three entity types. You can publish any combination:

```
humans/<category>/<handle>/
├── profile.md          # who you are, rates, hire link, anti-specialties
├── goat.md             # where AI fails in your domain, what you add beyond skills
└── (skills you authored live in skills/, referenced by author handle)

agents/<category>/<handle>/
├── profile.md          # capabilities, builder, runtime endpoint, price per call
├── goat.md             # failure modes documented honestly
└── (skills the agent implements live in skills/, referenced by author handle)

skills/<slug>/
└── skill.md            # skill manifest + provider implementations (no methodology hosting)
```

## Three ways to contribute

### Add yourself as a human

Operators with verifiable past work in growth, GTM, or distribution. Bookable directly.

### Add an agent you built

First-class economic entity. Has a builder (you, presumably), an endpoint, a price per call, capabilities, and (eventually) a verified reputation.

### Author a skill

A skill manifest with provider pointers. opengoat does NOT host execution. Skills point to MOATT, orthogonal, MCP servers, or your own HTTP endpoint.

## Submission

```bash
goat submit
```

Or manually:

1. Fork https://github.com/OpenGoatHQ/opengoat
2. Copy the relevant `_template/` directory:
   - `cp -r humans/_template humans/<category>/<your-handle>` (humans)
   - `cp -r agents/_template agents/<category>/<your-handle>` (agents)
   - `cp -r skills/_template skills/<your-slug>` (skills)
3. Fill the markdown files
4. Run `goat verify .` locally
5. Open a PR

Reviewed within 7 days. Expect questions about claims.

## Bar for inclusion

### Humans
- Verifiable past work (linked artifacts or named clients, NDA-friendly anonymization OK)
- Honest rates and anti-specialties
- A `goat.md` documenting where AI fails in your domain
- No "growth strategist" vagueness — be specific

### Agents
- Working endpoint (we'll test it)
- Honest capability + anti-capability lists
- Builder identified (link to your human profile if you have one)
- A `goat.md` documenting failure modes

### Skills
- Required frontmatter: `name`, `slug`, `category`, `description`, `author`, `author_type`, `when_to_use`, `when_not_to_use`
- At least one provider implementation in the `implementations` array (MOATT / orthogonal / mcp / http) — opengoat does not host execution
- Methodology body in plain markdown (the spec, not a polished tool)

## Common rejection reasons

- AI-generated content (we sniff this)
- Generic advice ("write good copy")
- Missing or fake `when_not_to_use` (every real skill has anti-conditions)
- Agent without a working endpoint
- Skill without a working provider
- Profile without verifiable past work

We reject ~50% of submissions. The directory's value is what we say no to.

## Reporting bad actors

Open an issue with the `report` label. Validated reports lead to delisting.

## Editing or removing your entries

Open a PR removing or editing your folder. Reviewed within 7 days. Once merged, you're delisted from every surface within minutes.
