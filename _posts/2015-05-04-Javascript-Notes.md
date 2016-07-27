---
layout: post
title: Javascript 学习笔记
category: Javascript
tag: Javascript
latest: 2015年05月05日 20:56:32
---


#### 基础笔记

- 为什么要学习 Javascript ？

Javascript 是实现网页动态效果的基石，在 Web 开发中扮演重要的角色，也是 Ajax/Jquery/extjs 等框架的基础。Javascript 最主要的目的就是使网页中的元素可以被编程，也就是让网页动起来。只要是鼠标的响应，键盘的响应，Javascript 都可以监听到。

- Javascript 主要有哪些有应用领域？

网页游戏；地图搜索（Google/Baidu）；股市信息查询；Web 聊天等。（比如对 Google 地图提供的 API 进行编程就可以将 Google 地图的搜索结果展示到自己的应用当中）

- 什么是正则表达式？正则表达式有什么作用？

从格式上对字符串进行验证，比如邮箱，手机号码，身份证号等。

- 什么是 Javascript ？Javascript 的发展简史？

一种广泛用于客户端 Web 开发的脚本语言。Javascript 只能用于 B/S 开发，即 Web 开发（网站开发/Web 应用）。 完整的 JavaScript 实现是由以下 3 个不同部分组成的：ECMAScript、文档对象模型、浏览器对象模型。 
Javascript 最早叫做 Livescript ，是一种基于对象和事件驱动，并具备安全性的脚本语言，是由 Netscapce 公司（蒂姆·伯纳斯·李）于 1996 年开发的，后和 Sun 公司合作（之前有微软寻求合作但网景公司没有同意，后来微软自家开发了一个与 Javascript 相似度高达 99% 的 jscript 语言），于是将 Livescript 更名为 Javascript。发展初期，JavaScript的标准并未确定，同期有网景的JavaScript，微软的JScript和CEnvi的ScriptEase三足鼎立。1997年，在ECMA（欧洲计算机制造商协会）的协调下，由Netscape、Sun、微软、Borland组成的工作组确定统一标准：ECMA-262。

- Javascript 的执行原理是怎样的？

浏览器先去请求网页，请求成功后通过网络将网页代码下载到浏本地，然后浏览器再去执行该网页代码。

- 脚本语言和标记语言/编译语言(开发语言)等有什么联系和区别？

脚本语言的特点：
①功能介于 HTML 和 C/C++/JAVA/C# 等编程语言之间。单独使用脚本语言并没有多大意义，脚本语言几乎都与其他语言混合使用，如 Javascript 就需要配合 HTML/JSP/PHP/ASP/ASP.NET 等才有实际意义。
②也有编程语言具有的变量，函数，流程控制等基本概念。只不过编程语言的语法和规则更为复杂和严格一些。 
③脚本语言实际上是解释性语言。如 Python/Vbscript/Javascript 等， 不像 C/C++ 可以编译成二进制代码然后由操作系统执行，而是直接以可执行性文件的形式存在，即在执行的时候直接对源码进行执行。（这样可以在一定程度上减轻服务器的压力）
④脚本语言一般都有响应的脚本引擎来解释执行，如 Javascript 的脚本引擎是浏览器中的 Javascript 引擎。（PS:.Java -> .class -> jvm ） 

- 解释性语言和编译性语言有什么区别？

执行的时候直接对源码进行执行的语言就是解释性语言。需要先将源码编译成中间代码，然后执行中间代码的语言就是编译性语言。

- 浏览器发展历史？为什么很多互联网公司都要抢占浏览器市场？

利益驱使，比如首页带来的广告利润，数据隐私性要求等。

- 为什么 Javascript 脚本在服务器端下载到本地运行时候不会安全提示，而直接在计算机本地执行 Javascript 代码却回报危险警告？

因为 Javascript 可以对本机文件进行操作，因此会带来一定的危险。而从服务器端下载来的 Javascript 代码可以看出已经在服务器上执行过的，所以相对可靠。

- 如何将内网 ip 映射成公网 ip ？

花生壳。基本原理大致是，花生壳在互联网上有一些公网 ip ，需要访问外网的内网 ip 首先连接到花生壳的公网 ip，然后通过花生壳的公网 ip 连接到互联网。在整个过程中花生壳软件充当了一个数据转发的桥。

- Javascript 开发工具？Javascript 帮助文档？

Visual Studio / eclipse 等。但是为了提升代码感和为面试做准备，初学时要使用普通编辑器即可。
w3cschool.chm 和 javascript.chm 。

- Javascript 的特点？

