---
layout: post
title: 进一步研究 Jekyll：原理和更实用的应用
category: Auxiliary
tags: [Jekyll, Liquid]
latest: 2015年10月09日 20:14:24
---

有人说 Jekyll 的配置好复杂，有人说 HEXO 比 Jekyll 简单好用，也有人更喜欢 Octopress。

但我自打开始就是跳入 Jekyll 怀抱 ( 坑 )，暂时也没打算出来了。

折腾久了，对其背后的原理也逐渐明白，现在总结如下。

##### **说明**

有时候你看过一段话，你以为你懂了，但是过了一段时间后，其实你才真的懂了那段话的意思，无论技术还是其他。

常用变量
-

Jekyll 会遍历你的网站搜寻要处理的文件。

任何有 YAML 头信息的文件都是要处理的对象。

对于每一个这样的文件，Jekyll 都会通过 Liquid 模板工具来生成一系列的数据。

在 Jekyll/Liquid 中，变量分为 **全局变量** 和 **自定义变量**。

+ 全局变量

    - site

	全站变量，可以通过 site 来引用已经定义在 *_config.yml* 中的自定义变量，比如 *{% raw %}{{site.email}}{% endraw %}*。

    - page

	在非博客文章的网站页面引用页面所具有的属性，比如：*{% raw %}{{page.title}}{% endraw %}*。

    - post

    在博客文章中引用文章引用文章页面所具有的属性，比如：*{% raw %}{{post.title}}{% endraw %}*。

* 自定义变量

	- 可以在 *_config.yml* 中自定义变量，然后再 page 后者 post 中引用。举例说明：

	假如 *_config.yml* 中配置了如下内容：

	```
	title: Chuanjiang Li's Blog | @lamChuanJiang
	description: > # this means to ignore newlines until "baseurl:"

	 1. Quiter you be, more you hear.
	 
	 2. Keep it simple, stupid, but serviceable.

	 @lamChuanJiang.

	url: "http://lamchuanjiang.github.io" # the base hostname & protocol for your site

	author: Chuanjiang Li

	id: lamChuanJiang

	email: lamchuanjiang@gmail.com
	```
	那么在文章或者页面中就可以引用任意一个变量：

	```
	{% raw %}{{ site.url }}{% endraw %}
	```

为什么 Jekyll 的安装总是出问题？
-

无论在 Windows，还是 Linux， 还是 Mac OS X，我好像我没有哪一次是十分顺畅的安装好 Jekyll 的，现在得出一些个人经验如下，并不一定正确，但是确实都帮我成功安装过 Jekyll：

- 低版本 Gem 安装 Jekyll 时候添加 Ruby 源：

```
$ sudo gem -a https://ruby.taobao.org/
```

- 高版本 Gem 安装 Jekyll 时候添加 Ruby 源：

```
$ sudo gem --add https://ruby.taobao.org/
```

- **Failed to build gem native extension** ？

这个问题也是比较郁闷，因为遇到过很多次了，一些参考的解办法如下：

```
$ sudo apt-get update
$ sudo apt-get install ruby-dev --fix-missing -y
$ sudo gem install jekyll
```

或者直接：`sudo apt-get install jekyll`。

#### Jekyll 和 GitHub Pages 服务绑定带来的便利

GitHub 上使用 Jekyll 确实十分方便，在下载 Jekyll 的过程中可以很省心。

先阅读下 GitHub 官方的帮助文档，确保本地 Jekyll 服务的配置与 GitHub Pages 配置一致。链接在文章末尾。

这几天我遇到了一个问题：同一份 Jekyll 博客在 GitHub 上摘要失效但本地运行正常？

原因猜想：语法高亮与摘要设置相冲突。因为本地我安装 pygments 的时候失败，按照提示安装了 pigments，有可能 GitHub 上的 Jekyll 引擎使用的仍然是 pygments，导致冲突。解决方案如下：

```
$ gem install bundler
# then you can use  `bundle install package_name` to install gems instead

$ gem install github-pages
```

如果不出意外，该命令会安装与 Jekyll 运行相关的大约 32 个 GEM 包。然后设置语法高亮器为 _pygments_，最终上传到 GitHub 上的结果是：还是没有摘要效果。看来猜想是失败的，不过上面的命令可以解决的是 Jekyll 的安装难问题，如果按部就班安装 Jekyll 总是出现这样那样的错误的话，不妨试试上面的命令，因为这样可以保证本地的 Jekyll 服务和 GitHub 可以保持一致的效果。

此外，通过这种方式安装在所有平台下都是一样的。

