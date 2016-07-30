---
layout: post
title: 《Java SE》 听课笔记[二]
category: Java
tag: Java
latest: 2015-07-28 17:02:44
---

#### 数组／基本算法

- 为什么需要数组?Java 中如何定义并使用一个数组? 

数组可以存放多个同一类型的数据。Java 基本上可以认为是纯面向对象的,因此数组在 Java 中也是对象, 其定义举例说明:int arr[] = new int( 5 ) ;
数组对象的常用属性:length。可以通过 数组名.length 来引用。 

数组大小必须事先指定。

1. 什么是对象数组?Java 如何定义对象数组? 

``` java
class_name object_array[] = new class_name[ num ] ;
object_array[0] = new class_name() ; // 如果不这样处理,编译器回会报错 -- 空指针异常,因为 object_name[0]等数组元素所指向的对象的内存位置未知。 
object_array[1] = new class_name() ;
... // 可以通过循环来赋值 
```

1. 什么是排序?为什么排序很重要? 

一般的数据处理工作，25%的时间都在排序。

1. 有哪些基本的查找算法?  
   二分查找。 

2. 二维数组有哪些相关知识点? 
   简单游戏。   

#### 二进制／集合

- 为什么计算机要采用二进制? 

1和0是最稳定的状态。【电子电路】 

- 什么是补码? 

- 什么是位移运算符和移位运算? 

- 为什么需要集合框架?什么是集合框架?必须掌握的集合框架有哪些?  —— 解决数组不能动态调整长度的问题。 

- 每种集合类的学习,只需参考 JDK 手册,多练练每种集合类的方法就行了,熟能生巧就行,无需强行记忆。

- 如何选择合适的集合框架? 

常用的几个集合类,都是同一个问题的不同解决办法。  
·HashMap:键值对,查询/修改相对方便,较快。如果添加相同 K 的元素,HashMap 的 put() 方法是以覆盖 的方式添加,而 ArrayList 的 add() 方法是以追加的方式添加。HashMap 的 K 遍历相对比较麻烦 -- 不能用普通 的 for 循环遍历,需要使用迭代器 Iterator 。举例说明: 

``` java
HashMap hm = new HashMap() ; // HashMap hm = new HashMap< K, V> ;
//Map hm = new HashMap() ; // 这种创建对象的方式体现了多态,因为 HashMap 和 HashTable 都是 Map 类的子类 
Iterator it = hm.keyset().iterator() ;
while( it.hasNext() ){
String key = it.next().toString() ;
... }
```

·HashTable: 与 HashMap 的用法大体一致,其不同之处在于: 

HashTable 是同步，HashMap 是异步，因此 HashTable 是线程安全的，HashMap 中的对象是线程不安全的。但是同步的影响效率和性能，而异步效率高很多。

HashMap 可以把空值作为记录保存，而 HashTable 不能。
HashTable 是基于陈旧的 Dictionary 类实现的，而 HashMap 是 Java1.2 中引进的 Map 接口的一个实现。

·List 集合: ArrayList 和 Vector。

1. 什么是线程安全?什么是锁? 
   以 Hashtable 举例,同一时刻,Hashtable 只能被一个线程访问,其他想要访问 Hashtable 的线程(并 发),就会入队排队等待当前线程的操作之后才能解锁,按先后顺序出队进行访问。同步虽能保证线程安全,但 是其速度相对就很慢。 

2. 什么是同步?什么是并发? 

#### 泛型／反射／异常

- 什么是泛型?为什么需要泛型?Java 如何使用泛型?  

JDK 1.6 之后用的比较多。问题引出: 

``` java
class Dog{ ... }
class Dog{ ... }
ArrayList al = new ArrayList() ;
Dog dog0 = new Dog() ;
al.add( dog0 ) ;
//Dog temp = ( Dog )al.get( 0 ) ;
Cattemp=(Cat)al.get(0); //line22
```

上述最后一行强制转换了,而且不同的类型都需要强行转换,否则编译器会报错 -- 类型转换异常。 

举例说明 -- 最后一行代码即为泛型使用:  

``` java
import java.lang.reflect.Method ;
public class Test
{
public static void main( String args[] ) {
} }
Gen<String> gen0 = new Gen<String>( "Li" ) ;
gen0.getTypeName() ;
Gen<Integer> gen1 = new Gen<Integer>( 18 ) ;
gen1.getTypeName() ;
Gen<Demo> gen2 = new Gen<Demo>( new Demo() ) ; gen2.getTypeName() ;
class Demo {
public Demo() {
System.out.println( "Demo." ) ; }
public void func0(){} ;
public void func1(){} ; }
class Gen<T> {
private T o ; public Gen( T g ) {
o=g; }
public void getTypeName() {
System.out.println( "类型是:" + o.getClass().getName() ) ; Method [] m = o.getClass().getDeclaredMethods() ;
for( int i =0; i<m.length; i++ )
{
System.out.println( m[i].getName() ) ;
}
} }
```

- 什么是反射机制? 

获得类的类型信息。1 中蓝色部分就是反射机制的例子。   

