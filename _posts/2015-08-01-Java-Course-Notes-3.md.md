---
layout: post
title: 《Java SE》 听课笔记[三]
category: Java
tag: Java
latest: 2015-08-02 17:02:44
---

#### 线程

1. 什么是线程?多线程编程有什么用?  

并发离不开多线程编程。 

2. 什么是进程? 

每个进程占用的内存空间必须是独立的(木马的检测原理之一就是检测别的内存是否被该程序访问)。 

3. JAVA 如何使用线程?继承 Thread 类和实现 Runnable 接口的区别?  

每个类都可以当作一个线程来使用。 

- 单继承 Thread

``` java
public class Test {
public static void main( String [] args ) {
Demo dm = new Demo() ;
// 启动线程,会导致 run() 函数运行  dm.start() ;
} }
class Demo extends Thread
{
}
// 重写 run() public void run() {
int times = 0 ; while( true ) {
} }
times ++ ; try{
// 休眠 1000 毫秒 
// sleep() 会导致线程进入 Blocked 状态,并释放资源  Thread.sleep( 1000 ) ;
}catch( InterruptedException e ) { e.printStackTrace() ;
}
System.out.println( times + ". Hello Thread." ) ; if( 10 == times ) { break ; }
```

- 实现 Runable 接口 -- 建议使用 

``` java
public class Test
{
public static void main( String [] args ) {
Demo dm = new Demo() ;
// 1. 创建一个 Thread 对象 
Thread thread = new Thread( dm ) ; // 2. 启动线程,会导致 run() 函数运行  thread.start() ;
} }
class Demo implements Runnable {
// 重写 run() public void run() {
int times = 0 ; while( true ) {
} }
}
times ++ ; try{
// 休眠 1000 毫秒 
// sleep() 会导致线程进入 Blocked 状态,并释放资源  Thread.sleep( 1000 ) ;
}catch( InterruptedException e ) { e.printStackTrace() ;
}
System.out.println( times + ". Hello Thread." ) ; if( 10 == times ) { break ; }
```

继承 Thread 类和实现 Runnable 接口的区别: 
4. JAVA 如何实现多线程?  ——举例如下: 

``` java
public class Test
{
public static void main( String [] args ) {
Dog dog = new Dog( 10 ) ;
Pig pig = new Pig( 10 ) ;
// 创建 Thread 对象 
Thread thread_dog = new Thread( dog ) ; Thread thread_pig = new Thread( pig ) ; // 启动线程 
thread_dog.start() ;
thread_pig.start() ; }
}
class Dog implements Runnable {
int n = 0 ;
int result = 0 ;
int times = 0 ; public Dog( int n ) {
this.n = n ;
}
// 重写 run() 函数  public void run() {
while( true ) {
} }
}
class Pig implements Runnable {
int n = 0 ;
int times = 0 ; public Pig( int n ) {
this.n = n ; }
public void run() {
while( true ) {
} }
}
try{
Thread.sleep( 2000 ) ;
}catch( InterruptedException e ) { e.printStackTrace() ;
}
result += ( ++ times ) ;
System.out.println( times + " .当前结果是:" + result ) ; if( times == n )
{
System.out.println( "最后结果是:" + result ) ;
break ; }
try{
Thread.sleep( 1000 ) ;
}catch( InterruptedException e ) { e.printStackTrace() ;
}
times ++ ;
System.out.println( times + ". 猪是一个线程。" ) ; if( times == n ) { break ; }
```

5. JAVA 使用线程有哪些注意事项?具体是如何解决的?  
- 一个线程对象只能启动一个线程。创建多个线程对象(可以是一个实现 Runnable 接口的类,或者继承 Thread 类的子 类,的实例化)来实现多线程。 
- 多线程并发/同步 

``` java
synchronized( Object ) { 要同步的代码块 }
```

·对象锁:0 代表资源正在使用,线程等待;1 代表资源充裕,新线程执行。等待池就是个队列。 
举例说明: 

``` java
public class Test {
public static void main( String [] args ) {
} }
TicketWindow tw = new TicketWindow() ; Thread tw0 = new Thread( tw ) ;
Thread tw1 = new Thread( tw ) ;
Thread tw2 = new Thread( tw ) ;
Thread tw3 = new Thread( tw ) ; Thread tw4 = new Thread( tw ) ; tw0.start() ;
tw1.start() ;
tw2.start() ; tw3.start() ; tw4.start() ;
class TicketWindow implements Runnable {
private int ticket_scale = 100 ; public void run()
{
while( true ) {
try{
Thread.sleep( 1000 ) ;
} catch( Exception e ) { e.printStackTrace() ;
}
synchronized( this ) {
if( 0 < ticket_scale ) {
ticket_scale -- ;
System.out.println( Thread.currentThread().getName() + ": 正在出票... 第 " + ticket_scale + " 张机票已售出。" ) ;
}
if( 0 == ticket_scale ) {
System.out.println( Thread.currentThread().getName() + ": 所有机票已售罄。" ) ;
break ; }
}
}
```

6. 什么是死锁?什么是互斥?什么是哲学家就餐问题? 
详见《操作系统》。 

7. 什么是文件锁?  —— 数据库涉及。 

8. 什么时候可以将类做成线程? 
创建该类的对象后,如果对象会移动, 坐标会变化的,建议做成线程。   

