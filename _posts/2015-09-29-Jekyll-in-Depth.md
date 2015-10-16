---
layout: post
title: Jekyll 原理探索
category: Auxiliary
tags: [Jekyll, Liquid]
latest: 2015年10月09日 20:14:24
---

有人说 Jekyll 的配置好复杂，有人说 HEXO 比 Jekyll 简单好用，也有人更喜欢 Octopress。

但我自打开始就是跳入 Jekyll 怀抱 ( 坑 )，暂时也没打算出来了。

折腾久了，对其背后的原理也逐渐明白，现在总结如下。

##### **说明**

有时候你看过一段话，你以为你懂了，但是过了一段时间后，其实你才真的懂了那段话的意思，无论技术还是其他。

常用变量
-

Jekyll 会遍历你的网站搜寻要处理的文件。

任何有 YAML 头信息的文件都是要处理的对象。

对于每一个这样的文件，Jekyll 都会通过 Liquid 模板工具来生成一系列的数据。

在 Jekyll/Liquid 中，变量分为 **全局变量** 和 **自定义变量**。

+ 全局变量

    - site

	全站变量，可以通过 site 来引用已经定义在 *_config.yml* 中的自定义变量，比如 *{% raw %}{{site.email}}{% endraw %}*。

    - page

	在非博客文章的网站页面引用页面所具有的属性，比如：*{% raw %}{{page.title}}{% endraw %}*。

    - post

    在博客文章中引用文章引用文章页面所具有的属性，比如：*{% raw %}{{post.title}}{% endraw %}*。

* 自定义变量

	- 可以在 *_config.yml* 中自定义变量，然后再 page 后者 post 中引用。举例说明：

	假如 *_config.yml* 中配置了如下内容：

	```
	title: Chuanjiang Li's Blog | @lamChuanJiang
	description: > # this means to ignore newlines until "baseurl:"

	 1. Quiter you be, more you hear.
	 
	 2. Keep it simple, stupid, but serviceable.

	 @lamChuanJiang.

	url: "http://lamchuanjiang.github.io" # the base hostname & protocol for your site

	author: Chuanjiang Li

	id: lamChuanJiang

	email: lamchuanjiang@gmail.com
	```
	那么在文章或者页面中就可以引用任意一个变量：

	```
	{% raw %}{{ site.url }}{% endraw %}
	```

( 未完待续 ... ... )

