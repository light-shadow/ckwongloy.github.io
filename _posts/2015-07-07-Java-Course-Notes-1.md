---
layout: post
title: 《Java SE》 听课笔记[一]
category: Java
tag: Java
latest: 2015-07-28 17:02:44
---

#### 0

- 高效而愉快地学习。
- 先建立一个整体框架，然后再细节。
- 用的什么再学什么。
- 先 know how, 再 know why。
- 软件编程是一门"做中学"的学科，不是会了才做，而是做了才会。
- 适当地囫囵吞枣。
- 盛大传奇。
- 腾讯曾欲抛弃 QQ (100W) 给新浪,然而新浪嫌贵(50W)没有买。  
- 不会用线程就别说自己学过 JAVA
- 人无我有 人有我精 人精我转 
- 人都不知道怎么做,是不可能让程序帮你做的!!! 
- SEO -- 搜索引擎算法 -- 百度/谷歌 -- 百度竞价排名 -> 通过 SEO 可以使得不付给百度前就获得较高的搜索排名。
- 衡量程序员：数据库 + 网络 + 面向对象( + 界面 + 业务逻辑 ) 
- 一流公司做标准(美国) 二流公司做服务 三流公司做产品 四流公司做项目(中国) 
- A 类 ip 几乎全在美国 
- 中国不是不能做软件,核心软件市场大都被美国垄断了,新鲜事物公司一般不敢使用。   
- 网络映射 -> 速度慢 
- 模仿优秀案例是学习的一种捷径 
- screen ruler
- Java 编程方向有哪些? 
  以 Java 为核心辐射出三个方向: 
  1Java SE( J2SE ): 桌面开发 -- 单机版/CS 版,Java SE 是基础,为 Java EE 奠定基础;  
  2Java EE( J2EE ): Web 开发 -- 网站; 
  3Java Me( J2ME ):手机开发 -- 手机游戏,Android/Blackberry。 
1. Java 的强处是什么? 
   —— 后台。虽然 Java 可以做图形界面 -- 如 Swing,但是不是其强项。图形界面多用 Delphi(界面之王)或者 VC。 
2. 为什么要学习数据库? 
   —— 没有数据库的项目没有什么实际价值。学习 Java 主要学 Oracle。 
3. 网络编程的重点有哪些? 
   ——通道主要就是 socket 套接字编程。 
4. 什么是多线程? 
   —— 游戏方面有设计,如坦克大战。 
5. 什么是 Java ? 
    —— 号称“一次编写,处处运行” 的计算机编程语言。

6. Java 运行原理：
   Java 源文件 a.java 经过 Java 编译器 javac 编译成字节码文件 a.class，然后由 Java 解释执行器 java.exe 将 a.class 加载到 JVM 中执行。
   可知，Java 并非直接运行在操作系统上的，而是每个操作系统上都虚拟出一个适合 Java 运行的环境。

7. JDK 和 JRE 可以分开安装。
- hello-world.java
``` java
/* ******************
* lamChuanJiang
* My First Java Demo * 2015-07-30 18:36:13 * ******************* */ public class Test
{
public static void main( String args[] ){
System.out.println( "Hello World.\nI am Chuanjiang Li." ) ;
} }
// public : 表示这个类是共有的,一个 java 文件只能有一个 public 类  // Hello : 公共类的类名必须和文件名一致 
// System.out : Java 的一个包,println 是其的一个函数 
// 编译 Java 程序:javac Test.java
// 如果因为中文字符报错,编译时执行:  // javac -encoding UTF-8[gbk] Test.java // 运行 Java 程序:java Test
```

#### Java 基础语法

- 为什么有变量？Java 中的变量和 C/C++ 中的变量差别大吗？

变量是程序世界的基本组成单位。既然有变量就会有变量类型，Java 中浮点数默认是 double 型，如果要 float 型则需要在值后面带 f。

- char(2 Bytes) 是基本数据类型，而 String 是类，类是符合数据类型，类似于 C中的结构体。

- 在 Java 中，对 char 类型进行计算的时候，直接当作 ASCII 码对应的整数对待。
- Java 类型转换结论：自动 低精度 => 高精度。类／接口可以当作数据类型定义变量；子类不能转为父类。

- switch 中可用的数据类型有：byte, short, int, char, enum 等。
- 金字塔：

