import assert from "node:assert/strict";
import test from "node:test";
import {
  currentSubsidies,
  subsidyMetrics,
  subsidyPolicies,
  subsidyStatusLabel,
} from "../app/subsidy-data.ts";

test("seed records have auditable application fields", () => {
  assert.ok(subsidyPolicies.length >= 7);
  assert.equal(new Set(subsidyPolicies.map((item) => item.id)).size, subsidyPolicies.length);

  for (const item of subsidyPolicies) {
    assert.ok(item.name && item.district && item.amount);
    assert.ok(item.eligibility.length >= 2);
    assert.ok(item.supportDirection.length >= 1);
    assert.ok(item.portal.length >= 1);
    assert.ok(item.source.length >= 1);
    assert.ok(item.lastVerified);
    assert.ok(["A", "B", "C", "lead"].includes(item.source[0].tier));
  }
});

test("current selector excludes closed records and metrics remain consistent", () => {
  assert.ok(currentSubsidies().every((item) => !["closed", "pending_verification"].includes(item.status)));
  assert.equal(subsidyMetrics.current, currentSubsidies().length);
  assert.equal(subsidyStatusLabel("closing_soon"), "即将截止");
});

test("closed and pending-verification records preserve audit context", () => {
  assert.ok(subsidyPolicies.some((item) => item.status === "closed" && item.verificationNote));

  for (const item of subsidyPolicies.filter((item) => item.status === "pending_verification")) {
    assert.ok(item.source.every((source) => source.tier !== "A"));
  }
});
