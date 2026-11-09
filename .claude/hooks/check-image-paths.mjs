// PostToolUse hook: after editing a file in src/, verify every "/photos/..." (or other
// public/ image) path it references exists in public/ with EXACT case. Windows ignores
// case; Vercel (Linux) does not. Exits 2 with a message to Claude if anything is wrong.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const input = JSON.parse(fs.readFileSync(0, "utf8") || "{}");
const file = input.tool_input?.file_path || input.tool_response?.filePath;
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
if (!file || !/\.(jsx?|tsx?|css)$/.test(file)) process.exit(0);
const rel = path.relative(root, path.resolve(root, file)).split(path.sep).join("/");
if (!rel.startsWith("src/")) process.exit(0);

const text = fs.readFileSync(path.resolve(root, file), "utf8");
const re = /["'`(]\/((?:photos\/)?[^"'`()\n]+\.(?:jpe?g|png|webp|gif|svg|ico))["'`)]/gi;
const refs = new Set();
for (const m of text.matchAll(re)) {
  if (m[1].startsWith("photos/members/")) continue; // legacy archive folder, already gone
  refs.add(m[1]);
}

// Exact-case existence check, segment by segment.
function existsExact(relPath) {
  let dir = path.join(root, "public");
  for (const seg of relPath.split("/")) {
    let names;
    try { names = fs.readdirSync(dir); } catch { return false; }
    if (!names.includes(seg)) return false;
    dir = path.join(dir, seg);
  }
  return true;
}

let tracked = new Set();
try {
  tracked = new Set(
    execFileSync("git", ["ls-files", "public"], { cwd: root, encoding: "utf8" }).split("\n"),
  );
} catch {}

const missing = [], untracked = [];
for (const r of refs) {
  if (!existsExact(r)) missing.push(r);
  else if (tracked.size && !tracked.has("public/" + r)) untracked.push(r);
}
if (!missing.length && !untracked.length) process.exit(0);

let msg = `Image path check for ${rel}:\n`;
if (missing.length)
  msg += `- Not found in public/ with exact case (will 404 on Vercel):\n${missing.map((m) => "    /" + m).join("\n")}\n`;
if (untracked.length)
  msg += `- Exists but not tracked by git (won't deploy until git add):\n${untracked.map((m) => "    /" + m).join("\n")}\n`;
process.stderr.write(msg);
process.exit(2);
