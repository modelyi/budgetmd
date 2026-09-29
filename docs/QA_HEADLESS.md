# Headless browser verification

The project-level browser smoke check is `scripts/qa-headless.mjs`. It uses the local Playwright Chromium binary, runs headless, loads the SPA, checks for an HTTP success response and a non-empty `#root`, and fails on browser console errors or uncaught page errors.

## Setup

```bash
bun install
bunx playwright install chromium
```

The browser download is machine-local and is not committed to the repository.

## Run against the dev server

In one terminal:

```bash
bun run dev -- --host 127.0.0.1 --port 3000
```

In another terminal:

```bash
bun run qa:headless
```

The URL can be overridden for a preview server, CI host, or a non-default port:

```bash
QA_URL=http://127.0.0.1:4173/ bun run qa:headless
# equivalent:
 bun run qa:headless -- --url http://127.0.0.1:4173/
```

For failure evidence, pass `--screenshot /tmp/budgetdemo-headless.png` (or set `QA_SCREENSHOT`). The command prints machine-readable JSON on success and failure and exits non-zero on failure.

## Hermes / AQ-UAT integration

This is project-owned verification, so no Hermes profile or `config.yaml` change is required. Hermes can still discover and exercise the repository's normal build/start recipe:

```bash
hermes verify --detect-only /home/lcyls/budgetdemo
hermes verify --phase build /home/lcyls/budgetdemo --json
```

For AQ-UAT, start the app with the documented `bun run dev` or `bun run preview` command, then run `bun run qa:headless` against that URL. This headless check is the deterministic smoke gate; Hermes browser tools (`browser_navigate`, snapshots, console inspection, and screenshots) remain appropriate for exploratory or visual UAT after the smoke gate passes. A green build or HTTP `curl` response alone is not browser verification.

When a CI or AQ-UAT runner owns the server lifecycle, use the same two commands with `QA_URL` pointing at its ready URL. Keep the server bind address and URL explicit so the browser does not accidentally target a different local process.

## Scope and limitations

The smoke check proves that the current SPA entry loads in a real headless Chromium context without uncaught browser errors. It does not replace feature-specific UAT (navigation, editing, persistence, or visual review); those should add targeted Playwright checks or use the Hermes exploratory browser workflow.
