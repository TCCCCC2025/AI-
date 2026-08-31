# 全产线政策情报站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新建一个私有的全产线政策情报站，以 AI、大数据、安全、视联网、智能运维五条产线为入口，为领导提供可信政策研判，为客户经理提供按产线组织的机会和行动提示。

**Architecture:** 新站放在独立项目目录，使用静态、版本化的 TypeScript 数据作为唯一事实层；政策记录、申报事项、分析研判、客户行动手册和扫描网址索引分层建模。页面从同一套数据中派生首页总览、按产线的国家／市级／区级政策阅读、全产线分析、本周变化和有效申报入口；现有“北京 AI 政策情报”站不修改。

**Tech Stack:** Next.js 16、React 19、TypeScript 5.9、Vinext 静态构建、Node test runner、ESLint 9、ChatGPT Sites 私有发布。

## Global Constraints

- 新站目录固定为 `multi-product-policy-site/`，不得改动 `beijing-ai-policy-site/` 的运行代码、网址或内容。
- 五条产线固定为 `ai`、`data`、`security`、`vision-network`、`smart-operations`，前台中文名称依次为“AI”“大数据”“安全”“视联网”“智能运维”。
- 正式政策和正式申报事实只接受 `official` 或 `official_repost` 来源；新闻、公众号和行业媒体只可保存为 `lead`，不得进入正式统计、政策库或“有效申报入口”。
- 每条正式政策必须包含稳定 ID、正式名称、发文机关、层级、发布日期、状态、主产线、官方 URL、核验日期、政策概要、企业机会、合规与交付影响、行动提示。
- 一条政策可关联多条产线，但只能有一个 `primaryProductLine`；同一稳定 ID 不能在多条产线重复建档。
- 所有趋势文字必须显式拆分为“已核验事实”“业务研判”“下一信号”；业务研判不得写成政策承诺。
- 只有具有官方入口且状态为 `open` 的事项才能显示为“有效申报入口”；`preparing`、`closed` 和 `lead` 必须使用不同文案与状态样式。
- 每次更新保留变更类型 `新增`、`修订`、`申报开启`、`截止`、`移出` 或 `待核实` 以及依据和日期；无已核验变化时明确显示“本周无已核验重大变化”。
- 完整扫描网址集合只在后台数据 `source-index.ts` 中保存，不创建面向访客的来源库导航或页面。
- 新站先发布到私有 ChatGPT Sites。只有用户明确要求“发到 GitHub”后，才提交并推送公开 GitHub Pages。

---

## 文件结构

- Create: `multi-product-policy-site/` — 独立的 Vinext／ChatGPT Sites 项目根目录。
- Create: `multi-product-policy-site/app/lib/catalog-types.ts` — 政策、申报、研判、周变化、来源和客户手册的共享类型。
- Create: `multi-product-policy-site/app/lib/catalog-selectors.ts` — 可测试的数据查询、统计和状态派生函数。
- Create: `multi-product-policy-site/app/catalog/product-lines.ts` — 五条产线的口径、场景、合规关注和路由元数据。
- Create: `multi-product-policy-site/app/catalog/policy-records.ts` — 已核验政策的事实记录及四段式分析。
- Create: `multi-product-policy-site/app/catalog/opportunities.ts` — 已核验申报／采购／项目机会，及入口、条件、金额、期限和依据链。
- Create: `multi-product-policy-site/app/catalog/analysis.ts` — 证据链、趋势预警、客户分类与行动手册。
- Create: `multi-product-policy-site/app/catalog/weekly-changes.ts` — 跨产线的本周已核验变化。
- Create: `multi-product-policy-site/app/catalog/source-index.ts` — 后台扫描来源索引及核验状态，不建立路由。
- Create: `multi-product-policy-site/app/components/SiteNav.tsx` — 全站导航和移动端折行行为。
- Create: `multi-product-policy-site/app/components/PolicyCard.tsx` — 政策事实和行动信息卡片。
- Create: `multi-product-policy-site/app/components/OpportunityCard.tsx` — 申报机会、条件、金额、期限、入口和依据链卡片。
- Create: `multi-product-policy-site/app/components/ProductPolicyPage.tsx` — 单条产线的整体、国家、市级、区级、机会和客户分类组合页。
- Create: `multi-product-policy-site/app/components/InsightCard.tsx` — 已核验事实、业务研判、下一信号和预警卡片。
- Create: `multi-product-policy-site/app/components/ClientPlaybook.tsx` — 客户类型、关键提问、可切入政策和下一步动作。
- Create: `multi-product-policy-site/app/components/OverviewMetrics.tsx` — 首页五条产线统计和重点变化。
- Create: `multi-product-policy-site/app/layout.tsx`、`app/page.tsx`、`app/globals.css` — 站点元数据、首页和响应式视觉系统。
- Create: `multi-product-policy-site/app/analysis/page.tsx`、`app/weekly/page.tsx`、`app/opportunities/page.tsx` — 全产线研判、本周最新和申报机会页。
- Create: `multi-product-policy-site/app/ai/page.tsx`、`app/data/page.tsx`、`app/security/page.tsx`、`app/vision-network/page.tsx`、`app/smart-operations/page.tsx` — 五条产线入口。
- Create: `multi-product-policy-site/tests/catalog-data.test.mjs`、`tests/catalog-selectors.test.mjs`、`tests/rendered-html.test.mjs` — 数据契约、派生逻辑和页面渲染验收。
- Create: `multi-product-policy-site/docs/policy-scan/2026-08-09-initial-evidence.md` — 首批核验清单、接受／待核实理由和扫描范围。

