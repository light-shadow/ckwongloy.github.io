---
layout: post
title: 前端开发经验总结
category: Web
tags: [Javascript, CSS, HTML, 前端]
latest: 2015-11-27 23:20:21
---

#### JS 原生轮播原理

``` js
var i = 0 ;

setInterval(function(){
	++i;
	if (5 == i) {
		$('#test5').removeClass() ;
		$('#test1').addClass() ;
	} else {
		id1 = '#test' + i ;
		id2 = '#test' + (i+1) ;
		$(id1).removeClass() ;
		$(id2).addClass() ;
	}
}, 1000) ;
```

#### HTML图片按钮写法

- 在一般情况下按钮提交表单：

``` html
<form id="form1" name="form1" method="post" action="index.html">
	<input type="submit" name="button" id="button" value="提交" />
</form>
```

这样提交按钮是标签 `<input type="submit">`，如果想换成图片加上样式，把 value="提交" 改成 value="", 这样“提交”两个字就不会显示在这张背景图片的上面。然后：

``` css
#button {
	background:url(12.jpg) no-repeat;
	width:100px;
	height:50px;
	border:0px;
	cursor:pointer;
}
```

- 直接使用图片标签按钮

``` html
<form id="form1" name="form1" method="post" action="index.html">
	<input name="submit" type="image" value="ee" src="12.jpg" />
</form>
```

这样子直接写在 html 页面上就能直接看到按钮是图片。

- 由于上面第二种图片直接使用 `src` 链接，但是如果一个网站很多需要到表单图片按钮展示的话，这样就会增加网页显示的速度。

之前说过如果把全部类型差不多的图片整合成一张，每个页面使用 css+div 调用同一张图片里面的不同个按钮图标图片，这样的话便能更优化代码以及网站。

```
<form id="form1" name="form1" method="post" action="index.html">
	<input name="submit" type="image" value="ee" src="12.jpg">
</form>
```

样式：

``` css
button{
	background:url(12.jpg) no-repeat -54px -35px;
	width:100px;
	height:50px;
	border:0px;
	cursor:pointer;
}
```


#### JS 静态分页

``` html
<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<title>JS静态分页</title>

<style type="text/css">
	tr {
		display:none ;
	}
</style>

</head>

<body>

<table id="all_data">
	<tr><td>01</td></tr>
	<tr><td>02</td></tr>
	<tr><td>03</td></tr>
	<tr><td>04</td></tr>
	<tr><td>05</td></tr>
	<tr><td>06</td></tr>
	<tr><td>07</td></tr>
	<tr><td>08</td></tr>
	<tr><td>09</td></tr>
	<tr><td>10</td></tr>
	<tr><td>11</td></tr>
	<tr><td>12</td></tr>
	<tr><td>13</td></tr>
	<tr><td>14</td></tr>
	<tr><td>15</td></tr>
	<tr><td>16</td></tr>
	<tr><td>17</td></tr>
	<tr><td>18</td></tr>
	<tr><td>19</td></tr>
	<tr><td>20</td></tr>
</table>

<div id="dynamic">
	<!-- JS控制 -->
</div>

<script>
	var obj, j ;
	var page     = 0 ;
	var nowPage  = 0 ;    // 当前页
	var listNum  = 3 ;    // 每页显示 <ul> 数
	var PagesLen = 0 ;    // 总页数
	var PageNum  = 4 ;    // 分页链接接数( 5个 )

	window.onload = function() {
		obj = document.getElementById("all_data").getElementsByTagName("tr") ;
		j = obj.length ;
		PagesLen = Math.ceil(j/listNum) ;
		upPage( 0 ) ;
	}

	function upPage( p ) {
		nowPage = p ;

		//内容变换
		for ( var i=0; i<j; ++i ) {
			obj[i].style.display = "none" ;
		}

		for ( var i=p*listNum;i<(p+1)*listNum;i++) {
			if ( obj[i] ) {
				obj[i].style.display = "block" ;
			}
		}

		//分页链接变换
		strS='<a href="###" onclick="upPage(0)"> 首页 </a>  ' ;

		var PageNum_2 = (PageNum%2==0) ? Math.ceil(PageNum/2)+1 : Math.ceil(PageNum/2)   ;
		var PageNum_3 = (PageNum%2==0) ? Math.ceil(PageNum/2)   : Math.ceil(PageNum/2)+1 ;
		var strC      = "", startPage, endPage ;

		if ( PageNum>=PagesLen ) {
			startPage = 0 ;
			endPage   = PagesLen-1 ;
		} else if (nowPage<PageNum_2) {
			startPage = 0 ;
			endPage   = (PagesLen-1 > PageNum) ? PageNum : PagesLen-1 ; //首页
		} else {
			startPage = (nowPage+PageNum_3>=PagesLen) ? PagesLen-PageNum-1 : nowPage-PageNum_2+1 ;
			var t     = startPage + PageNum ;
			endPage   = (t>PagesLen) ? PagesLen-1 : t ;
		} // end if

		for ( var i=startPage; i<=endPage; ++i ) {
			if ( i == nowPage) {
				strC += '<a href="###" style="color:red;font-weight:700;" onclick="upPage('+i+')">'+(i+1)+'</a> ' ;
			} else {
				strC += '<a href="###" onclick="upPage('+i+')">'+(i+1)+'</a> ' ;
			}
		} // end for

		strE  = ' <a href="###" onclick="upPage('+(PagesLen-1)+')">尾页</a>  ' ;
		strE2 = nowPage + 1 + "/" + PagesLen + "页" + "  共" + j + "条" ;
		document.getElementById( "dynamic" ).innerHTML = strS + strC + strE + strE2 ;
	}
</script>
</body>
</html>
```

