---
layout: post
title: CentOS7 搭建 LANMP
category: Linux
tags: [CentOS, Apache, Nginx, PHP]
latest: 2015年07月22日 21:45:59
---

CentOS 发布7.0版本，新版本带来很多特性，除了内核更新到3.10外，支持 Linux 容器、Open VMware Tools 及 3D 图像能即装即用，转用 systemd、firewalld 及 GRUB2 ，而默认的文件系统为XFS等等,可以说是比较重大的升级。

使用Centos7搭建LAMP服务器平台，记录如下:

1.启用Apache2

Centos7默认已经安装httpd服务，只是没有启动。如果你需要全新安装，可以

```
yum install -y httpd
```

启动服务：`systemctl start httpd.service`
设置开机自动启动：`systemctl enable httpd.service`

HTTP服务器已经启动，进行一下简单配置

``` shell
vim /etc/httpd/conf/httpd.conf #编辑文件
ServerSignature On  #添加，在错误页中显示Apache的版本，Off为不显示
Options Indexes FollowSymLinks  #修改为：Options Includes ExecCGI FollowSymLinks（允许服务器执行CGI及SSI，禁止列出目录）
#AddHandler cgi-script .cgi#修改为：AddHandler cgi-script .cgi .pl （允许扩展名为.pl的CGI脚本运行）
AllowOverride None #修改为：AllowOverride All （允许.htaccess）
AddDefaultCharset UTF-8#修改为：AddDefaultCharset GB2312　（添加GB2312为默认编码）
#Options Indexes FollowSymLinks   #修改为 Options FollowSymLinks（不在浏览器上显示树状目录结构）
DirectoryIndex index.html   #修改为：DirectoryIndex index.html index.htm Default.html Default.htm index.php（设置默认首页文件，增加index.php）
MaxKeepAliveRequests 500  #添加MaxKeepAliveRequests 500 （增加同时连接数）
:wq! #保存退出

systemctl restart httpd.service #重启apache 
rm -f /etc/httpd/conf.d/welcome.conf /var/www/error/noindex.html #删除默认测试页
```

2.设置防火墙
Centos7下的防火墙已经由iptables改为firewall，使用firewall-cmd命令开放80及443端口:

```
firewall-cmd –permanent –zone=public –add-service=http
firewall-cmd –permanent –zone=public –add-service=https
firewall-cmd –reload
```

设置SELinux为permissive模式，命令行下 setenforce 0 立即生效，重启失效。

编辑 vim/etc/sysconfig/selinux  SELinux=enforcing 修改为disabled 关闭SELinux，重启永久生效。

然后输入机器本地地址 localhost 查看是否安装成功。

3.安装MariaDB数据库

CentOS 7.0中，已经使用MariaDB替代了MySQL数据库,原因你懂的,MYSQL被Oracle收购以后，前景堪忧，所以MYSQL兄弟MariaDB就出来了，继续开源事业。

安装：yum -y install mariadb-server mariadb
启动：

```
systemctl start mariadb.service
systemctl enable mariadb.service
```

配置：`cp /usr/share/mysql/my-huge.cnf /etc/my.cnf ` 覆盖原配置就好了。
设置数据库管理员密码：mysql_secure_installation   一路y就可以了，当然第一次y后面要输入两次密码。

4.安装PHP5
安装PHP主程序： `yum -y install php`

安装PHP组件，使PHP支持 MariaDB

```
yum -y install php-gd php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-snmp php-soap curl curl-devel
```

重启： systemctl restart httpd.service
配置： vi /etc/php.ini

``` shell
date.timezone = PRC #把前面的分号去掉，改为date.timezone = PRC

disable_functions = passthru,exec,system……#列出PHP可以禁用的函数，如果某些程序需要用到这个函数，可以删除，取消禁用。

expose_php = Off #禁止显示php版本的信息

short_open_tag = ON #支持php短标签

open_basedir = .:/tmp/  #设置表示允许访问当前目录(即PHP脚本文件所在之目录和/tmp/目录,可以防止php木马跨站,如果改了之后安装程序有问题(例如：织梦内容管理系统)，可以注销此行，或者直接写上程序的目录/data/www.osyunwei.com/:/tmp/
```

测试一下：vi /var/www/html/index.php  输入 `<?php phpinfo(); ?>`  wq保存退出。打开`http://localhost` 如果能看到PHP配置信息页，说明PHP服务器正常。

