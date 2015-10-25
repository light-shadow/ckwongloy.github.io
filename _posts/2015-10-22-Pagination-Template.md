---
layout: post
title: 分页模板
category: Algorithm
tags: [分页, 算法, PHP]
latest: 2015年10月25日19:31:48
---

分页算法是几乎在各种网站，博客上随处可见。我 PHP + MySQL 实现了一个还算比较漂亮的分页算法。

废话少说，直接上代码。

{% highlight php %}
<html>
<head>
<meta charset='utf-8'>
<title>用户管理 - Web Chat</title>

<style>
	body { font-family: Georgia; }
	form { display: inline; }
	th, td{ text-align: center; }
	h2 { text-align: center; margin:50px 0 0 0; }
	a { text-decoration: none; border: solid silver 1px; margin:0 5px 0 5px ; }
	span { padding:0 5px 0 5px; }
	/*div.pagination { margin:50px 0 0 22%; }*/
	.current { background-color: #0000EB; font-size: 18px; color: white; }
</style>

</head>

<body>
	
<?php
	
	require_once '../class/sql_helper.class.php' ;

	//////////////////////////////////////////////////// 分页的配置

	// $page_now 表示当前页，传过来是第几页就是第几页
	// 当前页始终位于分页条的正中央 ( 开始 5 页和最后 5 页除外 )

	$page_now = $_GET['p'] ;

	// $rows_per_page 表示每页显示的行数
	$rows_per_page = 10 ;

	// $page_scale 表示每页显示多少条可以直达到某个具体、连续的超链接个数
	// 如果 $page_scale = 5 ，则偏移量为 2；即：($page_scale-1)/2
	$page_scale = 5 ;
	$offset = floor( $page_scale/2 ) ;

	$count_dql = "select count(*) from userinfo" ;

	$sql_helper = new SQLHelper() ;

	$arr = mysqli_fetch_array( $sql_helper -> execute_dql( $count_dql ) ) ;

	$total_rows = $arr[0] ;

	// 最后一页应该向上取整：ceil() ；向下取整是 floor()
	$total_page = ceil( ($total_rows/$rows_per_page) ) ;

	// 对接受到的页码进行检测

	// 交给 Javascript 检查更好，将合法的总页数传过去判断

	// if( $page_now > $total_page || $page_now < 1 ) {
	// 	echo '页码不正确！' ;
	// 	$page_now = 1 ;
	// }

	$dql = "select * from userinfo limit ".($page_now-1)*$rows_per_page.",$rows_per_page" ;

	$res = $sql_helper->execute_dql( $dql ) ;


?>

<div>
<table align=center border=1 cellspacing=0 cellpadding=10>
<caption><h1>用户信息</h1></caption>
<th>ID</th>
<th>用户名</th>
<th>邮箱</th>
<th>手机</th>
<th>网址</th>
<th>注册时间</th>
<th>是否在线</th>

<?php
	
	while( $rows = $res->fetch_assoc() ) {

		echo '<tr>' ;
		echo '<td>'.$rows["id"].'</td>' ;
		echo '<td>'.$rows["usr"].'</td>' ;
		echo '<td>'.$rows["email"].'</td>' ;
		echo '<td>'.$rows["phone"].'</td>' ;
		echo '<td>'.$rows["website"].'</td>' ;
		echo '<td>'.$rows["regtime"].'</td>' ;
		if( $rows["is_online"] == 0 ) {
			echo '<td>不在线</td>' ;
		} else {
			echo '<td>在线</td>' ;
		}
		echo '</tr>' ;
	}

?>

</table></div>

<!-- <div class="pagination"> -->

<h5 style="text-align:center;">

<?php
	
	// 显示分页条
	
	// $pagination = '首页    上一页   <<    3  4  5  6  7    >>   下一页    尾页   跳页：____ 确定 ' ;
	
	$pagination = '' ;

	// 初始化数据
	// $start 表示出现在每页的，具体页码的，起始页码号；初始化为 1
	$start = 1 ;
	// $end 表示表示出现在每页的，具体页码的，结束页码号；初始化为 最后一页
	$end = $total_page ;

	if( ( $page_now <= $total_page ) && ($page_now > 1) ) {

		$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p=1"><span>首页</span></a>' ;

		$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.($page_now-1).'"><span>上一页</span></a>' ;

	} else {

		$pagination .= '<span style="color:silver;"><i>已达首页</i></span>' ;

		$pagination .= '<span style="color:silver;"><i>没有上一页</i></span>' ;
	}

	if( $total_page >= $page_now ) {

		if( $page_now > ( $offset+1 ) ) {

			$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.($page_now-$offset).'"><span>&lt;&lt;</span></a>' ;		
		}

		if( $page_now > $offset ) {

			$start = $page_now - $offset ;
			$end = $total_page > ($page_now + $offset) ? ($page_now + $offset) : $total_page ;

		} else {

			$start = 1 ;
			$end = $total_page > $page_scale ? $page_scale : $total_page ;
		}

		if( ($page_now + $offset ) > $total_page ) {

			$start = $start - ( $page_now + $offset - $end ) ;
		}
	}

	for( $i=$start; $i<=$end; $i++ ) {

		if( $i > 0 ) {

			// 如果当前页和 $i 相等，那么显示另一种样式，否则当作普通样式输出
			if( $i == $page_now ) {

				$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.$i.'"><span class="current"><b>'.$i.'</b></span></a>' ;

			} else {

				$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.$i.'"><span>'.$i.'</span></a>' ;
			}
		}
	}

	if( $total_page > ($page_now+$offset) ) {

		$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.($page_now+$offset).'"><span>&gt;&gt;</span></a>' ;		
	}

	if( ($page_now < $total_page) && ($page_now > 0) ) {
		
		$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.($page_now+1).'"><span>下一页</span></a>' ;

		$pagination .= '<a href="'.$_SERVER['PHP_SELF'].'?p='.$total_page.'"><span>尾页</span></a>' ;	

	} else {

		$pagination .= '<span style="color:silver;"><i>没有下一页</i></span>' ;

		$pagination .= '<span style="color:silver;"><i>已达尾页</i></span>' ;
	}
	
	$pagination .= "<span><b>跳至</b></span>" ;

	$pagination .= "

	<form action=".$_SERVER['PHP_SELF']." method='GET'>
	<input type='text' name='p' size=5 id='input_page' value='0 ~ $total_page ( $page_now )' onclick='clear_content()'>
	<span><b>页</b></span>
	<input type='submit' value='确定' onclick='page_check( $total_page, $page_now )'>
	</form>

	" ;

	$pagination .= "( 共 ".$total_page." 页 )" ;

	echo $pagination ;

?>

</h5>

<a href="/WebChat/view/friends_list.php" title="返回好友列表">返回好友列表</a>

<!-- </div> -->

<script>
	
	function page_check( total_page, page_now ) {

		input_page = $( 'input_page' ).value

		if( ! ( input_page <= total_page &&  input_page > 0 ) ) {

			$( 'input_page' ).value = page_now

			alert( '输入页码的不正确！' )
		}
	}
	
	function clear_content() {
		
		$( 'input_page' ).value = ''
	}

	function $( id ){

		return document.getElementById( id ) ;
	}
</script>

</body></html>
{% endhighlight %}

总结
-

### 分页算法中主要的变量及其含义

- $page_now：总是代表当前正在显示的分页页面，其值等于传递过来的 $p，通过 $_GET['p']。

- $offset：这是为了实现在每个页面显示 2 个以上的分页超链接个数而设置的超链接，每页的超链接个数保存在 $page_scale。

`$page_now - $offset` 等于分页条底部，每页要显示的超链接开始，即 $start。

`$page_now + $offset` 等于分页条底部，每页要显示的超链接结束，即 $end。

根据分页的特点，$offset 需要向下取整，即：

```
$offset = floor( $page_scale/2 ) ;
```

- $rows_per_page：这是每页要显示的行数，由 SQL 语句控制：

```
$dql = "select * from userinfo limit ".($page_now-1)*$rows_per_page.",$rows_per_page" ;
```

- $total_rows：从数据看查询得到的结果总行数。是后面设计逻辑控制的参考之一。相关的 SQL 语句为：

```
$count_dql = "select count(*) from userinfo" ;
```

- $total_rows：总页数。需要向下取整：

```
$total_rows = ceil( ($total_rows/$rows_per_page) ) ;
```

最后的样式类似于：

```
首页    上一页   <<    3  4  5  6  7    >>   下一页    尾页   跳页：____ 确定 ( 共 100 页 )
```

为了在一定成都上对非法输入进行限制，使用了 Javascript 在浏览器本地进行了简单的验证：

{% highlight javascript %}
<script>

	// 需要将 PHP 中的相关参数传递到 Javascript 才能得到比较正确的判断

	function page_check( total_page, page_now ) {

		input_page = $( 'input_page' ).value

		if( ! ( input_page <= total_page &&  input_page > 0 ) ) {

			$( 'input_page' ).value = page_now

			alert( '输入页码的不正确！' )
		}
	}
	
	function clear_content() {
		
		$( 'input_page' ).value = ''
	}

	function $( id ){

		return document.getElementById( id ) ;
	}
	
</script>
{% endhighlight %}
