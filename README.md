# Shoe Design System

A production-ready headless React design system monorepo for shoe store
applications.

## What Is Included

- `@shoe-store/tokens`: TypeScript design tokens and CSS custom properties.
- `@shoe-store/ui`: React components styled with CSS Modules and public design
  tokens.
- `@shoe-store/storybook`: Local and static documentation/preview app.

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
corepack pnpm --filter @shoe-store/ui build
corepack pnpm --filter @shoe-store/ui test
corepack pnpm --filter @shoe-store/storybook build
```

## Use The UI Package

Import the compiled CSS once in the consuming app:

```tsx
import "@shoe-store/ui/styles.css";
```

Import components from the design system package:

```tsx
import { Button, Select, Dialog } from "@shoe-store/ui";
```

Do not import internal primitive libraries directly in consuming apps. The public
API boundary is `@shoe-store/ui`.

## Tokens

Use token objects in TypeScript:

```ts
import { colors, spacing, themes } from "@shoe-store/tokens";
```

Use CSS variables in styles:

```css
@import "@shoe-store/tokens/styles.css";
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
corepack pnpm --filter @shoe-store/storybook build
```

See [docs/release-checklist.md](docs/release-checklist.md) for the full release
checklist.

## Architecture

```text
@shoe-store/tokens
  -> @shoe-store/ui
  -> @shoe-store/storybook
```

`@shoe-store/ui` may depend on tokens, React, and selected headless primitives.
It must not depend on Storybook, Next.js, visual UI kits, or application business
logic. Storybook imports UI components for development and documentation, but UI
components never import stories or Storybook APIs.
