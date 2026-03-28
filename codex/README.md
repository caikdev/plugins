# CAIK Codex Plugin

Search, install, and share AI coding artifacts from the [CAIK](https://caik.dev) community registry — directly inside Codex.

## Installation

### Via Marketplace

Add the CAIK marketplace to your repo:

```json
// .agents/plugins/marketplace.json
{
  "name": "caikdev",
  "plugins": [
    {
      "name": "caik",
      "source": { "source": "local", "path": "./plugins/caik" },
      "policy": { "installation": "AVAILABLE" },
      "category": "Productivity"
    }
  ]
}
```

### Via CLI

```bash
npx caik-cli init
```

## What's Included

- **MCP Server**: Full artifact registry access (search, install, publish, review)
- **Skills**: CAIK discovery, auto-improvement, observation tracking
- **Hooks**: Session lifecycle tracking for collective intelligence

## Requirements

Enable hooks in your Codex config:

```toml
[features]
codex_hooks = true
```

## Learn More

- [CAIK Registry](https://caik.dev)
- [Documentation](https://docs.caik.dev)
