---
layout: post
title: Nginx 读书笔记
category: Web
tags: [Nginx, 服务器]
latest: 2015年09月21号
---

#### Get Started

> The “C10K Problem” is the idea of serving 10,000 simultaneous, concurrent connec‐ tions through a web server. 

1. 什么是 Ngnix？Ngnix 可以做什么？

2. Ngnix 和 Apache 有什么区别？各有什么特点？

3. 安装 Ngnix 需要哪些条件？为什么不建议在 Windows 上安装 Ngnix？

4. Ngnix 的发行版有哪两种？各有什么区别？

5. 安装 Ngnix 有哪两种方式？具体如何安装？
①源码安装：下载好 Ngnix 源码后解压：

``` shell
$tar -zxvf ngnix-1.9.2.tar.gz
$cd ngnix-1.9.2
```

假设 Linux 上事先没有安装相关的程序构建工具，那么按如下步骤安装 code building tools：
- RedHat 系列：

``` shell
yum group install "Development Tools"
$ ./configure
$ make
$ sudo make install
```

- Debian 系列：`apt-get install build-essential`

接着通过 Linux 软件包管理器安装 Ngnix 依赖库：
• PCRE (for the HTTP Rewrite module) 
• Zlib (for the HTTP Gzip module) 
• OpenSSL (for HTTPS protocol support) 

默认情况下，RedHat 系列在通过 make install 安装 Ngnix 的时候已经自动安装好了 Ngnix 及其相关依赖至，/usr/local/ngnix，所以无需再次安装，而 Debian 系列还需要通过如下指令完成依赖安装：

```
$ apt-get install libpcre3-dev zlib1g-dev libssl-dev
```

无论通过那种方式安装，ngnix 的可执行文件最终都会被安装到 /usr/local/sbin/ngnix，至此 Ngnix 安装结束，可以通过指令 /usr/local/sbin/ngnix -V 测试 Ngnix 在这台机器上安装的相关信息。
最后可以设置 Ngnix 的环境变量：为了与 Linux 文件系统的布局一致，可以将Ngnix 二进制代码设置到 usr/sbin （后台驻留程序存储地）或 /etc （ 配置文件存储地）。（这也是最常用的 Ngnix 安装配置），具体指令为：

```
$ ./configure --prefix=/usr —conf-path=/etc/nginx
```

②软件包安装：通过 Linux 软件包管理器直接安装。常规并减少麻烦的安装方式是：
·RedHat 系列软件包：`$ yum install ngnix`
·Debian 系列软件包：`$ apt-get install nginx`
·ngnix.org 软件包（Debian 系列）：
①获得 Ngnix 网站签发的证书，以便 Linux 软件包管理器可以正确鉴别其可靠性：

```
$ wget  http://nginx.org/keys/nginx_signing.key
```

②将下载的由 Ngnix 签发的证书添加到 apt：

```
$ sudo apt-key add ngnix_signing.key
```

③获得 Linux 代号：`$ lsb_release -a`。如果代号为 trusty，则继续下一步。
④替换代号为 ngnix：打开文件 etc/apt/sources.list，将文件末尾的 codename 替换为 ngnix。替换好的代码为：

```
deb http://nginx.org/packages/debian/ codename nginx 
deb-src http://nginx.org/packages/debian/ codename nginx 
（ubuntu 只需改 Debian 为 ubuntu 即可）
```

⑤更新 apt：并安装最新 ngni x：

```
$ apt-get update
$ apt-get install ngnix
```

无论什么时候都可以使用 ngnix -V 测试状态。

1. 什么是模块？Ngnix 是模块化软件体现在哪里？
—— 模块就是指能够完成某种特定功能的可独立程序块。 在程序运行期间可以关闭或开启。Gzip 和 ssl。

2. 源码安装 Ngnix 有什么优点和缺点？
·优点：可以自定义模块 -- 哪些需要哪些不需要。
·缺点：如果在编译源代码的时候没有将后面要使用的模块包括进去的话，则需要重新编译源码。

3. Ngnix 通常有哪些模块？其中哪些模块默认是开启的？
—— P17 & P18。

