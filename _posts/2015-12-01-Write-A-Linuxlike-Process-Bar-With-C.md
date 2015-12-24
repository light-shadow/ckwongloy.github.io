---
layout: post
title: 用 C 模仿一个 Linux 进度条
category: C
tags: [进度条, C]
latest: 2015年12月09日 16:01:25
---

最早是在 Linux 中对 Shell 解释器中命名执行的进度条实现原理感兴趣，这几天阅读了几个简单实现的 C 源码，发现有趣的同时也学到一些东西。

本着从简单到复杂的原则，首先来看一下一个用 C 实现的最简单的动态进度条效果以说明动态产生的原理：

{% highlight c %}
#include <stdio.h>
#ifdef _WIN32
#include <windows.h>
#define delay(n) Sleep(n*1000)
#else
#include <unistd.h>
#define delay(n) sleep(n)
#endif
void process_bar() {
    int i ;
    for( i=0; i<50; ++i ) {
        printf( ">" ) ;
        delay( 1 ) ;    // 延时一秒钟
    }
}
int main(){
    process_bar() ;
    return 0 ;
}
{% endhighlight %}

编译，运行可以看到控制台每隔一秒钟输出了一个 `>` 符号。

这里仅仅用到了一个用宏定义的延时函数 `delay()`，单位统一成秒，就能实现一个基本的进度条。

虽然上面的程序功能简单，但是却揭示了动态效果的基本实现原理之一就是通过延时来做动态效果。

当然，配合延时，结合其他是标准库函数，可以做出更精彩的动态效果。

##### 说明：程序文件开始是一段条件编译，作用是使兼容 Windows 和 UNIX 平台。

实现一个稍微复杂些的 Linux 风格进度条
-

基本的思路有了，如果需要带上百分比，程序应该继续这样写：

{% highlight c %}
#include <stdio.h>
#ifdef _WIN32
#include <windows.h>
#define delay(n) Sleep(n*1000)
#else
#include <unistd.h>
#define delay(n) sleep(n)
#endif
void backspace( int n ) {
    int i ;
    for( i=0; i<n; ++i ) {
        printf( "\b" ) ;
    }
}
void print_process( int n ) {
    int i ;
    static unsigned int minutes = 1, seconds=59 ;
    if( 0 == seconds ) {
        minutes-- ;
        seconds = 60 ;
    }
    if( 100 == n ) {
        minutes = 0 ;
        seconds = 0 ;
    }
    float net_speed = 10.24 + (float)n*1.3579 ;
    printf( "(1/3): /x86_64/updateinfo %d%% [", n ) ;
    for( i=0; i<n; ++i ) {
        if( i%2 ) {
            continue ;
        }
        printf( "=" ) ;
    }
    printf( "] %.2f kB/s | 10.24MB %02d:%02d ETA", net_speed, minutes, seconds-- ) ;
    fflush( stdout ) ;
}
void process_bar( int n ) {
    print_process( n ) ;
    /**
     * 最终要实现 `=` 符号叠加, 百分比动态出现和清除(刷新)的效果
     * 这里的退格数需要根据 `print_process()` 中所有 `printf()` 需要的显示字符数来决定
     * 10 > n 代表的是一位数; else (n>=10) 代表的是二位数
     * 由于这两种百分比的情况需要退格的数不一样: 二位数需要比一位数多退格 1 次
     * 可以通过在末尾输出换行来调试需要退格的个数
     */
    if( 10>n ) {
        backspace( n + 62 ) ;
    } else if( 100==n ) {
        printf( "\n\n更新完成!\n" ) ;
    } else {
        backspace( n + 63 ) ;
    }
}
int main() {
    int i ;
    printf( "\n正在更新...\n\n" ) ;
    fflush( stdout ) ;
    for( i=0; i<101; ++i ) {
        process_bar( i ) ;
        delay( 1 ) ;
    }
    return 0 ;
}
{% endhighlight %}

这时出现的效果就跟 Linux 中经常出现的效果很相似了，如图所示：

