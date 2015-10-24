---
layout: post
title: Windows Q&A 与冷知识
category: Auxiliary
tags: [Windows, FAQ, 冷知识]
latest: 2015年06月19日 14:52:41
---

在整个使用 Windows 的过程中，个人遇到的一些问题集中到这里。

1. Windows 系统目录功能说明？

Appdata 与 Local Roaming LocalLow

自 Vista 及 Win7 开始，微软更改了原有的应用程序存储目录结构，（XP 是 Application Data）系统盘：用户\用户名\Appdata, Roaming, Local,及 LocalLow三个文件夹.

更改原因如下:

• 优化登录速度
• 根据使用安全级别分别访问不同文件夹

Windows 使用 Local及LocalLow文件夹存放非漫游的应用程序数据（类似注册表 Local_machine ）及一些占用大无法漫游的应用程序数据，而 Roaming 文件夹则用来保存可漫游的用户应用程序数据，如每个用户的个性化设置等。

The Roaming folder is to preserve user data. Imagine a company with 1000 workstations, and employee use different workstations each day. By roaming the user profile data (copy to server), the custom data is always available regardless of any workstation the employee uses.

The applications choose whether to save to local or roaming, and roaming is used by default by most applications, it acts as local to people not on a domain, and to people that are, their settings follow them.

Local is only typically used when explicitly preventing settings following a user across a domain. This will be usually due to size of the settings folder to prevent having to transfer gigabytes across a domain in cases such as cache. For example Chromium (web browser) uses local instead of roaming as it’s cache folder is within the user settings folder. Most other applications separate the cache and settings for this reason.

The naming of local and roaming is unfortunate, as most users at home aren’t on a domain and can easily be confused by such terms.

