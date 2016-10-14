---
layout: post
title: 通过正则表达式验证登录/注册用户的合法性
category: PHP
tags: [正则表达式, PHP, AJAX, MySQL]
latest: 2015年10月19日 17:26:45
---

用户验证是网站中经常用到的功能，而对用户输入合法性验证常采用的措施有 3种。

1、 通过 Ajax 异步将输入提交给服务器让 PHP 处理，不过这样耗费服务器资源。

2、 通过 HTML 5 标签格式限定，如限定 input 标签只能是 email 格式。

3、 通过 Javascript 在浏览器本地验证。

但是以上思路都用到了正则表达式，这也就是说各种编程语言都支持正则表达式。

举个例子，我从在线网页聊天项目中截取相关功能出来简单说明下，本例中采用的是 Ajax 的方式进行验证。

这是我初学 PHP 时写在 OneNote 中的笔记，当时写得有点乱。现在采用 MVC 模式进行简单的优化，也按照面向对象风格进行重新编码。放到博客上，为 PHP 初学者提供便利。

项目文件夹 ***WebChat*** 下有 7 个文件夹和一个入口文件，与本文主题有关的脚本分别是：

- class

功能模块，存放对具体业务逻辑的处理脚本。其下有：_sql_helper.class.php_。

- view

界面层，存放呈现在浏览器中的页面文件。包括 _friends_list.php_ 等。

- controller

控制器，存放对业务逻辑处理的决策文件。其下包括：*controller.login.php*。

- db

存放的是项目使用到的使用到的 sql 语句，保存在文件：_webchat.sql_ 中。

- js

存放的是 ajax 核心脚本。文件名：_ajax.js_ 。

- ajax

存放的是所有和 Ajax 有关的代码

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
<title>请登录 - Web Chat</title>

<style>

	body { background: url(/WebChat/img/bg.gif); }
	* { font-family:Georgia; }
	a { text-decoration:none; }
	li { padding:5px; }
	h1, h5 { text-align: center;}
	p { margin: 20px 0 20px 38%; }
	img { margin-left: 39%; } 

</style>

</head>

<body>

<h1 style="margin:15% 0 0 0;">Web Chat - 用户登录</h1>
<h5><i>( 提示：用户名和验证码都区分大小写 )</i></h5>

<form action="/WebChat/controller/controller.login.php" method="POST">

<p>
<b>用户：</b>
<input type="text" name="username" id="username" onkeyup="check_login_user()">
<b id="login_user_check_res"></b></p>

<p>
<b>密码：</b>
<input type="password" name="password" id="password" onkeyup="check_login_pwd()">
<b id="login_pwd_check_res"></b></p>

<img src="/WebChat/view/checkcode.php" style="cursor:pointer;" title="看不清楚？换一张" onclick="this.src='/WebChat/view/checkcode.php?i='+Math.random()" alt="验证码">

<p>
<input type="text" style="width:200px;" name="captcha" id="captcha" value="请输入图片中的字符组合" onclick="clear_content()" onkeyup="check_login_code()">
<b id="login_code_check_res"></b></p>

<p>
<input type="submit" style="width:200px;cursor:pointer;" value="登录" onclick="is_all_legal()">
<b id="login_check_res"></b></p>

<p>新用户？<a href="/WebChat/view/register.php">快来注册吧！</a></p></form>


<?php
	
	if( !empty( $_GET['error_no'] ) ) {
		$error_no = $_GET['error_no'] ;
		echo $error_no ;
	}

?>

<script src="/WebChat/js/ajax.js"></script>

<script>

// 临时解决方案
setInterval( "login_check()", 1000 ) ;


function check_login_code() {
	var url = "/WebChat/ajax/checkcode_login.ajax.php" ;
	var info = "captcha=" + $( 'captcha' ).value ;
	checkcode_login_ajax_post_html( url, info ) ;
}

function checkcode_login_ajax_post_html( url, data ) {
	xhro = get_xhr_object() ;
	if( xhro ) {
		// 这里的第三个参数默认就是 true，可以不写，但是为了可读性建议写上
		xhro.open( "POST", url, true ) ;
		xhro.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
		xhro.onreadystatechange = checkcode_login_callback_html ;
		// 如果是 GET 方式，则填入 null 即可；如果是 POST 方式，则填入实际的数据
		xhro.send( data ) ;
	} else { alert( "XMLHttpRequest 对象创建失败" ) ; }
}

