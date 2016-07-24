---
layout: post
title: Web、HTML 入门
category: Web
tags: [Web, HTML, 浏览器]
latest: 2015年03月01日 12:18:44
---

#### Web

1. 什么是浏览器？有什么用？
   —— 一个软件。浏览器响应浏览者的某些操作 -- 打开网址，点击链接，点击按钮等，然后替浏览者去 Web 服务器请求网页内容，并以 HTML 格式返回，然后展现出人能够理解的可视化内容。

2. 什么是 ACID 兼容性测试？
   —— 满分 100 分。现有三类测试：
   ·ACID1 -- 最初被称为盒模型酸试验，是一个用于测试浏览器的网页。它在1998年10月开发，成为了衡量早期浏览器兼容性的重要准线，特别是浏览器对层叠样式表1.0的支持情况。就像用酸试验来迅速并直观的衡量一块金属的质量好坏，网页酸试验的目标是提供一个可以清楚地表明浏览器的是否遵守网页标准的方法；
   ·ACID2 -- 是针对网页浏览器及设计软件，就支持HTML、CSS 2.0及PNG图像标准的综合测试；
   ·ACID3 --  由网页标准计划小组（Web Standards Project，WaSP）设计，是一份网页浏览器及设计软件之标准兼容性的测试网页，于 2008年3月3日正式发布[1]。其测试焦点集中在ECMAScript、DOM Level 3、Media Queries和data: URL。以浏览器打开此测试网页后，页面会不断加载功能、直接给予分数，满分为100分。

3. 什么是 DOM？
   —— 文档对象模型。

4. 为什么网页兼容性一直是个头疼的问题？如何测试网页的兼容性？
   —— 浏览器的实现不一样。同一网页不同浏览器或同一浏览器的不同版本的显示效果往往都不一样。
   —— ietester -- 只能测试各版本 IE ，DW -- 可以测试各种浏览器。

5. 有哪些浏览器？有什么特点？什么是多核浏览器？
   ·基于 IE 内核的浏览器有：IE，遨游，360，世界之窗，搜狗浏览器等。
   ·基于 WebKit 引擎（开源）的浏览器有：Chrome，Safari（Windows 平台也有但是表现效果很差），IE9。
   ·多核浏览器：只是简单的转换已经存在的浏览器内核控件而已。

6. 开发一个浏览器简单吗？
   —— 简单。可以用 WebBrowser 控件开发一个自定义的浏览器，只需修改界面就行了。Trident 引擎其实就是 IE 的 WebBrowser 控件。

7. 什么是静态页面？什么动态页面？
   ·静态页面：服务器上本就保存有的 HTML 页面。
   ·动态页面：服务器上没有浏览者要看的内容，是服务器动态生成并返回给浏览器的 HTML 页面。C#,VB.NET,PHP,JAVA,C 等都可以编写动态页面。

8. 网页开发工具有哪些？开发人员应该如何选择开发工具？
   —— 注意编写普通的 HTML 页面和任何语言都无关。有 Dreamweaver，Expression Web（FrontPage 的改头换面版本）等工具，这些工具主要是给美工写的，开发人员主要用 Visual Studio 等工具写，因为开发人员不强制要求具有高美工水平。开发人员的任务一般是写功能/结构，美工主要写界面模板，两者结合是一般网页程序的流程。

#### HTML

1. HTML 颜色体系中，写颜色单词和写 RPG 的组合有什么区别？如何获得某种颜色的 RPG 组合？
   —— 单词代表的颜色数量是比较少的，而 RPG 组合可以选择几乎所有的颜色。
   —— 使用屏幕拾色器可以获取想要的某些颜色。
2. XHTML 和 XML 和 HTML 有什么区别？
   —— XHTML 是符合 XML 语法规范的 HTML。具体不同的地方有：
   ·属性值 -- HTML 中属性值可以用单引号括起来，也可以用双引号括起来，甚至不用引号括起来（不推荐），单双要配对。
   ·注释：HTML 要使用和 XML 一样的 <!-- 注释内容 --> 来做注释。
   ·特殊字符：HTML 中，<，> 是有特殊含义的，空格是不会被显示的，所以需要特殊符号，相当于 \n 转义字符 。`&lt;` -- less than，小于符号；`&gt;` -- greater than，大于符号；`&nbsp;` -- no-break space ，空格，因为 HTML 中经常有缩进，如果把缩进的空格形式展现的话，排版会很麻烦。`<hr>` -- 横线。
   ·格式标签：`<p></p>` -- 创建段落；`<br/>` -- 回车，也可以写成 `<br>`，在 HTML 中有一些标签可以不关闭，`<br>` 就是其中一个，这是和 XML 不同的地方，但是为了遵循 XHTML 规范，推荐像 XML 一样严格关闭；
3. 如何校验所写的页面是否符合 W3C 规范？
   —— 到 W3C 网站提交页面测试。
4. HTML 基本组成还有哪些？
   ·文字格式：`<p>` 和 `<br/>` 的区别是前后的空白多少 -- `<p>`（段落）比 `<br/>`（两行） 空白多。`<h1>` ~ `<h6>`。
   ·超链接/URL：URL 是资源在网络中的位置。URI -- Uniform Resource Identifer，统一资源标识符，是一个标识某一互联网资源名称的字符串。
