---
layout: post
title: 几种基本算法
category: Data Structure and Algorithm
tags: [算法, 排序, 查找]
latest: 2015年04月20日 20:32:08
---


排序  
-

1. 冒泡排序

- sort_by_bubble.php：

{% highlight php %}
<?php
	function sortInBubble( &$array ){
	$temp = 0 ;
		$flag = false ;
		for( $i = 0 ; $i < count( $array ) - 1 ; $i++ ){
			for( $j=0 ; $j < count( $array ) - 1- $i ; $j++ ){
				if( $array[ $j ]> $array[ $j + 1 ] ){
					$temp = $array[ $j ] ;
					$array[ $j ] = $array[ $j + 1 ] ;
					$array[ $j + 1 ] = $temp ;
					$flag = true ;
				}
			}
		if( !$flag ){
			break ;
			}
		$flag = false ;
		}
		print_r( $array ) ;
	}
	$array = array( 0 , 5 , -1 , 3, 2 , 1 , -2 , 4 , -3 ) ;
	sortInBubble( $array ) ;
?>
{% endhighlight %}

- 为什么 sortInBubble() 要加 & 符号？

如果这里不加 &，则 sortInBubble() 内部的 print_r( $array ); 有序输出，而外部的原样输出，这是因为输出传递的默认值是值不是地址。

- $flag 在这里有什么用？—— 通过设置标志判断比较与否可以减少交换次数。

2. 插入排序

- sort_by_insert.php：

{% highlight php %}
<?php
	function sortByInsert( &$Array ){
		for( $i = 1 ; $i < count( $Array ) ; $i++ ){
			$InsertValue = $Array[ $i ] ;
			$InsertIndex = $i - 1 ;
			while( $InsertIndex>=0 && $InsertValue < $Array[ $InsertIndex ] ){
				$Array[ $InsertIndex + 1] = $Array[ $InsertIndex ] ;
				$InsertIndex -- ;
			}
			$Array[ $InsertIndex + 1 ] = $InsertValue;
		}
	}
	$n = 10 ;
	for( $i = 0 ; $i < $n ; $i++ ){
		$Array[ $i ] = rand( 0 , 10000 ) ;
	}
	date_default_timezone_set( 'Asia/Shanghai' ) ;
	echo "********* 时间消耗 *********<br/>排序前：".date( 'Y-n-d G: i: s' ).'<br/>' ;
	sortByInsert( $Array ) ;
	echo "排序后：".date( 'Y-n-d G: i: s' ).'<br/>********* 排序结果 *********<br/>' ;
	print_r( $Array ) ;	
?>
{% endhighlight %}

3. 选择排序

### 选择排序的思想

每找到一个真正意义上的最小值之后，把除次数之外的数重新看作一个数值，重复第一步的操作即可；假设 i 就是最小的数的下标，当假设最小值遇到更小的时候，更新最小值及其索引；发现此次内循环中有和假设不对的后交换顺序，使其有序。 

查找
-

1. 二分查找
·二分查找的思想 —— 当右下标大于左下标的时候，代表找不到 -> 找到中间这个数 -> 比要找的数小就往右继续找，以此类推。

- search_by_binary.php：

{% highlight php %}
<?php
	function searchByBinary( &$Array , $Target , $LeftIndex , $RightIndex ){
		if( $RightIndex < $LeftIndex ){
			echo "结束 ! <br/>查无此数." ;
			return ;
		}
		$MiddleIndex = round( ( $RightIndex + $LeftIndex) / 2 ) ;
		if( $Target > $Array[ $MiddleIndex ] ){
			searchByBinary( $Array , $Target , $MiddleIndex + 1 , $RightIndex ) ;
		}elseif( $Target < $Array[ $MiddleIndex ] ){
			searchByBinary($Array , $Target , $LeftIndex , $MiddleIndex - 1 ) ;
		}else{
			echo "成功 ! <br/>此数的下标是 $MiddleIndex ." ;
		 }
	}
	$Array = array( 1 , 3 , 4 , 33 , 44 ) ;
	searchByBinary( $arr , 4 , 0 , count( $Array ) - 1 ) ;
?>
{% endhighlight %}

- 二分查找的前提是什么？

要查找的数组已经是一个有序数组，若不是则先排好序。

2. 顺序查找

- search_by_sequence.php：

{% highlight php %}
<?php
	function searchBySequence( &$Array, $Target ){
		$Flag = false ;
		for( $i = 0 ; $i < count( $Array ) ; $i++ ){
			if( $Target == $Array[ $i ] ){
				echo "完成！<br/> ".$Target." 的下标为 $i";
				$Flag = true ;
				break ;	// 找到一个则退出，若要继续查找则不要break;
			}
		}
		if( !$Flag ){
			echo '结束！<br/>不存在'.$Target.'这个数 . ';
		}
	}
	$Array = array( 1 , 5 , 3 , 8 , 33 , 84 ) ;
	searchBySequence( $Array , 33 ) ;
?>
{% endhighlight %}