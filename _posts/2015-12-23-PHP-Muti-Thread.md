post
le: PHP 多线程
category: PHP
tags: [PHP, 多线程]
latest: 2015-12-28 17:02:44
---

PHP 默认是不支持多线程的，需要安装 pthreads 扩展支持。

#### PHP 安装 pthreads 扩展

一、判断PHP是ts还是nts版

通过 `phpinfo();` 查看其中的 Thread Safety 项,这个项目就是查看是否是线程安全,如果是:enabled,一般来 说应该是ts版,否则是nts版。

二、根据PHP ts\nts版选择对应pthreads的版本

windows版本的下载地址: <http://windows.php.net/downloads/pecl/releases/pthreads/0.1.0/>

本人php版本是5.4.17 的所以下载 php_pthreads­0.1.0­5.4­ts­vc9­x86.zip文件包,其中0.1.0表示为当
前pthreads版本号,5.4为php版本号,ts就是之前判断php对应的ts、nts版,vs9代表是Visual Studio 2008 compiler编译器编译的,最后的x86代表的是32位的版本。

三、安装pthreads扩展

将下载好的php_pthreads­0.1.0­5.4­ts­vc9­x86.zip文件包解压得到 pthreadVC2.dll 和 php_pthreads.dll 文件,把vc2文件放到php.exe同级目录,把php_pthreads.dll放到扩展目录下。

1、修改php.ini文件 添加extension=php_pthreads.dll

2、修改Apache配置文件httpd.conf 添加LoadFile "X:/PHP5/pthreadVC2.dll"

3、重启Apache服务器

四、测试pthreads扩展

``` php
<?php  
class AsyncOperation extends Thread
{  
	public function __construct($arg){  
		$this­>arg = $arg;  
	}

	public function run(){  
		if($this­>arg){  
			printf("Hello %s\n", $this­>arg);  
		}
	}
} 

$thread = new AsyncOperation("World");  

if($thread­>start())  

$thread­>join();  
?>  
```

运行以上代码得到“HelloWorld”,就说明安装pthreads扩展成功。


#### 通过 web 服务器来实现多线程

当然,对多线程有深入理解的人都知道通过 WEB 服务器实现的多线程只能模仿多线程的一些效果,并不是 真正意义上的多线程。

但不管怎么样,它还是能满足我们的一些需要的, 在需要类似多线程的功能方面还是可以采用这个类。

``` php
/**
 *
 * functionaction_log($info){
 * $log='log/'.microtime().'.log';
 * $txt=$info."\r\n\r\n".'Setin'.Date('h:i:s',time()).
(double)microtime()."\r\n";
 * $fp=fopen($log,'w');
 * fwrite($fp,$txt);
 * fclose($fp);
 * }
 */

class Thread
{
    var $hooks=array();
    var $args=array();

	function thread(){
	}

	function addthread($func)
	{
		$args=array_slice(func_get_args(),1);
		$this->hooks[]=$func;
		$this->args[]=$args;
		return true;
	}

	function runthread()
	{
		if(isset($_GET['flag'])) {
		    $flag=intval($_GET['flag']);
		}

		if($flag||$flag===0) {
		    call_user_func_array($this->hooks[$flag],$this->args[$flag]);
		} else {
		    for($i=0,$size=count($this->hooks);$i<$size;$i++) {
		        $fp=fsockopen($_SERVER['HTTP_HOST'],$_SERVER['SERVER_PORT']);
		        if($fp) {
		            $out="GET{$_SERVER['PHP_SELF']}?flag=$iHTTP/1.1\r\n";
		            $out.="Host:{$_SERVER['HTTP_HOST']}\r\n";
		            $out.="Connection:Close\r\n\r\n";
		            fputs($fp,$out);
		            fclose($fp);
		        }
		    }
		}
	}
}
```

使用方法:

``` php
require_once'thread.class.php';
$thread=newthread();
$thread->addthread('action_log','a');
$thread->addthread('action_log','b');
$thread->addthread('action_log','c');
$thread->runthread();
```

说明: addthread 是添加线程函数,第一个参数是函数名, 之后的参数(可选)为传递给指定函数的参数, runthread是执行线程的函数。


#### 附录：PHP "负载均衡"示例

``` php
<?php
$new_num = file_get_contents( 'count.txt' ) ; $num = $new_num + 1 ;
$handle  = fopen( 'count.txt', 'w' ) ;
fwrite( $handle, $num ) ;
fclose( $handle ) ;
$res = $new_num % 6 ;
switch ( $res ) {
	case 0:
		header( 'Location: http://***.**.78.110:8080/wap/index.action' ) ;
	break;
	case 1:
		header( 'Location: http://***.**.55.217:8888/wap/index.action' ) ;
	break;
	case 2:
		header( 'Location: http://***.**.78.110:8080/wap/index.action' ) ;
	break;
	case 3:
		header( 'Location: http://***.**.78.110:8080/wap/index.action' ) ;
	break;
	case 4:
		header( 'Location: http://***.**.55.110:8080/wap/index.action' ) ;
	break;
	case 5:
		header( 'Location: http://***.**.78.110:8080/wap/index.action' ) ;
	break;
	default: break;
}
```

#### FAQ

- 注意编译器的版本

在 phpinfo() 界面查看 MSVC 后面的版本号,然后下载对应的编译器版本 http://windows.php.net/downloads/pecl/releases/pthreads/

#### 参考

- <http://stackoverflow.com/questions/70855/how-can-one-use-multi-threading-in-php-applications>

- <http://www.phper.org.cn/index.php?m=content&a=show&post_id=348>
