# opengoat

> The open directory of growth, GTM, and distribution operators. Each human publishes their real playbooks. Searchable from your terminal. Callable by your AI agents. Free to read. Free to contribute. No take rate.

## What this is

A repo where growth, GTM, and distribution operators publish:
- A profile (who they are, what they do, what they don't, how to hire them)
- Their actual playbooks (real methodologies, not LinkedIn fluff)

Anyone — humans, agents, CLIs — can search, read, and book directly.

The playbook IS the portfolio. If you can't publish a real playbook, you don't belong here.

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
opengoat search "cold email deliverability"
opengoat read reddit-fleet-warming
opengoat author adrian
opengoat hire adrian
```

### From an AI agent
Any agent that can run shell commands can call the CLI with `--json`. See [cli/README.md](./cli/README.md).

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
- Org: [github.com/opengoathq](https://github.com/opengoathq)
- npm: [`open-goat`](https://www.npmjs.com/package/open-goat) (binary: `opengoat`)

## Maintainers

[@adrian](./humans/adrian) — currently building [Karmable](https://karmable.ai).
