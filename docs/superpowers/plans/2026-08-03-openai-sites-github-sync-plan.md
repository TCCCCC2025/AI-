# OpenAI Sites 与 GitHub Pages 同步 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a safe, validated command that the weekly policy automation can use to commit and push the same verified site update to GitHub Pages after publishing OpenAI Sites.

**Architecture:** The local policy workspace remains the single content source. A Node.js sync command validates the site, rejects changes outside an allowlist, commits the approved site files, pushes `github-pages` to the GitHub `origin`, and verifies the remote head; GitHub Actions then builds and deploys the existing static artifact. The existing OpenAI Sites publish step remains separate and is not reimplemented in this repository.

**Tech Stack:** Node.js 22 ESM scripts, `node:test`, npm scripts, Git CLI, GitHub Actions, GitHub Pages.

## Global Constraints

- Policy facts must use verified official sources; synchronization must never publish unverified policy information.
- The local policy workspace is `/Users/cc/.codex/.chatgpt-projects/g-p-6a5dce0a21388191a15aa1d9ac70aa5f/beijing-ai-policy-site`.
- GitHub target is remote `origin`, repository `TCCCCC2025/AI-`, branch `github-pages`.
- The `sites` remote and existing OpenAI Sites flow remain unchanged.
- GitHub credentials must remain in Keychain or an external Secret and must never be committed, logged, or sent in chat.
- Existing routes and the Pages project prefix `/AI-/` must continue to work.

---

### Task 1: Add the safe GitHub synchronization command

**Files:**
- Create: `scripts/github-sync.mjs`
- Test: `tests/github-sync.test.mjs`

**Interfaces:**
- `isAllowedPath(filePath: string): boolean` returns whether a changed path may be synchronized.
- `parseChangedPaths(statusOutput: string): string[]` parses porcelain Git status and throws on disallowed paths.
- `formatCommitMessage(message: string | undefined, date: string): string` returns a non-empty commit message.
- `run({ dryRun: boolean })` performs validation, stages only allowlisted paths, commits when changes exist, pushes `origin github-pages`, and verifies the pushed SHA; `dryRun: true` stops before staging or pushing.

- [ ] **Step 1: Write failing unit tests for path safety and commit-message behavior.**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { formatCommitMessage, isAllowedPath, parseChangedPaths } from "../scripts/github-sync.mjs";

test("allows site and deployment files but rejects private or unrelated files", () => {
  assert.equal(isAllowedPath("app/policy-data.ts"), true);
  assert.equal(isAllowedPath(".github/workflows/pages.yml"), true);
  assert.equal(isAllowedPath(".openai/hosting.json"), true);
  assert.equal(isAllowedPath(".env"), false);
  assert.equal(isAllowedPath("sources/internal-notes.md"), false);
  assert.equal(isAllowedPath("docs/private-notes.md"), false);
});

test("parses ordinary, untracked, and renamed status entries", () => {
  const status = [
    " M app/policy-data.ts",
    "?? scripts/new-helper.mjs",
    "R  app/old-page.tsx -> app/new-page.tsx",
  ].join("\\n");
  assert.deepEqual(parseChangedPaths(status), [
    "app/policy-data.ts",
    "scripts/new-helper.mjs",
    "app/new-page.tsx",
  ]);
});

test("rejects a status containing a path outside the synchronization allowlist", () => {
  assert.throws(() => parseChangedPaths(" M .env"), /outside the synchronization allowlist/);
});

test("creates a deterministic default commit message", () => {
  assert.equal(
    formatCommitMessage(undefined, "2026-08-03"),
    "chore: sync policy intelligence 2026-08-03",
  );
  assert.equal(formatCommitMessage("weekly policy refresh", "2026-08-03"), "weekly policy refresh");
});
```

- [ ] **Step 2: Run the focused tests and verify they fail because the sync module is missing.**

Run: `node --test tests/github-sync.test.mjs`

Expected: FAIL with a module-not-found or missing-export error for `scripts/github-sync.mjs`.

- [ ] **Step 3: Implement the minimal sync module.**

Implement these exact behaviors in `scripts/github-sync.mjs`:

1. Export `isAllowedPath`, `parseChangedPaths`, and `formatCommitMessage`.
2. Define the allowlist as `.github/`, `.openai/`, `app/`, `public/`, `scripts/`, `README.md`, `next.config.ts`, `package.json`, `package-lock.json`, `postcss.config.mjs`, `vite.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `drizzle.config.ts`, `db/`, and `examples/`.
3. Read `git status --porcelain=v1`; parse the path after the two status columns, and for renames use the destination path. Reject any path outside the allowlist before staging anything.
4. Require `git branch --show-current` to equal `github-pages` and require `git remote get-url origin` to contain `github.com/TCCCCC2025/AI-`.
5. Run `npm run lint`, `npm test`, and `node scripts/prepare-github-pages.mjs`; assert that `dist/client/index.html`, `dist/client/weekly/index.html`, `dist/client/national/index.html`, `dist/client/beijing/index.html`, and `dist/client/districts/index.html` are non-empty.
6. Stage only the allowlisted changed paths with `git add -- <paths>`. If there are no changed paths, print a no-op message and exit successfully after validation.
7. Commit with `--message` from the CLI or `chore: sync policy intelligence YYYY-MM-DD` in Asia/Shanghai, push with `git push origin github-pages`, and compare `git rev-parse HEAD` with `git ls-remote origin refs/heads/github-pages`; exit non-zero on mismatch.
8. Support `--dry-run` to run all preflight checks and print the allowlisted change set without staging, committing, or pushing. Never run `git push --force`, never stage `.env` or `sources/`, and never print credential values.

