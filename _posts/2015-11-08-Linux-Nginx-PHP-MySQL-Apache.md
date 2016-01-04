---
layout: post
title: LEMPA 环境搭建
category: PHP
tags: [PHP, Linux, Nginx, MySQL, Apache]
latest: 2015年11月15日 13:23:27
---

今天主要总结的是 LEMPA 开发环境的搭建。不过先回顾下 Windows 上 Nginx 遇到过哪些问题，对 Linux 下是否有借鉴意义。

Nginx 与 Apache  共存时端口分配问题
-

使 Apache 监听 80；Nginx 监听 8080 。

_httpd.conf_ 中直接搜 `listen`，后面不用改，默认是 80 。

_nginx.conf_ 中搜 `server_name  localhost;` 上面就是 `127.0.0.1`。根路径监听的端口，改为 `8080`，重启 nginx 即可。

```
cd c:\
unzip nginx-1.9.6.zip
cd nginx-1.9.6
start nginx
tasklist /fi "imagename eq nginx.exe"
```

Nginx 常用的几个命令：
-

- `nginx -s stop`: fast shutdown 。

- `nginx -s quit`: graceful shutdown 。

- `nginx -s reload` ：changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes

- `nginx -s reopen`：re-opening log files。

LEMPA
-

LEMPA 的含义现在看来已经比较丰富了：Linux + Apache + Nginx(Engin-x) + MySQL/MemCached/MongDB + PHP/Python。

**- Linux 下 Apache 和 Nginx 共存**

```
apt-get install apache
```

更改 Apache 的监听端口为 8888：/etc/apache2/ports.conf

通过 apt-get 方式安装 Ngnix 的默认安装路径在：

- /etc/ngnix/

- /usr/share/nginx/www/

- **MySQL**

如果是通过包管理器安装 MySQL 的话，只需安装 mysql-server 和 mysql-client 这两个就行了，其他需要的软件包包管理器会自动解决。

```
apt-get install mysql-server mysql-client
```

下载好之后，解压安装的过程中需要设置密码。

- **PHP 安装与配置**

Raspberry 上 PHP 的安装位置在: _/usr/share/php5_ 。

（其实默认 Raspberry 通过 apt-get 方式安装的软件的默认安装路径就在 /usr/share/ 中）。

Php5.4 需要安装 php5-fpm

```
$ sudo apt-get autoclean
$ sudo apt-get autoremove
$ sudo apt-get install -f php5-fpm
```

- **PHP 与 Nginx 整合**

首先确保已经正确安装 PHP-FPM。通过 `apt-get` 方式安装的无须多余配置，直接修改 _/etc/nginx/nginx.conf_ 。

PHP 与 Nginx 的整合详见我的另一篇文章：[_Nginx 基础：安装与配置_](../php/nginx-basic-configuration.html) 。

- 找不到 Imagecreatetruecolor() ？

需要安装 PHP GD 库：

```
$ sudo apt-get install php5-gd
```

Mysql查看版本号的五种方式介绍
-

- 进入 MySQL 客户端的时候会提示

- 通过命令 status

- 使用系统函数

```
select version() ;
```

- mysql --help | grep distrib 

- 包管理工具（根据不同系统 rh系列或则是bsd系列） 

```
# RedHat 系
rpm -qa|grep mysql 
# Debian 系
dpkg --get-selections | grep mysql
```

- 其他

sudo dpkg --configure -a

MySQL 忘记密码重置
-

进入 MySQL 安全模式，即当 MySQL 起来后，不用输入密码就能进入数据库。 
命令为： 

```
mysqld-nt --skip-grant-tables 
```

使用空密码登录后：

```
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('your_password'); 
```

或者：

```
use mysql
update mysql.user set password=PASSWORD('your_password') where user='root'; 
flush privileges; 
```

如果出现错误请检查环境变量或者是否 MySQL 服务未关闭。

参考
-

- _<http://nginx.org/en/docs/windows.html>_

- _<http://shumeipai.nxez.com/2013/08/25/install-and-config-lnmp.html>_

- _[Linux（基于CentOS的LAMP）环境搭建图文教程](http://faq.comsenz.com/library/system/env/env_linux.htm)_
