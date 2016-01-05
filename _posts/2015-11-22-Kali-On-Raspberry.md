---
layout: post
title: 在树莓派上使用 Kali
category: Linux
tags: [Kali, Linux, 树莓派, 渗透测试]
latest: 2015年12月4日 14:10:44
---

Kali 是 BT 的前身，在渗透领域目前还没有发现比 Kali 更专业的 Linux 了。

Kali for Raspberry
-

在 Linux 虚拟机或者 Live 镜像中刻录 Kali 镜像到 MiniSD/TF 卡：

```
dd if=kali-2.0.1-rpi2.img of=/dev/sdb bs=512k
```

也可以在 Windows 上直接用 Win32DiskImager 刻录。

- **如何查看 U 盘挂载那个文件上了？Sdb sdb2 sdb1 ?**

**扩容 TF 卡**
-

刻录好 Kali 后进入 Linux 默认 SD 卡可用容量和镜像的大小差不多，这样 SD 卡的剩余空间就浪费掉，很明显不允许这样的事情发生。

### 1、通过 fdisk 直接在 Kali 上扩容

```
# 查看扩容前容量
df -lh
# 查看第二分区的起始地址, 后面需要
cat /sys/block/mmcblk0/mmcblk0p2/start
125001
# 启用 fdisk 磁盘管理工具
fdisk /dev/mmcblk0
# 删除分区
Command (m for help): d
# 删除第二分区
Partition number (1,2, default 2): 2
# 创建一个新分区
Command (m for help): n
# 创建主分区
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): p
# 选择分区 2
Partition number (2-4, default 2): 2
# 输入第二分区起始扇区
First sector (125001-31116287, default 126976): 125001
# 输入最后一个结束扇区, 直接回车代表剩余所有
Last sector, +sectors or +size{K,M,G,T,P} (125001-31116287, default 31116287): 回车
# 将上面的操作写入分区表
Created a new partition 2 of type 'Linux' and of size 14.8 GiB.

Command (m for help): w
```

到这里会提示：

```
The partition table has been altered.
Calling ioctl() to re-read partition table.
Re-reading the partition table failed.: Device or resource busy

The kernel still uses the old table. The new table will be used at the next reboot...            
```

不用管他，重启：`reboot`。

重启后继续执行如下命令，否则容量还是以前的：

```
# 重新分配分区大小
resize2fs /dev/mmcblk0p2
```

到此扩容完成。使用 `df -lh` 查看容量已扩至 SD 卡实际所有可用物理容量。

### 2、通过 gparted 在其他 Linux 上为 SD 卡扩容

暂未研究。详见参考。

**用一条网线连接树莓派和笔记本**
-

基本步骤是用笔记本无线网卡联网共享给有线网卡，如果不做更改有线网卡获得的 IP，上述操作后有线网卡获得的 IP 将是 192.168.137.1。

然后在命令行中运行 `arp -a` 获得树莓派的从笔记本上获得的 IP，要在接口地址为 192.168.137.1 下面找 IP 地址为 192.168.137.2~192.168.137.244 这个范围内的 IP，如果有那就是树莓派从笔记本上获得的 IP。

##### **注意**

`arp -a` 后 `192.168.137.1` 下面不一定非是动态的才是树莓派上 Kali 获得的 IP，静态的也有可能

还有，使用上面获得的 IP 登录到树莓派之后，网络不一定会通，因为在 /etc/resolv.conf 这个配置文件中的 `nameserver` 是笔记本有线网卡的 IP 地址，而这显然是不管用的，所有需要在改配置文件中手动添加 DNS 服务器地址或者在笔记本上有线接口 IPV4 属性配置中添加可用的 DNS 服务器地址，比如：

```
nameserver 178.79.131.110    # 	V2EX
nameserver 199.91.73.222
nameserver 223.5.5.5   # Ali
nameserver 223.6.6.6
nameserver 114.114.114.114
nameserver 8.8.8.8    # Google
nameserver 8.8.4.4
```
然后执行 `apt-get update` 等命令就可以使用笔记本无线网卡共享过来的网络了。

