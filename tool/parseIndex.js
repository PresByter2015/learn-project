const {parseHTML} = require ('./parseHtmls');

// console.log (parseHTML);
// console.log(module);

/**
 * @description:  
 * @author: PresByter
 * @date   : 2020/11/18 11:24:57
 * @latest : 2020/11/18 11:24:57
 * @see 
 * 
 * 
 * 
 * 
 * 
 const nodeSnip =
`Page({
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'You never know what you're gonna get.'
      }]
    }]
  }
})
 */

const htmlSnip = `<div class="div_class">
  <h1>Title</h1>
  <p class="p">
    Life is&nbsp;<i>like</i>&nbsp;a box of
    <b>&nbsp;chocolates</b>.
  </p>
</div>
`;
parseHTML (htmlSnip);

// setTimeout (() => {}, 1000);
