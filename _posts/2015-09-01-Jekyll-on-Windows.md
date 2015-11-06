---
layout: post
title: 在本地 Windows 上搭建 Jekyll 测试环境
category: Auxiliary
tags: [Jekyll, Ruby, Windows]
latest: 2015年09月03日 11:59:43
---

GitHub/GitCafe 的服务器上是运行着 Jekyll，但并不是说 Jekyll 专属于 GitHub/GitCafe。

为什么需要在本地安装 Jekyll 服务？
-

在本地没有搭建 Jekyll 测试环境之前，每次对 *blog* 文件夹下文件的改动想要立马看到效果，都只能先上传到 GitHub，然后才能看到效果，这对于测试来说，是很不方便的，而且如果是断网了，那就没得玩了。

此外，如果上传上去的文章或配置中 Jekyll/Liquid 语法不正确，还会收到 GitHub 的 *page build failure* 邮件，一切又得重新来过，不说多的，光用 Git  Bash，每测试一次，都要将整个上传流程从头来一遍。

为了减少学习 Jekyll 高级应用的时间，尽快将自己的博客主要骨架搭建起来，个人认为需要在本地也安装一个 Jekyll 服务，以供自己测试，折腾 Jekyll 的所有功能，以快速度过学习期，好将注意力放到学习其他技术，然后写文章上面。

由于本人暂时使用 Windows 比较多，尽管 Windows 在 ruby 世界里是二等公民，后面安装配置或许会遇到奇葩的问题，然而这并不是我关注的重点，我只是在尽量短的时间内，把一个功能基本完整的 Jekyll 博客配置好，然后上传到 GitHub 去就完事，所以，就不多废话了。

