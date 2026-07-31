import assert from "node:assert/strict";
import test from "node:test";
import {
  clientPlaybooks,
  leadershipPriorityPolicies,
  leadershipRiskPolicies,
  leadershipSignals,
  managementActions,
  policyHref,
  themeMetrics,
} from "../app/audience-data.ts";
import { allPolicies } from "../app/policy-data.ts";

const policyIds = new Set(allPolicies.map((policy) => policy.id));

test("leadership briefing is derived from valid policy records", () => {
  assert.equal(leadershipSignals.length, 3);
  assert.equal(managementActions.length, 3);
  assert.ok(leadershipPriorityPolicies.length >= 3);
  assert.ok(leadershipPriorityPolicies.length <= 5);
  assert.ok(leadershipRiskPolicies.length >= 2);
  assert.deepEqual(Object.keys(themeMetrics), ["AI", "大模型", "算力", "数据"]);

  for (const signal of leadershipSignals) {
    assert.ok(signal.policyIds.length >= 1);
    assert.ok(signal.policyIds.every((id) => policyIds.has(id)));
    assert.ok(signal.managementMeaning.length >= 12);
  }
});

test("seven client playbooks contain actionable and traceable content", () => {
  assert.equal(clientPlaybooks.length, 7);
  assert.equal(new Set(clientPlaybooks.map((item) => item.id)).size, 7);

  for (const playbook of clientPlaybooks) {
    assert.ok(playbook.policies.length >= 2);
    assert.equal(playbook.discoveryQuestions.length, 2);
    assert.ok(playbook.possibleNeeds.length >= 2);
    assert.ok(playbook.conversationStarter.length >= 15);
    assert.ok(playbook.nextStep.length >= 10);
    assert.ok(playbook.policies.every((policy) => policyIds.has(policy.id)));
    assert.ok(!playbook.conversationStarter.includes("我司"));
  }
});

test("policy links point to the correct category route", () => {
  assert.equal(policyHref("bj-agent-measures"), "/beijing#bj-agent-measures");
  assert.equal(policyHref("nat-ai-manufacturing"), "/national#nat-ai-manufacturing");
  assert.equal(policyHref("dist-etown-ai-city"), "/districts#dist-etown-ai-city");
});