①动态（基于对象和事件驱动）：直接对客户操作进行相应，无需经过 Web 服务器。所为事件驱动，就是指在主页中执行了某种操作所产生的动作，就称为"事件"，比如按下鼠标、移动窗口、选择菜单等。当事件发生时就可能引起相应的事件响应。
②跨平台：Javascript 依赖于浏览器本身，与操作系统环境无关，只要能运行浏览器的计算机就可以执行 Javascript 代码。

- JS 程序的基本写法有哪些？

① JS 代码一般放在 HTML 的 HEAD 标签中，但实际也可以放在其他地方。但必须用如下标签包裹起来：
<script language="javascript"></script>。如果没有包裹，则 Javascript 代码会被浏览器当作文本输出。
②在一个 HTML 文件中，可以出现多对 <script></script> 片段。浏览器会按照先后顺序依次执行。

- Javascript 的基本语法有哪些？

①变量的定义：var variable_name;  不管数据实际类型是什么都这么定义，因为 JS 是弱类型语言，也是动态语言（变量数据类型可以根据代码写法而动态改变），即在定义变量的时候无需指定其类型，统一使用 var 或什么都不写。但还是存在数据类型。 JS 的变量类型的决定是由 JS 引擎决定的。
②字符串的拼接：使用加号 + 。
③函数：JS 中有很多对象，每个对象有很多方法，详见手册。

（标记语言一律不区分大小写；保留字是目前没有启用的关键字）
④数据类型：JS 的数据类型也是客观存在的。也分为基本数据类型 -- 数值（其中特殊的数值类型有：NaN/isNoN()/infinity/isFinite()）/字符串（单字母和空都被当作字符串处理；某些特殊字符 -- 引号/特殊功用的字母等 的使用需要用转义符来转义）/布尔型；复合类型 -- 数组/对象；特殊类型 -- null/undefine。 当变量没有没有定义或者定义了没有赋值都会出现 undefine 报错。
可以通过 typeof 来确定变量的数据类型：window.alert("type is" + typeof variable_name ) ;
⑤运算符：算术运算符有：+ -- 如果有字符串则就是拼接，如果是都是数，则就是相加；-；*；/；% -- 取模，常用语判断是否能够整除；++ ；-- ；+=；-=；/=；%=；关系运算符有：==；>; < ; >=; <=; !=; 举例：

``` js
<script language="javascript">
var v1 = window.prompt( "v1=" ) ;
var v2 = window.prompt( "v2=" ) ;
document.writeln( "v1+v2=" + ( parseFloat(v1) + parseFloat(v2) ) ) ;
document.writeln( v1+v2 ) ;
</script>
```

·注意：当不适用 `praseFloat()` 函数时，将会当作字符串输出而不会被当作数运算；当 == 两边的数据类型不一致的时候，会强制转化（praseInt() ），但不会转换成 ascii 码。

逻辑运算符有：&& ; || ; ! 。当 && 运算符前面为假时，&& 后面的运算不会执行；当 || 运算符前面的为真时后面的运算不再执行，此外， || 将返回第一个不为 false 的值（或对象），或者是返回最后一个值（如果全都是 false ）；|| 返回的不一定都是布尔值。（在逻辑运算中，0/false/null/undefine/ NaN/"" 都表示 false，其他都是真，包括对象）
位运算和移位运算: 规范同 C/Java 。 >> -- 位右移； << -- 位左移。

⑥流程控制：顺序控制 -- 不加以流程控制的就是顺序控制；分支控制 -- 分为单分支和多分支，其中多分支流程中名，一旦找到一个满足条件的入口，执行完毕之后，就直接结束这个多分支。
·注意：break 的作用是跳出整个 switch 语句，而如果每个 case 语句之后没有 break 则匹配上条件后不会跳出 switch 语句而会继续顺序执行下一个 case 语句。switch 语句的数据类型可以是 JS 支持的所有数据类型（包括变量本身，数组和对象除外）；循环控制 -- for() / while()/do{}while()，流程图中菱形代表判断。具体区别同C。举例如下 -- 连加求和和阶乘求和：

``` js
<script language="javascript">
var n = window.prompt( "n=" ) ;
n = parseInt( n ) ;
var res1 = 0 ;
for ( var i=1; i<=n; i++){
res1 += i ;
}
document.writeln( "res1=" + res1 ) ;
var res2 = 0 ;
var temp = 1 ;
for (var i=1; i<=n; i++ ){
for (var j=1; j<=i; j++){
temp *= j ;
}
res2 += temp ;
temp = 1 ;
}
document.writeln( "res2=" + res2 ) ;
</script>
```

- 如何在浏览器中调试 Javascript ？

