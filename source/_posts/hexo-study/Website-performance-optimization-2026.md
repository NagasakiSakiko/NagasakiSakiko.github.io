---
title: 一次把博客加载慢的问题修一遍
description: 从失效 CDN、阻塞脚本、超大字体、远程封面到 Nginx 缓存，记录本站 2026 年的一次性能体检与修复。
cover: /img/covers/performance-optimization.webp
categories:
  - Hexo学习
tags:
  - Hexo
  - 性能优化
  - CDN
abbrlink: 9f4e2c1a
date: 2026-11-19 19:50:00
---

## 写在前面

这不是一篇从零搭建博客的教程，而是一次旧站体检记录。思路参考了 Fomalhaut🥝 的[《通过 DeepSeek Harness 修复和优化网站》](https://www.fomal.cn/posts/d5a4e2f1.html)：先列出实际失败的资源，再逐项修改、构建、扫描和验证。本文所有数字都来自本站当次测试，不直接套用参考文章的结论。

修改前先建立了 Git 备份分支：

```text
codex/backup-before-full-performance-20261119
```

它对应提交 `9b931c6`。服务器 Nginx 因部署账户没有管理员权限，本轮没有直接修改；待应用的配置单独保存在仓库中。

## 一、体检：慢在哪里

首页 HTML 本身并不大，约 66 KB，压缩后只有约 15.7 KB。真正的问题在资源链路：

| 检查项 | 修改前结果 |
| --- | --- |
| 首页首字节时间 | 1.34～2.55 秒 |
| 外部资源 | 41 项，分布于 12 个外部域名 |
| 自定义字体 | 4,580,916 字节，实测约 16.5 秒 |
| `npm.elemecdn.com` | 关键资源约 12.4 秒后 TLS 失败 |
| `cdn1.tianli0.top` | 本次线路无法解析 |
| 51LA | 同步加载约 2.05 秒 |
| 第一张远程封面 | 约 1.1 MB，实测约 3.43 秒 |

这些问题叠在一起，会造成首屏开始得晚、文字迟出现、轮播样式缺失以及页面长期处于加载状态。

## 二、把失效 CDN 资源收回站内

轮播插件和外挂标签插件原来依赖 `npm.elemecdn.com`，其中 CSS、初始化脚本和触摸脚本都可能失败。本轮没有再寻找另一个公共 CDN，而是直接从已安装的 npm 包复制发行文件到：

```text
source/vendor/swiper/
source/vendor/tag-plugins/
```

构建配置改为 `/vendor/...` 站内路径。这样依赖版本与 `package-lock.json` 一致，公共 CDN 故障也不会再让首页轮播失效。

## 三、让统计脚本退出首屏关键路径

51LA 原来是一个位于 `<head>` 的同步脚本。现在增加 `defer`，并在 `DOMContentLoaded` 后初始化；如果脚本加载失败，`window.LingQue` 检查会让页面安静降级，而不是抛出新的错误。

统计功能仍然保留，只是不再阻塞 HTML 解析。

## 四、字体从整包改为本站字符子集

原来的霞鹜文楷 WOFF2 为 4.58 MB，而且曾经使用 `font-display: block`。本轮做了两层处理：

1. 保持 `font-display: swap`，先显示系统字体；
2. 使用 FontTools 按本站文章、配置与界面实际出现的字符生成 WOFF2 子集。

子集生成后字体大小为 404,040 字节（约 394.6 KiB），比原文件减少约 91.2%。原始完整字体保存在 Git 备份分支中。页面还增加了同源字体预加载，并给字体与改写后的交互脚本增加版本参数，避免旧浏览器缓存继续使用优化前文件。Nginx 的一年强缓存配置已准备好，但需要服务器管理员应用后才会生效。

## 五、首页封面本地化并转为 WebP

首页文章封面原来来自 GitHub Raw、jsDelivr、知乎图片和 Picsum。它们不仅建立多个连接，而且部分原图达到 5000 像素宽。

本轮把 15 张封面下载后统一处理为：

- 最大宽度 1200px；
- WebP，质量 78；
- 移除元数据；
- 放入 `/img/covers/`，由本站同源加载。

转换后的 15 张封面合计 873,904 字节（约 853.4 KiB），不再依赖首页外部图床。

## 六、清掉 Vue、Element UI 与 jQuery

检查代码后发现：

- Vue + Element UI 只用于昼夜切换后的两条通知；
- jQuery 只用于导航栏滚动监听；
- Twikoo 评论区的 `.el-*` 样式由 Twikoo 自身提供，不需要全局 Element UI。

因此新增了一个原生通知组件 `source/js/notify.js`，并把导航栏改为原生 `scroll` 事件与 `window.scrollY`。昼夜脚本同时改用 Butterfly 自带的带有效期本地存储格式，并兼容迁移旧的明文主题值。删除全局 Vue、Element UI CSS/JS 和 jQuery 后，昼夜通知、PJAX 与导航栏行为仍然保留。

## 七、缓存、TLS 与边缘加速

源码能解决资源数量和体积，但第一次连接的 TLS 延迟属于部署侧问题。本轮准备了 `ops/nginx/tsaihungye-performance.conf`，包括：

- TLS 会话缓存；
- 更长的 keep-alive；
- 静态文件句柄缓存；
- 字体、WebP、AVIF 等一年强缓存；
- CSS / JS 保持 12 小时缓存，避免无哈希文件长期命中旧版本。

真正的边缘 CDN 还需要域名 DNS/CDN 控制台权限。源码无法替代这个步骤，因此文章不会把“准备了配置”写成“已经接入 CDN”。

## 八、构建与验收

每轮修改后都执行：

```bash
npm run build
git diff --check
```

并扫描构建产物，确认：

- `npm.elemecdn.com` 引用为 0；
- `cdn1.tianli0.top` 引用为 0；
- Vue、Element UI、jQuery 的全局引用为 0；
- 首页文章封面全部为本地 WebP；
- 51LA 保留但采用 `defer`；
- 原生通知和导航脚本通过语法检查。

完整构建后的首页资源扫描结果是：外部资源引用从 41 项降到 10 项，外部域名从 12 个降到 4 个；其中真正会加载文件的外部资源为 8 项，另外 2 项是预连接提示。`npm.elemecdn.com`、`cdn1.tianli0.top`、GitHub Raw、阿里图标 CDN 和原备案图床均已从首屏资源中消失。与其追求某个测试工具的一次满分，这次更看重三件事：关键资源不再依赖失效域名、首屏不再等待不必要的框架、每一项改动都能从备份分支恢复。

## 九、如何回滚

先从备份点新建分支，不要直接覆盖当前工作：

```bash
git switch -c restore/performance-baseline codex/backup-before-full-performance-20261119
npm run build
```

确认恢复版本可以正常生成后，再决定是否部署。原始字体、远程封面链接以及旧的 CDN/框架配置都在这个备份分支中。
