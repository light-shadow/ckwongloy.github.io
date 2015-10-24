---
layout: post
title: AJAX 学习笔记
category: PHP
tags: [PHP, Javascript, AJAX, JSON, Web]
latest: 2015年10月17日 21:01:57
---

一句话总结 Ajax：免页面刷新的与服务器动态交换数据技术。Ajax 被广泛应用，改变了 Web 开发的格局。

Ajax 不是一种编程语言，而是一种无需重新加载整个网页的情况下更新部分网页的技术，比如在注册和登录时候对表单输入信息的验证并给出提示信息，者带来的用户体验还是不错的，毕竟没有人希望在误填一堆表单后提交才发现出错。

使用了 Ajax 技术的网页，通过在后台和服务器进行少量的数据交换就可以实现异步局部刷新，而实现与服务器异步交换数据的幕后核心，即 Ajax 的核心，是 __XMLHttpRequest__ 对象。

Ajax 的使用需要注意的地方：4 条线代表了 Ajax 引擎的运行原理。

细节用几个小案例来说明，代码说明一切，使用 Ajax 的重点在代码中的 4 条线。

无刷新验证用户名合法性 ( 用户注册 )
-

- register.php

{% highlight html %}
<!DOCTYPE html>
<html lang="zh">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>用户注册</title></head>

<body>
<!-- 这里不需要填入 action 的响应文件，因为已经交给 Ajax 引擎去完成 -->
<form method="post">
<!-- onkeyup 的作用是检测用户输入的每一个字母并作出相应回应 -->
姓名：<input type="text" name="username"  onkeyup="checkName();"  id="username">
<!-- 1. 手动检测按钮，只有点击该按钮， Ajax 引擎才会工作并将处理结果返回给用户 -->
<!-- <input type="button" onclick="checkName();" value="验证用户名是否可用"> -->
<!-- 2. 隐藏提示框，只将 Ajax 引擎的处理结果返回给用户 -->
<input type="hidden" onclick="checkName();" value="验证用户名是否可用">
邮件：<input type="text" name="email" id="email"><br>
密码：<input type="password" name="pass_word" id="password"><br>
<input type="submit" value="注册"></form>
<p style="color:red" type="text" id="myAjaxResult"></p>
<script src="./js/ajax.js"></script></body></html>
{% endhighlight %}

- ajax.js

{% highlight javascript %}

// 获得 XMLHttpRequest 对象
function getXmlHttpObject() {
	var xmlHttpRequest ;
	/////////////////////////////// 第 1 条线 —— 浏览器创建 Ajax 引擎：XMLHttpRequest 对象
	// 不同浏览器创建 XMLHttpRequest 对象方法不一致
	// 这里用 if...else 简单判断两种情况，即 IE 内核和非 IE 内核
	if( window.ActiveXObject ){
		// IE5/IE6 
		xmlHttpRequest = new ActiveXObject( "Microsoft.XMLHTTP" ) ;
	}else{
		// IE7+,FF/Opera/Chrome/Safari
		xmlHttpRequest = new XMLHttpRequest() ;
	}
	return xmlHttpRequest ;
}
// 定义一个全局变量
var myXmlHttpRequest = "" ;

// 验证用户是否合法用户
function check_is_legal() {
	myXmlHttpRequest = getXmlHttpObject() ;
	if( myXmlHttpRequest ){
		// 通过 myXmlHttpRequest 对象发送请求到服务器的某个页面
		// 第一个参数表示请求的方式, "get"  / "post"
		// 第二个参数指定 url,对哪个页面发出 ajax 请求(本质仍然是 http 请求,http 请求本质是 TCP/IP 请求)
		// 第三个参数表示 true 表示使用异步机制,如果 false 表示不使用异步
		// 这里路径的写法必须要包含处理注册请求的 PHP 文件所在的上级文件夹名字，以与 Apache 服务器的 htdocs 目录形成完整的路径：htdocs/ajax/registerProcess.php。
		var url = "/ajax/registerProcess.php?time="+new Date()+"&username="+$("username") .value ;
		// 注意 username 加 & 表示区分属性对象
		//new Data() 的加入是为了解决 get 发送方式下浏览器自动从缓存中取数据的问题
		// 打开一个请求，但未真的发送请求
		myXmlHttpRequest.open( "get", url, true) ;		
		// 指定回调函数，callback 代表一个函数名
		// 回调函数名带括号和不带括号的区别：
		//callback 代表赋于函数引用的地址值；而 callback() 代表调用一个函数
		myXmlHttpRequest.onreadystatechange = callback ;
		
		/////////////////////////////////////// 第 2 号线 —— 开始发送请求

		// 如果是 get 方式，则填入 null 即可；如果是 post 方式，则填入实际的数据
		myXmlHttpRequest.send( null ) ;
	}else{
		window.alert( "Ajax 引擎创建失败！" ) ;
	}
}


///////////////////////////////////////////////// 第 4 号线 —— 回调函数

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


- register_process.php

{% highlight php %}
<?php

	// 告诉浏览器返回的数据格式
	header("Content-Type: text/plain;charset=utf-8");

	// 告诉浏览器不要缓存数据
	header("Cache-Control: no-cache") ;

	// 接受数据 ( 以 url 参数为准 )
	$username = $_GET[ 'username' ] ;

	////////////////////////////// 第 3 号线 —— 送回处理结果 ( 可用三种格式文件作为载体 )

	// 这里的显示数据将返回给请求的页面，即在浏览器上被用户看见

	// 简单检测某个用户名是否存在
	// 实际应用中，基本上都会与数据库相连，以达到真正的从数据库中检验用户名是否存在的目的

	if( $username === null ){
		echo "用户名不能为空/空格!" ;
	}elseif( $username === "lcj" ){
		echo "用户名 $username 已经被注册!" ;		
	}else{
		echo "用户名 $username 可以使用!" ;
	}

?>
{% endhighlight %}

### 如果是 POST 方式提交请求

1、 修改 _register.php_ 中验证用户名是否存在 ( `if( myXmlHttpRequest ){ ... }` )那部分代码如下：

{% highlight javascript %}
var url="./register_process.php" ;
// 这个是要发送的数据
var data="username="+$('username').value ;
// 打开请求.
myXmlHttpRequest.open("post",url,true) ;
// 下面这句话必须要有
myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
// 指定回调函数.callback是函数名
myXmlHttpRequest.onreadystatechange=callback ;
// 开始发送请求
// 如果是 post 请求，则填入实际的数据;如果是 get 请求则填入 null 即可
myXmlHttpRequest.send( data ) ;
{% endhighlight %}

2、 然后修改 _register_process.php_ 中的请求方式为 post：

{% highlight php %}
$username=$_POST['username'] ;
{% endhighlight %}

总结
-

小案例中，页面运行的流程是：

1、 HTML+CSS 实现了页面，用于表达信息。

2、 XMLHttpRequest 和 Web 服务器进行了数据的异步交换。

3、 通过 Javascript 操作 DOM，将交换回来的数据呈现在网页上，从而实现了局部刷新的效果。

#### 说明

源码摘自我的小项目 _Web Chat_。最新改动及错误修复见 GitHub：[WebChat](https://github.com/lamChuanJiang/LBD/tree/master/WebChat)。
