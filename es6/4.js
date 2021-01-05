function Sort (l, m, n) {
  k = 1;
  if (l > 0 && m < 0 && l + n > 0) {
    k = k + l;
    console.log ('----1');
  } else {
    k = k + m;
    console.log ('----2');
  }
  if (n > 0) {
    console.log ('----3');
    k = k + n;
  }
  return k;
}

// console.log (Sort (5, -9, -2));
// console.log (Sort (-4, 8, 3));
// console.log (Sort (3, 6, 9));
// console.log (Sort (-3, -8, -4));
/**
 A、(l,m,n)=(5,-9,-2)、(-4,8,3)
B、(l,m,n)=(3,6,9)、(-3,-8,-4)
C、(l,m,n)=(7,9,-1)、(2,6,5)
D、(l,m,n)=(4,7,2)、(-3,-4,6)
 */

function Sort1 (a, b, c) {
  k = 0;
  if (a + b > 0 && a + c > 0 && b + c < 0) {
    k = 10;
    console.log ('----1');
  }
  return k;
}
// console.log (Sort1 (-5, -4, 3));
// console.log (Sort1 (5, -4, 3));
/**
 A、(a,b,c)=(1,2,3)、(-5,-4,3)

B、(a,b,c)=(2,3,4)、(5,4,-3)
C、(a,b,c)=(1,2,3)、(-4,-3,5)

D、(a,b,c)=(4,3,2)、(5,-4,3)
 */

function Sort2 (a, b) {
  c = 0;
  if (a > 1 && b < 10) {
    c = a - b;
    console.log ('----1');
  }
  if (a == 2 && b > 20) {
    c = a + b;
    console.log ('----2');
  }
  console.log ('----3');
  return c;
}
Sort2 (2, 0);
Sort2 (0, 11);
console.log ('aaa');

/**
 A、(a,b)=(2,0)、(0,11)  1 3 3
B、(a,b)=(1,0)、(0,21) '' 3 3 
C、(a,b)=(2,0)、(0,21) 1 3 3
D、(a,b)=(3,0)、(0,31) 1 3 3
 */

function Sort3 (l, m, n) {
  k = 1;
  if (l > 0 || m < 0 || l + n > 0) {
    k = k + l;
    console.log ('----1');
  } else {
    k = k + m;
    console.log ('----2');
  }
  if (n > 0) {
    k = k + n;
    console.log ('----3');
  }
  return k;
}
// Sort3 (3, -6, 9);
// Sort3 (-3, 8, -4);
// console.log ('aaaaaaaaaaaa');
// Sort3 (5, 9, -2);
// Sort3 (-4, 8, 3);
/**
 A、(l,m,n)=(3,-6,9)、(-3,8,-4)

B、(l,m,n)=(5,9,-2)、(-4,8,3)
C、(l,m,n)=(7,9,-1)、(2,6,5)---
D、(l,m,n)=(4,7,2)、(-3,-4,6)----
 */

function Sort4 (a, b, c) {
  k = 1;
  if (a > 0 || b < 0) {
    if (a + c > 0) {
      k = k + l;
      console.log ('----1');
    } else {
      console.log ('----2');
      k = k + 2;
    }
  } else {
    console.log ('----3');
    k = k + 3;
  }
  if (c > 0) {
    console.log ('----4');
    k = k + 4;
  }
  return k;
}
// Sort4 (1, 2, -3);
// Sort4 (-1, 2, 3);
// Sort4 (-3, -2, -1);
// console.log ('aaaaaaaaaaaa');
// // Sort4 (1, 2, 3);
// Sort4 (1, -2, -3);
/**
 A、(a,b,c)=(1,2,-3)、(-1,2,-3)、(-3,-2,-1)----

B、(a,b,c)=(1,2,-3)、(-1,2,3)、(-3,-2,-1)
C、(a,b,c)=(1,2,3)、(-1,2,3)、(-3,-2,-1)
D、(a,b,c)=(1,-2,-3)、(-1,2,3)、(-3,-2,-1)
 */
