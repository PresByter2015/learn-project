/**
 *移除指定元素某些特定的样式
 */
export function removeStyle(elem, rule) {
  let style = elem.getAttribute('style');
  if (rule) {
    if (style && style.includes(rule)) {
      let reg = new RegExp(`${rule}\: [a-z0-9]+;`, 'g');
      style.replace(reg, '');
    }
  }
}
