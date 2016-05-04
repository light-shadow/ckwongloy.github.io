---
layout: post
title: XML 详细笔记
category: Web
tags: [XML, DOM, DTD, Java]
latest: 2015年10月16日 10:07:19
---

1969 年，gml，通用标记语言，主要的目的是要在不同的机器进行通信的数据规范。

1985 年，sgml，标准通用标记语言，对 gml 的一个完善。

1993 年，html，万维网 ( WWW ) 的骨架。

1998 年，XML，可扩展标记语言，不同的编程语言都可以使用 XML。

HTML 本身有什么不足？
-

由于 html 本身有缺陷，所以出现了很多其他的语言比如 xml，主要体现在：

- HTML 标记不能自定义

- HTML 标记本身缺少含义

- HTML 本身没有真正的国际化

这也是为什么在不同的浏览器上看到的网页是不一样的原因。

*蒂姆·博纳斯李* 曾经想要废除 HTML，但由于全世界范围内已经有大量的 HTML 网页，所以废除十分困难。

期间李曾想直接推出 XML，但是还是先推出了一个过渡语言：XHTML。

为什么需要 XML？
-

#### XML 主要用于解决什么问题？

- 描述具有复杂关系的数据，如家族谱。

- XML 可以充当小型的数据库。

#### XML 的应用场景

- 程序间通信数据的传输格式，网络通讯数据格式的业内标准

- 配置文件的描述

#### XML 的优点

- 通用度很高

- 描述能力很强

- 可扩展性强

- 可维护性强

##### 数据的存储位置

要么是在数据库 要么在文件 而硬盘盒内存只是硬件媒质

数据的底层也是文件，但是读取文件比数据库的读取要快，此外数据库还需要额外的软件安装

协同软件：管理软件的软件，解决信息孤岛问题。

XML 语法
-

### 文档声明

浏览器会根据不同文件的文件头去决定采用什么解析器去解析文件。

XML 文件头是必须要有的，写法如下：

```
<?xml version="1.0" encoding ="utf-8" standalone="yes"?>
```

文档声明放在 XML 文档的第一行。

其中 `Standalone` 代表文档是否独立使用，默认为 no。浏览器对此属性不关心，就算不对也不会报错。

##### **注意**

文件头的编码要和文件的实际编码格式一致，否则会报错。

##### ANSI

ANSI 不是一成不变的，通常根据地区的不同而不同。

举例说明：如果操作系统是简体中文版，那么 ANSI 会自动对应 GB2312。

### 元素

XML 元素指 XML 文档中出现的标签。一个标签分为起始标签和结束标签。

- 标签有 2 种写法

1、 包含标签体：`<xml>xml</xml>`。

2、 不包含标签体：`<xml/> ` ( 建议没有内容的标签使用这种格式 )。

标签可以嵌套，但是不能交叉嵌套：

```
<a><b></a></b>
```

- 根元素

每个 XML 文档必须有且仅有一个根元素。即命名不能重复。

根元素的其实标记放在其他所有元素之前。

- 空格和换行

XML 标签中出现的空格和换行都会被当作标签内容进行处理，所以不建议这么写。

- 命名规范

XML 标签的命名区分大小写，命名规范大致同编程语言。

即：不能以数字、下划线开头；不能包含空格；名字中间不能包含冒号。

### 属性

属性值用 "" 和 '' 分隔。" 和 ' 可以互相区分。

一个元素可以有多个属性，它的基本格式为：`<元素名 属性名="属性值">`。

特定的属性名称在同一个元素标记中只能出现一次。

属性值不能包括<, >, &。如果要用到这些特殊用途的符号，请使用 **实体**。

#### 实体/转义字符

如果属性值中要同时使用双引号和单引号，最好使用实体。

```
&quot;  "

&apos; '

&amp; &

&lt; <

&gt; >
```

### 注释

同 HTML：`<!-- 注释 -->`

- 注释内容中不要出现 `- -` 。

- 不要把注释放在标记中间

```
<Name <!--the name-->>TOM</Name>
```

- 注释不能嵌套。


- 可以在除标记以外的任何地方放注释。


- XML声明之前不能有注释。

CDATA 节
-

CDATA 节可以避免文本被解析引擎解析，而是当作原始内容处理，用于把整段文本解释为纯字符数据而不是标记的情况，包含大量 `<`、`>`、`&` 或者 `"` 字符。

CDATA 节中的所有字符都会被当作元素字符数据的常量部分，而不是 XML 标记。

