---
layout: post
title: MySQL 个人经验
category: Database+
tags: [MySQL, 数据库]
latest: 2015 年12月20日 14:22:49
---

以下是我经常用到的 MySQL 操作。

#### MySQL 远程登录

1. 先进入 mysql 终端：

```
GRANT ALL PRIVILEGES ON *.* TO 'USER'@'IP' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;
FLUSH PRIVILEGES;
use mysql;
select host, user from user;
exit;
```

其中， IP 和 PASSWORD 可以自定义，USER 是 mysql.user 中存在的用户。

1. 重启 MySQL
2. 防火墙放行 3306

### 批量修改表前缀

先上核心代码：

``` mysql
select CONCAT( 'ALTER TABLE ', table_name, ' RENAME TO hoper_', substring(table_name,10),';' ) FROM information_schema.tables Where table_name LIKE 'hpm_%';
```

具体步骤应该是：

先备份之前的数据库：

``` shell
mysqldump -uroot -p123456 iwebshop > iwebshop.sql
```

然后在终端中执行该语句并保存到 .sql 文件：

``` shell
mysql -uroot -p123456 -e "select CONCAT( 'ALTER TABLE ', table_name, ' RENAME TO chengyi_', substring(table_name,10),';' ) FROM information_schema.tables where table_name LIKE 'iwebshop_%';" > rename.sql

source rename.sql
```

然后进入 mysql 执行 rename.sql:

``` shell
mysql -uroot -p123456
source rename.sql
```

#### MySQL 备份还原／导入导出

- 方法一

cd 到mysql bin目录下用如下命令

```
# 导出整个数据库
mysqldump --opt -h192.168.0.156 -uusername -ppassword --skip-lock-tables databasename>database.sql
```

- 方法二

1.导出数据库（sql脚本）  

```
mysqldump -u 用户名 -p 数据库名 > 导出的文件名
mysqldump -u root -p db_name > test_db.sql
```

2.mysql导出数据库一个表

```
mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名
mysqldump -u root -p test_db users> test_users.sql （结尾没有分号）
```

3.导出一个数据库结构

``` mysql
mysqldump -u root -p -d --add-drop-table test_db >d:\test_db.sql
```

`-d` 不导出数据只导出结构；`--add-drop-table` 在每个 create 语句之前增加一个 drop table。

- 方法三

```
# 启动mysql服务
/etc/init.d/mysql start

# 导出整个数据库
mysqldump dbname > c:mydb.sql -u root -p 

# 导入数据库 source mydb.sql
mysql -u用户名 -p 数据库名 < 数据库名.sql
```

- 还原数据库

``` shell
mysql -u用户名 -p 数据库名 < 数据库名.sql
```

- 使用into outfile 和 load data infile导入导出备份数据

这种方法的好处是，导出的数据可以自己规定格式，并且导出的是纯数据，不存在建表信息，你可以直接导入另外一个同数据库的不同表中，相对于mysqldump比较灵活机动。


- 把select的mytable表中的数据导出到/home/db_bak2012文件

``` mysql
select * from mytable where status!=0 and name!='' into outfile '/home/db_bak2012'
fields terminated by '|' enclosed by '"' lines terminated by '\r\n' ;
```

导入刚才备份的数据，可以使用load file方法，下面的mysql命令，把导出的数据导入了mytable_bak的表中：

``` mysql
load data infile '/home/db_bak2012' into table mytable_bak
fields terminated by '|' enclosed by '"' lines terminated by '\r\n' ;
```

（4）导入数据库，常用source 命令

``` mysql
#进入mysql数据库控制台，
mysql -u root -p
mysql>use 数据库
mysql>set names utf8; （先确认编码，如果不设置可能会出现乱码，注意不是UTF-8） 

#然后使用source命令，后面参数为脚本文件（如这里用到的.sql）
mysql>source d:\test_db.sql
```

上边的实例只是最基础的，有的时候我们可能需要批量导出多个库，我们就可以加上 `--databases` 或者 `-B`，如下语句：

```
mysqldump  -uroot -p --databases test mysql # 空格分隔
```

还有的时候我们可能需要**把数据库内所有的库全部备份**，我们就可以使用 `-all-databases`，如下语句：

