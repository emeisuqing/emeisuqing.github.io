---
layout: post
title:  "CSS 基础内容"
subtitle:
date:   2018-10-10 20:19:02 +0800
tags: css
color:
cover:
suqing: 苏轻 2018年10月10日 12:54:16
---

# CSS 简介

　　CSS 英文全称为 Cascading Style Sheets（层叠样式表）。样式通常存储在样式表中，用来定义如何显示 HTML 元素。样式使内容与表现分离，外部样式表通常存储在 CSS 文件中，极大提高了工作效率。

  * 多重样式将层叠为一个。层叠次序：当同一个 HTML 元素被不止一个样式定义时，会使用哪个样式？（优先级从高到低）
    - 1、内联样式（在 HTML 元素内部）
    - 2、内部样式表（位于 `<head>` 标签内部）
    - 3、外部样式表
    - 4、浏览器缺省设置

- CSS 与 CSS3 分别是什么？

　　CSS 与 CSS3 相当于 CSS2.0 与 CSS3.0，是两个不同版本的 CSS。它们的语法相同，在 CSS 中常用的属性，在 CSS3 中也是常用到的。它们的目的也相同，都是为了让网页布局更加美观，效果更加丰富。CSS3 在 CSS 的基础上新增了一些 CSS 属性样式，目前主流浏览器均支持 CSS3 的新增属性样式。


# CSS 基础语法

```css
/* 下面代码的作用是将 h1 元素内的文字颜色定义为红色，字体大小设置为 14 像素。 */
h1 {  /* 这里的 h1 称为选择器，下面大括号中的是 2 条声明。*/
    color:red;       /* 属性:值; */
    font-size:14px;  /* color 和 font-size 是属性，red 和 14px 是值 */
}
```

```css
h1,h2,h3,h4,h5,h6 { /* 可以对选择器进行分组 */
    color: green;
}
```

```css
/* 根据 CSS，子元素从父元素继承属性。但是它并不总是按此方式工作，旧式浏览器无法理解继承的问题。 */
body {
    font-family: Verdana, sans-serif;
}
```

- CSS 对大小写不敏感，但是如果涉及到与 HTML 文档一起工作的话，class 和 id 名称对大小写是敏感的。


# CSS 派生选择器

- 派生选择器允许你根据文档的上下文关系来确定某个标签的样式。

```css
li strong {
    font-style: italic;
    font-weight: normal;
}
```




> 参考资料：
>
> [ThinkCSS - DIV CSS 布局制作教程与 CSS 资源网](https://www.thinkcss.com)
>
> [W3school - CSS 基础教程](http://www.w3school.com.cn/css/)




