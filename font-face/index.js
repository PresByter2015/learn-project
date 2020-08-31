var Fontmin = require ('fontmin');

var fontmin = new Fontmin ()
  .src ('fonts/SourceHanSerifCN-Heavy.ttf') // 设置服务端源字体文件
  .dest ('build') // 设置生成字体的目录
  .use (
    Fontmin.glyph ({
      text: '尹小芃槑', // 设置需要的自己
      hinting: false 
    })
  );

fontmin.run (function (err, files) {
  // 生成字体
  if (err) {
    throw err;
  }
  console.log (files[0]); // 返回生成字体结果的Buffer文件
});