``` java
/* ************************************** * lamChuanJiang
* 循环的应用:打印金字塔 
* 2015-07-30 18:36:13
* javac -encoding UTF-8 Test.java
* java Test
* *************************************** */ 
public class Test
{
  public static void main( String args[] ){ System.out.println( "\t普通金字塔" ) ; int lay = 10 ;
  for( int i=1; i<=lay; i++ ){
   } }
  for( int k=1; k<=lay-i; k++ ){ System.out.print( " " ) ;
  }
  for( int j=1; j<=( i-1 )*2+1; j++){
  System.out.print( "*" ) ; }
  System.out.println( ) ; }
  System.out.println( "\t镂空金字塔" ) ; for( int i=1; i<=lay; i++ ){
  for( int k=1; k<=lay-i; k++ ){ System.out.print( " " ) ;
  }
  for( int j=1; j<=( i-1 )*2+1; j++){
  if( 1==i || lay == i){
  System.out.print( "*" ) ; }else{
  if( 1==j || ( i-1 )*2+1 == j ){ System.out.print( "*" ) ;
  }else{
  System.out.print( " " ) ;    // print() 不自动换行
  } }
  }
  System.out.println( ) ;    // println() 自动换行
 }
// public static void main(){} 可以放在类中。作为程序入口。 
```

####  Java 面向对象

- Java 面向对象有什么不同?面向对象的特点有哪些? 
  Java 是纯度很高的面向对象编程语言,Java 最大的特点就是面向对象。 
  C 是面向过程等高级语言，Java 是面向对象的高级语言，汇编是面向机器的低级语言。

- 面向对象四大特点：抽象、封装、继承、多态。

- 四种级别的访问范围：
  - 同类：public、protected、private、默认无。
  - 同包：public、protected、默认无。
  - 子类：public、protected。
  - 不同包：public。

- 继承是解决代码复用的有用特性， Java 是单继承。Java 所有类 都是 Object 类的子类。

- 方法重载：类的同一种功能的多种实现方式，到底采用哪种方式取决于调用者给出的参数。overload 时方法名相同；方法的参数类型，个数，顺序至少有一个不同；方法的返回类型可以不同；方法的修饰类型可以不同。但是，如果只有返回值类型或修饰符不一样，是不能构成重载的。

- 方法覆盖：子类的某个方法，和父类某个方法的名称、返回值、参数都完全一样（也必须顽强一样才会通过编译），则子类的这个方法就覆盖了父类的方法。注意：子类的方法不能缩小父类方法的访问权限。

- Java 的构造方法具有的特征是：方法名和类名相同；没有返回值；在创建类对象的时候会自动调用；每个类都有一个默认的构造方法。注意的是：不要在构造方法里加入多余的功能；如果在创建对象的时候没有加参数报错，那么可以将默认的构造方法显示地重写一遍。


- 类和对象

类是抽象的，概念的，代表的是一类事物；对象是具体的，实际的，代表一个具体事物；类是对象的模版，对象是类的一个个体、实例。

- 静态变量(类变量):static int variable_name ;  所有对象和类都可以通过 `.` 去访问该静态变量,适用于公共属 性的操作,注意普通变量是不能通过类名来访问的。**类变量可以提高代码运行效率**。
  注意：**当一个类一旦被定义的时候,那么该类中的代码中 static 修饰的代码块将会被拷贝至内存的代码区,就算不创建该类的对象,也会触发 static 属性的代码**。 

与类变量对应的是实例变量。同理还有静态方法。

``` java
static
{
  i++ ;
}

// 访问静态变量
类名.类变量 或 对象名.类变量
```

- 抽象类和构造方法

``` java
abstract class Demo
{ 
  int x = 10 ; 
  public Demo() { 
    System.out.println( "1. 抽象类中允许有构造方法" ) ; 
    System.out.println( "抽象类中的 x1 = " + this.x ) ; 
    this.print() ; 
  } 

  public abstract void print() ; 
} 
 
class Run extends Demo { 
  int x = 100 ; 
  public Run( int x ) { 
  System.out.println( "2. 继承抽象类的子类并不能覆盖抽象父类的构造函数( 函数名也不一样 )" ) ; 
  System.out.println( "继承抽象类中的子类中的 x2=" + this.x ) ; 
  this.x = x ; 
  System.out.println( "继承抽象类中的子类中的 x3=" + this.x ) ; 
  this.print() ; 
  } 
  public void print() { 
  System.out.println( "x4=" + this.x ) ; 
  } 
} 
 
class Test { 
public static void main( String [] args ) { 
new Run( 1000 ) ; 
} 
} 
```

