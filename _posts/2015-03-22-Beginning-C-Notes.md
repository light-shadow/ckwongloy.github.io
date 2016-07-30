---
layout: post
title: 《Beginning C》 学习笔记
category: C
tag: C
latest: 2015-03-28 17:02:44
---

#### 0

> 当前阅读至:第 1 遍,第 282 页,共 587 页 

1.预处理指令:preprocessing directive 
2.转义序列:escape sequence 
3.调试:Debugging
4.集成测试:intergration testing
5.变量:variable
6.二进制数:binary digit
7.转换指定符:conversion specifier
8.取模:modulus
9.49页中有C语言的国际标准对整数类型的要求。每种类型占用的内存 空间都不少于其上的类型(short int <= int <= long int...)。 
10.子表达式:Subexpressions 
11.强制转换:cast
12.隐式类型转换:implicit conversion
13.隐式类型转换的规则:page67
14.第四章习题未做:page180
15.off by one 错误:索引值从0开始而不是1;
16.第五章习题未做page214
17.C语言没有提供字符串数据类型。 
18.第六章字符串数组例子错误——字符串之间少了逗号。
19.第六章习题未做page251
20.动态内存分分配:dynamic memory allocation 
21.动态分配内存的基本规则:page282

#### C 语言编程

1.函数返回值表示函数将控制权返回给操作系统(main函数)或者主调函数的一个代码,它表示程序的状态。通过观察返回值是否与定义一致,可 以判断程序的运行状态是否正常。

2.函数后面的括号,带有函数开始执行时传递给它的信息。除了main函数外的其他函数都可以互相调用。对于每个被调用的函数,都可以在函数名 后面的括号中给函数传递一些信息。在执行到函数体中的return语句时,就停止执行该函数,并将控制权返回给调用函数(对于函数main()则将控制 权返回给操作系统。)

3.空函数(函数体为空的函数,仅有起始和结束两个大括号里面没有任何语句)的作用:我们可以声明一些用来解决手头问题的空函数,确定需要完 成的编程工作,再为每个函数创建程序代码。这样做有助于调理分明、系统的建立程序。

4.包含在函数名后的圆括号内的项称为参数,它指定要传送给函数的数据。当传送给函数的参数多余一个时,要用逗号分开。

5.编写程序的步骤:

- 了解问题 -- 有什么输入、对输入该做什么处理,要输出什么、以及输出哪种格式?

 对于较简单的问题,输入可以来自键盘也可以来自磁盘文件的数据或来自电话或网络的信息。输出可以显示在屏幕或者打印机,也可以是更新磁盘上的数据文件。
对于复杂点的问题,考虑多个方面。清楚地定义程序要解决的问题,理解制定最终方案所需的资源和努力,还可确定项目是否切实可行。 

- 详细设计 -- 计划必须把工作分为可管理的单元,以便执行起来井然有序。
   首先将程序分解成许多定义清楚且相互独立的小单元,描述这些独立单元的相互沟通方式,以及每个单元在执行时需要什么信息,从而开发出富有
  逻辑、相互独立的单元。

- 实施 -- 按进度完成预先设计好的工作。 一次编写一部分。每个部分都要基于详细的设计规范,在进行下一个部分之前,应尽可能详细的检查每个部分的功能。这样程序就会逐步完成预期
  任务。

- 测试 -- 一个地方的问题有可能会造成其他地方出问题,有时测试会成为一个反复的过程。
  每个程序的模块(组成程序的单元)都要单独测试。如他们不正常就需要调试(Debugging)——找出程序中的问题及更正错误的过程。通常调试 过程会加入额外的代码输出一些信息来确定程序中事件发生的顺序及即将生成的值。在大型程序中还需要联合测试各个程序模块以确保每个模块之间 能一起=正常工作,此阶段专业术语称为集成测试(intergration testing)。 

6.大多数编程语言都提供了一种方法——将程序切割成多个段(即函数),各段可以独立编写。函数与外界有一个特殊的接口,可将信息传进来,也 可将函数产生的结果传出去。这个接口在函数的第一行即函数名的地方指定。

7.头文件提供了本程序中将要使用的函数所需的定义。

8.编译器 -- 将源代码转换成机器码。


9.逻辑错误 -- 在处理程序中复杂的判断结构时,很容易出现逻辑错误。从语言的观点看,程序是正确的,编译及运行也正确但得不到正确的结果。 

10.变量(variable) -- 在程序中存储数据项的地方是可以变化的。变量就是计算机中一块特定的内存。它是由一个或多个连续的字节所组成,每个 变量都有一个名称,可以用该名称表示内存的这个位置,以提取它包含的数据或存储一个新数值。变量的使用次数和和变量的数量以及变量的值是不 受限制的。

11.内存(或主内存--main memory或随机访问存储器--Random Access Memory,RAM)-- 组成程序的指令和程序操作的数据都必须存储到内存 中。
(PS:ROM--Read-Only Memory,只读存储器,只能让机器读取或执行包含在ROM中的指令而不能被修改,ROM上的信息是在制造机器的时候放 进去的,用来控制连接到机器上的各种设备的运作。在PC上这些程序被称为bios)。

12.字节的由0/1数字的标记被称为字节的地址。每个字节在内存里都有一个和其他字节不同的地址。字节的地址唯一的表示计算机内存中的字节。以 字节为单位是为了方便计算机使用,因为计算机只能识别二进制数。

13.C程序中的整数总是不带小数点的数字。2.0不是整数。 

14.关键字是特殊的C保留字,对编译器有特殊的意义。不能将它们作为变量名称否则编译器会拒绝该变量名。 

15.变量声明也称为变量的定义。所有申明都要放在可执行语句的开头。因为如果遗落申明或者把申明放在后面,程序就不会编译。 

16.垃圾值,即上次使用这块内存空间时遗留在此的值。

17.转换指定符(conversion specifier),确定变量在屏幕上的显示方式。总以%开头。要输入%必须用转义序列%%。 

18.多个变量的类型相同可将他们放在同一行代码上声明。变量声明时若注释不方便,可将它们分成多行即可。 

19.变量的命名:大小写字母、数字及下划线(下划线有时也算字母)。但是不能以数字开头。不能有空格。也不要将下划线作为变量名字的开头, 因为以一个或者2个下划线开头的变量名常用在头文件中,这样有可能和标准库的变量名冲突。命名最好能顾名思义。注意,变量名的长度最好不要 超过遵循C语言标准的编译器至少支持的31个。最后,变量名区分大小写。

20.变量的初始化:最好在变量声明的同时初始化变量。这样可以避免对初始值的怀疑。当程序运作不正常时,这样也有助于追踪错误。在初始化变 量前变量的值可以是任何数,即上一个程序在那块内存中留下的数值(垃圾值)。随意使用垃圾值可能导致各种问题,如城西出错、计算机崩溃。初 始化变量的值可以是任意的,不一定是0。

21.赋值:将=右边的结果(rvalue)存到左边的变量(lvalue)中以取代=左边的原值。 

22.取模运算符又叫余数运算符。所有运算符的工作方式都与我们的常识相同(除法运算符例外,它应用于整数时有点不直观)。

23.不能在字符串的中间放置换行符,需要将字符串拆开成两行或多行时,一行上的每一段字符必须有自己的一对双引号。 

24.参数可以是数值也可以是一个算术表达式,不过需要注意数据类型要一致。当为表达式时表达式的值会被存储在一个临时变量中,使用完毕编译 器删除这个临时变量。 

25.整数除法:操作数不同号,结果为负数,操作数同号,结果为正数;对于模数运算符,其结果总是和左操作数的符号相同。(运算符操作的数据 项称为操作数)。

26.一元减号运算符:实现变量的正负转化(ps:加减乘除都是2元运算符)。他不会转变原来变量的值。与编写一个负数时用的负号运算符的区别在 于,一元减号运算符的负号指定一个动作——翻转变量的符号。而编写一个负数时的负号不表示一个动作,程序执行时,不需要执行指令。他只是告 诉编译器,在程序里创建一个负的常量。 

27.在同一台机器上(有时候相同机器也不一定相同,因为晶片技术变化的日新月异),相同类型的不同变量总是占据相同大小的内存(字节数)。 但在不同的机器上相同类型的变量占用计算机内存的大小有可能不一样。这是因为C语言规范让编译器的作者确定给定类型的变量占用多少内存空 间。因此编译器的作者就可以选择变量的大小以满足计算机的硬件结构要求。最终由编译器确定类型的字节数。 

28.一个字节能存储-128~+127的整数。不同编译器决定了变量类型所占用的内存空间。 

29.int类型的常量不带尾缀,long类型的带L,unsigned类型的带U。如unsigned long i = 10UL; 

30.int变量类型的大小应该最适合执行代码的计算机。即int类型要对应计算机上整数的大小,使计算机发挥其最大效能。

31.C语言的国际标准对整数类型的要求:每种类型占用的内存空间都不少于其上的类型(short int <= int <= long int...)。 

32.指定整数常量要注意的问题:不带尾缀默认int型,带尾缀时候要用大写字母,小写字母虽然也合法,但是易误解,比如字母l和数字1很难分别。 

33.以0开头 -- 八进制;以0x(0X)开头 -- 十六进制。十六进制常量常用来表示位模式。因为一个十六进制的数对应4个二进制位。

34.C语言中浮点数的表示方式:数字小的时候直接写原来数值,数字较大的时候用E表示指数。如0.00008用指数表示为:0.8E-4。 

35.数字所占用的字节数和取值范围,取决于机器和编译器。注意,小数的精确位数只是一个大约的数,因为浮点数在内部是以2进制存储的。十进制 的浮点数在二进制中并不总是有精确的表示形式。 

36.输出的字段宽度是输出值所使用的总字符数(包括空格)。小数点后的位数由我们指定并将它用作字段宽度。指定字段宽度时,数值默认右对 齐。如果希望数值左对齐,只需在%后面添加一个负号。

