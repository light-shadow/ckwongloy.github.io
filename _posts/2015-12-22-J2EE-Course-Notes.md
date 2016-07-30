---
layout: post
title: 《Java EE》 听课笔记
category: Java
tag: Java
latest: 2015-12-28 17:02:44
---

#### 0

不求甚解,既然要调用别人的接口就首先要信任别人,不然就是浪费时间
不要去纠结为什么数据结构叫 int double 这种问题!!!因为你是在学习使用别 人的技术

- J2EE 内容介绍

J2EE 的很多技术都是从 Servlet 走过来的,JSP 也是基于 Servlet 的

基础部分
1.Servlet
2.Jsp

高级部分
3.Structs
4.Hibernate
5.Ejb
6.Spring

- 动态网页；CGI
- b/s，c/s

B/S架构的应用升级只需升级服务器,而 C/S 架构的应用升级需要同时升级服务器和客户端

80 端口一般都会开放,故而很少被防火墙拦截,出现故障的概率较小

C/S 比较安全,因为服务器和客户端之间怎么通信的是由开发者自己来决定的
C/S 利于管理用户,控制收费等

- jsp + asp 对比
  asp=html+css+javascript(vbscript)+com
  jsp=html+css+javascript+jsp+java

class 字节码运行速度快，基本上可以认为是用空间换时间。

- JDK／Tomcat/jBoss 等开发环境

- Servlet 和 Applet :服务器端小程序和客户端小程序
  Servlet 是顶层容器,也是一种规范,Java 开发动态网页必须按照 Servlet 的规范来进行网 站开发

#### Servlet 会话技术以及数据库操作 ＋ Servlet 体系结构和网络拓扑结构

同一用户不同页面共享数据的四种方式：
1.cookie 
2.隐藏表单
3.session
4.sendRedirect()

- servlet 链接数据库

- servlet 体系结构
- servlet 网络拓扑
- servlet 生命周期

#### FAQ

- Servlet 为什么没有 main() 方法?

servlet是在web服器中运行的,建议baidu下servlet的生命周 期。web服务器(常见的有tomcat,websphere,jboss等)会生 成每一个servlet的实例。客户端调用时,根据调用方法的不同, 会分别调用servlet的doGet(...),doPost(...)等方法,一般个人实 现servlet都会覆盖这两个方法中的一个。还有就是你了解 下servlet和jsp之间的关系。

- java编译错误 程序包javax.servlet不存在javax.servlet.* ?
  由于servlet和JSP不是Java平台JavaSE(标准版)的一部分,而 是Java EE(企业版)的一部分,因此,必须告知编译器servlet的 位置。

- 解决“软件包 javax.servlet不存在”错误的方法:
1. 搜索servlet-api.jar
   所在文件夹:apache-tomcat-7.0.29\common\lib
2. 将环境变量CLASSPATH的值设置为:
   .;...apache-tomcat-7.0.29\common\lib\servlet-api.jar
3. 除了设置classpath以及servlet-api.jar外,还有一点!!!
   把COMMON/LIB下的SERVLET-API.JAR 拷贝到JDK/jre\lib\ext 下

- 关于 J2EE 中 Servlet 的构造方法和 init() 方法?
  一直有个疑问:构造函数用来初始化类,可是servlet初始化却 是init方法,可servlet本质上也是java类,那它的构造方法和init函 数到底是什么关系?
  上网搜索了一下,得到以下结论:
  首先,构造函数是有的,虽然我们通常不写servlet的构造函数, 但是就像任何一个普通的java类一样,编译器会自动给你生成一 个默认构造函数;
  其次,构造函数和init方法都会被web容器调用,而且是先调用构 造函数,然后调用init方法;
  最后,貌似容器只会调用默认构造函数,所以如果你自己写了带 参数的构造函数(系统就不会自动生成默认构造函数),容器初 始化servlet就会出错......P.S.:任何时候都不推荐自己写构造函数 来初始化servlet类,哪怕你自己提供不带参数的构造函数......

