---
layout: post
title: PHP 个人经验及问题
category: PHP
tag: PHP
latest: 2015年07月18日 21:01:21
---

## Exp

- 逻辑尽可能放在写操作。

- 前台做校验：体验＋安全；后台做校验：安全。

- 尽可能不要在循环／迭代中调用函数。

- 使用单引号括起来的字符串

当使用双引号来括字符串时,PHP解释器会对其进行变量替换、转义等操作,如 “\n”。

如果只 输出一个基本的字符串,用单引号会节省一些资源。当然,如果需要进行变量替换的,那就必用双引号了。

- 字符串的输出

以下哪一条语句的运行速度最快?

``` php
print “Hi my name is $a. I am $b”$$

echo “Hi my name is $a. I am $b”$$

echo “Hi my name is “.$a.”. I am “.$b;

echo “Hi my name is “,$a,”. I am “,$b;

echo ‘Hi my name is ‘,$a,’. I am ‘,$b;
```

最后一条的运行速度是最快的。 

print比echo要慢,在字符串中进行变量替换时会慢,而连接字符串要比用逗号连接来得慢。

所以,不在字符串中进行变量替换不仅会加快程序运行速度,也会让你的代码在任何语法高亮显示的编辑器中显得更为易懂 (变量会被高亮显示出来)。

很少人知道 echo 的参数可以用逗号连接,且速度会比字符串连接要来得快。

- 在数组索引中使用单引号

正如你在上面的测试题中所看到的，$x[sales]从严格意义上来说是错误的,索引应该被括起来，即$x['sales']。

这是因为PHP会将 没有括起来的索引辨认为“裸”字符串,并把它解释为一个常量。

当找不到该常量的定义时,才将其解释为一个字符串,所以这条语句才是可运行的。

索引括起来 可以省去这部分工作,如果将来正好要用这一字符串定义常量时也就不会有错误 了。

- 不使用开始标志的缩写形式

你正在使用这样的符号吗? `<?` 是非常糟糕的符号,它会引起与 XML 解释器的冲突。

而且一你发布了这些代码,那么使用者就必须修改php.ini文件来打 开对此符号的支持。所以实在没有理由去使用这种形式。用 `<?php` 吧。

- 尽量不要使用正则表达式

在进行 常规的字符串操作时,尽可能不要去使用正则表达式(preg和ereg系列函 数)。str_replace函数要比preg_replace快得多,甚至 strtr函数也要比str_replace来得快。省 这些不必要的麻烦吧,你的老板会感谢你的。

- 不要在循环声明中使用函数

这个问题不单单出现在PHP中,你可以在其他语言的代码中经常看到:

``` php
// 差
for($i=0;$i< count($array);$i++){...}
```
－ 配置

在使用时间有关的 API 的时候,需要规定好 `date_default_timezone_set()` ;

- 静态资源

静态资源子之所以称为静态资源,就是因为它们是不会变动的,因此最好的办法是放到服务器上的一个固定的位置,如果项目需要就是用 URL 去引用,而不是每写一个项目就放入这些 库。

后台规定图片上传路径的时候为了在开发阶段方便,在 .gitignore 中不要把图片加入版本控制。

- 数据库

数据库是项目的核心,后台开发时最麻烦的事情就是改动数据库。

通常情况下,每个业务逻辑下面都包含若干个实体,而业务逻辑是由业务需求决定的,由于众所周知的事实是,需求变动是相当常见的,因此,业务逻辑也会跟着变,导致实体的属性
及其数量都会不一样。

通常情况下,我们为每个实体建立一张表,为每个属性建立一个字段,这样的好处是可以很清晰的看到表的组成,而且在需要对某个属性进行专门的操作的时候会很方便,增删改也比
较灵活,但是不足之处就是需求变动会重新修改表。

为了灵活应对需求变更,在创建数据库表的时候可以只为主键建立字段,而其他属性都可以 通过 PHP 的方法,将实体属性保存到数组,然后将数组转换为 json 字符串,最后使用 base64 加密后存入同一个字段,这样当业务发生改动,只需要做的就是在 PHP 脚本中对数 组中的某个元素进行增删改而不需要重新操作表。

不过这样的缺点就是不够灵活,比如想要搜索数据库中的某个非主键的字段,就不得不先全部搜索出来然后交给 PHP 处理。

为了既满足灵活又减少对数据库的操作,这里可以有几个折中的办法:

不适用 base64 加密,而只是转为 json 字符串,这样在搜索的时候仍然可以按关键字查找。

将排序的属性和最容易被搜索的属性专门建立索引。
     

- mbstring

