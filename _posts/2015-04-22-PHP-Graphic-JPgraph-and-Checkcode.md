---
layout: post
title: PHP 绘图：JPgraph 与验证码
category: PHP
tags: [PHP, 验证码, JPgraph]
latest: 2015年10月25日 18:46:51
---

报表开发和验证码是网站中经常用到的技术。

报表开发
-

以表格或者是图表的方式显示报告数据。

#### 相关知识点

- PHP 绘图坐标系统。

- 像素是密度单位, 不是长度单位。

- 每个像素代表一个点, 1366*768 表示每行 1366 个点, 共有 768 行。

PHP绘图技术步骤
-

1. 创建画布

2. 绘制需要的各种图形 ( GD库 --> php.ini --> extension=php_gd2.dll )

3. 输出图像到网页或者另存。

4. 销毁该图片 ( 释放服务器端内存 )。

网站开发常见的图片格式说明
-

1. gif 的压缩率高, 只能显示 256 色, 可能造成色彩丢失, 优点是可以显示动态图片。

2. jpg/jpeg 压缩率较高 (有损压缩, 会有丢失), 可以用较小的文件来显示, 网页上用得比较多。

3. png 综合了gif 和 jpg 的优势, 保真最好, 会压缩到极致才传送, 文件大小相对较大, 但不能显示动画。

JPgraph 解决中文乱码问题
-

JPgraph 默认是不支持中文标题和图例的。需要做如下配置：

- 中文标题

修改 `jpgraph_ttf.inc.php`。搜索 `CHINESE_TTF_FONT` 选项，修改常量的值是支持中文的字体：

```
define( 'CHINESE_TTF_FONT', 'SIMYOU.TTF' ) ;
$graph -> title - > SetFont( FF_CHINESE ) ;
```

- 中文图例

修改 `jpgraph_legend.inc.php`，将 `$font_family` 修改成 `FF_CHINESE`：

```
public $font_family = FF_CHINESE, $font_style = FS_NORMAL, $font_size = 8 ;
```

PHP 绘制验证码
-

我将验证码工具封装成类，需要的可以参考一下。

- _checkcode.class.php_

{% highlight php %}
<?php
	
	////////////////////////////////////////////////////////// 验证码工具类：CheckCode
	
	class CheckCode {

		private $length ;

		private $checkcode ;

		public function __construct( $length ) {

			// 这里访问私有成员不能写成：self::$length = $length ;

			$this->length = $length ;

			$this->checkcode = $this->rand_str( $this->length ) ;

		}

		public function get_checkcode() {

			return $this->checkcode ;

		}

		public function rand_str( $length ) {

			$str = '' ;

			$arr = array(

				"a", "b", "c", "d", "e", 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ,
				"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ,
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
			
			) ;

			for( $i=0; $i<$length; $i++ ) {

				// 生成随机字符串
				$str .= $arr[ rand( 0, 61 ) ] ;

				// 生成随机数并转换成 16 进制
				// $str .= dechex( rand( 0, 9 ) ) ;

			}

			return $str ;
		}

		public function random_str( $length ) {

		    // 生成一个包含 大写英文字母, 小写英文字母, 数字 的数组

		    $arr = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z')) ;
		 
		    $str = '' ;
		    $arr_len = count($arr) ;

		    for ($i = 0; $i < $length; $i++)
		    {
		        $rand = mt_rand(0, $arr_len-1) ;
		        $str .= $arr[$rand] ;
		    }
		 
		    return $str ;
		}

		public function draw_checkcode( $checkcode ) {

			// 访问共有函数可以使用 self:: 也可以使用 $this->
			// $checkcode = self::rand_str( $length ) ;
			// $checkcode = $this->rand_str( $length ) ;

			// 创建画布，画布大小一般固定
			$canvas = imagecreatetruecolor( 200, 50 ) ;

			// 画颜色、大小、位置都变化的干扰线
			for( $j=0; $j<20; $j++ ) {
				imageline( $canvas, rand( 0, 200 ), rand( 0, 50 ), rand( 0, 200 ), rand( 0, 50 ), imagecolorallocate( $canvas, rand( 0, 255 ), rand( 0, 255 ), rand( 0, 255 ) ) ) ;
			}

			// 画出验证码
			imagestring( $canvas, rand( 5, 15 ), rand( 10, 160 ), rand( 10, 30 ), $checkcode, imagecolorallocate( $canvas, 255, 255, 255 ) );

			// 画噪点
			for( $j=0; $j<500; $j++ )  {
				imagesetpixel( $canvas, rand( 0, 200 ), rand( 0, 50 ), imagecolorallocate( $canvas, rand( 0, 255 ), rand( 0, 255 ), rand( 0, 255 ) ) ) ;
			}

			// 将绘制的图片以 png 格式输出到浏览器
			header( "Content-Type: image/png" ) ;
			imagepng( $canvas ) ;

			imagedestroy( $canvas ) ;
		}

	}


{% endhighlight %}

在 HTML 中使用该工具类：

```
<img src="/WebChat/view/checkcode.php" style="cursor:pointer;" title="看不清楚？换一张" onclick="this.src='/WebChat/view/checkcode.php?i='+Math.random()" alt="验证码">
```

##### **说明**

这里在刷新验证码的时候，之所以要使用 `Math.random()` 函数，是为了防止出现同一个验证码，导致服务端脚本处理出错。

- _checkcode.php_

{% highlight php %}
<?php
	
	require_once '../class/check_code.class.php' ;

	$checkcode = new CheckCode(4) ;

	$random_checkcode = $checkcode->get_checkcode() ;

	// 将验证码保存到 Session
	session_start() ;
	$_SESSION['checkcode'] = $random_checkcode ;

	$checkcode->draw_checkcode( $random_checkcode ) ;

?>
{% endhighlight %}
