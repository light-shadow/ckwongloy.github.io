---
layout: post
title: 关于 Javascript 跨域问题
category: Web
tags: [Javascript, 跨域]
latest: 2015年10月22日 01:15:42
---

什么是 "跨域"？
-

先看一个域名地址的完整组成是怎样的：

> <code>http</code> :// <code>www</code> . <code>test.com</code> : <code>8000</code> / <code>class/sql_helper.class.php</code>

### **域**

上面几部分依次是：协议、子域名、主域名、端口号、请求的资源地址，当这 5 个部分有任何一个不相同的时候，都算作不同的 "域"。

### **跨域**

Javascript 处于对安全的考虑，不同域之间互相请求资源，就算 "跨域"，即所谓的 "同源策略"。但是 **同一个路径下面的资源互相访问不算跨域**。

##### **特别说明**：_localhost_ 和 _127.0.0.1_ 由于名字不同，虽然指向的是同一个地址，但是仍然被 Javascript 看作是跨域。

解决 "跨域" 问题的三种方法
-

### **通过代理**

代理这种方式属于后台技术，跟 Javascript 没多大关系。解决思路举例说明：

如果中国的服务器 _www.apple.cn/controller/china.php_，要调用美国服务器上的服务 _apple.com/class/service.php_，如果通过代理的方式就是，在中国服务器上可以通过 _www.apple.cn/controller/proxy_us_apple_service.php_ 去间接调用美国服务器上的服务 _apple.com/class/service.php_，然后把从美国服务器上的响应结果返回给前端。

这样在前端看来，调用 _www.apple.cn/controller/china.php_ 就和调用 _apple.com/class/service.php_ 的效果是一样的了。

### **通过 JSONP**

JSONP 解决的是主流浏览器的跨域数据访问的问题。它的原理是：

在 a.com 域名下的某个页面通过 `<script></script>` 标签具有引用 Javascript 资源的特性去调用位于域名 apps.bdimg.com 下的页面，并直接使用 apps.bdimg.com 下被调用的页面中的方法或者属性。

用代码来说就是下面这样：

- a.com

``` js
<script>
	function jsnop( json ) {
		document.writeln( json[ 'age' ] )
	}
</script>
<script src="http://apps.bdimg.com/jsonp.js"></script>
```

- apps.bdimg.com

```
jsonp( { 'name':'li', 'age':18 } ) ; 
```

#### 如何使用 JSONP？

- 前端需要改动的地方

还记得在 [_用 JQuery 实现 Ajax_](http://lamchuanjiang.github.io/programming/ajax-with-jquery.html) 中使用 JQuery 实现 Ajax 中有一个参数叫 `dataType` 吗？只需设置 `dataType` 为 `jsonp` ，然后设置 jsonp 的属性值就行了。即客户端真正只需改动的代码如下：

```
dataType: "jsonp"
jsonp: "callback"
```

- 后端需要改动的地方

```
// 获得 jsonp
$jsonp = $_GET[ 'callback' ] ;

// 使用 jsonp
$res = jsonp.'( { "success":false, "message":"OK" } )' ;
```

##### **注意**

前端设置的 jsonp 的属性值要在后端通过该属性值来获得 jsonp，因为这是它们关联所在。

#### JSONP 的限制

JSONP 只适用于 GET 请求方式有用。

### **使用 XHR2**

XHR2 ( XMLHttpRequest Level 2 ) 是 HTML5 的新特性，只要支持 XHR2 的浏览器都可以使用 XHR2 来实现跨域。

对于 IE 来说，只有 IE 10 开始才支持 XHR2 特性。但是 IE 有专门解决跨域访问的方法。

具体的使用只需在后台中需要设置专门的服务器响应头文，即：

```
header( "Access-Control-Allow-Origin:*" ) ;    // * 代表所有的域名都可以访问
header( "Access-Control-Allow-Methods:POST,GET" ) ;
```
##### **说明**

最好是先撤销 JSONP 的代码再测试 XHR2 属性是否生效。
