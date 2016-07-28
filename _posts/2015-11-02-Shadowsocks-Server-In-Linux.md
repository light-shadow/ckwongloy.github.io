---
layout: post
title: 使用 shadowsocks 轻松搭建 fq env
category: Linux
tags: [shadowsocks, Linux]
latest: 2015年11月04日 22:35:57
---

之前大家翻墙可能都会用到免费的goagent代理，但是他速度慢，链接也不稳定，看油管更是无望，更好的解决方案是shadowsocks。

shadowsocks是一个著名的轻量级socket代理，基于python编写。

如果你有国外的VPS，那么使用shadowsocks搭建一个翻{防屏蔽}墙服务器是一件很轻松的事情！
先看看shadowsocks覆盖的客户端覆盖了多少系统，连OpenWRT都支持！

老高之前买的$4.99一年的VPS，128MB，用起来妥妥的!现在已经升级至$9.99，512MB内存，运行速度更快，翻{防屏蔽}墙速度更是没话说，如果你感兴趣，可以看看VPS购买攻略。
看完本文，你就能够轻松打造独享的翻{防屏蔽}墙环境！甚至能够将shadowsocks安装到你的路由器中，子网设备自动翻墙！再也不需要在网上购买shadowsocks的账号了，也不需要在忍受速度巨慢的免费shadowsocks账号了。

如果你的VPS是搬瓦工，那么恭喜你！你可以直接在后台一键安装shadowsocks，具体如何操作请参考使用搬瓦工(bandwagonhost)后台管理VPS&安全设置中如何一键安装shadowsocks一节，配置完毕后ss就会运行在后台，重启后也会自动运行。

友情提示：有些打包好的ss程序很难保证是否会记录你的服务器信息，所以一定要经常更新服务器端的密码或端口！或者，自己编译一个。

I. 编译shadowsocks-libev
与介绍原版(python版)的shadowbox服务端，老高这次要介绍的是shadowsocks-libev！
项目地址：shadowsocks/shadowsocks-libev
项目作者：@madeye
以下说明转自：shadowsocks-libev 1.2 发布
shadowsocks-libev 是一个 shadowsocks 协议的轻量级实现，是 shadowsocks-android, shadowsocks-ios 以及 shadowsocks-openwrt 的上游项目。其具有以下特点：

• 体积小巧，静态编译并打包后只有 100 KB。
• 高并发，基于 libev 实现的异步 I/O，以及基于线程池的异步 DNS，同时连接数可上万。
• 低资源占用，几乎不占用 CPU 资源，服务器端内存占用一般在 3MB 左右。
• 跨平台，适用于所有常见硬件平台，已测试通过的包括 x86，ARM 和 MIPS。也适用于大部分 POSIX 的操作系统或平台，包括 Linux，OS X 和 gwin 等。
• 协议及配置兼容，完全兼容 shadowsocks 协议，且兼容标准实现中的 JSON 风格配置文件，可与任意实现的 shadowsocks 端或服务端搭配使用。
shadowsocks-libev 包括服务端和客户端两部分，一共三个模块。
• ss-server：服务器端，部署在远程服务器，提供 shadowsocks 服务。
• ss-local：客户端，提供本地 socks5 协议代理。
• ss-redir：客户端，提供本地透明代理，需要与 NAT 配合使用，具体使用方法参见文档。
	
II. 原版shadowsocks
请参考 安装shadowsocks-python并启用chacha20加密

准备好的shadowsocks怎么用呢？请看下文。
III. 服务端
你的系统最好是redhat，centos，ubuntu或者debian
安装必要组建
centos执行 yum install build-essential autoconf libtool openssl-devel gcc -y
debian执行 apt-get install build-essential autoconf libtool libssl-dev gcc -y
安装git

centos执行 yum install git -y
debian执行 apt-get install git -y

装完了执行 git --version检查是否安装成功。

shadowsocks 下载及编译

```
git clone https://github.com/madeye/shadowsocks-libev.git
cd shadowsocks-libev
./configure
make && make install
程序会被安装至/usr/local/bin/下，该路径已存在于系统变量中，所以可以直接使用程序名运行。
/usr/local/bin/ss-local
/usr/local/bin/ss-tunnel
/usr/local/bin/ss-server
/usr/local/bin/ss-redir
```

如何使用
在使用shadowsocks的时候，你可以随时输入命令ss-server -h查看使用帮助。

运行服务端
ps.执行命令时，请去掉方括号。加密方式可选择：
encrypt method: table, rc4, rc4-md5,aes-128-cfb, aes-192-cfb, aes-256-cfb,bf-cfb, camellia-128-cfb, camellia-192-cfb,camellia-256-cfb, cast5-cfb, des-cfb, idea-cfb,rc2-cfb, seed-cfb, salsa20 and chacha20

选择加密方式的时候请注意客户端是否支持，同时官方不推荐rc4,des-cfb,table,salsa20-ctr这四种加密方式。

命令行运行

- 前台运行服务端：

