var Fontmin = require ('fontmin');
const words = [
  '付款成功',
  '功能列表',
  '更多惊喜好礼 尽在好券领取',
  '我的订单',
  '猜你喜欢',
  '图文详情',
  '爆品抢购',
  '立即购买',
  '确认',
  '您好！欢迎来到 東+会员平台',
  '保存图片到相册',
  '节气精选好物',
  '热卖商品',
  '格调生活',
  '分享美物给好友',
  '保存并使用',
  '添加收货地址',
  '确认提交',
  '立即付款',
  '東+拼团',
  '更多好物',
  '東+拼团',
  '新人专属礼包',
  '国风好物，尽在東+拼团',
  '精选团',
  '邀新团',
  '抽奖团',
  '趣东家',
  '限时',
  '好礼任性送，好友一起拆',
  '去送好友',
  '拆礼包',
  '选择礼包',
  '分享好友',
  '拆出好礼',
  '活动说明',
  '为了感谢你，给你千挑万选来一份大礼',
  '查看礼品',
  '礼包已拆完',
];
console.log ('string', words.join (''));
var fontmin = new Fontmin ()
  .src ('fonts/SourceHanSerifCN-SemiBold.ttf') // 设置服务端源字体文件
  .dest ('build') // 设置生成字体的目录
  .use (
    Fontmin.glyph ({
      text: words.join (''), // 设置需要的自己
      hinting: false,
    })
  );

fontmin.run (function (err, files) {
  // 生成字体
  if (err) {
    throw err;
  }
  console.log (files[0]); // 返回生成字体结果的Buffer文件
});
