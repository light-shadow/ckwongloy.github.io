---
layout: post
title: 关于 "软件源"
category: Excerpt
tags: [软件源, Linux]
latest: 2014年09月11日 14:50:31
---

经常在 Linux 上使用到 **软件源** 这一概念，那么什么是软件源？

软件源就是打包好的软件库，存放在本地和服务器都可以。

只要满足约定的目录层次就能作为软件源，比如用光盘安装系统的时候光盘上的一些类似 package 的目录就是软件源。

Fedora/CentOS 下在软件源中查找软件包
-

```
$ yum search package_name
```

Fedora 22 后 yum 被弃用，使用 `dnf`：

```
$ dnf search package_name
```

Debian/Ubuntu 下在软件源中查找软件包
-

```
$ apt-cache search package_name
```

但是这样查找得到结果往往很多，比如在 Fedora22 xfce 下大概搜索 MySQL：

```
$ dnf search mysql
```

结果找到 100 多个和 MySQL 相关的结果 ( 取决于向软件源贡献代码的开发者的活跃度 ) ，这样反倒干扰了查找。

所以，私人建议安装 MySQL 还是去 Oracle 官网下载所需要的源码，然后在本地自己手动安装，而不是用软件包管理程序。

手动下载的能保证软件包的最新状态，因为软件源中的软件包不一定都是最新的。
