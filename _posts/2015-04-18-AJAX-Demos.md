---
layout: post
title: AJAX 小案例
category: Javascript
tags: [AJAX, Javascript]
latest: 2015-04-28 20:21:02
---

#### 省市联动

- 为什么要使用 Ajax 来实现“省市联动菜单”？

在传统的 B/S 模式中，显示省市联动菜单是一次性将数据全部提取并显示在客户端，这样传输量不仅大而且不灵活，特别是在数据量比较大的应用场景时显得特别不方便。Ajax 一个重要的用途就是动态地从服务器取需要的数据，并在页面无刷新显示，使用 Ajax 技术，可以根据用户需求从服务器取数据并当用户确然地点击按钮时才将数据显示出来，数据量小速度快。

- 如何为“省市联动菜单”设计数据库？有几种思路？哪种比较好?

①3 张表情况：省表，市表，县表，通过外键关联：

```
provinces : 
id	name	
1	Zhejiang	
2	Jiangsu	
...	...	
cities :
id	name	foreign key 
1	Hangzhou	1
2	Nanjing	2
3	Suzhou	2
...	...	...
countries :
id	name	foreign key
1	c1	2
2	c2	2
...	...	...
```

②1 张表情况：一张表包括了所有省市县，也通过外键关联（MySQL 里外键不仅可以指向两张不同表，也可以指向同一张表内的主键）：

```
cities :
id	name	parentId
1	北京	 null
2	上海	null
3	四川	null
4	绵阳	3
5	汶川	4
```

自连接：`select * from cities where parentId=(select id from cities where name="四川")`

- 省市联动菜单是如何设计的？核心思想是什么？

核心思想：

- showCities.php：

``` html
<html>
	<head>
		<title>省市联动菜单</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<script src="ajax.js" type="text/javascript"></script>
		<script type="text/javascript">
			var myXMLHttpRequest ;
			function getCities(){
				//window.alert( " 已进入 getCities() 函数 ! " ) ;
				myXMLHttpRequest = getXMLHttpObject() ;
				//window.alert( " 已得到 XMLHttpObject 对象 ! ( " + myXMLHttpRequest + " ) ") ;
				if ( myXMLHttpRequest ){
					var url = "/ajax/showCitiesProcess.php" ;
					var data = "province=" + $( 'province' ).value ;
					//window.alert( data +  ". ( 若有空格则服务器会接收失败. )" );
					myXMLHttpRequest.open( "post", url, true ) ;
					myXMLHttpRequest.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" ) ;// 有这句话才能支持 POST 请求
					myXMLHttpRequest.onreadystatechange = callback ;
					myXMLHttpRequest.send( data );
					//window.alert( " 已尝试向服务器传送用户数据, 等待服务器返回中 ...  " ) ;
				}
			}
		function callback(){
			//window.alert( " 已进入回调函数!  (  callback()  )") ;
				if( myXMLHttpRequest.readyState == 4 ){
					//window.alert( " 服务器接受用户数据结束, 客户端可以准备进行下一步操作 ( 接收服务器处理过的回送数据 ) " ) ;
					if( myXMLHttpRequest.status == 200 ){		
						//window.alert( " 服务器返回数据成功, 客户端可以准备进行下一步操作 ( 对服务器的回送数据进行 DOM 编程 ) " ) ;
						if( myXMLHttpRequest.responseXML ){
							//window.alert( " 检测成功 ! 服务器回送数据非空 ! XML DOM 编程可以正常进行 ! ( " + myXMLHttpRequest.responseXML + " ) " ) ;
							var cities = myXMLHttpRequest.responseXML.getElementsByTagName( "city" ) ;
							//window.alert( " 已取出并将服务器回送的数据保存到数组 ! ( " + cities + " ) " ) ;
							$( 'city' ).length = 0 ;
							//window.alert( $('city') + " 已置零 ! ( 输出初始化 NO.1 ) " ) ; 
							var myOption = document.createElement( "option" ) ;
							//window.alert( " 已创建新的 HTML 元素 : " + myOption + " ! ( 输出初始化 NO.2 ) " ) ; 
							myOption.innerText = "-- 请选择市 --" ;
							$( 'city' ).appendChild( myOption ) ;
							//window.alert( " 已将从服务器收到的城市以追加的方式全部添加到新创建的元素 " + myOption + " ! " ) ;
							for( var i = 1; i <= cities.length; i++ ){
								//window.alert( " 开始从服务器回送的数据中取出所选省管辖的所有城市 ! " ) ; 
								var city_name = cities[ i ].childNodes[ 0 ].nodeValue ; 
								//window.alert( " 已取出该省的第 " + i + " 个城市 ! " ) ;
								var myOption = document.createElement( "option" ) ;
								//window.alert( " 已为该省的第 " + i + " 个城市创建元素 " + myOption + " ! " ) ;
								myOption.value = city_name ;
								//window.alert( " 已将该省的第 " + i + " 个城市名保存到刚刚创建的元素 " + myOption + " ! " ) ;
								myOption.innerText = city_name ;
								$('city').appendChild( myOption ) ;
								window.alert( " 已成功从服务器取出该省管辖的第" + i + "个城市并添加到该省标签之后 ! " ) ;
							} 
							window.alert( " 结束 ! 已成功从服务器取出该省管辖所有 ( 共 "+ cities.length +" 个 ) 城市并添加到该省标签之后 ! " ) ;
						}else{
							window.alert( " 检测失败 ! 服务器获取用户数据异常或服务器返回数据异常 ! ( " + myXMLHttpRequest.responseXML + ")"  ) ;
						 }
					}
				}
		}
		</script>
	</head>
	<body>
		<select id="province" onchange="getCities();" >
			<option value="first">-- 请选择省或直辖市 --</option>
			<option value="jiangsu"> 江苏 </option>
			<option value="zhejiang"> 浙江 </option>
		</select>
		<select id="city">
			<option value="second">-- 请选择市 --</option>
		</select>
		<select id="country" value="">
			<option value="third">-- 请选择县或乡镇 --</option>
		</select>
	</body>
</html>
```

