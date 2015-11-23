---
layout: post
title: 在 VirtualBox 中安装 Mac OS X
category: Undefined
tags: [VirtualBox, Mac OS X]
latest: 2015年11月11日 01:05:10
---

纯属娱乐。在非 iMac 机器上安装 OS X 纯属蛋疼和无聊，但是正如玩游戏一样，总有一些时间浪费在一些事情上，而我不玩游戏，这就相当于我的游戏吧。

当然也有可能有的穷 iOS 开发者会有这种需要。

VirtualBox 5.0.4 中安装 Mavericks
-

```
umount /Volumes/Mavericks

hdiutil attach /dev/disk0s2 -mountpoint /Volumes/mnt

cp -rp /Backup/Kexts/ElliottForceLegacyRTC.kext /Volumes/mnt/System/Library/Extensions

cp -rp /Backup/Kexts/FakeSMC.kext /Volumes/mnt/System/Library/Extensions

cp -rp /Backup/Kexts/NullCPUPowerManagement.kext /Volumes/mnt/System/Library/Extensions

# cp -rp /Backup/Kexts/* /Volumes/mnt/System/Library/Extensions

// 把所有拷贝到 /Volumes/mnt/System/Library/Extensions 的内核扩展都赋予与该目录下面扩展一样的权限、拥有者、所属组

chmod -R 0755 /Volumes/mnt/System/Library/Extensions/ElliottForceLegacyRTC.kext

chmod -R 0755 /Volumes/mnt/System/Library/Extensions/FakeSMC.kext 

chmod -R 0755 /Volumes/mnt/System/Library/Extensions/NullCPUPowerManagement.kext

# cd /Volumes/mnt/System/Library/Extensions
# chmod -R 0755 *.kext

chown -R root:wheel /Volumes/mnt/System/Library/Extensions/ElliottForceLegacyRTC.kext

chown -R root:wheel /Volumes/mnt/System/Library/Extensions/FakeSMC.kext 

chown -R root:wheel /Volumes/mnt/System/Library/Extensions/NullCPUPowerManagement.kext

# chown -R root:wheel *.kext

// 然后删除多拷贝过去的 .kext，否则会出现启动卡死的情况 ( 除了上面三个都是多余，可用 `ls /Backup/Kexts/` 查看 )

rm -rf AppleIntelExxxx.kext
rm -rf Vxxxxx.kext

hdiutil detach /Volumes/mnt

如果 _Video info_ 中没有 1366x768x32 的分辨率，则需要退出 VirtualBox 后添加该分辨率

```
VBoxManage setextradata "Mavericks" "CustomVideoMode1"  "1366x768x32@60"
```

然后进入 Mavericks 并执行：

```
"Graphics Mode"="1366x768x32@60" -fv
```

Enter, 进入系统。其中 -fv 是如果进入系统失败后需要带上的启动参数。

- Apache Http Server

```
sudo apachectl start // 启动服务
sudo apachectl stop // 关闭服务
sudo apachectl restart // 重启服务
```

- Apache 中启用 PHP 模块

```
cd /
```


其他
-

- **DMG 转换成 ISO 文件。**

通过 dmg2iso。命令运行格式：

```
dmg2iso.exe 空格 filename（待转换文件名）.dmg 空格 filename（转换后文件名）.iso
```
- **如何跳过变色龙启动菜单直接进入 Mavericks?**

- **VirtualBox 中虚拟机与主机网络连接？**

参考
-

- [在 Win 7 下使用 VirtualBOX 虚拟机安装 OS X 10.9 Mavericks 及 Xcode 5 ](http://bbs.feng.com/read-htm-tid-7625465.html)

- [在 Win 7或8 下使用 VirtualBOX 虚拟机安装 OS X 10.10 Yosemite 及 Xcode 6.1](http://bbs.feng.com/read-htm-tid-8474315.html)

- [VirtualBox 安装 Mac OS X 10.9 Mavericks 小记](http://wenzhixin.net.cn/2014/02/10/vbox_mac_install)

- [VirtualBox中更改OS X Mavericks的分辨率](http://blog.csdn.net/newborn2012/article/details/28419785)

- [How to download Xcode 4 / 5 / 6 / 7 and get the DMG file?](http://stackoverflow.com/questions/10335747/how-to-download-xcode-4-5-6-7-and-get-the-dmg-file/10335943#10335943)
