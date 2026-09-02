# @mithunsalinda/veyqor-tokens

Design tokens and CSS custom properties for the Veyqor Design System.

## Usage

Import token objects in TypeScript:

```ts
import { colors, spacing, themes } from "@mithunsalinda/veyqor-tokens";
```

Import CSS variables:

```css
@import "@mithunsalinda/veyqor-tokens/styles.css";
```

Set the active theme with `data-theme`:

```html
<html data-theme="dark"></html>
```

## Development

```bash
corepack pnpm --filter @mithunsalinda/veyqor-tokens typecheck
corepack pnpm --filter @mithunsalinda/veyqor-tokens lint
corepack pnpm --filter @mithunsalinda/veyqor-tokens build
```