9. 如何实现爆炸效果? 
1先准备 3 张图片; 
2定义一个爆炸效果类 -- Bomb ;  
3击中坦克时,把 bomb对象 放入 Vector ;  
4绘制。 

10. 为什么第一次爆炸没有效果?为什么我军坦克被击中后没有爆炸效果?  

可不可以先在存放爆炸效果的向量 Vector 中实现添加一次效果。  解决办法已找到,但原因未分析 -- 使用 ImageIO 类。 
将原代码: 

``` java
image0 = Toolkit.getDefaultToolkit().getImage( Panel.class.getResource( "/images/bomb_0.gif" ) ) ; image1 = Toolkit.getDefaultToolkit().getImage( Panel.class.getResource( "/images/bomb_1.gif" ) ) ; image2 = Toolkit.getDefaultToolkit().getImage( Panel.class.getResource( "/images/bomb_2.gif" ) ) ; 
```

修改为: 

``` java
import javax.imageio.* ; try {
image0 = ImageIO.read( new File( "src/images/bomb_0.gif" ) ) ; image1 = ImageIO.read( new File( "src/images/bomb_1.gif" ) ) ; image2 = ImageIO.read( new File( "src/images/bomb_2.gif" ) ) ;
} catch ( IOException e ) { e.printStackTrace() ;
}
```

#### I/O

11. 为什么需要文件编程? 

拿坦克大战游戏来说,至少可以实现存盘退出,此外还可以保持程序已经运行过的记录。不进行文件编程,那么游戏 程序一旦退出,那么所有游戏记录将被清空,因为程序是存在内存中的。除了保存到文件,也可以保存到数据库。 

12. 什么是文件?什么是文件流?如何判断输出流和输入流?JAVA 中流分哪两类? 

13. 什么是文件头? 
文件后缀是没有意义的,程序读取文件的本质是读取文件头来判断文件的类型。所以 txt 文件亦可以隐藏木马。 

14. JAVA 的 I/O 编程中常用的类有哪些?  1File: 
·文件流的几种常用方法: 

``` java
import java.io.* ;
public class Test {
public static void main( String args[] ) { // 创建一个文件对象 
File file = new File( "d:\\workspace\\test1\\Test.java" ) ; File floder = new File( "d:\\workspace\\test1" ) ;
// 创建文件和文件夹 
if( file.exists() ) {
System.out.println( "文件已经存在。" + file.getAbsolutePath() ) ; }else {
System.out.println( "文件不存在,即将创建..." ) ; try{
file.createNewFile() ; } catch(IOException e ) {
e.printStackTrace() ; }
System.out.println( "文件已创建。" + file.getAbsolutePath() ) ; }
if( floder.isDirectory() ) {
System.out.println( "文件夹已经存在。" +floder.getAbsolutePath() ) ;
}else {
System.out.println( "文件夹不存在,即将创建..." ) ;
floder.mkdir() ;
System.out.println( "文件夹已创建。" + floder.getAbsolutePath() ) ;
}
// 获得文件路径 
System.out.println( "文件路径:" + file.getAbsolutePath() ) ; // 得到文件的大小和字节数 
System.out.println( "文件大小:" + file.length() + " 字节" ) ; // 判断文件是否可读或可写 
if( file.canRead() ) {
System.out.println( "文件可读。" ) ; }else if( file.canWrite() ) {
System.out.println( "文件可写。" ) ; }
// 列出一个文件夹下的所有文件 
File floder0 = new File( "d:\\workspace" ) ; if( floder0.isDirectory() ) {
System.out.println( "文件夹已经存在。" +floder.getAbsolutePath() ) ; File list[] = floder0.listFiles() ;
for( int i=0; i<list.length ; i++ ) {
System.out.println( "文件名:" + list[i].getName() ) ; }
}else {
} }
}
} }
}
}finally { try {
System.out.println( "文件夹不存在,即将创建..." ) ;
floder0.mkdir() ;
System.out.println( "文件夹已创建。" + floder.getAbsolutePath() ) ;
·FileInputStream 类的用法:  import java.io.* ;
public class Test {
public static void main( String args[] ) {
File file = new File( "d:\\workspace\\test\\Test.java" ) ; FileInputStream file_stream = null ;
// 因为 file 没有读写的能力,所以需要使用 InputStream 流去读取文件  try{
file_stream = new FileInputStream( file ) ; // 定义一个字节数组,相当于缓存 
byte [] bt = new byte[ 1024 ] ;
// 实际读取到的字节数 
int n = 0 ;
// 循环读取 
while( -1 != ( n=file_stream.read( bt ) ) ) {
// 把字节转成 String
String string = new String( bt, 0, n ) ; System.out.println( string ) ;
}
} catch( IOException e ) {
e.printStackTrace() ; } finally {
// 关闭文件流必须放在这里,放在其他位置很可能因为其他代码出现异常而无法捕获该语句的异常  try{
file_stream.close() ; } catch( IOException e ) { e.printStackTrace() ;
} }
```

·如何使得 inputStream 输出中文?  
·FileOutputStream 类的用法:  

