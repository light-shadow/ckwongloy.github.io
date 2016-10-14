---
layout: post
title: 《自学数据结构》听课笔记
category: Algorithm
tags: [数据结构, 算法, 编程]
latest: 2015-08-02 22:12:29
---

#### 0
> [自学数据结构]视频下载地址: http://www.52pojie.cn/thread-130075-1-1.html

本课程最低要求: 数据结构和算法的基本概念/手写链表操作/具备继续自学数据结构的能力。

1. 数据结构程序篇教材推荐：高一凡 —— 数据结构、操作系统、编译原理；

2. 数据结构是软件中最核心的课程；

3. “程序 = 数据的存储 + 数据的操作 + 可以被计算机执行的语言”—— 郝斌

4. 指针（“C语言的灵魂”）复习：

5.  基本概念建立：

6.  int * p； ----  p是指针变量。int *表示p只能存放int类型变量的地址

7. 要通过被调函数修改主调函数的值，必须将主调函数实参的地址通过形参发送到被调函数中。

8. 结构体定义某个变量的时候，可以有两种表达方式，pst->sid或者是(*pst).sid,这两者是等价的，规定如此。若结构体定义了一个变量名为st，则他们又可以表示为st.sid。

9. 所有指针变量只占4个字节，用第一个字节的地址表示整个变量的地址。

10. 链表中定义的结构体类型的指针变量本身没有指针域，拥有指针域的只是结构体结点。

11. Java内部有指针，外部只表现为调用。
12. 张利国 -- JAVA 

13. 图的节点定义十分复杂。

13. 有些知识开始学习的时候根本不知道为什么，但随着学习时间的增加，有些知识就会自然而然领会了。

#### 基本概念

1. 程序设计 = 算法 + 数据结构（Niklaus Wirth）

2. 程序设计可以解决：
①数值计算问题：通过数学分析、建模 -- 从实际问题中抽象出来的可以解决一般问题的数学模型，利用公式、方程。不是计算机程序设计的重心。
②非数值计算问题：通过数据结构。是计算机程序设计的核心。

3. 数据结构的讨论范畴：
专为解决非数值计算程序设计问题所涉及的现实世界实体对象的描述，信息的组织方式及其相应操作的实现。

4. 数据
一个与时俱进的概念，其基本定义为：所有能被计算机识别和处理的数值、字符等符号的集合。是计算机程序加工的原料和对象，是对客观世界信息的一种描述，而且只是信息的一种特定的符号表示形式。数据的基本单位称为：数据元素，既可以是不可分割的原子项，也可以是由若干数据项构成的组合项。在计算机中通常作为一个整体进行考虑和处理。

5. 数据结构：
具有相同特性的带结构的数据元素的集合。结构指的是数据远足之间存在的一种或者多种特定关系，分为逻辑结构和物理结构。前者是对数据元素之间存在的逻辑关系的一种抽象描述，它可以用一个数据元素的集合和定义在此集合上的若干关系来表示，后者的则为其逻辑结构在计算机中的表示或实现，故又称为逻存储结构。

6. 分类：
逻辑结构按数学特性分：
①线性结构；
②树形结构；
③图状或网状结构；
④纯集合结构；
存储结构按关系的表示方法分：
①顺序存储结构：利用数据元素在存储器中相对位置之间的某种特定关系来表达数据元素之间的逻辑关系。
②链式存储结构：用附加的指针表示数据元素之间的逻辑关系。


#### 数据结构概述及预备知识

1. 为什么需要数据结构？
—— 因为计算机内存是线性一维的，而我们要处理的数据都是比较复杂的，那么怎么把这么多复杂的数据保存在计算机中来保存本身就是一个难题，而计算机在保存线性结构的时候比较好理解，尤其是数组和链表只不过是连续和离散的问题，线性结构是我们学习的重点，因为线性算法比较成熟，无论C++还是Java中都有相关的工具例如Arraylist.Linkedlist,但是在Java中没有树和图，因为非线性结构太复杂了，他的操作远远大于线性结构的操作。即使SUN公司也没造出来。

2. 什么是数据结构？
—— 数据在内存中的存储形式 -- 数据本身的存储和数据之间关系的存储。

3. 数据结构和算法有什么联系和区别？
—— 数据结构研究数据的存储，算法研究对存储在数据结构中的数据完成特定功能的一系列操作。两者单独存在没有意义。数据结构不一样，相应的算法也不一样。

4. 算法和泛型有什么关系？
—— 狭义算法，就是在特定数据结构上对特定的数据进行操作。而泛型是对所有数据结构上进行的同一种操作的算法。

5. 为什么需要算法？什么是算法？
—— 

6. 如何衡量算法？算法的时间复杂度为什么不能用执行时间来衡量？
—— 时间复杂度和空间复杂度、难易程度、健壮性。研究算法主要关心时空复杂度而实际开发多关心难易程度和健壮性。
—— 不同机器系统软硬件环境不一样，也在变化。

7. 数据结构有什么特点？
—— 抽象。不能立即做出一些东西。

8. 数据结构在软件领域站什么地位？
—— 计算机软件领域最核心地位。

9. 数据结构和数据库有什么联系与区别 ？
—— 抽象级别不一样。

10. 什么叫程序？
—— 数据的存储 + 数据的操作 + 可以被计算机执行的语言。

11. 要学习数据结构需要哪些预备知识？
—— 指针。

12. 数据结构最基础的东西是什么？
—— 链表。

13. 指针有多重要？—— C 语言的灵魂。

14. 什么是指针？ 
—— 指针的本质就是地址，即内存单元的编号，或者说是一个操作受限的非负整数（只能在某些情况下做减法）。从 0 到 2^32-1 的非负整数（0-FFFFFFFF），内存编号不能重复。

15. 什么是指针变量？指针变量有什么特点？
—— 指针变量就是存放内存单元地址的变量。举例说明：
① int *p ; -- 代表的就是定义了一个 int 型的指针变量 p，并且该指针变量只能存放 int 型变量的地址。
②p 指向 i 的正确写法:

``` c
int i = 1; 
int *p = &i ; // 这条语句也可以分两步写： int *p ; p = &i ；
```

③刚定义一个指针变量时，指针变量不指向任何变量。不能直接将变量的值赋给指针变量：
int i = 1 ;
int *p = i ;
④指针变量可以灵活指向不同的变量：

``` c
int i = 1 ;
int j = 2 ;
int *p ;
p = &i ;
printf( "%d\n", *p ) ;
p = &j ;
printf( "%d\n", *p ) ;
```

⑤指针变量没有指向任何变量之前不能直接对指针变量进行赋值。

``` c
int I = 1 ;
int *p ;
*p = I;    // 这样写是错的，因为定义了 p 之后 p 并没有指向任何变量，所以此时 p 是空指针。
//不能对空指针变量赋值。
```

⑥指针变量指向某个变量的意思就是，在内存中，指针变量所在的地址空间内存放的是那个变量的地址。
⑦所有的指针变量都占 4 个字节，无论指针变量指向的变量占几个字节。但都是用第一个字节的地址表示整个指针变量的地址。一个地址用一个 字节表示。

16. 指针和指针变量有什么区别？
—— 指针就是地址，指针变量是存放其他变量地址的变量。当然其本身也有地址。指针变量只能存放地址。

17. int *p 和 int* p 和 int * p 三种写法有什么区别？
—— 区别主要在于对 p 的定义上。int *p 是把 *p 这个整体当作变量名，int* p 是把 int* 这个整体当作变量类型， int * p 则是一种中庸写法。不把谁当作整体，根据需要决定。三种写法在功能上都是一样的。

18. 什么是内存回收？内存在什么时候会被回收？被回收的内存里面的数据还在吗？
—— 内存回收是指操作系统收回内存中某块地址空间的使用权限，其他程序要想使用内存必须请求操作系统分配。正常情况下，程序退出后操作系统会自动回收内存的使用权。内存回收只是内存的使用权限被操作系统收回，而里面的数据不一定都会清零，对其他下一个使用该内存的程序而言，该内存中的数据就是垃圾数据，这也是为什么在定义变量的时候需要对变量进行初始化，否则数据很有可能有误。

19. 什么是野指针？
—— 野指针指指向一个已删除的对象或未申请访问受限内存区域的指针。与空指针不同，野指针无法通过简单地判断是否为 NULL避免，而只能通过养成良好的编程习惯来尽力减少。对野指针进行操作很容易造成程序错误。

20. 什么叫内存分配？什么叫内存释放？
—— 内存释放、内存分配都由操作系统直接完成。不过可以由程序间接请求操作系统完成。已经被分配的内存空间不能再被其他程序使用直到操作系统回收然后重新分配。

21. 如何通过被调函数修改主调函数中普通变量的值？
①实参为相关变量的地址。包括指针变量，因为指针和指针变量本质就是内存地址。
②形参为以该变量的类型为类型的指针变量（地址）。
③在被调函数中通过 *形参变量名 的方式就可以修改主调函数的值。

22. 哪些语法成分前面不能加取地址符号？
—— 常量和表达式。

