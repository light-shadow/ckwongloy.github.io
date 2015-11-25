---
layout: post
title: 在 VirtualBox 中安装 Mac OS X
category: Undefined
tags: [VirtualBox, Mac OS X]
latest: 2015年11月11日 01:05:10
---

纯属折腾娱乐。在非 iMac 机器上安装 OS X 显得是比较蛋疼和无聊，但是正如玩游戏一样，总有一些时间去做一些 “好玩” 的事情，而我不玩游戏，这就相当于我的游戏吧。

当然，跟装黑苹果一样，也有可能有暂时比较穷的 iOS 开发学习者会有这种需要。此外，个人认为 Mac OS X 以及 iOS 做的比较好地方有：优雅美。然后内置词典可以最快速的查到某个单词的意思，这对有英语学习需求的人，比如码农，应该是比较节约时间的。

本文以 VirtualBox 5.0.4 中安装 Mavericks 举例说下过程。

### 0、 准备工作

必要的软件下载有：

- VirtualBox，最新几个版本 (4.x+ ~ 5.x+) 都可以，太老的没用过。

- Mavericks ISO 镜像，网上都有直接搜 _OSXMavericks2.iso_ 就行了。

- 变色龙引导，搜：HackBoot_Mav.iso。

### 一、 在 VirtualBox 中新建虚拟机

基本操作就省略了，只说对虚拟机的设置有哪些需要注意，有些参数只是我的个人建议设置，仅供参考。假设新建的虚拟机名字就叫 Mavericks。

- 虚拟硬盘的大小：50G。我安装的时候选择的 30 G，后来更新系统加安装一些软件后感觉有点不够用了。如果你硬盘容量还有其他用处，那就选择动态分配吧。

- 内存：3072M。(这个至少 2 G 吧)

- 显存：128M。

- EFI 是否开启：如果不需要变色龙引导 Mavericks 就不要开启，即直接进入 Mavericks，但是如果需要变色引导，就不要开启。

### 二、 开始安装 Mavericks

1、 启用 Mavericks 虚拟机后，从存储中选择 HackBoot_Mav.iso，进入变色龙引导界面。

2、 移除变色龙的虚拟光驱，加载 Mavericks.iso，然后再变色龙界面按 F5 刷新，正常情况图标中的字会变为 OS X Base。

3、 启动安装程序。可以带参数启动，也可以不带，这里安装的过程可以不带，直接进入安装界面。

4、 选择磁盘工具抹盘。由于只有一块只用于安装 Mavericks 的虚拟硬盘，所以不要犹豫，命名后直接格式化。然后退出磁盘工具，选择才格式化的分区确认进入安装进程。

5、 正常情况大约半个小时后会安装结束 ( 没想到 SSD 安装 Mac OS X 也这么慢 )，重启过程中强制关机，然后从步骤 1 重新开始进入安装界面，即要执行到第 3 步。接下来添加系统扩展。

### 6、 添加系统扩展

重新进入安装界面，然后选择 "终端"，输入以下代码：