- showCitiesProcess.php：

``` php
<?php
	header("Content-Type: text/xml; charset=utf-8") ;
	header("Cache-Control: no-cache") ;
	$province = isset($_POST[ 'province' ]) ? $_POST[ 'province' ] : '' ;
	$cities = "" ;
	if( $province =="first" ){
		$cities = "<cities><city></city></cities>" ;
	}elseif( $province == "zhejiang" ){
		$cities = "<cities><city>杭州</city><city>绍兴</city><city>温州</city><city>义乌</city></cities>" ;
	}elseif( $province == "jiangsu" ){
		$cities = "<cities><city>南京</city><city>苏州</city><city>无锡</city><city>扬州</city></cities>" ;
	}else{
		$cities = " Fail. " ;
	}
	echo $cities ;
	file_put_contents( "c:/mylog.log", $province."\r\n",  FILE_APPEND ) ;
?>
ajax.js ：
// 线路 1 : 创建 Ajax 引擎 
即 XMLHttpRequest 对象
function getXMLHttpObject(){
		var xmlHttpRequest ;
// 不同浏览器创建 XMLHttpRequest 对象方法不一致, 这里用 if...else... 简单判断
		if( window.ActiveXObject ){
			xmlHttpRequest = new ActiveXObject( " Microsoft.XMLHTTP " ) ;		// IE 内核
		}else{
			xmlHttpRequest = new XMLHttpRequest() ;		//  非 IE 内核
		 }
	//window.alert( "Ajax引擎" + xmlHttpRequest + "创建成功!" );
	return xmlHttpRequest ;
	}
// 线路 2 : 发送 HTTP 请求
// 线路 3 : 服务器处理结束并回送数据
// 线路 4 : 回调函数

// 此函数用于根据 id 号取得 <body></body> 内的元素
function $( id ){
	//window.alert( " 已进入 $() 函数！ " ) ;
	return document.getElementById( id ) ;
}
```

- 什么是漫游？为什么会有手机漫游？

数据在不同地区服务器的转发。

服务器之间层级关系导致，同一网络不同地区所有服务器协调工作导致。

- 当代码比较复杂的时候，如何写入日志文件以供查看?

使用 file_put_contents( "path", 要写入的东西, 写入方式 ); 函数进行文件编程即可。

- 当表规模很大的时候，会出现什么情况？此时该怎么办？

查询速度将会变慢。表容量会达到系统上限。

合理分类，分而治之。

- QQ 是如何查询好友信息的？同一地区和不同地区的好友有什么区别？

