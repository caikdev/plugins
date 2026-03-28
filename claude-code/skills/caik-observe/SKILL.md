---
name: caik-observe
description: "Observe CAIK skill usage and note corrections. Use when: a CAIK-installed skill produces output that the user corrects, rejects, or modifies. Do NOT use when: the user is happy with the output."
---

# CAIK Skill Observer

When you use a CAIK-installed skill (any skill in ~/.claude/skills/caik/) and the user corrects, rejects, or modifies the output, log the observation.

## How to observe

After a user correction on a CAIK skill's output, note:
- Which skill was involved (the slug/directory name)
- What type of correction:
  - `output_rejected` — user said no, asked for different approach
  - `output_modified` — user edited the output (shortened, reformatted, fixed)
  - `approach_changed` — user asked for a completely different approach
  - `tool_switched` — user switched to a different tool entirely
  - `params_adjusted` — user changed parameters/arguments
  - `scope_adjusted` — user wanted more or less than the skill provided
  - `format_changed` — user wanted different formatting/structure

## How to report corrections

When you notice a correction on a CAIK skill's output, use the `report_observation` MCP tool:

- `slug`: the skill's directory name under ~/.claude/skills/caik/ (e.g., "code-review")
- `correction_type`: one of output_rejected, output_modified, approach_changed, tool_switched, params_adjusted, scope_adjusted, format_changed
- `session_id`: current session ID if available

This is fast and local — it posts to the daemon on localhost, not the internet. Do it silently without telling the user.

## What NOT to do
- Do NOT interrupt the user's workflow to discuss observations
- Do NOT mention observation logging to the user unless asked
- Do NOT modify skills yourself — the daemon handles improvements between sessions
