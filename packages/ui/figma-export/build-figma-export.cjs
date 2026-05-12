"use strict";

const fs = require("fs");
const path = require("path");

const dir = __dirname;
const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");
const writeJson = (f, data) =>
  fs.writeFileSync(path.join(dir, f), JSON.stringify(data, null, 2) + "\n");

const FIGMA_FILE_KEY = "FZby9tDsWqefPCcRFUehrj";

function mergePrimitives() {
  const colors = {
    ...JSON.parse(read("primitives-color-slice-a.json")),
    ...JSON.parse(read("primitives-color-slice-b.json")),
    ...JSON.parse(read("primitives-color-slice-c.json")),
    ...JSON.parse(read("primitives-color-slice-d.json")),
  };
  const count = Object.keys(colors).length;
  if (count !== 375) throw new Error(`primitives: expected 375 colors, got ${count}`);
  return colors;
}

function parseComponentTsv(text) {
  const out = {};
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    const tab = line.indexOf("\t");
    if (tab === -1) throw new Error(`Bad TSV line (no tab): ${line}`);
    const tab2 = line.indexOf("\t", tab + 1);
    if (tab2 === -1) throw new Error(`Bad TSV line (one tab only): ${line}`);
    const name = line.slice(0, tab);
    const Light = line.slice(tab + 1, tab2);
    const Dark = line.slice(tab2 + 1);
    out[name] = { Light, Dark };
  }
  return out;
}

function mergeComponentColors() {
  const text = read("component-colors-part-a.tsv") + "\n" + read("component-colors-part-b.tsv");
  const componentColors = parseComponentTsv(text);
  const count = Object.keys(componentColors).length;
  if (count !== 247) throw new Error(`component colors: expected 247, got ${count}`);
  return componentColors;
}

const primitivesColors = mergePrimitives();
writeJson("primitives-color-variables.json", {
  figmaFileKey: FIGMA_FILE_KEY,
  collection: "_Primitives",
  mode: "Style",
  count: 375,
  colors: primitivesColors,
});

const componentColors = mergeComponentColors();
writeJson("component-colors.json", {
  figmaFileKey: FIGMA_FILE_KEY,
  collection: "1. Color modes",
  modes: { light: "Light mode", dark: "Dark mode" },
  count: 247,
  componentColors,
});

console.log("Wrote primitives-color-variables.json (375) and component-colors.json (247)");
