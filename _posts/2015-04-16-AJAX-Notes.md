---
layout: post
title: AJAX 学习笔记
category: Javascript
tags: [AJAX, Javascript]
latest: 2015-04-21 21:34:32
---

##### Ajax 简介：

2005 年提出，06，07 年得到迅速发展。招聘软件工程师必须掌握的技术之一。

- MVC

数据输入 -> 数据处理（调用 Service） -> 数据输出，三个步骤分离。典型代表：smarty 。

#### AJAX 基础知识

- 为什么需要 Ajax ？ Ajax 比传统页面有什么优点？或者说传统页面有哪些不足？

因为 Ajax 解决了很多其他技术解决不了的问题。比如：①页面无刷新的动态数据交换；②局部刷新页面 -- 验证用户名唯一而不会改变其他表单数据；③界面的美观 -- 增进用户的体验；④对数据库的操作；⑤可以返回简单的文本格式，也可以返回 xml 和 json 文件格式。

传统的 客户端-服务器 响应方式的不足：①数据是整体提交；②整个页面有刷新，会导致所有表单数据被影响；③用户体验不好；④占带宽（Ajax 只发送需要的流量 -- 因为可以局部刷新）。

- 什么是 Ajax ? 它有什么特点？

Asynchronous Javascript And XML。是一个与服务器端语言无关的技术，在服务器端的业务逻辑层使用何种服务器端语言都可以，比如 Java EE 项目，PHP 项目，.NET 项目。Ajax 是七种技术的综合 -- Javascript + xml + xstl + xhtml + dom + xmlhttprequest + css 。Ajax 就像粘合剂一样把其中技术整合到一起，从而发挥各种技术的优势。其中 xmlhttprequest（Ajax存储引擎对象，存在于浏览器中）是本课程学习的重点。

- 无刷新数据交换技术有哪些？为什么 Ajax 可以做到无刷新数据交换（原理）？

flash，java applet（ajax出现后退居二线）, 框架，iframe， ajax（绝大部分应用，PHP的话也只能用 AJax，Java 还稍微可以使用 applet）。

原理说明：
①传统页面，一个用户 http 请求（线路1）对应一个服务器 http 响应（线路2），它们是同步机制。如果服务器不回 2 号线，则会加载失败。
②使用 Ajax 之后，当用户发出一个 http 请求后，浏览器会创建一个 Ajax 引擎对象，作为服务器和用户界面之间的代理，接管了 4 条线路需要的处理任务，Ajax 技术主要就是这 4 条线背后的技术。序号代表顺序，同时每条线了代表不同的技术：
·1 号线：在浏览器中创建 Ajax，属于 Ajax 技术。
·2 号线：Http 协议，属于 TCP/IP协议 技术（WEB 开发的最本质都是 HTTP 协议，而 HTTP 协议底层是 TCP/IP 协议）。
·3 号线：服务器的响应，此图这里属于 PHP 技术来响应的。
·4 号线：这里需要一个回调函数来告诉 Ajax 引擎将结果指定交给哪个特定的位置（可能是某个 div）,属于 Ajax 里面 Javascript 的 DOM 编程技术。
③什么是异步？为什么 Ajax 实现了异步？Ajax 异步机制的本质是什么？

在同步机制的基础上，新增第三方代理，Ajax 就是这么一个代理，它使服务器在提供服务的同时，替服务器完成了某些功能，不会出现服务器让用户等待一直提供服务的现象，提高了效率。

- Ajax 可以返回哪三种数据格式？各有什么特点？重点掌握哪种？

浏览器能够理解的格式主要有三种，重点掌握 json ：
①TEXT 文本格式：又叫 html 格式，由一些普通文本组成，服务器通过 XMLHttpRequest 发送 HTML 时，文本将存储在 responseText 属性中。不必从 responseText 属性中读取数据。html 本身就是希望的格式不需要再转换可直接嵌入到页面中。插入 HTML 属性最简单的方法是更新这个元素的 innerHTML 属性。
②xml：
③json：（原生态数据，灵活）文件格式。

- Ajax 的应用领域有哪些？典型应用场景有哪些？

应用领域：应用 Ajax 技术最多的公司是 Google，如 Gmail，Google 地图，Google 日历等；各大股票网站的股票，基金，黄金实时更新；各大门户网站的动态数据更新等等。现在几乎没有哪家网站不用 Ajax。