Roaming is the folder that would be synchronized with a server if you logged into a domain with a roaming profile (enabling you to log into any computer in a domain and access your favorites, documents, etc. Firefox stores its information here, so you could even have the same bookmarks between computers with a roaming profile. It is worth to remember that “Roaming” folder is synchronized with the server meaning bigger the size of roaming folder longer the time required to logon to a PC. The folder “Roaming” by design ensures that ONLY absolutely essential data like “Favorites” “Desktop” and “Documents” travel with the user thereby making it as a roaming profile.

Local is the folder that is specific to that computer – any information here would not be synchronized with a server. This folder is equivalent in XP to C:Documents and SettingsUserLocal SettingsApplication Data.

LocalLow is the same folder as local, but has a lower integrity level. IE8, for example, can only write to the locallow folder (when protected mode is on).


2. 如何取消电脑开机自动硬盘检测？

3. Windows 7下直接开启 ACHI 不蓝屏的方法？


很多朋友都遇到安装Windows后，再在BIOS中去开启SATA硬盘的AHCI功能的话，就会出现无法启动的情况。我最近也在安装Windows7后去开启AHCI时遇到这样的问题，只有改回IDE模式后，系统才恢复正常。经过试验后发现如果是在IDE模式下安装了Windows系统，要在BIOS中将硬盘更改为AHCI模式的话，需要重新安装系统才行。那么有没有不用重装系统，即可以开启硬盘AHCI模式的办法呢?经过一番研究和咨询，终于找到以下办法。

修改注册表后开启AHCI模式
1.单击“开始”按钮，在搜索框中键入“regedit”(如图1)，按下回车键，打开“注册表编辑器”窗口。Windows7虽然在“开始”菜单默认不显示“运行”命令，但实际上可用搜索框代替这一功能(或者直接按下Windows键+R键再输入)。
2.在“注册表编辑器”窗口左侧标题栏定位至 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\msahci分支，然后在右侧窗口，双击 “Start”。
3.在打开的“编辑DWORD值”对话框，将“数值数据”框中的值由3改为数字0(如上图2)，单击“确定”按钮。
4.关闭“注册表编辑器”窗口并重新启动电脑。
5.重新启动电脑时进入BIOS设置界面，将硬盘更改为AHCI模式。例如，针对笔者电脑而言，启动电脑时按F1键进入BIOS，依次选择 Devices→ATADrivesSetup→ConfigureSATAas→AHCI(如图3)，最后按F10键保存并退出BIOS。
按如上所述修改注册表并开启硬盘AHCI模式后，无需重新安装系统即可正常启动了。虽然电脑的启动速度不会有什么变化，但在复制大量文件时，可以看到有一定加速效果。
小结：
当然，大家在具体操作的时候也有几点需要注意的地方。
不同的主板进入BIOS的快捷键和BIOS
中调节AHCI项的位置有所不同，大家可以阅读主板附带的使用手册来确认。
通常情况下，BIOS中默认启用的是硬盘的IDE模式，而AHCI是AdvancedHostControllerInterface的缩写，意为进阶主机控制器介面，它是Intel所主导的一项技术，可以在一定程度上提升SATA硬盘的速度，建议打开。
在WindowsVistaSP1及以后版本的系统中，在BIOS更改硬盘为AHCI模式后，系统会自动安装驱动程序。但是如果你用的是 VistaSP1之前的操作系统，在启动电脑时就需要通过Windows系统的安装光盘手动加载AHCI的驱动了。如果没有Windows系统的安装光盘，请先改回IDE模式，启动电脑后下载并安装AHCI的驱动，然后再进入BIOS将硬盘更改为AHCI模式。


4. Win8 如何安装 IIS 服务？

5. Windows 如何重置网络设置？

①命令

NETSH INT IP RESET 
NETSH WINHTTP RESET PROXY 
IPCONFIG /FLUSHDNS 

②软件

Common Internet Repair

6. Windows 下强力删除软件有哪些方式？

7. 如何为 C 盘瘦身？

虚拟内存转移、关闭休眠

8. 如何查看文件被谁占用？

9. 如何删除多余服务？

sc delete 服务名

10. 为什么耳机插入 Windows 8.1 笔记本后后麦克风（声音输入）可以使用而声音输出不能使用？

有可能是禁用了耳机设备。鼠标 右击任务栏声音图标，选择声音-> 播放。

11. DOS 和 CMD 有什么不同？

DOS

DOS 是 16 位的。

纯 DOS

IO.SYS、MSDOS.SYS 和 COMMAND.COM

纯 DOS 仅用于涉及硬件的底层操作，如分区、刷 BIOS 等。

实模式 DOS

是最常用的 DOS 系统模式，在纯 DOS 基础上加入了 CONFIG.SYS、AUTOUEXEC.BAT 和各种驱动程序、DOS 下的 16 位应用程序等。

保护模式 DOS 与 CMD

进入WINDOWS时代后，WINDOWS3.X和WINDOWS9X系列操作系统（包括WINDOWS ME）本质上都是以DOS为内核的32位保护模式应用程序，顶多是加层壳而已。于是，使用WINDOWS 95/98的用户在“开始”菜单中可以找到一个“msdos方式”（command），那就是“保护模式DOS”，严格来说也是16位的DOS，但是该DOS运行于Windows下。此外，Windows98系统的“关闭系统”选项中有“重新启动并切换到DOS模式下”的选项，就是重启后进入实模式DOS。 

但是，这种情况在NT内核出现后被彻底改变，NT内核是独立的32位操作系统（WINDOWS NT/2000/XP/2003）的核心，不依赖于DOS的16为核心，因此这些操作系统不包括DOS而独立运作。为了照顾大部分习惯于使用命令行（即DOS和CMD都使用的文字界面，这也是大部分人把DOS和CMD“命令提示符”混为一谈的原因）的系统开发和维护人员（因为命令行界面有效率高、指令传输快的优点，因此高级的计算机专家们都不用图形界面），微软在NT系列操作系统中集成了“复原监督台”和“命令提示符”（即“CMD”）两个组件，通过命令行操作WINDOWS。但是事实上这两个组件仅仅是和DOS一样通过命令行操作而已，它们都是32位应用程序（而DOS是16位操作系统）

12. PowerShell 和传统的 CMD 命令行有什么区别？

Windows命令提示符（cmd.exe）是Windows NT下的一个用于运行Windows控制台程序或某些DOS程序的shell程序；或在Windows CE下只用于运行控制台程序的外壳程序。

On the first look PowerShell is pretty similar to cmd. They are both used to run external programs like ping or copy, and give you way to automate tasks by writing a script/batch file. 

But PowerShell is a lot more than that. 
First of all it provides a very rich set of commands (calleds cmdlets) that integrate deeply with windows and most of Microsoft products. Cmdlets like Get-Process which lists active processes.

Another big difference is that the output of this command is not just text, it's collection of objects. This is way superior to outputting just text, because you can easily query any property of the object, like its name or memory consumption. In cmd you'd have to parse the output.

Another great thing about PowerShell is its integration with .NET. You can easily use all the classes defined in .NET to program any functionality cmdlets are missing.

You can also integrate the powershell runtime into .NET applications with ease and consume Output PowerShell obkects directly.

All in all, PowerShell is cmd on steroids that let'a you automate and manage Windows more easily.

微软是一个很”低调”的公司,取名为微软，感觉有“微微软下去”的意思，这是个玩笑了。windows 操作系统 和office办公软件，如此之优秀，微软也没敢命名为PowerOS 和 PowerOffice，但是在Monad（PowerShell的前身）发布后的第二年（2006年），微软就直接就发布了Windows PowerShell 1.0，并且”大言不惭“地命名为PowerShell，这也有点太不淡定了。

今天我根据自己的体验来稍微总结一下为什么PowerShell如此之强大。

破天荒的方便

诸如存储计算中GB，MB，KB单位等；数组声明中的1..n和下标为-1的处理；还有所见即所得，通俗易懂的动词+名词结构Cmdlet。

面向对象

与面向过程，面向文本相比，面向对象更方便更容易描述现实世界，也算赶上了时髦。

绑上.NET这棵大树

正所谓大树下面好乘凉，PowerShell绑上.NET这个大款了，借助.NET Framework平台强大的类库，几乎让一切都成为可能。

强大的兼容性

完全兼容windows 平台上其它调用，如可执行文件(exe)，批处理bat和vb script脚本等。

基于平台的可扩展性

这一条是重点。微软有个优点，与应用相比，它更喜欢做平台。PowerShell 早已变成一个平台，在PowerShell 刚发布的第二年，微软的System Center Operations Manager 和 SharePoint就提供了针对该平台的组件，后来的AD，Hyper-V，Windows Azure，Office 365就更不用说了。除了微软，亚马逊的云平台管理，Dell的out-of-hand 管理，也都提供了基于PowerShell的管理组件。PowerShell 俨然变成了一个标准，变成了一个规范。

13. command.com与cmd.exe 区别

cmd.exe 是 Windows NT 命令行接口，它不是一个 dos 窗口。

而 command.com 是一个 16 位的 DOS 应用程序，它用于支持老的 dos 应用程序 ，它一般运行于NTVDM 中。

但就用户来说，这两个命令有惊人的相似之处，这是因为用户在 command.com 中输入的命令有很大一部分要送到 cmd.exe 中运行。

14. 如何在“我的电脑”中删除腾讯微云图标？

通过注册表：regedit。路径为：
HKEY_CURRENT_USER 
-> Software
-> Microsoft
-> Windows
-> CurrentVersion
->  Explorer
-> MyComputer
-> NameSpace
-> {3B11AB24-9AF1-45f3-8998-9BCF061D13D8} 

选中时右边显示微云，直接将左边此项删除。

注意：也有可能是其他列表名，比如 {20D04FE0-3AEA-1069-A2D8-08002B303091}，所以删除前请看一下右边显示的是什么。

15. 突破百度云上传大文件不能超过4G的限制？

来源：http://jingyan.baidu.com/article/76a7e409c65556fc3a6e157c.html

方法/步骤

1. 制作种子文件：下载一个比特彗星，安装完成后运行，在“文件”菜单下，有一个“制作TORRENT文件”选项，按步骤自己制作种子文件。（文件制作时间取决于文件的大小）

2. 上传方法：不要借助任何插件，直接在网页上登陆百度云，选择“离线下载”，再选择“新建BT任务”，选择你制作好的种子文件后上传（界面中叫“下载”）。

3. 说明：上传界面中可以看到上传进程，如果进行到99%停滞不前，这时可以关掉上传界面（其实文件已经上传完成）。经测算，12G大小的文件，在1秒内完成；20G文件，在10秒内完成；45G的文件上传失败；70G的文件，在1分钟内完成。

4. 比特彗星注意事项

·比特彗星制作种子结束后，若选择删除种子及下载文件，则制作种子的母文件也会被删除！

·比特彗星安装过程中，若不选择添加到开始菜单则在 Win 8 的 Metro开始菜单下搜索不到。


16. Windows 10 如何更改系统用户名和计算机名？

用户名

运行：control userpasswords2

选中需要更改的帐户，单击“属性”按钮，然后在弹出的属性对话框中的“用户名”一栏中进行更改即可。

计算机名

电脑属性 -> 高级系统设置设置 -> 计算机名 -> 更改


17. 如何获取系统信息？

Systeminfo > info.txt


18. 将 GPT 转换为 MBR

Diskpart

List disk

Select disk 0

Clean

会清除硬盘上所有文件

Conver mbr

convert  basic     -将磁盘从动态转换为基本。
convert  dynamic  -将磁盘从基本转换为动态。
convert  gpt      -将磁盘从MBR转换为GPT。
convert  mbr     -将磁盘从GPT转换为MBR。

Windows 冷知识
-

以下是没事做的时候干的事情。

1. 如何实现文件和文件夹一起移动?
要求：只剪切一个文件或者文件夹就可以同时把文件和文件夹一起剪切走。
解决：只要将文件夹命名与文件名后面加上 .files 就行。

2. Windows 查看系统信息有几种方法？
① dxdiag：DirectX 诊断工具。
②systeminfo：此命令可以显示出许多有用信息，其中包括了这个系统的初次安装时间，以及本次持续运行的时间。假如你想要保留这些信息，你可以输入 systeminfo >info.txt ，这将会创建一个名 info.txt 的文本文件，你可以稍后用 Windows 的记事本将其打开，进行查看。（仅限于 Windows XP 专业版本）

3. Windows 美化

以下操作本人在 Windows 7 上测试过

登陆背景替换位置

C:\Windows\System32\oobe\info\backgrounds
         
 “正在启动” 更改

软媒魔方

Windows 开机图片制作

如果不想使用单独软件的话，也可以直接修改:

右键点[我的电脑],选〔属性], 在[高级]选项卡中点击[启动和故障恢复]栏中的[设置], 单击[编辑], 在打开的记事本窗口中最后加入

/noguiboot

注意斜杠之前要有一个空格,而且你的系统在启动菜单必须是最后一个
(不是的话加入在启动所需的系统命令行的最后)

保存,然后使用图片编辑软件(最好是格式转换用的)将你想要的图片转为256色,640*480大小

(效果可能变差,谁让DOS现在只支持到256色呢)

保存为boot.bmp 放在系统盘根目录下(一般是C盘)

注意：这种方法由于使用了 NoGUIBoot 方法启动，启动不会显示系统自带的图形界面(如果没有找到正确的 boot.bmp)，而且例如自动磁盘整理、PG Magic 等利用WIN XP 自动启动画面进行交互操作的话将会导致只能看到启动图片，而无法操作。

推荐软件：

格式转换 － ACD FotoCanvas 2.0 （包括在ACDSee 5 Powerpack和以后的版本中）

http://jys.jdedu.org/xajyz/UploadSoft/ACDSee5.0中文零售版.exe


