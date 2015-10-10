---
layout: post
title: Bootstrap 常用小功能
category: Clipboard
tags: [Bootstrap, 进度条, Front-End]
latest: 2015年8月15日 17:19:48
---

Bootstrap 非常棒。总结几种本人用过的，个人觉得很常用的 Bootstrap 功能。

Bootstrap 动态进度条
-

{% highlight HTML linenos %}
<div class="progress progress-striped">
<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 5%;"></div>
<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" 	style="width: 10%;"></div>
<div class="progress-bar progress-bar-warning active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 15%;"></div></div><br>
{% endhighlight %}

Bootstrap 字体图标
-
{% highlight HTML linenos %}
<link rel="stylesheet" href="./css/bootstrap.min.css">
<script src="./js/jquery-2.1.4.min.js"></script>
<script src="./js/bootstrap.min.js"></script>

<button type="button" class="btn btn-primary btn-lg" style="text-shadow: black 5px 3px 3px;font-size: 20px;color: rgb(255,255,255);">
<span class="icon icon-envelope"></span>&nbsp;E-mail</button>
{% endhighlight %}

下拉按钮组
-

{% highlight HTML linenos %}
<div class="btn-group">
  <button type="button" class="btn btn-default">按钮 1</button>
  <button type="button" class="btn btn-default">按钮 2</button>

  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" 
      data-toggle="dropdown">
      下列
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">下拉链接 1</a></li>
      <li><a href="#">下拉链接 2</a></li>
    </ul>
  </div>
</div>
{% endhighlight %}

Bootstrap 模态框模板
-

{% highlight HTML linenos %}
<!-- 按钮触发模态框 -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">我的个人主页</button>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
			<span class="label label-default">项目标签</span>&nbsp<span class="label label-warning">HTML+CSS+Javascript</span>&nbsp<span class="label label-success">前端</span></div>

			<div class="modal-body">
			 <!-- <h4 class="modal-title" id="myModalLabel">主页地址：<a href='https://lamchuanjiang.github.io'>https://lamchuanjiang.github.io</a></h4> -->
			 <h4 class="modal-title" id="myModalLabel">主页地址：<a href='https://lamchuanjiang.github.io'>https://lamchuanjiang.github.io</a></h4>
           <div><span class="label label-danger">说明：</span><br/><br/>很简单的一个个人主页，主要用于简历呈现。<br/><br/>页面主要使用的是 <code>Bootstrap</code>，也用到了 Javascript 框架 <code>JQuery</code> 和一些自定义 CSS 进行样式控制，字符图标采用的是 <code>Font Awesome</code>。整个主页的框架主要就是由以上 3 种前端框架组合构成。<br/><br/>源代码和主页都托管在 GitHub。<br/><br/><span class="label label-danger">遇到的问题：</span><br/><br/>Bootstrap 和 首页导航条、其他页面的面包屑导航条（未使用 Bootstrap 自带面包屑导航）中的样式控制发生冲突<br/><br/><span class="icon icon-hand-right"></span> 通过修改 Bootstrap.min.css 中引起冲突的类选择器顺利解决。</span></div>
         </div>

         <div class="modal-footer">
	<!-- 	 <button type="button" class="btn btn-primary">HTML+CSS+Javascript</button></div> -->
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
         </div>
      </div><!-- /.modal-content -->
</div><!-- /.modal -->
</div>
{% endhighlight %}

折叠
-

{% highlight HTML linenos %}
<script src="./js/jquery-2.1.4.min.js"></script>
<script src="./js/bootstrap.min.js"></script>
<script type="text/javascript">
	$(function () { $('#collapseFour').collapse({
	toggle: false
	})});
	$(function () { $('#collapseTwo').collapse('show')});
	$(function () { $('#collapseThree').collapse('toggle')});
	$(function () { $('#collapseOne').collapse('hide')});
</script>

<div class="panel-group" id="accordion">
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">点击我进行展开，再次点击我进行折叠。第 1 部分--hide 方法</a></h4></div>

<div id="collapseOne" class="panel-collapse collapse in">
<div class="panel-body">1 content</div></div></div>

<div class="panel panel-success">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">点击我进行展开，再次点击我进行折叠。第 2 部分--show 方法</a></h4></div>

<div id="collapseTwo" class="panel-collapse collapse">
<div class="panel-body">2 content</div></div></div>

<div class="panel panel-info">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">点击我进行展开，再次点击我进行折叠。第 3 部分--toggle 方法</a></h4></div>

<div id="collapseThree" class="panel-collapse collapse">
<div class="panel-body">3 content</div></div></div>

<div class="panel panel-warning">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">点击我进行展开，再次点击我进行折叠。第 4 部分--options 方法</a></h4></div>

<div id="collapseFour" class="panel-collapse collapse">
<div class="panel-body">4 content</div></div></div></div>
{% endhighlight %}