- [ ] **Step 4: Run focused tests and lint.**

Run: `node --test tests/github-sync.test.mjs` and `npm run lint`

Expected: all focused tests pass and ESLint exits 0.

- [ ] **Step 5: Commit the command and focused tests.**

```bash
git add scripts/github-sync.mjs tests/github-sync.test.mjs
git commit -m "feat: add validated GitHub policy sync"
```

### Task 2: Expose and document the weekly sync entrypoint

**Files:**
- Modify: `package.json`
- Create: `docs/weekly-github-sync.md`
- Modify: `README.md`

**Interfaces:**
- npm command: `npm run sync:github -- --message "<message>"`
- Runbook describes the required order: validate policy data, publish Sites, run sync command, verify Pages.

- [ ] **Step 1: Add the npm script.**

Add this exact entry to `package.json` scripts:

```json
"sync:github": "node scripts/github-sync.mjs"
```

- [ ] **Step 2: Document normal and recovery usage.**

Create `docs/weekly-github-sync.md` with the exact commands:

```bash
npm run sync:github -- --message "chore: sync policy intelligence week 32"
```

Document that the command must run after official-source verification and Sites publication; a non-zero exit means GitHub is pending and the recorded commit must be retried after credentials are restored. Document the public URL `https://tccccc2025.github.io/AI-/` and the GitHub Pages workflow name `Publish policy site to GitHub Pages`.

- [ ] **Step 3: Add a short README section linking the runbook.**

Add a “每周同步” section explaining that GitHub Actions deploys automatically after `github-pages` receives a commit, and link to `docs/weekly-github-sync.md`.

- [ ] **Step 4: Run metadata and documentation checks.**

Run: `npm run lint` and `git diff --check`

Expected: both commands exit 0.

- [ ] **Step 5: Commit the entrypoint and documentation.**

```bash
git add package.json README.md docs/weekly-github-sync.md
git commit -m "docs: add weekly GitHub sync runbook"
```

### Task 3: Wire the recurring policy automation to the sync command

**Files / external configuration:**
- Update: Codex heartbeat automation `ai` prompt via `codex_app__automation_update`
- Reference: `docs/weekly-github-sync.md`

**Interfaces:**
- The recurring run invokes `npm run sync:github -- --message "chore: sync policy intelligence week <ISO week>"` after Sites publication and validation.

- [ ] **Step 1: Update the existing heartbeat prompt without changing its schedule or policy scope.**

Append these instructions to the existing `ai` automation prompt:

“After the official-source validation, site tests, and existing OpenAI Sites publish/readback succeed, run `npm run sync:github -- --message \"chore: sync policy intelligence week <ISO week>\"` from `/Users/cc/.codex/.chatgpt-projects/g-p-6a5dce0a21388191a15aa1d9ac70aa5f/beijing-ai-policy-site`. Verify the `github-pages` remote head and GitHub Actions/Pages result before reporting GitHub synchronization. If the command fails, do not claim GitHub sync success; report the exact commit SHA, failure reason, pending sync set, and safe retry count. Never push unverified policy facts.”

Preserve the existing Monday 09:00 Asia/Shanghai schedule, model, destination, and all existing policy-source instructions.

- [ ] **Step 2: View the automation and confirm the prompt contains the sync instruction.**

Use `codex_app__automation_update` with `{ "id": "ai", "mode": "view" }` and verify the updated prompt through the rendered automation card.

- [ ] **Step 3: Record the automation update in the task report.**

Include the automation id `ai`, unchanged schedule, and the new GitHub sync command in the final report.

### Task 4: Run the full verification and publish the synchronization changes

**Files:**
- Test: `tests/*.test.mjs`
- Verify: `.github/workflows/pages.yml`, GitHub `github-pages` branch, GitHub Pages URL

- [ ] **Step 1: Run the full project checks.**

Run: `npm test`

Expected: all existing tests and the new sync tests pass.

- [ ] **Step 2: Run the sync command in dry-run mode.**

Run: `npm run sync:github -- --dry-run --message "chore: verify GitHub sync workflow"` and verify it runs validation, reports the allowlisted change set, and does not create a commit or push.

- [ ] **Step 3: Push the implementation commit through the authorized GitHub Desktop session.**

If the terminal cannot read the Desktop credential, open the repository in GitHub Desktop and click **Push origin**; do not paste a token into chat. Verify `git ls-remote --heads origin` contains the new `github-pages` SHA.

- [ ] **Step 4: Dispatch or observe `Publish policy site to GitHub Pages`.**

Verify that `build` and `deploy` succeed and that `curl -L -sS -o /tmp/beijing-ai-pages.html -w '%{http_code}' https://tccccc2025.github.io/AI-/` returns `200` with the title `北京 AI 政策情报`.

- [ ] **Step 5: Commit any final verification-only documentation change.**

```bash
git status --short --branch
git diff --check
```

Expected: clean worktree with the implementation commits recorded and no generated `dist/` files tracked.