``` shell
mysqldump  -uroot -p -all-databases
```

#### 删除多张表

- 删除所有 `pre_` 前缀的表

``` mysql
SELECT   CONCAT( 'drop table ',table_name,'; ')   FROM   information_schema.tables where	
information_schema.tables.TABLE_NAME LIKE 'pre_%' ;
```

- 删除所有 `pre_` 前缀的表 并且 不删除 `pre_uc` 前缀的表

``` mysql
SELECT   CONCAT( 'drop table ',table_name,'; ')   FROM   information_schema.tables WHERE	
information_schema.tables.TABLE_NAME LIKE 'pre_%' AND information_schema.tables.TABLE_NAME NOT LIKE
'pre_uc%';
```

将得到的结果复制下来，再重新执行。

##### 删除多表相同的数据

1、从数据表t1中把那些id值在数据表t2里有匹配的记录全删除掉

``` mysql
DELETE t1 FROM t1,t2 WHERE t1.id=t2.id 或DELETE FROM t1 USING t1,t2 WHERE t1.id=t2.id	
```

2、从数据表t1里在数据表t2里没有匹配的记录查找出来并删除掉

``` mysql
DELETE t1 FROM t1 LEFT JOIN T2 ON t1.id=t2.id WHERE t2.id IS NULL 或	
DELETE FROM t1,USING t1 LEFT JOIN T2 ON t1.id=t2.id WHERE t2.id IS NULL
```

3、从两个表中找出相同记录的数据并把两个表中的数据都删除掉

``` mysql
DELETE t1,t2 from t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t1.id=25
```

注意此处 的delete t1,t2 from 中的 t1，t2 不能是别名。

``` 
delete t1,t2 from table_name as t1 left join table2_name as t2 on t1.id=t2.id where table_name.id=25	
```

在数据库里面执行是错误的（MYSQL 版本不小于5.0在5.0中是可以的）

``` mysql
delete table_name,table2_name from table_name as t1 left join table2_name as t2 on t1.id=t2.id where table_name.id=25;
```

在数据库里面执行是错误的（MYSQL 版本小于5.0在5.0中是可以的）

- 删除表中多余的重复记录，只留有rowid最小的记录（单字段）

``` mysql
Delete From 表	
Where 字段1 In (Select 字段1 From 表 Group By 字段1 Having Count(字段1) > 1) And
Rowid Not In (Select Min(Rowid) From 表 Group By 字段1 Having Count(字段1) > 1)
```

- 删除表中多余的重复记录，只留有rowid最小的记录（多个字段）

``` mysql
Delete From 表 a	
Where (a.字段1, a.字段2) In (Select 字段1, 字段2 From 表 Group By 字段1, 字段2 Having Count(*) > 1) And
Rowid Not In (Select Min(Rowid) From 表 Group By 字段1, 字段2 Having Count(*) > 1)
```

- 删除多于的重复记录（单个字段，多个字段）

``` mysql
delete from table where id not in ( select min(id) from table group by name)	
# 或者
delete from table where id not in ( select min(id) from table group by 字段1，字段2)
```

- 删除多余的重复记录（单个字段，多个字段）

``` mysql
delete from table where id in ( select max(id) from table group by name having count(*)>1)	
```

#### MySQL 去重

``` mysql
insert into chengyi.chengyi_brand select `id`+40, `name`,`logo`,`url`,`description`,`sort`,`category_ids` from iwebshop.iwebshop_brand ;

delete from chengyi_brand where `name` in( select `name` from chengyi_brand group by `name` having count(`name`)>1 ) and `id` not in( select min(`id`) from chengyi_brand group by `name` having count(`name`)>1 );
```

批量操作（sql 编程－存储过程）

```
delimiter $$
drop procedure  if exists wk;
create procedure wk()
begin 
declare i int;
set i = select `id` from chengyi_brand group by `name` having count(`name`)>1; l;
while i < 11 do 
insert into user_profile (uid) values (i);
set i = i +1;
end while;
end $$

delimiter ;
call wk();   
```

#### MySQL 乱码问题

如果在客户端执行：`set names gbk;` 其实只影响客户端的字符编码。

一劳永逸的办法是：`vim /etc/my.cnf`

