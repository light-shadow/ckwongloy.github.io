---
layout: post
title: Bootstrap 3 分钟入门
category: Web
tags: [Bootstrap, Front-End]
latest: 2015年08月25日 17:19:48
---

Bootstrap 可以称为目前最火的前端框架，个人也比较喜欢。

现在把使用 Bootstrap 中最好需要遵守的规范和一些概念总结一下。

HTML5 标准模板
-

{% highlight HTML linenos %}
<!DOCTYPE html>
<html>
   <head>
      <title>Bootstrap 模板</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- 引入 Bootstrap -->
      <link href="http://apps.bdimg.com/libs/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet">

      <!-- HTML5 Shim 和 Respond.js 用于让 IE8 支持 HTML5元素和媒体查询 -->
      <!-- 注意： 如果通过 file://  引入 Respond.js 文件，则该文件无法起效果 -->
      <!--[if lt IE 9]>
         <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
         <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
      <![endif]-->
   </head>
   <body>
      <h1>Hello, world!</h1>

      <!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
      <script src="https://code.jquery.com/jquery.js"></script>
      <!-- 包括所有已编译的插件 -->
      <script src="js/bootstrap.min.js"></script>
   </body>
</html>
{% endhighlight %}

可以看到上面的代码中包含了 *jquery.js*、 *bootstrap.min.js* 和 *bootstrap.min.css*  3 个文件，它们用于让一个常规的 HTML 文件变为使用了 Bootstrap 的模板。

Bootstrap HTML编码规范
-

用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。

嵌套元素应当缩进一次（即两个空格）。

对于属性的定义，确保全部使用双引号，绝不要使用单引号。

不要在自闭合（self-closing）元素的尾部添加斜线 -- HTML5 规范中明确说明这是可选的。

不要省略可选的结束标签（closing tag）（例如，</li> 或 </body>）。

```
<!DOCTYPE html>
<html>
<head>
<title>Page title</title></head>
<body>
<img"images/company-logo.png""Company"<h1class"hello-world"Hello, world!</h1></body></html>
```

HTML5 doctype

为每个 HTML 页面的第一行添加标准模式（standard mode）的声明，这样能够确保在每个浏览器中拥有一致的展现。

```
<!DOCTYPE html><html><head></head></html>
```

根据 HTML5 规范：

强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。

更多关于 lang 属性的知识可以从 此规范 中了解。

这里列出了语言代码表。

```
<html"zh-CN"<!-- ... --></html>
```
IE 兼容模式

IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。

```
<metahttp-equiv"X-UA-Compatible"content"IE=Edge"
```

通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

```
<head><metacharset"UTF-8"</head>
```

引入 CSS 和 JavaScript 文件

根据 HTML5 规范，在引入 CSS 和 JavaScript 文件时一般不需要指定 type 属性，因为 text/css 和 text/javascript 分别是它们的默认值。

HTML5 spec links

```
<!-- External CSS --><link"stylesheet""code-guide.css"<!-- In-document CSS --><style>/* ... */</style><!-- JavaScript --><script"code-guide.js"></script>
```
尽量遵循 HTML 标准和语义，但是不要以牺牲实用性为代价。任何时候都要尽量使用最少的标签并保持最小的复杂度。

HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

1、class
2、id, name
3、data-*
4、src, for, type, href
5、title, alt
6、aria-*, role

class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。

```
<aclass"...""..."data-modal"toggle"
  Example link
</a><inputclass"form-control""text"<img"...""..."
```

布尔（boolean）型属性

布尔型属性可以在声明时不赋值。XHTML 规范要求为其赋值，但是 HTML5 规范不需要。

更多信息请参考 WhatWG section on boolean attributes：

元素的布尔型属性如果有值，就是 true，如果没有值，就是 false。

如果一定要为其赋值的话，请参考 WhatWG 规范：

如果属性存在，其值必须是空字符串或 [...] 属性的规范名称，并且不要再收尾添加空白符。

简单来说，就是不用赋值。

```
<input"text"disabled<input"checkbox"valuechecked<select><optionvalueselected</option></select>
```

### 减少标签的数量