``` java
import java.io.* ;
public class Test {
public static void main( String args[] ) {
File file = new File( "d:\\workspace\\test\\Test.java" ) ; // 字节输出流 
FileOutputStream file_stream = null ;
try{
file_stream = new FileOutputStream( file ) ;
String string0 = "Hello World.\r\n" ;
String string1 = "Programmer is awesome." ;
// 覆盖原数据写入,不换行,换行在字符串末尾添加 \n 或者 \r\n 即可  file_stream.write( string0.getBytes() ) ;
file_stream.write( string1.getBytes() ) ;
} catch( IOException e ) { e.printStackTrace() ;
} finally {
// 关闭文件流必须放在这里,放在其他位置很可能因为其他代码出现异常而无法捕获该语句的异常  try{
file_stream.close() ; } catch( IOException e ) { e.printStackTrace() ;
} }
```

·图片拷贝: 

```
/* 图片拷贝 */ package com.test ; import java.io.* ; public class Test {
public static void main( String args[] ) {
// 先把图片读入到内存,然后再写入文件;因为是二进制文件,所以只能用字节流完成  String path_from = "d:\\workspace\\TankBattle\\src\\images\\tank_battle.gif" ; String path_to = "d:\\workspace\\test1\\tank_battle.gif" ;
// 输入流 
FileInputStream file_is = null ;
FileOutputStream file_os = null ;
try {
file_is = new FileInputStream( path_from ) ; file_os = new FileOutputStream( path_to ) ; byte [] buffer = new byte[ 1024 ] ;
// 实际读取到的字节数 
int n = 0 ;
while( -1 != ( n=file_is.read( buffer ) ) ) {
// 输出到指定文件夹 
file_os.write( buffer ) ; }
} catch ( IOException e ) { e.printStackTrace();
} }
file_is.close() ;
file_os.close() ;
} catch ( IOException e ) { e.printStackTrace() ;
} }
}
```

·文件字符流的使用 -- 输入输出文件字符(单个): 

``` java
package com.test ; import java.io.* ; public class Test {
public static void main( String args[] ) { // 从文件取出字符流对象 -- 输入流  FileReader fr = null ;
// 写到文件 -- 输出流 
FileWriter fw = null ;
String path_from = "d:/workspace/test/Test.java" ; String path_to = "d:/workspace/test1/test.java" ; try {
// 创建 FileReader 对象 
fr = new FileReader( path_from ) ; fw = new FileWriter( path_to ) ;
// 读入到内存 
char c [] = new char[ 1024 ] ;
// 记录实际读取的字符数 
int n = 0 ;
while( -1 != ( n=fr.read( c ) ) ) {
// 如果打印 c 中内容出现乱码就按下面的语句处理 -- 不足 1024 个字节造成的  //String s = new String( c, 0, n ) ;
//System.out.println( c ) ;
fw.write( c, 0, n ) ;
}
} catch ( IOException e ) {
e.printStackTrace() ; } finally {
try {
} catch ( IOException e ) { e.printStackTrace() ;
} }
```

缓冲字符流的使用 -- 为了提高效率引入缓冲字符流, 输入输出文件字符串(多个) :  

``` java
package com.test ;
import java.io.* ;
public class Test {
public static void main( String args[] ) {
BufferedReader bfr = null ;
BufferedWriter bfw = null ;
String path_from = "d:/workspace/test/Test.java" ; String path_to = "d:/workspace/test1/test.java" ; try {
// 先创建 FileReader 对象 
FileReader fr = new FileReader( path_from ) ;
// 将 FileReader 对象添加到 BufferedReader 流中  bfr = new BufferedReader( fr ) ;
FileWriter fw = new FileWriter( path_to ) ;
bfw = new BufferedWriter( fw ) ;
String s = "" ;
while( null != ( s=bfr.readLine() ) ) {
//System.out.println( s ) ;
// 将缓冲区的数据输出到磁盘文件  bfw.write( s + "\r\n" ) ;
}
} catch ( Exception e ) { e.printStackTrace() ;
} finally { try {
} }
fr.close() ;
fw.close() ;
} }
bfr.close() ;
bfw.close() ;
} catch ( IOException e ) {
e.printStackTrace() ; }
}
```

2打印输出流 -- PrintWriter : 

