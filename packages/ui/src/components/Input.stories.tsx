import type { Meta, StoryObj } from "@storybook/react";
import type { JSX } from "react";

import { Button } from "./Button";
import { Input } from "./Input";

function IconMail(props: { className?: string }): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} aria-hidden>
      <path
        d="M4 6h16a2 2 0 012 2v.4l-10 6.25L2 8.4V8a2 2 0 012-2Zm18 4.56V16a2 2 0 01-2 2H4a2 2 0 01-2-2v-5.44l10 6.25L22 10.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconChevronDown(props: { className?: string }): JSX.Element {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={props.className} aria-hidden>
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagChip(props: { children: string }): JSX.Element {
  return (
    <span
      className={
        "inline-flex max-w-full items-center rounded-[6px] bg-(--color-bg-secondary) px-2 py-px " +
        "[font-family:var(--font-family)] [font-size:var(--font-size-text-sm)] [font-weight:var(--font-weight-medium)] " +
        "leading-[var(--line-height-text-sm)] text-(--color-text-secondary)"
      }
    >
      {props.children}
    </span>
  );
}

function docsSource(code: string) {
  return {
    docs: {
      source: {
        code,
      },
    },
  };
}

function leadingDropdownSample(): JSX.Element {
  return (
    <>
      <span className="text-(--color-text-secondary) [font-size:var(--font-size-text-md)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-md)]">
        US
      </span>
      <IconChevronDown className="size-4 shrink-0 text-(--color-fg-tertiary)" />
    </>
  );
}

function trailingDropdownSample(): JSX.Element {
  return (
    <>
      <span className="text-(--color-text-secondary) [font-size:var(--font-size-text-md)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-md)]">
        USD
      </span>
      <IconChevronDown className="size-4 shrink-0 text-(--color-fg-tertiary)" />
    </>
  );
}

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#F2F4F7" },
      ],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const mailLeadingIconSnippet = `<span className="text-(--color-fg-tertiary)">
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 6h16a2 2 0 012 2v.4l-10 6.25L2 8.4V8a2 2 0 012-2Zm18 4.56V16a2 2 0 01-2 2H4a2 2 0 01-2-2v-5.44l10 6.25L22 10.56Z"
      fill="currentColor"
    />
  </svg>
</span>`;

export const Default: Story = {
  name: "Default",
  parameters: docsSource(`<Input
  className="w-[320px]"
  label="Email"
  placeholder="you@company.com"
  hint="This is a hint text to help user."
  size="sm"
/>`),
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

export const Disabled: Story = {
  name: "Disabled",
  parameters: docsSource(`<Input
  className="w-[320px]"
  label="Email"
  placeholder="you@company.com"
  hint="This is a hint text to help user."
  isDisabled
  size="sm"
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      label="Email"
      placeholder="you@company.com"
      hint="This is a hint text to help user."
      isDisabled
      size="sm"
    />
  ),
};

export const Focused: Story = {
  name: "Focused",
  parameters: docsSource(`<Input
  className="w-[320px]"
  label="Email"
  placeholder="you@company.com"
  hint="This is a hint text to help user."
  autoFocus
  size="sm"
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      label="Email"
      placeholder="you@company.com"
      hint="This is a hint text to help user."
      autoFocus
      size="sm"
    />
  ),
};

export const Invalid: Story = {
  name: "Invalid",
  parameters: docsSource(`<Input
  className="w-[320px]"
  label="Email"
  placeholder="you@company.com"
  destructive
  errorMessage="This is an error message."
  size="sm"
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      label="Email"
      placeholder="you@company.com"
      destructive
      errorMessage="This is an error message."
      size="sm"
    />
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  parameters: docsSource(`<div className="flex flex-col gap-4">
  <Input
    className="w-[320px]"
    label="Email"
    placeholder="you@company.com"
    hint="This is a hint text to help user."
    size="sm"
  />
  <Input
    className="w-[320px]"
    label="Email"
    placeholder="you@company.com"
    hint="This is a hint text to help user."
    size="md"
  />
</div>`),
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        className="w-[320px]"
        label="Email"
        placeholder="you@company.com"
        hint="This is a hint text to help user."
        size="sm"
      />
      <Input
        className="w-[320px]"
        label="Email"
        placeholder="you@company.com"
        hint="This is a hint text to help user."
        size="md"
      />
    </div>
  ),
};

export const CompositionIconLeading: Story = {
  name: "Composition: icon-leading",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="icon-leading"
  label="Email"
  placeholder="you@company.com"
  hint="This is a hint text to help user."
  leadingIcon={${mailLeadingIconSnippet}}
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      composition="icon-leading"
      label="Email"
      placeholder="you@company.com"
      hint="This is a hint text to help user."
      leadingIcon={<IconMail className="size-4 text-(--color-fg-tertiary)" />}
    />
  ),
};

const leadingDropdownSnippet = `<>
  <span className="text-(--color-text-secondary) [font-size:var(--font-size-text-md)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-md)]">
    US
  </span>
  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="m4 6 4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</>`;

export const CompositionLeadingDropdown: Story = {
  name: "Composition: leading-dropdown",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="leading-dropdown"
  label="Phone number"
  placeholder="+1 (555) 000-0000"
  hint="This is a hint text to help user."
  leadingDropdown={${leadingDropdownSnippet}}
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      composition="leading-dropdown"
      label="Phone number"
      placeholder="+1 (555) 000-0000"
      hint="This is a hint text to help user."
      leadingDropdown={leadingDropdownSample()}
    />
  ),
};

const trailingDropdownSnippet = `<>
  <span className="text-(--color-text-secondary) [font-size:var(--font-size-text-md)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-md)]">
    USD
  </span>
  <svg viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="m4 6 4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</>`;

export const CompositionTrailingDropdown: Story = {
  name: "Composition: trailing-dropdown",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="trailing-dropdown"
  label="Sale amount"
  placeholder="0.00"
  hint="This is a hint text to help user."
  trailingDropdown={${trailingDropdownSnippet}}
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      composition="trailing-dropdown"
      label="Sale amount"
      placeholder="0.00"
      hint="This is a hint text to help user."
      trailingDropdown={trailingDropdownSample()}
    />
  ),
};

export const CompositionLeadingText: Story = {
  name: "Composition: leading-text",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="leading-text"
  label="Website"
  placeholder="www.example.com"
  hint="This is a hint text to help user."
  leadingText="https://"
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      composition="leading-text"
      label="Website"
      placeholder="www.example.com"
      hint="This is a hint text to help user."
      leadingText="https://"
    />
  ),
};

