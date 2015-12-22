---
layout: post
title: 写一个基于 MVC 的微型框架
category: Programming
tags: [MVC, 框架, PHP, 工厂模式]
latest: 2015年12月20日 00:34:18
---

以前在 *[MVC 入门](programming/mvc-introduction.html)* 中写过一个最基本的 MVC Demo，现在在这个基础上，增加和完善一些功能和设计思路，写一个更具有实用价值的 MVC 微型框架，从而加深对 MVC 的理解和应用。

先来回顾一下不按照 MVC 模式开发一个 Web 项目通常会面临什么问题。

- 代码冗余、重用率低

在多个业务逻辑和多个文件中均可见到相似性程度非常高的代码。

- 前端和后台混杂，主要体现在 PHP 和 HTML 在同一个文件中以一种随意的姿势出现。

- 相似的功能被重复书写而非提取成一个模块

同第一条。程序文件写得松散，不够模块化，封装程度太低。

- 可维护性和可读性差

由于逻辑和界面混合，给阅读和升级带来不便，当时间过长出现 bug 很难排查。

当然，不是说只要采用 MVC 就一定能解决上述问题，但是按照 MVC 模式开发就更容易解决上述问题。

采用工厂模式创建类管理引擎
-

### 数据库工厂类

根据类名创建不同数据库的操作对象，可以统一管理对象的实例化，便于拓展和维护。

- DB.factory.class.php

```
<?php

class DB {
	public static $db ;    // Save the instance of each database class

	public static function init( $db_type, $db_conf ) {
		$db_type = ucfirst( $db_type ) ;
		self::$db = new $db_type ;
		self::$db->connect( $db_conf ) ;
	}
	
	public static function query( $sql ) {
		return self::$db->exec_query() ;
	}

	public function select( $obj, $src, $condition ) {
		return self::$db->select( $obj, $src, $condition ) ;
	}

	public function insert( $table, $data_arr ) {
		return self::$db->insert( $table, $data_arr ) ;
	}

	public function update( $table, $data_arr, $condition ) {
		return self::$db->update( $table, $data_arr, $condition ) ;
	}

	public function delete( $table, $condition ) {
		return self::$db->delete( $table, $condition ) ;
	}

	public function getAssocArr( $res ) {
		return self::$db->getAssocArr( $res ) ;
	}

	public function getArray( $res ) {
		return self::$db->getArray( $res ) ;
	}
}
```

### 视图工厂类

基本原理和数据库工厂类相同。

- VIEW.factory.class.php

```
<?php

class VIEW {
	public static $view ;

	# init view engine like Smarty; Notice that the $view_config is a type of array
	public static function init( $view_type, $view_config ) {
		$view_type = ucfirst( $view_type ) ;
		self::$view = new $view_type ;
		foreach( $view_config as $key => $val ) {
			self::$view->$key = $val ;
		}
	}

	# assign data into view engine like Smarty; Notice that the $data is a type of array
	public static function assign( $data ) {
		foreach( $data as $key => $val ) {
			self::$view->assign( $key, $val ) ;
		}
	}

	public static function display( $template ) {
		self::$view->display( $template ) ;
	}
}
```

为不同的数据库产品封装 DB 类
-

实际项目中几乎没有不使用数据库的，也就是说对数据库的操作频率是很高的，因此，同一个功能重复调用次数太多，必须为此封装一个方便调用的数据库操作模块。

除了按照 MVC 来组织项目文件，这里还按照面向对象的思想对各种模块进行封装。以封装与 PHP 关系最紧密的 MySQL 操作类举例说明，由于 `mysql` 的方式来操作 MySQL 的方式在新版本 PHP 中已经被弃用，所以下面的例子封装的是 `mysqli` 方法。

- Mysql.class.php