根节点是中央服务器，拓扑结构是树形，各个地区的服务器构成树形节点，某地区的用户想要查询另一地区的好友信息都是依次向上级服务器查询，如果上级服务器有此好友信息则会送给用户，若没有则继续向上查询直至中央服务器。中央服务器也定时向下级服务器更新用户信息。不同地区的好友发送消息会有一定的延迟，且位置差距越远延迟越大。
示意图：

- `.=`  和 `=` 有什么区别？

.= 是追加赋值，而 = 是覆盖赋值。

- 返回状态 4 （完成）一定表示成功吗？如何确保真的完成任务?

不是，完成只是指那几个步骤全部结束，而成功则是真正意义上做了所希望完成的任务。关键代码为：

``` js
if( myXmlHttpRequest.readyState == 4 ){
	if( myXmlHttpRequest.status == 200 ){
	...
	}
}
```

- 路径的写法 `\\` 和 `/` 有什么联系和区别？

对 windows 而言 一样。

- 为什么不用 `<br/>` 代替 `\r\n`?

`<br/>` 是浏览器能识别的，而 `\r\n` 是 Windows 能识别的，`\r` 是 Mac OS X 能识别的，`\n` 是类 UNIX 能识别的。

- 为什么开始代码在浏览器执行时一点反应没有？代码不能用时如何 DEBUG？

代码缺少一个花括号，文件名单词拼写出错。可以在怀疑的位置插入不同的提示信息，如 依次输出 test 1, test 2, ... ,以做标记，分析代码走到哪里了，有没有走通。如：window.alert( "test" );

查看服务器端返回值：

``` php
var_dump( file_get_contents( 'php://input' ) );
return;
```

- 为什么服务器总是无法获取用户提交的数据？为什么服务器返回的 xmlHttpRequest.responseXML 为 null ?

firefox 不直接支持 responseXML,需要将 responseText 转换成XML对象,才能用XMLDOM处理：

``` js
if(domobj==null){
var parser=new DOMParser();
domobj=parser.parseFromString(xmlHttp.responseText,"text/xml");
}
```

- showCitiesProcess.php 为什么会报以下错误？


This page contains the following errors:
error on line 2 at column 1: Extra content at the end of the document
Below is a rendering of the page up to the first error.

直接访问导致。直接访问时因为 header() 内是 XML 格式而没有请求 XML 数据，所以会报错，可以注销 第一句 header()。

- 为什么 POST 或 GET 方式提交用户输入/选择的数据时总是报错 "undefined index"? 

`$province = isset($_POST['province']) ? $_POST['province'] : '' ;`

检查输入的格式与 name 要求的有什么差别，一定要严格相同否则会接受为空而报错。

- 为什么 POST 或 GET 方式有时候可以接受有时候却不能接受客户端数据？该怎么办？

除了服务器端的代码有问题的可能外，客户端代码出现细节上的失误也将导致服务器与客户端交互出现问题，从而造成服务器端接收数据失败的假象。比如数组取值的方式要带下标而不能直接用数组名取。

当用表单提交请求时，服务器接受的是 name="" 中冒号中的属性值而不是 id="" 中的属性值，同时，表单要有个提交 submit 而非 写个按钮 button 。接受 id 的有 `<td>`,`<table>`,`<textarea>`标签等。

当无法找到原因时去 W3CSchool 测试例子。

- 再次选择省级选择提示框 " -- 请选择省 -- " 时为什么会返回 null ?如何解决提示框对应关系？

一开始没有为选择提示框设置 id 号，而用户多次点击选择框确实客观存在的，所以当用户点击选择框时由于服务器端没有做相应的处理所以会返回空。可以为选择框设置 id 号然后在服务端做针对性处理即可。

-  为什么服务器接收数据后在 ie 6 下返回非空，在 chrome, IE 11 下返回为空？ 

再次注意空格问题：

``` js
var data = "province=" + $( 'province' ).value ;
```

这里，不能写成：