23. 指针数组和数组指针有什么区别？
—— 指针数组中的每一个元素均为指针，即有诸形如“*ptr_array[i]”的指针。指针数组中的元素亦可以表示为“*(*（ptr_array+i))”。又因为“()”的优先级较“*”高，且“*”是右结合的，因此可以写作**（ptr_array+i）。由于数组元素均为指针，因此ptr_array[i]是指第i+1个元素的指针。例如： char *str[4];
由于[ ] 比*优先权高，所以首先是数组形式str[4 ]，然后才是与“*” 的结合。这样一来指针数组包含4个指针str[ 0 ]、str[ 1 ]、str[ 2 ]、str[ 3 ]，各自指向字符类型的变量。
—— 数组指针是指向数组首元素的地址的指针，其本质为指针（这个指针存放的是数组首地址的地址，相当于2级指针，这个指针不可移动）；　指针数组是数组元素为指针的数组，其本质为数组。
例如：*p[2]是指针数组，实质是一个数组，里面的两个元素都是指针 []的优先级比*的优先级高，p先与[]结合,形成数组p[2],有两个元素的数组，再与*结合，表示此数组是指针类型的，每个数组元素相当于一个指针变量


24. 数组有哪些特点？数组和指针有哪些联系？
①数组名：一维数组名相当于一个指针常量，存放的是一维数组第一个元素的地址，即指向数组第一个元素。
②
int a[5] = {1, 2, 3, 4, 5} ;
a[2] = *(2+a) ;
③当某个指针变量指向某个变量时，*p == 某个变量。
④a[i]==*(a+i)。p+I <==> p+i*(变量所占的字节数)。于是指针就可以自动指向下一个地址。

25. 什么是大人国算法？什么是小人国算法？
—— 

26. %p 表示的是以多少进制输出？
—— 十六进制。

27. 如何修改指针变量的值？
—— 多级指针。举例说明：

``` c
# include <stdio.h>

void change_pointer( int **q ){
    *q = ( int * )0xFFFFFFFF ;
}

int main( void ){
    int i = 1 ;
    int *p ;
    p = &i ;
    printf( "%p\n", p ) ;
    change_pointer( &p ) ;
    printf( "%p\n", p ) ;
    return 0 ;
}
```

28. 为什么会出现结构体？结构体与类有什么区别？
—— 类似于 C++/Java 的类。将某个实体的属性值封装在一起。不过结构体中没有方法。不过本质上来说，C 和 C++/Java相比，很多时候都是在用不同的思想来解决同一个问题。可以认为结构体是类的过渡。

29. 什么是结构体？如何引用结构体内的变量？
—— 自定义的数据类型（同类）。
①结构体名.属性名。用于通过普通结构体变量名引用结构体属性时（不常用）。举例说明：

``` c
# include <stdio.h>
# include <string.h>

struct student{
    int id ;
    char name[ 200 ] ;
    int age ;
};

int main( void ){
    struct student st = { 110, "li", 20 } ;
    printf( "%d %s %d\n", st.id, st.name, st.age ) ;
    strcpy( st.name, "Chuanjiang Li" ) ;
    printf( "%s", st.name ) ;
    return 0 ;
}
```

②结构体名 -> 属性名。用于当使用指针变量引用结构体属性时（常用）。pst -> sname == *( pst ).name ==  st.name; 这种引用方式比上一种好，因为通过指针变量引用所占用的内存空间很小，尤其是在对复杂结构体成员的引用时。也比较省时间。

``` c
struct student * pst = &st;
pst -> id;
```

30. 结构体有哪些特点？
①普通结构体变量和指针变量对结构体成员的引用方式不同。
②不能算术运算，但可以相互赋值。

31. 为什么需要使用动态分配内存？C 语言如何实现动态内存分配？为什么 malloc() 函数前面需要强制转换？
—— 可以使内存分配更方便灵活。分配结束后需要使用 free( pointer ) 函数手动将内存释放，如果不手动释放，就算函数执行结束后，原先分配的内存依然不会被回收知道程序完全终止。指针变量可以当作一个数组来用，指针变量名就相当于数组名。举例说明：

``` c
# include <stdio.h>

int main( void ){
    int i ;
    int length ;
    printf( "length = " ) ;
    scanf( "%d", &length ) ;
    int * p = ( int * )malloc( sizeof( int ) * length ) ;
    for( i=0; i<length; i++ ){
        scanf( "%d", &p[ i ] ) ;
    }
    for( i=0; i<length; i++ ){
        printf( "\n%d\t", p[ i ] ) ;
    }
    free( p ) ;
    return 0 ;
}
```

—— 因为无论变量类型是 int / double ，malloc() 函数只返回第一个字节的地址。而只有第一个字节的地址是无法区分该变量究竟是 int 类型还是 double 类型（故又称为干地址）。所以就需要强制转换，以便让编译器区分第一个字节的地址存放的变量类型到底是什么。

32. scanf() 函数的注意事项？
—— 需要把变量的地址当作实参。scanf( "%d", &i ) ;

33. 跨函数使用内存的注意事项有哪些？
①局部变量调用使用完毕后，其占有的内存将会被释放。局部变量每次调用时分配的空间都是有操作系统决定的。全局变量除外。
②可以通过指针把变量的地址当作参数传递给某个函数才行。举例说明：

``` c
# include <stdio.h>

int fun( int ** q ){
    int i = 1 ;
    *q = &i ;
    return *q ;
}

int main( void ){
    int * p ;
    fun( &p ) ;
    printf( "%d", *p ) ;
    return 0 ;
}
```

③可以通过动态内存分配来实现。因为通过 malloc() 函数动态分配的内存即使在函数调用结束后仍然不会释放。

34. 返回值什么时候需要什么时候不需要？
—— 根据实际需求。

35. 数据结构有哪些分类？
①线性存储：除了第一个节点只有一个后节点和最后一个节点只有一个前节点外，其余节点都有且只有一个前节点和后节点。线性存储包括了连续存储 -- 数组，和离散存储 -- 链表。线性结构最常见的应用有栈和队列。
②非线性存储：非线性存储包括了树和图。

36. 为什么需要数组？什么叫数组？
—— 数组是一种最基本的数据结构，也即线性表。类型相同大小相等的元素线性结集合。

37. 学完数据结构对理解面向过程的函数有帮助吗？
—— “有” --  郝斌。

38. malloc() 函数分配失败的情况有哪些？分配失败时会怎样处理？
—— 内存不足。返回 NULL。由此可以得出当使用 malloc)_ 函数分配内存后，马上需要判断是否分配成功，如果分配失败则退出 exit( -1 ) 。

39. 如果函数名前面已经有 void 禁止返回值的时候还需要在函数末尾写 return 吗？
—— 最好是写上，这样可以明确地表达出此函数到此结束。但只需要写 return ; 就行了。

40. C 语言相对于 Java 有哪些优势？
—— C 语言的优势是直接面对问题，以算法为核心。Java 则是间接解决问题。

41. 如何用 C 语言实现对数组的各种操作？
—— 在设计函数的时候，为了尽可能保证程序的健壮性，应该需要设置违法操作检测，检测通过再执行函数的核心代码。构建一个数组只需要使用一个指针变量代表数组，然后用 malloc() 函数为数组分配大小即可。
代码如下：

