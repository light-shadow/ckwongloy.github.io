---
layout: post
title: MySQL 基础操作
category: Database+
tags: [MySQL, SQL]
latest: 2015年04月20日 22:16:13
---

MySQL 最基本的命令总结，也是从 OneNote 上整理出来的 ( 现在习惯 Markdown 后发现以前做笔记是多乱啊 ) 。

MySQL 高级使用，以及 SQL 语法深入后面也会总结出来。

### MySQL 常用命令

- 登录 MySQL Server

```
mysql h localhost u root p your pwd
```

常用 SQL 语句
-

- 查看当前数据

```
show databases;
```

- 选择默认数据库

```
use db_name ;
```

- 设置字符集 ( 注意 utf8 代表的就是 utf8，不要减号  )

#### 设置数据库的字符集 

```
set names utf8 ;
```

#### 设置表的字符集

```
character set utf8 ;
```

- 查看数据库创建时/修改后的属性

```
show create database db_name ;
```

- 查看表创建时/修改后的属性

```
show create table tb_name ;
```

- 删除数据库 ( 操作不可逆！！！！ )

```
drop database db_name ;
```

- 修改数据库属性

```
alter database db_name "修改指令"
```

"修改指令" 可以是：设置字符集。

- 修改数据库名称 ( 数据库没有重命名指令 )

	1. 直接修改文件夹名称，但此方法不通用，也不建议

	2. 把旧数据库的数据导出，然后新建一个数据库，最后将旧数据库的数据导入到新的数据库，导入的过程中重命名

	3. 新建一个数据库，然后把旧数据库的表通过 rename 指令移动到新数据库

### 表的操作

- 指定表所属的数据库

	1. 设置默认数据库: use db_name ;

	2. 在指定表名时带上数据库名称：db_name.tb_name 

- 创建表

```
create table tb_name (
列结构定义
) 表选项 ;
```

列结构定义指：字段，及其数据类型或属性。

表选项可以是：字符集或者校对规则。

举例说明：

```
create table test (
id varchar(32),
username char(32),
time date
) character set names utf8;
```

- 查看当前数据库中有哪些表

```
show tables;
```

- 搜索表

```
show tables like '%PATTERN' ;
```

- 查看表结构

```
describe tb_name;

desc tb_name ;
```

- 删除表

如果由于操作系统的原因删除失败则应先在文件系统的级别上删除相应文件后再从数据库中删除。

```
drop table if exists tb_name ;
```

- 修改表名

```
rename table old_tb0 to new_tb1, old_tb1 to new_tb2, ... ;    
```

#### rename 的好处

1. 支持跨数据库重命名，也可以间接为数据库命名

2. 当表有前/后缀时，可以通过通配符同时修改多个表名

3. 交换两个表名

```
rename table table0 to temp, table1 to table0, temp to table1 ;
```

- 修改表的列定义

```
alter table tb_name [ add | modify | drop | change ] ;
```

1. 增加一个新列： add

```
alter table tb_name add new_column new_cloumn_definition
```

2. 修改一个列的定义：modify

修改列定义的时候不能跨类型修改，即不能从 int 直接修改为 varchar，要修改则先删除后新建

```
alter table tb_name modify cloumn_name new_definition
```

3. 删除一个列

```
alter table tb_name drop column_name ;
```

4. 重命名一个列

```
alter table tb_name change old_column new_column new_cloumn_definition
```

- 修改表选项

```
alter table tb_name character set utf8 ;
```

CRUD：Create, Read/Retrieve, Update, Delete
-

1. 创建/插入

在为所有字段插入值的时候，可以省略字段，但值列表要与字段一致。

字段列表和字段值列表之间用 , 隔开；需要使用引号括起来的地方不要忘了引号。

```
insert into tb_name (字段列表) values (字段值列表) ;
```

2. 获得/查询

```
select 字段列表 from tb_name where 查询条件 ;
```

3. 删除数据

虽然从语法上可以不带条件删除。但由于数据的重要性，而删除数据不可逆，所以最好的是都要带条件删除。

就算是删除所有，也最好带个 where 1。不能写 delete * from ...。

```
delete from table_name where condition; 
```

4. 修改数据

```
update tb_name set 字段1=新值1, 字段2=新值2, ... where 条件 ;
```

常用符号的含义
-

- `%`

MySQL 的通配符，表示任何字符的任何组合。

- `*`

表示所有字段。

- `+0`

表示将检索结果用整数形式输出。

- `\G`

当数据量比较多，结构比较混乱的时候，语句末尾用 \G 代替 ; 可以使输出的结果更加易读。

- `\c`

取消操作，避免执行 SQL 语句的时候 MySQL 报错。

- `\q`

退出 MySQL 客户端。
