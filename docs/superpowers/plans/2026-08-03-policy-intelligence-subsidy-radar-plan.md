# 补贴申报雷达精准分析升级实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 ChatGPT Sites 主线把补贴申报雷达升级为带政策依据链、趋势预警、客户准备度和可检索来源库的精准政策情报入口。

**Architecture:** 以静态、版本化 TypeScript 数据作为唯一事实源；正式政策、业务研判、区域扫描和来源库分别建模。`/subsidies` 负责补贴事实与分析，`/sources` 负责所有扫描网址的目录，页面组件只负责展示和轻量筛选，不引入数据库或外部运行时抓取。

**Tech Stack:** Next.js 16 / React 19 / TypeScript 5.9 / vinext 静态构建 / Node test runner / ESLint 9。

## Global Constraints

- 第一版只把现有已核验政策作为事实层；新闻、公众号和其他非正式渠道只能进入线索来源。
- 趋势、预警和客户建议必须明确标注为基于事实的业务研判，不能写成政策承诺。
- 只有 `official` 或 `official_repost` 来源可以进入正式政策统计；`lead_only` 不得计入。
- 区域扫描必须区分“已核验政策、已扫描未检出正式记录、存在待核验线索、待持续扫描”。
- 本轮先发布到 ChatGPT Sites；未经用户明确说“同步 GitHub”，不得推送 `origin/github-pages`。
- 不新增登录、在线申报、数据库写入或自动抓取依赖；来源库使用版本化静态数据。

---

## 文件结构

- Create: `app/subsidy-data.ts` — 经过核验的补贴政策记录、状态、区域覆盖和衍生统计。
- Create: `app/subsidy-intelligence-data.ts` — 依据链、事实/研判、预警和客户准备度数据及类型。
- Create: `app/source-registry-data.ts` — 所有可复用扫描网址及核验元数据。
- Create: `app/components/SubsidyCard.tsx` — 单项补贴事实卡片和依据链展示。
- Create: `app/components/SubsidyRadarPage.tsx` — `/subsidies` 页面组合和分析模块。
- Create: `app/components/SourceRegistryPage.tsx` — `/sources` 页面和客户端筛选。
- Create: `app/subsidies/page.tsx` — 补贴雷达路由。
- Create: `app/sources/page.tsx` — 来源库路由。
- Modify: `app/components/SiteNav.tsx` — 增加补贴雷达、来源库入口。
- Modify: `app/page.tsx` — 首页增加补贴雷达和来源库入口及事实统计。
- Modify: `app/layout.tsx` — 更新描述以包含补贴与来源库。
- Modify: `app/globals.css` — 补贴、依据链、预警、checklist、来源库表格和移动端样式。
- Create: `tests/subsidy-intelligence-data.test.mjs` — 事实/研判/预警/区域/来源库数据契约测试。
- Create: `tests/source-registry.test.mjs` — 来源库去重、等级、关联政策和状态测试。
- Modify: `tests/rendered-html.test.mjs` — 路由和关键文案静态 HTML 验收。

---

### Task 1: 建立数据契约的失败测试

**Files:**
- Create: `tests/subsidy-intelligence-data.test.mjs`
- Create: `tests/source-registry.test.mjs`

**Interfaces:**
- Consumes: 尚未存在的 `subsidyPolicies`, `subsidyMetrics`, `policyIntelligence`, `coverageRecords`, `sourceRegistry`。
- Produces: 明确实现边界的失败测试，供 Task 2 实现。

- [ ] **Step 1: 写正式政策和分析层失败测试**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  subsidyPolicies,
  subsidyMetrics,
  coverageRecords,
} from "../app/subsidy-data.ts";
import {
  policyIntelligence,
  readinessPlaybooks,
} from "../app/subsidy-intelligence-data.ts";

test("正式补贴记录具有可追溯事实字段", () => {
  assert.ok(subsidyPolicies.length >= 6);
  for (const policy of subsidyPolicies) {
    assert.ok(policy.id && policy.title && policy.region);
    assert.ok(policy.supportDirections.length >= 1);
    assert.ok(policy.mechanism && policy.beneficiaries.length >= 1);
    assert.ok(policy.sources.length >= 1);
    assert.ok(policy.sources.every((source) => ["official", "official_repost"].includes(source.sourceGrade)));
    assert.ok(policy.verifiedAt);
  }
  assert.equal(subsidyMetrics.current, subsidyPolicies.filter((item) => item.status === "current").length);
});