- 什么是异常处理(机制)?Java 是如何处理异常的?异常分类有哪些? 

使程序更健壮。异常在 Java 中也是对象。异常不是程序的错,程序是针对异常进行处理。 
代码证明: 

``` java
import java.io.* ; import java.net.* ; public class Test
{
public static void main( String args[] ) {
FileReader fr = new FileReader( "c:\\test.java" ) ; Socket st = new Socket( "180.149.132.47", 80 ) ;
} }
```

- 异常和异常处理一样吗?JAVA 异常处理的方式具体有几种?  —— 前者是现象,后者是针对该现象的机制。异常处理: 

``` java
public void test() throws Exception
{} // 谁调用了 test() 函数那么由谁处理该异常,如果都没有对该异常进行处理,那么由 JVM 处理。
```

·最大捕获 -- 捕获所有异常,Exception e 和最小捕获 -- 捕获具体的异常,如 FileNotFoundException e:  ·如果 try 已经捕获异常,那么其异常后面的代码将不再执行,直接进入到 catch 语句。如果有多个 catch 语 句,则匹配当前异常的 catch 。  ·如果多个异常都发生,那么当捕获第一个异常之后,后面的异常也不再捕获。(???) 

``` java
import java.io.* ; import java.net.* ; public class Test
{
public static void main( String args[] ) {
FileReader fr = null ;
try{
}catch ( FileNotFoundException e0 )
{
System.out.println( "进入 catch0" ) ; e0.getMessage() ; e0.printStackTrace() ;
}catch( IOException e1 ){
System.out.println( "进入 catch1" ) ; e1.getMessage() ; e1.printStackTrace() ;
}catch( Exception e ){
System.out.println( "进入 catch2" ) ;
e.printStackTrace() ;
}finally{
System.out.println( "进入 finally" ) ; if( null != fr )
{
try{
fr.close() ;
}catch( Exception e2 ){ e2.printStackTrace() ;
} }
}
System.out.println( "Exception end." ) ;
} }
System.out.println( "进入 try" ) ;
fr = new FileReader( "c:\\test.java" ) ;
Socket st = new Socket( "180.149.132.47", 80 ) ;
```

·文件如果被程序打开了而没有关闭,那么后果很可能很严重 -- 造成数据丢失。 
·可以没有 catch,只有 try 和 finally,但是不能只有 finally。 

- 异常处理在 Java 中有多重要? 
  “ 1000 行 Java 代码中 300∼400 行异常处理。” 

#### 界面/Swing/布局

1. 什么是 GUI? 
   图形化用户界面。 

2. JAVA 用什么开发 GUI ?AWT / SWING / SWT / JFACE 有什么关系? 
   它们具有继承关系而非完全不相干的技术。Swing 开发的界面在 Windows 和 Linux 下都可以显示出一样的效 果,但是它比 awt 更耗费内存。 

3. 什么是顶层容器?Jframe 的常用方法有哪些? 
   Jframe 就是一个顶层容器,可以添加其他 Swing 组件的类。 

4. 什么是像素?窗体的坐标是如何规定的? 
   粒度单位。坐标以屏幕左上角为原点,往右为 x 轴,往下为 y 轴。窗体的坐标就是(x, y),从 (x,y) 开始显示代 码中规定的的大小。 

5. Swing 的常用组件有哪些?需要全部记住吗? 
   按钮组件:。

6. 什么是布局管理器?有哪五种?最常用的是哪三种?
   边界布局 BorderLayout。
   流式布局 FlowLayout。
   网格布局 GridLayout。

7. 如何设置按钮组件的大小?如何禁止用户修改窗体大小? 

要自定义按钮组件的大小,那么不需要使用布局管理器: this.setLayout( null ) ; 其大小:jb.setSize( 100, 50 ) ; 否则在某种布局管理器下的自定义操作无效。  ·禁止用户修改窗体大小:this.setResizable( false ) ;

1. Swing 界面开发步骤是怎样的? 
   红色部分为边界布局。 

``` java
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
// 把需要添加的组件定义在这里,然后再构造函数中初始化  //JButton jb0, jb1, jb2, jb3, jb4 ;
int size = 9 ;
JButton jbs[] = new JButton[ size ] ;
public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
然后对想要设置的按钮设置
/*
//创建 thisrame 顶层容器 -- 可以容纳其他组件,如 JButton //JFrame jf = new thisrame() ; //如果不继承 JFrame 类就这样创建  // 创建一个 JButton 按钮组件 
for( int i=0; i<size; i++ )
{
jbs[i] = new JButton( String.valueOf( i ) ) ; }
jb0 = new JButton( "Confirm" ) ; jb1 = new JButton( "Up" ) ;
jb2 = new JButton( "Down" ) ; jb3 = new JButton( "Left" ) ;
jb4 = new JButton( "Right" ) ;
// 设置布局管理器(默认边界布局) 
// 设置流式布局(默认居中对齐 -- CENTER)  this.setLayout( new FlowLayout( FlowLayout.LEFT ) ) ;
// 设置网格布局 
this.setLayout( new GridLayout( 3, 3 ) ) ;
*/
// 添加 JButton 组件(JButton 对象) 
/* // 默认添加边界布局 
this.add( jb0, BorderLayout.CENTER ) ;
*/ /*
*/
this.add( jb1, BorderLayout.NORTH ) ; this.add( jb2, BorderLayout.SOUTH) ; this.add( jb3, BorderLayout.WEST ) ; this.add( jb4, BorderLayout.EAST ) ;
this.add( jb0) ; this.add( jb1) ; this.add( jb2) ; this.add( jb3) ; this.add( jb4) ;
for( int i=0; i<size; i++ ) {
this.add( jbs[i] ) ; }
// 设置窗体标题 
this.setTitle( "Hello GUI" ) ;
// 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ;
} }
```

