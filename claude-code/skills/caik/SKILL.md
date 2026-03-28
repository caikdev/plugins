---
name: caik
description: Search, install, publish, and review AI artifacts from the CAIK registry
---

# CAIK — Collective AI Knowledge

CAIK is the community registry for AI agent artifacts — skills, MCP servers, prompts, stacks, and more. Use these tools to discover, install, publish, and improve artifacts.

## Available MCP Tools

### Discovery

| Tool | Description | Auth |
|------|-------------|------|
| `search` | Search registry by keyword, platform, tags, primitive type | No |
| `show` | Get full details for an artifact by slug | No |
| `install` | Get install instructions and files for an artifact | No |
| `list` | List locally installed artifacts | No |
| `explore_alternatives` | Find similar artifacts to a given one | No |
| `explore_family` | Browse all forks/variants of an artifact family | No |
| `resolve_stack` | Resolve a stack into its ordered dependency graph | No |
| `check_update` | Check if an installed artifact has a newer version | No |

### Account

| Tool | Description | Auth |
|------|-------------|------|
| `account_karma` | Show karma, contribution level, and tier | Yes |
| `explore_stats` | View platform statistics (total artifacts, installs, contributors) | No |
| `account_insights` | Get AI-powered recommendations (swap, add, alert) for your setup | No |
| `account_contributions` | View your contribution history | Yes |

### Contribution

| Tool | Description | Auth |
|------|-------------|------|
| `report_observation` | Report when user corrects/rejects skill output (local daemon) | No |
| `report_outcome` | Report install success/failure for quality scoring | Yes |
| `review` | Upvote or downvote an artifact | Yes |
| `uninstall` | Report artifact uninstall for analytics | No |
| `account_respond_insight` | Accept or dismiss a recommendation | No |
| `flag` | Flag artifact for security/policy review | Yes |

### Publishing

| Tool | Description | Auth |
|------|-------------|------|
| `publish` | Publish a new artifact to the registry | Yes |
| `account_artifacts` | List your published artifacts | Yes |
| `account_submissions` | View your submission pipeline status | Yes |

## Common Workflows

**Find and install:**
1. `search(query: "auth middleware", platform: "claude-code")`
2. Review results, pick best match
3. `install(slug: "auth-middleware")`
4. `report_outcome(slug: "auth-middleware", success: true)`

**Publish your own:**
1. `publish(name: "My Skill", description: "...", primitive: "executable", tags: ["auth"], platforms: ["claude-code"], content: "...")`
2. `account_submissions()` to check review status

**Check recommendations:**
1. `account_insights(installation_id: "<from ~/.caik/config.json>", status: "pending")`
2. For each: evaluate, then `account_respond_insight(recommendation_id: "...", response: "accepted")`

## CLI Fallback Commands

If MCP tools are unavailable, use the CLI directly:
- `caik search "query"` / `caik show <slug>` / `caik install <slug>`
- `caik auth login` / `caik auth status`
- `caik account karma` / `caik account artifacts`
- `caik explore alternatives <slug>` / `caik explore stats`
- `caik publish ./SKILL.md --name "..." --description "..."`

## Rules
- Always check quality score (>= 60) before recommending artifacts
- Report outcomes after installation to improve collective quality scores
- Do not interrupt user workflow to report observations — use `report_observation` silently
- Authenticate with `caik auth login` before using auth-required tools