编写 HTML 代码时，尽量避免多余的父元素。很多时候，这需要迭代和重构来实现。请看下面的案例：

```
<!-- Not so great --><spanclass"avatar"<img"..."</span><!-- Better --><imgclass"avatar""..."
```

### JavaScript 生成的标签

**通过 JavaScript 生成的标签让内容变得不易查找、编辑，并且降低性能**。能避免时尽量避免。

Bootstrap CSS 编码规范
-

1、用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。

2、为选择器分组时，将单独的选择器单独放在一行。

3、为了代码的易读性，在每个声明块的左花括号前添加一个空格。

4、声明块的右花括号应当单独成行。

5、每条声明语句的 : 后应该插入一个空格。

6、为了获得更准确的错误报告，每条声明都应该独占一行。

7、所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。

8、对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）。

9、不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。

10、对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）。

11、十六进制值应该全部小写，例如，#fff。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。

12、尽量使用简写形式的十六进制值，例如，用 #fff 代替 #ffffff。

13、为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。

14、避免为 0 值指定单位，例如，用 margin: 0; 代替 margin: 0px;。

15、对于这里用到的术语有疑问吗？请参考 Wikipedia 上的 syntax section of the Cascading Style Sheets article。

```
/* Bad CSS */selectorselectorsecondaryselector
padding
margin
backgroundcolorshadow#CCC,inset 0 1px 0 #FFFFFF/* Good CSS */selectorselectorsecondaryselector"text"
padding
marginbottom
backgroundcolorshadow#ccc, inset 0 1px 0 #fff;

```
相关的属性声明应当归为一组，并按照下面的顺序排列：

1、Positioning

2、Box model

3、Typographic

4、 Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

完整的属性列表及其排列顺序请参考 Recess。

+ declarationorder /* Positioning */

+ position absolute

+ right

+ bottomindex/* Box-model */

+ display blockfloat right

+ width100px

+ height100px/* Typography */ normal "Helvetica Neue"serifheight

+ color#333;align center/* Visual */

+ backgroundcolor#f5f5f5;

+ border solid #e5e5e5;

+ borderradius/* Misc */

+ opacity

不要使用 @import

与 <link> 标签相比，@import 指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题。替代办法有以下几种：

使用多个 <link> 元素

通过 Sass 或 Less 类似的 CSS 预处理器将多个 CSS 文件编译为一个文件

通过 Rails、Jekyll 或其他系统中提供过 CSS 文件合并功能

请参考 Steve Souders 的文章了解更多知识。

```
<!-- Use link elements --><link"stylesheet""core.css"<!-- Avoid @imports --><style>@import"more.css"</style>
```

媒体查询（Media query）的位置

将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。下面给出一个典型的实例。

```
element elementavatar elementselected @mediawidth480pxelement elementavatar elementselected 
```

带前缀的属性

当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑。

在 Textmate 中，使用 Text → Edit Each Line in Selection (⌃⌘A)。在 Sublime Text 2 中，使用 Selection → Add Previous Line (⌃⇧↑) 和 Selection → Add Next Line (⌃⇧↓)。

```
/* Prefixed properties */selector webkitshadowshadow
```

单行规则声明

对于只包含一条声明的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。

这样做的关键因素是为了错误检测 -- 例如，CSS 校验器指出在 183 行有语法错误。如果是单行单条声明，你就不会忽略这个错误。

如果是单行多条声明的话，你就要仔细分析避免漏掉错误了。

```
/* Single declarations on one line */span1  widthspan2  width140pxspan3  width220px/* Multiple declarations, one per line */sprite 
  displayinlineblock
  width
  height
  backgroundimagesprite backgroundposition backgroundpositionaccount    backgroundposition
```

简写形式的属性声明

在需要显示地设置所有值的情况下，应当尽量限制使用简写形式的属性声明。常见的滥用简写属性声明的情况如下：

+ padding
+ margin
+ font
+ background
+ border
+ border-radius

大部分情况下，我们不需要为简写形式的属性声明指定所有值。例如，HTML 的 heading 元素只需要设置上、下边距（margin）的值。

因此，在必要的时候，只需覆盖这两个值就可以。过度使用简写形式的属性声明会导致代码混乱，并且会对属性值带来不必要的覆盖从而引起意外的副作用。

