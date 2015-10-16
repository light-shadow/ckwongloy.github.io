---
layout: post
title: 从 Struts/Spring/Hibernate 到框架简谈
category: Java
tags: [Struts, Spring, Hibernate, 框架, MVC]
latest: 2015年10月13日 17:24:27
---

总结下 Struts，总结下 Spring，最后讲讲框架。

### 什么是 Structs

一种基于 MVC 的 Web 框架，采用 Java 语言编写。

#### 为什么会出现 Structs？框架是怎么来的？

由于每个人对 MVC 的理解不同，导致了程序员在写程序的时候规范不统一，这样不利于项目的维护和拓展，尤其对于公司来说，这是不利的。

所以 **非常有必要使用一个统一的规范来开发项目，而这统一的规范就是框架** ，Structs 只是众多框架的一个例子而已。

几乎所有框架都是这么出现的。

Struts 运行原理
-

从全局的角度，Structs 运行过程中出现的角色有：

- __structs-config.xml__

Struts 的核心文件之一。其配置了：

1、 actionForm

2、 action

3、 上述 2 者之间的关系

- __ActionServlet__

总控制器，由 Structs 提供，只需配置，Web 服务器解析资源名之后就将其转发给 ActionServlet。

ActionServlet 查询 structs-config.xml，然后把用户数据填充到表单，最后调用指定的 action。

ActionServlet 处理返回结果时也会查询 structs-config.xml。

除了 ActionServlet 不用自己写之外，其他角色都是需要自己编写的。

- __actionForm__

表单，用于存放数据。

- __action__

分控，其本质就是 servlet 控制器，可以有多个。

Struts 中规定的是，来自浏览器的请求最终都是交给 action 去执行，比如从表单中获取数据。

action 将把处理结果返回给 ActionServlet。

- __model__

Java 类 ( Service )，由 action 调用。
 
- **界面**

如 index.jsp，属于页面，就是网页。

经过服务器后台处理之后，jsp 文件最终将会处理成一个静态的  HTML 文件返回给浏览器。

- **浏览器**

发送 HTTP 请求，如表单信息。

- **Web Server**

接受浏览器请求，并交给后台 Struts  处理，最后将处理结果其返回给浏览器。

#### Structs 的不足

- form 表单有点鸡肋。

- action 是单态，对网站的并发性处理有一定的影响。

Struts 开发步骤
-

1、 引入 struts 开发包

2、 编写 login.jsp

3、 编写 ActionFrom  和 Action

4、 配置 structs-config.xml 文件

5、 写出 welcome.xml 和 error.jsp 页面

6、 在 web.xml 中配置 ActionServlet

7、 开始使用 Struts

##### **注意**

Struts 中文乱码问题： 过滤器。

#### 什么是模式

模式是一种思想。

Spring
-

- 一种 Java 写的 Web 框架 ( jsp/action/actionfrom )。

- hibernate 是 ORM 框架，属于持久层。

- Spring 是容器框架，用于配置 bean，并维护 bean 之间的关系。

#### bean

bean 是 Spring 中的重要概念。

实质是 Java 中的任意一种对象，可以是 Javabean、Service、Action、数据源、dao、ioc 、di 等。

##### **说明**

- ioc ：Inverse of Control，控制反转。

- di：Dependency Injection，依赖注入。

### Spring 层次图

可以控制数据库层面的4 层逻辑：Web 层、业务层、dao、持久层 ( Hibernate )。

这也是为什么 Spring 被称为 ***容器框架*** 的原因，因为它可以控制各个层的组件。

组件就是 Java 对象，即 bean。

### Spring 项目开发步骤

1、 引入 Spring 开发要用的 jar 包

最小配置： spring.jar + common-loggin.jar

2、 创建 Spring 的核心文件：**applicationContent.xml**。

通常用于 *src* 文件夹下面，通过配置该文件去配置 bean。

在该文件中引入 xsd 文件 ( 代码可直接拷贝 )。

##### **说明**

Hibernate 的核心文件是：hibernate.cfg.xml。

3、 配置 bean。

在 Spring 框架在被加载的时候就会自动创建一个 bean。

```
<bean id="userService" class="com.service.UserService">
// 体现了注入的概念
	<property name="name">
		<value>Li</value>
	</property>
</bean>
```

4、 使用 bean。

得到 Spring 的  applicationContext 对象 ( 容器对象 )。

```
ApplicationContext ClassPathXmlApplicationContext( "applicationContext.xml" ) ;
UserService us = (UserService) ac.getBean( "UserService" ) ;
us.saySomething() ;
```
Hibernate
-

学习一门新技术，需要考虑如果没有该技术问题会怎样解决，这样才能理解得深刻。

万事开头难，对于入门来说，通常需要必备某个技术的 API 和手册，一定会经常查到的。

而且如果有相关的书籍，那么还需要看书去深入。

#### 什么是 Hibernate？

一种 ORM 框架，处于项目的持久层，所以 Hibernate 也叫持久层框架。

Hibernate 实际上就是对 JDBC 进行了轻量级的封装。

Hibernate 的基础依然是 Java 的反射机制。

##### 什么是 ORM ？

Object Relation Mapping。

#### 为什么需要 Hibernate？

考量 **为什么** 一般都是从它们的优点，以及如果没有它们会怎样。

- 如果不使用 Hibernate 是如何处理问题的？

界面操作业务层 ，业务层操作数据库。

- 使用 Hibernate 是如何处理的？

界面操作业务逻辑，业务逻辑操作数据持久层，数据持久层操作数据库。

如果有 dao，那么在数据持久层和数据库之间还隔着 dao 层。

- Hibernate 的优点

1、 数据持久层解决了对象模型 ( 业务逻辑 ) 和关系模式 ( 关系型数据库 ) 之间的阻抗问题。

2、 Hibernate 将程序员从对数据库操作的分心当中解放出来，从而能够专注于业务本身，而对数据库的操作将有数据库管理员专门负责。这样，角色分工就非常细化、明确了。

3、 分层更清晰，耦合性更小，可以随意地切换数据库，通用性也更强。

4、 程序员只要会 HQL，那么就可以通过操作持久层的 Hibernate 去操作任何一种数据库。

可以看出，持久层 Hibernate 在这里充当了一个翻译的角色。

5、 对象化：把关系型数据库变成了 Java 的对象，操作更平滑。

6、 性能保证：Hibernate 可以优化 SQL 语句，比经验不足的程序员写的 SQL 语句效率会更高。

#### 如何学习 Hibernate？

主要学习三个方面：

- Hibernate API 

- hibernate.cfg.xml

Hibernate 的核心配置文件。

- 对象关系映射文件

#### Hibernate 的应用场合？

- J2SE 项目

- J2EE 项目 ( Web )

##### **说明**

Struts 是 Web 界面框架 ( jsp )，所以不能用于 J2SE 项目中。

MVC
-

数据的输入、数据的处理、数据的显示 ( JSP ) 分离。

框架
-

Frameset、Framework。

### 框架的优、缺点

通常来讲，框架主要有如下优点：

- 使程序更加规范。

- 提高了程序开发效率。

- 增强了程序的可读性。

- 增强了程序的可维护性。

虽然框架提高了程序的规范，也在一定程度上约束了程序员的自由，但是对公司来说是有利的。

不用框架当然也可以做相应的开发，只是在上述特点上或许会差很多 ( 对绝大多数程序员 )。
