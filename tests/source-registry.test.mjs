import assert from "node:assert/strict";
import test from "node:test";
import { sourceRegistry } from "../app/source-registry-data.ts";

test("来源库网址唯一且正式来源与线索来源分级", () => {
  assert.ok(sourceRegistry.length >= 20);
  assert.equal(new Set(sourceRegistry.map((item) => item.url)).size, sourceRegistry.length);
  for (const item of sourceRegistry) {
    assert.ok(item.url.startsWith("http"));
    assert.ok(item.title && item.publisher && item.firstSeen && item.lastVerified);
    assert.ok(["official_policy", "application_portal", "official_repost", "platform_update", "lead"].includes(item.sourceType));
    assert.ok(["verified", "lead", "not_found", "unavailable"].includes(item.verificationStatus));
    if (item.sourceType === "lead") assert.equal(item.verificationStatus, "lead");
  }
});
