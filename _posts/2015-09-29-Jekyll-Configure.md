---
layout: post
title: Jekyll 常用配置：_config.yml 和 YML 头
category: Auxiliary
tag: Jekyll
latest: 2015年10月09日 20:14:24
---

配置 Jekyll 主要是按需修改 *_config.yml* 文件或者指定 YML 文件头。

语法高亮
-

本博客采用的语法高亮器是 Pygments，被它所支持的语言在这里：*[Supported languages &mdash; Pygments](http://pygments.org/languages/)*。

配置语法高亮：

```
# old version jekyll use pygments:true
# pygments: true

# if GitHub then pygments
highlighter: pygments

# if local test then rouge that can avoid pygments and python installing
#highlighter: rouge
```

设置编码
-

先查看 Ruby 可用的编码

```
ruby -e 'puts Encoding::list.join("\n")'
```

头信息
-


即 YML 头信息

在且只在 textile、markdown 格式的文本有 YML 头信息，就会被 Jekyll 转换成 HTML。

分为预定义全局变量，位置应该放在 yml 头信息块中，yml 头主要有：

+ Layout

调用的是 _layouts 目录下面定义好的模板，用于样式输出。

+ Permalink

改变默认的博文地址：/year/month/day/title.html 为你指定的地址。

+ Published

false 则会关闭博文的显示。

+ Category/categories

博文分类。

+ Tag/tags

博文标签。

+ 自定义变量

如：`{% raw %}{{ page.title }}{% endraw %}`

以及预定义变量，预定义变量没有指出，但是仍然可以使用，如 page、date、site 等。

+ 时间格式


    - 常用

	{% raw %}
	```	
	{{ post.date | date: "%B %-d, %Y, %A" }}
	```
	{% endraw %}

    - 完整
	
	注意 page 和 post 的灵活变动。
	
	{% raw %}
	```
	<!-- Whitespace added for readability -->

	{% assign d = page.date | date: "%-d" %} 
	{% assign m = page.date | date: "%B" %} 
	
	{% case m %}
	{% when 'April' or 'May' or 'June' or 'July' %}{{ m }}
	{% when 'September' %}Sept.
	{% else %}{{ page.date | date: "%B" }}.
	{% case d %}
	{% when '1' or '21' or '31' %}{{ d }}st
	{% when '2' or '22' %}{{ d }}nd
	{% when '3' or '23' %}{{ d }}rd
	{% else %}{{ d }}th
	{% endcase %}, 
	{{ page.date | date: "%Y, %A" }}.
	{% endcase %}
	```
	{% endraw %}

	如果想要完整的月数显示，则可以删除 `case m` 和  `assign m`。
	
	- 其他
	
	{% raw %}`{{ page.date | date: '%F' }}`{% endraw %} 和 {% raw %}`{{ post.date | date: "%Y-%m-%d" }}`{% endraw %} 显示效果一样。

	`%M` 等 Jekyll 中不支持的格式会显示成 `00`。

	**参考**：[Jekyll Date Formatting Examples](http://alanwsmith.com/jekyll-liquid-date-formatting-examples)

Jekyll/Liquid 注意事项
-

+ 关于字数统计

博客文章中不能使用：

```
{% raw %}{{ post.content | number_of_words }}{% endraw %}
```

只能使用：

```
{% raw %}{{ page.content | number_of_words }}{% endraw %}
```
+ 变量及其作用

    - site.url
    
    url 在 _config.yml 指定，比如：

	```
	url: "http://lamchuanjiang.github.io" # the base hostname & protocol for your site
	```

	然后在任何页面引用：
    
    ```
    ![有帮助的截图]({%  raw %}{{ site.url }}{% endraw %}/favicon.ico)
    ```

    - post.url

+ Build Failure?

检查是否安装了 Python2.7.x，Python3.4.x 不行。

建议将 Python2.7 添加到环境变量。

##### **说明**

Python2.7.x 和 Python 3.4.x 可以同时被安装，为了不冲突，建议只把其中一个添加到环境变量中去。

如何通过手段将所有文章生成到网站根目录？
-

permalink。可以为文章设置 **永久链接** 为如下格式：

```
permalink: /:title.html
```

这样一来，被 Jekyll 生成的文章都全部出现在 _site 目录的根目录下面，即网站下面。

这样有利于 SEO，因为 Spider 对全网站文章的抓取都在 3 层目录之类，这对搜索引擎的搜录是十分友好的。