function checkcode_login_callback_html(){
	if( xhro.readyState === 4 ){
		// 这里返回的是文本格式
		if( xhro.status === 200 ) {
			$( 'login_code_check_res' ).innerHTML =  xhro.responseText ;
		} else {
			alert( '发生错误！状态码：' + xhro.status + '；就绪状态：' + xhro.readyState ) ;
		}
	}
}

// 这里直接到服务器去验证用户名的输入是否合法，采用 PHP 的相关方法通过正则和数据库双重验证
// 优化：先在浏览器本地用 Javascript 方法通过正则表达式进行用户名输入合法性的第一步验证，如果没有通过正则验证那么就不用再向服务器发送请求
function check_login_user() {
	var url = "/WebChat/ajax/user_login.ajax.php" ;
	var info = "username=" + $( 'username' ).value + "&password=" + $( 'password' ).value ;
	user_login_ajax_post_html( url, info ) ;
}

// 密码直接就到服务器去验证用户输入的密码是否合法
function check_login_pwd() {
	var url = "/WebChat/ajax/pwd_login.ajax.php" ;
	var info = "username=" + $( 'username' ).value + "&password=" + $( 'password' ).value ;
	pwd_login_ajax_post_html( url, info ) ;
}

function login_check() {
	var url = "/WebChat/ajax/login.ajax.php" ;
	var info = "username=" + $( 'username' ).value + "&password=" + $( 'password' ).value + "&captcha=" + $( 'captcha' ).value ;
	login_ajax_post_html( url, info ) ;
}

// 如果采用 POST 方式提交请求并且服务器的数据返回格式是 html 就用 user_ajax_post_html()
function user_login_ajax_post_html( url, data ) {
	xhro = get_xhr_object() ;
	if( xhro ) {
		// 这里的第三个参数默认就是 true，可以不写，但是为了可读性建议写上
		xhro.open( "POST", url, true ) ;
		xhro.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
		xhro.onreadystatechange = user_login_callback_html ;
		// 如果是 GET 方式，则填入 null 即可；如果是 POST 方式，则填入实际的数据
		xhro.send( data ) ;
	} else { alert( "XMLHttpRequest 对象创建失败" ) ; }
}

// 如果服务器返回给浏览器的是纯文本/html 格式则调用 user_callback_html()
function user_login_callback_html(){
	if( xhro.readyState === 4 ){
		// 这里返回的是文本格式
		if( xhro.status === 200 ) {
			$( 'login_user_check_res' ).innerHTML =  xhro.responseText ;
		} else {
			alert( '发生错误！状态码：' + xhro.status + '；就绪状态：' + xhro.readyState ) ;
		}
	}
}

function pwd_login_ajax_post_html( url, data ) {
	xhro = get_xhr_object() ;
	if( xhro ) {
		// 这里的第三个参数默认就是 true，可以不写，但是为了可读性建议写上
		xhro.open( "POST", url, true ) ;
		xhro.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
		xhro.onreadystatechange = pwd_login_callback_html ;
		// 如果是 GET 方式，则填入 null 即可；如果是 POST 方式，则填入实际的数据
		xhro.send( data ) ;
	} else { alert( "XMLHttpRequest 对象创建失败！" ) ; }
}

function pwd_login_callback_html(){
	if( xhro.readyState === 4 ){
		// 这里返回的是文本格式
		if( xhro.status === 200 ) {
			$( 'login_pwd_check_res' ).innerHTML =  xhro.responseText ;
		} else {
			alert( '发生错误！状态码：' + xhro.status + '；就绪状态：' + xhro.readyState ) ;
		}
	}
}

function login_ajax_post_html( url, data ) {
	xhro = get_xhr_object() ;
	if( xhro ) {
		// 这里的第三个参数默认就是 true，可以不写，但是为了可读性建议写上
		xhro.open( "POST", url, true ) ;
		xhro.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
		xhro.onreadystatechange = login_callback_html ;
		// 如果是 GET 方式，则填入 null 即可；如果是 POST 方式，则填入实际的数据
		xhro.send( data ) ;
	} else { alert( "XMLHttpRequest 对象创建失败！" ) ; }
}

