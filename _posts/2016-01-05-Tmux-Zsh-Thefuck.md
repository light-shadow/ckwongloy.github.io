---
layout: post
title: Linux 常用工具: Tmux、Zsh、rzsz 等
category: Linux
tags: [Tmux, Zsh, Thefuck, Linux, 终端, Shell]
latest: 2016年1月5日 21:45:59
---

久闻文本三巨头 ( zsh+tmux+vim ) 大名，但目前只用过 bash 和 vi/vim 最基础的操作，只能说我需要才回去用而非仅因为名气大。

而且这么晚才用 Tmux 也没啥好值得炫耀啥的，这里记录一下它们的安装和配置就行了。

至于 Thefuck 暂时觉得还有很大的改进空间，不过还是挺有用的。

Tmux
-

我只还想说一句，当我把显示器屏幕分割成我想要的多个终端窗口时，我就知道，我会成为 Tmux 的重度使用者了。

刚开始学习使用记多了也没什么卵用，先来最简单可用的几个配置和快捷键就好，其他的先 mark，有需求再弄。


- **下载安装 Tmux**

```
# centos
yum install libevent-devel
yum install tmux

# debian
apt-get install libevent-dev
apt-get install tmux
```

- **配置 Tmux 命令前缀组合键**

这名字是我自己取的，意思就是要用 Tmux 的一些命令之前，必须要先按一组组合键才能区分接下来在终端键入的命令是 Tmux 要解析的。

先在家目录创建一个 tmux 的配置文件：

```
vi ~/.tmux.conf
```
然后添加配置信息，C 代表 Ctrl：

```
# 设置前缀为Ctrl + z
set -g prefix C-z
# 解除 Ctrl+b 与前缀的对应关系
unbind C-b
```

Tmux 会话管理
-

和 Screen 一样，Tmux 也可以实现离线操作，这样在 SSH 客户端遇到突发状况还是很有用的。下面是 Tmux 的常见几种会化管理命令：

```
#  新建名字为 name 的会话
tmux new -s name    # 等同 tmux new-session -s name, 指定名字方便 attach

#  重命名 session1 为 session2
tmux rename -t session1 session2    # 等同 tmux rename-session -t session1 session2

# 列出所有会话，等同 tmux list-sessions
tmux ls    # 第一列的就是 session name

# attach 名字为 name 的会话
tmux at -t name    # 等同 tmux attach -t name

# 杀死指定名字的会话，关闭会话所有窗口自动会关掉会话
tmux kill-session -t name

# 关闭指定窗口，很少用，一般都是 Ctrl-b & 关闭本窗口
tmux kill-window -t name

# 脱离会话回到终端
Ctrl-b d
```

这个组合键的设置随意，Z 离左边 Ctrl 近，所以我设置 Z 了。

- **使 Tmux 配置生效**

配置要重启 tmux 后生效，或者先按 C+b，然后输入 `:`，进入命令行模式， 在命令行模式下输入：

```
source-file ~/.tmux.conf
```

这样上面的配置就能立即生效。如果想要快速生效 Tmux 配置，继续可以添加如下配置：

```
bind r source-file ~/.tmux.conf \; display "Reloaded!"
```

这样以后改了配置就只需要按 `组合键前缀+r` 就行了。

### Tmux 个人常用按键

- 前缀 `"` ： 横向分割窗口

- 前缀 `%`：纵向分割窗口

- 前缀 `o`：按顺序在窗口中切换

- 前缀 `上下左右`：按方向在窗口中切换

- 前缀 + 按住`上下左右`：按方向在改变当前窗口大小

- 前缀 `&`：关闭窗口

- 前缀 `d`：退出 tumx 并保存当前会话 ( 这时 tmux 仍在后台运行，可以通过 `tmux attach` 进入到指定的会话 )

- 前缀 `Space`：采用下一个内置布局

- 前缀 `[`：进入复制模式 ( `Esc`：退出复制模式 )

- 前缀 `q`：查看窗口编码

Zsh & Oh-My-Zsh
-

```
yum install zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# 或者
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

rzsz
-

在 SSH 连接 Linux 的时候常常需要上传下载文件操作，Xshell 配套的 Xftp 已经比较好用了，而对于喜欢 CLI 的人来说，rzsz 相比之下显得更简单好用。

```
yum install lrzsz

# sz 命令发送文件到本地
sz filename

# rz 命令本地上传文件到服务器
rz
```

也可以通过编译安装 rzsz：

```
# 1. 下载
wget http://down1.chinaunix.net/distfiles/lrzsz-0.12.20.tar.gz

# 2. 解压
tar zxvf lrzsz-0.12.20.tar.gz

# 3. 编译
cd lrzsz-0.12.20
./configure --prefix=/usr/local/lrzsz

# 安装
make && make install

# 建立软链接
cd /usr/bin
ln -s /usr/local/lrzsz/bin/lrz rz
ln -s /usr/local/lrzsz/bin/lsz sz

