---
layout: post
title: 几种常见的远程登录
category: Auxiliary
tags: [SSH, ]
latest: 2015年11月26日 14:52:41
---

远程登录是经常干的事情。一般有如下几种方式和工具：

SSH
-

要使用  SSH 远程登录，在服务器端和客户端都要安装 openssh，即：

服务器上要安装：openssh-server。

客户机上要安装：openssh-client。

服务器和客户机的概念是相对的，谁登录谁，登录的就是客户端，被登录的就是服务器。

SSH 和 HTTP 的区别在于：SSH 默认是走 22 端口，而 HTTP 默认是走 80 端口。

参考
-

- Putty

- SecureCRT

- XShell
