---
layout: post
title: CSS布局设计：三列浮动中间列宽度自适应
category: Web
tags: [CSS, 前端]
latest: 2015年12月19日 18:22:34
---

使用浮动定位方式，从一列到多列的固定宽度及自适应，基本上可以简单完成，包括三列的固定宽度。而在这里给我们提出了一个新的要求，希望有一个三列式布局，其中左栏要求固定宽度，并居左显示，右栏要求固定宽度并居右显示，而中间栏需要在左栏和右栏的中间，根据左右栏的间距变化自动适应。

这给布局提出了一个新的要求，而且单纯使用float属性与百分比属性并不能够实现，CSS目前还不支持百分比的计算精确到考虑左栏和右栏的占位，如果对中间栏使用100%宽度的话，它将使用浏览器窗口的宽度，而非左栏与右栏的中间间距，因此我们需要重新的思路来考虑这个问题。

绝对定位。

在开始这样的三列布局之前，有必要了解一个新的定位方式——绝对定位。前面的浮动定位方式主要由浏览器根据对象的内容自动进行浮动方向的调整，但是这种方式不能满足定位需求时，就需要新的方法来实现，CSS提供的除去浮动定位之外的另一种定位方式就是绝对定位，绝对定位使用position属性来实现。
position　　用于设置对象的定位方式　　可用值：static/absolute/relative

对页面中的每一个对象而言，默认position属性都是static。如果将对象设置为 position:absolute，对象将脱离文档流，根据整个页面的位置进行重新定位。当使用此属性时，可以使用top,right,bottom,left即上右下左四个方向的距离值，以确定对象的具体位置，看如下CSS：

``` css
#layout {
    position:absolute;
    top:20px;
    left:0px;
}
```

如果#layout使用了position:absolute;将会变成绝对定位模式，与此同时，当设置top:20px;时它将永远离浏览器窗口的上方20px，而left:0px;将保证它离浏览器左边距为0px。。
注意：一个对象如果设置了position:absolute; 它将从本质上与其他对象分离出来，它的定位模式不会影响其它对象，也不会被其它对象的浮动定位所影响，从某种意义上说，使用了绝对定位之后，对象就像一个图层一样浮在了网页之上。
绝对定位之后的对象，不会再考虑它与页面中的浮动关系，只需要设置对象的top,right,bottom,left四个方向的值即可。
而在本例中，使用绝对定位则能够很好地解决我们所提出的问题。同样，使用3个div形成我们的三个分栏结构：

``` css
#left {
    background-color: #E8F5FE;
    border: 1px solid #A9C9E2;
    height: 400px;
    width: 200px;
    position: absolute;
    top: 0px;
    left: 0px;
}

#right {
    background-color: #FFE7F4;
    border: 1px solid #F9B3D5;
    height: 400px;
    width: 200px;
    position: absolute;
    top: 0px;
    right: 0px;
}
```

这样，左栏将距左边left:0px;贴着左边缘进行显示，而右栏则将由right: 0px;使得右栏距右显示，而中间的#center将使用普通的CSS样式：

``` css
#center {
    background-color: #F2FDDB;
    border: 1px solid #A5CF3D;
    height: 400px;
    margin-right: 202px;
    margin-left: 202px;
}
```

对于#center，我们不需要再设定其浮动方式，只需要让它有左边外边距永远保持#lef与#right的宽度，便实现了两边各让出202px的自适应宽度，而左右两边让的距离，刚好让#left和#right显示在这个空间中，从而实现了而已要求。