Javascript 最麻烦的就是调试。所为调试就是指一步一步的执行程序。在 ie8 中，可以通过工具对 Javascript 进行调试，尤其页面比较复杂的情况下，很有用。步骤如下：①在 IE - 工具 -Internet 选项 - 高级 中取消禁止脚本调试。
②打开开发人员工具，双击所在行可以下断点。（删除断点只要找到断点右键选择删除即可）
③执行程序，在开发人员工具的脚本页面会出现变量的信息。选择逐句执行（F11），即可开始调试，观察变量和流程的变化来找出程序可能出现的问题。（也可以选择逐过程执行 -- F10，即一个函数一个函数，把一个函数当作一条语句来执行）
·shift + f11 ：跳出函数；f5 : 跳至下一个断点。

·firefox 的 js 调试工具：firebug。

- 如何在 Javascript 中实现一些基本算法？

- 金字塔/菱形的打印：

``` js
<script language="javascript">
var n = window.prompt() ;
/* - 金字塔 */
for ( var i=1; i<=n; i++ ) {
for ( var j=1; j<=n-i; j++ ) {
document.write( "&nbsp" ) ;
}
for ( var j=1; j<=( 2*i-1 ); j++ ) {
document.write( "*" ) ;
}
document.write( "<br/>" ) ;
}
/* - 空心金字塔 */
for ( var i=1; i<=n; i++ ) {
for ( var k=1; k<=n-i; k++ ) {
document.write( "&nbsp" ) ;
}
for ( var j=1; j<=( 2*i-1 ); j++ ) {
if ( i==n || j==1) {
document.write( "*" ) ;
}else if ( j==( 2*i-1 ) ) {
document.write( "*" ) ;
}else{
document.write( "&nbsp" ) ;
}
}
document.write( "<br/>" ) ;
}
/* - 菱形 */
for ( var i=1; i<=n; i++ ) {
for ( var j=1; j<=n-i; j++ ) {
document.write( "&nbsp" ) ;
}
for ( var j=1; j<= 2*i-1; j++ ) {
document.write( "*" ) ;
}
document.write( "<br/>" ) ;
}
//菱形下半部分
/* - 空心菱形 */
</script>
```

显示结果在 chrome 和 ie 上显示不一样。

- 为什么在写 javascript 脚本的时候会建议 `language="javascript"` 和 `type="text/javascript"` 都写上？

兼容性。低版本浏览器可能不会识别 type ，高版本浏览器可能不会识别 langeuage。此外，将 javascript 代码写在下列标记中也是可以的：

``` js
<script language="javascript" type="text/javascript">
<!--
// javascript 代码
//-->
</script>
```

- 函数的必要性？什么是函数？函数的分类有哪些？ Javascript 中常用的系统函数有哪些？

提高代码的封装性和复用性。函数就是可以完成某个功能的指令集合，也叫方法。函数分为系统函数（全局函数和对象内置函数）和自定义函数，还有库函数，详细使用查看手册，本质都是一样。常用的系统函数有：
①eval(string): 把字符串当作脚本执行。
②parseInt（string）:解析一个字符串为 int 型。
③escape(string): 对某个字符串进行编码，以便在计算机上输出，常用于对中文的编码。对应的函数是 unescape()，它们经常配对使用，从而防止乱码。
④toFixed()：保留小数点后指定位数。

- Javascript 写自定义函数有哪些 注意事项？
①参数： 函数括号内的形参前面不能写 var。参数传递时对应的数据类型要一致。否则 JS 引擎统一当作字符串处理。JS 中的参数可以是多个，并且参数个数可变、数据类型任意。因为 JS 中内置一个 arguments 系统数组，自动处理了与函数参数相关的问题。详见手册。
②返回值：函数可以有返回值，也可以没有返回值。根据需要设置。
③函数的调用及引入：传统上，调用内部函数直接写函数名即可，还有一种调用函数的方式是，将函数赋值给一个变量，通过引用变量来引用函数，此时变量就充当了指针的作用，在 C/C++ 中，该变量就是该函数的地址，但在 JS 中，并不是实际的地址而是地址内部的内容。如果在将函数赋给某个变量时，函数括号内带有参数，则相当于将函数的返回值赋给了该变量，此时如果函数是有返回值的，则正常输出，而如果没有返回值，则 JS 会提示 undefine。（其他语言可能回报错）
外部文件内的函数的调用时需要先把文件引入到要调用该函数的文件中，如 html/php/jsp，在 html 中引入 js 函数文件的关键代码是：<script language="javascript" src=""></script>。注意引入 js 代码需单独一行<script> 标签，本页面的 js 代码需要在另外的 <script> 标签中填写。
④js 不支持重载，因此不能根据参数的不同来区分不同功能的函数，因为 js 不关心函数参数而只关心函数名。
⑤js 支持动态创建函数。（闭包，面向对象）

