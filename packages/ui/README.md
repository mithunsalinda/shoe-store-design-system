# @shoe-store/ui

React components for the Shoe Design System.

## Install

This package expects React and React DOM from the consuming application.

```bash
pnpm add @shoe-store/ui
```

## Usage

Import the CSS once:

```tsx
import "@shoe-store/ui/styles.css";
```

Use components from the package root:

```tsx
import { Button, Dialog, Select } from "@shoe-store/ui";

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
corepack pnpm --filter @shoe-store/ui test
corepack pnpm --filter @shoe-store/ui typecheck
corepack pnpm --filter @shoe-store/ui lint
corepack pnpm --filter @shoe-store/ui build
```

Storybook examples live in `apps/storybook`.
