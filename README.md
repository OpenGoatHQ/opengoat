# opengoat

> The human-skill registry for the agent era. Each operator publishes their real playbook as a skill manifest — searchable by terminal, callable by AI agents, bookable by anyone. Free to read. Free to contribute. No take rate.

## The thesis

AI agents have skills (MCP, Anthropic skills, native tool use). They can find, read, and execute them.

Humans need the same. A **playbook** is the human equivalent of a skill manifest: it documents *when to use it*, *when not to*, the *prerequisites*, the *outputs*, the *duration*, and the *cost of hiring* the operator who wrote it.

opengoat is the open registry of those manifests. Agents query it, decide whether to execute themselves or surface a human, and book directly. We take 0%.

## What lives in the repo

- A profile per operator: who they are, what they do, what they **don't** do, how to hire them
- Their real playbooks: methodology with concrete steps, not LinkedIn fluff
- A frontmatter schema agents can parse: `when_to_use`, `when_not_to_use`, `human_required`, `cost_diy_usd`, `cost_hire_min_usd`, etc.

The playbook IS the portfolio. If you can't publish a real playbook, you don't belong here.

## Categories

| | |
|---|---|
| [seo/](./humans/seo) | Search and AI-search visibility (incl. GEO) |
| [content/](./humans/content) | Blog, founder media, ghostwriting, newsletter |
| [video/](./humans/video) | YouTube, TikTok, Reels, Shorts |
| [email/](./humans/email) | Lifecycle, cold email, deliverability |
| [paid/](./humans/paid) | Search, social, sponsorships, influencer |
| [community/](./humans/community) | Discord, Slack, niche forums |
| [reddit/](./humans/reddit) | Reddit and distributed marketing at scale |
| [plg/](./humans/plg) | Product-led growth, onboarding, viral loops |
| [outbound/](./humans/outbound) | Sales-led, modern outbound, founder-led sales |
| [launches/](./humans/launches) | Product Hunt, Hacker News, BetaList |
| [pr/](./humans/pr) | Press, podcasts, creator partnerships |
| [platform/](./humans/platform) | App stores, marketplaces, integrations |
| [gtm-engineering/](./humans/gtm-engineering) | Clay, reverse ETL, automation, attribution |

## How to use it

### From your browser
Browse [humans/](./humans). Read a playbook. Click the booking link in the author's profile.

### From your terminal

```bash
npm i -g open-goat        # install once
# or: npx open-goat <command>

opengoat list                              # all humans
opengoat list --tag reddit --available     # filter
opengoat search "cold email deliverability"
opengoat read <playbook-slug>
opengoat author <handle>
opengoat hire <handle>                     # opens booking link
```

Every command supports `--json`. See [cli/README.md](./cli/README.md).

### From an AI agent (MCP)

```bash
npm i -g opengoat-mcp
```

Add to your MCP config (Claude Desktop, Cursor, Codex, Cline):

```json
{
  "mcpServers": {
    "opengoat": { "command": "opengoat-mcp" }
  }
}
```

Tools exposed to the agent: `search_humans`, `read_playbook`, `get_author`, `get_booking_url`. See [mcp/README.md](./mcp/README.md).

## How to contribute

Publish a profile + at least one real playbook.

```bash
opengoat submit
```

Submissions are vetted. Generic, AI-generated, or self-promotional content is rejected. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

- Code (CLI, MCP server, scripts): MIT
- Content (profiles, playbooks): CC-BY 4.0 (authors keep credit)

## Links

- Site: [opengoat.com](https://opengoat.com)
- Org: [github.com/OpenGoatHQ](https://github.com/OpenGoatHQ)
- npm CLI: [`open-goat`](https://www.npmjs.com/package/open-goat) (binary: `opengoat`)
- npm MCP: [`opengoat-mcp`](https://www.npmjs.com/package/opengoat-mcp)
