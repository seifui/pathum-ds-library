/**
 * Builds packages/ui/src/styles/theme.css from Figma JSON exports.
 * Run: node scripts/generate-theme-css.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXPORT_DIR = path.join(__dirname, '../figma-export');
const OUT = path.join(__dirname, '../src/styles/theme.css');

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(EXPORT_DIR, name), 'utf8'));
}

function semanticTokenName(figmaPath) {
  const m = figmaPath.match(/^Colors\/(?:Background|Border|Foreground|Text)\/(.+)$/);
  if (!m) throw new Error(`Unexpected semantic path: ${figmaPath}`);
  let n = m[1];
  n = n.replace(/\s*\([^)]*\)\s*$/u, '').trim();
  return n.replace(/\s+/g, '-').toLowerCase();
}

function slugifyFamily(family) {
  const table = [
    [/^Gray \(light mode\)$/i, 'gray-light'],
    [/^Gray \(dark mode alpha\)$/i, 'gray-dark-alpha'],
    [/^Gray \(dark mode\)$/i, 'gray-dark'],
    [/^Gray neutral$/i, 'neutral'],
    [/^Gray blue$/i, 'gray-blue'],
    [/^Gray cool$/i, 'gray-cool'],
    [/^Gray iron$/i, 'gray-iron'],
    [/^Gray modern$/i, 'gray-modern'],
    [/^Gray warm$/i, 'gray-warm'],
    [/^Blue dark$/i, 'blue-dark'],
    [/^Blue light$/i, 'blue-light'],
    [/^Green light$/i, 'green-light'],
    [/^Orange dark$/i, 'orange-dark'],
  ];
  for (const [re, out] of table) {
    if (re.test(family)) return out;
  }
  let s = family.normalize('NFD').replace(/\p{M}/gu, '');
  s = s.replace(/\s*\([^)]*\)/g, '').trim();
  return s.toLowerCase().replace(/\s+/g, '-');
}

function primitiveVarSuffix(figmaPath) {
  const rest = figmaPath.replace(/^Colors\//, '');
  const [familyRaw, shade] = rest.split('/');
  if (!shade) throw new Error(`Bad primitive path: ${figmaPath}`);
  if (familyRaw === 'Base') {
    return `base-${shade.toLowerCase()}`;
  }
  const fam = slugifyFamily(familyRaw);
  return `${fam}-${shade}`;
}

function spacingNameFromExport(name) {
  const m = name.match(/^Spacing\/(.+?)\s*\(/u);
  if (!m) throw new Error(`Bad spacing name: ${name}`);
  return m[1].replace(/\u2024/g, '.').replace(/\./g, '-');
}

function srgbColor(r, g, b, a) {
  return `color(srgb ${r} ${g} ${b} / ${a})`;
}

function dropShadowToCss(e) {
  const { offset, radius, spread, color } = e;
  const { r, g, b, a } = color;
  return `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${srgbColor(r, g, b, a)}`;
}

function buildShadows(effectStyles) {
  const want = ['Shadows/shadow-xs', 'Shadows/shadow-sm', 'Shadows/shadow-md', 'Shadows/shadow-lg'];
  const map = {};
  for (const s of effectStyles.effectStyles) {
    if (want.includes(s.name)) {
      const parts = s.effects
        .filter((e) => e.type === 'DROP_SHADOW' && e.visible)
        .map(dropShadowToCss);
      map[s.name] = parts.join(', ');
    }
  }
  return map;
}

function percentToEm(percent) {
  return `${percent / 100}em`;
}

function textTailwindKeys(name) {
  if (name.startsWith('Display ')) {
    const sub = name.replace(/^Display\s+/, '').split('/')[0];
    return { base: `--text-display-${sub.toLowerCase()}` };
  }
  if (name.startsWith('Text ')) {
    const sub = name.replace(/^Text\s+/, '').split('/')[0].trim().toLowerCase();
    return { base: `--text-${sub}` };
  }
  return null;
}

const primitives = loadJson('primitives-color-variables.json');
const semantic = loadJson('semantic-colors.json');
const nonColorPrimitives = loadJson('primitives-non-color-variables.json');
const layoutTypography = loadJson('layout-typography-variables.json');
const textStylesFull = loadJson('text-styles.json');
const effects = loadJson('effect-styles.json');
const componentColors = loadJson('component-colors.json');

const shadowMap = buildShadows(effects);

const lines = [];
lines.push('/**');
lines.push(' * Design tokens exported from Figma (see packages/ui/figma-export/).');
lines.push(' * Light-mode semantic/component colors are defaults; .dark overrides where applicable.');
lines.push(' */');
lines.push('');
lines.push('@theme {');