1. 为什么需要面板组件?如何使用面板组件 Jpanel?  —— 面板组件默认采用流式布局。 
   举例说明: 

``` java
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
JPanel jp0, jp1 ;
JButton jb0, jb1, jb2, jb3, jb4, jb5, jb6 ; public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
jp0 = new JPanel() ;
jp1 = new JPanel() ;
jb0 = new JButton( "PHP" ) ; jb1 = new JButton( "Python" ) ; jb2 = new JButton( "JAVA" ) ;
} }
jb3 = new JButton( "C++" ) ;
jb4 = new JButton( "C" ) ;
jb5 = new JButton( "JAVASCRIPT" ) ;
jb6 = new JButton( "NODE.JS" ) ;
jp0.add( jb0 ) ;
jp0.add( jb1 ) ;
jp1.add( jb2 ) ;
jp1.add( jb3 ) ;
jp1.add( jb4 ) ;
this.add( jp0, BorderLayout.NORTH ) ;
this.add( jb6, BorderLayout.CENTER ) ;
this.add( jp1, BorderLayout.SOUTH ) ;
// 设置窗体标题 
this.setTitle( "Hello GUI" ) ;
// 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ;
面板组件 Jpanel 注意事项: 
举例说明: 
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
JPanel jp0, jp1, jp2 ;
JLabel jlb0, jlb1 ;
JButton jb0, jb1 ;
JTextField jtf ;
JPasswordField jpwf ;
public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
jp0 = new JPanel() ;
jp1 = new JPanel() ;
jp2 = new JPanel() ;
jlb0 = new JLabel( "用户名" ) ;
}
jlb1 = new JLabel( "密
jb0 = new JButton( "登
jb1 = new JButton( "取
jtf = new JTextField( 15 ) ;
jpwf = new JPasswordField( 15 ) ; this.setLayout( new GridLayout( 3, 1 ) ) ; jp0.add( jlb0 ) ;
jp0.add( jtf ) ;
jp1.add( jlb1 ) ;
jp1.add( jpwf ) ;
jp2.add( jb0 ) ;
jp2.add( jb1 ) ;
this.add( jp0 ) ;
this.add( jp1 ) ;
this.add( jp2 ) ;
// 设置窗体标题 
this.setTitle( "用户登录" ) ;
// 设置窗体大小(像素) 
this.setSize( 280, 150 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ; }
码" ) ; 录" ) ; 消" ) ;
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
JPanel jp0, jp1, jp2, jp3 ;
JLabel jlb0, jlb1 ;
JButton jb0, jb1 ;
JTextField jtf ;
JPasswordField jpwf ;
JCheckBox jcb0, jcb1 ;
JRadioButton jrb0, jrb1 ;
ButtonGroup bg ;
public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
jp0 = new JPanel() ;
jp1 = new JPanel() ;
jp2 = new JPanel() ;
jp3 = new JPanel() ;
jlb0 = new JLabel( "用户名" ) ;
jlb1 = new JLabel( "密
jb0 = new JButton( "登
jb1 = new JButton( "取
jtf = new JTextField( 15 ) ;
jpwf = new JPasswordField( 15 ) ;
jcb0 = new JCheckBox( "记住用户名" ) ; jcb1 = new JCheckBox( "记住密码" ) ; jrb0 = new JRadioButton( "在线" ) ;
jrb1 = new JRadioButton( "隐身" ) ; bg = new ButtonGroup() ; bg.add( jrb0 ) ;
bg.add( jrb1 ) ;
this.setLayout( new GridLayout( 4, 1 ) ) ; jp0.add( jlb0 ) ;
jp0.add( jtf ) ;
jp1.add( jlb1 ) ;
jp1.add( jpwf ) ;
jp2.add( jcb0 ) ;
jp2.add( jcb1 ) ;
jp3.add( jb0 ) ;
jp3.add( jb1 ) ;
this.add( jp0 ) ;
this.add( jp1 ) ;
this.add( jp2 ) ;
this.add( jp3 ) ;
// 设置窗体标题 
this.setTitle( "用户登录" ) ;
// 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ; }
}
此例中的单选框无法显示,参考网上资料如下:  import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.event.ActionEvent; import java.awt.event.ActionListener;
import javax.swing.* ; public class Test
{
public static void main( String[] args )
{ EventQueue.invokeLater
(
new Runnable()
{
码" ) ; 录" ) ; 消" ) ;
); }
} }
public void run() {
RadioBtnFrame frame = new RadioBtnFrame() ; frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE) ; frame.setVisible(true);
}
class RadioBtnFrame extends JFrame {
private static final int DEFAULT_WIDTH = 300; private static final int DEFAULT_HEIGHT = 200; private JPanel buttonPane;
private ButtonGroup group;
private JLabel label;
private static final int DEFAULT_SIZE = 12; public RadioBtnFrame()
{
setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT); setTitle("RadioBtnFrame");
label = new JLabel("Jun.H Love Dan.D.Y!"); label.setFont(new Font("Serif", Font.PLAIN, DEFAULT_SIZE)); super.add(label, BorderLayout.CENTER);
group = new ButtonGroup();
buttonPane = new JPanel();
addBtn("Small", 8);
addBtn("Medium", 12);
addBtn("Large", 18);
addBtn("Extra Large", 36);
super.add(buttonPane, BorderLayout.SOUTH);
}
public void addBtn(String name, final int size)
{
boolean selected = size == DEFAULT_SIZE;
JRadioButton newBtn = new JRadioButton(name, selected); group.add(newBtn);
buttonPane.add(newBtn);
//this listener sets the label font size
ActionListener listener = new ActionListener()
{
public void actionPerformed(ActionEvent event)
{
// size refers to final parameter of the addRadioButton //methed
label.setFont(new Font("Serif", Font.PLAIN, size));
} };
newBtn.addActionListener(listener); }
}
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
JPanel jp0, jp1 ;
JLabel jlb0, jlb1 ;
JComboBox jcbx ;
JList jlst ;
JScrollPane jsp ;
public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
jp0 = new JPanel() ;
jp1 = new JPanel() ;
jlb0 = new JLabel( "籍贯" ) ;
jlb1 = new JLabel( "现居地" ) ;
String [] jg = { "北京", "上海", "天津", "重庆" } ; jcbx = new JComboBox( jg ) ;
String [] dd = { "洛杉矶", "日本", "汉口", "伦敦" } ; jlst = new JList( dd ) ; jlst.setVisibleRowCount( 2 ) ;
jsp = new JScrollPane( jlst ) ;
this.setLayout( new GridLayout( 3, 1 ) ) ; jp0.add( jlb0 ) ;
jp0.add( jcbx ) ;

jp1.add( jlb1 ) ;
jp1.add( jsp ) ;
this.add( jp0 ) ;
this.add( jp1 ) ;
// 设置窗体标题 
this.setTitle( "用户登录" ) ;
// 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ; }
}
```

