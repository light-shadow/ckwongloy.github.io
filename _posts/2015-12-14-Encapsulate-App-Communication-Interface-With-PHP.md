---
layout: post
title: 使用 PHP 封装 APP 通信接口数据
category: PHP
tags: [PHP, APP接口]
latest: 2015年12月14日　18:36:10
---

依稀记得我们在学习面向对象编程的时候有一个比较重要的概念就是 **接口**。这里先花半分钟简单回忆一下 PHP 面向对象接口的实现是怎样的，如下：

```
# 接口在面向对象中是一种抽象类，用 `interface` 声明一个接口
interface A {
	public function func_a() ;
	public function func_b() ;
}
# 某个类需要用 `implements` 关键字实现某个接口
class B implements A {
	# 接口中定义的抽象方法在实现它的类中必须被实现，否则 PHP 解析器会报错
	public function func_a() {
		// do something
	}
	public function func_b() {
		// do something
	}
}
```

今天这里的 APP 接口概念和面向对象中的接口是不一样的，为了说明 APP 接口是什么，我们需要先了解一款典型的现代 APP 应用( 至少需要联网的 )的部分工作原理是怎样的。

什么是 APP 接口？
-

我们打开某个 APP 之后，都会看到有布局和具体的数据内容，不说太复杂，APP 的设计内容其实主要有两个：

- 界面布局

- 界面上每个布局中填充的数据

其中界面布局在每个版本的 APP 中是不会变化的，而且与网络的有无关系不大，有网没网都长那样。

但对于 PHP 开发来说，其归类属于服务器后台开发，既然有了服务器，那么相应必须要有客户端，和浏览器中的 Web 应用一样，App 也是客户端的一种，并有一个专门的名字叫做 Native Application。

那么 APP 和服务器的通信必然是需要联网的，联网的目的之一说到最底层就是数据的传输，其实，对于 APP 界面布局之中的数据的来源，都是通过网络从服务器端获取的。

那么客户端和服务器是如何通过网络交换数据的呢？答案必然是网络协议。

Native APP 与服务器数据传输的实现原理和 Web App 其实是一样的，都是通过 HTTP 事务来实现的，一个 HTTP 事务包含客户端请求和服务器响应，虽然 HTTP 的底层是通过 TCP/IP 来实现传输控制和主机路由，但那个太底层了，是一个很大的话题，今天我们就认为客户端和服务器之间就是通过 HTTP 协议来交换数据的。

说了这么多，终于可以为 APP 接口下一个定义了：**APP 和服务器进行通信并用于数据传输的通信接口**。即是说，APP 中界面布局填充的数据就是通过通信接口从服务器上获取的。

自此，可以简单地总结出 **APP 接口的两个作用**：

- 获取数据：从数据库或缓存中获取数据，然后通过接口数据返回给客户端。

- 提交数据：通过接口提交数据给服务器，然后服务器进行入库等处理。

APP 通信接口的工作原理
-

以一次 APP 接口通信过程来说明：

1、客户端请求 APP 接口地址：实际上也是一次 HTTP 请求。

2、服务器收到请求从数据库或者缓存取数据，然后封装成具有通用格式的数据返回给客户端处理。

3、客户端按照约定的格式解析返回的数据，然后呈现在 APP 上。

这个过程中涉及如下几个角色：

- 接口地址：是一个 URL，用于请求服务器上的某个服务。比如：`http://api.com/public/update.php?format=json`。

- 接口文件：上述接口地址中的 `update.php` 就是一个接口文件，每个接口文件用于处理一个或一种业务逻辑。

- 接口数据：接口数据是服务器组装好发送给客户端，也是客户端组装好发送给服务器的具有特定格式的数据。通常被封装成 JSON 或者 XML 格式，而且采用何种通信格式一般是由客户端开发人员和服务器开发人员约定好的。

可以看出，对于客户端开发人员来说，他们只需关心两个东西，一个是接口地址，一个是返回的接口数据，而不关心服务器是如何处理数据的。而对于服务器开发人员来说，接口文件才是 APP 接口开发的核心内容。

常见的 APP 接口
-

- 首页接口：每款 APP 都有一个首页。