# 测试
rz    # 运行 rz 弹出上传窗口
sz filename # 运行 sz 弹出下载窗口
```

Thefuck
-

早在 V2EX 上见过站长刘昕分享过这个工具，但是当时只是去 mark 了一下并没有下来使用。

今天有空下来用了一下，觉得这个 Linux 终端工具名字简单粗暴，用起来也恰如其名。

- 安装 python 环境

thefuck 是用 python 写的，所以运行环境要现有：

```
apt-get install python python-pip python-dev
```

- 通过 pip 下载 thefuck：

```
pip install thefuck
# 当需要更新 thefuck 的时候用这个
#pip install thefuck --upgrade
```

- 配置 thefuck

将下面的配置写到 Shell 启动脚本，比如 .bash_profile,  .bashrc,  .zshrc，这根据你使用的 Shell 解释器来决定。

或者 Shell 配置文件当中，比如 Bash, Zsh, Fish, Powershell, tcsh。

```
eval "$(thefuck --alias)"
# You can use whatever you want as an alias, like for Mondays:
eval "$(thefuck --alias FUCK)"
```

- **python 2.+ 版本出现 128 字节错误？**

这个问题解决是在作者 GitHub 项目的 issues 里面找到答案的，答案好像不止一种，我试了修改 .profile 这种成功了就没试其他的了。

```
cd ~
vi .profile
```

在最后一行后面添加：

```
export PYTHONIOENCODING=utf-8
```

FAQ
-

- **CentOS 默认无法下载 tmux 编译安装又失败？**

开启 remi 源。


- **编译安装 Tmux 时出现：configure: error: "curses not found"?**

```
yum install ncurses-devel
```

- **编译 tmux 时函数 `control_callback` 报错？**

```
control.c: In function ‘control_callback’:
control.c:63: warning: implicit declaration of function ‘evbuffer_readln’
control.c:63: error: ‘EVBUFFER_EOL_LF’ undeclared (first use in this function)
control.c:63: error: (Each undeclared identifier is reported only once
control.c:63: error: for each function it appears in.)
control.c:63: warning: assignment makes pointer from integer without a cast
make: *** [control.o] Error 1
```

原因是使用的 libevent 的版本太低造成的，tmux1.8 要求 libevent >= 2.0.10-stable。

- **执行 tmux 时报错？**

> tmux: error while loading shared libraries: libevent-x.x.so.x: cannot open shared object file: No such file or directory

解决方法如下：

```
LD_DEBUG=libs /usr/local/bin/tmux 
```

可以看到 `trying file=/usr/lib/libevent-x.x.so.x`，然后建立一个软连接：

```
# x86
ln -s /usr/local/lib/libevent-x.x.so.x /usr/lib/libevent-x.x.so.x

# x64
ln -s /usr/local/lib/libevent-x.x.so.x /usr/lib64/libevent-x.x.so.x
```

附录：Tmux 默认组合键命令
-

- C-b ? 显示快捷键帮助 tmux
- C-b C-o 调换窗口位置，类似与vim 里的C-w
- C-b 空格键 采用下一个内置布局
- C-b ! 把当前窗口变为新窗口
- C-b " 横向分隔窗口
- C-b % 纵向分隔窗口
- C-b q 显示分隔窗口的编号
- C-b o 跳到下一个分隔窗口
- C-b 上下键 上一个及下一个分隔窗口
- C-b C-方向键 调整分隔窗口大小
- C-b c 创建新窗口
- C-b 0~9 选择几号窗口
- C-b c 创建新窗口
- C-b p 选择前一个窗口
- C-b n 选择下一个窗口（也可以直接用 Ctrl-b 数字 切换到指定窗口）
- C-b l 切换到最后使用的窗口
- C-b w 以菜单方式显示及选择窗口（可用 vim j/k 上下翻页）
- C-b t 显示时钟  ( Ctrl + C 停止显示 )
- C-b ; 切换到最后一个使用的面板
- C-b x 关闭面板
- C-b & 关闭窗口
- C-b s 以菜单方式显示和选择会话
- C-b d 退出tumx，并保存当前会话 ( 这时 tmux 仍在后台运行，可以通过 `tmux attach` 进入到指定的会话 )
- tmux at -d    # 重绘窗口，在大小不同屏幕上用 tmux 时候会保持窗口大小为最小尺寸，这个命令就可以重置窗口大小
- C-b [    # 进入复制模式，滚屏查看，支持 vim 上下翻页快捷键
- set-window-option -g mode-keys vi   # 设置复制模式中键盘布局为 vi
- C-b : - rename-window    # 重命名窗口
- C-b %/"    # 分割窗口为面板(panel)
- C-b Alt+方向键    # 调整面板大小

参考
-

- *[tmux的使用方法和个性化配置](http://mingxinglai.com/cn/2012/09/tmux/)*

- *<https://wiki.freebsdchina.org/software/t/tmux>*

- *<https://github.com/nvbn/thefuck/issues/398>*
