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

如果不想一行一行点，可以先选中要编辑的区域，然后使用：Ctrl + Shift + L 进入多行编辑状态。

多列编辑
-

具体做法和多行编辑类似，Ctrl + 选择列。

代码中快速添加引号
-

写代码的时候如果忘了给某个字符串添加引号，一般的做法是光标移动到字符串的首尾，然后分别加引号。

但是一般的编辑器都可以自动识别一个字符串集，即如果字符串两端有空格分开，那么双击鼠标左键即可自动选择被空格隔离出来的字符。

这样选中之后可以直接按单引号或者双引号，这样字符串就会被自动添加上引号了。

##### **说明**

必须在英文输入法下。

Sublime 快捷键
-

- Ctrl + PageUp/PageDown

切换页面。这个在写文件比较多的项目时会比较快，主要是 up/down 自然有个方向在里面，可以快速返回，这是鼠标不能做到的。

- Ctrl + F/H

查找与替换。感觉比 EditPlus 的查找/替换好用。

- Ctrl + D

快速选择行。不过遇到空格会被截断。

- Ctrl + Shift + Enter/Delete

可以在不移动光标的情况下回车/反回车。一般我们回车的时候光标都是随回车一起移动的。

- Shift + Insert

向下复制光标所在行。

- Tab

在编写 HTML 时，可以通过 tab 快速补全。比如，输入 `!` 后按 tab，就会自动补全 HTML 基本标签；输入任何标签然后按 tab，Sublime Text 都可以自动补全开闭标签。

不过需要注意标签名前后不要有中文字符，否则按 tab 只是一个缩进。