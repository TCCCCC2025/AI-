import assert from "node:assert/strict";
import test from "node:test";
import { formatCommitMessage, isAllowedPath, parseChangedPaths } from "../scripts/github-sync.mjs";

test("allows site and deployment files but rejects private or unrelated files", () => {
  assert.equal(isAllowedPath("app/policy-data.ts"), true);
  assert.equal(isAllowedPath("docs/subsidy-radar-update.md"), true);
  assert.equal(isAllowedPath("tests/subsidy-data.test.mjs"), true);
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
  ].join("\n");
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