- **更新下 Kali Linux**

```
apt-get clean && apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y
```

设置开机自动连接 wifi
-

修改 /etc/network/interfaces 文件：

```
sudo vim /etc/network/interfaces
```

修改后文件内容类似于如下：

```
auto lo
iface lo inet loopback 

auto eth0
iface eth0 inet dhcp

auto wlan0 
allow-hotplug wlan0 
iface wlan0 inet dhcp 
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
# wpa-ssid "your_wifi_name" 
# wpa-psk "you_wifi_password"
```

而 wpa_supplicant.conf 的内容应类似于如下:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
        ssid="adhoc"
        psk="xxx"
        key_mgmt=WPA-PSK
        pairwise=CCMP
        auth_alg=OPEN
}
```

如果没进过图形化界面，需要把 `wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf` 注释掉，而直接在 interfaces 文件中设置无线的 SSID 和 PSK 密码就行，即是上面中注释掉的那两行。

在 Kali 中，无线信息保存在 /etc/NetworkManager/system-connections 目录下面。类似如下：

```
[connection]
id=adhoc
uuid=70b718bb-b936-44d1-84fc-40148a386771
type=wifi

[wifi]
ssid=adhoc
mac-address=7C:DD:90:5C:FE:79
hidden=true

[wifi-security]
key-mgmt=wpa-psk
psk-flags=1

[ipv4]
method=auto

[ipv6]
method=auto
```

安装常用软件
-

```
# 离线工具
apt-get install screen
# 远程桌面服务
apt-get install xrdp
service xrdp start
# 系统服务管理工具
apt-get install chkconfig
```

开启服务自启动和自动执行脚本
-

只需将可执行脚本丢在 /etc/init.d 目录下，然后在 /etc/rc*.d 中建立软链接即可，如下：

```
ln -s /etc/init.d/xrdp /etc/rc3.d/S03xrdp
reboot
```

重启后可以发现 xrdp 服务已经自启动成功。

**需要注意的是，上面的命名中 `S` 开头代表开机运行，`K` 开头代表不运行。S03 后面的名字要和 /etc/init.d/ 下服务名一样。否则不会生效。**

KALI "渗透测试"
-

树莓派跑 pin
-

```
lsusb

apt-get install screen    # 为了可以 SSH 离线

apt-get install cowpatty 	# 不安装运行该程序的时候会提示

iwconfig

screen

wifite
```

寻找绿色信号的 带有wpa/wpa2 标志的、带有wps标志的目标。
 
然后天线找到最佳位置后按 ctrl+c，在下面新出现的一行输入你选定的目标行号，回车确定后就开始了自动探测。

破解时间快的话甚至可以秒破，慢的话就不好说了。

`~` 目录下将保存 wifi 的密码。


- **使用 reaver 破解开启 wps 功能的路由器密码**

```
reaver  -i  mon0  -b 8C:21:0A:5F:A2:FA  -a  -S  -vv  -d2  -t 5 -c 1
airmon-ng start wlan0
airodump-ng mon0
```

Aircrack-ng
-

```
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon

airmon-ng start wifi0 9

reaver -i mon0 -b F8:D1:11:31:50:24 -vv -c 6 -p 88948935
```

- **搜索不到无线?**

重置网络。

- **执行 `airmon-ng start wlan0` 提示错误，执行 `airodump wlan0mon`失败?**

```
sudo apt-get install rfkill
```

- Failed to associate with … …

- Request occur timeout … …

```
airodump-ng -c 6 –w wpa-wps wlan0mon

