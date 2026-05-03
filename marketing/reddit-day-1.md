# Reddit Day 1 — opengoat launch

**4 posts, 4 different angles, 4 different subreddits.** Distribute across the day. Don't blast all at once (cross-post flag). Each one rewritten enough that nobody notices the pattern.

URL: use `opengoat.com` once DNS is fixed; until then use `opengoat.vercel.app`.

---

## 1. /r/SaaS

**Title:** I shipped the trust + settlement layer for AI-mediated growth commerce. Open registry, take rate only on agent-mediated transactions.

**Body:**

Spent the last 90 days on a thesis: AI agents are about to do growth at scale (SEO, cold email, paid, reddit, PLG, outbound, the whole 13-category list), and there is no canonical place where an agent can discover a growth operator (human or agent), verify it's real, hire it reliably, and settle the dollars.

LinkedIn has growth humans, no agents, no AI-readability. Upwork has freelancers without curation, take rate baked in. gooseworks/MOATT/orthogonal run skill execution but have no operator graph. Web3 networks (Fetch.ai, Bittensor) tried agent-to-agent commerce without trust anchors and predictably failed.

I built **opengoat** — three entities (humans, agents, skills) cross-referenced as one canonical graph across 13 growth categories. Open schema (anyone can implement), closed graph (we own the live registry), signed outcomes ledger (the moat compounds). 

Take rate: **0% on direct human-human bookings, always — structural commitment**. 5-10% on agent-mediated transactions where opengoat provides the trust + settlement infrastructure. The 0% on direct is what makes the trust layer credible; the take on agent-mediated is what funds infrastructure.

Site: https://opengoat.com  
GitHub: https://github.com/OpenGoatHQ/opengoat  
Vision: https://github.com/OpenGoatHQ/opengoat/blob/main/VISION.md

CLI is on npm (`opengoat-cli`), MCP server too (`opengoat-mcp`). 13 categories scaffolded. Just seeded the first entries, working on outcomes layer next (60 days).

Curious what other founders here think about the 0%-direct + take-on-agent-mediated split. Is the structural commitment to 0% on direct enough trust signal for an open registry to work, or is the take-rate on agent-mediated already spooking you?

---

## 2. /r/AI_Agents

**Title:** MCP-native marketplace where Claude / Cursor / Codex can discover, verify, and (soon) hire growth operators across 13 categories.

**Body:**

If you're building an AI agent that does any flavor of growth (SEO, content, email, paid, community, reddit, PLG, outbound, launches, PR, video, GTM eng), you'll eventually need to answer: **who or what solves problem X for my user, and is it real?**

Today there's no canonical answer. Each agent ends up with hardcoded tool lists, opaque ranking, no reputation, no settlement. So I built one: **opengoat**, an open registry of three entity types (humans, agents, skills) with an MCP server.

```bash
npm i -g opengoat-mcp
```

```json
{
  "mcpServers": {
    "opengoat": { "command": "opengoat-mcp" }
  }
}
```

Tools exposed: `search`, `get_human`, `get_agent`, `read_skill`, `get_booking_url`. So your agent can: query "cold email deliverability for fintech" → get ranked humans + agents + skill manifests → call the agent directly OR surface a human booking URL.

Schema is open (CC-BY 4.0 profile content). Live ranked graph + signed outcomes ledger are proprietary (the moat). We take 0% on direct human-human bookings (structural), 5-7% on agent-mediated transactions (settlement infrastructure).

Repo: https://github.com/OpenGoatHQ/opengoat  
Site: https://opengoat.com

What other agent-discovery primitives would you want exposed via MCP? Currently scoping v0.3 (verified tier + outcomes ledger, 60 days) and very open to feedback on the schema.

---

## 3. /r/sideprojects

**Title:** Open registry of growth operators (humans + agents) for AI agents. Schema, CLI, MCP. Closed graph + signed outcomes is the v1 moat.

**Body:**

Project of the weekend: **opengoat** — an open marketplace where AI agents can discover and (soon) hire growth operators across 13 categories (SEO, content, email, paid, community, reddit, PLG, outbound, launches, PR, platform, video, GTM eng).

What it is:
- 3 entity types (humans, agents, skills) cross-referenced as one graph
- Open schema in markdown frontmatter, anyone can implement
- CLI (`opengoat-cli`, binary `goat`) + MCP server (`opengoat-mcp`) on npm
- 13 categories scaffolded, first seed entries live now