虽然许多语言每个必要字符都能一对一映射到 8 比特(bit)的值,但也有好几种语言需要非常多的字符来书面通讯,以至于它们的编码范围不能仅仅包含在一个字节里(一个字节 Byte 由 8 比特 bit 构成。

每一比特仅能包含两种不同的值: 1 或 0。所以,一字节仅能够表示 256 种不同的值, 即 2 的八次方)。

开发多字节字符编码方案是为了在基于字节的常规编码系统中表达超过 256 个 字符。

在你操作(trim、split、splice 等等)多字节编码的字符串的时候,由于在这种编码方案下,两个 或多个连续字节可能只表达了一个字符,所以你需要使用专门的函数。

否则,当你将不能检测多 字节字符串的函数应用到这个字符串的时候,它可能无法检测多字节字符的起始位置,并以乱码 字符串结尾,基本丢失了它原来的意思。 

mbstring 提供了针对多字节字符串的函数,能够帮你处理 PHP 中的多字节编码。

除此以 外,mbstring 还能在可能的字符编码之间相互进行编码转换。 

为了方便起见,mbstring设 计成了 处理基于 Unicode 的编码,类似 UTF-8、UCS-2 及诸多单字节的编码。

- include 和 require

include() 、require()语句包含并运行指定文件。

这两结构在包含文件上完全一样,唯一的区别 是对于错误的处理。

require()语句在遇到包含文件不存在,或是出错的时候,就停止即行,并报 错。include()则继续即行。

``` php
include('hello.php');
echo 'include test final!';//include报错,但是会继续执行,显示:include test final!
require('hello.php');
echo 'require test final!';//require报错,停止代码的执行。
```

1、include() `include(/path/to/filename)`

include()语句将在其被调用的位置处包含一个文件。

包含一个文件与在该语句所在位置复制制定 文件的数据具有相同内容的效果。

使用include()时可以忽略括号。

可以根据条件来执行include()语句。

在条件语句中使用include()有个怪现象,它必须包围在语句
块大括号中,或者用其他语句包围符括起来。 

2、include_once()

include_once()函数的作用与include相同,不过它会首先验证是否已经包含了该文件。

如果已经包含,则不再执行include_once。否则,则必须包含该文件。除了这一点与include完全相同。 

3、require()

require()在很大程度上与include相同,都是将一个模板文件包含到require调用坐在的位置。

require和include之间有两点重要的区别。

首先,无论require的位置如何,制定文件都将包含 到出现require的脚本中。

例如,即使require放在计算结果为假的if语句中,依然会包含指定文件。

第二个重要的区别是:require出错时,脚本将停止运行,而在使用include的情况下,脚本将继续执行。

4、require_once()

随着网站越来越大,可能会出现重复包含某些文件。

这也许不是问题,但又是修改了所包含文件的变量后,却由于后面再次包含原来的文件而被覆盖,可能不希望出现这种情况。

还可能出现另 一个问题,即所包含文件中函数名的冲突。使用require_once就可以解决这些问题。

require_once函数确保文件只包含一次。在遇到require_once后,后面再试图包含相同的文件时 将被忽略。

#### 二次开发

1、二次开发是什么? 

二次开发,简单的说就是在现有的软件上进行定制修改,功能的扩展,然后达到自己想要的功能和效果,一般来说都不会改变原有系统的内核。

2、为什么要二次开发?

随着信息化技术的不断发展,IT行业涌现出了一系列优秀的开源作品,其作者或是个人,或 是项目小组,或是软件公司。

选择和应用这些优秀的开源软件,并在此基础上进行符合业务需求的二次开发,将给企业节省信息化成本(时间成本及开发成本),更能带来技术上的保障。

所以国内很多公司需要二次开发的人才。

3、二次开发怎么做? 

首先,你要有这个开源产品的所用语言的语言基础,能看懂代码是最基本的。

其次,你要对这个开源产品的功能和使用比较熟悉,因为熟悉了,你才知道一个需求下来,

你要改什么,什么是系统自带的,大概要怎么改。

然后,你要熟悉这个开源产品的数据结构,代码结构,系统的框架结构,核心是哪里,附属功能是在哪里。

简单点说,就是数据库,代码逻辑,文件目录的熟悉。

最后,根据你的需求,然后利用开源产品的内核,进行系统的扩展和修改,以达到你的需求。

4、PHP开源产品的二次开发的基本要求:

第一, 基本要求

HTML(必须要非常熟悉),PHP(能看懂代码,能写一些小系统,如:留言板,小型CMS),Mysql(至少会一种数据库),Javascript(能看懂,能改现成的一些代 码),Div+Css(能进行界面的调整,明白CSS是怎么使用的);

