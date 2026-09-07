import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TARGET_BRANCH = "github-pages";
const TARGET_REMOTE = /github\.com[:/]TCCCCC2025\/AI-(?:\.git)?$/;
const STATIC_ROUTES = [
  "index.html",
  "weekly/index.html",
  "national/index.html",
  "beijing/index.html",
  "districts/index.html",
];
const WEEKLY_SHARE_PATH = "public/weekly-share.txt";

const ALLOWED_EXACT_PATHS = new Set([
  "README.md",
  "docs/subsidy-radar-update.md",
  "docs/weekly-github-sync.md",
  "next.config.ts",
  "package.json",
  "package-lock.json",
  "postcss.config.mjs",
  "vite.config.ts",
  "tsconfig.json",
  "eslint.config.mjs",
  "drizzle.config.ts",
]);

const ALLOWED_PREFIXES = [
  ".github/",
  ".openai/",
  "app/",
  "public/",
  "scripts/",
  "tests/",
  "db/",
  "examples/",
];

function runGit(args, options = {}) {
  const output = execFileSync("git", args, {
    encoding: "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
    ...options,
  });
  return typeof output === "string" ? output.replace(/\r?\n$/, "") : "";
}

function runCommand(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

function readWeeklyShare() {
  if (!existsSync(WEEKLY_SHARE_PATH)) {
    throw new Error(`Weekly share artifact is missing: ${WEEKLY_SHARE_PATH}`);
  }
  return readFileSync(WEEKLY_SHARE_PATH, "utf8").trim();
}

function reportWeeklyShare() {
  console.log(`Weekly share artifact: ${path.resolve(WEEKLY_SHARE_PATH)}`);
  console.log("----- BEGIN WEEKLY SHARE -----");
  console.log(readWeeklyShare());
  console.log("----- END WEEKLY SHARE -----");
}

function unquoteGitPath(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

export function isAllowedPath(filePath) {
  const normalized = filePath.replaceAll("\\", "/").replace(/^\.[/\\]/, "");
  return ALLOWED_EXACT_PATHS.has(normalized) || ALLOWED_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function parseChangedPaths(statusOutput) {
  const paths = [];

  for (const line of statusOutput.split("\n")) {
    if (!line.trim()) continue;
    const status = line.slice(0, 2);
    let filePath = line.slice(3);
    if (status.includes("R") || filePath.includes(" -> ")) {
      filePath = filePath.slice(filePath.lastIndexOf(" -> ") + 4);
    }
    filePath = unquoteGitPath(filePath);
    if (!isAllowedPath(filePath)) {
      throw new Error(`Changed path is outside the synchronization allowlist: ${filePath}`);
    }
    paths.push(filePath);
  }

  return [...new Set(paths)];
}

export function formatCommitMessage(message, date) {
  const trimmed = message?.trim();
  return trimmed || `chore: sync policy intelligence ${date}`;
}

function todayInShanghai() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function parseArguments(args) {
  const result = { dryRun: false, message: undefined };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--dry-run") {
      result.dryRun = true;
    } else if (argument === "--message") {
      result.message = args[index + 1];
      index += 1;
      if (!result.message) throw new Error("--message requires a non-empty value");
    } else if (argument === "--help") {
      console.log("Usage: npm run sync:github -- [--dry-run] [--message <commit message>]");
      return null;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return result;
}

function assertTargetRepository() {
  const branch = runGit(["branch", "--show-current"]);
  if (branch !== TARGET_BRANCH) {
    throw new Error(`GitHub synchronization must run on ${TARGET_BRANCH}; current branch is ${branch || "detached"}`);
  }

  const remote = runGit(["remote", "get-url", "origin"]);
  if (!TARGET_REMOTE.test(remote)) {
    throw new Error(`origin is not the expected GitHub repository: ${remote}`);
  }
}

function assertStaticArtifact() {
  for (const route of STATIC_ROUTES) {
    const filePath = path.join("dist", "client", route);
    if (!existsSync(filePath)) throw new Error(`Static artifact is missing: ${filePath}`);
  }
}

export function run({ dryRun = false, message } = {}) {
  assertTargetRepository();

  // Generate the WeChat-compatible weekly summary before taking the change
  // snapshot so the text artifact is included in the same publish commit.
  runCommand(process.execPath, ["--experimental-strip-types", "scripts/generate-weekly-share.mjs"]);
  // Always print the generated copy so the person running the sync can paste
  // it into a group immediately, even when the summary happens to be
  // unchanged and no new Git commit is needed.
  reportWeeklyShare();
  const changedPaths = parseChangedPaths(runGit(["status", "--porcelain=v1"]));

  runCommand("npm", ["run", "lint"]);
  runCommand("npm", ["test"]);
  runCommand(process.execPath, ["scripts/prepare-github-pages.mjs"]);
  assertStaticArtifact();

  if (changedPaths.length === 0) {
    console.log("GitHub sync: no allowlisted changes to publish.");
    return { changedPaths, pushedSha: null };
  }

  const commitMessage = formatCommitMessage(message, todayInShanghai());
  if (dryRun) {
    console.log(`GitHub sync dry run: would publish ${changedPaths.join(", ")}`);
    console.log(`GitHub sync dry run: commit message would be ${commitMessage}`);
    return { changedPaths, pushedSha: null, dryRun: true };
  }

  runGit(["add", "--", ...changedPaths], { stdio: "inherit" });
  runGit(["commit", "--message", commitMessage], { stdio: "inherit" });
  const localSha = runGit(["rev-parse", "HEAD"]);
  runGit(["push", "origin", TARGET_BRANCH], { stdio: "inherit" });
  const remoteSha = runGit(["ls-remote", "origin", `refs/heads/${TARGET_BRANCH}`]).split(/\s+/)[0];
  if (remoteSha !== localSha) {
    throw new Error(`GitHub remote head mismatch: local ${localSha}, remote ${remoteSha || "missing"}`);
  }

  console.log(`GitHub sync complete: ${localSha}`);
  return { changedPaths, pushedSha: localSha };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const options = parseArguments(process.argv.slice(2));
    if (options) run(options);
  } catch (error) {
    console.error(`GitHub sync failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