```
[mysqld]
character-set-server=utf8    # 注意server的默认编码和其他的项目写法不一样

[mysqld_safe]
default-character-set=utf8

[client]
default-character-set=utf8

[mysql]                   
default-character-set=utf8  
```

重启 mysql 即可。

```
show variables like "char%" ;
```

或者 

```
status
```

其他解决办法

- 启动  mysql server 的时候指定参数

```
/etc/init.d/mysql.server start --character-set-server=utf8
```

- 进入 mysql 后执行：

```
set character_set_server=utf8;
```

这种方法再重新登录客户端后,就又恢复了原来的编码.理由很简单,系统启动的时候用的不是utf8编码。

#### 导入 sql 脚本

例如：我的用户名是root 密码是123 sql脚本存在C盘，名字为test.sql，数据库为test。

有两种方法可以执行脚本：

1：打开CMD输入以下命令（不需要转换目录）

``` mysql
>mysql -u root -p123
进入MYSQL后
mysql>use test;
mysql> source c:/test.sql
```

ok执行完了，你可以用 `show tables;` 查看有哪写表（记得语句后有个分号）
还可以用 `desc tableName;` 查看你的表结构。

2：打开CMD输入以下命令（进入mysql的bin目录）

```
d:\mysql\bin>mysql -u root -p123 test < c:/test.sql
```

#### CentOS 7 编译安装 MySQL 5.7

下载：http://dev.mysql.com/downloads/mysql/5.7.html#downloads， 到页面底部，找到Source downloads，这个是源码版本，下载第1个Tarball。

``` shell
# 新建一个名为mysql的用户组
groupadd mysql

# 在mysql用户组下新建一个名为mysql的用户
useradd -g mysql mysql

# 解压下载到的.gz文件
gunzip < mysql-VERSION.tar.gz | tar -xvf -

# 进入解压后的目录
cd mysql-VERSION

# 配置编译
CFLAGS=”-O3 -mcpu=pentium4″ CXX=gcc CXXFLAGS=”-O3 -march=pentium4 -felide-constructors -fno-exceptions -fno-rtti” ./configure –prefix=/home/mysql/ –without-debug –with-unix-socket-path=/home/mysql/tmp/mysql.sock –with-client-ldflags=-all-static –with-mysqld-ldflags=-all-static –enable-assembler –with-extra-charsets=gbk,gb2312,utf8 –without-innodb –without-isam –with-pthread –enable-thread-safe-client

# 配置 mysql

–prefix=/home/mysql/ \指定安装目录
–without-debug \去除debug模式
–with-extra-charsets=gbk,gb2312,utf8 \添加gbk,gb2312,utf8中文字符支持
–with-pthread \强制使用pthread库(posix线程库)
–enable-assembler \使用一些字符函数的汇编版本
–enable-thread-safe-client \以线程方式编译客户端
–with-client-ldflags=-all-static \以纯静态方式编译客户端
–with-mysqld-ldflags=-all-static \以纯静态方式编译服务端
–without-isam \去掉isam表类型支持，现在很少用了，isam表是一种依赖平台的表
–without-innodb \去掉innodb表支持，innodb是一种支持事务处理的表，适合企业级应用

# 编译 安装
make
make install

# 将mysql的配置文件copy到/etc目录下，并更名为my.cnf
cp support-files/my-medium.cnf /etc/my.cnf
```

/home/mysql下面有5个my-xxxx.cnf文件：

my-small.cnf 最小配置安装，内存<=64M，数据数量最少
my-large.cnf 内存=512M
my-medium.cnf 32M<内存<64M，或者内存有128M，但是数据库与web服务器公用内存 
my-huge.cnf 1G<内存<2G，服务器主要运行mysql
my-innodb-heavy-4G.cnf 最大配置安装，内存至少4G

