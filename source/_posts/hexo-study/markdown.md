---
title: Markdown学习汇总
description: 这是一篇学习markdown的文章
cover: 'https://picsum.photos/id/60/1920/1200'
categories:
  - markdown
  - 学习
abbrlink: 4a8a2d58
date: 2025-01-15 00:00:00
tags:
---
# 前言
Markdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用，如Github、Wikipedia、简书等。 通过学习markdown的书写方式来写博客文章。
# Markdown语法自带格式
## 快捷键

首先让我们来看看markdown的快捷键吧

| 功能  | 快捷键 |
|:---:|:-----------:|
| 加粗  | Ctrl + B |
| 斜体  | Ctrl + I|
| 引用  |Ctrl + Q|
|插入链接|Ctrl + L|
|插入代码|Ctrl + K|
|插入图片|Ctrl + G|
|提升标题|Ctrl + H|
|有序列表|Ctrl + O|
|无序列表|Ctrl + U|
|横线|Ctrl + R|
|撤销|Ctrl + Z|
|重做|Ctrl + Y|

## 基本语法
### 标题语法
要创建标题，请在单词或短语前面添加井号`#`。`#`的数量代表了标题的级别。例如，添加三个`#`表示创建一个三级标题 `<h3>`(例如：`### My Header`)。<br>
不同的 Markdown 应用程序处理`#`和标题之间的空格方式并不一致。为了兼容考虑，请用一个空格在`#`和标题之间进行分隔。
```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```
还可以在文本下方添加任意数量的 == 号来标识一级标题，或者 -- 号来标识二级标题。
```
Heading level 1
===============

Heading level 2
---------------
```


### 文字样式

| Markdown语法 | 预览效果 |
|:---:|:---:|
| `<u>下划线演示</u>` | <u>下划线演示</u> |
| `文字**加粗**演示` | 文字**加粗**演示 |
| `文字*斜体*演示` | 文字*斜体*演示 |
| `文本`高亮`演示` | 文本`高亮`演示 |
| `文本~~删除~~线演示` | 文本~~删除~~线演示 |
| `<font size = 5>5号字</font>` | <font size = 5>5号字</font> |
| `<font face="黑体">黑体</font>` | <font face="黑体">黑体</font> |
| `<font color=blue>蓝色</font>` | <font color=blue>蓝色</font> |
| `<table><tr><td bgcolor=MistyRose>这里的背景色是：MistyRosen，此处输入任意想输入的内容</td></tr></table>` | <table><tr><td bgcolor=MistyRose>这里的背景色是：MistyRosen，此处输入任意想输入的内容</td></tr></table> |







### 引用
```
>  Java
> 二级引用演示
> MySQL
> >外键
> >
> >事务
> >
> >**行级锁**(引用内部一样可以用格式)
> 
> ....
```
>  Java
> 二级引用演示
> MySQL
> >外键
> >
> >事务
> >
> >**行级锁**(引用内部一样可以用格式)
>
> ....