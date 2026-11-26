// The 3AM Commit Message — make.fun bounty entry
// Writes the winning one-line commit message to /output/entry.txt
// (and to ./entry.txt when run locally). No dependencies, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ENTRY =
  "merge conflict with myself; kept the version I no longer remember writing";

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const targets = ["/output/entry.txt", join(here, "entry.txt")];
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, ENTRY + "\n", "utf8");
      console.log(`wrote ${ENTRY.length} chars to ${target}`);
    } catch (err) {
      console.error(`could not write ${target}: ${(err as Error).message}`);
    }
  }
}

main();