4. Ngnix 如何启用或关闭某个模块？
—— 将模块名作为额外参数传递给 with 选项，然后重新运行配置文件即可，比如启用 SSL 、SPDY、RealIP、Stub Status 模块：

``` shell
$./configure --with-http_ssl_module \
--with-http_spdy_module \
--with-http_real_ip_module \
--with-http_stub_status_module
$make 
$sudo make install
```

·注意：启用 SSL 模块之前必须先安装 OpenSSL。
启用完模块后可以使用 ngnix -V 命令查看模块是否已启用。
·第三方 Ngnix 模块：wiki.ngnix.org

10. 通过软件包管理器方式安装软件有什么优缺点？
·优点：简单快速。已经进行了必要的初始化操作，通过 执行 upstart 脚本，Ngnix 可以很方便地被作为后台驻留程序运行，并可以开机自动开启而无需多余设置。
·缺点：针对某个 Linux 发行套件的 Ngnix 软件包很可能已经过时，而且无法再安装第三方 Ngnix 模块。

#### CGI Fast-CGI uwcgi

1. 什么是 CGI？为什么会出现 CGI?
—— Common Gateway Interface。90 年以前，没有一种创建动态页面的简单方式，97 年 CGI 官方诞生。CGI 是一种编程语言依赖。通过 CGI，可以只通过增强 服务器端从而就能创建动态网页。CGI 并没有发展多少年就被取代，但是其工作原理是后续取代方案的基础。

2. 什么是 FastCGI？其工作原理是怎样的？FastCGI 比 CGI 有什么优点？
—— 传统 CGI 的替代物。在安全、性能和程序运行时的复杂度上有所改变。通过两幅图说明两者之间的差异：

FastCGI 工作原理：
当有请求向 web 服务器传递时，web 服务器向 FastCGI 服务器发送一个 TCP/Unix Socket 请求，使其执行脚本然后将结果返回给 Web 服务器。由于 FastCGI 是长连接的，因此无需为每次请求 fork 一份脚本，就省去了许多次系统调用。从而在一定程度上提高了性能。

1. CGI 的工作原理是怎样的？
—— 按需地执行任何时刻来自客户端的 HTTP 请求，通常是一段 CGI 脚本或 CGI 程序，然后将执行结果返回给客户端（通常是浏览器）。工作原理包含了安全检查 -- cgi-bin 目录和环境变量。
CGI is just a fancy way of saying “the web server executes the script directly”. 
·浏览器上呈现的始终是静态页面，动态体现在服务器端。

2. 什么是 cgi-bin 目录？为什么序言 cgi-bin 目录？
—— 将被服务器执行的已判定的安全脚本存放目录。可以不叫 cgi-bin 但是通常都这么叫罢了。

3. 什么是 HTTP 请求环境？什么是环境变量？
——即一次 HTTP 请求过程中涉及的所有对象及其内容，比如 URI，客户端地址，服务器主机信息等等。这些组成为了 HTTP 请求环境，是 CGI 用于取回相关信息的方式。环境变量即将 HTTP 请求环境中涉及到的对象及其值写成一个脚本。CGI 可以通过这个脚本取得相关信息。即将 web request 请求的有关内容从服务器上返回给 CGI 脚本以提供信息。举例：`echo $_SERVER[ "REMOTE_IP" ] ;`

4. HTTP 请求中涉及到的环境变量有多少？
—— P52。

5. 为什么需要后端和服务器技术？
—— 为了开发丰富多采的 web 应用。仅仅是 HTML 和 Javascript 可以做的实际业务很少。

6. Ngnix 支持后端 web 应用有哪两种方式？常用 Web 语言分别使用的是哪种方式？
—— FastCGI 和 Reverse Proxy。部署 PHP 应用采用的是 FastCGI，而其他语言如  Ruby、Go、Node 等使用的是 Reverse Proxy Server。

7. 为什么说 CGI 的性能低？CGI有什么优点？Ngnix 支持传统 CGI 吗？
—— 这得从 CGI 的工作原理说起，每一个 CGI 脚本文件到达服务器，服务器都不得不 fork 一份，然后执行，而 fork 是一种慢而耗费系统资源的系统调用。CGI 的优点是简单。随意将 Perl 或 PHP 脚本放到任何想放的特定位置就可以了，不需要特殊的服务器和多余的布局。

