---
layout: post
title: Windows 个人经验
category: Auxiliary
tag: Windows
latest: 2014年06月19日 14:52:41
---

第一次接触电脑然后接触 Windows 是小学，不过那时候一点感觉没有。

Windows XP
-

XP 我用了一年多，个人觉得还是很经典的。

安装 Windows XP

（Windows XP_SP3_x86 安装序列号：MRX3F-47B9T-2487J-KWKMF-RPWBY）

1. U 盘 PE 安装 Win7 失败(不能识别驱动器)解决方法？  
（c:\boot\bootsect.exe /nt60 c:）
【第 1 种方法】
    先格式化一下你要装的那个盘，然后拔出U盘，啥也别动，只拔出U盘就行，再装上
  U盘，然后刷新一下（选硬盘那里的高级选项中有格式化和刷新），再选择要安装的
  硬盘点下一步，就可以正常安装了。

【第 2 种方法】
第 1 步：把 Win7 镜像放在你电脑的非系统盘的其他硬盘上。

第 2 步：重启机器，通过 U 盘启动进入 Win PE 系统。
—— 可以把 Win PE 理解为一个微缩版的 Windows XP ，它和 XP 使用差不多，只是大部分的功能被禁用了，所以它的体积也非常小，虽然大部分的功能被禁用，可是他不影响第三方软件使用，比如 Ghost、PQ 等一些软件依旧在 Win PE运行自如。

第 3 步：把 Windows 7 的 ISO 镜像解压到电脑的非系统盘的其他硬盘上，如 D:\Windows 7\...

第 4 步：进入Win PE，格式化 C 盘为 NTFS 。
—— C 盘最好有 15G 以上的空间，安装完 Windows 7 大概要用8G。

第 5 步（最关键一步）： 从你解压的安装程序的文件夹中找到 boot、bootmgr 和 sources 这三个文件夹，并且复制到C盘根目录下。

第 6 步：在 Win PE 中打开 cmd 命令行 ，输入 c:\boot\bootsect.exe /nt60 c: ，回车，看到提示 successful 字样，然后重启。

第 7 步：把 U 盘从电脑中拔出，取出 U 盘，然后从硬盘启动即可进入 Windows 7 的安装。
—— 注意 exe 和 /nt60 、/nt60 和 c: 之间有空格。

Windows XP下硬盘 IDE 转AHCI


条件与准备：相应的AHCI驱动，此次用的是HM65芯片组的硬盘驱动，驱动是从32位Windows 7里通过驱动精灵备份出来的。

以 HM65 芯片组举例，因为官网只提供 Win 7 的硬盘驱动程序。

理论上只要芯片组相同，硬盘驱动就能通用（如主板芯片组为HM55的就下载HM55的驱动）。

用图文说明：打开设备管理器，展开IDE控制器，可以看到6项，其中的两个Intel(R) 6 Series……便是HM65对应的硬盘和光驱：

