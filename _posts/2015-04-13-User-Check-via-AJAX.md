---
layout: post
title: AJAX 入门：用户验证
category: PHP
tags: [PHP, Javascript, AJAX, JSON, Web]
latest: 2015年10月17日 21:01:57
---

一句话总结 Ajax：免页面刷新的与服务器动态交换数据技术。Ajax 被广泛应用，改变了 Web 开发的格局。

Ajax 不是一种编程语言，而是一种无需重新加载整个网页的情况下更新部分网页的技术，比如在注册和登录时候对表单输入信息的验证并给出提示信息，这带来的用户体验还是不错的，毕竟没有人希望在误填一堆表单后提交才发现出错。

使用了 Ajax 技术的网页，通过在后台和服务器进行少量的数据交换就可以实现异步局部刷新，而实现与服务器异步交换数据的幕后核心，即 Ajax 的核心，是 __XMLHttpRequest__ 对象。

Ajax 的使用需要注意的地方：4 条线代表了 Ajax 引擎的运行原理。

细节用一个小案例来说明，代码说明一切，使用 Ajax 的重点在代码中的 4 条线。

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

{% highlight js %}
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

```
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
```

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

#### 总结

小案例中，页面运行的流程是：

1、 HTML+CSS 实现了页面，用于表达信息。

2、 XMLHttpRequest 和 Web 服务器进行了数据的异步交换。

3、 通过 Javascript 操作 DOM，将交换回来的数据呈现在网页上，从而实现了局部刷新的效果。

##### 对 XMLHttpRequest 对象取得响应中涉及到的属性值及函数的解释

- responseText：获得字符串形式的相应数据。

- responseXML；获得 XML 形式的响应数据。

- status 和 statusText：以数字形式和文本形式返回 HTTP 状态码。

- getAllResponseHeader()：获取所有的响应报文。

- getResponseHeader()：查询响应中的某个字段的值。

##### readyState 属性：

- 0： 请求未初始化， open 还没有调用。

- 1：服务器连接已建立，open 已调用。

- 2：请求已接受，即收到了请求头信息。

- 3：请求正在处理中，即收到了响应的主体。

- 4: 请求已经完成，且响应已经就绪，即响应完成。

#### 其他

- 连接字符串：php `.`; js `+`。

- PHP 程序文件首尾以 `<?php?>` 形式和 `<?php` 有什么区别？

大多数情况下，文件首尾是 `<?php?>` 形式时，代表单独的 PHP 程序，即不需要被 include 而多半是需要去 include 其他 PHP 文件；文件首尾是 `<?php` 形式时，多代表会被其他的 PHP 程序 include，多见于提供服务的工具类 PHP 文件。严格条件下，建议使用标准格式 `<?php?>` 。

- 数据提交方式 POST 和 GET 有什么不同？各有什么优缺点？

GET 方式比较快，但不安全，发送的数据量小。POST 方式比较安全，可以发送较大的数据量，适合的应用场景 -- 聊天室。

- 使用 GET 方式发出请求，如果提交的用户名不变化，浏览器将不会真的发送请求，而是从缓存取数据时怎么办？这样好不好？使用 POST 方式提交时会不会这样？

形成原因：浏览器会自动检测用户提交的用户名是否存在缓存中，若有则不再向服务器发送请求，若无才发送。

解决办法：
① 在 url 后带一个总是变化的参数以共同区分用户名,比如当前时间。
关键代码如下：

``` js
var url="/ajax/registerProcess.php?mytime="+new  Date()+"&username="+$("username").value;
```

②在服务器回送结果时，禁用缓存。关键代码如下：

``` html
header("Content-Type: text/xml;charset=utf-8");
header("Cache-Control: no-cache");
```

上面两句话很重要，第 1 句话告诉浏览器返回的数据是 xml 格式，第 2 句话告诉浏览器不要缓存数据。通常放在 PHP 程序文件开头。

这样不好。如果第一次用户实际上已经用一个用户名注册成功并保存在服务器数据库里，在用户第二次用同一个用户名注册时却不会报错，这样明显是不合理的。但在一种情况下也有好处，在用户注册过程，由于某些原因没有注册完，也并没有将注册信息提交到服务器时，用户多次修改自己的用户名时起到的提醒作用是正确的，因为服务器数据库里并没有记录。这种情况会节省带宽，所以可以设置一个检测机制 -- 当浏览器检测到用户并没有成功提交到服务器时就从缓存中取（若有的话），当用户已经提交到服务器并保存到数据库里时就只能从服务器里取，不过这样和带来的好处相比，又比较麻烦了。所以总的来说，弊远大于利，需要避免。

