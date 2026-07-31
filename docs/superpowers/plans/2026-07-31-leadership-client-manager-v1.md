# Leadership and Client Manager Views Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add decision-ready leadership and client-manager views derived from the existing 36-policy library.

**Architecture:** Create `app/audience-data.ts` as a focused interpretation layer over `app/policy-data.ts`. It owns leadership signals, management actions, seven explicit client playbooks, policy matching, and internal links. Two server-rendered routes consume that layer; the existing navigation and homepage expose the new role-based entry points.

**Tech Stack:** TypeScript 5.9, React 19, Vinext/Next-compatible routes, Node test runner, CSS.

## Global Constraints

- Use only the current 36-policy library; do not invent company products, customer names, internal cases, or sales commitments.
- Show `2026-07-30` as the policy data cutoff.
- Label leadership conclusions and client conversation content as `基于公开政策的业务研判`.
- Preserve all existing routes and policy-library behavior.
- Add `/leadership` and `/client-manager`.
- The client-manager page must contain exactly seven first-version customer categories.
- Pending-verification policies may appear only with a visible `待核实` marker.
- Do not add client state, search, filters, forms, authentication, subscriptions, or a CMS.

---

## File Map

- `app/audience-data.ts`: leadership signals, management actions, client playbook configuration, policy resolution, topic counts, and policy links.
- `app/leadership/page.tsx`: leadership briefing.
- `app/client-manager/page.tsx`: seven customer meeting-preparation cards.
- `app/components/SiteNav.tsx`: role-based navigation entries.
- `app/page.tsx`: two role entry cards.
- `app/globals.css`: decision memo and client card-book presentation.
- `tests/audience-data.test.mjs`: data invariants and policy-reference validity.
- `tests/rendered-html.test.mjs`: route, navigation, and visible-content requirements.

---

### Task 1: Audience intelligence data layer

**Files:**
- Create: `tests/audience-data.test.mjs`
- Create: `app/audience-data.ts`

**Interfaces:**
- Consumes: `allPolicies`, `policyGroups`, `PolicyWithBrief` from `app/policy-data.ts`.
- Produces: `leadershipSignals`, `managementActions`, `leadershipPriorityPolicies`, `leadershipRiskPolicies`, `themeMetrics`, `clientPlaybooks`, and `policyHref(policyId)`.

- [ ] **Step 1: Write the failing audience-data tests**

Create `tests/audience-data.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  clientPlaybooks,
  leadershipPriorityPolicies,
  leadershipRiskPolicies,
  leadershipSignals,
  managementActions,
  policyHref,
  themeMetrics,
} from "../app/audience-data.ts";
import { allPolicies } from "../app/policy-data.ts";

const policyIds = new Set(allPolicies.map((policy) => policy.id));

test("leadership briefing is derived from valid policy records", () => {
  assert.equal(leadershipSignals.length, 3);
  assert.equal(managementActions.length, 3);
  assert.ok(leadershipPriorityPolicies.length >= 3);
  assert.ok(leadershipPriorityPolicies.length <= 5);
  assert.ok(leadershipRiskPolicies.length >= 2);
  assert.deepEqual(Object.keys(themeMetrics), ["AI", "大模型", "算力", "数据"]);

  for (const signal of leadershipSignals) {
    assert.ok(signal.policyIds.length >= 1);
    assert.ok(signal.policyIds.every((id) => policyIds.has(id)));
    assert.ok(signal.managementMeaning.length >= 12);
  }
});

test("seven client playbooks contain actionable and traceable content", () => {
  assert.equal(clientPlaybooks.length, 7);
  assert.equal(new Set(clientPlaybooks.map((item) => item.id)).size, 7);

  for (const playbook of clientPlaybooks) {
    assert.ok(playbook.policies.length >= 2);
    assert.equal(playbook.discoveryQuestions.length, 2);
    assert.ok(playbook.possibleNeeds.length >= 2);
    assert.ok(playbook.conversationStarter.length >= 15);
    assert.ok(playbook.nextStep.length >= 10);
    assert.ok(playbook.policies.every((policy) => policyIds.has(policy.id)));
    assert.ok(!playbook.conversationStarter.includes("我司"));
  }
});

test("policy links point to the correct category route", () => {
  assert.equal(policyHref("bj-agent-measures"), "/beijing#bj-agent-measures");
  assert.equal(policyHref("nat-ai-manufacturing"), "/national#nat-ai-manufacturing");
  assert.equal(policyHref("dist-etown-ai-city"), "/districts#dist-etown-ai-city");
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because `app/audience-data.ts` does not exist.

- [ ] **Step 3: Define audience data interfaces**

Create `app/audience-data.ts` with:

```ts
import { allPolicies, policyGroups, type PolicyWithBrief } from "./policy-data";

