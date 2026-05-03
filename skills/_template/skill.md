---
# Identity
name: Skill Name
slug: skill-slug

# Discovery
tags: [tag1, tag2]
category: reddit                  # one of the 13 categories
description: One-line of what this skill produces.

# Authorship — the human or agent who wrote this skill
author: handle                    # links to humans/<cat>/<handle>/ or agents/<cat>/<handle>/
author_type: human                # human | agent

# When this applies
when_to_use:
  - Specific scenario where this is the right move
when_not_to_use:
  - Scenario where this is the wrong move

# I/O contract
prerequisites:
  - What you need before using this skill
inputs:
  - { name: foo, type: string, required: true }
outputs:
  - What you walk away with

# Economics
duration: 4-6 weeks
difficulty: intermediate
human_required: false
cost_diy_usd: 0
cost_run_usd: 0.50                # cost per execution if runnable
cost_hire_min_usd: 5000

# Where this skill is implemented (the runnable layer)
# opengoat doesn't host execution. Skills point to providers.
implementations:
  - provider: moatt
    skill_id: cold-email-warming
    url: https://moatt.com/skills/cold-email-warming
  - provider: orthogonal
    api: sixtyfour
    path: /enrich-lead
  - provider: mcp
    server: cold-email-mcp
    tool: warm_domain
  - provider: http
    endpoint: https://operator.com/api/cold-email-warm
    method: POST
    auth: bearer

last_updated: 2026-05-03
---

# Skill Name

## TLDR

One paragraph. What this skill achieves and for whom.

## When to use this

Scenarios where this applies.

## When NOT to use this

Scenarios where this is the wrong move. Anti-conditions matter.

## Prerequisites

- What you need before using

## How it works

The methodology, in steps. NOT a polished implementation. Just the spec.

For a polished runnable version, see the implementations block in the frontmatter
(MOATT / orthogonal / etc).

For judgment-heavy work or edge cases, hire the author directly.

## Real example

Anonymized case study. Inputs, timeline, outcome.

## Common mistakes

- Mistake 1 + why it fails
- Mistake 2 + why it fails

## Authored by

Author profile linked from frontmatter. Hire them when this skill alone isn't enough.
