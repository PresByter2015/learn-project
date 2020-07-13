const fs = require ('fs');
const {exit} = require ('process');

const currentFile = 'fs.js';
const content = '我是内容';
// r  只读方式
// r+  读写方式
/*****************

 fs.open (currentFile, 'r+', (err, fd) => {
     console.log (err, fd);
     if (err) {
         //如果没有就创建一个文件
         fs.writeFile (currentFile, content, err => {
             if (err) throw err;
            });
        }
        //   覆盖掉原来的内容
        fs.write (fd, content, 6, (err, written, string) => {
            // console.log (err, written, string);
            if (err) throw err;
        });
        // 关闭文件
        fs.close (fd, err => {
            if (err) throw err;
        });
    });
    
    ******************* */
// 判断文件是否存在
// fs.stat(path[, options], callback)
// fs.access(path[, mode], callback)
// fs.accessSync(path[, mode])
fs.access (currentFile, (err, stats) => {
  // fs.stat ('aa.txt', (err, stats) => {
  // fs.stat(currentFile, (err, stats)=>{
  // console.log (err, stats);
  if (err) {
    // 不存在
    fs.writeFile (currentFile, content, err => {
      if (err) throw err;
    });
  } else {
    fs.appendFileSync (currentFile, content, err => {
      if (err) throw err;
    });
  }
});

// console.log(fs.readFileSync(currentFile).toString())

// fs.unlinkSync(currentFile)

// fs.renameSync (currentFile, '2' + currentFile);
fs.watch (currentFile, (eventType, filename) => {
  console.log (`事件类型是: ${eventType}`);
  if (filename) {
    console.log (`提供的文件名: ${filename}`);
  } else {
    console.log ('文件名未提供');
  }
});

//   读取文件 全部信息
// console.log (fs.readFileSync ('fs.js').toString ());
/**
 * import counterStore from './counter'
import todoStore from './todo'

const store = {
    counterStore,
    todoStore
}
export default store
 */
var blueurl= "/Users/presbyter/Desktop/dong-project/dongPlusXcx/src/plugin"
var reg = /([/][^/]+)$/;
var blueurl = blueurl.replace(reg, "/store");
console.log(blueurl);


fs.readdir (__dirname, (err, stats) => {
  let content = ``;
  let exportStore = `const store = {\n`;
  const reg = /([.][^.]+)$/;
  for (let i = 0; i < stats.length; i++) {
    content =
      content +
      `import ${stats[i].replace (reg, '')}Store from './${stats[i]}'\n`;
    if (i === stats.length - 1) {
      exportStore =
        exportStore +
        `    ${stats[i].replace (reg, '')}Store\n}\nexport default store`;
    } else {
      exportStore = exportStore + `    ${stats[i].replace (reg, '')}Store,\n`;
    }
  }
  fs.writeFile ('./index.js', content + exportStore, error => {
    if (error) return console.log ('写入文件失败,原因是' + error.message);
    console.log ('写入成功');
    exit()
  });
});