典型应用场景：①动态加载数据，按需取得数据 -- 树形菜单（省市县按级取内容），联动菜单等；②改善用户体验 -- 输入内容前提示，带进度条文件上传等；③电子商务应用 -- 购物车，邮件订阅等；④访问第三方服务 -- 搜索，RSS 订阅等。⑤数据的局部刷新

- Ajax 有什么不足？

#### 返回 JSON 的处理

- 为什么需要使用 JSON ？JSON 有什么优点？

JSON 与 XML 相似，但比 XML 更轻巧。JSON 不需要从服务器端发送含有特定内容类型的首部信息，因为 JSON 是专门给 Javascript 使用的，与之整合的很好。

- 什么是 JSON ？有什么特点？

Javascript Object Notation。JSON 是一种文本字符串，是 Javascript 的原生格式，即代表着 使用 Javascript 处理 JSON 数据不需要额外的 API 或工具包。JSON 描述能力很强，也很稳定，故推荐使用。存储在 responseText 属性中。JSON 数据虽然简单但是语法要求很高，尤其注意符号不能写错。

- 如何使用 JSON ？eval() 函数的执行原理是什么？JSON 格式数据的写法形式有哪几种？

数组使用格式为： "[{"属性名":"属性值", "属性名":"属性值", ...}, {"属性名":"属性值", "属性名":"属性值", ...}, ...]"。此外，单独的花括号内属性键值对和单独的属性名-属性值中，以及三种形式的组合都是合法的。

与 XML 相同，也只需修改 3 号线和 4 号线，不过第一句 header() 内要改为 html：

``` js
// 第 3 号线
// 返回格式是 JSON 时
	$info = "" ;
	if( $username == null ){
		echo " 用户名不能为空 " ;
	}elseif( $username =="lcj" ){
		// 这里的 $info 还只是个 JSON 字串，而非 JSON 对象
		$info.= " [ { \"res\" : \" 用户名 ' $username ' 已经被注册 \", \"date\" : \" 2015/4/- \" }, { \"res\" : \" 用户名 ' $username ' 已经被注册 \", \"date\" : \" 2015/4/- \" } ] " ;		//	这里的显示数据是显示在返回给请求的页面
	}else{
		$info.= " [ { \"res\" : \" 用户名 ' $username ' 可以使用 \", \"date\" : \" 2015/4/- \"  }, { \"res\" : \" 用户名 ' $username ' 可以使用 \", \"date\" : \" 2015/4/- \"  } ] " ;
	}
	echo $info ;
?>
// 第 4 号线：
/* 返回数据为 JSON 格式时如何取出 */
			var msg = myXmlHttpRequest.responseText ;
			//window.alert( msg ) ;	// 输出字串，表示还没有转换成对象
			//使用 eval 函数将 msg 字串转换成对应的 JSON 对象
			var msg_obj = eval( "("+msg+")" ) ; 
			//window.alert( msg_obj.res ) ;		// 输出对象
			// 取出第一组信息的 res
			$( 'myAjaxResult' ).value = msg_obj[ 0 ].res;
			// 数组组数较多时的遍历取法
			/*
			for( var i = -  i <= msg_obj.length; i++){
				window.alert( msg_obj[ i ].res ) ;
			}
			*/
```

需要使用 Javascript 中的 eval 函数，从 responseText 属性中读取 json 数据。eval 函数会把一个字符串当作它的参数，然后这个字串会被当作 Javascript 代码来执行。因为 JSON 字串本身就是 Javascript 代码构成，故它本身就是可执行的。

JSON 格式数据的写法示例，当需要取 JSON 数据时请按此举一反三：
①普通 JSON 数据取法：

``` js
<script type="text/javascript">
var person = { "name" : " lcj ", "age" : "1- } ;   // person 为 javascript 对象
window.alert( person.name + " is ") ; 
window.alert( person.age + " years old.") ; 
</script>
```

②数组 JSON 数据取法：

``` js
<script type="text/javascript">
var person = [
{ "name" : " lcj ", "age" : "1- } ,
{ "name" : " tj ", "age" : "1- } 
] ;
window.alert( person[ 0 ].name + " is ") ; 
window.alert( person[ 0 ].age + " years old.") ; 
alert( person[ 1 ].name + " is ") ; 
alert( person[ 1 ].age + " years old.") ; 
</script>
```