``` shell
# 进入安装目录
cd /home/mysql

# 以mysql用户的身份建立数据表
bin/mysql_install_db –user=mysql

# 将mysql的主目录（即/home/mysql）的属主设为root用户。
chown -R root . # 若报错则改为 mysql 用户

# 将 var目 录的属主设为 mysql 用户
chown -R mysql var

# 将 mysql 的主目录的属主设为 mysql 用户组
# !!! 注意：和前面的命令不一样 这个命令是对用户组进行赋权
chgrp -R mysql .

# 启动mysql，如果一切正常的话，运行此命令后，不会有任何提示
bin/mysqld_safe –user=mysql &

# 修改root用户的密码，这里的root用户指的是mysql的root用户，与Linux的root用户无关
# 绿色的password就是你需要设置的新密码，牢记
bin/mysqladmin -u root password password

# 如果正常的话，用这个名字可以登录
# 在输入密码后，出现mysql > 的提示符表明登录成功。用quit命令可退出
bin/mysql -u root -p
```

以下命令用于设置 mysql 开机自动运行

``` shell
cd mysql-VERSION
cp support-files/mysql.server /etc/init.d/mysql
chmod 755 /etc/init.d/mysql
chkconfig –level 345 mysql on
service mysql restart
```

#### MySQL 的优化设置

打开/etc/my.cnf文件，修改以下设置，如果没有，可手动添加。调整设置时，请量力而行，这与你的服务器的配置有关，特别是内存大小。以下设置比较适合于1G-4G内存的服务器，但并不绝对。

```
# 指定索引缓冲区的大小，它决定索引处理的速度，尤其是索引读的速度。通过检查状态值Key_read_requests和Key_reads，可以知道 key_buffer_size设置是否合理。比例key_reads / key_read_requests应该尽可能的低，至少是1:100，1:1000更好（上述状态值可以使用show status like ‘key_reads’获得）。key_buffer_size只对MyISAM表起作用。即使你不使用MyISAM表，但是内部的临时磁盘表是 MyISAM表，也要使用该值。可以使用检查状态值created_tmp_disk_tables得知详情。 
key_buffer = 384M

# 要求MySQL能有的连接数量。当主要MySQL线程在一个很短时间内得到非常多的连接请求，这就起作用，然后主线程花些时间(尽管很短)检查连接并且启 动一个新线程。back_log值指出在MySQL暂时停止回答新请求之前的短时间内多少个请求可以被存在堆栈中。只有如果期望在一个短时间内有很多连 接，你需要增加它，换句话说，这值对到来的TCP/IP连接的侦听队列的大小。你的操作系统在这个队列大小上有它自己的限制。试图设定back_log高于你的操作系统的限制将是无效的。默认数值是50
back_log = 200

# 一个包的最大尺寸。消息缓冲区被初始化为net_buffer_length字节，但是可在需要时增加到max_allowed_packet个字节。缺 省地，该值太小必能捕捉大的(可能错误)包。如果你正在使用大的BLOB列，你必须增加该值。它应该象你想要使用的最大BLOB的那么大。
max_allowed_packet = 4M

#允许的同时客户的数量。增加该值增加 mysqld要求的文件描述符的数量。这个数字应该增加，否则，你将经常看到 Too many connections 错误。 默认数值是100
max_connections = 1024

# 指定表高速缓存的大小。每当MySQL访问一个表时，如果在表缓冲区中还有空间，该表就被打开并放入其中，这样可以更快地访问表内容。通过检查峰值时间的 状态值Open_tables和Opened_tables，可以决定是否需要增加table_cache的值。如果你发现open_tables等于 table_cache，并且opened_tables在不断增长，那么你就需要增加table_cache的值了（上述状态值可以使用show status like ‘Open_tables’获得）。注意，不能盲目地把table_cache设置成很大的值。如果设置得太高，可能会造成文件描述符不足，从而造成性能 不稳定或者连接失败。
table_cache = 512

#每个线程排序所需的缓冲
sort_buffer_size = 4M

#当一个查询不断地扫描某一个表，MySQL会为它分配一段内存缓冲区。read_buffer_size变量控制这一缓冲区的大小。如果你认为连续扫描进行得太慢，可以通过增加该变量值以及内存缓冲区大小提高其性能。
read_buffer_size = 4M

#加速排序操作后的读数据，提高读分类行的速度。如果正对远远大于可用内存的表执行GROUPBY或ORDER BY操作，应增加read_rnd_buffer_size的值以加速排序操作后面的行读取。
read_rnd_buffer_size = 8M

#用于REPAIR TABLE。不明白这个选项的用处，百度上找到的设置方向也是五花八门，有128M、64M、32M等，折中选一个。
myisam_sort_buffer_size = 64M

# 可以复用的保存在中的线程的数量。如果有，新的线程从缓存中取得，当断开连接的时候如果有空间，客户的线置在缓存中。如果有很多新的线程，为了提高性能可 以这个变量值。通过比较 Connections 和 Threads_created 状态的变量，可以看到这个变量的作用。
thread_cache_size = 128

#查询结果缓存。第一次执行某条SELECT语句的时候，服务器记住该查询的文本内容和它返回的结果。服务器下一次碰到这个语句的时候，它不会再次执行该语句。作为代替，它直接从查询缓存中的得到结果并把结果返回给客户端。
query_cache_size = 32M

#最大并发线程数,cpu数量*2
thread_concurrency = 2

#设置超时时间,能避免长连接
wait_timeout = 120

#关闭不需要的表类型,如果你需要,就不要加上这个
skip-innodb
skip-bdb
```