function login_callback_html(){
	if( xhro.readyState === 4 ){
		// 这里返回的是文本格式
		if( xhro.status === 200 ) {
			$( 'login_check_res' ).innerHTML =  xhro.responseText ;
		} else {
			alert( '发生错误！状态码：' + xhro.status + '；就绪状态：' + xhro.readyState ) ;
		}
	}
}

function clear_content() {
	$( 'captcha' ).value = '' ;
}

function is_all_legal() {
	if( $( 'login_check_res').innerHTML == ''  ) {
		alert( "登录失败！请检查你的登录信息后重新登录。" ) 
	}
}

</script>

</body></html>

{% endhighlight %}

2、 controller.login.php
-

{% highlight php %}
<?php
	
<?php
	
	require_once '../class/sql_helper.class.php' ;

	$username = isset(  $_POST[ 'username' ] ) ?  $_POST[ 'username' ] : null ;
	$password = isset(  $_POST[ 'password' ] ) ?  $_POST[ 'password' ] : null ;
	$input_checkcode = isset(  $_POST[ 'captcha' ] ) ?  $_POST[ 'captcha' ] : null ;

	session_start() ;
	$random_checkcode = $_SESSION['checkcode'] ;

	// $legal_check_sql = "select md5( '$password' ) from user_info where username='$username'" ;
	$legal_check_sql = "select * from userinfo where usr='$username' and pwd=md5( '$password' )" ;

	$sql_helper = new SQLHelper() ;
	$row = $sql_helper->get_dql_rows( $legal_check_sql ) ;
	
	// 其实可以不必判断，因为在查询的过程中其实已经判断了
	// 优化：添加验证码验证


	if( $username != null || $password != null || $input_checkcode != null ) {

		if( codecheck( $input_checkcode, $random_checkcode ) && ($row["usr"] === $username) && ($row["pwd"] === md5( $password )) && ($row["is_online"] == 0) ){

			// 将用户已经上线的状态更新到数据库：is_online = 1
			$online_dml = "update userinfo set is_online=1 where usr='$username'" ;
			// $sql_helper  = new SQLHelper() ;
			$sql_helper->execute_dml( $online_dml ) ;

			// 把用户信息保存到 Session 中，将来会使用到
			session_start() ;
			$_SESSION[ 'username' ] = $username ;
			header( "Location: /WebChat/view/friends_list.php" ) ;
			exit() ;

		} else {
			// 注意：在 header() 之前不能有任何输出
			header( "Location: /WebChat/?error=no_match" ) ;
			exit() ;
		}
	} else {
			// 注意：在 header() 之前不能有任何输出
			header( "Location: /WebChat/?error=empty" ) ;
			exit() ;
	}

	function codecheck( $input_checkcode, $random_checkcode ) {

		$res = false ;

		if( $input_checkcode == $random_checkcode ) {

			$res = true ;
		}

		return $res ;
	}

?>
?>
{% endhighlight %}

3、 sql_helper.class.php
-

