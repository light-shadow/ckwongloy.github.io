---
layout: post
title: Python 学习笔记
category: Python
tags: [Python, 脚本语言]
latest: 2015-06-11 20:33:56
---

#### Python 部分基础知识

- 为什么同样的代码在 python 2.x 下可以运行成功却在 python 3.x 下 不能运行成功？

下述代码在 python 3.x 下需要圆括号，而在 python 2.x 下不用圆括号

``` python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
if __name__ == "__main__":
    print ("hello world") // python 3.- 版本已经把 print 作为一个内置函数，2.x 版本 只需 print "hello world"
```

- python 2.x 和 python 3.x 有哪些差别？

- python 基本语法有哪些？编码规则有哪些？
①分号 ; 与反斜线 \ ：语句可以用也可以不用 ; 结尾，通常不用。如果需要在一行中给多个变量赋值时则用 ; 来分割。反斜线 \ 表示换行，有两种换行方式。举例说明：

可以看到运行效果是一样的：

·注意：此时如果不写 # -*- coding: UTF-8 -*- 则会报错：

· # -*- coding: UTF-8 -*- 或者 #coding=utf-8 都可以。

②赋值不用指明数据类型，字符串赋值既可以用 '' 也可以用 "" ，

其中，if __name__ == "__main__": 是 python 程序的入口，相当于 C 的 main() 函数。

③类与对象：__init__ 代表构造函数；定义函数用 def，def __init(self, name): 。类中方法的引用使用点 。else if() 可以简写成 elif()。

④冒号的使用：表示一个程序块的开始。函数名之后，if() 之后使用冒号，与缩进结合相当于相当于 C 中的 {} 所起到的作用。

⑤代码缩进：代码块前（不是函数名前）最好用 4 个空格来表示，尽量不要使用制表键 tab，因为这样写容易引起程序的混乱。

⑥print() 函数含参数输出与 C 类似，举例如下：

``` python
if __name__ == "__main__":
	age = 21
	name = 'cj'
	print "%s is %d years old." %(name, age)
```

⑦模块的导入：最规范的方式是只是用 `import 模块` 导入模块，然后通过点 `.` 来引用模块中的变量或者是方法。而不要使用 "from 模块名 import 变量或方法名" ，因为这样容易分不清变量的来历，用点可以很清楚的看见变量的来历，就是点前面的内容。示例如下：

``` python
# - 规范的导入方式
import sys

print sys.path
print sys.argv

# - 不规范的导入方式
from sys import path
from sys import argv

print path
print argv
```

⑧python 代码块风格：在两个函数之间，类和函数之间使用换行来分隔代码。

⑨python 注释：使用 # 符号来注释。文件头注释主要包括有模板文件，版权声明，许可协议，版本及功能等。注释还可以帮助调试。

⑩变量和常量：

同一个变量名在不同时候赋值，所在的地址存储空间是不一样的：

python 认为变量只有先被赋值才会被定义，否则会报错：

python 的赋值非常灵活，多个变量可以用一个数组一次性赋值：

全局变量与局部变量：

``` python
# coding: UTF-8
####  全局变量的声明的 2 种方式 ####
# - 直接在函数名外声明，这种不需要写 global 关键字
_a = 1
_b = 2
def add_1():
	return _a + _b

print "在函数外部声明的全局变量: _a + _b = ",  add_1()
# 局部变量
def add_2():
	_a = 3
	_b = 4
	return  _a + _b

print "在函数内部的局部变量 : _a + _b = ", add_2()
print "若 _a + _b 仍然为 - 则说明函数 add_2() 中的局部变量在这里（函数外）没有起作用 : _a + _b = ",  _a + _b
# - 在函数内部声明，此时必须用 global 关键字，才能对全局变量进行赋值，声明和赋值不能一起进行
def redeclare():
	global _a 
	_a = 5
	global _b 
	_b = 6
	return 0

redeclare()
print "若 _a + _b = - 则说明函数 redeclare() 内部重新声明并赋值后的全局变量在这里（函数外）起作用了 : _a + _b = ",  _a + _b
```

