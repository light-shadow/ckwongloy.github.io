---
layout: post
title: Apache 常用配置
category: PHP
tag: Apache
latest: 2015年10月24日 20:21:06
---

1. 与 PHP 整合

	LoadModule php5_module C:/dev/PHP/php5apache2_4.dll

	PHPIniDir "C:/WAMP/PHP"

	AddType application/x-httpd-php .php .phtml


2. 虚拟目录


# 非默认路径权限设置

	 <Directory C:/lamChuanJiang>
		Options Indexes FollowSymLinks
		AllowOverride None
		Require all granted
	</Directory>

	<IfModule dir_module>

	    DirectoryIndex index.html index.php

	    Alias /li "C:/lamChuanJiang"

	    Alias /blog "C:/WAMP/Apache/htdocs/Wordpress"

	    Alias /fe "C:/WAMP/Apache/htdocs/Discuz"

	</IfModule>


##### **说明**

已位与 Apache 安装目录 htdocs 文件夹下的站点可以不再设置权限。

3. 虚拟主机 ( 2.4 版本不再需要 NameVirtualHost )

① 基于端口

	<VirtualHost 192.168.1.140:8888>
		DocumentRoot "D:/web1"
		DirectoryIndex index.html index.htm index.php
		<Directory "D:/web1">
			Options FollowSymLinks
			AllowOverride None
			Require all granted
			</Directory>
	</VirtualHost>

	<VirtualHost 192.168.1.140:8000>
		DocumentRoot "D:/web2"
		DirectoryIndex index.html index.htm index.php
			<Directory "D:/web2">
			Options FollowSymLinks
			AllowOverride None
			Require all granted
			</Directory>
	</VirtualHost>

② 基于 ip

	<VirtualHost *:80>
		DocumentRoot "D:/web1"
		ServerName www.chuanjiang1.com
		<Directory "D:/web1">
			Options FollowSymLinks
			AllowOverride None
			Require all granted
		</Directory>
	</VirtualHost>

	<VirtualHost *:80>
		DocumentRoot "D:/web2"
		ServerName www.chuanjiang2.com
		<Directory "D:/web2">
			Options FollowSymLinks
			AllowOverride None
			Require all granted
		</Directory>
	</VirtualHost>

- Apache 2.4 允许局域网内用户访问网站

两个步骤：

1. 防火墙放行 _httpd.exe_ 。

2. Httpd.conf 中找到并修改下列内容：

```
<Directory />
    AllowOverride All

    # 下面语句被人为注释掉
#   Require all denied

</Directory>


DocumentRoot "C:/Dev/Apache24/htdocs"
<Directory "C:/Dev/Apache24/htdocs">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/2.4/mod/core.html#options
    # for more information.
    #
    Options Indexes FollowSymLinks

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   AllowOverride FileInfo AuthConfig Limit
    #

    #AllowOverride None

    AllowOverride all

    order deny,allow
    allow from all

    #
    # Controls who can get stuff from this server.
    #

    # 下面语句被人为注释掉
    # Require all granted

</Directory>
```

Apache FAQ
-

1. 怎样与虚拟主机协同工作？

Listen指令并不实现虚拟主机，它只是告诉主服务器(main server)去监听哪些地址和端口。如果没有<VirtualHost>指令，服务器将对所有请求一视同仁；但是如果有<VirtualHost>指令，则服务器会对不同的地址和端口作出不同的响应。要实现虚拟主机，首先必须告诉服务器需要监听哪些地址和端口，然后为每个特定的地址和端口建立一个<VirtualHost>段来执行特定的相应。注意，如果将<VirtualHost>段设置为服务器没有监听的地址和端口，则此段无效。

2. 取消中心主机(Mainhost)

如果你想在现有的web服务器上增加虚拟主机，你必须也为现存的主机建造一个<VirtualHost>定义块。这个虚拟主机中ServerName和DocumentRoot所包含的内容应该与全局的ServerName和DocumentRoot保持一致。还要把这个虚拟主机放在配置文件的最前面，来让它扮演默认主机的角色。

