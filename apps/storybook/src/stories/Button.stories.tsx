import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "pathum-ds-library";

const meta = {
  title: "Design system/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    children: "Button",
  },
};

export const SecondaryGray: Story = {
  args: {
    hierarchy: "secondary-gray",
    size: "md",
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    children: "Disabled",
    isDisabled: true,
  },
};
