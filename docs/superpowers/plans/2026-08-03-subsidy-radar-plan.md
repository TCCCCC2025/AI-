# 补贴申报雷达 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Add a static, auditable \`/subsidies\` radar that prioritizes current Beijing AI subsidy windows and exposes amount, eligibility, application portal, evidence, and customer-manager actions.

**Architecture:** Keep policy records in a dedicated \`app/subsidy-data.ts\` module with pure selectors and explicit verification metadata. Render a server-side page from those records using reusable presentational components and native \`<details>\` blocks, so the core content survives GitHub Pages static export without a runtime API. Add navigation/home entry points and a focused rendered HTML/data test suite.

**Tech Stack:** Next/Vinext static export, React server components, TypeScript, plain CSS, Node test runner.

## Global Constraints

- Formal subsidy facts must be traceable to an official policy, notice, official attachment, or official platform page; secondary media/公众号 evidence is labeled as a lead only.
- Every record carries status, amount, portal, eligibility, last verification date, source tier, and a verification note.
- Do not add login, external runtime requests, secret storage, or application submission automation.
- Preserve the existing GitHub Pages path \`/AI-/\` and run \`npm run lint\` plus \`npm test\` before publishing.
- Existing \`sources/\` files remain read-only; all implementation changes stay under the site repository.

---

### Task 1: Add the subsidy data model and verified seed records

**Files:**
- Create: \`app/subsidy-data.ts\`
- Test: \`tests/subsidy-data.test.mjs\`

**Interfaces:**
- Produces \`SubsidyPolicy\`, \`SubsidyStatus\`, \`subsidyPolicies\`, \`subsidyMetrics\`, \`subsidyDistricts\`, \`subsidyThemes\`, \`currentSubsidies()\`, and \`subsidyStatusLabel()\`.
- Consumes no UI code or runtime services.

- [ ] **Step 1: Write the failing data-contract tests**

\`\`\`js
import assert from "node:assert/strict";
import test from "node:test";
import {
  currentSubsidies,
  subsidyMetrics,
  subsidyPolicies,
  subsidyStatusLabel,
} from "../app/subsidy-data.ts";

test("seed records have auditable application fields", () => {
  assert.ok(subsidyPolicies.length >= 7);
  assert.equal(new Set(subsidyPolicies.map((item) => item.id)).size, subsidyPolicies.length);
  for (const item of subsidyPolicies) {
    assert.ok(item.name && item.district && item.amount);
    assert.ok(item.eligibility.length >= 2);
    assert.ok(item.supportDirection.length >= 1);
    assert.ok(item.portal.length >= 1);
    assert.ok(item.source.length >= 1);
    assert.ok(item.lastVerified);
    assert.ok(["A", "B", "C", "lead"].includes(item.source[0].tier));
  }
});

test("current selector excludes closed records and metrics remain consistent", () => {
  assert.ok(currentSubsidies().every((item) => !["closed", "pending_verification"].includes(item.status)));
  assert.equal(subsidyMetrics.current, currentSubsidies().length);
  assert.equal(subsidyStatusLabel("closing_soon"), "即将截止");
});
\`\`\`

- [ ] **Step 2: Run the focused test and verify it fails**

Run: \`node --experimental-strip-types --test tests/subsidy-data.test.mjs\`

Expected: FAIL because \`app/subsidy-data.ts\` does not exist.

- [ ] **Step 3: Implement the data model and seed records**

Create the explicit union types and records from the approved design: municipal AI compute voucher, municipal innovation compute voucher, municipal SME service/Token voucher, Haidian model voucher, Fengtai AI support measures, E-Town model voucher round and E-Town data/AI measures, plus Tongzhou OPC support. Store closed rounds as \`closed\` while keeping their next-round policy context. Use official links for amount/conditions/portal and official-dynamic links only for platform launch facts.

Implement pure helpers:

\`\`\`ts
export function currentSubsidies(): SubsidyPolicy[] {
  return subsidyPolicies.filter((item) => !["closed", "pending_verification"].includes(item.status));
}

export function subsidyStatusLabel(status: SubsidyStatus): string { /* exhaustive mapping */ }
\`\`\`

Set \`subsidyMetrics\` from the array rather than hard-coding counts. \`subsidyDistricts\` must include all 16 districts plus \`北京市级\` and \`北京经开区\`, with \`evidenceCount\` and \`verificationState\` so missing coverage is visible instead of inferred as no policy.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: \`node --experimental-strip-types --test tests/subsidy-data.test.mjs\`

Expected: PASS.

- [ ] **Step 5: Commit the data layer**

\`\`\`bash
git add app/subsidy-data.ts tests/subsidy-data.test.mjs
git commit -m "feat: add verified Beijing AI subsidy data"
\`\`\`

### Task 2: Build the subsidy radar page and detail presentation

**Files:**
- Create: \`app/components/SubsidyCard.tsx\`
- Create: \`app/components/SubsidyRadarPage.tsx\`
- Create: \`app/subsidies/page.tsx\`
- Modify: \`app/layout.tsx\`

**Interfaces:**
- \`SubsidyCard\` consumes one \`SubsidyPolicy\` and renders all decision-critical fields.
- \`SubsidyRadarPage\` consumes the exported data selectors and renders the page sections.
- \`/subsidies\` is a static route with page metadata and no runtime fetch.

- [ ] **Step 1: Write the failing rendered-route assertions**

Extend \`tests/rendered-html.test.mjs\` with:

\`\`\`js
test("renders the subsidy radar with current windows and application details", async () => {
  const html = await (await render("/subsidies")).text();
  assert.match(html, /补贴申报雷达/);
  assert.match(html, /当前可申报/);
  assert.match(html, /Token/);
  assert.match(html, /算力券/);
  assert.match(html, /申报条件/);
  assert.match(html, /申报入口/);
  assert.match(html, /官方来源/);
  assert.match(html, /丰台区/);
  assert.match(html, /海淀区/);
});
\`\`\`

Run: \`npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs\`

Expected: FAIL because the route and components do not exist.

- [ ] **Step 2: Implement \`SubsidyCard\`**

Render a semantic \`<article>\` with status, level/district, name, amount, deadline, support directions, eligibility, materials, portals, customer types, opportunity/action, compliance, sources and verification date. Use \`<details open>\` for the detailed section and label external links as “官方来源” or “政策兑现入口”. Do not hide amount, deadline, or portal behind the disclosure.

- [ ] **Step 3: Implement \`SubsidyRadarPage\` and route metadata**

Render:

1. Hero explaining “先看能不能申报，再看支持多少”。
2. Metric strip from \`subsidyMetrics\`.
3. “当前窗口” list from \`currentSubsidies()\` ordered by status priority and deadline.
4. “全部政策库” grouped by theme and district, including closed records.
5. “区域覆盖与核验队列” from \`subsidyDistricts\`.
6. Disclaimer and source standard.

Use native anchor chips (\`#current\`, \`#all\`, \`#coverage\`) so static export remains usable without a client-side filter. Add \`metadata\` title/description in \`app/subsidies/page.tsx\`.

- [ ] **Step 4: Run route assertions and build**

Run: \`npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs\`

Expected: PASS.

- [ ] **Step 5: Commit the page**

\`\`\`bash
git add app/components/SubsidyCard.tsx app/components/SubsidyRadarPage.tsx app/subsidies/page.tsx app/layout.tsx tests/rendered-html.test.mjs
git commit -m "feat: add subsidy application radar page"
\`\`\`

### Task 3: Add navigation, homepage entry, and responsive styling

**Files:**
- Modify: \`app/components/SiteNav.tsx\`
- Modify: \`app/page.tsx\`
- Modify: \`app/globals.css\`
- Test: \`tests/rendered-html.test.mjs\`

**Interfaces:**
- Existing routes remain unchanged; the new entry is additive and uses \`/subsidies\`.
- CSS classes are scoped with \`subsidy-\` prefixes to avoid changing current policy pages.

- [ ] **Step 1: Add failing navigation/home assertions**

\`\`\`js
test("links to subsidy radar from navigation and homepage", async () => {
  const homeHtml = await (await render("/")).text();
  assert.match(homeHtml, /补贴申报雷达/);
  assert.match(homeHtml, /href="\\/subsidies"/);
});
\`\`\`

- [ ] **Step 2: Add the nav and homepage entry**

Add \`补贴申报雷达\` to \`SiteNav\` and a prominent homepage card in the action-radar/role-entry area that states it prioritizes current windows and includes Token/算力/备案/data support.

- [ ] **Step 3: Add responsive styles**

Add desktop grid/card styles and a mobile single-column layout. Keep status meaning in text, preserve visible deadlines/amounts, and add focus-visible outlines for new links/details.

- [ ] **Step 4: Run lint and rendered tests**

Run: \`npm run lint && npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs\`

Expected: PASS.

- [ ] **Step 5: Commit navigation and styling**

\`\`\`bash
git add app/components/SiteNav.tsx app/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: expose subsidy radar in site navigation"
\`\`\`

### Task 4: Document the weekly update contract and verify static publishing

**Files:**
- Modify: \`README.md\`
- Create: \`docs/subsidy-radar-update.md\`
- Test: \`tests/subsidy-data.test.mjs\`

**Interfaces:**
- Documentation describes the evidence/status rules used by the weekly automation.
- No external API or secret is introduced.

- [ ] **Step 1: Add update-runbook assertions**

Extend the data test to ensure at least one record has \`closed\` status and a non-empty \`verificationNote\`, and that every \`pending_verification\` record has no \`A\`-tier source.

- [ ] **Step 2: Write the runbook**

Document the weekly sequence: scan all Beijing districts, verify official source, update \`lastVerified\`/status/deadline, add \`/weekly\` change record first, run lint/test/build, then use \`npm run sync:github -- --message "chore: sync subsidy radar YYYY-Www"\`.

- [ ] **Step 3: Run the complete verification suite**

Run: \`npm run lint && npm test && npm run sync:github -- --dry-run --message "chore: verify subsidy radar"\`

Expected: lint passes, all tests pass, dry-run reports only allowlisted changes and does not push.

- [ ] **Step 4: Commit the runbook**

\`\`\`bash
git add README.md docs/subsidy-radar-update.md tests/subsidy-data.test.mjs
git commit -m "docs: add subsidy radar update runbook"
\`\`\`

### Task 5: Publish to GitHub Pages after verification

**Files:**
- No source changes; publish the commits on \`github-pages\`.

- [ ] **Step 1: Confirm the worktree and branch**

Run: \`git status --short --branch\`

Expected: clean \`github-pages\` branch except intentional commits.

- [ ] **Step 2: Push using the validated sync script**

Run: \`npm run sync:github -- --message "feat: publish subsidy application radar"\`

Expected: allowlisted validation, lint, tests, static preparation, commit/push, and remote SHA readback.

- [ ] **Step 3: Verify Actions and Pages**

Check the latest GitHub Actions workflow for a successful build/deploy and request \`https://tccccc2025.github.io/AI-/subsidies/\` with HTTP 200. Confirm page title and “补贴申报雷达” text.

- [ ] **Step 4: Report the release**

Report the page URL, number of seed records, current/closed status counts, official-source caveats, and any districts still in the verification queue. Do not describe a policy as currently open unless the data record is marked \`open\`, \`closing_soon\`, or \`rolling\` with a source and date.

