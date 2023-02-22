---
layout: youdtkonwjs
title: 第四章-提升
date: 2018-09-09 17:24:16
tags: ['你不知道的JavaScript','读书笔记']
---

### 先有鸡还是先有蛋
首先我们先考虑一个问题，到底是先声明还是先赋值
```js
a = 2;
var a;
console.log(a) //2
```
直觉上，js是自上而下执行的，所以有可能会错以为输出值为undefined，但是其实是2。
```js
console.log(a);
var a = 2;
```
然而这段代码输出的是undefined。
这就是成为了一个先有鸡还是先有蛋的问题了🤣。

### 编译器再度来袭
第一章中提到引擎在解释JS代码之前会先编译。编译中的一部分工作就是先找到所有的声明，并用合适的作用域将它们关联起来。
因此，正确的思路是，变量和函数在内的声明都会在任何代码执行之前被首先处理。

#### 变量提升
var a = 2;将被JS引擎分解为两个操作：var a; a = 2;。第一个在编译阶段进行，第二个在赋值将会被 **留在原地** 等待执行阶段。

所以：第一节的第一段代码可以理解为如下：
```js
var a ;
a = 2;
console.log(a);
```
而第二段代码则如下：
```js
var a;
console.log(a); // undefined
a = 2;
```

因此，先声明后赋值。现有蛋后有鸡。这种现象也就叫做提升。

#### 函数提升
```js
foo();
function foo(){
    console.log(a) // undefinded
    var a = 2;
}
```
同样的，foo的函数声明被提升了，因此可以调用执行。
但是值得注意的是 函数声明可以被提升，但是函数表达式却不会被提升。

### 函数优先
函数声明和变量声明都会被提升。但是函数会首先被提升，然后才是变量。如下代码：
```js
foo(); //1
var foo;
function foo(){
    console.log(1);
}
foo = funciton(){
    console.log(2);
}
```