### Task 1: 初始化独立站点和数据契约

**Files:**
- Create: `multi-product-policy-site/`（由 Sites 初始化器生成）
- Create: `multi-product-policy-site/tests/catalog-data.test.mjs`
- Create: `multi-product-policy-site/app/lib/catalog-types.ts`
- Modify: `multi-product-policy-site/package.json`

**Interfaces:**
- Consumes: 无；该任务为后续任务提供项目表面和事实数据契约。
- Produces: `ProductLineId`、`PolicyLevel`、`SourceGrade`、`PolicyRecord`、`OpportunityRecord`、`PolicyInsight`、`WeeklyChange`、`SourceIndexItem`、`ClientPlaybook` 类型；`npm run build`、`npm run lint` 与 `npm test` 命令。

- [ ] **Step 1: 在项目根目录初始化一次独立的 Sites 项目**

Run: `bash /Users/cc/.codex/plugins/cache/openai-bundled/sites/0.1.34/scripts/init-site.sh /Users/cc/.codex/.chatgpt-projects/g-p-6a5dce0a21388191a15aa1d9ac70aa5f/multi-product-policy-site`

Expected: `multi-product-policy-site/package.json`、`app/`、`.openai/hosting.json` 和锁文件均存在；保留初始化器选择的包管理器和 Vinext 配置。

- [ ] **Step 2: 写数据契约失败测试**

Create `tests/catalog-data.test.mjs` with:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { productLines } from "../app/catalog/product-lines.ts";
import { policyRecords } from "../app/catalog/policy-records.ts";
import { opportunities } from "../app/catalog/opportunities.ts";
import { sourceIndex } from "../app/catalog/source-index.ts";

test("五条产线均有独立定义和固定路由", () => {
  assert.deepEqual(productLines.map((item) => item.id), [
    "ai", "data", "security", "vision-network", "smart-operations",
  ]);
  assert.equal(new Set(productLines.map((item) => item.path)).size, 5);
  assert.ok(productLines.every((item) => item.summary.length >= 20));
});

test("正式政策具有完整可追溯字段且不重复建档", () => {
  assert.ok(policyRecords.length >= 10);
  assert.equal(new Set(policyRecords.map((item) => item.id)).size, policyRecords.length);
  for (const policy of policyRecords) {
    assert.ok(policy.title && policy.issuer && policy.publishedAt && policy.verifiedAt);
    assert.ok(policy.source.url.startsWith("https://"));
    assert.ok(["official", "official_repost"].includes(policy.source.grade));
    assert.ok(policy.summary.length >= 30);
    assert.ok(policy.businessOpportunity.length >= 20);
    assert.ok(policy.deliveryImpact.length >= 20);
    assert.ok(policy.action.length >= 15);
  }
  for (const line of productLines) {
    assert.ok(policyRecords.some((item) => item.productLines.includes(line.id)));
  }
});

test("机会记录不把线索或已截止事项伪装为有效入口", () => {
  const ids = new Set(policyRecords.map((item) => item.id));
  for (const item of opportunities) {
    assert.ok(item.basisPolicyIds.every((id) => ids.has(id)));
    assert.ok(item.status !== "open" || (item.applicationUrl && item.source.grade !== "lead"));
    assert.ok(item.status !== "open" || item.deadline !== "未公布");
  }
});

test("扫描网址在后台唯一管理并保留核验状态", () => {
  assert.equal(new Set(sourceIndex.map((item) => item.url)).size, sourceIndex.length);
  assert.ok(sourceIndex.every((item) => item.lastCheckedAt));
  assert.ok(sourceIndex.some((item) => item.status === "verified"));
});
```

- [ ] **Step 3: 运行数据测试，确认它因数据模块不存在而失败**

Run: `node --experimental-strip-types --test tests/catalog-data.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `app/catalog/product-lines.ts`.

- [ ] **Step 4: 创建共享类型**

Create `app/lib/catalog-types.ts` with:

```ts
export const productLineIds = ["ai", "data", "security", "vision-network", "smart-operations"] as const;
export type ProductLineId = (typeof productLineIds)[number];
export type PolicyLevel = "national" | "beijing" | "district";
export type PolicyStatus = "active" | "expired" | "ongoing" | "unknown";
export type SourceGrade = "official" | "official_repost" | "lead";
export type OpportunityStatus = "open" | "preparing" | "closed" | "lead";
export type ChangeType = "新增" | "修订" | "申报开启" | "截止" | "移出" | "待核实";

export type OfficialSource = { title: string; publisher: string; url: string; grade: SourceGrade };
export type ProductLine = { id: ProductLineId; name: string; path: string; summary: string; scope: string[]; customerFocus: string[]; complianceFocus: string[] };
export type PolicyRecord = {
  id: string; title: string; issuer: string; level: PolicyLevel; district?: string;
  publishedAt: string; status: PolicyStatus; primaryProductLine: ProductLineId;
  productLines: ProductLineId[]; tags: string[]; source: OfficialSource; verifiedAt: string;
  summary: string; businessOpportunity: string; deliveryImpact: string; action: string;
};
export type OpportunityRecord = {
  id: string; title: string; productLines: ProductLineId[]; region: string;
  status: OpportunityStatus; deadline: string; beneficiaries: string; supportDirection: string;
  amount: string; eligibility: string; applicationUrl?: string; source: OfficialSource;
  basisPolicyIds: string[]; verifiedAt: string; action: string;
};
export type PolicyInsight = { id: string; productLine: ProductLineId; title: string; confidence: "高" | "中" | "观察"; horizon: string; fact: string; judgement: string; nextSignal: string; basisPolicyIds: string[]; warning?: { trigger: string; action: string; leadTime: string } };
export type WeeklyChange = { id: string; date: string; type: ChangeType; productLines: ProductLineId[]; title: string; reason: string; relatedPolicyIds: string[]; source: OfficialSource };
export type SourceIndexItem = { url: string; title: string; publisher: string; productLines: ProductLineId[]; sourceKind: "official_policy" | "application_portal" | "official_repost" | "lead"; status: "verified" | "lead" | "unavailable"; firstSeenAt: string; lastCheckedAt: string; relatedPolicyIds: string[] };
export type ClientPlaybook = { id: string; productLine: ProductLineId; customerType: string; needs: string[]; policyEntryIds: string[]; discoveryQuestions: string[]; nextAction: string; deliverables: string[] };
```

- [ ] **Step 5: 让项目测试脚本覆盖数据、渲染和构建**

Set the `test` script in `package.json` to:

```json
"test": "npm run build && node --experimental-strip-types --test tests/*.test.mjs"
```

- [ ] **Step 6: 提交项目骨架与类型契约**

```bash
git add multi-product-policy-site
git commit -m "feat: scaffold multi-product policy intelligence site"
```

### Task 2: 建立五产线事实数据、来源索引和核验报告

**Files:**
- Create: `multi-product-policy-site/app/catalog/product-lines.ts`
- Create: `multi-product-policy-site/app/catalog/policy-records.ts`
- Create: `multi-product-policy-site/app/catalog/opportunities.ts`
- Create: `multi-product-policy-site/app/catalog/source-index.ts`
- Create: `multi-product-policy-site/docs/policy-scan/2026-08-09-initial-evidence.md`
- Modify: `multi-product-policy-site/tests/catalog-data.test.mjs`

**Interfaces:**
- Consumes: Task 1 的类型和数据测试。
- Produces: `productLines`、`policyRecords`、`opportunities` 和 `sourceIndex`；所有后续页面与选择器只读取这些命名导出。

- [ ] **Step 1: 写出首批官方核验报告**

Create `docs/policy-scan/2026-08-09-initial-evidence.md` with the following table headers and acceptance rule:

```md
# 首批全产线政策核验记录（2026-08-09）

| 产线 | 正式名称 | 层级 | 核验结论 | 官方来源 | 使用边界 |
| --- | --- | --- | --- | --- | --- |

仅“核验结论”为“接受”的记录可写入 `app/catalog/policy-records.ts` 或 `app/catalog/opportunities.ts`。公开征求意见、项目采购、媒体报道和入口失效均不得写成当前可申报补贴。
```

将以下已查到的官方文件先填入表中并逐页打开复核正式名称、机关、日期、有效性及适用范围：

| 产线 | 正式名称 | 层级 | 官方来源 |
| --- | --- | --- | --- |
| AI | 北京市发展和改革委员会等单位关于印发北京市加快智能体引领发展若干措施的通知 | 北京市级 | `https://www.beijing.gov.cn/zhengce/zcjd/202607/t20260723_4781151.html` |
| 大数据 | 可信数据空间发展行动计划（2024—2028年） | 国家 | `https://www.nda.gov.cn/sjj/zwgk/zcfb/1122/20241122164142182915964_pc.html` |
| 大数据 | 北京市公共数据资源授权运营管理办法 | 北京市级 | `https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260709_4754544.html` |
| 安全 | 网络数据安全管理条例 | 国家 | `https://gaj.beijing.gov.cn/wsgs/2024zcwj/zcfg/202410/t20241030_3931225.html` |
| 视联网 | 北京市促进“人工智能+视听”产业高质量发展行动方案（2025-2029年） | 北京市级 | `https://www.beijing.gov.cn/cs/gncs/zcwj/202603/t20260327_4568024.html` |
| 智能运维 | 北京市住房和城乡建设委员会关于征集北京市建筑节能智慧运维与数据资产推广应用项目案例的通知 | 北京市级 | `https://zjw.beijing.gov.cn/bjjs/jzlshfz/jzjn92/nhgl/tz59/744022523/index.shtml` |

- [ ] **Step 2: 写五条产线定义**

Create `app/catalog/product-lines.ts` with:

