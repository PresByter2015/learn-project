/**
 * 判断 path 是否为空
 */
function isEmptyPath(path) {
  return path && path.length === 0
}

/**
 * 把 { key: value } 形式的对象转换成树结构
 * key 形式
 * @param option object
 * @param path
 * @param value: any
 */
export default function getterSetter(tree = {}, path, value, separator = '_') {
  if (typeof path === 'string' && path.includes(separator)) {
    path = path.split(separator)
  }

  if (typeof path === 'string') {
    if (typeof value !== 'undefined') {
      tree[path] = value
      return tree
    }

    return tree[path]
  }

  // 取出路径中第一项成员
  let dir = path.shift()

  /**
   * 树中有该节点，就不需要创建该节点了，
   * 没有的话就需要创建这个节点，用来存放数据
   */
  if (tree.hasOwnProperty(dir)) {
    if (isEmptyPath(path)) {
      setValue(tree, dir, value)
    }
  } else {
    if (isEmptyPath(path)) {
      setValue(tree, dir, value)
    } else {
      tree[dir] = {}
    }
  }

  if (path.length > 0) {
    getterSetter(tree[dir], path, value, separator)
  }

  return tree
}

function setValue(tree, name, value) {
  if (typeof value !== 'undefined') {
    tree[name] = value
  }
  return tree
}
