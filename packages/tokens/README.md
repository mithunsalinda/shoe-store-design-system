# @shoe-store/tokens

Design tokens and CSS custom properties for the Shoe Design System.

## Usage

Import token objects in TypeScript:

```ts
import { colors, spacing, themes } from "@shoe-store/tokens";
```

Import CSS variables:

```css
@import "@shoe-store/tokens/styles.css";
```

Set the active theme with `data-theme`:

```html
<html data-theme="dark"></html>
```

## Development

```bash
corepack pnpm --filter @shoe-store/tokens typecheck
corepack pnpm --filter @shoe-store/tokens lint
corepack pnpm --filter @shoe-store/tokens build
```
