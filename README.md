# LDS

Law Design System monorepo scaffold for versioned UI libraries.

## Current Track

- `v3`: React 18.2 target, latest design system
- styling: `vanilla-extract`
- docs: `Storybook` + `apps/docs`
- tests: `Vitest` + Testing Library

## Structure

- `apps/docs`: local playground app wired to `ui-v3`
- `apps/storybook`: component docs and visual review
- `packages/ui-v3`: publishable React 18.2 component library
- `packages/tokens`: theme contract and semantic tokens
- `packages/eslint-config`: shared lint config placeholder
- `packages/typescript-config`: shared tsconfig files
- `designs`: Figma/Zeplin drop zone

## Next

1. Run `npm install`
2. Run `npm run storybook` or `npm run dev`
3. Tell me which v3 component to build next
