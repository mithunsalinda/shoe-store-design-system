# Release Checklist

Run these checks from the repository root before publishing or handoff:

```bash
corepack pnpm test
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm format:check
corepack pnpm build
corepack pnpm --filter @shoe-store/storybook build
```

## Package Checks

- Confirm `@shoe-store/ui` exports the component and public types from
  `packages/ui/src/index.ts`.
- Confirm package CSS is generated at `packages/ui/dist/styles.css`.
- Confirm React and React DOM remain peer dependencies in `@shoe-store/ui`.
- Confirm Storybook dependencies stay in `apps/storybook`.
- Confirm internal headless primitives are hidden behind `@shoe-store/ui`.

## Storybook Checks

- Confirm each new component has at least one Storybook story.
- Confirm primary stories render in the local preview at `http://localhost:6006`.
- Confirm Storybook static build succeeds.

## Documentation Checks

- Update `docs/component-inventory.md` when adding, renaming, or removing exports.
- Update the root `README.md` if commands, package names, or setup steps change.
- Update `docs/headless-primitive-decision.md` if the primitive strategy changes.
