# 2026-11-19 网站性能优化备份记录

## 备份点

- 源码提交：`9b931c6`
- 本地与 GitHub 备份分支：`codex/backup-before-full-performance-20261119`
- 备份内容：51LA 已改为 `defer`、字体已改为 `font-display: swap`，尚未进行本轮 CDN 本地化、封面转换、字体子集与依赖清理。
- 服务器：本轮未取得 Nginx 管理员权限，因此服务器配置没有被自动修改，也不需要服务器侧回滚。

## 安全恢复方式

不要直接覆盖当前分支。先从备份点创建恢复分支进行检查：

```bash
git switch -c restore/performance-baseline codex/backup-before-full-performance-20261119
npm run build
```

确认无误后，再决定是否部署该恢复分支生成的静态文件。

## 本轮基线数据

- 首页 HTML：约 66 KB，压缩传输约 15.7 KB。
- 5 次首页首字节时间：1.34～2.55 秒。
- 自定义字体：4,580,916 字节；单次实测下载约 16.5 秒。
- 首页资源引用：60 项；其中 41 项来自 12 个外部域名。
- `npm.elemecdn.com`：两个关键资源在本次线路约 12.4 秒后 TLS 失败。
- `cdn1.tianli0.top`：本次线路无法解析。
- 51LA：同步脚本单次实测约 2.05 秒，已在上一提交中改为 `defer`。
- 第一张 GitHub Raw 封面：约 1.1 MB，单次实测约 3.43 秒。

## 备份覆盖范围

原始字体、远程封面链接、CDN 地址以及 Vue / Element UI / jQuery 注入配置都保存在备份分支中。二进制资源不额外复制一份到当前分支，避免部署时把无用备份一起传到网站。
