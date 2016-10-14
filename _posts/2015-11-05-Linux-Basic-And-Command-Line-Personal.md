---
layout: post
title: Linux 基础与常用命令总结
category: Linux
tag: Linux
latest: 2015年11月07日 14:52:41
---

把我个人平时常用到的 Linux 命令总结在这里。

一些 Linux 基础
-

- Runlevel

- Vi/VIM

Linux 终端下的文本编辑器除了 `nano` 外，VI 是最常用的了。一般自带有 VI，如果不慎卸载，手动编译-安装-配置 VIM 步骤如下：

```
# 下载 VIM
# wget ftp://ftp.vim.org/pub/vim/unix/vim-7.3.tar.bz2
```

配置 VIM - 在~目录下面新建.vimrc文件可以实现，其中 _.vimrc_ 的内容如下但不限于：

```
syntax on
set autoindent
set cindent
"set cursorline

set ru
set number
set cursorcolumn
auto cmd BufNewFile *.py, *.sh exec ":call SetTitle()"

let $author_name = "Li"
let $author_email = "ckwongloy@gmail.com"

func SetTitle() 

	If &filetype == 'sh'
	call setLine( 1, #######################)
```

- 查看系统位数

```
getconf LONG_BIT
```

- ETA = Estimated Time of Arrival

- DPKG

- YUM 在等待用户确认长时间没反应后会自动将进度保存在 /tmp 中，继续进度执行提示中的命令即可。

Linux 常用命令
-

- GCC

```
gcc -o execute_file source_file
```

- **软件卸载**

```
sudo apt-get autoclean                清理旧版本的软件缓存
sudo apt-get clean                       清理所有软件缓存
sudo apt-get autoremove             删除系统不再使用的孤立软件
```

清理 Linux 下孤立的包：

```
# Debian 系
$ sudo apt-get install deborphan -y
```

- **Linux 开启自启动相关命令设置**

- **查看软件安装的位置**

```
# Debian 系 - 查看通过 apt-get 方式安装软件的位置
$ dpkg -L package_name
```

- **删除多余内核**

```
# Debian 系
# dpkg --get-selections | grep linux
# uname -r
# sudo apt-get remove linux-xxx.xx
```

- **关机**

选择有很多一行一个关机方法:

```
sudo shutdown -h now
sudo halt
sudo poweroff
sudo init 0
```

重启方法:

```
sudo reboot
shutdown -r now
shutdown -r 18:23:52 #定时重启在18点23分52秒关闭
```

- **在局域网中设置静态 IP**

```
$ cd /etc/network
$ sudo nano interfaces

iface eth0 inet static
address 192.168.1.10
netmask 255.255.255.0
gateway 192.168.1.1
```

- **中文乱码问题**

### **地区和时区设置**

```
# Debian 系将本地语言改为中文
dpkg-reconfigure locales
dpkg-reconfigure tzdatas
```

### **删除Linux的乱码文件**

通过 inode 来删除，`ls -il` 后的第一列就是文件的 inode。

```
ls -il
find . -num inode_num
find . -num inode_num -exec rm -f {} \;
```

- **Linux 用户/组管理**

- **git 不在 sudoers 文件中。此事将被报告？**

```
# 查看用户名所在的组
cat /etc/group
# 修改 sudousers
vi /etc/sudoers
# username ALL=( ALL ) ALL    # 保存退出
# 往某一个用户组里面添加用户
usermod -G username -a groupname
```

- **# 禁止某个用户登录终端？**

```
vi /etc/passwd
```
然后在需要禁用的用户名后面的 bash 改为 `nologin`，这样下次登录的时候即使密码正确也会被 Linux 拒绝。

- **Linux 杀死桌面进程**

```
ps -ef | grep 'X'
 
#kill -9 <x-pid>
```

附录：_The Linux Command Line_ 笔记

“bash” 是 “Bourne Again SHell” 的首字母缩写， 所指的是这样一个事实，bash 是最初 Unix 上由 Steve Bourne 写成 shell 程序 sh 的增强版。

Shell 不是终端 ( 终端仿真器 )，终端只是提供一个访问 Shell 的接口。

许多 Linux 发行版默认保存最后输入的500个命令。 按下下箭头按键，先前输入的命令就消失了。

X 窗口系统 （使 GUI 工作的底层引擎）内建了一种机制，支持快速拷贝和粘贴技巧。 如果你按下鼠标左键，沿着文本拖动鼠标（或者双击一个单词）高亮了一些文本， 那么这些高亮的文本就被拷贝到了一个由 X 管理的缓冲区里面。然后按下鼠标中键， 这些文本就被粘贴到光标所在的位置。

