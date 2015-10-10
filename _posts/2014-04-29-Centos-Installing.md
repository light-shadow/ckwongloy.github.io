---
layout: post
title: 安装 CentOS
category: Auxiliary
tags: [Linux, CentOS, Windows]
latest: 2015年09月28日 21:11:41
---

U 盘安装各种操作系统一般都很简单，直接刻录安装盘就行了，这里主要讲硬盘安装 CentOS6.5。

```
#### 安装代码备份
# NeoSmart NeoGrub Bootloader Configuration File # 
# This is the NeoGrub configuration file, and should be located at C:\NST\menu.lst 
# Please see the EasyBCD Documentation for information on how to create/modify entries: 
# http://neosmart.net/wiki/display/EBCD/

title CentOS6.5_i386 Install 

root(hd,0) 

kernel (hd0,0)/vmlinuz linux askmethod repo=hd:/dev/sda7:/ 

initrd (hd0,0)/initrd.img 

boot
```

Win7 硬盘安装 CentOS6.5 步骤
-

一、安装过程中需要的软件

+ 1. 硬盘分区软件

pqmagic 等。

2、Ext2Fsd

在 Windows下复制文件到 Ext2 ( 或 Ext3 )文件系统中，由于 Ext2 类型的文件系统在Windows下是不能够识别的，即 Ext2 类型的分区在 Windows下是隐藏不可见的。

Ext2Fsd 可以通过设置显示 Ext2 分区，从而能够把相应文件，主要是 CentOS 系统镜像，拷贝到 Ext2 分区。

我当时用的 Ext2Fsd 是 Ext2Fsd-0.51.exe 安装版的，最好不要用解压之后就能使用的。

##### **说明**

如果安装的系统 iso 镜像小于4GB，则只要格式化成 FAT32 文件系统即可，此时 Ext2Fsd 工具就不需要了，因为 Linux 也可以识别 FAT32 格式的分区。

3、EasyBCD

支持多种操作系统的多重引导：EasyBCD2.1.2。

二、CentOS 系统安装文件下载

CentOS 6.5 iso文件，一共有如下几种类型的 iso 版本，简单介绍一下。

+ BinDVD 版

普通安装版，需安装到计算机硬盘才能用，bin 一般都比较大，而且包含大量的常用软件，安装时无需再在线下载 ( 大部分情况 )。

+ LiveDVD 版

就是一个光盘 CentOS 系统，可通过光盘启动电脑，启动出 CentOS 系统，也有图形界面，也有终端。

也可以安装到计算机，但是有些内容可能还需要再次到网站下载（自动）。 

+ LiveCD 版

相比 LiveDVD 是个精简的光盘 CentOS 系统。体积更小，便于维护使用。 

+ Minimal 版

最精简版 net install 版：网络安装版。

三、LiveDVD 或者 LiveCD 版 CentOS 的安装方法

如果你下载的是 LiveDVD 或者 LiveCD 版 ( 安装文件 iso 大小小于 4GB )，那么恭喜你，安装比较简单。步骤如下：

1、用 pqmagic 划分出来一个分区，用于安装 CentOS。我一般在磁盘最后面划分出来一个分区。

2. 找到任意一个 FAT32 的分区，把下载下来的 CentOS 镜像文件 centos-xxx.iso，放到该分区下，假设是 E:\ 盘

3. 解压 CentOS 镜像中 isolinux 文件夹下的 vmlinuz 和 initrd.img，如果只有 vmlinuz0 则使用 vmlinuz0，下面指令也需对应修改。

到 E:\ 盘根目录，解压 images 文件夹到 E:\ 盘根目录下，也就是说跟 CentOS 镜像在同一目录下。

4. 打开easybcd软件，Add new Entry —> NeoGrub —> install —> Configure，在打开的menu.lst文件中，加入如下几行：

title CentOS 

kernel (hd0,5)/vmlinuz 

initrd (hd0,5)/initrd.img 

注意，上面的 (hd0, 5) 表示的是 E 盘，一般来说，(hd0,0) 是 C 盘，(hd0, 4) 是 D 盘，(hd0, 5) 是 E 盘，以此类推。

5.开机重启，选择 NeroGrub 菜单进入，选择 iso 文件所在的盘。

接下来，安装方法就跟光盘安装一样了。

四、BinDV D版 CentOS 的安装方法

如果很不幸，你和我一样想用个比较牛逼，软件比较多的 BinDVD 版本，那么你需要了解一下为啥不能用三中介绍的办法。

因为 FAT32 格式的文件系统， 不支持大于 4GB 的单个文件。所以你是没办法把 CentOS 镜像文件拷贝到格式为 FAT32 的磁盘中的。

那么，你需要用以下的变通方法：弄个 Ext3 的文件系统。

1、用 pqmagic 划分出来二个分区，第一个是 Ext3 格式的，用于放 CentOS 镜像文件，第二个不用管是什么格式的，用于安装 CentOS。

我一般在磁盘最后面划分出来二个分区。

2、安装 Ext2Fsd。记得这一步的时候，全部都勾选。

3、安装后，打开，找到刚才步骤 1 中的那个 Ext3 的分区，右键点击，选择 “配置文件系统” 点击“启用”并“更改并退出”。

继续选择这个磁盘单击右键，选择 “配置Ext3卷属性” 继续选择这个磁盘单击右键，选择 “磁盘及分区属性”，选择 “更改盘符/装配点”， 选择 “添加” 按照上图配置,点击“加载并退出”。

此时配置完毕,打开我的电脑就发现了 E 盘,并且可以正常打开,复制/粘贴/删除操作和 Windows 下是一样的。

注意此时 E 盘会出现一个 **lost+found** 的文件夹， 请不要删除。

4、把下载下来的 CentOS 镜像文件*centos-xxx.iso* 拷贝到 E:\ 盘，解压 CentOS 镜像中 isolinux 文件夹下的 vmlinuz 和 initrd.img。

如果只有vmlinuz0则使 用vmlinuz0，下面指令也需对应修改。

到 E:\ 盘根目录，解压 images 文件夹到 E:\ 盘根目录下，也就是说跟 CentOS 镜像在同一目录下。

5、打开 EasyBCD，Add new Entry —> NeoGrub —> install —> Configure，在打开的menu.lst文件中，加入如下几行：

```
title CentOS

kernel (hd0,5)/vmlinuz 

initrd (hd0,5)/initrd.img
```

上面的 (hd0, 5) 表示的是 E 盘，一般来说，(hd0,0) 是C盘，(hd0, 4) 是 D 盘，(hd0, 5) 是E盘，以此类推。

6.开机重启，选择NeroGrub菜单进入，选择iso文件所在的盘。

接下来，安装方法就跟光盘安装一样了。 

五、其他信息安装

启动，登录后，发现上不了网，需要做如下配置更改 ( 假设你是以root权限登录的 )

1. vim /etc/sysconfig/network-scripts/ifcfg-eth0ONBOOT=yes 

系统启动时是否设置此网络接口，设置为 yes 时，系统启动时激活此设备，默认值是no

2、如果你是公司内的域账号，那么还需要设置一下：打开system->preferences->network connections。

点击 Edit 然后重启网络服务：

```
service network restart
```
