---
layout: post
title: Jekyll/Liquid 常用小功能
category: Clipboard
tags: [Jekyll, 语法高亮]
latest: 2015年10月9日 19:57:13
---

把 Jekyll 博客用过的小功能代码段总结一下。

代码高亮
-

功能：使用 Jekyll 提供的方式高亮代码而不是用 Markdown 的 ```。

{% raw %}

<pre>
<code>{% highlight Ruby linenos %}</code>

<code>Your Code Here ...</code>

<code>{% endhighlight %}</code>
</pre>

{% endraw %}

`highlight` 后面跟的是需要高亮的编程语言的 shortname。

##### **注意**

需要复制的代码建议不要添加 `linenos`，因为会连同行号数字复制到代码中，代码不必要的麻烦。

#### **关于代码高亮**

由于 Markdown 解析器会将 Markdown 文本最终转换成 HTML 格式的页面，所以一般对含有 HTML 标签的 Markdown 文本来说，在 *to-html* 的过程中会忽略 Markdown 中的 HTML 标签，所以如果本身需要高亮或者输出的代码就是 HTML 代码或者是含有 HTML 标签的代码，则必须使用上面的高亮方式，否则输出的是 HTML 解析后的页面而不是想要展示的原 HTML 代码。

路径
-

```
<link rel="canonical" href="{% raw %}{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}{% endraw %}">

{% raw %}{{ post.url | prepend: site.baseurl }}{% endraw %}
```

其中 `{% raw %}{{ post.url | prepend: site.baseurl }}{% endraw %}` 在以域名根目录作为博客根目录时失效，仅需要替换为 `{% raw %}{{ post.url  }}{% endraw %}` 即可。

摘要截取
-

页面中，在需要截取部分内容的位置插入一下代码即可截取规定字数的内容输出，`truncate` 后的字数根据需要自定义。我将下面的代码用到了首页摘要的截取，以及下一篇、上一篇文章链接中队文章标题长度的限定上面。

```
{% raw %}{{ post.content | strip_html | truncate:100 }}{% endraw %}
```

上下篇文章跳转路径
-

```
<a href="{% raw %}{{ BASE_PATH }}{% endraw %}{% raw %}{{ page.previous.url }}{% endraw %}" title="{% raw %}{{ page.previous.title }}{% endraw %}" style="color:#fff";>{% raw %}{{ page.previous.title | strip_html | truncate:20 }}{% endraw %}</a>
```