``` c
/* ************************************************************
*
* 本程序的功能是实现对 int 型数组（或叫线性表）的一些基本算法 *
*
* 还需完善的功能：
*
* 1. get_length_by_array_name()
*
* 2. 交互灵活性
*
* By @ckwongloy, on Code::Blocks 13.12
*
* 最新修改时间：2015-06-26 14:46:04
*
************************************************************* */
# include <stdio.h>
# include <stdlib.h>
# include <malloc.h>
# include <math.h>
# include <stdbool.h>
# include <windows.h>

#define MAX_INT ( int )( pow( 2, 32 ) - 1 )

struct array{
    int * base ;    // 数组首地址,相当于数组名，用于引用整个数组  //
    int max_len ;    // 数组所能容纳的最大长度 //
    int length ;   // 数组有效个数 //
};

int get_length_by_array_name( int * arr_name ) ;
void init_array( struct array * arr_name ) ;
void show_array( struct array * arr_name ) ;
void sort_array( struct array * arr_name ) ;
bool is_array_empty( struct array * arr_name ) ;
bool is_array_full( struct array * arr_name ) ;
int is_array_overflow( struct array * arr_name ) ;
bool append_array( struct array * arr_name ) ;
bool insert_array( struct array * arr_name ) ;
bool delete_array( struct array * arr_name ) ;
int get_array_value( struct array * arr_name ) ;
void invert_array( struct array * arr_name ) ;
void alter_array( struct array * arr_name ) ;

int main( void ){
    system( "color fc" ) ;
    printf( "\n\t*** 本程序的功能是实现对 int 型数组（或叫线性表）的一些基本算法 ***\n"
            "\n\n\t\t\t( 请先按照提示初始化数组 )\n\n" ) ;
    struct array arr ;
    init_array( &arr ) ;
    int i ;
    printf( "\n\t\t\t*** 功能列表 ***\n\n"
            "\t\t\t1. 查看数组元素；\n"
            "\t\t\t2. 对数组元素排序；\n"
            "\t\t\t3. 添加数组元素；\n"
            "\t\t\t4. 插入数组元素；\n"
            "\t\t\t5. 查找数组元素；\n"
            "\t\t\t6. 倒置数组元素；\n"
            "\t\t\t7. 删除数组元素；\n"
            "\t\t\t8. 修改数组元素；\n"
            "\n请选择功能：" ) ;
    scanf( "%d", &i ) ;
    switch( i ){
        case  1 : show_array( &arr ) ; break ;
        case  2 : sort_array( &arr ) ; break ;
        case  3 : append_array( &arr ) ; break ;
        case  4 : insert_array( &arr ) ; break ;
        case  5 : get_array_value( &arr ) ; break ;
        case  6 : invert_array( &arr ) ; break ;
        case  7 : delete_array( &arr ) ; break ;
        case  8 : alter_array( &arr ) ; break ;
        default : break ;
    }
    return 0 ;
}


int get_length_by_array_name( int * arr_name ){
    /*
    int count ;
    int length_old = MAX_INT ;
    //char str[MAX_INT] ;
    //char * p = &str[MAX_INT] ;
    for( count=1; count<=length_old; count++ ){
        if( NULL == arr_name[count-1] ){ break ; }
    }
    int length_new = count - 2 ;    // 为什么 count - 2 就是 length 待研究，我猜是在数组末尾有非空值吗（Winodws 的 \r\n ？）？这里我是通过打印输出试出来的，知道情况的如果能告诉我我将不胜感激。（@amChuanJiang, 2015-06-25 21:08:59） //
    return length_new ;
    */
}


void init_array( struct array * arr_name ){
    struct array * p = arr_name ;
    p->base = ( int * )malloc( sizeof( int ) * p->length ) ;
    if( NULL == p->base ){
        printf( "\n内存分配失败！程序终止！\n" ) ;
        exit(-1) ;
    }
    printf( "请输入允许数组的最大长度：" ) ;
    scanf( "%d", &( p->max_len ) ) ;
    while( 2 == is_array_overflow( p ) ){
        printf( "\n数组长度越界！请重新输入！\n\n允许数组的最大长度=" ) ;
        scanf( "%d", &( p->max_len ) ) ;
    }
    printf( "\n请输入数组的初始长度：" ) ;
    scanf( "%d", &( p->length ) ) ;
    while( 1 == is_array_overflow( p ) ){
        printf( "\n数组长度越界！请重新输入！\n\n数组初始长度=" ) ;
        scanf( "%d", &( p->length ) ) ;
    }
    while( p->length > p->max_len ){
        printf( "\n初始长度不能超过数组最大长度！请重新输入！\n\n" ) ;
        printf( "请输入允许数组的最大长度：" ) ;
        scanf( "%d", &( p->max_len ) ) ;
        while( 2 == is_array_overflow( p ) ){
            printf( "\n数组长度越界！请重新输入！\n\n允许数组的最大长度=" ) ;
            scanf( "%d", &( p->max_len ) ) ;
        }
        printf( "\n请输入数组的初始长度：" ) ;
        scanf( "%d", &( p->length ) ) ;
        while( 1 == is_array_overflow( p ) ){
            printf( "\n数组长度越界！请重新输入！\n\n请输入数组初始长度：" ) ;
            scanf( "%d", &( p->length ) ) ;
        }
    }
    int i ;
    if( !is_array_empty( p ) ){
        printf( "\n请输入数组初始值:\n\n" ) ;
        for( i=0; i<p->length; i++ ){
            printf( "array[%d]=", i ) ;
            scanf( "%d", &( p->base[i] ) ) ;
        }
        printf( "\n数组初始化完成！您初始化了一个最大长度为 %d, 目前长度长为 %d 的数组！\n", p->max_len, p->length ) ;
    }else{
        printf( "\n数组初始化完成！您初始化了一个最大长度为 %d 的空数组！\n", p->max_len ) ;
     }
    return ;
}

void show_array( struct array * arr_name ){
    int i ;
    if( !is_array_empty( arr_name ) ){
        printf( "\n当前数组总长度为 %d , 数组中元素的实际个数为 %d, 数组中的值依次是：\n\n", arr_name->max_len, arr_name->length ) ;
        for( i=0; i<arr_name->length; i++ ){
            printf( "array[%d] = %d\n", i, arr_name->base[i] ) ;
        }
        printf( "\n" ) ;
    }else{
        printf( "\n数组为空！\n" ) ;
     }
    return ;
}

void sort_array( struct array * arr_name ){
    if( is_array_empty( arr_name ) ){
        printf( "\n数组为空！排序失败！\n" ) ;
        return ;
    }
    int *p = arr_name->base ;
	int len = arr_name->length ;
	int temp = 0 ;
	int i, j ;
    bool flag = false ;
    for( i=0 ; i<len-1 ; i++ ){
        for( j=0; j<len-1-i; j++ ){
            if( p[j] > p[j+1] ){
                temp = p[j] ;
                p[j] = p[j+1] ;
                p[j+1] = temp ;
                flag = true ;
            }
        }
    if( !flag ){
        break ;
        }
    flag = false ;
    }
    printf( "\n排序完成！\n" ) ;
    return ;
}

bool is_array_empty( struct array * arr_name ){
    if( 0 == arr_name->length ){
        return true ;
    }else{
        return false ;
    }
}
bool is_array_full( struct array * arr_name ){
    if( arr_name->max_len == arr_name->length ){
        printf( "已达数组容量上限！操作失败！\n" ) ;
        return true ;
    }else{
        return false ;
     }
}

int is_array_overflow( struct array * arr_name ){
    if( MAX_INT  < arr_name->max_len || 0 > arr_name->max_len ){
        return 2 ;
    }else if( MAX_INT  < arr_name->length || 0 > arr_name->length ){
        return 1 ;
     }else{
         return 0 ;
      }
}

bool append_array( struct array * arr_name ){
    int add ;
    printf( "请输入你要添加的元素个数：" ) ;
    scanf( "%d", &add ) ;
    if( 0 >= add ){
        printf( "不会添加任何元素！\n" ) ;
        return false ;
    }
    while( arr_name->max_len < arr_name->length + add ){
        printf( "\n长度非法！请重新输入\n" ) ;
        printf( "\n请输入你要添加的元素个数：" ) ;
        scanf( "%d", &add ) ;
    }
    int i ;
    for( i=0; i<add; i++ ){
        printf( "请输入要添加的第 %d 个元素:", i+1 ) ;
        scanf( "%d", &(arr_name->base[arr_name->length+i]) ) ;
        printf( "元素 %d 已添加到数组！下标是：%d\n\n", arr_name->base[arr_name->length+i], arr_name->length+i ) ;
    }
    arr_name->length = arr_name->length + add ;
    printf( "\n%d 个元素已成功添加到数组！\n", add ) ;
    return true ;
}

bool insert_array( struct array * arr_name ){
    if( is_array_empty( arr_name ) ){
        printf( "\n数组为空！插入失败！\n" ) ;
        return false ;
    }
    int num, pos, val, j ;
    printf( "请输入要插入的元素个数:" ) ;
    scanf( "%d", &num ) ;
    if( 0 == num ){
        printf( "不会插入任何元素！\n" ) ;
        return false ;
    }
    while( arr_name->max_len < arr_name->length + num || (0 == num) ){
        printf( "\n个数非法！请重新输入！\n" ) ;
        printf( "\n请输入要插入的元素个数：" ) ;
        scanf( "%d", &num ) ;
    }
    for( j=1; j<=num; j++ ){
        printf( "请输入将要插入的第 %d 个元素的值：", j ) ;
        scanf( "%d", &val ) ;
        while( MAX_INT < val || 0 > val ){
            printf( "\n插入元素非法！请重新输入！\n" ) ;
            printf( "请输入将要插入的第 %d 个元素的值：", j ) ;
            scanf( "%d", &val ) ;
        }
        printf( "请输入要将元素 %d 插入到数组中的有效位置：", j ) ;
        scanf( "%d", &pos ) ;
        while( arr_name->length < pos || 0 > pos){
            printf( "\n位置非法！请重新输入！\n" ) ;
            printf( "\n请输入第 %d 个元素插入到数组中的有效位置：", j ) ;
            scanf( "%d", &pos ) ;
        }
        int i ;
        for( i=0; i<arr_name->length+1-pos; i++){
            arr_name->base[arr_name->length-i] = arr_name->base[arr_name->length-i-1] ;
        }
        arr_name->base[pos] = val ;
        arr_name->length ++ ;
        printf( "\n第 %d 个元素 %d 已插入到第 %d 位置！\n", j, val, pos ) ;
    }
    printf( "\n所有元素已插入成功！\n" ) ;
    return true ;
}

bool delete_array( struct array * arr_name ){
    if( is_array_empty( arr_name ) ){
        printf( "\n数组为空！删除失败！\n" ) ;
        return false ;
    }
    int j ;
    printf( "\n请输入要删除的个数：" ) ;
    scanf( "%d", &j ) ;
    if( 0 == j ){
      printf( "\n不会删除任何元素！\n" ) ;
      return false ;
    }
    while( 0>j || arr_name->length<j ){
        printf( "\n位置非法！请重新输入！\n" ) ;
        printf( "\n请输入要删除的个数：" ) ;
        scanf( "%d", &j ) ;
    }
    int t, pos, i, val ;
    for( t=1; t<=j; t++ ){
        printf( "\n请输入要删除的第 %d 个元素的位置：", t ) ;
        scanf( "%d", &pos ) ;
        while( 0 > pos || arr_name->length < pos ){
            printf( "\n位置非法！请重新输入！\n" ) ;
            printf( "\n请输入要删除的第 %d 个元素的位置：", t ) ;
            scanf( "%d", &pos ) ;
        }
        val = arr_name->base[pos-1] ;
        for( i=0; i<( arr_name->length-pos ); i++ ){
            arr_name->base[pos+i-1] = arr_name->base[pos+i] ;
        }
        arr_name->length -- ;
        printf( "\n第 %d 个，位于原数组中第 %d 号，值为 %d 的元素已经删除！\n", t, pos, val ) ;
        show_array( arr_name ) ;
    }
    printf( "\n所选位置的元素已全部删除！\n" ) ;
    return true ;
}

int get_array_value( struct array * arr_name ){
    if( is_array_empty( arr_name ) ){
        printf( "\n数组为空！修改失败！\n" ) ;
        return -1 ;
    }
    int val ;
    printf( "\n请输入想要查找的元素：" ) ;
    scanf( "%d", &val ) ;
    int i ;
    int num = 0 ;
    for( i=0; i<arr_name->length; i++ ){
        if( val == arr_name->base[i] ){
            num ++ ;
        }
    }
    if( 0 == num ){
        printf( "\n失败！数组中没有 %d 这个元素！\n", val ) ;
        return -1 ;
    }else if( 1 == num ){
            printf( "\n成功！元素 %d 在数组中的下标是 %d ！\n", val, i ) ;
            return i ;
     }else{
        printf( "\n成功！数组中一共有 %d 个值为 %d 的元素！分别位于以下下标：\n\n", num, val ) ;
        for( i=0; i<arr_name->length; i++ ){
            if( val == arr_name->base[i] ){
                printf( "\t %d", i ) ;
            }
        }
        printf( "\n" ) ;
        return num ;
      }
}

void invert_array( struct array * arr_name ){
    int * p = arr_name->base ;
    int len = arr_name->length ;
    int temp, i ;
    if( 1 == (len % 2) ){
        for( i=0; i<((len-1)/2); i++ ){
            temp = p[i] ;
            p[i] = p[len-1-i] ;
            p[len-1-i] = temp ;
        }
    }else if( 0 == (len % 2) ){
        for( i=0; i<(len/2); i++ ){
            temp = p[i] ;
            p[i] = p[len-1-i] ;
            p[len-1-i] = temp ;
        }
    }
    printf( "\n转置完成！\n" ) ;
    return ;
}

void alter_array( struct array * arr_name ){
    if( is_array_empty( arr_name ) ){
        printf( "\n数组为空！修改失败！\n" ) ;
        return ;
    }
    int num, pos, val_new, val_old = 0, i ;
    printf( "\n请输入要修改的个数：" ) ;
    scanf( "%d", &num ) ;
    if( 0 == num ){
        printf( "不会修改任何值！\n" ) ;
        return ;
    }
    while( arr_name->length<num || 0>num ){
        printf( "\n个数非法！请重新输入！\n" ) ;
        printf( "\n请输入要修改的个数：" ) ;
        scanf( "%d", &num ) ;
    }
    for( i=0; i<num; i++ ){
        printf( "\n请输入要修改的第 %d 个元素在数组中的位置：", i+1 ) ;
        scanf( "%d", &pos ) ;
        while( arr_name->length<pos || 0>pos ){
            printf( "\n位置非法！请重新输入！\n" ) ;
            scanf( "%d", &pos ) ;
        }
        val_old = arr_name->base[pos-1] ;
        printf( "\n要将 %d 号元素 %d 修改为：", pos, val_old ) ;
        scanf( "%d", &val_new ) ;
        while( MAX_INT < val_new ){
            printf( "\n元素值非法！请重新输入！\n" ) ;
            printf( "\n要将 %d 号元素 %d 修改为：", pos, val_old ) ;
            scanf( "%d", &val_new ) ;
        }
        arr_name->base[pos-1] = val_new ;
        printf( "已将原数组中的第 %d 号，值为 %d 的元素修改为 %d \n", pos, val_old, val_new ) ;
    }
    printf( "\n所有所选元素值都已更新！\n" ) ;
    return ;
}
```

