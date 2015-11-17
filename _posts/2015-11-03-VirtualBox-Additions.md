---
layout: post
title: VirtualBox 增强功能：全屏分辨率，文件共享
category: Auxiliary
tags: [VirtualBox, Linux, Windows]
latest: 2015年11月07日 21:52:37
---

只要使用 VirtualBox 跑虚拟器，为了更好的体验，增强功能是必须安装的。

首先，去下载 VirtualBox 对应的 Oracle_VM_VirtualBox_Extension_Pack-xxxx.vbox-extpack，然后在 “管理” -> "全局设定" -> “扩展” ，添加该扩展。

本文的主机是 Windows 10，虚拟机有 Linux，Windows，Mac OS X。由于 VirtualBox 暂不提供 OS X 的增强功能，所以下面只总结下在 Windows 主机上与 Linux、Windows 虚拟机文件共享，以及相关虚拟机分辨率的调整等步骤。

Windows 主机上的 Linux 虚拟机
-

### **Linux 虚拟机全屏分辨率调整**

在虚拟机菜单的 “设备” 选项中选择 "安装增强功能"，当 Linux 虚拟机中识别到光盘  VirtualBox Additions 后，进入光盘目录，打开终端，执行如下命令：

```
$ sudo ./VBoxLinuxAdditions.run

# 如果出现错误提示，执行：
# $ sudo sh VBoxLinuxAdditions.run
```

如果 Linux 虚拟机上安装过了 GCC 和与正在使用的内核版本一致的 Linux-Header，正常情况下都能顺利安装增强功能。

在 CentOS 7.0 和 Kali 2.0 下到这就能正常显示为电脑实际屏幕的大小了。但是 Fedora 23 Xfce 下却仍然没有反应，这可能与 Xfce 这一 X 桌面的版本有关，CentOS 下的 KDE 桌面就可以安装成功。此外，后来发现，Fedora 23 Xfce 无法通过 `dnf` 安装对应版本的 Linux-Header，所以无法编译增强功能代码，因此无法开启全屏分辨率。

如果在 CentOS 7 上直接通过终端进入安装光盘所在目录，则执行：

```
cd /run/media/user_name/VBOXADDITION_5.x.xxx
```

##### **注意**

`user_name` 和 `5.x.xxx` 需要根据实际情况修改，分别是登录的用户名和 VirtualBox 版本号。

> **说明：如果 Linux 内核升级，那么需要重新编译安装  VirtualBox 增强功能。**

### **Windows 主机和 Linux 虚拟机文件共享**

1、 选择共享路径

在 Linux 虚拟机菜单中选择 "设备" -> "共享文件夹"，然后选择 Windows 主机上想要共享给 Linux 的文件夹路径，比如：`C:/__SHARE__`,然后勾选上 "自动挂载" 和 "固定分配"。

2、 在 Linux 虚拟机上挂载该共享的文件夹

```
$ sudo mount -t vboxsf __SHARE__ /mnt/share/
```

然后进入 _/mnt/share_ 目录，就可以看见共享的文件了，其中 _share_ 可以自定义。

3、 设置开机自动挂载共享文件夹

设置自动挂载，重启 Linux 虚拟机后可以直接进入共享路径而不用每次执行上面的命令手动挂载。

```
$ cd /etc/fstab

$ __SHARE__ /mnt/share vboxsf rw,gid=110,uid=1100,auto 0 0
$ umount -f /mnt/share
```

Windows 主机上的 Windows 虚拟机
-

### **Windows 虚拟机全屏分辨率调整**

Windows 虚拟机的增加功能很好安装，使用也很简单。只需在虚拟机菜单的 “设备” 选项中选择 "安装增强功能"，当 Windows 虚拟机识别到安装光盘后，进入文件夹选择相应的系统位数进行安装即可，安装过程和在 Windows 下的软件安装一样，很简单就不说了。

安装结束后，一般重启后就能正常使用，不像 Linux 虚拟机，Windows 虚拟机安装 VirtualBox 增强功能很少出现问题。

### **Windows 主机和 Windows 虚拟机文件共享**

和 Linux 虚拟机一样，仍然需要现在 VirtualBox 中选择需要共享给 Windows 虚拟机的路径，这里仍然是 `C:__SHARE__`。

- 如果 Windows 虚拟机版本是 XP，则需要在 **网上邻居** 中添加共享位置

在网上邻居面板中，选择 "添加网络邻居"，之后选择 VirtualBox Server，然后就可以看到共享出来的文件夹，选择，确定，退出，就可以访问和 Windows 主机的共享文件了。

FAQ
-

- __the header from the current runing kernel were not found__？

```
# 1. RedHat 系执行
$sudo yum install linux-headers-$(uname-r)
# 或者
$sudo yum install linux-headers-$(uname-r)

# 2. Debian 系执行
$sudo aptitude install linux-headers-$(uname-r)
```

如果上面的命令执行失败，则尝试：

```
# 1. RedHat 系执行
# yum update
# yum install kernel-devel kernel-headers 
# yum install gcc

# 2. Debian 系执行
# apt-get update
# apt-get upgrade 或者 apt-get dist-upgrade
```

- **Fedora 23 Xfce 无法全屏？**

1、 试试修改分辨率：

```
# vi /etc/X11/xorg.conf
```

找到：

```
SubSection "Display"
      Depth 24
```

下面加上一句 `Modes "1366x768"`，然后重启系统，其中分辨率需要根据显示器实际大小设置。

##### **说明**

如果显卡是集成的，则不会有 `/etc/X11/xorg.conf` 这个文件，所以不能通过这种方式实现全屏。

2、 通过工具

```
$ sudo yum install system-config-display -y 
```

安装成功后，执行：

```
$ system-config-diaplay 
```

然后进去根据你实际的显示器分辨率设置即可。

参考
-

- <http://www.cppblog.com/TianShiDeBaiGu/archive/2010/05/04/114360.aspx>