```ts
import type { ProductLine } from "../lib/catalog-types";

export const productLines: ProductLine[] = [
  { id: "ai", name: "AI", path: "/ai", summary: "覆盖大模型、智能体、算力、行业模型与人工智能应用场景。", scope: ["大模型", "智能体", "算力", "行业应用"], customerFocus: ["模型企业", "云与算力服务商", "行业客户"], complianceFocus: ["模型备案", "数据来源", "内容安全"] },
  { id: "data", name: "大数据", path: "/data", summary: "覆盖数据基础设施、数据要素、公共数据授权运营与可信数据空间。", scope: ["可信数据空间", "公共数据", "数据产品", "数据治理"], customerFocus: ["数据运营机构", "数据服务商", "行业客户"], complianceFocus: ["数据授权", "数据流通", "个人信息保护"] },
  { id: "security", name: "安全", path: "/security", summary: "覆盖网络安全、数据安全、密码应用和关键信息基础设施保护。", scope: ["网络安全", "数据安全", "密码应用", "安全服务"], customerFocus: ["安全厂商", "政企客户", "系统集成商"], complianceFocus: ["等保", "数据安全", "安全运营"] },
  { id: "vision-network", name: "视联网", path: "/vision-network", summary: "覆盖视频专网、视听平台、视频汇聚治理、视频 AI 与行业视频应用。", scope: ["视频汇聚", "视听平台", "视频 AI", "城市治理"], customerFocus: ["政务与园区客户", "视频平台", "网络集成商"], complianceFocus: ["内容安全", "版权", "数据合规"] },
  { id: "smart-operations", name: "智能运维", path: "/smart-operations", summary: "覆盖 IT 运维平台、云网集成、信创集成、机房与设备运维服务。", scope: ["AIOps", "云网集成", "信创集成", "机房运维"], customerFocus: ["云网集成商", "信创厂商", "政企 IT 运维客户"], complianceFocus: ["运维安全", "服务级别", "验收留痕"] },
];
```

- [ ] **Step 3: 写出最小正式政策集与交叉关联**

Create `app/catalog/policy-records.ts` using `PolicyRecord[]`. Add at least ten accepted records, with at least one accepted official record for every product line; use the six Task 2 Step 1 documents plus additional verified official records from the existing AI／大数据专题站 or a new official-source review. For each record:

```ts
{
  id: "bj-agent-measures-2026",
  title: "北京市发展和改革委员会等单位关于印发北京市加快智能体引领发展若干措施的通知",
  issuer: "北京市发展和改革委员会等单位",
  level: "beijing",
  publishedAt: "2026-07-21",
  status: "active",
  primaryProductLine: "ai",
  productLines: ["ai", "data", "security"],
  tags: ["智能体", "场景", "安全"],
  source: { title: "北京市关于加快智能体引领发展的若干措施政策解读", publisher: "北京市发展和改革委员会", url: "https://www.beijing.gov.cn/zhengce/zcjd/202607/t20260723_4781151.html", grade: "official" },
  verifiedAt: "2026-08-09",
  summary: "只写经原文核验的支持方向、适用边界或实施要求。",
  businessOpportunity: "把政策所指的具体业务方向翻译为可服务客户和可交付能力。",
  deliveryImpact: "说明需要核验的合规、技术、资质、验收或运营边界。",
  action: "给出一条可在客户沟通或材料准备中立即执行的动作。",
}
```

在最终数据中把示例后三段中文替换为对应文件的具体、可追溯内容；不得保留“只写”“翻译为”这类模板句。对 `视联网` 使用“人工智能+视听”与超高清视听等官方文件时，将口径表述为“视听／视频应用和平台政策”，不把它夸大为覆盖全部视频专网项目。

- [ ] **Step 4: 写申报机会与状态规则**

Create `app/catalog/opportunities.ts` with:

```ts
import type { OpportunityRecord } from "../lib/catalog-types";

export const opportunities: OpportunityRecord[] = [
  // Only records whose official entry, deadline and status were rechecked on 2026-08-09 belong here.
];
```

For every `open` record, populate all of `applicationUrl`, `deadline`, `amount`, `eligibility`, `supportDirection`, `source`, `basisPolicyIds`, `verifiedAt`, and `action`. Use `preparing` when the management measure exists but no open official call can be verified. Use `closed` when the original entry has a passed deadline. Use `lead` only in `source-index.ts`, not in this array.

- [ ] **Step 5: 建立后台扫描网址索引**

Create `app/catalog/source-index.ts` with `sourceIndex: SourceIndexItem[]`. Add every URL opened in Step 1 and the official central／municipal／district portals used to look for each product line. Mark a policy source `verified`, a retrievable non-policy lead `lead`, and a dead or inaccessible URL `unavailable`; do not export this data from any page component.

- [ ] **Step 6: 让数据契约测试通过**

Run: `node --experimental-strip-types --test tests/catalog-data.test.mjs`

Expected: PASS with all five product-line, policy, opportunity and source-index assertions green.

- [ ] **Step 7: 提交可核验事实层**

