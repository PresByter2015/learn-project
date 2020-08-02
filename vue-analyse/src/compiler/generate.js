/**
 * 3.生成代码
 * 
 * 
 * <div style="color:red">hello {{name}} <span></span></div>
render(){
   return _c('div',{style:{color:'red'}},_v('hello'+_s(name)),_c('span',undefined,''))
}
 */
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 默认的双大括号
function gen (node) {
  if (node.type == 1) {
    //元素
    return generate (node);
  } else {
    //文本
    let text = node.text;
    if (!defaultTagRE.test (text)) {
      // 普通文本 不带 {{}}
      return `_v(${JSON.stringify (text)})`; //_v(hello)=>json之後_v('hello')
    }
    let lastIndex = (defaultTagRE.lastIndex = 0); //如果正则 是全局 模式，需要每次使用前置位 0
    let tokens = []; //存放每一段代码
    let match, index;

    while ((match = defaultTagRE.exec (text))) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push (JSON.stringify (text.slice (lastIndex, index)));
      }
      tokens.push (`_s(${match[1].trim ()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push (JSON.stringify (text.slice (lastIndex)));
    }
    return `_v(${tokens.join ('+')})`;
  }
}
function getChildren (el) {
  // 生成儿子节点
  const children = el.children;
  if (children) {
    return `${children.map (c => gen (c)).join (',')}`;
  } else {
    return false;
  }
}
// 语法 层面 转义
function genProps (attrs) {
  // 生成属性
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {};
      attr.value.split (';').forEach (item => {
        let [key, value] = item.split (':');
        obj[key] = value;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify (attr.value)},`;
  }
  return `{${str.slice (0, -1)}}`;
}
export function generate (el) {
  let children = getChildren (el); //取当前元素的 儿子
  let code = `_c('${el.tag}',${el.attrs.length ? `${genProps (el.attrs)}` : 'undefined'}${children ? `,${children}` : ''})`;
  return code;
}
