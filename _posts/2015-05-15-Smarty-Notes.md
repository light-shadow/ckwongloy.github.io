---
layout: post
title: Smarty 学习笔记
category: PHP
tags: [Smarty, 视图引擎, MVC, PHP]
latest: 2015年05月20日 14:46:45
---

之前已经谈过了关于模板技术的一些思考，也实现了以及简单的 Mini 版 Smarty 引擎，之所以要经历那个过程是为了理解得更深。

那么现在就总结一下关于对视图引擎更深的思考和 Smarty 的具体使用。

既然自己实现一个基本的视图引擎并不算什么难事，那么为什么还要学习 Smarty 等视图引擎？

什么是好的 "视图引擎"？
-

- 基于该引擎开发出的模板要更贴近标准的 HTML：可以方便更多人进行使用。

- 语法简单易懂：上手快。

- 良好的缓存机制：可以避免每次请求模板文件都去编译一次。

- 扩展性良好：可以通过开发扩展的方式扩展原有引擎的功能。

- 网络资源多：可以更快地找到相关的资料和解决方案，Smarty 早在 PHP 不支持面向对象的时候就出现了，其资料和使用者还是比较多的。

Smarty 的工作原理
-

Smarty 出现的主要原因是要让 PHP (逻辑) 和 HTML (外在内容) 相分离，从而让前端和后台开发者能过专注于自己的工作而互不干扰。也就是说，前端开发者只需了解 Smarty 就可以进行对视图层进行开发而不需要太了解 PHP。

其基本工作原理如下：

在 HTML 模板中只需直接调用 Smarty 模板中注册的变量，然后 Smarty 会自动将这些模板变量转换 PHP 代码，然后由 PHP 引擎将其解析成 HTML。

### Smarty 源码介绍

- demo 目录：保存的是一些使用 Smarty 的经典例子。

- libs 目录：Smarty 引擎的核心文件所在位置。

- Smarty.class.php：Smarty 的核心程序文件。

- SmartyBC.class.php：为了提高 Smarty 各版本之间的上下兼容性而保留的，里面含有旧版本 Smarty 使用到的函数名/API。

- plugins 目录：保存的是 Smarty 的插件类文件。

Smarty 的基本配置和使用
-

假设在项目文件夹 test 中有如下几个文件和文件夹：

- test/test.php：使用 Smarty 的 PHP 脚本文件。

```
<?php

# 1. 引入和实例化 Smarty
require_once( '../libs/Smarty.class.php' ) ;
$smarty = new Smarty() ;

# 2. 配置 Smarty
$smarty->left_delimiter = "{" ;
$smarty->right_delimiter = "}" ;
$smarty->template_dir = "templates" ;    // 待编译的模板文件所在路径, 如果自定义报错则赋值为 templates
$smarty->compile_dir = "templates_c" ;    // 编译好之后的 HTML 所在路径
$smarty->cache_dir = "cache" ;     // 编译模板过程中的缓存路径

# 3. 配置缓存参数
$smarty->caching = true ;    // 开启缓存
$smarty->cache_lifetime = 1024 ;    // 设置缓存有效期

# 4. 注册模板变量
$smarty->assign( 'title', 'Smarty Test' ) ;

$arr = array(
	'article' => 'Using Smarty' ,
	'copyright' => array(
			'author' => 'lamChuanJiang' ,
			'email' => 'lamchuanjinag@gmail.com'
		)
	) ;
$smarty->assign( 'arr', $arr ) ;

# 5. 输出编译好之后的模板文件
$smarty->display( 'test.md' ) ;

?>
```

- test/templates/test.md：模板文件，后缀自定义。

新版 Smarty 貌似必须放在 templates 目录，如果没有指定目录那么将在调用 Smarty 的脚本所在路径中寻找，如果找不到则会抛出异常。

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{$title}</title>
</head>
<body>
	<h1>{$arr.article}</h1>
	<p>by <strong>{$arr['copyright'].author}</strong>, <i><a href="">{$arr['copyright']['email']}</a></i></p>
</body>
</html>
{% endhighlight %}

- test/templates_c/：存放编译好之后的模板文件，即已将 Smarty 模板变量解析成相应的 PHP 代码的文件，还不是纯 HTML。

- test/cache/：保存的是已经完全解析成纯 HTML 的模板文件，即是最终输出的视图。

Smarty 模板语法
-

- **注释**：`{* your comments here  *}`

### **输出模板变量**

1、变量是字符串：直接在需要使用的地方调用使用 `assign()` 方法注册过的模板变量即可，比如：`{$title}`。