10. 什么叫拆分窗格?

``` java
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
JLabel jlb ;
JList jlst ;
JSplitPane jsp ;
public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
} }
String [] words = { "boy", "girl", "husband", "wife" } ;
jlst = new JList( words ) ;
//jlst.setVisibleRowCount( 10 ) ;
jlb = new JLabel( new ImageIcon( "images/ydcd.gif" ) ) ; jsp = new JSplitPane( JSplitPane.HORIZONTAL_SPLIT, jlst, jlb ) ; jsp.setOneTouchExpandable( true ) ;
this.add( jsp ) ;
// 设置窗体标题 
this.setTitle( "有道词典" ) ;
// 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ;
```

11. 如何实现QQ聊天界面? —— JTextArea 组件。 

``` java
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
JTextArea jta = null ;
JScrollPane jsp = null ;
JPanel jp = null ;
JComboBox jcb = null ;
JTextField jtf = null ;
JButton jb = null ;
public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
jta = new JTextArea() ;
jsp = new JScrollPane( jta ) ;
jp = new JPanel() ;
String [] friends = { "盖茨", "库克" } ;
jcb = new JComboBox( friends ) ;
jtf = new JTextField( 10 ) ;
jb = new JButton( "发送" ) ;
jp.add( jcb ) ;
jp.add( jtf ) ;
jp.add( jb ) ;
this.add( jsp ) ;
this.add( jp, BorderLayout.SOUTH ) ;
// 设置窗体标题 
this.setTitle( "腾讯QQ" ) ;
// 设置窗体图标 
this.setIconImage( ( new ImageIcon( "images/qq.gif" ) ).getImage() ) ; // 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
} }
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ;
```

12. 如何实现QQ登陆界面?什么是选项卡窗格? 