- date 
- cal
- df
- free
	
即使终端仿真器没有运行，在后台仍然有几个终端会话运行着。它们叫做虚拟终端 或者是虚拟控制台。在大多数 Linux 发行版中，这些终端会话都可以通过按下 Ctrl-Alt-F1 到 Ctrl-Alt-F6 访问。当一个会话被访问的时候， 它会显示登录提示框，我们需要输入用户名和密码。要从一个虚拟控制台转换到另一个， 按下 Alt 和 F1-F6(中的一个)。返回图形桌面，按下 Alt-F7。

- pwd    print working directory
- cd change directory
- ls path1 path2
- ls -lt --reverse   “l” 选项产生长格式输出，“t”选项按文件修改时间的先后来排序。加上长选项 “–reverse”，则结果会以相反的顺序输出：

不像 Windows ，每个存储设备都有一个独自的文件系统。类 Unix 操作系统， 比如 Linux，总是只有一个单一的文件系统树，不管有多少个磁盘或者存储设备连接到计算机上。 根据负责维护系统安全的系统管理员的兴致，存储设备连接到（或着更精确些，是挂载到）目录树的各个节点上。

符号 “.” 指的是工作目录，”..” 指的是工作目录的父目录。在几乎所有的情况下，你可以省略”./”。它是隐含地。

- `cd ~`	更改工作目录到你的家目录。
- `cd -`	更改工作目录到先前的工作目录。
- `cd ~user_name`	更改工作目录例如, cd ~bob 会更改工作目录到用户“bob”的家目录

以 “.” 字符开头的文件名是隐藏文件。这仅表示，ls 命令不能列出它们， 用 ls -a 命令就可以了录到用户家目录。


虽然 Linux 支持长文件名，文件名可能包含空格，标点符号，但标点符号仅限 使用 “.”，“－”，下划线。最重要的是，不要在文件名中使用空格

- file 确定文件类型
- less 浏览文件内容  less is more

less 属于”页面调度器”程序类，这些程序允许通过页方式，在一页中轻松地浏览长长的文本文档。然而 more 程序只能向前分页浏览

-rw-r--r--

对于文件的访问权限。第一个字符指明文件类型。在不同类型之间， 开头的“－”说明是一个普通文件，“d”表明是一个目录。其后三个字符是文件所有者的 访问权限，再其后的三个字符是文件所属组中成员的访问权限，最后三个字符是其他所 有人的访问权限。

文本是简单的字符与数字之间的一对一映射。它非常紧凑。五十个字符的文本翻译成五十个字节的数据。文本只是包含 简单的字符到数字的映射，理解这点很重要。它和一些文字处理器文档不一样，比如说由微软和 OpenOffice.org 文档 编辑器创建的文件。这些文件，和简单的 ASCII 文件形成鲜明对比，它们包含许多非文本元素，来描述它的结构和格式。 普通的 ASCII 文件，只包含字符本身，和一些基本的控制符，像制表符，回车符及换行符。纵观 Linux 系统，许多文件 以文本格式存储，也有许多 Linux 工具来处理文本文件。甚至 Windows 也承认这种文件格式的重要性。著名的 NOTEPAD.EXE 程序就是一个 ASCII 文本文件编辑器。

- `G`	移动到最后一行
- `1G or g`    移动到开头一行
- `/charaters`	向前查找指定的字符串
- `n`	向前查找下一个出现的字符串，这个字符串是之前所指定查找的 

Linux 文件系统层次标准

```
lrwxrwxrwx 1 root root 11 2007-08-11 07:34 libc.so.6 -> libc-2.6.so
```

这是一个特殊文件，叫做符号链接（也称为软链接或者 symlink ）。

在大多数“类 Unix” 系统中， 有可能一个文件被多个文件名所指向。虽然这种特性的意义并不明显，但它真地很有用。


参考
-

- [安装之后的简单设置](http://xiao106347.blog.163.com/blog/static/215992078201342410347137/)

- [Linux上vi(vim)编辑器使用教程](http://shumeipai.nxez.com/2013/12/26/linux-on-vim-editor-tutorials.html)

- [ubuntu下安装程序的三种方法](http://www.cnblogs.com/xwdreamer/p/3623454.html)

- [ubuntu 删除 程序软件](http://blog.csdn.net/pkueecser/article/details/6089834)

- [DKMS简介](http://www.cnblogs.com/wwang/archive/2011/06/21/2085571.html)

- [删除Linux的乱码文件](http://www.linuxidc.com/Linux/2012-07/66508.htm)

- [内核补丁](http://onestraw.net/linux/apply-patch-to-linux-kernel/)