再次提醒：**全局变量的声明和赋值不同同时进行**。

在不同的文件中引用全局变量：有三个文件分别是 global.py， use_global.py，文件中的内容分别是：

- global_use.py:

``` python
# coding: UTF-8
# 将被导入至文件 use_global.py 的全局变量
global _a
_a = 1 
_b = 2
use_global.py:
	# coding: UTF-8
	# 导入 global.py 文件中的全局变量并调用其值用于输出
	import global_use
	
	def function():
		print global_use._a
		print global_use._b
	
	function()
```

python 中的常量：python 没有const（C++） 或 static final（Java）等保留字来定义常量，而是利用 python 内置的数据结构模拟常量功能。

第 3 句：指明当常量被重复赋值时抛出的错误类型

第 4 句：`__setattr__` 为 python 内置方法, 这里重写，用于判断给定的参数（变量名）是否在内置的字典中。

第 6 句：如果字典中已经有要赋值的变量名，则用 raise 抛出异常，如果没有就允许赋值

第 - 句：将 _const() 得到的变量名注册到 sys.modules 模块（全局字典）中，用于缓存导入的模块，当 python 程序第一次启动的时候会加载该模块，当第一次导入 sys 模块时，sys.modules 会记录 import 的内容，当程序第二次运行的时候，就会直接从全局字典中读取刚刚引进的内容，从而提高程序的运行速度

use_const.py:

```
import const
const.magic = 23
const.magic = 33
```

- python 有哪些数据类型？如何定义并使用？各有什么注意事项？
①字符串：字符串中有三种引号，单引号 '' ，双引号 ""，三引号 '""'（单引号内的双引号）。其中单引号和双引号的用法相同。str = 'hello world.'  <==> str ="hello world."。三引号既可以普通使用：str = '"hello world."'，也可以有特殊用法，比如制作 doc 文档：

``` python
# coding: UTF-8
# 三引号 '""' 的特殊用法 
制作 doc 文档
class Hello:
	'"hello class."'
	def printHello ():
		'"print the hello world."'
		print "hello world."

print Hello.__doc__				
print Hello.printHello.__doc__
```

其中，`__doc__` 是 python 的内置变量，用于存储三引号中存储的字符串。

转义字符：`\` 用来在字符串变量中输出特殊的字符，如要输出单引号本身: `\'` 。

可以在双引号中直接使用单引号，也可以在三引号中直接使用单引号。

②数值类型：整形，长整形，浮点型，布尔型，复数类型。可以使用内置函数 type() 输出变量的类型。

- python 有哪些运算符和表达式？各有什么注意事项？

①算术表达式：需要注意的是，为了确保真分数不被当作 0 处理，必须 import division

如果没有 from __future__ import division 则 7 / 8 会被当作 0 处理：

·算术运算符的优先级：请使用 () 。

②关系表达式：>, <, ==, !=,  <>（不等于）,>=, <= 。!= 和 <> 的区别是：<> 是 ANSI 标准而 != 不是。
·关系表达式的优先级：同 C 语言。

③逻辑运算符：not， and，or
·逻辑运算符的优先级：同 C 语言。

- python 命名规则主要有哪些？

①变量名：以下划线开头。普通变量（如全局变量）最好以一个下划线开头 ，_variable，类中的私有实例变量名规定用两个下划线开头，`__private_variable`。变量名不能以数字，特殊字符开头，只能以字母和下划线开头。最好也不用 python 内部关键字作为函数名，变量名。


②类名：首字母大写，匈牙利命名法，开头下划线不必须, class Person:。或者用下划线开头，此时可以不用大写：class _const: 。

③对象名：小写字母开头，开头下划线不必须，person = Person("Mike")。

④函数名或方法名：严格驼峰法，开头下划线不必须，getName(): 。`__internalMethod__` 为 python 内置方法，分别以两个下划线开头和结尾。

⑤见名之意：少用单个字母，数字作为变量名。

- 如何编译 python 源文件？

使用 py 类中 compile 函数：py_compile.compile('路径+程序文件名')，当前目录时可以不写路径。举例如下：

``` python
import py_compile
py_compile.compile('hello.py')
```

