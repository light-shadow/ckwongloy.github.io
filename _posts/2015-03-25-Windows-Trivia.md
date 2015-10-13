---
layout: post
title: Windows 冷知识
category: Auxiliary
tags: [Windows, 冷知识]
latest: 2015年06月19日 14:52:41
---

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


