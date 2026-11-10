import assert from "node:assert/strict";
import test from "node:test";
import { datasetMetrics, datasetPolicies } from "../app/dataset-data.ts";

test("high-quality dataset policy module has traceable, classified records", () => {
  assert.ok(datasetPolicies.length >= 6);
  assert.equal(new Set(datasetPolicies.map((item) => item.id)).size, datasetPolicies.length);
  assert.equal(datasetMetrics.total, datasetPolicies.length);
  assert.ok(datasetPolicies.some((item) => item.level === "国家"));
  assert.ok(datasetPolicies.some((item) => item.level === "北京市级"));

  for (const item of datasetPolicies) {
    assert.ok(item.id && item.title && item.issuer && item.date);
    assert.ok(item.sourceUrl.startsWith("https://"));
    assert.ok(item.summary.length >= 20);
    assert.ok(item.businessImpact.length >= 20);
    assert.ok(item.complianceImpact.length >= 20);
    assert.ok(item.action.length >= 10);
    assert.ok(item.tags.length >= 1);
    if (item.entry) assert.ok(item.entry.href.startsWith("http") || item.entry.href.startsWith("mailto:"));
  }
});
