---
layout: post
title: 无限分类和全路径导航
category: PHP
tags: [无限分类, 全路径导航, 递归, PHP]
latest: 2015年12月19日 12:58:26
---

所谓的无限分类就是一个分类下面可以创建多个子类，而其子类下面亦可以创建不同的子类，"子子孙孙无穷尽也"。

在生活中人类的族谱关系就是一个典型的无限分类体现，而在 Web 开发中，比如电商网站商品的无限分类也是到处可见。

此外，越来越多的网站采用了面包屑的导航方式，这种按子分类进行全路径导航也是无限分类的体现。

无限分类的实现思路
-

#### 1、递归算法 + PID 实现

所谓的递归就是函数自己调用自己的编程技巧，其本质也是一个循环。

理解递归比较困难的原因就是没用站在计算机的角度去理解程序，对于计算机而言，一次函数调用就是开辟一个新的地址空间进行同一逻辑的运算，虽然每次我们看起来调用的都是同一个函数，但是在计算机内部每次运算的内存空间都是不一样的。

说再简单点，不管调用哪个函数，在计算机内部都是统一对待的。

说远了，言归正传，不过在用递归实现无限分类之前，首先来看一下在递归函数中，当然其他函数也一样，PHP 是如何保存需要共享的数据的。通常有以下三种方法：

- $_GLOBALS[ $result ]

通过 PHP 超全局变量 `$_GLOBALS` 去保存公共数据，举例说明：

```
<?php
$i = 1 ;
function deeploop() {
	global $i ;
	echo $i++ ;
	if( $i < 10 ) {
		deeploop() ;
	}
}
deeploop() ;
?>
```

- static result

通过关键字 `static` 去声明一个静态变量来保存公共数据，举例说明：

```
<?php
function deeploop() {
	static $i = 1 ;
	echo $i++ ;
	if( $i < 10 ) {
		deeploop() ;
	}
}
deeploop() ;
?>
```

- 参数引用 &$result

引用应该是大部分高级语言都有的机制，至少 C/C++/Java/PHP 都支持，都是在引用变量之前使用 `&` 符号表示使用引用的方式寻找变量的值。

对传引用方式得到的变量，每次对它的修改都是唯一的，因为变量的引用指向的是同一块内存空间。这是跟按值拷贝形式传值的根本区别。由于每次访问的变量空间都是一样，所以该变量空间的值就成了公共的，举例说明：

```
<?php
function deeploop( &$i = 1 ) {
	echo $i++ ;
	if( $i < 10 ) {
		deeploop( $i ) ;
	}
}	
deeploop() ;
?>
```

以上 3 种方式输出结果都是一样的。

那么在实现无线分类的时候，就可以在递归中使用以上任何一种方式去保存公共数据，这里具体而言就是从数据库中查询得到的某种分类的所有 PID 关系。得到这种关系之后，接着就是用一些 PHP 方法把这种关系以一种对人类友好样式输出给用户就行了。

#### 2、全路径 + MySQL 实现

所谓的全路径，就是在 MySQL 中，用一个字段保存其所有父级 ID 顺序，然后使用 PHP 方法还原这种顺序关系，用这种方法实现的无限分类就是全路径无限分类。

全路径方式比递归方式稍微简单一些，但是在另一方面使得对数据的维护变更复杂，因为需要人为地确保父子数据的关系正确。

当从数据库中获得了这种关系之后，后面的步骤就和上面递归实现无限分类的思路一样了：用 PHP 方法把这种层级关系以一种对人类友好样式展现出来就可以了。

递归 + 父 ID 实现细节
-

#### 数据准备

```
create database test ;
use test ;
create table class (
	id int unsigned not null auto_increment primary key,
	pid int unsigned not null comment 'PARENT ID' ,
	cate_name varchar(30) not null comment 'CATEGORY NAME' ,
	cate_order int not null default '0' comment  'FOR SORTING' ,
	create_time int(10) not null comment  'CREATE TIME'
) ENGINE = MYISAM ;

insert into class values
( 1, 0, '新闻', 0, 0 ) ,
( 2, 0, '音乐', 0, 0 ) ,
( 3, 1, '国内新闻', 0, 0 ) ,
( 4, 1, '国际新闻', 0, 0 ) ,
( 5, 1, 'HACKER NEWS', 0, 0 ) ,
( 6, 3, '北京新闻', 0, 0 ) ,
( 7, 4, '纽约新闻', 0, 0 ) ,
( 8, 2, '林俊杰', 0, 0 ) ,
( 9, 2, '周杰伦', 0, 0 ) ,
( 10, 8, '不为谁而作的歌', 0, 0 ) ;
```