42. 如何通过数组名确定一个数组的长度？
—— 通过测试，以下代码可以准确确定出，但为什么这样可以，待研究。
假设某个函数中的数组 array[] 已经确定，之后要定义 array[length+1] =NULL ; 这样是因为方便给下面的代码一个合理的终止符。

``` c
int count ;
int length = pow( 2, 31 ) - 1 ;
for( count=1; count<=length; count++ ){
    if( !array_name[count-1] ){ break ; }
}
length = count - 2 ;
// 为什么 count - 2 就是 length 待研究，我猜是 Windows 系统的字符后面有 \r\n 两个非空值在数组末尾吗？这里我是通过打印输出试出来的 （2015-06-25 21:08:59） //
```

·如果上述代码在某些平台失效，则可以通过测试重新找到因子。
—— 通过 sizeof() 函数是不能确定数组长度的，因为 sizeof() 函数只能取得某种数据类型的类型大小。这样的结果始终会是 1 。

``` c
int length = ( sizeof( array_name ) / sizeof( array_name[0] ) ) ;
```

#### 链表

1. 为什么需要链表？什么是链表？
—— 链表在存储线性关系的数据的时候比数组更灵活。n 个节点离散分配；彼此通过指针相连；每个节点有且只有一个前驱和后继节点，首节点没有前驱，尾节点没有后继。　
·头指针：指向头节点的指针变量，里面存放的是头节点的地址。头指针没有指针域和数据域的说法。
·尾指针：指向尾节点的指针变量。
·头节点：首节点之前加了一个节点，里面既没有存放有效数据，也没有存放节点的个数。头节点可以方便对链表的操作。头节点的数据类型和链表中其他节点的数据类型是一样的。
·首节点：第一个存放有效数据的节点。
·尾节点：最后一个存放有效数据的节点。尾节点的指针域为空（NULL）。

2. 链表有什么特点和优点？
—— 没有空间限制，插入删除元素很快。存取速度慢。

3. 数组有什么优缺点？
—— 存取速度快。但要事先知道数组的长度。插入删除慢，空间通常有限制，需要大块连续内存块。

4. 确定一个链表需要几个参数？
—— 只需要头指针。所以如果需要通过函数来对链表进行操作只需要把链表的头指针传过去就可以了。

5. C 语言如何定义一个链表？
—— 链表节点定义：

``` c
typedef struct node{
    int data ;
    struct node * next ;
} list_node;
```

6. 链表有哪些分类？
—— 单链表、双链表 -- 每个节点有两个指针域分别指向前后节点、循环链表 -- 能通过任何一个节点找到其他节点因为尾节点中的指针指向首节点，和非循环链表。

7. 与链表相关的算法有哪些？
①插入：链表节点 A/B/C，A 指向 B ，把 C 插入 A 和 B 之间 -- C 指向 B, A 指向 C 。
②清空：
③删除：链表节点 A/B/C, A 指向 B , B 指向 C ，删除 B  -- 定义一个临时指针变量 p_temp， A 指向 C ， free(  p_temp ) 。 

8. 为什么数据结构比较难学？
—— 其他高级语言都把底层的东西屏蔽掉了。

9. 用 C 实现链表必须注意哪些东西？
①区分链表节点（如：头节点）和指针变量（如：头指针）的概念区别 -- 链表本身其实是由若干个节点串联起来的，而定义一个指针变量（如：头指针）的目的仅仅是为了方便对链表节点进行各种操作。 
②通过 malloc() 函数分配过内存的才是节点，而只是定义了一个结构体变量并不能算一个真正的链表节点。在函数内部，没有通过 malloc() 函数分配的变量都是局部变量（变量本质就是内存），当函数调用完毕后这些变量使用的内存空间都将被回收。所以，但凡涉及节点的创建，如 create_list() 、append_list() 、insert_list() 等函数，都需要使用到 malloc() 函数。否则一个链表节点是不能真正地被创建起来的。
③如果有多个指针变量同时指向内存中的某个地址，那么要想修改该内存地址中存放的数据， 使用哪个指针变量造成的效果都是一样的，或者说，一个指针对内存中数据的修改对其他指向同一内存地址的指针变量来说都是同步的。

10. list_node * p ;中指针变量 p 代表了哪些东西？
—— p 存储的是某个链表节点的地址，并指向链表那个节点，同时由于结构体类型 list_node 的定义，p  中其实还有一个指针变量，即 p->next 。所以可以这么认为，每个指向某个链表节点的指针变量本质都含有 2 个指针变量，一个指向当前节点本身，另一个指向当前节点的下一个节点。

11. C 语言实现链表所有操作？
—— 


12. 创建一个链表的时候为什么需要 p_tail ?
—— 需要一个每次新建一个链表节点的时候都用 p_tail 指向。

