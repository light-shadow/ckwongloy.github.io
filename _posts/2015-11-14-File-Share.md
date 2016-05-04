---
layout: post
title: 文件共享常见思路
category: Auxiliary
tags: [文件共享, FTP]
latest: 2015年11月01日 01:18:44
---

总结一下各种系统之间文件共享的常见思路。

通过网络
-

网络的诞生原因之一就是实现资源共享 ( 另一个是通信 )，所以首先想到的是使用网络协议 FTP 来实现文件共享。

### ** `ftp` 命令详解**

**说明**：ftp 命令是跨平台的。

- 登录

```
ftp
open ip_addr:port # enter username and password
```

- 上传文件

```
put D:/path/to/file.ext
dir
```

- 下载文件

```
mget *.php
bye # 退出出 ftp 客户端
```

### **Windows 搭建 FTP 服务器 Q&A**

- **提示需要用户名和密码，那么用户名和密码是什么？**

是 Windows 服务器上的合法的，已经注册的用户，只有 Windows 系统中已经存在的账户才能登录。

如果输入用户名和密码无法访问，则在 IIS 管理器中选择 "FTP 授权规则"，然后 "添加允许规则"。

最后把该 Windows 系统上合法的用户名分配上去就可以通过 `ftp://ip` 的方式以用户名的形式登录成功了。

浏览器中的登录界面不全，但是在文件系统的地址栏中输入 FTP 服务器 IP 后就可以完整显示登录界面。

- **浏览器中显示为乱码如何处理？**

Windows 文件系统默认编码是由系统安装的时候选择的地区决定的，如果是简体中文版 Windows，那么就是 GBK 编码。

那么在浏览器中选择编码格式也得是 GBK 才不会出现乱码。

- **Windows 中 通过 FTP 命令下载的文件放在哪？**

Windows 上默认为打开终端时，执行 `ftp` 命令时候所在的当前路径。

- **如果站点路径位于 C 盘 ( 系统盘 ) ，如何登录？**

需要在 IIS 管理器中配置 FTP 站点的对文件夹的访问权限。

- **如何让局域网内的计算机能够访问到 Windows 上的 FTP 服务器？**

即局域网内其他计算机上的 FTP 服务器都能访问唯独 Windows 自带的 FTP 服务器无法被访问。

一般是 IIS FTP 服务器配置问题，根据错误提示搜索解决办法。

通过 Samba
-

Samba 是什么就不细说了，其最大的优点之一就是可以将 Linux 下的某个目录以网络硬盘驱动器的形式映射到 Windows 文件系统上。

这样在 Windows 上做 Web 开发，就不用每次上传到 Linux 这个步骤，Samba 服务器帮我们自动完成了这个步骤，总之，在两个平台上访问、同步项目文件都很方便。

- 1、安装 Samba

```
apt-get install samba*
```

- 2、配置 /etc/samba/smb.conf

建议：配置默认文件前做好备份。

```
cd /etc/samba
mv smb.conf smb.conf.bak
vi smb.conf
```

然后配置如下内容：

```
[global]
server string = Samba Server
# workgroup 和 Windows 的工作组一致
workgroup = QYBMYH
# security 为 user 代表通过用户名和密码访问
security = user
encrypt passwords = yes
smb passwd file = /etc/samba/smbpasswd

# 配置共享路径
[root]
netbios name = root
path = /root
browseable = yes
writeable = yes

[home]
netbios name = home
path = /home
browseable = yes
writeable = yes
```

3、为 Samba 服务增加用户：

```
smbpasswd - a root
```

4、启动 Samba 服务

```
/etc/init.d/samba start

# 或者
#service nmbd  start
#service smbd start
```

5、测试 Samba 配置

```
testparm
```

如果执行该命令没反应，则尝试：

```
apt-get install samba-common-bin
```

 这个问题就可以解决，然后重启 Samba 服务即可。

- 通过 VirtualBox

