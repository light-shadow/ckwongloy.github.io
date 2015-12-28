---
layout: post
title: 单例模式简单应用
category: Programming
tags: [单例模式, 设计模式, PHP]
latest: 2015年12月15日 15:41:09
---

> 一个类有且仅有一个实例，并且自行实例化向整个系统提供。

这就是单例模式的定义。所谓的 "单例" 指的其实是一个特殊类，通过这个特殊类只能向外提供一个易于外界访问的对象实例。

单例模式和面对对象是一起说的，其实这种情况我一度认为没有必要还要去写成一个类，反正只能被实例化一次，还是在自己内部，但是既然是面向对象，那么就按面向对象的思想来思考吧。

单例模式三大原则
-

1、构造函数需要用 private 修饰，以防止外部对该类进行实例化。即单例类不能在其他类中实例化，只能被其自己实例化。

2、拥有一个保存类实例的静态成员属性 `$_instance`。

3、拥有一个访问该实例的公共静态方法。

PHP 使用单例模式连接 MySQL 数据库
-

```
<?php

class SingleObj {
	static private $_instance ;
	static private $_connect_source ;
	private $_db_config = array(
		'host' => '127.0.0.1' ,
		'user' => 'root' ,
		'password' => 'enter' ,
		'db_name' => 'test'
	) ;

	private function __construct() {
	}

	static public function get_instance() {
		if( ! ( self::$_instance instanceof self ) ) {
			self::$_instance = new self() ;
			return self::$_instance ;
		}
	}

	public function connect_mysql() {
		if( ! self::$_connect_source ) {
			self::$_connect_source = mysqli_connect( $this->_db_config['host'], $this->_db_config['user'], $this->_db_config['password'] ) ;

			if( ! self::$_connect_source ) {
				@die( 'mysql_connect_error:'.mysqli_error() ) ;
			}

			mysqli_select_db( self::$_connect_source, $this->_db_config['db_name'] ) ;
			mysqli_query( self::$_connect_source, "set names UTF8" ) ;
			return self::$_connect_source ;
		}
	}
}

var_dump( SingleObj::get_instance()->connect_mysql() )  ;
```

参考
-

- [单例模式的七种写法](http://cantellow.iteye.com/blog/838473)
