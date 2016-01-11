---
layout: post
title: Git 私有仓库搭建步骤及问题
category: CheatSheet
tag: Git
latest: 2016年01月11日 22:46:04
---

- 安装 git

```
apt-get install git
```

- 创建 git 用户和组，并修改访问权限

```
groupadd git
adduser git -g git
```

这里因为安装好 Git 后默认会创建一个 git 用户，因此直接将其添加到 git 组就是了。

如果添加后出现意外，还可以试试如下指令：

```
mkdir /home/git
usermod -G git -a git
```

- 开启证书登录机制

这步的作用是为了像 GitHub 那样需要登录后才能对仓库中的项目进行修改，甚至是读权限，这个需要看具体如何配置。

```
cd /home/git
mkdir .ssh
chmod 0700 .ssh
touch .ssh/authorized_keys
chmod 0600 .ssh/authorized_keys
```

和 GitHub 一样，如果不想每次改动项目后都输入密码提交，可以把能够登录的用户的公钥收集到 /home/git/.ssh/authorized_keys 文件里，一行一个。

公钥通过 ssh 命令生成，默认位于用户家目录下的 .ssh 目录下的 id_rsa.pub 文件中。

- 初始化Git仓库

选定一个目录作为 Git 仓库：

```
cd /home
mkdir gitrepo
chown git:git gitrepos/
cd gitrepos
git init --bare lamchuanjiang.git
```

把仓库所属用户改为git：

```
chown -R git:git lamchuanjiang.git
```

- 远程测试克隆新建仓库

```
git clone git@192.168.1.217:/home/gitrepo/lamchuanjiang.git
```

这里的 IP 地址需要灵活改动，Git 服务搭建在哪，就写哪台服务器的 IP 。

- 禁止远程克隆，将仓库完全私有化

如果不想 git 用户远程操作服务器上的私有仓库，可以禁止 git 用户远程访问：

```
vi /etc/passwd
```

找到 git:x:1001:1002::/home/git:/bin/bash 这一行，将 `bash` 改为 `nologin` 即可。

Q&A
-

- 如何指定特定的用户可以远程访问并修改私有仓库？

不禁用远程登录或者使用另一个服务器上存在的用户身份登录。

参考
-

- <http://www.runoob.com/git/git-server.html>