![write-a-linuxlike-process-bar-with-c](http://localhost.lamchuanjiang.org/inset/c/write-a-linuxlike-process-bar-with-c.png)

进度条原理和算法分析
-

首先，实现进度条的基本出发点仍然是延时，但是，进度条的花样则需要其他的思路。

### 动画和视频

想必大家都知道，动画和视频之所以能体现动态效果，其实最基本的变量还是时间参数。当连续性的静态图片/帧，按照时间顺序依次切换，就是动态的原理。

那么对待进度条也一样，可以设法准备好连续性的输出数据，然后沿着时间顺序依次播放，如果在同一位置，在播放下一帧的时候移除上一帧，就能够出现动态效果。上面的例子中，将进度条的每一帧打印出来，就能明白不少：

![frames-of-process-bar](http://localhost.lamchuanjiang.org/inset/c/frames-of-process-bar.png)

图片没有截完，但是规律已经看出来了。

站在程序的角度，它其实并不知道自己计算的输出结果会被怎样处理，程序只会按部就班计算输入，我们只是利用了这些计算数据，通过障眼法来欺骗人眼说，你看到的是动态的。但实际，每一时刻的状态只有一种，即都是静态的。

#### 进度条是如何产生的？

上面讲了这么多，现在就回到如何用 C 方法去完成上面的任务。

首先，需要产生数据，函数 `print_process()` 完成了这一任务，`print_process()` 接受传来的个数，然后按照事先定制的输出格式，将计算结果打印在屏幕上，函数体内具体打印了什么，这个是人决定的，你想要进度条长什么样，输出什么内容写给 `printf()` 就好了，对于 `print_process()` 而言它只干产生数据帧这么一件事。

然后，由于进度条必须在同一位置变化，所以上一次打印的结果必须被清理掉用于这一次的数据打印，即是说不能让用户看到历史的打印结果，用户每个时刻看到的，都是 `print_process()` 最新的计算结果，所以需要一个清理后事的角色，`backspace()` 就干这么一件事，它接受要"干掉"的对象个数，然后再循环中依次将他们清理掉，准备给下一批打印数据使用。

所谓清理，就是用退格去依次删除打印在控制台中的字符，并不是什么太高深的奇淫技巧。

最后，有了数据，也有了能清理历史数据的方法，下面就可以跟着节奏依次进行 **打印 -> 清空 -> 打印 -> 清空 -> ...** 这个循环，节奏的快慢由函数 `delay()` 决定。

可见，只要每次打印的内容不一样但是却有规律，每次的清空又干净利落，那么一个进度条就可以通过这样的过程展现在人眼当中。

这就是本例当中进度条的实习原理和步骤，说的主要还是思路，关键代码的解释详见注释。

当然了，进度条的实现思路肯定不止这一种，但是基本原理都是大致一样的。

说明
-

- 关于 fflush() 函数中的参数

为了避免缓冲区数据对后面输出的干扰, 每次执行 `printf()` 后最好是使用 `fflush()` 清空缓冲区，以免出现不希望出现的情况, 比如: 缓冲区溢出。

`stdout` 是标准输出流，关于流的概念，以及 `stdout`、`stdin`、`stderr` 的更多解释查看可以翻阅 _The C Programming Language_ 一书。

- 关于实际进度条程序中变量的改变原因

一个真正实际应用的进度条，其变量值的改变肯定不会是像上面单纯地自增，而是根据要展示的实际内容，有什么影响因素去决定的。用下载进度条来说明，下载的时候完成了多少进度的影响因素主要有网络的快慢，文件的大小这两个因素，因此，对于进度条实际长度的控制将由这两个相关因素来决定，这样才能正确地反映进度，也是使用进度条的理由。

待改进
-

- 波动效果

已完成的部分用 `=` 表示，当前正在执行的部分用 `_` 表示。

附录：可接受服务器回送数据的客户端进度条
-

{% highlight html %}
<style>
    #area {
        background-color:silver;
        width:502px;
        height:20px;
    }
    #process_bar {
        margin:5px 0 5px 0;
        width:500px;
        border:1px solid navy;
    }
    #percent {
        display:inline-block;
        text-align:center;
        height:20px;
        background:yellow;
    }
    #is_finished {
        width:502px;
        height:20px;
        background:silver;
    }
</style>

<div id="area">
    <div id="status">正在更新...</div>
    <div id="process_bar">
        <span id="percent">请稍后...</span>
    </div>
    <div id="is_finished"></div>
</div>

<script>
    var i = 0 ;
    var id = setInterval( print_process , 100 ) ;
    function print_process() {
            if( 100 === i ) {
                $( "is_finished" ).innerHTML = "更新完成!" ;
                clearInterval( id ) ;
            } else if( i>100 || i<0 ) {
                return ;
            }
            $( "percent" ).innerHTML = i + "%" ;
            $( "percent" ).style.width = (5*i++) + "px" ;
    }
    function $( id ) {
        return document.getElementById( id ) ;
    }
    // 写一个函数用于接收从服务器端传回的值用来改变客户端的 i 而非像在 `print_process()` 函数里面那样通过自增来模拟
    // 从而体现进度条真正的作用
    // function current_process() {
    //  do something more here...
    // }
</script>
{% endhighlight %}

参考
-

- _The C Programming Language: 第八章 UNIX 系统接口_
