---
layout: post
title: 图片按钮
category: Clipboard
tags: [HTML, CSS, Front-End]
latest: 2015年8月15日 17:19:48
---

图片按钮也比较实用，总结出几种主要的代码片段。

**最简单** 的：

{% highlight HTML linenos %}
<style>
a img {
	border:none;
}
</style>

<a href="#">
<img src="#" alt="#" width="960" height="600" src="?">
</a>
{% endhighlight %}


图片按钮的应用场景
-

### 第一种、在一般情况下按钮提交表单：

{% highlight HTML linenos %}
<form id="form1" name="form1" method="post" action="index.html">
<input type="submit" name="button" id="button" value="提交" />
</form>
{% endhighlight %}

这样提交按钮是标签 `<input type="submit">`，如果想换成图片加上样式，把 value="提交" 改成 value=" "，这样“提交”两个字就不会显示在这张背景图片的上面。

{% highlight CSS linenos %}
#button {
	 background:url( test.jpg ) no-repeat;
	 width:100px;
	 height:50px;
	 border:0px;
	 cursor:pointer;
}
{% endhighlight %}


### 第二种、直接使用图片标签按钮

{% highlight HTML linenos %}
<form id="form1" name="form1" method="post" action="index.html">
<input name="submit" type="image" value="ee" src="eeo_2.jpg" />
</form>
{% endhighlight %}

这样子直接写在 HTML 上就能直接看到按钮是图片。


### 第三种、图片按钮组


由于上面第二种图片直接使用 *src* 链接，但是如果一个网站很多需要到表单图片按钮展示的话，这样就会增加网页显示的速度。

这种情况，可以把全部类型差不多的图片整合成一张，每个页面使用 CSS + DIV，调用同一张图片里面的不同个按钮图标，这样能优化代码以及网站。

{% highlight HTML linenos %}
<form id="form1" name="form1" method="post" action="index.html">
  <input name="submit" type="image" value="ee" src="eeo_2.jpg" />
</form>
{% endhighlight %}

CSS 样式：

{% highlight CSS linenos %}
button{
	background:url(eeo_2.jpg) no-repeat -54px -35px;
	width:100px;
	height:50px;
	border:0px;
	cursor:pointer;
 }
{% endhighlight %}