写法如下：

```
<![CDATA[
XXXX
]]>
```

`]]>` 除外，`XXXX` 可以是任意字符，但不能嵌套。

> *面试题：如何用 XML 传递小图片？*

> 答：可以把文件读成一个 byte[] 数组，然后放到 CDATA 节，再传递。

处理指令 ( PI )
-

处理指令用来指挥解析引擎如何解析 XML 文档内容。比如使用 `xml-stylesheet` 指令告诉解析器应用 CSS 修饰 XML：

```
<?xml-stylesheet type="text/css" href="/xml.css"?>
```

##### **说明**

这代表 XML 也可以有外观，比如配合 CSS。但是这不是它的重点，XML 的重点在于数据。

处理指令必须以 `<?` 作为开头，以 `?>` 作为结尾，XML 声明语句就是最常见的一种处理指令。 

PI 不是 XML 的学习重点，了解即可。

### 小结：格式正规的  XML 文档

遵循如下规则的XML文档称为格式正规的XML文档：

- 语法规范

- XML声明语句

- `<?xml version="1.0" encoding="gb2312"?>`

- 必须有且仅有一个根元素

- 标记大小写敏感

- 属性值用引号

- 标记成对

- 空标记关闭

- 元素正确嵌套

**DTD**
-

Document Type Definition，文档类型定义。一般和 XML 配合使用，主要的用处是约束 XML 文件。

XML 引入了 DTD 文件，这样 XML 既可以自定义也要受到 DTD  的约束。

### 为什么需要 DTD 约束 XML？

为了避免不合理的标签出现，比如在人的标签中添加会吃铁的标签就不合理。

有了约束，才能规范。

### 常用的 XML 约束技术

- XML DTD

- XML Schema

### **DTD 的使用**

#### **DTD 语法细节**

- DTD 基本写法

```
<!ELEMENT 元素名 (元素类型)>
```

元素名是将在 XML 中出现的 标签/节点/元素 名。

元素类型可以是： `EMPTY` 、 `ANY` 、`#PCDATA` 。元素类型必须大写。

`EMPTY` 代表元素不能有子元素和文本，但是可以有属性，且元素要为空元素。

`ANY` 代表该元素可以包含在 DTD 中定义的任何元素内容。

`#PCDATA` 可以包含任何字符数据，但是不能在其中包含任何子元素或其他类型组合。

- 修饰符

