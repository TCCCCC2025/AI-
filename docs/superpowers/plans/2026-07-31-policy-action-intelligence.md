# Policy Action Intelligence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Beijing AI policy site with lifecycle, opportunity, customer, relationship, and decision-ready analysis while preserving the existing five-route structure.

**Architecture:** Keep `app/policy-data.ts` as the source of truth and enrich each base record through a small, deterministic analysis layer in the same module. Render the enriched fields through the existing policy card and aggregate them on the homepage. Validate both data invariants and rendered output before publishing the existing Sites project.

**Tech Stack:** TypeScript 5.9, React 19, Vinext/Next-compatible routes, Node test runner, CSS.

## Global Constraints

- Preserve the existing routes `/`, `/weekly`, `/national`, `/beijing`, and `/districts`.
- Preserve all 36 baseline policies in their current level.
- Policy facts and business interpretation must be visibly distinguished.
- Every policy must have a stable unique `id`, lifecycle, opportunity level, customer types, scenarios, judgement, and analysis basis.
- A policy with status `待回核` must use opportunity level `观察`.
- Relationship references must point to existing policy IDs and must not self-reference.
- Invalid or superseded policies are retained in historical data rather than physically deleted.
- Do not add authentication, subscriptions, a CMS, customer names, or individual policy detail routes.

---

## File Map

- `app/policy-data.ts`: policy types, stable IDs, enrichment rules, customer classification, relationships, and aggregate selectors.
- `app/components/PolicyCard.tsx`: judgement, opportunity level, customer tags, scenarios, fact/analysis labeling, and related-policy links.
- `app/components/PolicyIndexPage.tsx`: page guidance explaining fact versus business judgement.
- `app/page.tsx`: period judgement metrics and opportunity/risk board.
- `app/globals.css`: responsive presentation for judgement strips, tags, relationship rows, and homepage board.
- `tests/policy-data.test.mjs`: data completeness, status, ID, and relationship invariants.
- `tests/rendered-html.test.mjs`: user-visible homepage and classification-page behavior.
- `package.json`: run both test files with Node TypeScript stripping enabled.

---

### Task 1: Policy intelligence data model and invariants

**Files:**
- Create: `tests/policy-data.test.mjs`
- Modify: `package.json`
- Modify: `app/policy-data.ts`

**Interfaces:**
- Produces: `PolicyWithBrief` with `id`, `validity`, `opportunityLevel`, `judgement`, `customerTypes`, `scenarios`, `relatedPolicies`, and `analysisBasis`.
- Produces: `getPolicyById(id: string): PolicyWithBrief | undefined`.
- Produces: `policyMetrics` with `highOpportunity`, `complianceAttention`, `pendingVerification`, and `rollingVerification`.
- Consumes: existing `policyGroupsBase`, `tailoredBriefs`, `policyGroups`, and `weeklyChanges`.

- [ ] **Step 1: Write the failing data-invariant test**

Create `tests/policy-data.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { policyGroups, policyMetrics } from "../app/policy-data.ts";

const policies = policyGroups.flatMap((group) => group.policies);

test("all policies contain actionable intelligence fields", () => {
  assert.equal(policies.length, 36);
  assert.equal(new Set(policies.map((policy) => policy.id)).size, policies.length);

  for (const policy of policies) {
    assert.ok(policy.id);
    assert.ok(policy.validity);
    assert.ok(["高", "中", "观察"].includes(policy.opportunityLevel));
    assert.ok(policy.judgement.length >= 10);
    assert.ok(policy.customerTypes.length >= 1);
    assert.ok(policy.scenarios.length >= 1);
    assert.ok(policy.analysisBasis.includes("业务研判"));
    if (policy.status === "待回核") {
      assert.equal(policy.opportunityLevel, "观察");
    }
  }
});

test("all related policy references are valid", () => {
  const ids = new Set(policies.map((policy) => policy.id));

  for (const policy of policies) {
    for (const relation of policy.relatedPolicies) {
      assert.notEqual(relation.policyId, policy.id);
      assert.ok(ids.has(relation.policyId), `${policy.id} -> ${relation.policyId}`);
      assert.ok(["上位依据", "配套细则", "同主题"].includes(relation.type));
    }
  }
});

test("homepage metrics match the policy universe", () => {
  assert.equal(
    policyMetrics.pendingVerification,
    policies.filter((policy) => policy.validity === "待核实").length,
  );
  assert.equal(
    policyMetrics.rollingVerification,
    policies.filter((policy) => policy.validity === "滚动事项").length,
  );
});
```

- [ ] **Step 2: Update the test script and verify RED**