使用 POST 方式提交时会不会出现这种情况待测试。

- 不同的浏览器创建 XMLHttpRequest 对象的方法是有什么差异？如何统一处理？

IE 浏览器使用 ActiveXObject，而其他的浏览器使用名为 XMLHttpRequest 的 JavaScript 内建对象。

可以写一个 if...else 判断是何种浏览器，也可以写一个 try...catch 判断。后者更严谨。
问题：为什么在 IETester 下测试如下代码时候，ie 5.5 和 ie 9 无法打开，ie 7 和 ie 8 无反应，ie 11 显示“Chrome 内核”，只有 ie 6 才显示“IE 内核”？（系统环境：win 8_64）

``` js
if( window.ActiveXObject ){
window.alert( " IE 内核 " ) ;
}else{
window.alert( " Chrome 内核 " ) ;
}
```

- onclick="" 属性响应的函数在冒号中该如何写？需不需要加分号？

onclick="functionName();" 与 onclick="functionName()" 的区别：从效果上来看，有分号和无分号都响应成功。个人认为不用写。因为响应的是一个函数而不是一条语句。

- 为什么在用  $_GET 和 $_POST 方式接收数据的时候总是出现 Undefined 报错？怎么解决？

虽然可以通过设置错误显示方式来隐藏这个提示，但是这样也有隐患，就是在服务器的日志中会记录这些提示，导致日志文件异常庞大。 如果服务器不能改，每个变量使用前应当先定义。网上流行的解决方法有以下几种： 
①服务器配置修改。修改php.ini配置文件，error_reporting = E_ALL & ~E_NOTICE。 
②对变量进行初始化。
③每个文件头部加上：error_reporting(0); 如果不行，只有打开php.ini,找到display_errors，设置为display_errors = Off。以后任何错误都不会提示。 但这个做法并不能解决真正问题。
④做判断：isset($_GET["page"]) if-else判断。或者加上 '@' 表示这行如果有错误或是警告不要输出。如：@$page=$_GET["page"] 
⑤file1.php 文件把 $xx 变量付一个值，用 post 传递给 file2.php，如果 file2.php 没有 $xx 的定义，而直接使用 $yy=$xx; 系统就会报错："undifined variaable $xx", 如果 file2.php 的文件开始用 $xx="";定义，那么 file1.php 的 $xx  值就传不过来了。file2.php 里可以这样：if(!isset($xx)) $xx=""; 
如果你觉得上面的方法不怎么好用，也可以用下面的方法，代码如下:
function _get($str){ 
$val = !empty($_GET['str']) ? $_GET['str'] : null; 
return $val; 
} 
定义这样的一个函数，然后在用的时候，直接用 _get('str') 代替 $_GET['str'] 就行。

自己摸索的方法有：
①`$_GET['username']`这里，引号和引号（可单引可双引）里的 username 不能有空格否则会出现 “Undefined index”报错。但中括号 [] 和引号之间的空格不影响。

- 回调函数 callback() 中的输出为什么是从 2 号状态开始？

- 为什么 Ajax 提示用户名验证信息的方式为弹窗而非代码里规定的页面内的红字？

因为 $(id) 函数引号内参数的写法有空格，正确写法为：$( 'myAjaxResult' ) , 而不能写成 $( ' myAjaxResult ' ) ，括号和引号之间可以有空格，这与$_GET[ '' ] 取得用户输入的数据时报错一个道理。

1- 本案例还可以怎么优化？优化思路有哪些？
①限制用户名长度范围：
②隐藏“验证用户名是否可用”按钮：
将 ：`<input type="button" onclick="checkName();" value="验证用户名是否可用"/>`  中的 button 改为 hidden 即可。
③每输入一个字母检测一次 -- 在需要检测的表单内 添加 onkeyup 属性即可：
用户姓名：`<input type="text" name="user_name"  onkeyup="checkName();"  id="username"/>`
④不要每输入一个字母就检测一次而是用户填完一次自动检测，这样可以节省一点带宽资源。
⑤为用户名不同的状态增加不同颜色的提示信息：


#### 说明

源码摘自我的小项目 _Web Chat_。最新改动及错误修复见 GitHub：[WebChat](https://github.com/lamChuanJiang/LBD/tree/master/web-chat)。
