---
layout: post
title: Learn Raspberry Pi with Linux
category: Linux
tags: [Linux, 树莓派]
latest: 2015年11月14日 14:15:22
---

这是看 _Learn Raspberry Pi with Linux_ 一书中记的笔记。

Off-the-shelf    现成的

Compromise

Underpinning

Traction

Brute

Thermometer

Wacky

whistle-stop    走马观花

Tweaking    调整

Delve    专研

Obligatory    必须，强制

Remiss  疏忽

Mutually    互相

Gotchas    陷阱

Typos    拼写错误

Splash    泼洒

Niceties    细节

Mice 鼠标

Intervening    介于其中

TUI text-based user interface

Sanity    理智

Boredom   

Threshold    门槛

Leap

Issue  发布

Crisp    干脆

Fickle    轻浮的 反复无常的

A terminal, however, is the native way to talk to Linux.

Scrapes    刮伤
stump     一筹莫展

- The difference between TERMINAL and VIRTUAL TERMINAL

- What are the three terminal?

Fiddle    调整

- What a headless device?

Ø No keyboard, no mice, sometimes no monitor.



Supreme    至高无上的

Preconception    先入为主

Dabble    涉及，涉足

Hierarchy    层次   阶层

Arguably    可以认为
Hypen    连接号

- 什么是 owner, group, world？
Ø 

Immune    免疫

Revoke    废除

- 文件权限设置：chmod

- U    g    o    a

- +    -   =

- R  w  x

- Read - 4
- Write -2
- Execute-1

按数字风格进行权限设置的时候必须 3 位数字一组同时出现

- Chown

- Chgrp

单独使用 chgrp 的时候很少，因为文件所有者和所有组基本上都是同时改变的。可以通过 chown 一次性更改文件的所有者和所有组：

```
$sudo chown pi:pi file_name
```

Chmod 系列指令用于目录时，如果要使目录中的所有文件继承目录的新权限，需要带参数 -R

Manipulate

Propagate  

Capital letter 

Lowercase letter

Semantic    语义的

- Linux 快捷方式

```
# 软链接
$ ln -s 源文件 链接名
# 硬链接 ( Linux 默认 )
$ ln 源文件 链接名
```
