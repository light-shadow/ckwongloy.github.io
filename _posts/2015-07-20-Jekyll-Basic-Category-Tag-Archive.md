---
layout: post
title: Jekyll 基本应用：分类、标签、归档、分页
category: Auxiliary
tags: [Jekyll, 博客]
latest: 2015年10月09日 19:07:20
---

Jekyll 博客基本功能已完成大半，觉得有必要整理一下然后总结在这里，为自己和需要的人提供便利，以后也会陆续总结更多功能。

一、Jekyll 分类：Category
-

{% highlight HTML %}

{% raw %}{{ site.categories | size }}{% endraw %}

<hr>

<div style="background: #F7F6F6;">
	
{% raw %}{% for category in site.categories %}{% endraw %}

<p style="font-size:24px;margin-left:5%;">
<i class="fa fa-folder"></i>
<a href="#{% raw %}{{ category | first }}{% endraw %}" title="view all posts in &lt;{% raw %}{{ category | first }}{% endraw %}&gt;">

{% raw %}{{ category | first }}{% endraw %}

</a>
<i class="fa fa-angle-left"></i>

{% raw %}{{ category | last | size }}{% endraw %}

<i class="fa fa-angle-right"></i></p></ul>

{% raw %}{% endfor %}{% endraw %}

</div>
<h2 style="text-align:center;">
<i class="fa fa-bolt"></i>
<i class="fa fa-bolt"></i>
<i class="fa fa-bolt"></i>
<strong>
Details
</strong></h2>

{% raw %}{% for category in site.categories %}{% endraw %}

<p style="font-size:24px;margin-left:5%;">

<i class="fa fa-folder-open"></i>

<a href="#{% raw %}{{ category | first }}{% endraw %}" name="{% raw %}{{ category | first }}{% endraw %}" title="view all posts in &lt;{% raw %}{{ category | first }}{% endraw %}&gt;">

{% raw %}{{ category | first }}{% endraw %}

</a>
<i class="fa fa-angle-left"></i>

{% raw %}{{ category | last | size }}{% endraw %}

<i class="fa fa-angle-right"></i></p>
<ul>

{% raw %}{% for post in category.last %}{% endraw %}

<ol>
<i class="fa fa-calendar"></i>

{% raw %}{{ post.date | date:"%Y-%m-%d"}}{% endraw %}

<i class="fa fa-terminal"></i>
<a href="{% raw %}{{ post.url }}{% endraw %}">

{% raw %}{{ post.title }}{% endraw %}

</a></ol>

{% raw %}{% endfor %}{% endraw %}

</ul> 

{% raw %}{% endfor %}{% endraw %}

{% endhighlight %}

二、Jekyll 标签：Tag
-

##### **说明**

tag 的大小应该反映出实际生活在不同领域的时间花费。

Tag 和 Category 的实现思路几乎是一致的，不过在对标签样式的处理上是 Tag 独有的。代码如下：

{% highlight html %}

{% raw %}{{ site.tags | size }}{% endraw %}

<hr>
<div style="margin-bottom:90%;margin-top:10%;">

{% raw %}{% assign first = site.tags.first %}{% endraw %}
{% raw %}{% assign max = first[1].size %}{% endraw %}
{% raw %}{% assign min = max %}{% endraw %}
{% raw %}{% for tag in site.tags offset:1 %}{% endraw %}
{% raw %}{% if tag[1].size > max %}{% endraw %}
{% raw %}{% assign max = tag[1].size %}{% endraw %}
{% raw %}{% elsif tag[1].size < min %}{% endraw %}
{% raw %}{% assign min = tag[1].size %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endfor %}{% endraw %}
{% raw %}{% assign diff = max | minus: min %}{% endraw %}

{% raw %}{% for tag in site.tags %}{% endraw %}
{% raw %}{% assign temp = tag[1].size | minus: min | times: 35 | divided_by: diff %}{% endraw %}
{% raw %}{% assign base = temp | divided_by: 3 %}{% endraw %}
{% raw %}{% assign remain = temp | modulo: 4 %}{% endraw %}
{% raw %}{% if remain == 0 %}{% endraw %}
{% raw %}{% assign size = base | plus: 10 %}{% endraw %}
{% raw %}{% elsif remain == 1 or remain == 2 %}{% endraw %}
{% raw %}{% assign size = base | plus: 9 | append: '.5' %}{% endraw %}
{% raw %}{% else %}{% endraw %}
{% raw %}{% assign size = base | plus: 10 %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% if remain == 0 or remain == 1 %}{% endraw %}
{% raw %}{% assign color = 9 | minus: base %}{% endraw %}
{% raw %}{% else %}{% endraw %}
{% raw %}{% assign color = 8 | minus: base %}{% endraw %}
{% raw %}{% endif %}{% endraw %}

