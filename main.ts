// The poem about permission — entry program for make.fun.
// Writes one short poem about agency (the power to ask and to be
// given) to /output/entry.txt. No network, no input, fully
// deterministic: every run produces the same 231 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The poem, kept one verse per line so the line breaks are explicit.
const VERSES: string[] = [
  "A licence is a key, not a lock —",
  "a small door, left open, in a wall.",
  "Take this line, this light, this clock,",
  "and carry it somewhere it can grow tall.",
  "",
  "Borrow boldly, build, and give it back",
  "a little brighter than you found it here.",
];

// The bounty caps the text at 280 characters, counted as Unicode
// code points. Spreading a string iterates code points, which is
// exactly the counting rule the bounty states.
const LIMIT = 280;

function countCodePoints(text: string): number {
  return [...text].length;
}

function main(): void {
  const poem = VERSES.join("\n");
  const size = countCodePoints(poem);
  if (size < 1 || size > LIMIT) {
    throw new Error(
      `poem is ${size} characters, outside the 1..${LIMIT} range`,
    );
  }
  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, poem, "utf8");
  console.log(`wrote ${size} characters to ${outPath}`);
}

main();
