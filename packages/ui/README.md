# pathum-ds-library

KAST Design System — A React component library built with
React Aria, Tailwind CSS v4, and CVA. Components and design
tokens are generated directly from Figma.

## Installation

npm install pathum-ds-library

## Setup

### 1. Import styles once in your root CSS file

This loads all design tokens (colors, typography, spacing,
radius, shadows) and the Inter font automatically:

@import "pathum-ds-library/styles";

Or if you use Tailwind CSS v4:

@import "tailwindcss";
@import "pathum-ds-library/styles";

### 2. Use components

import { Button, Input } from 'pathum-ds-library'

export default function Page() {
  return (
    <div>
      <Button hierarchy="primary" size="md">
        Save changes
      </Button>
      <Input
        label="Email"
        placeholder="you@company.com"
        hint="We will never share your email."
      />
    </div>
  )
}

## Components

### Button

import { Button } from 'pathum-ds-library'

Props:
- hierarchy: "primary" | "secondary-gray" | "secondary-color" | "tertiary-gray" | "tertiary-color" | "link-gray" | "link-color"
- size: "sm" | "md" | "lg" | "xl" | "2xl"
- isDisabled: boolean
- iconLeft: ReactNode
- iconRight: ReactNode
- iconOnly: ReactNode
- dotLeading: boolean
- className: string

Examples:
<Button hierarchy="primary" size="md">Save</Button>
<Button hierarchy="secondary-gray" size="sm">Cancel</Button>
<Button hierarchy="primary" size="md" isDisabled>Disabled</Button>

### Input

import { Input } from 'pathum-ds-library'

Props:
- label: string
- placeholder: string
- hint: string
- errorMessage: string
- destructive: boolean
- isDisabled: boolean
- size: "sm" | "md"
- composition: "default" | "icon-leading" | "leading-dropdown" | "trailing-dropdown" | "leading-text" | "payment-input" | "trailing-button" | "tags"
- className: string

Examples:
<Input label="Email" placeholder="you@company.com" />
<Input label="Email" destructive errorMessage="Invalid email" />
<Input label="Email" isDisabled />
<Input label="Email" hint="We will never share your email." />

## Design Tokens

All tokens are available as CSS variables after importing styles.

### Colors
--color-brand-500
--color-brand-600
--color-brand-700
--color-text-primary
--color-text-secondary
--color-text-tertiary
--color-text-white
--color-bg-primary
--color-bg-secondary
--color-border-primary
--color-border-secondary
--color-border-brand
--color-border-error

### Typography
--font-body: "Inter", sans-serif
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-md: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-display-xs
--text-display-sm
--text-display-md
--text-display-lg
--text-display-xl
--text-display-2xl

### Spacing
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-5: 20px
--spacing-6: 24px
--spacing-8: 32px
--spacing-10: 40px
--spacing-12: 48px

### Border Radius
--radius-none: 0px
--radius-xs: 2px
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 10px
--radius-xl: 12px
--radius-2xl: 16px
--radius-full: 9999px

### Shadows
--shadow-xs
--shadow-sm
--shadow-md
--shadow-lg

### Dark Mode
Dark mode is supported automatically. Add the .dark class
to your html element to activate dark mode:

html class="dark"

All semantic color tokens update automatically in dark mode.

## Tech Stack
- React 19 + TypeScript
- React Aria Components (accessibility)
- Tailwind CSS v4
- Class Variance Authority (CVA)
- Inter font via @fontsource/inter

## License
ISC