接下来分析引起我摘要效果出不来的原因，我以前是直接把 `{% raw %}{{ post.excerpt }}{% endraw %}` 这句代码放在需要显示摘要的首页合适的位置 ( 自定义 )，以前在本地和在 GitHub 上都可以很好的使用，在首页默认显示的是文章的第一段内容，( 所以也只能在第一段中自定义长度 )。
我也是这几天才发现本地可以使用而 GitHub 上却失效了，即文章内容全部输出到首页。

后来本人验证有效的解决办法有 2 种，都可以在需要使用摘要的地方直接插入：

- `{% raw %}{{ post.content | | split:'<!-- break -->' | first }}{% endraw %}`

使用这种方式需要注意显示摘要的地方和文章中打的标记 (　这里是　`<!-- break -->` ) 空格的个数严格一致。

- `{% raw %}{{ post.content | strip_html | truncate:80 }}{% endraw %}`

使用这种方式获得的摘要可以灵活自定义摘要字数。但是经常显示不完整一句话，甚至是一个词，这一点不如第在 GitHub 上已经失效的那种。

后来我还发现：使用 `post.excerpt` 方式时，_config.yml 中不能有 `excerpt_separator: ""` ，否则本地摘要效果也会失败。

如何不使用 GitHub Pages 服务而独立托管 Jekyll 生成的网站 ？
-

通过 Apache 或者 Nginx 的虚拟目录进行相应的设置即可在本地或者任何一台服务器上托管你的博客。

Jekyll 处理后的网站托管在 Webrick 服务器上，但 Webrick 一般不用于生产环境，但是可以通过配置虚拟目录的方式将经由 Jekyll 生成后的静态页面代理给 Apache 或者 Nginx，这样实现个人 Jekyll 博客的搭建，而不需要使用 GitHub 的 Pages 服务，因为 GitHub Pages 对 Jekyll 的有些功能做了一些限制，比如禁用插件。

- **Apache 为 Jekyll 生成的博客站点配置虚拟目录**

Apache 配置虚拟主机，路径为 _/path/to/_site_，这样就可以通过 Jekyll 的处理直接将 HTML 输出，并交给 Apache 响应请求。

Apache 2.4 配置虚拟目录：在 _httpd.conf_ 中找到 `<IfModule dir_module></IfModule>` 并在其后面添加：

```
<IfModule dir_module>
    DirectoryIndex index.php index.html
    Alias /blog "C:/__SHARE__/Workspace/lamchuanjiang.github.io/_site"
    <Directory "">
    AllowOverride None
    Require all granted
    </Directory>
</IfModule>
```

如果需要添加多个虚拟目录，只需在这里增加几个 `<Directory></Directory>` 块就行了。注意路径要用双引号括起来。

这样一来，你就可以通过 _http://localhost/blog/_ 直接访问 Jekyll 生成的站点了，从而间接地接管了 Jekyll 的服务，可以直接发布到公网上了。( Jekyll 服务监听的端口无法通过端口映射的方式转发到公网，所以只能通过这种间接的方式 )

Apache 2.4 和 Apache 2.2 的权限配置不同，需要注意。其实也不需要去网上查怎么配置，按照配置文件中已经给出的样例写安全配置就行了。

一台服务器只能有一个根目录，对于 Apache 配置来说就是 `DocumentRoot` 后面的路径，当然根目录唯一但是也可以自定义。

- **使用 Nginx 作为 Jekyll 生成的博客站点的代理服务器**

在 _nginx.conf_ 中搜 `location /`，找到并修改为类似如下代码即可：

```
location / {
    #root   html;
    root  C:/__SHARE__/Workspace/lamchuanjiang.github.io/_site;
    index  index.html index.htm index.php;
}
```

可见，只是将 root 路径从 `html` 改为 Jekyll 生成的博客路径即可。然后也可以通过 `http://localhost:port` 的方式来访问你的博客了。port 可以自定义，我由于 Apahce 和 Nginx 共存，所以 Windows 上我把 Nginx 默认监听的端口改为了 8080 ( 虽然有点不方便，但反正真正的生产环境下很少把 Nginx 运行在 Windows 上，Nginx 官方对 Windows 的支持也比较弱 )，其他人可以具体情况具体配置 _nginx.conf_ 即可。


附录：如果是第一次使用 Jekyll，紧接着下面命令也许会有用：
-

```
$ git checkout --orphan gp-pages

$ bundle exec jekyll serve

$ bundle update

$ gem update github-pages
```

如果需要一份不错的 Jekyll 博客源码参考：

```
$ git clone https://gitcafe.com/liberize/liberize.git
```

参考
-

- [_Using Jekyll with Pages_](https://help.github.com/articles/using-jekyll-with-pages/#troubleshooting)

- [_请问jekyll 服务器搭建_](https://ruby-china.org/topics/5035)
