---
layout: post
title: 使用 ADSL 搭建 Web 服务器
category: Auxiliary
tags: [ADSL, 服务器, Apache, DDNS, 路由器]
latest: 2015年06月17日 19:57:13
---


在局域网本地搭建 Web 服务器没什么好说的，那么怎么将其架到公网上呢，能否将 Web Server 架设在 ADSL 宽带上？

家用/小区 ADSL 宽带的 IP 地址分配不是固定的 ( WAN  IP )，断线、断电、重启路由器等情况下都可能使 IP 地址变动，而这对于长时间提供服务的服务器来说是很不方便的。

为了在这种情况下将其实现，分 2 种联网场景讨论：

1、通过猫直接拨号上网
-

如果你的电脑是 **直接通过 ISP 提供的猫拨号上网** 的 ( 指没有通过路由器 )，在你的公网 IP 没变化之前，整个公网上的 IP 都是可以通过 *< http://公网IP:888/index.html>*   访问到你的服务器的。

这样的麻烦之处在于，你需要定时告诉别人你新公网 IP 地址，而且如果绑定了域名，同时还要在 DNS 服务器中更改映射关系，否则别人就访问不到你的服务器了。

##### **说明**

由于 80 端口基本上都已经禁止在家用宽带上监听，所以需要为你 Web 服务器的监听分配一个不常用的端口号。

具体怎么设置服务器监听端口，可以在各种服务器的文档中参考。如: 

+ Apache：[Apache HTTP 服务器 2.4 文档](http://httpd.apache.org/docs/2.4/zh-cn)

+ Ngnix：[Nginx中文文档](http://www.nginx.cn/doc/)


2、猫 + 路由器
-

如果上网方式是 **猫+路由器**，即是由路由器拨号上网。这将涉及 **路由器的转发原理**，本文略，只讲讲步骤：

一般路由器固件中都支持 **DDNS**：动态 DNS。

服务允许您为动态 WAN IP 地址分配一个固定域名，从而可监控您的 LAN 中的 Web, FTP 或其它 TCP/IP 。

+ ① 注册域名

设定 DDNS 之前，去注册一个域名，用于让路由器将不断变化的公网 IP 不断更新到你的域名上，即保持域名和 IP 的动态映射。

这样一来，从使用的角度看来，功能十分接近具有稳定 IP 的 Web 服务器在运行。

+ ② 开启 DDNS 服务

在路由器 DDNS 设置中，从下拉菜单选择相应的 DDNS 服务提供商，并且输入用户名、密码 与域名 即可开启该服务。

具体操作可以参考 DDNS 提供商的 Q&A。

+ 绑定域名使其 IP 自动更新

将你在域名服务器上注册的账号密码输入保存即可。

上述原理说得通俗一点就是，DDNS 让路由器将你的 WAN IP  告诉该域名服务器并定时更新映射关系，这样就省去了亲自不断地去更换 IP 的重复工作。

这种情况下，用户只需 ( 或者说最好是 ) 通过  *http://域名/* 便可以访问到你的主机上的 Web 应用了。

DDNS 推荐有：

+ 花生壳

+ 路由器中提供的 DDNS 提供商

Web 工作原理略谈
-

当你先浏览器地址栏输入 * http://域名/* 后，浏览器先会去本地的系统的 hosts 文件查看有没有对应的 IP 地址。

如果有便直接走这个 IP，如果没有便去该域名服务器找这个域名对应的 IP 地址，然后将这个地址返给浏览器，最终按 IP 访问。

浏览器解析到了之后将域名换成对应的 IP 然后进行访问，如果都正常，此时浏览器就能成功连接至对应 IP 上的服务器上的 Web 应用。