<span style="padding:3px; margin:3px; float:left; background:white; background:#BFD9DB; border-radius:100%;">
<a href="#{% raw %}{{ tag[0] }}{% endraw %}" style="font-size: {% raw %}{{ size }}{% endraw %}pt;color: #{% raw %}{{ color }}{% endraw %}{% raw %}{{ color }}{% endraw %}{% raw %}{{ color }}{% endraw %};">

{% raw %}{{ tag[0] }}{% endraw %}

</a>
<span style="color: #{% raw %}{{ color }}{% endraw %}{% raw %}{{ color }}{% endraw %}{% raw %}{{ color }}{% endraw %};">

<sup>
{% raw %}{{ tag | last | size }}{% endraw %}
</sup>

</span></span> 

{% raw %}{% endfor %}{% endraw %}

</div>
<h2 style="text-align:center;">
<i class="fa fa-bolt"></i>
<i class="fa fa-bolt"></i>
<i class="fa fa-bolt"></i>
<strong>
Details
</strong></h2>

{% raw %}{% for tag in site.tags %}{% endraw %}

<p style="font-size:24px;margin-left:5%;">
<i class="fa fa-tag"></i>
<a href="#{% raw %}{{ tag | first }}{% endraw %}" name="{% raw %}{{ tag | first }}{% endraw %}" title="All posts below are taged by &lt;{% raw %}{{ tag | first }}{% endraw %}&gt;">

{% raw %}{{ tag | first }}{% endraw %}
	
</a>

<sup>
{% raw %}{{ tag | last | size }}{% endraw %}
</sup>

</p>
<ul>

{% raw %}{% for post in tag.last %}{% endraw %}

<ol>
<i class="fa fa-calendar"></i>

{% raw %}{{ post.date | date:"%Y-%m-%d"}}{% endraw %}

<i class="fa fa-terminal"></i>
<a href="{% raw %}{{ post.url }}{% endraw %}">

{% raw %}{{ post.title }}{% endraw %}

</a></ol>

{% raw %}{% endfor %}{% endraw %}

</ul> 

{% raw %}{% endfor %}{% endraw %}

{% endhighlight %}

三、Jekyll 归档：Archive
-

刚开始接触的时候，或许会问：如何自动根据格式化的文件名自动生成 Achive？

我最开始的办法是：

{% highlight HTML linenos %}
{% raw %}{% for post in site.posts %}{% endraw %}

<ul>
<li>
{% raw %}{{ post.archive }}{% endraw %}
</li>
</ul>

{% raw %}{% endfor %}{% endraw %}
{% endhighlight %}

但这样明显不方便，因为每次写文章时都要在文件头中制定 Archive。

同时又浪费了已经按年月日格式化命名过的文章，因为 Archive 也是按年月日格式化输出。

所以不可取。更好的思路见下面。

+ 标准 Archive 输出

这是一个样本，不是本博客采用的，但是为我提供了思路。代码如下：

{% highlight HTML %}
<ul>

{% raw %}{% assign count = 0 %}{% endraw %}
{% raw %}{% for post in site.posts %}{% endraw %}
{% raw %}{% capture this_month %}{{ post.date | date: "%Y 年 %m 月" }}{% endcapture %}{% endraw %}
{% raw %}{% capture next_month %}{{ post.previous.date | date: "%Y 年 %m 月" }}{% endcapture %}{% endraw %}
{% raw %}{% assign count = count | plus: 1 %}{% endraw %}
{% raw %}{% if forloop.last or this_month != next_month %}{% endraw %}

<li style="list-style:none;padding:5px;">
<i class="fa fa-archive"></i>
<a href="#{{ post.date | date: "%Y-%m" }}">{{ this_month }} &lt;{{ count }}&gt;</a></li>

{% raw %}{% assign count = 0 %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endfor %}{% endraw %}

</ul>
{% endhighlight %}

+ 测试代码

在做 Archive 的时候，想要年月分开但又同时输出，即分层输出，发现用同一个循环来遍历年和月十分麻烦，暂且我也没有去找更好的做法。

下面代码是测试将可以分开输出的两个循环集成到一个循环中，并实现 **计数** 功能的测试代码：

{% highlight HTML %}
{% raw %}{% assign count_by_year = 0 %}{% endraw %}
{% raw %}{% for post in site.posts %}{% endraw %}
{% raw %}{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}{% endraw %}
{% raw %}{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}{% endraw %}
{% raw %}{% assign count_by_year = count_by_year| plus: 1 %}{% endraw %}
{% raw %}{% if forloop.last or this_year != next_year %}{% endraw %}