2、变量是数组：可以直接用 `.` 引用，也可以用 `[]` 引用，还可以两者混合使用，一维数组和二维数组差不多，就像上面例子中那样：

```
# 输出一维数组变量
{$arr.article}

# 输出二维数组变量
{$arr['copyright'].author}
{$arr['copyright']['email']}
```

3、变量是对象：Smarty 中类的调用原本有 2 种方式，一种是通过 `register_object()` 方法，但该方法由于调用不方便在 Smarty 3 以后已经被弃用。还有一种是通过 `assign()` 直接把类的对象直接以变量的形式赋给 Smarty 模板中使用。

可以看出， `assign()` 方法可以为模板赋值变量、数组和对象。举例说明：

```
# 使用 Smarty 的脚本中使用
class Obj {
	function foo( $parameters ) {
		return $parameters[0].'has'.$parameters[1] ;
	}
}
$obj = new Obj ;
$smarty->assign( 'obj', $obj ) ;

# 模板文件中使用
{$obj->foo(array('She','Boyfriend'))}
```

### **变量调节器**

变量调节器实际上是变量参数可以变化的函数，函数名跟在模板变量的 `|` 之后，参数值用双引号 `""`裹起来，若有多个参数用冒号 `:` 分开。常见 Smarty 变量调节器如下：

1、首字母大写：`capitalize`，比如：`{$title|capitalize}`。

2、字符串连接：`cat`，比如：`{$title|cat:"- php"}`。

3、日期格式化：`data_format`，比如：

```
{$post_time|date_format}
{$post_time|date_format:" :%A, %B %e, %Y %H:%M:%S "}
```

4、为未赋值或者为空的变量指定默认值：`default`，比如：

```
{$category|default:"php"}
```

5、转码：`escape`，可以进行 HTML/Javascript/URL/单引号/十六进制/等格式的转码，默认是 HTML 转码。举例：

```
# 使用 Smarty 的脚本中使用
$smarty->assign( 'url', 'https://lamchuanjiang.github.io/home/tags.html?#php' ) ;

# 模板文件中使用
{$url|escape:"url"}
```

之所以需要转码是因为很多符号，比如 `?`/`'` 等会对 PHP 等脚本语言的正常执行产生干扰。

6、字符串完全大小写：`upper` 和 `lower`。比如：`{$title|upper}`。

7、换行符替换：`nl2br`。将所有换行符（编辑器中的回车也算）替换成 `<br>`，功能同 PHP 的 `nl2br()` 函数。

#### **说明**

在使用 Samrty 的变量调节器的时候，尽量把变量用 PHP/CSS 等方法处理好之后再注册到 Smarty 中，这样可以降低 Smarty 使用的复杂度。

### **条件判断**

基本句式：

```
{if $name eq "Li"}
	Hello Li.
{elseif $name eq "Jay"}
	Hello Jay.
{else}
	Hello Everyone.
{/if}
```

其中条件修饰符有：`eq`/`==`，`neq`/`!=`，`gt`/`>`，`lt`/`<` 等。

注意修饰符和变量/常量必须用空格隔开，这是和 PHP 语法不同的地方。

### **循环**

Smarty 中循环的使用主要是使用 `section`/`sectionelse` 和 `foreach`。

`section` 举例说明：

```
# 使用 Smarty 的脚本中使用
$article_list = array(
	array(
		"title" => '第一篇文章' ,
		"author" => 'lamChuanJiang' ,
		"content" => 'Using Smarty'
	) ,
	array(
		"title" => '第二篇文章' ,
		"author" => 'Li' ,
		"content" => 'MVC Practice'
	)
) ;

$smarty->assign( 'article', $article_list ) ;

# 模板文件中使用
{section name=article loop=$article_list max=1}
	{$article_list[article].title}
	{$article_list[article].author}
	{$article_list[article].content}
<br>
{/section}
```

其中，`name=article` 指的是循环依据的 ID，而 `loop=$article_list` 指的是循环的对象。

除了 `name` 和 `loop` 外，`section` 还有如下属性：

1、`start`：指定循环的起始位置。若为负数则从数组末尾开始循环。如超出数组限制，Smarty 会自动调整为最接近的一个合法值。

2、`step`：决定循环的步长。意思是，如果 step=2，那么下次循环的 ID 将是当前 ID+2。

3、`max`：设定循环的最大执行次数。

4、`show`：决定是否显示该循环。

`foreach` 举例说明：

```
# 模板文件中使用
{foreach item=article from=$article_list}
	{$article.title}
	{$article.author}
	{$article.content}
<br>
{foreachelse}
	当前文章列表为空。<br>
{/foreach}
```

Smarty 3 开始 `foreach` 支持用 PHP 语法直接书写循环：

