---
layout: post
title: Linux Grub
category: Linux
tags: [Linux, Grub]
latest: 2014年05月10日 20:41:21
---

Grub 是 Linux 的开机引导程序，类似于 Windows 的 Bootloader。

Grub2脚本编辑
-

Grub2的/etc/grub.d目录下的脚本文件: 

- 00_header

- 05_debian_theme

- 10_linux

- 20_memtest86+

- 30_os- prober

- 40_custom

这五个脚本对应grub.cfg上的各个部分，有的版本的grub可能把30_os-prober分出另一部分为 30_os-others，这并不影响。

怎样修改这些脚本文件才能保证不会破坏update-grub的运行，又能让生成的grub.cfg合乎意愿呢？

其实很简单，只要在脚本文件中找到cat,其他使用变量的语句不要随变做修改，除非你清楚修改后会有什么结果。

1、看看00_header一样在终端中打开sudo gedit /etc/grub.d/00_header，找到这部分 cat 加载由save_env保存在grubenv的变量 set default="${GRUB_DEFAULT}" ->

使用/etc/default/grub中的设定值 if [ \${prev_saved_entry} ]; then   saved_entry=\${prev_saved_entry}   save_env saved_entry   prev_saved_entry= ->

变里设置的变量由下句保存到grubenv   save_env prev_saved_entry fi ->这里回车添加新行后可插入需要添加的模块 insmod jpeg ->

添加背景图片格式支持，如jpeg，png，tga等。 insmod fat ->

添加文件系统格式支持如fat，ntfs，也可在menuentry下添加 EOF 再看看最后这一段 cat 设定为若有启动失败记录，就显示菜单，需手动选择才能启动选择项 else   set timeout=${GRUB_TIMEOUT} ->

使用/etc/default/grub中的设定值 fi ->这行后添加行 background_image (hd0,7)/boot/images/002.jpg ->

添加背景图片的绝对路径 EOF2)05_debian_theme修改字体及背景颜色 先打开文件 sudo gedit /etc/grub.d/05_debian_theme 看这里   cat 设置菜单项的字体和背景颜色 set menu_color_highlight=black/white ->

设置选择项的字体和背景颜色。


EOF 可供使用菜单颜色有：

```
black，blue，green，cyan，red，magenta，brown，light-gray，dark-gray，light- blue，light-green，light-cyan，light-red，light-magenta，yellow，white
```

3)10_linux这部分是自动搜索当前系统，建立当前系统的启动菜单，包括系统头，内核等信息，不要随便修改，要使用个性菜单名，比如中文菜单，可适当添加： 

先打开文件 sudo gedit /etc/grub.d/10_linux，找到         cat 双引号内可添加个性化字符，$1变量也可改为定值，如改为menuentry "启动 

Ubuntu Karmic" {         recordfail=1         save_env recordfail ->

如不要保存启动失败记录的，这两句可删除 EOF   if [ "x$3" = "xquiet" ]; then     cat 启动画面不用splash，要用跳动字符的，这段可删除 个性化菜单项也可在这里修改，

即上面的menuenrty "$1"不变，修改下面的数值：   

```
linux_entry "${OS}, Linux ${version}" \ ->可改为 linux_entry "启动 Ubuntu, Linux ${version}"\      

"${GRUB_CMDLINE_LINUX} ${GRUB_CMDLINE_EXTRA} ${GRUB_CMDLINE_LINUX_DEFAULT}" \       

quiet   if [ "x${GRUB_DISABLE_LINUX_RECOVERY}" != "xtrue" ]; then     linux_entry "${OS}, Linux ${version} (recovery mode)" \
```

->可改为 linux_entry "启动 Ubuntu, Linux ${version} (修复模式)"\     "single ${GRUB_CMDLINE_LINUX}"   fi 注意只修改引号内的字符，前面的menuentry，linux_entry和后面的\不要做修改。

4)20_memtest86+自动添加内存测试启动项 打开文件 sudo gedit /etc/grub.d/20_memtest86+，找到   cat 双引号内可添加个性字符如menuentry "启动 内存测试"    