- Linux tomcat 配置

``` shell
[root@master ~]# unzip apache-tomcat-6.0.30.zip
[root@master ~]# mv apache-tomcat-6.0.30/ /usr/local/ [root@master ~]cd /usr/local/
[root@master local]# ln -s /usr/local/apache-tomcat-6.0.30/ /usr/local/tomcat
[root@master local]# cd tomcat/bin/
[root@master bin]#ls
[root@master bin]#vim catalina.sh

# 添加以下内容:  CATALINA_HOME=/usr/local/apache-tomcat-6.0.30/ [root@master local]#chmod +x *.sh 

# 启动tomcat服务器 
[root@master tomcat]# /usr/local/tomcat /bin/catalina.sh
start Using CATALINA_BASE: /usr/local/apache-tomcat-6.0.30/ Using CATALINA_HOME: /usr/local/apache-tomcat-6.0.30/ Using CATALINA_TMPDIR: /usr/local/apache-tomcat- 6.0.30//temp
Using JRE_HOME: /usr/local/jdk1.6.0_05 Using CLASSPATH: /usr/local/apache-tomcat- 6.0.30//bin/bootstrap.jar
[root@master logs]# cd /usr/local/tomcat/logs/ [root@master logs]# tail -f catalina.out
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMeth odAccessorImpl.java:25)
at java.lang.reflect.Method.invoke(Method.java:597)
at org.apache.catalina.startup.Bootstrap.start(Bootstrap.java:289)
at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:414) Jul 4, 2011 11:06:57 AM org.apache.coyote.http11.Http11Protocol pause
INFO: Pausing Coyote HTTP/1.1 on http-8080
Jul 4, 2011 11:06:58 AM org.apache.catalina.core.StandardService stop
INFO: Stopping service Catalina
Jul 4, 2011 11:06:58 AM org.apache.coyote.http11.Http11Protocol destroy
INFO: Stopping Coyote HTTP/1.1 on http-8080 
```

在浏览器中输入  http://localhost:8080/(如果不是本机,则输入对应的ip地址)  测试出现tomcat页面则测试成功 

ps:需要说明的是tomcat的默认测试页面是放在webapps下面, 这个其实是在server.xml文件中配置的,如下所示: 

``` xml
<Host name="localhost" appBase="webapps"
unpackWARs="true" autoDeploy="true"
xmlValidation="false" xmlNamespaceAware="false">
```

1)webapps文件夹主要用于web应用程序部署,比如你可以把你 的应用程序包,如war文件拷到该目录下,容器会自动部署。  2)conf文件夹下主要是放置tomcat的服务器的相关配置文件 

五。添加应用,再次进行测试  在webapps目录下放测试包(注意:webaapps目录下面主要是放 应用包的.war在tomcat重启访问后会自动解压) 

``` shell
[root@master webapps]# pwd
/usr/local/tomcat/webapps
[root@master webapps]# tar -zxvf moni2.tar.gz
[root@master webapps]# ls
docs examples host-manager manager moni2 moni2.tar.gz ROOT
[root@master webapps]# /usr/local/tomcat/bin/catalina.sh start(重启tomcat) 
Using CATALINA_BASE: /usr/local/apache-tomcat-6.0.30/ Using CATALINA_HOME: /usr/local/apache-tomcat-6.0.30/ Using CATALINA_TMPDIR: /usr/local/apache-tomcat- 6.0.30//temp
Using JRE_HOME: /usr/local/jdk1.6.0_05
Using CLASSPATH: /usr/local/apache-tomcat- 6.0.30//bin/bootstrap.jar
```

在浏览器中输入如下地址:  http://192.168.55.229:8080/moni2/

六。修改tomcat的监听端口 

