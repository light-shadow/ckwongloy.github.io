---
layout: post
title: Goagent 使用小结
category: Auxiliary
tags: [Goagent, Chrome, GFW, GAE]
latest: 2015年04月08日 20:01:44
---

GoAgent 是使用 Python 和 Google App Engine SDK 编写的免费代理软件，利用 Google App Engine 充当代理服务器。

GoAgent 的运行原理于其他代理工具基本相同，其借由 Google App Engine 的服务器作为中传，将数据数据包后传送至 Google 服务器，再由 Google 服务器转发至目的服务器，接收数据时方法也类似。

相对其他代理工具而言 GoAgent 要稳定许多。

https://wiki.archlinux.org/index.php/GoAgent_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

相关软件的下载及安装  
-
##### **说明**

若下载链接失效，请 Google 相应资源。

- 临时爬墙方案    <http://pan.baidu.com/s/1pJ7INFl>

- Goagent

    - <https://github.com/goagent/goagent>

    - <http://pan.baidu.com/s/1pJDJ6RL>

- Chrome 在线安装    <http://pan.baidu.com/s/1mgwZANe>

- SwitchyOmega

    - SwitchyOmega 插件：<http://pan.baidu.com/s/1vYdGy>

    - SwitchyOmega 的配置文件备份：<http://pan.baidu.com/s/1bnCRhef>

- SwitchySharp ( 类似 SwitchyOmega )
    
    - SwitchySharp 插件：<http://pan.baidu.com/s/1sjtwDOD>

    - SwitchySharp配置备份：<http://pan.baidu.com/s/1bnAeoiV>

申请 Google App Engine 并创建 Appid
-

1、 注册 Gmail 并申请一个 Google App Engine 账号：<https://appengine.google.com>。

![申请一个 Google App Engine 账号](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial1_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

2、登录之后，自动转向 Application 注册页面

![Application 注册页面](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial2_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

3、 接下来的页面，输入你的手机号码，需要注意的是，手机号码前面要+86（中国区号） 

![输入你的手机号码](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial3_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

然后等待收取手机短信，收到短信后（一串数字号码）填入下图表单，点send提交。

![](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial4_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

有的手机收不到信息，解决办法：到 <https://appengine.google.com/waitlist/sms_issues > 提交该情况，一个工作日就能收到谷歌提示Google App Engine成功开通。

4、 提交完成之后，GAE账号即被激活，然后就可以创建新的应用程序了。转入“My Applications”页面，点击“Create an Application”新建应用

![创建新的应用程序](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial5_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

一个Gmail账户最多可以创建十个GAE应用，每个应用每天1G免费流量。

这里我们只创建一个应用就可以了。进入下一步，填写新应用的必要信息，如下图。

在图中第一处添加一个应用名称，如abc555,验证一下是否可用，如果显示“Yes”那么abc555就是你的Appid（记住这个id），而abc555.appspot.com就是你的应用服务器地址了。

第二个空可随便填，点击Create Application按钮提交。

![](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial6_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

提交之后，就能看到下图这个页面，就说明你已经成功创建了一个新的应用,你也可以点击应用名称，进入控制面板进行管理：

![](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial7_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

如果你要建立多个appid，只需要从步骤4开始再重复操作多次就行了。

> ckwongloy@gmail.com

> Appid : gfwlcj, gfwlcj1988

Goagent 软件上传配置
-

1、 解压下载的 goagent 主程序。

2、 定位local/proxy.ini文件，打开修改大概第11行，appid后面的值goagent为你刚才申请到的appid。

如果要使用多个appid，appid之间用|隔开，如：appid1|appid2|appid3，每个appid必须确认上传成功才能使用。

```
1. [gae]
2. appid = appid1|appid2|appid3
```

3、 运行goagent.exe

上传的同时也要运行 Goagent，否则会遇到 getaddrinfo failed，error10054，Error 10061 目标计算机积极拒绝等错误而不能上传。

4、 定位server/uploader.bat 文件，以管理员权限运行，按照提示分别先后填写 appid，你的 google 邮箱地址以及密码。

同时上传多appid在appid之间用 | 隔开,一次只能上传同一个谷歌帐户下的appid。填完回车。

根据提示填你的谷歌帐户邮箱地址，填完回车。

根据提示填你的谷歌帐户密码。

##### **注意**

如果开启了两步验证，密码应为16位的应用程序专用密码而非谷歌帐户密码，否则会出现 *AttributeError: can't set attribute* 错误，填完回车。

如果要上传多个谷歌帐户下的appid，先上传一个账号的，传完一个账号后删除uploader.bat同目录下的.appcfg_cookies文件再传另一个。

5、 等待程序上传以及配置文件。

![Goagent 软件上传配置](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2015/01/goagentupload_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

SwitchyOmega 安装以及配置
-

1、 打开chrome，地址栏输入 chrome://extensions/ 进入扩展程序界面。

2、 拖动下载的 SwitchyOmega.crx 文件到该界面完成安装。

3、 安装好 SwitchyOmega 后进入其配置页面，点击导入导出，选择从文件恢复，选择下载的配置备份文件恢复。

4、 一切就绪后，启动 goagent.exe，打开 chrome，选择 SwitchyOmega 的代理模式，开始科学上网。

#### 导入证书

- IE/Chrome

使用管理员身份运行goagent.exe会自动向系统导入IE/Chrome的证书，你也可以双击local文件夹中的CA.crt安装证书。

需要安装到“受信任的根证书颁发机构”。

![](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial9_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

![](http://7qndff.com1.z0.glb.clouddn.com/wp-content/uploads/2014/06/goagent-tutorial10_thumb.jpg?watermark/1/image/aHR0cDovL3d3dy56aGl5YW5ibG9nLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wMi93YXRlcm1hcmsxLnBuZw==/dissolve/100/gravity/SouthEast/dx/10/dy/10)

- Firefox

需要单独导入证书，打开FireFox?->选项->高级->加密->查看证书->证书机构(必须是这项)->导入证书, 选择localca.crt, 勾选所有项，导入；

- opera

导入证书方法：首选项→高级→安全性→管理证书→证书颁发机构(必须是这项)->导入->选择localca.crt文件->依次确认；

注意请勿重复安装证书。

FAQ
-

- 为什么 GoAgent 访问网页报错 404 ？

 ```
 Error: Not Found The requested URL /_gh/ was not found on this server。
 ```

 从新上传一次 goagent，确保使用的是你当前的 proxy.ini 中所使用的 appid。

- 为什么没有上传成功却能使用 Goagent?

可能此 appid 曾经上传成功过一次。

- 报错 ***AttributeError: can't set attribute***？

开启了两步验证，要使用 16 位的应用密码登录。

如果忘记了应用密码，可以在下面网址重新生成：

<https://security.google.com/settings/security/apppasswords> ( 需爬墙 )

备用验证码即将用完？可点击以下网址，生成一组新验证码：

<https://www.google.com/accounts/SmsAuthConfig>

只有最新的一组备用验证码才有效。每个验证码只能使用一次。

##### **说明**

Goagent 现在好像已经躺了， GitHub 上的项目已经被迫删除。

文章来源
-

- <http://www.zhiyanblog.com/goagent-chrome-switchyomega-proxy-2015-latest.html>

- <http://www.zhiyanblog.com/goagent20140607.html>

相关方案
-

- <https://github.com/XX-net/XX-Net>
