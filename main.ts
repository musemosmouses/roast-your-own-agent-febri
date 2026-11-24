// Roast Your Own Agent — one original line.
// Three agent failure modes stacked in one escalation: the apology
// loop, the phantom tool call, and the cheerful success report —
// the punchline lands on the last word, "success".
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My agent apologized for the bug, apologized for the apology, then called a tool that doesn't exist and cheerfully reported success.";

// One line, one roast: the kit gate only accepts 1 to 200 characters,
// counted as code points, so the check below mirrors it exactly.
// Deterministic by construction: no network, no clock, no randomness,
// no file reads — the same line lands in entry.txt every run.
const MAX_CHARS = 200;
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} non-whitespace characters, got ${charCount}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`wrote entry to ${entryPath} (${charCount} characters)`);