- 按引用传递的特点是什么?  
  相当于一个指针,如果有多个引用(对象名)指向同一个对象(已实例化),那么某个引用对对象的访问和操 作都是全局的。 

- 对象在内存中是怎样存在的? 
  有一个引用,如对象名,指向该对象。 

- 什么是垃圾回收机制(gc)? 
  当一个对象没有引用指向它后,Java 则认为该对象是垃圾,就会在适当的时候,自动回收该对象所占的空 间。GC 是 java 与 c++ 最大的区别。但是 java 也仍然有内存泄漏问题,只不过很少发生。 

- Java 命名规范? 
  类名大写,函数名使用匈牙利法(驼峰法),下划线法。命名规范的重点不在形式而是统一。 

- Java 的重载与 C++ 有什么区别吗?重载和重写有什么区别? 
  原理相同。但都不会根据返回值的不同来执行同名函数,只能根据参数的不同来区分。 

- 函数执行的原理是怎样的? 
  函数名会保存在栈中。每调用一个函数就会开辟一个新栈。函数执行完毕后,就会自动带着返回值(如果有的 话)回到调用它的地方。 

- 什么是 this 指针? 
  —— this 代表实例化的当前对象,而不是属于类,在创建对象的时候自动带有的属性。就相当于每个人(对象)都 会说“我的... ...”,this 就相当于 “我的”。在不至于引起混淆的情况下,this 可以省略。 
  ·注意:this 不能再类定义的外部使用,只能在类定义的方法中使用。 

- 到底什么是多态?多态有什么特点?多态的使用有哪些注意事项? 
  在继承的基础上得来的。子类如果重写了父类的同名方法那么就执行子类的方法,否则执行父类方法。在一定 程度上提高了代码的灵活性。

将一个方法调用，同这个方法所属的主体关联起来的操作叫绑定，可分为前期绑定和后期绑定。

前期绑定，指的是在程序运行之前绑定，由编译器和链接程序实现，又叫做静态绑定。比如 static 方法和 final 方法，注意，也包括 private 方法，因为它是隐式 final 的。(同 C++的静态联编)

后期绑定，指的是在运行时根据对象的类型进行绑定，由方法调用机制实现，因此又叫做动态绑定，或者运行时绑定。除了前期绑定的所有方法都属于后期绑定(同 C++ 的动态联编)

多态就是在后期绑定这种机制上实现的。多态的好处是消除了类之间的耦合，是程序更容易扩展。

- 为什么需要包?什么是包? 
  为了使同名类不冲突（类似 C++ 中的命名空间）。包名小写。在 Eclipse 中新建 Package,然后将相应的类打包。打包命令都是放在类 定义的前面,格式为: package com.package_name ; 该命令是将包中类的字节码放到 com.package_name 中去。 

包的作用主要有：区分同名类；方便分类管理类；控制访问范围。

引入包的命令是： `import package_name;`，引入包的主要目的就是实用其下的类。

- 为什么需要抽象类?什么是抽象类?Java 如何定义一个抽象类?抽象类在什么时候使用?  

由于父类方法的不确定性催生。 抽象方法不能在父类中实现,只能在其子类中实现。抽象类可以没有抽象方法而有实现了的方法,但是仍然不能被 实例化。一旦一个类包含了抽象方法，那么这个类就必须是抽象类。但是，抽象类可以没有抽象方法。

当一个类继承了抽象类，则需要子类实现抽象类中的所有抽象方法。

- 为什么需要接口?什么是接口?接口有什么特点和注意事项?  

接口就是更加抽象的抽象类，抽象类中的方法可以有方法体，接口中的所有方法都没有方法体。

接口体现的是程序设计中的多态性和高内聚低耦合。

接口中的方法必须被实现。 一个类可以实现多个接口。