const paymentGraphicSnippet = `<div
  className="size-full rounded-[2px] bg-gradient-to-br from-[#5a6b82] to-[#3d4a5c]"
  aria-hidden
/>`;

export const CompositionPaymentInput: Story = {
  name: "Composition: payment-input",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="payment-input"
  label="Card number"
  placeholder="1234 1234 1234 1234"
  hint="This is a hint text to help user."
  paymentGraphic={${paymentGraphicSnippet}}
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      composition="payment-input"
      label="Card number"
      placeholder="1234 1234 1234 1234"
      hint="This is a hint text to help user."
      paymentGraphic={
        <div
          className="size-full rounded-[2px] bg-gradient-to-br from-[#5a6b82] to-[#3d4a5c]"
          aria-hidden
        />
      }
    />
  ),
};

const trailingButtonSnippet = `<Button hierarchy="tertiary-gray" size="sm">
  Copy
</Button>`;

export const CompositionTrailingButton: Story = {
  name: "Composition: trailing-button",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="trailing-button"
  label="Website"
  placeholder="you@company.com"
  hint="This is a hint text to help user."
  trailingButton={${trailingButtonSnippet}}
/>`),
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

const tagsSnippet = `<>
  <span className="inline-flex max-w-full items-center rounded-[6px] bg-(--color-bg-secondary) px-2 py-px [font-family:var(--font-family)] [font-size:var(--font-size-text-sm)] [font-weight:var(--font-weight-medium)] leading-[var(--line-height-text-sm)] text-(--color-text-secondary)">
    Design
  </span>
  <span className="inline-flex max-w-full items-center rounded-[6px] bg-(--color-bg-secondary) px-2 py-px [font-family:var(--font-family)] [font-size:var(--font-size-text-sm)] [font-weight:var(--font-weight-medium)] leading-[var(--line-height-text-sm)] text-(--color-text-secondary)">
    Research
  </span>
</>`;

export const CompositionTags: Story = {
  name: "Composition: tags",
  parameters: docsSource(`<Input
  className="w-[320px]"
  composition="tags"
  label="Tags"
  hint="This is a hint text to help user."
  tags={${tagsSnippet}}
/>`),
  render: () => (
    <Input
      className="w-[320px]"
      composition="tags"
      label="Tags"
      hint="This is a hint text to help user."
      tags={
        <>
          <TagChip>Design</TagChip>
          <TagChip>Research</TagChip>
        </>
      }
    />
  ),
};

export const AllStatesOverview: Story = {
  name: "All states (overview)",
  parameters: docsSource(`<div className="flex flex-col gap-6">
  <Input
    className="w-[320px]"
    label="Email"
    placeholder="you@company.com"
    hint="This is a hint text to help user."
  />
  <Input
    className="w-[320px]"
    label="Email"
    placeholder="you@company.com"
    hint="This is a hint text to help user."
    autoFocus
  />
  <Input
    className="w-[320px]"
    label="Email"
    placeholder="you@company.com"
    destructive
    errorMessage="This is an error message."
  />
  <Input
    className="w-[320px]"
    label="Email"
    placeholder="you@company.com"
    hint="This is a hint text to help user."
    isDisabled
  />
</div>`),
  render: () => (
    <div className="flex flex-col gap-6">
      <Input
        className="w-[320px]"
        label="Email"
        placeholder="you@company.com"
        hint="This is a hint text to help user."
      />
      <Input
        className="w-[320px]"
        label="Email"
        placeholder="you@company.com"
        hint="This is a hint text to help user."
        autoFocus
      />
      <Input
        className="w-[320px]"
        label="Email"
        placeholder="you@company.com"
        destructive
        errorMessage="This is an error message."
      />
      <Input
        className="w-[320px]"
        label="Email"
        placeholder="you@company.com"
        hint="This is a hint text to help user."
        isDisabled
      />
    </div>
  ),
};
