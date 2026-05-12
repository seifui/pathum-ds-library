"use client";

import type { JSX, ReactNode } from "react";
import {
  FieldError,
  Input as RACInput,
  Label,
  Text,
  TextField,
} from "react-aria-components";
import type { TextFieldProps } from "react-aria-components";

import { cx } from "../utils/cx";

/** Figma Input field (`9:2`) composition variants — Size × Type × Destructive × State matrix. */
export type InputComposition =
  | "default"
  | "icon-leading"
  | "leading-dropdown"
  | "trailing-dropdown"
  | "leading-text"
  | "payment-input"
  | "tags"
  | "trailing-button";

export interface InputProps
  extends Omit<TextFieldProps, "children" | "className" | "isInvalid" | "validationBehavior"> {
  className?: string;
  /** Figma Size — `sm` | `md`. */
  size?: "sm" | "md";
  /** Figma Type — composition layout inside the bordered shell. */
  composition?: InputComposition;
  /** Figma Destructive=True — `border-error`, invalid field; hint row shows error styling when `errorMessage` is set. */
  destructive?: boolean;
  label?: ReactNode;
  hint?: ReactNode;
  /** Under-field message when destructive (stays `--color-text-error-primary` even when disabled — Figma `5:104`). */
  errorMessage?: ReactNode;
  /** Shown before the text value (`Icon leading`). */
  leadingIcon?: ReactNode;
  /** Prefix dropdown (`Leading dropdown`) — Figma sample uses country + chevron in `pl-[14px] pr-[8px]` zone. */
  leadingDropdown?: ReactNode;
  /** Suffix dropdown (`Trailing dropdown`) — mirrored paddings from leading-dropdown samples. */
  trailingDropdown?: ReactNode;
  /** Static prefix strip (`Leading text`) — e.g. `https://` on `--color-bg-secondary`, `pl-[14px] pr-[12px]`. */
  leadingText?: ReactNode;
  /** Card artwork (`Payment input`) — parent applies 32×20, radius 4px, `#99abbf` stroke frame. */
  paymentGraphic?: ReactNode;
  /** Tag chips (`Tags`) — rendered before the editable input with 8px gaps. */
  tags?: ReactNode;
  /** Trailing action (`Trailing button`) — placed after divider (`border-secondary` rule); label 14px/20 Medium per Figma `8:177`. */
  trailingButton?: ReactNode;
  /** Trailing help affordance — 16×16 frame, 1.5px border, 8px radius; border `--color-fg-tertiary` / `--color-fg-disabled`. */
  helpIcon?: ReactNode;
  placeholder?: string;
  inputClassName?: string;
}

function FieldDividerDropdown(): JSX.Element {
  return <div className="h-[20px] w-px shrink-0 bg-[#d4dbe5]" aria-hidden />;
}

function FieldDividerButton(): JSX.Element {
  return <div className="h-[20px] w-px shrink-0 bg-(--color-border-secondary)" aria-hidden />;
}

function HelpIconChrome({
  children,
  isDisabled,
}: {
  children: ReactNode;
  isDisabled?: boolean;
}): JSX.Element {
  return (
    <span
      className={cx(
        "flex size-4 shrink-0 items-center justify-center rounded-[8px] border-[1.5px] border-solid",
        isDisabled ? "border-(--color-fg-disabled)" : "border-(--color-fg-tertiary)",
      )}
    >
      {children}
    </span>
  );
}

function PaymentChipFrame({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="flex h-[20px] w-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[4px] border border-solid border-[#99abbf]">
      {children}
    </div>
  );
}

function shellPadding(composition: InputComposition): string {
  switch (composition) {
    case "leading-text":
    case "leading-dropdown":
      return "pl-0 pr-[14px]";
    case "trailing-dropdown":
      return "pl-[14px] pr-0";
    default:
      return "px-[14px]";
  }
}