MDN（Mozilla Developer Network）上一片非常好的关于shorthand properties 的文章，对于不太熟悉简写属性声明及其行为的用户很有用。

```
/* Bad example */element 
  margin
  background
  background"image.jpg"
  borderradius/* Good example */element 
  marginbottom
  backgroundcolor
  backgroundimage"image.jpg"
  borderradius
  borderrightradius
```

Less 和 Sass 中的嵌套

避免非必要的嵌套。

这是因为虽然你可以使用嵌套，但是并不意味着应该使用嵌套。只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套。

```
// Without nestingtable  thead table  thead // With nestingtable  thead 
```

代码是由人编写并维护的。请确保你的代码能够自描述、注释良好并且易于他人理解。好的代码注释能够传达上下文关系和代码目的。不要简单地重申组件或 class 名称。

对于较长的注释，务必书写完整的句子；对于一般性注解，可以书写简洁的短语。

```
/* Bad example *//* Modal header */modalheader /* Good example *//* Wrapping element for .modal-title and .modal-close */modalheader 
```

class 命名

class 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn 和 .btn-danger）。

避免过度任意的简写。.btn 代表 button，但是 .s 不能表达任何意思。

class 名称应当尽可能短，并且意义明确。

使用有意义的名称。使用有组织的或目的明确的名称，不要使用表现形式（presentational）的名称。

基于最近的父 class 或基本（base） class 作为新 class 的前缀。

使用 .js-* class 来标识行为（与样式相对），并且不要将这些 class 包含到 CSS 文件中。

在为 Sass 和 Less 变量命名是也可以参考上面列出的各项规范。

```
/* Bad example */header /* Good example */tweet important tweetheader 
```

对于通用元素使用 class ，这样利于渲染性能的优化。
对于经常出现的组件，避免使用属性选择器（例如，[class^="..."]）。浏览器的性能会受到这些因素的影响。
选择器要尽可能短，并且尽量限制组成选择器的元素个数，建议不要超过 3 。
只有在必要的时候才将 class 限制在最近的父元素内（也就是后代选择器）（例如，不使用带前缀的 class 时 -- 前缀类似于命名空间）。

扩展阅读：

```
/* Bad example */container #stream .stream-item .tweet .tweet-header .username { ... }avatar /* Good example */avatar tweetheader username tweet avatar 
```

以组件为单位组织代码段。
制定一致的注释规范。
使用一致的空白符将代码分隔成块，这样利于扫描较大的文档。
如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动。

```
/*
 * Component section heading
 */element /*
 * Component section heading
 *
 * Sometimes you need to include optional context for the entire component. Do that up here if it's important enough.
 */element /* Contextual sub-component or modifer */elementheading 
```

### 编辑器配置

将你的编辑器按照下面的配置进行设置，以避免常见的代码不一致和差异：

用两个空格代替制表符（soft-tab 即用空格代表 tab 符）。

保存文件时，删除尾部的空白符。

设置文件编码为 UTF-8。

在文件结尾添加一个空白行。

参照文档并将这些配置信息添加到项目的 .editorconfig 文件中。例如：Bootstrap 中的 .editorconfig 实例。更多信息请参考 about EditorConfig。

HTML 5 文档类型
-

如果在 Bootstrap 创建的网页开头不使用 HTML5 的文档类型（Doctype），您可能会面临一些浏览器显示不一致的问题，甚至可能面临一些特定情境下的不一致，以致于您的代码不能通过 W3C 标准的验证。

```
<!DOCTYPE html>
<html>
....
</html>
```

移动设备优先
-

Bootstrap 3 的设计目标是移动设备优先，然后才是桌面设备。这实际上是一个非常及时的转变，因为现在越来越多的用户使用移动设备。

为了让 Bootstrap 开发的网站对移动设备友好，确保适当的绘制和触屏缩放，需要在网页的 head 之中添加 viewport meta 标签，如下所示：

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

width 属性控制设备的宽度。假设您的网站将被带有不同屏幕分辨率的设备浏览，那么将它设置为 device-width 可以确保它能正确呈现在不同设备上。