```
<?php
class Mysql {

	private $mysql_conf = array() ;
	private $link ;
	private $res ;

	public function connect( $mysql_conf ) {
		$this->mysql_conf = $mysql_conf ;
		$this->link = mysqli_connect( $mysql_conf['host'], $mysql_conf['user'], $mysql_conf['passwd'] ) or die( mysqli_error() ) ;		
		$this->mysql_init() ;
	}

	public function mysql_init() {
		mysqli_select_db( $this->link, $this->mysql_conf['db_name'] ) or die( mysqli_error() ) ;
		mysqli_query( $this->link, "set names ".$this->mysql_conf['encode'] ) or die( mysqli_error() ) ;
	}

	public function exec_query( $sql ) {
		$this->res = mysqli_query( $this->link, $sql ) ;
		return $this->res ;
	}

	public function select( $obj = '*', $src = 'class', $condition = '1' ) {
		$sql = 'select '.$obj.' from '.$src.' where '.$condition ;
		return $this->exec_query( $sql ) ;
	}

	public function getAssocArr( $res ) {
		$assoc = array() ;
		while( $row = mysqli_fetch_assoc( $res ) ) {
			$assoc[] = $row ;
		}
		return $assoc ;
	}

	public function getArray( $res ) {
		$arr = mysqli_fetch_array( $res, MYSQL_ASSOC ) ;
		return $arr ;
	}

	/**
	 * insert( $table, $data_arr ) : Insert data into a named table
	 * @param Sting $table; Table name of a database in MySQL
	 * @param Array $data_arr; Contains fields and values to be insert, notice that it is a one-dimensional array consist of keys and their values
	 * @return String; The primary key of this table
	 */
	public function insert( $table = 'class', $data_arr = array() ) {
		foreach( $data_arr as $key => $val ) {
			$key = mysqli_real_escape_string( $key ) ;
			$val = mysqli_real_escape_string( $val ) ;
			$key_arr[] = '`'.$key.'`' ;
			$val_arr[] = "'".$val."'" ;
		}
		
		$keys = implode( ',', $key_arr ) ;
		$values = implode( ',', $val_arr ) ;

		$sql = 'insert into '.$table.' ( '.$keys.' ) values( '.$values.' )' ;
		$this->exec_query( $sql ) ;
		return mysqli_insert_id() ;
	}

	/**
	 * update( $table, $data_arr, $condition ) : Update some data with given fields in this table
	 * @param Sting $table; Table name of a database in MySQL
	 * @param Array $data_arr; Contains fields and values to be update, notice that it is a one-dimensional array consist of keys and their values
	 * @param String $condition; Conditions of update operation
	 * @return none
	 */
	public function update( $table = 'class', $data_arr = array(), $condition = '1' ) {
		foreach( $data_arr as $key => $val ) {
			$key = mysqli_real_escape_string( $key ) ;
			$val = mysqli_real_escape_string( $val ) ;
			$key_val[] = '`'.$key."` = '".$val."'" ;
		}
		
		$keys_vals = implode( ',', $key_val ) ;

		$sql = 'update '.$table.' set '.$keys_vals.' where '.$condition ;
		$this->exec_query( $sql ) ;
	}

	/**
	 * delete( $table, $condition ) : Delete some data with given fields in this table
	 * @param Sting $table; Table name of a database in MySQL
	 * @param String $condition; Conditions of delete operation
	 * @return none
	 */
	public function delete( $table = 'class', $condition = '1' ) {
		$sql = 'update from '.$table.' where '.$condition ;
		$this->exec_query( $sql ) ;
	}

	# More ...
	// do something more
}
```

为系统工具和零散功能封装函数库
-

- framework/functions/MVC.function.php：详见 *[MVC 入门](../programming/mvc-introduction.html)*。

- framework/functions/secure.function.php：详见 *[MVC 入门](../programming/mvc-introduction.html)*。

自定义/第三方类库
-

### DB 引擎库

- framework/libs/db/mysql/Mysql.class.php：上面已经写过了。

### 视图引擎库

- framework/libs/view/smarty/Smarty.class.php：视图引擎使用的是现在比较流行的 Smarty 模板。

### 核心库

存放数据工厂类和视图工厂类等核心工厂类，上面已经写过了。

- framework/libs/core/DB.factory.class.php

- framework/libs/core/VIEW.factory.class.php

创建 include 文件清单
-

出现在清单中的文件都是必须被包含并使用的，便于维护。

- framework/main/include.list.php

```
<?php

