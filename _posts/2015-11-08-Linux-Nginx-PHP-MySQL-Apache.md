---
layout: post
title: LEMPA 环境搭建
category: PHP
tags: [PHP, Linux, Nginx, MySQL, Apache]
latest: 2015年11月15日 13:23:27
---

今天主要总结的是 LEMPA 开发环境的搭建。不过先回顾下 Windows 上 Nginx 遇到过哪些问题，对 Linux 下是否有借鉴意义。

### 复习：Nginx 与 Apache  共存时端口分配问题

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

LAMP
-

由于 PHP 和 Apache 的亲密关系，LAMP 依然是 PHP 网站中最常用的架构。

### LAMP 中 Apache 的配置

- 修改 Apache 网站根目录

```
cd /etc/apache2/sites-enabled/
vi  000-default.conf
```

然后在配置文件的 `<VirtualHost>` 代码块中指定 `DocumentRoot` 字段的值为你想设置的路径即可。比如：

```
DocumentRoot /var/www/htdocs
```

##### **注意**

`<VirtualHost>` 块中`<VirtualHost:*80>` 的端口要与你在 /etc/apache2/ports.conf 中的 `listen` 配置一致，否则 Apache 将不会对你在 /etc/apache2/sites-enabled/000-default.conf 中的配置做任何的响应。

比如，如果你设置 Apache 监听的端口号是 8000，而你在 `<VirtualHost>` 字段后面设置的是 80，那么来自于对本机 80 端口的请求将不会由 Apache 处理。

如果配置了 Nginx 的默认端口也是 80，那么就会由 Nginx 处理。

如果

### LAMP 中 Apache 和 PHP 整合

如果是通过包管理器， 比如 apt-get 安装的 Apache 和 PHP，那么默认安装好之后，Apache 和 PHP 就已经关联好了。

可以在 /etc/apache2/mods/enabled/__php5.load__ 中查看或者修改相关配置，里面的内容如下：

```
LoadModule php5_module /usr/lib/apache2/modules/libphp5.so
```

可以发现这和在 WAMP 环境中对 httpd.conf 的配置 PHP 支持是一样的：

```
#让 Apache载入php处理模块，安装目录请灵活修改，Apache2.4 版本的需要响应改成2_4
LoadModule php5_module "C:/Dev/PHP5615/php5apache2_4.dll"
```

都是将 php 的处理模块，都是动态加载库文件，加载到 Apache 配置即可。

此外，Apache 还会读取 /etc/apache2/mods/enabled/__php5.conf__ 里面对 php 脚本处理方式配置，关键配置如下：

```
<FilesMatch ".+\.ph(p[345]?|t|tml)$">
    SetHandler application/x-httpd-php
</FilesMatch> 
```

这和 WAMP 环境中的配置也是类似的，如下：

```
#下述代码表示：当有一个资源是 *.php 的时候就由交给 php 来处理
AddType application/x-httpd-php .php .phtml
```

#### 配置 在 HTML 嵌入 PHP 功能

仅仅是上面的配置，Apache 只会将通过上面的正则表达式的文件后缀才交给 PHP 处理，如果想在 HTML 中嵌入 PHP 脚本的话，仅靠上面的配置不行。

有两种解决办法，一是将 HTML 文件后缀命名为 .php，另一种是修改 php5.conf 中的正则表达式。

如果觉得修改正则不方便，可以再添加一个 `<FilesMatch>` 代码块，专门为 .html 后缀的文件设置 Handler 为 application/x-httpd-php。类似如下：

```
<FilesMatch ".+\.html$">
    SetHandler application/x-httpd-php
</FilesMatch> 
```

但建议第一种做法，因为这样可以见名知意，不然纯 HTML 文件还要交给 PHP 引擎处理，这是没必要的。

#### 配置首页文件 DirectoryIndex

Apache 服务器默认的首页文件就是 .php  和 .html 两种，可以在 /etc/apache2/mods-enabled/dir.conf 中修改，但一般默认的就够了。

也可以在每个虚拟主机中修改，类似如下：

```
<VirtualHost *:7777>
# do something
DirectoryIndex index.php index.html
# do something more
```

#### 设置 Apache 监听的端口

修改 /etc/apache2/ports.conf  中的 Listen 字段就行了。

Apache 可以监听多个端口，但是一个端口只能被一个服务或进程所监听/占用。

LEMPA
-

LEMPA 的含义现在看来已经比较丰富了：Linux + Apache + Nginx(Engin-x) + MySQL/MemCached/MongDB + PHP/Python。

**- Linux 下 Apache 和 Nginx 共存**

```
apt-get install apache
apachectl start | restart | stop
# 或者 /etc/init.d/apache2 restart
```

更改 Apache 的监听端口为 8888：/etc/apache2/ports.conf

通过 apt-get 方式安装 Ngnix 的默认安装路径通常在一下几个目录：

- /etc/ngnix/

- /usr/share/nginx/www/

- /var/www/html/

**Linux 下 MySQL 的安装以及 FAQ**
-