③多组属性及其组合数据的取法：

``` js
<script type="text/javascript">
var person = {
	"lovers":
	[
		{ "name" : " lcj ", "age" : "1- } ,
		{ "name" : " tj ", "age" : "1- } 
	] ,
	"programmer" : { "username" : "cj.li", "profession" : " Full Stack Programmer. " } ,
	"admin" : "lam.cj.",
} ; 
window.alert( person.lovers[ 0 ].name + " is " + person.lovers[ 0 ].age + " years old. " ) ; 
window.alert( person.lovers[ 1 ].name + " is " +  person.lovers[ 1 ].age + " years old. " ) ; 
alert( person.programmer.username + " is a " +  person.programmer.profession ) ; 
alert( "Admin is " + person.admin ) ;
</script>
```

- JSON 有什么缺点？当网站对安全要求较严的时候怎么处理？

语法过于严谨；代码不易读；eval() 函数存在风险，因为会把字串转换成对象数组。网站安全性要求不严的时候不影响。

- 何时选择何种数据格式？掌握了三种数据格式是否足够工作需求？

三种数据格式选择原则：
①JSON : 如果项目经理没有特殊要求，首选 JSON。如果数据需要重用也选择 JSON，因为 JSON 在性能和大小上有优势。
②HTML: 若应用程序不需要与其他应用程序共享数据的时候，使用 HTML 片段来返回数据最简单。
③XML : 当远程应用程序未知时，指数据的使用者不知是浏览器还是其他的应用程序（如 flash ,flex等，虽然大部分是浏览器的请求使用），首选 XML，因为 XML 是世界语，即最通用的数据格式。

绝大部分情况都足够了，特别是 JSON ，几乎可以满足所有要求。
 
- 为什么`" { \"res\" : \" 用户名 \" $username \" 已经被注册 \" } "` 不能被输出？单引号和双引号的区别？

原因猜测：转义符号过多，PHP 解析失败。

解决方案：①花括号外用单引号；②$username 左右用单引号。即可正常解析输出。

- alert() 和 window.alert() 效果一样吗？为什么？

一样。JS 作用的默认对象就是 window。

- Ajax 如何与数据库相连？

通过 PHP 间接操作数据库，以验证用户名是否真的存在于数据库中。

#### 返回 XML 的处理

- 为什么需要返回 XML 格式的数据？

简单的 HTML 格式（文本格式）不能描述复杂的数据。XML 格式描述能力更强。

- Ajax 如何处理数据返回格式是 XML 的情况？

1，2 号线和前面代码相同，只需在第 3 讲代码的基础上改动 3 号线和 4 号线即可。
①3 号线改为：

``` js
// 第 3 号线 
送回处理结果
// 返回格式是 XML 时
	$info = "" ;
	if( $username == null ){
		echo " 用户名不能为空 " ;
	}elseif( $username =="lcj" ){
		$info.= "<res><msg>用户名 \" $username \" 已经被注册 </msg></res>"  ;		//	这里的显示数据是显示在返回给请求的页面
	}else{
		$info.= "<res><msg> 用户名 \" $username \" 可以使用</msg></res>" ;
	}
	echo $info ;
②4 号线改为：
// 第 4 号线 
回调函数
	function callback(){
		// 取出从 registerProcess.php 页面返回的数据
		if( myXmlHttpRequest.readyState == 4 ){
/* 返回数据为 XML 格式时如何取出 */
			//window.alert(myXmlHttpRequest.responseXML) ;
			// 获取 msg 节点 
为什么不能使用 document. getElementByName 的方式来获取msg 节点？
			var msg = myXmlHttpRequest.responseXML.getElementsByTagName( "msg" ) ;
			// 获取 msg 节点值
			// window.alert( msg.length ) ;
			var msg_val = msg[0].childNodes[0].nodeValue ;	//msg[- 表示取出第一个 msg 节点，childNodes[- 表示取出第一个 msg 节点的第一个子节点
			//window.alert( msg_val ) ;
			$( 'myAjaxResult' ).value = msg_val ;
		}
	}
```

- Javascript 中的 DOM 编程和 Ajax 的 DOM 编程有什么区别？HTML DOM 和 XML DOM 有什么联系和区别？