lines.push('');
lines.push('  /* --- Primitive palette (_Primitives / Style) --- */');
for (const [k, v] of Object.entries(primitives.colors)) {
  const suf = primitiveVarSuffix(k);
  lines.push(`  --color-${suf}: ${v};`);
}

lines.push('');
lines.push('  /* --- Semantic colors: Light mode (1. Color modes) --- */');
for (const [k, v] of Object.entries(semantic.semanticColors)) {
  const t = semanticTokenName(k);
  lines.push(`  --color-${t}: ${v.Light};`);
}

lines.push('');
lines.push('  /* --- Component colors: Light mode --- */');
for (const [k, v] of Object.entries(componentColors.componentColors)) {
  const slug = k
    .replace(/^Component colors\//, '')
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
  lines.push(`  --color-component-${slug}: ${v.Light};`);
}

lines.push('');
lines.push('  /* --- Spacing floats (_Primitives, px) --- */');
for (const row of nonColorPrimitives.primitivesNonColor) {
  const key = spacingNameFromExport(row.name);
  lines.push(`  --spacing-${key}: ${row.value}px;`);
}

lines.push('');
lines.push('  /* --- Radius (layout-typography-variables: 2. Radius) --- */');
const radiusPick = ['radius-sm', 'radius-md', 'radius-lg', 'radius-xl', 'radius-full'];
for (const row of layoutTypography.layoutTypography) {
  if (row.collection === '2. Radius' && radiusPick.includes(row.name)) {
    lines.push(`  --${row.name}: ${row.value}px;`);
  }
}

lines.push('');
lines.push('  /* --- Layout, widths, containers, typography variables (layout-typography-variables.json) --- */');
for (const row of layoutTypography.layoutTypography) {
  if (row.collection === '2. Radius') continue;
  const n = row.name.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase();
  if (row.type === 'FLOAT') {
    const unitless = row.collection === '6. Typography' && row.name.startsWith('Font weight/');
    lines.push(`  --${n}: ${unitless ? row.value : `${row.value}px`};`);
  } else if (row.type === 'STRING') {
    lines.push(`  --${n}: ${JSON.stringify(row.value)};`);
  }
}

lines.push('');
lines.push('  /* --- Text styles: Regular / no decoration (text-styles.json) --- */');
const regularText = textStylesFull.textStyles.filter(
  (s) => s.fontStyle === 'Regular' && s.textDecoration === 'NONE',
);
const seen = new Set();
for (const s of regularText) {
  const keys = textTailwindKeys(s.name);
  if (!keys || seen.has(keys.base)) continue;
  seen.add(keys.base);
  const lh = s.lineHeight?.unit === 'PIXELS' ? `${s.lineHeight.value}px` : 'normal';
  lines.push(`  ${keys.base}: ${s.fontSize}px;`);
  lines.push(`  ${keys.base}--line-height: ${lh};`);
  if (s.letterSpacing?.unit === 'PERCENT' && s.letterSpacing.value !== 0) {
    lines.push(`  ${keys.base}--letter-spacing: ${percentToEm(s.letterSpacing.value)};`);
  }
}

lines.push('');
lines.push('  /* --- Shadows (effect-styles.json → Shadows/shadow-*) --- */');
lines.push(`  --shadow-xs: ${shadowMap['Shadows/shadow-xs']};`);
lines.push(`  --shadow-sm: ${shadowMap['Shadows/shadow-sm']};`);
lines.push(`  --shadow-md: ${shadowMap['Shadows/shadow-md']};`);
lines.push(`  --shadow-lg: ${shadowMap['Shadows/shadow-lg']};`);

lines.push('}');
lines.push('');
lines.push('@layer theme {');
lines.push('  .dark {');

lines.push('');
lines.push('    /* Semantic colors: Dark mode */');
for (const [k, v] of Object.entries(semantic.semanticColors)) {
  const t = semanticTokenName(k);
  lines.push(`    --color-${t}: ${v.Dark};`);
}

lines.push('');
lines.push('    /* Component colors: Dark mode */');
for (const [k, v] of Object.entries(componentColors.componentColors)) {
  const slug = k
    .replace(/^Component colors\//, '')
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
  lines.push(`    --color-component-${slug}: ${v.Dark};`);
}

lines.push('  }');
lines.push('}');
lines.push('');

const out = lines.join('\n');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out, 'utf8');
console.warn(`Wrote ${OUT} (${lines.length} lines)`);
