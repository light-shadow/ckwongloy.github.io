---
layout: post
title: Jekyll 代码高亮
category: Clipboard
tags: [Jekyll, 语法高亮]
latest: 2015年10月9日19:57:13
---

功能：使用 Jekyll 提供的方式高亮代码而不是用 Markdown 的 ```。


{% raw %}

<pre>
<code>{% highlight Ruby linenos %}</code>

<code>Your Code Here ...</code>

<code>{% endhighlight %}</code>
</pre>

{% endraw %}

注意事项
-

需要复制的代码建议不要添加 `linenos`，因为会连同行号数字复制到代码中，代码不必要的麻烦。