Javascript 中对 HTML 编程就叫 HTML DOM ， 对 XML 编程就叫 XML DOM 。而Ajax 则将对 HTML 和 XML 的 DOM 编程合二为一，这个整合过程通常在回调函数中完成。所以 Ajax 的回调函数中包含两部分操作，对 XML 数据的处理和 对 HTML 元素的操作，对谁处理就叫对谁的 DOM 编程。

HTML DOM 和 XML DOM 本身很多方法都是通用的，可以看作是不同级别的 DOM 。

- 为什么不能使用 document. getElementByName 的方式来获取返回格式为 XML 时的 msg 节点？

document.getElementByTagName 的方式是对 HTML 页面本身编程，而这里是对 XML 格式的返回数据编程，两个方法的操作对象是不同的，对 XML 格式的返回数据编程有专门的方法与之对应，即 getElementByTagName()。

- 为什么在输出 myXmlHttpRequest.responseXML 浏览器返回 NULL？

原因在 registerProcess.php 中的 header() 上，再次强调，web 开发中，引号的作用除了是输出信息其他情况下，引号与引号内的内容之间不要有空格，否则会出现各种错误。

- 为什么获取 msg 节点值时回报错 undefined ?

当遇到难以察觉的错误的时候注意检查单词拼写是否正确，特别是方法名，变量名。以及分号中的内容与分号之间不要带空格。细节出错比较浪费时间。

#### 关于 AJAX 异步下载

1.使用ajax，ajax的返回值类型是 json,text,html,xml 类型，或者可以说 ajax 的发送，接受都只能是string字符串，不能流类型，所以无法实现文件下载，强用会出现response冲突。


如果非要使用ajax的话，只能通过返回值得到生成的文件相关url。然后在回调函数里通过创建一个iframe，并设置其src值为文件url，或者一个对文件生成流的处理url，这样操作来实现文件下载且页面无刷新。
 
2.不使用ajax，通过dom动态操作或创建iframe,form的方式来实现，在下载文件的同时实现页面不刷新，其中iframe的src可以是文件地址url来直接下载文件，也可以是流处理url通过response流输出下载，form的是流处理url通过response流输出下载，dom动态操作的时候实现文件下载，且页面无刷新。
 
要在下载的同时实现进度条的话，可以创建一个定时任务，每隔一定时间就向后台发送请求，通过公用的对象，比如session,来取得文件下载的处理进度。

#### AJAX 小结

- 如何使用 MVC 模式开发用户管理系统（信息共享系统）?

引入 Smary 模板。

- Ajax 可以使用同步方式吗？

- 浏览器使用 Ajax 与服务器通信的主要步骤是哪些（总结）？

浏览器使用 Ajax 与服务器通信的主要步骤：
①创建一个 XMLHttpRequest 对象；
②创建 url, data, 通过 xmlHttpRequest.send()；
③服务器端接收 ajax 的请求,做相应处理(操作数据库)，然后返回结果(PHP 使用 echo 语句就行)；
④客户端通过 xmlHttpRequest 的属性 reponseText , responseXML 取得数据，然后就完成局部刷新当前页面任务。

- 请用一句话总结 Ajax 技术？

免页面刷新的与服务器动态交换数据技术。

- 当代码比较复杂的时候如何利用日志输出信息（调试技巧）？

file_put_contents();

- HTML 中 name 和 id 有什么相同点和不同点？何时使用何种 ？

当我们需要在脚本里访问页面内一个html元素的时候，一般都是通过指定HTML元素的id或name。WEB标准下可以通 getElementById() 、getElementsByName() 、 getElementsByTagName()访问HTML文档中的任一个元素。要访问某一特定元素尽量用标准的document.getElementById(id)。
如果一个文档中有两个以上的标签 NAME 相同，那么document.getElementsByName(name)就可以取得这些元素组成一个数组。访问标签则用标准的document.getElementByTagName(tag)。最 classical 的答案：ID就像是一个人的身份证号码，而Name就像是他的名字，ID显然是唯一的，而Name是可以重复的。对于ID来说是完全对的，它就是Client端HTML元素的Identity。而Name其实要复杂的多，因为Name有很多种的用途，所以它并不能完全由ID来代替，从而将其取消掉。

