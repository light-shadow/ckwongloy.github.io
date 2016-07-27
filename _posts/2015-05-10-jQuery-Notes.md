---
layout: post
title: jQuery 学习笔记
category: Javascript
tags: [jQuery, Javascript]
latest: 2015年05月11日 23:10:31
---

#### 重复的事情全部交给计算机去做

【jQuery简介】

- jQuery的历史

jQuery 是由一个美国人叫作约翰·莱西阁（John Resig）创建的

- jQuery 的作用

主要是用来替代原生 js 的。

- 亲密体验jQuery

（1）jQuery的书写格式；

jQuery不变的宗旨你用什么就选什么；用什么选花钱选，花美元；
$(function(){})

jQuery 号称写得少做得多，效果更好。

【事件】--- 当什么时候执行什么事；

【函数】--- 实际上所谓函数就是封装好的某个功能；

- 函数的格式:

`function（）{}` 表示匿名函数；

函数的基本格式是函数名称+小括号；函数的小括号当中可能有参数，参数之间一定要用逗号隔开。

hide() 表示隐藏选定对象；
show() 表示显示选定对象；

他们两个有个共同的特性小括号中都可以传递一个数字参数用来控制隐藏动画的时间；
toggle() 他表示hide()和show()函数的一个综合体，在显示和隐藏之间进行切换。

事件的因果关系是怎样的一个格式；

``` js
$('button').click(function(){ // ... })
```

【正式接触jQuery】

（1）jQuery的书写步骤；

1.引入jQuery文件；
2.新建一对script标签来书写jQuery
3.用jQuery的方式进行代码分离；
4.按照jQuery用谁就选谁的原则去书写代码；

【jQuery的css修改】

- alert() 弹出一个警示框； 弹出的信息可以写在小括号里面作为参数；

- css()
1.单属性获取，格式css('要获取的css属性名称')
2.单属性修改，格式css('参数1'，'参数2')
参数1：表示要修改的css属性名称；
参数2：表示要修改的值；
3.多属性修改，格式css({属性名：'值'，属性名：'值'···})

注意：关于css复合属性的修改； 遇到复合属性需要按照驼峰式命名法去书写css属性;

#### jQuery 修改样式

1. Jquery 的学习路线是怎样的？如何学习 Jquery？
—— Jquery 简介 -> 通过 Jquery 修改 CSS -> 选择器(Jquery 核芯) ->  HTML 属性修改 -> Jquery 动画。
—— 学习 Jquery 其实就是学习使用别人写好的 Javascript 程序库去开发网页。

2. Jquery 的历史？
—— 美国人 John Resig（大鼻子） 在他 27 岁时创建的。

3. 仅一套 Web 标准可以开发出一个完整的网站吗？
—— 现在来讲，基本上不行。如今的网站基本上都包括三个 Web 标准：结构 -- HTML，样式 -- CSS，行为 -- Javascript。

4. Jquery 有什么作用？原生 Javascript 有什么不足的地方？Jquery 有什么优点？
—— 替换原生 Javascript，其中主要是替换JS DOM 。Javascript DOM 能做到的，Jquery 基本上都能做到，并且 Jquery 做得更快更方便。原生 Javascript 代码缺少封装，代码量比较大。
——  Jquery 极大地化简了JS DOM 的复杂度和繁琐性。让工作变得非常直观和简单。同时也大大地减少了代码量。Jquery 更适合美工去学习。此外，Jquery 号称可以跨越任何浏览器之间的兼容性问题，其中甚至包括最头疼的浏览器版本 -- IE6，即 Jquery 写的代码绝对没有兼容性问题。

5. 什么是 Jquery？如何使用 Jquery？
—— 本质也是原生 Javascript 代码。Jquery 使用举例：
·只使用 Javascript 而不使用 Jquery：

``` html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
div{ width:200px; height:200px; background:#cccc; border: 2px solid #000 }
</style>
<script type="text/javascript">
window.onload = function (){
var button = document.getElementById( 'btn' ) ;
var box = document.getElementById( 'box' ) ;
button.onclick = function (){
box.style.display = 'none' ;
}
}
</script>
</head>
<body>
<button id="btn">隐藏</button>
<div id="box">BOX</div>
</body>
</html>
```
6. Jquery 书写的基本格式是怎样的？
·使用 Jquery 的宗旨 -- " 用什么（标签）选什么，花美元 $() 选 "，基本格式 ：$( function(){} ) 。一个 $ 代表很多东西（写得少， 效果更好）这种格式可以是使代码分离 -- 当有了结构和样式执行完毕后，才响应行为。举例如下，加粗部分为 Jquery 书写基本格式：

