function add (a, b, c) {
  k = 1;
  if (a > 0 && b < 0) {
    if (a + c > 0) {
      k = k + 10;
    } else {
      k = k + 100;
    }
  } else {
    k = k + 1000;
  }
  return k;
}

// console.log (add (3, -6, 9));
// console.log (add (3, -6, -9));
// console.log (add (3, 6, -9));

// function sum (a, b, c) {
//   k = 1;
//   if (a > 0 || b < 0) {
//       console.log ('---1');
//     if (a + c > 0) {
//       k = k + l;
//       console.log ('---2');
//     } else {
//       k = k + 2;
//       console.log ('---3');
//     }
//   } else {
//     k = k + 3;
//     console.log ('---4');
//   }
//   if (c > 0) {
//     k = k + 4;
//     console.log ('---5');
//   }
//   console.log ('---6');
//   return k;
// }

function Sort (x, y) {
  k = 0;
  if (x > 80 && y > 100) {
    k = x + y;
    console.log ('---1');
  } else {
    k = x - y;
    console.log ('---2');
  }
  console.log ('---3');
  return k;
}

console.log (Sort (100, 200));
console.log (Sort (80, 100));
console.log (Sort (100, 80));
console.log (Sort (60, 200));

/***
 * A、(x,y)=(100,200)、(80,100)、(100,80)、(60,200)
B、(x,y)=(120,120)、(60,100)、(100,100)、(90,400)
C、(x,y)=(90,400)、(60,120)、(100,100)、(60,200)
D、(x,y)=(100,100)、(70,70)、(100,80)、(60,120)
 */

// ccc----(1,2,-3)、(-1,2,-3)、(-3,-2,-1)
// aaaa--------(1,2,-3)、(-1,2,3)、(-3,-2,-1)
//bbb--- (1,-2,-3)、(-1,2,3)、(-3,-2,-1)
// (1,2,3)、(-1,2,3)、(-3,-2,-1)

function Sort2 (a, b, c) {
  k = 0;
  if (a + b > 0 && a + c > 0 && b + c < 0) {
    k = 10;
    console.log ('1----1');
  }
  console.log ('1----2');
  return k;
}
// console.log(Sort2(1,2,3));
// console.log(Sort2(5,3,-4));
/**
(a,b,c)=(1,2,3)、(-4,-3,5)
(a,b,c)=(1,2,3)、(-5,-4,3)
(a,b,c)=(5,3,-4)、(-3,2,1)
(a,b,c)=(2,3,4)、(5,4,-3)
 * 
 */

// 444444
function sum (l, m, n) {
  k = 1;
  if (l > 0 || m < 0 || l + n > 0) {
    k = k + l;
    console.log ('---1');
  } else {
    k = k + m;
    console.log ('---2');
  }
  if (n > 0) {
    k = k + n;
    console.log ('---3');
  }
  return k;
}
/**
(l,m,n)=(3,-6,9)、(-3,8,-4)
(l,m,n)=(7,9,-1)、(2,6,5)
(l,m,n)=(5,9,-2)、(-4,8,3)
(l,m,n)=(4,7,2)、(-3,-4,6)
 */
// console.log(sum(3,-6,9));
// console.log(sum(-3,8,-4));

// console.log(sum(7,9,-1));
// console.log(sum(2,6,5));

// console.log(sum(5,9,-2));
// console.log(sum(-4,8,3));

// console.log(sum(4,7,2));
// console.log(sum(-3,-4,6));
