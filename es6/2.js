// function foo (element, a, b) {
//   element.onclick = function () {
//     /* uses a and b */
//   };
// }

// function foo (element, a, b) {
//   element.onclick = bar (a, b);
// }
// function bar (a, b) {
//   return function () {
//     /* uses a and b */
//   };
// }

function foo (element, a, b) {
  element.onclick = function () {
    /* uses a and b */
  };
  element = null;
}

foo('')

var array = [1,2,3,4,5,6,7];  


// for(let index in array) {  
//     console.log(index,array[index]);  
// };  

for(let v of array) {  
    console.log(v);  
};  