5. URL 使用举例：`<a href="url"><img src="url"/></a>`。`<a>` 标签有很多属性，将 `<a>` 的 target 属性设定为 "_blank" 就可以在新窗口中打开超链接（国内许多网站的做法）；`<a>` 的 name 属性可以用于页内跳转。举例如下：

``` html
<html>
<head>
<meta charset="utf-8" />
</head>
<a href="#last" target="_blank">转到最后</a>
<p>P</P>
<h1>此处省略一万行</h1>
<p>P</P>
<a name="last">这是最后</a>
</html>
```

·相对 URL：表示相对于当前文档的资源。/ 表示网站根目录，../ 表示父目录，../../  表示父目录的父目录，./ 或者不写任何斜线表示相对于当前路径（当前 HTML 文件的所在路径）的目录。站内资源的引用最好使用相对 URL，这样域名、目录改变了网站资源的引用都不受影响。
·图片：`<img src="" />`。注意 HTML 中保存图片都是保存图片的链接，如果链接不在了，就看不了图片。`<img>` 的 alt 属性为图片无法显示时的显示文本，鼠标方式去也会有悬浮提示 "点击查看大图" ；建议都指定图片的大小，因为加载网页的顺序是先加载 HTML 文本，预设边框大小可以防止图片过大等加载完成时撑破页面结构。注意，需要做缩略图的时候不要只是用 width/height 属性，因为这只是设置了图片的显示大小而不是加载的大小，最终下载的图片大小还是原图大小，所以使用 width/height 设置缩略图是没有多大意义的，同时也增加带宽负担，可以将要做的缩略图片用图片制作工具更改大小/分辨率后再使用，Windows 自带的画图工具也可以。
·列表/表格：标签是 `<ul>` -- unordered list; `<li>` -- list; `<ol>` --ordered list。`<table>` -- 表格；`<thread>` -- 表头，也可以用 `<th>` 代替，这样会使表头粗体，居中显示；`<tr>` -- 行；`<td>` -- 单元格。属性有 align -- 水平位置 ，如 left/right/center；valign -- 垂直位置，如 top/middle/bottom；rowspan -- 合并行单元格；colspan -- 合并列单元格。子标签默认继承父标签的属性，但如果子标签单独指定了属性，则会覆盖父类的属性。
·表单：表单标签 `<form>` 是用来提交数据至服务器的。表单属性有 action -- 表单数据的提交对象，即要处理表单数据的对象，如 .PHP/.ASPX；method -- 表单数据的提交方式，如 POST/GET。表单内的标签有 `<input>` --` <input>` 标签的属性有 type（
text -- 有 size/value/maxlength/readonly 等二级属性，其中 readonly 也是 readonly 的属性值之一，所以可以只写一个 readonly 来表示已经为 readonly 属性设置了readonly 属性值了，但不推荐这样写，因为不符合规范。设置此属性值后文本框中的文本便不能更改/
checkbox -- 复选框，有 checked 属性，其值有 checked，同 readonly/
radio -- 单选框，相同 name 属性的为一组，可设置不同的 value 属性值，这样通过取指定的 name 值就知道选中的对象是谁/
button/
hidden -- 隐藏按钮，多用于动态页面/
image -- 可做成图片按钮/
password/
reset -- 清空所选/写内容/
file -- 打开计算机文件，可用于文件上传，注意当 type 为 file 时，form 的 enctype 必须设置为 multipart 或 form-data，并且提交方式为 POST/
submit -- 表单提交按钮，可以设置其 value 属性值为提交按钮的显示文本。
）；
`<select>` -- 用于创建下拉列表或是列表框 ；如果其 size 属性大于 1 则就是列表框，否则就是下拉列表框。此外，如果其 multiple 属性的值为 multiple 则也代表可多选的列表框，如果有二级标签 `<option>`，则也代表下拉列表框。`<option>` 标签有 selected 属性，它有且仅有一个值：selected。value 属性几乎每个 HTML 标签都有，所以也可以给 `<option>` 标签设置 value 值，多用于 DOM 编程。可以用 `<optgroup>` 二级标签将多个 `<option>` 标签组包裹起来，实现 `<select>` 标签分组，分组名用 label 属性值指定。
`<testarea>`  -- 多行文本，也是表单元素。可以用 cols/rows 属性表示行数和列数；`<label>` -- 在 `<input type="text" />`前可以写一些普通文本来修饰，但在单击修饰文本的时候 input 并不会得到焦点，所以用 `<label>` 来实现。`<label>` 标签的属性 for 的属性值指定要修饰的控件 id。使用举例：

``` html
<meta charset="utf-8">
姓名<input id="username" type="text" />
婚否<input id="married" type="checkbox" />
<hr>
<label for="username">姓名</label><input id="username" type="text" />
<label for="married">婚否</label><input id="married" type="checkbox" />
```

`<filedset>`  -- 将一组控件包裹起来，并用 `<legend>` 为其指定名字 。举例如下：

``` html
<meta charset="utf-8">
<fieldset>
<legend><strong>Fieldset Below</strong></legend>
<input type="text" value="Text Here" />
<input type="checkbox" checked="checked" /> &lt;- The checkbox is checked already.
<input type="button" value="Button" />
<input type="submit" value="Submit" />
</fieldset>
```

