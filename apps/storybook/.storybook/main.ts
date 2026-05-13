import type { StorybookConfig } from "@storybook/react-vite";

const config = {
  stories: [
    "../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "vite.config.ts",
      },
    },
  },

  addons: ["@storybook/addon-essentials"],
} satisfies StorybookConfig;

export default config;
