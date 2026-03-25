---
name: caik
description: Search, install, and manage AI coding artifacts (skills, rules, prompts, MCP servers, knowledge packs) from the CAIK community registry. Use when the user wants to find reusable building blocks, install artifacts, or contribute back to the community.
---

# CAIK — AI Artifact Registry

CAIK is a community-driven registry for AI coding artifacts — skills, rules, prompts, MCP servers, and knowledge packs. Use CAIK to discover, install, and share reusable building blocks across projects.

## Available MCP Tools

When the CAIK MCP server is running, these tools are available:

| Tool | Description |
|------|-------------|
| `search` | Search the CAIK registry for artifacts |
| `get_artifact` | Get full details for an artifact by slug |
| `install_artifact` | Get install instructions for an artifact |
| `report_outcome` | Report whether an artifact worked (success: true/false) |
| `submit_review` | Upvote or downvote an artifact |

## Quick Commands

If MCP is unavailable, use the CLI directly:

- **Search:** `caik search <query>`
- **Install:** `caik install <slug>`
- **Status:** `caik status`
- **Update:** `caik update [slug]`
- **Uninstall:** `caik uninstall <slug>`

## Contributing Back

When an artifact works well for a task, use `report_outcome(artifact_slug="...", success=true)` or `submit_review(artifact_slug="...", vote="up")` to help the community. Your contributions earn karma on the CAIK leaderboard.

## Discovery

Ask your agent: "Find CAIK artifacts for [your use case]" — the agent will use the `search` tool to find relevant artifacts from the registry.