test("事实和研判分离且关联政策存在", () => {
  const ids = new Set(subsidyPolicies.map((item) => item.id));
  assert.ok(policyIntelligence.length >= 3);
  for (const item of policyIntelligence) {
    assert.ok(item.fact.length >= 20);
    assert.ok(item.judgement.length >= 20);
    assert.ok(item.nextSignal.length >= 10);
    assert.ok(["高", "中", "观察"].includes(item.confidence));
    assert.ok(item.relatedPolicyIds.every((id) => ids.has(id)));
  }
  assert.ok(readinessPlaybooks.length >= 4);
});

test("区域覆盖状态不会把未检出区域当成正式政策", () => {
  assert.equal(coverageRecords.length, 18);
  assert.ok(coverageRecords.some((item) => item.scanStatus === "verified_records"));
  assert.ok(coverageRecords.some((item) => item.scanStatus === "scanned_no_official"));
  assert.ok(coverageRecords.some((item) => item.scanStatus === "lead_pending_verification"));
  assert.ok(coverageRecords.some((item) => item.scanStatus === "not_scanned"));
  assert.equal(subsidyMetrics.verifiedRegions, coverageRecords.filter((item) => item.scanStatus === "verified_records").length);
});
```

- [ ] **Step 2: 写来源库失败测试**

```js
import { sourceRegistry } from "../app/source-registry-data.ts";

