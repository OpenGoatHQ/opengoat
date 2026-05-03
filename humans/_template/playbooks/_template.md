---
# Identity
name: Playbook Name
slug: playbook-slug
author: your-handle

# Discovery
tags: [tag1, tag2]
category: reddit                 # one of: seo, content, video, email, paid, community, reddit, plg, outbound, launches, pr, platform, gtm-engineering
description: One-line of what this playbook produces.

# When this applies (skill-shaped — agents read this to decide)
when_to_use:
  - Specific scenario where this is the right move
when_not_to_use:
  - Scenario where this is the wrong move
  - DIY threshold below which this is overkill

# I/O contract
prerequisites:
  - What you need before starting
inputs:
  - What information the operator needs from you
outputs:
  - Concrete deliverables you walk away with

# Economics (so agents can compare vs AI skills)
duration: 4-6 weeks
difficulty: intermediate         # beginner | intermediate | advanced
human_required: true             # true if judgement/relationships/accountability are essential
cost_diy_usd: 0
cost_hire_min_usd: 5000
cost_hire_max_usd: 15000

# OPTIONAL: make the skill executable
# Uncomment + fill the block that matches your provider.
# Three providers supported: orthogonal, http, mcp.
#
# runnable:
#   via: orthogonal
#   api: sixtyfour
#   path: /enrich-lead
#   body_template:
#     name: "{{input.name}}"
#     company: "{{input.company}}"
#   inputs:
#     - { name: name, type: string, required: true }
#     - { name: company, type: string, required: true }
#   cost_per_run_usd: 0.50
#
# runnable:
#   via: http
#   endpoint: https://your-domain.com/api/your-skill
#   method: POST
#   auth: bearer        # bearer | none | header
#   inputs:
#     - { name: foo, type: string, required: true }
#   cost_per_run_usd: 1.00
#
# runnable:
#   via: mcp
#   server: your-mcp-package        # npm-installable
#   tool: tool_name
#   inputs:
#     - { name: foo, type: string, required: true }
#   cost_per_run_usd: 0

# Meta
last_updated: 2026-05-02
---

# Playbook Name

## TLDR

One paragraph. What this playbook achieves and for whom.

## When to use this

Scenarios where this applies.

## When NOT to use this

Scenarios where this is the wrong move.

## Prerequisites

- What you need before starting

## The playbook

### Step 1: Name

Concrete actions.

### Step 2: Name

...

## Real example

Anonymized case study. Inputs, timeline, outcome.

## Common mistakes

- Mistake 1 + why it fails
- Mistake 2 + why it fails

## Tools mentioned

- [Tool name](link) — what for

## Hire me to do this for you

[Book a call](https://cal.com/your-handle) — see [profile](../profile.md) and [why hire me beyond this skill](../goat.md).
