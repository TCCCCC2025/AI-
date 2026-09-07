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
  assert.match(html, /2026-09-07/);
  assert.match(html, /第\s*(?:<!-- -->)?37(?:<!-- -->)?\s*周/);
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
  assert.match(weeklyHtml, /截止/);
  assert.match(weeklyHtml, /AI\+”方向“揭榜挂帅/);
  assert.match(nationalHtml, /国家部委（21 项）/);
  assert.match(nationalHtml, /企业机会/);
  assert.doesNotMatch(nationalHtml, /北京市级（14 项）/);
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

  assert.match(homeHtml, /政策分析/);
  assert.match(homeHtml, /客户分类/);

  assert.match(leadershipHtml, /政策分析/);
  assert.match(leadershipHtml, /领导摘要/);
  assert.match(leadershipHtml, /重点机会/);
  assert.match(leadershipHtml, /风险与核验/);
  assert.match(leadershipHtml, /管理层建议/);
  assert.match(leadershipHtml, /政策结构/);
  assert.match(leadershipHtml, /基于公开政策的业务研判/);

  assert.match(clientHtml, /客户分类/);
  assert.match(clientHtml, /会前准备卡/);
  assert.match(clientHtml, /央国企及大型企业数字化部门/);
  assert.match(clientHtml, /AI 创业公司与 OPC/);
  assert.match(clientHtml, /制造业及行业客户/);
  assert.match(clientHtml, /建议提问/);
  assert.match(clientHtml, /下一步动作/);
  assert.match(clientHtml, /基于公开政策的业务研判/);
});

test("renders subsidy entry routes and keeps intelligence in policy analysis", async () => {
  const subsidiesHtml = await (await render("/subsidies")).text();
  const leadershipHtml = await (await render("/leadership")).text();

  assert.match(subsidiesHtml, /补贴申报雷达/);
  assert.match(subsidiesHtml, /有效申报入口/);
  assert.match(subsidiesHtml, /打开申报入口/);
  assert.match(subsidiesHtml, /服务合同实际发生额最高 25%/);
  assert.doesNotMatch(subsidiesHtml, /政策依据链/);
  assert.doesNotMatch(subsidiesHtml, /趋势与预警/);
  assert.doesNotMatch(subsidiesHtml, /客户准备度/);
  assert.match(subsidiesHtml, /已扫描未检出正式记录/);
  assert.match(leadershipHtml, /政策依据链/);
  assert.match(leadershipHtml, /趋势与预警/);
  assert.match(leadershipHtml, /客户准备度/);
  assert.match(leadershipHtml, /北京市关于加快智能体引领发展的若干措施/);
});

test("homepage links to subsidy radar and renamed audience views", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /补贴申报雷达/);
  assert.match(html, /政策分析/);
  assert.match(html, /客户分类/);
  assert.match(html, /有效申报入口/);
  assert.doesNotMatch(html, /政策来源库/);
});

test("weekly page includes the previous week section", async () => {
  const html = await (await render("/weekly")).text();
  assert.match(html, /本周最新政策/);
  assert.match(html, /上周政策/);
  assert.match(html, /AI\+气象“揭榜挂帅”专项榜单/);
});

test("weekly page follows the current site cutoff and verified source note", async () => {
  const html = await (await render("/weekly")).text();
  assert.match(html, /2026-08-31—2026-09-06/);
  assert.match(html, /截至\s*(?:<!-- -->)?2026-09-07/);
  assert.match(html, /仅展示北京/);
  assert.match(html, /AI\+气象“揭榜挂帅”专项榜单/);
});

test("weekly current section only displays Beijing policy changes", async () => {
  const html = await (await render("/weekly")).text();
  assert.match(html, /工业和信息化部人工智能应用服务商培育专项行动/);
  assert.doesNotMatch(html, /上海市第一批算力生态合作伙伴名单公示/);
  assert.doesNotMatch(html, /南京市人工智能服务商、智能体开发商征集/);
  assert.doesNotMatch(html, /广州政务人工智能与城市可信数据空间建设答复/);
});
