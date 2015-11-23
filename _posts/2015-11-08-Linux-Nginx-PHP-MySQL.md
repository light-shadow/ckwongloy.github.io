---
layout: post
title: LEMPA 环境搭建
category: PHP
tags: [PHP, Linux, Nginx, MySQL, Apache]
---

今天主要总结的是 LAEMP 开发环境的搭建。不过先回顾下 Windows 上 Nginx 遇到过哪些问题，对 Linux 下是否有借鉴意义。

- 与 Apache  共存时端口分配问题

使 Apache 监听 80；Nginx 监听 8080 。

Httpd.conf 中直接搜 listen，后面不用改，默认是 80

Nginx.conf 中搜 server_name  localhost; 上面就是 127.0.0.1 根路径监听的端口，改为 8080，重启 Nginx 即可。

```
cd c:\
unzip nginx-1.9.6.zip
cd nginx-1.9.6
start nginx
tasklist /fi "imagename eq nginx.exe"
```


nginx -s stop	fast shutdown
nginx -s quit	graceful shutdown
nginx -s reload	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen	re-opening log files

- 将 Nginx 作为服务运行在 Windows 上

LAEMP
-

LAEMP 的含义现在看来已经比较丰富了：Linux + Apache + Nginx(Engin-x) + MySQL/MemCached/MongDB + PHP/Python。

1. Linux 下 Apache 和 Nginx 共存

更改 Apache 的监听端口为 8888：/etc/apache2/ports.conf

通过 apt-get 方式安装 Ngnix 的默认安装路径在：

- /etc/ngnix/

- /usr/share/nginx/www/

2. Nginx 和 PHP 整合

参考
-

- <http://nginx.org/en/docs/windows.html>

