---
layout: post
title: 使用 Markdown 需要注意的地方
category: Auxiliary
tag: Markdown
latest: 2015年10月09日 20:14:24
---

Markdown 语法讲的不错的好几个，本文只是对我个人在使用过程中遇到的坑特意说明一下，已经炉火纯青的亲就不要在此文上浪费时间了。

列表嵌套
-

刚开始我只知道 `*`、`-`、`+` 3 个都可以，但是在嵌套列表的时候没有嵌套的实际效果。

原因是二级列表需要 4 个空格的缩进，并以此类推。

```
+ 一级列表标题
    - 二级列表标题
    * 二级列表标题
        + 三级列表标题
        + 三级列表标题
        + 三级列表标题
    - 二级列表标题
- 一级列表标题
```

然后，上述代码中可以 **任意次序使用**  `*`、`-`、`+` 3 个符号中的某个。

都需要注意的是，上述 3 个符号的左右都要有 1~4 个空格，根据排版需要使用。

超链接
-

除了 `[]()` 和 `![]()` 外，如果只想要超链接的地址而非标题，可以这么做：

```
<https://google.com>
```

当然，还有种笨方法就是： `[https://google.com](https://google.com)` 。

效果都一样：* <https://google.com>* 。

Markdown Extra
-

- 表格

```
| YOU      |    HE | I  |
| :-------- | --------:| :--: |
| YOU  | HE | I   |
| YOU     |   HE |  I  |
| YOU      |    HE | I  |
```

- 数学公式

请参考：[Mathematics Stack Exchange](http://math.stackexchange.com) 。

- 脚注

`[^footnote]`

- 代码块

{% highlight python %}
``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```
{% endhighlight %}

- 目录

`TOC`

- UML / 流程图

```sequence
张->李四: 嘿，小四儿, 写博客了没?
Note right of 李四: 李四愣了一下，说：
李四-->张三: 忙得吐血，哪有时间写。
```

或者流程图：

```flow
st=>start: 开始
e=>end: 结束
op=>operation: 我的操作
cond=>condition: 确认？

st->op->cond
cond(yes)->e
cond(no)->op
```

*貌似 GitHub 不支持 Markdown Extra ?*


### 参考

+ *[markdown简明语法| 不如](http://ibruce.info/2013/11/26/markdown)* ( 个人推荐 )

+ *[Markdown 语法说明 (简体中文版) ](http://wowubuntu.com/markdown)*
