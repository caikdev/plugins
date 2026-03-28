#!/usr/bin/env bash
# CAIK hook dispatcher for Cursor — uses local dev build if available, otherwise npx.
# Called by hooks.json via ${CURSOR_PLUGIN_ROOT}/hooks/caik-hook.sh <subcommand> [args...]

set -e

CLI_PKG="caik-cli"

# Local dev build (sibling package in monorepo)
# Use realpath to resolve symlinks before passing to Node — dirname + ../..
# through a symlink works for shell -f tests but Node normalizes the string
# path, skipping symlink traversal and landing on a non-existent directory.
LOCAL_CLI="$(dirname "$0")/../../cli/dist/index.js"

if [ -f "$LOCAL_CLI" ]; then
  exec node "$(realpath "$LOCAL_CLI")" hook "$@"
else
  exec npx -y "$CLI_PKG" hook "$@"
fi
