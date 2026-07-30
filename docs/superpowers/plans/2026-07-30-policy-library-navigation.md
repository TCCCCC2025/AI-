# Policy Library Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the policy site into an overview homepage plus weekly, national, Beijing-municipal, and district policy pages with concise opportunity and compliance summaries.

**Architecture:** Keep the policy baseline in one typed data module. Add shared navigation and policy-card components; route modules select the appropriate policy group. The homepage derives its aggregate signals from the same baseline.

**Tech Stack:** Vinext/React, TypeScript, CSS, Node test runner.

## Global Constraints

- Preserve the existing private Sites project and hosting metadata.
- Keep all 36 baseline policies in their existing national, municipal, or district group.
- Keep official-source links and visible `持续适用` / `滚动核验` / `待回核` statuses.
- Each policy must show `summary`, `businessImpact`, `complianceImpact`, and `action`.
- `/weekly` must support `新增`、`修订`、`截止`、`移出` changes and show “本周无已核验重大变化” when empty.
- Run the rendered HTML test suite before publication.

---

### Task 1: Enrich the policy data model and baseline summaries

**Files:**
- Modify: `app/policy-data.ts`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `Policy` fields `summary: string`, `businessImpact: string`, `complianceImpact: string`, and `action: string`.
- Produces: `weeklyChanges: WeeklyChange[]`, where `WeeklyChange` has `title`, `changeType`, `date`, `detail`, `href?`, and `status`.

- [ ] **Step 1: Write the failing test**

Add route-content assertions:

```js
assert.match(html, /政策全景/);
assert.match(nationalHtml, /企业机会/);
assert.match(beijingHtml, /合规与业务影响/);
assert.match(districtHtml, /行动提示/);
assert.match(weeklyHtml, /本周无已核验重大变化/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the existing single route has no overview, policy-detail labels, or weekly route content.

- [ ] **Step 3: Add the data fields and entries**

Extend the type exactly as follows and give each of the 36 records concise, policy-specific Chinese text:

```ts
export type Policy = {
  title: string;
  issuer: string;
  date: string;
  themes: string;
  href?: string;
  status: "持续适用" | "滚动核验" | "待回核";
  summary: string;
  businessImpact: string;
  complianceImpact: string;
  action: string;
};
```

Add a weekly baseline entry for the 2026-07-23 Beijing intelligent-agent measure with `changeType: "新增"`; retain the no-major-change message as a fallback when the list is empty.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`

Expected: policy data compiles; route-specific assertions may remain red until Task 2.

- [ ] **Step 5: Commit**

```bash
git add app/policy-data.ts tests/rendered-html.test.mjs
git commit -m "Add policy impact summaries"
```

### Task 2: Build shared navigation, policy cards, and five routes

**Files:**
- Create: `app/components/SiteNav.tsx`
- Create: `app/components/PolicyCard.tsx`
- Create: `app/components/PolicyIndexPage.tsx`
- Modify: `app/page.tsx`
- Create: `app/weekly/page.tsx`
- Create: `app/national/page.tsx`
- Create: `app/beijing/page.tsx`
- Create: `app/districts/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `SiteNav(): JSX.Element` renders links to `/`, `/weekly`, `/national`, `/beijing`, and `/districts`.
- `PolicyCard({ policy }: { policy: Policy }): JSX.Element` renders basic metadata plus summary, opportunity, compliance, action, source, and status.
- `PolicyIndexPage({ groupKey }: { groupKey: "national" | "beijing" | "districts" }): JSX.Element` renders only the requested group.

- [ ] **Step 1: Write the failing test**

Extend the renderer helper to accept a path and add these checks:

```js
const nationalHtml = await render("/national");
assert.match(nationalHtml, /国家部委（20 项）/);
assert.doesNotMatch(nationalHtml, /北京市级（12 项）/);

const weeklyHtml = await render("/weekly");
assert.match(weeklyHtml, /本周最新政策/);
assert.match(weeklyHtml, /新增/);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the route modules and shared page interfaces do not exist.

- [ ] **Step 3: Implement the smallest route set**

Create route modules using the shared component:

```tsx
import { PolicyIndexPage } from "../components/PolicyIndexPage";
export default function NationalPage() {
  return <PolicyIndexPage groupKey="national" />;
}
```

Use identical wrappers for Beijing and districts. On the homepage, derive group counts and theme totals from `policyGroups`, show a “政策全景” section, a latest-change card, and links to all four non-home routes. Do not render the full policy list on the homepage.

- [ ] **Step 4: Add responsive presentation rules**

Policy cards place title and metadata first, followed by four labelled summary blocks. On small screens, stack metadata and summary blocks; navigation remains horizontally scrollable.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`

Expected: PASS with all five pages rendering their expected content and no starter content.

- [ ] **Step 6: Commit**

```bash
git add app/components app/page.tsx app/weekly/page.tsx app/national/page.tsx app/beijing/page.tsx app/districts/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "Add policy overview and category pages"
```

### Task 3: Align the weekly automation with the new information architecture

**Files:**
- Modify: the existing `北京 AI 政策情报每周更新` heartbeat automation

**Interfaces:**
- Consumes: `weeklyChanges`, `policyGroups`, and the policy summary fields.
- Produces: a weekly update that changes `/weekly`, the corresponding policy group, and homepage aggregate content together.

- [ ] **Step 1: Update the automation prompt**

Set the weekly workflow to: verify source → write the change into `/weekly` → add, revise, or remove the policy in its matching group → update its four summary fields → update homepage overview and radar → test → privately publish.

- [ ] **Step 2: Verify the saved automation**

Read the automation and confirm it contains `新增`、`修订`、`截止`、`移出` and never authorizes publishing unverified information.

- [ ] **Step 3: Check repository state**

Run: `git status --short`

Expected: clean worktree; the automation is app-managed, not committed into the site repository.

### Task 4: Publish and verify the redesigned private site

**Files:**
- Modify: generated production build output only

**Interfaces:**
- Consumes: the tested repository HEAD from Tasks 1–2.
- Produces: a saved Sites version and a successful private deployment.

- [ ] **Step 1: Run final validation**

Run: `npm test`

Expected: PASS.

- [ ] **Step 2: Save and privately publish the exact validated version**

Push the current repository HEAD using a short-lived Sites source credential, package the site, save one version, and deploy that saved version through the existing private Sites project.

- [ ] **Step 3: Verify the deployment**

Poll the deployment until it reaches `succeeded`; report the production URL only after that status has been re-read.

- [ ] **Step 4: Check repository state**

Run: `git status --short`

Expected: no uncommitted application source changes after the published version is created.