3. ServerName

ServerName指令设置了服务器用于辨识自己的主机名和端口号。这主要用于创建重定向URL。比如，一个放置web服务器的主机名为upload.server110.com ，但同时有一个DNS别名www.server110.com 。而您希望web服务器更显著一点，您可以使用如下的指令：
ServerName www.server110.com:80
当没有指定ServerName时，服务器会尝试对IP地址进行反向查询来推断主机名。如果在ServerName中没有指定端口号，服务器会使用接受请求的那个端口。为了加强可靠性和可预测性，您应该使用ServerName显式的指定一个主机名和端口号。
如果使用的是基于域名的虚拟主机，在<VirtualHost>段中的ServerName将是为了匹配这个虚拟主机，在"Host:"请求头中必须出现的主机名。
参见UseCanonicalName和UseCanonicalPhysicalPort指令以获得关于自引用URL(比如使用mod_dir模块)是需要指定一个特定端口，还是使用客户端请求的端口号的更详细的信息。

4. Network Domain 和 Server Name 的区别


Apache限制不能访问目录
-


apache限制不能访问目录

apache 默认是不允许访问目录的，对于全局的配置如下：

<Directory />
    Options FollowSymLinks
    AllowOverride None
</Directory>

现在我建了虚拟主机，我只允许其中一台的目录可以被访问，那么：

NameVirtualHost 192.168.2.158:8000               
                                              
<VirtualHost 192.168.2.158:8000>
ServerAdmin webmaster@a.test.com          
#DocumentRoot /home/Atest

DocumentRoot /var/www/html/squid-reports/                    
ServerName a.test.com                      
ServerAlias virtual.a.test.com
ErrorDocument 404  http://www.baidu.com        
DirectoryIndex index.html index.jsp
ErrorLog /var/wwwlogs/a.test.com.error.log  
CustomLog /var/wwwlogs/a.test.com.log common

</VirtualHost>

<VirtualHost 192.168.2.158:8000>
ServerAdmin webmaster@b.test.com
DocumentRoot /home/Btest

ServerName b.test.com
ErrorDocument 404  http://www.baidu.com 
DirectoryIndex index.html index.jsp
ErrorLog /var/wwwlogs/b.test.com.error.log
CustomLog /var/wwwlogs/b.test.com.log common

<Directory />
    Options FollowSymLinks Indexes
    AllowOverride None
</Directory>

 </VirtualHost>

这样，蓝色部分第一全局。
加上红色部分后，全局配置仍然是目录不允许被访问，但是当/home/Btest目录下找不到首页档案时，就显示整个目录下的文件名称，首页档案与 DirectoryIndex 设定值有关。而/home/Btest目录仍然可以被显示
注意：红色部分要写在<VirtualHost 192.168.2.158:8000> ....</VirtualHost>内，否则又表示全局了。

options的其他参数：

None：表示只能浏览，

FollowSymLinks：允许页面连接到别处，

ExecCGI：允许执行CGI，

MultiViews：允许看动画或是听音乐之类的操作，

Indexes：允许服务器返回目录的格式化列表，

Includes：允许使用SSI。这些设置可以复选。

All：则可以做任何事，但不包括MultiViews。

AllowOverride：加None参数表示任何人都可以浏览该目录下的文件。

另外的参数有：FileInfo、AuthConfig、Limit

Raspberry 上 Apache 的安装配置简述
-


- Apache 2.2

Raspberry Pi 上 Apache 的网站根目录： _/var/www_ 。停止 Apache 服务命令：

```
$ /etc/init.d/apache2 stop
```

- Apache 2.4

升级 Apache 至 2.4 后需要移除旧版本的 Apache ：

```
$ sudo apt-get autoremove
```

Apache 的配置文件 httpd.conf 无论在 Windows 上还是在 Linux 上都区分大小写，因此需要细心。

Q&A
-

- 如何更改 baseurl ，即实现无论网站放在硬盘的什么位置，那个路径都始终作为根目录？