```
[root@master ~]# cd /usr/local/tomcat/conf
[root@master ~]# ls
[root@master ~]#vim server.xml
<Server port="8005" shutdown="SHUTDOWN">【停止tomcat 时的端口】 
<Connector port="8081" protocol="HTTP/1.1" connectionTimeout="20000"
redirectPort="8443" /> 【tomcat默认的监听端口是8080,现
在改成8081】 
<Connector port="8009" protocol="AJP/1.3" redirectPort="8443"/>
```

【apache+tomcat模式时访问tomcat的端口】  现在重启tomcat。访问http://192.168.55.229:8081/moni2/【注 意:这时就需要修改端口了】 

七。创建tomcat实例  假如我们现在使用的地址是:192..168.55.229,假如我们想在该机 器上面创建tomcat实例,但是我们创建实例的脚本在服务 器192.168.55.233上面上线,那么我们需要怎么做呢,请看以下步 骤: 

``` shell
[root@master ~]# mount -t nfs 192.168.55.233:/opt/nfs /nfs【挂载 目录】 
[root@master ~]# cd /nfs/
[root@master nfs]# ls tcfile
[root@master nfs]# cd tcfile/
[root@master tcfile]# ls
backupfile deployfile instancefile
[root@master instancefile]# ls tomcatTemplate tomcatTemplate.zip
[root@master instancefile]# cd tomcatTemplate
[root@master tomcatTemplate]# ls
bin conf lib LICENSE logs NOTICE RELEASE-NOTES RUNNING.txt

temp webapps work
[root@master tomcatTemplate]# cd bin
[root@master bin]# ls
bootstrap.jar commons-daemon.jar createResource.sh resource.properties startup.bat tool-wrapper.sh
c3p0.template commons-daemon-native.tar.gz digest.bat setclasspath.bat startup.sh version.bat
catalina.bat cpappend.bat digest.sh setclasspath.sh tomcat-juli.jar version.sh
catalina.sh createInstance.sh encrypt.bat shutdown.bat tomcat-native.tar.gz
catalina-tasks.xml createInstance.sh.bak encrypt.sh shutdown.sh tool-wrapper.bat
[root@master bin]# sh createInstance.sh tomcatServer229-1【创 建实例】 
/nfs/tcfile/instancefile/tomcatTemplate
New instance tomcatServer229-1 has successfully builded, and shutdown.port=10001
ajp.port=8011
http.port=8081
https.port=8041
jmx.port=6901
[root@master bin]# cd /opt/oracle/tomcat/【可以在这个目录下 面进行查看】 
[root@master tomcat]# ls tomcatServer229-1【命名规则,默认都是tomcat名字+-n表示第 几个实例;实际上是脚本中规定有格式】 
```

- JDK 配置?

``` shell
vim /etc/profile
在尾部添加: 
export JAVA_HOME=/usr/java/jdk1.7.0_51/
export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
export CLASSPATH=.:/usr/java/jdk1.7.0_51/lib:/usr/java/jdk1.7.0_51/jre/lib:$CL ASSPATH 
刷新配置文件
source /etc/profile
```

配置 tomcat 8080 端口只指向一个项目? Vim /path/to/server.xml
在末尾添加: 

```
<Context path="" docBase="/path/to/proc"/>
```

其中,/path/to/proc 代表的是编译后的可执行路径。

#### 关于 Servlet 的认识

首先Servlet是用来开发网站的,是一个Java程序,能动态生成HTML网页 
一.编写servlet步骤:
1、创建 web project
2、比如创建demo1.html
3、编写一个Servlet生成一个HTML页面 创建一个class 继承 HttpServlet
4、编写的Servlet程序 需要在web.xml 中进行注册 ---为Servlet 配置虚拟访问路径 ,客户端通过路径访问该
Servlet/ demo1
5、覆盖doGet 和 doPost

