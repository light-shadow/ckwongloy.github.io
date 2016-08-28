---
layout: post
title: PHP 简单 cURL 操作
category: PHP
tags: [PHP, cURL]
latest: 2015年05月15日 18:18:49
---

> cURL(Client URL Library Functions) is a command line tool for transferring data with URL syntax.


cURL 是客户端向服务器请求资源的工具，利用 URL 语法规定来传输文件和数据的工具,支持很多协议,如 HTTP、FTP、TELNET等。可用于：

- 网页资源

编写网页爬虫。

- WebService 数据接口资源

动态获取接口数据，比如天气，号码归属等。

- FTP

下载 FTP 服务器中的资源。

- 其他资源

所有网络上的资源都可以用 cURL 访问和下载。


#### 安装

过程略，详见手册。

- Windows: cmd => `php -i` => 编辑 => 查找 cURL

- Linux: `php -i | grep curl`

#### PHP 使用 cURL 基本步骤

``` php
<?php
# 初始化
curl_init();

# 设置变量
# 一切玄妙均在此 有一长串 cURL 参数可供设置 它们能指定 URL 请求的各个细节
curl_setopt();

# 向服务器发送请求
# 接受服务器数据
curl_exec();

# 释放 cURL 句柄
curl_close();
```

- **设置 GET/POST 请求**

``` php
#### GET 请求
curl_setopt($ch, CURLOPT_URL, "http://github.com");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);

#### POST 请求
curl_setopt($curlobj, CURLOPT_HEADER, 0);
curl_setopt($curlobj, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curlobj, CURLOPT_POST, 1);
curl_setopt($curlobj, CURLOPT_POSTFIELDS, $data);
curl_setopt($curlobj, CURLOPT_HTTPHEADER, array(
	"application/x-www- form-urlencoded; charset=utf-8",
	"Content-length: ".strlen($data)
));
```

#### PHP 爬虫

PHP实现爬虫主要方法如下：

1.file()函数

2.file_get_contents()函数

3.fopen()­>fread()­>fclose()方式

4.curl方式

5.fsockopen()函数,socket方式 

6.使用开源工具,如:snoopy

PHP解析XML或HTML主要方式：

1.正则表达式

2.PHP DOMDocument对象

3.插件,如:PHP Simple HTML DOM Parser


#### 参考

- <https://github.com/endroy/Snoopy>

- <https://github.com/bupt1987/html-parser>