```js
var data = " province = " + $( 'province' ).value ;```
```

即 province 和 "" 之间不能有空格，原因是 data 作为将被服务器接收的字符串，空格会影响服务器的接受。除非服务器也作调整。除了输出的冒号内容与冒号可以有空格外其他都不要有空格。特别是会被传送的数据，一改有可能全乱了。

- 为什么第 4 个城市添加之后第 1 个城市消失？

- 如何将省市联动和数据库相关联？

#### 黄金价格实时图

- 如何使用 Ajax 技术实现黄金价格趋势实时图？核心思路是什么？关键是哪些？

核心思路依然是 4 条线。关键有：
①借用 checkbox 数据的提交方式将 city 的数据提交至服务器；
②每隔 5 秒刷新数据；
③JSON 数据格式以 PHP 方式的拼接
代码如下：

- goldPrice.php :

``` html
<html>
<title>黄金价格走势</title>
<head>
<script src="ajax.js" type="text/javascript"></script>
<script type="text/javascript">
	var myXMLHttpRequest ;
	function updateGoldPrice(){
		//window.alert( "updateGoldPrice() 函数有用" ) ;
		myXMLHttpRequest = getXmlHttpObject() ;
		//window.alert( myXMLHttpRequest ) ;
		if( myXMLHttpRequest ){
			var url = "goldPriceProcess.php" ;
			var data = "city[]=london&city[]=tokyo&city[]=shanghai" ;	//回忆 checkbox 数据的提交方式
			myXMLHttpRequest.open( "post", url, true ) ;
			myXMLHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
			myXMLHttpRequest.onreadystatechange = function callback(){
				//window.alert( "callback()函数有用" ) ;
				if( myXMLHttpRequest.readyState == 4 ){
					if( myXMLHttpRequest.status ==200 ){
						var res_objs = eval( "(" + myXMLHttpRequest.responseText + ")" ) ;
						$( 'london' ).innerText = res_objs[ 0 ].price ;
						$( 'tokyo' ).innerText = res_objs[ 1 ].price ;
						$( 'shanghai' ).innerText = res_objs[ 2 ].price ;
					}
				}
			}
			myXMLHttpRequest.send( data ) ;
		}
	}
	// 使用定时器每隔 5 秒刷新黄金价格
	window.setInterval( "updateGoldPrice()", 5000 ) ;
</script>
</head>
<body>
<center>
	<table border=1 class="gold">
		<tr><td colspan="3"><center><font color="gold" size="4px"><b>丨黄金价格走势丨</b></font><i><b>（每 5 秒刷新一次, 基数为 1000）</b></i></center></td></tr>
		<tr><td colspan="3"><center><img src="gold.jpg" height="60px" width="440px"></center></td</tr>
		<tr align="center"><td>市场</td><td>最新价格</td><td>涨跌</td></tr>
		<tr align="center"><td>伦敦</td><td id="london">853.55</td><td><img src="down.jpg" height="10px" width="10px">&nbsp;465.8</td></tr>
		<tr align="center"><td>东京</td><td id="tokyo">229.7</td><td><img src="down.jpg" height="10px" width="10px">&nbsp;59.6</td></tr>
		<tr align="center"><td>上海</td><td id="shanghai">983.5</td><td><img src="up.jpg" height="12px" width="12px">&nbsp;1023.5</td></tr>
	</table>
</center>
</body>
</html>
```


- goldPriceProcess.php :

``` php
<?php
	header("Content-Type: text/html;charset=utf-8") ;
	header("Cache-Control: no-cache") ;
	$cities = $_POST[ 'city' ] ;
	// 随机生成 200 - 3000 的随机数
	$res = '[' ;
	for($i = 0; $i<count( $cities ); $i++){
		if( $i == count( $cities ) - 1 ){
			$res .= '{"cityname":"'.$cities[$i].'","price":"'.rand(200,3000).'"}]' ;
		}else{	
			$res .= '{"cityname":"'.$cities[$i].'" ,"price":"'.rand(200,3000).'"},' ;
		}
	}
	file_put_contents("c:/mylog.log", $res."\r\n", FILE_APPEND);
	echo $res;
	//echo 'ok.' ;
?>
ajax.js :
// 线路 1 : 创建 Ajax 引擎
function getXmlHttpObject() {
		var xmlHttpRequest ;
		// 不同浏览器创建 XMLHttpRequest 对象方法不一致, 这里用 if...else 简单判断
		if( window.ActiveXObject ){
			xmlHttpRequest = new ActiveXObject( " Microsoft.XMLHTTP " ) ;
			//window.alert( " 在 IE 内核下 " ) ;
		}else{
			xmlHttpRequest = new XMLHttpRequest() ;
			//window.alert( " 在非 IE 内核下 " ) ;
		}
		return xmlHttpRequest ;
	}
// 线路 2 : 发送 HTTP 请求
// 线路 3 : 服务器处理结束并回送数据
// 线路 4 : 回调函数
function $(id){
		return document.getElementById( id ) ;
	}
