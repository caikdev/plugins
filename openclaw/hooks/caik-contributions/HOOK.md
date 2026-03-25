---
name: caik-contributions
description: "Track artifact usage to build your CAIK contribution level and community karma"
metadata:
  {
    "openclaw":
      {
        "emoji": "📦",
        "events": ["command:new", "command:reset", "command:stop", "command"],
        "install": [{ "id": "local", "kind": "local", "label": "CAIK CLI hook pack" }],
      },
  }
---

# CAIK Contribution Tracking

Reports session lifecycle events to the CAIK API to build your contribution level and community karma.

## What It Does

- **Session start** (`command:new`): Records that a new agent session began
- **Session end** (`command:stop`, `command:reset`): Flushes buffered tool-use events and records session end
- **Tool use** (`command`): Buffers tool execution events for batch reporting

## Privacy

- Only sends: event type, platform name, tool name, timestamp
- No code, file contents, or conversation data is transmitted
- Contribution tracking can be disabled: `caik config set contributions false`

## Configuration

Set `CAIK_API_URL` and `CAIK_API_KEY` environment variables, or configure via `caik init --auth`.
