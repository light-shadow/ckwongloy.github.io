---
layout: post
title: 文件共享常见思路
category: Auxiliary
tags: [文件共享, FTP]
latest: 2015年11月01日 01:18:44
---

文件共享的需求是很常见的。总结一下各种系统之间文件共享的常见思路。

通过网络
-

网络的诞生原因之一就是实现资源共享 ( 另一个是通信 )，所以首先想到的是使用网络协议 FTP 来实现文件共享。

<!-- break -->

### **Windows FTP Q&A**

- 提示需要用户名和密码，那么用户名和密码是什么？

是 Windows 服务器上的合法的，已经注册的用户；只有系统中有该账户才能登录。

浏览器中的登录界面不全，但是在文件系统的地址栏中输入 FTP 服务器 IP 后就可以完整显示登录界面。

- 浏览器中显示为乱码如何处理？

待处理。

- Windows 中 通过 FTP 命令下载的文件放在哪？

Windows 上默认为打开终端时，执行 `ftp` 命令时候的当前路径。

- 如果站点路径位于 C 盘 （系统盘），如何登录？

- 如何让局域网内的计算机能够访问到 Windows 上的 FTP 服务器？( 局域网内其他计算机上的 FTP 服务器都能访问唯独 Windows 自带的 FTP 服务器无法被访问 )

IIS FTP 服务器配置问题。

### **Windows 上 `ftp` 命令详解**

**说明**：ftp 命令是跨平台的。

- 登录

```
ftp
open ip_addr:port
(enter username and password)
```

- 上传文件

```
put D:/path/to/file.ext
dir
```

- 下载文件

```
mget *.php
# 退出出 ftp 客户端
bye
```

- 命令总结

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

- 通过 VirtualBox 

参考
-

+ [Windows FTP](https://technet.microsoft.com/zh-CN/library/hh831655.aspx)

+ [Windows 自带 FTP 服务](http://jingyan.baidu.com/album/455a9950e1e2fba167277862.html?picindex=4)