``` java
/* 简单记事本 -- 界面 + 功能 */ 
package com.test ;
import java.io.* ;
import java.awt.* ;
import java.awt.event.* ;
import javax.swing.* ;
public class Test extends JFrame implements ActionListener {
// 定义需要的组件 
// 1. 文本框 
JTextArea text_area = null ;
// 2. 菜单条 
JMenuBar menu_bar = null ;
// 3. 第一个菜单的子菜单 
JMenu sub_menu0 = null ;
// 4. 第一个菜单的第一个子菜单的菜单项  JMenuItem sm0_item0 = null, sm0_item1 = null ; public static void main( String args[] ) {
Test NotePad = new Test() ; }
public Test() {
// 创建上述定义好的组件 
text_area = new JTextArea() ;
menu_bar = new JMenuBar() ;
sub_menu0 = new JMenu( "文件" ) ;
sm0_item0 = new JMenuItem( "打开", new ImageIcon( "src/com/test/open.gif" ) ) ;
} }
sm0_item1 = new JMenuItem( "保存", new ImageIcon( "src/com/test/save.gif" ) ) ; // 设置助记符 
sub_menu0.setMnemonic( 'F' ) ;
// 注册事件监听 
sm0_item0.addActionListener( this ) ; sm0_item0.setActionCommand( "open" ) ; sm0_item1.addActionListener( this ) ; sm0_item1.setActionCommand( "save" ) ; // 将已经创建并设置好的组件加入窗体  this.add( text_area ) ;
this.setJMenuBar( menu_bar ) ; menu_bar.add( sub_menu0 ) ; sub_menu0.add( sm0_item0 ) ; sub_menu0.add( sm0_item1 ) ; // 设置窗体属性 
this.setTitle( "NOTEPAD" ) ;
this.setIconImage( new ImageIcon( "src/com/test/notepad.gif" ).getImage() ) ; this.setSize( 800, 600 ) ;
this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE );
this.setVisible( true ) ;
}
public void actionPerformed( ActionEvent ae ) {
if( ae.getActionCommand().equals( "open" ) ) { //System.out.println( "open" ) ;
// 文件选择组件 -- JFileChooser
JFileChooser file_chooser = new JFileChooser() ; file_chooser.setDialogTitle( "选择文件" ) ;
// null 代表默认打开的是独立的窗口  file_chooser.showOpenDialog( null ) ; file_chooser.setVisible( true ) ;
// 得到用户选择文件的绝对路径 
String file_path = file_chooser.getSelectedFile().getAbsolutePath() ; //System.out.println( file_path ) ;
// 将所选文件的数据读到内存,使用 BufferedReader 是为了提高速度  FileReader fr = null ;
BufferedReader bfr = null ; try {
fr = new FileReader( file_path ) ; bfr = new BufferedReader( fr ) ; String str = "" ;
String all_contents = "" ;
while( null != ( str=bfr.readLine() ) ) { all_contents += str + "\r\n" ;
}
text_area.setText( all_contents ) ; } catch ( IOException e ) {
e.printStackTrace() ; } finally {
try {
fr.close() ;
bfr.close() ;
} catch ( IOException e ) {
e.printStackTrace() ; }
}
}else if( ae.getActionCommand().equals( "save" ) ) {
// 出现保存对话框 
JFileChooser fc = new JFileChooser() ; fc.setDialogTitle( "另存为" ) ;
// 按默认方式显示 
fc.showSaveDialog( null ) ;
fc.setVisible( true ) ;
// 得到保存全路径 
String f_path = fc.getSelectedFile().getAbsolutePath() ; FileWriter fw = null ;
BufferedWriter bfw = null ;
try {
fw = new FileWriter( f_path ) ;
bfw = new BufferedWriter( fw ) ;
// 待优化 
bfw.write( this.text_area.getText() ) ;
} catch ( IOException e ) { e.printStackTrace() ;
} finally { try {
} }
fw.close() ;
bfw.close() ;
} catch ( IOException e ) {
e.printStackTrace() ; }
```

1. 为什么 txt 文件实际大小不足 4 KB 但是实际显示的占用空间却显示为 4 KB?操作系统这样做有什么优点? 
—— 详见操作系统·磁盘管理章节。 
—— 簇 -- 文件系统为保存文件而分配的最小块。磁道 -- 。柱面 --。 
·优点:加快文件操作速度。 
·磁盘碎片:磁盘空间的分配不连续,是通过链表联系起来,导致某些磁盘块未被使用。  ·寻道时间:找到所需文件所耗费的时间,通过移动读写头来访问。磁盘碎片越多,寻道时间越长。  ·多点下载:如迅雷,它是事先将文件大小在磁盘中分配好,然后边下载边将内容放到已经分配好的空间中去,这样对磁 盘的损耗是比较大的,后来为了减少对磁盘的损耗,就采用了缓存机制,先将下载好的内存缓存到内存中,然后将下载好 的转移到磁盘中去,这样对内存的消耗又比较大。 

2. 缓存为什么需要字节数组? 
字节数组存放于内存,用于暂时存放接受到的输入,比如 byte [] bt = new byte[ 1024 ],输入的文件总大小假设为2000 个字节,那么当读取到第 1024 个字节的时候,就将内存中的字节数组中的内容转移到指定的磁盘位置中的文件去, 其中有个文件指针指向当前读取到的第 1024 个字节,当转移完毕后,字符数组清空并继续接受剩余输入,即剩余的 976 个字节,当遇到文件末尾的时候(read() 函数返回 -1 )则停止接受,直接将当前字节数组的数据转移过去。 

3. JAVA 如何操作声音文件? 

``` java
package com.test ;
import javax.sound.sampled.* ; import java.io.* ;
public class Test {
public static void main( String[] args ) {
System.out.println( System.getProperty("user.dir") ) ; // 1. 创建 Audio 对象实例 
String path = "./src/tank.wav" ;
Audio audio = new Audio( path ) ;
audio.start() ; }
}
// 用于播放声音的类 
class Audio extends Thread {
private String file_path ; public Audio( String path ) {
file_path = path ; }
public void run() {
File audio_file = new File( file_path ) ; AudioInputStream ais = null ;
try {
} }
ais = AudioSystem.getAudioInputStream( audio_file ) ; } catch (UnsupportedAudioFileException e) {
e.printStackTrace(); } catch (IOException e) { e.printStackTrace();
}
AudioFormat audio_format = ais.getFormat() ;
SourceDataLine audio_line = null ;
DataLine.Info audio_info = new DataLine.Info( SourceDataLine.class, audio_format) ; try {
audio_line = ( SourceDataLine ) AudioSystem.getLine( audio_info ) ;
audio_line.open( audio_format ) ; } catch (LineUnavailableException e) {
e.printStackTrace(); }
audio_line.start();
int read_bytes = 0 ;
byte[] buffer = new byte[ 1024 ] ; try {
while( -1 != read_bytes ) {
read_bytes = ais.read( buffer, 0, read_bytes ) ; if( 0 <= read_bytes ) {
audio_line.write( buffer, 0, read_bytes ) ; }
}
} catch (IOException e) {
e.printStackTrace(); } finally {
audio_line.drain();
audio_line.close(); }
```

