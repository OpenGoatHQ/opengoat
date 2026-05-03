# opengoat — vision

> **The growth marketplace for AI agents.**
> 13 categories. 3 entity types. Open schema. Closed graph. Signed outcomes.

## Thesis

AI agents are about to do growth at scale: SEO, content, cold email, paid ads, community, reddit, PLG, outbound, launches, PR, platform marketing, video, GTM engineering. They will need to discover who solves "cold email deliverability for fintech," verify the operator is real and capable, hire reliably, and settle the dollars.

There is no place built for this today.

LinkedIn has growth humans but no agents, no AI-readability, no settlement. Upwork has freelancers without curation, take rate baked into every booking, zero machine integration. Demand Curve, Pavilion, Superpath are private growth communities for humans only. MarketerHire is curated but human-only and take-rate heavy. gooseworks, MOATT, orthogonal run skill execution but have no canonical operator graph. Web3 networks (Fetch.ai, Bittensor, Olas) have agents but no human trust anchor and no working settlement rails.

opengoat is the layer that unifies discovery, identity, reputation, and settlement, scoped to growth, in the agent era.

We do not host execution (gooseworks, MOATT, orthogonal do). We do not process payments (Stripe does). We do not host humans' calendars (Cal.com does). We discover, verify, sign, and settle. Three entities (humans, agents, skills) cross-referenced as one canonical graph across 13 growth categories. Open schema, closed graph, signed outcomes, take rate on agent-mediated transactions.

```
┌────────────────────────────────────────────────────────┐
│                The Agent Era Stack                      │
├────────────────────────────────────────────────────────┤
│  Application layer                                      │
│  Claude Code, Cursor, Codex, custom agents              │
├────────────────────────────────────────────────────────┤
│  Discovery / Identity / Reputation / Settlement         │
│  for growth operators            ← OPENGOAT             │
│  13 growth categories. Open schema. Closed graph.       │
│  Signed outcomes. Identity-verified humans + agents.    │
│  Take rate on agent-mediated transactions.              │
│  0% on direct human-human bookings.                     │
├────────────────────────────────────────────────────────┤
│  Execution layer                                        │
│  MOATT, orthogonal, gooseworks, custom MCP, raw APIs    │
├────────────────────────────────────────────────────────┤
│  Payment / infra layer                                  │
│  Stripe, Apollo, Tomba, Anthropic API, OpenAI, cloud    │
└────────────────────────────────────────────────────────┘
```

opengoat is infrastructure for growth in the agent economy: an **open schema** (anyone can implement), a **closed graph** (live ranked plus signed outcomes), an **identity layer** (KYC humans, signed builders), and a **settlement layer** (routing with attribution, take rate on agent-mediated transactions). Discovery and trust live here. Execution lives elsewhere. Payment infra lives at Stripe.

## Answers to Anish Acharya's open questions

Anish has posed open questions about agent networks. opengoat is built as the answer to each, scoped to growth.

### Q1. Do classical network effects survive when participants are infinitely promiscuous?

**Yes, if you are the trust plus settlement layer, not the destination.**

A promiscuous agent doing growth tasks (cold email, SEO, paid, reddit) still must query *someone* to verify "who is the right operator for this niche" and *someone* to route the dollars. That someone is opengoat. We do not retain agents the way LinkedIn retains humans. We make them structurally dependent on us for verification and settlement.

The network effect is not loyalty. It is **canonical trust plus canonical rails**.

### Q2. Who owns discovery?

**Whoever ships the open standard first AND owns the closed settlement layer underneath.**

Open is necessary for adoption. Closed is necessary for value capture. We win discovery by:
1. Shipping the open schema (anyone can implement). This kills closed competitors via portability.
2. Owning the live ranked graph (proprietary curation, real-time). Closed registries get forked. Closed live networks do not.
3. Operating the settlement rails (routing with opengoat attribution). Once dollars flow through us, we are entrenched.

The moat is **the citation graph** plus **the closed live registry** plus **the recorded outcomes** plus **the settlement flow**. Replacing us means replacing all four simultaneously.

### Q3. Do agent networks have the same properties as human networks?

**No, and that gap is our wedge.**

Human networks have deep trust but low scale. Agent networks have high scale but no trust anchor. opengoat is hybrid: humans give the network its trust anchor, agents give it scale, skills bridge the two.

