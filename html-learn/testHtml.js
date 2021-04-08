var html2json = require ('html2json').html2json;
var json2html = require ('html2json').json2html;

const mock = JSON.stringify (`<p
style="box-sizing: inherit; margin-top: 1em; margin-bottom: 1em; padding: 0px; border: 0px; outline: 0px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 15px; vertical-align: baseline; color: rgb(68, 68, 68); white-space: normal; background-color: rgb(255, 255, 255);">
LightAPP的业务功能开发的实现技术可以是<code
    style="box-sizing: inherit; margin: 0px; padding: 0px 5px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: &quot;Source Code Pro&quot;, Monaco, Menlo, Consolas, monospace; font-size: 0.95em; vertical-align: baseline; color: rgb(77, 77, 76); background: rgb(238, 238, 238);">H5</code>、<code
    style="box-sizing: inherit; margin: 0px; padding: 0px 5px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: &quot;Source Code Pro&quot;, Monaco, Menlo, Consolas, monospace; font-size: 0.95em; vertical-align: baseline; color: rgb(77, 77, 76); background: rgb(238, 238, 238);">JSNative</code>、<code
    style="box-sizing: inherit; margin: 0px; padding: 0px 5px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: &quot;Source Code Pro&quot;, Monaco, Menlo, Consolas, monospace; font-size: 0.95em; vertical-align: baseline; color: rgb(77, 77, 76); background: rgb(238, 238, 238);">小程序</code>：
</p>
<ol style="box-sizing: inherit; margin-top: 1em; margin-bottom: 1em; margin-left: 20px; padding: 0px; border: 0px; outline: 0px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 15px; vertical-align: baseline; list-style-position: initial; list-style-image: initial; color: rgb(68, 68, 68); white-space: normal; background-color: rgb(255, 255, 255);"
class=" list-paddingleft-2">
<li>
    <p>
        <code
            style="box-sizing: inherit; margin: 0px; padding: 0px 5px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: &quot;Source Code Pro&quot;, Monaco, Menlo, Consolas, monospace; font-size: 0.95em; vertical-align: baseline; color: rgb(77, 77, 76); background: rgb(238, 238, 238);">H5 APP</code>是先调用系统的浏览器内核，相当于是在网页中进行操作，较原生APP稳定性稍差、页面加载效率低、用户交互体验差。但是H5最大的优点是开发容易、效率高。
    </p>
</li>
<li>
    <p>
        <code
            style="box-sizing: inherit; margin: 0px; padding: 0px 5px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: &quot;Source Code Pro&quot;, Monaco, Menlo, Consolas, monospace; font-size: 0.95em; vertical-align: baseline; color: rgb(77, 77, 76); background: rgb(238, 238, 238);">JSNative APP</code>技术开发出来的代<span
            style="text-decoration-line: underline;">码在原生设<strong>备运行时以<em>原生渲染的</em>方式<span
                    style="color: rgb(255, 0, 0);">展现，</span>从而提</strong>高页面的加</span>载和运行效率，性能好、内存资源占用少、用户体验接近原生。
    </p>
    <p></p>
</li>
<li>
    <p>
        <code
            style="box-sizing: inherit; margin: 0px; padding: 0px 5px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: &quot;Source Code Pro&quot;, Monaco, Menlo, Consolas, monospace; font-size: 0.95em; vertical-align: baseline; color: rgb(77, 77, 76); background: rgb(238, 238, 238);">小程序</code>&nbsp;开发容易、效率高、运行速度快、用户交互体验好。
    </p>
</li>
<li>
    <p>
        三者均可以做到三端统一的运行效果，以同一份代码编译出不同设备平台的运行代码。
    </p>
</li>
</ol>
<p
style="box-sizing: inherit; margin-top: 1em; margin-bottom: 1em; padding: 0px; border: 0px; outline: 0px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 15px; vertical-align: baseline; color: rgb(68, 68, 68); white-space: normal; background-color: rgb(255, 255, 255);">
实际开发过程中开发者可以按需使用H5、JSNative或小程序来开发APP。三个类型的效果对比可以在<a
    href="http://document.lightyy.com/zh-cn/docs/start/lightview-mobile.html#%E5%AE%89%E8%A3%85"
    style="box-sizing: inherit; margin: 0px; padding: 0px; border: 0px; outline: 0px; font-weight: inherit; font-style: inherit; font-family: inherit; vertical-align: baseline; color: rgb(56, 128, 255); text-decoration-line: none;">Lightview</a>中查看。
</p>
<p>
<br />
</p>`);

console.log(json2html(mock));
