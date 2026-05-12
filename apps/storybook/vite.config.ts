import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

/** Monorepo root — needed so Vite can read `packages/ui` and resolve `@fontsource` from the UI package. */
const appRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appRoot, "../..");

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@repo/ui": path.join(repoRoot, "packages/ui/src"),
    },
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
});
