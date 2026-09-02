# Veyqor Design System

A production-ready headless React design system monorepo for Veyqor
applications.

## What Is Included

- `@mithunsalinda/veyqor-tokens`: TypeScript design tokens and CSS custom properties.
- `@mithunsalinda/veyqor-ui`: React components styled with CSS Modules and public design
  tokens.
- `@mithunsalinda/veyqor-storybook`: Local and static documentation/preview app.

The `packages/icons` folder is currently a placeholder for a future icon package.

## Requirements

- Node.js 20.19 or newer
- pnpm 10 or newer

If `pnpm` is not installed globally, use Corepack:

```bash
corepack pnpm install
```

## Preview Locally

Start Storybook:

```bash
corepack pnpm storybook
```

Open:

```text
http://localhost:6006
```

## Common Commands

```bash
corepack pnpm install
corepack pnpm build
corepack pnpm test
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm format:check
corepack pnpm storybook
```

Useful package-scoped commands:

```bash
corepack pnpm --filter @mithunsalinda/veyqor-ui build
corepack pnpm --filter @mithunsalinda/veyqor-ui test
corepack pnpm --filter @mithunsalinda/veyqor-storybook build
```

## Use The UI Package

Import the compiled CSS once in the consuming app:

```tsx
import "@mithunsalinda/veyqor-ui/styles.css";
```

Import components from the design system package:

```tsx
import { Button, Select, Dialog } from "@mithunsalinda/veyqor-ui";
```

Do not import internal primitive libraries directly in consuming apps. The public
API boundary is `@mithunsalinda/veyqor-ui`.

## Tokens

Use token objects in TypeScript:

```ts
import { colors, spacing, themes } from "@mithunsalinda/veyqor-tokens";
```

Use CSS variables in styles:

```css
@import "@mithunsalinda/veyqor-tokens/styles.css";
```

Themes are selected with `data-theme`:

```html
<html data-theme="dark"></html>
```

## Components

The UI package includes buttons, inputs, form controls, overlays, navigation,
feedback components, layout primitives, and loading states.

See [docs/component-inventory.md](docs/component-inventory.md) for the current
component list.

## Release Readiness

Before publishing or handing off:

```bash
corepack pnpm test
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm format:check
corepack pnpm build
corepack pnpm --filter @mithunsalinda/veyqor-storybook build
```

See [docs/release-checklist.md](docs/release-checklist.md) for the full release
checklist.

## Architecture

```text
@mithunsalinda/veyqor-tokens
  -> @mithunsalinda/veyqor-ui
  -> @mithunsalinda/veyqor-storybook
```

`@mithunsalinda/veyqor-ui` may depend on tokens, React, and selected headless primitives.
It must not depend on Storybook, Next.js, visual UI kits, or application business
logic. Storybook imports UI components for development and documentation, but UI
components never import stories or Storybook APIs.