13. free( pointer ) 函数释放的是什么？
—— 释放的是指针变量 pointer 指向的那段内存空间。释放完内存后指针并不会消亡。为了避免野指针出现，释放之后如果不清楚该指针还要干什么一定要使其为空：pointer =NULL ; 

14. p_tail = p_dynamic 和 p_tail->next = p_dynamic 有什么区别？各表示什么意思？
—— p_tail 和 p_tail->next 代表的节点是不一样的（但他们指向的节点类型是完全一样的）。p_tail 代表的是该指针变量当前指向的节点（如：第一个节点），而 p_tail->next 代表的是该指针变量所代表的节点中的的指针域中的 next 指针变量指向的那个节点（如：第二个节点）。
—— 所以 p_tail = p_dynamic 代表的是对 p_tail 这个指针变量重新赋值，这条语句就是说，现在有两个指向同一个 list_node 型结构体节点的指针变量了，而这个节点就是刚刚通过 malloc() 函数新建的，原本由 p_dynamic 指针变量指向的节点。这条语句的作用就是使得 p_tail 这个指针变量总是指向新建的那个链表节点，也就是尾节点。而 p_tail->next = p_dynamic 表示的是，指针变量 p_tail 当前指向的节点的指针域中的指针变量指向了指针变量 p_dynamic 当前指向的节点了。 
—— 在 create_list() 函数中，由于函数开头执行了 p_tail = p_head; 语句，所以在动态创建链表节点的时候，p_tail->next = p_dynamic; 语句执行后，其实也就是修改了头指针 p_head 指向的节点。其次的 p_tail = p_dynamic; 语句执行后，头指针 p_head 和尾指针 p_tail 便分别指向不同的链表节点了，以后 p_tail 对动态尾节点的操作对 p_head 不再同步影响。 p_head 在创建第一个链表节点的时候就已经定下来了，不再被改动（这也是为什么确定一个链表只需要一个头指针就够了），除非链表需要被删除时使 p_head 指向空（NULL）。 

15. 为什么在动态创建链表节点的时候只是用了一个指针变量 p_dynamic 但编译器并没有报错？
—— 

16. 什么是狭义的算法？什么是广义的算法？什么是泛型 ？
·狭义的算法：与数据存储方式密切相关。
·广义的算法：与数据存储方式无关。
·泛型：某种可以达到 -- 不同的存数方式执行一样的操作目标的技术。比如 C 中遍历数组可以在指针变量后面使用 ++ 运算符来完成地址的自增，而在链表中这样不可以，因为存放链表节点的地址大都不是连续的，所以要完成遍历这一操作，对数组（线性表）和链表两种不同的数据结构而言是不同的。而使用泛型技术，如在 C++ 里面使用重载，就可以把 ++ 写成一个函数，该函数的功能就是完成对无论是数组还是链表的遍历问题。从应用的角度上看，两者的实现是一样的，都是通过 ++ 函数来完成的。这就是泛型技术。但其本质相当于障眼法。

17. 如何学习算法？
—— 算法对绝大部分人都很难，很多算法需要很强的数学能力，一般人不会很正常。但对要学习算法的人，重点就是具备看懂别人的算法的能力。算法设计是一件很需要智商/经验/天分/机遇的事情，所以重点是多看别人的的算法，看看别人是怎么设计的，就算还是无法设计一些机智的算法，但是心中至少要记住有常见应用情境下的基本算法。对于部分变态的算法有时候背住就行了，因为随着自己能力的提高，某一天很有可能弄懂。
—— 分析算法最好用纸笔。

#### 栈和队列

1. 为什么需要栈？什么是栈？
——+量就会分配一块内存空间，内存分配分为静态分配和动态分配。局部/静态变量是以压栈和出栈的方式分配内存的，即在栈中分配的，而为变量动态分配的内存都是以堆排序的方式分配的，即在堆里面分配的。堆栈是分配内存的两种方式。

2. 栈有哪些分类？栈有什么特点？
—— 静态栈 -- 以数组/连续内存空间为内核，和动态栈 -- 以链表/离散内存空间为内核，不存在满不满的问题。栈的操作都只能在栈顶执行。

3. 栈的算法有哪些？栈的应用有哪些？
—— 栈的算法主要就两个：压栈和出栈。
—— 栈的应用：
①生产者和消费者问题；


4. 为什么需要队列？什么是队列？
—— 满足“先进先出”的存储结构就是队列。队列其实也是链表的应用之一。queue 的主要操作有出队和入队。只能从 front 出队，只能从 rear 入队。指针变量 front 指向的是第一个有效元素，rear 指向的是最后一个有效元素的下一个位置。 队列和栈本质就是操作受限的链表。

5. 队列有哪些分类？
——　链式队列 -- 用链表作为内核的队列， 和静态队列 -- 用数组作为内核的队列。

6. 函数形参是否是必要？
—— 函数声明处的形参可以不写，但函数主体的形参如果要传递参数的话就必须写上。函数声明处的形参要么不写，否则必须和函数主体部分形参一致。

6. 不存放有效数据的头节点是否需要为其动态分配内存？
—— 必须要。凡是节点都要动态分配内存。 

7. 为什么有这么多种数据结构？
—— 源于现实需求。 

8. 什么叫“遍历”？
—— 就是访问到每种数据结构中保持着的每个 元素。至于访问到这些元素后你要干什么这个就根据需要决定了。

9. 释放一个指针变量指向的内存空间后还需要做什么？
—— 将指针变量指向空。避免成为野指针。

10. 销毁和清空有什么区别？
—— 销毁是数据连同结构全部删除，而清空则是只删除数据/释放内存空间。 

11. 为什么不能销毁一个栈？
—— 因为定义栈的时候栈的空间是系统分配的，只能有系统回收。

12. 指针的不常见特点是什么？
—— 指针可以指向下一个地址但是不能用下一个地址。

13. 实现循环序列有哪些注意事项？
①为什么静态队列通常是循环队列？—— 若用传统的数组来实现队列，那么在增加元素和删除元素的时候，尾指针和头指针都只能向上移动，地址都在增加，而静态数组的长度是固定的，地址一直增加迟早会溢出，同时也造成了已经删除的空间不能在被使用，而造成的浪费。循环队列可以使 尾部 + 1 = 1 头部，从使内存空间得到充分的使用。



②循环队列需要几个参数来确定？—— front，rear。这两个参数在以下三种场合下含义都不一样：
③循环队列各个参数的含义？
Ⅰ. 队列初始化：front 和 rear 都零。
Ⅱ. 队列非空：front 代表的是队列第一个有效元素，rear 代表的是队列最后一个有效元素的下一个位置。
Ⅲ. 队列空：front 和 rear 相等但是不一定是 0 。
④循环队列入队的算法是怎样的？

⑤循环队列出队的算法是怎样的？ —— f 代表 front ， r 代表 rear 。

⑥如何判断循环队列是否为空？—— 如果 front 和 rear 的值相等，则该队列就一定为空。
⑦如何判断循环队列已满？—— 两种方式：front 和 rear 的值大小不一定，大于小于等于都可能。
Ⅰ. 增加一个标志，每增加一个元素自增 1 ，当标志的值等于数组长度时则满。
Ⅱ. 少用一个元素，如果数组长度为 n ，那么当存放 n-1 个时就满了。通常使用这种方式。


14. 队列有哪些具体应用？
—— 所有和时间有关的操作都有队列的影子。如操作系统的任务有等待队列，就绪队列，阻塞队列等。

15. C 实现栈和队列的所有操作？
①链表为内核的动态栈：

