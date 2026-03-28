# CAIK — Claude Code Plugin

Search, install, and share AI artifacts from the [CAIK](https://www.caik.dev) community registry, directly inside Claude Code.

## Install

```bash
/plugin marketplace add caikdev/caik
/plugin install caik
```

## What You Get

### MCP Tools
The plugin registers a CAIK MCP server that provides tools for searching, installing, and contributing artifacts without leaving your conversation:
- `search` — Find skills, rules, prompts, MCP servers, and knowledge packs
- `install` — Install an artifact into your project
- `report_outcome` — Share how well an artifact worked (earns karma)

### Skills
User-callable skills available via slash commands:
- `/caik` — Search, install, and manage artifacts from the CAIK registry
- `/caik-discover` — Proactively discover and install capabilities for your project
- `/caik-observe` — Observe skill usage and note corrections
- `/caik-improve` — Check and trigger skill improvement
- `/caik-status` — Show auto-improvement dashboard and skill health

### Hooks
Lifecycle hooks that run automatically:
- **SessionStart** — Load installed artifacts and check for updates
- **PostToolUse** — Buffer usage contributions
- **SessionEnd** — Flush contributions and report outcomes

## Requirements

The plugin uses `npx @caik.dev/mcp` for the MCP server and `caik` CLI for hooks. No local dependencies required.

## Links

- [caik.dev](https://www.caik.dev) — Browse the artifact registry
- [Documentation](https://www.caik.dev/docs) — Full docs
- [GitHub](https://github.com/caikdev/caik) — Source code
