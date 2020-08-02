// 父级 节点
export function patch (oldVnode, vnode) {
    // 将虚拟节点 转化为真实节点
  const isRealElement = oldVnode.nodeType;
  console.log('isRealElement',isRealElement);
  if (isRealElement) {// diff 使用
    const oldElm = oldVnode;
    const parentElm = oldElm.parentNode;

    let el = createElm (vnode);
    parentElm.insertBefore (el, oldElm.nextSibling);
    parentElm.removeChild (oldVnode);// 删除 老节点
    return el;
  }
}
function createElm (vnode) {
  let {tag, children, key, data, text} = vnode;
  if (typeof tag === 'string') {
    vnode.el = document.createElement (tag);//创建元素
    updateProperties (vnode);
    children.forEach (child => {//将子 放到元素 中 创建 子元素
      return vnode.el.appendChild (createElm (child));
    });
  } else {
    vnode.el = document.createTextNode (text); // 创建 文本
  }
  return vnode.el;
}
function updateProperties (vnode) {
  let newProps = vnode.data || {}; // 获取当前老节点中的属性
  let el = vnode.el; // 当前的真实节点
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = newProps.class;
    } else {
      // 给这个元素添加属性 值就是对应的值
      el.setAttribute (key, newProps[key]);
    }
  }
}
