console.log ('curry');

// 练习 1
//==============
// 通过局部调用（partial apply）移除所有参数

var split = curry (function (what, replacement, str) {
  return str.split (what, replacement);
});

var words = function (str) {
  return split (' ', str);
};

//------->  var words = split(' ');
// 练习 1a
//==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组
var map = curry (function (f, ary) {
  return ary.map (f);
});

var sentences = undefined;
//-------> var sentences = map(words)

// 练习 2
//==============
// 通过局部调用（partial apply）移除所有参数

var filterQs = function (xs) {
  return filter (function (x) {
    return match (/q/i, x);
  }, xs);
};

var match = curry (function (what, str) {
  return str.match (what);
});

var replace = curry (function (what, replacement, str) {
  return str.replace (what, replacement);
});

var filter = curry (function (f, ary) {
  return ary.filter (f);
});

var filterQs = filter (match(/q/i));
// 练习 3
//==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
var _keepHighest = function (x, y) {
  return x >= y ? x : y;
};

// 重构这段代码:
var max = function (xs) {
  return reduce (
    function (acc, x) {
      return _keepHighest (acc, x);
    },
    -Infinity,
    xs
  );
};

// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
var slice = undefined;
//------->  var slice = curry(function(start, end, xs){ return xs.slice(start, end); });
// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
var take = undefined;

//
function currying (fn, length) {
  length = length || fn.length; // 第一次调用获取函数 fn 参数的长度，后续调用获取 fn 剩余参数的长度
  return function () {
    var args = [].slice.call (arguments); // currying返回函数接受的参数
    console.log (arguments, args);

    if (args.length < length) {
      // 判断参数的长度是否小于 fn 剩余参数需要接收的长度
      return currying (fn.bind (this, ...args), length - args.length); // 递归 currying 函数，新的 fn 为 bind 返回的新函数（bind 绑定了 ...args 参数，未执行），新的 length 为 fn 剩余参数的长度
    } else {
      return fn.call (this, ...args); // 执行 fn 函数，传入新函数的参数
    }
  };
}

const curry = fn =>
  (judge = (...args) =>
    args.length >= fn.length
      ? fn (...args)
      : (...arg) => judge (...args, ...arg));

function add (x, y) {
  return x + y;
}
// add (11);
let v = currying (add) (12) (9);
let v2 = curry (add) (12) (9);

console.log (v);
console.log (v2);

function curry1 (fn, lenght) {
  let clength = lenght || fn.length;
  return function () {
    const args = [].slice.call (arguments);
    if (args.length < clength) {
      return curry1 (fn.bind (this, ...args), clength - args.length);
    } else {
      return fn.apply (this, args);
      //   return fn.call (this, ...args);
    }
  };
}
/**
 * 
 * func.call(this, arg1, arg2);
func.apply(this, [arg1, arg2])


 * apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
apply 、 call 、bind 三者都可以利用后续参数传参；
bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
 */

function curry2 (fn, length) {
  const clength = length || fn.length;
  return function () {
    const args = [].slice.call (arguments);
    if (args.length < clength) {
      return curry2 (fn.bind (this, ...args), clength - args.length);
    } else {
      return fn.apply (this, args);
    }
  };
}
console.log (curry2 (add) (12) (9));
