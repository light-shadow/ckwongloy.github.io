---
layout: post
title: DIV+CSS 用 float 时引起背景不正常显示的解决办法
category: Web
tags: [CSS, 前端]
latest: 2016年01月11日 18:43:49
---

当 div 里面套嵌多个用 float 定义的层是，背景图没有办法在firefox里面显示。

div+css 布局无法避免的冗余标签完全严格按照 w3c 的标准来布局是不可能的，想要在不同版本的浏览器下都表现出漂亮的网页，几乎无可避免地要使用一些多余的标签。

总结而言，div 布局必须用到冗余标签的地方主要有三个：


一是背景图和背景色，当内层元素的 css 属性全部为“float:left”时，外层的背景将在mozilla等浏览器下无法显示。

这个时候必须要在内外层之间嵌套一个背景层，或是在内层元素最后增加一个 “clear:both”的空标签。


二是当页宽为绝对值时，必须在属性为float的并列元素外嵌套一个宽度为绝对值之和的div，以保证页面放缩时 float 元素不会“掉下去”。

三是当需要写底部信息栏时，因不能用 position:absolute 定位，而必须在所有float的并列元素之外嵌套一个div，以保证高度自动伸缩。同时底部信息栏应具有 “clear:both” 属性。

我最后的解决方法是，在最后加个 `<div class="clear"></div>` ，然后定义 `.clear{clear:both;height:0px;}` 就可以了。

``` html
<div id="page"> 
	<div id="left"></div>
	<div id="center"></div> 
	<div id="right"></div>
</div>

#page{margin:0 auto;width:906px;background:gray;}
#left,#center,#right{float:left;width:300px;height:300px;border:1px green solid;
```

在ff，chrome下背景颜色丢失，给外层加上固定高度可以解决，但为了让容器自动撑开，有了如下2种方法：

方法1：清除浮动
改动代码如下：

``` html
<div id="page"> 
<div id="left"></div>
<div id="center"></div> 
<div id="right"></div>
<div style="clear:both"></div>
</div>
```

方法2：加一个浮动层
改动代码如下：

``` html
<div id="page"> 
<div style="background:gray;float:left;width:100%">
<div id="left"></div>
<div id="center"></div>
<div id="right"></div>
</div>
</div> 
```
