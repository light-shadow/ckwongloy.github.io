---
layout: post
title: PHP 通过 MySQL/AJAX 验证登录用户的合法性
category: PHP
tags: [PHP, MySQL, Web, AJAX]
latest: 2015年04月19日 17:26:45
---

用户验证是网站中经常用到的功能。

我从在线网页聊天项目中截取相关功能出来简单说明下。

这是我初学 PHP 时写在 OneNote 中的笔记，当时写得有点乱。

现在采用 MVC 模式进行简单的优化，也按照面向对象风格进行重新编码。放到博客上，为 PHP 初学者提供便利。

项目文件夹 ***WebChat*** 下有 5 个文件夹和一个入口文件，与本文主题有关的页面分别是：

- class

功能模块，存放对具体业务逻辑的处理脚本。其下有：_sql_helper.class.php_、_sql_verify.class.php_。

- view

界面层，存放呈现在浏览器中的页面文件。包括 _friends_list.php_ 等。

- controller

控制器，存放对业务逻辑处理的决策文件。其下包括：

*controller.ajax.php*、*controller.login.php*、*controller.get_message.php*。

- db

存放的是项目使用到的使用到的 sql 语句，保存在文件：_webchat.sql_ 中。

- js

存放的是 ajax 核心脚本。文件名：_ajax.js_ 。

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

<form action="/WebChat/controller/controller.login.php" method="POST" onkeyup="check_is_legal()">
<p>用户: <input type="text" name="username" id="username"></p>
<p>密码: <input type="password" name="password" id="password"></p>
<input type="submit" value="登录">
<span>新用户？<a href="/WebChat/view/register.php">注册</a></span>
</form>

<p style="color:red" type="text" id="myAjaxResult"></p>

<script src="/WebChat/js/ajax.js"></script></body></html>
{% endhighlight %}

2、 controller.login.php
-

{% highlight php %}
<?php
	
	require_once '../class/sql_verify.class.php' ;

	$username = isset(  $_POST[ 'username' ] ) ?  $_POST[ 'username' ] : 'un' ;
	$password = isset(  $_POST[ 'password' ] ) ?  $_POST[ 'password' ] : 'pn' ;

	$sql_verify = new SQLVerify() ;
	$row = $sql_verify->get_sql_res( $username, $password ) ;

	// 其实可以不必判断，因为在查询的过程中其实已经判断了
	if( $row["username"] === $username && $row["pwd"] === md5( $password ) ){
		header( "Location: /WebChat/view/friends_list.php" ) ;
	}else {
		// 在 header() 之前不能有任何输出	
		header( "Location: /WebChat/" ) ;
	}
?>
{% endhighlight %}

3、 sql_verify.class.php
-

{% highlight php %}
<?php

	require_once 'sql_helper.class.php' ;

	Class SQLVerify {
		
		public function get_sql_res( $username, $password ) {

			// 从数据库中去验证用户是否合法

			// $legal_check_sql = "select md5( '$password' ) from user_info where username='$username'" ;
			$legal_check_sql = "select * from user_info where username= '$username' and pwd=md5( '$password' )" ;
			$legal_check =  new SQLHelper() ;
			$res = $legal_check->execute_dql( $legal_check_sql ) ;
			$row = $res->fetch_assoc() ;
			$legal_check->close_connect( $res ) ;

			return $row ;

		}
	}
{% endhighlight %}

4、 sql_helper.class.php
-

{% highlight php %}
<?php

	class SQLHelper {
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
			// 设置访问数据库的字符集，保证 PHP 是以 UTF-8 来操作数据库。
			// 这和 MySQL 数据库内部的设置是分开的
			$this->mysqli->query( 'set utf8' ) ;
		}

		// 数据查询操作：select
		public function execute_dql( $sql ){
			// $res = $this->mysqli->query( $sql ) or die('dql 执行失败!'.$this->mysqli->error) ;
			$res = $this->mysqli->query( $sql ) or die() ;
			return $res ;
		}

		// 数据管理操作：alter, drop, delete
		public function execute_dml( $sql ){
			// $res = $this->mysqli->query( $sql ) or die('dml 执行失败!'.$this->mysqli->error) ;
			$res = $this->mysqli->query( $sql ) or die() ;
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
			mysqli_free_result( $res ) ;
		}
	}
{% endhighlight %}

