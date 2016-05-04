---
layout: post
title: Memcached 快速入门
category: Database+
tags: [Memcache, NoSQL, PHP]
latest: 2015年11月2日 12:26:32
---

Memcache/Memcached 是如今使用非常广泛的分布式高速数据缓存技术。

预备知识
-

- 什么是分布式？

多台服务器同时都安装同一个服务，以构成集群，发挥最好的性能。

- Memcache 为什么高速？

Memcache 对数据的所有操作和维护都是在内存中完成的，具有内存的高速特点。

- 为什么需要缓存技术？( Memcached/Redis )

随着网站规模的增大，对数据库的访问和操作次数将激增，而很多对数据库的操作都是重复的，得到的结果集有时候也是一样的，这对服务器资源可以说是无意义地浪费。

通过缓存技术，在 Web 应用和数据库之间增加一个缓存层，可以将已经从数据库中获取到的数据保存到缓存中，当需要第二次使用该数据的时候，就直接从缓存里面取，这种机制，一方面提升了速度，另一方面也减轻了数据库服务器的压力。

理解 Memcache
-

可以把 Memcache 理解成只有一张表的数据库，通过键值对存储数据。

这张表只有两个字段：`key` 和 `value`。`key` 在这里相当于 ID ( 用于保证查找时的唯一性 )。

在对 Memcache 中的数据进行操作的时候都是按 `key` 存取的。

##### **说明**：Memcache 和 Memcached 的区别？

Memcached 是 Memcache 的升级版，比 Memcache 增加了更多的操作，同时在稳定性和速度方面都比 Memcache 好。

### Memcache 使用场景

1. **非持久化存储**

对数据存储安全性要求不高的场合，即使保存在 Memcache 中的数据丢失了也不会造成多大影响。这就是说不要把 Memcache 当作真正的数据库，而要当成缓存使用。

2. **分布式存储**

Memcache 为大型分布式系统而生，所以不适合单独一台服务器使用，因为 Memcache 会占用比较大的内存。

如果非要在单机上安装使用 Memcache，那么建议将其安装在另一台独立的服务器上作为缓存服务器使用。

3. **Key/Value 存储**

Memcache 的数据是格式简单的键值对，不支持 List 、 Array 格式的数据格式，即 _Value_ 中保存的就是数据本身。

安装 Memcache
-

### 服务端 Memcached 安装

1. 编译安装 Libevent Memcache

详见客户端 Memcached 安装。

2. 使用软件包管理工具 ( yum/apt-get ) 安装

以在 Fedora 22 下安装 Memcached 举例说明：

- 通过软件包管理器 dnf 安装 Memcached

```
# dnf install memcached -y
```

- 启动 Memcached 守护进程

```
# /usr/bin/memcached -d -l 127.0.0.1 -p 11211 -m 256 -u root
```

`-d` 代表的是以守护进程的形式启用 Memcached。

`-l`、`-p`代表的是安装的 Memcached 服务器地址和端口，Memcached 的默认监听端口是 11211。

`-m` 代表的是为 Memcached 服务器分配多少内存。

`-u` 代表以什么身份运行 Memcached。

- 查看 Memcached 是否已经启动成功

```
# ps -ef | grep memcached
```

### 客户端 Memcached 安装

客户端使用 PHP 操作 Memcached，需要先安装 Libmemcached 扩展，然后安装 PHP 的 Memcached 扩展。


参考
-

- <http://memcached.org/downloads>

- <https://launchpad.net/libmemcached/+download>