#### MySQL 安全设置

打开/etc/my.cnf文件，修改以下设置，如果没有，可手动添加。

```
# 取消文件系统的外部锁
skip-locking

# 不进行域名反解析,注意由此带来的权限/授权问题
skip-name-resolve
# 禁止MySQL中用“LOAD DATA LOCAL INFILE”命令。这个命令会利用MySQL把本地文件读到数据库中，然后用户就可以非法获取敏感信息了。网络上流传的一些攻击方法中就有用它的，它也是很多新发现的SQL Injection攻击利用的手段！
local-infile = 0
# 关闭远程连接，即3306端口。这是MySQL的默认监听端口。由于此处MySQL只服务于本地脚本，所以不需要远程连接。尽管MySQL内建的安全机制很严格，但监听一个TCP端口仍然是危险的行为，因为如果MySQL程序本身有问题，那么未授权的访问完全可以绕过MySQL的内建安全机制。（你必须确定，你是否真的不需要远程连接mysql）
skip-networking
```

修改完my.cnf后，还需要对mysql的用户名、帐号、及默认数据库进行调整
首先先登录mysql，在终端窗口输入 `/home/mysql/bin/mysql -u root -p`
然后会提示输入密码，输入正确密码后，会出现mysql>提示符。
输入以下命令：

```
mysql>use mysql;
mysql>update user set user=”centos” where user=”root”; (将mysql的root用户名修改成centos，防止root的密码被暴力破解)
mysql>select Host,User,Password,Select_priv,Grant_priv from user;
mysql>delete from user where user=”; （删除user用户）
mysql>delete from user where password=”; （删除user用户）
mysql>delete from user where host=”; （删除user用户）
mysql>drop database test; (删除默认的test数据库)
mysql>flush privileges; （刷新mysql的缓存，让以上设置立即生效）
mysql>quit;
```

为了使以上优化和安全设置生效，请重启Mysql服务或Linux。

## FAQ

##### 忘记 root 密码

- 第一种方式

```
# 停止 MySQL 或在任务管理器中关闭 mysql 进程
net stop mysql5 # 或 net stop mysql

# 进入 mysql 安全模式 当 mysql 起来后 不用输入密码就能进入数据库
mysqld-nt --skip-grant-tables; 

# 使用空密码的方式登录 MySQL
mysql -u root

# 更改 root 密码
use mysql
update user set password=PASSWORD("new_pwd") where user="root"; 

# 刷新权限表并退出重启后使用新密码登录
flush privileges; 
exit
```

- 第二种方式

首先在 MySQL的安装目录下 新建一个 pwdhf.txt,  输入文本如下：

``` sql
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('*****'); 
```

然后运行：

```
mysqld-nt --init-file=../pwdhf.txt
```

执行完毕 停止MySQL数据库服务 (任务管理器K掉 mysqld-nt 进程)，然后再重新以正常模式启动MYSQL 即可。

#### MySQL 重启失败
1.可能是/usr/local/mysql/data/rekfan.pid文件没有写的权限

解决方法 ：给予权限，执行 “chown -R mysql:mysql /var/data” “chmod -R 755 /usr/local/mysql/data”  然后重新启动mysqld！