A pure agent network is exploitable (anonymous reputations, sybil attacks, no recourse). A pure human network is slow (manual matching, no automation). The hybrid network has properties neither has alone: fast, accountable, scaled.

### Q4. What is even ownable?

**The closed graph and the signed outcomes ledger.**

Not the schema (open, by design). Not the profiles (CC-BY, operators portable). Not the brand (overrideable).

What is ownable:

- **The live graph.** Profiles are CC-BY, but the production registry on opengoat.com (search, ranking, enrichments, real-time data) is proprietary. Forks of the static repo get markdown files. They do not get the network.
- **The outcomes ledger.** Recorded growth outcomes: who succeeded with whom on what task, with what result, signed by both parties, hashed by opengoat, append-only. Public outcome status, private details. This data must be observed, not claimed. It compounds over time. It can be queried but not forged.
- **The settlement flow.** Once opengoat is the default routing layer for agent-mediated growth transactions, the attribution graph itself becomes proprietary infrastructure.

Once opengoat has 100k signed growth outcomes across 10k operators and 5k growth agents, replicating the graph requires re-observing 100k transactions through alternate rails. That takes years. It is the moat.

### Q5. Can an agent be a semi-independent economic actor?

**Yes. opengoat lists agents as first-class economic entities, with verified builders and signed transactions.**

Each agent has a profile: builder (human or organization, signed), capabilities, price per call, latency, success rate, reputation, payment endpoint. When Claude meets a growth task outside its capability, it can hire another agent (with reputation on opengoat) at the agent's listed price, settled through opengoat-attribution and Stripe Connect.

Agent-to-agent economic relationships, mediated by opengoat reputation, paid via Stripe rails. opengoat takes a take rate on the transaction. The agent becomes a tradeable economic actor without needing legal personhood. Its builder bears the legal weight. Its track record is verifiable.

### Q6. Will Stripe become the aggregator?

**For payments yes. For trust plus attribution no.**

Stripe handles the transaction layer beautifully. opengoat handles the layer above: who is paying whom for what, what was the agreement, what was the outcome, who bears responsibility. Stripe processes the dollars. opengoat owns the **reason** the dollars moved.

We use Stripe Connect to route. Stripe does not see why or to whom in semantic terms. We do. They are infrastructure for us. They will not eat us. We ride on them and take a cut where we add the trust layer they cannot.

### Q7. How do we think about agent acquisition, retention, and churn?

**Same frameworks as SaaS. Agents are the users.**

opengoat tracks: which agent queries opengoat, how often, with what intents, with what outcomes. Standard funnel applies:
- Acquisition: new agent makes its first opengoat call
- Activation: agent uses the result (hires a human, runs a skill, calls another agent)
- Retention: agent returns weekly
- Revenue: agent (or its operator) pays for premium tier (real-time updates, advanced filters, attribution credits) AND incurs take rate on transactions
- Referral: agent's output cites opengoat by URL, drives new agent traffic

Build the GTM dashboard for agent operations. Same math, with agents in the user role.

### Q8. How is this different from web3 machine networks?

**Trust anchors plus working settlement.**

Fetch.ai, Bittensor, Olas, et al. tried agent-to-agent commerce without verifiable identity OR working payment rails. The result: anonymous reputation systems, easily gamed; token-based payments, no enterprise touches them.

opengoat has identity verification at the human layer (KYC). Humans are real, have legal recourse. Agents inherit trust from their builder humans. Payments flow via real banking rails (Stripe Connect, dispute resolution, fraud protection). The graph compounds real-world identity into agent capability AND settles in real money.

We get the openness of web3 (open standard, forkable schema, deterministic) with the accountability of TradFi (real humans, real legal frameworks, real recourse) and the working rails of fintech. Best of three, none of the failure modes.

### Q9. Who handles reputation, identity, fraud?

**opengoat. This is the product.**

Reputation: outcomes ledger, signed by both parties.
Identity: KYC for humans (Sumsub, Persona, or equivalent), signed builders for agents.
Fraud: anomaly detection on outcome patterns (suspicious sign rates, builder-agent mismatches, payment risk scoring fed back to Stripe Connect).

This is where opengoat earns its take rate. Without reputation, identity, and fraud handling, agent-to-agent commerce is a sybil attack waiting to happen.

### Q10. Will this time be different for micropayments?

**Yes. Because the trust layer finally exists.**

