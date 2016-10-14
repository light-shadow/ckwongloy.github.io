---
layout: post
title: Blogging with Jekyll+GitHub+Markdown
category: Auxiliary
tags: [Jekyll, 博客, GitHub, Git, Markdown]
latest: 2015年08月29日 14:54:13
---

博客雏形总算有时间弄出来了... ... 

本文先做个简单总结，后续将增加功能和总结。

我为什么开始写博客？
-

由于热爱 GitHub，所以本人首先选择将 Blog 搭建在 GitHub 上。

由于崇尚简约、美观、实用，所以我选择了 Markdown 作为 Blogging 工具。

至于为什么或者有没有必要写博客，每个人的情况，比如时间、兴趣等等都是不一样的。

对于我而言，我兴趣广泛，我喜欢研究一些东西，想一些东西，喜欢用文字表达自己的思想，而且我发现以文字这种方式比我用话说出来更清晰。

此外，我赞同了很多讲 Blog 必要性相关文章的主要观点，比如：

*[为什么你应该（从现在开始就）写博客](http://mindhacks.cn/2009/02/15/why-you-should-start-blogging-now/)*

其中我很认可的几点有：

+ __书写是为了更好的思考__。

+ __教是最好的学__。

+ __一个长期的价值博客是一份很好的简历__。

我个人也认为，将自己的一些学习经历通过键盘敲出来，本身就是一种学习，和对知识的总结，认真去写，就是认真地去思考，坚持下去，一定会有很多收获。

作为码农，博客可以用来作为记录技术学习经验和笔记，同时，放在网上也能为需要的人提供有用的内容。

一直也有通过文字表达自己思想，以及记录成长经历的冲动，但惭愧，直到今天，我才终于 "忍无可忍" ：写。

进入正题
-

本文不是为了从零开始一步一步菜鸟教学，而仅仅是作为一个日志记录在网上，将我个人的经验写入日志，以便自己和其他需要的人再次参考。

文章本身也不难。其中未涉及到的技术和知识，通过 __RTFM & STFW__ 都可以得到解决。在这里，推荐几个个人认为不错的博文和简易教程以供参考：

1. *[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)*

实现一个简单的 Blog 功能，先看看基本效果和流程。

1. *[Github 简明教程](http://www.runoob.com/w3cnote/git-guide.html)* & *[Git五分钟教程](http://www.runoob.com/w3cnote/git-five-minutes-tutorial.html)* & *[git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)*

对 Git 和 GitHub 有个基本印象。

1. *[Markdown 语法说明 (简体中文版) ](http://wowubuntu.com/markdown/)* & *[markdown简明语法| 不如](http://ibruce.info/2013/11/26/markdown/)*

快速熟悉 Markdown 的基本语法。

1. *[jekyllcn](http://jekyllcn.com/docs/home/)*

初步尝试后对 Jekyll 使用的深入。使自己的博客丰富起来。

当然我也有对上述工具的个人理解，为了简单，我用自己的一句话将现阶段我认为它们最本质的概念总结出来：

##### __Git__

版本管理工具。可以对软件、书籍，等等具有版本属性，需要版本管理的对象进行版本控制。

##### __GitHub__

源代码托管服务。基于 Git，以网站的形式示众，与 Git "里应外合" 干大事。

##### __Jekyll__ 

生成静态网页的引擎，被 GitHub 所采用。GitHub 上所有 **pages** 的最终呈现在浏览器的样式都是经过 Jekyll 处理的。

##### __Markdown__

一种专为写作而生的标记语。十分简洁美观，可用于制作各种文档。

## **在 GitHub 上搭建 Blog 的基本操作**

有了基本概念，下面就是将东西做出来，有不会的不要紧，做着做着就会了，关键是耐心和兴趣。不懂的地方请搜索，思路和基本步骤最重要。

### **第 1 步**：本地创建符合 Jekyll 规范的文件

要让 Jekyll 处理自己的文章，一个文件夹（如：`blog`）下__至少__需要有如下文件：

#### **1. Jekyll 配置文件 `_config.yml`**

`_config.yml` 中可以有很多配置信息，但这里要求的内容至少有：

```
baseurl: /blog
```

其作用是指明 Blog 的根目录。

这里指定为 `/blog` 是因为我的 GitHub 首页 *ckwongloy.github.io* 不是博客项目，blog 是我的一个 `gh-pages` 仓库，`/` 代表根，对于 GitHub 来说，只能是 `xxx.github.io`。

#### **2. 用于发布博客文章的 `_posts` 文件夹**

关于其下的文章文件只需注意 3 点：

① 支持的文档类型：`textile`、`markdwon`、`html`。

##### **说明**

其中，含有相应 YML 头的 textile 和 markdown 文档将被 Jekyll 渲染成 HTML，而 HTML 无论含不含有 YML 头，Jekyll 都不会再对其处理。

② 文章__命名格式__：年-月-日-标-题，如：2015-08-29-my-article.html

③ 每篇文章开头 **必须** 要有下述格式的文件头才能被 GitHub 上的 Jekyll 引擎识别并处理：

```
---
layout: template_name
title: your article title
tags: [a, b, c]
category: d
---
```

其中 `template_name` 是文章采用的模板名（ 无需指定后缀 ），文件头后面的内容就是文章内容了，可以采用 ① 中说明的那三种文件格式来写文章。

假设是文章 **2015-08-29-my-article.markdown** 的话，可参考：

{% highlight yaml %}
---
title:My first article
---

> 博客雏形总算有时间弄出来了

[本文](http://#)先做个简单总结，后续将增加功能和总结。

**我为什么开始写博客？**
-

#### 由于热爱 ***GitHub***，所以本人首先选择将 `Blog` 搭建在 *GitHub* 上。

... ...( 后面请自由发挥 )
{% endhighlight %}

#### **3. 用于存放文章显示样式模板的 `_layouts` 文件夹**

这个文件夹下的模板文件可以任意命名，只要在要引入模板的那个文章中指定模板的正确名字就行了。

里面的内容并不固定，但必须符合 Jekyll 的规范。举例说明:

##### **假设模板文件是 `post.html`，实际内容可__参考__如下：**

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8">
<title>{% raw %}{{ page.title }}{% endraw %}</title></head>

<body>

<h4>{% raw %}{{ page.date | date_to_string }}{% endraw %}

<a href="#">{% raw %}{{ page.title }}{% endraw %}</a></h4>

{% raw %}{{ content }}{% endraw %}

</body></html>
{% endhighlight %}

##### **设模板文件是 `main.html`，实际内容可__参考__如下：**

{% highlight html linenos %}
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8"></head>

<body>

{% raw %}{{ content }}{% endraw %}

</body></html>
{% endhighlight %}

##### **说明**

需要注意的只有 {% raw %}{{ page.title }}{% endraw %} 、{% raw %}{{ content }}{% endraw %}、{% raw %}{{ page.date | date_to_string }}{% endraw %} 的书写是正确的就行了，否则后面 push 到 GitHub 的时候会收到 page build failure 的邮件。

其他的地方，就可以当作普通 HTML 文档来自由发挥。

这里有可能会出现的问题，后文 ***可能出现的问题及其解决*** 会具体说明。

#### **4. Blog 首页：`index.html` 文件**

`index.html` 的要求和博客文章的差不多，需要注意的都是要保证那几个 Liquid 语法和文件头是正确的，只是一般用的模板不一样，参考如下：

{% highlight html linenos %}
---
title: My Blog
---

<h3>最新文章</h3>

<ul>

{% raw %}{% for post in site.posts %}{% endraw %}

<li>

{% raw %}{{ post.date | date_to_string }}{% endraw %}

<a href="{% raw %}{{ site.baseurl }}{% endraw %}{% raw %}{{ post.url }}{% endraw %}">

{% raw %}{{ post.title }}{% endraw %}

</a></li>

{% raw %}{% endfor %}{% endraw %}

</ul>

{% endhighlight %}


### **第 2 步：在 GitHub 创建一个 Repository**

注册 GitHub 账户和创建 Git 仓库，以及后面安装 Git 的步骤：略。

之后，下列名称将在第 3 步被使用：

假设注册的邮箱为： `youremail@example.com`

GitHub 账户名为：`username`

仓库名字为：`blog`

所以其 Git 地址为：` git@github.com:username/blog.git`

### **第 3 步**：将 ***第 1 步*** 中创建好的文件 push 到 GitHub

假设文件夹名就叫 `blog` ，里面已经准备好 **第 1 步** 的所需文件和文章。本地文件夹的名字无所谓，主要是 Git 工具的使用。

打开 **Git Bash**，如果是第一次使用，必要的配置有：

```
$ git config --global user.email "youremail@example.com"
$ git config --global user.name "username"
$ ssh-keygen -t rsa -C "youremail@example.com"
```

一直回车，最后一句执行成功的话会在 ~/ 下生成 .ssh 文件夹，进去，打开 id_rsa.pub，复制里面的 key，然后进入 GitHub 的 Account Settings，选择 SSH Keys -> Add SSH Key，粘贴在你电脑上生成的 key。（title 随便填）

验证是否成功：

```
$ ssh -T git@github.com

Hi tianqixin! You've successfully authenticated, but GitHub does not provide shell access.
```

如果失败，后面 ***可能出现的问题及其解决*** 将会提及常见失败的解决办法。

接下来进入 `blog` 文件夹下，打开 **Git Bash**: 

``` 
$ git init 
$ git checkout --orphan gh-pages
$ git add *
$ git commit -m "first article"
$ git remote add origin git@github.com:username/blog.git
$ git push origin gh-pages
```

##### **注意**

+ **一定要在 `gh-pages` 分支下操作**。

+ **一定要 `commit -m "xxx"`**。

至此，博客的文章已经推送到 GitHub 。如未发生错误，打开 *[https://username.github.io/blog](https://username.github.io/blog)* 就可以看到效果。

### **第 4 步：使用 Markdown 开始写作**

关于 markdown 的介绍我就不介绍了，开头推荐的文章足以掌握 markdown ，甚至都不用专门去学，要什么格式 **现查** 就行了。

时间一久，该会的就都会了，不会的说明对于你来说是不需要的，而关于工具的使用，我只学要用的那几个就行了。

我目前正在使用的写作方式：

1. Markdown 工具： **Cmd Markdown**。

2. 写作流程：在 Cmd Markdown 中写，完了导出 HTML，然后将加上文件头，将其上传到 GitHub。

+ 为啥我用 Cmd Markdwon?

我个人比较喜欢它的界面简约美观的风格，简约至上一直都是我的追求方向。

+  为啥我要费劲将 Markdown 转换成 HTML 后才上传？

为了使用了 Cmd Markdwon 的 CSS，叫：`template-theme-white.css`。

#### **说明**

可在 Cmd Markdown 中使用 `ctrl` + `alt` + `f`，然后输入 `exporttohtml` 导出，为了不给 Cmd Markdown 作者的服务器添堵，导出后将其下载到自己需要使用的项目中去 。

不过有时候为了省时间，我也会直接导出 .markdown 然后上传。

+ 如果不使用 Cmd Markdown 的 CSS 如何使文章样式漂亮？

使用 Jekyll 模板。

### **可能出现的问题及其解决**

#### **page build failue**？

文章格式不符合 Jekyll/Liquid 语法要求，按照 GitHub 发给你的邮箱里面的具体报错提示进行改正。

#### **push ‘成功’ GitHub 上却无仍任何文件**？

push 前忘了 commit, commit 时忘了 comments。请按照如下格式 commit:

```
$ git commit -m "first article"
```

#### **如何避免 Jekyll 解析而在 Jekyll 处理后的网页中显示 {% raw %}{{ content }}{% endraw %}**？

请使用 `raw`。

raw 可以暂时禁用标签处理，用于生成内容，它对使用相互矛盾的语法非常有用。

比如要将 {% raw %}{{ content }}{% endraw %} 避免 Jekyll 处理而直接显示到网页需要在其前后添加一对 raw 标签：

![](http://ww1.sinaimg.cn/mw690/00644Sdogw1ewx7w8rxrig309s01ljr7.gif)

这样一来，输出到网页上的就是 {% raw %}{{ content }}{% endraw %} 这个 Liquid 语法元素而非 Jekyll 解析后的内容了。

#### ***( 如何直接输出 endrow ？)***

##### **注意**

在用 Cmd Markdwon 书写 Liquid 语法用于网页直接显示的时候，有可能会出现会自动为要显示的 Liquid 语法元素其添加不必要的 HTML 标签，不符合 Liquid 语法要求，从而会导致 GitHub 上的 Jekyll 引擎解析失败，出现 **page build failure**。

### **接下来**

+ Jekyll 本地测试环境搭建。

+ Jekyll 高级应用。