2.可能进程里已经存在mysql进程

解决方法：用命令“ps -ef|grep mysqld”查看是否有mysqld进程，如果有使用“kill -9  进程号”杀死，然后重新启动mysqld！

3.可能是第二次在机器上安装mysql，有残余数据影响了服务的启动

解决方法：去mysql的数据目录/data看看，如果存在mysql-bin.index，就赶快把它删除掉吧，它就是罪魁祸首了。本人就是使用第三条方法解决的 ！http://blog.rekfan.com/?p=186

4.mysql在启动时没有指定配置文件时会使用/etc/my.cnf配置文件，请打开这个文件查看在[mysqld]节下有没有指定数据目录(datadir)。


解决方法：请在[mysqld]下设置这一行：datadir = /usr/local/mysql/data

5.skip-federated字段问题


解决方法：检查一下/etc/my.cnf文件中有没有没被注释掉的skip-federated字段，如果有就立即注释掉吧。

6.错误日志目录不存在


解决方法：使用“chown” “chmod”命令赋予mysql所有者及权限

7.selinux惹的祸，如果是centos系统，默认会开启selinux


解决方法：关闭它，打开/etc/selinux/config，把SELINUX=enforcing改为SELINUX=disabled后存盘退出重启机器试试。

#### MySQL Can not connect to MySQL 4.1+ using the old insecure authentication?

mysqlnd cannot connect to MySQL 4.1+ using the old insecure authentication. Please use an administration tool to reset your password with the command SET PASSWORD = PASSWORD('your_existing_password'). This will store a new, and more secure, hash value in mysql.user. If this user is used in other scripts executed by PHP 5.2 or earlier you might need to remove the old-passwords flag from your my.cnf file

##### MySQL Too Many Connections

出现这种错误明显就是 mysql_connect 之后忘记 mysql_close，当大量的connect之后，就会出现Too many connections的错误，mysql默认的连接为100个，而什么情况下会出现这种错误呢？

正常的mysql_connect 之后调用 mysql_close()关闭连接，但在连接错误时，会者mysql_real_query()出现错误退出时，可能忘记mysql_close()。

所以在程序 return 之前一定要判断是否 close()，最稳妥的方法就是在写任何函数时都只有一个出口。

还有可以通过修改mysql配置文件来加大允许连接的数量。

有时你的服务器是经常出现这样的错误呢，错误信息如下：

```
Can not connect to MySQL server
Error: Too many connections
Errno.: 1040
Similar error report has beed dispatched to administrator before.
```

从官方文档知道linux上面编译安装的mysql默认的连接为100个 文档：

<http://dev.mysql.com/doc/refman/5.0/en/too-many-connections.html>

mysql官方告诉我们需要修改max_connections的值,那么我们怎么去修改呢？有两种方法。

1、修改配置文件文件
修改/etc/my.cnf这个文件，在[mysqld] 中新增max_connections=N，如果你没有这个文件请从编译源码中的support-files文件夹中复制你所需要的*.cnf文件为到 /etc/my.cnf。我使用的是my-medium.cnf,中型服务器配置。例如我的[mysqld]的内容如下

```shell
[mysqld]
port = 3306
socket = /tmp/mysql.sock
skip-locking
key_buffer = 160M
max_allowed_packet = 1M
table_cache = 64
sort_buffer_size = 512K
net_buffer_length = 8K
read_buffer_size = 256K
read_rnd_buffer_size = 512K
myisam_sort_buffer_size = 8M
max_connections=1000
```

2、非使用mysqld脚本自动启动的用户。

修改 $MYSQL_HOME/bin/mysqld_safe 文件，例如：/usr/local/mysql/bin/mysqld_safe 这个文件：

```
grep -n ‘max_connection’ $MYSQL_HOME/bin/mysqld_safe
```

修改对应行号的 max_connections 参数值。

#####  BLOB:TEXT column 'logo_desc_zh' can't have a default value

<http://stackoverflow.com/questions/3466872/why-cant-a-text-column-have-a-default-value-in-mysql>

##### You can't specify target table 'chengyi_brand' for update in FROM clause？

