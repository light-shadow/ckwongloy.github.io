---
layout: post
title: JSON 的学习和简单应用
category: Programming
tags: [JSON, Javascript, AJAX, PHP]
latest: 2015年10月20日 16:02:31
---

类似 XML 一样，JSON 也是一种存储和交换文本信息的语法，但是 JSON 在某些方面比 XML 更适合使用。

什么是 JSON？
-

Javascript Object Notation，顾名思义，JSON 和 Javascript 的关系不一般，确实，JSON 可以直接使用 Javascript 的内建方法直接进行解析，非常方便地转换成 Javascript 对象。

但是，并不是说 JSON 只能被 Javascript 解析，JSON 本质独立于语言，即只要是按照 JSON 规则来的任何编程/脚本语言都可以解析 JSON。

### JSON 的特点？

JSON 采用键值对的方式来组织，易于人们阅读和书写，同时也易于机器的解析和生成。

### JSON 和 XML 的比较

- JSON 的长度比 XML 格式比起来更短小。

- JSON 的读写速度更快。

- JSON 可以用 Javascript 内建方法直接解析为 Javascript 对象，而 XML 暂时办不到。

JSON 的语法细节
-

JSON 数据的基本书写格式是：`"名称":"值"` 对。比如：`"name":"Li"`。

##### **注意**

这里要与 Javascript 中的对象表示法的不同，Javascript 表示对象不需要双引号，而 JSON 必须要有。

JSON 的值可以是：数字 (整数和浮点数)、字符串、逻辑值、数组、对象、null。其中数组需要要放在方括号中，对象需要放在花括号中。举例说明：

```
{
	"Programmer" : [
		{ "name" : "Linus", "gender":"male", "age":40 } ,
		{ "name" : "Gates", "gender":"male", "age":60 } ,
		{ "name" : "Jobs", "gender":"male", "age":"died" }
	]
}
```
JSON 的解析
-

### Javascript 解析 JSON 的两种方式

- eval() 函数

``` javascript
// 定义一个用于转换的 JSON 数组 json_data
// 注意 Javascript 字符串的换行拼接需要使用 \
var json_data = '{ \
	"Programmer" : [ \
		{ "name" : "Linus", "gender":"male", "age":40 } , \
		{ "name" : "Gates", "gender":"male", "age":60 } , \
		{ "name" : "Jobs", "gender":"male", "age":"died" } \
	] \
}'

// 将 json_data 转化为 Javascript 对象 json_obj
var json_obj = eval( '(' + json_data + ')' )

// 输出 json_obj 的某个值
document.writeln( json_obj.Programmer[1].name )
```

- JSON.parse() 函数

``` javascript
// 定义一个用于转换的 JSON 数组 json_data
// 注意 Javascript 字符串的换行拼接需要使用 \
var json_data = '{ \
	"Programmer" : [ \
		{ "name" : "Linus", "gender":"male", "age":40 } , \
		{ "name" : "Gates", "gender":"male", "age":60 } , \
		{ "name" : "Jobs", "gender":"male", "age":"died" } \
	] \
}'

// 将 json_data 转化为 Javascript 对象 json_obj
var json_obj = JSON.parse( json_data )

// 输出 json_obj 的某个值
document.writeln( json_obj.Programmer[2].name )
```

##### **注意**

使用 `eval()` 函数时该函数不会去判断 JSON 字符串中的合法性，只是一味地执行传递给它的代码，就算是 Javascript 代码。

所以除非你能控制传给 `eval()` 函数的参数合法性，否则为了安全，轻易不要使用 `eval()` 函数，特别是执行一些第三方的代码时候，很有可能代码中嵌入了恶意代码 (比如将你的页面跳转到某个恶意地址)。将上面的例子改动一下说明这个问题：

```
var json_data = '{ \
	"Programmer" : [ \
		{ "name" : "Linus", "gender":"male", "age":40 } , \
		{ "name" : "Gates", "gender":"male", "age":alert( "KILL" ) } , \
		{ "name" : "Jobs", "gender":"male", "age":"died" } \
	] \
}'

// var json_obj_0 = eval( '(' + json_data + ')' )
/* var json_obj_1 = JSON.parse( json_data ) */

// document.writeln( json_obj_0.Programmer[1].age )
/* document.writeln( json_obj_1.Programmer[1].age ) */
```

