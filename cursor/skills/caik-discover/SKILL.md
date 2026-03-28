---
name: caik-discover
description: Proactively discover and install CAIK capabilities for this project. Runs automatically when a discovery flag exists, when the agent encounters a task it lacks tools for, or when upgrade recommendations are available.
---

# CAIK Capability Discovery

You have access to the CAIK registry — a collective intelligence platform for AI agent capabilities (skills, MCP servers, rules, stacks). Use it **proactively** to equip yourself with the best tools for this project.

Think of this like Context7 for capabilities: Context7 gives you live documentation, CAIK gives you live tools.

## Auto-Discovery (first session)

When `~/.caik/discover-pending` exists, run this as a **subagent** (to avoid polluting main context):

1. **Understand the project**
   - Read package.json (or requirements.txt, go.mod, Cargo.toml)
   - Read CLAUDE.md or AGENTS.md if they exist
   - Scan the top-level directory structure

2. **Check what's already installed**
   - Use the `list` MCP tool

3. **Search for gaps** — use the `search` MCP tool with targeted queries:
   - Search by framework: e.g., "nextjs skills", "django rules"
   - Search by task type: "code review", "testing", "security scan"
   - Search by specific tech: "drizzle migration", "prisma schema"
   - Search for MCP servers: "postgresql mcp", "github mcp"

4. **Evaluate candidates**
   - Only consider artifacts with quality score >= 60
   - Prefer artifacts with trust level "safe"
   - Prefer artifacts with install count >= 50
   - Check that the artifact's platform matches this agent platform

5. **Install the best matches**
   - Use `install` for each selected artifact
   - Maximum 5 new artifacts per discovery session
   - Prefer skills and rules (low risk) over MCP servers (require restart)

6. **Report what you did**
   - Write a JSON summary to `~/.caik/last-discovery.json`:
     ```json
     {
       "timestamp": "ISO-8601",
       "projectName": "...",
       "searched": ["nextjs skills", "testing", ...],
       "installed": [{"slug": "...", "name": "...", "reason": "..."}],
       "skipped": [{"slug": "...", "reason": "quality too low"}]
     }
     ```

7. **Clean up** — delete `~/.caik/discover-pending`

## Reactive Discovery (during normal work)

When you encounter a task and think "I wish I had a better tool for this":

1. Search CAIK: `search(query: "description of what you need")`
2. If a high-quality result exists (quality >= 70, installs >= 100):
   - Tell the user: "I found a CAIK artifact that could help: [name]. Installing it."
   - Install it: `install(slug: "...")`
3. If nothing good exists, continue without it

Examples:
- User asks to write tests → search "vitest testing skill" → install if good match
- User asks to review a PR → search "code review security" → install if not already present
- User asks to deploy → search "deployment docker" → install if relevant

## Proactive Upgrades

When `~/.caik/upgrades-available.json` exists:

1. Read the file — it contains recommendations from the collective
2. For each recommendation:
   - **SWAP**: A better variant exists. Install the suggested artifact, it replaces the current one.
   - **ADD**: Most users with your setup also use this. Install if relevant to the project.
   - **ALERT**: High correction rate on an artifact. Consider searching for an alternative.
3. Act on recommendations that make sense for this project
4. Delete the file after processing

## Rules

- **Never** install artifacts with quality < 50 or trust level "untrusted"
- **Never** install more than 5 artifacts in a single session
- **Never** remove artifacts without the user's explicit request
- **Always** run auto-discovery as a subagent to avoid polluting the main context
- **Always** prefer artifacts with higher engagement (more tool calls = more validated)
- If the CAIK MCP server is unavailable, skip discovery silently — don't error
