---
layout: post
title: VirtualBox Q&A
category: Auxiliary
tag: VirtualBox
latest: 2015年05月08日 19:33:47
---

VirtualBox 使用中的问题及其解决办法。

##### **提示**

安装好 Virtualbox 为了一些必要的功能，比如屏幕分辨率的设置，共享文件夹的设置，以及对 USB 设备的设置等都需要安装 virtualbox-extend 扩展包。

安装增强功能就直接进入虚拟机中在菜单中选择 "设备" -> “安装增强功能”

**1. 虚拟机与实体机之间如何共享文件？**
-

本例子在 CentOS 7.0 KDE 下测试通过。具体步骤如下：

1. 在主机 ( 比如 Windows ) 上新建一个文件夹专门用于与 Linux 进行文件共享，比如 C:/Share。

![Windows 上的共享文件夹](http://ww1.sinaimg.cn/bmiddle/00644Sdogw1exrjo44bnzj30ia02v74j.jpg)

2. 在虚拟机中安装增强功能，当挂载 VirtualBox 增强功能安装镜像成功后，进入该目录，执行：

```
# ./VBoxLinuxAdditions.run
```

如果执行失败，可以尝试使用：

```
# sh VBoxLinuxAdditions.run
```

或者

```
# bash VBoxLinuxAdditions.run
```
3. 在 Linux 下的 /mnt 目录下创建一个用于共享的目录，比如 share。

```
# cd /mnt
# mkdir share
```

4. 在 Linux 虚拟机中选择 Windows 下用于共享的文件夹目录，选择 "固定分配" + "自动挂载"。
自动挂载后重启虚拟机后共享文件夹仍然生效。

5. 安装成功后然后执行：

```
# mount -t vboxsf Share /mnt/share
```

如果不出意外，进入 /mnt/share 目录下就可以查看到放在共享文件夹中的文件了。

虚拟机中的操作完整过程如下：

![CentOS7安装增强功能](http://ww2.sinaimg.cn/bmiddle/00644Sdogw1exrjo36dojj30f10fnwh9.jpg)

其他
-

- 手动设置自动挂载：可以在/etc/fstab 中添加一项

```

Share /mnt/share vboxsf rw,gid=110,uid=1100,auto 0 0

```

- 卸载挂载点

```
# umount -f /mnt/share
```

3. Fedora 21 开机黑屏怎么办？
-

能进入字符界面（ctrl+alt+f2~f6）的话，登录 root：`startx` 或者 `startxfce4`。

但是此次进入桌面后又得重新设置桌面，系统语言成了半汉语半英语。

4. 虚拟机上安装多系统？
-

### 参考

+ [VirtualBox 5.0.4 中文参考手册]( https://github.com/lamChuanJiang/VirturalBox-User-Manual-5.0.4-zh)