``` java
package com.client.view;
import java.awt.* ;
import javax.swing.* ;
public class Login extends JFrame {
// 定义组件 
// 北部区域 
JLabel north_label ;
// 中部 
// 选项卡窗格 
JTabbedPane tabbed_pane ;
JPanel login_via_qq_panel, login_via_phone_panel, login_via_email_panel ;
JLabel qq_number_label, qq_password_label, forget_password_label, register_qq_label ; // 号码文本框 
JTextField text_field ;
// 密码框 
JPasswordField password_field ;
// 清除号码按键 
JButton re_input_button ;
// 隐身登录/记住密码 
JCheckBox stealth_login_checkbox, keep_password_checkbox ;
// 南部 
JButton login_button, cancel_login_button ;
JPanel south_panel ;
public static void main( String args[] )
{
Login login = new Login() ; }
public Login() {
// 创建组件 
// 中部 
qq_number_label = new JLabel( "QQ号码", JLabel.CENTER ) ;
qq_password_label = new JLabel( "QQ密码", JLabel.CENTER ) ;
forget_password_label = new JLabel( "<html><a href='mail.qq.com'>忘记密码</a></html>", JLabel.CENTER ) ; forget_password_label.setFont( new Font( "宋体", Font.PLAIN, 16 ) ) ;
forget_password_label.setForeground( Color.BLUE ) ;
register_qq_label = new JLabel( "<html><a href='mail.qq.com'>注册QQ</a></html>" ) ; register_qq_label.setCursor( Cursor.getPredefinedCursor( Cursor.HAND_CURSOR ) ) ;
text_field = new JTextField() ;
password_field = new JPasswordField() ;
re_input_button = new JButton( new ImageIcon( "src/images/clear.gif" ) ) ;
stealth_login_checkbox = new JCheckBox( "隐身登录" ) ;
keep_password_checkbox = new JCheckBox( "记住密码" ) ;
tabbed_pane = new JTabbedPane() ;
login_via_qq_panel = new JPanel() ;
login_via_phone_panel = new JPanel() ;
login_via_phone_panel.setBackground( Color.RED ) ;
login_via_email_panel = new JPanel() ;
login_via_email_panel.setBackground( new Color( 0, 0, 255 ) ) ;
tabbed_pane.add( "QQ号登录", login_via_qq_panel ) ;
tabbed_pane.add( "手机登录", login_via_phone_panel ) ;
tabbed_pane.add( "邮箱登录", login_via_email_panel ) ;
//北部 
north_label = new JLabel( new ImageIcon( "src/images/nav.gif" ) ) ;
// 南部 
south_panel = new JPanel() ;
login_button = new JButton( new ImageIcon( "src/images/login.gif" ) ) ;
cancel_login_button = new JButton( new ImageIcon( "src/images/cancel.gif" ) ) ;
// 设置布局 
login_via_qq_panel.setLayout( new GridLayout( 3, 3 ) ) ;
// 添加组件 
south_panel.add( login_button ) ;
south_panel.add( cancel_login_button ) ;
login_via_qq_panel.add( qq_number_label ) ;
login_via_qq_panel.add( text_field ) ;
login_via_qq_panel.add( re_input_button ) ;
login_via_qq_panel.add( qq_password_label ) ;
login_via_qq_panel.add( password_field ) ;
login_via_qq_panel.add( forget_password_label ) ;
login_via_qq_panel.add( stealth_login_checkbox ) ;
login_via_qq_panel.add( keep_password_checkbox ) ;
login_via_qq_panel.add( register_qq_label ) ;
this.add( south_panel, BorderLayout.SOUTH ) ;
this.add( north_label, BorderLayout.NORTH ) ;
this.add( tabbed_pane, BorderLayout.CENTER ) ;
this.setTitle( "腾讯QQ" ) ;
this.setIconImage( ( new ImageIcon( "src/images/qq.gif" ) ).getImage() ) ;
this.setSize( 400, 300 ) ;
this.setResizable( false ) ;
} }
this.setLocation( 500, 250 ) ; this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
```

13. 如何实现记事本界面? 

``` java
import java.awt.* ;
import javax.swing.* ;
public class Test extends JFrame {
// 定义组件 
// 菜单条 
JMenuBar jmb ;
JMenu m0, m1, m2, m3, m4 ; JMenuItem it0, it1, it2, it3, it4, it5, it6, it7 ; JMenu _new ; // 二级菜单 
JMenuItem file, project ; JTextArea jta ;
// 工具条 
JToolBar jtb ;
JButton jb0, jb1, jb2, jb3, jb4, jb5 ; public static void main( String args[] ) {
Test gui = new Test() ; }
public Test() {
// 创建组件
jtb = new JToolBar() ;
jb0 = new JButton( new ImageIcon( "images/new.gif" ) ) ;
jb0.setToolTipText( "新建" ) ;
jb1 = new JButton( new ImageIcon( "images/open.gif" ) ) ;
jb1.setToolTipText( "打开" ) ;
jb2 = new JButton( new ImageIcon( "images/save.gif" ) ) ;
jb2.setToolTipText( "保存" ) ;
jb3 = new JButton( new ImageIcon( "images/copy.gif" ) ) ;
jb3.setToolTipText( "复制" ) ;
jb4 = new JButton( new ImageIcon( "images/cut.gif" ) ) ;
jb4.setToolTipText( "剪切" ) ;
jb5 = new JButton( new ImageIcon( "images/paste.gif" ) ) ;
jb5.setToolTipText( "粘贴" ) ;
jmb = new JMenuBar() ;
m0 = new JMenu( "文件(F)" ) ;
m0.setMnemonic( 'F' ) ; // 设置助记符 
m1 = new JMenu( "编辑(E)" ) ;
m1.setMnemonic( 'E' ) ;
m2 = new JMenu( "格式(O)" ) ;
m2.setMnemonic( 'O' ) ;
m3 = new JMenu( "查看(V)" ) ;
m3.setMnemonic( 'V' ) ;
m4 = new JMenu( "帮助(H)" ) ;
m4.setMnemonic( 'H' ) ;
_new = new JMenu( "新建" ) ;
file = new JMenuItem( "文件" ) ;
project = new JMenuItem( "工程" ) ;
it0 = new JMenuItem( "打开", new ImageIcon( "images/new.gif" ) ) ;
it1 = new JMenuItem( "保存(S)" ) ;
it1.setMnemonic( 'S' ) ;
//it1.setAccelerator( KeyStroke.getKeyStroke( KeyEvent.VK_SPACE, InputEvent.CTRL_DOWN_MASK ) ) ; it2 = new JMenuItem( "另存为" ) ;

} }
```