4. 如何避免坦克相撞? 
两个坐标与四个坐标相比 

#### 数据库

1. 如何衡量程序员水平?编程的核心?  —— 数据库 + 网络 + OOP 。 

2. 为什么说用文件保存数据不如数据库好? 
但是数据库的其实还是文件,不过是特殊的文件。 
文件的安全性问题。
文件不利于数据的查询和管理。
文件不利于存放海量数据。
文件在程序中控制不方便。

3. 到底什么是数据库? 

4. 与数据库相关的应用有哪些?简述其间的区别?如何选择数据库规模?  —— 数据挖掘。 

·informix:安全,银行  ·db2:电信级,处理海量数据  ·oracle:专业数据库 
·数据库的选择:  1成本;2功能;3并发性(最终用户);4安全性。  
·数据库认证级别不一样,DB2 最高级。 

5. 数据库的基本结构是怎样的? 
物理数据层（物理存储设备上）；概念数据层（中间层）；逻辑数据层（用户看到）。

不同层次之间是通过映射来转换的。

6. 数据库有哪些基本特点? 
实现数据共享。
减少数据的冗余度。
数据实现集中控制。
数据一致性和可维护性。
故障恢复。

7. 为什么学 SQL Server 2000 ? 
现在一般需要掌握 MySQL/Oracle/SQL Server 。 SQL Server 2000 经典。与后续版本操作大同小异。 
版本之差主要在于:根据需求不同,属于商业运作的结果。  ·XP 安装 sql server 2000 需要打补丁 

8. 什么是 SQL? 
9. SQL Server 基本使用? 
SQL Server 中有几个基本概念:  ·实例:保存数据库。需要输入密码才能进入。  ·数据对象:保存 表+存储过程+触发器。 

10. 查询分析器具体如何使用? 
登录查询分析器后使用命令查询。 

11. 安装 SQL Server 时提示“已经有一个实例被挂起状态”怎么办? 

12. 如何共享数据库?  —— 通过网络。 

13. 表名的命令规范? 

14. SQL Server 有哪些数据类型? 

·如有问题,查阅 SQL Server 联机丛书。 

15. char 和 varchar 有什么区别?如何选择? 
char -- 定长,速度相对快;varchar -- 可变长,空间节省。   

16. 什么是主键?什么是外键?两者什么关系? 

·外键约束:保证数据的完整性。 

17. 如何插入部分字段?  

18. 查询分析器的常用操作有哪些?  —— 增删改查: 

``` sql
简单查询语句:* 能不用就不用。 
·between and 和 <> 的区别:等价。 
·模糊查询:like。 
% -- 0 到多个字符 ;_ -- 表示单个字符。 
```

显示指定条件的多个数据: 
使用逻辑运算符: 
顺序显示: 
使用别名排序:使用别名可以减少资源浪费。  分页显示:-- 子查询,按照主键 id 筛选。 
复杂查询语句: 
·子查询:SQL 的执行是从右向左的 -- select 优化的原则之一就是将能够减少结果集的条件放在后面。 
在 from 子句中使用子查询: 
count 的速度很快。 

多表查询: 
·笛卡儿积: 
自连接(内连接):可以把一张表看成两张表然后使用多表查询。inner join 可省略。 
外连接:左外连接和右外连接。left join/right join , join 可省略。 

19. 如何做压力测试? 

20. 如何删除一张表中的重复记录? 

21. 什么是约束? 

如果不指定值,default 的规定生效: 

22. 什么是行级定义?什么是列级定义? 
先定义字段再指明主键或 unique 就是列级定义;定义完一个字段后立马指明,就是行级定义。   

23. 表的修改? 

24. 什么是 ODBC /JDBC ?Java 如何操作 SQL Server 数据库? 

ODBC 和 JDBC :ODBC 是微软为 SQL Server 开放的接口/驱动,以供其他编程语言调用。JDBC 开始是通过调用 ODBC 间接操作 SQL Server 数据库的,但是后来微软为其开放了 SQL Server API ,所以 JDBC 现在可以直接操作 SQL Server 数据库。(当然 JDBC 也可以操作其他的数据库) 

·Hibernate:ORM 
-- 对象关系映射,实现真正的统一操作各种数据库。  —— Java 对数据库的操作: 
1桥连接: 需要先配置数据源: 

// 本例在 jre1.8 下无法执行,因为在该运行环境下已经删除了 odbc,从而导致找不到类  

