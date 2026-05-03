# opengoat — vision

> The open standard for discovery, identity, and reputation in the agent era.

## Thesis

In the agent era, every system needs to query someone to find "who or what solves X." That layer is currently fragmented across LinkedIn (humans), gooseworks/orthogonal (skills), Stripe Connect (payments), MCP servers (tooling), and a hundred private registries. None is open. None pairs entities. None is canonical.

opengoat is that layer.

We don't run skills (MOATT, orthogonal, gooseworks do). We don't broker transactions (Stripe does). We don't host humans' calendars (Cal.com does). We don't compete with execution providers, payment providers, or scheduling providers.

**We own discovery, identity, and reputation.** Three entity types, one open registry, one canonical schema, queryable by any agent on the planet.

```
┌────────────────────────────────────────────────────────┐
│                The Agent Era Stack                      │
├────────────────────────────────────────────────────────┤
│  Application layer                                      │
│  Claude Code, Cursor, Codex, custom agents              │
├────────────────────────────────────────────────────────┤
│  Discovery / Identity / Reputation         ← OPENGOAT   │
│  Open standard. Three entities (humans, agents,         │
│  skills). One canonical schema. Queryable via web,      │
│  CLI, MCP. Free. OSS. The DNS for agent ecosystems.     │
├────────────────────────────────────────────────────────┤
│  Execution layer                                        │
│  MOATT, orthogonal, gooseworks, custom MCP, raw APIs    │
├────────────────────────────────────────────────────────┤
│  Payment / infra layer                                  │
│  Stripe, Apollo, Tomba, Anthropic API, OpenAI, cloud    │
└────────────────────────────────────────────────────────┘
```

opengoat is not a product. It is a **standard plus a reference implementation**. Like RFC 822 plus Sendmail. Like DNS plus BIND. Like TCP/IP plus the Linux kernel.

## Answers to Anish Acharya's eight questions

Anish posed eight open questions about agent networks. opengoat is built as the answer to each.

### Q1. Do classical network effects survive when participants are infinitely promiscuous?

**Yes — if you are the discovery layer, not the destination.**

A promiscuous agent that flits between platforms still must query *someone* to find "who solves X." That someone is opengoat. We don't retain agents the way LinkedIn retains humans. We make agents structurally dependent on us for lookup, the way every TCP packet depends on DNS.

The network effect is not loyalty. It is **canonical reference**.

### Q2. Who owns discovery?

**Whoever ships the open standard first and gets cited by every other system.**

We win discovery by being open and canonical, not by being closed and proprietary. Closed registries get forked. Open standards become protocol. opengoat publishes its schema, hosts the reference implementation, exposes raw JSON, supports MCP natively, and accepts contributions from every operator who wants to be discovered.

The moat is not the data behind a paywall. The moat is **the citation graph**: agents link to opengoat, articles cite opengoat, other registries index opengoat. Once we're the reference, replacing us is harder than replacing DNS.

### Q3. Do agent networks have the same properties as human networks?

**No, and that gap is our wedge.**

Human networks have deep trust but low scale. Agent networks have high scale but no trust anchor. opengoat is hybrid: humans give the network its trust anchor, agents give it scale, skills bridge the two.

A pure agent network is exploitable (anonymous reputations, sybil attacks, no recourse). A pure human network is slow (manual matching, no automation). The hybrid network has properties neither has alone — fast, accountable, scaled.

### Q4. What is even ownable?

**The reputation graph.**

Not the humans (they can leave). Not the agents (commodity). Not the skills (forkable). Not the schema (open, by design).

What is ownable is **the recorded outcomes**: who succeeded with whom on what task, with what result, signed by both parties. This data must be observed, not claimed. It compounds over time. It can be queried but not forged. It can be pointed to but not copied.

Once opengoat has 100k recorded outcomes across 10k humans and 5k agents, replicating the graph requires re-observing 100k transactions. That takes years. It is the moat.

### Q5. Can an agent be a semi-independent economic actor?

**Yes. opengoat lists agents as first-class economic entities.**

Each agent has a profile: builder (human or organization), capabilities, price per call, latency, success rate, reputation, payment endpoint. When Claude meets a task outside its capability, it can hire another agent (which has reputation on opengoat) at the agent's listed price, brokered through opengoat-attribution and Stripe Connect.

Agent-to-agent economic relationships, mediated by opengoat reputation, paid via Stripe rails. The agent becomes a tradeable economic actor without needing legal personhood.

### Q6. Will Stripe become the aggregator?

**For payments — yes. For discovery — no, that's upstream.**

Stripe handles the transaction layer. opengoat handles the layer above: who is paying whom for what, what was the agreement, what was the outcome. Stripe processes the dollars. opengoat owns the **reason** the dollars moved.

opengoat uses Stripe Connect to route payments. Stripe doesn't see why or to whom. We do. They are infrastructure for us. They will not eat us; we ride on them.

### Q7. How do we think about agent acquisition, retention, and churn?

**Same frameworks as SaaS — agents are the users.**

opengoat tracks: which agent queries opengoat, how often, with what intents, with what outcomes. Standard funnel applies:
- Acquisition: new agent makes its first opengoat call
- Activation: agent uses the result (hires a human, runs a skill, calls another agent)
- Retention: agent returns weekly
- Revenue: agent (or its operator) pays for premium tier (real-time updates, advanced filters, attribution credits)
- Referral: agent's output cites opengoat by URL, drives new agent traffic

