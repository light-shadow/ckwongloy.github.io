---
layout: post
title: 为树莓派 2 编译安装无线网卡驱动 ( RT3070/Mt7601 )
category: Auxiliary
tags: [树莓派, Linux, 内核编译, 无线网卡]
latest: 2015年11月20日 01:18:44
---

Raspberry Wheezy ( Debian 7 ) 默认其实已经为 RT3070 安装过无线网卡驱动，即免驱。但是作为典型的折 (dan) 腾 ( teng )派，不手动编译安装下驱动内心貌似难以止痒，简单说下流程和遇到的坑，为需要的人提供便利。

准备工作
-

### 1、下载源代码

- 驱动源码包 ( for Linux )

<i class="fa fa-download"></i> _<http://www.premiertek.net/top/download.html>_。

- Raspberry Linux 4.1.y 内核源码

```
$ sudo wget https://github.com/raspberrypi/linux/archive/rpi-4.1.y.tar.gz
```

- 适用于树莓派 2 的内核描述符号文件 _Module7.symvers_ ( 编译时候需要 )

```
$ sudo wget https://raw.githubusercontent.com/raspberrypi/firmware/master/extra/Module7.symvers
```

该文件用于避免从头开始编译驱动。

### 2、 解压

```
$ sudo tar zxvf rpi-4.1.y.tar.gz
```

### 3、 为内核模块创建软符号链接到 `/usr/src/`

```
$ sudo ln -s /usr/src//linux-rpi-4.1.y /lib/modules//4.1.13+/build
```

### 4、 获得运行环境配置信息

```
$ sudo modprobe configs
$ sudo gzip -dc /proc/config.gz > .config
```

### 5、 安装配置 GCC

网上有的说法必须安装某个版本的 GCC 才可以编译成功，我个人在 GCC 4.6.2 和 GCC 4.8.2 上都编译成功，所以觉得不是那么绝对，但是知道思路总是好的，步骤如下：

```
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9

# 选择一个 GCC 版本为当前使用
$ sudo update-alternatives --config gcc
```

其他
-

在 Stack Overflow 上看见了对于在 Linux 安装 Ralink 无线网卡驱动的说法，觉得很有用，如果不想折腾的，就直接通过两行命令就可以安装成功，原文如下：

> For the reference of anyone trying to solve the same problem, the correct answer was to ignore the vendor's supplied device driver and use the precompiled Debian rt2800usb driver instead - just 

```
$ apt-get install firmware-ralink
$ sudo modprobe rt2800usb
```

> Apparently Ralink's driver has needed patching to get it to compile since Ubuntu 12-ish.

参考
-

- [_Ralink RT3070 驱动安装_](http://askubuntu.com/questions/148767/help-do-i-install-the-ralink-rt3070-wireless-driver)

- [_在树莓派上使用基于MT7601的无线网卡（如360/百度/腾讯Wifi）_](http://www.7forz.com/2470/)

- [_Raspberry Pi （树莓派）折腾记之一_](http://skypegnu1.blog.51cto.com/8991766/1641149)

- [_[原]树莓派2 Raspberry pi 2 4.0.8系统 编译MT7601(小度wifi，360wifi，miwifi)详细过程_](http://m.blog.csdn.net/blog/dyc12292/47039637)

- [_基于2015-0505-Raspbian 镜像的树莓派2用gcc4.8 编译 360wifi2 过程_](http://my.oschina.net/freeblues/blog/495754)

- [_树莓派内核编译与固件升级_](http://wiki.jikexueyuan.com/project/raspberry-pi/kernel.html)