在浏览器测试就会发现，如果执行 `document.writeln( json_obj_0.Programmer[1].age )`，浏览器会弹出 `KILL` 的窗口；而执行 `document.writeln( json_obj_1.Programmer[1].age )`，浏览器控制台会报错 JSON 格式不正确。这就体现了 `eval()` 的不安全性。

在 PHP 实现 Ajax 中使用 JSON
-

前面写过在 PHP 实现 Ajax 中使用 XML 的文章，这里就不解释 Ajax 相关原理了，几乎所有操作都是一样的，只是在以前的基础上，把服务器端返回给浏览器的数据格式从 XML 格式的数据变成 JSON ，同时把浏览器发送给服务器的请求正文也改为 JSON 格式即可。

### 服务器端的改造

先将返回的数据格式进行如下规定，服务端和客户端都比根据这个规定来进行编程：

```
{
	"success" : true,
	"message" : "根据情况自定义"
}
```

#### 1、 设置返回的页面的内容格式为 JSON

```
header( "Content-Type:application/json; charset=utf-8" ) ;
```

这里要注意与 XML 对比记忆：

```
header( "Content-Type:text/xml; charset=utf-8" ) ;
```

小结一下：使用 `applicatoin/` 的有 `json`、`javascript`；使用 `text/` 的有 `plain`、`xml`、`html`。

#### 2、 定义一个多维数组，用于代替数据库，简单响应浏览器的查询请求

```
$staffs  = array (
	array( "name" => "Li", "id" => "0000", "age" => 22, "job" => "CTO" ) ,
	array( "name" => "CJ", "id" => "1111", "age" => 21, "job" => "CEO" ) ,
	array( "name" => "Lam", "id" => "2222", "age" => 20, "job" => "PHP Programmer" )
) ;
```

#### 3、 将返回给浏览器的数据按开始定义好的 JSON 格式进行拼接

即在服务器端组织 JSON 格式的数据，然后 echo 给浏览器：

```
echo '{"success":false, "message":"输入参数有误！"}' ;

$res = '{"success":true, "message":"找到员工！<br><br>编号：'.$value[ 'id' ].'<br>姓名：'.$value[ 'name' ]."<br>年龄：".$value[ 'age' ].'<br>职位：'.$value[ 'job' ].'"}' ;

$res = '{"success":false, "message":"找不到 id 为 '.$staff_id.' 的员工！"}' ;
```

### 客户端的改造

客户端需要改动的地方仅仅只是在回调函数内部执行 JSON.parse() 函数即可。如下：

```
function callback() {
	if(  4 === xhro.readyState ) {
		if( 200 === xhro.status ) {
			var data = JSON.parse( xhro.responseText )
			if( data.success ) {
				$( 'ajax_res' ).innerHTML =  data.message
			} else { $( 'ajax_res' ).innerHTML =  '查询过程出现错误！' + data.message }
		}
	}
}
```

其他
-

- PHP 中超全局变量和全局变量的区别？

如果在函数中使用超全局变量不用 `global` 声明，而在函数中使用全局变量则需要 `global` 声明。

附录：源代码 - JSON 在 AJAX 中的简单使用

_index.php_、_server.php_、_ajax.js_ 三个脚本都位于统一文件夹下。

- index.php

{% highlight php %}
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<title>JSON-Demo</title>
</head>
<body>
	<h1>在 PHP 实现 Ajax 中使用 JSON</h1>
	请输入要查询的员工 ID：<input type="text" name="staff" id="staff">
	<input type="button" value="查询" onclick="query()">

	<h2 style="color:red;" id="ajax_res"></h2>