```
# 模板文件中使用
{foreach $article_list as $article}
	{$article.title}
	{$article.author}
	{$article.content}
<br>
{foreachelse}
	当前文章列表为空。<br>
{/foreach}
```

### **模板文件引用**

Smarty 中引入文件只用 `include`，并支持自定义属性。举例说明：

test.tpl:

```
{include file="footer.tpl" sitename="lamChuanJiang's Blog"}
```

其中 `sitename` 就是自定义的属性，可以把自定义属性传递给它引用的模板文件并直接调用。比如在模板文件 footer.tpl 中可以这么直接调用它：

footer.tpl:

```
{$sitename}
```

##### **注意**

自定义属性只能在引用的模板文件中使用。

### **Smarty 函数**

如果觉得 Smarty 内置变量调节器名称不好记或者不够用，有如下几种方式可以增加 Smarty 功能：

1、在 Smarty 中直接使用 PHP 函数。举例说明：

```
# 在使用 Smarty 的脚本中编写
$smarty->assin('time', time() ) ;

# 在模板中引用
{"Y-m-d"|date:$time}
```

这里例子中，在模板中直接使用了 PHP 内置函数 `date()`，用于自定义时间的格式化类型。

需要注意的是，在 Smarty 里面，关于函数参数的传递，`|` 左边的是第一个参数，然后 `函数名:` 后面的依次是第 2、3、... 个参数，以后的参数之间需要用 `:` 隔开。

任何 PHP 内置函数都可以通过这种方式在模板文件里面调用。

2、自定义函数并通过 `registerPlugin()` 方法将其注册到 Smarty 中然后使用。举例说明：

```
# 在调用 Smarty 的脚本中编写
function foo( $parameters ) {
	$param0 = $parameters[ 'param0' ] ;
	$param1 = $parameters[ 'param1' ] ;
	return '传入的第一个参数：'.$param0.'<br>'.'传入的第二个参数：'.$param1 ;
}

$smarty->registerPlugin( 'function', 'f_foo', 'foo' ) ;

# 在模板中使用
{f_foo p1='10' p2='24'}
```

`registerPlugin()` 中的第一个参数代表向 Smarty 中注册的类型，'function' 代表的是注册函数，其他还有 `block`/`modifier`。

第二个参数代表的是当自定义函数注册到 Smarty 里面后该函数的名称。

第三个参数代表的是想要注册到 Smarty 的函数名。

Smarty 中使用自定义函数的时候，函数的参数叫做属性，Smarty 会将模板文件中传给该函数的属性打包成一个数组传递到自定义函数，然后执行。

**3、自定义插件**

### **什么是插件？**

**插件就是遵循主程序/主系统中的接口编写规范开发出来以扩展原系统功能的程序。**

插件可以调用系统的数据和函数库，可执行性强，具有热插拔特性而不影响主系统的功能。

Smarty 的插件本质就是一个 PHP 函数。分为如下几类：

- functions：函数插件。

- modifiers：修饰插件，即变量修饰器插件。

- block functions：区块函数插件。

### **如何制作 Smarty 插件？**

- 使用 `registerPlugin()` 将自定义函数注册到 Smarty 使用。

- 将写好的插件放入 Smarty 源码解压后的 libs/plugins 目录。举例说明：

在 libs/plugins/ 目录下面新建一个文件，比如 **function**.test.php，然后就可以根据 Smarty 的插件编写规范进行插件/函数的开发：

```
<?php
function smarty_function_test( $params ) {
	$width = $params[ 'width' ] ;
	$height = $params[ 'height' ] ;
	$area = $width * $height ;
	return $area ;
}
?>
```

需要说明的是，函数名的形式必须是 `smarty_function_插件名`，而插件文件的命名也必须是 `function.插件名.php`。

然后就可以在模板中直接使用该插件了：

```
{test width=10 height=24}
```

