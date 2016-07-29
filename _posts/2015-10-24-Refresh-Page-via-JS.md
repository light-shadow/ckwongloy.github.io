---
layout: post
title: JS 刷新页面的几种方式
category: Javascript
tags: [Javascript, 页面刷新]
latest: 2015年10月25日 14:43:49
---

1，reload 方法，该方法强迫浏览器刷新当前页面。
语法：`location.reload([bForceGet])` 
参数： bForceGet， 可选参数， 默认为 false，从客户端缓存里取当前页。true, 则以 GET 方式，从服务端取最新的页面, 相当于客户端点击 F5("刷新")

2，replace 方法，该方法通过指定URL替换当前缓存在历史里（客户端）的项目，因此当使用replace方法之后，你不能通过“前进”和“后退”来访问已经被替换的URL。
语法： `location.replace(URL)`
通常使用： `location.reload()` 或者是 `history.go(0)` 来做。
此方法类似客户端点F5刷新页面，所以页面method="post"时，会出现"网页过期"的提示。

因为Session的安全保护机制。

当调用 location.reload() 方法时， aspx 页面此时在服务端内存里已经存在， 因此必定是 IsPostback 的。
如果有这种应用： 需要重新加载该页面，也就是说期望页面能够在服务端重新被创建，期望是 Not IsPostback 的。

这里，location.replace() 就可以完成此任务。**被replace的页面每次都在服务端重新生成**。
代码： location.replace(location.href);

返回并刷新页面：

```
location.replace(document.referrer);document.referrer //前一个页面的URL
```

不要用 `history.go(-1)`，或 `history.back();` 来返回并刷新页面，这两种方法不会刷新页面。

#### 其他方式
1，history.go(0) 
2，location.reload() 
3，location=location 
4，location.assign(location) 
5，document.execCommand('Refresh') 
6，window.navigate(location) 
7，location.replace(location)
8，document.URL=location.href

#### 自动刷新页面的方法
1，页面自动刷新：把如下代码加入<head>区域中

``` html
<meta http-equiv="refresh" content="20">
```

其中20指每隔20秒刷新一次页面。


2，页面自动跳转：把如下代码加入 `<head>` 区域中

``` html
<meta http-equiv="refresh" content="20;url=http://www.google.com">
```

其中20指隔20秒后跳转到 http://www.google.com 页面。

3，页面自动刷新js版

``` js
<script language="JavaScript">
function myrefresh()
{
   window.location.reload();
}
setTimeout('myrefresh()',1000); //指定1秒刷新一次
</script>
```

4，JS刷新框架的脚本语句

```
// 刷新包含该框架的页面用
<script language=JavaScript>
   parent.location.reload();
</script>

// 子窗口刷新父窗口
<script language=JavaScript>
    self.opener.location.reload();
</script>
(　或<a href="javascript:opener.location.reload()">刷新</a>   )

// 刷新另一个框架的页面用   
<script language=JavaScript>
   parent.另一FrameID.location.reload();
</script>
```

如果想关闭窗口时刷新或想开窗时刷新，在<body>中调用以下语句即可。

``` html
<body onload="opener.location.reload()"> 开窗时刷新
<body onUnload="opener.location.reload()"> 关闭时刷新
<script language="javascript">
window.opener.document.location.reload()
</script>
```

#### 例子

下面以三个页面分别命名为frame.html、top.html、bottom.html为例来具体说明如何做。 
frame.html 由上(top.html)下(bottom.html)两个页面组成，代码如下： 

``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> 
<HTML> 
<HEAD> 
<TITLE> frame </TITLE> 
</HEAD> 
<frameset rows="50%,50%"> 
<frame name=top src="top.html"> 
<frame name=bottom src="bottom.html"> 
</frameset> 
</HTML>
```

现在假设top.html (即上面的页面) 有七个button来实现对bottom.html (即下面的页面) 的刷新，可以用以下七种语句，哪个好用自己看着办了。 
top.html 页面的代码如下： 

``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> 
<HTML> 
<HEAD> 
<TITLE> top.html </TITLE> 
</HEAD> 
<BODY> 
<input type=button value="刷新1" onclick="window.parent.frames[1].location.reload()"><br> 
<input type=button value="刷新2" onclick="window.parent.frames.bottom.location.reload()"><br> 
<input type=button value="刷新3" onclick="window.parent.frames['bottom'].location.reload()"><br> 
<input type=button value="刷新4" onclick="window.parent.frames.item(1).location.reload()"><br> 
<input type=button value="刷新5" onclick="window.parent.frames.item('bottom').location.reload()"><br> 
<input type=button value="刷新6" onclick="window.parent.bottom.location.reload()"><br> 
<input type=button value="刷新7" onclick="window.parent['bottom'].location.reload()"><br> 
</BODY>
</HTML>
```
 
下面是bottom.html页面源代码，为了证明下方页面的确被刷新了，在装载完页面弹出一个对话框。 

``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"> 
<HTML> 
<HEAD> 
<TITLE> bottom.html </TITLE> 
</HEAD> 
<BODY onload="alert('我被加载了！')"> 
<h1>This is the content in bottom.html.</h1> 
</BODY> 
</HTML>
```

解释一下： 

1.window指代的是当前页面，例如对于此例它指的是top.html页面。 
2.parent指的是当前页面的父页面，也就是包含它的框架页面。例如对于此例它指的是framedemo.html。 
3.frames是window对象，是一个数组。代表着该框架内所有子页面。 
4.item是方法。返回数组里面的元素。 
5.如果子页面也是个框架页面，里面还是其它的子页面，那么上面的有些方法可能不行。 

三、java在写Servler,Action等程序时，要操作返回页面的话（如弹出了窗口，操作完成以后，关闭当前页面，刷新父页面） 


``` java
PrintWriter out = response.getWriter(); 
out.write("<script type=\"text/javascript\">"); 

//子窗口刷新父窗口 
out.write("self.opener.location.reload();"); 

//关闭窗口 
out.write("window.opener=null;"); 
out.write("window.close();"); 
out.write("</script>"); 
```

四、JS刷新框架的脚本语句

1.如何刷新包含该框架的页面用 

``` js
<script language=JavaScript> 
	parent.location.reload(); 
</script> 
```

2.子窗口刷新父窗口 

``` js
<script language=JavaScript> 
	self.opener.location.reload(); 
</script>
```

3.如何刷新另一个框架的页面用 （上面的实例以说明了） 

```
语句1. window.parent.frames[1].location.reload(); 
语句2. window.parent.frames.bottom.location.reload(); 
语句3. window.parent.frames["bottom"].location.reload(); 
语句4. window.parent.frames.item(1).location.reload(); 
语句5. window.parent.frames.item('bottom').location.reload(); 
语句6. window.parent.bottom.location.reload(); 
语句7. window.parent['bottom'].location.reload(); 
```

4.如果想关闭窗口时刷新或者想开窗时刷新的话，在<body>中调用以下语句即可。 

```
<!-- 开窗时刷新 -->
<body onload="opener.location.reload()"> 

<!-- 关闭时刷新 -->
<body onUnload="opener.location.reload()"> 

<script language="javascript"> 
	window.opener.document.location.reload() 
</script> 
```