VirtualBox 虚拟机和主机文件共享需要在虚拟机上成功安装 VirtualBox 增强功能，然后就是在管理菜单中直接选择文件共享的路径就行了。

然后只需将路径挂载到 Linux 即可。

```
 sudo mount -t vboxsf __SHARE__ /mnt/share/
```

附录：Samba 常见配置解释
-

smb.conf 主要有三个部分：`[global]`、` [homes]`、 `[printers]`。

- [global] 

定义全局的配置。

- `workgroup` 用来定义工作组。一般情况下，需要将其设置为 Windows 所在的工作组。 （默认是 WORKGROUP）

- `security = user`

这里指定 samba 的安全等级。关于安全等级有四种：

1、share：用户不需要账户及密码即可登录samba服务器

2、user：由提供服务的samba服务器负责检查账户及密码（默认）

3、server：检查账户及密码的工作由另一台windows或samba服务器负责

4、domain：指定windows域控制服务器来验证用户的账户及密码。

- `passdb backend = tdbsam`

passdb backend （用户后台），samba有三种用户后台：smbpasswd, tdbsam和ldapsam

- `smbpasswd`

该方式是使用 smb 工具 smbpasswd 给系统用户（真实用户或者虚拟用户）设置一个Samba 密码，客户端就用此密码访问Samba资源。

smbpasswd 在/etc/samba中，有时需要手工创建该文件。

- tdbsam

使用数据库文件创建用户数据库。数据库文件叫 passdb.tdb，在/etc/samba中。

passdb.tdb用户数据库可使用 `smbpasswd –a` 创建Samba用户，要创建的Samba用户必须先是系统用户。

也可使用pdbedit创建Samba账户。pdbedit参数很多，列出几个主要的：

pdbedit –a username：新建Samba账户。

pdbedit –x username：删除Samba账户。

pdbedit –L：列出Samba用户列表，读取passdb.tdb数据库文件。

pdbedit –Lv：列出Samba用户列表详细信息。

pdbedit –c “[D]” –u username：暂停该Samba用户账号。

pdbedit –c “[]” –u username：恢复该Samba用户账号。

- `ldapsam`

基于LDAP账户管理方式验证用户。首先要建立LDAP服务，设置“passdb backend = ldapsam:ldap://LDAP Server”

- `load printers` 和 `cups options` 两个参数用来设置打印机相关。

除了这些参数外，还有几个参数需要你了解：

- netbios name = MYSERVER     # 设置出现在“网上邻居”中的主机名

- hosts allow = 127.  192.168.12.  192.168.13.    # 用来设置允许的主机，如果在前面加 `;` 则表示允许所有主机

- log file = /var/log/samba/%m.log    #定义samba的日志，这里的%m是上面的 netbios name

- max log size = 50    # 指定日志的最大容量，单位是 K

- [homes]

该部分内容共享用户自己的家目录，也就是说，当用户登录到 samba 服务器上时实际上是进入到了该用户的家目录，用户登陆后，共享名不是homes而是用户自己的标识符，对于单纯的文件共享的环境来说，这部分可以注视掉。

- [printers]

该部分内容设置打印机共享。

附录：Samba 配置案例
-

##### 注意

在试验之前，请先检测 selinux 等防火墙是否关闭，否则可能会试验不成功。
 
### 共享一个目录，任何人都可以访问，即不用输入密码即可访问，要求只读

打开samba的配置文件/etc/samba/smb.conf
[global]部分
把”MY GROUP”改成”WORKGROUP”
把” security = user” 修改为 “security = share”
然后在文件的最末尾处加入以下内容：
[share]
        comment = share all
        path = /tmp/samba
        browseable = yes
        public = yes
        writable = no
 
mkdir /tmp/samba
chmod 777 /tmp/samba
启动samba服务
/etc/init.d/smb start
 
- **测试**

首先测试你配置的 smb.conf 是否正确，用下面的命令：`testparm`。

如果没有错误，则在你的 windows 机器上的浏览器中输入 `file://IP(或主机名)/share` 看是否能访问。
 