执行后，当前目录下的 hello.py 文件将被编译为字节码文件，会看到当前目录下会出现一个 .pyc 文件。其实只要 .py 文件被编译执行，不论有没有特意写上面这段编译代码，都会生成 .pyc 字节代码文件。
	
- python 的模板文件是什么？有什么用？怎么使用？模板文件是必须的吗？

以下代码为模板，其中第一句代码用 `#!` 开头是为了告诉编译器 python 程序可以在 unix/linux 环境下运行，且指明了在 unix/linux 环境下运行时 python 解释器的路径在哪；第二句告诉了编译器程序使用的是 utf-8 编码，这样就可以输入中文字符和其他一些字符，如果不写有些情况会报错，而且 coding 不能大写，UTF-8 可以小写：

``` python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
```

- python 的文件类型有哪些？各代表什么意思？各有什么区别？

①.py ：python 源程序文件扩展名，使用 python.exe 作为解释器。

②.pyc ：python 字节码文件扩展名，.py 源文件编译后生成字节码文件 .pyc。字节码文件可以在多种操作系统环境下运行。

③.pyw ：开发完成的纯图形界面（带 GUI ） python 程序扩展名，使用 pythonw.exe 作为解释器。

- Python 的流程控制和 C 语言的区别有哪些？

除了语法不通其他没有不同。举例说明：

①if...else...

``` python
# !/usr/bin/python
# -*- coding: UTF-8 -*-
if __name__:"__main__"
a = input( "a=" )
b = input( "b=" )
if ( a>b ):
	print a, '>', b
else:
	print a, '<', b
```

②分支的嵌套是使用代码缩进：

③利用字典的方式模拟实现 switch() ：( 嵌套过多时使用 switch() 情况 )

- input() 函数和 raw_input() 函数有什么区别？

input() 函数输出数值和表达式结果，而 raw_input() 输出字符串。举例说明：

- python 的主函数和其他语言有什么不同？

Python使用缩进对齐组织代码的执行，所有没有缩进的代码（非函数定义和类定义），都会在载入时自动执行，这些代码，可以认为是Python的main函数。每个文件（模块）都可以任意写一些没有缩进的代码，并且在载入时自动执行，为了区分主执行文件还是被调用的文件，Python引入了一个变量 `__name__`，当文件是被调用时，`__name__` 的值为模块名，当文件被执行时，`__name__` 为 `__main__`。

- Python空行有什么特殊含义？

函数之间或类的方法之间用空行分隔，表示一段新的代码的开始。类和函数入口之间也用一行空行分隔，以突出函数入口的开始。空行与代码缩进不同，空行并不是Python语法的一部分。书写时不插入空行，Python解释器运行也不会出错。但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。记住：空行也是程序代码的一部分。

#### Python 爬虫实践

- 一个简单的爬取某个静态网站首页 DEMO

``` python
# -*- coding:utf-8 -*-

import urllib.request

response = urllib.request.urlopen( "http://ckwongloy.github.io" )

print( response.read() )
```

说明：在 python3.x 里面，用 urllib.request 代替 urllib2；另外 python3 之后，不能再用 print something 而是用  print ( something )

- Urlopen() 函数

第一个参数url即为URL，第二个参数data是访问URL时要传送的数据，第三个timeout是设置超时时间。

第二三个参数是可以不传送的，data默认为空None，timeout默认为 socket._GLOBAL_DEFAULT_TIMEOUT

第一个参数URL是必须要传送的，在这个例子里面我们传送了百度的URL，执行urlopen方法之后，返回一个response对象，返回信息便保存在这里面。

#### HTTP

http协议有六种请求方法，get,head,put,delete,post,options。

Put 和 post 都是想服务器发送数据，只不过一般 put 会将数据发送到服务器指定的位置，而 POST 发送的数据位置有程序员决定  Delete 方法用于删除服务器上的资源。 

100：继续  客户端应当继续发送请求。客户端应当继续发送请求的剩余部分，或者如果请求已经完成，忽略这个响应。 

