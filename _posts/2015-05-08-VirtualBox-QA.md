---
layout: post
title: VirtualBox Q&A
category: Auxiliary
tag: VirtualBox
latest: 2015年05月08日 19:33:47
---

VirtualBox 使用中的问题及其解决办法。

提示：安装好 virtualbox 后还要安装 virtualbox-extend 扩展包。

1. VirtualBox 安装 Mac OS X Mavericks？
-

系统类型选择 64 位 ->

设置中取消启用 EFI ->

显示启用 3D 加速，显存设置最大 ->

CPU 核心数和计算机实体机一致 ->

"存储" 中 添加光驱选择 HackBoot_Mav.iso ->

启动虚拟机，加载  Mac OS X Mavericks 的 iso/dmg 镜像，f5 刷新 enter  进入安装界面 ->

使用菜单的实用工具、磁盘工具、格式化虚拟硬盘 ( 左边点选硬盘, 选择 "抹掉", 名称 Name 录入 "Mavericks",  然后点击 Erase 抹掉  ) ->

格式化完毕，关闭磁盘工具后，点选 Mavericks 磁盘, 点击安装。

2. 虚拟机与实体机之间如何共享文件？
-

```
mount -t vboxsf share mount_point
```

3. Fedora 21 开机黑屏怎么办？
-

能进入字符界面（ctrl+alt+f2）的话，登录 root：`startx`。

但是此次进入桌面后又得重新设置桌面，系统语言成了半汉语半英语。

4. 虚拟机上安装多系统？
-

### 参考

+ [VirtualBox 5.0.4 中文参考手册]( https://github.com/lamChuanJiang/VirturalBox-User-Manual-5.0.4-zh)
