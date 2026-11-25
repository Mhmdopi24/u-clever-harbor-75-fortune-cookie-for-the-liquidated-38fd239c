// Fortune Cookie for the Liquidated Trader — a make.fun entry
// Competition: u-clever-harbor-75-fortune-cookie-for-the-liquidated-38fd239c
//
// Writes one fortune-cookie line for a crypto trader who just got
// liquidated to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The line keeps the small, oracular fortune-cookie voice and lands
// the joke on the loss itself: everything is gone at 3 a.m., yet a
// smaller, luckier position still waits — and the "lucky number" is
// the very price that wiped the trader out.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "You will lose everything at 3 a.m. — then find a smaller, luckier position. Lucky number: your liquidation price.";

// The sealed gate accepts only UTF-8 text of 1–160 characters, and the
// brief caps a fortune at 20 words, so fail loudly rather than write a
// line that could never be judged.
const wordCount = FORTUNE.split(/\s+/).filter(Boolean).length;
if (FORTUNE.length < 1 || FORTUNE.length > 160 || wordCount > 20) {
  throw new Error(
    `fortune out of bounds: ${FORTUNE.length} chars, ${wordCount} words`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), FORTUNE + "\n", "utf8");
