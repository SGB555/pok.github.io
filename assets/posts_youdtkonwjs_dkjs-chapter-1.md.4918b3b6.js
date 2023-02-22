import{_ as a,c as s,o as e,a as n}from"./app.ba4a5f17.js";const y=JSON.parse('{"title":"第一章-作用域是什么","description":"","frontmatter":{"layout":"youdtkonwjs","title":"第一章-作用域是什么","date":"2018-06-24T23:41:24.000Z","tags":["你不知道的JavaScript","读书笔记"]},"headers":[{"level":3,"title":"编译原理","slug":"编译原理","link":"#编译原理","children":[]},{"level":3,"title":"理解作用域","slug":"理解作用域","link":"#理解作用域","children":[]},{"level":3,"title":"作用域嵌套","slug":"作用域嵌套","link":"#作用域嵌套","children":[]},{"level":3,"title":"异常","slug":"异常","link":"#异常","children":[]}],"relativePath":"posts/youdtkonwjs/dkjs-chapter-1.md"}'),l={name:"posts/youdtkonwjs/dkjs-chapter-1.md"},o=n(`<p>前言：每周为一个时间点记录最近所阅读的《你不知道的JavaScript》章节</p><p><img src="https://ws1.sinaimg.cn/large/80676d79gy1fsufvxmmeij217v0ordkw.jpg" alt=""></p><p><strong>内容:</strong></p><ol><li>编译原理</li><li>理解作用域</li><li>作用域嵌套</li><li>异常</li></ol><h3 id="编译原理" tabindex="-1">编译原理 <a class="header-anchor" href="#编译原理" aria-hidden="true">#</a></h3><p>以代码片段 var a = 2;为例子 简单了解编译过程</p><ul><li><strong>分词/词法分析（Tokenizing/Lexing)</strong> 这个过程就会对语句进行拆分成词法单元（Token)：var、a、=、2、；。 空格会否被拆分还要取决于在这门语言里空格是否有意义。</li><li><strong>解析/语法分析(Parsing)</strong> 这个过程则是把生成的Token转换为抽象语法树(AST)</li><li><strong>代码生成</strong> 简单来说就是有某种方法可以将var a = 2；的AST转化为一句指令，创建变量a并且赋值。</li></ul><p><strong>summry:</strong> 任何JS代码在执行前都会被编译。</p><h3 id="理解作用域" tabindex="-1">理解作用域 <a class="header-anchor" href="#理解作用域" aria-hidden="true">#</a></h3><p>还是以 var a = 2; 为例</p><h4 id="编译过程" tabindex="-1">编译过程 <a class="header-anchor" href="#编译过程" aria-hidden="true">#</a></h4><p>在编译 var a = 2; 的过程中有3位角色</p><ul><li><strong>引擎</strong> 负责整个JS程序的编译和执行过程</li><li><strong>编译器</strong> 负责语法分析和代码生成</li><li><strong>作用域</strong> 负责收集并维护所有声明的标识符(变量)组成的一系列查询，确定当前执行的代码对啊当前标识符是否有访问权限</li></ul><p>在执行 var a = 2; 时编译器会进行如下处理：</p><ol><li>遇到var a,编译器会询问作用域是否有这个变量在当前作用域，有的话就继续编译，没有的话就在当前作用域声明一个新变量a</li><li>接来下编译器就会生成引擎运行是需要的代码用来处理a = 2这个操作。</li><li>引擎运行时，会询问作用域：当前作用域是否存在变量a，有则使用并赋值，没有则寻找直到全局作用域，最后还是没有则抛出异常</li></ol><p><strong>summry:</strong> 变量赋值：没有该变量则声明，然后在作用域寻找，找到则赋值</p><h4 id="lhs查询-rhs查询" tabindex="-1">LHS查询&amp;RHS查询 <a class="header-anchor" href="#lhs查询-rhs查询" aria-hidden="true">#</a></h4><p>LHS查询:找到变量容器本身，从而赋值<br> RHS:获取变量的值</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">a</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">a</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">foo</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>最后一句调用foo 是一个RHS 找到foo的值并返回给我。(...)则意味着foo的值需要被执行，所以foo的值应该是一个函数。</p><p>同时，这里有个隐性的a = 2;当foo(2)执行是，foo函数的参数a，是会被赋值，所以需要一次LHS查询。</p><p>然后console是个对象，log(...)的执行之前也是需要RHS查询, log(a)也是需要一次RHS查询</p><h3 id="作用域嵌套" tabindex="-1">作用域嵌套 <a class="header-anchor" href="#作用域嵌套" aria-hidden="true">#</a></h3><p>很简单，当一个函数或块在另一个函数或块中，就好产生嵌套作用域。</p><p>而当语句执行时，引擎在当前作用域找不到变量时，就会向上查找直到全局作用域。</p><h3 id="异常" tabindex="-1">异常 <a class="header-anchor" href="#异常" aria-hidden="true">#</a></h3><p>首先为什么要区分LHS 和 RHS？</p><p>因为在变量还没声明时就使用，这两种查询的行为是不一样的。</p><p>情况一：非严格模式 LHS查询失败时，会在全局作用域创建一个具有该名称的变量 而RHS失败则会抛出referenceError异常</p><p>情况二：严格模式 LHS失败不会创建全局变量了而是抛出referenceError异常 RHS失败就会抛出另外一种错误类型：typeError referenceError说明作用域辨别失败，而typeError则说明作用域辨别成功，但是对其的操作是非法或不合理的</p>`,30),r=[o];function t(p,i,c,d,h,g){return e(),s("div",null,r)}const f=a(l,[["render",t]]);export{y as __pageData,f as default};