14. ?  ——

``` java
it3 = new JMenuItem( "页面设置" ) ; it4 = new JMenuItem( "打印" ) ;
it5 = new JMenuItem( "退出" ) ;
jta = new JTextArea() ;
// 将按钮添加到工具条  jtb.add( jb0 ) ; jtb.add( jb1 ) ; jtb.add( jb2 ) ; jtb.add( jb3 ) ; jtb.add( jb4 ) ; jtb.add( jb5 ) ;
// 将菜单项添加到菜单上  _new.add( file ) ; _new.add( project ) ; m0.add( _new) ; m0.add( it0 ) ;
m0.add( it1 ) ; m0.add( it2 ) ; m0.addSeparator() ; m0.add( it3 ) ; m0.add( it4 ) ; m0.addSeparator() ; m0.add( it5 ) ;
// 将 菜单 添加到菜单条上  jmb.add( m0 ) ; jmb.add( m1 ) ; jmb.add( m2 ) ; jmb.add( m3 ) ; jmb.add( m4 ) ;
// 将 菜单条 添加到菜单条上 
this.setJMenuBar( jmb ) ;
// 将工具条添加到窗体上 
this.add( jtb, BorderLayout.NORTH ) ;
JScrollPane jsp = new JScrollPane( jta ) ;
jsp.setVerticalScrollBarPolicy( JScrollPane.VERTICAL_SCROLLBAR_ALWAYS ) ; this.add( jsp ) ;
// 设置窗体标题 
this.setTitle( "记事本" ) ;
// 设置窗体图标 
this.setIconImage( ( new ImageIcon( "images/notepad.gif" ) ).getImage() ) ; // 设置窗体大小(像素) 
this.setSize( 400, 300 ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 500, 250 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
// 显示窗体 
this.setVisible( true ) ;
```

#### 绘图

JAVA 绘图原理是怎样的?   先看代码: 

``` java
import javax.swing.* ;
import java.awt.* ;
public class Test extends JFrame {
// 定义组件 
MyPanel mp = null ;
public static void main( String [] args ) {
Test demo = new Test() ; }
public Test() {
mp = new MyPanel() ;
this.add( mp ) ;
this.setSize( 400, 300 ) ;
this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
} }
class MyPanel extends JPanel {
// 这里覆盖( 重写 ) JPanel 的 paint 方法 
public void paint( Graphics g ) // Graphics 是一个很重要的类,可以理解为一支画笔  {
// 1. 调用父类函数完成初始化( 不能少 ) super.paint( g ) ;
g.drawOval( 10, 10, 30, 30 ) ;
} }
```

总结：Component 类提供了两个绘图相关最重要的方法：
1.`paint(Graphics g)` 绘制组建的外观。
2.`repaint()` 刷新组件的外观，实现动态效果必不可少的方法。
3.窗口最大、最小、大小发生变化, repaint() 被调用。
4.绘图非常消耗 CPU。

- Graphics 类有哪些常用方法? 

动画的本质就是快速地更换图片。  
如果找不到字体就用默认的字体 -- 宋体。 

``` java
import javax.swing.* ;
import java.awt.* ;
public class Test extends JFrame {
// 定义组件 
MyPanel mp = null ;
public static void main( String [] args ) {
Test demo = new Test() ; }
public Test() {
mp = new MyPanel() ;
this.add( mp ) ;
this.setSize( 400, 300 ) ;
this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
} }
class MyPanel extends JPanel {
// 这里覆盖( 重写 ) JPanel 的 paint 方法 
public void paint( Graphics g ) // Graphics 是一个很重要的类,可以理解为一支画笔  {
    } }
// 1. 调用父类函数完成初始化( 不能少 ) super.paint( g ) ;
System.out.println( "paint() 被自动调用." ) ; g.drawOval( 10, 10, 30, 30 ) ;
// 在面板上画图片 
Image im = Toolkit.getDefaultToolkit().getImage( Panel.class.getResource( "/images/ydcd.jpg" ) ) ; g.drawImage( im, 100, 100, 200, 100, this ) ;
// 画字体 
g.setColor( Color.blue ) ;
g.setFont( new Font( "隶书", Font.BOLD, 30 ) ) ;
g.drawString( "你好地球", 100, 100 ) ;
```

5. 项目中如何选择图片?如何用 JAVA 的绘图技术制作坦克? 

直接去找现成的图片比较耗费资源。所以建议使用 JAVA 的绘图技术手动绘制。代码如下: 