<script src="./ajax.js"></script>
<script>
	function query() {
		var url = "./server.php?"
		var info = "staff=" + $( 'staff' ).value
		var data = url + info
		send( data )
	}
	function send( url ) {
		xhro = getXHRObject()
		if( xhro ) {
			xhro.open( "GET", url, true )
			xhro.onreadystatechange = callback
			// 如果是 GET 方式，则填入 null 即可；如果是 POST 方式，则填入实际的数据
			xhro.send( null )
		} else { alert( 'xhro 创建失败！' ) }
	}

	// 使用 JSON 时这么处理
	function callback() {
		if(  4 === xhro.readyState ) {
			if( 200 === xhro.status ) {
				var data = JSON.parse( xhro.responseText )
				if( data.success ) {
					$( 'ajax_res' ).innerHTML =  data.message
				} else { $( 'ajax_res' ).innerHTML =  '查询过程出现错误！' + data.message }
			}
		}
	}

	// 没有使用 JSON 时这么处理 
	// function callback() {
	// 	if( 4 === xhro.readyState ) {
	// 		if( 200 === xhro.status ) {
	// 			$( 'ajax_res' ).innerHTML =  xhro.responseText
	// 		} else { alert( '发生错误！状态码：' + xhro.status + '；就绪状态：' + xhro.readyState ) }
	// 	}
	// }
</script>
</body>
</html>
{% endhighlight %}

- server.php

{% highlight html %}
<?php
	
	header( "Content-Type:application/json; charset=utf-8" ) ;
	header( "Cache-Control: no-cache" ) ;

	// 多维数组 staffs 在这里充当了数据库的角色，由于只是简单的例子，就不去数据库取数据了
	$staffs  = array (
		array( "name" => "Li", "id" => "0000", "age" => 22, "job" => "CTO" ) ,
		array( "name" => "CJ", "id" => "1111", "age" => 21, "job" => "CEO" ) ,
		array( "name" => "Lam", "id" => "2222", "age" => 20, "job" => "PHP Programmer" )
	) ;

	if( 'GET' == $_SERVER[ 'REQUEST_METHOD' ] ) {
		search() ;
	} elseif ( 'POST' == $_SERVER[ 'REQUEST_METHOD' ] ) {
		create() ;
	}

	function search() {
		if( !isset( $_GET[ 'staff' ] ) || empty( $_GET[ 'staff' ] ) ) {
			// 没有使用 JSON 时这么处理
			// exit( '输入参数有误！' ) ; 

			// 使用 JSON 时这么处理
			echo '{"success":false, "message":"输入参数有误！"}' ;
			return ; 
		} else { $staff_id = $_GET[ 'staff' ] ; }

		// global 关键字用于访问函数内部的全局变量
		global $staffs ;

		foreach( $staffs as $value ) {
			if( $value[ 'id' ] === $staff_id ) {
				// 没有使用 JSON 时这么处理
				// $res = '找到员工！<br><br>编号：'.$value[ 'id' ].'<br>姓名：'.$value[ 'name' ]."<br>年龄：".$value[ 'age' ].'<br>职位：'.$value[ 'job' ] ;

				// 使用 JSON 时这么处理
				$res = '{"success":true, "message":"找到员工！<br><br>编号：'.$value[ 'id' ].'<br>姓名：'.$value[ 'name' ]."<br>年龄：".$value[ 'age' ].'<br>职位：'.$value[ 'job' ].'"}' ;
				break ;
			} else {
				// 没有使用 JSON 时这么处理
				// $res = '没有找到该员工！' ;

				// 使用 JSON 时这么处理
				$res = '{"success":false, "message":"找不到 id 为 '.$staff_id.' 的员工！"}' ;
			}
		}
		echo $res ;
	}
?>
{% endhighlight %}

- ajax.js

{% highlight javascript %}
function getXHRObject() {
	var xhro ;
	if( window.ActiveXObject ) { xhro = new ActiveXObject("Msxml2.XMLHTTP") }
	else { xhro = new XMLHttpRequest() }
	return xhro
}

function $( id ){
	return document.getElementById( id )
}
{% endhighlight %}

参考
-

- JSON 校验工具：_<http://jsonlint.com/>_

- Web 后台调试助手：_Fiddler_ 。