modifiers 变量调节器插件的开发也是类似的步骤，首先命名插件文件，比如：libs/plugins/**modifier**.test.php。然后函数命名如下：

```
<?php
function smarty_modifier_test( $unix_t, $format ) {
	return date( $format, $unix_t ) ;
}
?>
```

然后也可以直接在模板文件中使用该变量调节器插件:

```
# 使用 Smarty 的脚本中编写
$smarty->assign( 'time', time() ) ;

# 模板文件中使用
{$time|test:"Y-m-d H:i:s"}
```

最后，按照同样的模式开发 block function 插件，比如：libs/plugins/**block**.test.php

```
<?php
function smarty_block_test( $params, $content ) {
	$replace = $params[ 'replace' ] ;
	$max = $params[ 'max' ] ;
	if( 'true' == $replace ) {
		$content = str_replace( '，', ',', $content ) ;
		$content = str_replace( '。', '.', $content ) ;
	}
	$content = substr( $content, 0, $max ) ;
	return $content ;
}
?>
```

##### 说明：$content 传递该插件后也是关联数组。

然后调用该 block 插件：

```
# 在使用 Smarty 的脚本中编写
$smarty->assign( 'str', 'Hello，lamChuanJiang。abcdefghijklmnopqrstuvwxyz' ) ;

# 在模板文件中调用 
{test replace='true' max=20}
{$str}
{/test}
```

##### **注意：插件命名不能重复。**

- php 的内置函数可以以自动修饰插件，即变量调节器插件，的形式在模板里使用。

#### Smarty 听课笔记

1. 为什么需要学习使用模板技术？

传统 Model1形式的 PHP 程序，甚至是 MVC 形式的 PHP 程序，都具有如下缺点：

①php 脚本代码和界面(html/css/js) 混合， 界面不简洁。

②编写 php 页面要求程序员会php编程同时会网页设计技术。

③不利于项目的分工协作开发。

使用模板技术可以解决如上问题。

2. 什么是模板技术？模板技术分几类？

依然强调数据和界面分离，数据在界面上的显示样式是有模板规定的，界面上要显示的数据是通过模板技术来分配的。模板技术的分类：

①smarty -- 模板是官方推荐。

②phplib 。

③公司自己做。

3. 什么是 Smarty？Smarty 有什么功能和优点？Smarty 模板引擎的原理是什么？

使用最多的 PHP 模板引擎之一。读入模板，输出可运行的文件，如 PHP 程序。数据保存在模板中，如数组。

通过手写 mini 版 Smarty 来理解 Smarty 模板技术的原理：

①class.mini_smarty.php：

``` php
<?php
	class mini_smarty{
		/* 指定模板文件的路径 */
		var $template_dir = "./templates/" ;
		/* 指定模板文件被替换后的文件格式 */
		var $complie_dir = "./templates_c/" ;
		/* 存放变量的值 */
		var $tpl_variables = array() ;
		/* 模拟两个方法 */
		function assign( $tpl_var, $value = null ){
			if ( $tpl_var ){
				$this -> tpl_variables[ $tpl_var ] = $value ;
			}
		}
		function display( $tpl_file ){
			$tpl_file_path = $this->template_dir.$tpl_file ;
			if( file_exists( $tpl_file_path ) ){
				$fpl_file_con = file_get_contents( $tpl_file_path ) ;
				/* 将 tpl 文件转换成 php 文件 -- 正则表达式 */
				echo  $fpl_file_con ; 
			}else{
				return false ;
			 }

		}
	}
```

②intro.php：

③intro.tpl：

mini 版 Smarty 的核心文件是 class.mini_smarty.php ，它的核心工作是读取 intro.tpl 文件并将其替换成可以运行的 php 文件，类似 com_intro.tpl.php -- tpl 文件中占位符 {} 中的内容将被替换为 php 代码，服务器上执行的其实就是被替换后的 php 代码。

4. 如何使用 Smarty？如何配置 Smarty? 使用 Smarty 的步骤是怎样的？

使用 Smarty 模板的一般步骤如下：

①编写一个模板文件，放在规定好的目录，通常是 templates 下面（规定目录可以修改，只需修改 Smarty.class.php 文件中的相关配置即可）。如：employee_list.tpl。

此外，同目录下也要有一个 templates_c 的文件夹 -- 保存 Smarty 的编译文件。

模板文件本质其实还是一个 HTML 静态页面，不过在其增加了一些 Smarty 标签。其后缀不一定是 .tpl ，也可以是任何形式的后缀名，比如 .html。

②给 .tpl 文件分配要显示的结果集，或者是其他（比如引入 Smarty 库 -- 即把 libs 文件夹拷贝到当前目录）

③创建 Smarty 对象。引入 libs 文件夹后将其中的 Smarty.class.php 引入 PHP 页面，然后 $smarty = new Smarty；

④把 $result 分配到 smarty 对象。即：$smarty -> assign( "$res", $result) ; assign() 中的第一个参数是 .tpl 文件中 from 的对象。

⑤指定用哪个模板显示 -- 将读取该模板文件，并将其替换（编译）成可以运行的 PHP 文件。$smarty -> display( 'employee.tpl') ;


5. 什么是 MVC？MVC 的核心思想是什么？

一种开发模式。数据的输入、处理、显示需要强制分离。

6. 如何将 Smarty 和 MVC 整合？

举例说明 -- 雇员管理系统。

使用 Smarty 之前的代码如下：

①login.php：

``` html
<meta http-equiv="content-type" type="text/html"  charset="utf-8"/>
<h1>请登录</h1>
<form action="controller.login.php" method="post">
username:<input type="text" name="username" />
password:<input type="password" name="password"/>
<input type="submit" value="登录"/>
</form>
```

②class.employee_model.php：

``` php
<?php
	require_once 'class.sql.php' ;
	class employee_model{
		function show_employee(){
			$sql_helper = new sql_service() ;
			$sql = " select * from employee " ;
		}
	}