``` java
public class Test
{
public static void main( String arg[] ) {
iPhone ipn = new iPhone() ;
Android andrd = new Android() ; Computer cmptr = new Computer() ; 
// 下面两行体现了多态
cmptr.use_usb( ipn ) ;
cmptr.use_usb( andrd ) ;
} }
interface Usb {
public void start() ;
public void stop() ; }
class iPhone implements Usb {
public void start() {
System.out.println( "iPhone start working now..." ) ; }
public void stop() {
System.out.println( "iPhone stop working now..." ) ;
} }
class Android implements Usb {
public void start() {
System.out.println( "Android start working now..." ) ; }
public void stop() {
System.out.println( "Android stop working now..." ) ; }
}
class Computer {
public void use_usb( Usb usb ){ usb.start() ;
usb.stop() ; }
}
```

接口中的变量不能用 private 和 protected 修饰；接口中的变量本质上都是 static 的，而且是 final 的，不管有没有加 static 修饰。

在实际开发中，我们常常把经常用的变量定义在接口中作为全局变量使用：`接口名.变量名`。

接口不能继承类，但是可以继承别的接口。实现接口可以在不打破继承关系的前提下，扩展某个类的功能，因此，接口可以看作是对继承的补充。

- 实现接口和继承类有什么区别? 

java 是单一继承的。想要实现 C++ 中多重继承的效果,那么可以借助接口。在继承一个父类后实现其他接口以 丰富子类的功能。

- final 有什么作用？

当不希望父类的某个方法被子类覆盖时，当不希望父类的某个变量值被修改，当不希望类被继承下去的时候，都可以用 final 修饰。

final 修饰的变量又叫做常量，一般用 XX_XX_XX 来表示。

final 修饰的变量在定义时必须赋值，并且以后不能被赋值。

final 和 static 体现的都是共享，但是 static 变量可以被共同修改。

#### 附录:Java 语法小细节积累

1. 构造函数前不需返回值,也不需要特意声明其返回值为 void,否则编译器会报错。 
2. 一个 java 文件中只需要一个 public 类。 
3. 单词拼写错误有时会产生难以察觉的错误。-- IDE
4. java 中没有 const ,但 const 仍作为保留字,以便以后的 JDK 中有可能扩充。( 如 goto ) 
5. 类中使用 this 如果不至于引起混淆,可以不写。 
6. 比较字符串内容/对象是否相等用 equals 而不能使用 == 如果字符串和对象使用 == 则比较的是地址,而其他 普通数据类型如 int , float, 等等采用 ==。 
7. 子类可以转父类,但是父类不能转子类,若非要转换,则使用强制转换 : ( object_name ) object_name_1 。 
8. 构造函数不需要返回值,也不需要特定声明返回值类型为 void 。 
9. import 指令不能放在 package 指令前面,否则编译器会报错。 
10. 无法从静态上下文中调用非静态方法 -- 如果主函数是 static 的,那么在主函数中就不能调用非 static 的函数。 
11. 在控制台执行 java 程序的时候可以在 java xxx 后面指定传递参数的。如: 

``` java
public class Test {
public static void main( String args[] ) {
System.out.println( args[0] ) ;
System.out.println( args[1] ) ; }
}
```

终端中输入：`java Test good morning.` 这就把 `good` 和 `morning` 作为参数传递给 args 变量，并会在 main() 函数中输出 goods 和 morning 了。

12. 静态变量可以不被赋予初值,JVM 会自动为其赋值。也不能用 this 访问。

``` java
public class Test
{
static int i ; // 不能放在 main() 函数中,否则会报错  public static void main( String args[] )
{
int j = 1 ; System.out.println( i ) ; System.out.println( j ) ;
} }
```

13. 数组对象定义的时候,要先 new 一个,然后再依次赋值,不能直接初始化为 null,否则会报错 java.lang.NullPointerException。如:Jbutton jbs[] = new Jbutton[ size ] ;

23. sql server 中数字和字符是不是用单引号都一样。建议统一使用。   

33. 无法使用 odbc 桥的连接方式? 

是JDK版本太高的问题,jdk8的版本删除了odbc桥,所以不能使用这种方法连接数据库了,只能换低版本 的,或者使用其他连接方式。

16. 边界布局如果不足北中南,则顺序一定要紧挨着,否则很有可能显示不完整。 

#### 相关 

- 默认 equals 比较两个对象地址是否相等，重写 equals 可以在语意上判断两个对象是否相等。

- super()

#### 参考

- [java读取文件](http://www.cnblogs.com/lovebread/archive/2009/11/23/1609122.html )

- [高级 DAO 编程](http://www.ibm.com/developerworks/cn/java/j-dao/index.html#7)