8. PHP 应用需要手动配置 FastCGI 吗？
—— 不需要。PHP 5.3 开始 PHP-FPM（PHP FastCGI 处理管理器） 捆绑到了 PHP 中。PHP-FPM 将完成 FastCGI 的绝大部分工作。

9. Ubuntu 下如何配置 php-fpm？
①安装：`apt-get install php-fpm`
② 配置：/etc/php5/fpm/pool.d/www.conf，运行如下代码：

```
location ~ script.php {
fastcgi_pass unix:/var/run/php5-fpm.sock;
fastcgi_index index.php
include fastcgi_params;
} 
```

12. FastCGI 配置脚本文件中有哪些参数需要注意的？
·SCRIPT_FILENAME：FastCGI 服务器根据该参数决定哪些 PHP 脚本要被执行。SCRIPT_FILENAME 默认值设置为：
$document_root$fastcgi_script_name
·Document_root：当前请求的根。
·fastcgi_script_name：是 Ngnix 根据请求的 URI 路径自动设置的变量：如果 URI 路径以 / 结尾，那么 fastcgi_index 将自动追加到 URI 末尾，除此之外，$fastcgi_script_name 就只是 请求的 URI。

22. index.php 文件有什么作用？
—— 关于 FastCGI/PHP 的配置，现实中只有 2 种情况： 一个文件夹下的所有 PHP 文件都要是可执行的，和，只有 index.php 才是可执行的，对其他 PHP 脚本的请求都将通过该中心文件被定位并执行。第二种情况的配置代码如下：

```
server {
location / {
try_files $uri $uri/ index.php$is_args$args;
}
location ~ \.php$ {
try_files $uri /index.php =404;
fastcgi_pass upstream;
fastcgi_index index.php
fastcgi_split_path_info ^(.+\.php)(.*)$;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_scriptName;
} } 
```

·注意：不要轻易尝试网上关于  Ngnix 和 PHP 配置的相关教程，因为大部分都是错误的，更糟糕的是，有些配置教程中无心地留下了后门，这将造成安全隐患 -- Ngnix 服务器很可能会执行并不是 PHP 文件的文件，或欺骗 PHP-FPM 去执行攻击者上传的恶意 PHP 脚本。

14. uWSCGI 和 FastCGI 有什么区别？uWSCGI 和 Python 有什么关系？


#### Load Banlance

1. 配置均衡负载服务器的基本代码是怎样的？

```
http { 
upstream backend {
server 192.0.2.10;
server 192.0.2.11;
} 
server {
listen 80;
location / {
proxy_pass http://backend;
} } 
} 
```

1. 负载均衡和反向代理有哪三点基本不同？

使用Nginx作为前台服务器，在80端口接收所有的http请求，对本地能缓存的资源直接提供服务，否则转发到upstream上的其他服务器处理，比如转给fastDFS，或者是ATS等等


#### Reverse Proxy

1. Apache 和 Ngnix 各有什么特点？
—— Apache 可以将 Web 编程语言解释器潜入到 Web server 中，体现在 Apache 有 mod_php 模块，而 Ngnix 不可以。但取而代之的是，Ngnix 有一个轻便许多的解决方法，Ngnix 通过委托的方式将对 web 程序的解释执行委托给其他单独的代理服务器或者逆向代理们处理。
“It’s just a webserver and generally tries to keep its footprint very small, running a web application is delegated to a separate server and proxies upstream. ”

2. 直接代理和逆向代理有什么区别？
①称呼不同：直接代理即通常所说的代理；反向代理指与直接代理相反的代理方式。
②工作环境和应用场合不同：直接代理通常设置在 家庭或工作网络，在外出的网络连接和 Internet 之间工作；反向代理通常工作在为动态 web 程序或均衡负载提供服务的场合。
③工作原理的区别：

