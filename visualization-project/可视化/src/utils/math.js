function degree2radian(degree) {
  return degree * (Math.PI / 180);
}

function cos(degree) {
  return Math.cos(degree2radian(degree));
}

function sin(degree) {
  return Math.sin(degree2radian(degree));
}

function rotate(point, degree) {
  let x = point.x;
  let y = point.y;

  return {
    x: x * cos(degree) - y * sin(degree),
    y: y * cos(degree) - x * sin(degree)
  };
}

function abs(val) {
  return val >= 0 ? val : -val;
}

function min(a, b) {
  return a < b ? a : b;
}

function max(a, b) {
  return a > b ? a : b;
}

function isClosely(start, end, scale) {
  return abs(end.x - start.x) < (10 / scale) && abs(end.y - start.y) < (10 / scale);
}

function isInRect(point, coords) {
  return point.x > coords.x && point.y > coords.y
    && point.x < (coords.x + coords.width) && point.y < (coords.y + coords.height);
}

export { rotate, abs, min, max, isClosely, isInRect };