具体用途有：
 ①作为可与服务器交互数据的 HTML 元素的服务器端的标示，比如 input、select、textarea、和button等。我们可以在服务器端根据其 Name 通过 Request.Params 取得元素提交的值。

 ② HTML元素 Input type='radio' 分组，我们知道 radio button 控件在同一个分组类，check 操作是mutex 的，同一时间只能选中一个 radio，这个分组就是根据相同的 Name 属性来实现的。

 ③ 建立页面中的锚点，我们知道 <a href="URL">link</a> 是获得一个页面超级链接，如果不用 href 属性，而改用 Name，如：<a name="PageBottom"></a>，我们就获得了一个页面锚点。

 ④作为对象的 Identity，如Applet、Object、Embed等元素。比如在 Applet 对象实例中，我们将使用其Name 来引用该对象。

 ⑤在 IMG 元素和 MAP 元素之间关联的时候，如果要定义 IMG 的热点区域，需要使用其属性usemap，使 usemap="#name" (被关联的 MAP 元素的 Name )。

 ⑥某些特定元素的属性，如 attribute，meta 和 param。例如为 Object 定义参数 <PARAM NAME = "appletParameter" VALUE = "value">或Meta中<META NAME = "Author" CONTENT = "Dave Raggett">。

显然这些用途都不是能简单的使用ID来代替掉的，所以HTML元素的ID和Name的却别并不是身份证号码和姓名这样的区别，它们更本就是不同作用的东西。

当然 HTML 元素的 Name 属性在页面中也可以起那么一点 ID 的作用，因为在 DHTML 对象树中，我们可以使用 document.getElementsByName 来获取一个包含页面中所有指定 Name 元素的对象数组。Name 属性还有一个问题，当我们动态创建可包含 Name 属性的元素时，不能简单的使用赋值element.name = "..."来添加其 Name，而必须在创建 Element 时，使用

`document.createElement('<element name = "myName"></element>') `

为元素添加 Name 属性。示例如下：
    
``` js
<script language="JavaScript">
var input = document.createElement('INPUT');
input.id = 'myId';
input.name = 'myName';
alert(input.outerHTML);
</script>
```

 消息框里显示的结果是：`<INPUT id=myId>`。
 
``` js
<script language="JavaScript">
var input = document.createElement('<INPUT name="myName">');
input.id = 'myId';
alert(input.outerHTML);
</script>
```

消息框里显示的结果是：`<INPUT id=myId name=myName>`。

初始化Name属性的这个设计不是IE的缺陷，因为MSDN里说了要这么做的，可是这样设计的原理什么呢？我暂时没有想太明白。
    
这里再顺便说一下，要是页面中有n(n>1)个HTML元素的ID都相同了怎么办？在DHTML对象中怎么引用他们呢？如果我们使用ASPX页面，这样的情况是不容易发生的，因为aspnet进程在处理aspx页面时根本就不允许有ID非唯一，这是页面会被抛出异常而不能被正常的render。要是不是动态页面，我们硬要让ID重复那IE怎么搞呢？这个时候我们还是可以继续使用document.getElementById获取对象，只不过我们只能获取ID重复的那些对象中在 HTML Render 时第一个出现的对象。而这时重复的ID会在引用时自动变成一个数组，ID重复的元素按Render的顺序依次存在于数组中。

注意：id 标识的是大小写敏感的，而 name 基本上没有什么要求，甚至可以用数字。

- 什么情况下必须用  name ?

①表单元素（例如：form、input、textarea、select 、button 等)通常与表单提交有关，在表单的接收页面只接收有name的元素，赋id的元素通过表单是接收不到值的。

②表单元素复选框checkbox、单选按钮 radio 通常会对应多个控件，这时必须用name属性来实现分组。同一组使用同一个name。使两个题目的选项之间不产生干扰。

③框架元素（iframe、frame）的名字，用于在其他iframe、frame指定target。

④建立页面中的锚点，我们知道 `<a href="URL">link</a>` 是获得一个页面超级链接，如果不用href属性，而改用name，如：`<a name="pageTop"></a>`，我们就获得了一个页面锚点。

⑤在IMG元素和MAP元素之间关联的时候，如果要定义IMG的热点区域，需要使用其属性usemap，使usemap="#name"(被关联的MAP元素的name)。

⑥某些特定元素的属性，如attribute，meta和param。例如为Object定义参数

```
<PARAM NAME = "appletParameter" VALUE = "value">
```

或Meta中

```
<META NAME = "Author" CONTENT = "Admin10000.com">
```

·什么情况下必须用 id ?
①label与form控件的关联。例如：

