# opengoat

> The open directory of growth, GTM, and distribution operators. Each human publishes their real playbooks. Searchable from your terminal. Callable by your AI agents. Free to read. Free to contribute. No take rate.

## What this is

A repo where growth, GTM, and distribution operators publish:
- A profile (who they are, what they do, what they don't, how to hire them)
- Their actual playbooks (real methodologies, not LinkedIn fluff)

Anyone — humans, agents, CLIs — can search, read, and book directly.

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

Install once:
```bash
npm i -g open-goat
```

Or run on the fly via npx (no install):
```bash
npx open-goat <command>
```

Commands:
```bash
opengoat list                              # all humans
opengoat list --tag reddit --available     # filter
opengoat search "cold email deliverability"
opengoat read <playbook-slug>
opengoat author <handle>
opengoat hire <handle>                     # opens booking link
```

### From an AI agent
Every command supports `--json`. See [cli/README.md](./cli/README.md).

## How to contribute

You publish a profile + at least one real playbook.

```bash
opengoat submit
```

Submissions are vetted. Generic, AI-generated, or self-promotional content is rejected. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

- Code (CLI, scripts): MIT
- Content (profiles, playbooks): CC-BY 4.0 (authors keep credit)

## Links

- Site: [opengoat.com](https://opengoat.com)
- Org: [github.com/OpenGoatHQ](https://github.com/OpenGoatHQ)
- npm: [`open-goat`](https://www.npmjs.com/package/open-goat) (binary: `opengoat`)
