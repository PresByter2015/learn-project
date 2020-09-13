## Vue的SSR有什么优势
- SSR 服务端渲染  （页面在服务端渲染后 返回给前端）
- spa页面 <div id="app"></div>  无法去爬取dom元素 不利于seo优化
- 多页应用有利于seo优化的 像原生开发页面可以建立很多html 去实现seo
- vue-server-render  vue实现了可以在node中解析vue 实现将实例渲染成一个字符串


> 预渲染（启动一个浏览器 生成html，加载这个页面的时候先显示html在进行替换 适合一些静态页面） 服务端渲染 （更好 博客新闻类）

## SSR的缺陷
- SSR会占用很多服务器内存 （缓存）
- 浏览器一些api无法正常使用了   beforeCreate  (created)


> 页面渲染完后发起ajax请求数据，用请求来的数据渲染页面 （js很大，首屏白屏问题），服务端渲染在后台中请求数据直接用于渲染 （可以减少白屏时间） 

> 通过一份代码打包 出两份代码  -> 用node 渲染打包的结果 -> 字符串（没有交互能力） 再把另一份打包的结果插入到页面中


## 配置一个Vue的开发环境
- webpack (打包) webpack-cli（解析参数） webpack-dev-server (webpack开发环境)
- vue-loader（解析.vue文件的） vue-style-loader(支持服务端渲染) css-loader （处理css）  vue-template-compiler (解析template标签)
- @babel/core (babel核心模块)  @babel/preset-env (高级语法转换成低级语法)
- babel-loader （解析js文件的）
- html-webpack-plugin (打包html插入到页面中)
- webpack-merge webpack合并文件