initial-scale=1.0 确保网页加载时，以 1:1 的比例呈现，不会有任何的缩放。

在移动设备浏览器上，通过为 viewport meta 标签添加 user-scalable=no 可以禁用其缩放（zooming）功能。

通常情况下，maximum-scale=1.0 与 user-scalable=no 一起使用。这样禁用缩放功能后，用户只能滚动屏幕，就能让您的网站看上去更像原生应用的感觉。

注意，这种方式我们并不推荐所有网站使用，还是要看您自己的情况而定！

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

响应式图像
-

```
<img src="..." class="img-responsive" alt="响应式图像">
```

通过添加 img-responsive class 可以让 Bootstrap 3 中的图像对响应式布局的支持更友好。
接下来让我们看下这个 class 包含了哪些 css 属性。
在下面的代码中，可以看到img-responsive class 为图像赋予了 max-width: 100%; 和 height: auto; 属性，可以让图像按比例缩放，不超过其父元素的尺寸。
.img-responsive {
display: inline-block;
height: auto;
max-width: 100%;
}
```

这表明相关的图像呈现为 inline-block。当您把元素的 display 属性设置为 inline-block，元素相对于它周围的内容以内联形式呈现，但与内联不同的是，这种情况下我们可以设置宽度和高度。
设置 height:auto，相关元素的高度取决于浏览器。
设置 max-width 为 100% 会重写任何通过 width 属性指定的宽度。这让图片对响应式布局的支持更友好。

全局显示、排版和链接
-

基本的全局显示

Bootstrap 3 使用 body {margin: 0;} 来移除 body 的边距。

请看下面有关 body 的设置：

```
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.428571429;
  color: #333333;
  background-color: #ffffff;
}
```

第一条规则设置 body 的默认字体样式为 "Helvetica Neue", Helvetica, Arial, sans-serif。

第二条规则设置文本的默认字体大小为 14 像素。

第三条规则设置默认的行高度为 1.428571429。

第四条规则设置默认的文本颜色为 #333333。

最后一条规则设置默认的背景颜色为白色。

排版

使用 @font-family-base、 @font-size-base 和 @line-height-base 属性作为排版样式。

链接样式

通过属性 @link-color 设置全局链接的颜色。

对于链接的默认样式，如下设置：

```
a:hover,
a:focus {
  color: #2a6496;
  text-decoration: underline;
}

a:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
```

所以，当鼠标悬停在链接上，或者点击过的链接，颜色会被设置为 #2a6496。同时，会呈现一条下划线。

除此之外，点击过的链接，会呈现一个颜色码为 #333 的细的虚线轮廓。另一条规则是设置轮廓为 5 像素宽，且对于基于 webkit 浏览器有一个 -webkit-focus-ring-color 的浏览器扩展。轮廓偏移设置为 -2 像素。

以上所有这些样式都可以在 scaffolding.less 中找到。

容器 ( Container )
-

```
<div class="container">
  ...
</div>
```

Bootstrap 3 的 container class 用于包裹页面上的内容。让我们一起来看看 bootstrap.css 文件中的这个 .container class。

```
.container {
   padding-right: 15px;
   padding-left: 15px;
   margin-right: auto;
   margin-left: auto;
}
```

通过上面的代码，把 container 的左右外边距（margin-right、margin-left）交由浏览器决定。

请注意，由于内边距（padding）是固定宽度，默认情况下容器是不可嵌套的。

```
.container:before,
.container:after {
  display: table;
  content: " ";
}
```

这会产生伪元素。设置 display 为 table，会创建一个匿名的 table-cell 和一个新的块格式化上下文。:before 伪元素防止上边距崩塌，:after 伪元素清除浮动。

如果 conteneditable 属性出现在 HTML 中，由于一些 Opera bug，围绕上述元素创建一个空格。这可以通过使用 content: " " 来修复。

```
.container:after {
  clear: both;
}
```

它创建了一个伪元素，并确保了所有的容器包含所有的浮动元素。

Bootstrap 3 CSS 有一个申请响应的媒体查询，在不同的媒体查询阈值范围内都为 container 设置了max-width，用以匹配网格系统。

```
@media (min-width: 768px) {
   .container {
      width: 750px;
}
```