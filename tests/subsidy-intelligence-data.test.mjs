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