- JS 中函数的执行原理是怎样的？在内存中是什么情况？

以一个简单的递归函数来说明：

``` js
<script language="javascript">
<!--
function f ( v ) {
if( v > 3 ){
f( --v ) ;
}
document.writeln(v) ;
}
f( 5 ) ;
//-->
</script>
```

- 栈和堆各有什么作用？

栈区通常用来存放基本数据类型的变量。堆区常用来存放对象/数组。堆中有栈？

- 为什么需要数组？什么是数组？JS 中的数组有什么特点？
数组可以存放多个数据。数组也是一种数据类型，又叫做引用类型/复合类型/复杂类型，用于存放一组数据。JS 中数组的特点有：
①同一个数组中可以放任何数据类型的数据。
②数组大小可以动态增长（ C#/Java 的数组不可以直接改变大小 ），类似于 Java 的 ArrayList；示例代码：

``` js
<script type="text/javascript">
<!--
var a = [ 1, 2 ] ;
document.writeln( "Old array size :" + a.length + "<br/>") ;
a[ 2 ] = 3 ;
document.writeln( "New array size :" + a.length ) ;
//-->
</script> 
```

③数组的下标可以使用字符串。详见后文。
④数组名可以理解为指向数组首地址的引用：

``` js
<script type="text/javascript">
<!--
var arr = [  1, 2, 3] ;
arr[ 'test' ] = 4 ; 
document.writeln( arr ) ;
//-->
</script>
```

·注意：当数组的下标不是数字而是字符串的时候，使用 document.wirteln( array_name ) 不能输出 下标为字符串的内容，只有具体应用的时候才可以引用到。
·数组的下标从 0 开始。

- JS 中数组是怎么使用的？数组在内存中是如何实现的？
从程序的角度去看，内存有代码区，数据区，堆栈区。数组在内存存放在堆中。每执行一个函数会开辟一个新的栈。举例说明：

·注意：传递给函数的参数如果是个普通数据类型值，那么该函数对该参数的修改都只是局部的，只在该函数内部有效，外部参数不受影响。而如果传入的参数是个地址，如数组名，那么该函数对该地址对应的数据的操作的全局的（引入传递）。举例说明：

``` js
<script language="javascript">
<!--
var v1 = 1 ;
function f1( v ){
v = 2 ;
}
f1( v1 ) ;
window.alert( v1 ) ;
var v2 = [ 3, 4, 5 ] ;
function f2( v ) {
v[0] = 6 ;
}
f2( v2 ) ;
window.alert( v2 ) ;
//-->
</script>
```

·数组的引用与 C 语言相同。JS 中数组常用用法有：
①array_name.length：获得数组长度。
②将字串拆分成一个字符串数组：split() 函数，详见手册测试案例。示例代码：

``` js
<script type="text/javascript">
<!--
var str = " Hey , Li, I love you. " ;
var arr = str.split( " ", 5) ;
for ( var i=0; i<arr.length; i++ ){
document.write( arr[ i ] + "  " ) ;
}
//-->
</script>
```

③数组的遍历：for 循环或者 for( var key in arr )。后者示例代码：

``` js
<script type="text/javascript">
<!--
var arr = [  1, 2, 3] ;
arr[ 'test' ] = 4 ; 
for ( var key in arr ) {
document.writeln( "arr["+ key + "] =" + arr[ key ] + "<br/>") ;
}
//-->
</script>
```

④二维数组：JS 中二维数组很少使用。
·遍历二维数组：

``` js
<script type="text/javascript">
<!--
var arr = [ 
[ 1, 2, 3 ], 
[ "Li", "Love" ,"You", "Very" ], 
[ "不离一生", 8023 ] 
] ;
for ( var i=0; i<arr.length; i++) {
for ( var j=0; j<arr[i].length; j++ ) {
document.writeln( arr[ i ][ j ] + "&nbsp") ;
}
document.write( "<br/>" ) ;
}
//-->
</script>
```

·JS 中二维数组中每个一维数组的个数不一定要相同。
·使用二维数组转置矩阵（行列互换）：