Change `package.json`:

```json
"test": "npm run build && node --experimental-strip-types --test tests/*.test.mjs"
```

Run: `npm test`

Expected: FAIL because the current policy records do not expose `id`, `validity`, `opportunityLevel`, `customerTypes`, `scenarios`, `relatedPolicies`, `analysisBasis`, or `policyMetrics`.

- [ ] **Step 3: Add the policy intelligence types**

Add these types to `app/policy-data.ts`:

```ts
export type PolicyValidity =
  | "现行有效"
  | "滚动事项"
  | "待核实"
  | "已截止"
  | "已废止"
  | "被替代";

export type OpportunityLevel = "高" | "中" | "观察";

export type RelatedPolicy = {
  type: "上位依据" | "配套细则" | "同主题";
  policyId: string;
};

export type PolicyAnalysis = {
  validity: PolicyValidity;
  opportunityLevel: OpportunityLevel;
  judgement: string;
  customerTypes: string[];
  scenarios: string[];
  relatedPolicies: RelatedPolicy[];
  analysisBasis: "官方事实 + 业务研判";
};
```

Extend `Policy` with `id: string`. Extend `PolicyWithBrief` with `PolicyAnalysis`.

- [ ] **Step 4: Assign stable IDs to all 36 baseline records**

Use this immutable ID convention, based on issuing level and a concise policy identity rather than array position:

```text
nat-2026-innovation-challenge
nat-2026-soe-ai-scenarios
nat-agent-interoperability
nat-mobile-genai-filing-202607
nat-internet-infrastructure
nat-genai-filing-20260506
nat-data-property-registration
nat-agent-standards
nat-ai-telecom-2026
nat-industry-datasets
nat-digital-economy-2026
nat-genai-filing-20260304
nat-agent-development
nat-data-factor-contest-2026
nat-anthropomorphic-ai
nat-ai-energy
nat-inclusive-compute-sme
nat-ai-ethics-review
nat-compute-interconnection
nat-ai-manufacturing
bj-agent-measures
bj-public-data-operation
bj-smart-city-demand-202604
bj-industrial-dataset-demand-202603
bj-industry-education-2026
bj-ai-opc
bj-ai-industrial-internet
bj-smart-glasses
bj-economic-measures-2026
bj-high-tech-fund-202601
bj-satellite-data
bj-ai-innovation-highland
dist-tongzhou-digital-economy
dist-changping-ai-plus
dist-haidian-opc
dist-etown-ai-city
```

- [ ] **Step 5: Implement deterministic enrichment**

Add customer and scenario selectors:

```ts
const themeCustomers: Record<string, string[]> = {
  AI: ["大模型与智能体企业", "央国企与大型企业数字化部门"],
  大模型: ["大模型与智能体企业", "AI 创业公司与 OPC"],
  算力: ["云服务与算力运营商", "芯片、服务器与数据中心企业"],
  数据: ["数据服务与数据运营机构", "网络安全、数据治理与模型评测机构"],
};

const themeScenarios: Record<string, string> = {
  AI: "人工智能产品与行业应用",
  大模型: "大模型、智能体与生成式 AI 服务",
  算力: "智算基础设施与算力服务",
  数据: "数据集建设、授权运营与数据治理",
};

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function mapValidity(status: Policy["status"]): PolicyValidity {
  if (status === "待回核") return "待核实";
  if (status === "滚动核验") return "滚动事项";
  return "现行有效";
}
```

Create a typed `tailoredAnalysis` record for high-value policies and use a conservative fallback:

```ts
function addAnalysis(policy: Policy): PolicyAnalysis {
  const themes = policy.themes.split(" / ");
  const pending = policy.status === "待回核";
  const fallback: PolicyAnalysis = {
    validity: mapValidity(policy.status),
    opportunityLevel: pending ? "观察" : "中",
    judgement: pending
      ? "原文仍待精确回核，当前只作为政策线索观察。"
      : `该政策对${themes.join("、")}相关产品、项目或治理工作具有持续影响。`,
    customerTypes: unique(themes.flatMap((theme) => themeCustomers[theme] ?? [])).slice(0, 4),
    scenarios: unique(themes.map((theme) => themeScenarios[theme]).filter(Boolean)).slice(0, 3),
    relatedPolicies: [],
    analysisBasis: "官方事实 + 业务研判",
  };
  return { ...fallback, ...tailoredAnalysis[policy.id] };
}
```

Tailor at least these high-value policy IDs:

