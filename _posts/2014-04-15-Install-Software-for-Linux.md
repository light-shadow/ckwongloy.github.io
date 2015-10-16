---
layout: post
title: Linux 下软件安装方式
category: Auxiliary
tags: [Linux, Fedora]
latest: 2014年04月15日 22:31:01
---

对在 Linux 下安装软件的姿势，及注意事项进行下总结。

rpm软件包的安装
-

```
rpm -ivh 软件名.rpm
```

这个是用来安装一个新的rpm 包。

```
rpm -uvh 软件名.rpm
```

这是用来升级一个rpm 包，即系统中已有这个软件的旧版本，使用此命令即把旧版本升为新版本。

例如我要安装 firefox 就是：

```
rpm -ivh firefox-2.0.0.1.rpmtgz
```

或 tar.gz 的安装 :tgz ( 或 tar.gz ) 是 Linux 下的一种压缩文件格式 ( 如Windows下的.rar 或 .zip )，必须先解压出来。

1、解压

可以使用命令

```
tar xvfz 软件名.tgz(或.tar.gz)
```

该命令将解压缩至当前目录。

比如我要解压缩 firefox-2.0.0.1.tgz 或 .tar.gz，就是 `tar xvfz firefox- 2.0.0.1.tgz` 或 .tar.gz。

解压之后在当前目录生成了一个	firefox 的目录，里面包含了配置和编译所需要的文件。

2、切换目录

```
cd 解压出来后的目录
```

切换到解压目录中，比如 `cd firefox`，切换到firefox这个目录里面。

3、执行 `./configure` 进行安装设置。

这时会出现一大堆的字符，等一段时间就行。

4、等到配置完成后执行 `make`

编译中，也要等一会。

5、编译完后 `make install` 进行安装。

6、最后 `make clean`

清除掉配置编译的一些文件。