{% highlight php %}
<?php

	class SQLHelper {

		private $mysqli ;

		// 以下配置信息最好保存到一个文件
		private static $host = 'localhost:3306' ;
		private static $user = 'root' ;
		private static $pwd = 'enter' ;
		private static $db = 'webchat' ;

		public function __construct(){

			$this->mysqli = new mysqli( self::$host, self::$user, self::$pwd, self::$db ) ;

			if( $this->mysqli->connect_error ) {

				die( 'MySQL 连接失败 !'.$this->mysqli->connect_error ) ;
			}

			// 设置访问数据库的字符集，保证 PHP 是以 UTF-8 来操作数据库
			// 这和 MySQL 数据库内部的字符集编码设置是分开的
			$this->mysqli->query( 'set utf8' ) ;
		}

		// 数据查询操作：select
		public function execute_dql( $dql ) {

			// 为了使浏览器简洁，这里不输出报错，但是调试的时候建议开启
			// $res = $this->mysqli->query( $dql ) or die('dql 执行失败 !'.$this->mysqli->error) ;

			$res = $this->mysqli->query( $dql ) or die() ;

			return $res ;
		}

		// 数据管理操作：alter, drop, delete
		public function execute_dml( $dml ) {
			
			// $res = $this->mysqli->query( $dml ) or die('dml 执行失败!'.$this->mysqli->error) ;

			$res = $this->mysqli->query( $dml ) or die() ;
			
			// 这里返回值的意思是：0 代表 dml 执行失败；1 代表 dml 执行成功；2 代表没有行收到影响
			if( ! $res ){ return 0 ; }

			else {

				if( $this->mysqli->affected_rows > 0 ){ return 1 ; }
				else { return 2 ; }
			}
		}

		// 执行 dql 并返回一个数组
		public function get_dql_array( $dql ) {

			$arr = array() ;

			$res = $this->mysqli->query( $dql ) or die() ;

			while( $row = mysqli_fetch_assoc( $res ) ) {

				$arr[] = $row ;
			}

			// 释放资源/关闭连接；根据手册，需要通过结果集来释放，所以这里给个参数 $res
			// 这里不能写成：$this->mysqli->free_result()；上同 mysqli_fetch_assoc()，因为 $this->mysqli 中没有 free_result() 这个方法

			mysqli_free_result( $res ) ;

			// $res 不是字符串所以不能够被输出到文件！！！
			// file_put_contents( "C:/sql_helper.log", 'done', FILE_APPEND ) ;

			return $arr ;
		}

		// 执行 dql 并返回从结果集中提取出来的关联数组 $rows：将结果集按行组织好返回给调用者
		public function get_dql_rows( $dql ) {

			$res = $this->execute_dql( $dql ) ;
			
			$rows = $res->fetch_assoc() ;

			mysqli_free_result( $res ) ;
			
			return $rows ;
		}
	}


{% endhighlight %}

4、 login.ajax.php
-

{% highlight php %}
<?php

	require_once '../class/sql_helper.class.php' ;

	header("Content-Type:text/plain;charset=utf-8;") ;

	header("Cache-Control: no-cache") ;

	$username = isset(  $_POST[ 'username' ] ) ?  $_POST[ 'username' ] : null ;

	$password = isset(  $_POST[ 'password' ] ) ?  $_POST[ 'password' ] : null ;

	$input_checkcode = isset(  $_POST[ 'captcha' ] ) ?  $_POST[ 'captcha' ] : null ;

	session_start() ;

	$random_checkcode = $_SESSION['checkcode'] ;

	$legal_check_dql = "select * from userinfo where usr='$username' and pwd=md5( '$password' )" ;

	$sql_helper = new SQLHelper() ;

	$row = $sql_helper->get_dql_rows( $legal_check_dql ) ;

	if( $username != null && $password !=null && $input_checkcode != null ) {

		if( ($input_checkcode === $random_checkcode) && ($row["usr"] === $username) && ($row["pwd"] === md5( $password) && ($row["is_online"] == 0) ) ){

			echo '<span style="color:green;font-size:14px;">已确认用户：'.$username.'</span>' ;
		}
	}

?>

{% endhighlight %}

5、 ajax.js
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

6、 webchat.sql
-

{% highlight sql %}
-- 创建数据库

create databases webchat;

-- 使用数据库

use webchat;

-- 创建用户信息表

create table user_info (
	id int unsigned primary key auto_increment,
	username varchar(32) not null,
	pwd varchar(32) not null,
	reg_time date,
	is_online tinyint default 0
) character set utf8 ;

-- 插入数据

insert into userinfo( usr, pwd, regtime ) values( "li", md5("enter"), "2015-10-17 13:23:11" ) ;

insert into userinfo( usr, pwd, regtime ) values( "root", md5("enter"), "2015-10-17 13:23:11" ) ;

-- 用户登录验证的 SQL 语句

select md5( "$password" ) from user_info where username="$username" ;

select * from user_info where username= "$username" and pwd=md5( "$password" ) ;

{% endhighlight %}

总结
-

用户注册的思路和登录大体一致，无非多准备一个正则表达式，多验证几项东西，比如 email, url, phone 等。

### 说明

源码摘自我的小项目 _Web Chat_。最新改动及错误修复见 GitHub：[WebChat](https://github.com/ckwongloy/LBD/tree/master/WebChat)。

### 其他建议


- 手册不离手：<https://secure.php.net/manual/zh/index.php>。

- 想法对不对用代码去验证就知道了。