- APP 版本升级接口：APP 版本更新是最基本的功能之一。APP 更新和 Web 应用的更新方式是不一样的：Web 应用更新只需由网站开发人员把最新版本的网页代码上传到服务器指定路径即可。

而 Native App 版本升级的实现是通过 APP 版本升级接口从服务器上获取最新的源码包到本地，并覆盖掉旧版本应用，而且更新与否通常都是由用户决定的( 不过这个不一定 )。

- 获取最新数据接口：这个是一款 APP 在使用过程中最长使用到的通信接口。

- APP 错误日志接口：在 APP 使用的过程中几乎不可避免地会出现强退、获取数据失败等错误，这时候就需要通过错误日志通信接口将这些错误信息提交到服务器，以便查出问题所在，从而进行相应的优化。

PHP 封装通信接口数据
-

### 以 JSON 方式封装接口数据

```
class JsonResponse {
	/**
	* 按 json 方式输出通信数据
	* @param integer $code 状态码
	* @param string $message 提示信息
	* @param array $data 数据
	* @return string
	*/
	public static function json_response( $code, $message = '', $data = array() ) {
		if( !is_numeric( $code ) ) {
			return '' ;
		}

		$result = array(
			'code' => $code ,
			'message' => $message ,
			'data' => $data 
		) ;

		echo json_encode( $result ) ;
		exit() ;
	}
}
```

### 以 XML 方式封装接口数据

```
class XmlResponse {
	/**
	* 按 xml 方式输出通信数据
	* @param integer $code 状态码
	* @param string $message 提示信息
	* @param array $data 数据
	* @return string
	*/
	public static function xml_encode( $code, $message, $data = array() ) {
		if( !is_numeric( $code ) ) {
			return '' ;
		}

		$result = array(
			'code' => $code ,
			'message' => $message ,
			'data' => $data 
		) ;

		# 指定页面显示类型
		header( "Content-Type:text/xml;charset:utf-8" ) ;
		$xml = "<?xml version='1.0' encoding='UTF-8'?>" ;
		$xml .= "<root>"."\n" ;
		$xml .= "<code>".$result['code']."</code>"."\n" ;
		$xml .= "<message>".$result['message']."</message>"."\n" ;
		$xml .= "<data>"."\n" ;
		$xml .= self::arr_to_xml( $data ) ;
		$xml .= "</data>"."\n" ;
		$xml .= "</root>"."\n" ;
		echo $xml ;
	}

	public static function arr_to_xml( $arr ) {
		$xml = $k_attr = "" ;
		foreach( $arr as $k => $v ) {
			if( is_numeric( $k ) ) {
				$k_attr = "id='{$k}'" ;
				$k = "item" ;
			}
			$xml .= "<{$k} {$k_attr}>" ;
			$xml .= is_array( $v ) ? self::arr_to_xml( $v ) : $v ;
			$xml .= "</{$k}>"."\n" ;
		}
		return $xml ;
	}
}
```

### 综合 JSON 和 XML 方式封装接口数据

```

```

附录：XML 和 JSON 的对比
-

- **可读性**：XML 比 JSON 可读性强。

- **生成数据**：以 PHP 举例说明：

```
# 生成 JSON：
$arr = "string" ;
function json( $arr ) {
	echo json_encode( $arr ) ;
	exit() ;
}
# 生成 XML：
function xml( $arr ) {
	header( "Content-Type:text/xml" ) ;
	$xml = "<?xml version='1.0' encoding='UTF-8' ?>" ;
	$xml .= "<root>\n" ;
	$xml .= "<title>xml</title>\n<test id='1'/>" ;
	$xml .= "<description>xml</description>\n" ;
	$xml .= "<addr>cq</addr>\n" ;
	$xml .= "</root>" ;
	echo $xml ;
	exit();
}
```

或者使用 PHP 内置的一些类：`DomDocument()`、`XMLWriter()`、`SimpleXML()` 等。

由此可见：在 PHP 中 JSON 生成比 XML 生成方便很多。

- **传输速度**：JSON 快于 XML，因为 JSON 格式的数据是字符串，表达同等数据信息的时候 JSON 比 XML 占用的数据量小。

相关
-

- BlueStacks App Player( Layercake )