``` html
<label for="myInput">文本录入框</label>
<input id="myInput" type="text" />
```

②id 可以用来设置一个css样式。例如：

``` css
<style type="text/css">
#my
{
font-size: 12px;
color: red;
}
</style>
<div id="my">设置字体大小和颜色</div>
```

- 如何减少代码的出错率？

善做注释，边写边测试。在不同的分支设置不同的提示信息，如函数的第一句可以写 window.alert( " 已进入 xx 函数 ! ") ;在不同的语句后面写一句能将该语句执行成功或失败将会导致的结果，同时将该函数的作用输出，这样一可以提示二当测试通过后注释掉不要删除也可以当作注释，一举两得，如在 `myXMLHttpRequest = getXMLHttpObject() ;` 语句后面可以写  `window.alert( " 已成功获得 XMLHttpRequest 对象 ! ( " + myXMLHttpRequst + " ) "`，这句话不仅提示了你上句已经执行成功（但不能不把 myXMLHttpRequest 输出，因为可以通过它的输出信息而确保真的已经成功获得XMLHttpRequest 对象）同时也是对上条语句的注释。

- 如何 输入 localhost 就能显示当前目录而非直接显示 index.html 的页面内容 ?

直接删除 index.html 即可，或者修改 Apache 配置的欢迎页面不为不自动显示 index.html -- DirectoryIndex 。

- 如何灵活将命名规范？如何将代码规范？

全大写一律代表特殊情况。其他情况大部分都是小写，分类如下：
①变量名：一个单词全小写，两个以上匈牙利法，variable ; VariableName。
②程序文件名：一律小写加下划线，类和控制器统一前缀先写，其中核心名部分的单词用下划线连接，前后缀用点连接 -- controller.send_message.php，class.sql_service.php。
③项目文件夹名：匈牙利命名法 -- WebChat。非项目文件夹命名若由多个单词组成则各单词之间要有空格 -- Web Chat Files。
④函数名：驼峰法 -- sendMessage(){}, 并且动词放在开头。
⑤类名：匈牙利命名法 -- class MessageService{}。
⑥编程语言自带：关键词，库函数，类库等情况一律按语言规范要求书写。
代码规范：
①函数花括号按照 unix 风格：

``` php
function_name(){
	... ;
}
```

②空格的使用场合：函数参数与括号要有空格；语句末尾与语句正文要有空格；代码内所有字符中，任何两个构成单独意义的代码字符串段都要用空格隔开。（ PHP 中隔开会造成解析失败的除外 
PHP 中除了是输出信息之外引号内的要有空格外其他引号内的内容与引号千万不能有空格 ）

```php
function_name( argument1, argument2, ... ){
	statement1 ;
	statement2 ;
	statement3 ;
	...
}
```

③写注释的技巧：最好是将注释写为语句的功能或者程序流程到哪了，并且将注释输出，这样可以一举两得 -- 显示流程和添加注释。

- 当整个 PHP 程序中只有一句 `echo()` 时可以不用写分号吗？到底是写好还是不写好？

可以是可以，但是最好写上。统一规范。

#### 其他

- MySQL 自我复制

``` mysql
insert into userinfo (usr, pwd, regtime, is_online) select usr, pwd, regtime, is_online from userinfo;
```

- JS 中引入另一个 JS？

``` js
document.write(" <scr"+"ipt lanague=\"javascript\" src=\"content.js\"> <\/scri"+"pt>") 
```

或在使用脚本的地方：

```
<script src="js1.jsp"></script>
<script src="js2.js"></script>
```

js2.js中就能引用了，只要让他们在同一个页面上就可以了

- 向 php 传送数据的几种方式

- 300 ppi 是人类所能看到的分辨率的极限数值。

- JS 格式化本地日期:  `new Date().toLocaleString()`。

- 学习三要素 ： W -- Why; W -- What; H -- How 。

- 先死后活法：先写死，因为简单所以好写，死的通过后证明基本原理没有错此时再写活。

- 课程无法教会每个函数，这就要求我们学会自己查手册

- 有时候不是知识不够，而是运用的不够 

- 反正就要吃苦，趁年轻吃够苦

- 人的习惯很难改变，但社会的压力会强迫你做出改变

- 积累改变人生

#### 参考

- [nodeType、innerHTML、innerText、textContent之间的区别与联系](http://blog.csdn.net/zhaodan_linda/article/details/9669975)
