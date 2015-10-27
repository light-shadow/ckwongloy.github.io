---
layout: post
title: Google/Chrome 个人经验
category: Auxiliary
tags: [Google, Chrome, 搜索引擎]
latest: 2015年09月28日 18:25:08
---

一个好的搜索引擎能节约生命。一个好的浏览器也能节约生命。

纵然身在祖国，Google 的一些技术和产品依然离不开。

这里总结和分享我个人的一些使用经验。

Google 搜索 TIPs
=

+ 关键字前面使用 `+` 只显示当前关键字的搜索结果

+ 自定义站内搜索：*[一分钟加入google站内搜索代码,只有7行最精简,不是custom serach](http://tongcx.no-ip.org:81/node/107)*

+ `site` 命令：`site: v2ex.com vpn shadowsocks goagent`


Chome 使用 TIPs
=

+ 加载失败时游戏彩蛋：空格

+ **审查元素** 下载网页视频

+ 删除历史记录：Ctrl + Shift + Delete

+ Chome 缓存内容查看：**ChromeCacheView **

+ 隐身模式：Ctrl + Shift + N

该模式在测试的时候很有用。因为测试时候改动很多，一般都不需要 Cookie。

+ 清除浏览记录：Ctrl + Shift + Delete

Chrome 与 Web 开发
-

Chrome 的兼容性很强，比如 FireFox 不能兼容的 IE 属性 innerText Chrome 能兼容。

比如 event.keyCode 对 FF 来说作用域也是不一样的，IE/Chrome 将其设置为全局变量，而 FF 将其设置为局部变量，所以要使 FF 对 event 事件产生响应，那么需要将 `event` 作为函数参数传递给响应的事件。

此外，对 Web 开发者来说，移动互联网时代促使开发者针对移动设备进行优化，大名鼎鼎的前端框架 Bootstrap 已经遵守是移动优先原则了。

这就对响应式网页开发的需求激增，而作为一个前端工程师，为了满足用户体验的苛刻要求，调试各种尺寸的移动设备便是家常便饭。

还好 Chrome 的 F12 非常管用。可以十分方便地 Toggle 到 Mobile Device Mode，并且提供了主流移动设备的尺寸，当然也包括横屏 ( landscape ) 预览了。

我用 Chrome，调试网页从来不用下载其他任何工具，一个 F12，HTML, CSS, JS, 以及网络状况都能够一目了然，调试前后端都非常方便。

#### **插件**

+ Chrome 灰色金属主题：Brushed。

+ 广告封杀：AdBlock。

+ 清爽网页浏览：印象笔记·悦读。

+ 高反差扩展插件

在开发的过程中，我尽可能地将注意力集中到一点。所以如果是在 Windows 上我基本上使用的是高反差模式 ( Black or White )。

Chrome 在你更改系统主题为高反差模式的时候会自动侦测到，并提醒你是否使用而使用高反差插件，就算不适用 Chrome 高反差插件，系统主题的更换在浏览网页上依然十分清晰。而 IE 和 FF 在不手动设置的情况下都显示不清楚。

这是我在 IE，FireFox 上没有看到的。

( 虽然 FF 的 FireBugs 口碑一直不错，但是我 *个人的体验* 一直不怎么好，开始使用 FF 也是因为 Fedora 上基本上内置了 FF )

Google to Go
-

+ VPN

+ Nignix Reverse Proxy

+ Google Mirror

More see：***[Pointer](https://github.com/lamChuanJiang/lamchuanjiang.github.io/wiki/)***

Google Analytics
-

Stay tuned...
