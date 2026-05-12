import type { Meta, StoryObj } from "@storybook/react";
import type { JSX } from "react";

import { Button, type ButtonHierarchy } from "./Button";

const ROW = "flex items-center gap-3 flex-wrap";

const SIZES = ["sm", "md", "lg", "xl", "2xl"] as const;

const HIERARCHIES: ButtonHierarchy[] = [
  "primary",
  "secondary-gray",
  "secondary-color",
  "tertiary-gray",
  "tertiary-color",
  "link-color",
  "link-gray",
];

function docsSource(code: string) {
  return {
    docs: {
      source: {
        code,
      },
    },
  };
}

function PlaceholderIcon(): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-icon
      aria-hidden
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const meta = {
  title: "Components/Button",
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryButtons: Story = {
  name: "Primary buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="primary" size="sm">
    Button sm
  </Button>
  <Button hierarchy="primary" size="md">
    Button md
  </Button>
  <Button hierarchy="primary" size="lg">
    Button lg
  </Button>
  <Button hierarchy="primary" size="xl">
    Button xl
  </Button>
  <Button hierarchy="primary" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="primary" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const SecondaryGrayButtons: Story = {
  name: "Secondary gray buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="secondary-gray" size="sm">
    Button sm
  </Button>
  <Button hierarchy="secondary-gray" size="md">
    Button md
  </Button>
  <Button hierarchy="secondary-gray" size="lg">
    Button lg
  </Button>
  <Button hierarchy="secondary-gray" size="xl">
    Button xl
  </Button>
  <Button hierarchy="secondary-gray" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="secondary-gray" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const SecondaryColorButtons: Story = {
  name: "Secondary color buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="secondary-color" size="sm">
    Button sm
  </Button>
  <Button hierarchy="secondary-color" size="md">
    Button md
  </Button>
  <Button hierarchy="secondary-color" size="lg">
    Button lg
  </Button>
  <Button hierarchy="secondary-color" size="xl">
    Button xl
  </Button>
  <Button hierarchy="secondary-color" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="secondary-color" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const TertiaryGrayButtons: Story = {
  name: "Tertiary gray buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="tertiary-gray" size="sm">
    Button sm
  </Button>
  <Button hierarchy="tertiary-gray" size="md">
    Button md
  </Button>
  <Button hierarchy="tertiary-gray" size="lg">
    Button lg
  </Button>
  <Button hierarchy="tertiary-gray" size="xl">
    Button xl
  </Button>
  <Button hierarchy="tertiary-gray" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="tertiary-gray" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const TertiaryColorButtons: Story = {
  name: "Tertiary color buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="tertiary-color" size="sm">
    Button sm
  </Button>
  <Button hierarchy="tertiary-color" size="md">
    Button md
  </Button>
  <Button hierarchy="tertiary-color" size="lg">
    Button lg
  </Button>
  <Button hierarchy="tertiary-color" size="xl">
    Button xl
  </Button>
  <Button hierarchy="tertiary-color" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="tertiary-color" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const LinkColorButtons: Story = {
  name: "Link color buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="link-color" size="sm">
    Button sm
  </Button>
  <Button hierarchy="link-color" size="md">
    Button md
  </Button>
  <Button hierarchy="link-color" size="lg">
    Button lg
  </Button>
  <Button hierarchy="link-color" size="xl">
    Button xl
  </Button>
  <Button hierarchy="link-color" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="link-color" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const LinkGrayButtons: Story = {
  name: "Link gray buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="link-gray" size="sm">
    Button sm
  </Button>
  <Button hierarchy="link-gray" size="md">
    Button md
  </Button>
  <Button hierarchy="link-gray" size="lg">
    Button lg
  </Button>
  <Button hierarchy="link-gray" size="xl">
    Button xl
  </Button>
  <Button hierarchy="link-gray" size="2xl">
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="link-gray" size={size}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const IconLeadingButtons: Story = {
  name: "Icon leading buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="primary" size="sm" iconLeft={<PlaceholderIcon />}>
    Button sm
  </Button>
  <Button hierarchy="primary" size="md" iconLeft={<PlaceholderIcon />}>
    Button md
  </Button>
  <Button hierarchy="primary" size="lg" iconLeft={<PlaceholderIcon />}>
    Button lg
  </Button>
  <Button hierarchy="primary" size="xl" iconLeft={<PlaceholderIcon />}>
    Button xl
  </Button>
  <Button hierarchy="primary" size="2xl" iconLeft={<PlaceholderIcon />}>
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="primary" size={size} iconLeft={<PlaceholderIcon />}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const IconTrailingButtons: Story = {
  name: "Icon trailing buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="primary" size="sm" iconRight={<PlaceholderIcon />}>
    Button sm
  </Button>
  <Button hierarchy="primary" size="md" iconRight={<PlaceholderIcon />}>
    Button md
  </Button>
  <Button hierarchy="primary" size="lg" iconRight={<PlaceholderIcon />}>
    Button lg
  </Button>
  <Button hierarchy="primary" size="xl" iconRight={<PlaceholderIcon />}>
    Button xl
  </Button>
  <Button hierarchy="primary" size="2xl" iconRight={<PlaceholderIcon />}>
    Button 2xl
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={size} hierarchy="primary" size={size} iconRight={<PlaceholderIcon />}>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};

export const IconOnlyButtons: Story = {
  name: "Icon only buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  {(
    [
      "primary",
      "secondary-gray",
      "secondary-color",
      "tertiary-gray",
      "tertiary-color",
      "link-color",
      "link-gray",
    ] as const
  ).flatMap((hierarchy) =>
    (["sm", "md"] as const).map((size) => (
      <Button
        key={\`\${hierarchy}-\${size}\`}
        hierarchy={hierarchy}
        size={size}
        iconOnly={<PlaceholderIcon />}
        aria-label={\`\${hierarchy} icon button \${size}\`}
      />
    )),
  )}
</div>`),
  render: () => (
    <div className={ROW}>
      {HIERARCHIES.flatMap((hierarchy) =>
        (["sm", "md"] as const).map((size) => (
          <Button
            key={`${hierarchy}-${size}`}
            hierarchy={hierarchy}
            size={size}
            iconOnly={<PlaceholderIcon />}
            aria-label={`${hierarchy} icon button ${size}`}
          />
        )),
      )}
    </div>
  ),
};

export const DisabledButtons: Story = {
  name: "Disabled buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  <Button hierarchy="primary" size="md" isDisabled>
    Button md
  </Button>
  <Button hierarchy="secondary-gray" size="md" isDisabled>
    Button md
  </Button>
  <Button hierarchy="tertiary-gray" size="md" isDisabled>
    Button md
  </Button>
</div>`),
  render: () => (
    <div className={ROW}>
      <Button hierarchy="primary" size="md" isDisabled>
        Button md
      </Button>
      <Button hierarchy="secondary-gray" size="md" isDisabled>
        Button md
      </Button>
      <Button hierarchy="tertiary-gray" size="md" isDisabled>
        Button md
      </Button>
    </div>
  ),
};

export const DotLeadingButtons: Story = {
  name: "Dot leading buttons",
  parameters: docsSource(`<div className="flex items-center gap-3 flex-wrap">
  {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
    <Button key={\`primary-\${size}\`} hierarchy="primary" size={size} dotLeading>
      Button {size}
    </Button>
  ))}
  {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
    <Button key={\`secondary-gray-\${size}\`} hierarchy="secondary-gray" size={size} dotLeading>
      Button {size}
    </Button>
  ))}
</div>`),
  render: () => (
    <div className={ROW}>
      {SIZES.map((size) => (
        <Button key={`primary-${size}`} hierarchy="primary" size={size} dotLeading>
          Button {size}
        </Button>
      ))}
      {SIZES.map((size) => (
        <Button key={`secondary-gray-${size}`} hierarchy="secondary-gray" size={size} dotLeading>
          Button {size}
        </Button>
      ))}
    </div>
  ),
};
