const fs = require ('fs');
// input/out => I/O 操作
// 数据（字符串，音频，视频，二进制） => buffer => stream
// 如果文件不存在，就会创建
// 如果目录不存在，创建文件就会失败
// const data = new Uint8Array(Buffer.from('//Node.js中文网'));
const data = '//Node.js中文网';
// 异步
fs.writeFile ('文件.js', data, err => {
  if (err) throw err;
  console.log ('文件已被保存');
});
// 同步
try {
  fs.writeFileSync ('文件.js', data);
} catch (error) {
  throw error;
}

// 尾部添加
fs.appendFileSync ('文件.js', data);

// 读取 内容
let content = fs.readFileSync ('文件.js');
console.log (content.toString ());

// 获取文件的其他信息
let res1 = fs.statSync ('文件.js');
console.log (res1);

// 删除文件
fs.unlinkSync('文件.js')

我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容