![XML DTD 修饰符](http://ww4.sinaimg.cn/bmiddle/00644Sdogw1ex3bpd1ywoj30ja0bvdkn.jpg)

#### DTD文档的声明及引用

#### 1、 外部DTD文档

XML 中引入 DTD，最常见，也是推荐的写法。

在 XML 的声明后面引入 DTD 文档，有两种引入方式：

- 本地

```
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE 根元素 SYSTEM "DTD 的本地 URL">
<根元素>...</根元素>
```

- 公共

```
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE 根元素 PUBLIC " DTD 名称" "DTD 的网络 URL">
<根元素>...</根元素>
```

比如：

```
<!DOCTYPE web-app PUBLIC 
"-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
"http://java.sun.com/dtd/web-app_2_3.dtd">
```

举例说明：

```
<? xml version='1.0' encoding='utf-8' ?>
<!DOCTYPE poem SYSTEM "xml.dtd">
<poem>
<author>王维</author>
<title>鹿柴</title>
<content>空山不见人,但闻人语声.返景入深林,复照青苔上.</content>
</poem> 
```

##### **注意**

DTD 和 XML 的编码要一致。

#### 2、 内部DTD文档

```
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE 根元素  [
<!ELEMENT 根元素 (子元素1,子元素2,子元素3,...)>
<!ELEMENT 子元素1 (子元素1的数据类型) >
其他定义内容 ... ...
]>
<根元素>...</根元素>
```

#### 3、 内外部DTD文档结合

```
<!DOCTYPE 根元素  SYSTEM "DTD文件路径" [
定义内容
]>
<根元素>...</根元素>
```

#### 属性定义语法 

```
<!ATTLIST 元素名称
属性名称    类型    属性特点
属性名称    类型    属性特点
... ...
>
```

- 类型

1、 CDATA

属性值可以是任何字符，包括数字和中文。

2、 ID

表明该属性的取值必须是唯一的。同一个标签中不允许出现重复 ID。

3、 IDREF/IDREFS

IDREF 属性的值指向文档中其它地方声明的 ID 类型的值。

IDREFS 同 IDREF，但是可以具有由空格分开的多个引用。

比如：

- DTD

```
<!ELEMENT 家庭 (人+)>
<!ELEMENT 人 EMPTY>
<!ATTLIST 人    
relID ID #REQUIRED    
parentID IDREFS #IMPLIED    
name CDATA #REQUIRED
>

```

- XML

```
<家庭>
<人 relID="P_1" name="爸爸"/>
<人 relID="P_2" name="妈妈"/>
<人 relID="P_3" parentID="P_1 P_2" name="儿子">
</家庭>
```

4、 Enumerated

事先定义好一些值，属性的值必须在所列出的值的范围内。

```
<!ATTLIST person 
婚姻状态 (single|married|divorced|widowed) #IMPLIED>
<!ATTLIST persion 性别 (男|女) #REQUIRED>
```
5、 ENTITY/ENTITIES

- 属性特点

1、 #REQUIRED

元素的所有实例都必须有该属性的值，即非空 ( NOT NULL )。语法如下：

```
<!ATTLIST 元素名 属性名 属性类型 #REQUIRED>
```

- DTD 示例: 

```
<!ATTLIST person number CDATA  #REQUIRED> 
```

- XML 示例: 

```
<person number="5677" /> 
```

2、 #IMPLIED

元素的实例中可以忽略该属性。语法：

```
<!ATTLIST 元素名 属性名 属性类型  #IMPLIED>
```

3、 #FIXED value

元素实例中该属性的值必须为指定的固定值。

4、 Default value

为属性提供一个默认的值。语法：

```
<!ATTLIST 元素名 属性名 类型 "value">
```
- DTD 示例：

```
<!ATTLIST payment type CDATA "check">
```
- XML 示例：

```
<payment type="check" /> 
```

#### 实体定义

实体用于为一段内容创建一个别名，以后在XML文档中就可以使用别名引用这段内容了。

在 DTD 定义中，一条 `<!ENTITY …>` 语句用于定义一个实体。

实体可分为两种类型：引用实体和参数实体。

- 引用实体

引用实体在 DTD 中定义，语法格式是：

```
<!ENTITY 实体名称 "实体内容">
<!ENTITY note "I am a programmer"> 
```

引用实体主要在 XML 文档中被应用。引用方式：`&实体名称;` -> `&note;`。

- 参数实体

参数实体被 DTD 文件自身使用。语法格式是：

```
<!ENTITY % 实体名称 "实体内容" >
```

引用方式：`%实体名称;`。

##### **说明**

要求达到的目标是：

能够使用一个比较复杂的 dtd 文件，来编写一个有效地 xml 文件，并需要验证通过。

### DTD 和 SCHEMA 的区别

DTD 不能对标签内容的合理性进行限制，而 Schema 可以。

比如：年龄中不能含有字母。

编程校验 XML 文档正确性 ( xmlspy )
-

IE5 以上浏览器内置了XML解析工具： _Microsort.XMLDOM_。

开发人员可以编写 javascript 代码，利用这个解析工具装载 xml 文件，并对 xml 文件进行 dtd 验证。步骤如下：

#### 1、 创建 xml 文档解析器对象

```
var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
```

#### 2、 开启 xml 校验


```
xmldoc.validateOnParse = "true";
```

#### 3、 装载 xml 文档

```
xmldoc.load("book.xml");
```

#### 4、 获取错误信息

```
xmldoc.parseError.reason;  
xmldoc.parseError.line
```

XML 编程
-

### XML 解析技术介绍

XML解析分为：dom 解析和 sax 解析。

- dom 解析

Document Object Model, 即文档对象模型，是 W3C 组织推荐的处理 XML 的一种方式。

- sax 解析

Simple API for XML，不是官方标准，但它是 XML 社区事实上的标准，几乎所有的 XML 解析器都支持它。

#### XML 解析器

Crimson(sun)、Xerces (ibm->apache)、Aelfred2(dom4j)

#### XML 解析 API ( Application Program Interface )

- Jaxp(sun)[dom]

JAXP 开发包是J2SE的一部分，它由 `javax.xml`、`org.w3c.dom` 、`org.xml.sax` 包及其子包组成。

在 `javax.xml.parsers` 包中，定义了几个工厂类，程序员调用这些工厂类，可以得到对 xml 文档进行解析的 DOM 或 SAX 的解析器对象。

##### **获得 JAXP 中的 DOM 解析器步骤**

①调用 DocumentBuilderFactory.newInstance() 方法得到创建 DOM 解析器的工厂。

②调用工厂对象的 newDocumentBuilder方法得到 DOM 解析器对象。

③调用 DOM 解析器对象的 parse() 方法解析 XML 文档，得到代表整个文档的 Document 对象，进行可以利用DOM特性对整个XML文档进行操作了。

- dom4j[dom]

Java DOM 编程
-

### DOM 模型 ( Document Object Model)

DOM解析器在解析XML文档时，会把文档中的所有元素，按照其出现的层次关系，解析成一个个Node对象(节点)。

在dom中，节点之间关系如下：

位于一个节点之上的节点是该节点的父节点(parent)。

一个节点之下的节点是该节点的子节点（children）。

同一层次，具有相同父节点的节点是兄弟节点 ( sibling )。

一个节点的下一个层次的节点集合是节点后代(descendant)。

父、祖父节点及所有位于节点上面的，都是节点的祖先(ancestor) 
节点类型。

### Node 对象

Node 对象提供了一系列常量来代表结点的类型，当开发人员获得某个Node类型后，就可以把 Node 节点转换成相应的节点对象(Node 的子类对象)，以便于调用其特有的方法。（查看API文档） 

Node对象提供了相应的方法去获得它的父结点或子结点。编程人员通过这些方法就可以读取整个XML文档的内容、或添加、修改、删除XML文档的内容了。

### 更新 XML 文档

javax.xml.transform包中的Transformer类用于把代表XML文件的Document对象转换为某种格式后进行输出，例如把xml文件应用样式表后转成一个html文档。

利用这个对象，当然也可以把Document对象又重新写入到一个XML文件中。

Transformer类通过transform方法完成转换操作，该方法接收一个源和一个目的地。

我们可以通过 javax.xml.transform.dom.DOMSource类来关联要转换的document对象；

用javax.xml.transform.stream.StreamResult 对象来表示数据的目的地；

Transformer对象通过TransformerFactory获得。

sax 解析
-

在使用 DOM 解析 XML 文档时，需要读取整个 XML 文档，在内存中构建代表整个 DOM 树的Doucment对象，从而再对XML文档进行操作。

此种情况下，如果 XML 文档特别大，就会消耗计算机的大量内存，严重情况下可能还会导致内存溢出。

SAX解析允许在读取文档的时候，即对文档进行处理，而不必等到整个文档装载完才会文档进行操作。

通过继承DefaultHandler，来开发一个sax解析器。

#### SAX解析机制

sax是一种推式的机制,你创建一个sax 解析器,解析器在发现xml文档中的内容时就告诉你(把事件推给你)。

如何处理这些内容，由程序员自己决定。

在基于sax 的程序中,有五个最常用sax事件

- startDocument()

告诉你解析器发现了文档的开始,告诉你解析器开始扫描文档.

- endDocument()

告诉你解析器发现了文档尾

- startElement()

告诉你解析器发现了一个起始标签,该事件告诉你元素的名称,该元素所有的属性名和值.

- character()

告诉你解析器发现了一些文本,将得到一个字符数组, 

该数组的偏移量和一个长度变量,有这三个变量你可以得到解析器所发现的文本。

- endElement()

告诉你解析器发现了一个结束标签,该事件告诉你元素的名称

SAX采用事件处理的方式解析XML文件，利用 SAX 解析 XML 文档，涉及两个部分：解析器和事件处理器。

解析器可以使用JAXP的API创建，创建出SAX解析器后，就可以指定解析器去解析某个XML文档。

解析器采用SAX方式在解析某个XML文档时，它只要解析到XML文档的一个组成部分，都会去调用事件处理器的一个方法。

解析器在调用事件处理器的方法时，会把当前解析到的xml文件内容作为方法的参数传递给事件处理器。

事件处理器由程序员编写，程序员通过事件处理器中方法的参数，就可以很轻松地得到sax解析器解析到的数据，从而可以决定如何对数据进行处理。

#### SAX方式解析XML文档

1、 使用SAXParserFactory创建SAX解析工厂

```
SAXParserFactory spf = SAXParserFactory.newInstance();
```

2、 通过SAX解析工厂得到解析器对象	

```
SAXParser sp = spf.newSAXParser();
```

3、 将解析对象和事件处理器对象关联

```
sp.parse("src/myClass.xml", new MyHander());
```

DOM4J解析XML文档
-

Dom4j是一个简单、灵活的开放源代码的库。Dom4j是由早期开发JDOM的人分离出来而后独立开发的。

与JDOM不同的是，dom4j使用接口和抽象基类，虽然Dom4j的API相对要复杂一些，但它提供了比JDOM更好的灵活性。

Dom4j是一个非常优秀的Java XML API，具有性能优异、功能强大和极易使用的特点。

现在很多软件采用的Dom4j，例如Hibernate，包括sun公司自己的JAXP也用了Dom4j。

使用Dom4j开发，需下载dom4j相应的jar文件。

### Document对象

DOM4j中，获得Document对象的方式有三种，开发dom4j要加入新jar包，并且在倒包时要导入dom4j的包。

1、 读取XML文件,获得document对象

```
SAXReader reader = new SAXReader();
Document   document = reader.read(new File(“src/input.xml"));
```

2、 解析XML形式的文本,得到document对象.

```
String text = "<members></members>";
Document document = DocumentHelper.parseText(text);
```

3、 主动创建document对象.

```
Document document = DocumentHelper.createDocument();    //创建根节点
Element root = document.addElement("members");
```

### 节点对象

1、 获取文档的根节点

```
Element root = document.getRootElement();
```

2.取得某个节点的子节点.

```
Element element=node.element(“书名");
```

3.取得节点的文字

```
String text=node.getText();
```

#### 将文档写入XML文件

1.文档中全为英文,不设置编码,直接写入的形式.

```
XMLWriter writer = new XMLWriter(new  FileWriter("output.xml"));
writer.write(document);
writer.close();
```

2.文档中含有中文,设置编码格式写入的形式

```
OutputFormat format = OutputFormat.createPrettyPrint();    // 指定XML编码                   
format.setEncoding("GBK");      
XMLWriter writer = new XMLWriter(newFileWriter("output.xml"),format);
writer.write(document);
writer.close();
```

出现乱码：

```
new OutputStreamWriter(new FileOutputStream("src/myClass.xml"),"utf-8")
```

4.取得某节点下所有名为“member”的子节点，并进行遍历.

```
List nodes = rootElm.elements("member");   
for (Iterator it = nodes.iterator(); it.hasNext();) {
     Element elm = (Element) it.next();    // do something 
}
```

5.对某节点下的所有子节点进行遍历.

```
for(Iterator it=root.elementIterator();it.hasNext();){
Element element = (Element) it.next();       // do something    
}
```

6.在某节点下添加子节点

```
Element ageElm = newMemberElm.addElement("age");
```

7.设置节点文字

```
element.setText("29");
```

8.删除某节点.//childElm是待删除的节点,parentElm是其父节点

```
parentElm.remove(childElm);
```
9.添加一个CDATA节点

```
Element contentElm = infoElm.addElement("content");
contentElm.addCDATA(diary.getContent());
```

#### 节点对象属性

1.取得某节点下的某属性

```
Element root=document.getRootElement();        //属性名name
Attribute attribute=root.attribute("size");
```

2.取得属性的文字

```
String text=attribute.getText();
```
3.删除某属性

```
Attribute attribute=root.attribute("size"); 
root.remove(attribute);
```
4、 遍历某节点的所有属性

```
Element root=document.getRootElement();       
for(Iterator it=root.attributeIterator();it.hasNext();){
    Attribute attribute = (Attribute) it.next();         
 	String text=attribute.getText();
 	System.out.println(text);    
}
```

5、 设置某节点的属性和文字.

```
newMemberElm.addAttribute("name", "sitinspring");
```

6、 设置属性的文字

```
Attribute attribute=root.attribute("name");
attribute.setText("sitinspring");
```

XPath
-

### 为什么需要 XPath

我们前面的 dom4j 中一个案例得到一个元素的的内容要一层一层的得到，非常麻烦。

### 如何学习 XPath

手册。

字符串与 XML 的转换
-

1、 将字符串转化为 XML 

```
String text = "<members> <member>sitinspring</member></members>";
Document document = DocumentHelper.parseText(text);
```

2、 将文档或节点的XML转化为字符串

```
SAXReader reader = new SAXReader();
Document document = reader.read(new File("input.xml"));
Element root=document.getRootElement();    
String docXmlText=document.asXML();
String rootXmlText=root.asXML();
Element memberElm=root.element("member");
String memberXmlText=memberElm.asXML();
```