export type LeadershipSignal = {
  title: string;
  signal: string;
  managementMeaning: string;
  policyIds: string[];
};

type ClientPlaybookConfig = {
  id: string;
  label: string;
  policyIds: string[];
  possibleNeeds: string[];
  conversationStarter: string;
  discoveryQuestions: [string, string];
  nextStep: string;
};

export type ClientPlaybook = Omit<ClientPlaybookConfig, "policyIds"> & {
  policies: PolicyWithBrief[];
};
```

- [ ] **Step 4: Implement policy resolution and links**

```ts
const policyMap = new Map(allPolicies.map((policy) => [policy.id, policy]));

function resolvePolicies(ids: string[]): PolicyWithBrief[] {
  return ids.map((id) => {
    const policy = policyMap.get(id);
    if (!policy) throw new Error(`Unknown audience policy reference: ${id}`);
    return policy;
  });
}

export function policyHref(policyId: string): string {
  const group = policyGroups.find((item) =>
    item.policies.some((policy) => policy.id === policyId),
  );
  if (!group) throw new Error(`Unknown policy link: ${policyId}`);
  return `/${group.id}#${policyId}`;
}
```

- [ ] **Step 5: Implement leadership content**

Use these three signals:

```ts
export const leadershipSignals: LeadershipSignal[] = [
  {
    title: "智能体成为北京 AI 政策主线",
    signal: "北京市政策已从基础模型能力进一步延伸到智能体应用、Token、算力、场景和安全治理。",
    managementMeaning: "应把智能体从单一产品方向提升为场景、算力、数据和治理协同推进的专项。",
    policyIds: ["bj-agent-measures", "bj-ai-opc", "nat-agent-development"],
  },
  {
    title: "行业数据集与公共数据进入落地阶段",
    signal: "国家和北京同步推动高质量数据集、公共数据授权运营及数据产权机制。",
    managementMeaning: "可围绕行业客户的数据治理、数据集建设、授权运营和可信流通形成机会清单。",
    policyIds: ["nat-industry-datasets", "bj-public-data-operation", "bj-industrial-dataset-demand-202603"],
  },
  {
    title: "政策机会与合规要求同步增强",
    signal: "算力、场景和资金支持持续推进，同时备案、伦理审查和拟人化服务治理要求更加具体。",
    managementMeaning: "业务推进需要把申报核验、模型备案、伦理和内容安全纳入同一项目检查表。",
    policyIds: ["bj-high-tech-fund-202601", "nat-ai-ethics-review", "nat-anthropomorphic-ai"],
  },
];
```

Add:

```ts
export const managementActions = [
  "建立智能体与行业场景专项跟踪，明确重点客户、场景和政策窗口。",
  "围绕算力、高质量数据集和公共数据运营形成可持续更新的机会清单。",
  "对备案、伦理、安全和滚动申报事项设置月度复核机制。",
];

export const leadershipPriorityPolicies = allPolicies
  .filter((policy) => policy.opportunityLevel === "高")
  .slice(0, 5);

export const leadershipRiskPolicies = allPolicies
  .filter((policy) =>
    policy.judgement.includes("合规") ||
    policy.validity === "待核实" ||
    policy.validity === "滚动事项"
  )
  .slice(0, 5);