二.使用servlet生成动态的html注意事项
使用Servlet 动态Servlet 生成HTML
通过servlet动态生成html,通过响应对象获得输出流 PrintWrite out = response.getWriter();
通过这个流对象,打印出html代码.但是发现有"中文乱码"
解决方法---在获取输出流前需要执行
response.setContentType("text/html;charset=utf-8")--设置服务器响应输出编码集
Servlet没有main函数,不是独自运行,需要运行在tomcat服务器上,由tomcat程序调用Servlet并进行执 行

三.servlet的生命周期
Servlet接口中提供5个方法,其中init service destroy 这三个方法描述了Servlet 对象生命周期(Servlet对象从 创建到销毁完整过程)
第一次访问Servlet 时,Servlet构造方法执行、init 执行,执行service,如果不是第一次访问Servlet ,直接执 行service ,正常关闭服务器 destroy 执行 --- 执行tomcat shutdown.bat
结论:
1、Servlet对象只会在服务器端创建一个,init 方法也只会执行一次 , 默认是在第一次访问Servlet时 创建对 象 调用init
2、每一次客户端HTTP请求,都将执行服务器Servlet对象 service方法 (以独立线程进行执行,当多个线程访问 同一个共享资源时发生并发)
* 为了不出现并发问题,Servlet对象只有一个实例,通常不编写Servlet对象成员变量
* 栈空间时线程私有的 不会发生并发问题 ,只有堆空间是进程独享,进程由多个线程组成,堆空间上变量才能 导致 多线程并发问题
  3、在服务器正常关闭时,执行一次 destroy
  四.在编写servlet时并没有重写service,这是为什么?
  service 和 doGet/doPost 关系
  在 H t t p S e r v l e t 中 s e r v i c e 方 法 内 根 据 请 求 方 式 执 行 d o G e t 或 者 d o P o s t (   查 看 S e r v l e t 源 代 码 即 可 )

五.配置load-on-startup
默认情况下Servlet程序是在第一次访问时,创建对象(执行构造方法),执行init ----- 如果想在服务器启动时就 创建Servlet对象并执行init 有无办法???
* 在元素中 添加 语法 数字(加载Servlet优先级 0-9 0优先级最高 )

六.编写Servlet注意事项
1、Servlet初始化时只要覆盖init()即可,无需覆盖init(config)
* 覆盖无参数init 也会得到初始化执行,因为在GenericServlet中 init(config) 调用 init()，那么在初始化时 执行哪个方法 ?答案:2 只会执行生命周期 init(config)
* 2、继承HttpServlet 只需覆盖doGet 和 doPost 无需覆盖service 3、当doGet 和 doPost 代码完全相同 互相调用 简化编程

