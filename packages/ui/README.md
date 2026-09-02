# @mithunsalinda/veyqor-ui

React components for the Veyqor Design System.

## Install

This package expects React and React DOM from the consuming application.

```bash
pnpm add @mithunsalinda/veyqor-ui
```

## Usage

Import the CSS once:

```tsx
import "@mithunsalinda/veyqor-ui/styles.css";
```

Use components from the package root:

```tsx
import { Button, Dialog, Select } from "@mithunsalinda/veyqor-ui";

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
corepack pnpm --filter @mithunsalinda/veyqor-ui test
corepack pnpm --filter @mithunsalinda/veyqor-ui typecheck
corepack pnpm --filter @mithunsalinda/veyqor-ui lint
corepack pnpm --filter @mithunsalinda/veyqor-ui build
```

Storybook examples live in `apps/storybook`.
