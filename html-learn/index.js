// import data from './data.json'
// const data = require ('./data.json');
// import data from './data'
console.log (data);
let movelist = [];
let timeslist = [];
let content = '';
function handleData (checkedId) {
  console.time ('a');
  var start = window.performance.now ();
  var startp = performance.toJSON ();
  timeslist.push (startp);
  movelist = data.subjects.map (v => {
    return v.id === checkedId ? {...v, checked: !v.checked} : {...v};
  });
  movelist.forEach ((item, index) => {
    content += `<div class="b2">${index}、${item.title}</div>`;
  });
  document.querySelector ('#test').innerHTML = content;
  var end = window.performance.now ();
  var endp = performance.toJSON ();
  console.timeEnd ('a');
  console.log (end - start);
  timeslist.push (endp);
}
handleData ('');
console.log (timeslist);
