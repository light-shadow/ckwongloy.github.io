---
layout: post
title: 页面响应时间优化之 "动态页面静态化"
category: PHP
tags: [页面静态化, PHP, 伪静态, Ajax, crontab]
latest: 2015年11月16日 01:12:37
---

页面响应时间的长短对用户体验的影响非常大，想必每个上过网的人都有过这样的体会：看见无限菊花就来气。

那么，今天就来总结一下关于页面响应时间优化的解决方案，目前主要有以下四个方案：

**1. 动态页面静态化**

如果动态页面中的一些内容并不经常改动，比如个人博客，新闻发布系统等，那就 非常有必要将动态页面静态化以缩短页面相应时间。这样做主要有两个好处：

- 减少服务器脚本的计算时间。

- 降低服务器的响应时间。

而如果是内容变化非常快的 Web 应用，比如微博，那么就不适合静态化。

**动态页面静态化的实质是：生成静态的 HTML 文件。**

对于内容经常变化的页面往往会用 PHP 先将其生成类似 .shtml 的静态文件，然后再返回给请求的用户。

**2. 优化数据库**

**3. 使用负载均衡**：主要是配置 nginx (Engine X)。

**4. 使用缓存**：对于经常命中的请求文件可以将其存放到缓存，以减少对数据库的查询操作，从而降低服务器的压力。

今天主要总结关于动态页面静态化的思路。

关于页面
-

先用半分钟复习一下基础知识。

Web 页面分为 **静态页面** 和 **动态页面**。

- 动态页面

浏览器在加载动态页面的时候会首先执行动态页面中的动态程序。动态页面中常见的动态程序有：php、asp、jsp。

#### **动态程序执行步骤**：

1、连接数据库服务器或者缓存服务器；

2、获取数据；

3、填充到模板；

4、呈现给用户。

#### **PHP 程序实行步骤**：

**语法分析 -> 编译 -> 运行 -> 展示结果**。

- 静态页面

最常见的就是 HTML 文件。

可以看出，静态页面的加载比动态文件要快得多，因为静态文件不需要语法分析和编译，而是直接运行。

此外，动态文件往往还需要去连接数据库服务器或者缓存服务器、取数据、填充到模板等等额外操作，这些计算都是需要时间的，而静态页面只需展示页面就行了。

动态页面静态化
-

动态页面静态化不适合内容经常变化的页面，但是对于内容不经常变化的页面，动态页面静态化是非常有效的方法。

对于 PHP 实现页面静态化而言，主要分以下几个方面：

- **完全纯静态化**：由 PHP 生成。

- **局部纯静态/局部纯动态**：静态页面中包含了与服务器异步交换数据的局部动态页面，通常都是通过 AJAX 实现。

- **伪静态**：一种主要通过正则表达式将动态 URL 转换成静态 URL 的方式。

下面分别进行详细总结。

PHP 实现纯静态化
-

#### 预备知识：**buffer 原理**

buffer 即缓冲区，本质就是一个内存地址空间，主要用于存储数据区域。

- 操作系统的 buffer 应用

编辑器中未保存前从键盘输入的字符就是保存在 buffer 中，选择保存之后再将内存缓冲区中的内容保存到磁盘上。

- PHP 的 buffer  应用

当 PHP 程序中有输出语句的时候，输出语句并不会直接输出到客户端/浏览器/终端，而是先保存在 php 缓冲区中。整个过程大致如下：

**输出内容 >> php buffer >> tcp >> 终端**

因此，凡是由 PHP 输出的内容一定会先经过 PHP Buffer 才会返回给浏览器。

可以对其配置：php.ini -> `output_buffering = on`。

获取 PHP 内置缓冲区中的内容：`echo ob_get_contents() ;`。

如果不想在 php.ini 中开启 output_buffering，则可以在 PHP 程序中通过函数 `ob_start()` 来手动开启。

#### 基本方式/API

- `file_put_contents()`  / `fwrite()`

- 使用 PHP 内置缓存机制实现页面静态化/ `ob_` 函数。

```
ob_start()：打开输出控制缓冲
ob_get_contents()：返回输出缓冲区内容
ob_clean()：清空缓冲区
ob_get_clean()：得到当前缓冲区内容并删除当前输出缓冲区
```

举例说明：

```
ob_start() ;
echo 1111 ;
file_put_contents( "index.shtml", ob_get_contents() ) ;
ob_clean();
```

