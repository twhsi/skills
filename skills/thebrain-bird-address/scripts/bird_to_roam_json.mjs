#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { birdToRoamPages, parseBirdJson } from "./roam-converter.mjs";

function usage() {
  return "Usage: node scripts/bird_to_roam_json.mjs <bird.json> [roam-import.json]";
}

async function main() {
  const [inputName, outputName] = process.argv.slice(2);
  if (!inputName || inputName === "--help" || inputName === "-h") {
    process.stdout.write(`${usage()}\n`);
    process.exitCode = inputName ? 0 : 1;
    return;
  }

  const source = await readFile(path.resolve(inputName), "utf8");
  const pages = birdToRoamPages(parseBirdJson(source));
  const output = `${JSON.stringify(pages, null, 2)}\n`;

  if (outputName) {
    const target = path.resolve(outputName);
    await writeFile(target, output, "utf8");
    process.stderr.write(`Wrote ${pages.length} Roam page(s) to ${target}\n`);
    return;
  }

  process.stdout.write(output);
}

main().catch((error) => {
  process.stderr.write(`BIRD to Roam conversion failed: ${error.message}\n`);
  process.exitCode = 1;
});
