# html转图片下载
- html2canvas
- [html2canvas](http://html2canvas.hertzen.com/)
### 注意点
这里有个坑，`canvas.toDataURL`时候，会报错`failed to execute 'todataurl' on 'htmlcanvaselement' tainted canvases may not be exported`；
原因：主要是跨域问题。
- [CORS_enabled_image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)
- [CORS_settings_attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes)
一些解决方法
- [https://www.cnblogs.com/Renyi-Fan/p/9588755.html](https://www.cnblogs.com/Renyi-Fan/p/9588755.html)

### 启动项目
```bash
npx serve -s
```
跨域问题