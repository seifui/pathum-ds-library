import type { Meta, StoryObj } from "@storybook/react";

import { Button, Input } from "pathum-ds-library";

const meta = {
  title: "Design system/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Input
      className="w-[320px]"
      label="Email"
      placeholder="you@company.com"
      hint="This is a hint text to help user."
      size="sm"
    />
  ),
};

export const WithTrailingButton: Story = {
  render: () => (
    <Input
      className="w-[320px]"
      composition="trailing-button"
      label="Website"
      placeholder="you@company.com"
      hint="This is a hint text to help user."
      trailingButton={
        <Button hierarchy="tertiary-gray" size="sm">
          Copy
        </Button>
      }
    />
  ),
};
