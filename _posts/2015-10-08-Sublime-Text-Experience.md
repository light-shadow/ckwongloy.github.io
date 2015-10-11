---
layout: post
title:  Sublime Text 个人经验
category: Auxiliary
tags: [Sublime Text, 注册表]
latest: 2015年10月08 16:18:20
---

编辑器本人使用最久的是 **EditPlus**，但据说 **Sublime Text** 十分强大，好奇心驱使下，使用了一段时间，现在发现我也喜欢上了它。

我会不断在这里总结在使用 Sublime Text 个人版的使用经验。

添加 Sublime Text 到 Windows 右键菜单
-

默认情况下 Sublime Text 没有出现在鼠标右键菜单的，虽然可以网页等文件的设置默认打开程序为 Sublime Text，但是有时候编辑和查看网页的切换是不方便的。

因此，需要将 Sublime Text 添加到右键菜单。步骤如下：

1、Win + R：`regedit`。

2、找到路径： **HKEY_CLASSSES_ROOT/*/Shell** 。

3、在 Shell 下，新建项命名为 Sublime-Text (名字不重要，但见名知意最好 )。

在右边窗口新建字符串值 ( 右键 -> 新建 -> 字符串值 )，名称：Icon；值：`C:\OOB\Sublime\sublime_text.exe,0`。

4、在新建的项下面新建项 **Command** ( 必须这个名称 )，修改右侧窗口的默认值为：`C:\OOB\Sublime\sublime_text.exe %1`。

#### **说明**

1、也可以通过 ***.reg*** 文件导入设置：

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\Sublime-Text]
"Icon"="C:\OOB\Sublime\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\*\shell\Sublime-Text\Command]
@="C:\OOB\Sublime\sublime_text.exe %1"
```

2、Windows 下任意软件都可以使用这种方式将其添加到右键菜单。

##### **注意**

路径是的 Sublime Text 的安装文件目录，实际情况灵活修改。

多行编辑
-

Sublime Text 的多行编辑使我们操作每行代码的时候就像操作文件一样可以多选，极大地提高了速度。

具体做法是：按住 Ctrl，然后在你想要编辑的行的某列点击鼠标即可，选择完毕松开 Ctrl。

