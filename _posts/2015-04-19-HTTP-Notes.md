---
layout: post
title: HTTP 协议基础
category: PHP
tags: [HTTP, PHP]
latest: 2015年4月19日 17:26:45
---

HTTP ( HyperTxet Transfer Protocal ) 是 Web 应用数据传输的基础。

HTTP 的特点
-

1. 建立在 TCP/IP 基础之上，属于 TCP/IP 的应用层协议，是 TCP/IP 更高层次的封装。

2. HTTP 一种无状态协议，即不建立持久的连接。

HTTP 的历史
-

- HTTP 1.0 ( 已经抛弃 )：短连接，一连接上就断掉。

- HTTP 1.1：长连接，有个超时挂断机制。

一次完整 HTTP 请求过程举例
-

1、 建立 TCP 连接；

2、 浏览器想服务器发送请求命令；

3、 历览器发送请求头信息；

4、 服务器做出应答；

5、 服务器发送应答头信息；

6、 服务器向浏览器发送数据；

7、 服务器关闭 TCP 连接。

完整 HTTP 请求一由四部分组成：

- HTTP 请求的方法和动作：比如是 GET 还是 POST 请求。

- 正在请求的 URL：即请求资源的地址。

- 请求头：包含一些客户端环境信息，身份验证信息等。

- 请求体：即请求正文，请求正文中可以包含客户提交的查询字符串信息，表单信息等。

一个实例如下：

```
# 请求行：告诉服务器自己要请求的资源和请求的方式
GET /test/hello.html HTTP/1.1	// 请求行。表示发送的是get请求,请求资源是test/hello.html
# 消息头
Accept:*/*		// 表示客服端可以接受任何数据
Referer: http://localhost:80/.../test.html	// 表示请求的资源从服务器上的哪个位置来的
Aceept-Language:zh-cn	// 页面语言
User-Agent:Mozilla/4.0	// 告诉服务器本级浏览器的内核, 操作系统信息
Accept-Encoding:gzip,deflate	// 表示接受什么样的数据压缩格式
Host: localhost:80	// 主机:80
Connection:Keep-Alive	// 表示连接不要立刻断掉
```

##### **说明**

HTTP 请求的内容会跟随具体情况变化而变化。

一个 HTTP 响应一般由三部分组成：

- 一个数字和文字组成的 **状态码**，用来告诉客户端的请求是成功还是失败。

- **响应头**：响应头和请求头一样包含许多有用的信息，比如服务器类型、日期时间、内容类型和长度等。

- **响应体**：即响应正文。

具体的内容可以在浏览器中通过 F12 查到。

4. 图床:把大量的图片放在带宽非常足够的服务器上

5. 同样的资源浏览器只取一次

6. "客户端向服务器发送了一个HTTP请求":

客户端连上服务器后(前提),向服务器请求某个web资源

消息体(实体内容)

可以用 PHP 代码将浏览器-服务器信息打印出来：

```
foreach ($_SERVER as $key=>$value){

	echo "$key=>$value<br>" ;
}
```

POST 和 GET 请求
-

- 相同点: 向服务器发送 HTTP 请求。

#### 区别:

- 安全性
 
 get的请求数据会显示在地址栏上,而post请求的数据会放在http协议的消息体内

- 可以提交数据的大小

http协议本身并没有限制数据大小,浏览器会对get和post的请求数据限制:

get: 2k + 35
post:没有限制

- get请求可以更好地被浏览器收藏(添加到收藏夹)

- get比post快,post比get安全(相对)

- 应用：GET 请求主要用于信息的获取、通过 URL 传递参数；而 POST 请求主要用于修改服务器上的资源。

防盗链
-

把地址当作字符串在对字符串进行验证(strpos),通过验证则放行否则跳转到警告页面。代码示例：

index.php:

```
<a href="http://localhost/secretInfo.php">查看账号密码</a>
```
Warning.php:
```
<h1>小子!想盗链吗??</h1>
```
secretInfo.php:

```
<?php
	if(isset($_SERVER['HTTP_REFERER'])){
		# 如果是本地网站中的页面在请求访问,则放行,否则跳转到警告页面
		if(strpos($_SERVER['HTTP_REFERER'], "http://localhost/linkStealVoid")==0){
				echo '建行账号:6111 5445 5556 8813 201 <br/>银行密码:xxx111';
		}else{
			header("Location: warning.php");
		}
	}else{
		echo '访问失败!无法验证 HTTP_REFERER';
	}
?>
```

10.一个HTTP响应:
代表服务器向客户端回送的数据
10.1. 基本结构实例(非完整): 

