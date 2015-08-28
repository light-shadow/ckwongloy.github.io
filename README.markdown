## 项目名称：个人主页 ( Homepage v1.0.1 )

### 所属分类：WEB，HTML+CSS+Javascript，前端框架

> ###### Start time of V1.0.1 : 2015-08-22 18:35:42

> ###### End Time of V1.0.1 :  2015-08-25 15:04:24

说明
-
> 1. 比较简单的一个个人主页，主要用于简历呈现，具有 丝绸导航条、面包屑导航菜单、时钟、技能点标签统计、模态对话框等小功能。 

> 2. 页面主要使用的是 Bootstrap，也用到了 Javascript 框架  JQuery 和一些自定义 CSS 进行样式控制，字符图标采用的是 Font Awesome。整个主页的框架主要就是由以上 3 种前端框架组合构成。 

> 3. 源代码和主页都托管在 GitHub。

遇到的问题
-
> Bootstrap 和 首页导航条、其他页面的面包屑导航条（未使用 Bootstrap 自带面包屑导航）中的样式控制发生冲突。

## 解决  -- _原理同 **`namespace`**_

> ① 修改/删除 Bootstrap.min.css 中引起冲突的类选择器 `breadcrumb` ;
> ② 修改 HTML 中的类选择器属性值 breadcrumb 为 nbtsp-breadcrumb
    
## 仍需改进的地方

> 1. 友好支持移动设备
> 2. 需要 Font Awesome 中没有提供的字符图标，比如 QQ 、微信等


## 其他
> 提供博客及其他静态资源引用

##### __Latest Change: 2015-08-26 18:31:15__
