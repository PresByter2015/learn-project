let obj = {
  /**
       * 数字格式化
       * @param {String} num 数字字符串
       * @param {Number} scale 小数位数，默认为2
       * @param {String} extra 附加内容
       * @param {Boolean} sign 是否显示正负符号
       * @param {Number} mult 放大倍数，默认不放大
       */
  decimal: function(num, scale = 2, extra = '', sign, mult = 1) {
    var f = parseFloat(num)
    if (isNaN(f)) return '--'
    f = f * mult;
    var _sign = sign && f >= 0 ? '+' : '';
    // console.log(`${f}`.substring (`${f}`.indexOf ('.')+1).length<scale);
    // f=f+'0'.repeat(scale);
    return `${f}`.indexOf ('.') !== -1
      ? _sign + `${f}${'0'.repeat(scale-1)}`.substring (0, `${f}`.indexOf ('.') + (scale + 1)) + extra
      : _sign + `${f.toFixed (scale)}` + extra;
    // return _sign + f.toFixed(scale) + extra
  },
  decimal2: function (x, num) {
    // 解析浮点数，返回小数点后两位
    return this.decimal (x, num);
  },
  rate: function (x, num) {
    // 解析浮点数，返回小数点后两位
    num = num || 2;
    var f = parseFloat (x);
    if (isNaN (f)) {
      return '--';
    } else {
      x = parseFloat (x) * 100;
      return x.toFixed (num);
    }
  },
  decimal4: function (x) {
    // 解析浮点数，返回小数点后四位
    return this.decimal (x, 4);
  },
  mul: function (arg1, arg2) {
    // 高精度浮点数乘法
    var m = 0, s1 = arg1.toString (), s2 = arg2.toString ();
    if (s1.split ('.').length == 2) {
      m += s1.split ('.')[1].length;
    }
    if (s2.split ('.').length == 2) {
      m += s2.split ('.')[1].length;
    }
    return (
      Number (s1.replace ('.', '')) *
      Number (s2.replace ('.', '')) /
      Math.pow (10, m)
    );
  },
  div: function (arg1, arg2) {
    // 高精度浮点数除法
    var m = 0, s1 = arg1.toString (), s2 = arg2.toString ();
    if (s1.split ('.').length == 2) {
      m += s1.split ('.')[1].length;
    }
    if (s2.split ('.').length == 2) {
      m += s2.split ('.')[1].length;
    }
    return (
      Number (s1.replace ('.', '')) /
      Number (s2.replace ('.', '')) /
      Math.pow (10, m)
    );
  },
  add: function (num1, num2) {
    // 高精度浮点数加法
    var r1, r2, m;
    try {
      r1 = num1.toString ().split ('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString ().split ('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow (10, Math.max (r1, r2));
    return Math.round (num1 * m + num2 * m) / m;
  },
  sub: function (num1, num2) {
    // 高精度浮点数减法
    var r1, r2, m;
    try {
      r1 = num1.toString ().split ('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString ().split ('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow (10, Math.max (r1, r2));
    return Math.round (num1 * m - num2 * m) / m;
  },
};
// console.log (obj.decimal('99999.888888888',3,'￥',true));
console.log (obj.decimal ('1.5000000', 4, '￥', true,1));
console.log (obj.decimal ('1.5000000', 4, '￥', true,2));
console.log (obj.decimal ('1.5020000', 4, '￥', true,2));
console.log (obj.decimal (1.5100000, 4, '￥', true,3));
console.log (obj.decimal (1.5000000, 4, '￥', true,1));
console.log (obj.decimal (1, 4, '￥', true,1));
//   export default module;
function numZoom (num, zoom) {
  return parseFloat (num) * zoom;
}
function numInit (num) {
  return parseFloat (num);
}