```

- 如何在 Javascript 代码中引入 Javascript 函数库？

将 "ajax.js" 添加到后续 Javascript 代码中示例：

```
<script src="ajax.js" type="text/javascript"></script>
```

下面可以继续写 `<script></script>` 代码。

- 如何把黄金价格波动的上下箭头随增长对应地动态显示出来？

以 1000 为基数，大于 1000 红色箭头；小于 1000 绿色箭头。

- Javascript 和 PHP 获取数组长度的方法各是什么？

Javascript : array.length ; PHP : count( array );

#### Web聊天室

- WEB 版聊天室的需求具体有哪些的？要实现那些必要的功能？涉及的技术各有什么作用？

登陆界面，用户列表，聊天界面，用户不在线时的离线留言，每隔 5 秒到服务器获取消息。涉及的技术有：Ajax, session, 数据库 -- 用于保存用户离线留言记录 。

- WEB 版聊天室的原理是什么？整个聊天流程是怎样的？

- WEB 版聊天室的设计思路是怎样的？设计步骤有哪些？

数据库的设计

①为聊天室创建数据库 : `create database webchat;`
②为数据库设置编码 : `set names gbk;`
③创建符合需求的消息表 : `use webchar;`

``` mysql
create table messages(
id int unsigned primary key auto_increment,
sender varchar(64) not null,
receiver varchar(64) not null,  
content varchar(3600) not null,
sendtime datetime not null,
isget tinyint default 0 );
```

④查看刚刚创建的表信息 :  `desc messages;`

##### 界面的设计

①login.php：

``` html
<html>
<head>
<title>WEB 聊天室</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<script src="/ajax/ajax.js" type="text/javascript"></script>
</head>
<body>
<center>
<h1>请登录</h1>
<form action="loginController.php" method="post">
用户名 : <input type="text" id="username"/><br/>
密&nbsp;码 : <input type="password" id="password"/><br/><br/>
&nbsp;&nbsp;<input type="submit" value="登陆 Web 聊天室"/>
</form>
</center>
</body>
</html>
②friend_list.php：
<html>
<title>好友列表</title>
<head>
<script type="text/javascript">
function colorChange( cursorStatus, friend ){
	if( cursorStatus == "out" ){
		friend.style.color = "black" ;
	}else if( cursorStatus =="over" ){
		friend.style.color = "green" ;
		friend.style.cursor = "hand" ;
	 }
}
function startChat( friend ){
	// 通过 open() 方式打开新窗口时，子窗口和父窗口将会一样大，用 resizeTo() 函数重新定义子窗口的大小; 此外，get 方式提交到服务器可能出现乱码，因此需要编码
	window.open( "chatPage.php?friendName=" +encodeURI( friend.innerText ) , "_blank" ) ;	
}
</script>
</head>
<body>
<h1>我的好友</h1>
<div> 
	<ul>
	<li onmouseover="colorChange( 'over', this )" onmouseout="colorChange( 'out', this )" onclick="startChat(this)"><b>Michael</b></li>
	<li onmouseover="colorChange( 'over', this )" onmouseout="colorChange( 'out', this )" onclick="startChat(this)"><b>Linus</b></li>
	<li onmouseover="colorChange( 'over', this )" onmouseout="colorChange( 'out', this )" onclick="startChat(this)"><b>Livid</b></li>
	</ul>
</div>
</body>
</html>
```

③chat_page.php：

``` html
<html>
<head>
<title>正在与好友聊天</title>
<?php
// 接受 window.open()  传递的用户名 
open()打开页面并传递的参数一定要用 GET 接受而不是 POST
$friendName = $_GET[ 'friendName' ] ;	
$friendName = trim( $friendName ) ;	//去掉 $_friendName 的空格，属于 PHP 方法
// 取出 Session 中保存的数据
session_start() ;
$username = $_SESSION[ 'username' ] ;	
$username = "cj.li" ;
?>
<script src="/ajax/ajax.js" type="text/javascript"></script>
<script type="text/javascript">
//function resizeWindow(){
	window.resizeTo(400,300) ;
