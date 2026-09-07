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