``` js
<script type="text/javascript">
<!--
var arr = [
[ 2, 4, 6, 8 ],
[ 8, 9, 0, -1 ],
[ 9, 6, 2, 1 ]
] ;
var arr_new = [  ] ;
// 一定要初始化
for ( var i=0; i<arr[ 0 ].length; i++ ) {
arr_new[ i ] = [  ] ;
}
document.writeln("原矩阵：<br/>" ) ;
for ( var i=0; i<arr.length; i++ ) {
for ( var j=0; j<arr[i].length; j++ ) {
document.writeln( arr[ i ][ j ]+"&nbsp" ) ;
}
document.writeln("<br/>" ) ;
}
document.writeln("<br/>转置矩阵：<br/>" ) ;
for ( var i=0; i<arr.length; i++ ) {
for ( var j=0; j<arr[ i ].length; j++ ) {
arr_new [ j ][ i ] = arr[ i ][ j ] ;
}
}
for ( var i=0; i<arr_new.length; i++ ) {
for ( var j=0; j<arr_new[i].length; j++ ) {
document.writeln( arr_new[ i ][ j ]+"&nbsp" ) ;
}
document.writeln("<br/>" ) ;
}
//-->
</script>
```

·注意：如果不先初始化保存转置矩阵的数组则不会输出。
⑤使用 JS 中的 Array 对象创建数组。详见手册。

- 如何在 JS 中运行 HTML 代码？

``` js
<script type="text/javascript">
<!--
var html_str0 = "<a href="#">####</a>" ;
var html_str1 = "</script><a href="#">####</a><script>" ;
eval( html_str0 ) ;
eval( html_str1 ) ; 
//-->
</script>
```

- javascript 中的 `<!-- ... //-->` 什么意思？
<!-- --> 是html里的注释~~ 在javascript中 函数是用{ ...} 括起来的 但是 有些模版比如说 smarty （将php 文件 和 html 分离的一种模板引擎。。。）他也可能 也 是用{....} 来把数据括起来~~所以用<!---->  将js括起来~两者就不发生冲突了~！ 被括起来的 js 仍然可以执行~ 但是 仅限

``` js
<script>...<!--...-->...</script>
```
内,如果 是

``` js
<!--  <script  src='xxxxxxx'></script>  -->
```

这样的话 就真的把这个给注释掉了~~~因为~~  `<!--.....-->` 是 HTML的注释  而 javascript 内部真正的注释 是 `/*....*/`。

·也是注释，这是html 注释，是为了防止 有些浏览器不支持 javascript ，就会把他当做html 来解析，所以一般都会添加注释 来防止这种情况发生， 还有的会加上 `<noscript>` 如果不支持script 这是给用户的信息提示。

.`<!-- ...  //-->` 中有 2 种注释：`<!--  -->` 是 html 注释，`//` 是 javascript 注释，这样写有个好处就是，当浏览器支持 Javascript 时，`<!---->` 注释将不起作用，而 `//` 注释将起作用。此时恰好 Javascript 代码被执行，而如果浏览器不支持 Javascript 那么`<!---->` 注释将起作用，`//` 注释将失效，`<!---->` 会将其中的 Javascript 代码连同 JS 注释符 `//` 一起注释掉，此时就避免了 Javascript 代码被当作 html 文本被浏览器输出而影响网页的外观。

- JS 中如何实现部分基本算法？
①冒泡排序：

示例代码：
带有 flag 的冒泡排序：

``` js
<script type="text/javascript">
<!--
var arr = [ 79, 56, 90, 4, 32, 27, 16, 88, 35 ] ;
var falg = 0 ; 
for ( var i=0; i<arr.length-1; i++ ) {
for ( var j=0; j<arr.length--i; j++ ) {
if ( arr[j] > arr[j+1] ) {
var temp = arr[j] ;
arr[j] = arr[j+1];
arr[j+1] = temp ;
flag = true ;
}
}
if ( flag ) {
flag = false ;
}else{
break ; 
}
}
document.write( "MIN < " ) ;
for ( var i=0; i<arr.length; i++) {
document.writeln( arr[i] + " <") ;
}
document.write( "MAX" ) ;
//-->
</script>
```

·可以在循环入口打印信息看有无 flag 的情况下分别执行了多少次循环。

②二分查找：使用二分查找的前提是数组是必须序的。示例代码：

``` js
<script type="text/javascript">
<!--
var array = [ 1, 2, 3, 4, 5,6 ,7, 8, 9, 10 ] ;
function binary_search( array, target, left_index, right_index ) {
if( left_index > right_index ) {
document.writeln( "	找不到." ) ;
return ;
}
var mid_index = Math.floor( (left_index+right_index)/2 ) ;
var mid_value= array[ mid_index ] ;
if( mid_value > target ){
binary_search( array, target, left_index, mid_index-1 ) ;
}else if( mid_value < target ){
binary_search( array, target, mid_index+1, right_index ) ;
}else{
document.writeln( "Done. Index: " + mid_index ) ;
return ;
}
}
binary_search( array, 10, 0, array.length-1 ) ;
//-->
</script>
```


