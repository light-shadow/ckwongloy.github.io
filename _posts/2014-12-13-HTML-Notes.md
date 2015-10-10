---
layout: post
title:  速览：HTML 个人笔记
category: Web
tags: [HTML, Web]
latest: 2014年12月13日 22:17:30
---

列表
-

{% highlight HTML linenos %}
<ul> 
<li type="square">无序列表-方形</li>
<li type="circle">无序列表-空心圆</li>
<li type="disc">无序列表-实心圆</li>
<li>无序列表-默认形状</li>
</ul>

<ol type="I" start="2">
<li>有序列表从2开始</li>
<li>有序列表3</li>
<li>有序列表4</li>
<li>有序列表5</li>
<li>有序列表6</li>
</ol>
{% endhighlight %}

锚标签：Anchor
-

个人认为这个还是很实用的，本博客中的 Archive、Category、Tag 都使用到了 Anchor。

{% highlight HTML linenos %}
<!-- 锚标签，#n 后面的表示显示 name="n" 位置的内容 -->

<a href="#1">显示位置1</a>
<a href="#2">显示位置2</a>
<a href="#3">显示位置3</a>

<div style="height:1000px;border:1px solid red;"></div>
<a name="1">位置1</a>
<div style="height:1000px;border:1px solid red;"></div>
<a name="2">位置2</a>
<div style="height:1000px;border:1px solid red;"></div>
<a name="3">位置3</a>
<div style="height:1000px;border:1px solid red;"></div>
{% endhighlight %}

##### **注意**

1、锚标签中的 `#n` 和 `name="n"` 都必须是在 `<a>` 标签中才有效。

2、如果两个位置的上下距离相当足够，那么点击某个位置后位置实际将出现在浏览器左上角；

但如果最后一个位置和上面的位置不够，以及最后一个位置后面的距离不够，则点击最后一个位置后并不会出现在浏览器左上角，只是会出现在当前浏览器的窗口中。、

字体
-

选择字体家族旧的写法是：

{% highlight HTML %}
<font face="Georgia">Georgia</font>
{% endhighlight %}

现在是 CSS 控制：

{% highlight HTML %}
<p style="font-family:''Georgia">Georgia</p>
{% endhighlight %}

设置字体颜色旧的写法是：

{% highlight HTML %}
<h1  text='#ffffff'>HTML</h1>
{% endhighlight %}

或者

{% highlight HTML %}
<font color="black">HTML</font>
{% endhighlight %}

+ 下划线

{% highlight HTML %}
<strike>email:fdsk.cj@inbox.com</strike>
{% endhighlight %}

背景图片及背景颜色
-

以前是：

{% highlight HTML %}
<body bgcolor="green"></body>
{% endhighlight %}

现在是 CSS 控制：

{% highlight HTML linenos %}
body {
	backgound: url( "/path/to/image.suffix" ) ;
}
{% endhighlight %}

超链接
-

`<a>` 的属性有：

+ href

+ target

规定了点开超链接之后呈现的位置，可以是一个新页面，可以是本页面，也可以是自定义的某个地方。

比如，可以设置一个`<iframe name="center">`，然后就可通过 `target="center"` 来跳转到名为 ***center*** 的地方显示。

{% highlight HTML %}
<iframe src="https://www.google.cn" name="center" width="800px" height="500px">
{% endhighlight %}


+ rel

比如，可以设置为 **nofollow**。

嵌入视频
-

{% highlight HTML %}
<embed src="1.swf" width="800px" height="500px" autoplay="true">
{% endhighlight %}

闪动
-


{% highlight HTML  linenos %}
<marquee direction="left" bgcolor="silver" scrollamount="100">
<input type="image" src="/path/to/image.suffix" width="15px" height="15px">
来打我啊
</marquee>
{% endhighlight %}

表单
-

{% highlight HTML %}
<form action="?.html" method="get"></form>
{% endhighlight %}

表单的 `action` 指向处理该提交请求的目的脚本，可以是 PHP 等动态脚本，也可以是 HTML。

`method` 规定了该表单提交请求采用的是何种方式，也可以是 POST。

+ 输入框 `<input>`

`<input>` 的主要属性 ( 某些属性大多数 HTML 标签都具有 ) ：

- type：enter、reset、text、password、file、submit、 **hidden**、checkbox、image、radio、。

##### **说明**

通过 htdden 提交的数据可以通过抓包 ( HTTPWatch ) 看见，举例说明，下面的代码将会把 "done" 状态提交到浏览器：

{% highlight HTML %}
<input type="hidden" name="status" value="done">
{% endhighlight %}

- maxlength：单位建议 px。

- name

- value：将在未曾输入任何内容的时候输出一些提示信息。

- style：规定 CSS 样式。


表格
-

#### 1、`<table>` 的属性有：

+ width、height、border。

+ align：center、left、right。

+ bordercolor

+ background：`background="path/image.suffix"`

+ cellspacing
 
+ cellpadding

