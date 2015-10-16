---
layout: post
title: 常用文件头
category: Clipboard
tags: [HTML, Jekyll]
latest: 2015年10月14日 19:02:35
---

开发中经常会有一些亘古不变的代码段，大可不必去记忆的。

HTML 文件头
-

{% highlight html %}
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
{% endhighlight %}

Jekyll 博客文章文件头
-

{% highlight html %}
---
layout: post
title: 常用文件头
category: Clipboard
tags: [HTML, Jekyll]
latest: 2015年10月14日 19:02:35
---
{% endhighlight %}

XML 文件头
-

{% highlight xml %}
<!-- XML 文件声明 ( standalone 默认为 no ) -->
<?xml version="1.0" encoding="utf-8" standalone="no"?>

<!-- XML 显示样式 -->
<?xml-stylesheet href="./xml.css" type="text/css"?>

<!-- CDATA 节 -->
<![CDATA[XXXX]]>
{% endhighlight %}
