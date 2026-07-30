import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
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
  assert.match(html, /北京市关于加快智能体引领发展的若干措施/);
  assert.match(html, /京发改〔2026〕1185号/);
  assert.match(html, /经官方核验/);
  assert.match(html, /申报窗口雷达/);
  assert.match(html, /政策库基线/);
  assert.match(html, /北京市公共数据资源授权运营管理办法/);
  assert.match(html, /北京经开区/);
  assert.match(html, /政策库基线（[\s\S]*36[\s\S]*项）/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});
