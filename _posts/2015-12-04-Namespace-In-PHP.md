---
layout: post
title: PHP 中的命名空间
category: PHP
tags: [命名空间, PHP]
latest: 2015年12月4日 14:10:44
---

很多编程语言中都有命名空间这一机制，它解决了命名冲突的问题。以 PHP 举例说明：

为什么需要命名空间？
-
	
假设**同一个目录下**面有以下 3 个文件：

- a.php

```
<?php
	class T {
		 public function func_a() {
			// do something
		}
	}
?>
```

- b.php

```
<?php
	class T {
		 public function func_b() {
			// do something
		}
	}
?>
```

- index.php

```
<?php
	require_once( "a.php" ) ;
	require_once( "b.php" ) ;
?>
```

如果这时候运行 index.php，就会报错：类名冲突。

PHP 如何正确使用命名空间？
-

解决方法是使用 `namespace` 关键字在类文件前面声明一个命名空间，将两个文件中的类 T 放到不同的命名空间中。即：
	
- a.php

```	
<?php
	namespace a\b\c ;    // a.php 中的类 T 现在被分配到了命名空间 a\b\c 中
	class T {
		 public function func_a() {
			// do something
		}
	}
?>
```

- b.php

```	
<?php
	namespace e\f\g ;    // b.php 中的类 T 现在被分配到了命名空间 e\f\g 中
	class T {
		 public function func_b() {
			// do something
		}
	}
?>
```

由于 a.php 和 b.php 两个文件中的类 T 已经被分配到了两个不同的命名空间中，所以现在再执行 index.php 就不会报错了。

使用 use 关键字简化书写
-

但是，这样在实例化对象的时候，必须要在类名前带上命名空间，这给书写带来了不便，比如想要实例化 a.php 中的类 T 就需要这么写：`$a = new a\b\c\T() ;`

解决办法是使用 `use` 关键字在 index.php 文件中声明使用哪个命名空间中的类 T。即：`use a\b\c\T ;`

这样声明后，再实例化 a.php 中的类时，就可以直接这么写： `$a = new T() ;`

使用 use ... as ... 关键字为命名空间取别名
-

但是，这样又有一个问题，如果同时也想以声明的方式使用 b.php 中的类 T，那么也使用 `use e\f\g\T ;` 的话，又会出现类名冲突的错误，因为对于含有相同类名的几个命名空间来说，使用 use 关键字只能使一个命名空间中的类生效，即以最后使用 use 声明的命名空间为准。

当然，如果命名空间中的类名不冲突，use 可以将很多命名空间添加到当前脚本，然后使用命名空间中的类。

解决办法是采用**别名**，即：`use e\f\g\T as BT` ;

这样在 index.php 中实例化 b.php 中的类 T 的时候，就可以这么写：`$b = new BT() ;`

顶层类/全局类 的实例化
-

假设该目录下还有一个文件 c.php, 里面也有一个类 T，但是其前面没有使用 namespace 定义该类的命名空间，即 c.php 中的类 T 属于**顶层类/全局类**。

- c.php

```
<?php
	class T {
		 public function func_c() {
			// do something
		}
	}
?>
```

此时在 index.php 中引入该文件后，如果直接实例化 c.php 中的类 T，也会提示报错，因为前面在使用 a.php 中的类 T 的时候已经使用 use 关键字声明使用类 T 了。

解决之道是在实例化顶层类的时候在类名前加上反斜线 `\`，即：`$c = new \T() ;`

附录
-

index.php 中最终能正常实例化上述 3 个文件中的类 T 的代码如下：

```
<?php
	require_once( "a.php" ) ;
	require_once( "b.php" ) ;
	require_once( "c.php" ) ;
	
	use a\b\c\T ;
	use e\f\g\T as BT ;
	
	$a = new T() ;    // $a 是 a.php 中类 T 的实例化对象
	$b = new BT() ;    // $b 是 b.php 中类 T 的实例化对象
	$c = new \T() ;    // $c 是 c.php 中类 T 的实例化对象
?>
```

注意事项
-

命名空间定义时候不需要指定类名，而通过 use 加载命名空间的时候需要带上具体的类名。比如：

```
namespace a\b\c ;

use a\b\c\T ;
```
