# Copilot Instructions for HomePage

## Build, test, and lint

- There are currently no repository-defined build, test, or lint commands.
- This project has no package manifest or task runner; changes are made directly in `index.html`.

## High-level architecture

- The repository is a single static HTML entry point: `index.html`.
- `index.html` currently defines only the document shell (`doctype`, `html`, `head`, metadata, title, and empty `body`).
- There is no frontend framework, bundler, backend service, or API integration in this repository at this time.

## Key conventions in this codebase

- Keep the existing HTML5 shell structure intact unless a change explicitly requires restructuring it.
- Preserve core document metadata already present in `index.html`:
  - `<html lang="en">`
  - `<meta charset="UTF-8">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Follow the existing formatting style used in `index.html` (4-space indentation and simple, readable section spacing).
- Prefer plain browser-compatible HTML/CSS/JS patterns because there is no transpilation or build step.