``` c
/* *******************************************************
** 本程序实现的是以链表为内核实现动态栈
** @ckwongloy, On Code::Blocks 13.12
** 最后修改时间：2015-06-29 11:15:37
******************************************************** */
# include <stdio.h>
# include <stdlib.h>
# include <malloc.h>
# include <stdbool.h>

typedef struct node{
    int data ;
    struct node * next ;
} stack_node ;

typedef struct stack_body{
    stack_node * p_top ;
    stack_node * p_bottom ;
} stack ;

void init_stack( stack * stk ) ;
void traverse_stack( stack * stk ) ;
void push_stack( stack * stk ) ;
bool pop_stack( stack * stk ) ;
bool clear_stack( stack * stk ) ;
int get_stack_length( stack * stk ) ;
bool is_stack_empty( stack *stk ) ;

int main( void ){
    stack stk ;
    init_stack( &stk ) ;
    push_stack( &stk ) ;
    pop_stack( &stk ) ;
    is_stack_empty( &stk ) ;
    clear_stack( &stk ) ;
    traverse_stack( &stk ) ;
    return 0 ;
}

void init_stack( stack * stk ){
    stk->p_top = ( stack_node * )malloc( sizeof( stack_node ) ) ;
    if( NULL == stk->p_top ){
        printf( "\n动态内存分配失败！程序退出！\n" ) ;
        exit( -1 ) ;
    }else{
        stk->p_bottom = stk->p_top ;
        stk->p_bottom->next = NULL ;
     }
    printf( "\n完成！已初始化一个空栈！\n" ) ;
    return ;
}

void push_stack( stack * stk ){
    printf( "\n请输入要入栈的元素个数：" ) ;
    int num ;
    scanf( "%d", &num ) ;
    if( 0>= num ){
        printf( "\n不会入栈任何元素！\n" ) ;
        return ;
    }
    int i, val, len=0 ;
    for( i=0; i<num; i++ ){
        printf( "\n请输入第 %d 个要入栈的元素的值：", i+1 ) ;
        scanf( "%d", &val ) ;
        stack_node * p_dynamic = ( stack_node * )malloc( sizeof( stack_node ) ) ;
        if( NULL == p_dynamic ){
            printf( "\n动态内存分配失败！程序终止！\n" ) ;
            exit( -1 ) ;
        }
        p_dynamic->data = val ;
        p_dynamic->next = stk->p_top ;
        stk->p_top = p_dynamic ;
        len ++ ;
        printf( "\n成功！第 %d 元素 %d 已入栈并成为新的栈顶！( 当前栈中共有 %d 个元素 )\n", i+1, val, len ) ;
    }
    printf( "\n完成！所选 %d 个元素已全部入栈！( 栈顶元素：%d )\n", num, stk->p_top->data ) ;
    return ;
}

void traverse_stack( stack * stk ){
    stack_node * p = stk->p_top ;
    int len = get_stack_length( stk ) ;
    if( 0 == len ){
        printf( "\n此为空栈！\n" ) ;
        return ;
    }
    printf( "\n当前栈中共有 %d 个元素！其值从上往下依次是：\n\n", len ) ;
    while( p != stk->p_bottom ){
        printf( "\t\t %d \n", p->data ) ;
        p = p->next ;
    }
    return ;
}

int get_stack_length( stack * stk ){
    int len = 0 ;
    stack_node * p  = stk->p_top ;
    if( p == stk->p_bottom ){
        return 0 ;
    }
    while( stk->p_bottom != p ){
        len ++ ;
        p = p->next ;
    }
    return len ;
}

bool pop_stack( stack * stk ){
    int len = get_stack_length( stk ) ;
    if( 0 == len ){
        printf( "\n栈为空！不能出栈！\n" ) ;
        return false ;
    }
    int num ;
    printf( "\n请输入将要出栈的个数：" ) ;\
    scanf( "%d", &num );
    while( 0>= num || num > len ){
        if( 0==num ){
            printf( "\n不会出栈任何元素！\n" ) ;
        }else{
            printf( "\n个数非法！\n" ) ;
         }
        printf( "\n请重新输入将要出栈的个数：" ) ;\
        scanf( "%d", &num );
    }
    int i, val ;
    stack_node * p = stk->p_top ;
    stack_node * p_temp = stk->p_top ;
    for( i=0; i<num-1; i++ ){
        p = p->next ;
        val = p_temp->data ;
        free( p_temp ) ;
        p_temp = p ;
        printf( "\n成功！已出栈 %d 个元素！本次出栈的元素是 %d！\n", i+1, val ) ;

    }
    val = p_temp->data ;
    p = p->next ;
    free( p_temp ) ;
    p_temp = NULL ;
    stk->p_top = p ;
    printf( "\n成功！已出栈 %d 个元素！本次出栈的元素是 %d！\n", i+1, val ) ;
    printf( "\n完成！原栈前 %d 个元素已全部出栈！( 当前栈中还有有 %d 个元素 )\n", num, get_stack_length( stk ) ) ;
    return true ;
}

bool is_stack_empty( stack *stk ){
    if( stk->p_top == stk->p_bottom ){
        printf( "\n完成！此为空栈！\n" ) ;
        return true ;
    }else{
        printf( "\n完成！此栈非空！\n" ) ;
        return false ;
     }
}

bool clear_stack( stack * stk ){
    if( is_stack_empty( stk ) ){
        printf( "\n结束！原栈已为空栈！\n" ) ;
        return false ;
    }
    stack_node * p_temp = stk->p_top ;
    while( stk->p_bottom != stk->p_top ){
        stk->p_top = stk->p_top->next ;
        free( p_temp ) ;
        p_temp = stk->p_top ;
    }
    p_temp = stk->p_top ;
    free( p_temp ) ;
    p_temp = NULL ;
    stk->p_top = stk->p_bottom ;
    printf( "\n完成！栈已清空！\n" ) ;
    return true ;
}
```

②静态数组为内核的循环队列：

``` c
/* *************************************
** 本程序是以静态数组为内核实现循环队列
** @ckwongloy, On Code::Blocks 13.12
** 最后修改时间：2015-06-30 01:08:24
************************************** */

# include <stdio.h>
# include <stdbool.h>
# include <malloc.h>
# include <stdlib.h>

typedef struct queue_body{
    int * base ;
    int front ;
    int rear ;
    int length ;
    int max_len ;
} queue ;

void init_queue( queue * quu ) ;
bool enqueue( queue * quu ) ;
void traverse_queue( queue * quu ) ;
bool is_queue_empty( queue * quu ) ;
bool is_queue_full( queue * quu ) ;
bool dequeue( queue * quu ) ;
int get_queue_length( queue * quu ) ;

int main( void ){
    queue quu ;
    init_queue( &quu ) ;
    //is_queue_full( &quu ) ;
    //is_queue_empty( &quu ) ;
    enqueue( &quu ) ;
    dequeue( &quu ) ;
    traverse_queue( &quu ) ;
    return 0 ;
}

void init_queue( queue * quu ){
    int len ;
    printf( "\n请定义数组的长度：" ) ;
    scanf( "%d", &len ) ;
    while( 0>=len ){
        printf( "\n长度非法！请重新输入！\n" ) ;
        printf( "\n请定义数组的长度：" ) ;
        scanf( "%d", &len ) ;
    }
    quu->base = ( int * )malloc( sizeof( int ) * len ) ;
    quu->front = 0 ;
    quu->rear = 0 ;
    quu->max_len = len ;
    printf( "\n完成！已初始化一个长度为 %d 的循环队列！\n", quu->max_len ) ;
    return ;
}

bool is_queue_full( queue * quu ){
    if( (quu->rear +1)%(quu->max_len) == quu->front ){
        printf( "\n完成！队列已满！\n" ) ;
        return true ;
    }else if( is_queue_empty( quu ) ){
        printf( "\n结束！队列为空！\n" ) ;
        return false ;
     }else{
        printf( "\n完成！队列未满！\n" ) ;
        return false ;
      }
}

bool enqueue( queue * quu ){
    if( is_queue_full( quu ) ){
        printf( "\n结束！队列已满！无法添加！\n" ) ;
        return false ;
    }
    int num ;
    printf( "\n请输入要往队列增加的元素个数( 队列长度为 %d )：", quu->max_len ) ;
    scanf( "%d", &num ) ;
    while( 0 >= num || num >= quu->max_len ){
        if( 0 == num ){
            printf( "\n结束！不会向队列添加任何元素！\n" ) ;
            return false ;
        }else{
            printf( "\n个数非法！请重新输入！\n" ) ;
            printf( "\n请重新输入要往队列增加的元素个数( 队列长度为 %d )：", quu->max_len ) ;
            scanf( "%d", &num ) ;
         }
    }
    int i, val;
    quu->length = 0 ;
    for( i=0; i<num; i++ ){
        printf( "\n请输入要往队列添加的第 %d 个元素值：", i+1 ) ;
        scanf( "%d", &val ) ;
        quu->base[quu->rear] = val ;
        quu->rear = ( quu->rear + 1 )% ( quu->max_len ) ;
        quu->length ++ ;
        printf( "\n成功！元素 %d 已入队！( 当前队列共有 %d 个元素 )\n", val, quu->length ) ;
    }
    printf( "\n完成！%d 个元素已全部入队！( 当前队列共有 %d 个元素 )\n", num, quu->length  ) ;
    return true ;
}

bool is_queue_empty( queue * quu ){
    if( quu->front == quu->rear ){
        printf( "\n队列为空！\n" ) ;
        return true ;
    }else{
        printf( "\n队列非空！\n" ) ;
        return false ;
     }
}

void traverse_queue( queue * quu ){
    if( is_queue_empty( quu ) ){
        printf( "\n结束！队列为空！\n" ) ;
        return ;
    }else{
        int i = quu->front ;
        while( i != quu->rear ){
            printf( "\t\t%d\n", quu->base[i] ) ;
            i = ( i+1 )%quu->max_len ;
        }
     }
     printf( "\n" ) ;
    return ;
}int get_queue_length( queue * quu ) ;

bool dequeue( queue * quu ){
    if( is_queue_empty( quu ) ){
        printf( "\n结束!队列为空！无法出队！\n" ) ;
        return false ;
    }
    int val, num, i ;
    printf( "\n请输入要出队的元素个数( 当前队共有 %d 个元素 )：", quu->length ) ;
    scanf( "%d", &num ) ;
    while( 0>=num || num >= quu->max_len ){
        if( num == 0 ){
            printf( "\n不会出队任何元素！\n" ) ;
            return false ;
        }else{
            printf( "\n个数非法！请重新输入\n" ) ;
            printf( "\n请重新输入要出队的元素个数( 当前队共有 %d 个元素 )：", quu->length ) ;
            scanf( "%d", &num ) ;
         }
    }
    for( i=0; i<num; i++ ){
        val = quu->base[quu->front] ;
        quu->front = ( quu->front + 1 ) % ( quu->max_len ) ;
        quu->length -- ;
        printf( "\n成功！元素 %d 已经队！（已出队 %d 个元素）\n", val, i+1 ) ;
    }
    printf( "\n完成！%d 个元素已全部出队！（当前队列还有 %d 个元素）\n", num, quu->length ) ;
    return true ;
}

int get_queue_length( queue * quu ){
    int length ;
    return length ;
}
```