#### 递归实现的无限分类下拉列表和全路径导航源码

```
$mysqli = new MysqlHelper ;

/**
 * getList() 用递归获得所有分类列表
 * @param int $pid 某个子分类的父 ID
 * @param array $result 用于保存所有子分类及其父分类信息的数组
 * @param int $space 空格个数, 用于方便人眼区分层级关系
 * @return array 同上 $result
 */
function getList( $pid = 0, &$result = array(), $space = 0 ) {
	global $mysqli ;
	$space += 4 ;
	$res = $mysqli->select( '*', 'class', 'pid='.$pid ) ;
	$assoc = $mysqli->getAssoc( $res ) ;
	foreach( $assoc as $row ) {
		$row[ 'cate_name' ] = str_repeat( '&nbsp;', $space ).'|--'.$row[ 'cate_name' ] ;
		$result[] = $row ;
		getList( $row['id'], $result, $space ) ;
	}
	return $result ;
}
/**
 * getCategoryPath() 用递归获得某个子分类的全路径
 * @param int $cid 某个子分类的 ID, 按子分类向上查询它的所有父分类, 递归中的父子 ID 是个相对概念
 * @param array $result 用于保存每个子分类的所有信息
 * @return array $result 同上
 */
function getCategoryPath( $cid, &$result = array() ) {
	global $mysqli ;
	$res = $mysqli->select( '*', 'class', 'id='.$cid ) ;
	$assoc = $mysqli->getAssoc( $res ) ;
	# 由于 id 是唯一的，所以通过 id 查询到的结果也是唯一的
	foreach( $assoc as $v ) {
		$result[] = $v ;
		getCategoryPath( $v['pid'], $result ) ;
	}
	# 将数组按键名排序
	krsort( $result ) ;
	return $result ;
}
/**
 * displayCategory() 显示所有分类
 * @param int $selected_id 可选, 代表的是默认选中哪个选项
 */
function displayCategory( $selected_id = 1 ) {
	$html = getList() ;
	echo '<select name="category">' ;
	foreach( $html as $v ) {
		$selected = '' ;
		if( $selected_id == $v['id'] ) {
			$selected = 'selected' ;
		}
		echo '<option '.$selected.'>'.$v['cate_name'].'</option>' ;
	}
	echo '</select>' ;
}
/**
 * displayLinks() 显示某个子分类的全路径
 * @param int $cid 用于补全超链接地址
 */
function displayLinks( $cid ) {
	$html = getCategoryPath( $cid ) ;
	foreach( $html as $v ) {
		$href = basename( __FILE__ ).'?cid='.$v['id'] ;
		echo '<a href="'.$href.'" style="text-decoration:none;">'.$v['cate_name'].'</a> > ' ;
	}
}

displayLinks( 6 ) ;
displayCategory( 6 ) ;
```

效果如下：