```bash
git add multi-product-policy-site/app/catalog multi-product-policy-site/docs/policy-scan multi-product-policy-site/tests/catalog-data.test.mjs
git commit -m "feat: add verified multi-product policy catalog"
```

### Task 3: 实现选择器、统计和本周变化的数据派生

**Files:**
- Create: `multi-product-policy-site/app/lib/catalog-selectors.ts`
- Create: `multi-product-policy-site/app/catalog/weekly-changes.ts`
- Create: `multi-product-policy-site/tests/catalog-selectors.test.mjs`

**Interfaces:**
- Consumes: `PolicyRecord`、`OpportunityRecord`、`WeeklyChange` 与 Task 2 的数据常量。
- Produces: `policiesForLine`、`policiesByLevel`、`openOpportunitiesForLine`、`metricsForLine`、`siteMetrics`、`weeklyChangesForLines`，供所有页面调用。

- [ ] **Step 1: 写派生逻辑失败测试**

Create `tests/catalog-selectors.test.mjs` with:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { policyRecords } from "../app/catalog/policy-records.ts";
import { opportunities } from "../app/catalog/opportunities.ts";
import { weeklyChanges } from "../app/catalog/weekly-changes.ts";
import { metricsForLine, openOpportunitiesForLine, policiesByLevel, policiesForLine, siteMetrics, weeklyChangesForLines } from "../app/lib/catalog-selectors.ts";

test("产线查询包含主归属和关联归属但不重复", () => {
  const result = policiesForLine(policyRecords, "data");
  assert.ok(result.length > 0);
  assert.equal(new Set(result.map((item) => item.id)).size, result.length);
  assert.ok(result.every((item) => item.productLines.includes("data")));
});

test("层级查询只返回目标层级", () => {
  const groups = policiesByLevel(policyRecords, "security");
  assert.ok(groups.national.every((item) => item.level === "national"));
  assert.ok(groups.beijing.every((item) => item.level === "beijing"));
  assert.ok(groups.district.every((item) => item.level === "district"));
});

test("有效申报入口仅显示已核验开放记录", () => {
  const open = openOpportunitiesForLine(opportunities, "vision-network");
  assert.ok(open.every((item) => item.status === "open"));
  assert.ok(open.every((item) => item.applicationUrl && item.deadline !== "未公布"));
});

test("首页统计和周变化均可追溯", () => {
  const metrics = siteMetrics(policyRecords, opportunities);
  assert.equal(metrics.totalPolicies, policyRecords.length);
  assert.equal(metrics.openOpportunities, opportunities.filter((item) => item.status === "open").length);
  assert.ok(metricsForLine(policyRecords, opportunities, "ai").policyCount > 0);
  const changes = weeklyChangesForLines(weeklyChanges, ["ai", "data"]);
  assert.ok(changes.every((item) => item.productLines.some((line) => ["ai", "data"].includes(line))));
});
```

- [ ] **Step 2: 运行测试，确认它因选择器不存在而失败**

Run: `node --experimental-strip-types --test tests/catalog-selectors.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `app/lib/catalog-selectors.ts`.

- [ ] **Step 3: 实现纯数据选择器**

Create `app/lib/catalog-selectors.ts` with:

```ts
import type { OpportunityRecord, PolicyLevel, PolicyRecord, ProductLineId, WeeklyChange } from "./catalog-types";

export const policiesForLine = (records: PolicyRecord[], line: ProductLineId) => records.filter((item) => item.productLines.includes(line));
export type PolicyGroups = Record<PolicyLevel, PolicyRecord[]>;
export const policiesByLevel = (records: PolicyRecord[], line: ProductLineId) => (["national", "beijing", "district"] as const).reduce<PolicyGroups>((groups, level) => {
  groups[level] = policiesForLine(records, line).filter((item) => item.level === level);
  return groups;
}, { national: [], beijing: [], district: [] });
export const openOpportunitiesForLine = (records: OpportunityRecord[], line: ProductLineId) => records.filter((item) => item.status === "open" && item.productLines.includes(line));
export const metricsForLine = (policies: PolicyRecord[], opportunities: OpportunityRecord[], line: ProductLineId) => ({ policyCount: policiesForLine(policies, line).length, openOpportunities: openOpportunitiesForLine(opportunities, line).length, activePolicies: policiesForLine(policies, line).filter((item) => item.status === "active").length });
export const siteMetrics = (policies: PolicyRecord[], opportunities: OpportunityRecord[]) => ({ totalPolicies: policies.length, openOpportunities: opportunities.filter((item) => item.status === "open").length, activePolicies: policies.filter((item) => item.status === "active").length });
export const weeklyChangesForLines = (changes: WeeklyChange[], lines: ProductLineId[]) => changes.filter((item) => item.productLines.some((line) => lines.includes(line)));
```

- [ ] **Step 4: 写跨产线周变化记录**

Create `app/catalog/weekly-changes.ts` with `weeklyChanges: WeeklyChange[]`. Each item must link every `relatedPolicyIds` entry to an existing accepted policy, include its official source, and use one of the six `ChangeType` values. If the latest verified scan has no accepted changes, export:

```ts
export const weeklyHeadline = "本周无已核验重大变化";
```