test("来源库网址唯一且正式来源与线索来源分级", () => {
  assert.ok(sourceRegistry.length >= 20);
  assert.equal(new Set(sourceRegistry.map((item) => item.url)).size, sourceRegistry.length);
  for (const item of sourceRegistry) {
    assert.ok(item.url.startsWith("http"));
    assert.ok(item.title && item.publisher && item.firstSeen && item.lastVerified);
    assert.ok(["official_policy", "application_portal", "official_repost", "platform_update", "lead"].includes(item.sourceType));
    assert.ok(["verified", "lead", "not_found", "unavailable"].includes(item.verificationStatus));
    if (item.sourceType === "lead") assert.equal(item.verificationStatus, "lead");
  }
});
```

- [ ] **Step 3: 运行失败测试**

Run: `node --experimental-strip-types --test tests/subsidy-intelligence-data.test.mjs tests/source-registry.test.mjs`

Expected: FAIL because the new data modules do not exist yet.

- [ ] **Step 4: Commit测试契约**

```bash
git add tests/subsidy-intelligence-data.test.mjs tests/source-registry.test.mjs
git commit -m "test: define subsidy intelligence and source registry contracts"
```

### Task 2: 实现事实、研判和来源库数据层

**Files:**
- Create: `app/subsidy-data.ts`
- Create: `app/subsidy-intelligence-data.ts`
- Create: `app/source-registry-data.ts`

**Interfaces:**
- Consumes: Task 1 的测试契约，以及 `github-pages` 现有已核验补贴种子记录和已确认官方来源。
- Produces: 页面使用的 `SubsidyPolicy`, `PolicyIntelligence`, `ReadinessPlaybook`, `CoverageRecord`, `SourceRegistryItem` 类型和常量。

- [ ] **Step 1: 实现补贴数据类型和已核验种子记录**

实现以下精确类型和导出：

```ts
export type SubsidyStatus = "current" | "effective_waiting_round" | "closed" | "lead_pending";
export type SourceGrade = "official" | "official_repost" | "lead_only";
export type SubsidyPolicy = {
  id: string;
  title: string;
  region: string;
  supportDirections: string[];
  mechanism: string;
  beneficiaries: string[];
  status: SubsidyStatus;
  applicationWindow: string;
  amount: string;
  eligibility: string;
  applicationUrl?: string;
  basisPolicyIds: string[];
  sources: Array<{ title: string; url: string; publisher: string; sourceGrade: SourceGrade }>;
  verifiedAt: string;
  summary: string;
  businessImpact: string;
  complianceImpact: string;
  action: string;
};
export const subsidyPolicies: SubsidyPolicy[];
export const subsidyMetrics: { total: number; current: number; waiting: number; closed: number; pending: number; verifiedRegions: number; scannedRegions: number };
export const coverageRecords: CoverageRecord[];
```

使用已核验市级、海淀、丰台、通州和经开区记录；其余区域必须使用明确的扫描状态，不得伪造政策记录或金额。

- [ ] **Step 2: 实现依据链、趋势预警和客户准备度数据**

导出以下类型：

```ts
export type PolicyIntelligence = {
  id: string;
  title: string;
  fact: string;
  judgement: string;
  nextSignal: string;
  confidence: "高" | "中" | "观察";
  horizon: "近期" | "1—3 个月" | "中期";
  relatedPolicyIds: string[];
  basis: Array<{ stage: string; title: string; publisher: string; date: string; url?: string; sourceGrade: SourceGrade }>;
  warning?: { trigger: string; likelyAction: string; leadTime: string; recommendedAction: string };
};
export type ReadinessPlaybook = { customerType: string; items: Array<{ label: string; evidence: string; owner: string; state: "已具备" | "待补齐" | "不适用" }>; now: string; nextSignal: string; contact: string };
export const policyIntelligence: PolicyIntelligence[];
export const readinessPlaybooks: ReadinessPlaybook[];
```

所有趋势文字写成“已核验事实 / 业务研判 / 下一信号”，并为 Token、算力、数据集/场景、OPC/智能体和即时兑换分别提供可执行动作。

- [ ] **Step 3: 实现来源库和区域枚举**

实现以下数据结构：

```ts
export type SourceType = "official_policy" | "application_portal" | "official_repost" | "platform_update" | "lead";
export type VerificationStatus = "verified" | "lead" | "not_found" | "unavailable";
export type SourceRegistryItem = { url: string; title: string; publisher: string; sourceType: SourceType; level: string; region: string; firstSeen: string; lastVerified: string; verificationStatus: VerificationStatus; relatedPolicyIds: string[]; notes: string; nextReview: string };
export const sourceRegistry: SourceRegistryItem[];
```

把现有政策来源、申报入口、官方转载和扫描过的线索网址登记进去；同一 URL 只保留一条，关联多个政策时使用数组。

- [ ] **Step 4: 运行数据测试并提交**

Run: `node --experimental-strip-types --test tests/subsidy-intelligence-data.test.mjs tests/source-registry.test.mjs`

Expected: PASS.

```bash
git add app/subsidy-data.ts app/subsidy-intelligence-data.ts app/source-registry-data.ts
git commit -m "feat: add subsidy intelligence and source registry data"
```

### Task 3: 构建补贴雷达和来源库页面组件

**Files:**
- Create: `app/components/SubsidyCard.tsx`
- Create: `app/components/SubsidyRadarPage.tsx`
- Create: `app/components/SourceRegistryPage.tsx`
- Create: `app/subsidies/page.tsx`
- Create: `app/sources/page.tsx`

**Interfaces:**
- Consumes: Task 2 的数据导出。
- Produces: `/subsidies` 和 `/sources` 两个静态可访问路由；`SourceRegistryPage` 提供关键词、区域、来源类型、核验结果筛选。

- [ ] **Step 1: 先增加路由 HTML 失败测试**

在 `tests/rendered-html.test.mjs` 增加：

```js
test("renders subsidy intelligence and source registry routes", async () => {
  const subsidiesHtml = await (await render("/subsidies")).text();
  const sourcesHtml = await (await render("/sources")).text();

  assert.match(subsidiesHtml, /补贴申报雷达/);
  assert.match(subsidiesHtml, /政策依据链/);
  assert.match(subsidiesHtml, /趋势与预警/);
  assert.match(subsidiesHtml, /客户准备度/);
  assert.match(subsidiesHtml, /已扫描未检出正式记录/);
  assert.match(sourcesHtml, /政策来源库/);
  assert.match(sourcesHtml, /待核验线索/);
  assert.match(sourcesHtml, /官方政策/);
});
```

- [ ] **Step 2: 运行失败测试**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: FAIL because `/subsidies` and `/sources` routes do not exist.

- [ ] **Step 3: 实现补贴卡片和组合页面**

`SubsidyCard` 展示标题、区域、状态、支持方向、机制、金额/窗口、资格、入口、合规边界、行动提示和来源链接；`SubsidyRadarPage` 按“总览 → 当前窗口 → 依据链 → 趋势预警 → 客户准备度 → 区域扫描”顺序渲染。状态标签使用中文枚举：当前可申报、政策有效但等批次、已截止、线索待核验。

- [ ] **Step 4: 实现来源库页面和客户端筛选**

`SourceRegistryPage` 使用 `"use client"` 和 `useState`，维护 `query`, `region`, `sourceType`, `verificationStatus` 四个筛选值；过滤条件同时匹配标题、发布机构、网址、备注和关联政策 ID。筛选结果为空时显示“没有符合条件的来源记录”，不隐藏来源的正式/线索标签。

- [ ] **Step 5: 运行路由测试并提交**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: PASS for the new route assertions and all existing assertions.

```bash
git add app/components/SubsidyCard.tsx app/components/SubsidyRadarPage.tsx app/components/SourceRegistryPage.tsx app/subsidies/page.tsx app/sources/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: add subsidy intelligence and source registry pages"
```

### Task 4: 接入导航、首页和响应式样式

**Files:**
- Modify: `app/components/SiteNav.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Task 3 的 `/subsidies` 和 `/sources` 路由。
- Produces: 首页能够看见补贴窗口统计和来源库入口；所有站点页面可以通过统一导航进入；移动端无横向溢出。

