---
layout: post
title: 网页的自动跳转和隐藏
category: Clipboard
tags: [HTML, 建站]
latest: 2015年9月26日 17:19:48
---

在浏览器地址栏上隐藏网站内部结构的代码。

此代码可制作成单独首页 ( index.html/htm/php/asp/... )，放在空间服务器根目录位置。

{% highlight HTML %}
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>lamchuanJiang.github.io | @lamChuanJiang</title>

<!-- 关键代码开始 -->

<frameset framespacing="0" border="0" rows="0" frameborder="0">
<frame name="main" src="http://lamchuanjiang.github.io/blog" scrolling="auto" noresize></frameset>

<!-- 关键代码结束 -->

</head>

<body>
<!-- 下行可选 -->
<a href="http://lamchuanjiang.github.io/">Li</a></body></html>
{% endhighlight %}

说明
-

实现该功能通常需要两个网站 ( 一般对应两个域名 )，或者说同一网站 ( 同一域名 ) 下的两个不同路径。

通常情况是：

一个服务器上的一个网站只有一个内容是上面代码的首页，即被隐藏的网站；而另一个服务器上的另一个网站才是真正有实际内容的网站。

上面的 <http://lamchuanjiang.github.io/blog> 就是网站结构将被隐藏，即该域名下的所有网页的路径都不会展示在浏览器地址栏上，但会显示网页的实际内容，只是网站的组织无法通过浏览器地址栏查看。

但知道网站结构的人仍然可以通过输入一些内部网页地址访问，如：<http://lamchuanjiang.github.io/about_li_zh.html>，所以这只是一个障眼法。

而存放上述代码的 index.html 首页将隐藏自身内容，并通过 index.html 的首页功能自动跳转到 <http://lamchuanjiang.github.io/blog>。

注意
-

**用于隐藏的首页不能和实际想要隐藏网站结构的首页是同一个**，否则真正有内容的首页将被隐藏，导致浏览器一片空白。