```
umount /Volumes/Mavericks

hdiutil attach /dev/disk0s2 -mountpoint /Volumes/mnt

cp -rp /Backup/Kexts/ElliottForceLegacyRTC.kext /Volumes/mnt/System/Library/Extensions

cp -rp /Backup/Kexts/FakeSMC.kext /Volumes/mnt/System/Library/Extensions

cp -rp /Backup/Kexts/NullCPUPowerManagement.kext /Volumes/mnt/System/Library/Extensions

# 也可以一次性用: cp -rp /Backup/Kexts/* /Volumes/mnt/System/Library/Extensions
# 然后把所有拷贝到 /Volumes/mnt/System/Library/Extensions 的内核扩展都赋予与该目录下面扩展一样的权限、拥有者、所属组
# 只是 /Backup/Kexts/ 中的有些扩展不是必须

chmod -R 0755 /Volumes/mnt/System/Library/Extensions/ElliottForceLegacyRTC.kext

chmod -R 0755 /Volumes/mnt/System/Library/Extensions/FakeSMC.kext 

chmod -R 0755 /Volumes/mnt/System/Library/Extensions/NullCPUPowerManagement.kext

# 也可以一次性用: 
# cd /Volumes/mnt/System/Library/Extensions
# chmod -R 0755 *.kext

chown -R root:wheel /Volumes/mnt/System/Library/Extensions/ElliottForceLegacyRTC.kext

chown -R root:wheel /Volumes/mnt/System/Library/Extensions/FakeSMC.kext 

chown -R root:wheel /Volumes/mnt/System/Library/Extensions/NullCPUPowerManagement.kext

# 想偷懒的也可以使用: chown -R root:wheel *.kext
# 然后删除多拷贝过去的 .kext，否则有可能会出现启动卡死的情况 ( 除了上面三个都是多余，可用 `ls /Backup/Kexts/` 查看，确认一下 )，大致名称如下，无需记忆，table 键会自动补全要删除的扩展名

rm -rf AppleIntelExxxx.kext
rm -rf Vxxxxx.kext

hdiutil detach /Volumes/mnt
```

### 三、 Mavericks 全屏分辨率设置

VirtualBox 的增强功能中没有对 Mac OS X 优化，所以不能像安装 Linux 或者 Windows 虚拟机那样通过安装 VirtulBox 增强功能的方式实现全屏或者文件共享。

首先 VirtulBox 中要有你的物理机的实际分辨率，如果通过变色龙引导中的 Video info 没有找到 1366x768x32 的分辨率 (你的可能不一样)，则需要 **退出 VirtualBox 后** 先手动添加该分辨率。

进入 VirtualBox 的安装文件夹中，打开命令行，执行：

```
VBoxManage setextradata "Mavericks" "CustomVideoMode1"  "1366x768x32@60"
```

然后进入 VirtualBox，按照上面的步骤启动 Mavericks 虚拟机后进入变色龙引导界面，现在不要再加载 Mavericks.iso 了，然后选择 Mavericks 的安装盘，并输入：

```
"Graphics Mode"="1366x768x32@60" -fv
```

Enter, 进入系统。其中 `-fv` 是如果进入系统失败后需要带上的启动参数。

四、 安装结束后系统的进一步设置与更新
-

### 更新 Mavericks 至 10.9.5

进入 App Store 中，选择所有更新就好。刚开始我也担心更新后系统不能用了，可是后来发现是我想多了，如果你不幸更新后无法进入系统，建议可以试试重新进入安装界面查看第一次安装好的系统扩展是否还在，如果没有就重新安装那几个扩展。

### 更改用户头像、时区和 iCloud 账户

头像的更改直接从 Finder 中将图片拖到头像修改框中就行了，至于 iCloud 账户，个人认为如果需要和 iPhone 实时同步的话，设置了收 iMessage，邮件等还是很方便的。

### 安装一些常用的软件

中文输入法，聊天工具等最好是从 App Store 中下载，App Store 中没有的再去网上照有没有相应的 Mac 版本的软件。

其中，很多网页需要 Adobe Flash，可以在网上搜：AdobeFlashPlayer_19_a_install.dmg 在线下载安装。貌似 Safari 对 Flash 代码不友好，所以你有可能遇到下载 Adobe Flash 的页面不正常。所以建议先把 Chrome 装了，再用 Chrome 下载 Flash。( 假设你也是 Chrome 的粉丝的话 )

Mavericks 中开发环境搭建
-

### 安装 Command Line Tools

可以直接去 App Store 中下载安装 Xcode，也可以直接在终端中输入一些常见开发工具命令，比如 `gcc`, `git`, `java` 等，系统会自动提醒你安装。

### Apache

Mavericks 上默认已经安装好了 Apache，但是是 2.2 版本的，可以去下载 Apache 2.4 的源码包，编译安装最新更新。

常用的命令有：

```
sudo apachectl start    // 启动服务
sudo apachectl stop    // 关闭服务
sudo apachectl restart    // 重启服务
```

#### **Apache 中启用 PHP 模块**

