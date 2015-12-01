---
layout: post
title: MVC 入门
category: Programming
tags: [MVC, 设计模式, PHP]
latest: 2015年11月25日 14:43:49
---

设计模式
-

设计模式是对软件开发中面临的一般问题的解决之道，是前辈们的经验结晶，可谓技术的最佳实践。

设计模式使代码编制真正工程化，因此是软件工程中的一个重要概念。

使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。在绝大多数场合下，使用设计模式都可以完美地解决问题。

每种模式在现实中都有相应的原理来与之对应，每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，MVC 就是常见的设计模式之一。

PHP 程序员为什么要学习 MVC ？
-

- 可以快速上手各大主流 PHP 框架，比如 yii，thinkphp, ci 等。

- 快速适应多数公司的 Web 开发需求。

- 加深对 Web 系统架构的了解，为技术的进阶打下基础。

### MVC 有哪些优势？

- 视图、模型、控制器三层角色各司其职，有利于 **分工开发**。这样，对 Web 应用每一层的开发都可以交给更专业、更熟悉该领域的技术人员去完成，可以提高系统整体的质量。

- 有利于代码的 **重用** 和 **维护**。

什么是 MVC？
-

一种软件设计典范。用一种强制性要求业务逻辑和数据显示分离的办法来组织应用程序结构，将业务逻辑放到一个部件，在界面和用户围绕数据的交互能被改进和个性化定制的同时，而不需要重新编写业务逻辑。MVC 三大角色的作用分别是：

- __Model__：按要求从数据库中取数据。

- __View__：实际直接看到的 Web 界面。

- __Controller__: 向系统发出指令的工具和帮手。

MVC 工作流程举例
-

1、 浏览者：调用控制器，发出指令。

2、 控制器；按浏览者发出的指令选取一个合适的模型。

3、 模型：按控制器发出的指令取相应的数据。

4、 控制器：按指令取相应的视图。

5、 视图：把第 3 步取到的数据按用户想要的样子显示出来。

可以看出，控制器在 MVC 工作流程中充当了很重要的角色：**控制器调用模型，并在视图与模型之间处理相关逻辑**。

单入口机制
-

### 什么是入口程序？

指在一个 Web 应用程序中，所有的请求都是指向一个脚本文件，通常都是 index.php，index.html，index.asp, index.jsp 等形式。所有对该 Web 应用程序的访问都必须通过这个入口，这种规定也被称为单一入口机制。

### 入口程序有什么用？

- 统一 URL 格式：Web 应用的入口都统一为入口程序。

- 可以在入口文件中使用安全的方式接受传递来的控制器名和方法名。

视图引擎
-

应该都知道 PHP 写的常见的视图引擎有：Smarty, PHPLIB 等等。但是我们不能仅仅使用，还要挖掘其背后隐藏的原理才能学得更深刻。

### 为什么需要视图引擎？

### 什么才算是优秀的视图引擎？

- 基于该引擎开发出来的模板要更贴近标准的 HTML。

- 语法简单易懂。

- 良好的缓存机制。

- 扩展性好。

- 网络资源多。

Q&A
-

- 为什么要慎用 `eval()` 函数？

`eval()` 函数调用简单但是不安全，因为 `eval()` 中的代码可以被浏览器执行，这很有可能被滥用。因此，在对安全性要求比较高的情况下，建议把 `eval()` 函数中的代码分解为几步单独执行。

参考
-

- Design Patterns - Elements of Reusable Object-Oriented Software .