``` java
package com.tank ;
import java.awt.* ;
import javax.swing.* ;
public class TankBattle extends JFrame{
GamePanel gp = null ;
public static void main( String args [] ){
TankBattle tank_battle = new TankBattle() ; }
public TankBattle(){
gp = new GamePanel() ;
this.add( gp ) ;
this.setTitle( "坦克大战" ) ;
this.setIconImage( ( new ImageIcon( "images/tank.gif" ) ).getImage() ) ; this.setSize( 800, 600 ) ;
this.setVisible( true ) ;
// 禁止用户修改窗体大小 
this.setResizable( false ) ;
// 设置窗体初始位置(像素) 
this.setLocation( 250, 50 ) ;
// 设置当窗体退出时, JVM 也退出,否则就算关闭了窗体,JVM 仍然有进程在运行  this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ;
} }
class GamePanel extends JPanel{ Hero hero = null ;
public GamePanel(){
hero = new Hero( 10, 10 ) ;
}
public void paint( Graphics g ){
super.paint( g ) ;
g.fillRect( 0, 0, 800, 600) ;
g.setColor( Color.cyan ) ;
g.drawRect(10, 20, 4, 4) ;
this.drawTank( hero.getX(), hero.getY(), g, 0, 0 ) ;
}
public void drawTank( int x, int y, Graphics g, int direct, int type ){
// 1. 画出左边的矩形  g.fill3DRect( x, y, 5, 30, false ) ;
// 2. 画出右边的矩形 
g.fill3DRect( x+22, y, 5, 30, false ) ; //3. 画出中间的矩形 
g.fill3DRect( x+5, y+5, 17, 20, false ) ; // 4. 画出圆形 
g.fillOval( x+5, y+5, 15, 20 ) ;
switch( type ){
case 0 :
g.setColor( Color.cyan ) ;
break ; case 1 :
g.setColor( Color.blue ) ;
break ; }
switch( direct ){ case 0 :
// 5. 画出坦克炮筒 
g.drawLine( x+12, y, x+12, y+15 ) ; g.drawLine( x+13, y, x+12, y+15 ) ; // 6. 画出坦克顶盖 
g.setColor( Color.blue ) ; g.fillOval( x+10, y+12, 5, 6 ) ; break ;
case 1 : break ;
case 2 : break ;
case 3 : break ;
} }
}
class Tank{
public int getX() { return x;
}
public int getY() {
return y; }
int x = 0 ;
int y = 0 ;
public Tank( int x, int y ){
this.x = x ;
this.y = y ; }
}
class Hero extends Tank{
public Hero( int x, int y ){ super( x, y ) ;
} }
```

#### 事件

"委派事件模型"：当事件发生时，产生事件的对象，会把此信息(`java.awt.event`)传递给事件的监听者的一种处理方式。

·一个事件源可以有多个监听者。举例说明: 

``` java
import javax.swing.* ;
import java.awt.* ;
import java.awt.event.* ;
public class Test extends JFrame implements ActionListener {
// 定义组件 
JPanel jp = null ;
JButton jb0, jb1 ;
public static void main( String [] args ) {
Test demo = new Test() ; }
public Test() {
jp = new JPanel() ;
jb0 = new JButton( "黑色" ) ;
jb1 = new JButton( "红色" ) ;
Human hm = new Human() ;
this.add( jb0, BorderLayout.NORTH ) ;
this.add( jp ) ;
jp.setBackground( Color.BLACK ) ;
this.add( jb1, BorderLayout.SOUTH ) ;
// 注册监听 
jb0.addActionListener( this ) ;
jb0.addActionListener( hm ) ;
// 指定不同事件的 action 命令 
jb0.setActionCommand( "黑色" ) ;
jb1.addActionListener( this ) ;
jb1.addActionListener( hm ) ;
jb1.setActionCommand( "红色" ) ;
this.setSize( 400, 300 ) ;
this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
}
// 对所监听事件的处理 -- actionPerformed() public void actionPerformed( ActionEvent ae ) {
// 判断是哪个按钮被点击 
if( ae.getActionCommand().equals( "黑色" ) ) {
System.out.println( "黑色" ) ;
jp.setBackground( Color.BLACK ) ;
}else if( ae.getActionCommand().equals( "红色" ) ) {
System.out.println( "红色" ) ;
jp.setBackground( Color.red ) ; }else
{
System.out.println( "未知颜色" ) ;
}
class Human implements ActionListener {
public void actionPerformed( ActionEvent ae ) {
if( ae.getActionCommand().equals( "黑色" ) ) {
System.out.println( "地球人都知道你点击的是黑色" ) ; }else if( ae.getActionCommand().equals( "红色" ) )
{
System.out.println( "地球人都知道你点击的是红色" ) ; }else
{
System.out.println( "地球人都知道你点击的是未知颜色" ) ;
} }
}
```

7. 如何通过键盘操作图形运动?一个类要实现监听的步骤有哪些? 

