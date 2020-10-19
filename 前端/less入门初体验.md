# [less入门初体验](https://segmentfault.com/a/1190000007958084)

- [css](https://segmentfault.com/t/css/blogs)

-  

- [less](https://segmentfault.com/t/less/blogs)

`css`有众多的预处理器，其中比较流行的三个是`less`、`sass`、`stylus`，本文就一起来体验`less`编写`css`代码
官方文档:<http://lesscss.org/>
官网栗子:

```
@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
    -webkit-box-shadow: @style @c;
    box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
    .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
    color: saturate(@base, 5%);
    border-color: lighten(@base, 30%);
    div { .box-shadow(0 0 5px, 30%) }
}
```

编译成`css`文件:

```
.box {
    color: #fe33ac;
    border-color: #fdcdea;
}
.box div {
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
```

#### 编译

------

1、**客户端(浏览器)**
通过在源代码中引入`less.js`文件，用于实时对`.less`样式表文件进行编译(并不推荐)
注意:你的`less`样式文件一定要在引入`less.js`前先引入，并且需要设置`rel`属性值为`stylesheet/less`

```
<link rel="stylesheet/less" href="style.less">
<script src="less.js"></script>
```

2、**NodeJs**
需要在全局安装`less`模块，然后借助`lessc`命令把`less`文件编译成`css`文件

```
sudo npm install -g less
lessc style.less style.css
```

3、**Koala**
推荐的是国人自主开发的实时编译软件[Koala](http://koala-app.com/)，不仅支持多种`css`预处理器，而且也可以跨平台运行，从而帮助`web`开发者更高效地进行开发

#### 变量

------

变量是个好东西，允许我们单独定义一系列通用的样式，然后在需要的时候去调用，了解`css`中如何定义变量可查看张大神的[小tips:了解CSS/CSS3原生变量var](http://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/)

```
@color: #999;
body {
    background-color: @color;
}
h2 {
    color: @color;
}
```

编译后:

```
body {
    background-color: #999;
}
h2 {
    color: #999;
}
```

#### Mixin(混合)

------

将一个定义好的`class A`轻松的引入到另一个`class B`中，从而简单实现`class B`继承`class A`中的所有样式

```
.br (@radius: 5px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
}
#logo {
    .br;
}
#avatar {
    .br(50%);
}
```

编译后:

```
#logo {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
#avatar {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
}
```

#### 嵌套

------

在一个选择器中嵌套另一个选择器来实现继承，从而减少代码量

```
ul{
    background-color: #666;
    padding: 10px;
    list-style: none;

    li{
        background-color: #fff;
        border-radius: 5px;
        margin: 10px 0;
    }
    a{
        text-decoration:none;
        &:hover{
            color:red;
        }
    }
}
```

编译后:

```
ul {
    background-color: #666;
    padding: 10px;
    list-style: none;
}
ul li {
    background-color: #fff;
    border-radius: 5px;
    margin: 10px 0;
}
ul a {
    text-decoration: none;
}
ul a:hover {
    color: red;
}
```

#### 运算

------

我们可以在`less`中进行加减乘除运算

```
@bdw: 5px;
@bgc: #333;
@tc: #030405;
body{
    border-width: @bdw + 10;
    background-color: @bgc * 2;
    color: @tc + #336699;
}
```

编译后:

```
body {
    border-width: 15px;
    background-color: #666666;
    color: #366a9e;
}
```

#### 函数

------

`less`提供了一系列的颜色运算函数

```
@c1: #369;
@c2: #963;
.test1{
    background-color:lighten(@c1,10%);
    color:darken(@c1,10%);
}
.test2{
    background-color:saturate(@c1,10%);
    color:desaturate(@c1,10%);
}
.test2{
    background-color:fadein(@c1,10%);
    color:fadeout(@c1,10%);
    border-color:fade(@c1,50%);
}
.test4{
    background-color:spin(@c1,10);
    color:spin(@c1,-10);
    border-color:mix(@c1,@c2);
}
```

编译后:

```
.test1 {
    background-color: #407fbf;
    color: #264c73;
}
.test2 {
    background-color: #2966a3;
    color: #3d668f;
}
.test2 {
    background-color: #336699;
    color: rgba(51, 102, 153, 0.9);
    border-color: rgba(51, 102, 153, 0.5);
}
.test4 {
    background-color: #335599;
    color: #337799;
    border-color: #666666;
}
```

#### 注释

------

```
注意:两种注释的区别
/* Hello Less(我依然在这里) */
.comment-show { color: black }
// Hello Less(你看不到我了)
.comment-hide { color: white }
```

编译后:

```
/* Hello Less(我依然在这里) */
.comment-show {
    color: black;
}
.comment-hide {
    color: white;
}
```