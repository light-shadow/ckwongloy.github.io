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

#### 镜像源

一般各个版本的 Linux 发行套件都有其专门的官方软件源，但是对于国内用户来说，连不上很常见的事情。因此，有时候就需要更改一些国内镜像软件源。

很多比较大的互联网公司和中国大学都提供了很多镜像，比如 163, Sina, 中科大等等。但是镜像在提供高速度的同时软件的安全性不一定能保证。比如，网易有提供一些软件源，但是网易自己也曾经受到过 XcodeGhost 的影响 ( 网易公开课 APP 曾经为此更新 )，所以为了安全，特别是企业生产环境下，一般还是去官网下载比较好，虽然可能要借助一些梯子，不过对于技术人员来说，通常都不是什么难事。

- Debian 系更改软件源

```
$ sudo vi /etc/apt/sources.list
```

Linux 下安装软件的几种方式优劣对比
-

- 源码安装

需要解压缩，编译，配置。过程来说比较繁琐，比如需要手动解决依赖关系。但是往往可以安装上软件最新的版本，同时也更适合自己的机器环境。

- 包管理安装

包管理程序安装的软件包含几个内容：程序本身、配置文件、安装位置、依赖关系。安装过程比源码安装简单，同时能自动为我们解决依赖以及一些基本配置。

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

Q&A
-

-  `apt-get update` 和 `apt-get upgrade` 的区别？

> update 是同步 `/etc/apt/sources.list` 和 `/etc/apt/sources.list.d` 中列出的源的索引，这样才能获取到最新的软件包。

> upgrade 是升级已安装的所有软件包，升级之后的版本就是本地索引里的，因此，在执行 upgrade 之前一定要执行 update, 这样才能是最新的。

> An `update` should always be performed before an upgrade or dist-upgrade.

> `upgrade` is used to install the newest versions of all packages currently installed on the system from the sources enumerated in /etc/apt/sources.list. 

> Packages currently installed with new versions available are retrieved and upgraded.

参考
-

- <http://www.bkjia.com/Linuxjc/1014783.html>

- <http://www.cnblogs.com/beanmoon/p/3387652.html>

- <http://coolnull.com/2509.html>
