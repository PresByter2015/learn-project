function feeze (obj, modifyProto) {
  Object.keys (obj).forEach (function (key) {
    const val = obj[key];
    Object.defineProperty (obj, key, {
      //we simply overwrite existing prop
      value: val,
      writable: false, // important, I think
      enumerable: true,
      configurable: false,
    });
  });

  return obj;
}
function myFreeze (obj) {
  // 判断参数是否为Object类型
  // if (obj instanceof Object) {
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       Object.defineProperty(obj, key, {
  //         writable: false, // 设置只读
  //       });
  //       Object.seal(obj); // 封闭对象
  //     }
  //   }
  // }
  // return obj;
  if (obj instanceof Object) {
    Object.seal (obj);
    let p;
    for (p in obj) {
      if (obj.hasOwnProperty (p)) {
        Object.defineProperty (obj, p, {
          writable: false,
        });
        myFreeze (obj[p]); // 递归，实现更深层次的冻结
      }
    }
  }
}
const ff = {a: 11, b: 22, c: {d: 33}};
// Object.defineProperty (ff, 'c', {
//   value: ff.c,
//   writable: false,
//   enumerable: false,
//   configurable: false,
// });
// const res = myFreeze (ff);
// res.c.e = 44;
// console.log (999, res);

// console.log (res);
myFreeze (ff);
ff.c.e = 55;
console.log ('ff',ff);
