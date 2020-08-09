// 创建真实 的dom
// 父级 节点
// oldVnode => id#app   vnode 我们根据模板产生的虚拟dom

// 将虚拟节点转化成真实节点
export function patch (oldVnode, vnode) {
  // 将虚拟节点 转化为真实节点
  /**
   * 1. 比较两个元素的标签，span，p，div 标签不一样直接替换。
   * 2. 标签一样 div，div，或者是文本字符串的时候 文本没属性
   * 3. 标签一样 对比标签属性 和 儿子 （标签一样可直接复用，更新属性新老属性对比，去更新节点）
   *      3.1属性对比 老的有。新的没有 ，删除属性（removAttribute操作真实dom）；新的有 直接用新的 属性
   * 4. 比对儿子；老的有儿子，新的没儿子；老的没，新的有；老的有，新的有。
   *      4.1 老有，新无； 清空
   *      4.2 老无，新有； 加进去
   *      4.3 老有，新有； diff
   *          4.3 通过指针长度，增加、删除属性
   */
  const isRealElement = oldVnode.nodeType;
  console.log ('isRealElement', isRealElement);
  if (isRealElement) {
    // diff 使用
    const oldElm = oldVnode; // 产生真实的dom 
    const parentElm = oldElm.parentNode;// 获取老的app的父亲 =》 body

    let el = createElm (vnode);
    parentElm.insertBefore (el, oldElm.nextSibling); // 当前的真实元素插入到app的后面
    parentElm.removeChild (oldVnode); // 删除 老节点
    return el;
  }
}
function createElm (vnode) {
  let {tag, children, key, data, text} = vnode;
  if (typeof tag === 'string') {
    vnode.el = document.createElement (tag); //创建元素 放到vnode.el上
    updateProperties (vnode); //更新 样式 style
    children.forEach (child => {
      //将子 放到元素 中 创建 子元素
      return vnode.el.appendChild (createElm (child));
    });
  } else {
    vnode.el = document.createTextNode (text); // 创建 文本
  }
  return vnode.el;
}
// vue 的渲染流程 =》 先初始化数据 =》 将模板进行编译 =》 render函数 =》 生成虚拟节点 =》 生成真实的dom  =》 扔到页面上

function updateProperties (vnode) {
  let newProps = vnode.data || {}; // 获取当前老节点中的属性
  let el = vnode.el; // 当前的真实节点
  for (let key in newProps) {
    if (key === 'style') {
      //{color：red}
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      //类名
      el.className = newProps.class;
    } else {
      // 事件 on-开头的
      // 给这个元素添加属性 值就是对应的值
      el.setAttribute (key, newProps[key]);
    }
  }
}
