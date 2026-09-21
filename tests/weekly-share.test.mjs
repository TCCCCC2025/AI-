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

  assert.match(output, /【北京 AI 政策情报周更新｜2026年9月21日】/);
  assert.match(output, /本周（2026-09-14—2026-09-20）北京范围内有新的官方核验政策变化/);
  assert.match(output, /https:\/\/jxj\.beijing\.gov\.cn\/zwgk\/2024zcwj\/202607\/t20260730_4801241\.html/);
  assert.match(output, /申报入口：\nhttps:\/\/zhengce\.beijing\.gov\.cn/);
  assert.doesNotMatch(output, /\]\(/);
  assert.doesNotMatch(output, /`/);
  for (const line of output.split("\n")) {
    if (line.startsWith("https://")) assert.doesNotMatch(line, /[，。；：）》)]+$/);
  }
});

test("orders dated current windows before rolling windows", () => {
  const output = formatWeeklyShare({
    cutoff: siteCutoff,
    periods: weeklyPeriods,
    weekly: weeklyChanges,
    previous: previousWeeklyChanges,
    regional: [],
    subsidies: subsidyPolicies,
  });

  const aiPlus = output.indexOf("2026年度“AI+”方向“揭榜挂帅”专项榜单及AI赋能生物育种储备课题");
  const audiovisual = output.indexOf("北京市促进“人工智能+视听”产业高质量发展重点项目申报指南");
  const rolling = output.indexOf("首都科技条件平台与科技创新券");
  assert.ok(aiPlus >= 0 && audiovisual > aiPlus && rolling > audiovisual);
});