- [ ] **Step 1: 增加导航和首页入口失败断言**

在 `tests/rendered-html.test.mjs` 增加：

```js
test("homepage links to subsidy radar and source registry", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /补贴申报雷达/);
  assert.match(html, /政策来源库/);
  assert.match(html, /当前可申报/);
});
```

- [ ] **Step 2: 运行失败测试**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: FAIL until navigation and homepage copy are updated.

- [ ] **Step 3: 接入导航、首页指标和元信息**

在 `SiteNav` 增加 `/subsidies` 与 `/sources`；首页用 `subsidyMetrics` 展示当前窗口、等待批次和已扫描区域；增加“进入补贴申报雷达”和“打开政策来源库”入口。`layout.tsx` description 改为同时覆盖政策、补贴和来源库。

- [ ] **Step 4: 增加样式并做静态移动端规则**

为 `.subsidy-*`, `.basis-chain`, `.trend-card`, `.warning-card`, `.readiness-*`, `.coverage-*`, `.source-registry-*` 增加桌面网格和 `max-width: 720px` 单列规则；链接使用现有 focus-visible 规范；来源库 URL 使用断行规则，避免移动端横向滚动。

- [ ] **Step 5: 运行完整测试并提交**

Run: `npm run lint && npm test`

Expected: ESLint passes, build succeeds, all Node tests pass.

```bash
git add app/components/SiteNav.tsx app/page.tsx app/layout.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "feat: expose subsidy radar and policy source registry"
```

### Task 5: Sites 发布前验收

**Files:**
- Modify: `.openai/hosting.json` only if the existing project ID is missing (expected: no change)
- No GitHub files or `origin` branch changes.

**Interfaces:**
- Consumes: Task 4 完成且本地 `npm run lint`、`npm test` 均通过的 `main` 分支。
- Produces: ChatGPT Sites 的新版本；发布后可回读首页、`/subsidies`、`/sources`。

- [ ] **Step 1: 运行发布前检查**

Run: `git status --short --branch && npm run lint && npm test`

Expected: 工作区干净，main 仅比 `sites/main` 多出本次待发布提交；lint 和全部测试通过。

- [ ] **Step 2: 提交并发布 Sites 版本**

使用 `sites-hosting` 的既有 project ID 和来源写凭证，提交精确校验过的 `main` 源码，打包并保存版本，再部署为原有私有 Site。不得调用 `git push origin`。

- [ ] **Step 3: 回读发布结果**

确认部署状态为 succeeded 后，回读以下路径：`/`, `/subsidies`, `/sources`。检查页面包含“政策依据链”“趋势与预警”“客户准备度”“政策来源库”，并确认来源库至少显示一条正式来源和一条待核验线索。

- [ ] **Step 4: 向用户报告并等待 GitHub 确认**

报告 Sites 链接、已新增模块、测试结果和来源库覆盖情况；明确说明 GitHub 仍保持上一版本，只有用户明确说“同步 GitHub”后才执行同步。

## 计划自检

- 设计中的事实/研判分离：Task 2 数据契约和 Task 3 展示覆盖。
- 设计中的依据链、机制、状态、趋势、预警、客户清单：Task 2 数据和 Task 3 页面覆盖。
- 设计中的区域四态：Task 1 测试与 Task 2 `coverageRecords` 覆盖。
- 设计中的来源库集合与复用：Task 1/2 数据、Task 3 `/sources`、Task 4 导航、Task 5 发布验收覆盖。
- 设计中的 GitHub 延后同步：全局约束和 Task 5 明确禁止 `origin` 推送。
- 无 `TBD`、`TODO`、占位步骤；所有测试步骤给出具体命令和预期结果。