``` html
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
div{ width:200px; height:200px; background:#cccc; border: 2px solid #000 }
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( 'button' ).click( function (){
$('div').hide(1000) 
});
})
</script>
</head>
<body>
<button>隐藏</button>
<div>盒子</div>
</body>
</html>
```

7. 引入 Jquery 后为什么要另起一行再写 JS 代码？
—— 因为 HTML 标签是成对出现的，每对标签完成一个功能。引入 Jquery 时那对 <script> 标签就只有引入 Jquery 的功能，如果在第 1 对标签中继续写 JS 代码，则 Jquery 不能够被成功引入。下面的 <script> 标签内才是 JS 代码。同 Ajax 的引入，其实所有 JS 代码的引入都是这样的。

8. 什么是 '事件'？事件的因果关系是怎样的一种格式？
—— 当什么时候执行什么事情。在 Javasript 中，事件有点击，鼠标离开等等。
—— $( 'tag' ).behavior( function(){ ... } )。其中 behavior 是因 -- 因为发生了什么，function(){...} 是果 -- 所以要做些什么。

9. 什么是函数？
—— 封装好的某个功能。

10. Jquery 的基本书写步骤是哪些？
①引入 Jquery 文件；
②新建一对 script 标签来书写 Jquery；
③用 Jquery 的方式进行代码分离；
④按照 Jquery 用谁选谁的原则去书写代码。
举例如下：

``` html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
img{ width:200px; height:200px; background:#cccc; border: 2px solid #000 }
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( '#hide' ).click( function (){
$('img').hide(1000) 
});
$( '#show' ).click( function (){
$('img').show(1000) 
});
$( '#switch' ).click( function (){
$('img').toggle(1000) 
});
})
</script>
</head>
<body>
<button id="hide">隐藏</button>
<button id="show">显示</button>
<button id="switch">切换</button>
<img src="github.jpg"/>
</body>
</html>
```

·Jquery 在选择 id 选择器的时候，要写 # 号。同理，选择类选择器的时候要写 . 。
·hide() -- 隐藏选定对象，函数的参数是毫秒，代表隐藏动画的时间。不写参数表示不等待立刻隐藏。show() 同理。
·toggle() -- hide() 和 show() 的综合。在显示和隐藏之间切换。toggle 贯穿 Jquery 的始终，可以切换很多东西。

11. Jquery 修改 CSS 有哪几种方式？具体怎么修改？

—— 通过 css() 函数。
①单属性访问。格式是：css( '要获取的  css 属性名称' )，举例 --  alert( $( 'div' ).css( 'width' ) )。
②单属性修改。格式是：css( '参数1', '参数2' )，参数1表示 css 属性，参数2表示 css 属性值。举例 -- $( 'div' ).css( 'width' , '500px' )。
③多属性修改。格式是：css( { '参数1':'参数1值','参数2':'参数2值',... } )，参数的单引号可以省略（可以容错），但参数值的单引号不能省略。举例：$( 'div' ).css( { 'width':'500px', 'backgroud':'red' } )
综合举例：

``` html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
div{ width:200px; height:200px;border: 2px solid #000; background-color:green}
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
alert('Hello Jquery.')
$( 'button' ).click( function (){
alert( $( 'div' ).css( 'width' ) )
$( 'div' ).css( 'width' , '500px' )
$( 'div' ).css( { 'width':'500px', 'backgroundColor':'red' } )
});
})
</script>
</head>
<body>
<button id="hide">BUTTON</button>
<div>BOX</div>
</body>
</html>
```

12. 什么是复合属性？如何修改 CSS 的复合属性？

—— 带 - 的属性，如 backgound-color，margin-right。遇到复合属性需要按照驼峰命名法书写，即：background-color -> backgroundColor。否则不会出现相关效果。


#### 选择器

1. Jquery 选择器分为哪几种？各怎么使用？

