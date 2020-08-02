// 1.解析标签和内容
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //标签名字 aa-123dd  span div-hr
// ?:匹配但不捕获
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <my:xx></my:xx>
const startTagOpen = new RegExp (`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp (`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
// 有n个空格，
// 1. aa =  " aaa (中间不能有“) "
// 2. a = 'aaa  '
// 3. a= aaa
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >   <div><div/>  <br/>
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 默认的双大括号

export function parseHTML (html) {
  let root;
  let currentParent;
  let stack = [];
  const ELEMENT_TYPE = 1;
  const TEXT_TYPE = 3;

  // 树 队列 栈 链表
  function createASTElement (tagName, attrs) {
    return {
      tag: tagName, //标签名
      type: ELEMENT_TYPE, //
      children: [],
      attrs,
      parent: null,
    };
  }

  function start (tagName, attrs) {
    console.log (tagName, attrs);
    let element = createASTElement (tagName, attrs);
    if (!root) {
      root = element;
    }
    currentParent = element; //当前 解析的标签 保存起来
    stack.push (element); //将AST生产的 元素 放入 栈
  }
  function end (tagName) {
    // [div,p] => [div] => div
    console.log (tagName);
    let element = stack.pop (); //取出栈 最后一个
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      // 标签的父亲是 谁
      element.parent = currentParent;
      currentParent.children.push (element);
    }
  }
  function chars (text) {
    console.log (text);
    text = text.replace (/\s/g, '');
    if (text) {
      currentParent.children.push ({
        type: TEXT_TYPE,
        text,
      });
    }
  }

  while (html) {
    //只要 html 不为 空 字符串 就一直解析
    let textEnd = html.indexOf ('<');
    if (textEnd == 0) {
      /** 未解析
         * v-bind slot @click
         * 注释
         * <!DOCTYPE html>
         */
      //开始标签
      const startTagMatch = parseStartTag ();
      //   开始标签
      if (startTagMatch) {
        start (startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      //   结束标签
      const endTagMatch = html.match (endTag);
      if (endTagMatch) {
        advance (endTagMatch[0].length);
        end (endTagMatch[1]); //将结束标签 传入
        continue;
      }
    }
    let text; //解析文本
    if (textEnd >= 0) {
      //文本
      text = html.substring (0, textEnd);
    }
    if (text) {
      advance (text.length); //删除文本
      chars (text); //拿到文本
    }
  }
  function advance (n) {
    // 截取字符串 再更新html
    html = html.substring (n);
    // var html='123456'
    // html = html.substring(2);
    // "3456"
  }
  function parseStartTag () {
    const start = html.match (startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance (start[0].length); //删除标签

      let attr, end;
      // 有没有闭合 标签：不是结尾，但是能匹配到属性
      while (
        !(end = html.match (startTagClose)) &&
        (attr = html.match (attribute))
      ) {
        match.attrs.push ({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance (attr[0].length); // 去掉当前属性
      }
      if (end) {
        // >
        advance (end[0].length);
        return match;
      }
    }
  }
  return root;
}