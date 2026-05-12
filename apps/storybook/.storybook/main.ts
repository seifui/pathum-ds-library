import type { StorybookConfig } from "@storybook/react-vite";

const config = {
  stories: ["../../../packages/ui/src/**/*.stories.tsx"],

  framework: {
    name: "@storybook/react-vite",
    options: {
      /** Ensures @tailwindcss/vite + monorepo aliases from apps/storybook/vite.config.ts are applied. */
      builder: {
        viteConfigPath: "vite.config.ts",
      },
    },
  },

  addons: ["@storybook/addon-essentials"],
} satisfies StorybookConfig;

export default config;