$paths = array(
	'/functions/MVC.function.php' ,
	'/functions/secure.function.php' ,
	'/libs/core/DB.factory.class.php' ,
	'/libs/core/VIEW.factory.class.php' ,
	'/libs/db/mysql/Mysql.class.php' ,
	'/libs/view/smarty/Smarty.class.php' ,
	'/config/main.config.php' ,
	'/main/engine.class.php'
)

?>
```

为框架创建专门的配置文件
-

- framework/config/main.config.php

```
<?php

include '/config/mysql.config.php' ;
include '/config/smarty.config.php' ;

$main_conf = array(
	'db_conf' => array(
			'db_type' => 'mysql' ,
			'db_config' => $mysql_config
		) ,

	'view_conf' => array(
			'view_type' => 'smarty' ,
			'view_config' => $smarty_config
		)
	) ;

?>
```

- framework/config/mysql.config.php

```
<?php

$mysql_config = array(
			'host' => 'localhost' ,
			'user' => 'root' ,
			'passwd' => 'enter' ,
			'db_name' => 'class' ,
			'encode' => 'utf8'
		) ;

?>
```

- framework/config/smarty.config.php

```
<?php

# ??? 这里的配置为什么不起作用
# 当前路径的配置是直接配置的 /libs/view/smarty/Smarty.class.php

$smarty_config = array(

	'left_delimiter' => '{' ,
	'right_delimiter' => '}' ,
	'template_dir' => 'templates' ,
	'compile_dir' => 'templates_c' ,
	'cache_dir' => 'cache' ,
	'caching' => false ,
	'cache_lifetime' => 1024

	) ;
```

框架启动引擎
-

对框架各个模块和功能进行初始化，并调用控制器开始运行。

- framework/main/engine.class.php

```
<?php

class Engine {
	public static $controller ;
	public static $method ;
	private static $main_conf ;

	# 定义一个数组, 保存允许访问的控制器
	private static $controllers_available = array(
			'controllers' => array( 'test' ) ,
			'methods' => array( 'get', 'show' )
		) ;

	public static $a = array() ;

	private static function init_db() {
		DB::init( self::$main_conf['db_conf']['db_type'], self::$main_conf['db_conf']['db_config'] ) ;
	}

	private static function init_view() {
		VIEW::init( self::$main_conf['view_conf']['view_type'], self::$main_conf['view_conf']['view_config'] ) ;
	}

	private static function init_controller() {
		self::$a = isset( $_GET['a'] ) ? $_GET['a'] : 'index/index' ;
		self::$a = explode( '/', self::$a ) ;
		self::$controller = in_array( self::$a[0], self::$controllers_available['controllers'] ) ? str_escape( self::$a[0] ) : 'index' ;
	}

	private static function init_method() {
		self::$method = in_array( self::$a[1], self::$controllers_available['methods'] ) ? str_escape( self::$a[1] ) : 'index' ;
	}

	public static function run( $main_conf ) {
		self::$main_conf = $main_conf ;
		self::init_db() ;
		self::init_view() ;
		self::init_controller() ;
		self::init_method() ;
		C( self::$controller, self::$method ) ;
	}
}
```

框架入口脚本
-

```
<?php

header( 'Content-Type:text/html;Charset:UTF-8;' ) ;
date_default_timezone_set( 'Asia/Chongqing' ) ;

$current_dir = str_replace( '\\', '/', dirname( __FILE__ ) ) ;
include_once( $current_dir.'/main/include.list.php' ) ;
foreach ( $paths as $path ) {
	include_once( $current_dir.$path ) ;
}

Engine::run( $main_conf ) ;
```

附录：框架项目文件组织树
-

![mini-mvc-framework-project-tree](http://localhost.lamchuanjiang.org/inset/programming/mini-mvc-framework-project-tree.png)

总结
-

本次是对 MVC 设计模式的一次比较全面的实践。代码最新的改动详见我的 GitHub 仓库。

参考
-

- <https://github.com/lamChuanJiang/LBD/tree/master/mini-mvc-framework>
