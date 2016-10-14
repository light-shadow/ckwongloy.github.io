---
layout: post
title:  网页上直接打电话、发 QQ 消息、打开微信的链接
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

### 网页上直接跳转到 QQ 

```
<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=84580612&amp;site=qiangmi.com&amp;menu=yes" target="_blank"><code>742, 127, 934</code></a>
```

### 网页上直接打开 微信

```
<a href="weixin://contacts/profile/ckwongloy" title="微信" rel="nofollow"><code>@ckwongloy</code></a>
```