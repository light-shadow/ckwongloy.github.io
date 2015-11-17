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
set nu
set tabstop=4
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

sudo apt-get autoclean                清理旧版本的软件缓存
sudo apt-get clean                       清理所有软件缓存
sudo apt-get autoremove             删除系统不再使用的孤立软件

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

### **将本地语言改为中文**
```
# Debian 系
# dpkg-reconfigure locales
```

### **删除Linux的乱码文件**

通过 inode 来删除，ls -il 后的第一列就是文件的 inode。

```
# ls -il
# find . -num inode_num
# find . -num inode_num -exec rm -f {} \;
```

- **Linux 杀死桌面进程**

```
$ps -ef | grep 'X'
 
#kill -9 <x-pid>
```

参考
-

- [安装之后的简单设置](http://xiao106347.blog.163.com/blog/static/215992078201342410347137/)

- [Linux上vi(vim)编辑器使用教程](http://shumeipai.nxez.com/2013/12/26/linux-on-vim-editor-tutorials.html)

- [ubuntu下安装程序的三种方法](http://www.cnblogs.com/xwdreamer/p/3623454.html)

- [ubuntu 删除 程序软件](http://blog.csdn.net/pkueecser/article/details/6089834)

- [DKMS简介](http://www.cnblogs.com/wwang/archive/2011/06/21/2085571.html)

- [删除Linux的乱码文件](http://www.linuxidc.com/Linux/2012-07/66508.htm)

- [内核补丁](http://onestraw.net/linux/apply-patch-to-linux-kernel/)