37.包含在括号中的子表达式的计算顺序是:从最内层的括号开始计算到最外层的括号。对于运算符的优先级,一般规则是先乘除后加减。

38.合理使用空格和括号会使算术表达式的可读性更高、计算顺序更直观。(编译器会忽略空格) 39.浮点类型的变量赋值时,初值在末尾加f就是float类型,没有加f就是double类型。虽然有时候不加仍可以运行但是编译器需要进行一些不必要的 转换,来将double类型转换为float。

40.寻址运算符&的功能和将参数值传递给函数是一样的。&允许scanf()函数将读入的数值存进变量中。 

41.C语言中有一个通用的规定:#define语句中的标识符都是大写。

42.定义常量A的2种方式:

1. `#define A 数值` (末尾没有分号;,只要在程序中的表达式中引用A,预处理器就会用#define指令中的数值取代它,故程序开始编译时,不再 包含A这个符号了。但是源程序中仍包含A)。
2. 将A定义成变量但告诉编译器它的值是固定的不能改变,声明时在变量名前加上const关键字就可固化变量的值。(这样的优点是现在的A定义 为常量,而第一种定义方式的A只是一个将被取代的字符序列。同时编译器若发现有试图改变A值的代码就会报错)。 

43.sizeof跟变量之间必须要有空格,跟数据类型时,用()将数据类型括进去即可。 

44.编译器在处理涉及不同类型的值操作时,会自动把其中一个操作数的类型转换为另一个操作数的类型。只有两个操作数的类型相同,计算机才能 执行二元算术操作(加减乘除和取模)。在二元算术运算中使用不同类型的操作数,编译器就会把其中一个值域较小的操作数类型转换为另一个操作数的类型,这称为隐式类型转换。

45.当操作数的类型不同时,赋值操作总是要把有操作数的结果转换为做操作数的类型。(注意值域问题) 

46.所有数据类型中char占用的内存空间最小。它可以带符号也可以不到符号(取决于编译器,带符号-128~127,不带0~255)。char既可以解释成 一个字符也可以解释成一个整数(整数时只要该值在编译器许可的char类型的值域范围内即可)。

47.'a' - 'A'=32,只在字符编码是连续的整数的计算机。反例如IBM的EBCDIC码的字母的代码值不是连续的。 

48.枚举(enumeration):变量存储一组可能值中的一个。利用枚举可以定义一个新的整数类型。编译器会把int类型的整数值赋予每个名称(默认 从0开始,每个枚举器的值都比他之前的枚举器大1)。 

49.枚举器所用的名称必须唯一,但是枚举器的值不要求是唯一的。只是一般值都唯一。赋值过的枚举器后面的枚举器的值按顺序加1。 

50._Bool并不是一个理想的类型名称(最近才引入C中的)。不过若使用bool,则在将bool作为一种内置类型的编译器上,使用bool名称的程序大 都不会编译。命名为_Bool可以最大限度的减少自己与已有代码冲突的可能性。要使用bool作为类型名之需添加<stdbool.h>即可。

51.<stdbool.h>中还定义了符号true和false分别对应1和0(非零为true--1,0为false--0)。 

52._Bool类型的级别低于其他类型,所以按照隐式类型转换规则,在涉及_Bool类型和另一类型的操作中,_Bool值会转换为另一个值的类型。
本章源代码: 

1_转义序列_1.cpp:
``` c
# include<stdio.h> int main(void){
printf("If at first you don\'t succeed,try again!\n"); // \' 表示的是一个转义序列(escape sequence)。是一种在文本包含单引号 // 的一种特殊方式。区别于单引号的其他作用(比如表示字符的开头和结尾)
return 0; }
```

1_转义序列_2.cpp:

``` c
# include <stdio.h> int main(void)
{
printf("\n\"Be careful!\"\n\a\a");
return 0; } 
// \a 表示发出声音
```

#### 编程初步

本章代码:  

- 测量树木的高度.cpp:  

``` c
# include <stdio.h> int main(void){
long height_high=0L,height_small=0L,distance_man=0L,distance_man_tree=0L,tree=0L; printf("STEP1.\tEnter the height of the higher man\t(m):\t",height_high); scanf("%ld",&height_high);
printf("STEP2.\tEnter the height of the smaller man\t(m):\t",height_small); scanf("%ld",&height_small);
printf("STEP3.\tEnter the distance between high and small\t(m):\t",distance_man); scanf("%ld",&distance_man);
printf("STEP4.\tEnter the distance between tree and high man\t(m):\t",distance_man_tree);
scanf("%ld",&distance_man_tree);
tree = height_small + (distance_man+distance_man_tree) * (height_high - height_small) / distance_man; //?为何把此语句提前会出错 
printf("STEP5.\tFinally the height of the tree is\t:\t%ld\t(m)\n",tree);
return 0;
}
```

- 棒球分数分析.cpp: 

``` c
# include<stdio.h>/*棒球分数分析例子来理解函数调用和函数声明*/  int DataInput(); 
int DataOutput(); 
int DataAnalysis(); 
int main(void){  return 0; 
} 
int DataInput(){  return 0; 
} 
int DataOutput(){  return 0; 
} 
int DataAnalysis(){  return 0; 
}
```

- 华氏度和摄氏度互换.cpp:  

``` c
# include <stdio.h> 
int main(void) 
{ 
char choice = 0; 
゚oat tem_H = 0.0F,tem_S = 0.0F;  printf("菜单:\n\t1.将华氏温度转为摄氏温度\n\t2.将摄氏温度转为华氏温度\n请选择您要执行的操 作:"); 
scanf("%c",&choice); 
if(choice == '1'){ 
printf("请输入您要转化的华氏温度值:"); 
scanf("%f",&tem_H); 
tem_S = (tem_H - 32)*5/9; 
printf("华氏温度值为 %.2f 对应的摄氏温度为:%f\n",tem_H,tem_S); 
}else if(choice == '2'){ 
printf("请输入您要转化的摄氏温度值:"); 
scanf("%f",&tem_S); 
tem_H = tem_S * 1.8 + 32; 
printf("摄氏温度值为 %.2f 对应的华氏温度为:%f\n",tem_S,tem_H); 
} 
return 0;  } 
```

- 控制输出的字段宽度.cpp: 

``` c
# include <stdio.h> 
int main(void){ 
゚oat i = 2.5E12f, 
  j = 0.5E4f; 
unsigned long ゚oat  k; 
k = i/j; 
printf("\v\ttotal\t:%-0.2f\n\v \tkinds\t:%-0.0f\n\v \teach\t:%-0.3Lf\n",i,j,k);  //格式指定符的一般形式: 
// %[width(整数,指定字符输出的总字符数)][.precision(整数,控制小数点后的位数)] [modi゙er(例:输出long ゚oat时为L)]f 
/* while(1){ 
printf("\a"); 
} */ 
return 0;  } 
/*  程序的显示结果为: 
           total   :       2499999956992.00 
        kinds   :      5000 
       each    :      499999991.398  Press any key to continue 
*/ 
```

- 宽字符类型.cpp: 

``` c
# include<stdio.h> 
//# include<stddef.h>   //wchar_t类型被<stddef.h>定义  int main(void){ 
wchar_t w_ch = L'A';  scanf("%lc",&w_ch); 
printf("You entered: %lc \n",w_ch);  return 0; 
}  确定数据类型的字节数.cpp:  # include <stdio.h> 
int main(void){ 
printf("\t\t各种数据类型占用的字节数对照表:\n");  printf("TYPE\t\"char\"\t:\tOccupy\t\t%d\tbytes \v\n",sizeof (char));  printf("TYPE\t\"int\"\t:\tOccupy\t\t%d\tbytes \v\n",sizeof (int));  printf("TYPE\t\"゚oat\"\t:\tOccupy\t\t%d\tbytes \v\n",sizeof (゚oat));  printf("TYPE\t\"double\":\tOccupy\t\t%d\tbytes \v\n",sizeof (double));  printf("TYPE\t\"long\"\t:\tOccupy\t\t%d\tbytes \v\n",sizeof (long));  return 0; 
} 
/* 
显示结果为: 
                各种数据类型占用的字节数对照表:  TYPE    "char"  :       Occupy          1       bytes  
TYPE    "int"   :       Occupy          4       bytes   TYPE    "゚oat" :       Occupy          4       bytes   TYPE    "double":       Occupy          8       bytes   TYPE    "long"  :       Occupy          4       bytes   Press any key to continue 
*/
```

- 输出年月日.cpp: 

``` c
# include <stdio.h>  int main(void){ 
printf("请按年月日的先后顺序输入三个整数:"); 
int year=0, month=0, day=0;  // char months=0, month=0; 
scanf("%d %d %d",&year,&month,&day);  /*switch(months) 
{ 
case '1':{month = "January";break;} 
case '2':{month = 'February';break;}  case '3':{month = 'March';break;}  case '4':{month = 'April';break;}  case '5':{month = 'May';break;}  case '6':{month = 'June';break;}  case '7':{month = 'July';break;} 
case '8':{month = 'August';break;} 
case '9':{month = 'September';break;} 
case '10':{month = 'October';break;} 
case '11':{month = 'November';break;} 
case '12':{month = 'December';break;} 
default:{printf("ERROR!\a");break;} 
}*/ 
printf("操作成功!当前时间已修改为:%d%s - %s - %d \n",day,day%10==1 ? "st":(day%10==2 ? "nd" : (day%10==3 ? "rd" :"th")), 
month==1?"January":(month==2 ? "February":(month==3?"March":(month==4?"April":
(month==5?"May":(month==6?"June":(month==7?"July": 
   (month==8?"August":(month==9?"September":(month==10?"October":(month==11?"November": (month==12?"December":""))))))))))),year); 
return 0; 
}
```

- 数据类型的转换.cpp:  

``` c
# include <stdio.h> 
int main(void){ 
const ゚oat x =4.5f; //省略f一样 
short int i=23500, j=19300, z=21600;    //short能存储的最大数值是32747<i+j+z,故y声明为long short  long y = i+j+z; 
゚oat k=0.0f; //省略=0.0f一样 
//错误的写法: 
// k = y/150*x; //为什么 150*x 跟 x*150 结果会不一样?(因为乘除法的优先级一样)  //正确的写法1: 
// k = x * y/150;   //为什么这样写正确?(这样先进行乘法运算,因为对混合的操作数执行算术运算时,编译 器会自动把整数操作数转换为浮点数。) 
//正确的写法2: 
k = x/150*y;      //因为x是゚oat型的,只有先将x运算时编译器才会自动把整数操作数转换为浮点数,若x 最后计算(见上面错误的写法), 
  //则不能自动转换。不能自动转换的时候可以采取强制转换。 
//正确的写法3: 
// k = (゚oat)y/150*x;   //强制转换1 
//正确的写法4: 
// k = 1.0 * y/150 *x;   //强制转化2 
 printf("%.2f\n",k); 
return 0;  } 
/* 
正确的显示结果为:1932.00 
*/  //验证计算的先后顺序对结果的影响:  /* 
int main(void) 
{ 
return 0;  } 
*/ 
/* 
自动转换类型:  编译器在处理涉及不同类型的值操作时,会自动把其中一个操作数的类型转换为另一个操作数的类型。只有 两个操作数的类型相同,计算机才能执行二元算术操作(加减乘除和取模)。  在二元算术运算中使用不同类型的操作数,编译器就会把其中一个值域较小的操作数类型转换为另一个操作 数的类型,这称为隐式类型转换(implicit conversion) 
*/ 
```

习题2.1_距离单位的转换.cpp: 

``` c
# include<stdio.h> 
int main(void){ 
long i=0;  printf("请输入一个单位为米的整数长度大小值:");  scanf("%ld",&i); 
double j=0,k=0; 
j=i/1e8; 
k=i*1e9; 
printf("%ld 米等于 %.2e 光年 也等于 %.2e 纳米\n",i,j,k);  return 0; 
}
```

习题2.4_计算每小时的工资.cpp:  

``` c
# include<stdio.h> 
int main(void){ 
゚oat money=0.0f,hours=0.0f;  printf("请先输入你每周的工资及工作时长\t:\n\t周工资(美元)\t\t:\t",money);  scanf("%f",&money); 
printf("\t工作时长(小时)\t\t:\t",hours); 
scanf("%f",&hours); 
゚oat M_per_H=0.0f; 
M_per_H=money/hours; 
printf("\t你本周每小时的工资为\t:\t%.2f 美元/小时\n",M_per_H); 
return 0; 
}  一元减号运算符.cpp:  # include <stdio.h>  int main(void){ 
int i = 1;  printf("%d\a\n",-i);  return 0; 
}  
```

找出各种数据类型的极限值.cpp:  

``` c
# include <stdio.h> 
# include <limits.h> 
# include <゚oat.h> 
/*long char Display_Title(void) 
{ 
return "各种数据类型的极限值对照表\n";  }*/ 
int main(void)  { 
// Display_Title; 
printf("\t\t\t各种数据类型的极限值对照表:\n");  printf("TYPE\t\"char\"\t\t:\tFrom %.3ef to %.3ef \v\n",CHAR_MIN,CHAR_MAX);  printf("TYPE\t\"short\"\t\t:\tFrom %.3ef to %.3ef \v\n",SHRT_MIN,SHRT_MAX);  printf("TYPE\t\"int\"\t\t:\tFrom %.3ef to %.3ef \v\n",INT_MIN,INT_MAX);  printf("TYPE\t\"long\"\t\t:\tFrom %.3ef to %.3ef \v\n",LONG_MIN,LONG_MAX); 
// printf("TYPE\t\"long long\"\t\t:\tFrom %.3ef to %.3ef \v\n",LLONG_MIN,LLONG_MAX);  //?报错  printf("TYPE\t\"゚oat\"\t\t:\tFrom %.3ef to %.3ef \v\n",FLT_MIN,FLT_MAX);//"゚oat"前面若不加\,゚oat 会重新变成关键字;后面不加\会报错。 
printf("TYPE\t\"double\"\t:\tFrom %.3ef to %.3ef \v\n",DBL_MIN,DBL_MAX); 
printf("TYPE\t\"long double\"\t:\tFrom %.3ef to %.3ef \v\n",LDBL_MIN,LDBL_MAX);  printf("TYPE\t\"un char\"\t: \tFrom 0 to %u \t\t\v\n",UCHAR_MAX);  printf("TYPE\t\"un short\"\t: \tFrom 0 to %u \t\v\n",USHRT_MAX);  printf("TYPE\t\"un int\"\t: \tFrom 0 to %u \t\v\n",UINT_MAX); 
// printf("TYPE\t\"un int\"\t: \tFrom 0 to %d \t\v\n",UINT_MAX);  //%d去代替%u的结果  printf("TYPE\t\"un long\"\t: \tFrom 0 to %u \t\v\n",ULONG_MAX); 
// printf("TYPE\t\"un long long\"\t: \tFrom 0 to %u\n",ULLONG_MAX);  return 0; 
} 
/* 
```

显示结果为: 

``` c
                        各种数据类型的极限值对照表: 
TYPE    "char"          :       From 2.716e-312f to 0.000e+000f  
TYPE    "short"         :       From 6.953e-310f to 0.000e+000f   TYPE    "int"           :       From 1.#QOe+000f to 0.000e+000f   TYPE    "long"          :       From 1.#QOe+000f to 0.000e+000f  
 TYPE    "゚oat"         :       From 1.175e-038f to 3.403e+038f   TYPE    "double"        :       From 2.225e-308f to 1.798e+308f   TYPE    "long double"   :       From 2.225e-308f to 1.798e+308f   TYPE    "un char"       :       From 0 to 255            
TYPE    "un short"      :       From 0 to 65535           TYPE    "un int"        :       From 0 to 4294967295      TYPE    "un long"       :       From 0 to 4294967295      Press any key to continue 
*/  字符整数互换器.cpp:  # include <stdio.h>  //int L_to_N(); 
//int N_to_L(); 
int main(void){ 
printf("本程序功能:查询字符与所对应的ASCII码\t\n");  int i; 
char ch; 
printf("A Letter Please:\n"); 
scanf("%c",&ch); 
printf("The Char \" %c \" Equals The ASCII Number: %d \n",ch,ch);  printf("A Number Please:\n"); 
scanf("%d",&i); 
printf("The ASCII Number \" %d \" Equals The Char: %c \n",i,i); 
/* printf("1.Letter to Number\n2.Number to Letter\n");  printf("选择菜单对应的数字代码并按enter确认(1 or 2):");  scanf("%c",&j); 
if(j=='1'){ 
L_to_N();  }else if(j=='2'){ 
}*/ 
return 0;  } 
/*int L_to_N(void){ 
return 0;  } 
int N_to_L(void){ 
return 0;  }*/ 
 
N_to_L(); 
```

#### 条件判断

52.else只属于位于else之前没有else的if。

53.尽量少使用! 54.运算符的优先级:所有比较运算符的优先级都低于二元算术运算符,二元逻辑运算符 的优先级低于比较运算符。因此,先执行算术运算再比较,之后执行逻辑操作,括号运 算符优先级一般是运算符列表中最高的。赋值运算符是列表中最后一个。条件运算符高 于赋值运算符。 

55.break在switch的default语句中不是必要的,但是最好是有。这样方便以后提供更 多的case语句,同时default不一定是最后一个case。每个case的顺序不是唯一的。 当case后没break时会执行下一个case语句。 

56.一般少使用goto语句。一般只在嵌套了许多层循环的最内层中退出时,使用goto语 句比采用其他机制简单得多。

57.按位运算符只用于整数类型。操作的是整数中的位。其主要用途是测试并设置整数变 量中的各个位。比如使用windows应用程序编程接口(API),编写PC程序,就会经常 使用各个位来记录各种windows的参数状态。

58.按位运算符的运算规则:
按位与&:2个都是1结果为1否则为0; 按位或|:2个中有一个为1结果就为1,否则为0(全部为0时); 按位非~:翻转,0变1,1变0;
左移位<<:
右移位>>: 带符号:
不带符号: ps:补码:

59.掩码:首先定义一个值,他一般称为掩码,用于选择需要的位。在掩码中,希望保持 不变的位置上包含1,希望舍弃的位置上包含0。接着对这个掩码与要从中选择位的值执 行按位与操作。 

60.scanf读取数据的特点:不需要在一行上输入每个数据项,只需要再输入的每一项之 前流出一个或多个空白即可。(按空格,Tab,或回车都可以创建空白字符)。

61.C语言中,%运算符只能用于整数。 

62.除非控制循环的变量非常靠近循环语句,否则最好在第一个控制表达式中初始化它。 这样可以避免潜在的错误。也可以在第一个控制表达式中声明循环变量此时该变量是循 环的本地变量。循环结束后它就不存在了。 

63.递增(减)的前置形式和后置形式的区别:前置是使用前递增(减),后置是使用后 递增(减)。但是不管使用前使用后,最终递增(减)的变量值都一样。 

64.分数值通常没有浮点数形式的精确表示,所以不应把相等作为结束循环的条件。 

65.do-while循环:在循环结束时(do内语句执行完后)测试循环是否继续,所以这个 循环的语句块至少执行一次。 

66.continue不结束当前循环但要跳过目前的迭代,继续执行下一个迭代。 

67.每步编写都应该编译一下但是不一定要执行,定时编译的原因是为了每步都能确保无 误。

68.键盘缓冲区是用来存储键盘输入的内存,scanf()函数是在键盘缓冲区查找输入数 据,而不是直接从键盘上读取数据。

本章代码:

－ 3_switch实现问答回应.cpp: 

``` c
/*做一个选择并回答*/ 
# include <stdio.h> 
int main(void) 
{ 
char answer = 0; 
// enum {y,Y,n,N}; 
printf("enter Y(y) or N(n) to make a choice:");  scanf("%c",&answer); 
switch(answer) 
{ 
case 'y':case 'Y': 
   { 
   printf("now system is to continue!\n"); 
   } 
    
break;      case 'n':case 'N': 
   { 
   printf("succeefully stopped the operation!\n"); 
   } 
break;  default: 
{ 
printf("enter wrong,bye!\n"); 
} 
break;  } 
return 0;  } 
```

- 3_输入算式式计算器(可扩充).cpp:  

``` c
/*通过输入简单计算式来计算结果*/  # include <stdio.h> 
int main(void) 
{  Start: 
{ 
case '+': 
{ 
printf("\t=%lf\n",number_1+number_2);  break; 
}  case '-': 
{ 
printf("\t=%lf\n",number_1-number_2);  break; 
}  case '*': 
{ 
printf("\t=%lf\n",number_1*number_2);  break; 
 double number_1=0.0, number_2=0.0; 
char operation=0, choice=0; 
printf("Enter the calculation ゙rst:\n"); 
scanf("%lf %c %lf",&number_1,&operation,&number_2);  switch(operation) 
}  case '/':  { 
else  { 
printf("\t=%lf\n",number_1/number_2);  } 
break;  } 
if(number_2 == 0)  { 
printf("\aERROR! division by zero is wrong!\n");  } 
case '%':  { 
else  { 
printf("\t=%ld\n",(long)number_1%(long)number_2);  } 
break;  } 
default:  { 
printf("\aillegal operation!\n"); 
break;  } 
}  Choice_again: 
printf("continue?\nY(y)/N(n):");   
if((long)number_2 == 0)  { 
printf("\aERROR! division by zero is wrong!\n");  } 
 // scanf("%c",&choice); // 这条语句为何没执行 -- scanf()不能读取换行符!!  scanf("%c",&choice); 
// printf("%c",choice); 
while(getchar() != '\n'); //空语句  switch(choice) 
{ 
case 'y':case 'Y':  { 
goto Start; 
break;  } 
case 'n':case 'N':  { 
printf("Thanks for using,BYE!\n"); 
break;  } 
default : //为什么先执行了default?  { 
// printf("%c",choice); 
} 
return 0;  } 
printf("Wrong!choice again!\a\n"); 
goto Choice_again; 
break;  } 
```

- 3_条件运算符判断单词的单复数.cpp:  

``` c
/*使用条件运算符判断单词的单复数、改变提示信息*/  # include <stdio.h> 
int main(void){ 
int dog=0, cat=0, pig=0, pet=0; 
printf("enter the number of each pet you hava already:\n"); 
printf("how many DOG you hava in total? :"); 
scanf("%d",&dog);  
printf("how many CAT you hava in total? :"); 
scanf("%d",&cat);  
printf("how many PIG you hava in total? :"); 
scanf("%d",&pig);  
pet=dog+cat+pig; 
printf("you %shave %s %d%s pet%s in all!\n",pet==1 ? "only " :"",pet<=0 ? "none (caused ゙nally the number is" : "",pet ,pet<=0 ? ")" :"",pet>1 ? "s" :""); 
return 0; 
} 
```

- 3_条件(三目)运算符_折扣.cpp:  

``` c
/*使用条件运算符处理折扣问题--单价$3.5,购买数量超过50折扣15%,超过20折扣10%,超过10折扣5%*/  # include <stdio.h> 
int main(void){ 
int number=0; 
printf("enter the number you wanna buy: "); 
scanf("%d",&number); 
゚oat cost=0.0; 
number>=50 ? cost=3.5*0.85*number : ((number>=20 && number)<50 ? cost=3.5*0.9*number : (number>=10 && number<20) ? cost=3.5*0.95*number : cost=3.5*number); 
printf("you had bought %d ゙nally costs : $%.2f \n",number,cost); 
return 0; 
}     
```

#### 循环

本章代码:  

- 4_do-while输出回文数.cpp:  

``` c
# include <stdio.h> 
int main(void){ 
int number_pre=0,number_ed=0,temp=0;  printf("输入将要转化为回文数的数:");  scanf(" %d",&number_pre); 
temp = number_pre; 
do{ 
number_ed=10*number_ed+temp%10;  temp=temp/10; 
}while(temp); 
printf("%d 对应的回文数是 %d\n",number_pre,number_ed);  return 0; 
}
```

- 4_for循环嵌套.cpp: 

``` c
# include <stdio.h>  /* 
//双重for循环: 
int main(void){ 
int count=0; 
long sum=0L;  printf("请输入你想加的数:");  scanf(" %d",&count); 
for(int i=1;i<=count;i++){ 
sum=0L; 
for(int j=1;j<=i;j++){ 
sum+=j;  } 
printf("%d\t%ld\n",i,sum);  } 
return 0;  } 
*/  //for+while循环:  int main(void){ 
int count=0,j=1; 
long sum=1L;  printf("请输入:");  scanf(" %d",&count);  for(int i=1;i<=count;i++){ 
sum=1L;  j=1;  printf("\n1");  while(j<i){ 
sum += ++j; 
printf("+%d",j);  } 
printf(" = %ld\n",sum);  } 
return 0;  } 
/*  当循环嵌套比较多的时候,可以考虑使用goto语句跳出整个嵌套,而不是用break跳出一层循环。  */ 
```

- 4_浮点类型的循环控制变量.cpp: 

``` c
# include <stdio.h> 
int main(void){ 
/*  //汇总1/1到1/10之间的分数和  double sum = 0.0; 
for(double x=1.0; x<11; x+=1.0){ 
sum += 1.0/x;  } 
printf("%.2lf\n",sum); 
*/ 
for(double x=0.0; x!=2.0; x+=0.2) //分数值通常没有浮点数形式的精确表示,所以不应把相等(或不等)作 为结束循环的条件。 
    { 
printf("%.2lf",x); 
} 
return 0;  }
```

- 4_绘制箱子.cpp: 

``` c
# include<stdio.h>  int main(void){ 
printf("\n***********************\n");  for(int i=1;i<10;++i){ 
printf("*                     *\n"); 
//计算机会一直执行下去 
 }  printf("***********************\n");  return 0; 
} 
```

- 4_任意几个数的平均值.cpp: 

``` c
# include <stdio.h> 
# include <ctype.h> //一律转换为小写  int main(void){ 
double total=0.0,vaule=0.0;  char answer=0; 
int count=0; 
for(;;){ 
printf("Enter a vaule:");  scanf("%lf",&vaule);  total += vaule;  ++count; 
printf("Do you want another vaule?\nYes(y/Y) or No(n/N):"); 
scanf(" %c",&answer);  // while(getchar() !='\n'); 
if(tolower(answer) == 'n'){  break; 
} 
/* else if(answer == 'N') //得益于tolower()函数简化了代码量 
{ 
break; 
}*/ 
/* else if(answer == 'y') 
{ 
printf("Enter a vaule:"); 
scanf("%lf",&vaule);  total += vaule;  ++count; 
} 
else if(answer == 'Y')  { 
printf("Enter a vaule:");  scanf("%lf",&vaule);  total += vaule;  ++count; 
}*/ 
} 
printf("The average is:%.2lf\n",total/count);  return 0; 
}  
```

- 4_一串连续整数求和.cpp:  

``` c
# include <stdio.h> 
int main(void) 
{ 
long sum=0L; 
int i1=0,i2=0;  printf("请输入连续整数的起止数:\n从: ",i1);  scanf("%d",&i1); 
printf("到: ",i2); 
scanf("%d",&i2); 
//方法一: 
/* for(i1=i1;i1<=i2;i1++) //或者写成:for(i2=i2;i2>=i1;i2--)结果一样  { 
sum += i1;  }*/ 
//方法二: 
for(i1=i1;i1<=i2;sum+=i1++); //空循环语句,若把i++改成++i则答案错误,因为是先把原始值加到sum 中在递增,即使用后再递增,故此时使用后置形式  //然而连续整数求和根本不必用for循环,用等差数列求和公式即可: 
// sum = (i1+i2)*(i2-i1)/2;  printf("该串连续整数的和为: %ld\n",sum);  return 0; 
} 
/* 
i1++可以灵活换成其他的,比如i1 += 2,i1+= 7...以汇总一定范围内需要的和(奇数和、偶数和等)  */ 
```

4_章末程序设计之Simon记忆游戏.cpp: 

``` c
# include <stdio.h> 
# include <ctype.h> //会用到toupper()函数 
# include "stdbool.h" //会用到bool变量的true和false("stdbool,h"表示头文件与cpp文件在同一目录下)  # include <stdlib.h> 
# include <time.h> 
int main(void) 
{ 
char another_game = 'Y'; 
bool correct = true; 
int counter=0, sequence_length=0, number=0,time_taken=0; 
time_t seed = 0, now=0;  printf("\v*****************************************************************************\v\n");  printf("\v                         ** 游 ** 戏 ** 说 ** 明 **                          \v\n"); 
printf("\v 1、此游戏名为Simon数字记忆游戏,考验玩家的短时间记忆水平                    \v\n");  printf("\v 2、玩家留意观察屏幕上的一串数字,1秒后数字串就会消失                        \v\n");  printf("\v 3、当屏幕上出现过的数字串消失后,玩家根据记忆输入刚刚出现的数字串           \v\n");  printf("\v 4、输入要求:从第一个开始,输完一个数字后至少用一个空格分开继续输入         \v\n");  printf("\v 5、随着成功记忆次数的增多,数字串将会越来越长,难度越来越高                 \v\n"); 
 printf("\v 6、最终分数由玩家表现得出,受成功记忆次数,成功游戏的时间长短影响           \v\n");  printf("\v 7、选择任意字符按enter进入游戏(提醒:数字串的生成与玩家选择的字符有关)    \v\n");  printf("\v*****************************************************************************\v");  printf("已准备就绪,请玩家随意选择字符开始游戏:"); 
scanf(" %c",&another_game);  do 
{ 
correct = true;  counter = 0;  sequence_length = 2;  time_taken = clock();  while(correct) 
{ 
sequence_length += counter++%3 == 0;  seed = time(NULL); 
now = clock(); 
srand((unsigned int )seed); 
for(int i=1;i<=sequence_length;i++) 
{ 
printf("        %d",rand()%10);  } 
for(;clock() - now < CLOCKS_PER_SEC;);  printf("\r"); 
for(int j=1;j<=sequence_length;j++) 
{ 
printf("                        ");  } 
if(counter == 1)  { 
printf("\n请输入刚刚屏幕出现的数字串:"); //如果想让printf内很多的内容分行显
示,则换行时带上分号"即可  } 
else  { 
printf("\r");  } 
srand((unsigned int )seed); 
for(int k=1;k<=sequence_length;k++)  { 
scanf("%d",&number);  if(number != rand()%10)  { 
correct = false; 
break;  } 
} 
// printf("%s\n",correct ? "Correct!" :"Wrong!\a"); 
printf("%s\n",correct ? "\n输入正确!\n" :"\n输入错误!\a");  } 
time_taken = (clock() - time_taken) / CLOCKS_PER_SEC;   // printf("\nYour scroe is : %d\n\n",--counter*100/time_taken); 
printf("\n玩家最终得分: %d\n\n",--counter*100/time_taken); 
f゚ush(stdin);  // another_game=0; 
// printf("Do you want to paly again ?\tYes(y/Y) or No(n/N):");  printf("继续?—— 选择y(或Y)重新游戏,选择其他终止游戏:");  scanf(" %c",&another_game); 
} 
// while(toupper(another_game == 'Y')); //为何用了toupper()函数运行时输入小写y不能继续游戏?  // while(another_game == 'y' || 'Y'); // 没有包括所有真,因为y和Y不能同时满足 
while(another_game == 'y' || another_game == 'Y');  printf("\nGAME IS OVER!BYE!\n\n"); 
return 0; 
}  没有参数的for循环.cpp:  # include <stdio.h> 
int main(void) 
{ 
char ch=0;  for(;;) 
{ 
printf("\a");  scanf("%c",&ch);  if(ch == 'n') 
{ 
break;  } 
else if(ch == 'N')  { 
break;  } 
} 
printf("SUCCEEFULLY OUT OF THE CYCLE!\n");  return 0; 
} 
```

- 数字猜谜游戏.cpp: 

``` c
# include <stdio.h> 
# include <stdlib.h> //srand()和rand()函数在此库中  # include <time.h> //time()函数在此库中 
int main(void) 
{ 
 printf("This is a guessing game!\n");  int Luck_Number=0,guess=0,count=3, 
limit=20; //limit限制了随机“幸运数”的上限 
/* printf("First ensure the Luck_Number by the referee,it is:"); 
scanf(" %d",&Luck_Number); 
Luck_Number = Luck_Number;  */ 
srand(time(NULL)); //srand()函数能由通过参数传递给它的种子值来初始化序列数,NULL是 在stdlib.h头文件中定义的符号 
Luck_Number = 1+rand()%limit; //在limit范围类生成伪随机整数(‘伪’是因为真正的随机整数只能在自 然的过程中产生,而不是通过算法产生) 
// printf(" Let's start now!!\a\n");  for(;count>0;--count) 
{ 
printf("You have %d tr%s left\n",count,count==1?"y":"ies");  printf("Choice a number from 1 to 20 by the palyer:");  scanf(" %d",&guess); 
if(guess == Luck_Number) 
{ 
printf("LUCKY!you got the right luck number!!\n");  return 0; 
} 
else if(guess<1 || guess >20)  { 
printf("I think I'd said the number must between 1 and 20,Again please!\a\n"); 
count+=1;  } 
/*如何加入对玩家输入非法字符的判断--ASCII对应有数值范围*/  else 
{ 
printf("AHUH!\ait seems you are not lucky today!\"%d\" is not the luck number!\n",guess);  } 
} 
printf("\aSorroy! your times is ゙nished,and the luck number is %d ,GAMEOVER! \n",Luck_Number);  return 0; 
} 
/* 
auto 
break 
case char const continue  default do double 
else enum extern  ゚oat for 
goto 
if inline int  long 
register restrict return 
short signed sizeof static struct switch  typedef 
union unsigned 
void volatile 
while 
_Bool 
_Complex 
_Imaginary 
*/ 
```

- stdbool.h: 

``` c
/* stdbool.h */ 
#ifndef _STDBOOL_H  #de゙ne _STDBOOL_H 
#ifndef _cplusplus 
#if!de゙ned(_STDC_VERSION_)||(_STDC_VERSION_<1999901L)  #if!de゙ned(_GNUC_)||(_GNUC_<3) 
typedef char _Bool; /*For C compilers without _Bool*/ 
# endif 
#endif 
#de゙ne bool _Bool  #de゙ne true 1  #de゙ne false 0 
#else 
/*C++*/ 
#de゙ne bool bool  #de゙ne true true  #de゙ne false false 
#endif 
#de゙ne _bool_ture_false_are_de゙ned 1 
 #endif /*STDBOOL_H*/   
```

#### 数组

69.数组是一组数目固定、类型相同的数据项,数组中的数据项称为元素。数组中的元素个数固 定,每个数组的元素都是int、long或其他类型。例如:long numbers[10];在此数组中,[10]称 为数组维。存储在数组中的每个数据项都用相同的名称访问,这个例子就是numbers。  

70.数组元素的索引值是与第一个元素的偏移量。 

71.指定索引值来访问数组中的某个元素: 
1_用一个简单的整数明确指定要访问的元素; 2_用一个在执行程序期间计算的整数表达式。(相同点是他们的结果必须是整数,且该整数 必须是对数组有效的索引值) 

72.用printf()函数输出变量的地址的时候,得到什么地址值取决于所使用的操作系统和运行本程序 的同时还运行了什么其他的程序。实际的地址值有程序加载到内存的什么地方来决定,而每次执 行程序时,这都是不同的。  

73.如果变量地址间的间隔大于变量占用的字节数,可能是因为程序编译为调试版本时,在调试模 式下编译器会配置额外的空间,以存储变量的其他信息,这些信息在程序以调试模式下执行使 用。  

74.数组名称指定了数组从内存的什么地方开始存储,索引值指定了从开头到所需元素之间有多少 个元素。数组元素的地址是数组开始的地址加上元素的索引值乘以数组中每个元素类型所需的字 节数。  

75.初始化数组就是使数组的每一个元素都有一个值。如果初值个数少于元素数,没有初值的元素 默认初始化成0。如果初值个数大于元素数编译器就会报错。初始化一列元素后,不提供数组的大 小编译器可以自动从初始化的个数推断出元素的个数。  

76.sizeof确定数据类型字节数时要加(),确定变量的字节数可以不加。可以使用sizeof确定数组 中数组元素的个数。sizeof arrows/sizeof arrow_1(2...)
本章代码:  

- 5_输出内存中变量的地址.cpp:  

``` c
# include <stdio.h>
int main(void){
int i=0;
char ch=0;
long j=0L;
unsigned short k=0;
float x=0.0f;
double y=0.0f; printf("%p\n%p\n%p\n%p\n%p\n\%p\n",&i,&j,&ch,&k,&x,&y); return 0;
}
```

- 5_用数组求平均值.cpp: 

``` c
# include <stdio.h>
int main(void)
{
int numbers[10];
float average=0.0f;
long sum=0L;
int count=0; printf("一共有多少个同学:",count); scanf("%d",&count);
// printf("请输入10位同学的成绩:\n"); printf("请输入这 %d 位同学的成绩:\n",count); for(int i=0;i<count;i++){
printf("第 %2d 位:",i+1); scanf("%d",&numbers[i]); sum += numbers[i];
}
average = (float)sum/count; for(int j=0;j<count;j++){
printf("第 %d 位同学的成绩是 %d\n",j+1,numbers[j]); }
printf("这 %d 位同学的平均成绩为:%.2f\n",count,average);
return 0; }
```

- 5_用数组确定帽子尺寸.cpp: 

``` c
# include <stdio.h> 
# include "stdbool.h" 
int main(void)  { 
char size[3][12]={  {'6','6','6','6','7','7','7','7','7','7','7','7'},  {'1','5','3','7',' ','1','1','3','1','5','3','7'},  {'2','8','4','8',' ','8','4','8','2','8','4','8'}  }; 
int headsize[12]={164,166,169,172,175,178,181,184,188,191,194,197};  ゚oat cranium=0.0; 
int your_head=0, i=0; 
bool hat_found=false;  printf("请输入您头部尺寸(单位:英寸):");  scanf("%f",&cranium); 
your_head=(int)(8.0*cranium); 
for(i=1;i<12;i++)  // { 
{ 
if(your_head>headsize[i-1] && your_head<=headsize[i])  { 
hat_found=true;  break; 
    
 }  } 
if(your_head == headsize[0])  { 
i=0; 
hat_found=true;  } 
if(hat_found)  { 
printf("您的帽子尺寸是:%c %c%c%c\n",size[0][i],size[1][i],(size[1][i])==' '?' ':'/',size[2][i]);  // printf(""); 
}  else  { 
else  { 
printf("抱歉!尺寸太大!没有适合您的帽子尺寸\n");  } 
}  //} 
return 0;  } 
if(your_head<headsize[0])  { 
printf("抱歉!尺寸太小!没有适合您的帽子尺寸\n");  } 
```

- 5_章末程序设计之井字游戏.cpp: 

``` c
# include <stdio.h> 
int main(void) 
{ 
printf("\v*****************************************************************************\v\n");  printf("\v                         ** 游 ** 戏 ** 说 ** 明 **                          \v\n"); 
printf("\v 1、此游戏名为“井”字填空游戏,操作简单,类似于五子棋                       \v\n"); 
printf("\v 2、玩家1和玩家2分别有不同选择符号,分别是“X”和“O”,选择后数字被标记覆盖 \v\n");  printf("\v 3、轮流用己方符号去填游戏方块剩余数字所在位置,首先连成对角线的玩家获胜     \v\n");  printf("\v*****************************************************************************\v"); 
start: 
int player=0, //玩家(识别码1或2) 
winner=0, //赢家(非0表示找到获胜者)  choice=0, //方格轮流选择,并确定是否有效  row=0, //方格横下标 
column=0, //方格竖下标 
line=0; //横竖下标用于检查循环  char another_game=0; 
//二维数组定义游戏界面:  char board[3][3]={ 
{'1','2','3'},  {'4','5','6'},  {'7','8','9'}  }; 
//游戏主要的循环:(最多运行9次,未出现胜方将会一直执行循环)  for(int i=0;i<9 && winner==0;i++) 
{ 
//展示游戏界面: 
printf("\n"); 
printf("\t\t\t\t-------------\n"); 
printf("\t\t\t\t| %c | %c | %c |\n",board[0][0],board[0][1],board[0][2]);  printf("\t\t\t\t+---+---+---+\n"); 
printf("\t\t\t\t| %c | %c | %c |\n",board[1][0],board[1][1],board[1][2]);  printf("\t\t\t\t+---+---+---+\n"); 
printf("\t\t\t\t| %c | %c | %c |\n",board[2][0],board[2][1],board[2][2]);  printf("\t\t\t\t-------------\n"); 
player = i%2 + 1; //选择游戏玩家  //获取有效玩家的方块选择:  do 
{ 
printf("\n请 %d 号玩家选择方格中的剩余数字所在位置(标记 %c):",player,(player==1)?'X':'O');  scanf("%d",&choice); 
row = --choice/3; //获取玩家所选方块的横下标 
column = choice%3; //获取玩家所选方块的竖下标 
// board[row][column] == (player == 1) ? 'X' :'O'; //此句开始并未执行是因为错把=写成==,注意赋值与等价问题  } 
while(choice<0 || choice>9 || board[row][column]>'9'); //检查玩家输入是否合法,不合法重新选择 (choice<0、>9、已经选择过的数字位置都为非法输入): 
board[row][column] = (player == 1) ? 'X' :'O'; //插入玩家标志:?没有执行 
//检查获胜线 -- 相同玩家标记是否已经存在三个在一条直线上: 
if((board[0][0]==board[1][1] && board[0][0]==board[2][2]) || (board[0][2]==board[1][1] && board[0] [2]==board[2][0])) 
{ 
winner = player;  } 
//检查获胜线的横竖下标:  else 
{ 
for(line=0;line<=2;line++)  { 
}  } 
}  //输出游戏结果: 
printf("\n"); 
if((board[line][0]==board[line][1] && board[line][0]==board[line][2]) || (board[0][line]==board[1] [line] && board[0][line]==board[2][line])) 
{ 
winner = player;  } 
 printf("\t\t\t\t-------------\n"); 
printf("\t\t\t\t| %c | %c | %c |\n",board[0][0],board[0][1],board[0][2]);  printf("\t\t\t\t+---+---+---+\n"); 
printf("\t\t\t\t| %c | %c | %c |\n",board[1][0],board[1][1],board[1][2]);  printf("\t\t\t\t+---+---+---+\n"); 
printf("\t\t\t\t| %c | %c | %c |\n",board[2][0],board[2][1],board[2][2]);  printf("\t\t\t\t-------------\n"); 
if(winner == 0) 
{ 
printf("好无聊!竟然是平局!\n");  } 
else  { 
printf("恭喜玩家 %d 取得了胜利!\n",winner);  } 
printf("继续?—— 选择y(或Y)重新游戏,选择其他终止游戏:");  scanf(" %c",&another_game); 
if(another_game == 'y' || another_game == 'Y') 
{ 
goto start;  } 
else  { 
return 0;  } 
return 0;  } 
 
printf("\nGAME IS OVER!BYE!\n\n"); 
```

#### 字符串的应用

77.必须把字符串中的双引号写为转义序列\",因为编译器会把双引号看做字符串的结尾。 要在字符串中包含反斜杠,也必须使用转义序列\\,因为字符串中的反斜杠总是表示转义 序列的开头。每个字符串的末尾都田间了代码值为0的特殊字符,这个字符称为空字符(但 跟NULL不一样),写做\0。C中的字符串总是由\0字符结束,所以字符串的长度永远比字 符串的字符数多1。

78.如果printf语句中有2个空字符\0,遇到第一个空字符时printf就会停止输出。即使在字 符串非末尾还有另一个\0,也永远不会执行它。因为只要遇到\0就表示字符串结束了。 

79.声明存储字符串的数组时,其大小至少要比所存储的字符数多1,因为编译器会自动在字 符串常量的末尾添加\0;

80.用数组初始化字符的时候,最好不要人为定义该数组的大小,让编译器自己指定可以确 保它一定正确。 

81.%s指定符用于输出一个用空字符终止的字符串。(空字符\0对应的ASCII是0,对应于布 尔值false) 

82.strcpy()函数会将string2复制到string1中以取代先前存储在string1中的字符串。这个复 杂操作包含终止字符'\0',注意strcpy()函数不会检查数组的大小,这里我们要自己手动检 查。 

83.当源字符串的长度大于将要复制的字符串长度时,strncpy()函数就不会在目标字符串末 尾添加终止符'\0',因此目标字符串没有终止符。以后使用这种目标字符串的时候将会带来很 大的问题。 

84.scanf()函数不适合读入字符串,因为它会将空格解释为输入值的末尾。而gets()函数的 优点是可以从键盘读入所有字符(包含空白),直到按下回车键为止。然后,将字符串存储到 其参数指定的区域中,在字符串的末尾会自动附加一个'\0'字符。 

本章代码: 

- 6_比较两个字符串.cpp: 

``` c
/**
 *字符串比较原理:  如果两个字符串是相同的,他们就是相等的。如果第一个字符串中某个字符的 
 *字符码小于第二个字符串中的 对应字符,则第一个字符串就小于第二个字符串 
 */ 
# include <stdio.h> 
# include <string.h> 
int main(void) 
{ 
char word_1[20],word_2[20]; 
printf("Type in the ゙rst word(less than 20):\n"); 
scanf("%19s",word_1); //数组名本身就是地址,故这里不需要使用取地址符&,19限制了用户输入的字符 在20内,不会超过数组的长度 
printf("Type in the second word(less than 20):\n"); 
scanf("%19s",word_2); 
if(strcmp(word_1,word_2) == 0) //strcmp()函数返回一个大于0、小于0或等于0的int值,对应于前者大于 小于或等于后者 
{ 
printf("You have entered the identical word.\n");  } 
else  { 
} 
return 0;  } 
```

- 6_空字符的运作.cpp: 

``` c
# include <stdio.h> 
int main(void) 
{ 
printf("完全显示结果为:\\\"."); 
printf("\n不完全显\0示结果为:\n"); 
printf("\n");  printf("出现这样的原因是:\n如果printf语句中有2个空字符\\0,遇到第一个空字符时printf就会停止输 出。即使在字符串非末尾还有另一个\\0,也永远不会执行它。因为只要遇到\\0就表示字符串结束 了。\n"); 
return 0;  } 
```

- 6_连接字符串.cpp:

``` c
# include <stdio.h>  int main(void) 
{ 
    printf("%s precedes %s\n",(strcmp(word_1,word_2)<0) ? word_1:word_2, 
  (strcmp(word_1,word_2)<0) ? word_2:word_1); 
 char str_1[40]="To be or not to be";  char str_2[]=",this is the question";  int count_1=0,count_2=0;  while(str_1[count_1] != '\0') 
{ 
count_1++; //count充当计数器 
} 
//count=0; 
printf("字符串 \"%s\" 包含 %d 个字符\n",str_1,count_1); //如果双引号前面没有转义序列标识符\,编译 器会将它当做printf()函数第一个参数的字符串结尾 
while(str_2[count_2] != '\0') 
{ 
count_2++;  } 
printf("字符串 \"%s\" 包含 %d 个字符\n",str_2,count_2);   // strlen(str_1); 
if(sizeof str_1 < count_1 + count_2 +1)  { 
printf("长度不够,不能合并!\n");  } 
else  { 
printf("\n%s\n",str_1);  } 
return 0;  } 
```

- 6_使用库函数复制字符串.cpp: 

``` c
# include <stdio.h> 
# include <string.h> 
int main(void) 
{ 
char destination[] = {"This string will be replaced."}; 
char source[] = {"This string will be copied in part."}; 
printf("Watch out the destination string and source string before copy:\n\n"); 
printf("%s\n",destination); 
printf("%s\n",source); 
size_t n = 26; 
strncpy(destination,source,n); 
printf("\nWatch out the destination string and source string after copy:\n\n"); 
printf("%s\n",destination); //为何没有带终止符'\0'一起复制到字符串末尾?-- 只有当source少于26时才会 在末尾添加终止符'\0' 
printf("%s\n",source); 
return 0; 
} 
```

- 6_使用字符串库函数.cpp:

``` c
# include <stdio.h> 
# include <string.h> 
# include <stddef.h> 
# de゙ne STR_LENGTH 40  int main(void) 
{ 
char str_1[STR_LENGTH]={"To be or not to be"};  char str_2[STR_LENGTH]={",that is the question."};  if(STR_LENGTH>=strlen(str_1)+strlen(str_2)) 
{ 
printf("%s\n",strcat(str_1,str_2));  } 
else  { 
printf("You don't have enough space to link the two strings.\n");  } 
return 0;  } 
```

- 6_使用字符分类函数.cpp: 

``` c
# include <stdio.h> 
# include <string.h> 
# include <ctype.h> 
int main(void) 
{ 
char buffer [80]; 
int i=0,num_letters=0,num_digits=0; 
printf("Enter an interesting string of less than in 80 characters:\n");  gets(buffer); 
if(gets(buffer) == NULL) 
{ 
printf("Error input !\a\n"); 
return 1;  } 
//第一种写法  while(buffer[i] != '\0') 
count_2=0;  while(str_2[count_2])  { 
str_1[count_1++] = str_2[count_2++];  } 
str_1[count_1]='\0'; 
 { 
if(isalpha(buffer[i])) 
{ 
num_letters++; 
}  if(isdigit(buffer[i++]))  { 
num_digits++;  } 
} 
/*  //第二种写法(不用if)  while(buffer[i] != '\0')  { 
num_letters += isalpha(buffer[i]) != 0; 
num_digits += isdigit(buffer[i++]) != 0;  } 
*/ 
printf("Your string contained %d letters and %d digits.\n",num_letters,num_digits);  return 0; 
} 
```

- 6_在字符串中查找字符串.cpp: 

``` c
# include <stdio.h> 
# include <string.h> 
int main(void) 
{ 
/* char text[] = {"Every dog has his day."}; 
char word[] = {"dog"};  char *pFound = NULL;  pFound = strstr(text,word); 
*/ 
char str_1[] = "This string contains the holy grail.";  char str_2[] = "the holy grail"; 
char str_3[] = "the holy griil"; 
if(strstr(str_1,str_2) == NULL) 
{ 
printf("\'%s\' was not found.\n",str_2);  } 
else  { 
printf("\'%s\' was found in \'%s\'\n",str_2,str_1);  } 
if(strstr(str_1,str_3) == NULL)  { 
printf("But \'%s\' was not found in \'%s\'\n",str_3,str_1);  } 
else  { 
printf("We are shouldn't get to there.\n");  } 
return 0;  } 
```

- 6_章末程序设计之确定单词的出现频率.cpp:  

``` c
# include <stdio.h> 
# include <string.h> 
# include <ctype.h> 
# include <stdbool.h> 
# de゙ne TEXTLEN 10000  # de゙ne BUFFERSIZE 100  # de゙ne MAXWORDS 500  # de゙ne WORDLEN 15 
int main(void)  { 
char text[TEXTLEN+1],  buffer[BUFFERSIZE], 
endstr[]="*\n", //结束标志:星号*  words[MAXWORDS][WORDLEN+1],  word[WORDLEN+1]; //存储单个单词的数组 
int nword[MAXWORDS], //存储单词出现频率的数组  wordlen=0, //一个单词的长度 
wordcount=0; //已经存储过的单词数量 
const char space = ' ';  const char quote = '\''; 
printf("Enter text on an arbitrary number of lines.\n");  printf("Enter a line containing just an asterisk to end input:\n");  //读取任意数量的文本行数 
while(true) 
{ 
if(!strcmp(fgets(buffer,BUFFERSIZE,stdin),endstr))  { 
break;  } 
if(strlen(text)+strlen(buffer)+1>TEXTLEN)  { 
 printf("Maximum capacity for text exceeded.Terminating program\n"); //结束程序 
return 1;  } 
strcat(text,buffer);  } 
//用空格覆盖单词外的其他字符  for(int i=0; i<strlen(text); i++) 
{ 
if(text[i] == quote || isalnum(text[i]))  { 
    continue; 
text[i]= space;  } 
}  //找出不同的单词并且存入单词数组中  int index = 0; 
while(true) 
{ 
while(text[index] == space)  { 
++index; 
} 
if(text[index] == '\0')  { 
break;  } 
int wordlen = 0; //重置单词长度 
while(text[index] == quote || isalnum(text[index]))  { 
if(wordlen == WORDLEN) //检查单词是否过长  { 
printf("Maximum word length exceeded.Terminating program\n"); //结束程序 
return 1;  } 
word[wordlen++] = tolower(text[index++]); //复制  } 
word[wordlen] = '\0'; //加入字符串终结标记  //检查已经存好的单词 
bool isnew = true; 
for(int j=0; j<wordcount; j++) 
{ 
if(strcmp(word,words[i]) == 0)  { 
++nword[i];  isnew = false;  break; 
}  if(isnew)  { 
if(wordcount >= MAXWORDS)  { 
printf("Maximum word count exceeded.Terminating program\n"); //结束程序 
return 1;  } 
strcpy(words[wordcount],word); //存储新单词 
nword[wordcount++]=1; //计数器置为1  } 
} 
for(int k=0; k<wordcount;k++)  { 
if(!(k%3))  { 
printf("\n");  } 
printf(" %-15s%5d",word[k],nword[k]);  } 
} 
return 0;  } 
```

6_转换字符.cpp: 

``` c
/*  使用函数toupper()和strstr()可以判断一个字符串是否存在于另一个字符串中,忽略大小写  */ 
# include <stdio.h> 
# include <ctype.h> 
# include <string.h> 
int main(void) 
{ 
char text[100],substring[40]; 
printf("Enter the string to be searched(less than 100 characters):\n"); 
fgets(text,sizeof(text),stdin); //这里使用fgets()函数比gets()更安全 
printf("Enter the string sought(less than 40 characters):\n"); 
fgets(substring,sizeof(substring),stdin); 
//用终止符覆盖换行符 
text[strlen(text)-1]='\0'; 
substring[strlen(substring)-1]='\0'; 
printf("First string entered : \n%s \n",text); 
printf("Second string entered :\n%s \n",substring); 
for(int i=0;(text[i])=(toupper(text[i]));i++); 
for(int j=0;(substring[j])=(toupper(substring[j]));j++); //为啥这里不能继续定义i 
printf("The second string %s found in the ゙rst string.\n",((strstr(text,substring)==NULL) ? "was not" : "was")); 
 return 0;  } 
/* 
显示结果为: 
Enter the string to be searched(less than 100 characters):  TO UNDERSTAND THE WORLD. 
Enter the string sought(less than 40 characters): 
world. 
First string entered : 
TO UNDERSTAND THE WORLD. 
Second string entered : 
world. 
The second string was found in the ゙rst string. 
Press any key to continue 
*/ 
```

- 6_字符串数组.cpp:  

``` c
# include <stdio.h>  int main(void) 
{ 
char saying[][32] = { 
"Manners makes the man.", 
"Many hands make light work.",  "Too many cooks spoil the broth." 
}; 
for(int i=0;i<3;i++)  { 
printf("%s\n",saying[i]);  } 
return 0;  } 
```

#### 指针

85.指针是C语言高效编程的一个基本元素。

86.在源程序中,变量名是固定不变的,但地址在不同的 系统、不同的计算机、不同的编译器上都是不同的。  

87.可以存储地址的变量称为指针。存储在指针中的地址 通常是另一方变量。  

88.void*类型的指针可以包含任意类型的数据项地址。类 型void*常常用作参数类型,或以独立于类型的方式处理 数据的函数的返回值类型。任意类型的指针都可以传送 为void*类型的值,在使用它时,再将其转换为合适的类 型。  

89.没有初始化的指针是非常危险的。因为在使用指针存 储一个值的时候,谁也不知道会覆盖什么内容。初始化指 针为NULL,NULL是在标准库中定义的一个常量,对于指 针他表示0,即相当于数字0的指针。NULL是一个不指向 任何内存位置的值。这表示,使用不指向任何对象的指 针,不会意外覆盖内存。NULL在头文件 <stddef.h>/<stdlib.h>/<stdio.h>/<string.h>/<time.h>/ <wchar.h>/<locale.h>中定义。  

90.使用间接运算符*可以访问指针所指的变量值。这个运 算符也称为取消引用运算符(Dereferencing Operator)。 

91.指针可以包含同一类型的任意变量的地址,所以使用 一个指针变量可以改变其他许多变量的值,只要他们的类 型与指针相同。 

92.数组和指针的区别:数组名和指针名都代表地址,只 不过数组的地址不能改变,而指针的地址可以改变。 

93.声明二维数组的时候,就是在创建一个数组的数组, 因此,在用数组名称和索引值访问这个二维数组时,就是 在引用一个子数组的地址。仅使用二维数组的名字,就是 引用二维数组的开始地址,它也是一维数组的开始地址。 

94.在程序执行期间分配内存时,内存区域的这个空间被 称为堆(heap)。还有另一个内存区域,称为(stack), 其中的空间分配给函数的参数和本地变量。在执行完该函 数后,存储参数和本地变量的内存空间就会被释放,以便 以后重用它们。 

95.不能取消对void指针的引用。 

96.calloc()分配内存与malloc()分配不一样,calloc()分配的内存空间都会初始化为0。 

97.内存泄露:当动态分配了一些内存时没有保留对他们 的引用,这样就会引起内存泄露,此时无法释放内存,通 常发生在循环内部。由于没有释放多余的内存,程序最终 将会占用所有的内存。 

本章代码:  

- 7_1_声明指针.cpp:  

``` c
#include <stdio.h> 
int main(void) 
{ 
int number=0, 
    *pointer=NULL; //表示pointer指向一个int类型的变量,这
 样声明后pointer变量内只能存储地址  number = 10; 
printf("Number's address is : %p\n",&number); //%p表示以十六 进制输出的地址 
printf("Number's value is : %d\n",number); 
pointer = &number; 
printf("Pointer's address is : %p\n",&pointer);  printf("Pointer's value is : %p\n",pointer);  printf("Pointer's size is : %d bytes.\n",sizeof(pointer));  printf("Value pointered to : %d\n",*pointer); 
return 0;  } 
```

- 7_2_使用指针.cpp:  

``` c
#include <stdio.h>  int main(void) 
{ 
long num_1=0L,num_2=0L,*pnum=NULL;  pnum=&num_1; 
*pnum=2; 
printf("num_1=%ld\n",num_1);  ++num_2;  printf("num_2=%ld\n",num_2); 
num_2 += *pnum;  printf("num_2=%ld\n",num_2);  pnum=&num_2;  printf("*pnum=%ld\n",*pnum); 
// *(++pnum); 
++(*pnum); //运算符++和*(以及&)的优先级相同,且都是从右 往左执行,为了百分百区分递增的是数值和地址,最好每次都 使用括号 
printf("*pnum=%ld\n",*pnum);  printf("num_1=%ld\nnum_2=%ld\n*pnum=%ld\n*pnum+num_ 2=%ld\n",num_1,num_2,*pnum,*pnum+num_2); 
return 0; 
} 
```

- 7_3_scanf()与指针的使用.cpp: 

```c
/*本例子仅仅说明指针和变量可以一起使用*/  #include <stdio.h> 
int main(void)  { 
int value=0,  *pvalue=NULL; 
pvalue=&value; 
printf("Enter a number:"); 
scanf("%d",pvalue); //pvalue在这里等价于&value  printf("You entered : %d\n",value); 
return 0; 
} 
```

- 7_4_数组和指针(上).cpp: 

``` c
#include <stdio.h> 
int main(void)  { 
char multiple[]="My String",  *p=&multiple[0]; 
printf("The address of the ゙rst array element:%p\n",p);  p=multiple; 
printf("The address obtained from the array name:%p\n",p);  return 0; 
} 
```

- 7_5_数组和指针(下).cpp: 

``` c
#include <stdio.h>  #include <string.h> 
int main(void) 
{ 
char multiple[]="a string",  *p=multiple; 
for(int i=0;i<strlen(multiple);i++)  { 
 printf("\nmultiple[%d]=%c*(p+%d)=%c &multiple[%d]=%p p+%d=%p\n",i,multiple[i],i,* (p+i),i,&multiple[i],i,p+i); 
} 
return 0;  } 
```

- 7_6_不同类型的数组.cpp:  

``` c
#include <stdio.h> 
int main(void) 
{ 
long multiple[]={15L,25L,35L,45L}; 
long *p=multiple; 
for(int i=0;i<sizeof(multiple)/sizeof(multiple[0]);i++)  { 
printf("address p+%d (&multiple[%d]): %d*(p+%d)
value:%d\n",i,i,p+i,i,*(p+i));  } 
printf("Type long occupies: %d bytes\n",sizeof(long)); 
return 0;  } 
  7_7_多维数组和指针的关系.cpp:  #include <stdio.h> 
int main(void)  { 
char board[3][3]={  {'1','2','3'},  {'4','5','6'}, 
{'7','8','9'}  }; 
printf("The address of board\t\t:%p\n",board);  printf("The address of board[0][0]\t:%p\n",&board[0][0]);  printf("The address of board[0]\t\t:%p\n\n",board[0]); 
printf("The value of **board\t\t:%c\n",**board);  printf("The value of board[0][0]\t:%c\n",board[0][0]);  printf("The value of *board[0]\t\t:%c\n",*board[0]);  return 0; 
} 
/* 
总结:  1.前三个输出之所以一样,是因为它们指向的都是同一个元素 -- '1'的 地址;  2.后三个输出之所以一样,是因为它们指向的都是同一个元素 -- '1';  3.取消运算符*不一定定义指针的时候才能用,在表示地址的变量前都 可以使用取消运算符*。 
*/ 
```

- 7_8_得到二维数组中的所有值.cpp: 

``` c
#include <stdio.h> 
int main(void)  { 
char board[3][3]={  {'1','2','3'},  {'4','5','6'}, 
{'7','8','9'} 
}; 
//输出board数组的所有值  /*//第一种方法:用数组名称引用数组 
for(int i=0; i<9; i++) 
{ 
// printf("board[%d][%d] : %c \n",i,i,*(*board+i)); 
printf("board : %c \n",*(*board+i));  } 
*/ 
//第二种方法:用指针引用数组 
//char *pboard=*board;  //错误的初始化:pboard=board;错误的原因是,两者级别不 同。pboard引用的地址只包含一个char类型的值,board引用的 地址却包含二个char类型的值 
 char *pboard=&board[0][0]; 
for(int i=0; i<9; i++) 
{ 
// printf("board[%d][%d] : %c \n",i,i,*(*board+i)); 
printf("board : %c \n",*(pboard+i));  } 
return 0;  } 
```

- 7_9_用指针重写帽子尺寸例子.cpp:  

``` c
#include <stdio.h> 
#include "stdbool.h" 
int main(void)  { 
char size[3][12]={  {'6','6','6','6','7','7','7','7','7','7','7','7'},  {'1','5','3','7',' ','1','1','3','1','5','3','7'},  {'2','8','4','8',' ','8','4','8','2','8','4','8'}  }; 
int headsize[12]= {164,166,169,172,175,178,181,184,188,191,194,197};  char *psize=*size; 
int *pheadsize=headsize; 
゚oat cranium=0.0; 
int your_head=0, i=0; 
bool hat_found=false; 
bool too_small=false;  printf("请输入您头部尺寸(单位:英寸):");  scanf("%f",&cranium);  your_head=(int)(8.0*cranium); 
for(i=0; i<12; i++) 
{ 
if(your_head > *(pheadsize+i))  { 
continue;  } 
if((i==0)&&(your_head < (*pheadsize)-i))  { 
printf("没有适合您的帽子尺寸\n");  too_small=true; 
break; 
}  if(your_head<*(pheadsize+i)-1)  { 
i--; 
printf("您的帽子尺寸是:%c %c%c%c\n",* (psize+1),*(psize+1*12+i),(i==4)?' ':'/',* (psize+2*12+i)); 
hat_found=true; 
break; 
}  } 
if(!hat_found && !too_small)  { 
printf("没有适合您的帽子尺寸\n");  } 
return 0;  } 
```

- 7_10_动态分配内存之产生质数.cpp: 

``` c
#include <stdio.h> 
#include <stdlib.h> 
#include "stdbool.h" 
int main(void)  { 
unsigned long *primes=NULL; ////初始化指针,准备好存储空间,
指向质数存储空间的指针 
  unsigned long trial=0; //trail--试验次数、将被测试的整数 
bool found = false; ////显示何时找到一个质数 
size_t total=0; //size_t -- 属于stdlib.h里面的定义函数,意思是无 符号整数类型、用户要求找出的质数个数--需要找到多少个质 数 
 size_t count=0; ////已找到质数的个数  printf("请输入你需要找到多少个质数:");  scanf("%u",&total); 
total = total<4U ? 4U :total; //确保至少4个 
//分配足够的空间以存储需要存储的质数个数:  primes=(unsigned long *)malloc(total*sizeof(unsigned long));  // primes = (unsigned long *)calloc(total,sizeof(unsigned long)); 
if(primes==NULL)  { 
printf("\aNot enough memory! End the program.\n"); 
return 1;  } 
//已知的三个质数  *primes=2UL;  *(primes+1)=3UL;  *(primes+2)=5UL;  count=3U; 
trial=5U;  //开始寻找所需要的质数  while(count<total) 
{ 
trial += 2UL; //下一个待查找的值  for(size_t i=0; i<count; i++) 
{ 
if(!(found = (trial % *(primes+i))))  { 
break;  } 
}  if(found)  { 
*(primes+count++)=trial; //存储质数并递增count  } 
} 
for(size_t i=0; i<total;i++)  { 
if(!(i%5U)) //5个质数一行  { 
printf("\n");  } 
printf("%10lu",*(primes+i));  } 
printf("\n"); 
return 0;  } 
```

- 7_11_释放动态分配的内存.cpp: 

``` c
#include <stdio.h> 
#include <stdlib.h> 
#include "stdbool.h" 
int main(void)  { 
unsigned long *primes=NULL; ////初始化指针,准备好存储空间,
指向质数存储空间的指针 
  unsigned long trial=0; //trail--试验次数、将被测试的整数 
bool found = false; ////显示何时找到一个质数 
size_t total=0; //size_t -- 属于stdlib.h里面的定义函数,意思是无 符号整数类型、用户要求找出的质数个数--需要找到多少个质 数 
size_t count=0; ////已找到质数的个数  printf("请输入你需要找到多少个质数:"); 
scanf("%u",&total); 
total = total<4U ? 4U :total; //确保至少4个  //分配足够的空间以存储需要存储的质数个数: 
// primes=(unsigned long *)malloc(total*sizeof(unsigned long));  primes = (unsigned long *)calloc(total,sizeof(unsigned long)); 
if(primes==NULL)  { 
printf("\aNot enough memory! End the program.\n"); 
return 1;  } 
 //已知的三个质数  *primes=2UL;  *(primes+1)=3UL;  *(primes+2)=5UL;  count=3U; 
trial=5U;  //开始寻找所需要的质数  while(count<total) 
{ 
trial += 2UL; //下一个待查找的值  for(size_t i=0; i<count; i++) 
{ 
if(!(found = (trial % *(primes+i))))  { 
break;  } 
}  if(found)  { 
*(primes+count++)=trial; //存储质数并递增count  } 
} 
for(size_t i=0; i<total;i++)  { 
if(!(i%5U)) //5个质数一行  { 
printf("\n");  } 
printf("%10lu",*(primes+i));  } 
printf("\n"); 
return 0;  } 
```

- 7_12_realloc()重新分配内存.cpp:  

``` c
# include <stdio.h> 
# include <stddef.h> 
# include <malloc.h> 
int main(void)  { 
//用一个指针存储数据:  long *pData = NULL;  //定义2个计算值 
size_t count=0, //数据项的值 
oldcount=0; //以前的计算值  while(true) 
{ 
//保存先前的值: 
oldcount = count;  printf("你想要多少个值:");  scanf("%u",&count); 
if(count == 0) //如果没有,则我们任务完成  { 
if(!pData) //判断是否已经被分配  { 
free(pData); //释放  } 
break; //退出循环  } 
//分配充足的空间来存储count的值:  //先判断空间是否充足 
if(pData && (count <= oldcount)) 
{ 
pData = (long *)realloc(pData,sizeof(long)*count);  } 
//如果内存不足  else 
{ 
//如果有旧空间  if(pData) 
{ 
free(pData); 
 }  } 
if(pData == NULL)  { 
printf("内存不足!\n"); 
return 1;  } 
return 0;  } 
 
} 
//重新分配一块空间: 
pData = (long *)calloc(count,sizeof(long)); 
```
