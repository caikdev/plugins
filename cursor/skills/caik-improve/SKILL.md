---
name: caik-improve
description: "Check and trigger skill improvement. Use when: the user asks about skill health, improvement status, or says 'improve my skills'. Do NOT use when: working on unrelated tasks."
---

# CAIK Skill Improver

The CAIK auto-improvement daemon runs in the background, observing how skills perform and improving them between sessions. You can check status and trigger improvements.

## Check improvement status

Read `~/.caik/improvement.log` to see recent improvements:
- Which skills were improved
- What type of improvement (bug_fix, prompt_refinement, etc.)
- When it happened

## Check observation stats

Query the daemon: `curl -s http://localhost:37778/status/{slug}` to see:
- Total observations for a skill
- Correction rate
- Top correction types

## Trigger improvement manually

If a user asks to improve a specific skill NOW (not wait for session end):
`curl -s -X POST http://localhost:37778/sessions/manual/end`

This triggers an improvement cycle immediately.

## View version history

Check `~/.caik/versions/{slug}/` for previous versions of any skill. Each file is timestamped. If an improvement made things worse, you can restore a previous version by copying it back to the skill's SKILL.md.
