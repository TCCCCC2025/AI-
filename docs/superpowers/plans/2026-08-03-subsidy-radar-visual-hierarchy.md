# 补贴申报雷达视觉层级 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将补贴申报雷达重排为“状态总览 → 有效申报入口 → 等待批次 → 政策库/区域扫描”的行动优先页面。

**Architecture:** 保留现有静态政策数据和路由，只调整补贴雷达组件的语义结构与全局 CSS。每个申报卡片直接从 `SubsidyPolicy` 渲染状态、金额、时间、条件和官方入口，不引入新的客户端状态或依赖。

**Tech Stack:** Next/Vinext、React、TypeScript、现有 CSS、Node test runner。

## Global Constraints

- 保留现有米白、深墨绿和珊瑚色设计体系。
- 桌面端有效申报政策采用两列，720px 以下采用单列。
- 页面不重新展示“政策依据链”“趋势与预警”“客户准备度”三个分析模块。
- 官方政策入口仍可追溯，来源数据不改为公开来源库页面。
- 完成后运行 `npm run build`、`npm run lint` 和全部 `tests/*.test.mjs`。

---

### Task 1: 固化行动优先页面断言

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `/subsidies` server-rendered HTML and existing Chinese policy copy.
- Produces: assertions that constrain the new card order and action labels.

- [ ] **Step 1: Add failing assertions**

Extend the subsidy rendering test with these checks:

```js
assert.match(subsidiesHtml, /有效申报入口/);
assert.match(subsidiesHtml, /打开申报入口/);
assert.match(subsidiesHtml, /服务合同实际发生额最高 25%/);
assert.doesNotMatch(subsidiesHtml, /政策依据链/);
assert.doesNotMatch(subsidiesHtml, /趋势与预警/);
assert.doesNotMatch(subsidiesHtml, /客户准备度/);
```

- [ ] **Step 2: Run the targeted test and verify the new action assertion fails**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: the existing page assertions pass except `/打开申报入口/` because the card does not yet expose that action label.

- [ ] **Step 3: Commit the test-only checkpoint**

```bash
git add tests/rendered-html.test.mjs
git commit -m "test: define subsidy radar action hierarchy"
```

### Task 2: Reorder subsidy card content for scanning

**Files:**
- Modify: `app/components/SubsidyRadarPage.tsx`
- Modify: `app/components/SubsidyCard.tsx`

**Interfaces:**
- Consumes: `SubsidyPolicy.status`, `region`, `mechanism`, `amount`, `applicationWindow`, `conditions`, `action`, and official source links.
- Produces: visible `.subsidy-action-strip` and `.subsidy-entry-link` elements with stable Chinese labels.

- [ ] **Step 1: Add the action strip and direct entry label to `WindowCard`**

Render the status/region row first, then title, then:

```tsx
<div className="subsidy-action-strip">
  <div><span>支持强度</span><strong>{policy.amount}</strong></div>
  <div><span>申报时间</span><strong>{policy.applicationWindow}</strong></div>
</div>
<p className="subsidy-window-action">{policy.action}</p>
```

Add `<a className="subsidy-entry-link" href={policy.applicationUrl}>打开申报入口 ↗</a>` only when `applicationUrl` is present, preserving the existing fallback when the policy is not an open application.

- [ ] **Step 2: Apply the same information order to each full `SubsidyCard`**

Keep the existing details disclosure and official source list, but put amount, application window, and action before the long analysis sections. Keep the policy title link and remove any public-facing internal ID block if it is still present.

- [ ] **Step 3: Run the targeted rendering test**

Run: `npm run build && node --experimental-strip-types --test tests/rendered-html.test.mjs`

Expected: all rendered route tests pass, including the new action label assertions.

- [ ] **Step 4: Commit the component changes**

```bash
git add app/components/SubsidyRadarPage.tsx app/components/SubsidyCard.tsx tests/rendered-html.test.mjs
git commit -m "feat: prioritize subsidy application actions"
```

### Task 3: Tighten layout, hierarchy, and responsive behavior

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the semantic classes emitted by `SubsidyRadarPage` and `SubsidyCard`.
- Produces: compact metric spacing, aligned effective-entry heading, emphasized action strip, and mobile-safe single-column cards.

- [ ] **Step 1: Reduce the effective-entry header footprint**

Set `.subsidy-effective-window` to a compact section with a two-column heading grid and set its heading to `clamp(34px, 4vw, 48px)`, not the previous 64px maximum. Keep the explanatory copy aligned in the right grid cell on desktop and full width on mobile.

- [ ] **Step 2: Style the action information strip**

Add a two-column `.subsidy-action-strip` with a top and bottom rule, large numeric/value text, and a smaller uppercase-style label. Use the signal color only for amount and deadline emphasis; let long values wrap.

- [ ] **Step 3: Make the direct entry action visually explicit**

Style `.subsidy-entry-link` as an inline-flex or block action with signal background, paper text, visible focus ring, and a minimum 44px touch target. Do not use hover-only meaning.

- [ ] **Step 4: Verify responsive selectors**

At `max-width: 720px`, collapse the action strip to one column, keep cards single-column, reduce section padding, and preserve keyboard focus outlines.

- [ ] **Step 5: Run lint and all tests**

Run: `npm run lint && npm test`

Expected: lint exits 0, build completes, all rendered HTML and source registry tests pass.

- [ ] **Step 6: Commit the visual hierarchy changes**

```bash
git add app/globals.css
git commit -m "style: improve subsidy radar scan hierarchy"
```

### Task 4: Publish the validated private site

**Files:**
- No source changes; use the existing `.openai/hosting.json` project.

**Interfaces:**
- Consumes: the exact validated `main` commit and packaged site archive.
- Produces: a saved version and successful private production deployment at the existing site URL.

- [ ] **Step 1: Push the exact source commit to the Sites source branch**

Use a short-lived repository credential as a per-command HTTP header and push `main`; do not push the GitHub `origin` remote.

- [ ] **Step 2: Package and save one Sites version**

Run the Sites `package-site.sh` helper, then save the version with the full `git rev-parse HEAD` SHA and archive path.

- [ ] **Step 3: Deploy privately and poll to success**

Verify the current access policy remains owner-only, deploy the saved version with `sites_deploy_private_site_version`, and poll `sites_get_deployment_status` until it reports `succeeded`.