linux16    $MEMTESTPATH } menuentry "Memory test (memtest86+, serial console 115200)" {     linux16    $MEMTESTPATH console=ttyS0,115200n8 } EOF 上面有两内存测试项，可删除其中一个。


5)30_os-prober查找其他分区中存在的系统并建立菜单项，依次为windows，linux，macos。 

对于单系统，默认会隐藏菜单，可在这里去掉隐藏 先打开文件 sudo gedit /etc/grub.d/30_os-prober 单ubuntu系统会自动隐藏菜单，要取消隐藏菜单，可把这部份的三个timeout=0改为和/etc/default/grub中的timeout一致

比如timeout=10。     

cat 比如改为


```
menuentry "启动 Windows XP" { EOF linux启动项     linux)       LINUXPROBED="`linux-boot-prober ${DEVICE} 2> /dev/null | tr ' ' '^' | paste -s -d ' '`"     ......         if [ -z "${LLABEL}" ] ; then           LLABEL="${LONGNAME}"         fi         cat 比如改为menuentry "启动 Mandriva" { EOF macos启动项     macosx)       OSXUUID="`grub-probe --target=fs_uuid --device ${DEVICE} 2> /dev/null`"         cat 比如改为menuentry "启动 MacOS" { EOF 6)40_custom 自定义启动项，按菜单标准格式在后面添加即可，如 #!/bin/sh exec tail -n +3 $0 # This file provides an easy way to add custom menu entries.  Simply type the # menu entries you want to add after this comment.  Be careful not to change # the 'exec tail' line above. menuentry "启动 Veket" {     set root=(hd0,8)     linux /veket/vmlinuz root=/dev/ram0 PMEDIA=hd     initrd /veket/initrd.gz } menuentry "启动 CDLinux" {     set root=(hd0,8)     linux /CDlinux/bzImage root=/dev/ram0 vga=791 CDL_LANG=zh_CN.UTF-8     initrd /CDlinux/initrd }
```


Grub修改开机画面
-

1）安装ImageMagick软件包（下面要用到的convert命令就在这个包里面，yum安装解决依赖问题）

2）做一个jpg格式的图片 image.jpg3) 执行命令：convert -geometry 640x480 -colors 14 image.jpg image.xpm（将图片转化成640*480,14色的XPM文件）

4) 执行命令： gzip -9 image.xpm（压缩生成的xpm文件，使用gzip）

5) 把生成的image.xpm.gz文件放到/boot/grub/logo目录下，如果没有logo目录可以自己创建

6）编辑/boot/grub/menu.list文件中的splashimage参数： splashimage=(hd0,0)/grub/logo/image.xpm.gz 并保存；

（（hd0,0）是根据实际情况填写系统安装的盘符位置）

7）重新启动LINUX注：grub支持640x480,800x600,1024x768各种模式的开机画面

1.    首先，需要一幅图片，要求它的分辨率是640×480，因为grub只支持这个分辨率的图片。

2. 再将图片格式转成xpm，因为grub只支持这个格式的图片。

3.  并且该xpm的图片色深必须是14，上面的这些要求用一个命令就可以完成： 

```
# convert -resize 640x480 -colors 14 wallpaper.png splash.xpm   
```

上面这句命令是将wallpaper.png 转换成符合要求的图片splash.xpm   4. 我们可以这样检查图片是否符合grub的要求，用命令：

```
# more splash.xpm
```

在文件头部如果可以找到这些信息，则说明该图片可以被grub正常显示：

```
/* XPM */ static char *10[] = { /* columns rows colors chars-per-pixel */ "640 480 14 1"
```

5. 打开文件：/boot/grub/grub.conf 找到其中的一行：

```
splashimage=(hd0,2)/boot/grub/splash.xpm.gz
```

（根据发行版的不同，也许路径和文件名不同，需要你自己对照着修改一下。）

/boot/grub/splash.xpm.gz就是最终被显示的图片，按照这个要求我们用下面的命令压缩图片： 

```
# gzip -9 splash.xpm
```

6.  最后得到splash.xpm.gz，将其放到/boot/grub/路径下，替换掉原图片，重启看看你的新开机图片吧。