import assert from "node:assert/strict";
import test from "node:test";
import { formatWeeklyShare } from "../scripts/generate-weekly-share.mjs";
import { priorityRegionWeeklyChanges, previousWeeklyChanges, siteCutoff, weeklyChanges, weeklyPeriods } from "../app/policy-data.ts";
import { subsidyPolicies } from "../app/subsidy-data.ts";

test("generates a WeChat-copyable summary with plain URLs", () => {
  const output = formatWeeklyShare({
    cutoff: siteCutoff,
    periods: weeklyPeriods,
    weekly: weeklyChanges,
    previous: previousWeeklyChanges,
    regional: priorityRegionWeeklyChanges,
    subsidies: subsidyPolicies,
  });

  assert.match(output, /【北京 AI 政策情报周更新｜2026年10月12日】/);
  assert.match(output, /本周（2026-10-05—2026-10-11）北京范围内有新的官方核验政策变化/);
  assert.match(output, /https:\/\/jxj\.beijing\.gov\.cn\/zwgk\/2024zcwj\/202607\/t20260730_4801241\.html/);
  assert.match(output, /申报入口：\nhttps:\/\/zhengce\.beijing\.gov\.cn/);
  assert.doesNotMatch(output, /\]\(/);
  assert.doesNotMatch(output, /`/);
  for (const line of output.split("\n")) {
    if (line.startsWith("https://")) assert.doesNotMatch(line, /[，。；：）》)]+$/);
  }
});

test("includes the current-week verified change", () => {
  const output = formatWeeklyShare({
    cutoff: siteCutoff,
    periods: weeklyPeriods,
    weekly: weeklyChanges,
    previous: previousWeeklyChanges,
    regional: [],
    subsidies: subsidyPolicies,
  });

  assert.ok(output.includes("经开区：关于开展2026年亦城人才备案认定申报的通知"));
});
