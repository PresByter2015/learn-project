/**
 * @description:  
 * @author: PresByter
 * @date   : 2021/02/04 10:03:10
 * @latest : 2021/02/04 10:03:10
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see 
 * 
 * 
添加元素(指定位置添加)

添加元素(指定位置添加) 描述：在数组arr的index处添加元素item，不要直接修改数组arr，结果返回新的数组 [1,2,3] 2,6 结果为[1,2,6,3]
 */
function name33 (arr = [], i, v) {
  let b = [...arr];
  b.splice (i, 0, v);
  return b;
}
let a = [1, 2, 3];
console.log (name33 (a, 2, 6), a);

//1.使用splice方法插入（效率较高）
function insert1 (arr, item, index) {
  let resArr = arr.slice (0);
  resArr.splice (index, 0, item);
  return resArr;
}

//2.push.apply+splice
function insert2 (arr, item, index) {
  let resArr = [];
  [].push.apply (resArr, arr);
  resArr.splice (index, 0, item);
  return resArr;
}

//3.先复制前0~index个元素，将item元素插入之后，再拼接index之后的元素
function insert3 (arr, item, index) {
  let resArr = arr.slice (0, index);
  resArr.push (item);
  resArr = resArr.concat (arr.slice (index));
  return resArr;
}

//字符串陷阱   请输出结果并进行解释
function showCase(value) {
  console.log(value);
  switch(value) {
    case 'A':
      console.log('Case A');
      break;
    case 'B':
      console.log('Case B');
      break;
    case undefined:
      console.log('undefined');
      break;
    default:
      console.log('Do not know!');
  }
}
showCase(new String('A'));
/**
 * Do not know!
在 switch 内部使用严格相等 === 进行判断，
并且 new String("A") 返回的是一个对象，
而 String("A") 则是直接返回字符串 "A"。
你也可以参考MDN中对原始字符串和String对象的区分,查看相关的资料
 */