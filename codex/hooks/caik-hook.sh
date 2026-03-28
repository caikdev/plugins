#!/usr/bin/env bash
# CAIK hook dispatcher — uses local dev build if available, otherwise npx.
# For local monorepo development only. Production hooks use npx directly (see hooks.json).

set -e

CLI_PKG="caik-cli"

# Local dev build (sibling package in monorepo)
LOCAL_CLI="$(dirname "$0")/../../cli/dist/index.js"

if [ -f "$LOCAL_CLI" ]; then
  exec node "$(realpath "$LOCAL_CLI")" hook "$@"
else
  exec npx -y "$CLI_PKG" hook "$@"
fi
