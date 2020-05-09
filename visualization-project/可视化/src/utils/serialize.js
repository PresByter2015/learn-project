function function2string(k, v) {
  if (typeof v === 'function') {
    return v + '';
  }
  return v;
}

function string2function(k, v) {
  if (typeof v === 'string' && v.indexOf('function') > -1) {
    return eval('(function(){return ' + v + ' })()');
  }
  return v;
}

/**
 * 序列化json对象或js对象
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function serialize(obj) {
  return JSON.stringify(obj, function2string);
}

/**
 * 反序列化json字符串
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function unSerialize(obj) {
  return JSON.parse(obj, string2function);
}

/**
 * 深拷贝，支持 值为 function 类型
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function deepCopy(obj) {
  return unSerialize(serialize(obj));
}

export { serialize, unSerialize, deepCopy };
