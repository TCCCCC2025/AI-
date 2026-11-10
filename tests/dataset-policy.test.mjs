import assert from "node:assert/strict";
import test from "node:test";
import { datasetMetrics, datasetPolicies, datasetRelatedPolicies, datasetSubsidies } from "../app/dataset-data.ts";

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

test("dataset module aggregates existing policy and subsidy records", () => {
  assert.ok(datasetRelatedPolicies.length >= 12);
  assert.ok(datasetRelatedPolicies.some((item) => item.title.includes("第二批央企AI战略性高价值场景")));
  assert.ok(datasetRelatedPolicies.some((item) => item.title.includes("2026年第一批人工智能赋能新型工业化高质量数据集需求")));
  assert.ok(datasetRelatedPolicies.some((item) => item.title.includes("广州市政务服务和数据管理局关于征集人工智能高质量数据集")));
  assert.ok(datasetRelatedPolicies.some((item) => item.title.includes("2026年江苏省高质量数据集建设先行先试项目")));
  assert.ok(datasetSubsidies.some((item) => item.id === "etown-ai-data-measures-2025"));
  assert.ok(datasetSubsidies.some((item) => item.id === "bj-high-tech-fund-202602"));
  assert.equal(datasetMetrics.related, datasetRelatedPolicies.length);
  assert.equal(datasetMetrics.subsidies, datasetSubsidies.length);
});
