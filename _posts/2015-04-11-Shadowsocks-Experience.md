---
layout: post
title: Shadowsocks + SwitchySharp
category: Auxiliary
tags: [Shadowsocks, Chrome, GFW]
latest: 2015年04月11日 20:01:44
---

1. chrome

2. chrome网上应用商店搜索 Proxy SwitchySharp 并安装。

https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm?utm_source=chrome-ntp-icon

3. 在chrome上面装好Proxy SwitchySharp插件之后，在chrome右上角点地球logo -->选项

4. 【第4步/这一步 成功后第6步就直接跳过，不用管了。不成功的话就按第6的说明，手动设置】点过选项后进入下面界面，导入导出  从文件恢复  解压压缩包里有SwitchyOptions.bak文件，选中添加 保存（不要忘记保存）

5. 打开 shadowsocks-gui-0.3.1-win-ia32 文件夹里的shadowsocks，按下图配置，配置好之后保存/save。

上面这个服务IP经我测试失效，不用管它了。可按下图步骤操作，选择公用服务器。

6. Chrome下配置 Proxy SwitchySharp：chrome右上角地球logo选项新建情景模式情景模式名称shadowsocks   手动配置  socks代理 127.0.0.1端口1080,代理类型为socks5代理。

7．双击打开shadowsocks，chrome右上角地球logo选择shadowsocks模式即可翻墙（不用代理时改成直接连接）。