来自多台计算机的将要接入互联网的网络连接，将被直接代理捕获并终止计算机的继续向前请求，转而替它们转发所有连接请求到 Internet。对整个互联网来说，多台计算机表现出来自一个源，即直接代理。

来自 internet 的所有连接请求，反向代理捕获并终止其继续连接，转而通过反向代理多路传输至多个 动态 web 应用，如 Ruby。这与 均衡负载概念大致相同。

1. 反向代理和均衡负载有什么不同？
—— 两者的不同点只有一处，就是通信的对象不同。均衡负载的通信对象是上游的 Ngnix 或其他 Web 服务器，位于不同的物理机上，而反向代理的通信对象就是同一台计算机上的服务。由于反向代理只能代理 HTTP 协议，而大多数动态 web 程序也是通过 HTTP 协议通信，所以可以认为 反向代理就是一种本地均衡负载手段。

2. 如何通过 Ngnix 处理 Web 应用？
—— 如果不使用 Ngnix，Rails 服务器可以选择很多：
WEBrick  server --  test and development
（default port listen：3000；test in browser：127.0.0.1:3000）
puma/unicorn/thin server -- in production
·Rack-based  server ：only to server ruby application，great to server dynamic content from rails but horribly slow to server static content.
无论是 Rails 、Golang、Node.JS 等语言，采用的都是 HTTP 协议，所以都可以被 Ngnix 服务。典型的反向代理基本配置如下： 

```
http { 
upstream rails_app {
server 127.0.0.1:3000;
} 
server {
listen *:80;
root /path/to/application/public;
location / {
proxy_pass http://rails_app;
} } 
}
```

上述配置代码将会使得 Ngnix 能够监听所有来自 80 端口的请求，并将其转发到正在运行在 3000 端口的 WEBrick Server。
上述配置的不足在于，Ngnix 会将所有请求都抛给 WEBrick 处理，包括 WEBrick 不擅长处理的 static content 。为了扬长避短，静态资源的处理是 Ngnix 擅长的，所有可以在 location /  段后面增加如下配置：

```
Location /assets ｛

｝
```

有了该 location 块，Ngnix 将获捕获所有以 /assets 前缀开头的请求。由于块中没有 proxy_pass 指令，所以默认从根路径 / 静态地返回服务文件。当然根路径是从服务器环境上继承而来的，比如：/path/to/application/public/assets。
如果还想进一步优化，那么可以为长期存活的静态资源文件设置 HTTP 缓存控制标志头 -- 在上面的空代码块中写入如下指令即可：
location /assets {
expires max;
add_header Cache-Control public;
}
其中 expires 指令指定了缓存的生存时间，可以是一个最大常量值、可以是一个具体的时间、也可以是个相对时间 -- 时间段，如 1d如果设置为最大常量，那么 Ngnix 就会将 Expires header 设置为：
"Thu, 31 Dec 2037 23:55:55 GMT"，同时将 Cache-Control header 设置为 10 年。
·注意：默认情况下，Cache-control 会将文件设置为私有的，这将导致 中级 HTTP Cache 无法缓存静态资源，这是不必要的，
所以要明确地指出该 Header 为 public，这样才能获得最大的缓存能力。可以测试：$curl -I 127.0.0.1/assets/test.gif。

1. 在使用 WEBrick 之前使用 Ngnix 反向代理有哪些优点？
①可拓展性增强：WEBrick 是单线程的，通过 Ngnix 可以实现多连续处理的效果。
②错误处理更简单：Ngnix 会根据服务器超时时间抛出不同的错误，如 503 服务不可用、502 网关失败等等。而如果没有 Ngnix 则不会有任何错误提示。

2. TCP/Network 栈和 Unix Domain Socket 有什么区别？
—— TCP 栈主要用于处理远程机器上的连接请求，会有多余的资源浪费，而 Unix Domain Socket 主要用于在 本地机器上通信。
在本机上使用 Unix Domain Socket 会比使用 TCP 栈有更好的性能表现。

3. 什么是 Unix Domian Socket？
—— 是操作系统内核之间内部信息处理的一个工具。它使用文件系统作为名字空间。