##### Nginx + PHP

```
 location ~ \.php$ {
        root           html;
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
      # 或者 
  # fastcgi_param SCRIPT_FILENAME /var/www/html$fastcgi_script_name;
        include        fastcgi_params;
    }
```

#### PHP GD 库

网站测试图片不能上传，经检查图片其实已经上传成功，只是因为php没有开启php gd库(上传图片后php对图片进行处理，加logo等)。

运行： `yum -y install php-gd`
失败，显示如下：

这是因为没有第三方yum源支持的原因，于是我安装了：

```
wget http://www.atomicorp.com/installers/atomic
```

再次运行了命令，安装成功，测试 `phpinfo();`  还是没有成功。

我找到gd库的安装路径：/etc/php.d/gd.ini  发现内容为空，难怪，打开文件，加上这句：

```
extension=gd.so
```

重启服务器 : `service  httpd restart`，成功。

题外话：不用把全部东西都写在php.ini这个文件里,只是需要把*.ini文件写在/etc/php.d/文件夹就可以了,系统会自动把这个目录下的*.ini读入php.ini ； 

gd库的文件存放在：/usr/lib/php/modules/gd.so

#### MariaDB

``` shell
yum search mysql | grep ^mysql
```

安装好 MariaDB 后进入 MariaDB 的命令依然是 mysql

I have successfully installed MySQL or MariaDB, after rebooting my system and running mysql -u root -p, I get the following error message:

``` shell
[~]$ mysql -u root -p
Enter password: 
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)
```

This definitely might be because you haven’t start MySQL server or MariaDB server.
Open Terminal and the command below to check the status:

``` shell
# service mysql status
```

If the command above returns an error, you have definitely not started the server after booting.
Now start MariaDB:

``` shell
# systemctl start mariadb.service
OR
# systemctl start mysqld.service
 
Enable auto start at boot time:
# systemctl enable mariadb.service
OR
# systemctl enable mysqld.service
```

If after all these and you still can’t access MariaDB, it means your installation wasn’t completed successfully.

#### 其他

在 RedHat 系 Linux 上搭建 LAMP 环境和 Debian 系 Linux 不同之处有如下几处：

- Apache 的软件包名在 Redhat/CentOS 中叫做 httpd，而在 Debian 系中就叫 apache；服务名分别对应 httpd.service 和 apache2。

- 重启服务：RedHat/CentOS 中可以通过 service 和 systemctl 来管理服务；Debian 系中可以通过 service 和 /etc/init.d/service_name 来管理。

- yum 可以自动关联 Apache 和 PHP 而 apt-get 安装结束后还要手动载入 PHP。

```
yum install httpd
systemctl start httpd
```

安装好后网站目录和 Apache 服务器配置目录分别为：

/var/www/html/

/etc/httpd/conf.d/welcome.conf

- 查看 Apache 版本

```
httpd -v
```

安装 PHP

```
yum install php -y
```

通过 yum 安装好之后会 Apache 中会自动载入 PHP，因此如果只需完成简单任务，不必做更多的人工配置，只需重启 Aapche 然后就可以在服务器地址中访问到 PHP 脚本，比如

- systemctl restart httpd
- vi /var/www/html/index.php

```php
<?php
phpinfo() ;
```

- 查看端口占用情况

```
netstat -anp | grep 80
lsof -i:80
```

- 查看系统用户

用户列表文件：/etc/passwd
用户组列表文件：/etc/group
查看系统中有哪些用户：cut -d : -f 1 /etc/passwd
查看可以登录系统的用户：cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1
查看用户操作：w命令(需要root权限)
查看某一用户：w 用户名
查看登录用户：who
查看用户登录历史记录：last

##### 查看当前登录的用户

主要用到的命令有,w,who,ps,kill,pkill
 
- 查看当前登录用户:
 
 ```
node8:/home # who
root     :0           2009-11-04 16:26
root     pts/0        2009-11-05 13:52 (:0.0)
linfengfeiye pts/1        2009-11-07 06:32 (118.113.209.13)
```

第一列是用户名,
第二列是连接的终端,tty表示显示器,pts表示远程连接,
第三列是登陆时间,


- 查看登录用户行为:

```
node8:/ # w
 07:46:35 up 2 days, 15:35,  6 users,  load average: 0.03, 0.07, 0.02
USER     TTY        LOGIN@   IDLE   JCPU   PCPU WHAT
root     :0        Wed16   ?xdm?  35:59   0.26s /opt/gnome/bin/gnome-session
root     pts/0     Thu13   21:12m  0.07s  0.49s gnome-terminal --working-direct
linfengf pts/1     06:32    0.00s  0.49s  0.00s sshd: linfengfeiye [priv] 
```

users 表示当前系统登陆用户总数为6。
LOAD AVERAGE 与后面的数字一起表示系统在过去1，5，10分钟内的负载程度，数值越小，系统负载越轻。
 
从第二行开始构成一个表格，共有8个栏目，分别显示各个用户正在做的事情及该用户所占用的系统资料。
USER：显示登陆用户帐号名。用户重复登陆，该帐号也会重复出现。
TTY：用户登陆所用的终端。
FROM：显示用户在何处登陆系统。
LOGIN@：是LOGIN AT的意思，表示登陆进入系统的时间。
IDLE：用户空闲时间，从用户上一次任务结束后，开始记时。
JCPU：一终端代号来区分，表示在某段时间内，所有与该终端相关的进程任务所耗费的CPU时间。
PCPU：指WHAT域的任务执行后耗费的CPU时间。
WHAT：表示当前执行的任务
 
当登陆系统用户很多的时候，可以在W后面加上某个用户名，则会查看该用户执行任务的情况

- 查看linfengfeiye用户执行任务情况


```
node8:/ # w linfengfeiye
 07:40:45 up 2 days, 15:29,  6 users,  load average: 0.07, 0.08, 0.02
USER     TTY        LOGIN@   IDLE   JCPU   PCPU WHAT
linfengf pts/1     06:32    0.00s  0.48s  0.00s sshd: linfengfeiye [priv] 
查看登陆用户历史
node8:/ # last
linfengf pts/1        118.113.209.13   Sat Nov  7 06:32   still logged in   
root     pts/1        118.113.209.13   Sat Nov  7 06:12 - 06:32  (00:20)    
root     pts/4        118.113.209.13   Sat Nov  7 05:15 - 06:11  (00:55)    
root     pts/2        118.113.209.13   Sat Nov  7 04:21 - 06:41  (02:20)    
sc  pts/5        222.211.247.164  Fri Nov  6 22:16 - 22:36  (00:20)    
root     pts/2        222.211.247.164  Fri Nov  6 21:53 - 22:36  (00:42)    
root     pts/4        222.211.247.164  Fri Nov  6 19:59 - 23:08  (03:08)    
sc  pts/8        222.211.247.164  Fri Nov  6 19:57 - 22:16  (02:18)    
root     pts/7        222.211.247.164  Fri Nov  6 19:42 - 22:36  (02:53)    
root     pts/6        222.212.68.214   Fri Nov  6 19:39 - 21:40  (02:00)    
sc  pts/5        222.212.68.214   Fri Nov  6 19:36 - 21:39  (02:03)   
查看sc用户登录历史
node8:/ # last sc
sc  pts/5        222.211.247.164  Fri Nov  6 22:16 - 22:36  (00:20)    
sc  pts/8        222.211.247.164  Fri Nov  6 19:57 - 22:16  (02:18)     
sc  pts/6        118.113.236.146  Fri Nov  6 16:39 - 16:43  (00:03)    
sc pts/4         10.3.2.40        Fri Nov  6 11:30 - 13:42  (02:12)    
```

想踢除linfengfeiye这个用户和他的所有开启的程序

```
pkill -u linfengfeiye
```

注意：这个命令实际上很危险，要相当小心的执行 原因参考 http://www.blogguy.cn/
安全的做法是先查看终端号，然后查看该终端执行的所有进程，根据进程号来停止服务
安全剔除用户

```
ps -ef| grep pts/0
```

得到用户登录相应的进程号pid后执行.

```
kill -9 pid
```

#### 参考

- <http://www.phpddt.com/server/984.html>

- <http://www.unixmen.com/fix-cant-connect-local-mysql-server-socket-varlibmysqlmysql-sock-2-error/>

- <http://mirror.sdunix.com/apache/tomcat/tomcat-9/v9.0.0.M3/src/>

- <https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-8-on-centos-7>

- <https://www.howtoforge.com/how-to-install-tomcat-on-centos-7>
