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

屏蔽自带驱动，启用自己编译的驱动
-

首先确保已经正确编译并安装了官方的网卡驱动，比如我的 RT3070 官方驱动源码编译后得到的就是叫做 _rt5370sta.ko_ 模块。

1、卸载或者禁用自带网卡驱动模块

```
$ lsmod
```
找到无线网卡默认的驱动名称，比如 RT3070 默认的的就是 _rt2800_。

然后执行：

```
$ sudo vi /etc/modprobe.d/fbdev-blacklist.conf
```
其中黑名单配置的位置和文件名不同的发行版本有可能不一样。Raspberry 的就是上面命令中的名字。然后将第一步中找到的驱动模块名称添加到黑名单：

```
blacklist rt2800
```

2、重启网络服务

```
$ sudo service networking restart
```

3、通过有线接口连接树莓派并登录 Raspberry ，然后重启：

```
$ sudo reboot
```

4、拔掉网线，在路由器管理界面中查看是否有无线网卡获得了 IP ( 通过 MAC 地址判断 )，如果有则新的驱动已经加载并正常使用了。

静态 IP 配置
-

设置静态 IP 后每次登录不用更改 IP，比较方便。主要是修改接口配置文件：

```
$ sudo vi /etc/network/interfaces
```

内容的修改参考如下:

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp
allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet static
address 192.168.1.111
netmask 255.255.255.0
gateway 192.168.1.1
#dns-nameservers 8.8.8.8
```

保存，重启后，路由器管理界面可能暂时看不到设置的静态 IP，但是登录的时候用设置的 IP 登录就可以了。

Q&A
-

- 编译过程报错 __类型不匹配__ ？

> 找到 rt_linux.c，在 Vi 编辑中搜索错误关键词，然后把报错那里的：

> `current_fsuid()` 改成 `current_fsuid().val`；

> `current_fsgid()` 改成 `current_fsgid().val` 。

- 编译从 GitHub 上下载的 Raspberry Linux 源码 ZIP 压缩包的时候提示 *符号描述文件有误*？

解压的过程已经出错，请下载 _.tar.gz_ 源码压缩包重新配置编译。

附录：腾达 MT7601 无线网卡驱动编译说明
-

编译的步骤和上面的 RT3070 是一样的，不同之处仅仅只是需要下载相应网卡的驱动源码。

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

- [_Raspberry PI （树莓派） 使用WIFI连接无线网络 - 解除网线的束缚_](http://tianranzhai.blog.51cto.com/7235933/1213302)