```
状态行/HTTP版本号  状态码   [解释]
HTTP/1.1 200 OK	[200表示状态码(3位是十进制数) ok,表示客户端请求成功]
消息头信息
Location: http://www.baidu.com/index.php
Server: Microsoft-IIS/5.0	[表示告诉浏览器 服务器的情况]
Date: Thu, 13 Jul 2000 05:46:53 GMT	[告诉浏览器 请求的页面更新时间]
Content-Encoding:gzip	[内容编码支持gzip算法]
Content-Length:2291		[表示回送的数据有 2291 个字节]
Content-Language:zh-cn	[语言]
Content_Type:text/html; charset=GB2312	[文档了类型]
Last-Modified: Tue,11, Jul 2000 18:23:51 GMT	[浏览器请求资源的最新时间]
Refresh: 1; url=http://baidu.com
Content-Disposition:attachment; filename=aaa.zip
Transfer-Encoding:chunked
Set-Cookie:SS=Q0=5Lb_nQ;path=/search
# 以下三个共同控制是否启用缓存机制,需要三个的理由就是不同的浏览器识别不同
# Expires:-1
# Cache-control: private[no-cache]	[缓存]
# Pragma:no-cache
Connection: close/Keep-Alive
```

实体信息	
hello	[]

5 类 HTTP 状态码的含义
-

HTTP 状态码由 3 位数字构成，其中首位数字定义了状态码的类型：

- 100~199: 信息类。表示服务器成功接收到浏览器的请求，要求客户端继续提交下次请求才能完成整个处理过程。

- 200~299：表示服务器已成功、正确地接受到浏览器的请求并已完成整个流程，常用的有 200 。

- 300~399：重定向。表示请求没有成功，为完成请求,客户需进一步细化请求,例如,请求的资源已经移动到一个新地址,常用302,304。

- 400~499：客户端请求有错误，表示客户端提交的请求有错误。常用 404 。

- 500~599：服务器端出现错误，表示服务器不能完成对请求的处理。

##### **说明**

有的现在或许还没有定义，是留着以后扩展的。

12 .302状态码 ,跳转页面(外网也能跳转)
header ("Loaction: URL");
404状态码: 一半来讲都是网页不存在了
304状态码:表示资源还在浏览器,无需重复向服务器请求

13.回车和刷新的区别: 默认情况时, 回车先从缓存取内容,刷新都是从服务器取

14. HTTP实际应用:通过HTTP协议控制浏览器实现(header();):
14.1. 间隔数秒跳转或者刷新
<?php
	//header("Refresh:3; url=http://www.baidu.com");
	header("Refresh:3; url=http://localhost/...");
?>
14.2. 控制页面缓存(默认会缓存)

```
<?php
	# 禁用缓存,针对不同浏览器处理
	header("Expires: -1") ;
	header("Cache-control: no-cache") ;
	header("Pragma:no-cache") ;
?>
```

14.3. 文件下载

```
<?php
	# 文件名为英文,若要为中文,则需要转码,不转则会提示文件不存在(出现这种现象的原因是因为PHP文件函数比较古老),举例如下:
	# $file_name_1 = "中国.jpg";
	# $file_name_2 = iconv("utf-8", "gb2312", $file_name_1);
	$file_name="xx.xx";
	# 若要把下载的文件全部统一放到某一个文件夹中,则可通过设置路径来实现,代码如下:
	# $file_path="./download/".$file_name;	//	相对路径,需要查找
	# $file_path=$_SERVER[' DOCUMENT_ROOT ']"./download/".$file_name;		//绝对路径,比相对路径更快
	# 设置好路径后,下面if中的$file_name也要跟着改成路径名$file_path
	# 打开文件(本PHP程序将文件读入服务器内存,然后通过HTTP协议将调入内存的文件一点点返回给请求端)
	if(file_exists($file_name)){
		echo "文件不存在!";
		return;
	}
	$fp=fopen($file_name);
	# 获取下载文件的大小,可以可以通过设置filesize来限制大文件的下载
	$file_size=filesize($file_name);
	if($file_size>30){
		echo "<script language='javascript'>window.alert('文件过大,拒绝下载!')</script>";
		return;
	}
	# 返回的文件
	# 必要的下载头文件(无需死记)
	header("Content-type:application/octet-stream");	
	# 按照字节大小返回
	header("Accept-Ranges:bytes");
	# 返回文件大小
	header("Accept-length:$file_size");
	# 客户端的弹出对话框
	header("Content-Disposition:attachment; filename=".$file_name);
	# 向客户端回送数据
	$buffer=1024;
	$file_count=0;
	# 为了下载的安全,最好做一个文件字节读取计数器,当计数器的值达到文件大小的时候结束下载
	while(!feof($fp)  &&  $file_size-$file_count>0){
		$file_data=fread($fp,$buffer);
		$file_count += buffer;
		# 把部分数据回送给浏览器
		echo $file_data;
	}
	# 关闭文件
	fclose($fp);
?>
```

# 文件操作的原理 (PHP/JAVA/C++/...)

文件的基本知识:
文件的类型: 文本文件  ||  二进制文件(图片/音频/视频,每种后缀对应一种压缩算法)  
文件的操作:
判断文件存在否? ($fp=fopen("xx.txt","rw+[...]");)  [$fp作用类似于指针,指向哪里根据每种语言的设计不同而不同]
-->     具体操作:添加,修改,等等  -->   关闭文件(fclose($fp));
文件信息:文件头,存放大小,类型等等

15.  乱码解决方法

```
// 1、 通过 HTML <meta> 标签指定

<meta charset="utf-8">

// 2、 通过 PHP header() 函数指定
<?php
	header("Content-Type:html;charset=utf-8");
?>
```