- `bj-agent-measures`: high opportunity; customers include large-model/agent companies, AI startups/OPCs, compute operators, and enterprise digital teams.
- `bj-public-data-operation`: high opportunity; customers include data operators, data governance/security organizations, and enterprise digital teams.
- `bj-ai-opc`: high opportunity; customers include AI startups/OPCs, large-model/agent companies, and parks/research institutions.
- `bj-ai-industrial-internet`: high opportunity; customers include manufacturing clients, enterprise digital teams, data service providers, and model companies.
- `bj-high-tech-fund-202601`: rolling item with high opportunity; customers include model companies, compute operators, software companies, and AI startups/OPCs.
- `dist-etown-ai-city`: high opportunity; customers include AI startups/OPCs, model companies, compute operators, and park operators.
- `nat-anthropomorphic-ai` and `nat-ai-ethics-review`: compliance-focused judgement and observation opportunity.

Add reciprocal, valid relationships for:

```ts
"bj-agent-measures" -> [
  { type: "同主题", policyId: "bj-ai-opc" },
  { type: "配套细则", policyId: "bj-high-tech-fund-202601" },
  { type: "同主题", policyId: "nat-agent-development" },
]
"bj-ai-opc" -> [
  { type: "上位依据", policyId: "bj-agent-measures" },
  { type: "同主题", policyId: "dist-haidian-opc" },
  { type: "同主题", policyId: "dist-etown-ai-city" },
]
"bj-ai-industrial-internet" -> [
  { type: "上位依据", policyId: "nat-ai-manufacturing" },
  { type: "配套细则", policyId: "bj-industrial-dataset-demand-202603" },
]
"bj-public-data-operation" -> [
  { type: "同主题", policyId: "nat-data-property-registration" },
  { type: "同主题", policyId: "bj-satellite-data" },
]
```

Merge `addBrief(policy)` and `addAnalysis(policy)` when creating `policyGroups`. Export:

```ts
export const allPolicies = policyGroups.flatMap((group) => group.policies);

export function getPolicyById(id: string) {
  return allPolicies.find((policy) => policy.id === id);
}

export const policyMetrics = {
  highOpportunity: allPolicies.filter((policy) => policy.opportunityLevel === "高").length,
  complianceAttention: allPolicies.filter((policy) =>
    policy.judgement.includes("合规"),
  ).length,
  pendingVerification: allPolicies.filter((policy) => policy.validity === "待核实").length,
  rollingVerification: allPolicies.filter((policy) => policy.validity === "滚动事项").length,
};
```

- [ ] **Step 6: Run the data tests and verify GREEN**

Run: `npm test`

Expected: all data-invariant and existing rendered HTML tests pass.

- [ ] **Step 7: Commit**

```bash
git add package.json app/policy-data.ts tests/policy-data.test.mjs
git commit -m "Add actionable policy intelligence model"
```

---

### Task 2: Policy cards and homepage decision board

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/components/PolicyCard.tsx`
- Modify: `app/components/PolicyIndexPage.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `PolicyWithBrief`, `getPolicyById`, `policyMetrics`, and `allPolicies` from Task 1.
- Produces: visible policy judgement, opportunity level, customer/scenario tags, related-policy links, and aggregate opportunity/risk indicators.

- [ ] **Step 1: Write failing rendered-output assertions**

Append to `tests/rendered-html.test.mjs`:

```js
test("renders policy action intelligence and homepage judgement board", async () => {
  const homeHtml = await (await render("/")).text();
  const beijingHtml = await (await render("/beijing")).text();

  assert.match(homeHtml, /本期判断/);
  assert.match(homeHtml, /机会与风险看板/);
  assert.match(homeHtml, /高机会政策/);
  assert.match(homeHtml, /合规关注/);

  assert.match(beijingHtml, /业务研判/);
  assert.match(beijingHtml, /机会等级/);
  assert.match(beijingHtml, /可能涉及客户/);
  assert.match(beijingHtml, /应用场景/);
  assert.match(beijingHtml, /相关政策/);
  assert.match(beijingHtml, /北京市关于加快智能体引领发展的若干措施/);
  assert.match(beijingHtml, /支持人工智能OPC创新发展行动方案/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because the new homepage and card labels are not rendered.

- [ ] **Step 3: Render action intelligence in `PolicyCard`**

Add a judgement strip immediately below the card heading:

```tsx
<div className="judgement-strip">
  <span className={`opportunity opportunity-${policy.opportunityLevel}`}>
    机会等级 · {policy.opportunityLevel}
  </span>
  <p><strong>业务研判</strong>{policy.judgement}</p>
