---
layout: post
title: 在 CentOS 上搭建公网上的 Samba 服务器
category: Linux
tags: [Samba, CentOS]
latest: 2015-10-03 15:32:19
---

#### 准备工作

如果是最小化安装 CentOS 7，ifconfig 这样的命令会看到无法运行了，整个系统也找不到相关的程序：find / -name "ifconfig"，这是因为 ifconfig 在新版本的 CentOS 中被认为是过时的，替代
的指令是：

``` shell
ip addr
ip link
```

如果实在习惯旧工具，可以安装 网络工具

```shell
sudo yum install net-tools
```

安装 Samba

``` shell
$ gpg --import samba-pubkey.asc
$ gunzip samba-version.tar.gz
$ gpg --verify samba-release.tar.asc
gpg: Signature made Tue 20 Nov 2007 07:12:04 PM CST using \
DSA key ID 6568B7EA
gpg: Good signature from "Samba Distribution Verification Key \
‹samba-bugs@samba.org›

sudo yum install samba samba-client samba-common
```

这里也可以只输入 samba，包管理器 yum 会自动安装所需依赖。

然后检查 是否安装成功：

``` shell
rpm -qa | grep "samba"
```

#### 配置 Samba

查看 Samba 用户密码文件路径：

``` shell
find / -name smbpasswd
```

#### Samba 相关命令

``` shell
service restart smb

systemctl restart smb

systemctl reload smb

systemctl status smb
```

#### 可能会用到的命令

- 检查用户所属组,确保每个用户所属组都有1003 RD 

``` shell
id root
```

- 恢复 tmux 断线前操作

``` shell
tmux ls

tmux attach -t 0    # 假设 tmux ls 出来的任务 ID 是 0
# 或者
tmux at -t 0
```

参考

- [CentOS 7安装配置Samba](http://linux.it.net.cn/CentOS/server/file/2015/0201/12759.html)
