# 每周同步到 GitHub

每周政策自动化完成官方来源核验、政策库更新、站点测试和 OpenAI Sites 发布后，运行：

```bash
npm run sync:github -- --message "chore: sync policy intelligence week 32"
```

命令会依次完成：

1. 确认当前分支为 `github-pages`，且 `origin` 指向 `TCCCCC2025/AI-`；
2. 根据已核验政策数据生成微信可复制的群发摘要 `public/weekly-share.txt`；
3. 检查变更只来自站点和部署允许目录；
4. 运行 `npm run lint`、`npm test` 和 GitHub Pages 静态产物检查；
5. 创建可追踪提交并推送 `origin/github-pages`；
6. 回读远程提交 SHA，确认 GitHub 已接收该提交。

推送成功后，GitHub Actions 工作流 **Publish policy site to GitHub Pages** 会自动构建并发布，公开地址为：

<https://tccccc2025.github.io/AI-/> 

群发摘要会同步发布为纯文本文件，复制到微信时不使用 Markdown 链接：

<https://tccccc2025.github.io/AI-/weekly-share.txt>

GitHub Actions 也会在每次 Pages 构建前重新生成该文件，避免手工推送时摘要落后于政策库。

## 预演检查

不提交、不推送地检查当前变更：

```bash
npm run sync:github -- --dry-run --message "chore: verify GitHub sync workflow"
```

## 失败恢复

- 如果出现 allowlist 错误，先检查是否有 `.env`、`sources/` 或内部材料改动；这些文件不会被同步。
- 如果验证失败，不会创建提交或推送；修复验证问题后重新执行同一个命令。
- 如果 GitHub 凭据不可用，命令会保留本地变更；在 GitHub Desktop 完成授权后，在该仓库点击 **Push origin**，再回读 Actions 结果。
- Sites 发布和 GitHub 推送是两个独立步骤；GitHub 失败时不能报告 GitHub 已同步。

政策事实仍以已核验的官方来源为准，命令不会替代政策采集、来源核验或业务研判。

## 本周运行记录

- 2026-W43：完成 2026-10-12—2026-10-18 北京政策核验，生成 `public/weekly-share.txt`，私有 Sites 版本 30 已发布；随后按周次提交并同步 GitHub Pages。
- 2026-W44：完成 2026-10-19—2026-10-25 北京政策核验，新增科学数据中心、AI赋能网络安全防御和人工智能颠覆性技术储备课题，修订人工智能应用服务商资源池阶段；私有 Sites 版本 31 已发布，GitHub 同步待本次脚本回读远程 SHA 与 Actions 结果后确认。
- 2026-W45：完成 2026-10-26—2026-11-01 北京政策核验，新增第二批重点应用场景储备项目和备案动态，修订住建场景征集期限，记录科学数据中心、人工智能+视听、AI网络安全防御及颠覆性技术课题的截止状态；私有 Sites 版本 32 已发布，GitHub 同步由本周脚本执行并回读远程 SHA 与 Actions 结果。
