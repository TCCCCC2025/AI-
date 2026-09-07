import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { priorityRegionWeeklyChanges, previousWeeklyChanges, siteCutoff, weeklyChanges, weeklyPeriods } from "../app/policy-data.ts";
import { subsidyPolicies } from "../app/subsidy-data.ts";

export const WEEKLY_SHARE_PATH = path.resolve("public/weekly-share.txt");
export const PUBLIC_SITE_URL = "https://tccccc2025.github.io/AI-/";

function formatChineseDate(date) {
  const parts = date.split("-");
  return parts[0] + "年" + Number(parts[1]) + "月" + Number(parts[2]) + "日";
}

function officialSource(policy) {
  const policySource = policy.sources.find((source) =>
    ["official", "official_repost"].includes(source.sourceGrade) &&
    !/(申报入口|填报入口|政策兑现综合服务平台|科技项目统筹管理信息系统|公共服务平台|平台说明)/i.test(source.title),
  );
  return policySource ?? policy.sources.find((source) => source.sourceGrade === "official") ?? policy.sources[0];
}

function lastDate(value) {
  const matches = [...String(value).matchAll(/\d{4}-\d{2}-\d{2}/g)];
  return matches.length ? matches[matches.length - 1][0] : null;
}

function deadlineSortValue(policy) {
  const end = lastDate(policy.applicationWindow);
  return end ? Date.parse(end + "T23:59:59Z") : Number.POSITIVE_INFINITY;
}

function recentClosedPolicies(policies, cutoffDate) {
  const cutoff = Date.parse(cutoffDate + "T00:00:00Z");
  const maxAge = 30 * 24 * 60 * 60 * 1000;
  return policies
    .filter((policy) => policy.status === "closed")
    .filter((policy) => {
      const end = lastDate(policy.applicationWindow);
      if (!end) return false;
      const age = cutoff - Date.parse(end + "T23:59:59Z");
      return age >= 0 && age <= maxAge;
    })
    .sort((a, b) => deadlineSortValue(b) - deadlineSortValue(a));
}

function plainUrlBlock(label, url) {
  return label + "：\n" + url;
}

function formatApplicationWindow(policy) {
  const directions = policy.supportDirections.join("、");
  const beneficiaries = policy.beneficiaries.slice(0, 3).join("、");
  return policy.title + "：" + policy.applicationWindow + "；支持方向：" + directions + "；支持/金额：" + (policy.amount || "待核") + "；适用对象：" + (beneficiaries || "待核") + "。";
}

function formatCurrentWindows(policies) {
  const current = policies
    .filter((policy) => policy.status === "current")
    .sort((a, b) => deadlineSortValue(a) - deadlineSortValue(b));

  if (!current.length) return "本周暂无已核验的有效申报窗口";

  return current.flatMap((policy) => {
    const source = officialSource(policy);
    const blocks = [formatApplicationWindow(policy), plainUrlBlock("政策原文", source?.url ?? "待核")];
    if (policy.applicationUrl) blocks.push(plainUrlBlock("申报入口", policy.applicationUrl));
    return blocks;
  }).join("\n\n");
}

function formatPolicyChanges(current, previous) {
  if (current.length) {
    return current.map((change) => [
      change.changeType + " " + change.title + "：" + change.detail,
      plainUrlBlock("政策原文", change.href ?? "待核"),
    ].join("\n")).join("\n\n");
  }

  const prior = previous.slice(0, 5);
  if (!prior.length) return "本周期未发现经官方核验的重大新增政策。";

  return [
    "本周期未发现经官方核验的重大新增政策。以下为上周已核验、仍需继续跟踪的事项：",
    prior.map((change) => [
      change.changeType + " " + change.title + "：" + change.detail,
      plainUrlBlock("政策原文", change.href ?? "待核"),
    ].join("\n")).join("\n\n"),
  ].join("\n\n");
}

function formatStatusReminders(policies, cutoffDate) {
  const closed = recentClosedPolicies(policies, cutoffDate);
  if (!closed.length) return "";

  return [
    "状态提醒：",
    closed.map((policy) => policy.title + "（" + policy.applicationWindow + "）").join("、") + "本轮已截止，后续关注下一批通知。",
    closed.map((policy) => {
      const source = officialSource(policy);
      return policy.title + "政策原文：\n" + (source?.url ?? "待核");
    }).join("\n\n"),
  ].join("\n\n");
}

function formatRegionalObservations(regional) {
  if (!regional.length) return "";
  return [
    "外省市政策观察：",
    regional.map((change) => [
      change.title + "：" + change.detail + "以上事项仅适用于当地项目或主体，不作为北京申报依据。",
      plainUrlBlock("政策原文", change.href ?? "待核"),
    ].join("\n")).join("\n\n"),
  ].join("\n\n");
}

export function formatWeeklyShare({ cutoff = siteCutoff, periods = weeklyPeriods, weekly = weeklyChanges, previous = previousWeeklyChanges, regional = priorityRegionWeeklyChanges, subsidies = subsidyPolicies } = {}) {
  const sections = [
    "【北京 AI 政策情报周更新｜" + formatChineseDate(cutoff.date) + "】",
    weekly.length
      ? "本周（" + periods.current + "）北京范围内有新的官方核验政策变化，以下为当前仍可行动的申报窗口及近期重点变化。"
      : "本周（" + periods.current + "）未发现北京范围内经官方核验的重大新增政策，以下为当前仍可行动的申报窗口及近期重点变化。",
    "本周申报窗口：",
    formatCurrentWindows(subsidies),
    "政策更新：",
    formatPolicyChanges(weekly, previous),
  ];

  const status = formatStatusReminders(subsidies, cutoff.date);
  if (status) sections.push(status);

  const regionalText = formatRegionalObservations(regional);
  if (regionalText) sections.push(regionalText);

  sections.push("完整政策、申报入口和核验依据：", PUBLIC_SITE_URL);
  return sections.join("\n\n").trim() + "\n";
}

export async function generateWeeklyShare(options = {}) {
  const output = formatWeeklyShare(options);
  await writeFile(WEEKLY_SHARE_PATH, output, "utf8");
  return { path: WEEKLY_SHARE_PATH, output };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await generateWeeklyShare();
  console.log("Weekly share summary generated: " + result.path);
}
