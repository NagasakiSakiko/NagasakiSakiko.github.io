---
title: 如何进行多主机上传Hexo
date : 2024年12月14日14:47:20
description: 使用Hexo在多台主机上同步博客的教程。
cover: https://picsum.photos/id/60/1920/1200
categories: 
  - Hexo学习
tags: 
  - Hexo
  - 同步
---
参考了网络教程，这次来写一个如何多主机上传电脑。这样我就不用找好多好多网站。
# 老电脑的配置步骤
## GitHub分支设置
首先在打开GitHub创建一个分支，比如我创建了`hexo`分支。
![创建分支](/img/How-to-Upload-Hexo-to-Multiple-Hosts/Create-a-Hexo-branch.png)
这个时候会将`master`的分支复制到`hexo`。
将其设定为默认分支。
![设定默认分支](/img/How-to-Upload-Hexo-to-Multiple-Hosts/Set-default-branch.png)
## 克隆与初始化
将新建的hexo分支克隆克隆到本地,然后进入该目录
```
git clone  https://github.com/username/username.github.io.git
cd username.github.io
```
确认当前分支为hexo
```
git branch
output:
	*hexo
```

## 本地文件管理
下载的`username.github.io`里仅留下`.git`文件夹，其他的文件都删除。
注意`.git`是个隐藏文件夹，windows下需要右击文件夹内空白处，点选「显示/隐藏 异常文件」。


打开`git bash here`输入命令行
```
git add -A
```
把工作区的变化（包括已删除的文件）提交到暂存区。
（ps:「git add .」命令提交的变化不包括已删除的文件）。

输入命令行
```
git commint -m "some descrption"
```
输入命令行
```
git push origin hexo
```
将这个文件夹推送到`hexo`分支，刷新一下GitHub，`hexo`分支应该被清空了。

接下来有两个方法：
1. 找见我们本地的hexo博客地址，将hexo文件夹内除`.deploy_git` 以外都复制到clone下来的中`username.github.io`。
2. 把下载的`username.github.io`中的`.git`复制到本地的hexo博客地址。

笔者选择方法一。使用方法一的时候要注意：如果已经克隆过主题文件，那么需要把`theme`主题文件夹里的` .git `也删除。因为git不能嵌套上传，最好是显示隐藏文件，检查一下有没有，否则上传的时候会出错，导致你的主题文件无法上传，这样你的配置在别的电脑上就用不了。

### 提交与推送至远程库
以后每次发布新文章或修改网站样式文件时，依次输入以下命令行：
```
git add . 
git commit -m "some descrption"
git push origin hexo
```
即可把环境文件推送到hexo分支。
最后输入：
```
hexo g -d
```
发布网站并推送静态文件到master分支。

# 新电脑的配置步骤
## 环境准备
首先需要下载`node.js`和`git`。
安装`hexo`输入命令行：
```
npm install -g hexo-cli
```
并将新电脑的生成的ssh key添加到GitHub账户上
## 本地预览与同步
输入克隆命令：
```
git clone  https://github.com/username/username.github.io.git
```

打开`packge.json`输入或者按照提示安装`npm install`。
本地生成网站并开启博客服务器：
```
hexo g
hexo s
```
此时打开浏览器输入`http://localhost:4000/` 已经可以看到博客正常运行了.
至此，同步工作已经完成。
# 多电脑同步操作
输入命令行：
```
git pull origin hexo
```
从远程hexo分支拉取最新的环境文件到本地，可以理解为svn的更新操作。比如在公司写了博客，回家在电脑上也要写需要先执行这一步操作。
## 发布文章流程
文章写完要发布时，需要先提交环境文件，再发布文章。依次执行以下命令：
```
git add .
git commit -m "some descrption"
git push origin hexo
hexo g -d
```
# 参考文章
- [hexo博客多设备同步](https://xuexuan.site/2021/02/04/hexo%E5%8D%9A%E5%AE%A2%E5%A4%9A%E8%AE%BE%E5%A4%87%E5%90%8C%E6%AD%A5/)
- [Hexo在多台电脑上提交和更新](https://blog.csdn.net/K1052176873/article/details/122879462)