5、 controller.ajax.php
-

{% highlight php %}
<?php

	require_once '../class/sql_verify.class.php' ;

	// 告诉浏览器返回的数据格式
	header("Content-Type:text/plain;charset=utf-8;") ;

	// 告诉浏览器不要缓存数据
	header("Cache-Control: no-cache") ;

	$username = isset(  $_POST[ 'username' ] ) ?  $_POST[ 'username' ] : 'un' ;
	$password = isset(  $_POST[ 'password' ] ) ?  $_POST[ 'password' ] : 'pn' ;

	$is_legal = false ;

	$sql_verify = new SQLVerify() ;
	$row = $sql_verify->get_sql_res( $username, $password ) ;

	////////////////////////////////////////// 第 3 号线 —— 送回处理结果 ( 可用三种格式文件作为载体 )

    // 这里的显示数据将返回给请求的页面，即在浏览器上被用户看见

	// 其实可以不必判断，因为在查询的过程中其实已经判断了
	if( $row["username"] === $username && $row["pwd"] === md5( $password ) ){
		$is_legal = true ;
	}

	if ( $username == null ||  $password == null ) {
		echo '用户名或密码不能为空/空格！' ;
	}else if ( ! $is_legal ) {
		echo "用户名 '$username' 与密码的组合不正确！" ;
	}

?>
{% endhighlight %}

6、 ajax.js
-

{% highlight javascript %}

// 获得 XMLHttpRequest 对象
function getXmlHttpObject() {
	var xmlHttpRequest ;
	
	//////////////////////////////////////// 第 1 条线 —— 浏览器创建 Ajax 引擎：XMLHttpRequest 对象

	// 不同浏览器创建 XMLHttpRequest 对象方法不一致
	// 这里用 if...else 简单判断两种情况，即 IE 内核和非 IE 内核
	if( window.ActiveXObject ){
		xmlHttpRequest = new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	}else{
		xmlHttpRequest = new XMLHttpRequest() ;
	}
	return xmlHttpRequest ;
}
// 定义一个全局变量
var myXmlHttpRequest = "" ;

// 表单输入的过程中验证用户是否合法用户
function check_is_legal() {
	myXmlHttpRequest = getXmlHttpObject() ;
	if( myXmlHttpRequest ){
		var url = "/WebChat/controller/controller.ajax.php" ;
		var info = "username=" + $( 'username' ).value
					+ "&password=" + $( 'password' ).value ;
		myXmlHttpRequest.open( "POST", url, true ) ;
		myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
		
		//////////////////////////////////////////////////// 第 2 号线 —— 开始发送请求

		// 如果是 get 方式，则填入 null 即可；如果是 post 方式，则填入实际的数据
		myXmlHttpRequest.send( info ) ;
		myXmlHttpRequest.onreadystatechange = callback ;
	}else{
		window.alert( "Ajax 引擎创建失败！" ) ;
	}
}

///////////////////////////////////////////////////// 第 4 号线 —— 回调函数

function callback(){
	if( myXmlHttpRequest.readyState === 4 ){
		// 这里返回的是文本格式
		if( myXmlHttpRequest.status === 200 ) {
			$( 'myAjaxResult' ).innerHTML =  myXmlHttpRequest.responseText ;
		}else {
			alert( '发生错误：' + myAjaxResult.status ) ;
		}
		
	}
}

// 单独封装一个函数 $(), 替代直接在给 url 赋值的时候调用 document.getElementById().value 方法 
// 这样做的好处是可以方便地将用户输入的值的 id 当参数传给此函数，比较灵活，简洁，函数可复用性强 
function $( id ){
	return document.getElementById( id ) ;
}
{% endhighlight %}

7、 webchat.sql
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
