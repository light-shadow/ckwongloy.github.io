---
layout: post
title: Mini-Smarty 与模板
category: PHP
tags: [Smarty, PHP, 正则表达式, 模板技术]
latest: 2015年10月21日 10:00:12
---

使用模板技术可以解决传统的 Model 1，甚至是一些 MVC 形式的 PHP 程序的缺点。

Model 1 开发形式的不足
-

① php 脚本代码和界面 (html/css/js) 混合， 界面不简洁。

② 编写 php 页面要求程序员会 php 编程同时会网页设计技术。

③ 不利于项目的分工协作开发。

什么是模板技术？
-

依然强调数据的输入、处理、显示分离，但是数据在界面上的显示样式是有模板规定的，界面上要显示的数据是通过模板技术来分配的。

什么是视图引擎？
-

视图引擎指的就是专门用于 MVC 架构中 View 层的开发，比如 PHP 中最常见的 Smarty。

### 模板技术的分类

① Smarty： 使用最多的 PHP 模板引擎之一，Smarty 模板是官方推荐。

② phplib 。

③ 公司自己做。


Smarty 模板引擎的工作原理
-

#### 1、 获取模板源文件

数据保存在模板中，如数组。

#### 2、 编译模板 ( 正则替换 )

#### 3、 输出给用户

读入模板，输出可运行的文件，如 PHP 程序。

即模板经过处理后，要实现这样的效果：

{% highlight php %}
{% raw %}{% $var %}{% endraw %} =>  <?php echo $var ; ?>
{% endhighlight %}

Mini Smarty
-

Talk is cheap, show you the code. 

通过一个很小的例子，来说明模板引擎的工作原理。项目文件夹 _mini-smarty_ 下有 3 个子文件夹和 1 一个入口文件，分别是：

- class 文件夹：存放的是模板引擎类 - _template.class.php_。

- compiled 文件夹：这里面存放的是已经被模板引擎编译 (正则替换) 过的 HTML 文件，其中含有 PHP 代码，最终将被服务器上的 PHP 引擎解析成真正的纯 HTML 文本。

- source 文件夹：这里面存放的就是等待着被编译成想要格式的模板文件，这里假设有个模板源文件为 _test.md_。

- index.php: 这充当了 MVC 中的 View 层，用于展示模板的最终 HTML 输出。

源代码如下：

- mini-smarty/class/template.class.php

{% highlight php %}

<?php
class MiniSmarty {
	// 模板引擎源文件的所在目录
	private $template_dir ;
	// 模板文件编译之后的存放目录
	private $compiled_dir ;
	// 模板文件中需要替换的变量的识别符号, Smarty 是 {()}，这里模仿 Jekyll
	private $left_tag = '{% raw %}{%{% endraw %}' ;
	private $right_tag= '{% raw %}%}{% endraw %}' ;
	// 当前正在编译的模板文件名
	private $current_temp = '' ;
	// 当前正在编译的模板文件中的 HTML 代码，即从源文件中读取的一段 HTML 代码
	private $output_html ;
	// 存放编译之前模板中存在的变量，方便编译后从该变量池中查找值
	private $var_pool = array() ;
	public function __construct( $template_dir, $compiled_dir, $left_tag=null, $right_tag=null ) {
		$this->template_dir = $template_dir ;
		$this->compiled_dir = $compiled_dir ;
		if( !empty( $left_tag ) ) { $this->left_tag = $left_tag ; }
		if( !empty( $right_tag ) ) { $this->right_tag = $right_tag ; }
	}
	// 把编译前，模板中需要用到的变量放到变量池 $var_pool，并为其定义一个标记；同 Smarty
	public function assign( $tag, $var ) {		
		$this->var_pool[ $tag ] = $var ;
	}
	// 通过标记从变量池中获得一个已保存的变量
	public function get_var( $tag ) {
		return $this->var_pool[ $tag ] ;
	}
	// 获取即将编译的模板的源文件，将其放到临时区
	public function get_source( $template_name, $ext = '.md' ) {
		$this->current_temp = $template_name ;
		// 源文件的完整路径
		$source_file_dir = $this->template_dir.$this->current_temp.$ext ;
		$this->output_html = file_get_contents( $source_file_dir ) ;
	}
	// 编译; 重点在于正则匹配
	public function compile_template( $template_name = null, $ext = '.html' ) {
		$template_name = empty( $template_name ) ? $this->current_temp : $template_name ;
		$pattern = '/'.preg_quote( $this->left_tag ) ;
		$pattern .= ' *\$([a-zA-Z_]\w*) *' ;
		$pattern .= preg_quote( $this->right_tag ).'/' ;
		// $1 的意思是代表使用正则表达式中匹配到的第一个子模式
		$this->output_html = preg_replace( $pattern, '<?php echo $this->get_var( \'$1\' ) ; ?>', $this->output_html ) ;
		$compiled_filename = $this->compiled_dir.md5( $template_name ).$ext ;
		file_put_contents( $compiled_filename, $this->output_html ) ;
	}
	public function display( $template_name = null, $ext = '.html' ) {
		$template_name = empty( $template_name ) ? $this->current_temp : $template_name ;
		include_once $this->compiled_dir.md5( $template_name ).$ext ;
	}
}
{% endhighlight %}

