---
layout: post
title: JavaScript 的词法分析
subtitle:
date: 2019-03-04 11:20:05 +0800
tags: JavaScript
color: rgb(175, 223, 228)
cover:
suqing: 苏轻最后编辑于 2019 年 03 月 04 日 11:20:10
---

[]()
[词法分析]()
[作用域链]()
[原型链]()
[arguments 对象]()

### 二级事件

　　函数运行的瞬间，会生成该函数的一个 Active Object（AO 活动对象）

1. 分析参数：以参数名为属性，参数值为属性值
    - AO = {参数名 : 参数值}

2. 分析 var 声明，以变量名为属性，undefined 为属性值
    - AO = {变量名 : undefined}
    - AO 上如果已有同名属性，则不改变
3. 分析函数声明，以函数名为属性，函数整体为属性值。
    - AO 上如果已有与函数名同名的属性，会被函数覆盖。


```javascript
function a(b) {
    alert(b);
    function b() {
        alert(b);
    }
}
a(1);
```


```javascript
// 匿名函数 立即执行
(function() {
    // code
})();
```

AO
本函数的 AO 上没有某个属性，则继续去外层函数的 AO 上去找，之道全局对象，叫做“作用域链”。

arguments
每个函数都有自己的 arguments，但是不形成链。

this
沿着原型查找，形成原型链。

### arguments 对象

arguments.callee
代表函数自身，当函数匿名时，就特别有用了。

### this

this 为 null 时，this 指向 window。es5 以后会抛出异常。

函数内带有 this 操作，不能直接调用，应该 new，否则会污染全局。

哪个对象调用的，就指向谁。

### call && apply

```html
<div id="test1"></div>
<div id="test2"></div>
<script>

function style() {
    this.style.background = "gray";
}

t.call(document.getElementById("test1"));

</script>
```

函数名.call(对象, 参数1, 参数2, ...)
函数名.apply(对象, [参数1, 参数2, ...])

把函数的 this 指向对象，运行函数，传参为参数1，参数2，。。。

### 闭包

任何函数都会形成自身的一个封闭环境。

```javascript
function t() {
    var age = 18;
    return function() {
        console.log(age++);
    }
}
var temp = t();
var age = 1000;
temp();
```

闭包计数器