export function Input({
  size = "md",
  composition = "default",
  destructive = false,
  label,
  hint,
  errorMessage,
  leadingIcon,
  leadingDropdown,
  trailingDropdown,
  leadingText,
  paymentGraphic,
  tags,
  trailingButton,
  helpIcon,
  placeholder,
  inputClassName,
  className,
  isDisabled,
  ...rest
}: InputProps): JSX.Element {
  const invalid = destructive === true;

  const shellVertical = size === "sm" ? "min-h-[40px] py-[8px]" : "min-h-[44px] py-[10px]";

  const shellBorderBg = cx(
    "overflow-hidden rounded-(--radius-md) border border-solid transition-[border-color,box-shadow]",
    shellVertical,
    shellPadding(composition),
    // Inner row gap — Figma 8px between leading pieces / text / trailing pieces.
    "flex items-center gap-2",
    isDisabled
      ? "border-[color:var(--color-border-disabled)] bg-[color:var(--color-bg-disabled)]"
      : invalid
        ? "border-[color:var(--color-border-error)] bg-[color:var(--color-bg-primary)]"
        : cx(
            "border-[color:var(--color-border-secondary)] bg-[color:var(--color-bg-primary)]",
            "focus-within:border-(--color-border-brand)",
            // Ring: 2px gap via field surface, 4px outer glow — brand purple (Figma).
            "focus-within:shadow-[0px_0px_0px_2px_var(--color-bg-primary),0px_0px_0px_4px_var(--color-fg-brand-secondary)]",
          ),
  );

  const inputTypography = cx(
    "min-h-0 min-w-0 flex-1 bg-transparent font-normal outline-none ring-0 ring-transparent",
    "focus:outline-none focus-visible:outline-none",
    "[font-family:var(--font-family)] [font-size:var(--font-size-text-md)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-md)]",
    "text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-placeholder)]",
    "disabled:text-[color:var(--color-text-disabled)] disabled:placeholder:text-[color:var(--color-text-disabled)]",
    inputClassName,
  );

  const racInput = (
    <RACInput placeholder={placeholder} className={inputTypography} disabled={isDisabled} />
  );

  let control: ReactNode;

  switch (composition) {
    case "leading-dropdown":
      control = (
        <>
          <div className="flex shrink-0 items-center gap-2 pl-[14px] pr-[8px]">{leadingDropdown}</div>
          <FieldDividerDropdown />
          {racInput}
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
        </>
      );
      break;

    case "trailing-dropdown":
      control = (
        <>
          {racInput}
          <FieldDividerDropdown />
          <div className="flex shrink-0 items-center gap-2 pl-[8px] pr-[14px]">{trailingDropdown}</div>
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
        </>
      );
      break;

    case "leading-text":
      control = (
        <>
          <div className="flex min-h-full shrink-0 items-stretch">
            <span
              className={cx(
                "flex items-center bg-(--color-bg-secondary) pl-[14px] pr-[12px]",
                "[font-family:var(--font-family)] [font-size:var(--font-size-text-md)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-md)]",
                "text-(--color-text-primary)",
                isDisabled && "text-(--color-text-disabled)",
              )}
            >
              {leadingText}
            </span>
          </div>
          <FieldDividerDropdown />
          {racInput}
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
        </>
      );
      break;

    case "payment-input":
      control = (
        <>
          <PaymentChipFrame>{paymentGraphic}</PaymentChipFrame>
          <FieldDividerDropdown />
          {racInput}
        </>
      );
      break;

    case "tags":
      control = (
        <>
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 [&_[data-slot=input-tags]>input]:min-w-[120px]">
            {tags}
            <span data-slot="input-tags" className="min-w-0 flex-1">
              {racInput}
            </span>
          </div>
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
        </>
      );
      break;

    case "trailing-button":
      control = (
        <>
          {racInput}
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
          <FieldDividerButton />
          <div className="flex shrink-0 items-center gap-[6px]">{trailingButton}</div>
        </>
      );
      break;

    case "icon-leading":
      control = (
        <>
          <span className="flex shrink-0 items-center [&_svg]:size-4">{leadingIcon}</span>
          {racInput}
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
        </>
      );
      break;

    default:
      control = (
        <>
          {racInput}
          {helpIcon != null ? <HelpIconChrome isDisabled={isDisabled}>{helpIcon}</HelpIconChrome> : null}
        </>
      );
  }

  const hintRow =
    invalid && errorMessage != null ? (
      <FieldError
        className={cx(
          "[font-family:var(--font-family)] [font-size:var(--font-size-text-sm)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-sm)]",
          "text-[color:var(--color-text-error-primary)]",
        )}
      >
        {errorMessage}
      </FieldError>
    ) : hint != null ? (
      <Text
        slot="description"
        className={cx(
          "[font-family:var(--font-family)] [font-size:var(--font-size-text-sm)] [font-weight:var(--font-weight-regular)] leading-[var(--line-height-text-sm)]",
          "text-[color:var(--color-text-tertiary)]",
          "group-data-[disabled]:text-[color:var(--color-text-disabled)]",
        )}
      >
        {hint}
      </Text>
    ) : null;

  return (
    <TextField
      {...rest}
      isDisabled={isDisabled}
      isInvalid={invalid}
      validationBehavior="aria"
      className={cx("group flex flex-col gap-[6px]", className)}
    >
      {label != null ? (
        <Label
          className={cx(
            "[font-family:var(--font-family)] [font-size:var(--font-size-text-sm)] [font-weight:var(--font-weight-medium)] leading-[var(--line-height-text-sm)]",
            "text-[color:var(--color-text-secondary)]",
            "group-data-[disabled]:text-[color:var(--color-text-disabled)]",
          )}
        >
          {label}
        </Label>
      ) : null}

      <div className={shellBorderBg}>{control}</div>

      {hintRow}
    </TextField>
  );
}
