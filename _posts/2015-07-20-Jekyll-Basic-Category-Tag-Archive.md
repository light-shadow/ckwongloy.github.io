---
layout: post
title: Jekyll 基本应用：分类、标签、归档、分页
category: Auxiliary
tags: [Jekyll, 博客]
latest: 2015年10月9日19:07:20
---

Jekyll 博客基本功能已完成大半，觉得有必要整理一下然后总结在这里，为自己和需要的人提供便利，以后也会陆续总结更多功能。

一、Jekyll 分类：Category
-



二、Jekyll 标签：Tag
-



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

{% highlight HTML linenos %}
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

{% highlight HTML linenos %}
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

{% highlight HTML linenos %}
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

{% highlight HTML linenos %}
<ul class="post-list">
{% for post in paginator.posts %}
<hr>
<li style="list-style:none;">
<h3>
<span class="post-meta">
<b>
<a href="#" style="padding:10px;" title="Post">
<i class="fa fa-paper-plane" style="font-size:30px;"></i></a>
<i class="fa fa-calendar"></i>
<a href="/blog/archive.html/#{{ post.date | date: "%Y-%m" }}" title="Archive：{{ post.date | date: "%Y-%m" }}">
{% assign d = post.date | date: "%-d" %} 
{{ post.date | date: "%B" }}
{% case d %}
{% when '1' or '21' or '31' %}{{ d }}st
{% when '2' or '22' %}{{ d }}nd
{% when '3' or '23' %}{{ d }}rd
{% else %}{{ d }}th
{% endcase %}, 
{{ post.date | date: "%Y, %A" }}.
</a></b></span></h3>
<h1 style="text-align:center;font-size:26px;"><strong>
<i class="fa fa-angle-double-left" style="color:silver;"></i>
{{ post.title }}
<i class="fa fa-angle-double-right" style="color:silver;"></i>
</strong></h1>
<h4 style="text-align:center;">
<i class="fa fa-heartbeat"></i>
<a href="http://lamchuanjiang.github.io" target="_blank" title="Author：@lamChuanJiang">
{% if site.id %}
{{ site.id }}
{% endif %}
</a>
<i class="fa fa-folder"></i>
{% for categories in post.categories %}
<a href="/blog/category.html#{{ post.categories[0] }}" title="Category：{{ post.categories[0] }}">
{{ post.categories[0] }}
</a>
{% endfor %}
<i class="fa fa-tags"></i>
{% for tag in post.tags %}
<a href="/blog/tag.html#{{ tag }}" title="Tag：“{{ tag }}”" style="background:#BFD9DB;margin:2px;radius:50%;">
<i>
{{ tag }}
{{ tag | last }}
</i></a>
{% endfor %}
<i class="fa fa-pencil"></i>
<a title="文章字数：{{ post.content | number_of_words }}">
{{ post.content | number_of_words }}
</a></h4>
{{ post.excerpt }}
</p>
<p style="text-align:right;">
<a href="{{ post.url | prepend: site.baseurl }}" class="btn" style="background-color:#438F97;" title="Read this full article.">
Read More
<i class="fa fa-angle-double-right"></i></a></p>
{% endfor %}
</li></ul>
<hr>
<h2 style="text-align:center;">
{% if  paginator.total_pages >1 %}
{% if paginator.previous_page %}
<a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}" title="上一页">
<span class="fa fa-backward" style="padding:10px;"></span></a>
{% endif %}
{% for page in (1..paginator.total_pages) %}
{% if page == paginator.page %}
<span style="font-size:48px;">
{{ page }} /
</span>
<span style="font-size:16px;">
{{ paginator.total_pages }}
</span>
{% elsif page == 1 %}
{% else %}
{% endif %}
{% endfor %}
{% if paginator.next_page %}
<a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}" title="下一页">
<i class="fa fa-forward" style="padding:10px;"></i></a>
{% endif %}
{% endif %}
</h2>
{% endhighlight %}	

### 特别感谢

在折腾 Jekyll 的整个过程中 Google 了不少时间，也参考了不少 Jekyll 博客源码，其中对我帮助最大的是：***[liberize's blog](http://liberize.me/)*** 。

本博客的几项重要功能的实现都和该博客提供的思路有关，这为我省了不少时间，在此非常感谢 *liberize*。

### 参考

+ [Jekyll 不用 JS 生成标签云]( http://liberize.me/tech/jekyll-tag-cloud.html)

+ [使用Jekyll在Github上搭建个人博客（分页实现）](http://segmentfault.com/a/1190000000406015)