16. 栈的应用有哪些？
①函数调用：每个函数里面的形参，下一个被调函数的地址，变量等信息都保存在栈里面。
②中断：中断向量表。
③表达式求值：计算器算法
④内存分配
⑤缓冲处理
⑥迷宫

17. 循环队列的实现核心是什么？
—— r = ( front+1 )%length 。

#### 递归

1. 为什么需要递归？什么是递归？
—— 对于树/图的遍历，通常有2种 算法来实现：迭代(Iteration)和递归(Recursion)，迭代是利用循环反复取值/赋值的过程；递归则是反复自己调用自己来获得最终结果。递归就是一个函数直接或者间接地调用自己，它本质也就是函数调用。递归是通过栈来实现的。

2. 什么是死递归?
—— 一个函数不停地调用自己而找不到出口。从内存上看就是不停地压栈出栈，无限循环下去，直到 stack overflow。

3. 什么是汉诺塔？如何用 C 实现汉诺塔算法？


``` c
/* *****************************************************
** 本程序功能：用递归实现汉诺塔
** 待完善：移动次数同步显示
** @ckwongloy, On Code::Blocks 13.12
** 最后修改时间：2015-06-30 15:02:17
****************************************************** */

# include <stdio.h>
# include <math.h>

void hanoi( int n, char from, char by, char to ) ;

int main( void ){
    char from = 'A', by = 'B', to = 'C' ;
    int n, times = 0 ;
    printf( "\n请输入要移动的盘子的个数：" ) ;
    scanf( "%d", &n ) ;
    if( 0 >= n ){
        return -1 ;
    }
    printf( "\n完成！柱子 A 上盘子的序号从上往下依次是：1 ~ %d！\n", n ) ;
    printf( "\n\n将移动 %d 步！\n\n", ( ( ( int )pow( 2, n ) )-1 ) ) ;
    hanoi( n, from, by, to ) ;
    printf( "\n\n完成！\n\n" ) ;
    return 0 ;
}

void hanoi( int n, char A, char B, char C ){
    if( 1 == n ){
        printf( "\n第 +1 步：将 %d 号盘子从柱子 %c 移动到柱子 %c ！\n", n, A, C ) ;
    }else{
        hanoi( n-1, A, C, B ) ;
        printf( "\n第 +1 步：将 %d 号盘子从柱子 %c 移动到柱子 %c ！\n", n, A, C ) ;
        hanoi( n-1, B, A, C ) ;
     }
    return ;
}
```

4. 一个函数为什么可以自己调用自己？
—— 对于计算机来说，函数调用只是在内存中开辟新的堆栈来存储数据而已，计算机是不能区分调用的函数是不是“自己”，因为内存地址不一样。


5. 汉诺塔中的柱子是绝对的还是相对的？
—— 相对的。规律是 A 借助 B 移动到 C ， 如果在某次递归中，x 充当了助手（桥梁）的角色，那么就相当于 B，如果 y 是要移动到的目的柱子，那么 y 就充当了 C ，如果 z 是要移动的柱子，那么 z 就充当的是 A 的决定。

6. 递归和循环有什么区别？递归有什么不足之处？
—— 理论上所有的循环都可以转化为递归。而递归不一定能转换成循环。
①递归:
	1)易于理解（针对某些算法，相对于循环，如汉诺塔、树、图操作）
	2)速度慢（因为递归实质就是不停地函数调用）
	3)存储空间大			
②循环:
	1)不易理解
	2)速度快
	3)存储空间小

7. 递归的应用有哪些？
—— 树和森林就是以递归的方式定义的；树和图很多算法都是以递归来实现的；很多数学公式就是以递归的方式定义的 -- 菲波拉契序列。


8. 使用递归必须要满足哪三个条件？
①递归必须得有一个明确的中止条件；
②该函数所处理的数据规模必须在递减；
③这个转化必须是可解的。

9. 什么时候需要使用递归？
—— 这是个数学问题。积累已知的，经典的递归经验，如和树、图相关的算法。一般像这种没有明确执行次数的问题，都是用递归来解决。

#### 树

1. 数据结构的分类是怎样的？
①逻辑结构：根计算机没有关系，分为 线性 -- 链表/数组 -- 栈和队列是特殊的（操作受限）线性结构，线性结构的相关算法都已经相当成熟了；和非线性 -- 树和图，非线性结构的算法很复杂，并不成熟。
②物理结构：和计算机密切相关的，内存地址都是连续/线性一维的。

2. 为什么需要树？什么是树？
—— 现实确实有这种逻辑存在并需要被解决。树的专业定义：
①有且只有一个称为根的节点；
②有若干个互不相交的子树，这些子树本身也是一棵树。
树的通俗定义：
①树是由节点和边组成；
②每个节点只有一个父节点但可以有多个子节点；
③但有一个节点例外，该节点没有根节点，此节点称为根节点；


3. 如何定义一棵树？树的相关概念有哪些？
—— 树的专业定义是用递归的概念来定义的。树的专业术语有：
·节点：
·父节点：
·子节点：
·子孙：
·堂兄弟：父亲是亲兄弟
·深度：从根节点到最底层节点的层数称之为深度；根节点是第一层。
·叶子节点；（叶子就不能劈叉了），没有子节点的节点；
·非终端节点：实际就是非叶子节点。
·根节点既可以是叶子也可以是非叶子节点。
·度：子节点的个数称为度。（树的度：一棵树看节点中孩子个数最多的为准）

4. 树有哪些分类？
①一般树：任意一个节点的子节点的个数都不受限制。
②二叉树（有序树）：任意一个节点的子节点的个数最多两个，且子节点的位置不可更改 -- 左子树和右子树。二叉树又分为：
·一般二叉树：
·满二叉树：每一层的节点数都是最大节点数。或，在不增加树的层数的前提下，无法再多添加一个节点的二叉树。
·完全二叉树：如果只是删除了满二叉树最底层最右边的连续若干个节点（也可以不删），这样形成的二叉树就是完全二叉树。讲完全二叉树的概念是为了方便用数组存储数据。完全二叉树包括满二叉树（什么节点都不删的完全二叉树就是满二叉树）。
③森林：n 个互不相交的树的集合。

5. 完全二叉树有哪些特点？
①根据完全二叉树就可以得出树的层数。
②无需计算就可以找到某个节点的父节点或子节点。
③浪费内存。

6. 树的存储有哪些方式？各有什么特点？
—— 树的存储基本上都是转换成二叉树来存储的。分为 2 种：
①连续存储（完全二叉树）：只有完全二叉树才能用数组存储。
②链式存储：每个节点分三个区域，分别保存数据，左右孩子地址。n 个节点浪费 n+1 空间。
③一般树的存储：
·双亲表示法：求父节点方便。
·孩子表示法：求子节点很方便。
·双亲孩子表示法：求父子节点都很方便不过程序设计比较复杂。
·二叉树表示法：需要将一个普通树转换成二叉树。
④森林的存储：同样需要先将森林转换成二叉树 -- 将其他树当作森林中某个树某个节点的兄弟，然后再存储二叉树。

7. 如何将一个普通树转换成二叉树？
—— 设法保证任意一个节点的左指针域指向它的第一个孩子，右指针域指向它的下一个兄弟（孩子兄弟表示法），只要能满足此条件，就可以把一个普通树转化成二叉树。一个普通树转化成的二叉树一定没有右子树。

8. 对树的操作有哪些？
—— 一般而言对树的操作就是讲对二叉树的操作。几种对二叉树常见 的操作有：
①遍历，根据对根节点的访问顺序分为三种遍历方式：·先序遍历（先访问根节点）：先访问根节点，再先序遍历左子树，再先序遍历右子树。（这也是一种递归性质的概念）
·中序遍历（中访问根节点）：先中序遍历左子树，再访问根节点，再中序遍历右子树。
·后序遍历（后访问根节点）：先后序遍历左子树，再后序遍历左子树，再访问根节点。
②已知两种遍历序列求原始二叉树：只知道一种遍历顺序是不能还原二叉树的，至少需要两种序列才行。但知道先序和后序仍然无法还原二叉树。
·已知先中求后序/原始二叉树：根据先序判断根，根据中序判断左子树。根的左边是左子树，右边是右子树。
·已知中后求先序/原始二叉树：根据后序判断根 -- 最后的是根。根据根判断左右子树

9. 树的应用有哪些？
①树是数据库中数据组织的一种重要形式。
②操作系统的父子进程的关系本身也是一棵树。
③面向对象语言中类的继承关系。（编程语言中的继承本质是一般到特殊的例子）
④哈夫曼树 -- 给定n个权值作为n的叶子结点，构造一棵二叉树，若带权路径长度达到最小（根结点到第L层结点路径长度为L-1），称这样的二叉树为最优二叉树，也称为哈夫曼树(Huffman tree)。哈夫曼树是带权路径长度最短的树，权值较大的结点离根较近。