<h2>
<i class="fa fa-flag-checkered"></i>

{% raw %}{{ this_year }}{% endraw %} &lt;{% raw %}{{ count_by_year }}{% endraw %}&gt;

</h2>

{% raw %}{% assign count_by_year = 0 %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endfor %}{% endraw %}

<hr>

{% raw %}{% assign count_by_month = 0 %}{% endraw %}
{% raw %}{% for post in site.posts %}{% endraw %}
{% raw %}{% capture this_month %}{{ post.date | date: "%Y 年 %m 月" }}{% endcapture %}{% endraw %}
{% raw %}{% capture next_month %}{{ post.previous.date | date: "%Y 年 %m 月" }}{% endcapture %}{% endraw %}
{% raw %}{% assign count_by_month = count_by_month| plus: 1 %}{% endraw %}
{% raw %}{% if forloop.last or this_month != next_month %}{% endraw %}

<ul>
<li style="list-style:none;">
<i class="fa fa-archive"></i>
<a href="#{% raw %}{{ post.date | date: "%Y-%m" }}{% endraw %}">

{% raw %}{{ post.date | date: "%Y 年 %m 月" }}{% endraw %}

</a>

&lt;{% raw %}{{ count_by_month }}{% endraw %}&gt;

</li></ul>

{% raw %}{% assign count_by_month = 0 %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endfor %}{% endraw %}
{% endhighlight %}

+ 备份代码

这是本博客目前最终采用的思路。代码如下：

{% highlight HTML %}
<div style="margin-left:10%;">

{% raw %}{% for post in site.posts  %}{% endraw %}
{% raw %}{% capture this_year %}{{ post.date | date: "%Y" }}{% endcapture %}{% endraw %}
{% raw %}{% capture next_year %}{{ post.previous.date | date: "%Y" }}{% endcapture %}{% endraw %}

{% raw %}{% capture this_month %}{{ post.date | date: "%B" }}{% endcapture %}{% endraw %}
{% raw %}{% capture next_month %}{{ post.previous.date | date: "%B" }}{% endcapture %}{% endraw %}

{% raw %}{% if forloop.first %}{% endraw %}

<h2>
<i class="fa fa-flag-checkered"></i>

{% raw %}{{ this_year }}{% endraw %}

</h2>
<ul>
<li style="list-style:none;">
<i class="fa fa-archive"></i>
<a href="#{% raw %}{{ post.date | date: "%Y-%m" }}{% endraw %}">

{% raw %}{{ post.date | date: "%Y 年 %m 月" }}{% endraw %} {% raw %}{{ count_by_month }}{% endraw %}


</a></li></ul>

{% raw %}{% endif %}{% endraw %}
{% raw %}{% if forloop.last %}{% endraw %}


{% raw %}{% else %}{% endraw %}
{% raw %}{% if this_year != next_year %}{% endraw %}

<h2>
<i class="fa fa-flag-checkered"></i>

{% raw %}{{ next_year }}{% endraw %}

</h2>
<ul>
<li style="list-style:none;">
<i class="fa fa-archive"></i>
<a href="#{% raw %}{{ post.previous.date | date: "%Y-%m" }}{% endraw %}">

{% raw %}{{ post.previous.date | date: "%Y 年 %m 月" }}{% endraw %}

</a></li></ul>

{% raw %}{% else %}{% endraw %}
{% raw %}{% if this_month != next_month %}{% endraw %}

<ul>
<li style="list-style:none;">
<i class="fa fa-archive"></i>
<a href="#{% raw %}{{ post.previous.date | date: "%Y-%m" }}{% endraw %}">

{% raw %}{{ post.previous.date | date: "%Y 年 %m 月" }}{% endraw %}

</a></li></ul>

{% raw %}{% endif %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endfor %}{% endraw %}

</div>
{% endhighlight %}

四、Jekyll 分页：Paginate
-

如果是在首页中要分页，Jekyll 也只能在首页，即 index.html 中分页。

参考如下代码：