</div>
```

Add customer and scenario groups:

```tsx
<div className="intelligence-tags">
  <section>
    <h3>可能涉及客户</h3>
    <div>{policy.customerTypes.map((item) => <span key={item}>{item}</span>)}</div>
  </section>
  <section>
    <h3>应用场景</h3>
    <div>{policy.scenarios.map((item) => <span key={item}>{item}</span>)}</div>
  </section>
</div>
```

Resolve relationships with `getPolicyById` and render only existing relationships:

```tsx
const related = policy.relatedPolicies
  .map((relation) => ({ ...relation, policy: getPolicyById(relation.policyId) }))
  .filter((relation) => relation.policy);
```

```tsx
{related.length > 0 && <section className="related-policies">
  <h3>相关政策</h3>
  <div>{related.map((relation) => <a
    key={`${relation.type}-${relation.policyId}`}
    href={`#${relation.policyId}`}
  ><span>{relation.type}</span>{relation.policy?.title}</a>)}</div>
</section>}
```

Set `<article id={policy.id}>` and include `policy.analysisBasis` as a visible note.

- [ ] **Step 4: Add homepage judgement and opportunity/risk board**

Import `allPolicies` and `policyMetrics`. Select:

```ts
const priorityPolicies = allPolicies
  .filter((policy) => policy.opportunityLevel === "高")
  .slice(0, 3);

const compliancePolicies = allPolicies
  .filter((policy) => policy.judgement.includes("合规"))
  .slice(0, 3);
```

Render “本期判断” with four values from `policyMetrics`, and “机会与风险看板” with:

- high-opportunity policy title;
- first two customer types;
- recommended action;
- compliance policy title and judgement.

If either list is empty, render a factual empty-state sentence rather than invented content.

- [ ] **Step 5: Clarify fact and analysis language**

Update `PolicyIndexPage` guidance to state:

```text
发文机关、日期和政策状态来自官方原文核验；机会等级、客户类型和行动建议属于业务研判，具体资格与兑现条件以当期官方通知为准。
```

- [ ] **Step 6: Style the new sections**

Use existing tokens `--ink`, `--paper`, `--signal`, `--line`, and `--mist`. Add:

- `.judgement-strip`: two-column decision row with an ink top rule.
- `.opportunity-*`: text + border labels; high uses signal orange, medium uses dark green, observation uses muted plum.
- `.intelligence-tags`: two columns with wrapping tags.
- `.related-policies`: compact bottom relation bar.
- `.judgement-overview`: four-column homepage metric row.
- `.intelligence-board`: two-column opportunity/risk board.
- visible `:focus-visible` outlines for links.
- mobile rules changing all new grids to one column.
- `@media (prefers-reduced-motion: reduce)` protection if hover transitions are added.

- [ ] **Step 7: Run tests and verify GREEN**

Run: `npm test`

Expected: all data and rendered HTML tests pass.

- [ ] **Step 8: Run lint**

Run: `npm run lint`

Expected: exit 0 with no errors.

- [ ] **Step 9: Commit**

```bash
git add tests/rendered-html.test.mjs app/components/PolicyCard.tsx app/components/PolicyIndexPage.tsx app/page.tsx app/globals.css
git commit -m "Show policy opportunities customers and relationships"
```

---

### Task 3: Full verification and publish

**Files:**
- Modify only if verification reveals a defect in files changed by Tasks 1–2.
- Preserve: `.openai/hosting.json`

**Interfaces:**
- Consumes: validated source from Tasks 1–2.
- Produces: a new saved Sites version and successful deployment on the existing site URL.

- [ ] **Step 1: Verify the complete source tree**

Run:

```bash
git status --short
git diff --check HEAD~2..HEAD
npm test
npm run lint
```

Expected: clean working tree; no whitespace errors; all tests pass; lint exits 0.

- [ ] **Step 2: Package the exact validated source**

Use the Sites hosting package helper with the project directory and a temporary archive path. Confirm that the package includes the current `dist/` and existing `.openai/hosting.json`.

- [ ] **Step 3: Publish a new version to the existing Sites project**

Reuse the project ID from `.openai/hosting.json`. Push the exact current branch head, save one version against that commit SHA, deploy it with the existing access mode, and poll until the deployment state is `succeeded` or `failed`.

- [ ] **Step 4: Verify the deployed result**

Read back the deployment status and deployed URL. Count the publish as successful only if the deployment reports `succeeded`. Open the deployed URL in Codex after success.

- [ ] **Step 5: Report the user-visible result**

Return the existing site URL and summarize the four added capabilities:

- policy judgement and opportunity level;
- possible customer and scenario tags;
- related-policy relationships;
- homepage opportunity/risk board and lifecycle metrics.