### 共享一个目录，使用用户名和密码登录后才可以访问，要求可以读写

打开samba的配置文件/etc/samba/smb.conf
[global] 部分内容如下：
[global]
        workgroup = WORKGROUP
        server string = Samba Server Version %v
        security = user
        passdb backend = tdbsam
        load printers = yes
        cups options = raw
 
然后加入以下内容：
[myshare]
        comment = share for users
        path = /samba
        browseable = yes
        writable = yes
        public = no
 
保存配置文件，创建目录：
mkdir /samba
chmod 777 /samba
然后添加用户。因为在[globa]中” passdb backend = tdbsam”，所以要使用” pdbedit” 来增加用户，注意添加的用户必须在系统中存在。
useradd  user1 user2
pdbedit -a user1  # 添加user1账号，并定义其密码
pdbedit -a user2
pdbedit -L # 列出所有的账号

- 测试

打开IE浏览器输入file://IP/myshare/ 然后输入用户名和密码
 
### 使用linux访问samba服务器

Samba 服务在 linux 下同样可以访问。前提是你的 linux 安装了samba-client 软件包。安装完后就可以使用 smbclient 命令了。

`smbclient //IP/共享名  -U 用户名`，如：

```
[root@localhost]# smbclient //10.0.4.67/myshare/ -U user1
Password:
Domain=[LOCALHOST] OS=[Unix] Server=[Samba 3.0.33-3.29.el5_6.2]
smb: \>
```

出现如上所示的界面。可以打一个”?”列出所有可以使用的命令。常用的有cd, ls, rm, pwd, tar, mkdir, chown, get, put等等，使用 `help +` 命令可以打印该命令如何使用，其中get是下载，put是上传。
另外的方式就是通过 mount 挂载了。如：

```
mount -t cifs //10.0.4.67/myshare /mnt -o username=user1,password=123456
```

格式就是这样，要指定 -t cifs //IP/共享名 本地挂载点  -o后面跟username 和 password

挂载完后就可以像使用本地的目录一样使用共享的目录了。

附录：FTP 命令总结
-

1. open：与服务器相连接；

2. send(put)：上传文件；

3. get：下载某个文件；

4. mget：下载多个文件；

5. cd：切换目录；

6. dir：查看当前目录下的文件；

7. del：删除文件；

8. bye：退出ftp客户端。

9.close：关闭连接

如果想了解更多，可以键入 `ftp> help`。

- 查看命名集

ascii: 设定以ASCII方式传送文件(缺省值)

bell: 每完成一次文件传送,报警提示

binary: 设定以二进制方式传送文件

bye: 终止主机FTP进程,并退出FTP管理方式

case: 当为ON时,用MGET命令拷贝的文件名到本地机器中,全部转换为小写字
cd: 同UNIX的CD命令

cdup: 返回上一级目录

chmod: 改变远端主机的文件权限

close: 终止远端的FTP进程,返回到FTP命令状态,所有的宏定义都被删除

delete: 删除远端主机中的文件

dir [remote-directory] [local-file]: 列出当前远端主机目录中的文件.如果有本地文件,就将结果写至本地文件

get [remote-file] [local-file]: 从远端主机中传送至本地主机中

help [command]: 输出命令的解释

lcd: 改变当前本地主机的工作目录,如果缺省,就转到当前用户的HOME目录

ls [remote-directory] [local-file]: 同DIR

参考
-

+ [快速配置 Samba 将 Linux 目录映射为 Windows 驱动器，用于跨平台编程](http://zyan.cc/samba_linux_windows/)

+ [配置samba服务器](http://www.apelearn.com/bbs/study/23.htm)

+ [Windows FTP](https://technet.microsoft.com/zh-CN/library/hh831655.aspx)

+ [Windows 自带 FTP 服务](http://jingyan.baidu.com/album/455a9950e1e2fba167277862.html?picindex=4)

+ [Samba](https://www.samba.org/samba/docs/)
