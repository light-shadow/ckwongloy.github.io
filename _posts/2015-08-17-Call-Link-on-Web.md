---
layout: post
title:  直接打电话、发 QQ 消息的链接
category: Clipboard
tags: [QQ, SNS]
latest: 2014年09月17日 20:21:40
---

很多移动网站上可以点击页面中的一个电话号码链接来拨打电话。

有两种方式来实现。


+ 方式 1

```
<a href="wtai://wp/mc;电话号码">
```

+ 方式 2

```
<a href="tel:电话号码">
```

其他
-

很早以前，据传可以通过 `Request.ServerVariables("????")` 来取得访问者的手机号码。

???? 部分：

联通 CDMA 用 HTTP_X_UP_SUBNO。

移动 GPRS 用 HTTP_X_UP_CALLING_LINE_ID。
