"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { JSX, ReactNode } from "react";
import { Button as RACButton } from "react-aria-components";
import type { ButtonProps as RACButtonProps } from "react-aria-components";

import { cx } from "../utils/cx";

export type ButtonHierarchy =
  | "primary"
  | "secondary-gray"
  | "secondary-color"
  | "tertiary-gray"
  | "tertiary-color"
  | "link-gray"
  | "link-color";

/** Link rows use Icon=Default or Only — no Dot leading in Figma. */
export const buttonIconDotUnsupportedHierarchies: ReadonlyArray<ButtonHierarchy> = [
  "link-gray",
  "link-color",
];

const layoutStyles = {
  labeled: {
    sm: cx(
      "min-h-[36px] gap-[6px] rounded-(--radius-md) px-[14px] py-2 font-semibold",
      "[font-size:var(--font-size-text-sm)] [font-family:var(--font-family)] [font-weight:var(--font-weight-semibold)] leading-[var(--line-height-text-sm)]",
    ),
    md: cx(
      "min-h-[40px] gap-[6px] rounded-(--radius-md) px-4 py-[10px] font-semibold",
      "[font-size:var(--font-size-text-sm)] [font-family:var(--font-family)] [font-weight:var(--font-weight-semibold)] leading-[var(--line-height-text-sm)]",
    ),
    lg: cx(
      "min-h-[44px] gap-2 rounded-(--radius-lg) px-[18px] py-[10px] font-semibold",
      "[font-size:var(--font-size-text-md)] [font-family:var(--font-family)] [font-weight:var(--font-weight-semibold)] leading-[var(--line-height-text-md)]",
    ),
    xl: cx(
      "min-h-[48px] gap-2 rounded-(--radius-xl) px-5 py-3 font-semibold",
      "[font-size:var(--font-size-text-md)] [font-family:var(--font-family)] [font-weight:var(--font-weight-semibold)] leading-[var(--line-height-text-md)]",
    ),
    "2xl": cx(
      "min-h-[60px] gap-[10px] rounded-(--radius-xl) px-[28px] py-4 font-semibold",
      "[font-size:var(--font-size-text-lg)] [font-family:var(--font-family)] [font-weight:var(--font-weight-semibold)] leading-[var(--line-height-text-lg)]",
    ),
  },
  iconOnly: {
    sm: "size-8 min-h-8 min-w-8 rounded-(--radius-md) p-2",
    md: "size-10 min-h-10 min-w-10 rounded-(--radius-md) p-[10px]",
    lg: "size-10 min-h-10 min-w-10 rounded-(--radius-lg) p-[10px]",
    xl: "min-h-[44px] min-w-[44px] rounded-(--radius-xl) p-3",
    "2xl": "min-h-14 min-w-14 rounded-(--radius-xl) p-4",
  },
};

const iconSizer = (sz: "sm" | "md" | "lg" | "xl" | "2xl", labeled: boolean): string =>
  labeled
    ? sz === "sm"
      ? "[&_svg]:size-4 shrink-0"
      : sz === "2xl"
        ? "[&_svg]:size-6 shrink-0"
        : "[&_svg]:size-5 shrink-0"
    : sz === "sm"
      ? "flex size-full items-center justify-center [&_svg]:size-4"
      : sz === "2xl"
        ? "flex size-full items-center justify-center [&_svg]:size-6"
        : "flex size-full items-center justify-center [&_svg]:size-5";

/** Focus ring (Primary md Focused, node 53:161): brand #9e77ed at ~24%, spread ~4. */
const focusRing =
  "outline-none focus-visible:shadow-[0px_0px_0px_4px_color-mix(in_srgb,var(--color-fg-brand-secondary)_24%,transparent)]";