第二, 熟悉开源产品的使用

比如 Dedecms,你要知道怎么登录,怎么新建栏目,怎么添 加文章,模板标签的使用方法,模型的概念和使用方法等等一些功能;

第三, 要熟悉这个开源产品的数据库结构,还要理解里面核心文件的内容

比如:数据库 类怎么使用,常用的安全过滤是怎么做的,模板引擎又是怎么使用的等等一些核心内容。还要知道这个开源产品的目录结构,就是说,你要知道哪是放模板的,哪里是做控制的,哪里是放样式 的,等等;

第四, 熟悉你的需求,对需求进行解读,然后确定如何对这个开源产品进行修改和扩展。

经过二次开发后,你能获取到的是什么呢?你能完成你的需求,你能积累经验,这里的经验有你自己的,也有别人的。

所谓别人的,就是在你做这个二次开发的时候,你能吸收到这个系统的精华,然后融入到你自己的思想里,你还能总结项目架构的经验。

有句话说的好,就是:聪明的人会把别人的失败的经验当作自己的经验,而傻的人就是自己无数次体验失败后才作为自己的经验。

二次开发不仅仅是开发,而更重要的是吸取精华,总结经验,理顺思路,少走弯路,提升自己。站在巨人的肩膀上,你将看的更远!

## Q&A

- **require_once 和 include_once**

`require_once` 一定会执行，`include_once` 可以根据条件选择性地执行。

- **post 和 get 容量问题**

get 是通过URL提交数据，因此 GET 可提交的数据量就跟 URL 所能达到的最大长度有直接关系。

很多文章都说 GET 方式提交的数据最多只能是 1024 字节，而实际上，URL不存在参数上限的问题,HTTP协议规范也没有对 URL长度进行限制。

这个限制是特定的浏览器及服务器对它的限制。

IE对URL长度的限制是2083字节(2K+35字 节)，对于其他浏览器,如 FireFox,Netscape 等,则没有长度限制,这个时候其限制取决于服务器的操作系 统。

即如果url太长,服务器可能会因为安全方面的设置从而拒绝请求或者发生不完整的数据请求。

post 理论上讲是没有大小限制的,HTTP协议规范也没有进行大小限制,但实际上post所能传递的数据量大小 取决于服务器的设置和内存大小。

因为我们一般post的数据量很少超过MB的,所以我们很少能感觉的到post 的数据量限制,但实际中如果你上传文件的过程中可能会发现这样一个问题,即上传个头比较大的文件到服务 器时候,可能上传不上去,以php语言来说,查原因的时候你也许会看到有说PHP上传文件涉及到的参数PHP 默认的上传有限定,一般这个值是2MB,更改这个值需要更改php.conf的post_max_size这个值。

这就很明白的说明了这个问题了。

- **rename() 中文乱码问题**

``` php
// 1
rename( iconv('UTF-8','GBK', $old_name ), iconv('UTF-8','GBK', $new_name ) )

// 2
mb_convert_encoding
```

- **关于同名成员函数**

为了保持与旧版 php 的兼容(与类名相同的方法被称为构造函数),PHP5 也保留了这一特性,但是 PHP5之后的版本有了自己专门的构造函数 __construct()。

- __Can't use function return value in write context?__

<http://stackoverflow.com/questions/17139264/cant-use-function-return-value-in-write-context>

- __Automatically populating $HTTP_RAW_POST_DATA is deprecated__
 
php.ini => -1
 
如果是在 PHPStorm 等 IDE 中使用内置的 PHP Server 则会出现这种情况，通过服务器（Apahce/Nginx） 等正常访问即可。 
 
http://xxxxx 和 ../path/to 这两种形式也不一样 

- **error_reporting(2047)**

php.ini 文件中有许多配置设置。

您应当已经设置好自己的 php.ini 文件并把它放在合适的目录中,就像在 Linux 上安装 PHP 和 Apache 2 的文档说明中所示的那样(请参阅 参考资料)。

在 调试 PHP 应用程序时,应当知道两个配置变量。下面是这两个变量及其默认值: 

```
display_errors = Off
error_reporting = E_ALL
```

E_ALL能从不良编码实践到无害提示到出错的所有信息。

E_ALL 对于开发过程来说有点太细, 因为它在屏幕上为一些小事(例如变量未初始化)也显示提示,会搞糟浏览器的输出 所以不建议使用2047,最好把默认值改为:

`error_reporting = E_ALL & ~E_NOTICE`。

- **PHP 中 exit() return() die() 的区别**

网上搜索die与exit两个函数的区别,大部分的”标准答案”都是说die是退出并释放内存,exit是退出但不释放内存。


