---
layout: post
title: Raspberry Pi 2 折腾记
category: Auxiliary
tags: [树莓派, Linux, 硬件]
latest: 2015年09月24日 22:37:28
---

暑假巧逢 *云汉电子社区* 的活动，心动然后行动，最终如愿一台 Raspberry Pi 2。折腾了几天，现在做一些基本的总结。

早就听说过 Raspberry Pi 的大名，以前刚开始接触 Linux 的时候，也很想拥有一台 Raspberry Pi 来玩玩。但传统的笔记本电脑也让我折腾好久，到现在也依然感觉不够，精力主要耗费在它上面了。

先推荐几个 Raspberry Pi 有关的网站和书籍，刚开始玩的时候免不了查阅相关资料。

+ *[树莓派实验室](http://shumeipai.nxez.com/)*

+ *[树莓派专区-开发板专区-云汉电子社区](http://bbs.ickey.cn/forum/boarddetail/index/5058.html)*

+ *[40+ Cool Ideas for your Raspberry Pi Project](http://pingbin.com/2012/12/30-cool-ideas-raspberry-pi-project/)*

+ *[34个使用 Raspberry Pi 的酷创意](https://linuxtoy.org/archives/cool-ideas-for-raspberry-pi.html )*

+ *[树莓派无显示器上手步骤](http://ltext.tumblr.com/post/49580927299/)*

+ *[VNC, SSH 和 HDMI: 访问树莓派的三种方式](http://www.geekfan.net/3413/)*

+ *爱上Raspberry Pi-Getting Started with Raspberry Pi](美).Matt Richardson等著.李凡希译.科学出版社*( 该书对于  Raspberry Pi 2 来说有点过时了，但是有些基本概念还是通用的 )


一、硬件准备 ( Raspberry Pi 2 之外的硬件 )
-

+ **电源**

+ **Micro SD/TF 卡**

+ 显示器

+ 无线网卡

+ 外壳

+ 键盘

其中，电源和 TF 卡是必要的，其他视条件而定。

反正是折腾，我的电源用的是充电宝，输出的电信号参数：5V/1A 。

我的 TF 卡是 SandDisk Ultra 16G( Class 10/HC 1 ) 。


二、Raspbian on Raspberry Pi
-

软件准备( 这里不通过 NOOBS )：

+ [Win32DiskImager](http://sourceforge.net/projects/win32diskimager/)

+ [Raspbian OS](https://www.raspberrypi.org/downloads/raspbian/)

安装过程没什么好说的，打开 Win32DiskImager 就应该知道怎么用了。

#### **说明**

如果要安装 Kali Linux，下载 Kali ARM img 镜像，然后对 MicroSD 执行：

```
root@kali:~ dd if=kali-pi.img of=/dev/sdb bs=512k
```

三、启动 Raspberry Pi
-

步骤简要回顾： **刻好系统** -> **连好网线** -> **接上电源** ( 开机 )。

如果在路由器的 DHCP 分配列表里找到了 *raspberry pi* 及其正确的 IP 地址，那说明 Raspberry Pi 已经成功进入 Raspbian OS 并已连接到某个网络了。

四、连接 Raspberry Pi
-

连接至树莓派，要么通过终端、要么通过桌面，详细步骤如下：

#### **第一种：** SSH via PuTTY

成功开机后便可以通过网络连接到 Raspberry Pi 上的 Raspbian OS 了。这里使用 PuTTY ( 能用绿色软件就用之 ) + SSH。

无论你当前登录的系统与 Raspbain 是否在同一个网络，首先你都要知道 Raspberry Pi 的 IP 地址。这里是局域网环境，IP 地址可以在路由器界面找到。

然后填入 Raspbian 的 IP 地址，SSH 协议则选择端口号为 22，然后开始连接 Raspbian。

然后输入账号名和密码：( pi => raspberry )。如不出意外则登陆成功，此时便可以在 Raspbian 进行你想要的 Raspberry Pi 完成的任何操作。

这里值得备注一下的就是扩展系统的可用空间的配置上，执行如下命令即可：

```
$ sudo raspi-config
```

然后选择 ***expand_rootfs    Expand root partition to fill SD card***。

##### **说明**

这里可以在路由器中为 Raspberry Pi 设置静态 IP，这样的好处是不用每次都输入 IP 然后才登录。

```
$ sudo nano /etc/network/interfaces
```

然后修改 ***dhcp*** 为 ***static***，然后紧接着在其下一行开始配置网络属性：

```
address 192.168.1.110
netmask 255.255.255
gateway 192.168.1.1
dns-nameserver 8.8.8.8
```

其余位置的内容不需要修改。

##### **说明**

SSH 随 Raspbian 系统开启自动启用。

#### **第二种：** 界面

虽然真正长期热衷使用 Linux 的人一般都不重视界面，如果熟悉 Linux 命令，SSH 对其来说足够了，但是界面有时候也有其方便快捷之处。

比如，现代 Web 技术的发展无可厚非地导致图形化的浏览器总比字符浏览器好用。

Raspberry Pi 默认没有提供显示屏，所以要想进入 Raspbian OS 的桌面，必须要另想他法。

先了解一些说法：

> 1、不用专门给PI配显示器是可行的，需要使用远程桌面方式（VNC)，如果不需要X，SSH亦可（在0209的内核里，SSH是默认开放的）。

> 这个方法在平板电脑、安卓手机上都可以实现。

> 2、如果你希望让笔记本电脑的显示器当作PI的显示器，又不希望使用方法一。如果不做任何改造是不可以的。

> 因为笔记本显示器是一个输出设备（比如输出给其他显示器、投影仪），不能直接接受信号源。

> 即：笔记本电脑显卡与其显示器之间的连接是不开放的。

> 3、如果你有一款老旧笔记本，不再使用，且屏幕完好，那么改造是可行的。

> 你可以在某宝搜索笔记本屏幕 DIY 套件，一百多，可以给你的屏幕配上驱动卡，这样，你的笔记本屏幕就被改造成一个可以接受PI信号的显示器了。

> ( 不光笔记本屏幕可以改造，iPad 的屏幕也可以改造，同理 ) 

这里我用的是笔记本的显示屏来远程连接 Raspbian OS。( 虽然不止一种方法 )

- **VNC Server 复用笔记本显示屏**

要使用 VNC Server，需要先在终端下安装 VNC Server。

```
$ sudo apt-get install tightvncserver
```

下载安装过程的提示可根据需要选择，在这里不重要，比如 `view-only` 的选择一般就不需要，如有需要可在以后使用 `vncpasswd` 命令设置。

然后设置虚拟远程桌面的编号和分辨率。

```
$ vncserver :1 -geometry 1350x740
```

最后下载一个 VNC Server 的客户端，比如 RealVNC、VNC Viewer 等，然后打开客户端输入地址和上面设置的桌面编号即可进入刚才设置过的 Raspbian 桌面。

```
192.168.1.110:1
```

##### **说明**

关闭 1 号桌面的命令举例：vncserver -kill : 1。

- **HDMI/VGA/DVI 接口 + 显示屏**

这里据说可以借助 HDMI 分配器，但未实际验证过，所以先放弃发言权，有机会再说。

##### **注意**

不要使用**无源**的 HDMI -> VGA 转接线。

- **XRDP**

和 VNC Server 相比，XRDP 是加密连接而 VNC Server 是明文连接。

- **X11Forward**

尚未探索。

五、Raspbian OS 基本操作
-

成功连接至 Raspbian 之后，之后的操作就是在 Linux 下的一些操作了，这时候你可以发挥你的想象，编程，搭服务器，或者做点其他什么项目。

Raspbian 属于 Debian 系列Linux，所以熟悉 Ubuntu 的人对其命令的使用将毫无障碍。

但本人从开始接触 Linux 到现在基本上都是用的 RedHat 系列( Fedora 居多 )。所以这里需要总结一些不同的命令，以便日后参考。

+ **启用 root 账户**

Raspberry Pi 默认没有 root 密码，但是有账户锁定。以 `pi` 身份（password -> `raspberry`）登陆后：

①重新开启 root 账户：

```
sudo passwd root 
```

②解锁 root 账户：

```
sudo passwd --unlockroot
```

其他
-

+ 开机启动 VNC 桌面( 参考的其他文章 )

创建 `/etc/init.d/tightvncserver` 文件：

```
$ sudo nano /etc/init.d/tightvncserve
```

并写入以下内容然后复制到 PuTTY：

{% highlight s linenos %}
#!/bin/sh

### BEGIN INIT INFO

# Provides:          tightvncserver

# Required-Start:    $local_fs

# Required-Stop:     $local_fs

# Default-Start:     2 3 4 5

# Default-Stop:      0 1 6

# Short-Description: Start/stop tightvncserver

### END INIT INFO

# More details see:

# http://www.penguintutor.com/linux/tightvnc

### Customize this entry

# Set the USER variable to the name of the user to start tightvncserver under

export USER=‘pi’

### End customization required

eval cd ~$USER

case "$1" in

start)

# 启动命令行。此处自定义分辨率、控制台号码或其它参数。

su $USER -c ’/usr/bin/tightvncserver -geometry 800x600 :1’

echo "Starting TightVNC server for $USER "

;;

stop)

# 终止命令行。此处控制台号码与启动一致。

su $USER -c ’/usr/bin/tightvncserver -kill :1’

echo "Tightvncserver stopped"

;;

*)

echo "Usage: /etc/init.d/tightvncserver {start|stop}“

exit 1

;;

esac

exit 0

{% endhighlight %}

最后分配执行权限：

```
$ sudo chmod 755 /etc/init.d/tightvncserver

$ sudo update-rc.d tightvncserver defaults
```

+ [安装Kali Linux ARM版本到Raspberry Pi](http://cn.docs.kali.org/general-use/%E5%AE%89%E8%A3%85kali-linux-arm%E7%89%88%E6%9C%AC%E5%88%B0raspberry-pi)

+ [适合初学者的开箱即用型系统安装程序：NOOBS](https://www.raspberrypi.org/downloads/noobs/)

+ [Windows 10 IoT Core on Raspberry Pi](http://bbs.ickey.cn/group-topic-id-48099.html)

+ [Download Raspberry Pi Supported OS List](https://www.raspberrypi.org/downloads/)

+ [RoboPeak Mini USB显示屏粉墨登场](http://www.robopeak.com/blog/?p=406)

+ [没有显示器也能玩树莓派](http://blog.sina.com.cn/s/blog_6baddd050101azvw.html)

+ [通过串口连接控制树莓派](http://www.cnblogs.com/ma6174/archive/2013/04/23/3038626.html)

+ [树莓派官方FAQs中文版](http://bbs.ickey.cn/group-topic-id-13801.html)

+ [Kali Linux for Raspberry Pi](https://www.kali.org/downloads/)

+ [树莓派跑pin](http://bbs.ickey.cn/group-topic-id-30449.html)

+ [Raspberry Pi下跑aircrack和reaver破解路由器PIN码](http://www.freebuf.com/articles/6615.html)
