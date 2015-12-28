---
layout: post
title: SSH 与远程登录
category: Auxiliary
tags: [SSH, Linux]
latest: 2015年11月26日 14:52:41
---

远程登录是猿友经常干的事情。现阶段一般有如下几种方式和工具：

SSH
-

SSH 属于 CLI 界面下的远程管理工具，几乎所有的 *x 系统自带就有，毕竟叫做 _Secure Shell_ 嘛。

区别于 telnet，SSH 在进行数据传送时会使用非对称的加密算法对传输的数据进行加密，所以 SSH 是比较安全的协议，也是远程登录 Linux 服务器最常用的方式。

要使用  SSH 远程登录，在服务器端和客户端都要安装 openssh，即：

- 服务器上要安装：openssh-server。

- 客户机上要安装：openssh-client。

我认为服务器和客户机的概念是相对的，谁登录谁，登录的就是客户端，被登录的就是服务器。

SSH 和 HTTP 的区别在于：SSH 默认是走 22 端口，而 HTTP 默认是走 80 端口。

### Linux 下与 SSH 相关的命令

```
# 查看 SSH 信息
ssh -V
# 查看 SSH 服务的运行状态
service sshd status
# 登录
ssh username@host_ip
```

首次使用 SSH 登录 Linux 会提示是否生成密钥，选择是之后会在用户的家目录，Windows 就是用户名所在的文件夹，生成一个 .ssh 目录，里面保存了该用户的远程登录管理使用到的加密密钥。

其他远程登录协议/工具
-

- Putty

免简单轻巧的工具，因为它的轻便，在现在还不时使用，不过作者貌似好久没更新了。

- SecureCRT：经常在慕课网中看见有讲师使用这个工具，个人使用感觉一般吧。相关的还有一个 SecureFXP，用与远程和本机之间的文件传输。

- XShell

目前比较火的一款远程终端软件，个人感觉还不错。

- RDP

远程桌面协议。Windows 远程登录桌面就是使用 RDP。比如自带的 `msctsc.exe`，个人认为还是比较方便的。
