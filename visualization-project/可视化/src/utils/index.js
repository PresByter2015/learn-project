import _ from 'lodash';

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function uncapitalize(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function delay(func, wait = 200) {
  if (typeof func !== 'function') {
    throw new TypeError;
  }
  let args = [].slice(arguments, 2);
  return setTimeout(function () {
    func.apply(undefined, args);
  }, wait);
}

/**
 * @name arrayToObject
 *
 * 数组对象转换成对象
 *
 * @param {array} 需要转换的数组
 * @param {key optional} 可选，数组对象成员的 key，用来生成对象的 key
 * @returns {object}
 */
export function arrayToObject(array, key = 'id', callback = (item) => item) {
  let object = {};
  if (!array || array.length <= 0) {
    return object;
  }
  array.forEach(item => object[item[key]] = callback(item));
  return object;
}

export function objectToArray(object) {
  return Object.keys(object).map(key => object[key]);
}

export function isPlainObject(object) {
  return _.isPlainObject(object);
}

/**
 * @name nullToUndefined
 *
 * null转换成undefined
 *
 * 用于处理数据保存到后端时被序列化成null的值,还原回undefined
 */
export function nullToUndefined(array) {
  if (!array || array.length <= 0) {
    return array;
  }
  array.forEach((value, i) => {
    if (_.isNull(value)) {
      array[i] = undefined;
    }
  });
}
