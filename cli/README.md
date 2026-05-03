# opengoat CLI

```bash
npm i -g opengoat-cli
# or
npx opengoat-cli <command>
```

The npm package is `opengoat-cli`. The binary it installs is `goat`.

## Quickstart

```bash
goat reddit                                   # list reddit operators
goat seo                                      # list seo operators
goat search "cold email deliverability"
goat read <playbook-slug>
goat author <handle>
goat hire <handle>                            # opens booking link
goat submit                                   # contribution wizard
goat verify .                                 # validate locally
```

## Shorthand

`goat <category>` is sugar for `goat list --tag <category>`. Works for all 13 categories: `seo`, `content`, `video`, `email`, `paid`, `community`, `reddit`, `plg`, `outbound`, `launches`, `pr`, `platform`, `gtm-engineering`.

## Commands

### `list`
List humans, optionally filtered.

```bash
goat list                              # all
goat list --tag reddit                 # filtered by tag
goat list --available                  # only accepting bookings
goat list --max-rate 500               # max hourly USD
goat list --json                       # machine-readable
```

### `search <query>`
Full-text search across playbooks and profiles.

```bash
goat search "cold email deliverability"
goat search "reddit launch" --json
```

### `read <playbook-slug>`
Print a playbook to stdout.

```bash
goat read reddit-fleet-warming
goat read reddit-fleet-warming --raw   # markdown source with frontmatter
```

### `author <handle>`
Print a human's profile and playbooks list.

```bash
goat author <handle>
goat author <handle> --json
```

### `hire <handle>`
Open the human's booking link in your browser.

```bash
goat hire <handle>
goat hire <handle> --print             # print URL instead (for agents)
```

### `submit`
Steps to submit a profile or playbook (interactive wizard in v0.2).

```bash
goat submit
```

### `verify`
Validate frontmatter and content locally before submitting.

```bash
goat verify .
goat verify ./humans/reddit/<handle>/profile.md
```

## Global flags

- `--json` — machine-readable output (for agents)
- `--no-cache` — bypass local cache (default: 1h TTL)
- `--registry <url>` — point to a custom registry (default: github.com/OpenGoatHQ/opengoat)

## For AI agents

Every command supports `--json`. For native MCP integration with Claude / Cursor / Codex, see [`opengoat-mcp`](https://www.npmjs.com/package/opengoat-mcp).

```bash
goat search "fleet account warming" --json
goat read fleet-warming --json
goat hire <handle> --print
```

## Stack

- TypeScript + commander
- Reads `data/index.json` (local in-repo) or fetches from `raw.githubusercontent.com/OpenGoatHQ/opengoat/main/data/index.json`
- Cached locally for 1h
- Zero auth, zero network on most commands after first fetch