![unlimited-category-and-fulllinks-by-recursion](http://localhost.lamchuanjiang.org/inset/php/unlimited-category-and-fulllinks-by-recursion.png)

全路径实现细节
-

#### 数据准备

```
create table phone (
	id int unsigned not null auto_increment primary key ,
	path varchar(300) not null ,
	cate_name varchar(20) not null ,
	cate_order int not null ,
	create_time int(10) not null
)  engine myisam charset utf8;

insert into phone values
(1, ',' , '手机', 0, 0) ,
(2, '1' , '功能手机', 0, 0) ,
(3, '1,2' , '老人手机', 0, 0) ,
(4, '1,2' , '儿童手机', 0, 0) ,
(5, '1' , '智能手机', 0, 0) ,
(6, '1,5' , '苹果手机', 0, 0) ,
(7, '1,5' , '安卓手机', 0, 0) ,
(8, '1,5' , 'Windows Phone', 0, 0) ,
(9, '1,2,4' , '色盲手机', 0, 0) ,
(10, '1,2,3' , '其他手机', 0, 0) ;
```

#### 全路径字段实现的无限分类下拉列表和全路径导航源码

```
/**
 * getPhonesList() 获得所有手机列表
 * @return 返回包含所有手机列表信息的数组
 */
function getPhonesList() {
	global $mysqli ;
	$res = $mysqli->select( "id, cate_name, path, concat( path, ',', id ) as fullpath", 'phone', ' 1 order by fullpath asc' ) ;
	$assoc = $mysqli->getAssoc( $res ) ;
	foreach( $assoc as $v ) {
		$deep = 4*count( explode( ',', trim( $v['fullpath'], ',' ) ) ) ;    // trim() 函数默认去除空格，但是可以指定参数为要去除的字符
		$v['cate_name'] = str_repeat( '&nbsp;', $deep ).'|--'.$v['cate_name'] ;
		$result[] = $v ;
	}
	return $result ;
}
/**
 * displayPhones() 显示手机所有分类
 */
function displayPhones() {
	$html = getPhonesList() ;
	echo '<select>' ;
	foreach( $html as $v ) {
		echo '<option>'.$v['cate_name'].'</option>' ;
	}
	echo '</select>' ;
}
/**
 * getPath() 获得某个子分类的全路径
 * @return array $result 保存的是某个子分类的所有父 ID 
 */
function getPath( $id ) {
	global $mysqli ;
	$res = $mysqli->select( "*, concat( path, ',', id ) as fullpath", 'phone', 'id='.$id ) ;
	$assoc = $mysqli->getAssoc( $res ) ;
	foreach( $assoc as $v ) {
		$ids = $v['fullpath'] ;
	}
	$reses = $mysqli->select( '*', 'phone','id in ('.$ids.') order by id asc' ) ;
	$assocs = $mysqli->getAssoc( $reses ) ;
	$result = array() ;
	foreach( $assocs as $v ) {
		$result[] = $v ;
	}
	return $result ;
}
/**
 * displayPhoneLinks() 显示某个手机分类的全路径
 * @param int $id 某个手机种类的 id
 */
function displayPhoneLinks( $id ) {
	$html = getPath( $id ) ;
	foreach( $html as $v ) {
		$href = basename( __FILE__ ).'?id='.$v['id'] ;
		echo '<a href="'.$href.'" style="text-decoration:none;">'.$v['cate_name'].' > </a>' ;
	}
}
displayPhoneLinks( 4 ) ;
displayPhones();
```

效果如下：

![unlimited-category-and-fulllinks-by-fullpath](http://localhost.lamchuanjiang.org/inset/php/unlimited-category-and-fulllinks-by-fullpath.png)

附录：MySQLHelper.class.php
-

就是上面两种思路实现中用到的用于操作 MySQL 的工具类：

```
class MysqlHelper {
	
	private $db_config = array(
			'host' => 'localhost' ,
			'user' => 'root' ,
			'passwd' => 'enter' ,
			'db_name' => 'class' ,
			'encode' => 'utf8'
		) ;

	private $link ;

	public function __construct() {
		$this->link = mysqli_connect( $this->db_config['host'], $this->db_config['user'], $this->db_config['passwd'] ) or die( mysqli_error() ) ;		
		mysqli_select_db( $this->link, $this->db_config['db_name'] ) or die( mysqli_error() ) ;
		mysqli_query( $this->link, "set names ".$this->db_config['encode'] ) or die( mysqli_error() ) ;
	}

	public function select( $obj = '*', $src = 'class', $condition = '1' ) {
		$sql = 'select '.$obj.' from '.$src.' where '.$condition ;
		$this->res = mysqli_query( $this->link, $sql ) ;
		return $this->res ;
	}

	public function getAssoc( $res ) {
		$assoc = array() ;
		while( $row = mysqli_fetch_assoc( $res ) ) {
			$assoc[] = $row ;
		}
		return $assoc ;
	}
}
```

改进
-

- 分类的移动、删除