``` java
package com.test ;
import java.sql.* ;
public class Test {
public static void main( String[] args ) { Connection sql_server_con = null ; Statement statement = null ;
try {
// 1. 加载所需驱动到内存 
Class.forName( "sun.jdbc.odbc.JdbcOdbcDriver" ) ;
// 2. 得到连接 -- 连接到那个数据源,如果事先在配置数据源的时候选择的是 Windows NT 验证,则不需要登录名和密 码,即: 
// Connection sql_server_con = DriverManager.getConnection( "jdbc:odbc:test_data_source" ) ; sql_server_con = DriverManager.getConnection( "jdbc:odbc:test_data_source", "sa", "pwd" ) ;
// 3. 创建 Statement -- 主要用于发送 SQL 语句到数据库,相当于介质或者 PreparedStatement
statement = sql_server_con.createStatement() ;
// 4. 执行 crud 或者备份、恢复 
String sql_str0 = "insert into test values( 1, \"li\" )" ;
int num = statement.executeUpdate( sql_str0 ) ;
if( 1 == num ) {
System.out.println( "ok" ) ;
} else { System.out.println( "error" ) ; }
String sql_str1 = "select * from test" ;
ResultSet res = statement.executeQuery( sql_str1 ) ;
// 结果集的游标初始指向实际第一行的前一行,所以不能直接取出第一行 getInt(0) while( res.next() ) {
int no = res.getInt(1) ;
String name = res.getString(2) ;
System.out.println( "no:" + no + " name:" + name ) ;
}
} catch (Exception e) {
e.printStackTrace(); } finally {
} }
}
try {
// 关闭连接资源 -- 后创建先关闭  if( null != statement ) {
statement.close();
}
if( null != sql_server_con ) {
sql_server_con.close();
}
} catch (SQLException e) {
e.printStackTrace(); }
```

select * from test where username="li" passwd ='whatever' or 1=1
// 本例在 jre1.8 下无法执行,因为在该运行环境下已经删除了 odbc,从而导致找不到类

``` java
package com.test ;
import java.sql.* ;
public class Test {
public static void main( String[] args ) { Connection sql_server_con = null ; PreparedStatement pre_statement = null ; try {
// 1. 加载所需驱动到内存 
Class.forName( "sun.jdbc.odbc.JdbcOdbcDriver" ) ;
// 2. 得到连接 -- 连接到那个数据源,如果事先在配置数据源的时候选择的是 Windows NT 验证,则不需要登录名和密 码,即: 
// Connection sql_server_con = DriverManager.getConnection( "jdbc:odbc:test_data_source" ) ; sql_server_con = DriverManager.getConnection( "jdbc:odbc:test_data_source", "sa", "pwd" ) ;
// 3. 创建 PreparedStatement -- 主要用于发送 SQL 语句到数据库,相当于介质 
String sql_str0 = "select * from test where no=? and pwd=?" ;
pre_statement = sql_server_con.prepareStatement( sql_str0 ) ;
// 可以通过为 ? 赋值的方式在程序中指定合法的字符串,从而防止 SQL 注入 
// 为第一个 ? 赋值 
pre_statement.setInt(0, 22);
// 为第一个 ? 赋值 
pre_statement.setString(0, "idontknow");
// 4. 执行 crud 或者备份、恢复 
ResultSet res = pre_statement.executeQuery( sql_str0 ) ;
// 结果集的游标初始指向实际第一行的前一行,所以不能直接取出第一行 getInt(0)
while( res.next() ) {
int no = res.getInt(1) ;
String name = res.getString(2) ;
System.out.println( "no:" + no + " name:" + name ) ;
}
String sql_str1 = "insert into test values( 1, \"li\" )" ;
int num = pre_statement.executeUpdate( sql_str1 ) ; if( 1 == num ) {
System.out.println( "ok" ) ;
} else { System.out.println( "error" ) ; }
} catch (Exception e) { e.printStackTrace();
} }
}
} finally { try {
// 关闭连接资源 -- 后创建先关闭  if( null != pre_statement ) {
pre_statement.close(); }
if( null != sql_server_con ) { sql_server_con.close();
}
} catch (SQLException e) {
e.printStackTrace(); }
```

2JDBC 直接操作 SQL Server:只是在加载驱动和获得数据库连接的时候不同其他大同小异,注意需要引入 3 个 jar 包。 

``` java
// 1. 加载所需驱动到内存 
Class.forName( "com.microsoft.jdbc.sqlserver.SQLServerDriver" ) ;
// 2. 得到连接 -- 连接到那个数据源,如果事先在配置数据源的时候选择的是 Windows NT 验证,则不需要登录名 和密码 
sql_server_con = DriverManager.getConnection( "jdbc:microsoft:sqlserver://127.0.0.1:1433;databaseName=test", "sa", "pwd" ) ;
```

3Java 操作 sql server 数据表:   

25. SQL Server 如何备份和恢复数据库? 
使用查询分析器: 
·表的备份和恢复和数据库思路一致。 

26. 什么是接口?什么是 API? 
—— 对程序而言就是代码。函数就是最常见的 API。 

#### 项目开发流程

1. 需求文档(说明文档)包含哪些内容? 
2. 软件开发中有哪些好用的建模工具?  —— jude。用于设计软件。 
3. 软件项目开发中的流程是怎样的?如何按照标准流程开发一个经典的信息管理系统? 
·需求分析文档 
1功能说明:use case 图 -- 使用 uml -- rational rose / jude 。此外,uml 还可以画用例图(描述系统的角色)、时序图、 类图等。 
2设计数据库: 
3原型开发:先搞定界面,再写代码。
-- PS。先设计数据再设计界面就是传统的需求分析文档,反之就是原型开发 -- 相当于建筑的设计图纸、蓝图。
界面确定,数据库的设计就不难了,而传统的需求分析文档编写步骤却会因为用户需求的多 变而经常改动。 