?>
```

③controller.login.php：

``` php
<?php
	$username = $_POST[ 'username' ] ;
	$password = $_POST[ 'password' ] ;
	//使用模板技术将 $result 结果集分配给一个界面(tpl)
	$employee_model = new employee_model() ;
	$result = $employee_model -> show_employee() ;
	require_once './libs/Smarty.class.php' ;
	$smarty = new Smarty;
	$smarty -> assign( "$res", $result) ;
	$smarty -> display( 'employee.tpl') ;
	if( $username === "lcj" && $password === "enter" ){
		echo "登录成功! 3 秒后进入..." ;
		header("Refresh:3; url=employee_list.php");
	}else{
		header( "Location : login.php" ) ;
	}
?>
```

④employee_list.php：

``` php
<?php
	//传统方案
	require_once 'class.employee_model.php' ;
	$employee_model = new employee_model() ;
	$result = $employee_model -> show_employee() ;
	echo "<pre>" ; 
	print_r( $result ) ;
	echo "</pre>" ;
?>
```

⑤employe_list.tpl：

``` html
<h1>用户列表-模板方式</h1>
{* 这里是注释 *}
<body bgcolor="green">
<table>
<tr>
<td>id</td>
<td>name</td>
<td>password</td>
</tr>
{* 循环取出 result 中的数据 *}
{foreach from = $res item=employee}
<tr>
<td>{$employee.empid}</td>
<td>{$employee.name}</td>
<td>{$employee.password}</td>
</tr>
{/foreach}
</table>
```

⑥class.sql.php: 详见以前代码。

7. 如何阻止直接访问类/模型文件？如何禁止访问不想被浏览者看到的网页？

设置一个常数。

8. 类的写法中 var 和 public 有什么区别？

var 支持低版本的 PHP，public 支持高版本的 PHP，为了兼容建议写 var，但是最新版不用再写。

9. 什么是正则表达式？PHP 中如何使用正则表达式？

在代码中常简写为 regex、regexp 或 REG，计算机科学的一个概念。

正则表达式使用单个字符串来描述、匹配一系列符合某个句法规则的字符串。更多请查阅 [zh.Wikipedia.org/wiki/正则表达式](http://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)。

—— PHP 的正则相关的函数有：preg_replace() 。 举例说明：

- regular_expression.php：

``` php
<?php
	/* PHP 中使用正则表达式 */
	$str = "1box is 2ed. please 3 out." ;

	/* 把 3 个数字替换成 L *
	$pattern = "/\d/i" ;
	$new_str = preg_replace( $pattern, "check" , $str ) ;
	echo $new_str ;  
	*/

	/* 把 3 个数字替换成 <?php echo $this->tpl[ '1234' ]? >  
	* <?php echo $this->tpl[ '1' ]? >box is <?php echo $this->tpl[ '2' ]? >ed, please <?php echo $this->tpl[ '3' ]? > out.
	* 如果模式是数组形式，那么用于替换的内容格式也要是数组，即数组替换数组
	*/
	$pattern = array(
		'/(\d)/'
	) ;
	$replace = array(
		'<?php echo $this->tpl[ "${1}" ]  ?>'
	) ;
	$new_str = preg_replace( $pattern, $replace, $str) ;
	/* preg_replace( $pattern, $replace, $str) ; 的含义是：
	* 当在 $str 中匹配到 $pattern 模式的数据时候，就将匹配到的数据替换成 $replace
	*/
	echo $new_str ;
?>
```

10. echo/var_dump()/print_r() 三者有什么区别？


11. file_get_contents() 得到的结果是什么？

字符串。文件内容其实就是字符串。

12. 自己写的 mini Smarty 模板有什么不足的地方？

运行模板的时候每次都会去读取编译文件，而这是没必要的。可以通过验证模板文件的最后修改日期与编译文件的模板文件的最后修改日期，来决定是否需要去读取要输出的文件。

如果模板文件的修改时间迟于编译文件的修改时间，则代表需要去读取编译文件。


相关
-

- *[Mini-Smarty 与模板](../php/smarty-and-template.html)*
