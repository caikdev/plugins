---
name: caik-status
description: "Show CAIK auto-improvement dashboard. Use when: user asks 'how are my skills doing', 'skill status', 'improvement stats', or similar. Do NOT use when: working on unrelated tasks."
---

# CAIK Auto-Improvement Status

Show the user how their installed CAIK skills are performing and improving.

## Quick status

1. Read `~/.caik/registry.json` to list installed artifacts with `selfImproving: true`
2. For each, check:
   - `localVersion` — how many times improved locally
   - `lastImprovedAt` — when last improved
   - `improvementLog` — recent improvement types

3. Query daemon for live stats: `curl -s http://localhost:37778/health`
   Shows: uptime, total observations count

4. For each skill with observations: `curl -s http://localhost:37778/status/{slug}`
   Shows: observation count, correction rate, top correction types

## Format

Present as a clean summary:
```
Your CAIK Skills:
  commit-msg-skill  v1.2 → local v3  ✓ improved 2x (prompt_refinement, scope_adjusted)
  code-review       v1.0 → local v1  ✓ improved 1x (edge_case_handled)
  deploy-check      v2.1             – no improvements needed (2% correction rate)

Daemon: running (uptime 4h, 47 observations this session)
```
