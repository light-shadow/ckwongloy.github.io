---
layout: post
title: MVC 入门
category: Programming
tags: [MVC, 设计模式, PHP]
latest: 2015年11月25日 14:43:49
---

设计模式
-

设计模式是对软件开发中面临的一般问题的解决之道，是前辈们的经验结晶，可谓技术的最佳实践。

设计模式使代码编制真正工程化，因此是软件工程中的一个重要概念。

使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。在绝大多数场合下，使用设计模式都可以完美地解决问题。

每种模式在现实中都有相应的原理来与之对应，每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，MVC 就是最常见的设计模式之一。

当然，也有人把 MVC 定义为工程的组织方式，即用来管理项目的一种思想，我个人认为本质都是一样的。

PHP 程序员为什么要学习 MVC ？
-

- 可以快速上手各大主流 PHP 框架，比如 yii，thinkphp, ci 等。

- 快速适应多数公司的 Web 开发需求。

- 加深对 Web 系统架构的了解，为技术的进阶打下基础。

### MVC 有哪些优势？

- 视图、模型、控制器三层角色各司其职，有利于 **分工开发**。这样，对 Web 应用每一层的开发都可以交给更专业、更熟悉该领域的技术人员去完成，可以提高系统整体的质量。

- 有利于代码的 **重用** 和 **维护**。

什么是 MVC？
-

一种软件设计典范。用一种强制性要求业务逻辑和数据显示分离的办法来组织应用程序结构，将业务逻辑放到一个部件，在界面和用户围绕数据的交互能被改进和个性化定制的同时，而不需要重新编写业务逻辑。MVC 三大角色的作用分别是：

- __Model__：按要求从数据库中取数据。

- __View__：实际直接看到的 Web 界面。

- __Controller__: 向系统发出指令的工具和帮手。

MVC 工作流程举例
-

1、 浏览者：调用控制器，发出指令。

2、 控制器；按浏览者发出的指令选取一个合适的模型。

3、 模型：按控制器发出的指令取相应的数据。

4、 控制器：按指令取相应的视图。

5、 视图：把第 3 步取到的数据按用户想要的样子显示出来。

可以看出，控制器在 MVC 工作流程中充当了很重要的角色：**控制器调用模型，并在视图与模型之间处理相关逻辑**。

单入口机制
-

#### 什么是入口程序？

指在一个 Web 应用程序中，所有的请求都是指向一个脚本文件，通常都是 index.php，index.html，index.asp, index.jsp 等形式。所有对该 Web 应用程序的访问都必须通过这个入口，这种规定也被称为单一入口机制。

#### 入口程序有什么用？

- 统一 URL 格式：Web 应用的入口都统一为入口程序。

- 可以在入口文件中使用安全的方式接受传递来的控制器名和方法名。

一个简单而经典的 MVC 项目实例
-

通常在实际的项目开发中，项目文件中 M/V/C 的命名都是有规定的，为了开发和维护的方便，命名最好强制性统一，只以 Controller/Model/View 以示区分。

本例中还需注意的命名规范有：类名和文件名一致；类名采用首字母大写的驼峰法；函数名采用首字母小写的驼峰法；变量名采用 `小写+下划线` 的命名格式，比如保存类 TestController 的实例化对象的变量名就以这种形式进行命名为 $test_controller，可以做到见名知意。

命名的方式可以不一定非得是某种形式，但是一定要做到统一。

此外，一个控制器，最好对应一个/类模型和一个/类视图，表示专门处理一个业务，各种任务和逻辑最好强制性分开，不要耦合在一起。

举例说明：

### 控制器：mvc/controllers/TestController.class.php

```
<?php

require_once( '/models/TestModel.class.php' ) ;
require_once( '/views/TestView.class.php' ) ;

class TestController {
	function show() {
		$test_model = new TestModel ;
		$data = $test_model->get() ;
		$test_view = new TestView ;
		$test_view->display( $data ) ;
	}
}

?>
```

控制器最主要的两个任务：一个是专门用于调用模型来完成各种业务，并产生数据，一个调用视图是把模型产生的数据送往视图显示给用户。

### 模型/数据模型：mvc/models/testModel.class.php

```
<?php
class TestModel {
	function get() {
		return 'Hello Model.' ;
	}
}
?>
```

模型常常被称为数据模型 (YII)，专门处理与数据相关的业务，比如从数据库、缓存中取数据，然后把这些数据返回给控制器。

### 视图引擎：mvc/views/testView.class.php

```
<?php
class TestView {
	function display( $data ) {
		echo $data ;
	}
}
?>
```

视图的作用是将取得的数据进行组织、美化，最终会呈现在用户终端。

应该都知道 PHP 写的常见的视图引擎有：Smarty, PHPLIB 等等。但是我们不能仅仅使用，还要挖掘其背后隐藏的原理才能学得更深刻。

关于视图模板引擎的更多细节，详见文章末尾的其他博文。

### 入口脚本：mvc/index.php

```
<?php

require_once( '/controllers/TestController.class.php' ) ;

$test_controller = new TestController ;

$test_controller->show() ;

?>
```

入口脚本是该项目运行的起点，可谓牵一发而动全身。

有规矩，画方圆
-