Update: This answer covers the general error classification. For a more specific answer about how to best handle the OP's exact query, please see DanDarc's answer
In MySQL, you can't modify the same table which you use in the SELECT part.
This behaviour is documented at: http://dev.mysql.com/doc/refman/5.6/en/update.html
You will need to stop using the nested subquery and execute the operation in two parts, or alternatively use a simple where clause.
Below is from Baron Schwartz, published at Nabble:
However, you can do multi-table updates like this:

``` mysql
UPDATE tbl AS a
INNER JOIN tbl AS b ON ....
SET a.col = b.col
```

If you absolutely need the subquery, there's a workaround, but it's ugly for several reasons, including performance:

``` mysql
UPDATE tbl SET col = (
SELECT ... FROM (SELECT.... FROM) AS x);
```

The nested subquery in the FROM clause creates an implicit temporary table, so it doesn't count as the same table you're updating.

##### connect fail:Can’t connect to local MySQL server through socket ‘/home/mysql/tmp/mysql.sock‘ (13)[vis PHP]?

这是因为PHP没能正常的连接到Mysql套接字，即mysql.sock文件。首先，检查/home/mysql/tmp/目录下是否有 mysql.sock这个文件。如果没有，可能是mysql没有正常启动；如果有，可能是/home/mysql/tmp/这个目录的权限不够，用 `chmod 755 /home/mysql/tmp` 可解决此问题。

#### 附录：gcc的相关参数

-O3 \
-O
-O1
对于大函数，优化编译占用稍微多的时间和相当大的内存。

不使用`-O’选项时,编译器的目标是减少编译的开销,使编译结果能够调试.语句是独立的:如果在 两条语句之间用断点中止程序,你可以对任何变量重新赋值,或者在函数体内把程序计数器指到其他语句,以及从源程序中 精确地获取你期待的结果.
不使用`-O’选项时,只有声明了register的变量才分配使用寄存器.编译结果比不用 `-O’选项的PCC要略逊一筹.
使用了`-O’选项,编译器会试图减少目标码的大小和执行时间.
如 果指定了`-O’选项, `-fthread-jumps’和`-fdefer-pop’选项将被 打开.在有delay slot的机器上, `-fdelayed-branch’选项将被打开.在即使没有帧指针 (frame pointer)也支持调试的机器上, `-fomit-frame-pointer’选项将被打开.某些机器上 还可能会打开其他选项.

-O2
多优化一些.除了涉及空间和速度交换的优化选项,执行几乎所有的优化工作.例如不进行循环展开(loop unrolling)和函数内嵌(inlining).和-O选项比较,这个选项既增加了编译时间,也提高了生成代码的 运行效果.
-O3
优化的更多.除了打开-O2所做的一切,它还打开了-finline-functions选项.
-O0
不优化.
如果指定了多个-O选项，不管带不带数字，最后一个选项才是生效的选项。
-mcpu=pentium4 \ 根据CPU类型优化编译，可以让你的mysq表现更好！可选项目很多：i386, i486, i586, i686, pentium, pentium-mmx, pentiumpro, pentium2, pentium3, pentium4, k6, k6-2, k6-3, athlon, athlon-tbird, athlon-4, athlon-xp,athlon-mp,winchip-c6, winchip2 , c3.
-fomit-frame-pointer \对于不需要栈指针的函数就不在寄存器中保存指针，因此可以忽略存储和检索地址的代码，并将寄存器用于普通用途。所有”-O”级别都打开着一选项，但仅在调试器可以不依靠栈指针运行时才有效。建议不需要调试的情况下显式的设置它。

#### 参考

- <http://www.111cn.net/database/mysql/53453.htm>

- <http://www.cnblogs.com/blackpuppy/p/upgrade_mysql_from_55_to_56_on_centos.html>

- <http://stackoverflow.com/questions/8831183/error-mysqlnd-cannot-connect-to-mysql-4-1-using-the-old-insecure-authenticatio>

- <https://typecodes.com/web/centos7compilemysql.html>

- [10分钟学会理解和解决MySQL乱码问题](http://cenalulu.github.io/mysql/mysql-mojibake/)

- [mysql服务端编码设置](http://www.blogjava.net/zhyiwww/archive/2012/03/01/371055.html)
