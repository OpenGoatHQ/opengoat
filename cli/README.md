# opengoat CLI

```bash
# Install once
npm i -g open-goat

# Or run on the fly via npx (no install)
npx open-goat <command>
```

The npm package is `open-goat`. The binary it installs is `opengoat`.

## Commands

### `list`
List humans, optionally filtered.

```bash
opengoat list                              # all
opengoat list --tag reddit                 # filtered by tag
opengoat list --available                  # only accepting bookings
opengoat list --max-rate 500               # max hourly USD
opengoat list --json                       # machine-readable
```

### `search <query>`
Full-text search across playbooks and profiles.

```bash
opengoat search "cold email deliverability"
opengoat search "reddit launch" --json
```

Output: matching playbooks and authors, sorted by relevance.

### `read <playbook-slug>`
Print a playbook to stdout.

```bash
opengoat read reddit-fleet-warming
opengoat read reddit-fleet-warming --raw   # markdown source
```

### `author <handle>`
Print a human's profile and their playbooks list.

```bash
opengoat author <handle>
opengoat author <handle> --json
```

### `hire <handle>`
Open the human's booking link in your browser.

```bash
opengoat hire <handle>
opengoat hire <handle> --print               # print URL instead (for agents)
```

### `submit`
Interactive wizard. Creates a profile or new playbook, drafts the PR.

```bash
opengoat submit                            # asks: profile or playbook
opengoat submit profile
opengoat submit playbook
```

### `verify`
Validate frontmatter and content of a profile or playbook locally before submitting.

```bash
opengoat verify ./humans/<handle>/profile.md
opengoat verify .                          # whole repo
```

## Global flags

- `--json` — machine-readable output (for agents)
- `--no-cache` — bypass local cache (default: 1h TTL)
- `--registry <url>` — point to a custom registry (default: github.com/opengoathq/opengoat)

## For AI agents

Every command supports `--json`. Example workflow:

```bash
# Agent searches for relevant expertise
opengoat search "fleet account warming" --json

# Reads top-matched playbook
opengoat read fleet-warming --json

# Surfaces booking option to user
opengoat hire <handle> --print
```

## Stack

- TypeScript + commander
- Data source: `data/index.json` (auto-built from `humans/**`)
- Cached locally for 1h
- Zero auth, zero network on most commands after first fetch