#### Javascript OOP

- JS 为什么需要面向对象编程？什么是面向对象？JS 中面向对象有什么特点？
    不光是 JS ，如今的软件开发，几乎离不开面向对象编程。支持面向对象编程的不同的语言都有自己的框架。JS 面向对象特征介绍：

·使用对象的概念进行编程可以避免传统方式的累赘。可以将一些属性和方法封装到一个新的数据类 -- 类中。

- 基于对象和面向对象有什么区别？
    Java 中，每个类都有一个字节码，一旦字节码被加载进去就会形成这个类的 class 对象。从这个角度上说，类也以认为是一种对象。


- 变量名前带 var 和不带 var 有什么区别？
    在函数内，如果不带 var ，则表示使用函数外部的那个变量；如果带上 var ,则表示在函数里面重新定义了一个同名变量，不过不会冲突，因为两者位于不同的栈中。举例说明：
    
``` js
<script type="text/javascript">
<!--
var v = 1 ;
function f () {
v = 2 ;
}
f () ;

var vv = 3 ;
function ff () {
var vv = 4 ;
}
document.writeln( v ) ;
document.writeln( vv ) ;
//-->
</script>
```

- JS 中如何创建类？JS 中如何创建对象实例？JS 访问对象属性有哪两种方式？
——JS 中创建类语法：function class_name (){ ... }

``` 
JS 创建对象基本格式：var  对象名 = new 类名/原型对象名() ;
JS 访问对象属性：①对象实例名.属性名 ;②对象实例名[ "属性名" ] ; 
```

示例代码：

``` js
<script type="text/javascript">
<!--
function op(  ){  } ;
var p = new op() ;
p.name = "Li" ;
window.alert( p.name ) ;
var v = "na" + "me" ;
window.alert( p[ v ] ) ;
//-->
</script>
```

·可见，第 ② 种访问方式可以动态地访问某个对象。

- JS 中对象的引用有什么特点？
    引用对象也是地址引入。示例代码：
    
``` js
<script type="text/javascript">
<!--
function p(){} ;
var a = new p() ;
a.age = 1 ; 
a.name = "A";
var b = a ;
b.name = "B" ;
document.writeln( b.name + " is " + b.age + " years old.<br/>"+ a.name + " is " + a.age + " years old.<br/>" ) ;
//-->
</script>
```

·对象和数组用堆保存；基本数据类型用栈保存。

- JS  中的回收机制的原理是什么？
    GC，Garbage Collection，垃圾回收机制，定时或条件满足时启用。当某块内存地址不再被引用时，即引用的次数减为0时，则那个堆栈会被当作垃圾，此时会触发JS 引擎清零引用，重置内存地址，以供再次使用。置空对象的引用既可以被动也可以主动，如 object_name = null;  这种被动方式不会立马生效，调用 GC 机制由 JS 引擎决定。或者直接 delete object_name.property ; 这种主动方式会立马生效，会立马触发 GC 机制，回收对象属性空间。


- JS 中如何使用 this ?原理是怎样的？使用 this 有什么好处？
    this 的必要性：

举例说明：

``` js
<script type="text/javascript">
<!--
function p(){
this.name = "Li"
this.age = 18
} ;
var a = new p() ;
var b = new p() ;
document.writeln( a.name + " is " + b.age + "." )
//-->
</script>
```

·改变 b 的属性不会影响 a ，因为两者在内存中位置是不一样的:

·this 可以访问对象的私有属性，this 有公开的作用，而如果在类（原型对象）中直接使用 var/ function 来定义一个变量或者函数，则默认是私有的，类外部不可直接访问 。如果不用 this 也可以使用公开的方法 -- 也是由 this 修饰下定义的，来访问私有属性，函数前面有 this 修饰的 -- this.function_name = function (){}，都是公开方法（特权方法）。举例说明：

``` js
<script type="text/javascript">
<!--
function p(){
var name = "Li"
var age = 18
this.show = function (){
document.writeln( name + " is " + age ) 
}
} 
var a = new p() 
document.writeln( a.name + " is " + a.age + "<br/>") 
a.show() 
//-->
</script>
```

- Window 对象有什么特点？this 与 window 对象有什么关系？this 还有那些使用细节？
    Window 对象表示一个浏览器窗口或一个框架。在客户端 JavaScript 中，Window 对象是全局对象，所有的表达式都在当前的环境中计算。也就是说，要引用当前窗口根本不需要特殊的语法，可以把那个窗口的属性作为全局变量来使用。例如，可以只写 document，而不必写 window.document。
同样，可以把当前窗口对象的方法当作函数来使用，如只写 alert()，而不必写 Window.alert()。举例说明：