这个解释显然是错的,PHP手册中已经说过

> “die — Equivalent to exit().This language construct is equivalent to exit(). ”

两者只是别名关系,除此之外完全一样。 不过我还是很好奇,决定从源码中找找线索,看看php是如何处理的这个“别名”。 

首先要清楚一点,die和exit都是”language construct”而非函数,网上也有很多说某某某有返回值是函数,某某无返回值是结构,很多初学者总搞不清语言结构和函数的区 别.

用通俗点的话讲,语言结构可以理解为语法本身的一种标识。像+、-、*、/这些也都是语言结构,if、else、for、while,这些都是语言结构。是语法本身的一部分。

任何语言都会有这些东西,因为计算机看到+不会认为是应该做加法的。这需要编译器转换为机器码也就是cpu能够识别的指令集。 

php 执行源码时的整个过程为:

首先按照 zend_language_scanner.l 中定义的, 将源码 中的echo、if之类的语言结构转换成类似的T_ECHO、T_IF这些token,并且会去掉源码 中的空格,注释这些与程序逻辑无关的字符,就形成了一些简短的表达式,这就是词法 分析阶段。

然后会按照zend_vm_opcodes.h中定义的,将这些token转换为op code。然后一条一行的执行这些op code。 

上面大概解释了php的编译和执行的过程,以及语言结构的定义。下面进入正题。 

我们也应该记得,php中有很多别名函数,比如:implode和join。

无论是别名函数还是别名语言结构,从实际效果角度讲,都是一样的,不过源码的处理方式肯定还是不一样的。

我们先看看这个别名语言结构是如何处理的,稍后再看别名函数。

zend_language_parser.c中,定义了一个宏#define T_EXIT 300 还定义了一个enum,里面也有

```c
enum yytokentype {
...
T_EXIT = 300,
....
} 这里告诉我们,T_EXIT这个token,它的code是300。再看zend_language_scanner.l, 其中有这么几行代码。
<ST_IN_SCRIPTING>”exit” {
return T_EXIT;
}
<ST_IN_SCRIPTING>”die” {
return T_EXIT;
}
```

很明显,php做词法分析时,无论遇到exit还是die,都会返回T_EXIT这个token。从这里就可以证明,die和exit,再php内部处理是完全一样的。

也可以用下列 php 代码来确定:

``` php
<?php
var_dump(token_get_all(“<?php die;exit;?>”)); 
```

返回的结果中die和exit对应的token code,都是300。

现在关于die和exit的问题,我想大家应该可以确定了,只是名字不同,效果都是一样的,没有所谓的卸不卸载内存的问题。

##### 其他说法

- die()停止程序运行,输出内容

- exit是停止程序运行,不输出内容

- return是返回值

- die是遇到错误才停止

- exit是直接停止,并且不运行后续代码

- exit()可以显示内容

- return就是纯粹的返回值了,但是也不会运行后续代码

- exit(0)正常运行程序并退出程序; exit(1):非正常运行导致退出程序

- return():返回函数,若在主函数中,则会退出函数并返回一值
          
详细说:

1.return 返回函数值,是关键字; exit 是一个函数。  

2.return是语言级别的,它表示了调用堆栈的返回;而exit是系统调用级别的,它表示了 一个进程的结束。

3.return 是函数的退出(返回);exit是进程的退出。  

4.return是C语言提供的,exit是操作系统提供的(或者函数库中给出的)。  

5.return用于结束一个函数的执行,将函数的执行信息传出个其他调用函数使用;exit函 数是退出应用程序,删除进程使用的内存空间,并将应用程序的一个状态返回给OS,这 个状态标识了应用程序的一些运行信息,这个信息和机器和操作系统有关,一般是 0 为 正常退出,非0 为非正常退出。

6.非主函数中调用return和exit效果很明显,但是在main函数中调用return和exit的现象 就很模糊,多数情况下现象都是一致的

- **编码规范**

PEAR PSR-0~7 每种框架都有自己的编码规范。