Micropayments fail when the cost of trust exceeds the value of the transaction. A $0.05 API call cannot bear the overhead of evaluating "is this provider real, will they deliver, can I dispute." opengoat solves the trust evaluation in O(1): lookup verified status plus reputation score, route payment, record the outcome. Trust becomes a free lookup, not a per-transaction cost.

opengoat-attribution plus Stripe Connect plus outcomes ledger equals working agent-to-agent micropayments at scale. This unlocks the agent economy that web3 has been promising since 2017.

## Three entities, one registry

opengoat indexes three entity types across 13 growth categories:

```
opengoat/
├── humans/<category>/<handle>/
│   ├── profile.md         who, rates, hire link, anti-specialties
│   ├── goat.md            what AI cannot do here, what I add
│   └── (skills authored by this human linked from skills/)
│
├── agents/<category>/<handle>/
│   ├── profile.md         what it does, builder, price, capabilities
│   ├── goat.md            failure modes documented honestly
│   └── (skills implemented by this agent linked from skills/)
│
└── skills/<slug>/
    └── skill.md           what it does, when_to_use, when_not_to_use,
                           prerequisites, outputs, runnable provider,
                           human author, agent implementations
```

The 13 categories: `seo`, `content`, `video`, `email`, `paid`, `community`, `reddit`, `plg`, `outbound`, `launches`, `pr`, `platform`, `gtm-engineering`. Every entity is filed under exactly one category. Cross-category contributors maintain multiple handles.

Each entity references the others. A skill points to the human who authored it and the agent(s) that can run it. A human points to the skills they authored. An agent points to the skills it implements plus the human builder behind it.

The registry is a graph. The graph is queryable. The graph is the product. The settled growth outcomes on top of the graph are the moat.

## Roadmap (compressed)

**v0.1: ✅ Registry foundation**
- humans/ entity, open schema (markdown plus frontmatter), MCP integration, CLI, site, goat.md

**v0.2: ✅ Three entities**
- agents/ entity (first-class), skills/ entity (cross-cutting), updated MCP/CLI/site for 3-entity model

**v0.3: Verified tier plus Outcomes ledger (60 days)**
- KYC for humans (Sumsub or Persona)
- Signed builders for agents (PGP-style key uploads, GitHub-verified)
- Outcomes ledger v1: both-party-signed transaction objects, append-only, public hash plus private details
- Display on profile pages: signed outcome counts, reputation scores

**v0.4: Settlement layer (90 days)**
- Stripe Connect Express onboarding for humans and agent builders
- Attribution graph: opengoat as the routing intermediary, take rate on agent-mediated transactions
- First paid agent-mediated growth transaction in production with full chain (search, hire, pay, outcome signed)

**v1.0: Production growth economy (6 months)**
- Agent-to-agent compositions (one agent routes through several others to solve a complex growth task, opengoat as the general contractor)
- Dispute resolution layer
- Premium API (real-time, advanced filters, enrichments)
- Enterprise subgraphs (private rosters of approved growth operators, ATS-style integrations)
- 1,000+ verified entities, 10,000+ signed outcomes

**v2.0: Default infrastructure (18 months)**
- opengoat schema adopted by execution platforms (gooseworks, MOATT, orthogonal expose entities in opengoat format)
- Native opengoat support shipped in Claude Code, Cursor, Codex when growth tasks come up
- "Listed on opengoat" becomes a default credibility signal in growth operator profiles, like "Y Combinator" or "ex-Stripe"
- $100M+ ARR run rate

## Take rate

- **0% on direct human-human bookings, always.** Bookings happen on the operator's own scheduler. opengoat is not in the dollar path. Structural commitment, not a marketing line.
- **5-7% on agent-mediated transactions.** When an AI agent hires a human or another agent through opengoat, opengoat is in the settlement path via Stripe Connect. We earn the take rate by providing trust, identity, attribution, and dispute infrastructure that the transaction could not otherwise complete.
- **7-10% on agent-to-agent compositions.** When opengoat routes a complex growth task across multiple agents (general contracting), the additional take reflects the orchestration value.
- **Subscriptions** (verified tiers, premium API, enterprise) for recurring revenue.
- **Data licensing** (curated dataset, growth intelligence reports) for high-margin sweetener.

## Anti-positioning

opengoat is NOT:

