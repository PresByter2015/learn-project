# Blockly 开发
## 建立项目
- [blockly-games/-/Build](https://github.com/google/blockly-games/wiki/Build)
1. 获得代码
```bash
git clone https://github.com/google/blockly-games.git
```
2. 生成项目依赖
```bash
cd blockly-games/
make deps
```
3. 建立生成所有英语版本的demo游戏
```bash
make en
```
4. 编译所有语言版本
或者，您可能希望构建所有50多种语言，而不仅仅是英语。请注意，这大约需要2个小时，所以这可能是你应该在一夜之间做的事情。
```bash
make languages
```
5. 仅编译一个游戏
```bash
make index-en
make puzzle-en
make maze-en
make bird-en
make turtle-en
make movie-en
make music-en
make pond-docs-en
make pond-tutor-en
make pond-duck-en
make gallery-en
```
前面提到的make en只是上述所有命令的快捷方式。你还可以用所有50多种语言构建一个游戏：
```bash
make index
make puzzle
make maze
make bird
make turtle
make movie
make music
make pond-docs
make pond-tutor
make pond-duck
make gallery
```

使用汉语 编译 make zh-hans

6. 生成项目在
blockly-games/appengine/index.html 进行预览

## 本地测试
将浏览器指向blockly-games/appengine/index.html?lang=en，您应该会看到所有游戏。

您可能会在浏览器的控制台中注意到，file:///common/storage.js每个游戏页面上都有一个失败的请求 。正常情况下，只有在App Engine上运行时，存储才可用。

## 调试模式
为避免在进行较小的更改后不必重新编译，请访问 / admin （或blockly-games/appengine/admin.html直接从文件系统提供服务）以切换到非压缩模式。

现在，您只需在浏览器中按重新加载即可在进行大多数更改后获取最新版本。注意，对闭包模板（*.soy）的编辑和对依存关系（goog.require）的更改仍需要重新编译。