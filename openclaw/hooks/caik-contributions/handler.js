/**
 * CAIK contribution tracking hook for OpenClaw.
 * Fire-and-forget — never blocks the agent, never throws.
 */
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CAIK_DIR = path.join(os.homedir(), ".caik");
const PENDING_PATH = path.join(CAIK_DIR, "pending-events.json");
const CONFIG_PATH = path.join(CAIK_DIR, "config.json");
const TIMEOUT_MS = 2000;

async function loadConfig() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch { return {}; }
}

async function getApiUrl() {
  const cfg = await loadConfig();
  return process.env.CAIK_API_URL || cfg.apiUrl || "https://caik.dev";
}

async function getApiKey() {
  const cfg = await loadConfig();
  return process.env.CAIK_API_KEY || cfg.apiKey || null;
}

async function readPending() {
  try {
    const raw = await fs.readFile(PENDING_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

async function writePending(events) {
  await fs.mkdir(CAIK_DIR, { recursive: true });
  await fs.writeFile(PENDING_PATH, JSON.stringify(events) + "\n", "utf-8");
}

async function appendEvent(event) {
  const events = await readPending();
  events.push(event);
  await writePending(events);
  return events;
}

async function clearPending() { await writePending([]); }

async function postEvents(events) {
  if (events.length === 0) return;
  const apiUrl = await getApiUrl();
  const apiKey = await getApiKey();
  const headers = { "Content-Type": "application/json" };
  if (apiKey) headers["Authorization"] = "Bearer " + apiKey;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    await fetch(apiUrl + "/api/v1/events", {
      method: "POST", headers,
      body: JSON.stringify({ events }),
      signal: controller.signal,
    });
    await clearPending();
  } catch { /* fire-and-forget */ }
  finally { clearTimeout(timeout); }
}

const handler = async (event) => {
  try {
    const cfg = await loadConfig();
    if (cfg.contributions === false || cfg.contribution === false) return;
    const timestamp = (event.timestamp ?? new Date()).toISOString();
    if (event.type === "command") {
      const action = event.action;
      if (action === "new") {
        await postEvents([{ type: "session_start", platform: "openclaw", timestamp }]);
      } else if (action === "stop" || action === "reset") {
        const pending = await readPending();
        pending.push({ type: "session_end", platform: "openclaw", timestamp });
        await postEvents(pending);
      } else {
        await appendEvent({ type: "tool_use", platform: "openclaw", tool: action, timestamp });
        const pending = await readPending();
        if (pending.length >= 50) await postEvents(pending);
      }
    }
  } catch { /* never fail */ }
};

export default handler;
