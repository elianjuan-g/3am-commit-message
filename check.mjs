// Self-check for the 3AM Commit Message entry.
// Gate: UTF-8, exactly one line, 1-139 characters, not only whitespace.
// Exit 0 on pass, 1 on failure, with a clear message.
import { readFileSync } from "node:fs";

const TARGETS = ["./entry.txt", "/output/entry.txt"];

let ok = false;
for (const target of TARGETS) {
  let raw;
  try {
    raw = readFileSync(target);
  } catch {
    continue;
  }
  // Strict UTF-8 decode: throws on invalid sequences.
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
  } catch {
    console.error(`FAIL: ${target} is not valid UTF-8`);
    process.exit(1);
  }
  const line = text.replace(/\r?\n$/, "");
  if (line.includes("\n") || line.includes("\r")) {
    console.error(`FAIL: ${target} must be exactly one line`);
    process.exit(1);
  }
  if (line.length < 1 || line.length > 139) {
    console.error(`FAIL: ${target} is ${line.length} characters (must be 1-139)`);
    process.exit(1);
  }
  if (line.trim().length === 0) {
    console.error(`FAIL: ${target} is only whitespace`);
    process.exit(1);
  }
  console.log(`PASS: ${target} — ${line.length} characters, one line, valid UTF-8`);
  console.log(`entry: ${line}`);
  ok = true;
  break;
}
if (!ok) {
  console.error("FAIL: no entry.txt found (run `node main.ts` first)");
  process.exit(1);
}