Build the GTM dashboard for agent operations. It's the same math, with agents in the user role.

### Q8. How is this different from web3 machine networks?

**Trust anchors.**

Fetch.ai, Bittensor, Olas, et al. tried agent-to-agent commerce without verifiable identity. The result: anonymous reputation systems, easily gamed, that no enterprise would ever transact through.

opengoat has identity verification at the human layer. Humans are KYC-able, have public histories, run businesses, have legal recourse. Agents inherit trust from their builder humans. The graph compounds real-world identity into agent capability.

We get the openness of web3 (open standard, forkable, deterministic, no central operator) with the accountability of TradFi (real humans, real legal frameworks, real recourse). Best of both, none of either's failure modes.

## Three entities, one registry

opengoat indexes three entity types:

```
opengoat/
├── humans/<category>/<handle>/
│   ├── profile.md         who, rates, hire link, anti-specialties
│   ├── goat.md            what AI can't do here, what I add
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

Each entity references the others. A skill points to the human who authored it and the agent(s) that can run it. A human points to the skills they authored. An agent points to the skills it implements.

The registry is a graph. The graph is queryable. The graph is the product.

## Roadmap

**v0.1 — Registry foundation (current)**
- ✅ humans/ entity
- ✅ Open schema (markdown + frontmatter)
- ✅ MCP integration
- ✅ CLI
- ✅ Site
- ✅ goat.md (why hire beyond skills)

**v0.2 — Three entities (this session)**
- agents/ entity (first-class)
- skills/ entity (cross-cutting, references humans + agents + execution providers)
- Updated MCP, CLI, site for 3-entity model

**v0.3 — Outcome layer (3 months)**
- Outcomes recorded per transaction (booking completed, skill run, agent invoked)
- Cross-references and ratings
- The reputation graph starts compounding

**v0.4 — Discovery as infrastructure (6 months)**
- Latency-optimized public API (<100ms)
- Free tier (open, raw JSON) + paid tier (advanced filters, real-time updates, priority compute)
- SDK in TS / Python / Go for direct integration

**v1.0 — Economic layer (12 months)**
- Stripe Connect routing for booking + skill execution + agent invocation payments
- Attribution splits (when an agent hires another agent that hires a human, opengoat routes the dollars correctly)
- Take rate: 0% on direct human-human bookings (always). 1-3% on agent-mediated transactions where opengoat does brokering work.
- Verified-identity tier for both humans and agents

**v2.0 — Standard adoption (24 months)**
- opengoat schema adopted by other registries (gooseworks, MOATT, orthogonal expose entities in opengoat format)
- Agent runtimes (Claude Code, Cursor, Codex) ship native opengoat support
- "Listed on opengoat" becomes a default credibility signal in operator profiles, like "Y Combinator" or "ex-Stripe"

## Anti-positioning

opengoat is NOT:

- **A skill catalog.** MOATT, orthogonal, gooseworks do that. We index, we don't run.
- **A talent marketplace.** Upwork, Fiverr do that with take rates. We're a registry, not a broker.
- **A LinkedIn replacement.** LinkedIn is a profile network. We're a discovery + reputation layer.
- **A product.** It's a standard. The opengoat.com site is a reference implementation, not the moat.

If we drift into being any of those, we lose what makes us defensible.

## Why open source

Open source is not a vibe. It is the strategy.

1. **Trust through transparency.** Every entry in the registry is auditable. Curation happens in public. No black box.
2. **No take rate, credibly.** Bookings happen on each operator's own scheduling tool. opengoat literally cannot take a cut, even if it wanted to. That structural commitment is what attracts the best operators.
3. **Operators stay portable.** CC-BY 4.0 content. If opengoat shuts down, every profile and skill survives in forks. No vendor lock.
4. **Standards beat walled gardens.** Closed registries get forked. Open standards become protocol. opengoat wins by being citable, not by being closed.

## What "winning" looks like

- 10k humans, 5k agents, 50k skills indexed across 13 categories
- Top 3 Google result for "find a [growth/seo/cold email/etc] expert"
- Default MCP install in every major agent runtime
- Schema cited as the standard in industry papers, talks, and blog posts
- 100k+ recorded outcomes powering reputation queries
- 0 take rate on direct bookings, always
- A community of curators globally, not a centralized team
- The phrase "is it on opengoat?" enters the operator vernacular the way "is it on npm?" entered the developer vernacular

## What "losing" looks like

- We become a single-publisher catalog (cease being open)
- We start hosting execution (lose focus, fail to compete with MOATT/orthogonal on polish)
- We take a transaction fee (break the no-take-rate commitment, lose moral high ground)
- A walled-garden registry (Google, Stripe, OpenAI) preempts us by shipping their own
- Operators stop trusting the curation (we let in too much, signal collapses)

## Operating principles

1. **Open standard first, product second.** Every architectural decision is judged on whether it makes the schema more or less open.
2. **Curation > volume.** ~50% of submissions rejected. The directory's value is what we say no to.
3. **Three entities, one graph.** Humans, agents, skills are first-class peers. None is the headline.
4. **Boring infra under polished discovery.** We don't run execution. We point to those who do.
5. **The reputation graph is sacred.** Outcomes are signed by both parties, immutable, never paid-to-be-removed.
6. **0% on direct bookings, always.** This is a structural commitment, not a marketing line.

---

*This is the brain dump. Code follows.*