``` js
<script type="text/javascript">
<!--
function test(){
document.writeln( this.a ) 
}
var a = 1
test() 
//-->
</script>
```

·this 的引用也是地址的引用。所以作用域也是全局的。

``` js
<script type="text/javascript">
<!--
function p(){
this.f = function() {
document.writeln( this.v ) 
}
}
var p = new p() 
p.v = "hi"
p.f()
//-->
</script>
```

·上面的例子也证明了 JS 是动态语言（ 从 属性 f 可以看出 ）。
·this 不能放在类的外部使用，否则调用者就会自动变成 window，此时当 this 指向的属性值在 window 对象中没有对应值，则会输出空。那个对象调用的 this 所在的函数，那么 this 所代表的就是哪个对象实例。

- JS 函数有哪些分类？如何定义并使用的？如何用原型法创建 JS 函数？
    成员函数和构造函数。原型对象（类）的公开方法（ this 修饰）既可以放在原型对象之内，也可以放在其之外。放在类外面时，函数既可以单独定义，然后函数名作为值赋给一个对象的属性，或者函数的实现代码直接赋给某个原型对象的属性，这种情况对象的属性名就可以作为函数使用。举例说明：

·JS 中调用函数不是看参数而只是看函数名，所以即便调用函数时没有传递函数定义时规定的参数，也会调用并执行该函数。
·对象的属性值也是地址类型，所以也可以实现动态添加/修改属性的功能。

·原型法创建 JS 函数：prototype （原型）类绑定的函数都是共享的，该函数可以供由该类创建的所有对象使用，这样可以节省代码空间。内存中情况如下：

·用 == 判断内存地址是否一样：== 不仅可以判断 /字符串/数字 是否相等，也可以比较两个对象的函数地址（即函数名）是否相同 -- 返回为 true 还是 false ，来判断函数是否共享：

```
object1 = new class_name()
object2 = new class_name()
alert( object1 == object2 ) 
object-property_-prototype.function_name = function(){ ... }
alert( object-property_1 == object.property2 ) 
```

- 什么是 Object 类？JS 中如何使用 Object 类？
    与传统创建对象相对应，可以通过 Object 类直接创建对象，因为它是 JS 自带的基类，JS 中所有类的类都是 Object 类（类似 Java ,Java 中所有类的超类都是 Object）。具体概念如下：

示例代码：

``` 
<script type="text/javascript">
<!--
var o = new Object() 
o.name = "Li" 
document.write( o.name + "<br/>" + o.constructor ) 
//-->
</script>
```

- JS 中还有哪些常用的对象及其方法？
·Number() ：
·Array()：

- 可以给 JS 自带的类添加方法吗？
    可以，使用 prototype 修饰即可。示例代码：
    
``` js
<script type="text/javascript">
<!--
var a = new Array(3)
a[0] = "A"
a[1] = "B"
a[3] = "C"
Array.prototype.find = function( v ){
for( var i=0; i<this.length; i++ ){
if( this[i] == v ){
return i
}
}
return false
}
document.writeln( a.find( "B" ) + "<br/>" + a.find( "b" ) )
//-->
</script>
```

- 什么是闭包？
    对象封装特性时再讲。

- 使用成员函数有哪些注意事项？
①成员函数的参数可以有多个。
②成员函数可以有返回值，也可以没有，但有的话最多只能有一个。
③JS 成员函数不支持重载，所以如果定义多个参数个数不同的同名函数时，JS 引擎不会报错，但执行的时候会以最后一个函数为准，即会覆盖前面的函数。

- JS 如何实现网页版超级马里奥游戏？

关键在于：如何通过控制按键来操作图片的移动。

·数字 8/2/4/6 的 unicode 分别是：104/98/100/102。F5 -- 116 。

详见 GitHub/LBD。