![设备管理器-IDE控制器](http://ww3.sinaimg.cn/mw690/00644Sdogw1ewzhnrwfypj30ho0cltam.jpg)

右键，更新驱动程序，以下有每步的截图：

先选择标准双通道IDE,以免直接更替为AHCI导致蓝屏，

把另一个Intel(R) 6 Series……也替换为标准双通道IDE，如果询问说需要重启，一律点“否”：

然后将标准双通道IDE再一一更新为AHCI驱动：

其它步骤和上文相同，下面选择从磁盘安装；

找到并选择您的驱动（如果是通过驱动精灵备份出来的驱动显示的就是oem之类的名字）：

选择iaAHCI.inf后，会出现很多驱动程序，这里我们需要的是下面这个：

不要被下面这个警告吓到，点“是”。

把两个驱动程序都更新成AHCI后，出现如下画面，重启。

如果在这步安装的时候蓝屏了，也不需理会，直接重启即可：重启后重新打开设备管理器，重新更新这个驱动。

这时不要从硬盘安装了，直接让它自动查找与安装（即默认下一步下一步即可）：

安装完重启将BIOS中的硬盘模式改回AHCI，如果XP滚动条出现了，那么你就大功告成了！

附：HM65芯片组的硬盘ACHI接口驱动地址：<http://ishare.iask.sina.com.cn/f/20352228.html>


Windows 7
-

32 位 Win7 的 command.com 程序仍然保留，所以可以使用执行汇编的 debug 程序，以及 edit.com 编辑器。

Windows 8/8.1
-

Windows 8 只体验了很短的时间就重装系统了，所以下面的内容是针对 Windows 8.1 的，不过我觉得很多操作和 Win8 也能适用。

安装 Windows 8.1 

（Windows 8.1_x64 专业版安装密钥：XHQ8N-C3MCJ-RQXB6-WCHYG-C9WKB）

1. Windows 8.1 如何将“公用网络”更改为“专用网络 ”?

①. 首先成功连接需要更改网络类型的网络;
②. Win+I快捷键打开设置菜单,选择右下角的“更改电脑设置”;
③. 在“电脑设置”左侧选择“网络”;
④. 选择已经连接好并需要更改的网络;
⑤. 找到“查找设备和内容”,滑块为“开”则表示“专用网络”,“关”则表示“公用网络。

2. Windows 8/8.1 上网受限怎么办？

遇到过，路由器重新连接，重启即可。但是却产生了“网络2”问题。

- 法一

了解你的上网情况，是通过别人路由器还是自己的账号，设置了IP过滤,防止别人用软件破解蹭网,结果我只需重新为笔记本填加个mac地址,结果就可以上了.
1.首先用自带的诊断工具看看问题在哪能否解决；
2.看看是有线还是无线，先禁用后重启试试；
3.检查IP地址有无问题，手动设置静态IP试试；
4.WirelessZero Configuration服务有无开启
5.更换无线网卡的ibss工作模式试试
6.管理员权限问题,可以通过取得权限来实现：
打开C:\Windows\System32\LogFiles\WMI,然后右击WMI文件管理员取得权限；
（说明一下：执行完后需要先注销用户，重启，或者将网络重启，等待一会儿）
win8中管理员的权限获得方法如下：运行gpedit.msc
开启组策略，然后一步步地在“计算机配置”-“Windows 设置”-“安全设置”-“安全选项”，找到右侧的
“用户账户控制：以管理员批准模式运行所有管理员”这个项，你会看到这个项默认是启用的，把它设成禁用。
自动运行管理员权限脚本代码：

```
@ECHO OFF
takeown /f "C:\Windows\System32\LogFiles\WMI" /r /d y && icacls "C:\Windows\System32\LogFiles\WMI" /grant administrators:F /t
```

7.如果我们是通过DHCP获取上网的IP地址的话，这时可以利用ipconfig /release命令释放现有的IP地址信息，然后利用ipconfig /renew从DHCP获取合适的IP地址。
这种方法能解决部分没有获取到正确IP地址信息、DNS等情况，有时候在有DHCP的环境下手动配置了IP地址也会处于连接受限制或在网络图标上显示感叹号!
这时候需要把IP地址设置成动态获取。

- 法二

第一步，找到Surface中的“搜索”功能
在” 搜索 “框中，键入“ CMD “。结果将显示在“ 命令提示符 “中。
在命令提示符中下滑动打开应用程序栏，选择“ 以管理员身份运行 “。
命令提示符将打开在桌面上。把一下文字键入或复制进去

```
netshinttcp set heuristics disabled
```

 按回车。你会看到“ OK “。现在，键入以下内容：

```
netshinttcp set global autotuninglevel=disabled
```

按回车。你会看到“ OK “。现在键入以下内容：:

```
netshinttcp set global rss=enabled
```

按回车。你会看到“ OK “。现在键入以下内容

```
netshinttcp show global
```

现在你会看到一些设置，除了一两个之外他们都被禁用了，如果只有一个没有被禁用的话，你的问题就解决

###### 提示

以上3条命令操作都是针对Win8本地网络TCP/IP协议配置优化设置，使Win8的TCP/IP协议能获得更广泛的兼容性，从而解决Win8网络受限的问题。
对于如果是拨号用户遇到了网络连接受限制，多数是网络问题或者猫的故障，大家可以咨询下网络商或者换个Win7或者XP电脑去测试下网络是否可用。

8.无线网络属性-高级设置-为此网络启用联邦信息处理标准(FIPS)兼容(F)

3. Windows 8/8.1 如何删除“网络二”字样？

编辑注册表，运行 -->  regedit，找到以下 2 条路径删除即可:

```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Profiles
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged
```

4. 如何优化 Windows 8/8.1 的网络？

以下3条命令操作都是针对 Win8 本地网络 TCP/IP 协议配置优化设置，使 Win8 的 TCP/IP 协议能获得更广泛的兼容性，从而解决 Win8 网络受限的问题：

```
netsh int tcp set heuristics disabled
netsh int set global autotuninglevel=disabled
netsh int tcp set global rss=enabled
```

5. 在 64 位 Windows 7 和 Windows 8/8.1 Debug 无法使用怎么办？


1.下载两个文件：DOSBox.exe和Debug.exe解压到D（某盘）:\Debug（某文件夹）
2.打开DOSBox,输入mount C D（某盘）:\Debug（某文件夹）
（注：mount是挂载文件操作，有需要可以百度了解一下）
然后输入C：，再输入debug就可以进入debug，输入q退出Debug

6. 如何删除 Windows 不再使用的任务栏图标和通知图标？


修改注册表，找到路径：

HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\CurrentVersion\TrayNotify

删除下面 IconStreamsPastIconsStream 两键值即可。

修改结束后重启计算机或者同按 Ctrl+Shift+Esc 调任务管理器结束 explorer.exe 进程稍等片刻再同按 Ctrl+Shift+Del 调出任务管理器。

点击 文件 -> 运行新任务，输入 explorer 并确定，任务栏便重新出现且通知区域内那些失效程序的图标已经消失。

Windows 10
-

#### Windows 10 强迫症 ( 技术预览版 )

恢复任务栏搜索.reg

```
Windows Registry Editor Version 5.00
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search]
"EnableProactive"=dword:00000001
```

恢复任务栏虚拟桌面按钮.reg

```
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MultitaskingView\AllUpView]
"Enabled"=dword:00000001
```

禁用任务栏搜索.reg

```
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Search]
"EnableProactive"=dword:00000000
```

禁用任务栏虚拟桌面按钮.reg

```
Windows Registry Editor Version 5.00
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\MultitaskingView\AllUpView]
"Enabled"=dword:00000000
```

1. 如果通过 Windows 8.1 升级 Windows 10 会怎样？

—— 如果通过微软的推送通知直接升级 Windows 10  的话，点击确定后会在后台下载 Windows 10 的安装文件到 C  盘。

![免费升级win10](http://ww3.sinaimg.cn/mw690/00644Sdogw1ewzhnta5glj30mx0enn0o.jpg)

![Win10更新推送](http://ww3.sinaimg.cn/mw690/00644Sdogw1ewzhnu3z1rj30lj0cs0uu.jpg)

![windows10重置此电脑](http://ww1.sinaimg.cn/mw690/00644Sdogw1ewzhnsjkm3j30m60hjq4m.jpg)

这种升级方式会产生 Windows.old 文件夹，如果不需要还原则可以进行磁盘清理删除旧系统。

![Windows.old](http://ww2.sinaimg.cn/mw690/00644Sdogw1ewzhnupft2j30bo0h3jt5.jpg)

Windows 10终于正式发布了。正版的Windows 7/8.1用户可以坐等推送、免费升级，参与了Windows Insider内测项目的贡献者们也可以轻松“转正”，那么其他人呢？

一定要购买吗？如果我只是想尝尝鲜，该怎么激活Windows 10呢？

虽然微软一代又一代地升级着反制技术，但是道高一尺魔高一丈，激活永远不会是个问题。

就在刚刚，国外高手就放出了Windows 10的激活方法，虽然不是一键式的但也很简单。

Windows 10安装完毕后，首先以管理员身份打开 CMD 命令行窗口。

专业版用户请依次输入：
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.xspace.in
slmgr /ato

企业版用户请依次输入：
slmgr /ipk NPPR9-FWDCX-D2C8J-H872K-2YT43
slmgr /skms kms.xspace.in
slmgr /ato

另外还有一批其他秘钥，大家可以自行体验，部分如下：
专业版：VK7JG-NPHTM-C97JM-9MPGT-3V66T
企业版：XGVPP-NMH47-7TTHJ-W3FW7-8HV2C
教育版：YNMGQ-8RYV3-4PGQ3-C8XTP-7CFBY
专业版N：2B87N-8KFHP-DKV6R-Y2C8J-PKCKT
企业版N：WGGHN-J84D6-QYCPR-T7PJ7-X766F
教育版N：84NGF-MHBT6-FXBX8-QWJK7-DRR8H
企业版S：FWN7H-PF93Q-4GGP8-M8RF3-MDWWW
单语言版：BT79Q-G7N6G-PGBYW-4YWX6-6F4BT

http://news.mydrivers.com/1/440/440540.htm