如果是通过包管理器安装 MySQL 的话，只需安装 mysql-server 和 mysql-client 这两个就行了，其他需要的软件包包管理器会自动解决。

```
apt-get install mysql-server mysql-client
```

下载好之后，解压安装的过程中需要设置密码。

#### **MySQL FAQ**

- **Can’t connect to local MySQL server through socket '/path/to/mysql.sock'?**

查看 /etc/rc.d/init.d/mysqld status 看看mysql 是否已经启动，另外看看是不是权限问题。

- **配置 MySQL 允许被远程访问**

首先确保 MySQL 服务器地址有无写错，IP 后面不要带端口号。

1、先将 mysql 服务停掉

```
/etc/init.d/mysql stop
```

2、查看并修改 mysql 配置文件

```
vi /etc/mysql/my.cnf
```

特别要留意其中的两项： `bind_address` 和 `skip_networking`。

其中 bind_address 一定不能为127.0.0.1，否则只能在本地连接。

skip_networking 一定不能出现，否则只接受 unix socket 而不能提供 tcp socket 服务，建议将 bind_address 和 skip_networking 直接都注释掉。

3、重启 mysql 服务

```
# /etc/init.d/mysqld start
```

4、对用户授权，允许指定用户远程访问

最简单的方式是将 mysql 库中 user 表中的对应的用户的 host 设置为%，亦即允许该用户从任意 ip 远程访问

```
# mysql -u root -ppassword    # 进入 mysql 控制台
# mysql>use mysql;
# mysql>update user set host = '%' where user = 'root';    # 这个命令执行错误时可略过
# mysql>flush privileges;
# mysql>select host, user from user;     # 检查  `%` 是否插入到数据库中
#mysql>quit
```

##### **说明**

在执行上面的 update 操作的时候，可能会出现 `ERROR 1062 (23000): Duplicate entry '%-root' for key 'PRIMARY'` 错误，但是实际上其实是成功了的。

一般情况下此时就能满足远程访问的要求，但对于某些系统还需要检查防火墙设置，和 ip 访问策略，以防系统对网络访问的限制造成无法远程访问 mysql。

对于 CentOS 系统而言，最好检测 iptables 设置。具体步骤如下：

- 暂停 iptables 服务

```
service iptables stop
```

- 查看 iptables 配置文件

```
vi /etc/sysconfig/iptables
```

- 也许会看到如下内容

```
:OUTPUT ACCEPT [1009120:257185920]
-A INPUT -p tcp -m tcp --dport 3306 -j ACCEPT
-A INPUT -s 118.144.89.18 -p tcp -m tcp --dport 3306 -j ACCEPT
-A INPUT -s 123.127.177.239 -p tcp -m tcp --dport 3306 -j ACCEPT
```

建议直接开放 3306 端口，而不是仅限定某个 ip 才可以访问 3306

- 重启 iptables 服务

```
service iptables start
```

- **PHP 安装与配置**

Raspberry 上 PHP 的安装位置在: _/usr/share/php5_ 。

（其实默认 Raspberry 通过 apt-get 方式安装的软件的默认安装路径就在 /usr/share/ 中）。

如果是 PHP5.4 则需要安装 php5-fpm：

```
$ sudo apt-get autoclean
$ sudo apt-get autoremove
$ sudo apt-get install -f php5 php5-fpm
```

- **PHP 与 MySQL 整合**

最简单的方式就是通过包管理器直接安装 PHP 的 MySQL 扩展就行了：

```
apt-get install php5-mysql
```

上述命令会把 mysql、mysqli、pdo 这三种操作 MySQL 的扩展全部安装。可以通过 `phpinfo();` 查看有无它们的信息。

- **PHP 与 Nginx 整合**

首先确保已经正确安装 PHP-FPM。通过 `apt-get` 方式安装的无须多余配置，直接修改 _/etc/nginx/nginx.conf_ 。

PHP 与 Nginx 的整合详见我的另一篇文章：[_Nginx 基础：安装与配置_](../php/nginx-basic-configuration.html) 。

- 找不到 Imagecreatetruecolor() ？

需要安装 PHP GD 库：

```
$ sudo apt-get install php5-gd
```

开启启动相关服务
-

总结一下，上面的配置中出现的服务一共有：apache2, nginx, mysql, php5-fpm。

其实通过 apt-get 安装好之后，默认已经为这些服务 ( 位于 /etc/init.d/ ) 创建了在 /etc/rc`1~7`.d 中的符号链接，但是命名还没有改过来。

如要设置其在字符界面开机自启动，即对应的配置路径 /etc/rc3.d/，则只需把它们的命名从 `K` 开头的改为 `S` 开头的即可。

这是因为对于以 K 开头的文件，系统将终止对应的服务，对于以 S 开头的文件，系统将启动对应的服务。

举一个例子就知道了：

```
mv K01apache2 S03apache2
```

就这样就行了，注意数字后面的 **服务名不能改变**，其他服务在不同的 Linux 自启动配置原理也类似。