10. 确定一棵二叉树需要几个元素？
—— 一个根节点即可。

11. 静态分配是怎么分配？静态分配的内存有什么特点？
—— 通过 数据类型 变量名 的方式。静态分配的内存在函数调用结束后会被回收。

12. C 语言实现链式二叉树？
—— 

``` c
/* ********************************************
** 本程序功能：实现静态链式二叉树
** 待加强功能：实现动态二叉树
** @ckwongloy, On Code::Blocks 13.12
** 最后修改时间：2015-06-30 21:53:49
********************************************* */

# include <stdio.h>
# include <malloc.h>

typedef struct binary_tree_node_body{
    char data ;
    struct binary_tree_node_body * left_child ;
    struct binary_tree_node_body * right_child ;
} binary_tree_node ;

binary_tree_node * create_binary_tree( void ) ;
void traverse_binary_tree_inorder( binary_tree_node * root ) ;
void traverse_binary_tree_preorder( binary_tree_node * root ) ;
void traverse_binary_tree_postorder( binary_tree_node * root ) ;

int main( void ){
    binary_tree_node * tree = create_binary_tree() ;
    printf( "\n该二叉树的 先序遍历 结果：\n\n" ) ;
    traverse_binary_tree_preorder( tree ) ;
    printf( "\n该二叉树的 中序遍历 结果：\n\n" ) ;
    traverse_binary_tree_inorder( tree ) ;
    printf( "\n该二叉树的 后序遍历 结果：\n\n" ) ;
    traverse_binary_tree_postorder( tree ) ;
    return 0 ;
}

binary_tree_node * create_binary_tree( void ){
    binary_tree_node * root = ( binary_tree_node * )malloc( sizeof( binary_tree_node ) ) ;
    binary_tree_node * pa = ( binary_tree_node * )malloc( sizeof( binary_tree_node ) ) ;
    binary_tree_node * pb = ( binary_tree_node * )malloc( sizeof( binary_tree_node ) ) ;
    binary_tree_node * pc= ( binary_tree_node * )malloc( sizeof( binary_tree_node ) ) ;
    binary_tree_node * pd = ( binary_tree_node * )malloc( sizeof( binary_tree_node ) ) ;
    root->data = 'R' ;
    pa->data = 'A' ;
    pb->data = 'B' ;
    pc->data = 'C' ;
    pd->data = 'D' ;
    root->left_child = pa ;
    root->right_child = pb ;
    pa->left_child = NULL ;
    pa->right_child = NULL ;
    pb->left_child = pc ;
    pb->right_child = pd ;
    pc->left_child = NULL ;
    pc->right_child = NULL ;
    pd->left_child = NULL ;
    pd->right_child = NULL ;
    return root ;
}

void traverse_binary_tree_preorder( binary_tree_node * root ){
    if( NULL != root ){
        printf( "\t\t\t%c\n", root->data ) ;
        if( NULL != root->left_child ){
            traverse_binary_tree_preorder( root->left_child ) ;
        }
        if( NULL != root->right_child ){
            traverse_binary_tree_preorder( root->right_child ) ;
        }
    }
    return ;
}

void traverse_binary_tree_inorder( binary_tree_node * root ){
    if( NULL != root ){
        if( NULL != root->left_child ){
            traverse_binary_tree_inorder( root->left_child ) ;
        }
        printf( "\t\t\t%c\n", root->data ) ;
        if( NULL != root->right_child ){
            traverse_binary_tree_inorder( root->right_child ) ;
        }
    }
    return ;
}

void traverse_binary_tree_postorder( binary_tree_node * root ){
    if( NULL != root ){
        if( NULL != root->left_child ){
            traverse_binary_tree_postorder( root->left_child ) ;
        }
        if( NULL != root->right_child ){
            traverse_binary_tree_postorder( root->right_child ) ;
        }
        printf( "\t\t\t%c\n", root->data ) ;
    }
    return ;
}
```

13. 学习数据结构的本质是什么？
—— 用计算机的一维连续，模拟解决现实问题的复杂多变。数据结构是研究数据的存储和数据操作的一门学问。数据的存储分为个体的存储和个体关系的存储，但数据的存储最核心的就是个体关系的存储。

14. 排序和查找有什么关系？
—— 排序是查找的前提。排序是重点。

15. 查找算法有哪些？用 C 如何实现？
①折半查找（二分查找）：


16. 排序算法有哪些？用 C 如何实现？
①快速排序：先找到某个元素的确切位置，然后使用递归。需要定义 2 个参数 low 和 high 分别指向第一个元素和最后一个元素。

``` c
/* ********************************************
** 本程序功能：快速排序算法
** @ckwongloy, On Code::Blocks 13.12
** 最后修改时间：2015-06-30 23:54:15
*********************************************** */

# include <stdio.h>

void quick_sort( int * array, int low, int high ) ;
int get_position( int * array, int low, int high ) ;

int main( void ){
    int arr[9] = { 14, -22221, 3, -5, 6, 82, 7, 28, -9 } ;
    quick_sort( arr, 0, 8 ) ;
    int i ;
    for( i=0; i<9; ++i ){
        printf( "\n\t\t%d\n", arr[i] ) ;
    }
    return 0 ;
}

void quick_sort( int * array, int low, int high ){
    int pos ;
    if( low < high ){
        pos = get_position( array, low, high ) ;
        quick_sort( array, low, pos-1 ) ;
        quick_sort( array, pos+1, high ) ;
    }
    return ;
}

int get_position( int * array, int low, int high ){
    int val =array[low] ;
    while( low < high ){
        while( low<high && array[high] >= val )
            --high ;
        array[low] = array[high] ;
        while( low<high && array[low]<= val )
            ++low ;
        array[high] = array[low] ;
    }
    array[low] = val ;
    return high ;
}
```

②冒泡排序：
③插入排序：
④选择排序：从所有的元素里面找出最小的和第一个互换。
⑤归并排序：先分堆。

17. 递归中的？
—— 

18. 什么是稳定排序？
—— 当排序时遇到相同元素时，排序之后相同元素的顺序和原来一致。

19. Java 中容器和数据结构相关知识有哪些？
—— Iterator 接口； 哈希 Map/Table。


20. 如何使用程序解决现实问题？
—— 将现实中的所有问题相关的东西全部模拟成数据，然后使用数据结构这门学问对这些数据进行存储，最后使用相关算法进行解决。

21. 泛型技术的本质是什么？
—— 同一种逻辑结构，无论该逻辑结构是什么样子的，都可以对它执行相同的操作。但不同的逻辑结构，如线性和非线性，不能使用泛型实现。

22. 为什么需要图？什么是图？
—— 

23. 图的相关算法有哪些？
①广度遍历：
②深度遍历：


#### 附录：几个 易混淆的 C 函数

getchar()

1. 从缓冲区读走一个字符，相当于清除缓冲区

2. scanf()  在读取输入时会在缓冲区中留下一个字符 '\n' （输入完 s[i] 的值后按回车键所致），所以如果不在此加一个 getchar() 把这个回车符取走的话，gets() 就不会等待从键盘键入字符，而是会直接取走这个“无用的”回车符，从而导致读取有误.

3. getchar()是在输入缓冲区顺序读入一个字符 ( 包括空格、回车和Tab )

4. getchar() 使用不方便,解决方法： 
（1）使用下面的语句清除回车： while(getchar()!='\n'); 

（2）用getche() 或 getch() 代替 getchar() ，其作用是从键盘读入一个字符（不用按回车），注意要包含头文件<conio.h>

5. getchar() 是 stdio.h 中的库函数，它的作用是从 stdin 流中读入一个字符，也就是说，如果 stdin 有数据的话不用输入它就可以直接读取了，第一次 getchar() 时，确实需要人工的输入，但是如果你输了多个字符，以后的getchar() 再执行时就会直接从缓冲区中读取了。

实际上是 输入设备 -> 内存缓冲区-> 程序getchar .

你按的键是放进缓冲区了,然后供程序 getchar  读取

你有没有试过按住很多键然后等一会儿会滴滴滴滴响,就是缓冲区满了,你后头按的键没有存进缓冲区.  

键盘输入的字符都存到缓冲区内,一旦键入回车, getchar 就进入缓冲区读取字符,一次只返回第一个字符作为 getchar 函数的值,如果有循环或足够多的 getchar 语句,就会依次读出缓冲区内的所有字符直到'\n'.要理解这一点,之所以你输入的一系列字符被依次读出来,是因为循环的作用使得反复利用 getchar 在缓冲区里读取字符,而不是 getchar 可以读取多个字符,事实上 getchar 每次只能读取一个字符.如果需要取消'\n'的影响,可以用getchar();来清除,这里getchar();只是取得了'\n'但是并没有赋给任何字符变量,所以不会有影响,相当于清除了这个字符.还要注意的是这里你在键盘上输入ssss看到的回显正是来自于getchar的作用,如果用getch就看不到你输入了什么.