—— 选择器是 Jquery 的重中之重。有三种：

①基础选择器：
```
#id -- $( #id )，通过 HTML 标签的 id 值选择 。
```

.class -- $( .class )， 通过 HTML 标签的 CSS 属性选择。
element -- $(element )，选择 HTML 文本中的标签元素 element。
element1, element2, element3,... -- 将每一个选择器匹配到的元素合并后一起返回。比如， $("div,span,p.myClass")。
* -- $( * )，选择所有 HTML 文本中的所有标签元素。
·表示层级：
ancestor descendant ... -- 在给定的祖先元素 ancestor 下匹配所有的后代元素 descendant。如：$( "form input" )，form 元素下所有的 input 标签元素都会被选择。
parent > child  -- 在给定的父元素下匹配所有的子元素，表示选中指定的元素唯一的一级子代元素；如：$( "form > input" )，就只选择出一个第一个 input 标签元素。
prev + next -- 匹配所有紧接在 prev 元素后的 next 元素，表示选中指定元素其后紧邻的唯一一个元素；如：$("label + input")，就只会选择出 label 标签后的第一个 input 标签。
prev ~ siblings  -- 匹配 prev 元素之后的所有 siblings 元素，表示选中指定元素其后所有的元素；如：$("form ~ input")，就会选择出标签 form 之后的所有 input 标签。
举例说明：

``` html
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( '#p-1' ).css( 'background-color','red' )
$( '.box-1' ).css( 'background-color','yellow' )
$( 'div *').css( 'background','silver' )
$( 'span, ul, li').css( 'background','blue' )
})
</script>
</head>
<body>
<div class="box-1">BOX-0</div>
<p id="p-1">段落-0</p>
<div>DIV-0</div>
<div class="box-1">
<span>
<p>
<ul>
<li> li </li>
<li> li </li>
<li> li </li>
</ul>
</p>
</span>
</div>
</body>
</html>
```

②过滤选择器：
—— 在 jquery 中所有的过滤选择器的书写都有一个特点，都以冒号开头。
:not() -- 在指定的元素当中排除某一个元素或某一类元素。
:eq() -- 按照指定的索引值进行过滤。 （注意程序中的索引值是从0开始的）
:gt() -- 过滤大于指定索引值的所有元素。
:lt() -- 过滤小于指定索引值的所有元素。
·注意：无论是大于还是小于，都不包含自己本身。
举例说明：

``` html
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( 'ul li:gt( 2 )' ).css( 'backgroundColor', 'blue' )
$( 'ul li:lt( 2 )' ).css( 'backgroundColor', 'red' )
$( 'ul li:eq( 2 )' ).css( 'backgroundColor', 'yellow' )
$( 'ul li:not( div )' ).css( 'width','300px')
$( 'div' ).css('backgroundColor','green')
})
</script>
</head>
<body>
<ul class="myul">
<li> li </li>
<li> li </li>
<li class="present"> li-0 </li>
<div>DIV</div>
<li> li </li>
<li> li </li>
<li> li </li>
<li> li </li>
<li> li </li>
<li> li </li>
</ul>
</body>
</html>
```

·有了基础选择器和几种重要的过滤选择器，手册剩余的大多数特效都能做出来，不过没有它们直接而已。
③筛选选择器：
—— 筛选选择器中有 3 个巨头选择器 -- 父子兄。
特点：所有的筛选选择器都是一个全新的函数的形式，所以它不会写在选择符号 $() 的内部，它是通过 . 语法写在之后；
父：parent() -- 选中当前元素的父级元素；
子：children() -- 选中当前元素的子集元素；小括号可以再次传递参数进行更精细的筛选；
兄：.siblings() -- 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选，选中当前元素所有的同级兄弟元素（不包含自己）。
·注意： $(this) 在和某元素绑定的事件当中使用，this 不需要分号包裹，会在绑定的同类元素中精准选择当前选定的元素。$(this) 之后可以接筛选选择器的类型。举例说明：


