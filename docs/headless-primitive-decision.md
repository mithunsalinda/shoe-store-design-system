# Headless Primitive Decision

## Goal

Choose the internal headless primitive layer for complex interactive components in
`@veyqor/ui`.

## Decision

Use `@base-ui/react` as the primary headless primitive library for complex
components such as Checkbox, RadioGroup, Switch, Select, Dialog, Drawer, Tooltip,
Popover, DropdownMenu, Tabs, Accordion, and Menu.

## Why Base UI

- It is unstyled and does not bundle CSS, so our CSS Modules and token system own
  the visual layer.
- It supports React 17 and newer, which keeps the design system compatible with
  React and Next.js applications.
- It works with maintained bundlers including Vite, webpack, Turbopack, and
  Parcel.
- It focuses on accessibility, including ARIA attributes, roles, pointer
  interactions, keyboard navigation, and focus management.
- It is tree-shakeable, so consumers should only receive the primitives used by
  imported design-system components.
- It provides the popup, portal, focus, and keyboard behavior that is risky to
  hand-roll for components like Select, Dialog, Tooltip, and DropdownMenu.

## Public API Boundary

Consumers must import from `@veyqor/ui`, not from `@base-ui/react`.

Good:

```tsx
import { Dialog, Select } from "@veyqor/ui";
```

Avoid in consuming apps:

```tsx
import { Dialog } from "@base-ui/react/dialog";
```

The design system owns component names, props, variants, styling, events,
accessibility expectations, documentation, and versioning. Base UI owns low-level
behavior such as focus management, keyboard navigation, ARIA wiring, portals, and
state attributes.

## Fallback

Radix Primitives remains the fallback if a specific Base UI primitive does not
meet our accessibility, API, or bundle requirements. Radix is mature, unstyled,
accessible, and tree-shakeable, but Base UI is the first choice because it is a
newer stable package from the creators of Radix, Material UI, and Floating UI and
is explicitly positioned for custom React design systems.

## Next Usage

Task 8 should use Base UI for Checkbox unless native semantics are enough for our
chosen API. More complex tasks such as Select, Dialog, Tooltip, DropdownMenu, and
Tabs should use Base UI primitives behind `@veyqor/ui` wrappers.
