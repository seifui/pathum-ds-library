import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const appRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appRoot, "../..");

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      /** Use source entry so Storybook works without a prebuilt `dist/`. */
      "pathum-ds-library": path.join(repoRoot, "packages/ui/src/index.ts"),
    },
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
});
