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

常用远程登录协议/工具
-

- Putty

免简单轻巧的工具，因为它的轻便，在现在还不时使用，不过作者貌似好久没更新了。

- SecureCRT

经常在慕课网中看见有讲师使用这个工具，个人使用感觉一般吧。

相关的还有一个 SecureFXP，用与远程和本机之间的文件传输，界面还是比较友好的，可以直接拖，适合喜欢图形界面的朋友。

### XShell

目前比较火的一款远程终端软件，个人感觉也还不错，可以保存用户名和密码，不用每次登录都输入。

#### XShell 字体修改："文件" -> "属性" -> "外观"。

##### **注意**

如果在 Windows 上初次运行绿色版 XShell 没有反应的话，需要先安装 VC 
2008 和 VC 2012 这两个运行库。在后面附上了下载链接。

#### XShell 常用快捷键

- 全屏模式：Alt + Enter

-  简单模式：Alt + S ( 极简主义者喜欢, like me )

- 粘贴：Shift + Insert

### RDP

远程桌面协议。Windows 远程登录桌面就是使用 RDP。比如自带的 `msctsc.exe`，个人认为还是比较方便的。

使用 RDP 连接 Linux 需要在 Linux 上安装 xrdp 服务：

```
apt-get install xrdp
service xrdp start
```

如果需要开机启动该服务，可以为其创建一个软连接到 /etc/rc3.d/ 目录下：

```
ln -s /etc/ini.d/xrdp /etc/rc3.d/S03xrdp
```

##### **说明** Linux 运行等级详见其他文章介绍。

VC 运行库下载
-

- [Visual C++ 2008 SP1 运行库](http://www.microsoft.com/zh-cn/download/details.aspx?id=5582)

- [Visual C++ 2012 运行库 (vcredist_x86 32位版)](http://www.microsoft.com/zh-cn/download/details.aspx?id=30679)