#### `<input>` 从左往右？

``` html
<input type="text" value="aabbccdd" style="text-align:right">
<input type="text" dir="rtl">
```

#### `<input>` 美化？

- 无边框

``` css
background: no-repeat 0 0 scroll ＃EEEEEE;
border: none;
outline: medium;
```

- jQuery 渐变

``` js
$('.selector').show('slow') ;
$('#selector').show('fast') ;
```

- 点击后边框变色

``` html
<style>
    .onlook { border:1px solid blue; }

    .look { border:none;outline:medium;border:1px solid red; }
</style>

<input type="text" id="test_id" class="nolook" onfocus="doClickStyle('test_id','look')" onblur="doClickStyle('test_id','nolook')">

<script>
    function doClickStyle( obj,objclassname ){
        document.getElementById( obj ).className = objclassname ;
    }
</script>
```

#### jQuery 图片切换

``` html
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html" charset="UTF-8">
    <title>Jquery Demo</title>
    <style type="text/css">
        *{ padding:0; margin:0; list-style:none; border:0; }
        .box{ width:800px; height:600px; margin:100px auto; position:relative; overflow:hidden }
        .box ul{ position:relative; z-index:1; }
        .box ul li{ position:absolute; left:0; top:0; }
        .box ol{ position:absolute; z-index:2; right:10px; bottom:10px; }
        .box ol li{width:20px; height:20px; background:silver; border:1px solid black; font-weight:bold; text-align:center; line-height:20px; float:left; margin-left:10px; cursor:pointer; }
        .box ol .present{ width:30px; height:30px; line-height:30px; border:1px solid #f60; color:#f60; margin-top:0; }
    </style>
</head>
<body>

<div class="box">
    <ul>
        <li><img src="../assets/img/t2.jpg"/></li>
        <li><img src="../assets/img/t3.jpg"/></li>
        <li><img src="../assets/img/t4.jpg"/></li>
        <li><img src="../assets/img/t5.jpg"/></li>
        <li><img src="../assets/img/t6.jpg"/></li>
    </ul>
    <ol>
        <li class="present">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ol>
</div>

<script src="../assets/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript">
    $( function (){
        var count = 6 ;
        $('img').css({'width':'800px', 'height':'600px'}) ;
        $( 'ol li' ).mouseover( function() {
            $(this).attr( 'class', 'present' ) ;
            $(this).siblings().attr('class', '') ;
            var num = $(this).index() ;
            $( 'ul li' ) .eq( num ).css( 'left', '320px' ) ;
            count ++
            $( 'ul li' ) .eq( num ).css( 'z-index', count ) ;
            $( 'ul li' ) .eq( num ).animate( { 'left':'0' }, 0 );
        } );
    })
    setInterval(
            function () {

            } ,
            3000
    ) ;
</script>

</body>
</html>
```