//}
window.setInterval( "getMessage()", 5000 ) ;
function getMessage(){
	//window.alert( " 已进入 sendMessage() 函数 ! " ) ;
	var myXMLHttpRequest = getXMLHttpObject() ;
	if( myXMLHttpRequest ){
		//window.alert( "获取 XMLHttpRequest 对象成功 ! " ) ;
		var url = "getMessageController.php" ;
		var data = "receiver=<?php echo $username ; ?>&sender=<?php echo $friendName ; ?>" ;
		myXMLHttpRequest.open( "post", url, true ) ;
		myXMLHttpRequest.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" ) ;
		//指定处理结果的函数 callback()
		myXMLHttpRequest.onreadystatechange = function callback(){
			if( myXMLHttpRequest.readyState == 4 ){
				if( myXMLHttpRequest.status == 200 ){
					//window.alert( " 服务器已返回数据，但内容未检测 ! " ) ;
					var msgRes = myXMLHttpRequest.responseXML ;
					window.alert( msgRes ) ;
					// 第一步取出 content 和 sendtime
					var contents = msgRes.getElementsByTagName( "content" ) ;
					var sendtime = msgRes.getElementsByTagName( "sendtime" ) ;
					//window.alert( content.length + " -- " + sendtime ) ;
					if( contents.length != 0 ){
						window.alert( " 开始处理数据 !  -- xx 对 xx 说 : xxx" ) ;
						for( var i = 0 ; i < contents.length ; i++ ){
							$( 'chatarea' ).value += "<?php echo $username ; ?>对" + "<?php echo $friendName ; ?>说:" + contents[ i ].childNodes[ 0 ].nodeValue + "" + sendtime[ i ].childNodes[ 0 ].nodeValue + "\r\n" ;
						}
					}
				}
			}
		}
		myXMLHttpRequest.send( data ) ;
}
function sendMessage(){
	//window.alert( " 已进入 sendMessage() 函数 ! " ) ;
	var myXMLHttpRequest = getXMLHttpObject() ;
	if( myXMLHttpRequest ){
		//window.alert( "获取 XMLHttpRequest 对象成功 ! " ) ;
		var url = "sendMessageController.php" ;
		var data = "chatContent=" + $( 'chatContent' ).value + "&$receiver=<?php echo $friendName; ?>&$sender=<?php echo $username; ?>" ;	// 在 Javascript 代码中嵌入了 PHP 脚本
		window.alert( data + " -> " + url ) ;
		myXMLHttpRequest.open( "post", url, true ) ;
		myXMLHttpRequest.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" ) ;
		myXMLHttpRequest.onreadystatechange = function callback(){
			if( myXMLHttpRequest.readyState == 4 ){
				if( myXMLHttpRequest.status == 200 ){
					//window.alert( " 服务器已返回数据，但内容未检测 ! " ) ;
					// 这里不需要处理
				}
			}
		}
		myXMLHttpRequest.send( data ) ;
		// 将聊天内容你显示到聊天框
		$( 'chatContent' ).value += " 你对 <?php echo $username ; ?> 说 : " + $( 'content' ).value + " [ " + new Date().toLocaleString() + " ] \r\n " ;
	}
}
</script>
</head>
<body>
<center>
<h1><i><font color="green"><?php echo $username ; ?></font>与<font color="red"><?php echo $friendName ; ?></font>聊天中</i></h1>
<!-- 聊天记录展示区（不要刷新） -->
<textarea cols="80px" rows="15" id="chararea"></textarea><br/>
<!-- 将要发送的信息 -->
<input type="text" style="width:500px"  id="chatContent"/>
<!-- Ajax 触发按钮 -->
<input type="button" value="发送信息" onclick="sendMessage()"/>
</center>
</body>
</html>
```

控制器的设计

①controller.get_message.php：

``` php
<?php
// 此控制器专门用于响应用户取数据的请求
require_once 'MessageService.class.php' ;
header( "content-type: text/xml; charset=utf-8" ) ;
header( "cache-controll: no-chache" ) ;
$receiver = $_POST[ 'receiver' ] ;
$sender = $_POST[ 'sender' ] ;
file_put_contents( "c:/mylog.log", $receiver." -- ".$sender."\r\n", FILE_APPEND ) ;
// 调用 MessageService 来获取信息
$myMessageService = new MessageService ;
$msgList = $myMessageService -> getMessage( $receiver, $sender ) ;
file_put_contents( "c:/mylog.log", "res=".$messageInfo."\r\n", FILE_APPEND ) ;
echo $msgList ;
?>
```

②controller.login.php：

``` php
<?php
$username = isset(  $_POST[ 'username' ] ) ?  $_POST[ 'username' ] : "defaultName" ;
$password = isset(  $_POST[ 'password' ] ) ?  $_POST[ 'password' ] : "defaultPassword" ;
if( $password == "123" ){
	// 把用户名保存到 Session
	session_start() ;
	$_SESSION[ 'username' ] = $username ;		// 这里为什么不怕用户名重复？ 
因为开一个 session 跟一个会话对应，不会是一个会话因此不会冲突
	header( "Location: friendsList.php" ) ;
}else{
	header( "Location: login.php" ) ;
}
?>
```

③controller.send_message.php：

``` php
<?php
require_once 'MessageService.class.php' ;
// sendMessageController
$sender = $_POST[ 'sender' ] ;
$receiver = $_POST[ 'receiver' ] ;
$content = $_POST[ 'content' ] ;
// 将信息写入日志
file_put_contents( "c:/mylog.log", $sender." -- ".$receiver." -- ". $content."\r\n", FILE_APPEND ) ;
$myMessageService = new MessageService() ;
$res = $myMessageService -> addMessage( $sender, $receiver, $content ) ;
if( $res == 1 ){
	
}else{
	echo ' ERROR. ' ;
 }
?>
```

类的设计
①class.message_service.php：

``` php
<?php
// 信息服务类，可以不写 " ?> " 结尾，因为它经常会被其他文件包含	
require_once 'sql_helper.class.php' ;
class MessageService{
	function addMessage( $sender, $receiver, $content ){
		
		$sql = " insert into messages ( sender, receiver, content, sendtime ) values ( '$sender', 'receiver', '$content', now() )"  ;	// mysql 里 sql 语句之间空格无影响
		file_put_contents( "c:/mylog.log", "sql=".$sql."\r\n", FILE_APPEND ) ;
		// 创建一个 sql_helper 对象
		$sql_helper = new sql_helper ;
		return $sql_helper -> execute_dml( $sql ) ;
	}
	// 获取数据，并把一个数据组装好返回给客户端
	function getMessage( $receiver, $sender ){
		$sql = "select * from messages where receiver='$receiver' and sender='$sender' and isget=0" ;
		$sql_helper = new sql_helper ;
		$array = $sql_helper -> execute_dql( $sql ) ; 
		// 定义返回给客户端的信息格式
		// $messageInfo = "<messages><msgid>1</msgid><sender>cj</sender><receiver>livid</receiver><content>hello</content><sendtime>2015-4-18</sendtime></messages>" ;
		// 如何拼接 xml 格式的字符串
		$messageInfo = "<messages>" ;
		for( $i=0; $i<count( $array ); $i++ ){
			$row = $array[ $i ] ;
			$messageInfo .= "<msgid>{ $row[ 'id' ] }</msgid><sender>{ $row[ 'sender' ] }</sender><receiver>{ $row[ 'receiver' ] }</receiver><content>{ $row[' content' ] }</content><sendtime>{ $row[ 'sendtime' ] }</sendtime>" ;
		}
		$messageInfo .= "</messages>" ;
		file_put_contents( "c:/mylog.log", "sql=".$messageInfo."\r\n", FILE_APPEND ) ;
		// isget 置 1
		$sql = "update messages set isget=1 where receiver='$receiver' and sender='$sender' " ;
		$sql_helper -> execute_dml( $sql ) ;
		$sql_helper -> close_connect() ;
		return $messageInfo ;
	}
}
```

②class.sql_service.php：

``` php
<?php
class sqlHelper{
	private $mysqli;
	# 以下信息会被配置到一个文件
	private static $host = "localhost";
	private static $user = "root";
	private static $pwd = "enter";
	private static $db = "webchat";

	public function __construct(){
		$this->mysqli = new MySQLi(self::$host,self::$user, self::$pwd, self::$db);
		if($this->mysqli_connect_error){
			die("连接失败!".$this->mysqli_connect_error);
		}
		# 设置访问数据库的字符集
		# 保证PHP是以UTF-8来操作数据库的
		$this->mysqli->query("set names utf8");
	}
	public function execute_dql($sql){
		$res = $this->mysqli->query($sql) or die("操作dql失败!".$this->mysqli_connect_error);
		return $res;
	}
	public function execute_dml($sql){
		$res = $this->mysqli->query($sql) or die("操作dml失败!".$this->mysqli_connect_error);
		if(!$res){
			return 0;
		}else{
			if($this->mysqli->affected_rows>0){
				return 1;
			}else{return 2;}
		}
	}

}
?>
```

- 为什么设计数据库中的是否获取状态时不用布尔值表示？为什么要用 tinyint 表示？

因为布尔值能表示的状态太少，只有 2 种，而很有可能以后还会有很多的未知状态，布尔值表示显得太死板所以用 tinyint 表示比较适合。

- 如何用 Ajax 实现好友离线/在线正确显示？

- 如何控制新打开的聊天子窗口的大小？为什么子窗口会和父窗口一样大？

- 为什么输入的信息不能服务器被接收而点击发送的才能被接收呢？

- PHP 如何将首尾空格去掉？

trim()。

- 如何设置一个按钮来控制用户输入密码的显示与否？

- 如何在 Javascript 代码中嵌入 PHP 代码？如何在 PHP 代码中嵌入 Javascript 代码？

Javascript 中嵌入 PHP 示例代码：

``` js
var data = "chatContent=" + $( 'chatContent' ).value + "$receiver=<?php echo $friendName; ?>" ;
```

- 为什么在 Javascript 中嵌入 PHP 脚本能被执行？为什么刷新过后仍然能执行？什么时候不能执行？

一个是浏览器本地脚本，一个是服务器端远程脚本。为什么看起来执行没有受到中断？
这是因为在第一次打开窗口时会申请该 PHP 页面本身，如 chatPage.php（就是这个文件中既有javascript 语句也有 html 语句，也有 php 语句，其中部分 php 代码嵌入在 javascript 脚本中）。在申请该页面的同时，PHP 看到所有代码中含有 <?php?> 代码就会自动执行其中的 PHP 脚本，然后返回给浏览器执行结果。当用户点击发送的时候其实里面的代码之前已经被执行现在变成数据了。
刷新之后仍然能执行的原因是，get 方式获取数据和缓存有绑定关系，即会先从缓存中去取数据（如果有的话）。同时 session 中的数据是保持在文件里的所以 Javascript 中 PHP 脚本要请求的数据数据仍然还在。

- 如何解决发送者是谁问题？

把已登陆的用户名保存到 Session 中。

- 为什么再输出 data 内容时会报错？

Notice: Undefined index: username in C:\WAMP\Apache\htdocs\webChat\chatPage.php on line 10
因为 session 中没有内容，需要重新登陆保存至少一次到 session 中才行。

- 如何区分向服务器发送一串数据的种类？

用地址符 & 隔开。

- $() 函数是固定的吗？

不是，$ 在这里只是个函数名而已，而函数名是可以改变的，只是大家都习惯这么写了。

- 为什么用了 Session 就不用怕用户名重复？

因为开一个 session 跟一个会话对应，不会是一个会话因此不会冲突。

- 如何进一步优化 Web 版聊天室？
①增加用户表 -> 通过 id 登录，并且对身份验证

②防止同一个用户多次登录 -> session （当会话销毁时同时将 isLogin 置 0）和数据库（若已登陆 isLogin 置 1，isLogin = 1 时禁止在登陆；退出置 0）
③公共聊天室
④界面做成 -> 框架 -> div + css


⑤数据库的信息，怎么清理(后台管理),发布广告，用户的管理（后台管理程序）
⑥聊天界面禁止输入文字，只准显示聊天记录
⑦打开聊天界面立即取消息而非等 5 秒

- 使用 JQuery 和不使用 JQuery 有什么不同？

JQuery 可以使一个控件和一个事件绑定，而非一个个的方式。

- 为什么回报错 "You don't have permission to access ... " ?

You don't have permission to access/WebChatiew/login.php on this server.

- 新建对象时类名后面带括号 () 和不带有什么区别？

`$object = new ClassName() ; ` 与 ` $object = new ClassName ;`

①加括号：若括号为空，即无实参项，那么理解为调用默认构造函数；若括号非空，即有实参项，可以理解为调用重载构造函数，或默认复合构造函数。
②不加括号：调用默认构造函数，或默认复合构造函数。

- 手机是如何接收短信的？为什么加油站不能用手机？

不是信息台主动发给手机，而是手机每隔一定时间主动向信息台发请求查看并获取自己的信息。手机相当于一个小型的发射台，具有一定的频率，当频率“合适”的时候，就会引燃造成危险。心脏病患者道理类似。
