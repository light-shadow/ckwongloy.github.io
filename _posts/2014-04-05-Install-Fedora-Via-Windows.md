---
layout: post
title: Windows 下硬盘安装 Fedora
category: Linux
tags: [Linux, Fedora]
latest: 2015年09月28日 21:11:41
---

这是很久以前写在 OneNote 里面的东西了，最近又实体机重新安装了 Fedora 22 + Windows 10，发现依然可以借鉴，因此，将其搬到 Blog 分享给需要的人。

##### **说明**

经实测，Fedora 20 在 Windows 7/8 下硬盘安装的步骤也适合 Fedora 21、CentOS 6.5 和CentOS 7.0 的硬盘安装，过程一样，只需修改部分配置代码。

过程速览
-

+ ① **分区、挂载**

一大一小 EXT3 文件系统区，小的安装盘 **至少 8G**，大的系统盘我的 50G，Windows下挂载小的 EXT3 分区。

+ ② **第 1 次拷贝**

iso 镜像文件 ( 1个) 和 **vmlinuz**、 **initrd.img** 和 **image** 目录到该盘根目录。

+ ③ **EasyBCD、menu.lst**

EasyBCD -> 添加新条目 -> NeoGrub -> 改写 **menu.lst**。

+ ④ **第 2 次拷贝**

**images**、 **isolinux**、 **LiveOS** 文件夹， **vmlinuz** 和 **initrd.img** 文件到 C 盘根目录。

+ ⑤ **重启**

重启时，选择 **NeoGrub** 进入 Fedora 的安装界面。 

##### **说明**

NeoGrub 是默认的，也可以是自定义的其他名字。

具体步骤
-

### 一、分区、挂载

#### **1、安装硬盘工具**

+ **分区工具**： **Acronis Disk Director**

+ **挂载工具**： **Ext2 Volume Manager**

#### **2、划分 EXT 分区**

***Fedora20-x86_64-DVD.iso*** 镜像文件大于4个G，在 Windows 系统上的话只能放在 NTFS 格式的分区中，而不能放在 FAT32 格式的区中。

这个没什么好解释的，想知道更多背后的故事，请询问 Google 老师。

但 Fedora 的内核是 Linux，不能将其安装到 NTFS 格式的分区中，只能选用 EXT2、 EXT3、EXT4 等 Linux 文件系统。

### 二、拷贝必要的文件到 EXT 分区

安装 **Ext2 Volume Manager** 后，按软件设置开启挂载 EXT 文件系统到 NTFS 后就可以直接访问 EXT3 格式的分区了。

接下来就是拷贝 *** Fedora20-x86_64-DVD.iso*** 到该盘中，一定要根目录。

然后再把 iso 镜像文件中的 ***ioslinux*** 文件夹下的 ***vmlinuz*** 和 ***initrd.img*** 文件也复制到该盘 **根目录** 下。

为了保险起见，建议还把 **image** 文件夹也拷贝到该盘的根目录下。

### 三、EasyBCD 中添加启动信息

点击添加新条目 -> 点击neoGrub -> 新的页面，点安装 -> 配置，这时会弹出一个 ***menu.lst*** 文件，在其最后添加如下内容：

```
title Install Fedora 20
root (hd0,0)
kernel (hd0,0)/vmlinuz linux askmethod repo=hd:/dev/sda8:/
initrd (hd0,0)/initrd.img
boot
```

**上述代码的解释如下：**

+ **/dev/**

指的是计算机硬件。

+ **sda**

是指你计算机里的第一块窜口硬盘，如果是 **hda** 就是并口盘。

**sda1** 是指你那块硬盘上的第一个活动分区，活动分区最多可有 4 个分别为 **sda1 ~ sda4**。

逻辑分区从 sd5 开始，每个人的机器应该不一样，可以通过 ***Acronis Disk Director*** 等相关工具查看。

我这里也就是 Windows 的 D 盘，以此类推。

+ **0后面的数字**

hd0 后面的数字，如果不对会导致后面安装时会报错找不到镜像位置，但这可以在启动的时候按 ***e*** 修改。

即把 ***(hd0,0)*** 中的第二个 0 换成 1、3、5、6、7、8 再测试，修改完后按 ***b*** 启动。

其中 0 代表 C 盘。

+ **a 和 b**

sda8 中的 a 代表第一个磁盘，b 代表第二个，如 a 代表我电脑自带的硬盘，b 代表我的移动硬盘。

+ **8**

8 代表先前我们分配好的 5G 的 et3 分区号，如果不知道，可以在 Disk Director 中查看：在红色区域右击，选择 “磁盘分区号” 后即可看见。

##### **说明**

只要启动代码写的没错，安装一定会成功的，所以千万不要写错。

### 四、拷贝必要的文件至 C 盘根目录

拷贝工具： ***UltraISO***

把 iso 安装包里面的 **images** ， **isolinux** ， **LiveOS** 文件夹拷贝到 C 盘根目录。( 不用管 C 盘的格式是什么 )

然后再把 **ioslinux** 文件夹下的 **vmlinuz** 和 **initrd.img** 文件也拷贝到 C 盘根目录下。

### 五、重启进入Fedora安装流程

选择 NeoGrub 或者你自定义过的启动菜单进入 Fedora 安装进程。

+ **安装过程中分区的选择问题**

进入分区的界面时，先点左上角的 ***done***，然后会进入一个界面，出现：选择自定义分区 ( 第三个选项 ) 和 LVM ( 默认 )形式。

我一般是选择自定义，因为好自己分配 Linux 系统盘中文件夹的大小。

+ **系统盘文件夹大小分配及说明**

我分配给 Fedora 的分区大小为 50G，我机器的物理内存为 4G 。

- **/boot**

100M。后期如果发现 100M 不够用，建议改成 300M，最多 500 M，因为启动信息占不了太多空间。

当启动分区空间不足的时候也可以删除旧版本的 kernel，但如果 Linux 中没有旧版本的内核，只得重新装。

- **/**

25G。

- **/var**

2G。

- **/swap**

2048 M。如果是 4G 物理内存，没必要设置到 8G 的 Swap 分区，2G 就足够。

##### **说明**

Windows 一般才设置 2 倍物理内存大小的虚拟内存。

- **/home**

剩余所有空间。不要填数字，直接创建，那么它默认会采用剩余空间。

#### **整个安装过程需要注意的地方**

1、下载 Fedora 后，一定要检查它的 SHA256。

Fedora 20 相关版本的 SHA256 值应该是：

```
Hash: SHA256

# The image checksum(s) are generated with sha256sum.

f2eeed5102b8890e9e6f4b9053717fe73031e699c4b76dc7028749ab66e7f917 *Fedora-20-x86_64-DVD.iso

376be7d4855ad6281cb139430606a782fd6189dcb01d7b61448e915802cc350f *Fedora-20-x86_64-netinst.iso
```

你可以网上下一个 **SHA256-SamG** 工具进行校检。如果是 Win8，则系统中已自带，不必下载。

上述如果 sha256 校检不对，可能也会出现安装源出错，以导致无法安装。

2、在拷贝相关文件时不要遗漏文件。

从 iso 文件中拷贝文件到 5G 的 et3 分区时，一定要全，不然在安装 Fedora 时会出现安装源出错。