Otherwise export a factual headline that identifies the real change without extrapolation.

- [ ] **Step 5: 运行选择器与数据契约测试**

Run: `node --experimental-strip-types --test tests/catalog-data.test.mjs tests/catalog-selectors.test.mjs`

Expected: PASS.

- [ ] **Step 6: 提交派生逻辑**

```bash
git add multi-product-policy-site/app/lib multi-product-policy-site/app/catalog/weekly-changes.ts multi-product-policy-site/tests/catalog-selectors.test.mjs
git commit -m "feat: derive product-line policy metrics and changes"
```

### Task 4: 建设数据驱动的五产线页面和行动卡片

**Files:**
- Create: `multi-product-policy-site/app/components/SiteNav.tsx`
- Create: `multi-product-policy-site/app/components/PolicyCard.tsx`
- Create: `multi-product-policy-site/app/components/OpportunityCard.tsx`
- Create: `multi-product-policy-site/app/components/ProductPolicyPage.tsx`
- Create: `multi-product-policy-site/app/ai/page.tsx`
- Create: `multi-product-policy-site/app/data/page.tsx`
- Create: `multi-product-policy-site/app/security/page.tsx`
- Create: `multi-product-policy-site/app/vision-network/page.tsx`
- Create: `multi-product-policy-site/app/smart-operations/page.tsx`

**Interfaces:**
- Consumes: Task 2 数据、Task 3 选择器、`ProductLine`。
- Produces: 五个静态路由，每个路由均显示整体态势、国家／市级／区级、申报机会与客户行动内容。

- [ ] **Step 1: 写五条路由的渲染失败测试**

Create `tests/rendered-html.test.mjs` with:

```js
import assert from "node:assert/strict";
import test from "node:test";
async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("五条产线均有独立静态页面", async () => {
  for (const path of ["/ai", "/data", "/security", "/vision-network", "/smart-operations"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.ok((await response.text()).length > 0);
  }
});

test("产线页面使用统一的政策层级和行动组件", async () => {
  const ai = await (await render("/ai")).text();
  assert.match(ai, /国家政策/);
  assert.match(ai, /北京市级政策/);
  assert.match(ai, /区级政策/);
  assert.match(ai, /客户分类与行动提示/);
});
```

- [ ] **Step 2: 运行页面测试，确认在路由建立前失败**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: FAIL because the five static route artifacts do not exist.

- [ ] **Step 3: 实现可复用政策和机会卡片**

Create `app/components/PolicyCard.tsx` with the four fixed sections:

```tsx
export function PolicyCard({ policy }: { policy: PolicyRecord }) {
  return <article className="policy-card">
    <p className="eyebrow">{policy.level === "national" ? "国家政策" : policy.level === "beijing" ? "北京市级" : `${policy.district ?? "北京"}区级`}</p>
    <h3>{policy.title}</h3>
    <p className="meta">{policy.issuer} · {policy.publishedAt} · 核验于 {policy.verifiedAt}</p>
    <dl><div><dt>政策概要</dt><dd>{policy.summary}</dd></div><div><dt>企业机会</dt><dd>{policy.businessOpportunity}</dd></div><div><dt>合规与交付影响</dt><dd>{policy.deliveryImpact}</dd></div><div><dt>行动提示</dt><dd>{policy.action}</dd></div></dl>
    <a href={policy.source.url} target="_blank" rel="noreferrer">查看官方依据 ↗</a>
  </article>;
}
```

Create `OpportunityCard.tsx` so `open` has a visually prominent `有效申报入口` badge and `打开申报入口 ↗` button; all other statuses render their truthful status and do not render that button.

- [ ] **Step 4: 实现产线页组合组件**

Create `app/components/ProductPolicyPage.tsx` using this public interface:

```tsx
export function ProductPolicyPage({ productLine }: { productLine: ProductLine }) {
  // Use policiesByLevel(policyRecords, productLine.id), metricsForLine(...),
  // openOpportunitiesForLine(...), PolicyCard, OpportunityCard and ClientPlaybook.
}
```

Render the reading order exactly as: product definition and three metrics; “重点判断”；“有效申报入口”；“国家政策”；“北京市级政策”；“区级政策”；“客户分类与行动提示”。 Empty level groups must say “当前分类暂无已核验正式记录，继续扫描中。” rather than inventing a record.

- [ ] **Step 5: 生成五个薄路由文件**

Use one route file pattern per page. For `app/security/page.tsx`:

```tsx
import { ProductPolicyPage } from "../components/ProductPolicyPage";
import { productLines } from "../data/product-lines";
export default function SecurityPage() { return <ProductPolicyPage productLine={productLines.find((item) => item.id === "security")!} />; }
```

Use exact ID substitutions for the remaining four pages.

- [ ] **Step 6: 运行页面、数据和选择器测试**

