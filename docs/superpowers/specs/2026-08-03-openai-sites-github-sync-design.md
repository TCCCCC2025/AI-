# OpenAI Sites 与 GitHub Pages 同步设计

## 目标

在现有北京 AI 政策每周核验流程之后，把同一份已核验政策库同步发布到 OpenAI Sites 和 GitHub Pages，保持两个公开入口内容一致，并在任一发布端失败时留下可恢复的状态记录。

## 背景与边界

- 政策核验、状态判断和业务研判继续由 `beijing-ai-policy-intelligence` 流程负责；GitHub 不承担政策事实的独立采集。
- `/Users/cc/.codex/.chatgpt-projects/g-p-6a5dce0a21388191a15aa1d9ac70aa5f/beijing-ai-policy-site` 是工作目录和内容源。
- OpenAI Sites 与 GitHub Pages 是两个独立发布目标：Sites 使用内部 `sites` 远程，GitHub 使用 `origin` 远程的 `github-pages` 分支。
- GitHub Pages 已使用 `.github/workflows/pages.yml` 构建静态站点并部署；该工作流监听 `main` 和 `github-pages`。
- 正式政策结论只能来自已核验的官方来源；同步失败不能通过未经核验的信息来“补齐”页面。

## 方案比较

### 方案 A：现有每周自动化双发布（采用）

每周自动化完成政策核验和站点更新后，运行站点校验，生成一个可追踪提交，再分别发布到 Sites 和 GitHub。两端使用同一个提交内容，避免 GitHub 形成另一套政策事实源。

优点是来源一致、改动范围小、保留现有 Sites 流程；代价是自动化运行环境必须拥有 GitHub 写入凭据。

### 方案 B：GitHub Actions 独立采集

由 GitHub Actions 定时执行政策抓取、核验和分析，再直接部署 GitHub。

优点是无需依赖本机；代价是需要迁移政策 skill、官方来源配置和核验逻辑，容易形成与 Sites 不一致的第二套流程，本期不采用。

### 方案 C：人工导出后上传

每周由人工从 Sites 导出文件并在 GitHub Desktop 点击推送。

优点是凭据简单；代价是无法保证固定时间同步，且容易遗漏提交或推送，本期只作为自动推送失败时的兜底。

## 运行流程

1. 每周自动化按现有政策 skill 收集上一周官方政策变化，并完成来源核验、状态调整、概要、企业机会、合规影响和行动提示。
2. 在工作目录执行站点校验：`npm run lint`、`npm test`，并验证静态导出页面和项目路径资源。
3. 将已核验变更写入 `/weekly`，同步国家、北京市级和区级分类库及首页统计。
4. 以周次和变更摘要创建 Git 提交，提交内容只包含已核验政策数据和站点代码。
5. 将该提交发布到 OpenAI Sites；回读 Sites 版本和公开地址确认成功。
6. 将同一提交推送到 GitHub `github-pages` 分支；GitHub Actions 自动构建 `dist/client`，改写 `/AI-/` 项目路径后通过 Pages 部署。
7. 回读 GitHub 分支提交、Actions 运行状态和 Pages URL；只有三者一致时才报告 GitHub 同步完成。

## 失败与恢复

- **校验失败**：停止双发布，不提交或发布；报告失败测试和待处理文件。
- **Sites 发布失败**：GitHub 不发布该批内容；保留本地提交供安全重试。
- **GitHub 推送失败**：不修改政策内容、不重复盲目重试；在周报中标记“GitHub 待同步”，记录提交号，使用 GitHub Desktop 或重新授权后补推。
- **Pages 构建失败**：保留 GitHub 提交，读取失败 job 日志；修复构建问题后使用同一政策提交或明确的新修复提交重跑。
- **没有重大变化**：仍运行校验和状态复核，在 `/weekly` 标记“本周无已核验重大变化”，不创建虚假的政策变化。

## 凭据与安全

- GitHub 写入凭据只保存在本机 Keychain 或 GitHub Actions 的专用 Secret 中，不写入仓库、不写入日志、不发送到聊天。
- GitHub Pages 只发布静态文件，不连接本机服务、数据库或内部 Sites 运行时。
- 发布前检查提交内容，避免内部材料、访问令牌、Cookie、配置密钥和工作区路径进入公开仓库。
- 失败重试必须针对同一提交和明确目标，避免重复创建不同版本或覆盖其他人的更新。

## 可观测性与报告

每周结果报告至少包含：

- 新增、修订、截止和移出政策数量及标题；
- 每项政策的官方来源链接；
- Sites 版本、GitHub 分支和提交 SHA；
- GitHub Actions 运行结果和 Pages URL；
- 待同步集合、失败原因和安全重试次数。

## 验收标准

- 一次政策更新能够在同一个提交中生成 Sites 和 GitHub 两端内容。
- GitHub 推送后，Actions 的 `build` 和 `deploy` 均成功，公开地址返回 HTTP 200。
- 首页、`/weekly`、`/national`、`/beijing`、`/districts`、`/leadership` 和 `/client-manager` 均能从 GitHub Pages 项目路径访问。
- 任一端失败时，不发布未经核验信息，并能用记录的提交 SHA 安全补同步。
- 现有 Sites 地址和 GitHub Pages 地址可以独立访问，互不暴露本机服务。