执行结果：浏览器中不会输出 1111，但是 index.shtml 中可以看到 1111 已经存在。

之所以出现这一现象，就需要理解上面所说的 缓存区/buffer 这一概念。

#### 基本步骤

1、连接数据库/缓存，然后从数据库/缓存里面获取想要的数据；

2、把获取到的数据填充到模板文件里面；

3、使用 PHP 方法把含有动态脚本的的模板文件转换为静态页面，生成纯静态文件。

举例说明：

- template.php

模板文件。骨架不变，变的只是数据源。数据源部分用 PHP 脚本书写，因为是动态变化的。

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Page Staticize</title>
</head>
<body>
	<h2><?php echo $data ;?></h2>
</body>
</html>
```

- index.php

在这里面完成 **取数据** 的功能，常见的是取出来保存在数组中，然后将模板文件引入到 index.php，这样 template.php 中的动态 PHP 脚本就可以直接使用刚刚从 index.php 中取出的数据了。

```
<?php

# 定义一个数组模仿数据库
$database = array(
		'title' => "Page Staticize" ,
		'author' => "lamChuanJiang" ,
		'copyright' => 'CC BY-NC-ND 3.0' ,
		'email' => 'lamchuanjiang@gmail.com'
	) ;

# 1. 取数据
$data = $database[ 'author' ] ;

# 2. 引入模板
ob_start() ;
require_once 'template.php' ;

# 3. 生成静态页面: 将 php buffer 中的数据写入 index.shtml
# 使用 PHP 风格的 `file_put_contents()` 函数
file_put_contents( "index.shtml", ob_get_clean() ) ;
# 也可以使用 C 风格的 `fwrite()` 函数
?>
```

这里 `require_once 'template.php' ;` 的作用就是会输出 template.php 中的 `echo` 后面的内容 到浏览器，因此也会先进入 PHP Buffer 中，所以这里使用  `ob_get_clean()` 就能够将 template.php 中的 HTML 骨架不输出到浏览器而是配合 `file_put_contents()` 函数将原 HTML 和由 PHP 新生成的数据全部写入到 index.shtml 文件，然后清除缓冲区内容。

这样得到的 index.shtml 就是一个真正的纯 HTML 文件，即实现了纯静态化。

触发系统生成纯静态化页面的三种方式
-

了解了 PHP 实现页面纯静态化的基本方式之后，下一步就是实现自动化定时静态化页面的任务，毕竟不可能每次需要的时候都要人工去刷新浏览器或者执行上面的 PHP 代码。

**1、页面添加缓存时间**

基本思路是这样的：

每份静态页面都有一个规定的过期时间。当一次用户请求到达服务器时，服务器都需要去判断请求的页面时间是否已经过期。

如果已经过期，那么就执行动态页面程序生成一份最新的静态页面；如果没有过期，就直接将该静态页面返回给用户。

**2、手动触发方式**

这种方式通常应用在后台管理界面，需要管理员立马更新页面的时候，提供一个按钮以与生成新的静态页面这一操作绑定。

**3、crontab 定时扫描程序**

通过 Linux 的定时扫描工具 crontab 实现页面静态化的定时自动化是用得最多的情景，因为实际工作中绝大部分 PHP 代码都将运行在 Linux 服务器上。

具体设置如下所示：

```
# 编辑 crontab 任务
$ sudo crontab -e
```

然后添加如下字段：

```
# 每 5 分钟执行一段程序
*/5**** /usr/bin/php /data/static/index.php
```

#### **Linux 定时任务工具 crontab 使用说明**

Linux 的定时任务服务 cron 是通过 crontab 命令来设定的，cron 服务常用于对数据库的备份操作。

- `*/` 代表每分/时/日... 等，`*` 代表的是取值范围内的值，比如分的取值范围就是 0~60。

- 第一个 * 代表 分；第二个 * 代表 小时；第三个 * 代表 日；第四个 * 代表月；第五个 * 代表 周，之后的路径依次代表的是命令程序所在地址和要执行的程序文件所在地址。

```
30 6 *** /sbin/service sshd start 每天 6:30 开启 SSH 服务
```

- 常用命令格式

```
crontab -e # 编辑某个用户的 cron 服务
crontab -l # 列出某个用户 cron 服务的详细内容
crontab -r # 删除某个用户的 cron 服务
```

##### 说明：某个用户指的是某个执行 crontab 命令的用户。

- 查看 crontab 运行日志情况

```
tail -f /var/log/cron.log
```

PHP 实现页面半静态化/局部动态化
-

局部动态化的实现原理也就是通过 AJAX 与服务器异步交换数据，然后按事件( 定时、鼠标滚动等 )更改页面当中某个部分的内容。

既然要与服务器异步交换数据，那么首先就需要知道要交换的数据的来源，即是一个接口地址，作为于异步请求的源。

接着就需要对接口数据的格式进行一些规定，如 JSON，然后规定返回什么内容应该进行什么样的操作。举例说明：

- index.php

```
<?php
ob_start() ;
require_once 'template.php' ;
file_put_contents( "index.shtml", ob_get_clean() ) ;
header( "Refresh:3; index.shtml" ) ;
?>
```

- template.php

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Page Staticize</title>
</head>
<body>
	<!-- 这里的内容属于纯静态内容 -->
	<h1>latest 3 by lamChuanJiang</h1>
	<!-- 而这里的内容确实通过 Ajax 异步加载过来的, 属于局部动态化内容 -->
	<ul id="article">
	</ul>
<script src="js/jquery-2.1.4.min.js" ></script>
<script src="js/ajax.js" ></script>
</body>
</html>
{% endhighlight %}

- js/ajax.js

```
function update_article() {
	$.ajax( {
		url: 'http://localhost.lamchuanjiang.org/static/api/ajax.php' ,
		type: 'get' ,
		dataType: 'json' ,
		error: function () {
			alert( 'error' ) ;
		} ,
		// result 就是 ajax.php 返回的一个数据对象
		success: function ( result ) {
			if( 1 == result.code ) {
				html = '' ;
				// 遍历每一条数据
				$.each( result.data, function ( key, value ) {
					html += '<li>' + value.title + '</li>' ;
				} ) ;
				$( "#article" ).html( html ) ;
			}
		} ,
	} ) ;
}
setInterval( update_article, 3000 ) ;
```

- ajax/ajax.php

```
<?php
# 定义一个数组模仿数据库
# 这里的字段名不能相同, 否则以最后一个相同的字段为准
$database = array(
	'lamChuanJiang0' => array(
			'title' => "Page Staticize Introduction" ,
			'author' => "li" ,
			'copyright' => 'CC BY-NC-ND 3.0' ,
			'email' => 'lamchuanjiang@gmail.com'
		) ,
	'lamChuanJiang1' => array(
			'title' => "Page Staticize with AJAX" ,
			'author' => "lam" ,
			'copyright' => 'CC BY-NC-ND 3.0' ,
			'email' => 'lamchuanjiang@outlook.com'
		) ,
	'lamChuanJiang2' => array(
			'title' => "Pure Page Staticize" ,
			'author' => "lcj" ,
			'copyright' => 'CC BY-NC-ND 3.0' ,
			'email' => 'lamchuanjiang@icloud.com'
		)
	) ;
