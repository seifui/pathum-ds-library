import type { Preview } from "@storybook/react";
import { createElement, type ReactElement } from "react";

import "../src/styles/storybook.css";

const preview: Preview = {
  decorators: [
    (Story): ReactElement =>
      createElement(
        "div",
        { className: "min-w-0 [color-scheme:light]" },
        createElement(Story),
      ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#F2F4F7" },
        { name: "dark", value: "#101828" },
      ],
    },
  },
};

export default preview;