Run: `npm run build && node --experimental-strip-types --test tests/catalog-data.test.mjs tests/catalog-selectors.test.mjs tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 7: 提交五产线体验**

```bash
git add multi-product-policy-site/app multi-product-policy-site/tests/rendered-html.test.mjs
git commit -m "feat: add product-line policy pages"
```

### Task 5: 建设首页、全产线研判、本周最新、机会页与客户分类

**Files:**
- Create: `multi-product-policy-site/app/catalog/analysis.ts`
- Create: `multi-product-policy-site/app/components/InsightCard.tsx`
- Create: `multi-product-policy-site/app/components/ClientPlaybook.tsx`
- Create: `multi-product-policy-site/app/components/OverviewMetrics.tsx`
- Create: `multi-product-policy-site/app/analysis/page.tsx`
- Create: `multi-product-policy-site/app/weekly/page.tsx`
- Create: `multi-product-policy-site/app/opportunities/page.tsx`
- Modify: `multi-product-policy-site/app/page.tsx`
- Modify: `multi-product-policy-site/tests/catalog-data.test.mjs`
- Modify: `multi-product-policy-site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: Task 2-4 的事实数据、选择器和路由。
- Produces: 首页、研判、本周最新和机会路由；每项分析均可链接到既有政策 ID，客户分类可从任一产线页进入。

- [ ] **Step 1: 扩展数据测试以约束分析和客户分类**

Add the following import alongside the existing top-level imports in `tests/catalog-data.test.mjs`, then append the test:

```js
import { insights, clientPlaybooks } from "../app/catalog/analysis.ts";

test("研判严格链接到已核验政策，客户手册覆盖五条产线", () => {
  const ids = new Set(policyRecords.map((item) => item.id));
  assert.ok(insights.length >= 5);
  assert.ok(insights.every((item) => item.basisPolicyIds.every((id) => ids.has(id))));
  assert.ok(insights.every((item) => item.fact.length >= 20 && item.judgement.length >= 20 && item.nextSignal.length >= 12));
  assert.deepEqual(new Set(clientPlaybooks.map((item) => item.productLine)), new Set(["ai", "data", "security", "vision-network", "smart-operations"]));
});
```

- [ ] **Step 2: 运行测试，确认分析数据不存在时失败**

Run: `node --experimental-strip-types --test tests/catalog-data.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `app/catalog/analysis.ts`.

- [ ] **Step 3: 实现研判和客户手册数据**

Create `app/catalog/analysis.ts`:

```ts
import type { ClientPlaybook, PolicyInsight } from "../lib/catalog-types";

export const insights: PolicyInsight[] = [];
export const clientPlaybooks: ClientPlaybook[] = [];
```

Replace both empty arrays with at least one `PolicyInsight` and one `ClientPlaybook` per product line. An insight must use: a narrowly worded official `fact`; a clearly labelled sales／delivery `judgement`; an observable `nextSignal`; and existing `basisPolicyIds`. A playbook must contain at least two `discoveryQuestions`, an actionable `nextAction`, one or more `policyEntryIds`, and at least one named `deliverables` item.

- [ ] **Step 4: 实现研判和客户手册组件**

Create `InsightCard.tsx` to render labelled blocks in this exact order: `已核验事实`、`业务研判`、`下一信号`、`前置预警`（only when provided）。 Create `ClientPlaybook.tsx` to render: customer type, common needs, policy entry links, discovery questions, expected deliverables, and next action.

- [ ] **Step 5: 实现四个跨产线页面**

Implement these content contracts:

```tsx
// app/page.tsx
// Five product-line metrics, the current weekly headline, three highest-priority insights,
// and links to /analysis, /weekly, /opportunities, then each product line.

// app/analysis/page.tsx
// Group insights by productLine and use InsightCard. No source-registry link.

// app/weekly/page.tsx
// Render weeklyHeadline. If weeklyChanges is empty, render only the exact headline
// “本周无已核验重大变化”; otherwise render type, date, product line, reason and official source.

// app/opportunities/page.tsx
// Render open items first under “有效申报入口”; then preparing and closed sections with their status labels.
// Never place lead-only records on this route.
```

- [ ] **Step 6: 更新渲染验收**

Append to `tests/rendered-html.test.mjs`:

```js
test("跨产线页突出事实、行动与有效入口", async () => {
  for (const path of ["/analysis", "/weekly", "/opportunities"]) assert.equal((await render(path)).status, 200);
  assert.match(await (await render("/analysis")).text(), /已核验事实/);
  assert.match(await (await render("/analysis")).text(), /业务研判/);
  assert.match(await (await render("/opportunities")).text(), /有效申报入口/);
});
```

- [ ] **Step 7: 运行完整自动化验证并提交**

Run: `npm test && npm run lint`

Expected: PASS.

```bash
git add multi-product-policy-site/app multi-product-policy-site/tests
git commit -m "feat: add cross-product analysis and opportunity views"
```

### Task 6: 建立清晰、紧凑、可访问的视觉系统与站点元数据

**Files:**
- Modify: `multi-product-policy-site/app/layout.tsx`
- Modify: `multi-product-policy-site/app/globals.css`
- Modify: `multi-product-policy-site/app/components/SiteNav.tsx`
- Create: `multi-product-policy-site/public/og.png`
- Modify: `multi-product-policy-site/tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: 完整的产品文案、路由和组件。
- Produces: 一个适合领导与客户经理阅读的响应式站点，带站点专属的 Open Graph 社交预览图。