七.servlet虚拟路径的3种方式
1、完全路径匹配 : 以/开始 例如:/demo1、/demo2、/aa/index.html- ---- 不存在通配符* 2、目录匹配 : 以/开始 使用通配符* 例如:/*、/aa/*、/bb/cc/*- --- /a*b* /a* 错误的
" * " 表示某个目录下所有资源
3、扩展名匹配:不能以/开始 使用通配符 例如:*.do 、*.action ----- /*.do、/aa/*.action 错误的 完全路径> 目录 > 扩展名

八.servlet中常用的2个接口ServletContext,ServletConfig
ServletConfig常用于读取web.xml文件中给servlet配置的参数信息, getServletConfig()可以获取对象
ServletContext代表servlet上下文对象,每个工程只有一个,所以他可以实现数据共享
ServletContext 应用
1、获得整个web工程全局(该工程所有Servlet都可以访问)初始化参数
2、可以实现数据共享,ServletContext对象是全局唯一,保存到该对象的数据,可以从当前应用任何程序获 得
3、可以利用ServletContext对象读取web应用中资源文件

第一个应用:配置全局初始化参数
ServletContext 与 ServletConfig 提供初始化参数不同 ?? 配置ServletContext全局参数 getServletContext().getInitParameter(参数名称); 

第二个应用:使用ServletContext对象实现全局数据共享 如果在ServletContext中保存一个数据,所有Servlet都可以访问该数据 网站访问计数案例
向ServletContext保存数据 setAttribute() ------- 相当于map.put
取得ServletContext中数据 getAttribute ---- map.get 这里取出数据是 Object 需要强制类型转换

第三个应用:通过ServletContext读取web 工程中资源文件
回顾 java工程读取文件 通过main函数读取 ---- JVM中直接运行
web 工程读文件 通过Servlet读取- ---- Tomcat中运行 注意这里读取web中的资源,比如某个文件1.txt位于WEB-INF下面,需要用到"绝对磁盘"路径 getServletContext().getRealPath("/WEB-INF/1.txt");
和普通javase中通过流的方式读取不同.

####   complie build make

编译,是将源代码转换为可执行代码的过程。编译需要指定源文件和编译输出的文件路径(输出 目录)。Java的编译会将java编译为class 文件,将非java的文件(一般成为资源文件、比如 图片、xml、txt、poperties等文件)原封不动的复制到编译输出目录,并保持源文件夹的目 录层次关系。
在Java的集成开发环境中,比如Eclipse、IDEA中,有常常有三种与编译相关的选 项Compile、Make、Build三个选项。这三个选项最基本的功能都是完成编译过程。但又有很大 的区别,区别如下:

1、Compile:只编译选定的目标,不管之前是否已经编译过。
2、Make:编译选定的目标,但是Make只编译上次编译变化过的文件,减少重复劳动,节省时 间。(具体怎么检查未变化,这个就不用考虑了,IDE自己内部会搞定这些的)
3、Build:是对整个工程进行彻底的重新编译,而不管是否已经编译过。Build过程往往会生成 发布包,这个具体要看对IDE的配置 了,Build在实际中应用很少,因为开发时候基本上不用, 发布生产时候一般都用ANT等工具来发布。Build因为要全部编译,还要执行打包等额外工 作, 因此时间较长。

这篇文章说得比较清楚,因此,如果平时只修改了少数几个文件的话,应使用make命令,这样 可以节省编译的时间。不然编译整个工程是非常耗时间的。

#### IntelliJ 配置和快捷键

- 配置编译的 class 文件路径:
  File -> Project Structure -> Modules -> Path -> Use module complie output path
  下面填写 classes 文件夹需要在文件系统的绝对路径即可。
  注意 : classes 文件夹和 web.xml 会被 IntelliJ 编译时创建,一次上面填写的路径不要含有
  classes 而是 classes 的上级路径,也就是 WEB-INF。
  由于这里的 classes 是固定的,因此,为了方便,在开发的时候如果打包建议打包成 package classes.test; 这样就会在 classes 目录下产生编译文件。

不要使用 IntelliJ 的默认路径(Inherit project complie output path),否则在访问页面 的时候 Tomcat 会提示 404
最后,取消勾选 Exclude output paths。

- 设置字体
  File -> Settings -> Editor -> Colors & Fonts -> Font
  由于默认的方案不能被修改,所以需要复制一份现有的 Scheme 另存为 Custom,然后就 可以在下面选择字体。

- 快捷键
  Ctrl + F9 编译
  Ctrl + Shift + F10 运行
  Alt + Insert 重写/覆盖方法

#### 参考

- <http://www.cnblogs.com/ini_always/archive/2011/10/23/2221985.html>

- <http://blog.sina.com.cn/s/blog_8c8c9be70101akcr.html>

- [代码提示功能消失](https://github.com/Damao/Intellij-IDEA- F2E/blob/master/FAQ/%E9%97%AE%E9%A2%98%E9%9B%86%E5%90%88/JavaWeb%E9%A1 %B9%E7%9B%AE/%E8%A7%A3%E5%86%B3%E4%BB%A3%E7%A0%81%E6%8F%90%E7%A4%BA %E5%8A%9F%E8%83%BD%E6%B6%88%E5%A4%B1.md)