```
cd /etc/apache2/
sudo vi httpd.conf
```

怎么配置和在 Linux 和 Windows 上的一样。

### PHP

Mavericks 默认也安装了 PHP，不过版本有点旧，是 5.4，强烈建议手动重新编译安装最新稳定版本的 PHP (5.6.1x)。

### MySQL

Mavericks 上默认没有安装 MySQL，但是可以去 Oracle 官网下载源码包或者直接下载 dmg 镜像直接安装。

### Nginx

直接编译安装 Nginx 源码包，具体配置类似 Linux 下编译安装的步骤。

### Ruby -> Jekyll

Mavaricks 默认安装过了 Ruby，Jekyll 的安装如果你需要在本地调试博客页面的话建议安装。以前的博文说过步骤，简单点说就是：换淘宝 ruby 源 -> `gem install github-pages`。

### Sublime Text

个人很喜欢，写代码很有感觉，也比较高效，更多的使用心得我写过专门的博文。Sublime 2/3 直接去官网下载就行了。

附录：Mac OS X 键盘快捷键
-

### 与 PC 机不同的三个基本功能键盘

- Command ⌘

- Option ⌥

- Control ⌃

如果键盘是 PC 机键盘，需要使用 Alt 键盘代替 Option 键；用 Windows 徽标键代替 Command 键；

### 组合快捷键

- **隐藏 APP 窗口**：Command + H 隐藏最前面的 APP; Command + Option + H 隐藏所有除了最前面的 APP 外的其他所有 APP。

- **最小化窗口**：Command + M 最小化最前面的窗口至 Dock；Command + Option + M 最小化所有窗口至 Dock。

- **新建**：Command + N。

- **打开**：Command + O。

- **关闭窗口**：Command + W 关闭最前面的窗口，Command + Option + W 关闭该 APP 的所有窗口。

- **退出 APP**：Command + Q。

- **强制退出**：Command + Option + Esc。

- **Spolight 搜索**： Command + Space。

- **切换 APP**：Command + Tab/~。Tab 往右切换，~ 往左切换。

- **切换窗口**：Command + Shift + ~。

- **偏好设置**：Command + ,。

### **文档编辑快捷键**

- **跳至行首**：Control + A。

- **跳至行尾**：Control + E。

- **带样式复制粘贴**： Command + Option + C/V。

### Q&A

- 如何解决一点击系统偏好设置就退出登录的问题？

这个问题是在更新 Mavericks 之后出现的，刚安装完就可以直接查看系统信息。

- Mac OS X 为什么适合做开发？

玩游戏不方便。( 哈哈 )

### 其他

- **DMG 转换成 ISO 文件。**

通过 dmg2iso。命令运行格式：

```
dmg2iso.exe 空格 filename（待转换文件名）.dmg 空格 filename（转换后文件名）.iso
```

- **如何跳过变色龙启动菜单直接进入 Mavericks？**

- **VirtualBox 中虚拟机与主机网络连接？**

### 参考

- [_在 Win 7 下使用 VirtualBOX 虚拟机安装 OS X 10.9 Mavericks 及 Xcode 5_](http://bbs.feng.com/read-htm-tid-7625465.html)

- [_在 Win 7或8 下使用 VirtualBOX 虚拟机安装 OS X 10.10 Yosemite 及 Xcode 6.1_](http://bbs.feng.com/read-htm-tid-8474315.html)

- [_VirtualBox 安装 Mac OS X 10.9 Mavericks 小记_](http://wenzhixin.net.cn/2014/02/10/vbox_mac_install)

- [_VirtualBox中更改OS X Mavericks的分辨率_](http://blog.csdn.net/newborn2012/article/details/28419785)

- [_How to download Xcode 4 / 5 / 6 / 7 and get the DMG file?_](http://stackoverflow.com/questions/10335747/how-to-download-xcode-4-5-6-7-and-get-the-dmg-file/10335943#10335943)

- [_Mac 键盘快捷键 - Apple 支持_](https://support.apple.com/zh-cn/HT201236)