#### 换行截断

当一行文字超过 DIV 或者 Table 的宽度的时候，浏览器中默认是让它换行显示的，设置一行内文字超过宽度不换行且不显示如下：

当一行文字超过 DIV 或者 Table 的宽度的时候，浏览器中默认是让它换行显示的，如果我们不想让他换行显示那要怎么办呢？看到这个标题很容易就会想到截断文字加“...”的做法。 

一般的文字截断(适用于内联与块)： 

``` css
.text-overflow{ 
	display:block;/*内联对象需加*/ 
	width:31em; 
	word-break:keep-all;/* 不换行 */ 
	white-space:nowrap;/* 不换行 */ 
	overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */ 
	text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/ 
} 
```

对于表格的话，定义有一点不一样： 

``` css
table{ 
	width:30em; 
	table-layout:fixed;/* 只有定义了表格的布局算法为fixed，下面td的定义才能起作用。 */ 
}

td{ 
	width:100%; 
	word-break:keep-all;/* 不换行 */ 
	white-space:nowrap;/* 不换行 */ 
	overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */ 
	text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/ 
} 
```

注：这个东东只对单行的文字的效，如果你想把它用在多行上，也只有第一行有作用的。 

这个写法只有IE会有 `...`，其它的浏览器文本超出指定宽度时会隐藏。

#### 横线

- 灰色

``` html
<hr width=100% size=1 color=#bbbcbc style="FILTER: alpha(opacity=100,finishopacity=0)">
```

- 最基本的：

``` html
<hr width=300 size=1 color=#00ffff align=center noshade>
```

其中 width 规定线条的长度，还可以是百分比；color 是颜色，size 当然就是厚度了。

align 规定线条位置，left、right、center。

noshade 是否有立体效果。

- 两头渐变透明：

``` html
<hr width=80% size=3 color=#00ffff style="FILTER: alpha(opacity=100,finishopacity=0,style=3)"> 
```

- 右边渐变透明：

``` html
<hr width=80% size=3 color=#00ffff style="FILTER: alpha(opacity=100,finishopacity=0,style=1)"> 
```

- 画虚线：

``` html
<hr width=80% size=1 color=#00ffff style="border:1 dashed #00ffff"> 
```

- 画双线：

``` html
<hr width=80% size=3 color=#00ffff style="border:3 double green">
```

- 立体效果：

``` html
<hr width=80% size=3 color=#00ffff style="filter:progid:DXImageTransform.Microsoft.Shadow(color:#f6ae56,direction:145,strength:15)">
```

- 钢针效果：

``` html
<hr width=80% size=3 color=#00ffff style="filter:progid:DXImageTransform.Microsoft.Glow(color=#00ffff,strength=10)">
```

- 纺棰形：

``` html
<hr width=80% size=30 color=#00ffff style="filter:alpha(opacity=100,finishopacity=0,style=2)"> 
```

以上所有效果并不是孤立的，它们可以相互组合，从而产生新的效果。

#### 字符图标

网页上展示最多的内容是什么？文字！纵然使用图片再多的网页，也不会丢掉文字符号。

而由于网页中使用的字体类型，也是各浏览器对字体类型有不同的支持规格。 

字体格式类型主要有几个大分类：TrueType、Embedded Open Type 、OpenType、WOFF 、SVG。

- TrueType