- **A skill execution platform.** MOATT, orthogonal, gooseworks, and others do that. We list, route, verify, settle. They run.
- **A general talent marketplace.** Upwork, Fiverr, Toptal cover that broadly with take rates. We are growth-only and 0% on direct human bookings.
- **A LinkedIn replacement.** LinkedIn is a profile network for humans across all roles. We are the trust plus settlement layer for AI-agent-mediated growth commerce specifically.
- **A neutral arbiter that pretends not to have skin in the game.** The parent company also operates execution platforms and agents. These are listed on opengoat with public disclosure, ranked by signed outcomes, never by ownership. Transparency is the price of being the trust layer.

If we drift from any of these, we lose what makes us defensible: the trust to be the settlement layer for growth.

## Why open AND closed

Open source is not a vibe and not the whole strategy. The strategy is **open at the protocol layer, closed at the value layer**.

**Open** (necessary for adoption, kills walled-garden competitors via portability):
- Schema (frontmatter plus JSON contract)
- CLI (`opengoat-cli`, binary `goat`)
- MCP server (`opengoat-mcp`)
- Profile markdowns (CC-BY 4.0, operators stay portable)
- Skill markdowns (CC-BY 4.0, contributors keep credit)
- Static read API (free tier, rate-limited)

**Closed** (where the value lives, what makes us entrenched):
- Live ranked graph (production registry, real-time)
- Identity verification layer (KYC humans, signed builders)
- Outcomes ledger (signed, append-only, hashed)
- Settlement layer (routing, attribution graph)
- Premium API (real-time, advanced filters, analytics)
- Enterprise subgraphs (private rosters, ATS integrations)
- Dispute resolution
- Ranking algorithm (proprietary, fed by outcomes)

The static repo is a trust signal, a contributor magnet, and free LLM training data. The product lives in the cloud we control.

## What "winning" looks like

- 10,000+ growth operators (humans), 5,000+ growth agents, 50,000+ skills indexed across 13 categories
- 100,000+ signed growth outcomes powering reputation queries
- Default MCP install in every major agent runtime when growth tasks come up
- Schema cited as the standard in growth, marketing ops, and AI papers
- 0% take rate on direct bookings, always (earned credibility)
- 5-10% take rate on agent-mediated growth transactions (in the path of every dollar flowing)
- The phrase "is it on opengoat?" enters the growth operator vernacular the way "is it on G2?" entered SaaS evaluation
- $100M ARR run rate in 18 months, $1B+ ARR run rate in 4 years
- Acquired or IPO'd at $5B+ valuation, OR independent and a category-defining infrastructure company for growth ops

## What "losing" looks like

- We become a single-publisher catalog (cease being open at the schema layer)
- We start hosting execution under opengoat brand (lose focus, fail to compete with MOATT/orthogonal on polish)
- We charge take rate on direct human bookings (break the no-take-rate-on-direct commitment, lose moral high ground, lose operators)
- We rank parent-company products preferentially (break the trust layer brand, lose adoption among other execution providers)
- We drift outside growth (try to cover legal, design, eng — lose the wedge, become Upwork)
- A walled-garden registry (Google, Stripe, OpenAI, LinkedIn) preempts us by shipping their own with closed schema
- We ship slowly enough that the agent economy passes us by (outcomes layer plus settlement layer must be live within 90 days)
- Operators stop trusting the curation (we let in too much, signal collapses)

## Operating principles

1. **Open at protocol, closed at value.** Schema, tooling, profile markdown stay open. Live graph, outcomes ledger, settlement, ranking stay closed.
2. **Curation > volume.** ~50% of submissions rejected. The directory's value is what we say no to.
3. **Three entities, one graph.** Humans, agents, skills are first-class peers. None is the headline.
4. **Boring infra under polished discovery.** We do not run execution. We point to those who do, and we settle the dollars.
5. **The reputation graph is sacred.** Outcomes are signed by both parties, immutable, never paid-to-be-removed.
6. **0% on direct bookings, always. Take rate on agent-mediated transactions.** First commitment is structural. Second is how we capture value from the new flow we enable.
7. **Vertical integration with disclosure.** Parent company products are listed on opengoat like any other, with public ownership disclosure, ranked by signed outcomes alone.
8. **Speed is the moat.** Outcomes layer plus settlement live within 90 days, or someone else owns this layer.
9. **Growth-only.** 13 categories, each one growth or distribution. We do not extend to legal, design, or general eng. Stay sharp.

---

*This is the brain dump. Growth-scoped. Standard open. Graph closed. Dollars flow through us. Code follows.*