·模式窗口和非模式窗口:模式窗口指的是必须响应结束弹出的对话框才能操作父窗口。非模式窗口指的是可同时任意操作多个窗口。 

4. 软件开发模式有什么用?  —— 更好地支撑大型项目。 

6. UML 主要包含哪些内容? 
—— 架构师的主要工具,类似 astah 。 

UML 可以对系统进行设计。UML 的几个重要的图。

用例图：主要用于说明系统的功能。
类图：说明该系统有多少类。
时序图：用于说明每个用例，他的内部流程［按时间看］。

一般说，每个用例都要有一个时序图对应。

#### 网络基础／Socket 编程

1. 什么是网络协议?其历史发展? 
TCP/IP; HTTP

2. 什么是网络模型? 
—— 模型是模型,实现是实现。模型分层是逻辑上的概念。 

3. 什么是网络全双工? 
—— 寻呼机、对讲机、电话。 
·半双工通信 -- 注意代码的顺序要与实际操作中的发送顺序对应,否则会报错  
1Server

``` java
package com.test ; import java.io.*; import java.net.*; public class Server {
public static void main ( String[] args ) { Server test = new Server() ;
}
public Server() {
try {
// 创建一个连接并指定用于连接的接口 
ServerSocket ss = new ServerSocket( 888 ) ;
System.out.println( "服务器(本机) 888 端口处于监听状态,等待客户端连接中..." ); // 等待某个客户端的连接,该函数会返回一个 Socket 连接 
Socket s = ss.accept() ;
System.out.println( "服务器(本机)已成功连接至客户端!" );
// 读取 Socket 传送的数据 
InputStreamReader isr_client = new InputStreamReader( s.getInputStream() ) ; BufferedReader bfr_client = new BufferedReader( isr_client ) ;
// 接受从控制台输入的信息 
InputStreamReader isr_console = new InputStreamReader( System.in ) ; BufferedReader bfr_console = new BufferedReader( isr_console ) ;
// 服务器发送信息给客户端 
PrintWriter pw = new PrintWriter( s.getOutputStream(), true ) ;
while( true ) {
String info_from_client = bfr_client.readLine() ; System.out.println( "Client:\"" + info_from_client + "\"" ) ; if( info_from_client.equals( "\\exit(0)" ) ) {
System.out.print( "对话结束!" ) ; s.close();
break ;
}
// System.out.println( "输入回送给客户端的信息:" ) ;
System.out.print( "Server:" ) ;
String response_to_client = bfr_console.readLine() ; // 把从控制台接收到的信息回送给客户端 
// pw.println( "Server:Hello Client" ) ;
pw.println( response_to_client ) ;
if( response_to_client.equals( "\\exit(0)" ) ) { System.out.print( "对话结束!" ) ; s.close();
break ;
} }
System.out.println( "连接终止。" ) ;
System.exit( 0 ) ;
} catch (IOException e) { e.printStackTrace();
} }
}
```

2Client 

``` java
package com.test ; import java.io.*; import java.net.*; public class Client {
public static void main ( String[] args ) { Client test = new Client() ;
}
public Client() {
try {
// Socket() 将会连接指定 IP 和端口的服务器 
Socket s = new Socket( "127.0.0.1", 888 ) ;
System.out.println( "客户端(本机)已成功连接至服务器!" );
// 如果连接成功,就可以通过 PrintWriter 开始发送数据给服务器, true 代表即时刷新  PrintWriter pw = new PrintWriter( s.getOutputStream(), true ) ;
// pw.println( "Client:Hello Server" ) ;
// 读取 Socket 传送的数据 
InputStreamReader isr_server = new InputStreamReader( s.getInputStream() ) ; BufferedReader bfr_server = new BufferedReader( isr_server ) ; InputStreamReader isr_console = new InputStreamReader( System.in ) ; BufferedReader bfr_console = new BufferedReader( isr_console ) ;
while( true ) {
// System.out.println( "请输入发送给服务器的信息:" ) ;
System.out.print( "Client:" ) ;
String info_to_server = bfr_console.readLine() ; pw.println( info_to_server ) ;
if( info_to_server.equals( "\\exit(0)" ) ) {
System.out.print( "对话结束!" ) ; s.close();
break ;
}
String info_from_server = bfr_server.readLine() ; System.out.println( "Server:\"" + info_from_server + "\"" ) ; if( info_from_server.equals( "\\exit(0)" ) ) {
System.out.print( "对话结束!" ) ; s.close();
break ;
} }
System.out.println( "连接终止。" ) ;
System.exit( 0 ) ;
} catch (IOException e) { e.printStackTrace();
} }
}
```

·全双工 
1GuiServer 