``` java
import javax.swing.* ;
import java.awt.* ;
import java.awt.event.* ;
public class Test extends JFrame {
MyPanel mp = null ;
public static void main( String [] args ) {
Test demo = new Test() ; }
public Test() {
mp = new MyPanel() ;
this.add( mp ) ;
this.addKeyListener( mp ) ;
this.setSize( 400, 300 ) ;
this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
} }
class MyPanel extends JPanel implements KeyListener {
int x = 10 ;
int y = 10 ;
public void paint( Graphics g ) {
super.paint( g ) ;
g.fillOval( x, y, 10, 10 ) ;
}
public void keyPressed(KeyEvent e) {
//System.out.println( ( char )e.getKeyCode() + "被按下"+ "(ASCII:" + e.getKeyCode() + ")" ) ; if( e.getKeyCode() == KeyEvent.VK_DOWN )
{
y ++ ;
}else if( e.getKeyCode() == KeyEvent.VK_UP ) {
y -- ;
}else if( e.getKeyCode() == KeyEvent.VK_LEFT ) {
x -- ;
}else if( e.getKeyCode() == KeyEvent.VK_RIGHT ) {
x ++ ; }
// 调用 repaint() 函数来重绘界面 
this.repaint() ;
}
public void keyReleased(KeyEvent e) {
}
public void keyTyped(KeyEvent e)
{
}
}
```

·任何一个类只要实现了相应的接口,就可以去监听某个事件源。 
·keyPressed 和 keyTyped 的区别:前者只要是键盘上的按钮就可以监听,而 keyTyped 只能监听可以输出的字符。 

- 一个类实现监听的步骤：

1.实现相应的接口。
2.把接口的处理方法根据需要重新编写。
3.在事件源注册监听。
4.事件传导是靠事件对象。

- 一个事件监听类可不可以实现多个接口? 
可以。如:implements MouseListener, KeyListener, MouseMotionListener, WindowListener 每个接口的实现同 KeyListener ,具体方法查看 JDK 帮助文档。 

#### 附录：部分源代码

``` java
/* ************************************** * lamChuanJiang
* 环形链表解决约瑟夫问题 
* 2015-08-01 10:29:44
* javac -encoding UTF-8 Test.java
* java Test
* *************************************** */ public class Test{
public static void main( String args[] ){ int children_no = 10 ;
int start_no = 2 ;
int out_no = 3 ;
Child children = new Child( children_no ) ; CycleList cycle_list = new CycleList( children.no ) ; cycle_list.create_list() ;
cycle_list.set_no( start_no, out_no ) ; cycle_list.show_children() ;
cycle_list.play() ;
} }
class Child{ int no ;
Child next = null ;
public Child( int children_no ){
this.no = children_no ; }
}
class CycleList{
Child first = null ; Child temp = null ; int length = 0 ;
int start ;
int out ;
public CycleList( int len ){
this.length = len ; }
public void create_list(){
for( int i=1; i<=length; i++ ){
if( 1 == i ){
Child dynamic = new Child( i ) ; first = dynamic ;
temp = dynamic ;
}else if( length == i ){
Child dynamic = new Child( i ) ; temp.next = dynamic ;
temp = dynamic ;
temp.next = first ;
}else{
Child dynamic = new Child( i ) ; temp.next = dynamic ;
temp = dynamic ;
} }
}
public void show_children(){
Child temp = first ; do{
System.out.println( temp.no ) ;
temp = temp.next ; }while( temp != first ) ;
}
public void set_no( int start_no, int out_no ){

start = start_no ;
out = out_no ; }
public void play(){ Child temp = first ;
for( int i =1; i<start; i++ ){ temp = temp.next ;
}
int cur = 1 ;
while( 1 != length ){
for( int j=1; j<out-1; j++){ temp = temp.next ;
}
System.out.println( " ( cur ++ ) + 当前出圈的是:" + temp.next.no ) ; temp.next = temp.next.next ;
temp = temp.next ;
length -- ;
}
System.out.println( "最后留在圈中的是:" + temp.no ) ; }
}
2. 冒泡排序(待完善) 
import java.util.* ; public class Test
{
public static void main( String args[] ) {
int array_len ;
System.out.print( "请输入数组长度:" ) ; Scanner input = new Scanner( System.in ) ; array_len = input.nextInt() ;
int array[] = new int[ array_len ] ;
for( int i=0; i<array_len; i++ )
{
System.out.print( "请输入第 " + (i+1) + " 个数:" ) ;
array[i] = input.nextInt() ; }
input.close() ;
System.out.print( "\n排序前数组中的顺序为:" ) ; for( int i=0; i<array_len; i++ )
{
System.out.print( "\n\t\t\t" + array[i] +"\n\n" ) ; }
Sort sort = new Sort() ;
sort.bubble( array ) ; }
}
class Sort {
public void bubble( int array[] ) {
System.out.print( "\n排序后数组中的顺序为( 由小到大 ):" ) ; int temp ;
for( int i=0; i<array.length-1; i++ )
{
for( int j=0; j<array.length-1-i; j++ ) {
} }
```

1. 选择排序 
2. 插入排序 
3. 快速排序 
4. 希尔排序(欧洲) 
5. 二叉树排序 
6. 二分查找 