{% highlight HTML %}
<ul class="post-list">
{% raw %}{% for post in paginator.posts %}{% endraw %}
<hr>
<li style="list-style:none;">
<h3>
<span class="post-meta">
<b>
<a href="#" style="padding:10px;" title="Post">
<i class="fa fa-paper-plane" style="font-size:30px;"></i></a>
<i class="fa fa-calendar"></i>
<a href="/blog/archive.html/#{% raw %}{{ post.date | date: "%Y-%m" }}{% endraw %}" title="Archive：{% raw %}{{ post.date | date: "%Y-%m" }}{% endraw %}">
{% raw %}{% assign d = post.date | date: "%-d" %}{% endraw %}
{% raw %}{{ post.date | date: "%B" }}{% endraw %}
{% raw %}{% case d %}{% endraw %}
{% raw %}{% when '1' or '21' or '31' %}{% endraw %}{% raw %}{{ d }}{% endraw %}st
{% raw %}{% when '2' or '22' %}{% endraw %}{% raw %}{{ d }}{% endraw %}nd
{% raw %}{% when '3' or '23' %}{% endraw %}{% raw %}{{ d }}{% endraw %}rd
{% raw %}{% else %}{% endraw %}{% raw %}{{ d }}{% endraw %}th
{% raw %}{% endcase %}{% endraw %}, 
{% raw %}{{ post.date | date: "%Y, %A" }}{% endraw %}.
</a></b></span></h3>
<h1 style="text-align:center;font-size:26px;"><strong>
<i class="fa fa-angle-double-left" style="color:silver;"></i>
{% raw %}{{ post.title }}{% endraw %}
<i class="fa fa-angle-double-right" style="color:silver;"></i>
</strong></h1>
<h4 style="text-align:center;">
<i class="fa fa-heartbeat"></i>
<a href="http://lamchuanjiang.github.io" target="_blank" title="Author：@lamChuanJiang">
{% raw %}{% if site.id %}{% endraw %}
{% raw %}{{ site.id }}{% endraw %}
{% raw %}{% endif %}{% endraw %}
</a>
<i class="fa fa-folder"></i>
{% raw %}{% for categories in post.categories %}{% endraw %}
<a href="/blog/category.html#{% raw %}{{ post.categories[0] }}{% endraw %}" title="Category：{% raw %}{{ post.categories[0] }}{% endraw %}">
{% raw %}{{ post.categories[0] }}{% endraw %}
</a>
{% raw %}{% endfor %}{% endraw %}
<i class="fa fa-tags"></i>
{% raw %}{% for tag in post.tags %}{% endraw %}
<a href="/blog/tag.html#{% raw %}{{ tag }}{% endraw %}" title="Tag：“{% raw %}{{ tag }}{% endraw %}”" style="background:#BFD9DB;margin:2px;radius:50%;">
<i>
{% raw %}{{ tag }}{% endraw %}
{% raw %}{{ tag | last }}{% endraw %}
</i></a>
{% raw %}{% endfor %}{% endraw %}
<i class="fa fa-pencil"></i>
<a title="文章字数：{% raw %}{{ post.content | number_of_words }}{% endraw %}">
{% raw %}{{ post.content | number_of_words }}{% endraw %}
</a></h4>
{% raw %}{{ post.excerpt }}{% endraw %}
</p>
<p style="text-align:right;">
<a href="{% raw %}{{ post.url | prepend: site.baseurl }}{% endraw %}" class="btn" style="background-color:#438F97;" title="Read this full article.">
Read More
<i class="fa fa-angle-double-right"></i></a></p>
{% raw %}{% endfor %}{% endraw %}
</li></ul>
<hr>
<h2 style="text-align:center;">
{% raw %}{% if  paginator.total_pages >1 %}{% endraw %}
{% raw %}{% if paginator.previous_page %}{% endraw %}
<a href="{% raw %}{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}{% endraw %}" title="上一页">
<span class="fa fa-backward" style="padding:10px;"></span></a>
{% raw %}{% endif %}{% endraw %}
{% raw %}{% for page in (1..paginator.total_pages) %}{% endraw %}
{% raw %}{% if page == paginator.page %}{% endraw %}
<span style="font-size:48px;">
{% raw %}{{ page }}{% endraw %} /
</span>
<span style="font-size:16px;">
{% raw %}{{ paginator.total_pages }}{% endraw %}
</span>
{% raw %}{% elsif page == 1 %}{% endraw %}
{% raw %}{% else %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endfor %}{% endraw %}
{% raw %}{% if paginator.next_page %}
<a href="{% raw %}{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}{% endraw %}" title="下一页">
<i class="fa fa-forward" style="padding:10px;"></i></a>
{% raw %}{% endif %}{% endraw %}
{% raw %}{% endif %}{% endraw %}
</h2>
{% endhighlight %}	

### 特别感谢

在折腾 Jekyll 的整个过程中 Google 了不少时间，也参考了不少 Jekyll 博客源码，其中对我帮助最大的是：***[liberize's blog](http://liberize.me/)*** 。

本博客的几项重要功能的实现都和该博客提供的思路有关，这为我省了不少时间，在此非常感谢 *liberize*。

### 参考

+ [Jekyll 不用 JS 生成标签云]( http://liberize.me/tech/jekyll-tag-cloud.html)

+ [使用Jekyll在Github上搭建个人博客（分页实现）](http://segmentfault.com/a/1190000000406015)