上面例子中文件命名和存放的路径搞那么规范如果不加以利用是不是觉得有点浪费？的确是的。

为了简化对控制器、模型、视图的调用，我们可以利用统一化的项目文件对调用操作进行简单的封装。举例说明：

- mvc/tools/MVC.function.php

```
<?php

/**
 * This PHP file contains 3 functions ready for invoking classes M, V, C in a more convenient way 
 * @author    ckwongloy
 * @package   Basic MVC demo
 * @latest    2015-11-25 20:57:32
 */

/**
 * M( $name ): Instance one Model named $name; In MVC, methods of models usually have many parameters, so here skip it
 * @param String $name; Model name
 * @return Object $obj; The instance of one Model class
 */
function M( $name ) {
	require_once( '/models/'.$name.'Model.class.php' ) ;

	eval( '$obj = new '.$name.'Model ;' ) ;

	# !!! In a safer, like production environment do not use `eval()` but below instead
	// $Model = $name.'Model' ;
	// $obj = new $Model ;

	return $obj ;
}

/**
 * C( $name, $method ): Instance one Controller named $name and execute one method named $method
 * @param String $name; Controller name
 * @param String $method; Controller method
 * @return none; Controllers do not need any return value in MVC design pattern
 */
function C( $name, $method ) {
	require_once( '/controllers/'.$name.'Controller.class.php' ) ;

	eval( '$obj = new '.$name.'Controller ; $obj->'.$method.'() ;' ) ;

	# !!! In a safer, like production environment do not use `eval()` but below instead
	// $Controller = $name.'Controller' ;
	// $obj = new $Controller ;
	// $obj -> $method() ;
}

/**
 * V( $name ): Instance one View named $name; In MVC, methods of views usually have many parameters, so here skip it
 * @param String $name; View name
 * @return Object $obj; The instance of one View class
 */
function V( $name ) {
	require_once( '/views/'.$name.'View.class.php' ) ;

	eval( '$obj = new '.$name.'View ;' ) ;

	# !!! In a safer, like production environment do not use `eval()` but below instead
	// $View = $name.'View' ;
	// $obj = new $View ;

	return $obj ;
}

?>
```

- mvc/tools/secure.function.php

```
<?php

/**
 * This PHP file contains some functions in relation to secure
 * @author    ckwongloy
 * @package   Basic MVC demo
 * @latest    2015-11-25 20:57:32
 */

/**
 * str_escape( $str ): Escape string to a relative safer format, filter some sensitive chars like `'`, `"`, `<`, `>` etc.
 * @param String $str: The source string to be escaped
 * @return String; The escaped result of source string
 */
function str_escape( $str ) {
	return ( !get_magic_quotes_gpc() ) ? addslashes( $str ) : $str ;
}

?>
```

- mvc/index.php

```
<?php

require_once( '/tools/MVC.function.php' ) ;
require_once( '/tools/secure.function.php' ) ;

# 定义一个数组, 保存允许访问的控制器
$controllers_available = array(
		'controllers' => array( 'index', 'test' ) ,
		'methods' => array( 'get', 'show' )
	) ;

# URL style 1: index.php?a=controller/method
$a = explode( '/', $_GET[ 'a' ] ) ;

$controller = in_array( $a[0], $controllers_available['controllers'] ) ? str_escape( $a[0] ) : 'index' ;
$method = in_array( $a[1], $controllers_available['methods'] ) ? str_escape( $a[1] ) : 'index' ;

# URL style 2: index.php?c=controller&m=method
// $controller = in_array( $_GET[ 'c' ], $controllers_available['controllers'] ) ? str_escape( $_GET[ 'c' ] ) : 'index' ;
// $method = in_array( $_GET[ 'm' ], $controllers_available['methods'] ) ? str_escape( $_GET[ 'm' ] ) : 'index' ;

C( ucfirst( $controller ), $method ) ;

?>
```

- mvc/controllers/TestController.class.php

```
<?php

class TestController {
	function show() {
		$data = M( 'Test' )->get() ;
		V( 'Test' )->display( $data ) ;
	}
}

?>
```
- mvc/models/TestModel.class.php

```
<?php

class TestModel {
	function get() {
		return 'Hello MVC' ;
	}
}

?>
```

- mvc/views/TestView.class.php

```
<?php

class TestView {
	function display( $data ) {
		echo $data ;
	}
}

?>
```

进行这样的封装还有一个好处就是，当项目中出现的控制器、模型、视图文件越来越多的时候，类似上面这些可以直接通过控制器名字和操作来调用控制器的便捷性体现地更具体。

##### **注意：在路径的写法上最好使用绝对路径，这是为了避免与其他类文件的依赖过大。**

Q&A
-

- 为什么要慎用 `eval()` 函数？

`eval()` 函数调用简单但是不安全，因为 `eval()` 中的代码可以被浏览器执行，这很有可能被滥用。因此，在对安全性要求比较高的情况下，建议把 `eval()` 函数中的代码分解为几步单独执行。

参考
-

- _Design Patterns - Elements of Reusable Object-Oriented Software._

- *[Mini-Smarty 与模板](../php/smarty-and-template.html)*

- *[Smarty 学习笔记](../php/smarty-notes.html)*
