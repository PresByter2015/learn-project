# 安装
```
$ npm install
```

# 启动

开发环境中配置了代理服务，方便调试接口。也可以使用 `mock` 的数据形式进行本地开发。

代理配置存放在 `scripts/proxy.config.js` 文件，默认使用 `dev` 接口。

```
$ user=[用户名] proxy=[dev] [yarn | npm] start
```

# 依赖库

1. react、 react-dom、redux、 react-router、 react-redux、 react-router-redux
2. whatwg-fetch、events、redux-thunk

# 命名规范

## 文件名字

小写英文单词，单词用连字符分隔，同一模块的 js 和 样式文件名字要统一


# 项目规范

采用 ES6 语法编码

缩进 **2** 个空格

代码提交写明注释(动词开头＋描述开发的功能或解决的问题)

# 基于 Chrome 的 React 扩展

## Redux DevTools

DevTools for Redux with actions history, undo and replay.

[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)


# 管理平台

网址：[https://www.huishetest.cn/tenant/#/](https://www.huishetest.cn/tenant/#/)

帐号：liyang@broada.com
密码: 123456

# 版本控制

推荐使用 sourcetree 作为 git 的管理工具

开发过程中分支都提交到 `develop`

## 修改 hosts

```
10.1.2.238 git.huishesoft.cn
```

## 上传 SSH Key

将生成的 **SSH key** 上传到公司的 gitlab 平台

帮助文档 [https://git.huishesoft.cn/help/ssh/README](https://git.huishesoft.cn/help/ssh/README)


# docker
```
cd $GOPATH/src/github.com/show/website/build
sh build.sh
docker run -i --net=host --privileged=true -p 7700:7700 -e env=rd  dockerhub.huishetest.cn:5000/huishe-show/show-client:$tag
```