```java
package com.test ;
import java.awt.*;
import javax.swing.*;
import java.awt.event.* ;
import java.net.* ;
import java.io.* ;
public class GuiServer extends JFrame implements ActionListener, KeyListener {
JTextArea text_area = null ; JTextField text_field = null ; JButton send = null ; JScrollPane scroll_pane = null ; JPanel messgae_panel = null ; PrintWriter pw = null ;
public static void main ( String[] args ) { GuiServer test = new GuiServer() ;
}
public GuiServer() {
text_area = new JTextArea() ;
text_field = new JTextField( 20 ) ; text_field.addKeyListener( this );
send = new JButton( "发送(enter)" ) ; send.addActionListener( this );
scroll_pane = new JScrollPane( text_area ) ; messgae_panel = new JPanel() ; messgae_panel.add( text_field ) ; messgae_panel.add( send ) ;
this.add( scroll_pane, "Center" ) ;
this.add( messgae_panel, "South" ) ;
this.setTitle( "聊天界面Server" );
this.setSize( 400, 300 ) ;
this.setBackground( Color.lightGray ) ;
this.setLocation( 500, 200 ) ; this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
try {
ServerSocket server_socket = new ServerSocket( 8888 ) ;
Socket socket = server_socket.accept() ;
// 读取 Socket 传送的数据 
InputStreamReader isr_client = new InputStreamReader( socket.getInputStream() ) ; BufferedReader bfr_client = new BufferedReader( isr_client ) ;
// 发送信息给客户端 
pw = new PrintWriter( socket.getOutputStream(), true ) ;
while( true ) {
String info_from_client = bfr_client.readLine() ;
text_area.append( "Client:" + info_from_client + "\r\n" ); }
} catch (IOException e) { e.printStackTrace();
} }
@Override
public void actionPerformed(ActionEvent ae ) {
// 如果用户点击发送 
if( send == ae.getSource() ) {
// 就把写在 text_field 上的内容发送给另一个客户端 
String response_to_client = text_field.getText();
pw.println( response_to_client ) ;
text_area.append( "Server:" + response_to_client + "\r\n" ); text_field.setText( "" );
} }
@Override
public void keyPressed(KeyEvent ke ) {
if( ke.getKeyCode() == KeyEvent.VK_ENTER ) {
String response_to_client = text_field.getText();
pw.println( response_to_client ) ;
text_area.append( "Server:" + response_to_client + "\r\n" ); text_field.setText( "" );
} }
@Override
public void keyReleased(KeyEvent arg0) {} @Override
public void keyTyped(KeyEvent arg0) {}
} 2GuiClient
package com.test ; import java.awt.*; import java.awt.event.*; import javax.swing.*; import java.io.* ;
import java.net.* ;
public class GuiClient extends JFrame implements ActionListener, KeyListener {
JTextArea text_area = null ; JTextField text_field = null ; JButton send = null ; JScrollPane scroll_pane = null ; JPanel messgae_panel = null ; PrintWriter pw = null ;
public static void main ( String[] args ) { GuiClient test = new GuiClient() ;
}
public GuiClient() {
text_area = new JTextArea() ; text_field = new JTextField( 20 ) ; text_field.addKeyListener( this ); send = new JButton( "发送(enter)" ) ; send.addActionListener( this );
scroll_pane = new JScrollPane( text_area ) ; messgae_panel = new JPanel() ; messgae_panel.add( text_field ) ; messgae_panel.add( send ) ;
this.add( scroll_pane, "Center" ) ;
this.add( messgae_panel, "South" ) ;
this.setTitle( "聊天界面Client" );
this.setSize( 400, 300 ) ;
this.setBackground( Color.lightGray ) ;
this.setLocation( 500, 200 ) ; this.setDefaultCloseOperation( JFrame.EXIT_ON_CLOSE ) ; this.setVisible( true ) ;
try {
Socket socket = new Socket( "127.0.0.1", 8888 ) ;
// 读取 Socket 传送的数据 
InputStreamReader isr_server = new InputStreamReader( socket.getInputStream() ) ; BufferedReader bfr_server = new BufferedReader( isr_server ) ;
pw = new PrintWriter ( socket.getOutputStream(), true ) ;
while( true ) {
String info_from_server = bfr_server.readLine() ;
text_area.append( "Server:" + info_from_server + "\r\n" ); }
} catch (Exception e) { e.printStackTrace();
} }
@Override
public void actionPerformed(ActionEvent ae ) {
if( send == ae.getSource() ) {
String info_to_server = text_field.getText() ;
pw.println( info_to_server );
text_area.append( "Client:" + info_to_server + "\r\n" ); text_field.setText( null );
} }
@Override
public void keyPressed(KeyEvent ke) {
if( ke.getKeyCode() == KeyEvent.VK_ENTER ) {
String info_to_server = text_field.getText();
pw.println( info_to_server ) ;
text_area.append( "Client:" + info_to_server + "\r\n" ); text_field.setText( "" );
} }
@Override
public void keyReleased(KeyEvent arg0) {} @Override
public void keyTyped(KeyEvent arg0) {}
}
```

4. 什么是网络穿透技术? 
——也是借助具有公网 IP 的服务器实现的,协议是 udp。   

5. 网络必要掌握的知识点有哪些? 

6. 什么是对象流?如何在网络传递对象流? 
—— (QQ 使用 xml 作为数据传输的介质 )。 

7. 什么是序列化? 
—— 如果对象要作为文件保存或者在网络上传输,则必须将对象序列化。class ClassName implements java.io.Serializable。 

8. 为什么一开始无法多人聊天? 
—— 因为开始将 socket 做成了 static ,因此 socket 只有一个,如果多个客户端想要互相聊天,就会出现流并发异 常。解决办法是在客户端也做多线程。 