此外，还可直接在 /etc/rc.local 中加入想要在多用户运行环境下 ( Debian 系是 2~5 ) 开启执行的某些 Shell 命令。

比如：

```
!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# <lamCJ>
/etc/init.d/nginx start
/etc/init.d/php5-fpm start
/etc/init.d/samba start
/etc/init.d/auto_resolv.sh
# </lamCJ>

exit 0
ulimit -HSn 65536
```

##### 注意：如果是运行 Shell 脚本，这需要保证其有执行权限。

#### 在Ubuntu Server下搭建 LAMP 记录

``` shell
sudo tasksel install apache2 php5 mysql-server php5-mysql Sudo service apache2 restart
```

- **软连接有什么好处?**

防止误删除,计算误删除软连接文件后源文件并没有被删除。

- **虚拟主机配置**

修改客户端 hosts 文件

	- Linux - /etc/hosts
	- Windows10 - C:\Windows\System32\drivers\etc

使得二级域名都指向同一个 IP 地址。 通过集合的方式创建三个目录:

``` shell
sudo mkdir -p /wwwroot/{video, bbs, oa}
```

Apache 默认网站目录在: /var/www/, 默认配置目录在:/etc/apache2/site-avaliable/.

``` shell
sudo cp default video
sudo cp default bbs
sudo cp default oa
```

然后配置多个虚拟主机,以配置 video.imooc.com 为例说明: 

1、 添加 ServerName: `ServerName video.imooc.com`

2、 更改 DocumentRoot 为子域名项目文件夹实际所在路径: `DocumentRoot /wwwroot/video`

3、启用新建配置 -> 在 /etc/apache2/site-enabled 下创建 /etc/apache2/site-
available 下新建配置的软连接文件:

``` shell
sudo ln -s ../site-available/video video
```

4、重启 Apache: `sudo service apache2 restart`

5、 在浏览器访问不同的子域名进行测试

- **数据迁移**

1、 停止 MySQL 服务:sudo service mysql stop
2、 制定数据迁移的目标位置(实际大多数是另一块硬盘),这里模拟一下:
    
``` shell
sudo mkdir /mysqldata
sudo chown -vR mysql:mysql /mysqldata
```

MySQL 默认的存储目录在:/var/lib/mysql

- Apparmor 的修改 允许远程访问 MySQL

``` shell
sudo vi /etc/mysql/my.cnf

# 注释掉 bind-address
```

然后在 MySQL 中的用户数据库中新建一个用户并允许使用公网 IP 访问即可,登 录的时候就使用刚刚新建的专用用户名密码。

#### 其他自启动方式

- update-rc.d

```
update-rc.d ssh enable    #  SSH 服务开机自动启动
update-rc.d ssh disabled    #  SSH 服务开机关闭
```

如果不知道服务名字可以去 /etc/init.d/ 中查找。

### centos 下 升级 php

- 检查PHP组件

``` shell
rpm -qa |grep php
```

- 新增开发库

新建一个repo文件

```
vim /etc/yum.repos.d/CentOS-Testing.repo

# 复制以下内容,保存并退出。
# CentOS-Testing:
# !!!! CAUTION !!!!
# This repository is a proving grounds for packages on their way to CentOSPlus and CentOS Extras.
# They may or may not replace core CentOS packages, and are not guaranteed to function properly.
# These packages build and install, but are waiting for feedback from testers as to
# functionality and stability. Packages in this repository will come and go during the
# development period, so it should not be left enabled or used on production systems without due
# consideration.
[c5-testing]
name=CentOS-5 Testing baseurl=http://dev.centos.org/centos/$releasever/testing/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://dev.centos.org/centos/RPM-GPG-KEY-CentOS-testing includepkgs=php*
```

也可以复制这里的内容: <http://dev.centos.org/centos/5/CentOS-Testing.repo> 升级PHP组件, 这里通过官方的开发库后我们可以使用简单命令升级到最新版本的php。

``` shell
yum update
service httpd restart

# 再次检查 PHP 组件
rpm -qa |grep phpc entos-php-new-2
``

PHP 已升级到最新的版本。

附录：MySQL 查看版本号的五种方式介绍
-

- 进入 MySQL 客户端的时候会提示

- 通过命令 status

- 使用系统函数

```
select version() ;
```

- mysql --help | grep distrib 

- 包管理工具（根据不同系统 rh系列或则是bsd系列） 

``` shell
# RedHat 系
rpm -qa|grep mysql 
# Debian 系
dpkg --get-selections | grep mysql
```

参考
-

- _<http://nginx.org/en/docs/windows.html>_

- _<http://shumeipai.nxez.com/2013/08/25/install-and-config-lnmp.html>_

- _[Linux（基于CentOS的LAMP）环境搭建图文教程](http://faq.comsenz.com/library/system/env/env_linux.htm)_

- _[mysql远程访问失败解决方案](http://blog.csdn.net/yyrookie/article/details/17589849)_

- <http://itlab.idcquan.com/linux/special/linuxcom/>
