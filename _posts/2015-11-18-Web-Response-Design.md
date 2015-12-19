---
layout: post
title: 响应式设计
category: Web
tags: [前端, Web]
latest: 2015年11月18日 23:24:15
---

响应式设计在移动 Web 开发领域是必须面对的问题和优化的方向。

响应式设计的原则

- 移动优先：在设计的初期就要考虑页面如何在多终端上显示

- 渐进增强：充分发挥硬件设备的最大功能

### 如何实现响应式布局

- CSS3 Media Query: 最简单的方式。

常见的属性有：

	- Device-width, device-height：屏幕的宽和高

	- Width, height: 渲染窗口的宽和高
	
	- Orientation: 设备方向
	
	- Resolution： 设备分辨率

- 借助原生 Javascript: 成本高，不推荐使用

- 第三方开源框架：可以很好地支持浏览器响应式布局的设计
