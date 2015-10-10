---
layout: post
title: 页面上浮动的返回菜单
category: Clipboard
tags: [Javascript, CSS, HTML, Web, 返回菜单]
latest: 2015年10月9日20:14:24
---

浮动的返回菜单应用十分广泛，本博客也采用到了。

直接上代码：

HTML
-

{% highlight HTML %}
<a href="#top" id="back-to-top" title="返回顶层"></a>
{% endhighlight %}

CSS
-

{% highlight CSS linenos %}
<style type="text/css">

	/* Back to top*/

	#back-to-top {
		font-size: 100px;
		position: fixed;
		bottom: 10em;
		right: 5px;
		text-decoration: none;
		color: #F7F6F6;
		background-color: #D9AC8B;
		font-size: 16px;
		padding: 1em;
		display: none;
	}

	#back-to-top:hover {
		color: #D9AC8B;
		background-color: #F7F6F6;
	}
</style>
{% endhighlight %}

Javascript
-

{% highlight Javascript linenos %}
<script src="http://lamchuanjiang.github.io/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript">
	$( function (){
	    $( "#back-to-top" ).click( function (){
	        jQuery( "html,body" ).animate({
	            scrollTop:10
	        },500);
	    });
	    $(window).scroll( function () {
	        if  ( $( this ).scrollTop() > 50){
	            $( '#back-to-top' ).fadeIn( "fast" );
	        } else  {
	            $( '#back-to-top' ).stop().fadeOut( "fast" );
	        }
	    });
	});
</script>
{% endhighlight %}

### 注意事项

+ 改代码

引入文件的链接、属性值的设置，需要灵活修改。建议边测边改。

+ CSS、JS 在页面中的位置

CSS 放在 head，JS 放在 footer。

##### **说明**

+ CSS  文件和 JS  文件引入的差别？

    - CSS：`./`
    
    - JS 或 IMG： `../`。
