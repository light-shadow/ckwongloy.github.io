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

LAEMP 的含义现在看来已经比较丰富了：Linux + Apache + Nginx(Engin-x) + MySQL/MemCached/MongDB + PHP/Python。

1. Linux 下 Apache 和 Nginx 共存

更改 Apache 的监听端口为 8888：/etc/apache2/ports.conf

通过 apt-get 方式安装 Ngnix 的默认安装路径在：

- /etc/ngnix/

- /usr/share/nginx/www/

2. PHP 安装与配置
-

Raspberry 上 PHP 的安装位置在: _/usr/share/php5_ 。

（其实默认 Raspberry 通过 apt-get 方式安装的软件的默认安装路径就在 /usr/share/ 中）。

Php5.4 需要安装 php5-fpm

```
$ sudo apt-get autoclean
$ sudo apt-get autoremove
$ sudo apt-get install -f php5-fpm
```

- 与 Nginx 整合

首先确保已经正确安装 PHP-FPM。通过 `apt-get` 方式安装的无须多余配置，直接修改 _/etc/nginx/nginx.conf_ 。

PHP 与 Nginx 的整合详见我的另一篇文章：[_Nginx 基础：安装与配置_](http://127.0.0.1:4000/php/nginx-basic-configuration.html) 。

- 找不到 Imagecreatetruecolor() ？

需要安装 PHP GD 库：

```
$ sudo apt-get install php5-gd
```

Linux 下 MySQL 的安装与配置
-

### Mysql查看版本号的五种方式介绍

- 进入 MySQL 客户端的时候会提示

- 通过命令 status

- 使用系统函数

```
Select version() ;
```

- mysql --help | grep Distrib 

- 包管理工具（根据不同系统 rh系列或则是bsd系列） 

```
# RedHat 系
rpm -qa|grep mysql 
# Debian 系
dpkg --get-selections | grep mysql
```

- 其他

sudo dpkg --configure -a


参考
-

- _<http://nginx.org/en/docs/windows.html>_

- _<http://shumeipai.nxez.com/2013/08/25/install-and-config-lnmp.html>_

- _[Linux（基于CentOS的LAMP）环境搭建图文教程](http://faq.comsenz.com/library/system/env/env_linux.htm)_
