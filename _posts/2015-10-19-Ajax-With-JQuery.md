---
layout: post
title: 用 JQuery 实现 Ajax
category: Programming
tags: [AJAX, JQuery]
latest: 2015年11月25日 23:49:58
---

前面讲过的的 Ajax 简单应用在实际开发中可能很少用到，因为原生 Ajax 代码书写量比较大，开发效率可能不如使用第三方 Javascript 库，比如大名鼎鼎的 JQuery，就已经封装了 Ajax 方法，更好的是，JQuery 为我们解决了更多的问题，比如浏览器兼容性问题。

JQuery 如何实现 AJAX？
-

使用 `jQuery.ajax( [ settings ] )` 方法。该方法使用到的参数有：

- type：发送数据的类型，即 GET 或 POST。

- url：发送请求的地址。

- data：是一个 Javascript 对象，连同请求发送到服务器的数据。用于 POST 传输方式。

- dataType：预期服务器返回的数据类型，如果不指定，JQuery 将自动根据 HTTP 包 MIME 信息来智能判断，一般采用的是 JSON 格式，所以可以设置为 `json`。

- success：是一个方法，请求成功后的回调函数，传入返回后的数据，以及包含成功代码的字符串。

- error：是一个方法，请求失败时调用此函数，传入 XMLHttpRequest 对象。

下面在上篇文章中代码的基础上进行改造，只需修改 _index.php_ 中内嵌的和 AJAX 有关的 Javascript 方法即可。如下所示：

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>AJAX-JQuery Demo</title>
</head>
<body>
	<h1>在 PHP 实现 Ajax 中使用 JSON</h1>
	请输入要查询的员工 ID：<input type="text" name="staff" id="staff">
	<input type="button" value="查询" id="query">
	<h2 style="color:red;" id="ajax_res"></h2>

<script src="./ajax.js"></script>
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
	// 初始化 JQuery
	$( document ).ready( function() {
		$( "#query" ).click( function() {
			$.ajax({
				url: './server.php?staff=' + $( "#staff" ).val() ,
				type: 'GET' ,
				dataType: 'json',
				success: function( data ) {
					if( data.success ) {
						$( "#ajax_res" ).html( data.message )
					} else {
						$( "#ajax_res" ).html( "出现错误！" + data.message )
					}
				},
				error: function( jqXHR ) {
					alert( "发生错误！" + jqXHR.status )
				}
			} ) ;
		} ) ;
	} ) ;
</script>
</body>
</html>
{% endhighlight %}

针对在 AJAX 中使用 JQuery 需要留意的地方有：

- 使用 JQuery 不需要为按钮注册事件监听 `onclick="query()"`，只需为需要响应用户事件的按钮设置一个 id，JQuery 就可以直接使用该 id 完成以前需要注册事件才能完成的事情了。上面的例子中 JQuery 监听并响应的就是 id 为 `query` 的按钮。

附录：JQuery 实现 Ajax 中 POST 方法的使用举例

POST 请求通常用于更改服务器上的数据，比如增删改。下面的代码是在上面的例子上增加的，通过 JQuery 来实现异步增加员工信息的简单举例，同 GET 方式，仍然需要对一个按钮事件通过 id 进行监听，假设 "新建" 按钮的 id 设置为 `create`，具体代码如下：

{% highlight html %}
<label>姓名</label> <input type="text" id="name">
<label>id</label> <input type="text" id="id">
<label>年龄</label> <input type="text" id="age">
<label>职位</label> <input type="text" id="job">
<input type="button" value="新建" id="create">
<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
	// 初始化 JQuery
	$( document ).ready( function() {
		$( "#create" ).click( function() {
			$.ajax({
				url: './server.php'
				type: 'POST' ,
				dataType: 'json',
				data: {
					name: $( "#name" ).val() ,
					id: $( "#id" ).val() ,
					age: $( "#age" ).val() ,
					job: $( "#job" ).val() ,
				} ,
				success: function( data ) {
					if( data.success ) {
						$( "#ajax_res" ).html( data.message )
					} else {
						$( "#ajax_res" ).html( "出现错误！" + data.message )
					}
				},
				error: function( jqXHR ) {
					alert( "发生错误！" + jqXHR.status )
				}
			} ) ;
		} ) ;
	} ) ;
</script>
{% endhighlight %}

当然，对于这段代码，在 _server.php_ 中要对通过 POST 传来的数据进行相应的处理才行，不过原理同 GET，这里就省略了。

此外，GET 和 POST 对两个事件的响应可以写在同一个函数中，即 `$( document ).ready( function() {}`，它们两者之间只需用逗号 `,` 隔开就行了。

参考
-

- [JSON 的学习和简单应用](http://lamchuanjiang.github.io/programming/json-notes.html)