/** Component-button tokens aligned with Untitled `/Components/Buttons/` in `theme.css`. */
const hierarchySurface: Record<ButtonHierarchy, string> = {
  primary: cx(
    /** Figma primary fill uses `utility-brand-600`; default state has no stroke (avoid 1px same-color border). */
    "border-0",
    "bg-(--color-component-utility-brand-utility-brand-600)",
    "text-(--color-text-primary_on-brand)",
    "data-hovered:bg-(--color-component-utility-brand-utility-brand-700)",
    "data-hovered:text-(--color-text-primary_on-brand)",
    /** `utility-brand-*` shifts in `.dark`; keep exported button tokens there. */
    "dark:bg-(--color-component-components-buttons-primary-button-primary-bg)",
    "dark:data-hovered:bg-(--color-component-components-buttons-primary-button-primary-bg_hover)",
    "dark:text-(--color-component-components-buttons-primary-button-primary-fg)",
    "dark:data-hovered:text-(--color-component-components-buttons-primary-button-primary-fg_hover)",
    "data-disabled:border-0 data-disabled:bg-(--color-bg-disabled)",
    "data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-text-primary_on-brand)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-text-primary_on-brand)",
    "dark:[&_[data-slot=lead-icon]_svg]:text-(--color-component-components-buttons-primary-button-primary-fg)",
    "dark:[&_[data-slot=trail-icon]_svg]:text-(--color-component-components-buttons-primary-button-primary-fg)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
  "secondary-gray": cx(
    "border border-(--color-component-components-buttons-secondary-button-secondary-border)",
    "bg-transparent text-(--color-component-components-buttons-secondary-button-secondary-fg)",
    "data-hovered:bg-(--color-component-components-buttons-secondary-button-secondary-bg_hover)",
    "data-hovered:text-(--color-component-components-buttons-secondary-button-secondary-fg_hover)",
    "data-hovered:border-(--color-component-components-buttons-secondary-button-secondary-border_hover)",
    "data-disabled:border-(--color-border-disabled)",
    "data-disabled:bg-transparent data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-component-components-buttons-secondary-button-secondary-fg)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-component-components-buttons-secondary-button-secondary-fg)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
  "secondary-color": cx(
    "border border-(--color-component-components-buttons-secondary-color-button-secondary-color-border)",
    "bg-transparent text-(--color-component-components-buttons-secondary-color-button-secondary-color-fg)",
    "data-hovered:bg-(--color-bg-brand-section_subtle)",
    "data-hovered:border-(--color-component-components-buttons-secondary-color-button-secondary-color-border_hover)",
    "data-hovered:text-(--color-component-components-buttons-secondary-color-button-secondary-color-fg_hover)",
    "data-disabled:border-(--color-border-disabled)",
    "data-disabled:bg-transparent data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-component-components-buttons-secondary-color-button-secondary-color-fg)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-component-components-buttons-secondary-color-button-secondary-color-fg)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
  "tertiary-gray": cx(
    "border border-transparent bg-transparent",
    "text-(--color-component-components-buttons-tertiary-button-tertiary-fg)",
    "data-hovered:bg-(--color-component-components-buttons-tertiary-button-tertiary-bg_hover)",
    "data-hovered:text-(--color-component-components-buttons-tertiary-button-tertiary-fg_hover)",
    "data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-component-components-buttons-tertiary-button-tertiary-fg)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-component-components-buttons-tertiary-button-tertiary-fg)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
  "tertiary-color": cx(
    "border border-transparent bg-transparent",
    "text-(--color-component-components-buttons-tertiary-color-button-tertiary-color-fg)",
    "data-hovered:bg-(--color-component-components-buttons-tertiary-color-button-tertiary-color-bg_hover)",
    "data-hovered:text-(--color-component-components-buttons-tertiary-color-button-tertiary-color-fg_hover)",
    "data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-component-components-buttons-tertiary-color-button-tertiary-color-fg)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-component-components-buttons-tertiary-color-button-tertiary-color-fg)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
  "link-gray": cx(
    "border border-transparent bg-transparent text-(--color-text-secondary)",
    "data-hovered:bg-(--color-component-components-buttons-tertiary-button-tertiary-bg_hover)",
    "data-hovered:text-(--color-text-secondary_hover)",
    "data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-text-secondary)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-text-secondary)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
  "link-color": cx(
    "border border-transparent bg-transparent text-(--color-text-brand-tertiary)",
    "data-hovered:bg-(--color-component-components-buttons-tertiary-color-button-tertiary-color-bg_hover)",
    "data-hovered:text-(--color-component-components-buttons-tertiary-color-button-tertiary-color-fg_hover)",
    "data-disabled:text-(--color-text-disabled)",
    "[&_[data-slot=lead-icon]_svg]:text-(--color-text-brand-tertiary)",
    "[&_[data-slot=trail-icon]_svg]:text-(--color-text-brand-tertiary)",
    "data-disabled:[&_[data-slot=lead-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=trail-icon]_svg]:text-(--color-fg-disabled)",
    "data-disabled:[&_[data-slot=icon-only]_svg]:text-(--color-fg-disabled)",
  ),
};

const buttonVariants = cva(
  cx(
    "inline-flex shrink-0 items-center justify-center font-semibold transition-colors",
    "disabled:pointer-events-none",
    focusRing,
  ),
  {
    variants: {
      hierarchy: {
        primary: hierarchySurface.primary,
        "secondary-gray": hierarchySurface["secondary-gray"],
        "secondary-color": hierarchySurface["secondary-color"],
        "tertiary-gray": hierarchySurface["tertiary-gray"],
        "tertiary-color": hierarchySurface["tertiary-color"],
        "link-gray": hierarchySurface["link-gray"],
        "link-color": hierarchySurface["link-color"],
      },
      size: { sm: "", md: "", lg: "", xl: "", "2xl": "" },
      layoutMode: { labeled: "", iconOnly: "" },
      dotLeading: { false: "", true: "" },
    },
    compoundVariants: [
      { layoutMode: "labeled", size: "sm", dotLeading: false, class: layoutStyles.labeled.sm },
      { layoutMode: "labeled", size: "md", dotLeading: false, class: layoutStyles.labeled.md },
      { layoutMode: "labeled", size: "lg", dotLeading: false, class: layoutStyles.labeled.lg },
      { layoutMode: "labeled", size: "xl", dotLeading: false, class: layoutStyles.labeled.xl },
      {
        layoutMode: "labeled",
        size: "2xl",
        dotLeading: false,
        class: layoutStyles.labeled["2xl"],
      },
      { layoutMode: "labeled", size: "sm", dotLeading: true, class: layoutStyles.labeled.sm },
      { layoutMode: "labeled", size: "md", dotLeading: true, class: layoutStyles.labeled.md },
      { layoutMode: "labeled", size: "lg", dotLeading: true, class: layoutStyles.labeled.lg },
      { layoutMode: "labeled", size: "xl", dotLeading: true, class: layoutStyles.labeled.xl },
      {
        layoutMode: "labeled",
        size: "2xl",
        dotLeading: true,
        class: layoutStyles.labeled["2xl"],
      },
      { layoutMode: "iconOnly", size: "sm", class: layoutStyles.iconOnly.sm },
      { layoutMode: "iconOnly", size: "md", class: layoutStyles.iconOnly.md },
      { layoutMode: "iconOnly", size: "lg", class: layoutStyles.iconOnly.lg },
      { layoutMode: "iconOnly", size: "xl", class: layoutStyles.iconOnly.xl },
      { layoutMode: "iconOnly", size: "2xl", class: layoutStyles.iconOnly["2xl"] },
    ],
    defaultVariants: {
      hierarchy: "primary",
      size: "sm",
      layoutMode: "labeled",
      dotLeading: false,
    },
  },
);

type ButtonVariantsFromCva = Pick<
  VariantProps<typeof buttonVariants>,
  "hierarchy" | "size"
>;

export interface ButtonProps extends Omit<RACButtonProps, "children" | "className">, ButtonVariantsFromCva {
  className?: string;
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Figma Icon=Only — single centered glyph. */
  iconOnly?: ReactNode;
  /** Figma Dot leading — 8×8 leading indicator (not valid on link-* hierarchies). */
  dotLeading?: boolean;
}

export function Button({
  hierarchy = "primary",
  size = "sm",
  className,
  children,
  iconLeft,
  iconRight,
  iconOnly,
  dotLeading,
  isDisabled,
  ...rest
}: ButtonProps): JSX.Element {
  const resolvedSize = size ?? "sm";
  const layoutMode = iconOnly != null ? "iconOnly" : "labeled";

  const effectiveDotLeading =
    layoutMode === "labeled" &&
    dotLeading === true &&
    hierarchy != null &&
    !buttonIconDotUnsupportedHierarchies.includes(hierarchy);

  const labeled = layoutMode === "labeled";
  const leadSlot = labeled && !effectiveDotLeading && iconLeft != null ? iconLeft : null;
  const trailSlot = labeled && iconRight != null ? iconRight : null;

  const content =
    labeled ? (
      <>
        {leadSlot ? (
          <span className={iconSizer(resolvedSize, true)} data-slot="lead-icon" aria-hidden>
            {leadSlot}
          </span>
        ) : null}

        {effectiveDotLeading ? (
          <span className="size-2 shrink-0 rounded-full bg-current" aria-hidden />
        ) : null}

        {children != null ? <span className="min-w-0">{children}</span> : null}

        {trailSlot ? (
          <span className={iconSizer(resolvedSize, true)} data-slot="trail-icon" aria-hidden>
            {trailSlot}
          </span>
        ) : null}
      </>
    ) : (
      <span className={iconSizer(resolvedSize, false)} data-slot="icon-only">
        {iconOnly}
      </span>
    );

  return (
    <RACButton
      {...rest}
      isDisabled={isDisabled}
      className={cx(
        buttonVariants({
          hierarchy,
          size: resolvedSize,
          layoutMode,
          dotLeading: effectiveDotLeading,
        }),
        className,
      )}
    >
      {content}
    </RACButton>
  );
}
