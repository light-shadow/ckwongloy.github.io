---
layout: post
title: Web 应用中的缓存技术入门
category: Programming
tags: [Memcache, Redis, No-SQL, PHP]
latest: 2015年12月15日 14:10:26
---

缓存技术的出现主要是为了提高系统性能，其实缓存的思想在计算机技术的很多方面都有体现，比如计算机组成原理中我们学过一个叫做高速缓存存储器的东西，里面就讲了一个概念就是，**每一层存储设备都是较低一层的缓存**，这里体现出的就是一个存储分层的概念。

其实，在 Web 领域也一样，在不使用缓存之前，每次对数据的获取都需要查询数据库，两者之间依赖太大导致整个系统性能受到制约，特别是当请求数激增的时候，这时候服务器是很难抗住巨大流量带来的压力的。

通过在客户端和数据库直接增加一个缓存层，可以极大地减少对数据库的查询操作，而缓存的物理介质速度一般都是比较快的，比如内存，这样不仅降低了大量同一请求对数据库服务器的压力，也降低了对同一个数据的请求的响应时间，因为大多数数据库系统把数据都是存放在磁盘上，而磁盘的速度和内存却不是一个数量级的。

静态缓存( 磁盘级缓存 )
-

指的是保存在磁盘上的静态文件。通常用 PHP 方法把需要的数据生成并写到静态文件中。

##### PHP 操作缓存：1、生成缓存；2、获取缓存；3、删除缓存。

#### PHP 操作静态缓存举例

```
class Cache {
	private $_dir ;
	const EXT = '.txt' ;
	public function __construct() {
		$this->_dir = dirname( __FILE__ ).'/cached/' ;
	}
	/**
	* 静态缓存操作
	* @param string $key 文件名 必选
	* @param mixed $data 数据 可选，若不选则输出文件内容；若为 null 则删除文件 $key
	* @param string $path 文件路径 可选，若不选则为默认
	* @return mixed 返回值 boolean / array / string
	*/
	public function cache_crud( $key, $data = '', $path = '' ) {
		$filename = $this->_dir.$path.$key.self::EXT ;
		# 如果 $data 不为空则写入缓存
		# 注意若 $data = 0 那么 $data != '' 是真，所以要用 !== 来判断
		if( $data !== '' ) {
			# 如果数据为 null 则删除缓存
			if( is_null( $data ) ) {
				return @unlink( $filename ) ;
			}
			$dir = dirname( $filename ) ;
			if( !is_dir( $dir ) ) {
				mkdir( $dir, 0777 ) ;
			}
			return file_put_contents( $filename, json_encode( $data ) ) ;
		}
		if( !is_file( $filename ) ) {
			return FALSE ;
		} else {
			return json_decode( file_get_contents( $filename ), true ) ;
		}
	}
}
```

然后进行简单的测试：

```
$data = array(
	'id' => 0000 ,
	'name' => 'Li' ,
	'type' => array( 1, 3, 5 )
) ;
$cache = new Cache() ;
# 1. 添加名为 `test` 的缓存
$cache->cache_crud( 'test', $data ) ;
# 2. 查看名为 `test` 的缓存
print_r( $cache->cache_crud( 'test' ) ) ;
# 2. 删除名为 `test` 的缓存
var_dump( $cache->cache_crud( 'test', null ) ) ;
```

内存级缓存：Memcache/Redis
-

#### Memcache 和 Redis 的对比

- 用途：Memcache 和 Redis 都是用来管理数据的。

- 存放介质：他们数据都是存放在内存里面的。

- 持久化：Redis 可以定期将数据备份到磁盘，即实现持久化。

- 数据结构：Memcache 只是简单的 K/V 型缓存；Redis 不仅仅支持简单的 K/V 型缓存，同时还提供 list，set，hash 等数据结构的存储。

#### **Memcache 和 Redis 是如何操作数据的？**

先回顾 MySQL 是如何管理数据的：

终端执行 SQL 查询 => MySQL Server => 将查询结果返回终端。

Memcache 和 Redis 的原理也类似，唯一的区别就是它们没有 SQL 语句，即是 No-SQL 类型的数据管理系统，它们管理数据的命令没有 SQL 复杂而是一些简单的 `set`/`get` 命令。

#### **命令方式操作 Redis 步骤**

1、 启用 Redis 服务并开启 Redis 客户端。

```
cd /etc/redis
redis-server 6379.conf
cd /path/to/redis-stable/src/redis-cli
redis-cli
```

2、设置缓存值：`set index-mk-cache '数据'`。

3、获取缓存数据：`get index-mk-cache`。若 key 存在则输出 key 对应的值；若不存在或若缓存已过期 则返回 nil。

4、设置过期时间：`setex key 10 'cache'`。

5、删除缓存：`del key`。

#### **PHP 操作 Redis**

1、安装 phpredis 扩展。

2、PHP 链接 Redis 服务：`connect( $host, 6379 )`。

3、`set` 设置缓存。

4、`get` 获取缓存。

举例说明：

```
<?php
$redis = new Redis() ;
$redis -> connect( "127.0.0.1", "6379" ) ;
$redis -> set( 'id', 1024 ) ;
var_dump( $redis -> get ( 'id' ) ) ;
$redis -> setex( 'name', 10, "Li" ) ;		
?>
```

#### **PHP 操作 Memcache**

1、安装 Memcache 扩展

2、连接服务：`connect( $host, 11211 )`

3、`set` 设置缓存。

4、`get` 获取缓存。

PHP 操作 Memcahce 和 Redis 步骤基本相同，具体参考 PHP 手册。
