const localImg = './dialog2.jpg';
const netImg = 'http://file-test.idongjia.cn/T3ttETBXWT1RCvBVdK.jpg';

const canvas = document.querySelector ('.test');
const ctx = canvas.getContext ('2d');
// 设置背景色 为绿色
ctx.fillStyle = 'green';
ctx.fillRect(0,0,1000,1000);
// 设置 文字
ctx.font = "48px serif";
// ctx.fontColor = "#fff";
// ctx.textBaseline = "hanging";
ctx.fillStyle = "orange";
ctx.fillText("你好", 0, 300);


const img = new Image (); // 创建一个<img>元素
// 图片跨域
img.setAttribute ('crossOrigin', 'Anonymous');

// img.src = localImg; // 设置图片源地址
img.src = netImg; // 设置图片源地址
document.body.append (img);
img.onload = function () {
  // 执行drawImage语句
  ctx.drawImage (img, 0, 0, 200, 222);
  ctx.drawImage (img, 25, 100, 100, 80, 220, 242, 100, 74);

  // ctx.beginPath ();
  // ctx.moveTo (30, 96);
  // ctx.lineTo (70, 66);
  // ctx.lineTo (103, 76);
  // ctx.lineTo (170, 15);
  // ctx.stroke ();
};

// const fileInfo = canvas.toDataURL ();

// console.log (fileInfo);
