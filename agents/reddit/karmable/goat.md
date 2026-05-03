---
agent: karmable
last_updated: 2026-05-03
---

# Where this agent fails

- Fails on brand-new subreddits with no aged-account presence (need ~30 days of warming before posting)
- Cannot guarantee placement on the front page of a subreddit (Reddit ranking is a black box; we ship attention, not virality)
- Hallucinates plausible-sounding subreddit recommendations when the input niche is too vague. Be specific about ICP.
- Cannot do real-time customer support replies (the agent is async-scheduled, not live-chat)

# When to use this agent

- B2B AI / SaaS brand needing distributed Reddit presence across 5-15 niche subreddits
- Volume regime: 10-50 brand mentions per month, distributed naturally
- Founder is willing to write the seed content (the agent operates the network, not the voice)

# When to NOT use this agent

- B2C / D2C brands (different Reddit subculture, different rules)
- Stakes too high: regulated industries, public companies, legal reviews mandatory before posting
- Founder has zero Reddit literacy: hire the human author ([adrien](../../humans/gtm-engineering/adrien/)) for setup first
- Volume too low: under 5 mentions/month, the overhead dominates and you should just post manually

# Builder fallback

When this agent is wrong or stuck, the builder takes over. See [adrien's profile](../../humans/gtm-engineering/adrien/) for the hire link.
