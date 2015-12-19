---
layout: post
title: Nginx 基础：安装与配置
category: PHP
tags: [Nginx, Linux, PHP, LEMPA]
latest: 2015年11月21日 02:18:44
---

总结下 Nginx 在 Linux 下的安装和配置步骤及常见错误。

下载与安装
-

以安装 Pre-Built Packages for Stable version 的 Nginx 来说明，mainline 版本的 Nginx 基本原理和步骤一样，只是需要稍微修改一下下载地址即可。

- Debian/Ubuntu

```
$ sudo wget http://nginx.org/keys/nginx_signing.key
$ sudo apt-key add nginx_signing.key
```

然后在软件源中增加 Nginx 官方软件源：

```
sudo vi /etc/apt/sources.list
deb http://nginx.org/packages/debian/ codename nginx
deb-src http://nginx.org/packages/debian/ codename nginx
```

##### **说明**

如果是 ubuntu, 则把 debian 改为 ubuntu 即可。

其中 codename 在: <http://nginx.org/en/linux_packages.html#distributions> 。

```
$ sudo apt-get update
$ sudo apt-get install nginx
```

- RedHat/CentOS

```
$ sudo rpm --import nginx_signing.key
$ yum install nginx
```

或者 _/etc/yum.repos.d/nginx.repo_ 添加：

```
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
gpgcheck=0
enabled=1
```

其中 OS 是：`rhel`、 `centos`；OSRELEASE：`5`、`6`、`7`。

如果要使用数字签名，Redhat 系需要配置 `gpgcheck=1`。

如果要安装 Mainline Version 的话，需要在 /packages 后面加上 mainline 。

- `nginx -s signal`

signal ： `stop` `quit` `reload` `reopen`

- `kill -s QUIT PID`

- `ps -ax | grep nginx`

- Raspberry Pi Nginx

网站根目录( 安装目录子目录 )： _/usr/share/nginx/www_ 。

Nginx 配置目录：_/etc/nginx/nginx.conf_ 、 _/etc/nginx/sites-available/default_ 。

- 配置浏览器可以通过目录方式访问

在配置文件 nginx.conf 中，将想要目录显示的目录块中加上 `autoindex on;` 。

- 启动 Nginx 时出现 **Nginx Invalid PID number**

> nginx -s reload is only used to tell a running nginx process to reload its config. After a stop, you don't have a running nginx process to send a signal to. Just run nginx (possibly with a -c /path/to/config/file)
	
> 来自：<http://stackoverflow.com/questions/7646972/nginx-invalid-pid-number> 。

- **500、502 错误**

查日志：/var/log/nginx /error.log

如果是 PHP 解析器报错，则找到错误的行号，进行相应的排错，常见的排错情况有：

1、 在从别的环境 ( 如 WAMP ) 中迁移网站的时候，某些第三方库没有安装但是代码中已经使用，导致相方法调用失败，因此需要根据报错的内容安装相应的库。

2、 网站加载慢往往网站代码写得有问题。

Nginx Serves On Linux/Windows
-

Nginx 在 Windows 上暂时还不能作为服务运行，但是仍然可以被端口映射给公网 IP 。

- Windows 上启动 Nginx ：在 Nginx 安装根目录下面执行 `nginx` 即可。

### 在 Windows 上设置 nginx 开启自启动

将 nginx.exe 的快捷方式复制到：

```
C:\Users\lamChuanJiang\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
```

Nginx 在 Linux 和在 Windows 上的配置都差不多，这里总结下常见的几个：

- 配置根目录

1、 找到 _nginx.conf_，Windows 就是在 Nginx 的安装路径下的 conf 文件夹中；Linux 的话如果是通过 `apt-get` 方式安装一般在 `/etc/nginx/nginx.conf` 。如果完全手动安装，则为手动指定的路径。
2、 找到 `location /`；

3、 找到 `root html;` 然后将 `html` 改为你想要作为 Nginx 服务器上的根目录的路径，比如：`C:/__SHARE__/Workspace/lamchuanjiang.github.io/_site;`

需要注意的是末尾的分号 `;` 不能省略。

需要说明的是 `root html;` 这里的相对路径是相对于 Nginx 主要安装文件所在的位置，即 Nginx 可执行文件所在的位置。

`root html;` 就说明了，_html_ 文件夹和 _nginx.exe_ 是位于同一文件夹下面的，等同于 `./html;`，Linux 下原理也相同。

Nginx 与 PHP 相关联
-

Windows 和 Linux 相同，其实 Nginx 默认已经给我们配置好了，只需要取消注释掉相应的位置就行了。

找到 `location ~ \.php$`，会有 2 个搜索结果，一个是 `proxy the PHP scripts to Apache listening on 127.0.0.1:80`，一个是 `pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000`。

如果想让 Nginx 把以 `.php` 结尾的脚本代理给 Apache ( 如果机器上安装过 Apache 的话 )，就只注释掉 `proxy the PHP scripts to Apache listening on 127.0.0.1:80` 下面的 `location ~ \.php$`  块，即：

```
# proxy the PHP scripts to Apache listening on 127.0.0.1:80
#
#location ~ \.php$ {
#    proxy_pass   http://127.0.0.1;
#}
```

如果想让 Nginx 把以 `.php` 为后缀的脚本传递给 监听在本机 9000 端口的 FastCGI 服务器处理，就注释掉 `pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000` 下面的 `location ~ \.php$`  块，即：

```
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
location ~ \.php$ {
    root           html;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    include        fastcgi_params;
}
```

注意，Linux 下除了配置这些东西外还需确保已经安装了 php5-fpm，因为新版本的 PHP 都是通过 FPM 模块来管理 FastCGI 脚本的，不过新版本的 PHP 貌似已经将 FPM 绑定到 PHP 主程序中去了，如果没有安装就手动安装：`sudo apt-get install php5-fpm`。

注释过后，在 location / 块中的 index 事件后面添加 index.php，使其支持 index.php 网站入口文件，否则访问 php 入口页面会出现 403。

最后，重新载入配置：在 Nginx 安装根目录下面执行 `nginx -s reload` 即可。此时便可以在浏览器中输入 localhost/index.php 测试配置是否成功。

- 更改默认监听的端口

Nginx 和 Apache 默认都是监听 80 端口，因此在 LNMPA 架构中，需要手动解决该冲突。

随便改一个服务器就行了，Apache 就修改 httpd.conf 中的 Listen 80 字段；Nginx 就修改 nginx.conf 里面 `server  {}` 块中的 Listen 80 字段。

相关
-

- [How To Set Up Nginx Load Balancing | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-load-balancing)
