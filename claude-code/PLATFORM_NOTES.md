# Platform Plugin Investigation

Investigation date: 2026-03-24

## Summary

Claude Code is the **only** supported platform with a formal plugin system (`.claude-plugin/plugin.json` + marketplace install). Neither Cursor nor OpenClaw currently offer an equivalent. Both platforms are well-served by the existing CLI adapter approach in `packages/cli/src/platform/`.

---

## Claude Code (Full Plugin -- IMPLEMENTED)

Claude Code's plugin system provides a declarative bundle format:

```
.claude-plugin/plugin.json   # Plugin metadata (name, version, description)
.mcp.json                    # MCP server declarations
hooks/hooks.json             # Lifecycle hook definitions (SessionStart, PostToolUse, Stop, SessionEnd)
hooks/caik-hook.sh           # Hook dispatcher script
skills/                      # Skill markdown files
```

Installation: `/plugin marketplace add caikdev/caik` then `/plugin install caik`

The CAIK plugin package lives at `packages/claude-code-plugin/` and is fully implemented.

---

## Cursor -- No Plugin System

### What Cursor supports (as of v1.7+)

| Capability | Format | Location |
|---|---|---|
| MCP servers | JSON config | `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global) |
| Hooks (beta) | `{ event, script, decision }` array | `.cursor/hooks.json` (project) |
| Skills | `SKILL.md` files | `~/.cursor/skills/<name>/` (global) or `.cursor/skills/` (local) |

### What Cursor does NOT have

- No `.cursor-plugin/` directory convention
- No `plugin.json` manifest
- No plugin marketplace or `cursor plugin install` command
- No way to bundle hooks + MCP + skills into a single installable unit
- No plugin discovery or auto-install mechanism

### Current adapter approach (correct)

The `CursorAdapter` at `packages/cli/src/platform/cursor.ts` handles Cursor integration by:

1. **MCP**: Writes `caik` entry to `.cursor/mcp.json` (project-level preferred, global fallback)
2. **Hooks**: Writes entries to `.cursor/hooks.json` with `{ event, script, decision }` format
   - `sessionStart` -- session initialization
   - `beforeMCPExecution` -- MCP tool tracking
   - `stop` -- session end + flush
3. **Skills**: Writes `SKILL.md` to `~/.cursor/skills/<slug>/` (global) or `.cursor/skills/<slug>/` (local)

Hook scripts use `npx -y @caik.dev/cli hook cursor-*` for zero-install execution.

### What would need to change if Cursor adds a plugin system

- Create `packages/cursor-plugin/` with whatever manifest format Cursor defines
- Add plugin detection to `CursorAdapter.detect()` (similar to `ClaudeCodeAdapter.isPluginInstalled()`)
- Skip manual MCP/hook/skill registration when plugin is installed
- The adapter already handles graceful degradation (hooks require v1.7+), so the pattern for version-gated features exists

---

## OpenClaw -- No Plugin System (Future Bundle Architecture Noted)

### What OpenClaw supports

| Capability | Format | Location |
|---|---|---|
| MCP servers | JSON config | `.mcp.json` (project root) |
| Hook packs | `HOOK.md` (frontmatter) + `handler.js` (ES module) | `~/.openclaw/hooks/<name>/` |
| Skills | `SKILL.md` with skill-lock tracking | `~/.agents/skills/<name>/` + `~/.agents/.skill-lock.json` |

### What OpenClaw does NOT have

- No plugin marketplace or `openclaw plugin install` command
- No declarative plugin manifest that bundles hooks + MCP + skills
- No plugin discovery mechanism

### The Bundle + Provider + Plugin architecture (future)

The tech spec notes: "OpenClaw's Bundle + Provider + Plugin architecture (2026) may require adaptation." This architecture is not yet available. When it arrives, it may provide a unified plugin format. The CAIK CLI should detect the OpenClaw version and adapt.

### Current adapter approach (correct)

The `OpenClawAdapter` at `packages/cli/src/platform/openclaw.ts` handles OpenClaw integration by:

1. **MCP**: Writes `caik` entry to `.mcp.json` in project root
2. **Hooks**: Writes a managed hook pack to `~/.openclaw/hooks/caik-contributions/`
   - `HOOK.md` -- frontmatter with event subscriptions (`command:new`, `command:reset`, `command:stop`, `command`)
   - `handler.js` -- ES module that buffers events and posts to CAIK API
   - Fire-and-forget with 2s timeout, never blocks the agent
3. **Skills**: Writes `SKILL.md` to `~/.agents/skills/caik/` and updates `~/.agents/.skill-lock.json`

The hook pack content is embedded inline in the adapter (not loaded from external files) for zero-dependency operation via npx.

A standalone copy of the hook pack also exists at `packages/cli/hooks/openclaw/` for reference/testing.

### What would need to change if OpenClaw adds a plugin system

- Create `packages/openclaw-plugin/` with the Bundle format once specified
- Add bundle detection to `OpenClawAdapter.detect()`
- Skip manual hook-pack + skill installation when bundle is installed
- The skill-lock.json integration would likely need to reference the bundle instead of individual skill entries

---

## Decision: No New Plugin Packages

Neither Cursor nor OpenClaw has a plugin system that would consume a declarative plugin package. Creating packages now would be:

1. **Speculative** -- no runtime to consume them
2. **Fragile** -- format would need to change when the actual system is defined
3. **Unnecessary** -- the CLI adapter approach already provides full integration

The existing adapter pattern (`packages/cli/src/platform/{cursor,openclaw}.ts`) is the correct approach for these platforms. When either platform adds a plugin system, the adapters already have the extension points needed (see `ClaudeCodeAdapter.isPluginInstalled()` and `getInstallMethod()` for the pattern to follow).

---

## File Reference

| File | Purpose |
|---|---|
| `packages/claude-code-plugin/` | Claude Code plugin package (implemented) |
| `packages/cli/src/platform/cursor.ts` | Cursor adapter -- manual MCP + hooks + skills |
| `packages/cli/src/platform/openclaw.ts` | OpenClaw adapter -- manual MCP + hook pack + skills |
| `packages/cli/src/platform/claude-code.ts` | Claude Code adapter -- plugin detection + manual fallback |
| `packages/cli/src/platform/types.ts` | Platform tier definitions (full-plugin, hook-enabled, cli-mcp) |
| `packages/cli/src/platform/templates/cursor-skill.ts` | Cursor SKILL.md template |
| `packages/cli/src/platform/templates/openclaw-skill.ts` | OpenClaw SKILL.md template |
| `packages/cli/hooks/openclaw/` | Standalone copy of OpenClaw hook pack |
| `docs/TECH_SPEC.md` (lines 1111-1167) | Platform integration specs |
| `docs/DECISIONS.md` (rows 161-183) | W16 plugin decisions log |
