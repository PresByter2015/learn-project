# 慧舍可视化
1.运行请求:  请求路径配置文件是 /src/config/urls (这个很重要如果请求出错界面都出错误)
2.请求地址:  需要在本地打开运行.exe文件启动服务器,然后项目请求访问的地址就是本地的ip:port
3.编辑页面: src/views/editor
(1)左侧工具栏: src/views/editor/widget/index.js
①配置块: src/views/editor/widget/navs.js
②添加修改配置块逻辑:src/config/modules/chart/theme.js
③左侧图标配置: src/assets/iconfont
(2)左侧工具栏鼠标移入出现的选项:
①图片的路径: src/assets/images
②组件路径: src/modules/chart 下的各个文件夹中的js文件
③选项配置路径:src/modules/chart/themes 下的文件夹,在该目录配置,并对应上nav.js中的参数就可以产生对应的选项了
④点击选项后生成在画布上的东西配置路径: src/modules/chart/charts 该目录中的文件夹对应src/modules/chart/themes下的就可以,


备注: navs.js中的video对象是我新增的,src/modules/chart/charts/media 和 src/modules/chart/themes/media 是我新增的,用于完成需求

需求是: 在右侧编辑栏中新增一个选项 是可以像上面的那些一样 点击添加一个视频到画布上,还可以通过配置参数进行配置视频信息(视频流什么的)

运行访问:   
1 运行server/bin/show-server.exe (启动服务器会开启7700端口)
	2 下包后本地 npm start启动,访问ip:3100  (代码中有用node自启一个端口,好像没有用脚手架)
	3 服务器地址就是 本地ip:7700