- mini-smarty/index.php

{% highlight html %}
<?php
require_once './class/template.class.php' ;
// 通过魔术常量 `__FILE__` 获得根路径
$base_dir = str_replace( '\\', '/', dirname( `__FILE__` ) ) ;
$template = new MiniSmarty( $base_dir.'/source/', $base_dir.'/compiled/' ) ;
$template->assign( 'title', 'Mini Smarty TEST' ) ;
$template->assign( 'test', 'Chuanjiang Li @lamChuanJiang' ) ;
$template->get_source( 'test' ) ;
$template->compile_template() ;
$template->display() ;
{% endhighlight %}

- mini-smarty/source/test.md

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{% raw %}{% $title %}{% endraw %}</title>
</head>
<body>
	<h1>测试区：{% raw %}{% $test %}{% endraw %}</h1>
</body>
</html>
{% endhighlight %}

Mini Smarty 原理简析
-

### **6 配置 2 方法**

- 配置模板所在目录 `template_dir`

即存放需要被模板引擎所解析的模板文件的所在目录。

- 配置模板编译之后存放的目录 `compiled_dir`

即当模板文件全部编译好之后，存放到哪个目录。该目录存在是很有必要的，因为如果模板文件没有发生变化，需要使用该模板文件的时候就不用再去编译该模板，而是直接从已经编译好的模板文件中取。

- 配置正在编译的模板所在目录 `current_temp`

用来存储当前正在编译的模板文件名。

- 配置模板文件编译好之后的输出目标 `output_html`

指的是当模板文件中的模板变量被编译成规定的 PHP 语句后，模板文件中最新生成的内容要把它写入到哪个地方，`output_html` 并不是一个文件，而是模板引擎类中用于临时存放已编译的模板文件。

- 配置左右界定符 `left_tag` 和 `right_tag`

当模板文件中出现限定符包裹的内容，比如 {% raw %}{% $title %}{% endraw %}，就会被模板引擎，也就是上面例子中的 _template.class.php_ 文件里面的 MiniSmarty 相关类方法，解析成 PHP 代码，而最后模板文件中所有这些的转换好之后的 PHP 代码都会被 PHP 引擎解析成 HTML。

- `assign()` 方法用于注册模板变量

- 配置用于保存模板变量的变量池 `var_pool`

`var_pool` 是一个数组，用于保存 `assign()` 方法注册过的模板变量。

- `display()` 方法用户显示视图文件

其核心就是用 `include_once()` 方法将编译好的模板文件引入调用该方法的当前脚本。

总结
-

### **什么是模板？**

模板即预先规定好的约定，要使用该模板就必须按照该模板的约定来办事。

上面例子中的模板文件就是含有类似 {% raw %}{% $var %}{% endraw %} 字符串这样的并不是最终要显示的 HTML 文件。而 {% raw %}{% $var %}{% endraw %} 就是模板文件中的模板，其本质就是一种自定义的格式，等待着被模板类 _template.class.php_ 中 _compiled_template()_ 方法中准备好的的正则表达式给捕捉到，这种格式一旦被正则匹配到，模板就会被替换成你要的格式，比如上面的例子中的 `<?php echo $this->get_var( \'$1\' ) ; ?>`，但这种格式完全不是固定的，你当然可以不转换成 PHP 语句，而直接替换成某个单词或者句子，这个完全是根据你的需求来定。

### **什么是模板引擎？**

从代码的角度来说，模板引擎就是将模板按照一定的约定，转换成实际要显示的内容的函数。

而这些约定是否存在，通常由正则表达式监听。如果正则匹配到制定的约定，那么就进行转换，基本原理就是这样。

### **模板思想**

模板到底有什么用？

这里我想结合静态博客生成程序  Jekyll  来说明一下。

在 Jekyll 中，也存在着很多模板变量，比如 {% raw %}{{ page.title }}{% endraw %}、{% raw %}{% include xxx.xxx %}{% endraw %}、{% raw %}{{ site.id }}{% endraw %} 等，需要明白的是，这些模板不是随便定义的，而是为了解决实际的问题而事先制定的，可以说每一个模板，在整个博客网站中都具有使用价值，等待着你按你的要求去调用，它们总能返回给你实用的内容。

Smarty 也一样，通过规定好很多场景下重复使用的模板，通过在不同的页面使用不同的模板，你可以玩出很多的花样，比如和 Jekyll 一样，生成一个博客网站。

同时由于 Smarty 是由 PHP 开发，所有你还可以使用 PHP 本身丰富的方法完成很多不可思议的东西。这和 Jekyll 中的 Liquid 语言是一样的道理，模板规定了很多丰富多彩的约定和格式，而与其密切相关的编程语言就可以对这些模板进行编程，从而完成更复杂的东西。

我想这就是模板存在的意义之一吧。
