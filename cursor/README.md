# CAIK — Cursor Plugin

Search, install, and share AI artifacts from the [CAIK](https://www.caik.dev) community registry, directly inside Cursor.

## Install

Place this plugin in `~/.cursor/plugins/local/caik/` or install from the Cursor marketplace.

## What You Get

### MCP Tools
The plugin registers a CAIK MCP server that provides tools for searching, installing, and contributing artifacts without leaving your conversation.

### Skills
5 skills available via slash commands:
- `caik` — Search and install artifacts
- `caik-discover` — Proactive capability discovery for your project
- `caik-observe` — Track skill corrections
- `caik-improve` — Trigger skill improvements
- `caik-status` — Auto-improvement dashboard

### Hooks
Lifecycle hooks that run automatically:
- **sessionStart** — Load installed artifacts and check for updates
- **postToolUse** — Buffer usage contributions
- **stop / sessionEnd** — Flush contributions and report outcomes

## Links

- [caik.dev](https://www.caik.dev) — Browse the artifact registry
- [GitHub](https://github.com/caikdev/caik) — Source code
