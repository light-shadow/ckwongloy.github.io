---
layout: post
title: 双系统常见问题：Windows + Linux
category: Auxiliary
tags: [Linux, Windows]
latest: 2015年10月04日22:31:48
---

这是以前在物理机上折腾双系统那段时间内遇到的一些问题和相关解决，删了觉得可惜，就整理一下放到这里吧。为需要的人提供便利。

本人折腾的时候选择的 Linux 版本是 RedHat 系列，主要是 Fedora 和 CentOS。Windows 主要是 Win7 和 Win8.1。

Fedora 引导 Windows
-

如果安装完 Fedora 后 Windows 启动项丢失了的话，可以这么修复。

1、Linux 下在 __grub.cfg__ 后面找到并修改：

```
GRUB_DISTRIBUTOR="myWindows"
GRUB_CMDLINE_LINUX="root(hd0,0) chainloader +1"  
```

其中 __(hd0,0)__ 代表的是第一个硬盘的第一个分区。

2、执行如下命令：

```
grub2-mkconfig -o /boot/grub2/grub.cfg 
```


grub 修复
-

在已经安装了双系统的电脑上，如果重装了Windows，则会覆盖了grub的引导，无法进入 Linux，这个时候可以参考下面的解决办法：

1、插入系统盘，进入linux rescue，然后是一系列的键盘选择等简单配置，然后是skip或者continue，直到会在最下端出现这样的符号：`sh#`。

2、在 `sh#` 后面输入 `grub`，回车，出现：`grub>`。

3、接着在 grub 后面输入：`root (hd0,6)`，这里注意 __root__ 和 __( )__ 之间的空格。这条命令是告诉系统分区时的 `/boot` 分区的位置。

4、再接着在 grub> 后面输入：`setup (hd0)`。 setup 和 (hd0)之间也是有空格的。这是把 grub 写到硬盘的 MBR 上。如果成功了会出现 _"...successed"_。

5、用 quit 命令退出 grub，回到 sh# 界面，输入：`reboot`，重启就可以看到熟悉的 grub 界面了。


Fedora 更改开启默认启动项
-

Fedora 17 更改开机启动项，设置 Windows 为第一启动项当地电脑装了两个或更多的系统，有时候喜欢电脑开机就进去 Windows系统。

然而安装完 Fedora 后，默认都是先启动 Fedora，现提供两个方法把 Windows 提为第一启动项。

### **方法一**

1、利用终端，首先找到 Windows 的 menuentry 

```
# cat /boot/grub2/grub.cfg | grep Windows
```

