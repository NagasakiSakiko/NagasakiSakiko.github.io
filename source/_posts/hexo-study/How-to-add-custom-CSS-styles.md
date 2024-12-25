---
title: 如何添加自定义的css样式
date : 2024-12-20
description: 添加自定义的css样式
cover: https://picsum.photos/id/60/1920/1200
categories: 
  - Hexo学习
tags: 
  - Hexo
  - 修改
---
#写在前言

经过一个晚上的学习，自己修改css样式总是发生`Failed to load resource: the server responded with a status of 404 (Not Found)`的错误，现在成功上传成功。

#如何解决
首先在文件目录创造一个css文件，接着在创建自己`.css`样式；
打开自己使用主题的`layout`文件，打开`_partial`，如果没有的话可以创建一个。
在这个文件创建一个新的`html`文件，比如`custom-css.ejs`使用`<link>`标签引入`css`文件：
```
<link rel="stylesheet" href="/custom.css">
```
比如我在`_config.butterfly.yml`的`inject`引用：
```
inject:
  head:
   - <link rel="stylesheet" href="/css/custom.css">
```
就可以了。
