import assert from "node:assert/strict";
import test from "node:test";
import { policyGroups, policyMetrics } from "../app/policy-data.ts";

const policies = policyGroups.flatMap((group) => group.policies);

test("all policies contain actionable intelligence fields", () => {
  assert.equal(policies.length, 58);
  assert.equal(new Set(policies.map((policy) => policy.id)).size, policies.length);

  for (const policy of policies) {
    assert.ok(policy.id);
    assert.ok(policy.validity);
    assert.ok(["高", "中", "观察"].includes(policy.opportunityLevel));
    assert.ok(policy.judgement.length >= 10);
    assert.ok(policy.customerTypes.length >= 1);
    assert.ok(policy.scenarios.length >= 1);
    assert.ok(policy.analysisBasis.includes("业务研判"));
    if (policy.status === "待回核") {
      assert.equal(policy.opportunityLevel, "观察");
    }
  }
});

test("all related policy references are valid", () => {
  const ids = new Set(policies.map((policy) => policy.id));

  for (const policy of policies) {
    for (const relation of policy.relatedPolicies) {
      assert.notEqual(relation.policyId, policy.id);
      assert.ok(ids.has(relation.policyId), `${policy.id} -> ${relation.policyId}`);
      assert.ok(["上位依据", "配套细则", "同主题"].includes(relation.type));
    }
  }
});

test("homepage metrics match the policy universe", () => {
  assert.equal(
    policyMetrics.pendingVerification,
    policies.filter((policy) => policy.validity === "待核实").length,
  );
  assert.equal(
    policyMetrics.rollingVerification,
    policies.filter((policy) => policy.validity === "滚动事项").length,
  );
});