- __[PEAR](http://pear.php.net/index.php)__

- __[PECL](http://pecl.php.net/)__

- **PHP 的全局变量**

PHP 的全局变量和 C 语言有一点点不同,在 C 语言中,全局变量在函数内部可以非被局部变量覆盖。这可能引起一些问题,有些人可能不经意间修改了全局变量。

PHP 中全局变量在函数中使用时必须申明变量为全局。

- PHP 权限管理
	
	- <https://en.wikipedia.org/wiki/Role-based_access_control>

	- <http://blog.51yip.com/php/983.html>

- PHP 换行

分析:浏览器识别不了\n或\r\n,这两个换行符是文本换行符,文本文件有效。

在网页中查 看HTML源代码可以发现代码 `\n` 成功实如果需要将结果输出到浏览器或打印到显示器,代码中使用 `</br>`; 如果只是在源代码中换行,则使用 `\n` 或 `\r\n`。

- PHP 跳转

	- php 函数跳转

	缺点,header 头之前不能有输出,跳转后的程序继续执行,可用exit中断执行后面的程序。

	```
	header("Location: 网址");    //直接跳转
	header("refresh:3;url=http://axgle.za.net");    //三秒后跳转
	```

	- 利用 meta
	
	``` html
	echo "<meta http-equiv=refresh content='0; url=网址'>";
	```

#### PHP 文件操作

- 魔术常量: `__FILE__`

- 获得当前脚本的文件路径: `dirname( __FILE__ )`

- 获得文件名: `basename( $path )` 默认带后缀, 可以选择不带后缀: `basename( $path, ".ext" )`

- 返回一个关联数组包含有 path 的信息: `pathinfo( $path )`

- UNIX/WINDOWS 路径统一: `str_replace( '\\', '/', ( __FILE__ ) )`

- dirname()

- basename()

- extension()

- filename()

- 通过关联数组获得某个属性值: `pathinfo( $path )[ extension ]`

- 返回规范化的绝对路径名: `realpath( $path )`


#### PHP Mailer

- [使用 PHPMailer 发送邮件](http://blog.wpjam.com/m/phpmailer/)

- [PHP mail()函数实现发送邮件的方法](http://developer.51cto.com/art/200912/167942.htm)

- [关于 PHP邮件发送](http://www.cnblogs.com/sinllychen/p/3243034.html)

- [phpmailer(GitHub)](https://github.com/PHPMailer/PHPMailer/wiki/Troubleshooting)

#### PHP 防盗链

``` php
$from = parse_url($_SERVER['HTTP_REFERER']);
if ($from['host']!='xxx.com' && $from['host']!='www.xxx.com')
	die('你丫在盗链');
```

#### PHP 中 SESSION 丢失(不能跨页面传递)解决办法

一般来说,使 SESSION 丢失有以下几点:

1、客户端禁用了 cookie

2、浏览器无法存取 cookie

3、php.ini中的 `session.use_trans_sid=0` 或编译时没有打开 `–enable-trans-sid` 选项


Session 储存于服务器端(默认以文件方式存储),根据客户端提供的 session id 来得到用户的文件, 取得变量的值,session id 可以使用客户端的 Cookie 或者 Http1.1 协议的 Query_String (就是访问的URL的“?”后面的部分)来传送给服务器,然后服务器读取 Session 的目录。

也就是说,session id 是取得存储在服务上的session变量的身份证。

当代码session_start();运行的时候, 在服务器上产生了一个 session 文件,随之也产生了与之唯一对应的一个 session id, 定义 session 变量以一定形式存储在刚才产生的 session 文件中。

通过 session id, 可以取出定义的变量。跨页后, 为了使用 session, 你必须又执行 session_start(); 

将又会产生一个session文件,与之对应产生相应的 session id,用这个session id是取不出前面提到的第一个session文件中的变量的, 因为这个session id 不是打开它的“钥匙”。

如果在 session_start(); 之前加代码 session_id($session id); 将不产生新的 session 文件, 直接读取与这个id对应的session文件。

PHP中 的 session 在默认情况下是使用客户端的 Cookie 来保存 session id 的, 所以当客户端的 cookie 出现问题的时候就会影响 session 了。

必须注意的是: 

session 不一定必须依赖 cookie, 这也是 session 相比 cookie 的高明之处。

当客户端的 Cookie 被禁用或出现问题时, PHP 会自动把 session id 附着在URL中, 这样再通过session id 就能跨页使用session变量了。

但这种附着也是有一定条件的, 即: php.ini 中的 `session.use_trans_sid = 1`
或者编译时打开打开了 `–enable-trans-sid`选项。

明白了以上的道理, 现在我们来抛开 cookie 使用 session, 主要途径有三条: 

1、设置php.ini中的session.use_trans_sid = 1或者编译时打开打开了–enable-trans-sid选项, 让PHP自动跨页传递session id。

2、手动通过URL传值、隐藏表单传递 session id。

3、用文件、数据库等形式保存 session_id, 在跨页过程中手动调用。

其他可能性：读写权限，比如：session_save_path = /tmp，可以尝试： `chmod 0664 /tmp`


#### 参考

- [用Nginx给网站做一个简单的防盗链](http://www.qixing318.com/article/use- nginx-to-do-a-simple-anti-daolian-website.html)