aireplay-ng -0 10 -a 50:BD:5F:0F:B9:BA -c BC:3A:EA:60:6C:61 wlan0mon
```

Screen 的使用
-

screen 这个工具很好地解决了睡觉的时候想关闭 SSH 连接而让树莓派工作，比如下载、编译内核，跑 pin，跑字典等耗时间事情的问题。

```
apt-get install screen     # 下载 screen
screen -S cracking    # 开启一个离线任务
screen -r cracking    # 恢复一个离线任务
exit                  # 退出 screen 会话
screen -ls            # 查看所有 screen 会话
screen -wipe          # 删除会话
```

升级 KALI 内核( 非 ARM 版 )
-

树莓派用的 Kali 2.0 默认内核版本是 3.18+，内核稍微有点旧了，这可能对有些网卡不支持，所有有必要更新一下内核。

按照官方有关文档的介绍，步骤大致如下：

1、安装编译所需的依赖

```
apt-get install kernel-package ncurses-dev fakeroot bzip2
```

这一步很耗时，我纳闷的是为什么要下载一个叫 latex 的东西，这不是排版用的么，就这玩意大约 6/700 M 。

2、下载并解压 Kali Linux 内核源代码

```
apt-get install linux-source
cd /usr/src/
tar xvJf linux-source-4.0.tar.xz   # 注意 J 是大写
# 如果下载的压缩文件格式是 .bz2 参考： tar jxpf linux-source-3.7.tar.bz2
cd linux-source-4.0/
```

3、配置内核 ( 复制 Kali 默认的内核配置文件然后根据你的需要修改 )

这一步是应用各种驱动、补丁、等等，官方让我们从 /boot/目录下拷贝：

```
cp /boot/config*** .config
make menuconfig    # 文本目录
```

但是我在 /boot 路径下没找到改配置文件，其实就在 /usr/src/ 下面，叫 rpi2-3.18.config，把它拷贝到 Kali Linux 源码所在目录：

```
cp ../rpi2-3.18.config .config
```

就这样还没完，等下还会提示手动配置，到时候如果懂就仔细看，如果不懂就一路 enter。

4、编译内核

编译你修改过的内核，需要花的时间和硬件配置有关 ( 不知道 `-j4` 参数在这里是有用 ) 。

```
CONCURRENCY_LEVEL=$(cat /proc/cpuinfo|grep processor|wc -l)
make-kpkg clean
fakeroot make-kpkg kernel_image
```

5、安装内核

内核编译成功后就开始安装新内核，然后重启。

```
dpkg -i ../linux-image-4.0.x-xxx.deb 
update-initramfs -c -k 4.0.x
update-grub2
reboot
```

注意内核版本号可能不同，需要根据情况做相应的修改。

重启后，新内核应该可以正常运行了。如果新内核启动出错，仍然可以通过启动官方的 Kali Linux内核 ( 即使以前的旧内核 )。

参考
-

- [Kali Linux Custom ARM image downloads](https://www.offensive-security.com/kali-linux-arm-images/)

- [重新编译Kali Linux内核](http://cn.docs.kali.org/development-cn/%E9%87%8D%E6%96%B0%E7%BC%96%E8%AF%91kali-linux%E5%86%85%E6%A0%B8)

- [通过 gparted 在其他 Linux 上为 SD 卡扩容](www.linuxidc.com/Linux/2013-12/93430.htm)

- [Debian升级Linux内核](http://blog.csdn.net/cherylnatsu/article/details/6294148)

- <http://os.ctocio.com.cn/68/12957068.shtml>

- <http://shumeipai.nxez.com/2013/10/15/raspberry-pi-and-a-network-cable-directly-connected-laptop.html>

- <http://www.aircrack-ng.org/doku.php?id=faq#where_can_i_find_good_wordlists>

- <http://www.oschina.net/question/12_7909>

- <http://www.aircrack-ng.org/doku.php?id=cracking_wpa>

- <http://www.openwall.com/john/>

- [树莓派(raspberrypi)安装aircrack-ng,reaver及wifi破解教程[整理] | FindSpace](http://www.findspace.name/res/1184)