Windows 和 Mac 系统最常用的字体格式，其最大的特点就是它是由一种数学模式来进行定义的基于轮廓技术的字体，这使得它们比基于矢量的字体更容易处理，保证了屏幕与打印输出的一致性。同时，这类字体和矢量字体一样可以随意缩放、旋转而不必担心会出现锯齿。

- EOT – Embedded Open Type (.eot)

EOT 是嵌入式字体，是微软开发的技术。允许 OpenType 字体用 @font-face 嵌入到网页并下载至浏览器渲染，存储在临时安装文件夹下。

- OpenType (.otf)
OpenType 是微软和 Adobe 共同开发的字体，微软的 IE 浏览器全部采用这种字体。致力于替代 TrueType 字体。


- WOFF – Web Open Font Format (.woff)

WOFF（Web开发字体格式）是一种专门为了Web而设计的字体格式标准，实际上是对于 TrueType/OpenType 等字体格式的封装，每个字体文件中含有字体以及针对字体的元数据（Metadata），字体文件被压缩，以便于网络传输。

- SVG (Scalable Vector Graphics) Fonts (.svg)

SVG 是由 W3C 制定的开放标准的图形格式。SVG字体就是使用SVG技术来呈现字体，还有一种 gzip 压缩格式的 SVG 字体。

使用方法：

使用 CSS3 的 `@font-face` 属性可以实现在网页中嵌入任意字体，具体方法可以参照《制作网页时使用的字体用户都能看到吗》。 

但是 IE 只支持微软自有的 EOT 格式字体，需要用字体转换工具将其转换为EOT格式，其他浏览器都不支持这一字体格式，其它浏览器可以设置 TTF(TrueType) 和 OTF( OpenType) 两种字体作为自定义字体。

- <http://xbj126.blog.163.com/blog/static/9737061201385105430482/>

#### 异步上传
- <http-//www.w3ctrain.com/2015/07/11/uploading-image-with-ajax/>
- <http-//blog.lxjwlt.com/front-end/2014/06/03/asynchronous-uploading-image.html>

#### 三栏式布局
- <https://developer.mozilla.org/en-US/docs/Web/CSS/float>
- <http://www.barelyfitz.com/screencast/html-training/css/positioning/>

#### 延迟加载

"生成布局"（flow）和"绘制"（paint）这两步，合称为"渲染"（render）。

DOM变动和样式变动，都会触发重新渲染。但是，浏览器已经很智能了，会尽量把所有的变动集中在一起，排成一个队列，然后一次性执行，尽量避免多次重新渲染。

- <http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html>
- <http://www.cnblogs.com/vajoy/p/4183569.html>

#### JS PDF
- <http://bpampuch.github.io/pdfmake/playground.html>
- <http://mrrio.github.io/jsPDF/>
- <http://www.gbtags.com/technology/javascript/20120918-javascript-create-pdf/>

#### JS 跳出 iframe 框架
- <http://www.111cn.net/wy/js-ajax/50126.htm>

#### 时间日期选择器
- <http-//www.helloweba.com/demo/timepicker/>
- <http-//blog.sina.com.cn/s/blog_51048da70102v0li.html>

#### 键盘键码
- <http://www.cnblogs.com/DareOnly/archive/2009/02/26/1398928.html>

#### CSS 水平垂直居中
- <https://css-tricks.com/centering-css-complete-guide/>

#### autofocus on Safari
- <http://twilight.btlogs.com/how-to-focus-html-input-element-with-javascript-on-ios-and-android-mobile-safari/>

#### CSS3 Flex Box
- [Flexbox详解](https://segmentfault.com/a/1190000002910324)
- [一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox.html)
- [Flexbox——快速布局神器](http://www.w3cplus.com/css3/flexbox-basics.html)
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### Grunt + Bower + RequireJS + Angular
- <http://ju.outofmemory.cn/entry/85833>
- <http://www.hlqf.net/archives/139.html>

#### 浏览器滚动条美化
- <http://alfred-sun.github.io/blog/2014/12/24/scrollbar-customized-with-css-style/>