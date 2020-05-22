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