# CAIK Hooks

The CAIK plugin registers lifecycle hooks via the `caik` CLI to provide context and contribution data.

## Hook Events

### SessionStart
Runs on `startup`, `clear`, or `compact` events. Initializes the CAIK context for the current session — loads installed artifacts, checks for updates, and injects any active rules or prompts into the conversation context.

### PostToolUse
Runs after every tool call. Buffers lightweight tool-usage signals (tool name, duration, success/failure) so CAIK can track which installed artifacts are actually being used. Data is buffered in memory and only flushed at session end.

### Stop / SessionEnd
Runs when the conversation stops or the session ends. Flushes any buffered contribution events to the CAIK API. If the user has opted into contribution, this also reports aggregated outcome data that earns karma.

## Notes

- All hooks delegate to `npx -y caik-cli hook <event>` subcommands via the CLI.
- Timeouts are conservative (5-10s) to avoid blocking the user.
- The CLI is invoked via `npx` so no global install is required.