- 为什么 ｀<div></div>` 中的内容和 `<table></table>` 中的内容不能同时显示？
    使用了绝对定位。

- - 网页中嵌入媒体？
    
	- `<embed src="背景音乐网址" hidden="true" autostart="true" loop="true">`

--------hidden="true"表示隐藏播放，即不显示播放器的外观，若要想显示，把"true" 替换为"false"即可，这样为默认是最小化播放，若还想具体显示播放器的大小，另加上height="高度值" width="宽度值" 就可以了。 

-------autostart="true"表示当前页一载入则自动播放，若不希望播放改为autostart="false" 
即可... 

------ loop="true"表示无限次循环播放音乐直到当前页关闭为止，不想循环播放替换为 loop="false"就OK了。

	- 2、`<embed src="背景音乐网址" autostart="true" loop="-1" controls="ControlPanel" width="0" height="0" >` 

-----------loop="-1" 表示无限次循环播放，可设置播放次数，用具体数字代替即可，比如我希望它播放两次，则loop="2" 

---------controls="ControlPanel"这个控制选项可省略 

--------width="0" height="0"表示隐藏播放，和前面的一样。 
若欲设置播放器的外观，则替换为具体的数值就可以了，比如width="123" height="100" 

-------------------------------------------------- 
其实要说最简化的播放背景音乐的代码，则下面的代码是最简单的了---> 

``` js
<embed src="背景音乐网址" > 
```

另外: `<bgsound src="背景音乐路径" loop="-1">`

这个只支持IE浏览器，而且是完全下载完后才开始播放，不像前面所说的格式那样可以一边缓冲一边播放。这个一般用于mid音乐或较小的mp3,wav格式的音乐. 若是较大的文件还是用前面所说的格式吧~~ 
`<bgsound src="背景音乐路径" loop="-1">` 这个随浏览器的打开而播放，当最小化窗口时即停止播放，当最大化窗口时又开始播放。 

而，`<embed src="背景音乐网址" autostart="true" loop="-1" controls="ControlPanel" width="0" height="0">` 常用于mid，,wav,mp3类型的音乐类型. 

这个则不管是否最小化窗口都始终播放，直至关闭当前窗口为止。

支持的音乐文件类型：只支持MP播放器所支持的音乐格式，比如mp3,asf,wma,asx等等. 
不支持rm,ram.... 

视频文件的插入方法也和上面所说的一样，设置好合适的 

音乐代码解释：

``` html
<embed autostart="true" loop="-1" controls="ControlPanel" width="0" height="0" src="http://guest.anyp.cn/uploads/-mid">
```

解释一下: 

AUTOSTART="TRUE / FALSE" 
是否要在音乐档传完之后，就自动播放音乐。 TRUE 是要  
FALSE 是不要，内定值是不要。 

LOOP="TRUE / FALSE / 整数" 
设定是否要自动反覆播放，LOOP=2 表示重复两次，若要无限次重复可用 LOOP="TRUE"  

WIDTH 和 HIGH="整数" 
设定控制面版的宽度和高度  

CONTROLS="CONSOLE / SMALLCONSOLE / 
PLAYBUTTON / PAUSEBUTTON / STOPBUTTON / 
VOLUMELEVER" 
设定控制面板的样子，预设值是 CONSOLE  

CONSOLE 一般正常的面板 
SMALLCONSOLE 较小的面板 
PLAYBUTTON 只显示播放按钮 
PAUSEBUTTON 只显示暂停按钮 
STOPBUTTON 只显示停止按钮 
VOLUMELEVER 只显示音量调整钮

#### Javascript 文件编程

JS 文件编程主要是通过 FileSystemObject 来完成的。

- BuildPath()    -- 生成一个文件路径 
- CopyFile()    -- 复制文件 
- CopyFolder()    -- 复制目录 
- CreateFolder()    -- 创建新目录 
- CreateTextFile() -- 生成一个文件 
- DeleteFile()    -- 删除一个文件 
- DeleteFolder() -- 删除一个目录 
- DriveExists() -- 检验盘符是否存在 
- Drives    -- 返回盘符的集合 
- FileExists()    -- 检验文件是否存在 
- FolderExists    -- 检验一个目录是否存在 
- GetAbsolutePathName()    -- 取得一个文件的绝对路径 
- GetBaseName()   -- 取得文件名 
- GetDrive()    -- 取得盘符名 
- GetDriveName()    -- 取得盘符名 
- GetExtensionName()    -- 取得文件的后缀 
- GetFile()    -- 生成文件对象 
- GetFileName() -- 取得文件名 
- GetFolder()     -- 取得目录对象 
- GetParentFolderName    -- 取得文件或目录的父目录名 
- GetSpecialFolder()    -- 取得特殊的目录名 
- GetTempName()   -- 生成一个临时文件对象 
- MoveFile()    -- 移动文件 
- MoveFolder()    -- 移动目录 
- OpenTextFile()    -- 打开文本文件

#### QA

- `<input>` 中 onclick 事件失效？

命名可能冲突，若监听的函数命名是关键词，比如 `clear()`，`select()` 等，onclick 事件就不可能触发。举例说明：

``` javascript
<input id="test" onclick="clear_deault( this )">

<script>
function clear_default( obj ) {
obj.value = ""
}
</script>
```

- 无刷新改变 URL？

``` js
window.history.pushState({},0,'http://localhost/regal/commall/views/newCase') ;
```

#### 参考

- <http://www.99inf.net/SoftwareDev/VB/94-htm>