# 1. 模拟获取数据
$data = $database ;
# 实际应用中, 这里需要进行判断才决定状态码和是否成功的消息值, 这里这样写只是为了简单说明原理
return show_data( 1, 'success', $data ) ;
# 2. 把获取到的数据组装成接口数据通信
function show_data( $code = 0, $msg = 'error', $data = array() ) {
	$res = array(
			'code' => $code ,
			'msg' => $msg ,
			'data' => $data
		) ;
	echo json_encode( $res ) ;
}
?>
```

伪静态/rewrite
-

#### 动态URL地址设置静态形式

常见的动态 URL 如下：

```
http://test.com/index.php?c=play&a=index&id=1024
```

这样的 URL 格式不利于记忆。我们更喜欢使用的是如下形式的静态 URL：

```
http://test.com/play/1024.shtml
```

实际上，动态 URL 通常都会被转换成静态 URL，而仅仅将 动态 URL 转换成 静态 URL，该静态 URL 指向的页面仍然是动态页面。因此，这种做法被叫做：**伪静态**。

伪静态有如下 2 个优点：

- 美化 URL

- 对搜索引擎友好，方便其收录

#### 实现伪静态一般有两种方式：

- **通过 PHP 的方式**

使用 path_info 模式，PATH_INFO 可以通过 `print_r( $_SERVER )` 查看。

path_info 是浏览器地址栏传递给服务器的请求信息，存储在超全局数组 $_SERVER 中，是键为 PATH_INFO 对应的值。

需求如下：

实现类似 当用户访问 /news_lists.php/2/1.shtml 的时候，服务器自动从数据库获取 type=2，category_id=1 的数据表。其最终效果和访问 /news_lists.php?type=2&category_id=1 一致。

该方式的重点是正则替换，通过正则实现对动态 URL 的静态化。举例说明：

```
preg_match( '/^\/(\d+)\/(\d+).shtml/', $_SERVER['PATH_INFO'],$arr )
```

该函数将从用户所输入的 URL 中提取出 PATH_INFO，然后从该 PATH_INFO 中匹配出需要的部分，这里是两个相同的子模式 `(\d+)` 匹配到的具体的值，然后将匹配到的值保存到 $arr 中，然后就可以通过关联数组 $arr 取得相应的数据用于拼接 SQL 语句实现不同的业务需求了。

在这种情况下可以进行业务逻辑优化，比如对匹配的结果进行条件判断，如果匹配成功，那么就去数据库取数据，否则选择页面跳转，如跳转到首页或者 404 页面。

- **通过对服务器 (nginx/apache) 进行配置**

Nginx 默认不支持 path_info 模式，但是可以配置，Apache 默认就支持 path_info 模式，所以可以直接通过 $_SERVER['PATH_INFO'] 查看。

#### Apache 下 rewrite 配置

1、 虚拟域名配置 => httpd.conf

找到 `LoadModule rewrite module modules/mod_rewrite.so`，取消其前面的注释即可。

重启 Apache，然后测试：`pathinfo();` 。

浏览器中搜索 rewrite 如果在 Load Modules 选项中有 `mod_rewrite` 则说明 rewrite 模块以及成功导入。

然后找到：`Include conf/extra/httpd-vhosts.conf`，同样取消其前面的注释。

2、 配置 httpd_vhosts.conf

复制一份 `<VirtualHost 127.0.0.1~255:post> ...</VirtualHost>` 进行相应配置，前面的 `ServerName` 等虚拟主机相关字段配置同以前，这里主要讲在此处对 rewrite 模块的配置，如下：

```
RewriteEngine on
RewriteRule ^/detail/([0-9]*).shtml$ /detail.php?id=$1
```

上述配置的意思是：如果要在浏览器地址栏中将要访问类似 `域名/detail/数字.shtml`的页面的话，将自动将服务器上的路径为 `/detail.php` 的动态 PHP 页面返回给浏览器。

同时，在请求 `/detail.php` 的时候会将 `id=数字` 作为 URL 参数，即使用 GET 方式传递给 /detail.php。

`$1` 的值和模式 `([0-9]*)` 匹配到的值一样。可以看出，和通过 PHP 方式的思路类似，重点都是通过组织正则表达式。

但是，如果路径 `域名/detail/数字.shtml` 确实存在的话，那么就需要配置访问实际存在的页面而不要走重写 url 的路，而直接将该页面返回给浏览器。配置如下：

```
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} !-d
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} !-f
```

通过上面的配置，Web 服务器对请求的资源的响应策略将变得更灵活了。最终 `<VirtualHost>` 块中的配置内容应该类似如下：

```
<VirtualHost 127.0.0.2:8080>
	ServerAdmin example@email.org
	DocumentRoot "C:/WWW/app"
	ServerName test.org
	ServerAlias www.example.com
	ErrorLog "logs/www.example.com-error.log"
	CustomLog "logs/www.example.com-access.log" common
	RewriteEngine on
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} !-d
	RewriteCond %{DOCUMENT_ROOT}%{REQUEST_FILENAME} !-f
	RewriteRule ^/detail/([0-9]*).shtml$ /detail.php?id=$1
</VirtualHost>
```

#### Nginx 下 rewrite 配置

```
cd /etc/nginx/conf.d
sudo vi domain_name_xxx.conf
```

##### 说明：这里的 `domain_name_xxx` 代表的是为实际项目所配置的域名， 一般都是虚拟域名。

找到 `if( !-e $request_fi | ename ){}`，`{}` 中 `break;` 前添加：

```
rewrite ^/detail/([0-9]*).shtml$ /detail.php?id=$1 last;
```

然后重启或重载 Nginx 配置：

```
sudo service nginx restart/reload
```

##### 注意：对服务器的配置过多会影响服务器的性能，因此需要根据业务需要针对性地配置服务器。

附录：Wordpress 中设置的 rewrite 规则
-

```
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /wordpress/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /wordpress/index.php [L]
</IfModule>

# END WordPress
```

参考
-

- Navicat for MySQL