结果：_menuentry "Windows 7 (loader) (on /dev/sda1)" --class windows --class os {_

2、设置 Windows 作为默认的启动项

```
# grub2-set-default "Windows 7 (loader) (on /dev/sda1)"
```

这儿只能使用上面命令输出中双引号 “ ” 或者单引号 ‘ ‘ 中的内容。

3、验证默认启动项

```
# grub2-editenv list
```

输出： _saved_entry=Windows 7 (loader) (on /dev/sda1)_

重启电脑之后就看到默认启动项是 Windows 了。

如果这个方法不行的话，用第二个方法。

### **方法二**

1、终端输入，提高权限并编辑启动配置文件

```
# sudo chmod +w /boot/grub2/grub.cfg
#sudo gedit /boot/grub2/grub.cfg
```

2、在配置文件下面找到如下所示的段落

```
### BEGIN /etc/grub.d/30_os-prober 
###menuentry 'Windows 7 (loader) (on /dev/sda1)' --class windows --class os $menuentry_id_option 'osprober-chain-140E68540E6830C2' {insmod part_msdosinsmod ntfsset root='hd1,msdos1'if [ x$feature_platform_search_hint = xy ]; then  search --no-floppy --fs-uuid --set=root --hint-bios=hd0,msdos1 --hint-efi=hd0,msdos1 --hint-baremetal=ahci0,msdos1 --hint='hd1,msdos1'  140E68540E6830C2else  search --no-floppy --fs-uuid --set=root 140E68540E6830C2fichainloader +1}
### END /etc/grub.d/30_os-prober ###
```

把这段整体剪切下来，粘贴在 `### BEGIN /etc/grub.d/00_header ###...### END /etc/grub.d/00_header ###` 后面。

即放到 Linux启动项 `### BEGIN /etc/grub.d/10_linux ###` 之前。

然后保存，重启即可。

##### **注意**

`### BEGIN /etc/grub.d/ ###` 和 `### END /etc/grub.d/###` 是对应存在的。以防万一，可以先备份此文件。

用 ntfs-3g 挂载 NTFS 分区
-

#### 什么是NTFS-3G

NTFS-3G是一个开源软件，支持在Linux, FreeBSD, Mac OS X, NetBSD, Haiku操作系统下读写NTFS格式的分区。

它能快速且安全的操作Windows XP, Windows Server 2003, Windows 2000 以及Windows Vista文件系统。

除了完全的文件属主和访问权限，它支持所有符合POSIX标准的磁盘操作。

NTFS-3G的目的是为那些用户需要与NTFS可靠互通的硬件平台和操作系统提供可信任的、功能丰富的高性能解决方案。    

更多信息请参阅NTFS-3G主页：http://www.ntfs-3g.org

#### 安装NTFS-3G     

##### 系统环境

CentOS 5 ( kernel 2.6.18-8.el5 )

##### 软件及支持库

NTFS-3G   http://www.ntfs-3g.org            

FUSE         http://fuse.sourceforge.net     

##### 软件下载及安装

1、安装FUSE                     

下载源码包：wgethttp://nchc.dl.sourceforge.net/sourceforge/fuse/fuse-2.7.2.tar.gz                       

解压源码包：                      tar zxvf fuse-2.7.2.tar.gz                      

配置编译环境：                      cd fuse-2.7.2                       ./configure --prefix=/                       

编译：                       make                      

安装：                       make install                      cd ..           

2、装NTFS-3G

下载源码包：                      wget http://www.ntfs-3g.org/ntfs-3g-1.1120.tgz                      

解压源码包：                      tar zxvf ntfs-3g-1.1120.tgz                      

配置编译环境：                      cd ntfs-3g-1.1120                      ./configure                      

编译：                      make                      

安装：                      make install                      cd ..

3、使用NTFS-3G 

正确安装后，我们需要通过ntfs-3g来加载NTFS分区。      

3.1 获得NTFS分区设备名            

执行下面的命令            fdisk -l | grep NTFS       

结果如下所示：       /dev/sdb1               1       10443    83883366    7 HPFS/NTFS       

其中第一个字段/dev/sdb1即为所需要的分区设备名    

3.2 建立装载点           mkdir /mnt/ntfs-p1            

如果需要，请给予特定的访问权限           chmod 755 /mnt/ntfs-p1    

3.3 临时装载NTFS分区           

可以使用下面的命令以读写方式临时装载一个NTFS分区到装载点           

```
mount -t ntfs-3g <NTFS Partition> <Mount Point>
```

其中：      <NTFS Partition> ------ NTFS所在分区的设备名，如3.1中的/dev/sdb1           <Mount Point>      ------ 装载点，如3.2中的/mnt/ntfs-p1      

例如：       mount -t ntfs-3g /dev/sdb1 /mnt/ntfs-p1       

更多的选项及例子请用下面的命令参见mount命令和ntfs-3g的文档       man mount           man ntfs-3g     

3.4 系统启动时装载NTFS分区           编辑/etc/fstab           vi /etc/fstab       在文件最后增加如下格式的行       

```
<NTFS Partition> <Mount Point> ntfs-3g defaults 0 0 
```

其中：      <NTFS Partition> ------ NTFS所在分区的设备名，如3.1中的/dev/sdb1           <Mount Point>      ------ 装载点，如3.2中的/mnt/ntfs-p1      

例如：      /dev/sdb1 /mnt/ntfs-p1 ntfs-3g defaults 0 0       

保存文件后重启系统或简单的执行下面的命令，即可装载NTFS分区到指定的装载点       mount -a

4. 结束语     本文简单介绍了在Linux系统下访问ntfs分区的工具NTFS-3G的安装和配置步骤，希望能给初学者一点帮助。 


注意：centos默认不支持ntfs文件系统，先解决这个问题后用: grub2-mkconfig -o /boot/grub2/grub.cfg  代码可自动读出windows启动项。

安装好 CentOS7 后 Windows 启动消失
-

#### 解决步骤

1、进入centos7中配置grub文件，一般不要直接去修改grub.conf文件，在/etc/grub.d/40_custom文件中添加win7信息：

```
menuentry 'win7_pro_x86' {

insmod chain
insmod ntfs

#加载支持ntfs模块

set root=(hd0,msdos2)

#win7系统启动分区，如果不知道，进入 grub 中使用命令 ls -l，显示出分区对应的号

chainloader +1     

} 
```

2、完成后退出，使用命令来自动生产 grub 配置文件

```
grub2-mkconfig -o /boot/grub2/grub.cfg
```

到此修复完成，开机重启就可以看到windows7的引导了。

#### **过程分解**

1、首先是执行 `grub2-mkconfig -o  /boot/grub2/grub.cfg` 命令，自动查找硬盘上存在的引导，并修复。

2、执行命令后，在 terminal 中会打印出查找结果，我们可以看到，最后一行显示已经发现 Window7 的在硬盘上的引导了。

3、完成后“done”。

##### **注意**

CentOS 默认不支持 ntfs 文件系统，先解决这个问题后用 2 中代码可自动读出 Windows 启动项。

Windows 引导 Fedora
-

1、把下好的 **grub for dos** 解压到C盘根目录下，取名为 grub，把里面的grlrd复制到C盘根目录下。

2、找到 C 盘下面的 **boot.ini** 文件 ( 这是个隐藏文件 )，在里面最后一行加入 `c:/grldr="linux"`。

3、新建一个 `menu.lst` 文件，把它放在 C 盘根目录下， 里面的内容，以我的为例，如下: 

```
title redhat 9.0

root (hd0,7)

kernel (hd0,7)/boot/vmlinuz-2.4.20-8 root=/dev/hda8 

initrd (hd0,7)/boot/initrd-2.4.20-8.img

boot
```

总共5行，每行的意思如下:

##### 第一行

**title redhat 9.0** 这个 title 跟的值是指你要在菜单上出现用来显示 Linux 的名称。

##### 第二行

**root (hd0,7)** 一般的写法为 root(hdX,Y)。

对于X，如果你只有一个硬盘且装在这个硬盘（好像是废话……）那么当然为0啦，否则的话以此类推 为1，2，等 对于Y，这个会稍微复杂些。

在 Windows 下面，由一个主分区－C盘，和N个扩展分区－D,E,F……等组成。

但在 Linux 下，hd1～hd4 代表主分 区，对应于 Windows 下就是 C 盘，hd5 开始为扩展分区，如 hd5 对应 D 盘，hd6 对应 E 盘等。

grub 的分区算法和 Linux 类似，但有一个差别是，它是从 0 开始计数的，也就是说 0～3 对应 C 盘，4 对应 D 盘，以此类推。

我自己的电脑分区如下 C 盘－ Windows，D，E，F存储资料，剩下的空间给了linux，所以为 root(hd0,7) 

##### 第三行

`kernel (hd0,7)/boot/vmlinuz-2.4.20-8 root=/dev/hda8 `

把 **vmlinuz-2.4.20-8** 换成你对应的文件就行啦。

用 **explre2fs** 这个软件就可以在 Windows 下看 Linux 分区的文件啦。

##### **注意**

**root=/dev/hda8** 中的 hda8 而不是 hda7，因为此时是按照 Liuux 的规则而不是 grub 的规则。

##### 第四行

`initrd (hd0,7)/boot/initrd-2.4.20-8.img`

也只要把 **initrd-2.4.20-8.img** 替换成你相应的文件就行。

##### 第五行

boot，重启。
