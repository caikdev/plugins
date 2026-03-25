# CAIK Plugins

Plugins for [CAIK](https://caik.dev) — the package manager for AI agents.

## Claude Code

```
/plugin marketplace add caikdev/plugins
/plugin install caik
```

Provides: 5 skills (caik, caik-discover, caik-observe, caik-improve, caik-status), MCP tools, lifecycle hooks.

## Cursor

Install `cursor/` to `~/.cursor/plugins/local/caik/`, or wait for Cursor marketplace support.

## OpenClaw

The hook pack and skills are auto-installed by `caik init`. Manual install:

```bash
openclaw hooks install ./openclaw/hooks/caik-contributions
cp -r ./openclaw/skills/caik ~/.agents/skills/caik
```

## Links

- [caik.dev](https://caik.dev) — Browse 350K+ artifacts
- [npm: @caik.dev/cli](https://www.npmjs.com/package/@caik.dev/cli) — CLI
- [npm: @caik.dev/mcp](https://www.npmjs.com/package/@caik.dev/mcp) — MCP server
