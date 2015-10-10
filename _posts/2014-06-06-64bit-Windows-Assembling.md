---
layout: post
title: 64 位 Windows 下汇编环境搭建
category: Assembler
tags: [汇编语言, Windows]
latest: 2015年09月28日 19:54:13
---

64 位 Windows 下不再提供 debug 程序，所以如果要在 64 位 Windows 机器上进行汇编开发，则需另寻他路。

32 位XP 系统只需安装 masm 程序，系统自带 debug；32 位 win7 也只需装 masm，但在调用 debug 程序的时候，需先调用 command.com 程序调用 debug 程序。

64 位 Windows 下汇编环境搭建步骤
-
MASM6.15/MASM5.0  +  Debug32.exe/Debug.exe

_（关于MASM和DOSBOX的作用不知道的搜下就知道了就不说了）_

 1)下好MASM6.15/MASM6.11/MASM5后进入第一个目录点击setup.exe一路enter。

 2）将安装好的目录路径复制好添加到系统环境变量Path中。

> 不想安装或64位系统也可以直接将含有MASM.EXE/LINK.EXE/ML.EXE文件的目录添加到Path。

DOSBOX 安装步骤
-

 1）网上下载 DOSBOX、DEBUG32.EXE 或 debug.exe 程序，把 DOSBOX 安装在计算机中。

 2）在已知路径的文件夹中存储 DEBUG32.EXE 或 debug.exe 程序。本例中 Debug.exe 在 f：\1 下的文件夹内。

 3）双击运行安装好的 DOSBOX 程序：

 4）依次输入以下命令：

```
 1>   Mount c f：\1
     /* 这个指令的意思是将1这个文件夹挂载为DOSBOX 的C盘（这样1文件夹就是DOSBOX的C盘）*/

 2>   C：       

 3>   Debug32/debug
```
> 出现的界面窗口已经打开了debug，其后操作和操作debug相同，退出时输入命令：quit 并点击enter键，就退出debug调试，重新进入DOSBOX程序中。

可能出现的问题
-

Q1："This program requires DOSXNT.EXE to be in your path"/"Cannot Execute DOSXNT.EXE -- Unknown error R6000 -stack overflow..."

Explanation：Masm615在DOSBox 0.74运行masm ***.asm会出现错误。


解决方法
-

A.不用 DOSBox 0.74 进行编译，而直接把 1.asm 文件托放 到 ML.EXE 文件上，则就会在当前文件夹下自动生成 1.OBJ 和 1.EXE 文件。

 B.将 DOSXNT.EXE （可从网上下载）拷贝到 MASM.EXE/LINK.EXE（此目录已经加入环境变量中）的文件夹下。

 C.不安装 MASM6.15 换安装 MASM5.0 即可。

其他方案
-

**emu8086**


裸机开发( 引用 )
-

> 还是用 DOS 启动盘吧，因为一进 Windows，很多指令就就只能由 Windows 执行了，你写的很多指令都不能执行了。

> 因为在具有保护功能的系统启动的时，系统会把标志寄存器 EFLAGS 上的 IOPL 置 0，并且系统程序会抢占 0 特权级，于是所有的 IO 操作都必须由系统进行，于是非内核模式的程序无法进行 IO，只能请求系统内核了。

> 如果你要用汇编开发操作系统，是不可能把 Windows 作为开发环境的。因为你如果要开发一个操作系统，首先要把一个磁盘格式化成你自己设计的文件系统，然后要把这个系统的所有数据写入你格式化好的磁盘，但是这些都涉及到 IO 操作，要使用 `out` 这条指令，而 Windows 下的应用程序的 CPL 为 3，IOPL 为 0，`out` 这条指令无法执行。

> 所以，如果你要开发一个新的操作系统，只能在 DOS 之类的非保护型操作系统上作为开发环境，你在 DOS 上写汇编代码，用 DOS 环境下的汇编器汇编你的代码，然后运行代码，把一个磁盘格式化成你自己设计的文件系统，然后把这个系统的所有数据写入你格式化好的磁盘，然后你就可以退出 DOS 重启，选择从你刚装好系统的那个磁盘启动，就可以进入你写的操作系统了。

> 这也是为什么高级语言有windows上的集成开发环境，但几乎所有的汇编器都运行在DOS上的原因。因为汇编本身就是用来做系统的，如果已经装好了系统，设置了IOPL保护了，当然不能再做系统了，所以还是DOS下才好做系统。

> 注意：由于 DOS 运行于实模式，只能用 1M 的内存，你如果需要更大内存空间，可以把 cr0 寄存器的第 0 位 PE 置 1 进入保护模式，此时你可以执行任何指令，因为此时你的程序的 CPL 为 0，而标志寄存器 EFLAGS 上的 IOPL 为 3。

> 当然，你也可以不用任何开发环境，直接用磁头在磁盘上一位一位地刻。早期的计算机不仅没有编译器，而且没有操作系统，键盘和鼠标都不能用，更别提什么集成开发环境了。

> **但早期的磁盘比现在大得多，每一位存储单元都是肉眼可见的，早期的程序员们拿着磁头，直接在磁盘上磁化每一位，最早的操作系统和编译器就是这样一位一位刻出来的。 **
