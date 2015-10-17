---
layout: post
title: PHP 通过 MySQL 数据库验证登录用户的合法性
category: PHP
tags: [PHP, MySQL, Web]
latest: 2015年04月19日 17:26:45
---

用户验证是网站中经常用到的功能。我从在线网页聊天项目中截取相关功能出来简单说明下。

这是我初学 PHP 时写在 OneNote 中的笔记，当时写得有点乱。

现在采用 MVC 模式进行简单的优化，放到博客上，为 PHP 初学者提供便利。

项目文件夹 ***WebChat*** 下有 4 个文件夹和一个入口文件，分别是：

- class

功能模块，存放对具体业务逻辑的处理脚本。其下有：_sql_helper.class.php_、_message_service.class.php_。

- view

界面层，存放呈现在浏览器中的页面文件。包括 _friends_list.php_ 和 _chat_page.php_。

- controller

控制器，存放对业务处理的决策文件。其下包括：

*controller.send_message.php*、*controller.login_verify.php*、*controller.get_message.php*。

- db

存放的是项目使用到的使用到的 sql 语句，保存在文件：_webchat.sql_ 中。

- index.php

路由脚本，MVC 尽量采用单入口模式。

本文主要对用户验证相关的几个脚本代码进行说明，与用户无直接关系的脚本跳过。

介绍顺序和程序运行流程一致。

1、 index.php
-

{% highlight html %}
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>请登录 - Web Chat</title></head>
<body>
<h1>Web Chat</h1>
<form action="./controller/controller.login_verify.php" method="POST">
用户名: <input type="text" name="username">
密码: <input type="password" name="password">
<input type="submit" value="登录">
</form></body></html>
{% endhighlight %}

2、 controller.login_verify.php
-

{% highlight php %}
<?php

	require_once '../class/sql_helper.class.php' ;
	
	$username = isset(  $_POST[ 'username' ] ) ?  $_POST[ 'username' ] : 'default_name' ;
	$password = isset(  $_POST[ 'password' ] ) ?  $_POST[ 'password' ] : 'default_password' ;

	// 从数据库中去验证用户是否合法
	// $legal_check_sql = "select md5( '$password' ) from user_info where username='$username'" ;
	$legal_check_sql = "select * from user_info where username= '$username' and pwd=md5( '$password' )" ;
	$legal_check =  new SQLHelper() ;
	$res = $legal_check->execute_dql( $legal_check_sql ) ;
	$row = $res->fetch_assoc() ;
	$legal_check->close_connect( $res ) ;

	// 其实可以不必判断，因为在查询的过程中其实已经判断了
	if( $row["username"] == $username && $row["pwd"] == md5( $password ) ){
		header( "Location: ../view/friends_list.php" ) ;
	}else{
		// 在这里添加 Ajax 验证 或者使用 正则表达式 初步验证输入的合法性
		header( "Location: ../" ) ;
	 }

?>
{% endhighlight %}

3、 sql_helper.class.php
-

{% highlight php %}
<?php

	class SQLHelper{
		private $mysqli ;

		// 以下配置信息最好保存到一个文件
		private static $host = 'localhost' ;
		private static $user = 'root' ;
		private static $pwd = 'enter' ;
		private static $db = 'webchat' ;

		public function __construct(){
			$this->mysqli = new mysqli( self::$host,self::$user, self::$pwd, self::$db ) ;
			if($this->mysqli->connect_error){
				die('连接失败!'.$this->mysqli->connect_error) ;
			}
			// 设置访问数据库的字符集，保证 PHP 是以UTF-8来操作数据库。
			// 这和 MySQL 数据库内部的设置是分开的
			$this->mysqli->query( 'set utf8' ) ;
		}

		// 数据查询操作：select
		public function execute_dql( $sql ){
			$res = $this->mysqli->query( $sql ) or die('dql 执行失败!'.$this->mysqli->error) ;
			return $res ;
		}

		// 数据管理操作：alter, drop, delete
		public function execute_dml( $sql ){
			$res = $this->mysqli->query( $sql ) or die('dml 执行失败!'.$this->mysqli->error) ;
			if( !$res ){
				return 0 ;
			}else{
				if( $this->mysqli->affected_rows>0 ){ return 1 ; }
				else { return 2 ; }
			}
		}

		// 释放资源、关闭连接
		// 根据手册，需要通过结果集来释放，所以这里给个参数 $res
		public function close_connect( $res ) {
			$res->free() ;
			$res->close() ;
		}
	}

?>
{% endhighlight %}

4、 webchat.sql
-

{% highlight sql %}
-- 创建数据库

create databases webchat;

-- 使用数据库

use webchat;

-- 创建用户信息表

create table user_info (
	username varchar(32),
	pwd varchar(32),
	register_time date,
) character set utf8 ;

-- 插入数据

insert into user_info( username, pwd, register_time ) values( "li", md5("enter"), "2015-10-17 13:23:11" ) ;

insert into user_info( username, pwd, register_time ) values( "root", md5("loveyou"), "2015-10-17 13:23:11" ) ;

-- 用户登录验证的 SQL 语句

select md5( "$password" ) from user_info where username="$username" ;

select * from user_info where username= "$username" and pwd=md5( "$password" ) ;

{% endhighlight %}

建议
-

- 手册不离手：<https://secure.php.net/manual/zh/index.php>。

- 想法对不对用代码去验证就知道了。
