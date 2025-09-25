# Repository Guidelines

## Project Structure & Module Organization
The Next.js 15 app lives under `src/app`, with route handlers such as `src/app/page.tsx` (landing) and `src/app/notes/page.tsx` (editor). Shared UI and logic sit in `src/components`, `src/hooks`, `src/lib`, and static definitions in `src/constants` and `src/types`. Jest specs reside in `src/__tests__`, and public assets are served from `public/`. Global styling is maintained through `src/app/globals.css` and Tailwind configuration in `postcss.config.mjs`.

## Build, Test, and Development Commands
Use `npm run dev` for a local dev server with Turbopack hot reload. `npm run build` performs a production bundle, while `npm run start` serves the compiled output. Run `npm run lint` or `npm run lint:fix` before committing to keep ESLint happy, and `npm run type-check` to catch typing drift. Formatting is handled through `npm run format` (write) or `npm run format:check` (verify only).

## Coding Style & Naming Conventions
Stick to TypeScript across new modules and keep JSX/TSX files using PascalCase names (`components/NoteList.tsx`). Hooks should live in `src/hooks` with `use` prefixes, utilities in `src/lib` with camelCase exports, and constants in `src/constants` using UPPER_SNAKE_CASE. Follow the ESLint + Prettier defaults (two-space indentation, single quotes where auto-formatted) and avoid introducing non-ASCII text unless the UI copy requires it.

## Testing Guidelines
Tests use Jest with the jsdom environment and React Testing Library helpers configured through `jest.setup.js`. Mirror production file names (`note-editor.test.tsx`) and keep integration flows inside `src/__tests__/integration.test.tsx`. Run `npm test` before opening a PR, and add `npm run test:coverage` when touching complex flows—keep coverage from regressing versus the existing `coverage/` report. Prefer user-facing assertions (`screen.getByRole`) over implementation details.

## Commit & Pull Request Guidelines
Follow the repository’s pattern of descriptive commit titles—short summaries in Traditional Chinese or English are acceptable, but be explicit about the feature or fix. Group related changes into focused commits and ensure linting and tests pass beforehand. PRs should include: a concise summary, screenshots or GIFs for visible UI work, linked issues when available, and notes on any new scripts or environment variables. Request review before merging and wait for CI green lights.