export const themeMetrics = Object.fromEntries(
  ["AI", "大模型", "算力", "数据"].map((theme) => [
    theme,
    allPolicies.filter((policy) => policy.themes.split(" / ").includes(theme)).length,
  ]),
) as Record<"AI" | "大模型" | "算力" | "数据", number>;
```

- [ ] **Step 6: Implement the seven explicit client playbooks**

Use these configurations:

1. `enterprise` / `央国企及大型企业数字化部门`
   - policies: `nat-2026-soe-ai-scenarios`, `nat-ai-manufacturing`, `bj-ai-industrial-internet`, `bj-public-data-operation`
   - needs: `高价值 AI 场景规划`, `行业数据集与数据治理`, `企业智能体及安全治理`
   - starter: `近期政策正在推动央企高价值 AI 场景和行业数据集建设，可以结合现有数字化基础判断哪些场景最适合先形成示范。`
   - questions: `目前最希望通过 AI 改造的业务环节是什么？`, `现有数据是否已经具备统一标准、授权和质量管理机制？`

2. `model-agent` / `大模型与智能体企业`
   - policies: `bj-agent-measures`, `nat-agent-development`, `nat-genai-filing-20260506`, `nat-anthropomorphic-ai`
   - needs: `智能体产品与标杆场景`, `备案和安全治理`, `Token、算力及生态合作`
   - starter: `北京正在把智能体应用、Token、算力和安全治理放在同一政策框架下，可以一起梳理产品目前最需要补强的环节。`
   - questions: `当前产品处于模型、智能体平台还是行业应用阶段？`, `备案、内容安全和用户保护目前由哪个团队负责？`

3. `opc` / `AI 创业公司与 OPC`
   - policies: `bj-ai-opc`, `dist-haidian-opc`, `dist-etown-ai-city`, `bj-high-tech-fund-202601`
   - needs: `社区与园区入驻`, `算力和 Token 支持`, `场景、融资与申报`
   - starter: `北京和重点区正在形成 OPC 社区、算力、Token 和场景支持组合，可以先判断企业适合哪种属地和支持路径。`
   - questions: `企业当前最缺的是算力、场景、客户还是融资资源？`, `注册地和主要研发办公地是否有调整空间？`

4. `compute` / `云、算力、芯片与数据中心企业`
   - policies: `nat-inclusive-compute-sme`, `nat-compute-interconnection`, `nat-internet-infrastructure`, `bj-agent-measures`
   - needs: `普惠算力产品`, `算力互联与调度`, `智能体和中小企业算力场景`
   - starter: `国家正在推进普惠算力和算力互联，北京智能体政策也提出算力保障，可以讨论现有资源如何形成更可用的场景化服务。`
   - questions: `当前算力资源主要面向训练、推理还是通用云服务？`, `是否已有面向中小企业或智能体客户的标准化产品？`

5. `data` / `数据服务、数据运营与安全治理机构`
   - policies: `bj-public-data-operation`, `nat-data-property-registration`, `nat-industry-datasets`, `bj-satellite-data`
   - needs: `公共数据授权运营`, `数据产权与产品化`, `高质量数据集和可信流通`
   - starter: `公共数据授权运营、数据产权和高质量数据集政策正在形成组合，可以从现有数据资产和行业场景判断合作切入口。`
   - questions: `目前最具产品化价值的数据资源来自哪些行业或场景？`, `数据授权、质量、安全和收益分配机制是否已经建立？`

6. `manufacturing` / `制造业及行业客户`
   - policies: `nat-ai-manufacturing`, `bj-ai-industrial-internet`, `bj-industrial-dataset-demand-202603`, `nat-industry-datasets`
   - needs: `工业高质量数据集`, `工业智能体`, `软件智能化和场景改造`
   - starter: `国家和北京都在推动 AI+制造、工业智能体和高质量数据集，可以从生产、质检、设备和供应链场景中选择一个可验证的切口。`
   - questions: `哪个生产或运营环节的效率问题最突出？`, `该场景所需数据能否持续获取并形成统一质量标准？`

7. `park-research` / `园区、科研机构和高校`
   - policies: `bj-industry-education-2026`, `dist-changping-ai-plus`, `dist-etown-ai-city`, `nat-ai-ethics-review`
   - needs: `产教融合和成果转化`, `区域 AI 生态与企业集聚`, `科研项目伦理和场景开放`
   - starter: `北京各区正在通过产教融合、园区生态和场景开放推动 AI 落地，可以结合现有科研和企业资源设计可持续的合作机制。`
   - questions: `当前最希望引入哪类 AI 企业或科研成果？`, `园区是否已有可开放的数据、算力或行业场景？`

All seven use:

```ts
nextStep: "核对关联政策原文，确认客户现状与属地条件，再形成场景或申报跟踪清单。"
```

Map configurations to `ClientPlaybook` with `resolvePolicies`.

- [ ] **Step 7: Run tests and verify GREEN**

Run: `npm test`

Expected: all audience-data and existing tests pass.

- [ ] **Step 8: Commit**

```bash
git add app/audience-data.ts tests/audience-data.test.mjs
git commit -m "Add leadership and client policy intelligence data"
```

---

### Task 2: Leadership and client-manager routes

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Create: `app/leadership/page.tsx`
- Create: `app/client-manager/page.tsx`
- Modify: `app/components/SiteNav.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: all exports from `app/audience-data.ts`.
- Produces: `/leadership`, `/client-manager`, navigation links, and homepage role entry cards.

- [ ] **Step 1: Write failing rendered-route tests**

Append:

```js
test("renders leadership and client-manager policy views", async () => {
  const homeHtml = await (await render("/")).text();
  const leadershipHtml = await (await render("/leadership")).text();
  const clientHtml = await (await render("/client-manager")).text();

  assert.match(homeHtml, /领导看政策/);
  assert.match(homeHtml, /客户经理找机会/);

  assert.match(leadershipHtml, /领导摘要/);
  assert.match(leadershipHtml, /重点机会/);
  assert.match(leadershipHtml, /风险与核验/);
  assert.match(leadershipHtml, /管理层建议/);
  assert.match(leadershipHtml, /政策结构/);
  assert.match(leadershipHtml, /基于公开政策的业务研判/);

  assert.match(clientHtml, /客户经理找机会/);
  assert.match(clientHtml, /会前准备卡/);
  assert.match(clientHtml, /央国企及大型企业数字化部门/);
  assert.match(clientHtml, /AI 创业公司与 OPC/);
  assert.match(clientHtml, /制造业及行业客户/);
  assert.match(clientHtml, /建议提问/);
  assert.match(clientHtml, /下一步动作/);
  assert.match(clientHtml, /基于公开政策的业务研判/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL because both new routes return no requested content.

- [ ] **Step 3: Build `/leadership`**

Render:

- page hero with cutoff date and `基于公开政策的业务研判`;
- three numbered leadership signals with policy links;
- up to five priority opportunity cards;
- risk and verification list with visible validity labels;
- three management actions;
- three level counts from `policyGroups` and four theme counts from `themeMetrics`.

Use `policyHref` for every internal policy link and `SiteNav` for navigation.

- [ ] **Step 4: Build `/client-manager`**

Render each `clientPlaybook` as a meeting-preparation card:

- customer type index and label;
- policy signals with status and internal links;
- possible needs;
- conversation starter;
- two discovery questions;
- next step;
- `基于公开政策的业务研判` note.

If a matched policy has `validity === "待核实"`, render `待核实` next to it.

- [ ] **Step 5: Add navigation and homepage role entries**

In `SiteNav`, insert after homepage:

```ts
{ href: "/leadership", label: "领导看政策" },
{ href: "/client-manager", label: "客户经理找机会" },
```

In `app/page.tsx`, add two role cards after the policy overview:

- Leadership: `3 条核心判断、重点机会、风险和管理建议`
- Client manager: `按 7 类客户准备政策话题、需求问题和下一步动作`

- [ ] **Step 6: Add focused responsive styles**

Add CSS for:

- `.role-entry-grid` and `.role-entry-card`;
- `.leadership-page`, `.leadership-summary`, `.signal-card`, `.decision-grid`;
- `.client-manager-page`, `.client-playbook-list`, `.client-playbook-card`;
- `.client-index` as the left-side customer type index strip;
- `.policy-signal-list`, `.question-list`, and `.analysis-disclaimer`;
- one-column mobile layout and visible focus outlines.

Reuse existing color tokens and typography. Do not add animation.

- [ ] **Step 7: Run tests and lint**

Run:

```bash
npm test
npm run lint
```

Expected: all tests pass; lint exits 0.

- [ ] **Step 8: Commit**

```bash
git add tests/rendered-html.test.mjs app/leadership/page.tsx app/client-manager/page.tsx app/components/SiteNav.tsx app/page.tsx app/globals.css
git commit -m "Add leadership and client manager policy views"
```

---

### Task 3: Integrate, verify, and publish

**Files:**
- Preserve: `.openai/hosting.json`
- Modify only if full verification finds a defect in Task 1 or Task 2 files.

**Interfaces:**
- Consumes: tested feature branch.
- Produces: merged `main`, saved Sites version, and successful production deployment.

- [ ] **Step 1: Run full branch verification**

Run:

```bash
npm test
npm run lint
git diff --check main...HEAD
git status --short --branch
```

Expected: all tests pass, lint exits 0, no whitespace errors, clean feature branch.

- [ ] **Step 2: Merge the feature branch locally**

Use the finishing-branch workflow to merge into `main`, rerun `npm test` and `npm run lint` on the merged result, then remove only the owned feature worktree and merged feature branch.

- [ ] **Step 3: Publish exact source state**

Use the current `.openai/hosting.json` project ID. Push the exact `main` HEAD, package the matching build, save one version using that commit SHA, and deploy with the existing private access mode.

- [ ] **Step 4: Verify the deployment**

Poll the deployment until `succeeded` or `failed`. Count success only when the deployment reports `succeeded` and the saved version readback contains the same commit SHA.

- [ ] **Step 5: Report the result**

Return the existing site URL and summarize:

- leadership briefing;
- seven customer playbooks;
- policy-linked conversation preparation;
- explicit public-policy interpretation disclaimer.