``` shell
ss-server -s [yourip] -p [Server Port] -k [password] -m [encryption methods]
```

后台运行服务端：

``` shell
nohup ss-server -s [Server IP] -p [Server Port] -k [Password] -m [encryption methods] &
```

使用配置文件运行
注意，config.json需要自己创建，并且需要绝对路径
使用-c 指定配置文件， -f 创建守护进程：
vim config.json
将下面的配置写入config.json
使用的时候请删除注释文字，否则可能会报错。

```
# 注释版配置
{
    "server":"servier_ip",   # 服务器IP
    "server_port":65432,     # ss服务器所使用的端口号，建议改到30000-60000
    "password":"password",   # ss服务器密码，轻易不要分享
    "timeout":60,            # 超时时间，建议设置为60
    "method":"rc4-md5"         # 加密方式，需要和客户端配合设置
}
# 复制粘贴版
{
    "server":"servier_ip",
    "server_port":65432,
    "password":"password",
    "timeout":60,
    "method":"rc4-md5"
}
```

然后执行 `ss-server -c config.json -f /tmp/ss.pid` 即可。

写入开机脚本

```
echo "/usr/local/bin/ss-server -c /home/***/config.json -f /tmp/ss-server.pid" >> /etc/rc.local
```

为了安全起见（非必需），我们使用非root用户运行ss，如何实现呢？

```
# 如果没有非root用户
# 我们现在就新建一个普通用户
useradd laogao
# 为laogao创建密码
passwd laogao
> 输入两次密码
# 切换用户至laogao
su - laogao
# 在主目录创建第一个配置文件，配置格式请参考`使用配置文件运行`一节
vim ~/config1.json
# 保存完毕即可立即运行
/usr/local/bin/ss-server -c ~/config1.json -f /tmp/ss1.pid
# 设置开启自启动
# 我们先切换至root用户
su - root
# 接着在启动脚本里加入启动命令
# 指定ss以用户laogao的权限运行
# 执行下面的命令时一定注意文件路径是否正确
echo "su - laogao -c \"/usr/local/bin/ss-server -c /home/laogao/config1.json -f /tmp/ss1.pid\"" >> /etc/rc.local
```

更高级的运行方式
请参考 使用supervisor托管shadowsocks
多用户(实例)运行
可能大家都注意到了，在上一节我们提到了config1.json是第一个配置文件，这是为什么呢？
没有错，我们还可以创建配置文件2----config2.json，并以同样的方式运行。
这样，我们的一个服务器就可以对外提供两种，端口不同、密码不同、加密方式也可能不同的shadowsocks服务，然后共享给不同的基友，是不是很方便啊。
需要注意的是，多个配置文件一定要注意的是，配置的端口和pid文件一定是不同的！而密码及加密方式，甚至服务器IP都没有限制。
有些版本的ss提供了更方便的配置方式，但是老高没试过，所以在此就不深究。
例子如下(注意端口不能相同)

```
config1.json
{
    "server":"1.1.1.1"
    "server_port":11111,
    "password":"test1",
    "timeout":100,
    "method":"aes-256-cfb"
}
config2.json
{
    "server":"2.2.2.2
    "server_port":22222
    "password":"test2",
    "timeout":100,
    "method":"rc4-md5"
}

# 多实例运行例子：
/usr/local/bin/ss-server -c ~/config1.json -f /tmp/ss1.pid
/usr/local/bin/ss-server -c ~/config2.json -f /tmp/ss2.pid


# 查看进程
ps -ef|grep ss-server
xxx      1344     1  0 20:12 ?        00:00:00 ss-server -c /home/xxx/config1.json -f /tmp/1.pid
xxx      1491     1  0 20:24 ?        00:00:00 ss-server -c /home/xxx/config2.json -f /tmp/2.pid
```

使用supervisor托管shadowsocks
请参考使用supervisor托管shadowsocks，让shadowsocks运行的更稳定！
至此，服务器端可设置已完成！

IV. 客户端
当我们搭建完成了shadowsocks服务端，其实只完成了FQ的一半工作，想要真正与世界联通，还需要一个客户端与服务端连接。

ss的客户端也是由clowwindy大牛提供，他的另一个作品ChinaDNS也很NB，大家可以关注一下！
客户端下载
shadowsocks的客户端、服务端还有chrome插件Proxy-SwitchyOmega_v2.3.13的下载，请移步 shadowsocks相关资源下载

下面老高以ShadowsocksX-2.6为例，讲讲如何配置
首先安装完毕后找到应用程序并运行
运行后程序会最小化在系统右上角（Windows在右下角），打开菜单，点击服务器-->>服务器设定

配置方法

其中1.1.1.1即服务器的IP地址
端口号对应服务器设定的server_port
加密方式和密码就更不必说了
添加完毕，点击确定后，客户端和服务器马上就可以见面了。
最后一步
打开Shadowsocks，教程完毕！

ps.想要在快速的在影梭配置服务器，可以通过在PC端点击生成二维码按钮，然后使用影梭扫描即可！

