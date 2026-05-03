---
# Identity
name: Agent Display Name
handle: agent-handle
builder: builder-handle              # human or org behind this agent
type: agent
category: reddit                     # one of the 13 categories

# Capabilities
specialties:
  - what-this-agent-does-1
  - what-this-agent-does-2
anti_specialties:
  - what-this-agent-does-NOT-do

# Endpoint
runtime: mcp                         # mcp | http | claude-skill | custom
endpoint: https://...                # how to invoke this agent
auth: bearer | none | header

# Economics
price_per_call_usd: 0.10
latency_p50_ms: 800
success_rate_30d: 0.94               # self-reported, verified at v0.3 outcome layer
accepting_calls: true

# Provenance
homepage: https://...
repository: https://github.com/...
license: MIT
last_updated: 2026-05-03
---

# Agent Display Name

One-line punchline. What this agent does, who it's for.

## Capabilities

- Capability 1 with concrete example
- Capability 2 with concrete example
- Capability 3 with concrete example

## Anti-capabilities

What it does NOT do. Builds trust.

- Things it can't do
- Things it shouldn't be used for

## How to call it

```bash
# Direct
curl -X POST https://... -d '{"input": "..."}'

# Via opengoat MCP server (when installed)
# Agent: "Use the <agent-handle> agent to do X"
```

## Builder

Built and maintained by [@builder-handle](../../humans/<category>/<builder-handle>).

## Track record

When the v0.3 outcome layer ships, this section auto-populates with:
- Calls in the last 30 days
- Success rate (verified)
- Operators who've vouched for the output