这里推荐一个 Windows 上 Jekyll 安装配置的讲解：*[Run Jekyll on Windows](http://jekyll-windows.juthilo.com/)*

Windows 上搭建 Jekyll 测试环境步骤
-

### 1. 安装 **rails**installer 

不是 **ruby**installer，为了避免这样那样的问题，Windows 下，请安装 *[**railsinstaller**](http://railsinstaller.org/)*， 好处就是把该装的都装了，一步到位，节省时间，因为我们的重心不在为什么 Windows 下安装 ruby 会出现问题上面。

因为安装过 ruby，出现了 ***jekyll: Failed to build gem native extension***，折腾半天还是报这个错误，还好看见了这篇博客：*[Github Pages极简教程](http://yanping.me/cn/blog/2012/03/18/github-pages-step-by-step/ )*，只重新安装 railsinstaller 后问题解决 。

关于 *railsinstaller* 这里有更详细的介绍：*[RailsInstaller简化了Rails在Windows上的安装过程](http://www.infoq.com/cn/news/2011/02/railsinstaller-windows)*

##### **注意**

以上并不是说安装 RailsInstaller 就一定不会出现问题了，只是说概率小了很多。

如果你实在不想安装 RailsInstaller，然后不幸出现 ***jekyll: Failed to build gem native extension*** 错误，这里提供几个常见问题的可能性来源：

+ **安装路径是否含有空格**

安装路径为了节约时间，最好是默认。

因为安装包明确提出 “请不要使用带有空格的文件夹 ( 如： Program Files )”。

+ **Ruby，DevKit，Jekyll 的位数是否一致**

比如不要出现，DevKit 是 64 位的，而安装的 Ruby 和 Jekyll 是 32 位的情况。

+ **Ruby、gem、版本是否太旧或太新**

+ ** *config.yml* 中 Ruby 的绝对路径是否写错**

复习一下，正确写法是：

```
---
- C:/Ruby2.2-x64
```

注意 `-` 和 `C:/Ruby2.2-x64` 之间要有一个空格。

下载、安装过程没什么好说的，注意下载的版本和操作系统对应就行了。

安装好后可以测试一下：

```
ruby -v
gem -v
```

如果没出意外，都可以看到对应的版本信息，那就说明安装成功，可以进行下一步了。

### 2. 安装 Jekyll

下载 Jekyll 前先修改 ruby 软件源，原因不多说，祖国的网络都懂。

```
gem sources --remove https://rubygems.org/
gem sources -a http://ruby.taobao.org/
gem sources -l
*** CURRENT SOURCES ***

http://ruby.taobao.org
```

请确保只有 *ruby.taobao.org*，然后就安装 Jekyll：

```
gem install jekyll
```

安装路径默认是在: `c:/sites/`。

为了渲染 Markdown，还需要安装一个好用的 Markdown 渲染器，Jekyll 默认提供有，但是我比较喜欢 **rdiscount**：

```
gem install rdiscount 
```

##### **说明**

GitHub 使用的是 **Flavored**，所以这里使用 *rdiscount* 和 *Flavored* 的渲染效果有些地方不一样，建议与 GitHub 一致。

同理，为了语法高亮格式与 GitHub 一致，还需安装 Pygments：

```
gem install pygments
```

本地测试用 Rouge 也可以，但是有时候忘记改回去，push 到 GitHub 后会收到 *page build failue* 的邮件，所以都保持一致吧。

### 3. 运行 Jkeyll 服务

假设也想在路径 `c:/sites` 下做测试，打开终端：

```
cd c:/sites
```

然后创建一个测试使用的文件夹，假设就叫 *blog*：

```
jekyll new blog 
```

这样就已经创建了一个最基本的 Jekyll 博客了，然后运行 Jekyll：

```
jekyll serve
```

注意的是只要是 Jekyll 博客，进入该博客文件夹然后在该路径下运行 Jekyll 都可以看到效果的。然后打开浏览器，输入：[http://localhost:4000](http://localhost:4000)  就可以看到效果。

当然， [http://localhost:4000](http://localhost:4000) 是大部分情况，每个人机器上的环境和配置不一样，这个要与 **config.yml** 中的 **baseurl** 保持一致。

比如可以根据 baseurl 的配置变成 [http://127.0.01:4000/blog](http://127.0.01:4000/blog) 。


##### **注意**

放在 GitHub 上的 Jekyll 博客 baseurl 一定只能是类似于 *lamchuanjiang.github.io* 名称的路径，且一个 GitHub 账号只有一个，对应仓库名就是 *xxx.github.io*。

如果 *username.github.io* 路径不是你的博客项目而是放在其他仓库，假设为 *blog* ，那么 baseurl 必须改为 *username.github.io/blog*。

又由于 *username.github.io* 仓库的特殊性，即一个账号只能有一个，即是该仓库相当于根路径，所以 baseurl 就可以改为 */blog*。

根路径的一个重要作用就是 **资源引用**，通过根路径 `/` 可以使用绝对路径引用相应的资源。

**/blog** 对于博客项目来讲，相对而言就是 *“根目录”*，而 **xxx.github.io** 是对于 GitHub 网站来讲，可以理解是绝对 *根目录*。

具体根据 Jekyll 在终端下的提示进行访问。

此外， **如果使用 Pygments 作为语法高亮，那么安装好 Python 后必须将 `python.exe` 所在路径添加到环境变量，否则会报错而生成失败**。

**然后真正的折腾就开始了，这时候你需要 Jkeyll 官方参考**：

中文： *[jekyllcn](http://jekyllcn.com/docs/home/)* ；英文： *[jekyllrb](http://jekyllrb.com/docs/home/) *。

按照官方文档一步一步实现想要的功能，本地测试通过后基本上就可以保证上传到 GitHub 上也能原样运行，尽量就在同一个文件夹下测试。

除了官方文档，还有一些比较不错的中文手册，比如：

[Jekyll/Liquid API 语法文档](http://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/)

[Liquid 模板引擎](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

### **4. 通过模仿来学习 Jekyll **

你可以去 Jkeyll 官方网站上看上面列出的 Jekyll 博客模板，然后到 GitHub 上下载他们的博客下来分析，看看他们是如何组织和配置 Jekyll 的。

由于本人比较懒，我就是从创建 Jekyll 后的默认模板上开始改的，即执行 **`jekyll new blog`** 命令后产生的那个，其 CSS 是 *main.scss*，作用于博客文章的样式。

**改是学习的重要步骤**。在改的过程中就会发现变化，发现不同了，就会理解所改的东西起什么作用。改得越多，就越能慢慢摸清 Jkeyll 的底层工作原理，改了测，测了改。

自己改得差不多后，然后就可以开始自己发挥自己想象做出自己想要的样子了。

#### **建议**

+ 路径

将引用资源的 URL 设置为通过访问，这样可以确保在本地和在 GitHub 服务器上获得一致的输出。

+ 禁止浏览器 Cookie

测试的时候变动太频繁，为了消除浏览器缓存对测试的干扰，建议测试时关闭 Cookie，或者使用 *隐身模式* ( Chrome：Ctrl + Shift + N ) 。

### **本地测试 Jekyll 可能遇到的问题**

+ 路径和文件名不要使用中文、空格。

+ 如果在引用 CSS 等静态资源时候出现 404 则根据返回的 URL 修正实际的路径。

+ 采用 UTF-8 编码时，UTF-8 BOM+ 会导致 Jekyll 解析失败。

+ 文件换行格式也会导致 Jekyll  解析失败。

+ yml 配置信息不能以 @ 开头。

+ 有了 *.gitigorne* 之后追踪所有文件需要带选项 `-f` 。( `-r` 用于删除文件夹 )

+ **如果采用 pygments 作为语法高亮器，那么不要忘记将 Python2.7.x 添加到环境变量中**，否则也会报错。


- __"ERROR:  Could not find a valid gem 'pygments' (>= 0) in any repository"__

> Maybe the reason is the version of Jekyll or Ruby or Gem source.

> Try change the earlier version of Jekyll, or install pygments  from the official gem source: <https://rubygems.org> . Which need a VPN connection for the users from China.

- __"Deprecation: You appear to have pagination turned on, but you haven't included the `jekyll-paginate` gem. Ensure you have `gems: [jekyll-paginate]` in your configuration file."__

```
gems: [jekyll-paginate]
paginate: 3
paginate_path: "/home/paginate_:num"
```

> Refer from: <https://teamtreehouse.com/community/jekyllpaginate-gem> .

### **关于 Blog 样式**

为了使博客样式更好看，需要使用一些 CSS 。如果你的重心不在深入研究 CSS 等前端技术，一样的道理，为了节约时间还是去找现成的使用。

我懒，我的博客现在使用的 CSS 就是 GitHub Pages 自动生成的模板之一，其 CSS 分别是： *github-light.css*、 *normalize.css*、 *stylesheet.css* 。

我花了十来分钟了解如何使用该 CSS ，然后记住了它的类选择器的属性值代表那种样式就完事了，并没有花时间去研究其他虽然特别漂亮的样式。

### 附：不通过 *railsinstaller* 而安装 Ruby + DevKit 的步骤简述

1、下载并安装 Ruby：建议默认路径，并且将其安装路径添加到环境变量。

2、下载同位数的 Devkit 并解压：建议与 Ruby 的安装文件夹位于同一目录下，假设是：`C:\RubyDevKit`。

对于 64 位操作系统来说，可能会报错：*Invalid configuration. Please fix ‘config.yml’ and rerun ‘ruby dk.rb install*。

解决方案是将ruby目录的绝对路径写在 *_config.yml* 中， *_config.yml* 内容参考如下：

```
# This configuration file contains the absolute path locations of all ...
#
# Example:
#
# ---
# - C:/ruby19trunk
# - C:/ruby192dev
#
---
- C:\Ruby200-x64

```

##### **注意**

在 `---` 下，以 `-` 开头，然后空一格，然后是写 Ruby 的 **绝对路径**。

然后再执行 `ruby dk.rb install` 应该就不再报错。

3、安装 **dk.rb** ：终端，进入 `C:\RubyDevKit`，执行如下命令：

```
ruby dk.rb init
ruby dk.rb install
```
第一条命令将生成 *_config.yml* 配置文件；第二条命令将把 DevKit 安装到 Ruby。

4、以后步骤同上述 *railsinstaller* 安装好之后的方式。

### **接下来**

+ Jekyll 高级应用：分页、分类、标签、归档等。

+ Jekyll 博客的 SEO 。

+ 站内搜索。

+ 界面优化。

+ 移动设备视图。