4. 如何启用 Unix Domain Socket？
①告诉上游服务器使其去监听 Domian Socket；WEBrick 不支持 Socket ，所以可以使用 thin server。
·下载 thin ：gem install thin
·启用 thin server：thin start  --socket /tmp/rails.sock
（PS：WEBrick 的启用 -- rails s 
②告诉 upstream Server 改变通信协议 TCP 为 Domian Socket：
upstream rails_app {
server unix:/tmp/rails.sock;
} 

5. HTTP Status Code 的基本含义？
—— 2xx 代表成功；3xx 代表 redirect；4xx 代表 client 端出现错误；5xx 代表 server 端出现了错误。比如 502（一般都是 Ngnix）代表了服务器内部找不到 upstream 块。

6. 如何隐藏 Ngnix 返回信息？
—— server_token off;

7. Ngnix 如何自定义错误页面？
—— 使用 error_page 命令：

```
server {
listen *:80;
root /path/to/application/public;
location / { 
error_page 404              /404.html;
error_page 500 502 503 504  /50x.html;
try_files $uri $uri/index.html @rails;
}
location @rails {
proxy_pass http://rails_app;
} }
```

12. error_page 指令有哪些特殊用法？
①改变 HTTP 状态码：但不建议这么做，因为许多错误处理就是通过判断 HTTP 状态码。 
error_page 404 =200 /index.html ; # index.html 为返回的页面
②重定位到完全不同的 URL：
error_page 500 http://www.google.com ;
③内部重定位到一个已命名的 location 块：当需要多个后端反向代理服务器生成不同 error_page 的时候会很有用。举例：

```
location / {
error_page 404 = @fallback;
} 
location @fallback {
proxy_pass http://different_backend;
}
```

·注意：如果想利用 error_page 来换取冗余性和高可利用性，那么需要用到第七章的 proxy_next_upstream 指令。

13. 如何利用 Ngnix 修改 HTTP 请求？这样做有哪些用途？
—— 因为 Reserve Proxy 的工作机理不过是 HTTP 协议，所以可以通过 Ngnix 修改 HTTP 请求。比较常见的操作就是为原始请求增加或移除 Header。典型的应用案例就是 http 和 https -- 告诉后台服务器请求是安全的还是非安全的。

23. 变量 $scheme 有什么作用？
—— $scheme 包含了请求源的所有计划，无论是 http和 https。

33. 为什么要为反代服务器设置 X-Forwarded-Proto？
—— 为使后台了解请求的类型 -- http 或 https 、以及请求的计划。具体配置代码应类似于：

```
server {
listen *:80;
root /path/to/application/public;
location / {
try_files $uri $uri/index.html @rails;
} 
location @rails {
proxy_set_header X-Forwarded-Proto $scheme;
proxy_pass http://rails_app;
} } 
```

16. Proxy_set_header 指令有什么特点和不便之处？
—— 会默认设置主机头为 $proxy_host，它包含了传递给 $proxy_pass 的参数值 -- 主机名和端口；这样会对判断请求
来自的真实的主机/域造成不便，修改方法仅是将 $proxy_host 改为 $host：proxy_set_header Host $host;

26. 为什么 Ngnix 需要 Real IP 模块？
—— 为了解决反代服务器只能获得负载均衡器（Ngnix 服务器）的地址而无法获得来自客户端请求源的真实 IP 地址这更问题。

36. 来自客户端的请求源到达负载均衡器的过程中发生了什么？
—— 举例说明：一个 IP 地址为 201.0.0.22 的客户端向域名为 example.com -- 解析成 IP 地址为 192.0.0.31，的 Ngnix 服务器发起 HTTP 请求，接着，位于 192.0.0.31 上的load balancer 读到来自 201.0.0.22 发起的 HTTP 请求，就会成为客户端的代理，向位于 upstream 指令中的一个应用服务器转发该请求。在后端看来，客户端请求源的 IP 地址是 192.0.0.31。这是因为，Ngnix 将请求代理给后端，从技术上看，Ngnix 就是 HTTP 请求源的发起者。这之所以看似不可能是因为，应用内部想要访问或纪录的 IP 地址怎么会发起请求呢？如果是这样的话，那对于应用服务器来说，所有的请求源都来自于 load balancer 了。Real IP 模块解决了这个问题。

