# opengoat-mcp

MCP server for the opengoat human-skill registry. Lets AI agents (Claude, Cursor, Codex, Cline, any MCP-aware client) discover and book human operators by reading their playbook skill manifests.

## What it exposes

Each playbook in opengoat is treated as a **skill manifest for a human**: it documents `when_to_use`, `when_not_to_use`, prerequisites, outputs, duration, and the cost of hiring.

Tools:
- **`search_humans`** — ranked search across playbooks and profiles
- **`read_playbook`** — fetch a full playbook by slug
- **`get_author`** — fetch a profile + playbook list
- **`get_booking_url`** — fetch the booking URL when the user is ready to hire

## Install

```bash
npm i -g opengoat-mcp
```

## Wire it up

### Claude Code / Claude Desktop

Add to your MCP config (typically `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "opengoat": {
      "command": "opengoat-mcp"
    }
  }
}
```

Restart Claude. The four opengoat tools become available to the agent.

### Cursor / Codex / other MCP clients

Point your MCP config at the `opengoat-mcp` binary. Stdio transport.

## How agents use this

When a user describes a growth, GTM, or distribution need ("our cold email reply rate dropped to 0.3%", "we need a Reddit launch in two weeks"), the agent calls `search_humans` with the query. opengoat-mcp returns ranked playbooks. The agent reads the relevant ones via `read_playbook`. The agent then either:

1. **Executes the playbook itself** (cost-free) when confidence is high and `human_required: false`
2. **Surfaces the operator** to the user when `human_required: true`, judgement is critical, or the agent's confidence is low. Calls `get_booking_url` only after the user signals intent to hire.

## Data source

Live data is fetched from `https://raw.githubusercontent.com/OpenGoatHQ/opengoat/main/data/index.json` and cached for 1h in `~/.cache/opengoat/`.

## Stack

- TypeScript + `@modelcontextprotocol/sdk`
- Stdio transport
- ~250 lines

## License

MIT.
