# 北京 AI 政策情报

面向领导汇报与客户经理会前准备的北京 AI、大模型、算力与数据政策站点。

公开访问：<https://tccccc2025.github.io/AI-/>

站点按首页总览、本周最新、国家、北京市级、区级、补贴申报雷达，以及领导摘要和客户经理准备卡组织；政策事实以可追溯的官方来源为准，业务机会与行动提示属于研判信息。

## 本地开发

项目运行在 [vinext](https://github.com/cloudflare/vinext) 上，Node.js 需要 `>=22.13.0`。

```bash
npm install
npm run dev
npm run build
```

## GitHub Pages 发布

推送到 `main` 分支后，`.github/workflows/pages.yml` 会构建静态文件并发布到 GitHub Pages。仓库 Settings → Pages 的发布来源请选择 **GitHub Actions**。

## 内容维护

- 页面与政策数据位于 `app/`。
- `scripts/prepare-github-pages.mjs` 将静态导出的根路径改写为项目站点路径 `/AI-/`。
- 正式政策结论仅使用已核验的官方来源；每周更新时同步政策状态、概要、企业机会、合规影响与行动提示。
- 补贴申报雷达在 [`/subsidies`](https://tccccc2025.github.io/AI-/subsidies/) 汇总北京市级、各区和经开区的 Token/模型券、算力券、数据券、备案、场景与 OPC 支持；字段维护和核验规则见[补贴雷达周更手册](docs/subsidy-radar-update.md)。

## 每周同步

现有政策自动化在 OpenAI Sites 发布后调用 [`npm run sync:github`](docs/weekly-github-sync.md)，将同一份已核验内容提交到 `github-pages`。推送成功后 GitHub Actions 自动重新发布 Pages；失败时按[同步运行手册](docs/weekly-github-sync.md)使用 GitHub Desktop 补推。

## Sites 版本

该目录也保留 OpenAI Sites 所需的 `.openai/hosting.json` 与构建配置，现有 ChatGPT Sites 地址继续独立运行；GitHub Pages 是同一份静态内容的公开镜像。

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run sync:github`: validate, commit, push, and verify the GitHub Pages sync
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
