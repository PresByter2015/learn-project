/**
 * hsv to rgb
 */
let _hsv2rgb, _rgb, gcd, gcdEx, getSolutionOfLinearConguenceEquation, hsv2rgb;

gcd = function (a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

gcdEx = function (a, b) {
  let ref, ref1, x, y;
  if (b === 0) {
    return [1, 0];
  }
  ref = gcdEx(b, a % b), x = ref[0], y = ref[1];
  return ref1 = [y, x - Math.floor(a / b) * y], x = ref1[0], y = ref1[1], ref1;
};

getSolutionOfLinearConguenceEquation = function (a, b, n) {
  let d, k, r, ref, x, x0;
  if (a * b === 0) {
    return false;
  }
  d = gcd(a, n);
  if (d % b === 0 && b !== 1) {
    ref = gcdEx(a, n), r = ref[0];
    x0 = r * (b / d);
    return ((function () {
      let i, ref1, results;
      results = [];
      for (k = i = 0, ref1 = n; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
        if (x = x0 + k * Math.floor(n / d) > 0) {
          results.push(x);
        }
      }
      return results;
    })()).slice(0, d);
  } else {
    return [b];
  }
};

_hsv2rgb = function (arg) {
  let f, h, hi, p, q, ref, s, t, v;
  h = arg[0], s = arg[1], v = arg[2];
  hi = (getSolutionOfLinearConguenceEquation(1, Math.floor(h / 60), 6) || [0])[0];
  f = h / 60 - hi;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  return ref = (function () {
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  })(), ref[0], ref[1], ref[2], ref;
};

_rgb = function (arg) {
  let b, g, r;
  r = arg[0], g = arg[1], b = arg[2];
  return 'rgb(' + (Math.round(r * 255)) + ', ' + (Math.round(g * 255)) + ', ' + (Math.round(b * 255)) + ')';
};

hsv2rgb = function (arg) {
  let h, s, v;
  h = arg[0], s = arg[1], v = arg[2];
  return _rgb(_hsv2rgb([h, s / 100, v / 100]));
};

export default hsv2rgb;