101： 转换协议  在发送完这个响应最后的空行后，服务器将会切换到在Upgrade 消息头中定义的那些协议。只有在切换新的协议更有好处的时候才应该采取类似措施。 

102：继续处理   由WebDAV（RFC 2518）扩展的状态码，代表处理将被继续执行。

200：请求成功      处理方式：获得响应的内容，进行处理

201：请求完成，结果是创建了新资源。新创建资源的URI可在响应的实体中得到    处理方式：爬虫中不会遇到 

202：请求被接受，但处理尚未完成    处理方式：阻塞等待 

204：服务器端已经实现了请求，但是没有返回新的信 息。如果客户是用户代理，则无须为此更新自身的文档视图。    处理方式：丢弃

300：该状态码不被HTTP/1.0的应用程序直接使用， 只是作为3XX类型回应的默认解释。存在多个可用的被请求资源。    处理方式：若程序中能够处理，则进行进一步处理，如果程序中不能处理，则丢弃

301：请求到的资源都会分配一个永久的URL，这样就可以在将来通过该URL来访问此资源    处理方式：重定向到分配的URL

302：请求到的资源在一个不同的URL处临时保存     处理方式：重定向到临时的URL

304：请求的资源未更新     处理方式：丢弃

400：非法请求     处理方式：丢弃

401：未授权     处理方式：丢弃

403：禁止     处理方式：丢弃

404：没有找到     处理方式：丢弃

500：服务器内部错误  服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。 

501：服务器无法识别  服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。

502：错误网关  作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。

503：服务出错   由于临时的服务器维护或者过载，服务器当前无法处理请求。这个状况是临时的，并且将在一段时间以后恢复。 

#### Editplus 配置 Python 开发环境

1. 下载安装 Editplus 和 python.
2. 打开 Editplus, 选择工具-->配置用户工具,点击组名新建一个python组,紧接着点击添加工具选择-->应用程序

在菜单文字:python
命令:选择你安装python程序的路径
参数:$(FileName)
初始目录:$(FileDir)
最后点击确定。

3. 为了可以捕捉到错误信息和输出结果强烈建议在第二步中的动作哪里选择捕捉输出,再点击旁边的模板输出,然后点击取消-->使用默认输出模式(U)在下面的选项中分别对应填写下面的信息
正则表达式:File "(.+)", line ([0-9]+)
文件名:标记表达式1
行(L):标记表达式2
列(C):无
最后选择确定

4. 为了让editplus配置的python的环境更牛叉的话，建议安装一个python的插件。下载地址为： 
http://www.editplus.com/files/pythonfiles.zip
下载之后解压到你安装editplus的安装目录，这个包里面总过有三个文件我们要用到两个，只要是为了让editplus支持语法高亮，函数自动补全功能

5. 这里很关键选择菜单栏的-->工具-->配置用户工具-->设置&语法
文件名扩展:py
语法文件:pyhon_extd.stx(也就是editplus目录下面的解压的文件)
自动完成:python.acp

6. 接下来点击函数模板修改一下这里的正则表达式为:[ \t]*def[ \t].+:
确定之后在点击Tab/缩进,然后填写相应的东西这里主要是为了让你的python代码可以自动随进,我们设置了默认是四个空格,这样写出来的代码就很漂亮了!

7. 最后一步你也可以设置一下书写python的默认模板--选择模板-->选择python-->菜单栏输入python-->文件路径输入editplus安装目录下面的template.py最后确定即可!

8. 下面带你去看一下代码效果,选择菜单栏的新建就可以看到有一个python选项了.在这里你简单写点代码测试一下你的配置环境有没有成功.例如我就故意把else下面的语句少写了一个分号,就是为了看到报错信息,在下面的错误上面双击就可以跳到错误行了很方便,不然上千行你去找累啊!写完之后保存按ctrl+1就可以运行代码了!

#### 其他

- Perl

完成的方法不止一种。

- Python 与 Perl： 第一章 34 页。

- PSF 

- http://python.org/

- 模块需要先被安装 （easy_indtall 和 pip install）才能够被导入（import）

- 如何默认不换行打印？Print() 的替代函数

- 组件集成

- 原型