46. Real IP 模块是如何工作的？
—— 通常情况下 -- 没有启用 Real IP的时候，向 Ngnix 服务器发起请求的客户端 IP 地址将被写入到请求头的 REMOTE_ADDR 中，当 Ngnix 代理了该请求后，REMOTE_ADDR 又被重写为 Ngnix 的地址。当启用了 Real IP 模块后，它会在 代理后的请求中写入一个新的 Header -- X_REAL_IP，其值就是原始客户端的 IP 地址。
通过 HTTP header REMOTE_ADDR ，任何应用都可以获得到源客户端的真实 IP 地址。

56. 如何启用 Real IP ？
—— 需要配置 Ngnix 服务器、所有 Ngnix 负载均衡器以及反代服务器。虽然配置不是强制性要求的操作，因为 RealIP  在模块被安装好之后就已经默认启用了，但是明确地配置 Real IP 却是最佳实践。具体配置方法是，在 load balancer 上的配置文件中，添加  real_ip_header 指令：

```
http {
real_ip_header X-Real-IP;
server { ... 
} } 
配置 reverse proxy 的指令为：
http {
real_ip_header X-Real-IP;
set_real_ip_from 203.0.113.1;
server { ... 
} } 
```

如果没有指定 set_real_ip_from 指令，任何人都可以通过修改 请求中的 HTTP header 中的 X_REAL_IP 为一个虚假值来伪造一个 IP 地址。其中，set_real_ip_from 后面可以跟 IP 地址列表或是 CIDR 地址块。



#### FAQ

- Nginx and favicon.ico - “GET /favicon.ico HTTP/1.1” FAILED

把以下配置放到 server {} 块，关闭 favicon.ico 不存在时记录日志

```
location = /favicon.ico {
log_not_found off;
access_log off;
}
```

log_not_found on|off，默认为on：启用或禁用404错误日志，这个指令可以用来禁止nginx记录找不到rebots.txt或favicon.ico这类文件的错误信息。

附录：
1. 注意error_log off并不能关闭日志记录功能，它将日志文件写入一个文件名为off的文件中，如果你想关闭错误日志记录功能，应使用以下配置：error_log /dev/null crit;
off位置在/usr/local/nginx/off，即nginx的安装目录下

2. log_not_found off改成error_log off效果也一样，不同的是写成error_log off是将错误日志输出到off文件，而log_not_found则是关闭日志。


- 808#5596: *1 GetFileAttributesEx() "D:\WWWegal" failed (123: The filename, directory name, or volume label syntax is incorrect), client: 127.0.0.1, server: localhost, request: "GET / HTTP/1.1", host: "regal.me"

这是因为 Windows 文件系统的路径原因，导致配置文件中恰好含有特殊字符 `\r` 使 Nginx 解析失败，用反斜线 \ 再次转义即可：

```
server {
listen       80;
server_name  regal.me;

charset utf-8;

location / {
root       "D:\WWW\\regal";
index      index.php index.html index.htm;
autoindex  on;
}

location = /favicon.ico {
log_not_found off;
}

location ~ \.php(.*)$ {
root       "D:\WWW\\regal";
fastcgi_pass   127.0.0.1:9000;
fastcgi_index  index.php;
fastcgi_split_path_info  ^((?U).+\.php)(/?.+)$;
fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
fastcgi_param  PATH_INFO  $fastcgi_path_info;
fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;
include        fastcgi_params;
}
}
```

- 与 PHP 关联后 PHP 500

找到并改为 `display_errors = On` 即可。

#### 其它

- Netcraft
- lua
- Ruby on rails application -- rails new TestApp

WEBrick  server --  test and development（default port listen：3000；test in browser：127.0.0.1:3000）

- puma/unicorn/thin server -- in production

- Rack-based  server ：only to server ruby application，great to server dynamic content from rails but horribly slow to server static content.

- upstream server

- rubygems


#### 参考

－ [Ngnix-A Practical Guide to High Performance](美).Stephen Corona著.O'Reilly出版