``` html
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( 'ul' ).click( function (){
$(this).css( 'backgroundColor','blue' )
$(this).children( '.present-1' ).css( 'backgroundColor','red' )
} );
$( 'li' ).click( function (){
$(this).parent( '.myul-3' ).css( 'border','px solid green' )
$(this).siblings( '.present-2' ).css( 'backgroundColor','yellow' )
} );
})
</script>
</head>
<body>
<ul>parent-0
<li> li </li>
<li> li </li>
<li class="present-1"> li-0 </li>
</ul>
<ul >parent-1
<li> li </li>
<li> li </li>
<li class="present-2"> li-1 </li>
</ul>
<ul class="myul-3">parent-2
<li> li </li>
<li> li </li>
<li> li-2 </li>
</ul>
</body>
</html>
```

——以上其实不用刻意去记，学会查手册，让时间选择出谁更重要：

2. 如何控制 HTML 属性？如何修改 HTML 属性？修改 HTML 属性有什么用？
——　attr('标签属性名称',"所对应的值')。原本没有某些属性的 HTML 标签，当绑定某个事件后，可以根据事件的触发与否来更改该标签的某些属性，实现所需效果。举例说明：

``` html
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
.box{ width:300px; height:80px; background:silver; border:2px solid blue; }
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( 'button' ).click( function(){
$(this).attr('class','box')
$(this).toggle(1000)
} );
$( 'ul li' ).mouseover( function(){
$(this).attr('class','box').show(500)
} );
$( 'ul li' ).mouseout( function(){
$(this).hide(1000)
} );
})
</script>
</head>
<body>
<button>BUTTON</button>
<ul>
<li>LI</li>
<li>LI</li>
<li>LI</li>
<li>LI</li>
<li>LI</li>
<li>LI</li>
</ul>
</body>
</html>
```

3. 为什么鼠标移开菜单后动画还没停止？如何停止？

——  Jquery 当中的动画和事件是遵循一个叫做排队机制的原理，也就是说如果一次触发执行了很多动画那么后面的动画不会自动替换前面的动画，而会一直排队等待执行，解决方法在执行动画之前用 stop() 函数来清空排队。
—— 默认 Jquery 在鼠标滑动过多少次就会执行多少次相关事件，如果很短时间内快速滑动很多次鼠标的话，每次滑动产生的事件就会累积起来，并排队等待执行。可以在执行事件之前清空排队 -- stop() 。

#### jQuery 案例

1. 如何用 Jquery 完成一个简单的下拉菜单？
—— _display:inline 前的 _ 是为了兼容 ie 6。.menu ul 和 .menu li 中的 position 设置也是为了兼容 ie 6。 代码如下：


``` html
<!doctype html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
*{ padding:0; margin:0; list-style:none; }
.menu{ width:550px; height:30px; margin:100px auto; background: url(bg.jpg); padding-left:10px; }
.menu li{ width:100px; height:30px; background:url(./image/drop_down_menu.png); line-height:30px; text-align:center; float:left; margin-right:10px; _display:inline; position:relative }
.menu ul{ position:absolute; left:0; top:30px; display:none; } 
</style>
<script type="text/javascript" src="./javascript/jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$( '.menu > li' ).mouseover( function (){
$( this ).children( ).stop().slideDown( 200 );
} );
$( '.menu > li' ).mouseout( function (){
$( this ).children( ).stop().slideUp( 300 );
} );
})
</script>
</head>
<body>
<ul class="menu">
<li>网络日志
<ul>
<li>读书笔记</li>
<li>人生经历</li>
<li>职业生涯</li>
</ul>
</li>
<li>编程语言
<ul>
<li>PHP</li>
<li>C</li>
<li>C++</li>
<li>Python</li>
<li>Javascript</li>
<li>Java</li>
</ul>
<li>二级标签
<ul>
<li>GFW</li>
<li>Open Source</li>
<li>Git/GitHub</li>
</ul>
</li>
<li>英文博客
<ul>
<li>博客镜像</li>
<li>编程随想</li>
<li>博客推荐</li>
</ul>
</li>
</ul>
</body>
</html>
```

2. 如何使用 Jquery 实现简单的图片切换功能？
—— 举例如下：

``` html
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
*{ padding:0; margin:0; list-style:none; border:0; }
.box{ width:320px; height:480px; margin:100px auto; position:relative; overflow:hidden } 
.box ul{ position:relative; z-index:1; }
.box ul li{ position:absolute; left:0; top:0; }
.box ol{ position:absolute; z-index:2; right:10px; bottom:10px; }
.box ol li{width:20px; height:20px; background:silver; border:1px solid black; font-weight:bold; text-align:center; line-height:20px; float:left; margin-left:10px; cursor:pointer; }
.box ol .present{ width:30px; height:30px; line-height:30px; border:1px solid #f60; color:#f60; margin-top:0; }
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
var count = 6 ;
$('img').css({'width':'320px', 'height':'480px'})
$( 'ol li' ).mouseover( function(){
$(this).attr( 'class', 'present' )
$(this).siblings().attr('class', '')
var num = $(this).index()
$( 'ul li' ) .eq( num ).css( 'left', '320px' )
count ++
$( 'ul li' ) .eq( num ).css( 'z-index', count )
$( 'ul li' ) .eq( num ).animate( { 'left':'0' }, 0 );
} );
})
</script>
</head>
<body>
<div class="box">
<ul>
<li><img src="0.jpg"/></li>
<li><img src="1.jpg"/></li>
<li><img src="2.jpg"/></li>
<li><img src="3.jpg"/></li>
<li><img src="4.jpg"/></li>
</ul>
<ol>
<li class="present">1</li>
<li>2</li>
<li>3</li>
<li>4</li>
<li>5</li>
</ol>
</div>
</body>
</html>
```

·修改图片为上下切换：

3. 什么是动态  CSS ？还有哪些实现动画的函数？
—— animate() 。没有时间参数，就不能产生动画。
·fadeIn() -- 
·fadeOut() -- 
·fadeToggle() -- 

4. 如何使用 Jquery 实现高亮显示图片？
—— 举例如下：

``` html
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
body { background:black; }
* { padding:0; margin:0; border:0; float:left; }
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$('img').css( {'width':'160px', 'height':'240px', 'padding':'5px', 'cursor':'pointer'} ) 
$('div').css( {'width':'510px', 'height':'500px', 'margin-top':'100px', 'margin-left':'400px' } ) 
$( 'img' ).mouseover( function (){
$(this).siblings().stop().fadeTo( 500, 0.2)
});
$( 'img' ).mouseout( function (){
$(this).siblings().stop().fadeTo( 500, 1)
});
})
</script>
</head>
<body>
<div class="box">
<img src="0.jpg"/>
<img src="1.jpg"/>
<img src="2.jpg"/>
<img src="3.jpg"/>
<img src="4.jpg"/>
<img src="5.jpg"/>
</div>
</body>
</html>
```

·优化：鼠标移至某张图片后图片成比例增大。

5. 如何使用 Jquery 实现商品展示？
—— 举例如下：

``` html
<html>
<head>
<meta http-equiv="content-type" content="text/html" charset="UTF-8">
<title>Jquery Demo</title>
<style type="text/css">
body,div,ul,li,span,button {padding:0;margin:0; list-style:none;}
.all {border:1px solid #000; width:600px; margin:80px auto; overflow:hidden; padding:10px;}
.all li {width:200px; height:24px; line-height:24px; float:left; text-align:center; cursor:pointer;}
.all span,button {display:block; width:80px; height:px; border:1px solid #000; clear:both; line-height:24px; text-align:center; margin:0 auto; cursor:pointer; background:url(bg.jpg) no-repeat 10px center;}
</style>
<script type="text/javascript" src="jquery-1.11.3.min.js"></script>
<script type="text/javascript">
$( function (){
$('button').hide()
var camera = $( 'li:gt( 2 ):not( :last )' )
camera.hide(500) ;
var sw = true;
$('span:eq(0)' ).click( function (){
camera.slideToggle(500);
$(this).hide()
$('button').show()
});
$('button').click( function (){
camera.slideToggle(500);
$(this).hide()
$('span').show()
});

})
</script>
</head>
<body>
<div class="all">
<ul>
<li>佳能</li>
<li>索尼</li>
<li>三星</li>
<li>尼康</li>
<li>松下</li>
<li>卡西欧</li>
<li>富士</li>
<li>柯达</li>
<li>宾得</li>
<li>理光</li>
<li>奥林巴斯</li>
<li>明基</li>
<li></li>
</ul>
<span>查看所有</span>
<button>收起所有</button>
</div>
</body>
</html>
```