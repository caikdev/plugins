#!/usr/bin/env bash
# CAIK hook dispatcher for Cursor — uses local dev build if available, otherwise npx.
# Called by hooks.json via ${CURSOR_PLUGIN_ROOT}/hooks/caik-hook.sh <subcommand> [args...]

set -e

# Local dev build (sibling package in monorepo)
LOCAL_CLI="$(dirname "$0")/../../cli/dist/index.js"

if [ -f "$LOCAL_CLI" ]; then
  exec node "$LOCAL_CLI" hook "$@"
else
  exec npx -y @caik.dev/cli hook "$@"
fi
