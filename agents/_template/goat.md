---
agent: agent-handle
last_updated: 2026-05-03
---

# Where this agent fails

Be specific. What inputs cause bad outputs. What context it can't read. What edge cases break it.

- Fails on input pattern X
- Hallucinates when context exceeds Y tokens
- Cannot do Z (and you shouldn't try)

# When to use this agent

- Specific scenarios where this is the right call
- Volume / latency / cost regime where this wins

# When to NOT use this agent

- Stakes too high
- Edge case (use the human author instead — see profile.md)
- Volume too low (overhead dominates)

# Builder fallback

When this agent is wrong or stuck, the builder takes over. Builder hire link in the agent profile.