- [ ] **Step 1: 写可访问性和导航失败检查**

Append to `tests/rendered-html.test.mjs`:

```js
test("全站页面提供主导航与描述元信息", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /首页总览/);
  assert.match(home, /全产线政策分析/);
  assert.match(home, /补贴与申报机会/);
  assert.match(home, /智能运维/);
});
```

- [ ] **Step 2: 运行检查，确认导航尚未满足时失败**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: FAIL until `SiteNav` and layout are wired into all pages.

- [ ] **Step 3: 实现导航、排版和重点层级**

Implement `SiteNav.tsx` with these links in order: `首页总览`、`全产线政策分析`、`本周最新`、`补贴与申报机会`、`AI`、`大数据`、`安全`、`视联网`、`智能运维`.

In `globals.css`, use a single centered content container (`max-width: 1180px`), a two-column card grid only above `960px`, and a single column below it. Limit page hero headings to `clamp(2rem, 5vw, 4.5rem)`; policy card titles to `clamp(1.25rem, 2vw, 1.75rem)`; put metrics, active opportunity badges and action buttons before supporting text. Use `:focus-visible` outlines, 44px minimum touch targets for navigation and buttons, and retain a high-contrast dark text / off-white ground / coral action accent palette.

- [ ] **Step 4: 生成并验证一张社交预览图**

After the site headline, palette and product-line labels are final, make exactly one image-generation request for a 1200×630 landscape social card. Prompt it to show the actual five labels “AI / 大数据 / 安全 / 视联网 / 智能运维”, the headline “北京全产线政策情报”, a restrained off-white / deep teal / coral policy-dashboard treatment, and no invented statistics. Inspect it for misspelled or missing Chinese; if it is unusable, retry once only. Save the usable result as `public/og.png`; if neither result is usable, omit `og:image` rather than using a starter image.

- [ ] **Step 5: 更新站点元数据**

Set the title to `北京全产线政策情报` and description to `面向 AI、大数据、安全、视联网与智能运维的已核验北京政策、机会与行动研判。` in `app/layout.tsx`. Use the request host to derive the absolute Open Graph URL if `public/og.png` passed Step 4 validation.

- [ ] **Step 6: 运行完整自动化验证并提交**

Run: `npm test && npm run lint`

Expected: PASS.

```bash
git add multi-product-policy-site/app multi-product-policy-site/public/og.png multi-product-policy-site/tests
git commit -m "style: polish multi-product policy intelligence site"
```

### Task 7: 私有发布、回读核验与交接

**Files:**
- Modify: `multi-product-policy-site/.openai/hosting.json`
- Modify: `multi-product-policy-site/README.md`

**Interfaces:**
- Consumes: Task 1-6 的通过构建、完整静态产物和 Sites 项目配置。
- Produces: 一个新的私有 ChatGPT Sites URL，以及明确的发布状态和版本证据；不产生 GitHub 推送。

- [ ] **Step 1: 运行发布前验证**

Run: `npm test && npm run lint && git diff --check`

Expected: all commands pass and `git status --short` is empty after Task 6 commit.

- [ ] **Step 2: 创建一次新的 Sites 项目并保存项目 ID**

Use the Sites connector `create_site` with the site name `北京全产线政策情报` and the requested private-first access posture. Persist only the returned `project_id` in `.openai/hosting.json`; do not store credentials in source files or Git remotes.

- [ ] **Step 3: 保存准确的已验证源码版本**

Run:

```bash
git add multi-product-policy-site/.openai/hosting.json multi-product-policy-site/README.md
git commit -m "chore: configure private multi-product policy hosting"
```

Create a short `README.md` section named `发布顺序` stating: “先私有 Sites 确认；未经明确确认不发布 GitHub Pages。”

- [ ] **Step 4: 打包、保存版本并私有部署**

Use the Sites packaging helper for `multi-product-policy-site`, save exactly one version from the Task 7 Step 3 commit SHA, then deploy that version through `deploy_private_site_version`.

- [ ] **Step 5: 回读部署状态并只在成功后打开新 URL**

Poll `get_deployment_status` until it reports `succeeded` or a terminal failure. When it reports `succeeded`, open the exact returned private URL once. When it reports failure, do not present the URL as ready; preserve the validated source and report the user-visible cause.

- [ ] **Step 6: 交付发布结果和外部操作账本**

Report the private URL, five条产线入口、正式政策数量、有效申报数量、待核实数量和本周变化数量。附上：

```text
- 执行身份：当前用户授权的 ChatGPT Sites 站点发布身份
- 操作摘要：创建私有全产线政策情报站并部署已核验版本
- 计划数：1
- 尝试数：1
- 已核实数：以 get_deployment_status 回读的成功数量为准
- 成功数：以回读结果为准
- 跳过数：0
- 冲突数：0
- 失败数：以回读结果为准
- 结果证据：部署状态与返回的网址
- 安全重试数：0（仅在连接器明确提示短暂故障时重试一次）
```

Explain that a request being accepted counts only as an attempt; only a matching readback of the deployed object counts as verified success. Ask for explicit confirmation before any GitHub push or public release.
