---
layout: post
title: 社交网络分享模板
category: Clipboard
tags: [SNS, Javascript, 百度]
latest: 2015年08月23日 19:57:13
---

很实用的各种社交网络分享模板，百度提供的 CDN。

{% highlight HTML linenos %}
<div style="width:700px;margin:10px auto 20px auto;padding:0 0 0 380px;overflow:hidden">
<!-- Baidu Button BEGIN -->
<div id="bdshare" class="bdshare_t bds_tools_32 get-codes-bdshare" style="margin:10px 0 0 -4px">
<a class="bds_tsina"></a>
<a class="bds_tqq"></a>
<a class="bds_renren"></a>
<a class="bds_qzone"></a>
<a class="bds_douban"></a>
<a class="bds_xg"></a>
<span class="bds_more">更多</span>
<a class="shareCount"></a></div>
<script type="text/javascript" id="bdshare_js" data="type=tools" ></script>
<script type="text/javascript" id="bdshell_js"></script>
<script type="text/javascript">
	document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
</script>
<!-- Baidu Button END -->
</div>
{% endhighlight %}
