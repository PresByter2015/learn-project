var Fontmin = require ('fontmin');

var fontmin = new Fontmin ()
  .src ('fonts/SourceHanSerifCN-Heavy.ttf') // 设置服务端源字体文件
  .dest ('build') // 设置生成字体的目录
  .use (
    Fontmin.glyph ({
      text: '付款成功功能列表保存图片到相册积分任务转换图文详情分享美物给好友爆品抢购日常成长任务24签到你可能还喜欢我的订单节气精选好物热卖商品格调生活', // 设置需要的自己
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
