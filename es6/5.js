var toString = Object.prototype.toString
function typeOf (val) {
  return toString.call(val).slice(8, -1).toLowerCase()
}
function isArray (val) {
  return typeOf(val) === 'array'
}
function isPlainObject (val) {
  return typeOf(val) === 'object'
}
function isObject (val) {
  return val && typeof val === 'object' && !isArray(val)
}
function isFunction (val) {
  return typeOf(val) === 'function'
}

console.log(isPlainObject([{a:'1'}]));
console.log(isObject({}));