#### 2、`<th>`、`<td>`、`<tr>` 属性有：

+ colspan

+ rowspan

+ bgcolor

+ background


选择
-

{% highlight HTML linenos %}
<h5>您的地址？（按住 ctrl 可以复选）</h5>
<fieldset style="width:100px">
<select name="address" size="5" multiple>
<option value="chongqing" selected>重庆</option>
<option value="beijing">北京</option>
<option value="shanghai">上海</option>
<option value="tianjin">天津</option>
<option value="tianjin">海口</option>
<option value="oversea">海外</option>
</select>
</fieldset>

<!--复选项-->
<legend>
<h5>您最喜欢本网站那个位置？</h5>
</legend>
<input type="checkbox" name="city">顶端<br>
<input type="checkbox" name="city">左端<br>
<input type="checkbox" name="city">右端<br>
<input type="checkbox" name="city">下端<br>
<input type="checkbox" name="city">中间<br>
<input type="checkbox" name="city" checked>全都喜欢<br>
<input type="checkbox" name="city">全都不喜欢<br>
<legend>
{% endhighlight %}

##### **说明**

下拉选项中的 name 和 value 值不会给用户看见，但是会被浏览器感知。

**checked** 属性代表默认选中。

区域
-

+ `<fieldset>`

+ `<legend>`


与 Javascript 绑定
-

在标签中设置注册事件监听：

{% highlight HTML linenos %}
<script language="javascript">
<!--
	function show1(){
		window.alert( 'I am Javascript.' ) ;
	}
-->
</script>

<body>
<map name="lcj">
<area shape="rect" onclick="show();" href="#" coords="0,0,200,200">
</map></body>
{% endhighlight %}

常用代码段
-

+ HTML 文件头

{% highlight HTML linenos %}
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<meta http-equiv="content-type" content="text/html; charset= utf-8">
{% endhighlight %}

+ 图片按钮

{% highlight HTML %}
<input type="image" src="path/to/image.suffix" width="100px" height="40px">
{% endhighlight %}

小案例
-

#### **一、框架集的组合使用**

本案例演示的是同一页面中框架集的组合使用，以下 6 个文件均在同一文件夹下面。

1、 **index.html**

{% highlight HTML %}
<!DOCTYPE html>
<html lang="zh">
<head>
<title>框架集的组合使用</title>
<meta http-equiv="content-type" content="text/html" charset="UTF-8"></head>

<frameset rows="13%,78%,9%">
<frame name="top" src="top.html" frameborder="no"/>

<frameset cols="13%,72%,15%">
<frame name="left" src="left.html" frameborder="no"/>
<frame name="center" src="center.html" frameborder="no"/>
<frame name="right" src="right.html" frameborder="no"/></frameset>

<frameset rows="7%">
<frame name="bottom" src="bottom.html" frameborder="no"/></frameset></frameset></html>
{% endhighlight %}

2、 **center.html**

{% highlight HTML %}
<meta charset="UTF-8">
<body bgcolor="silver">
<center>
<h1>中部</h1>
<iframe src="http://g.cn" name="center" width="800px" height="450px"/></center></body>
{% endhighlight %}

3、 **left.html**

{% highlight HTML %}
<meta charset="UTF-8">
<body bgcolor="pink">
<center>
<h1>左侧</h1></center></body>
{% endhighlight %}

4、 **right.html**

{% highlight HTML %}
<meta charset="UTF-8">
<body bgcolor="bule"> 
<center>
<h1>右侧</h1></center></body>
{% endhighlight %}

5、 **top.html**

{% highlight HTML %}
<meta charset="UTF-8">
<body bgcolor="green">
<center>
<h1>顶部</h1></center></body>
{% endhighlight %}

6、 **bottom.html**

{% highlight HTML %}
<meta charset="UTF-8">
<body bgcolor="yellow">
<center>
<h1>底部</h1></center</body>
{% endhighlight %}

#### **二、网页邮箱结构**

1、 **index.html**

{% highlight HTML %}
<!DOCTYPE html>
<html lang="zh">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>网页邮箱结构</title></head>

<frameset rows="14%,*">
<frame name="top" src="top.html" frameborder="no"/>
<frameset cols="12%,*">
<frame name="left" src="left.html" frameborder="yes"/>
<frame name="right" src="right.html" frameborder="yes"/>
</frameset></frameset></html>
{% endhighlight %}

2、 **top.html**

{% highlight HTML %}
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<body bgcolor="blue">
<h1>顶端标题</h1></body>
{% endhighlight %}

3、 **left.html**

{% highlight HTML %}
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<body bgcolor="red">
<h1>左侧菜单</h1></body>
{% endhighlight %}

4、 **right.html**

{% highlight HTML %}
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<body bgcolor="yellow">
<h1>右侧内容</h1></body>
{% endhighlight %}

##### **注意**

`<frameset>` 不能再 `<body>` 中，否则不会显示出任何内容。

上面的仅提供思路，具体实现请发挥想象。