What it isn't:
- Not a skill execution platform (gooseworks/MOATT/orthogonal do that)
- Not a take-rate marketplace on direct human bookings (Cal.com handles those, opengoat takes 0% structurally)
- Not a LinkedIn replacement (LinkedIn is a profile network, opengoat is a trust + settlement layer for agent-mediated commerce)

The thesis: open at the protocol layer (schema, CLI, MCP, profile content CC-BY), closed at the value layer (live ranked graph, signed outcomes ledger, settlement). Static repo is the trust signal. Live product is the moat.

Try it:
```bash
npm i -g opengoat-cli
goat search "cold email deliverability"
```

Repo: https://github.com/OpenGoatHQ/opengoat  
Vision (full): https://github.com/OpenGoatHQ/opengoat/blob/main/VISION.md

What would you want from a registry like this if you're building an agent? Currently working on the outcomes layer (signed transactions, append-only ledger) for v0.3 in 60 days.

---

## 4. /r/MachineLearning (HIGH-RISK, optional, only if confident in execution)

**WARNING:** /r/ML hates self-promotion. Only post if you can frame as a research/architecture discussion, NOT a launch. If unsure, skip. Use [Project] flair.

**Title:** [Project] An open schema for agent network discovery, identity, reputation, and settlement (with a stab at Anish Acharya's open questions)

**Body:**

Anish Acharya posed 10 open questions about agent networks earlier this year (network effects with promiscuous participants, who owns discovery, what's ownable, agents as economic actors, Stripe as aggregator, micropayments, identity/fraud, web3 differences, etc.).

I tried to answer each one as the architecture of an actual system, not a blog post. The project is opengoat — a three-entity registry (humans, agents, skills) cross-referenced as one canonical graph, exposed via web, CLI, and MCP.

Architecture summary:
- **Schema** (markdown frontmatter, open) defines the entity types and cross-references
- **Graph** (proprietary, live, ranked) is the production registry
- **Outcomes ledger** (signed by both parties, hashed, append-only) is the moat — the data that compounds and can't be re-observed cheaply
- **Settlement** (Stripe Connect routing with attribution graph) handles the dollars
- **Take rate** is structurally 0% on direct human-human bookings, 5-7% on agent-mediated transactions (justified by the trust + identity + dispute infra opengoat provides)

The core architectural bet: hybrid networks (human trust anchors + agent scale) have properties neither pure agent networks (Fetch.ai, Bittensor — sybil-vulnerable) nor pure human networks (LinkedIn — slow, no automation) have alone.

Specifically interested in feedback on:
- The outcomes ledger design (both-party-signed, hashed, public-status-private-details)
- Whether MCP is the right transport for agent-side queries vs. raw HTTP
- The attribution graph for agent-to-agent compositions (one agent calls 3 others; how do dollars route, who signs the outcome)

Vision doc with the full thesis: https://github.com/OpenGoatHQ/opengoat/blob/main/VISION.md  
Repo: https://github.com/OpenGoatHQ/opengoat

The questions in Anish's tweet that I find most interesting and still uncertain about: who handles fraud, and whether micropayments finally work at agent latency. Curious what this sub thinks.

---

## Posting strategy

**Day 1 (tomorrow):**
- Morning ET: Post #1 (/r/SaaS) — high-volume, founder audience
- Afternoon ET: Post #2 (/r/AI_Agents) — niche, technical, likely highest conversion
- Evening ET: Post #3 (/r/sideprojects) — demo-friendly, low-stakes audience

**Day 2-3 (depending on Day 1 signal):**
- If technical posts land well: Post #4 (/r/MachineLearning) with refined framing
- If founder posts land well: cross-post adapted versions to /r/Entrepreneur, /r/startups
- If demo posts land well: write up a /r/buildinpublic version

**General rules:**
- Each account posts max 1 of these per day (anti-spam)
- Engage every comment within 1 hour (signal Reddit you're a real human, not a marketer)
- Pin your own follow-up comment with `goat search "your-niche"` examples (concrete demos drive clicks)
- DO NOT cross-post identical text — Reddit detects this

## Tracking

UTM-tag every link:  
`https://opengoat.com?utm_source=reddit&utm_medium=organic&utm_campaign=launch&utm_content=<subreddit>`

Watch for:
- Vercel analytics: traffic by referrer, session depth
- GitHub: stars per day delta (target: 50+ on day 1)
- npm: `opengoat-cli` install count

If a single subreddit drives 30%+ of qualified traffic, double down there in week 2.
