# @veyqor/ui

React components for the Veyqor Design System.

## Install

This package expects React and React DOM from the consuming application.

```bash
pnpm add @veyqor/ui
```

## Usage

Import the CSS once:

```tsx
import "@veyqor/ui/styles.css";
```

Use components from the package root:

```tsx
import { Button, Dialog, Select } from "@veyqor/ui";

export function ProductActions() {
  return (
    <Dialog trigger={<Button>Edit product</Button>} title="Edit product">
      Product editor content
    </Dialog>
  );
}
```

## Development

```bash
corepack pnpm --filter @veyqor/ui test
corepack pnpm --filter @veyqor/ui typecheck
corepack pnpm --filter @veyqor/ui lint
corepack pnpm --filter @veyqor/ui build
```

Storybook examples live in `apps/storybook`.
