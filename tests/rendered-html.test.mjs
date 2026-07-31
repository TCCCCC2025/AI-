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

test("renders the Beijing AI policy intelligence homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>北京 AI 政策情报/);
  assert.match(html, /2026-07-30/);
  assert.match(html, /经官方核验/);
  assert.match(html, /申报窗口雷达/);
  assert.match(html, /政策全景/);
  assert.match(html, /项政策基线/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("renders the overview, weekly, and policy-category routes", async () => {
  const homeHtml = await (await render("/")).text();
  const weeklyHtml = await (await render("/weekly")).text();
  const nationalHtml = await (await render("/national")).text();
  const beijingHtml = await (await render("/beijing")).text();
  const districtsHtml = await (await render("/districts")).text();

  assert.match(homeHtml, /政策全景/);
  assert.match(homeHtml, /本周最新/);
  assert.match(weeklyHtml, /本周最新政策/);
  assert.match(weeklyHtml, /新增/);
  assert.match(weeklyHtml, /北京市关于加快智能体引领发展的若干措施/);
  assert.match(nationalHtml, /国家部委（20 项）/);
  assert.match(nationalHtml, /企业机会/);
  assert.doesNotMatch(nationalHtml, /北京市级（12 项）/);
  assert.match(beijingHtml, /合规与业务影响/);
  assert.match(districtsHtml, /行动提示/);
});

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
