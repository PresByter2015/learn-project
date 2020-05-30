// Automatically generated file.  Do not edit!

'use strict';
var b, h = {g: {}};
h.g.global = (function () {
  return 'object' === typeof self
    ? self
    : 'object' === typeof window
        ? window
        : 'object' === typeof global ? global : this;
}) ();
h.J = {};
h.g.global.Blockly || (h.g.global.Blockly = {});
h.g.global.Blockly.Msg || (h.g.global.Blockly.Msg = h.J);
h.Mi = {};
h.ut = 40;
h.Rt = 125;
h.Ey = 5;
h.Ry = 10;
h.ic = 28;
h.Qs = h.ic;
h.uy = 8;
h.oo = 250;
h.po = 10;
h.py = 30;
h.nz = 750;
h.Lz = 100;
h.Fy = !0;
h.Zy = 0.45;
h.$y = 0.65;
h.ui = {width: 96, height: 124, url: 'sprites.png'};
h.Ya = 1;
h.Od = 2;
h.Ka = 3;
h.Pd = 4;
h.cf = 5;
h.io = -1;
h.ho = 0;
h.Ds = 1;
h.hE = 0;
h.iE = 1;
h.fE = 1;
h.gE = 2;
h.pi = [];
h.pi[h.Ya] = h.Od;
h.pi[h.Od] = h.Ya;
h.pi[h.Ka] = h.Pd;
h.pi[h.Pd] = h.Ka;
h.Xg = 0;
h.bk = 1;
h.Rd = 2;
h.Wg = 3;
h.Ts = null;
h.to = 1;
h.Us = 2;
h.Bi = 'VARIABLE';
h.Yz = 'VARIABLE_DYNAMIC';
h.Tt = 'PROCEDURE';
h.mG = 'RENAME_VARIABLE_ID';
h.eE = 'DELETE_VARIABLE_ID';
h.g.kb = {};
h.g.kb.parse = function (a) {
  a = String (a).toLowerCase ().trim ();
  var c = h.g.kb.names[a];
  if (c) return c;
  c = '0x' == a.substring (0, 2) ? '#' + a.substring (2) : a;
  c = '#' == c[0] ? c : '#' + c;
  if (/^#[0-9a-f]{6}$/.test (c)) return c;
  if (/^#[0-9a-f]{3}$/.test (c))
    return ['#', c[1], c[1], c[2], c[2], c[3], c[3]].join ('');
  var d = a.match (/^(?:rgb)?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  return d &&
    ((a = Number (d[1])), (c = Number (d[2])), (d = Number (d[3])), 0 <= a &&
      256 > a &&
      0 <= c &&
      256 > c &&
      0 <= d &&
      256 > d)
    ? h.g.kb.Pr (a, c, d)
    : null;
};
h.g.kb.Pr = function (a, c, d) {
  c = (a << 16) | (c << 8) | d;
  return 16 > a
    ? '#' + (16777216 | c).toString (16).substr (1)
    : '#' + c.toString (16);
};
h.g.kb.ew = function (a) {
  a = h.g.kb.parse (a);
  if (!a) return [0, 0, 0];
  a = parseInt (a.substr (1), 16);
  return [a >> 16, (a >> 8) & 255, a & 255];
};
h.g.kb.hw = function (a) {
  var c = h.Zy, d = 255 * h.$y, e = 0, f = 0, g = 0;
  if (0 == c) g = f = e = d;
  else {
    var k = Math.floor (a / 60), l = a / 60 - k;
    a = d * (1 - c);
    var m = d * (1 - c * l);
    c = d * (1 - c * (1 - l));
    switch (k) {
      case 1:
        e = m;
        f = d;
        g = a;
        break;
      case 2:
        e = a;
        f = d;
        g = c;
        break;
      case 3:
        e = a;
        f = m;
        g = d;
        break;
      case 4:
        e = c;
        f = a;
        g = d;
        break;
      case 5:
        e = d;
        f = a;
        g = m;
        break;
      case 6:
      case 0:
        (e = d), (f = c), (g = a);
    }
  }
  return h.g.kb.Pr (Math.floor (e), Math.floor (f), Math.floor (g));
};
h.g.kb.np = function (a, c, d) {
  a = h.g.kb.parse (a);
  if (!a) return null;
  c = h.g.kb.parse (c);
  if (!c) return null;
  a = h.g.kb.ew (a);
  c = h.g.kb.ew (c);
  return h.g.kb.Pr (
    Math.round (c[0] + d * (a[0] - c[0])),
    Math.round (c[1] + d * (a[1] - c[1])),
    Math.round (c[2] + d * (a[2] - c[2]))
  );
};
h.g.kb.names = {
  aqua: '#00ffff',
  black: '#000000',
  blue: '#0000ff',
  fuchsia: '#ff00ff',
  gray: '#808080',
  green: '#008000',
  lime: '#00ff00',
  maroon: '#800000',
  navy: '#000080',
  olive: '#808000',
  purple: '#800080',
  red: '#ff0000',
  silver: '#c0c0c0',
  teal: '#008080',
  white: '#ffffff',
  yellow: '#ffff00',
};
h.g.O = function (a, c) {
  this.x = a;
  this.y = c;
};
h.g.O.vf = function (a, c) {
  return a == c ? !0 : a && c ? a.x == c.x && a.y == c.y : !1;
};
h.g.O.Rp = function (a, c) {
  var d = a.x - c.x;
  a = a.y - c.y;
  return Math.sqrt (d * d + a * a);
};
h.g.O.vC = function (a) {
  return Math.sqrt (a.x * a.x + a.y * a.y);
};
h.g.O.Ak = function (a, c) {
  return new h.g.O (a.x - c.x, a.y - c.y);
};
h.g.O.sum = function (a, c) {
  return new h.g.O (a.x + c.x, a.y + c.y);
};
h.g.O.prototype.scale = function (a) {
  this.x *= a;
  this.y *= a;
  return this;
};
h.g.O.prototype.translate = function (a, c) {
  this.x += a;
  this.y += c;
  return this;
};
h.g.Ja = {};
h.g.Ja.startsWith = function (a, c) {
  return 0 == a.lastIndexOf (c, 0);
};
h.g.Ja.Zr = function (a) {
  return a.length
    ? a.reduce (function (c, d) {
        return c.length < d.length ? c : d;
      }).length
    : 0;
};
h.g.Ja.Uu = function (a, c) {
  if (!a.length) return 0;
  if (1 == a.length) return a[0].length;
  var d = 0;
  c = c || h.g.Ja.Zr (a);
  for (var e = 0; e < c; e++) {
    for (var f = a[0][e], g = 1; g < a.length; g++)
      if (f != a[g][e]) return d;
    ' ' == f && (d = e + 1);
  }
  for (g = 1; g < a.length; g++)
    if ((f = a[g][e]) && ' ' != f) return d;
  return c;
};
h.g.Ja.Vu = function (a, c) {
  if (!a.length) return 0;
  if (1 == a.length) return a[0].length;
  var d = 0;
  c = c || h.g.Ja.Zr (a);
  for (var e = 0; e < c; e++) {
    for (var f = a[0].substr (-e - 1, 1), g = 1; g < a.length; g++)
      if (f != a[g].substr (-e - 1, 1)) return d;
    ' ' == f && (d = e + 1);
  }
  for (g = 1; g < a.length; g++)
    if ((f = a[g].charAt (a[g].length - e - 1)) && ' ' != f) return d;
  return c;
};
h.g.Ja.Jx = function (a, c) {
  a = a.split ('\n');
  for (var d = 0; d < a.length; d++)
    a[d] = h.g.Ja.PD (a[d], c);
  return a.join ('\n');
};
h.g.Ja.PD = function (a, c) {
  if (a.length <= c) return a;
  for (var d = a.trim ().split (/\s+/), e = 0; e < d.length; e++)
    d[e].length > c && (c = d[e].length);
  e = -Infinity;
  var f = 1;
  do {
    var g = e;
    var k = a;
    a = [];
    var l = d.length / f, m = 1;
    for (e = 0; e < d.length - 1; e++)
      m < (e + 1.5) / l ? (m++, (a[e] = !0)) : (a[e] = !1);
    a = h.g.Ja.Kx (d, a, c);
    e = h.g.Ja.xs (d, a, c);
    a = h.g.Ja.QD (d, a);
    f++;
  } while (e > g);
  return k;
};
h.g.Ja.xs = function (a, c, d) {
  for (var e = [0], f = [], g = 0; g < a.length; g++)
    (e[e.length - 1] += a[g].length), !0 === c[g]
      ? (e.push (0), f.push (a[g].charAt (a[g].length - 1)))
      : !1 === c[g] && e[e.length - 1]++;
  a = Math.max.apply (Math, e);
  for (g = c = 0; g < e.length; g++)
    (c -= 2 * Math.pow (Math.abs (d - e[g]), 1.5)), (c -= Math.pow (
      a - e[g],
      1.5
    )), -1 != '.?!'.indexOf (f[g])
      ? (c += d / 3)
      : -1 != ',;)]}'.indexOf (f[g]) && (c += d / 4);
  1 < e.length && e[e.length - 1] <= e[e.length - 2] && (c += 0.5);
  return c;
};
h.g.Ja.Kx = function (a, c, d) {
  for (var e = h.g.Ja.xs (a, c, d), f, g = 0; g < c.length - 1; g++)
    if (c[g] != c[g + 1]) {
      var k = [].concat (c);
      k[g] = !k[g];
      k[g + 1] = !k[g + 1];
      var l = h.g.Ja.xs (a, k, d);
      l > e && ((e = l), (f = k));
    }
  return f ? h.g.Ja.Kx (a, f, d) : c;
};
h.g.Ja.QD = function (a, c) {
  for (var d = [], e = 0; e < a.length; e++)
    d.push (a[e]), void 0 !== c[e] && d.push (c[e] ? '\n' : ' ');
  return d.join ('');
};
h.g.hf = function (a, c) {
  this.width = a;
  this.height = c;
};
h.g.hf.vf = function (a, c) {
  return a == c ? !0 : a && c ? a.width == c.width && a.height == c.height : !1;
};
h.g.style = {};
h.g.style.xf = function (a) {
  if ('none' != h.g.style.Tv (a, 'display')) return h.g.style.Rv (a);
  var c = a.style, d = c.display, e = c.visibility, f = c.position;
  c.visibility = 'hidden';
  c.position = 'absolute';
  c.display = 'inline';
  var g = a.offsetWidth;
  a = a.offsetHeight;
  c.display = d;
  c.position = f;
  c.visibility = e;
  return new h.g.hf (g, a);
};
h.g.style.Rv = function (a) {
  return new h.g.hf (a.offsetWidth, a.offsetHeight);
};
h.g.style.Tv = function (a, c) {
  return (
    h.g.style.getComputedStyle (a, c) ||
    h.g.style.BB (a, c) ||
    (a.style && a.style[c])
  );
};
h.g.style.getComputedStyle = function (a, c) {
  return document.defaultView &&
    document.defaultView.getComputedStyle &&
    (a = document.defaultView.getComputedStyle (a, null))
    ? a[c] || a.getPropertyValue (c) || ''
    : '';
};
h.g.style.BB = function (a, c) {
  return a.currentStyle ? a.currentStyle[c] : null;
};
h.g.style.oh = function (a) {
  var c = new h.g.O (0, 0);
  a = a.getBoundingClientRect ();
  var d = document.documentElement;
  d = new h.g.O (
    window.pageXOffset || d.scrollLeft,
    window.pageYOffset || d.scrollTop
  );
  c.x = a.left + d.x;
  c.y = a.top + d.y;
  return c;
};
h.g.style.RB = function () {
  var a = document.body, c = document.documentElement;
  return new h.g.O (a.scrollLeft || c.scrollLeft, a.scrollTop || c.scrollTop);
};
h.g.style.PH = function (a, c) {
  a.style.display = c ? '' : 'none';
};
h.g.style.uH = function (a) {
  return 'rtl' == h.g.style.Tv (a, 'direction');
};
h.g.style.yB = function (a) {
  var c = h.g.style.getComputedStyle (a, 'borderLeftWidth'),
    d = h.g.style.getComputedStyle (a, 'borderRightWidth'),
    e = h.g.style.getComputedStyle (a, 'borderTopWidth');
  a = h.g.style.getComputedStyle (a, 'borderBottomWidth');
  return {
    top: parseFloat (e),
    right: parseFloat (d),
    bottom: parseFloat (a),
    left: parseFloat (c),
  };
};
h.g.style.jx = function (a, c) {
  a = h.g.style.DB (a, c);
  c.scrollLeft = a.x;
  c.scrollTop = a.y;
};
h.g.style.DB = function (a, c) {
  var d = h.g.style.oh (a),
    e = h.g.style.oh (c),
    f = h.g.style.yB (c),
    g = d.x - e.x - f.left;
  d = d.y - e.y - f.top;
  a = h.g.style.Rv (a);
  e = c.clientHeight - a.height;
  f = c.scrollLeft;
  var k = c.scrollTop;
  f += Math.min (g, Math.max (g - (c.clientWidth - a.width), 0));
  k += Math.min (d, Math.max (d - e, 0));
  return new h.g.O (f, k);
};
h.g.userAgent = {};
(function (a) {
  function c (e) {
    return -1 != d.indexOf (e.toUpperCase ());
  }
  h.g.userAgent.raw = a;
  var d = h.g.userAgent.raw.toUpperCase ();
  h.g.userAgent.te = c ('Trident') || c ('MSIE');
  h.g.userAgent.Pg = c ('Edge');
  h.g.userAgent.iz = c ('JavaFX');
  h.g.userAgent.YD = (c ('Chrome') || c ('CriOS')) && !h.g.userAgent.Pg;
  h.g.userAgent.wu = c ('WebKit') && !h.g.userAgent.Pg;
  h.g.userAgent.Vy =
    c ('Gecko') && !h.g.userAgent.wu && !h.g.userAgent.te && !h.g.userAgent.Pg;
  h.g.userAgent.Pl = c ('Android');
  h.g.userAgent.Qj = c ('iPad');
  h.g.userAgent.rt = c ('iPod');
  h.g.userAgent.qt = c ('iPhone') && !h.g.userAgent.Qj && !h.g.userAgent.rt;
  h.g.userAgent.oz = c ('Macintosh');
  h.g.userAgent.Sz =
    h.g.userAgent.Qj || (h.g.userAgent.Pl && !c ('Mobile')) || c ('Silk');
  h.g.userAgent.eF =
    !h.g.userAgent.Sz &&
    (h.g.userAgent.rt ||
      h.g.userAgent.qt ||
      h.g.userAgent.Pl ||
      c ('IEMobile'));
}) ((h.g.global.navigator && h.g.global.navigator.userAgent) || '');
h.g.MC = function (a) {
  a.preventDefault ();
  a.stopPropagation ();
};
h.g.un = function (a) {
  return (
    'textarea' == a.target.type ||
    'text' == a.target.type ||
    'number' == a.target.type ||
    'email' == a.target.type ||
    'password' == a.target.type ||
    'search' == a.target.type ||
    'tel' == a.target.type ||
    'url' == a.target.type ||
    a.target.isContentEditable
  );
};
h.g.ee = function (a) {
  var c = new h.g.O (0, 0), d = a.getAttribute ('x');
  d && (c.x = parseInt (d, 10));
  if ((d = a.getAttribute ('y'))) c.y = parseInt (d, 10);
  if ((d = (d = a.getAttribute ('transform')) && d.match (h.g.ee.aA)))
    (c.x += Number (d[1])), d[3] && (c.y += Number (d[3]));
  (a = a.getAttribute ('style')) &&
    -1 < a.indexOf ('translate') &&
    (a = a.match (h.g.ee.bA)) &&
    ((c.x += Number (a[1])), a[3] && (c.y += Number (a[3])));
  return c;
};
h.g.Jk = function (a) {
  for (var c = 0, d = 0; a; ) {
    var e = h.g.ee (a);
    c += e.x;
    d += e.y;
    if (
      -1 !=
      (' ' + (a.getAttribute ('class') || '') + ' ').indexOf (' injectionDiv ')
    )
      break;
    a = a.parentNode;
  }
  return new h.g.O (c, d);
};
h.g.ee.aA = /translate\(\s*([-+\d.e]+)([ ,]\s*([-+\d.e]+)\s*)?/;
h.g.ee.bA = /transform:\s*translate(?:3d)?\(\s*([-+\d.e]+)\s*px([ ,]\s*([-+\d.e]+)\s*px)?/;
h.g.Vk = function (a) {
  return a.ctrlKey && h.g.userAgent.oz ? !0 : 2 == a.button;
};
h.g.bl = function (a, c, d) {
  var e = c.createSVGPoint ();
  e.x = a.clientX;
  e.y = a.clientY;
  d || (d = c.getScreenCTM ().inverse ());
  return e.matrixTransform (d);
};
h.g.Qv = function (a) {
  switch (a.deltaMode) {
    default:
      return {x: a.deltaX, y: a.deltaY};
    case 1:
      return {x: a.deltaX * h.ut, y: a.deltaY * h.ut};
    case 2:
      return {x: a.deltaX * h.Rt, y: a.deltaY * h.Rt};
  }
};
h.g.FD = function (a) {
  return h.g.ns (a, !0);
};
h.g.Sc = function (a) {
  if ('string' != typeof a) return a;
  a = h.g.ns (a, !1);
  return a.length ? String (a[0]) : '';
};
h.g.Qu = function (a) {
  for (var c = h.J, d = a.match (/%{BKY_[A-Z]\w*}/gi), e = 0; e < d.length; e++)
    void 0 == c[d[e].toUpperCase ().slice (6, -1)] &&
      console.log ('WARNING: No message string for ' + d[e] + ' in ' + a);
};
h.g.ns = function (a, c) {
  var d = [], e = a.split ('');
  e.push ('');
  var f = 0;
  a = [];
  for (var g = null, k = 0; k < e.length; k++) {
    var l = e[k];
    0 == f
      ? '%' == l
          ? ((l = a.join ('')) && d.push (l), (a.length = 0), (f = 1))
          : a.push (l)
      : 1 == f
          ? '%' == l
              ? (a.push (l), (f = 0))
              : c && '0' <= l && '9' >= l
                  ? ((f = 2), (g = l), (l = a.join ('')) &&
                      d.push (l), (a.length = 0))
                  : '{' == l ? (f = 3) : (a.push ('%', l), (f = 0))
          : 2 == f
              ? '0' <= l && '9' >= l
                  ? (g += l)
                  : (d.push (parseInt (g, 10)), k--, (f = 0))
              : 3 == f &&
                  ('' == l
                    ? (a.splice (0, 0, '%{'), k--, (f = 0))
                    : '}' != l
                        ? a.push (l)
                        : ((f = a.join ('')), /[A-Z]\w*/i.test (f)
                            ? ((l = f.toUpperCase ()), (l = h.g.Ja.startsWith (
                                l,
                                'BKY_'
                              )
                                ? l.substring (4)
                                : null) && l in h.J
                                ? ((f = h.J[l]), 'string' == typeof f
                                    ? Array.prototype.push.apply (
                                        d,
                                        h.g.ns (f, c)
                                      )
                                    : c ? d.push (String (f)) : d.push (f))
                                : d.push ('%{' + f + '}'))
                            : d.push ('%{' + f + '}'), (f = a.length = 0)));
  }
  (l = a.join ('')) && d.push (l);
  c = [];
  for (k = a.length = 0; k < d.length; ++k)
    'string' == typeof d[k]
      ? a.push (d[k])
      : ((l = a.join ('')) && c.push (l), (a.length = 0), c.push (d[k]));
  (l = a.join ('')) && c.push (l);
  a.length = 0;
  return c;
};
h.g.wf = function () {
  for (var a = h.g.wf.px.length, c = [], d = 0; 20 > d; d++)
    c[d] = h.g.wf.px.charAt (Math.random () * a);
  return c.join ('');
};
h.g.wf.px =
  '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
h.g.vh = function () {
  if (void 0 !== h.g.vh.up) return h.g.vh.up;
  if (!h.g.global.getComputedStyle) return !1;
  var a = document.createElement ('p'),
    c = 'none',
    d = {
      webkitTransform: '-webkit-transform',
      OTransform: '-o-transform',
      msTransform: '-ms-transform',
      MozTransform: '-moz-transform',
      transform: 'transform',
    };
  document.body.insertBefore (a, null);
  for (var e in d)
    if (void 0 !== a.style[e]) {
      a.style[e] = 'translate3d(1px,1px,1px)';
      c = h.g.global.getComputedStyle (a);
      if (!c) return document.body.removeChild (a), !1;
      c = c.getPropertyValue (d[e]);
    }
  document.body.removeChild (a);
  h.g.vh.up = 'none' !== c;
  return h.g.vh.up;
};
h.g.ix = function (a) {
  if ('object' != typeof document)
    throw Error ('Blockly.utils.runAfterPageLoad() requires browser document.');
  if ('complete' == document.readyState) a ();
  else
    var c = setInterval (function () {
      'complete' == document.readyState && (clearInterval (c), a ());
    }, 10);
};
h.g.QB = function () {
  var a = h.g.style.RB ();
  return {
    right: document.documentElement.clientWidth + a.x,
    bottom: document.documentElement.clientHeight + a.y,
    top: a.y,
    left: a.x,
  };
};
h.g.Cm = function (a, c) {
  c = a.indexOf (c);
  if (-1 == c) return !1;
  a.splice (c, 1);
  return !0;
};
h.g.IB = function () {
  var a = document.documentElement, c = window;
  return h.g.userAgent.te && c.pageYOffset != a.scrollTop
    ? new h.g.O (a.scrollLeft, a.scrollTop)
    : new h.g.O (c.pageXOffset || a.scrollLeft, c.pageYOffset || a.scrollTop);
};
h.g.jq = function (a, c) {
  var d = Object.create (null), e = p (a, !0);
  c && (a = u (a)) && ((a = e.indexOf (a)), e.splice (a, e.length - a));
  for (a = 0; (c = e[a]); a++)
    d[c.type] ? d[c.type]++ : (d[c.type] = 1);
  return d;
};
h.g.kD = function (a, c) {
  var d = c.x;
  c = c.y;
  var e = aa (a).getBoundingClientRect ();
  d = new h.g.O (d - e.left, c - e.top);
  c = h.g.Jk (a.ob);
  return h.g.O.Ak (d, c).scale (1 / a.scale);
};
h.g.On = function (a) {
  var c = 'string' == typeof a ? h.g.Sc (a) : a, d = Number (c);
  if (!isNaN (d) && 0 <= d && 360 >= d) return {bC: d, Mk: h.g.kb.hw (d)};
  if ((d = h.g.kb.parse (c))) return {bC: null, Mk: d};
  d = 'Invalid colour: "' + c + '"';
  a != c && (d += ' (from "' + a + '")');
  throw Error (d);
};
h.h = {};
h.h.Xv = '';
h.h.ac = !0;
h.h.Mp = 0;
h.h.$l = 'create';
h.h.mo = h.h.$l;
h.h.Kj = 'delete';
h.h.Js = h.h.Kj;
h.h.Jj = 'change';
h.h.gy = h.h.Jj;
h.h.Uj = 'move';
h.h.Ks = h.h.Uj;
h.h.pu = 'var_create';
h.h.qu = 'var_delete';
h.h.tu = 'var_rename';
h.h.ck = 'ui';
h.h.Yl = 'comment_create';
h.h.Ps = 'comment_delete';
h.h.Os = 'comment_change';
h.h.Zl = 'comment_move';
h.h.et = 'finished_loading';
h.h.ky = [h.h.mo, h.h.Ks, h.h.Yl, h.h.Zl];
h.h.Oj = [];
h.h.Ia = function (a) {
  h.h.isEnabled () &&
    (h.h.Oj.length || setTimeout (h.h.rB, 0), h.h.Oj.push (a));
};
h.h.rB = function () {
  for (
    var a = h.h.filter (h.h.Oj, !0), c = (h.h.Oj.length = 0), d;
    (d = a[c]);
    c++
  )
    if (d.wb) {
      var e = h.hb.Hk (d.wb);
      if (e) {
        var f = d;
        if (f.ac)
          for (
            e.Yh.push (f), (e.ll.length = 0);
            e.Yh.length > e.xt && 0 <= e.xt;

          )
            e.Yh.shift ();
        for (var g = 0; (d = e.Gc[g]); g++)
          d (f);
      }
    }
};
h.h.filter = function (a, c) {
  a = a.slice ();
  c || a.reverse ();
  for (var d = [], e = Object.create (null), f = 0, g; (g = a[f]); f++)
    if (!g.ij ()) {
      var k = [g.type, g.Yb, g.wb].join (' '), l = e[k], m = l ? l.event : null;
      if (!l) (e[k] = {event: g, index: f}), d.push (g);
      else if (g.type == h.h.Uj && l.index == f - 1)
        (m.Jh = g.Jh), (m.Ih = g.Ih), (m.vg = g.vg), (l.index = f);
      else if (g.type == h.h.Jj && g.element == m.element && g.name == m.name)
        m.newValue = g.newValue;
      else if (
        g.type != h.h.ck ||
        'click' != g.element ||
        ('commentOpen' != m.element &&
          'mutatorOpen' != m.element &&
          'warningOpen' != m.element)
      )
        (e[k] = {
          event: g,
          index: 1,
        }), d.push (g);
    }
  a = d.filter (function (n) {
    return !n.ij ();
  });
  c || a.reverse ();
  for (f = 1; (g = a[f]); f++)
    g.type == h.h.Jj &&
      'mutation' == g.element &&
      a.unshift (a.splice (f, 1)[0]);
  return a;
};
h.h.IA = function () {
  for (var a = 0, c; (c = h.h.Oj[a]); a++)
    c.ac = !1;
};
h.h.disable = function () {
  h.h.Mp++;
};
h.h.enable = function () {
  h.h.Mp--;
};
h.h.isEnabled = function () {
  return 0 == h.h.Mp;
};
h.h.Kb = function () {
  return h.h.Xv;
};
h.h.ka = function (a) {
  h.h.Xv = 'boolean' == typeof a ? (a ? h.g.wf () : '') : a;
};
h.h.Iv = function (a) {
  var c = [];
  a = p (a, !1);
  for (var d = 0, e; (e = a[d]); d++)
    c[d] = e.id;
  return c;
};
h.h.oa = function (a) {
  switch (a.type) {
    case h.h.$l:
      var c = new h.h.Md (null);
      break;
    case h.h.Kj:
      c = new h.h.re (null);
      break;
    case h.h.Jj:
      c = new h.h.Of (null, '', '', '', '');
      break;
    case h.h.Uj:
      c = new h.h.Tg (null);
      break;
    case h.h.pu:
      c = new h.h.sd (null);
      break;
    case h.h.qu:
      c = new h.h.Sd (null);
      break;
    case h.h.tu:
      c = new h.h.ze (null, '');
      break;
    case h.h.ck:
      c = new h.h.jc (null, '', '', '');
      break;
    case h.h.Yl:
      c = new h.h.$e (null);
      break;
    case h.h.Os:
      c = new h.h.ei (null, '', '');
      break;
    case h.h.Zl:
      c = new h.h.Og (null);
      break;
    case h.h.Ps:
      c = new h.h.af (null);
      break;
    case h.h.et:
      c = new h.h.ji (void 0);
      break;
    default:
      throw Error ('Unknown event type.');
  }
  c.oa (a);
  c.wb = (void 0).id;
  return c;
};
h.h.aH = function (a) {
  if ((a.type == h.h.Uj || a.type == h.h.$l) && a.wb) {
    var c = h.hb.Hk (a.wb);
    if ((a = c.Cc (a.Yb))) {
      var d = a.getParent ();
      if (d && d.isEnabled ())
        for ((c = p (a, !1)), (a = 0); (d = c[a]); a++)
          d.Se (!0);
      else if ((a.K || a.P) && !c.Oc ()) {
        do
          a.Se (!1), (a = u (a));
        while (a);
      }
    }
  }
};
h.h.Abstract = function () {
  this.wb = void 0;
  this.group = h.h.Kb ();
  this.ac = h.h.ac;
};
h.h.Abstract.prototype.La = function () {
  var a = {type: this.type};
  this.group && (a.group = this.group);
  return a;
};
h.h.Abstract.prototype.oa = function (a) {
  this.group = a.group;
};
h.h.Abstract.prototype.ij = function () {
  return !1;
};
h.h.Abstract.prototype.run = function () {};
function w (a) {
  if (a.wb) var c = h.hb.Hk (a.wb);
  if (!c)
    throw Error (
      'Workspace is null. Event must have been generated from real Blockly events.'
    );
  return c;
}
h.g.object = {};
h.g.object.S = function (a, c) {
  a.v = c.prototype;
  a.prototype = Object.create (c.prototype);
  a.prototype.constructor = a;
};
h.g.object.Ff = function (a, c) {
  for (var d in c)
    a[d] = c[d];
};
h.g.object.Pi = function (a, c) {
  for (var d in c)
    a[d] = 'object' === typeof c[d]
      ? h.g.object.Pi (a[d] || Object.create (null), c[d])
      : c[d];
  return a;
};
h.g.object.values = function (a) {
  return Object.values
    ? Object.values (a)
    : Object.keys (a).map (function (c) {
        return a[c];
      });
};
h.g.xml = {};
h.g.xml.zz = 'https://developers.google.com/blockly/xml';
h.g.xml.document = function () {
  return document;
};
h.g.xml.createElement = function (a) {
  return h.g.xml.document ().createElementNS (h.g.xml.zz, a);
};
h.g.xml.createTextNode = function (a) {
  return h.g.xml.document ().createTextNode (a);
};
h.g.xml.CD = function (a) {
  return new DOMParser ().parseFromString (a, 'text/xml');
};
h.g.xml.Zd = function (a) {
  return new XMLSerializer ().serializeToString (a);
};
h.h.pe = function (a) {
  h.h.pe.v.constructor.call (this);
  this.Yb = a.id;
  this.wb = a.B.id;
};
h.g.object.S (h.h.pe, h.h.Abstract);
h.h.pe.prototype.La = function () {
  var a = h.h.pe.v.La.call (this);
  a.blockId = this.Yb;
  return a;
};
h.h.pe.prototype.oa = function (a) {
  h.h.pe.v.oa.call (this, a);
  this.Yb = a.blockId;
};
h.h.Of = function (a, c, d, e, f) {
  a &&
    (h.h.Of.v.constructor.call (
      this,
      a
    ), (this.element = c), (this.name = d), (this.oldValue = e), (this.newValue = f));
};
h.g.object.S (h.h.Of, h.h.pe);
h.h.di = h.h.Of;
b = h.h.Of.prototype;
b.type = h.h.Jj;
b.La = function () {
  var a = h.h.Of.v.La.call (this);
  a.element = this.element;
  this.name && (a.name = this.name);
  a.newValue = this.newValue;
  return a;
};
b.oa = function (a) {
  h.h.Of.v.oa.call (this, a);
  this.element = a.element;
  this.name = a.name;
  this.newValue = a.newValue;
};
b.ij = function () {
  return this.oldValue == this.newValue;
};
b.run = function (a) {
  var c = w (this).Cc (this.Yb);
  if (c)
    switch ((c.ge && c.ge.cc (!1), (a = a ? this.newValue : this.oldValue), this
      .element)) {
      case 'field':
        (c = ba (c, this.name))
          ? c.setValue (a)
          : console.warn ("Can't set non-existent field: " + this.name);
        break;
      case 'comment':
        c.uj (a || null);
        break;
      case 'collapsed':
        c.Eg (!!a);
        break;
      case 'disabled':
        c.Se (!a);
        break;
      case 'inline':
        c.Qh (!!a);
        break;
      case 'mutation':
        var d = '';
        c.Ed && (d = (d = c.Ed ()) && h.M.Zd (d));
        if (c.tf) {
          var e = h.M.Hg (a || '<mutation/>');
          c.tf (e);
        }
        h.h.Ia (new h.h.Of (c, 'mutation', null, d, a));
        break;
      default:
        console.warn ('Unknown change type: ' + this.element);
    }
  else console.warn ("Can't change non-existent block: " + this.Yb);
};
h.h.Md = function (a) {
  a &&
    (h.h.Md.v.constructor.call (this, a), (this.xml = a.B.ca
      ? h.M.pp (a)
      : h.M.Xf (a)), (this.uh = h.h.Iv (a)));
};
h.g.object.S (h.h.Md, h.h.pe);
h.h.Vl = h.h.Md;
h.h.Md.prototype.type = h.h.$l;
h.h.Md.prototype.La = function () {
  var a = h.h.Md.v.La.call (this);
  a.xml = h.M.Zd (this.xml);
  a.ids = this.uh;
  return a;
};
h.h.Md.prototype.oa = function (a) {
  h.h.Md.v.oa.call (this, a);
  this.xml = h.M.Hg (a.xml);
  this.uh = a.ids;
};
h.h.Md.prototype.run = function (a) {
  var c = w (this);
  if (a)
    (a = h.g.xml.createElement ('xml')), a.appendChild (this.xml), h.M.ih (
      a,
      c
    );
  else {
    a = 0;
    for (var d; (d = this.uh[a]); a++) {
      var e = c.Cc (d);
      e
        ? e.F (!1)
        : d == this.Yb &&
            console.warn ("Can't uncreate non-existent block: " + d);
    }
  }
};
h.h.re = function (a) {
  if (a) {
    if (a.getParent ()) throw Error ('Connected blocks cannot be deleted.');
    h.h.re.v.constructor.call (this, a);
    this.nr = a.B.ca ? h.M.pp (a) : h.M.Xf (a);
    this.uh = h.h.Iv (a);
  }
};
h.g.object.S (h.h.re, h.h.pe);
h.h.ly = h.h.re;
h.h.re.prototype.type = h.h.Kj;
h.h.re.prototype.La = function () {
  var a = h.h.re.v.La.call (this);
  a.ids = this.uh;
  return a;
};
h.h.re.prototype.oa = function (a) {
  h.h.re.v.oa.call (this, a);
  this.uh = a.ids;
};
h.h.re.prototype.run = function (a) {
  var c = w (this);
  if (a) {
    a = 0;
    for (var d; (d = this.uh[a]); a++) {
      var e = c.Cc (d);
      e
        ? e.F (!1)
        : d == this.Yb &&
            console.warn ("Can't delete non-existent block: " + d);
    }
  } else
    (a = h.g.xml.createElement ('xml')), a.appendChild (this.nr), h.M.ih (a, c);
};
h.h.Tg = function (a) {
  a &&
    (h.h.Tg.v.constructor.call (this, a), (a = ca (this)), (this.Iw =
      a.Ow), (this.Hw = a.iw), (this.kr = a.dv));
};
h.g.object.S (h.h.Tg, h.h.pe);
h.h.Ij = h.h.Tg;
b = h.h.Tg.prototype;
b.type = h.h.Uj;
b.La = function () {
  var a = h.h.Tg.v.La.call (this);
  this.Jh && (a.newParentId = this.Jh);
  this.Ih && (a.newInputName = this.Ih);
  this.vg &&
    (a.newCoordinate = Math.round (this.vg.x) + ',' + Math.round (this.vg.y));
  return a;
};
b.oa = function (a) {
  h.h.Tg.v.oa.call (this, a);
  this.Jh = a.newParentId;
  this.Ih = a.newInputName;
  a.newCoordinate &&
    ((a = a.newCoordinate.split (',')), (this.vg = new h.g.O (
      Number (a[0]),
      Number (a[1])
    )));
};
b.Mh = function () {
  var a = ca (this);
  this.Jh = a.Ow;
  this.Ih = a.iw;
  this.vg = a.dv;
};
function ca (a) {
  var c = w (a).Cc (a.Yb);
  a = {};
  var d = c.getParent ();
  if (d) {
    a.Ow = d.id;
    a: {
      for (var e = 0, f; (f = d.N[e]); e++)
        if (f.connection && f.connection.la () == c) {
          c = f;
          break a;
        }
      c = null;
    }
    c && (a.iw = c.name);
  } else a.dv = c.Ma ();
  return a;
}
b.ij = function () {
  return (
    this.Iw == this.Jh && this.Hw == this.Ih && h.g.O.vf (this.kr, this.vg)
  );
};
b.run = function (a) {
  var c = w (this), d = c.Cc (this.Yb);
  if (d) {
    var e = a ? this.Jh : this.Iw, f = a ? this.Ih : this.Hw;
    a = a ? this.vg : this.kr;
    var g = null;
    if (e && ((g = c.Cc (e)), !g)) {
      console.warn ("Can't connect to non-existent block: " + e);
      return;
    }
    d.getParent () && x (d);
    if (a) (f = d.Ma ()), d.moveBy (a.x - f.x, a.y - f.y);
    else {
      d = d.K || d.P;
      if (f) {
        if ((c = da (g, f))) var k = c.connection;
      } else d.type == h.Pd && (k = g.U);
      k
        ? d.connect (k)
        : console.warn ("Can't connect to non-existent input: " + f);
    }
  } else console.warn ("Can't move non-existent block: " + this.Yb);
};
h.w = function (a, c, d) {
  if (!c) throw Error ('Cannot create a node without a location.');
  this.Il = a;
  this.fj = h.w.jC (a);
  this.ea = c;
  (a = d || null) && a.Lx && (this.ys = a.Lx);
};
h.w.types = {
  Wc: 'field',
  Vc: 'block',
  ue: 'input',
  Ug: 'output',
  pd: 'next',
  rd: 'previous',
  we: 'stack',
  Ae: 'workspace',
};
h.w.Wj = !1;
h.w.By = -20;
h.w.jC = function (a) {
  switch (a) {
    case h.w.types.rd:
    case h.w.types.pd:
    case h.w.types.ue:
    case h.w.types.Ug:
      return !0;
  }
  return !1;
};
h.w.tk = function (a) {
  return a ? new h.w (h.w.types.Wc, a) : null;
};
h.w.Je = function (a) {
  return a
    ? a.type == h.Ya || (a.type == h.Ka && a.Le ())
        ? h.w.fh (a.Le ())
        : a.type == h.Ka
            ? new h.w (h.w.types.pd, a)
            : a.type == h.Od
                ? new h.w (h.w.types.Ug, a)
                : a.type == h.Pd ? new h.w (h.w.types.rd, a) : null
    : null;
};
h.w.fh = function (a) {
  return a && a.connection ? new h.w (h.w.types.ue, a.connection) : null;
};
h.w.rf = function (a) {
  return a ? new h.w (h.w.types.Vc, a) : null;
};
h.w.wk = function (a) {
  return a ? new h.w (h.w.types.we, a) : null;
};
h.w.Ni = function (a, c) {
  return c && a ? new h.w (h.w.types.Ae, a, {Lx: c}) : null;
};
b = h.w.prototype;
b.ab = function () {
  return this.Il;
};
function ea (a, c) {
  a = a.ea;
  a instanceof h.Ul || (a = a.R ());
  if (!a || !a.B) return null;
  var d = a.Dc ();
  a = d.B.pb (!0);
  for (var e = 0, f; (f = a[e]); e++)
    if (d.id == f.id)
      return (c = e + (c ? 1 : -1)), -1 == c || c == a.length
        ? null
        : h.w.wk (a[c]);
  throw Error ("Couldn't find " + (c ? 'next' : 'previous') + ' stack?!');
}
function fa (a) {
  if (!a) return null;
  do
    var c = a.P && a.P.la ();
  while (c && u (c) == a && (a = c));
  return (c = a.P || a.K) && c.na && c.na.Le ()
    ? h.w.fh (c.na.Le ())
    : h.w.wk (a);
}
b.R = function () {
  return this.ab () === h.w.types.Vc
    ? this.ea
    : this.ab () === h.w.types.we
        ? this.ea
        : this.ab () === h.w.types.Ae ? null : this.ea.R ();
};
b.next = function () {
  switch (this.Il) {
    case h.w.types.we:
      return ea (this, !0);
    case h.w.types.Ug:
      return h.w.rf (this.ea.R ());
    case h.w.types.Wc:
      a: {
        var a = this.ea, c = a.Le ();
        var d = a.R ();
        a = c.Sa.indexOf (a) + 1;
        c = d.N.indexOf (c);
        for (var e; (e = d.N[c]); c++) {
          for (var f = e.Sa; a < f.length; ) {
            if (ha (f[a]) || h.w.Wj) {
              d = h.w.tk (f[a]);
              break a;
            }
            a++;
          }
          a = 0;
          if (e.connection) {
            d = h.w.fh (e);
            break a;
          }
        }
        d = null;
      }
      return d;
    case h.w.types.ue:
      a: {
        a = this.ea.Le ();
        d = a.R ();
        for (a = d.N.indexOf (a) + 1; (c = d.N[a]); a++) {
          e = c.Sa;
          f = 0;
          for (var g; (g = e[f]); f++)
            if (ha (g) || h.w.Wj) {
              d = h.w.tk (g);
              break a;
            }
          if (c.connection) {
            d = h.w.fh (c);
            break a;
          }
        }
        d = null;
      }
      return d;
    case h.w.types.Vc:
      return h.w.Je (this.ea.U);
    case h.w.types.rd:
      return h.w.rf (this.ea.R ());
    case h.w.types.pd:
      return h.w.Je (this.ea.na);
  }
  return null;
};
b.jg = function () {
  switch (this.Il) {
    case h.w.types.Ae:
      var a = this.ea.pb (!0);
      if (0 < a.length) return h.w.wk (a[0]);
      break;
    case h.w.types.we:
      a = this.ea;
      var c = a.P || a.K;
      return c ? h.w.Je (c) : h.w.rf (a);
    case h.w.types.Vc:
      a = this.ea;
      a: {
        a = a.N;
        c = 0;
        for (var d; (d = a[c]); c++) {
          for (var e = d.Sa, f = 0, g; (g = e[f]); f++)
            if (ha (g) || h.w.Wj) {
              a = h.w.tk (g);
              break a;
            }
          if (d.connection) {
            a = h.w.fh (d);
            break a;
          }
        }
        a = null;
      }
      return a;
    case h.w.types.ue:
      return h.w.Je (this.ea.na);
  }
  return null;
};
b.Id = function () {
  switch (this.Il) {
    case h.w.types.we:
      return ea (this, !1);
    case h.w.types.Wc:
      a: {
        var a = this.ea;
        var c = a.Le ();
        var d = a.R ();
        a = c.Sa.indexOf (a) - 1;
        for (var e = d.N.indexOf (c), f; (f = d.N[e]); e--) {
          if (f.connection && f !== c) {
            c = h.w.fh (f);
            break a;
          }
          for (f = f.Sa; -1 < a; ) {
            if (ha (f[a]) || h.w.Wj) {
              c = h.w.tk (f[a]);
              break a;
            }
            a--;
          }
          0 <= e - 1 && (a = d.N[e - 1].Sa.length - 1);
        }
        c = null;
      }
      return c;
    case h.w.types.ue:
      a: {
        c = this.ea.Le ();
        d = c.R ();
        for (a = d.N.indexOf (c); (e = d.N[a]); a--) {
          if (e.connection && e !== c) {
            c = h.w.fh (e);
            break a;
          }
          e = e.Sa;
          f = e.length - 1;
          for (var g; (g = e[f]); f--)
            if (ha (g) || h.w.Wj) {
              c = h.w.tk (g);
              break a;
            }
        }
        c = null;
      }
      return c;
    case h.w.types.Vc:
      return (c = this.ea), h.w.Je (c.P || c.K);
    case h.w.types.rd:
      if ((c = this.ea.na) && !c.Le ()) return h.w.Je (c);
      break;
    case h.w.types.pd:
      return h.w.rf (this.ea.R ());
  }
  return null;
};
b.zg = function () {
  switch (this.Il) {
    case h.w.types.we:
      var a = this.ea.Ma ();
      return h.w.Ni (this.ea.B, new h.g.O (a.x, a.y + h.w.By));
    case h.w.types.Ug:
      return (a = this.ea.na) ? h.w.Je (a) : h.w.wk (this.ea.R ());
    case h.w.types.Wc:
      return h.w.rf (this.ea.R ());
    case h.w.types.ue:
      return h.w.rf (this.ea.R ());
    case h.w.types.Vc:
      return fa (this.ea);
    case h.w.types.rd:
      return fa (this.ea.R ());
    case h.w.types.pd:
      return fa (this.ea.R ());
  }
  return null;
};
h.g.j = {};
h.g.j.wm = 'http://www.w3.org/2000/svg';
h.g.j.xo = 'http://www.w3.org/1999/xhtml';
h.g.j.Xc = 'http://www.w3.org/1999/xlink';
h.g.j.Node = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_POSITION_CONTAINED_BY: 16,
};
h.g.j.Ud = null;
h.g.j.sp = 0;
h.g.j.Em = null;
h.g.j.H = function (a, c, d) {
  a = document.createElementNS (h.g.j.wm, a);
  for (var e in c)
    a.setAttribute (e, c[e]);
  document.body.runtimeStyle && (a.runtimeStyle = a.currentStyle = a.style);
  d && d.appendChild (a);
  return a;
};
h.g.j.xb = function (a, c) {
  var d = a.getAttribute ('class') || '';
  -1 == (' ' + d + ' ').indexOf (' ' + c + ' ') &&
    (d && (d += ' '), a.setAttribute ('class', d + c));
};
h.g.j.Rc = function (a, c) {
  var d = a.getAttribute ('class');
  if (-1 != (' ' + d + ' ').indexOf (' ' + c + ' ')) {
    d = d.split (/\s+/);
    for (var e = 0; e < d.length; e++)
      (d[e] && d[e] != c) || (d.splice (e, 1), e--);
    d.length
      ? a.setAttribute ('class', d.join (' '))
      : a.removeAttribute ('class');
  }
};
h.g.j.$v = function (a, c) {
  return -1 != (' ' + a.getAttribute ('class') + ' ').indexOf (' ' + c + ' ');
};
h.g.j.removeNode = function (a) {
  return a && a.parentNode ? a.parentNode.removeChild (a) : null;
};
h.g.j.dj = function (a, c) {
  var d = c.nextSibling;
  c = c.parentNode;
  if (!c) throw Error ('Reference node has no parent.');
  d ? c.insertBefore (a, d) : c.appendChild (a);
};
h.g.j.containsNode = function (a, c) {
  return !!(a.compareDocumentPosition (c) &
    h.g.j.Node.DOCUMENT_POSITION_CONTAINED_BY);
};
h.g.j.ol = function (a, c) {
  a.style.transform = c;
  a.style['-webkit-transform'] = c;
};
h.g.j.yl = function () {
  h.g.j.sp++;
  h.g.j.Ud || (h.g.j.Ud = {});
};
h.g.j.zl = function () {
  h.g.j.sp--;
  h.g.j.sp || (h.g.j.Ud = null);
};
h.g.j.oH = function (a) {
  var c = a.textContent + '\n' + a.className.baseVal, d;
  if (h.g.j.Ud && (d = h.g.j.Ud[c])) return d;
  try {
    d = h.g.userAgent.te || h.g.userAgent.Pg
      ? a.getBBox ().width
      : a.getComputedTextLength ();
  } catch (e) {
    return 8 * a.textContent.length;
  }
  h.g.j.Ud && (h.g.j.Ud[c] = d);
  return d;
};
h.g.j.mq = function (a, c, d, e) {
  return h.g.j.JB (a, c + 'pt', d, e);
};
h.g.j.JB = function (a, c, d, e) {
  var f = a.textContent;
  a = f + '\n' + a.className.baseVal;
  var g;
  if (h.g.j.Ud && (g = h.g.j.Ud[a])) return g;
  h.g.j.Em ||
    ((g = document.createElement ('canvas')), (g.className =
      'blocklyComputeCanvas'), document.body.appendChild (
      g
    ), (h.g.j.Em = g.getContext ('2d')));
  h.g.j.Em.font = d + ' ' + c + ' ' + e;
  g = h.g.j.Em.measureText (f).width;
  h.g.j.Ud && (h.g.j.Ud[a] = g);
  return g;
};
h.g.j.wC = function (a, c, d) {
  var e = document.createElement ('span');
  e.style.font = c + ' ' + a + ' ' + d;
  e.textContent = 'Hg';
  a = document.createElement ('div');
  a.style.width = '1px';
  a.style.height = '0px';
  c = document.createElement ('div');
  c.setAttribute ('style', 'position: fixed; top: 0; left: 0; display: flex;');
  c.appendChild (e);
  c.appendChild (a);
  document.body.appendChild (c);
  try {
    (d = {}), (c.style.alignItems = 'baseline'), (d.Td =
      a.offsetTop - e.offsetTop), (c.style.alignItems = 'flex-end'), (d.height =
      a.offsetTop - e.offsetTop);
  } finally {
    document.body.removeChild (c);
  }
  return d;
};
h.Va = {};
h.Va.Op = 0;
h.Va.Rm = null;
h.Va.eB = function (a) {
  var c = a.B, d = a.ma ();
  c.Jc.play ('delete');
  a = ia (c, d);
  d = d.cloneNode (!0);
  d.JD = a.x;
  d.KD = a.y;
  d.setAttribute ('transform', 'translate(' + a.x + ',' + a.y + ')');
  y (c).appendChild (d);
  d.Ku = d.getBBox ();
  h.Va.tv (d, c.G, new Date (), c.scale);
};
h.Va.tv = function (a, c, d, e) {
  var f = (new Date () - d) / 150;
  1 < f
    ? h.g.j.removeNode (a)
    : (a.setAttribute (
        'transform',
        'translate(' +
          (a.JD + (c ? -1 : 1) * a.Ku.width * e / 2 * f) +
          ',' +
          (a.KD + a.Ku.height * e * f) +
          ') scale(' +
          (1 - f) * e +
          ')'
      ), setTimeout (h.Va.tv, 10, a, c, d, e));
};
h.Va.PA = function (a) {
  var c = a.B, d = c.scale;
  c.Jc.play ('click');
  if (!(1 > d)) {
    var e = ia (c, a.ma ());
    a.K
      ? ((e.x += (a.G ? 3 : -3) * d), (e.y += 13 * d))
      : a.P && ((e.x += (a.G ? -23 : 23) * d), (e.y += 3 * d));
    a = h.g.j.H (
      'circle',
      {
        cx: e.x,
        cy: e.y,
        r: 0,
        fill: 'none',
        stroke: '#888',
        'stroke-width': 10,
      },
      y (c)
    );
    h.Va.Zu (a, new Date (), d);
  }
};
h.Va.Zu = function (a, c, d) {
  var e = (new Date () - c) / 150;
  1 < e
    ? h.g.j.removeNode (a)
    : (a.setAttribute ('r', 25 * e * d), (a.style.opacity =
        1 - e), (h.Va.Op = setTimeout (h.Va.Zu, 10, a, c, d)));
};
h.Va.dB = function (a) {
  a.B.Jc.play ('disconnect');
  if (!(1 > a.B.scale)) {
    var c = z (a).height;
    c = Math.atan (10 / c) / Math.PI * 180;
    a.G || (c *= -1);
    h.Va.rv (a.ma (), c, new Date ());
  }
};
h.Va.rv = function (a, c, d) {
  var e = (new Date () - d) / 200;
  1 < e
    ? (a.xl = '')
    : ((a.xl =
        'skewX(' +
        Math.round (Math.sin (e * Math.PI * 3) * (1 - e) * c) +
        ')'), (h.Va.Rm = a), (h.Va.Op = setTimeout (h.Va.rv, 10, a, c, d)));
  a.setAttribute ('transform', a.Gl + a.xl);
};
h.Va.Pp = function () {
  if (h.Va.Rm) {
    clearTimeout (h.Va.Op);
    var a = h.Va.Rm;
    a.xl = '';
    a.setAttribute ('transform', a.Gl);
    h.Va.Rm = null;
  }
};
h.h.jc = function (a, c, d, e) {
  h.h.jc.v.constructor.call (this);
  this.Yb = a ? a.id : null;
  this.wb = a ? a.B.id : void 0;
  this.element = c;
  this.oldValue = d;
  this.newValue = e;
  this.ac = !1;
};
h.g.object.S (h.h.jc, h.h.Abstract);
h.h.jc.prototype.type = h.h.ck;
h.h.jc.prototype.La = function () {
  var a = h.h.jc.v.La.call (this);
  a.element = this.element;
  void 0 !== this.newValue && (a.newValue = this.newValue);
  this.Yb && (a.blockId = this.Yb);
  return a;
};
h.h.jc.prototype.oa = function (a) {
  h.h.jc.v.oa.call (this, a);
  this.element = a.element;
  this.newValue = a.newValue;
  this.Yb = a.blockId;
};
h.Nd = function (a) {
  this.Mf = h.selected = a;
  this.o = a.B;
  this.kj = this.Iq = null;
  this.Fk = ja (this, this.Mf);
  this.oc = this.sb = null;
  this.Ye = !1;
  this.Dk = this.Aq = this.Dh = null;
  a = this.Mf.ce (!1);
  var c = this.Mf.xn ();
  c &&
    c != this.Mf.U &&
    (a.push (c), (this.Iq = c), (this.kj = ja (this, c.R ())));
  this.mp = a;
};
h.Nd.ri = {Do: 0, ez: 1, $t: 2};
h.Nd.prototype.F = function () {
  this.mp.length = 0;
  h.h.disable ();
  try {
    this.Fk && this.Fk.F (), this.kj && this.kj.F ();
  } finally {
    h.h.enable ();
  }
};
h.Nd.prototype.update = function (a, c) {
  var d = this.sb && this.oc ? h.Qs : h.ic;
  for (var e = null, f = null, g = 0; g < this.mp.length; g++) {
    var k = this.mp[g], l = k.closest (d, a);
    l.connection && ((e = l.connection), (f = k), (d = l.Rn));
  }
  e = ((d = {closest: e, local: f, Rn: d}), !!d.closest) && c != h.Us;
  if (
    (this.Ye = !!c && !this.Mf.getParent () && this.Mf.dd () && !e) ||
    la (this, d, a)
  ) {
    h.h.disable ();
    d.closest
      ? ((a = this.sb != d.closest), (c = this.oc != d.local), this.sb &&
          this.oc &&
          (a || c || this.Ye) &&
          ma (this))
      : ma (this);
    this.oc = this.sb = this.Dh = null;
    if (!this.Ye && ((a = d.closest), (c = d.local), a))
      if (a == this.sb || a.R ().og ())
        console.log ('Trying to connect to an insertion marker');
      else {
        this.sb = a;
        this.oc = c;
        a = this.sb;
        d = this.oc;
        c = this.Mf;
        d.type == h.Od || d.type == h.Pd
          ? ((e = !a.isConnected ()) ||
              ((e = a.la ()), d.type == h.Od
                ? ((d = e.K), (c = h.ga.rw (c, e)))
                : ((d = e.P), (c = c.xn ())), (e = c ? na (d, c) : !1)), (c = e
              ? h.Nd.ri.Do
              : h.Nd.ri.$t))
          : (c = h.Nd.ri.Do);
        switch (c) {
          case h.Nd.ri.ez:
            this.Aq = this.sb.R ();
            break;
          case h.Nd.ri.Do:
            e = this.oc;
            c = this.sb;
            d = this.Iq && e == this.Iq ? this.kj : this.Fk;
            e = d.nq (e.R (), e);
            if (e == this.Dh)
              throw Error (
                "Made it to showInsertionMarker_ even though the marker isn't changing"
              );
            d.Ca ();
            d.ca = !0;
            d.ma ().setAttribute ('visibility', 'visible');
            e && c && oa (d, e, c);
            c && e.connect (c);
            this.Dh = e;
            break;
          case h.Nd.ri.$t:
            (this.Dk = this.sb.la ()), A (this.Dk.vb, 'blocklyReplaceable', !0);
        }
        a &&
          ((d = a.I.B.bb.W ()), (c = pa (d, a)), a.type == h.Ya ||
            a.type == h.Od
            ? ((d = d.zi), (c =
                h.g.u.moveBy (0, -d) +
                h.g.u.T ('v', d) +
                c.Hd +
                h.g.u.T ('v', d)))
            : ((d = d.Xj - d.fb), (c =
                h.g.u.moveBy (-d, 0) +
                h.g.u.T ('h', d) +
                c.Ag +
                h.g.u.T ('h', d))), (d = a.I.Ma ()), (h.ga.gw = h.g.j.H (
            'path',
            {
              class: 'blocklyHighlightedConnectionPath',
              d: c,
              transform: 'translate(' +
                (a.x - d.x) +
                ',' +
                (a.y - d.y) +
                ')' +
                (a.I.G ? ' scale(-1 1)' : ''),
            },
            a.I.ma ()
          )));
      }
    h.h.enable ();
  }
};
function ja (a, c) {
  var d = c.type;
  h.h.disable ();
  try {
    var e = a.o.gr (d);
    e.lx (!0);
    if (c.Ed) {
      var f = c.Ed ();
      f && e.tf (f);
    }
    e.Eg (c.isCollapsed ());
    e.Qh (qa (c));
    for (a = 0; a < c.N.length; a++) {
      var g = c.N[a];
      if (g.isVisible ()) {
        var k = e.N[a];
        for (d = 0; d < g.Sa.length; d++)
          k.Sa[d].setValue (g.Sa[d].getValue ());
      }
    }
    e.cj ();
    e.ma ().setAttribute ('visibility', 'hidden');
  } finally {
    h.h.enable ();
  }
  return e;
}
function la (a, c, d) {
  var e = c.local, f = c.closest;
  c = c.Rn;
  if (e && f) {
    if (a.oc && a.sb) {
      if (a.sb == f && a.oc == e) return !1;
      e = a.oc.x + d.x - a.sb.x;
      a = a.oc.y + d.y - a.sb.y;
      a = Math.sqrt (e * e + a * a);
      return !(f && c > a - h.uy);
    }
    if (a.oc || a.sb)
      console.error (
        'Only one of localConnection_ and closestConnection_ was set.'
      );
    else return !0;
  } else return !(!a.oc || !a.sb);
  console.error (
    "Returning true from shouldUpdatePreviews, but it's not clear why."
  );
  return !0;
}
function ma (a) {
  a.sb && a.sb.la () && (h.g.j.removeNode (h.ga.gw), delete h.ga.gw);
  if (a.Dk) A (a.Dk.vb, 'blocklyReplaceable', !1), (a.Dk = null);
  else if (a.Aq) a.Aq = null;
  else if (a.Dh)
    if (a.Dh) {
      var c = a.Dh, d = c.R (), e = d.U, f = d.P, g = d.K;
      g = c.type == h.Ya && !(g && g.na);
      !(c != e || (f && f.na)) || g
        ? x (c.la (), !1)
        : c.type == h.Ka && c != e
            ? ((e = c.na), x (e.R (), !1), (f = f ? f.na : null), x (
                d,
                !0
              ), f && f.connect (e))
            : x (d, !0);
      if (c.na)
        throw Error (
          'markerConnection_ still connected at the end of disconnectInsertionMarker'
        );
      a.Dh = null;
      d.ma ().setAttribute ('visibility', 'hidden');
    } else console.log ('No insertion marker connection to disconnect');
}
h.Nd.prototype.Vi = function () {
  var a = [];
  this.Fk && a.push (this.Fk);
  this.kj && a.push (this.kj);
  return a;
};
h.Mg = function (a, c) {
  this.$a = a;
  this.o = c;
  this.uf = new h.Nd (this.$a);
  this.hh = null;
  this.Ye = !1;
  this.Ve = this.$a.Ma ();
  this.Vm = h.Mg.eC (a);
};
h.Mg.prototype.F = function () {
  this.Vm.length = 0;
  this.uf && this.uf.F ();
};
h.Mg.eC = function (a) {
  var c = [];
  a = p (a, !1);
  for (var d = 0, e; (e = a[d]); d++) {
    e = ra (e);
    for (var f = 0; f < e.length; f++) {
      var g = {location: e[f].jH (), icon: e[f]};
      c.push (g);
    }
  }
  return c;
};
function sa (a, c, d) {
  d = a.oj (d);
  var e = h.g.O.sum (a.Ve, d);
  a.$a.er (e);
  for (e = 0; e < a.Vm.length; e++) {
    var f = a.Vm[e];
    f.icon.QH (h.g.O.sum (f.location, d));
  }
  a.hh = ta (a.o, c);
  a.uf.update (d, a.hh);
  a.Ye = a.uf.Ye;
  c = a.o.fc;
  a.Ye
    ? (ua (a.$a, !0), a.hh == h.to && c && va (c, !0))
    : (ua (a.$a, !1), c && va (c, !1));
}
function wa (a, c, d) {
  sa (a, c, d);
  a.Vm = [];
  c = new h.h.jc (a.$a, 'dragStop', p (a.$a, !1), null);
  h.h.Ia (c);
  h.g.j.zl ();
  h.Va.Pp ();
  d = a.oj (d);
  c = h.g.O.sum (a.Ve, d);
  var e = a.$a;
  e.Ml && (e.translate (c.x, c.y), e.B.Yc.Gm (e.B.ob));
  c = a.o.fc;
  a.Ye
    ? (c && setTimeout (c.close.bind (c), 100), a.Ek (), a.$a.F (
        !1,
        !0
      ), (h.Ti = []))
    : c && c.close ();
  a.Ye ||
    (xa (a.$a, d.x, d.y), a.$a.Fg (!1), a.Ek (), a.uf.sb
      ? ((d = a.uf), d.sb &&
          (h.h.disable (), ma (d), h.h.enable (), d.oc.connect (d.sb), d.Mf
            .ca && (h.Va.PA ((B (d.oc) ? d.sb : d.oc).R ()), ya (d.Mf.Dc ()))))
      : a.$a.Ca (), za (a.$a));
  a.o.Tb (!0);
  (d = a.o.qa) &&
    d.eD (a.$a.dd () ? 'blocklyToolboxDelete' : 'blocklyToolboxGrab');
  h.h.ka (!1);
}
h.Mg.prototype.Ek = function () {
  var a = new h.h.Ij (this.$a);
  a.kr = this.Ve;
  a.Mh ();
  h.h.Ia (a);
};
h.Mg.prototype.oj = function (a) {
  a = new h.g.O (a.x / this.o.scale, a.y / this.o.scale);
  this.o.sn && a.scale (1 / this.o.options.Gd.scale);
  return a;
};
h.Mg.prototype.Vi = function () {
  return this.uf && this.uf.Vi ? this.uf.Vi () : [];
};
h.Touch = {};
h.Touch.mu =
  'ontouchstart' in h.g.global ||
  !!(h.g.global.document &&
    document.documentElement &&
    'ontouchstart' in document.documentElement) ||
  !(!h.g.global.navigator ||
    (!h.g.global.navigator.maxTouchPoints &&
      !h.g.global.navigator.msMaxTouchPoints));
h.Touch.Fl = null;
h.Touch.xe = {};
h.g.global.PointerEvent
  ? (h.Touch.xe = {
      mousedown: ['pointerdown'],
      mouseenter: ['pointerenter'],
      mouseleave: ['pointerleave'],
      mousemove: ['pointermove'],
      mouseout: ['pointerout'],
      mouseover: ['pointerover'],
      mouseup: ['pointerup', 'pointercancel'],
      touchend: ['pointerup'],
      touchcancel: ['pointercancel'],
    })
  : h.Touch.mu &&
      (h.Touch.xe = {
        mousedown: ['touchstart'],
        mousemove: ['touchmove'],
        mouseup: ['touchend', 'touchcancel'],
      });
h.yn = 0;
h.uC = function (a, c) {
  h.sg ();
  (a.changedTouches && 1 != a.changedTouches.length) ||
    (h.yn = setTimeout (function () {
      a.changedTouches &&
        ((a.button = 2), (a.clientX = a.changedTouches[0].clientX), (a.clientY =
          a.changedTouches[0].clientY));
      c && Aa (c, a);
    }, h.nz));
};
h.sg = function () {
  h.yn && (clearTimeout (h.yn), (h.yn = 0));
};
h.Touch.Hm = function () {
  h.Touch.Fl = null;
};
h.Touch.$r = function (a) {
  return !h.Touch.mC (a) || h.Touch.FA (a);
};
h.Touch.hn = function (a) {
  return void 0 != a.pointerId
    ? a.pointerId
    : a.changedTouches &&
        a.changedTouches[0] &&
        void 0 !== a.changedTouches[0].identifier &&
        null !== a.changedTouches[0].identifier
        ? a.changedTouches[0].identifier
        : 'mouse';
};
h.Touch.FA = function (a) {
  var c = h.Touch.hn (a);
  return void 0 !== h.Touch.Fl && null !== h.Touch.Fl
    ? h.Touch.Fl == c
    : 'mousedown' == a.type || 'touchstart' == a.type || 'pointerdown' == a.type
        ? ((h.Touch.Fl = c), !0)
        : !1;
};
h.Touch.nD = function (a) {
  if (h.g.Ja.startsWith (a.type, 'touch')) {
    var c = a.changedTouches[0];
    a.clientX = c.clientX;
    a.clientY = c.clientY;
  }
};
h.Touch.mC = function (a) {
  return (
    h.g.Ja.startsWith (a.type, 'touch') ||
    h.g.Ja.startsWith (a.type, 'mouse') ||
    h.g.Ja.startsWith (a.type, 'pointer')
  );
};
h.Touch.wn = function (a) {
  return (
    h.g.Ja.startsWith (a.type, 'touch') || h.g.Ja.startsWith (a.type, 'pointer')
  );
};
h.Touch.wD = function (a) {
  var c = [];
  if (a.changedTouches)
    for (var d = 0; d < a.changedTouches.length; d++)
      c[d] = {
        type: a.type,
        changedTouches: [a.changedTouches[d]],
        target: a.target,
        stopPropagation: function () {
          a.stopPropagation ();
        },
        preventDefault: function () {
          a.preventDefault ();
        },
      };
  else c.push (a);
  return c;
};
h.xi = function (a) {
  this.o = a;
  this.xd = new h.Ea (a, !0, !0, 'blocklyMainWorkspaceScrollbar');
  this.Ld = new h.Ea (a, !1, !0, 'blocklyMainWorkspaceScrollbar');
  this.qk = h.g.j.H (
    'rect',
    {height: h.Ea.bc, width: h.Ea.bc, class: 'blocklyScrollbarBackground'},
    null
  );
  h.g.j.dj (this.qk, a.Kf);
};
h.xi.prototype.mb = null;
h.xi.prototype.F = function () {
  h.g.j.removeNode (this.qk);
  this.mb = this.o = this.qk = null;
  this.xd.F ();
  this.xd = null;
  this.Ld.F ();
  this.Ld = null;
};
h.xi.prototype.resize = function () {
  var a = this.o.bd ();
  if (a) {
    var c = !1, d = !1;
    this.mb &&
      this.mb.qb == a.qb &&
      this.mb.Ab == a.Ab &&
      this.mb.xc == a.xc &&
      this.mb.kc == a.kc
      ? ((this.mb &&
          this.mb.Ie == a.Ie &&
          this.mb.Bb == a.Bb &&
          this.mb.Ac == a.Ac) ||
          (c = !0), (this.mb &&
          this.mb.vd == a.vd &&
          this.mb.Ib == a.Ib &&
          this.mb.nc == a.nc) ||
          (d = !0))
      : (d = c = !0);
    c && this.xd.resize (a);
    d && this.Ld.resize (a);
    (this.mb && this.mb.qb == a.qb && this.mb.kc == a.kc) ||
      this.qk.setAttribute ('x', this.Ld.Qe.x);
    (this.mb && this.mb.Ab == a.Ab && this.mb.xc == a.xc) ||
      this.qk.setAttribute ('y', this.xd.Qe.y);
    this.mb = a;
  }
};
h.xi.prototype.set = function (a, c) {
  var d = {};
  a *= this.xd.Rb;
  c *= this.Ld.Rb;
  var e = this.Ld.Jd, f = a / this.xd.Jd;
  d.x = isNaN (f) ? 0 : f;
  e = c / e;
  d.y = isNaN (e) ? 0 : e;
  this.o.vj (d);
  Ba (this.xd, a);
  Ba (this.Ld, c);
};
h.Ea = function (a, c, d, e) {
  this.o = a;
  this.nj = d || !1;
  this.sh = c;
  this.mb = null;
  this.rk (e);
  this.Qe = new h.g.O (0, 0);
  a = h.Ea.bc;
  c
    ? (this.dc.setAttribute ('height', a), this.Oe.setAttribute (
        'height',
        a
      ), this.Tc.setAttribute ('height', a - 5), this.Tc.setAttribute (
        'y',
        2.5
      ), (this.Wk = 'width'), (this.Sw = 'x'))
    : (this.dc.setAttribute ('width', a), this.Oe.setAttribute (
        'width',
        a
      ), this.Tc.setAttribute ('width', a - 5), this.Tc.setAttribute (
        'x',
        2.5
      ), (this.Wk = 'height'), (this.Sw = 'y'));
  this.Lw = h.ta (this.dc, 'mousedown', this, this.QC);
  this.Mw = h.ta (this.Tc, 'mousedown', this, this.RC);
};
b = h.Ea.prototype;
b.wr = new h.g.O (0, 0);
b.tx = 0;
b.Jd = 0;
b.gg = 0;
b.Lk = 0;
b.Cf = !0;
b.bh = !0;
h.Ea.bc = 15;
h.Touch.mu && (h.Ea.bc = 25);
h.Ea.xC = function (a, c) {
  return a &&
    c &&
    a.qb == c.qb &&
    a.Ab == c.Ab &&
    a.Bb == c.Bb &&
    a.Ib == c.Ib &&
    a.xc == c.xc &&
    a.kc == c.kc &&
    a.Ie == c.Ie &&
    a.vd == c.vd &&
    a.Ac == c.Ac &&
    a.nc == c.nc
    ? !0
    : !1;
};
h.Ea.prototype.F = function () {
  Ca ();
  h.Wa (this.Lw);
  this.Lw = null;
  h.Wa (this.Mw);
  this.Mw = null;
  h.g.j.removeNode (this.Oe);
  this.dc = this.L = this.Oe = null;
  this.Tc && (this.o.ec.unsubscribe (this.Tc), (this.Tc = null));
  this.o = null;
};
function Ba (a, c) {
  a.Lk = c;
  a.Tc.setAttribute (a.Sw, a.Lk);
}
function Da (a, c) {
  a.Jd = c;
  a.Oe.setAttribute (a.Wk, a.Jd);
  a.dc.setAttribute (a.Wk, a.Jd);
}
h.xi.prototype.Ph = function (a) {
  this.xd.Ph (a);
  this.Ld.Ph (a);
};
function Ea (a, c, d) {
  a.Qe.x = c;
  a.Qe.y = d;
  h.g.j.ol (
    a.Oe,
    'translate(' + (a.Qe.x + a.wr.x) + 'px,' + (a.Qe.y + a.wr.y) + 'px)'
  );
}
b = h.Ea.prototype;
b.resize = function (a) {
  if (!a && ((a = this.o.bd ()), !a)) return;
  h.Ea.xC (a, this.mb) ||
    ((this.mb = a), this.sh ? Fa (this, a) : Ga (this, a), Ha (this));
};
function Fa (a, c) {
  var d = c.qb - 1;
  a.nj && (d -= h.Ea.bc);
  Da (a, Math.max (0, d));
  d = c.kc + 0.5;
  a.nj && a.o.G && (d += h.Ea.bc);
  Ea (a, d, c.xc + c.Ab - h.Ea.bc - 0.5);
  Ia (a, c);
}
function Ia (a, c) {
  a.nj || a.cc (a.Jd < c.Ie);
  a.Rb = a.Jd / c.Ie;
  if (-Infinity == a.Rb || Infinity == a.Rb || isNaN (a.Rb)) a.Rb = 0;
  a.gg = Math.max (0, c.qb * a.Rb);
  a.Tc.setAttribute (a.Wk, a.gg);
  Ba (a, Ja (a, (c.Bb - c.Ac) * a.Rb));
}
function Ga (a, c) {
  var d = c.Ab - 1;
  a.nj && (d -= h.Ea.bc);
  Da (a, Math.max (0, d));
  d = c.kc + 0.5;
  a.o.G || (d += c.qb - h.Ea.bc - 1);
  Ea (a, d, c.xc + 0.5);
  Ka (a, c);
}
function Ka (a, c) {
  a.nj || a.cc (a.Jd < c.vd);
  a.Rb = a.Jd / c.vd;
  if (-Infinity == a.Rb || Infinity == a.Rb || isNaN (a.Rb)) a.Rb = 0;
  a.gg = Math.max (0, c.Ab * a.Rb);
  a.Tc.setAttribute (a.Wk, a.gg);
  Ba (a, Ja (a, (c.Ib - c.nc) * a.Rb));
}
b.rk = function (a) {
  var c = 'blocklyScrollbar' + (this.sh ? 'Horizontal' : 'Vertical');
  a && (c += ' ' + a);
  this.Oe = h.g.j.H ('svg', {class: c}, null);
  this.L = h.g.j.H ('g', {}, this.Oe);
  this.dc = h.g.j.H ('rect', {class: 'blocklyScrollbarBackground'}, this.L);
  a = Math.floor ((h.Ea.bc - 5) / 2);
  this.Tc = h.g.j.H (
    'rect',
    {class: 'blocklyScrollbarHandle', rx: a, ry: a},
    this.L
  );
  this.o.ec.subscribe (this.Tc, 'scrollbarColour', 'fill');
  this.o.ec.subscribe (this.Tc, 'scrollbarOpacity', 'fill-opacity');
  h.g.j.dj (this.Oe, y (this.o));
};
b.isVisible = function () {
  return this.Cf;
};
b.Ph = function (a) {
  var c = a != this.bh;
  this.bh = a;
  c && this.Jl ();
};
b.cc = function (a) {
  var c = a != this.isVisible ();
  if (this.nj)
    throw Error ('Unable to toggle visibility of paired scrollbars.');
  this.Cf = a;
  c && this.Jl ();
};
b.Jl = function () {
  this.bh && this.isVisible ()
    ? this.Oe.setAttribute ('display', 'block')
    : this.Oe.setAttribute ('display', 'none');
};
b.QC = function (a) {
  La (this.o);
  h.Touch.Hm ();
  Ca ();
  if (h.g.Vk (a)) a.stopPropagation ();
  else {
    var c = h.g.bl (a, y (this.o), Ma (this.o));
    c = this.sh ? c.x : c.y;
    var d = h.g.Jk (this.Tc);
    d = this.sh ? d.x : d.y;
    var e = this.Lk, f = 0.95 * this.gg;
    c <= d ? (e -= f) : c >= d + this.gg && (e += f);
    Ba (this, Ja (this, e));
    Ha (this);
    a.stopPropagation ();
    a.preventDefault ();
  }
};
b.RC = function (a) {
  La (this.o);
  Ca ();
  h.g.Vk (a)
    ? a.stopPropagation ()
    : ((this.xD = this.Lk), Na (this.o), (this.tx = this.sh
        ? a.clientX
        : a.clientY), (h.Ea.yg = h.ta (
        document,
        'mouseup',
        this,
        this.VC
      )), (h.Ea.xg = h.ta (
        document,
        'mousemove',
        this,
        this.SC
      )), a.stopPropagation (), a.preventDefault ());
};
b.SC = function (a) {
  Ba (this, Ja (this, this.xD + ((this.sh ? a.clientX : a.clientY) - this.tx)));
  Ha (this);
};
b.VC = function () {
  Oa (this.o);
  h.Touch.Hm ();
  Ca ();
};
function Ca () {
  h.$b (!0);
  h.Ea.yg && (h.Wa (h.Ea.yg), (h.Ea.yg = null));
  h.Ea.xg && (h.Wa (h.Ea.xg), (h.Ea.xg = null));
}
function Ja (a, c) {
  return (c = 0 >= c || isNaN (c) || a.Jd < a.gg
    ? 0
    : Math.min (c, a.Jd - a.gg));
}
function Ha (a) {
  var c = a.Lk / a.Jd;
  isNaN (c) && (c = 0);
  var d = {};
  a.sh ? (d.x = c) : (d.y = c);
  a.o.vj (d);
}
b.set = function (a) {
  Ba (this, Ja (this, a * this.Rb));
  Ha (this);
};
h.g.Cd = {};
h.g.Cd.ks = function (a) {
  return a * Math.PI / 180;
};
h.g.Cd.ED = function (a) {
  return 180 * a / Math.PI;
};
h.g.Cd.jk = function (a, c, d) {
  if (d < a) {
    var e = d;
    d = a;
    a = e;
  }
  return Math.max (a, Math.min (c, d));
};
h.Yg = function (a, c, d, e) {
  this.name = a;
  this.Wf = c || Object.create (null);
  this.vp = d || Object.create (null);
  this.Wu = e || Object.create (null);
  this.fontStyle = Object.create (null);
  this.fs = null;
};
h.Yg.prototype.ae = function () {
  return this.name + '-theme';
};
function Pa (a, c) {
  return (c = a.Wu[c]) && 'string' == typeof propertyValue && Pa (a, c)
    ? Pa (a, c)
    : c ? String (c) : null;
}
h.Yg.XA = function (a, c) {
  var d = new h.Yg (a), e = c.base;
  e && e instanceof h.Yg && (h.g.object.Pi (d, e), (d.name = a));
  h.g.object.Pi (d.Wf, c.blockStyles);
  h.g.object.Pi (d.vp, c.categoryStyles);
  h.g.object.Pi (d.Wu, c.componentStyles);
  h.g.object.Pi (d.fontStyle, c.fontStyle);
  null != c.startHats && (d.fs = c.startHats);
  return d;
};
h.jf = {};
h.jf.Pf = {};
h.jf.Pf.WA = {
  colour_blocks: {colourPrimary: '20'},
  list_blocks: {colourPrimary: '260'},
  logic_blocks: {colourPrimary: '210'},
  loop_blocks: {colourPrimary: '120'},
  math_blocks: {colourPrimary: '230'},
  procedure_blocks: {colourPrimary: '290'},
  text_blocks: {colourPrimary: '160'},
  variable_blocks: {colourPrimary: '330'},
  variable_dynamic_blocks: {colourPrimary: '310'},
  hat_blocks: {colourPrimary: '330', hat: 'cap'},
};
h.jf.Pf.vp = {
  colour_category: {colour: '20'},
  list_category: {colour: '260'},
  logic_category: {colour: '210'},
  loop_category: {colour: '120'},
  math_category: {colour: '230'},
  procedure_category: {colour: '290'},
  text_category: {colour: '160'},
  variable_category: {colour: '330'},
  variable_dynamic_category: {colour: '310'},
};
h.jf.Pf = new h.Yg ('classic', h.jf.Pf.WA, h.jf.Pf.vp);
h.g.gb = {
  KG: 0,
  $E: 3,
  by: 8,
  yG: 9,
  iF: 12,
  Ys: 13,
  si: 16,
  cE: 17,
  Wx: 18,
  dG: 19,
  WD: 20,
  Zs: 27,
  xG: 32,
  cG: 33,
  bG: 34,
  kE: 35,
  NE: 36,
  WE: 37,
  Wz: 38,
  nG: 39,
  Dy: 40,
  gG: 43,
  jG: 44,
  Co: 45,
  Kj: 46,
  ZERO: 48,
  ONE: 49,
  DG: 50,
  zG: 51,
  GE: 52,
  FE: 53,
  vG: 54,
  tG: 55,
  jE: 56,
  gF: 57,
  DE: 59,
  BE: 61,
  AE: 173,
  CE: 163,
  kG: 63,
  SD: 64,
  zs: 65,
  TD: 66,
  ny: 67,
  Ss: 68,
  E: 69,
  nE: 70,
  HE: 71,
  LE: 72,
  az: 73,
  SE: 74,
  jz: 75,
  TE: 76,
  ZE: 77,
  fF: 78,
  yF: 79,
  aG: 80,
  Q: 81,
  lG: 82,
  au: 83,
  Rz: 84,
  EG: 85,
  Xz: 86,
  vu: 87,
  Cu: 88,
  MG: 89,
  dA: 90,
  wz: 91,
  LG: 92,
  bE: 93,
  xF: 96,
  qF: 97,
  wF: 98,
  vF: 99,
  mF: 100,
  lF: 101,
  uF: 102,
  tF: 103,
  kF: 104,
  pF: 105,
  oF: 106,
  sF: 107,
  nF: 109,
  rF: 110,
  jF: 111,
  oE: 112,
  sE: 113,
  tE: 114,
  uE: 115,
  vE: 116,
  wE: 117,
  xE: 118,
  yE: 119,
  zE: 120,
  pE: 121,
  qE: 122,
  rE: 123,
  hF: 144,
  qG: 145,
  EE: 166,
  VE: 183,
  rG: 186,
  dE: 189,
  lE: 187,
  aE: 188,
  eG: 190,
  wG: 191,
  RD: 192,
  AG: 192,
  uG: 222,
  zF: 219,
  UD: 220,
  ZD: 221,
  JG: 224,
  aF: 224,
  bF: 91,
  cF: 93,
  IG: 229,
  HG: 252,
  fG: 255,
};
h.sa = {};
h.sa.pa = {};
h.sa.pa.Ch = {};
h.sa.pa.ug = {si: 'Shift', ty: 'Control', Wx: 'Alt', wz: 'Meta'};
h.sa.pa.MH = function (a, c) {
  var d = h.sa.pa.KB (c);
  d && delete h.sa.pa.Ch[d];
  h.sa.pa.Ch[a] = c;
};
h.sa.pa.pD = function (a) {
  h.sa.pa.Ch = a;
};
h.sa.pa.kH = function () {
  var a = {};
  h.g.object.Ff (a, h.sa.pa.Ch);
  return a;
};
h.sa.pa.xB = function (a) {
  return h.sa.pa.Ch[a];
};
h.sa.pa.KB = function (a) {
  for (var c = Object.keys (h.sa.pa.Ch), d = 0, e; (e = c[d]); d++)
    if (h.sa.pa.Ch[e].name === a.name) return e;
  return null;
};
h.sa.pa.lD = function (a) {
  for (
    var c = h.g.object.values (h.sa.pa.ug), d = '', e = 0, f;
    (f = c[e]);
    e++
  )
    a.getModifierState (f) && (d += f);
  return (d += a.keyCode);
};
h.sa.pa.DA = function (a, c) {
  for (var d = 0, e; (e = a[d]); d++)
    if (0 > c.indexOf (e)) throw Error (e + ' is not a valid modifier key.');
};
h.sa.pa.vk = function (a, c) {
  var d = '', e = h.g.object.values (h.sa.pa.ug);
  h.sa.pa.DA (c, e);
  for (var f = 0, g; (g = e[f]); f++)
    -1 < c.indexOf (g) && (d += g);
  return d + a;
};
h.sa.pa.QA = function () {
  var a = {},
    c = h.sa.pa.vk (h.g.gb.jz, [h.sa.pa.ug.ty, h.sa.pa.ug.si]),
    d = h.sa.pa.vk (h.g.gb.vu, [h.sa.pa.ug.si]),
    e = h.sa.pa.vk (h.g.gb.zs, [h.sa.pa.ug.si]),
    f = h.sa.pa.vk (h.g.gb.au, [h.sa.pa.ug.si]),
    g = h.sa.pa.vk (h.g.gb.Ss, [h.sa.pa.ug.si]);
  a[h.g.gb.vu] = h.navigation.co;
  a[h.g.gb.zs] = h.navigation.Bs;
  a[h.g.gb.au] = h.navigation.bo;
  a[h.g.gb.Ss] = h.navigation.As;
  a[h.g.gb.az] = h.navigation.Ox;
  a[h.g.gb.Ys] = h.navigation.Px;
  a[h.g.gb.Cu] = h.navigation.Nx;
  a[h.g.gb.Rz] = h.navigation.Ux;
  a[h.g.gb.E] = h.navigation.ao;
  a[h.g.gb.Zs] = h.navigation.ao;
  a[c] = h.navigation.Cs;
  a[d] = h.navigation.Tx;
  a[e] = h.navigation.Rx;
  a[f] = h.navigation.Qx;
  a[g] = h.navigation.Sx;
  return a;
};
h.h.ji = function (a) {
  this.wb = a.id;
  this.group = h.h.Kb ();
  this.ac = !1;
};
h.g.object.S (h.h.ji, h.h.jc);
h.h.ji.prototype.type = h.h.et;
h.h.ji.prototype.La = function () {
  var a = {type: this.type};
  this.group && (a.group = this.group);
  this.wb && (a.workspaceId = this.wb);
  return a;
};
h.h.ji.prototype.oa = function (a) {
  this.wb = a.workspaceId;
  this.group = a.group;
};
h.h.kf = function (a) {
  h.h.kf.v.constructor.call (this);
  this.Ig = a.ub ();
  this.wb = a.B.id;
};
h.g.object.S (h.h.kf, h.h.Abstract);
h.h.kf.prototype.La = function () {
  var a = h.h.kf.v.La.call (this);
  a.varId = this.Ig;
  return a;
};
h.h.kf.prototype.oa = function (a) {
  h.h.kf.v.La.call (this);
  this.Ig = a.varId;
};
h.h.sd = function (a) {
  a &&
    (h.h.sd.v.constructor.call (this, a), (this.$h = a.type), (this.Zh =
      a.name));
};
h.g.object.S (h.h.sd, h.h.kf);
h.h.sd.prototype.type = h.h.pu;
h.h.sd.prototype.La = function () {
  var a = h.h.sd.v.La.call (this);
  a.varType = this.$h;
  a.varName = this.Zh;
  return a;
};
h.h.sd.prototype.oa = function (a) {
  h.h.sd.v.oa.call (this, a);
  this.$h = a.varType;
  this.Zh = a.varName;
};
h.h.sd.prototype.run = function (a) {
  var c = w (this);
  a ? c.Xd (this.Zh, this.$h, this.Ig) : c.Qi (this.Ig);
};
h.h.Sd = function (a) {
  a &&
    (h.h.Sd.v.constructor.call (this, a), (this.$h = a.type), (this.Zh =
      a.name));
};
h.g.object.S (h.h.Sd, h.h.kf);
h.h.Sd.prototype.type = h.h.qu;
h.h.Sd.prototype.La = function () {
  var a = h.h.Sd.v.La.call (this);
  a.varType = this.$h;
  a.varName = this.Zh;
  return a;
};
h.h.Sd.prototype.oa = function (a) {
  h.h.Sd.v.oa.call (this, a);
  this.$h = a.varType;
  this.Zh = a.varName;
};
h.h.Sd.prototype.run = function (a) {
  var c = w (this);
  a ? c.Qi (this.Ig) : c.Xd (this.Zh, this.$h, this.Ig);
};
h.h.ze = function (a, c) {
  a && (h.h.ze.v.constructor.call (this, a), (this.mr = a.name), (this.hr = c));
};
h.g.object.S (h.h.ze, h.h.kf);
h.h.ze.prototype.type = h.h.tu;
h.h.ze.prototype.La = function () {
  var a = h.h.ze.v.La.call (this);
  a.oldName = this.mr;
  a.newName = this.hr;
  return a;
};
h.h.ze.prototype.oa = function (a) {
  h.h.ze.v.oa.call (this, a);
  this.mr = a.oldName;
  this.hr = a.newName;
};
h.h.ze.prototype.run = function (a) {
  var c = w (this);
  a ? c.Nh (this.Ig, this.hr) : c.Nh (this.Ig, this.mr);
};
h.M = {};
h.M.Ix = function (a) {
  var c = C, d = h.g.xml.createElement ('xml'), e = h.M.MD (h.$.Iu (c));
  e.hasChildNodes () && d.appendChild (e);
  var f = Qa (c, !0);
  e = 0;
  for (var g; (g = f[e]); e++)
    d.appendChild (g.ls (a));
  c = c.pb (!0);
  for (e = 0; (f = c[e]); e++)
    d.appendChild (h.M.pp (f, a));
  return d;
};
h.M.MD = function (a) {
  for (var c = h.g.xml.createElement ('variables'), d = 0, e; (e = a[d]); d++) {
    var f = h.g.xml.createElement ('variable');
    f.appendChild (h.g.xml.createTextNode (e.name));
    e.type && f.setAttribute ('type', e.type);
    f.id = e.ub ();
    c.appendChild (f);
  }
  return c;
};
h.M.pp = function (a, c) {
  var d;
  a.B.G && (d = a.B.Kk ());
  c = h.M.Xf (a, c);
  var e = a.Ma ();
  c.setAttribute ('x', Math.round (a.B.G ? d - e.x : e.x));
  c.setAttribute ('y', Math.round (e.y));
  return c;
};
h.M.pB = function (a) {
  var c = !1;
  a.name &&
    (a.cu
      ? (c = !0)
      : a.Lj &&
          (console.warn (
            'Detected an editable field that was not serializable. Please define SERIALIZABLE property as true on all editable custom fields. Proceeding with serialization.'
          ), (c = !0)));
  return c
    ? ((c = h.g.xml.createElement ('field')), c.setAttribute (
        'name',
        a.name || ''
      ), (c.textContent = a.getValue ()), c)
    : null;
};
h.M.mA = function (a, c) {
  for (var d = 0, e; (e = a.N[d]); d++)
    for (var f = 0, g; (g = e.Sa[f]); f++)
      (g = h.M.pB (g)) && c.appendChild (g);
};
h.M.Xf = function (a, c) {
  var d = h.g.xml.createElement (a.Na ? 'shadow' : 'block');
  d.setAttribute ('type', a.type);
  c || d.setAttribute ('id', a.id);
  if (a.Ed) {
    var e = a.Ed ();
    e && (e.hasChildNodes () || e.hasAttributes ()) && d.appendChild (e);
  }
  h.M.mA (a, d);
  if ((e = a.Vd.text)) {
    var f = a.Vd.size, g = a.Vd.Rw, k = h.g.xml.createElement ('comment');
    k.appendChild (h.g.xml.createTextNode (e));
    k.setAttribute ('pinned', g);
    k.setAttribute ('h', f.height);
    k.setAttribute ('w', f.width);
    d.appendChild (k);
  }
  a.data &&
    ((e = h.g.xml.createElement ('data')), e.appendChild (
      h.g.xml.createTextNode (a.data)
    ), d.appendChild (e));
  for (f = 0; (g = a.N[f]); f++) {
    var l;
    k = !0;
    if (g.type != h.cf) {
      var m = g.connection.la ();
      g.type == h.Ya
        ? (l = h.g.xml.createElement ('value'))
        : g.type == h.Ka && (l = h.g.xml.createElement ('statement'));
      e = g.connection.Te;
      !e || (m && m.Na) || l.appendChild (h.M.Tu (e, c));
      m && (l.appendChild (h.M.Xf (m, c)), (k = !1));
      l.setAttribute ('name', g.name);
      k || d.appendChild (l);
    }
  }
  void 0 != a.zf && a.zf != a.hC && d.setAttribute ('inline', a.zf);
  a.isCollapsed () && d.setAttribute ('collapsed', !0);
  a.isEnabled () || d.setAttribute ('disabled', !0);
  a.dd () || a.Na || d.setAttribute ('deletable', !1);
  a.Pc () || a.Na || d.setAttribute ('movable', !1);
  a.Ad () || d.setAttribute ('editable', !1);
  if ((f = u (a)))
    (l = h.g.xml.createElement ('next')), l.appendChild (
      h.M.Xf (f, c)
    ), d.appendChild (l);
  e = a.U && a.U.Te;
  !e || (f && f.Na) || l.appendChild (h.M.Tu (e, c));
  return d;
};
h.M.Tu = function (a, c) {
  for (var d = (a = a.cloneNode (!0)), e; d; )
    if ((c && 'shadow' == d.nodeName && d.removeAttribute ('id'), d.firstChild))
      d = d.firstChild;
    else {
      for (; d && !d.nextSibling; )
        (e = d), (d = d.parentNode), e.nodeType == h.g.j.Node.TEXT_NODE &&
          '' == e.data.trim () &&
          d.firstChild != e &&
          h.g.j.removeNode (e);
      d &&
        ((e = d), (d = d.nextSibling), e.nodeType == h.g.j.Node.TEXT_NODE &&
          '' == e.data.trim () &&
          h.g.j.removeNode (e));
    }
  return a;
};
h.M.Zd = function (a) {
  a = h.g.xml.Zd (a);
  var c = /(<[^/](?:[^>]*[^/])?>[^<]*)\n([^<]*<\/)/;
  do {
    var d = a;
    a = a.replace (c, '$1&#10;$2');
  } while (a != d);
  return a.replace (/<(\w+)([^<]*)\/>/g, '<$1$2></$1>');
};
h.M.bH = function (a) {
  a = h.M.Zd (a).split ('<');
  for (var c = '', d = 1; d < a.length; d++) {
    var e = a[d];
    '/' == e[0] && (c = c.substring (2));
    a[d] = c + '<' + e;
    '/' != e[0] && '/>' != e.slice (-2) && (c += '  ');
  }
  a = a.join ('\n');
  a = a.replace (/(<(\w+)\b[^>]*>[^\n]*)\n *<\/\2>/g, '$1</$2>');
  return a.replace (/^\n/, '');
};
h.M.Hg = function (a) {
  var c = h.g.xml.CD (a);
  if (!c || !c.documentElement || c.getElementsByTagName ('parsererror').length)
    throw Error ('textToDom was unable to parse: ' + a);
  return c.documentElement;
};
h.M.WG = function (a, c) {
  c.Tb (!1);
  c.clear ();
  a = h.M.ih (a, c);
  c.Tb (!0);
  return a;
};
h.M.ih = function (a, c) {
  if (a instanceof h.hb) {
    var d = a;
    a = c;
    c = d;
    console.warn (
      'Deprecated call to Blockly.Xml.domToWorkspace, swap the arguments.'
    );
  }
  var e;
  c.G && (e = c.Kk ());
  d = [];
  h.g.j.yl ();
  var f = h.h.Kb ();
  f || h.h.ka (!0);
  c.Tb && c.Tb (!1);
  var g = !0;
  try {
    for (var k = 0, l; (l = a.childNodes[k]); k++) {
      var m = l.nodeName.toLowerCase (), n = l;
      if ('block' == m || ('shadow' == m && !h.h.ac)) {
        var q = h.M.Si (n, c);
        d.push (q.id);
        var r = n.hasAttribute ('x') ? parseInt (n.getAttribute ('x'), 10) : 10,
          t = n.hasAttribute ('y') ? parseInt (n.getAttribute ('y'), 10) : 10;
        isNaN (r) || isNaN (t) || q.moveBy (c.G ? e - r : r, t);
        g = !1;
      } else {
        if ('shadow' == m)
          throw TypeError ('Shadow block cannot be a top-level block.');
        if ('comment' == m)
          c.ca
            ? h.Ci
                ? h.Ci.setValue (n.textContent)
                : console.warn (
                    'Missing require for Blockly.WorkspaceCommentSvg, ignoring workspace comment.'
                  )
            : h.$z
                ? h.$z.setValue (n.textContent)
                : console.warn (
                    'Missing require for Blockly.WorkspaceComment, ignoring workspace comment.'
                  );
        else if ('variables' == m) {
          if (g) h.M.iB (n, c);
          else
            throw Error (
              "'variables' tag must exist once before block and shadow tag elements in the workspace XML, but it was found in another location."
            );
          g = !1;
        }
      }
    }
  } finally {
    f || h.h.ka (!1), h.g.j.zl ();
  }
  c.Tb && c.Tb (!0);
  h.h.Ia (new h.h.ji (c));
  return d;
};
h.M.OG = function (a, c) {
  var d;
  c.hasOwnProperty ('scale') && (d = Ra (c));
  a = h.M.ih (a, c);
  if (d && d.top != d.bottom) {
    var e = d.bottom;
    var f = c.G ? d.right : d.left;
    var g = Infinity, k = -Infinity, l = Infinity;
    for (d = 0; d < a.length; d++) {
      var m = c.Cc (a[d]).Ma ();
      m.y < l && (l = m.y);
      m.x < g && (g = m.x);
      m.x > k && (k = m.x);
    }
    e = e - l + 10;
    f = c.G ? f - k : f - g;
    for (d = 0; d < a.length; d++)
      c.Cc (a[d]).moveBy (f, e);
  }
  return a;
};
h.M.Si = function (a, c) {
  if (a instanceof h.hb) {
    var d = a;
    a = c;
    c = d;
    console.warn (
      'Deprecated call to Blockly.Xml.domToBlock, swap the arguments.'
    );
  }
  h.h.disable ();
  d = c.mh ();
  try {
    var e = h.M.Tp (a, c), f = p (e, !1);
    if (c.ca) {
      Sa (e, !1);
      for (var g = f.length - 1; 0 <= g; g--)
        f[g].cj ();
      for (g = f.length - 1; 0 <= g; g--)
        f[g].Ca (!1);
      setTimeout (function () {
        e.$f || Sa (e, !0);
      }, 1);
      Ta (e);
      Ua (c);
    } else for (g = f.length - 1; 0 <= g; g--);
  } finally {
    h.h.enable ();
  }
  if (h.h.isEnabled ()) {
    a = h.$.Fv (c, d);
    for (g = 0; g < a.length; g++)
      h.h.Ia (new h.h.sd (a[g]));
    h.h.Ia (new h.h.Vl (e));
  }
  return e;
};
h.M.iB = function (a, c) {
  for (var d = 0, e; (e = a.childNodes[d]); d++)
    if (e.nodeType == h.g.j.Node.ELEMENT_NODE) {
      var f = e.getAttribute ('type'), g = e.getAttribute ('id');
      c.Xd (e.textContent, f, g);
    }
};
h.M.Tp = function (a, c) {
  var d = null, e = a.getAttribute ('type');
  if (!e) throw TypeError ('Block type unspecified: ' + a.outerHTML);
  var f = a.getAttribute ('id');
  d = c.gr (e, f);
  var g = null;
  f = 0;
  for (var k; (k = a.childNodes[f]); f++)
    if (k.nodeType != h.g.j.Node.TEXT_NODE) {
      var l = (g = null);
      var m = 0;
      for (var n; (n = k.childNodes[m]); m++)
        n.nodeType == h.g.j.Node.ELEMENT_NODE &&
          ('block' == n.nodeName.toLowerCase ()
            ? (g = n)
            : 'shadow' == n.nodeName.toLowerCase () && (l = n));
      !g && l && (g = l);
      n = k.getAttribute ('name');
      m = k;
      switch (k.nodeName.toLowerCase ()) {
        case 'mutation':
          d.tf && (d.tf (m), d.cj && d.cj ());
          break;
        case 'comment':
          if (!h.Comment) {
            console.warn (
              'Missing require for Blockly.Comment, ignoring block comment.'
            );
            break;
          }
          g = m.textContent;
          l = 'true' == m.getAttribute ('pinned');
          k = parseInt (m.getAttribute ('w'), 10);
          m = parseInt (m.getAttribute ('h'), 10);
          d.uj (g);
          d.Vd.Rw = l;
          isNaN (k) || isNaN (m) || (d.Vd.size = new h.g.hf (k, m));
          l &&
            d.CB &&
            !d.fe &&
            setTimeout (function () {
              d.Ee.cc (!0);
            }, 1);
          break;
        case 'data':
          d.data = k.textContent;
          break;
        case 'title':
        case 'field':
          h.M.hB (d, n, m);
          break;
        case 'value':
        case 'statement':
          m = da (d, n);
          if (!m) {
            console.warn (
              'Ignoring non-existent input ' + n + ' in block ' + e
            );
            break;
          }
          l && (m.connection.Te = l);
          if (g)
            if (((g = h.M.Tp (g, c)), g.K)) m.connection.connect (g.K);
            else if (g.P) m.connection.connect (g.P);
            else
              throw TypeError (
                'Child block does not have output or previous statement.'
              );
          break;
        case 'next':
          l && d.U && (d.U.Te = l);
          if (g) {
            if (!d.U) throw TypeError ('Next statement does not exist.');
            if (d.U.isConnected ())
              throw TypeError ('Next statement is already connected.');
            g = h.M.Tp (g, c);
            if (!g.P)
              throw TypeError ('Next block does not have previous statement.');
            d.U.connect (g.P);
          }
          break;
        default:
          console.warn ('Ignoring unknown tag: ' + k.nodeName);
      }
    }
  (f = a.getAttribute ('inline')) && d.Qh ('true' == f);
  (f = a.getAttribute ('disabled')) && d.Se ('true' != f && 'disabled' != f);
  if ((f = a.getAttribute ('deletable'))) d.iv = 'true' == f;
  (f = a.getAttribute ('movable')) && d.Ur ('true' == f);
  (f = a.getAttribute ('editable')) && d.Tr ('true' == f);
  (f = a.getAttribute ('collapsed')) && d.Eg ('true' == f);
  if ('shadow' == a.nodeName.toLowerCase ()) {
    a = Va (d, !1);
    for (f = 0; (c = a[f]); f++)
      if (!c.Na) throw TypeError ('Shadow block not allowed non-shadow child.');
    if (Wa (d).length)
      throw TypeError ('Shadow blocks cannot have variable references.');
    d.Xr (!0);
  }
  return d;
};
h.M.hB = function (a, c, d) {
  var e = ba (a, c);
  e
    ? e.setValue (d.textContent)
    : console.warn ('Ignoring non-existent field ' + c + ' in block ' + a.type);
};
h.M.YA = function (a) {
  for (var c = 0, d; (d = a.childNodes[c]); c++)
    if ('next' == d.nodeName.toLowerCase ()) {
      a.removeChild (d);
      break;
    }
};
h.wc = function (a) {
  var c = !!a.readOnly;
  if (c) var d = null, e = !1, f = !1, g = !1, k = !1, l = !1, m = !1;
  else {
    d = h.wc.Pw (a.toolbox || null);
    e = !(!d || !d.getElementsByTagName ('category').length);
    f = a.trashcan;
    void 0 === f && (f = e);
    var n = a.maxTrashcanContents;
    f ? void 0 === n && (n = 32) : (n = 0);
    g = a.collapse;
    void 0 === g && (g = e);
    k = a.comments;
    void 0 === k && (k = e);
    l = a.disable;
    void 0 === l && (l = e);
    m = a.sounds;
    void 0 === m && (m = !0);
  }
  var q = !!a.rtl, r = a.horizontalLayout;
  void 0 === r && (r = !1);
  var t = a.toolboxPosition;
  t = 'end' !== t;
  t = r ? (t ? h.Xg : h.bk) : t == q ? h.Wg : h.Rd;
  var v = a.css;
  void 0 === v && (v = !0);
  var H = 'https://blockly-demo.appspot.com/static/media/';
  a.media ? (H = a.media) : a.path && (H = a.path + 'media/');
  var S = void 0 === a.oneBasedIndex ? !0 : !!a.oneBasedIndex,
    ka = a.keyMap || h.sa.pa.QA (),
    de = a.renderer || 'geras';
  this.G = q;
  this.Mn = S;
  this.collapse = g;
  this.JA = k;
  this.disable = l;
  this.readOnly = c;
  this.Yq = a.maxBlocks || Infinity;
  this.Zq = a.maxInstances;
  this.Qn = H;
  this.Zv = e;
  this.Qb = h.wc.YC (a, e);
  this.cw = f;
  this.Cn = n;
  this.aC = m;
  this.ZB = v;
  this.rh = r;
  this.Bh = d;
  this.Wv = h.wc.XC (a);
  this.Ta = h.wc.$C (a);
  this.cb = t;
  this.DD = h.wc.ZC (a);
  this.pa = ka;
  this.Kr = de;
  this.Lr = a.rendererOverrides;
  this.vq = void 0;
  this.Gd = a.parentWorkspace;
};
h.VD = function () {};
h.wc.YC = function (a, c) {
  var d = a.move || {}, e = {};
  e.scrollbars = void 0 === d.scrollbars && void 0 === a.scrollbars
    ? c
    : !!d.scrollbars || !!a.scrollbars;
  e.Kg = e.scrollbars && void 0 !== d.wheel ? !!d.wheel : !1;
  e.ag = e.scrollbars ? (void 0 === d.drag ? !0 : !!d.drag) : !1;
  return e;
};
h.wc.$C = function (a) {
  a = a.zoom || {};
  var c = {};
  c.controls = void 0 === a.controls ? !1 : !!a.controls;
  c.Kg = void 0 === a.wheel ? !1 : !!a.wheel;
  c.zD = void 0 === a.startScale ? 1 : Number (a.startScale);
  c.$k = void 0 === a.maxScale ? 3 : Number (a.maxScale);
  c.al = void 0 === a.minScale ? 0.3 : Number (a.minScale);
  c.jD = void 0 === a.scaleSpeed ? 1.2 : Number (a.scaleSpeed);
  c.Dr = void 0 === a.pinch ? c.Kg || c.controls : !!a.pinch;
  return c;
};
h.wc.XC = function (a) {
  a = a.grid || {};
  var c = {};
  c.spacing = Number (a.spacing) || 0;
  c.kb = a.colour || '#888';
  c.length = void 0 === a.length ? 1 : Number (a.length);
  c.TH = 0 < c.spacing && !!a.snap;
  return c;
};
h.wc.ZC = function (a) {
  a = a.theme || h.jf.Pf;
  return a instanceof h.Yg ? a : h.Yg.XA (a.name || 'builtin', a);
};
h.wc.Pw = function (a) {
  if (a) {
    if (
      ('string' != typeof a &&
        (h.g.userAgent.te && a.outerHTML
          ? (a = a.outerHTML)
          : a instanceof Element || (a = null)), 'string' == typeof a &&
        ((a = h.M.Hg (a)), 'xml' != a.nodeName.toLowerCase ()))
    )
      throw TypeError ('Toolbox should be an <xml> document.');
  } else a = null;
  return a;
};
h.fp = function (a) {
  this.Ha = Object.create (null);
  this.B = a;
};
b = h.fp.prototype;
b.clear = function () {
  this.Ha = Object.create (null);
};
b.$w = function (a, c) {
  var d = this.eg (c, a.type), e = D (this.B, !1);
  h.h.ka (!0);
  try {
    if (d && d.ub () != a.ub ()) {
      var f = a.type;
      c != d.name && Xa (d, c, e);
      for (c = 0; c < e.length; c++) {
        var g = void 0;
        a.ub ();
        d.ub ();
        for (var k = 0; (g = e[c].N[k]); k++)
          for (var l = 0; g.Sa[l]; l++);
      }
      h.h.Ia (new h.h.Sd (a));
      this.Ha[f].splice (this.jn (f).indexOf (a), 1);
    } else Xa (a, c, e);
  } finally {
    h.h.ka (!1);
  }
};
b.Nh = function (a, c) {
  var d = this.fg (a);
  if (!d)
    throw Error ("Tried to rename a variable that didn't exist. ID: " + a);
  this.$w (d, c);
};
function Xa (a, c, d) {
  h.h.Ia (new h.h.ze (a, c));
  a.name = c;
  for (a = 0; a < d.length; a++)
    for (var e = d[a], f = 0; (c = e.N[f]); f++)
      for (var g = 0; c.Sa[g]; g++);
}
b.Xd = function (a, c, d) {
  var e = this.eg (a, c);
  if (e) {
    if (d && e.ub () != d)
      throw Error (
        'Variable "' +
          a +
          '" is already in use and its id is "' +
          e.ub () +
          '" which conflicts with the passed in id, "' +
          d +
          '".'
      );
    return e;
  }
  if (d && this.fg (d))
    throw Error ('Variable id, "' + d + '", is already in use.');
  e = d || h.g.wf ();
  c = c || '';
  e = new h.zm (this.B, a, c, e);
  a = this.Ha[c] || [];
  a.push (e);
  delete this.Ha[c];
  this.Ha[c] = a;
  return e;
};
b.Qi = function (a) {
  var c = this.fg (a);
  if (c) {
    var d = c.name, e = this.uq (a);
    a = 0;
    for (var f; (f = e[a]); a++)
      if (
        'procedures_defnoreturn' == f.type ||
        'procedures_defreturn' == f.type
      ) {
        a = Ya (f, 'NAME');
        d = h.J.CANNOT_DELETE_VARIABLE_PROCEDURE
          .replace ('%1', d)
          .replace ('%2', a);
        h.alert (d);
        return;
      }
    var g = this;
    1 < e.length
      ? ((d = h.J.DELETE_VARIABLE_CONFIRMATION
          .replace ('%1', String (e.length))
          .replace ('%2', d)), h.confirm (d, function (k) {
          k && c && Za (g, c, e);
        }))
      : Za (g, c, e);
  } else console.warn ("Can't delete non-existent variable: " + a);
};
function Za (a, c, d) {
  var e = h.h.Kb ();
  e || h.h.ka (!0);
  try {
    for (var f = 0; f < d.length; f++)
      d[f].F (!0);
    var g = a.Ha[c.type];
    a = 0;
    for (var k; (k = g[a]); a++)
      if (k.ub () == c.ub ()) {
        g.splice (a, 1);
        h.h.Ia (new h.h.Sd (c));
        break;
      }
  } finally {
    e || h.h.ka (!1);
  }
}
b.eg = function (a, c) {
  if ((c = this.Ha[c || '']))
    for (var d = 0, e; (e = c[d]); d++)
      if (h.qd.vf (e.name, a)) return e;
  return null;
};
b.fg = function (a) {
  for (var c = Object.keys (this.Ha), d = 0; d < c.length; d++)
    for (var e = c[d], f = 0, g; (g = this.Ha[e][f]); f++)
      if (g.ub () == a) return g;
  return null;
};
b.jn = function (a) {
  return (a = this.Ha[a || '']) ? a.slice () : [];
};
b.mh = function () {
  var a = [], c;
  for (c in this.Ha)
    a = a.concat (this.Ha[c]);
  return a;
};
b.iq = function () {
  var a = [], c;
  for (c in this.Ha)
    for (var d = this.Ha[c], e = 0, f; (f = d[e]); e++)
      a.push (f.name);
  return a;
};
b.uq = function (a) {
  for (var c = [], d = D (this.B, !1), e = 0; e < d.length; e++) {
    var f = Wa (d[e]);
    if (f) for (var g = 0; g < f.length; g++) f[g].ub () == a && c.push (d[e]);
  }
  return c;
};
h.hb = function (a) {
  this.id = h.g.wf ();
  h.hb.ek[this.id] = this;
  this.options = a || new h.wc ({});
  this.G = !!this.options.G;
  this.rh = !!this.options.rh;
  this.cb = this.options.cb;
  this.Fj = [];
  this.Wn = [];
  this.Km = Object.create (null);
  this.Gc = [];
  this.Yh = [];
  this.ll = [];
  this.op = Object.create (null);
  this.ne = Object.create (null);
  this.Ha = new h.fp (this);
  this.pj = null;
};
b = h.hb.prototype;
b.ca = !1;
b.Hq = !1;
b.xt = 1024;
b.Mm = null;
b.F = function () {
  this.Gc.length = 0;
  this.clear ();
  delete h.hb.ek[this.id];
};
h.hb.bu = 3;
b = h.hb.prototype;
b.Ue = function (a, c) {
  a = a.Ma ();
  c = c.Ma ();
  return (
    a.y +
    h.hb.prototype.Ue.offset * a.x -
    (c.y + h.hb.prototype.Ue.offset * c.x)
  );
};
function $a (a, c) {
  if (!h.g.Cm (a.Fj, c))
    throw Error ("Block not present in workspace's list of top-most blocks.");
}
b.pb = function (a) {
  var c = [].concat (this.Fj);
  a &&
    1 < c.length &&
    ((this.Ue.offset = Math.sin (h.g.Cd.ks (h.hb.bu))), this.G &&
      (this.Ue.offset *= -1), c.sort (this.Ue));
  return c;
};
function Qa (a, c) {
  var d = [].concat (a.Wn);
  c &&
    1 < d.length &&
    ((a.Ue.offset = Math.sin (h.g.Cd.ks (h.hb.bu))), a.G &&
      (a.Ue.offset *= -1), d.sort (a.Ue));
  return d;
}
function D (a, c) {
  if (c) {
    a = a.pb (!0);
    c = [];
    for (var d = 0; d < a.length; d++)
      c.push.apply (c, p (a[d], !0));
  } else
    for ((c = a.pb (!1)), (d = 0); d < c.length; d++)
      c.push.apply (c, Va (c[d], !1));
  return c.filter (function (e) {
    return !e.og ();
  });
}
b.clear = function () {
  this.Hq = !0;
  try {
    var a = h.h.Kb ();
    for (a || h.h.ka (!0); this.Fj.length; )
      this.Fj[0].F (!1);
    for (; this.Wn.length; )
      this.Wn[this.Wn.length - 1].F (!1);
    a || h.h.ka (!1);
    this.Ha.clear ();
    this.pj && this.pj.clear ();
  } finally {
    this.Hq = !1;
  }
};
b.Nh = function (a, c) {
  this.Ha.Nh (a, c);
};
b.Xd = function (a, c, d) {
  return this.Ha.Xd (a, c, d);
};
b.uq = function (a) {
  return this.Ha.uq (a);
};
b.Qi = function (a) {
  this.Ha.Qi (a);
};
b.eg = function (a, c) {
  return this.Ha.eg (a, c);
};
b.fg = function (a) {
  return this.Ha.fg (a);
};
b.jn = function (a) {
  return this.Ha.jn (a);
};
b.mh = function () {
  return this.Ha.mh ();
};
b.iq = function () {
  return this.Ha.iq ();
};
b.Kk = function () {
  return 0;
};
b.gr = function (a, c) {
  return new h.Ul (this, a, c);
};
function ab (a) {
  return isNaN (a.options.Yq) ? Infinity : a.options.Yq - D (a, !1).length;
}
function bb (a, c) {
  if (!cb (a)) return !0;
  var d = 0, e;
  for (e in c) {
    if (
      c[e] >
      (a.options.Zq
        ? (a.options.Zq[e] || Infinity) -
            (a.ne[e] ? a.ne[e].slice (0) : []).length
        : Infinity)
    )
      return !1;
    d += c[e];
  }
  return d > ab (a) ? !1 : !0;
}
function cb (a) {
  return Infinity != a.options.Yq || !!a.options.Zq;
}
b.ss = function (a) {
  var c = a ? this.ll : this.Yh, d = a ? this.Yh : this.ll, e = c.pop ();
  if (e) {
    for (var f = [e]; c.length && e.group && e.group == c[c.length - 1].group; )
      f.push (c.pop ());
    for (c = 0; (e = f[c]); c++)
      d.push (e);
    f = h.h.filter (f, a);
    h.h.ac = !1;
    try {
      for (c = 0; (e = f[c]); c++)
        e.run (a);
    } finally {
      h.h.ac = !0;
    }
  }
};
function E (a, c) {
  a.Gc.push (c);
}
function db (a, c) {
  h.g.Cm (a.Gc, c);
}
b.Cc = function (a) {
  return this.op[a] || null;
};
b.Yr = function (a) {
  this.Ha = a;
};
h.hb.ek = Object.create (null);
h.hb.Hk = function (a) {
  return h.hb.ek[a] || null;
};
h.hb.getAll = function () {
  var a = [], c;
  for (c in h.hb.ek)
    a.push (h.hb.ek[c]);
  return a;
};
h.Da = function (a, c, d, e, f, g) {
  this.o = a;
  this.dh = c;
  this.rD = d;
  this.qr = this.pr = this.Ew = this.gx = null;
  this.$f = !1;
  d = h.Da.$x;
  this.o.G && (d = -d);
  this.pA = h.g.Cd.ks (d);
  a.Kf.appendChild (this.rk (c, !(!f || !g)));
  this.Cb = e;
  this.ax && eb (this);
  (f && g) ||
    ((a = this.dh.getBBox ()), (f = a.width + 2 * h.Da.Lg), (g =
      a.height + 2 * h.Da.Lg));
  fb (this, f, g);
  eb (this);
  gb (this);
  this.ax = !0;
};
h.Da.Lg = 6;
h.Da.ay = 5;
h.Da.$x = 20;
h.Da.Gs = 4;
h.Da.Xx = 8;
h.Da.yg = null;
h.Da.xg = null;
h.Da.qs = function () {
  h.Da.yg && (h.Wa (h.Da.yg), (h.Da.yg = null));
  h.Da.xg && (h.Wa (h.Da.xg), (h.Da.xg = null));
};
h.Da.xA = function () {
  h.Touch.Hm ();
  h.Da.qs ();
};
b = h.Da.prototype;
b.ax = !1;
b.Cb = null;
b.Re = 0;
b.Cg = 0;
b.Xa = 0;
b.Zb = 0;
b.lp = !0;
b.rk = function (a, c) {
  this.Ce = h.g.j.H ('g', {}, null);
  var d = {filter: 'url(#' + this.o.bb.W ().Wm + ')'};
  h.g.userAgent.iz && (d = {});
  d = h.g.j.H ('g', d, this.Ce);
  this.Lu = h.g.j.H ('path', {}, d);
  this.Dm = h.g.j.H (
    'rect',
    {class: 'blocklyDraggable', x: 0, y: 0, rx: h.Da.Lg, ry: h.Da.Lg},
    d
  );
  c
    ? ((this.Gf = h.g.j.H (
        'g',
        {class: this.o.G ? 'blocklyResizeSW' : 'blocklyResizeSE'},
        this.Ce
      )), (c = 2 * h.Da.Lg), h.g.j.H (
        'polygon',
        {points: '0,x x,x x,0'.replace (/x/g, c.toString ())},
        this.Gf
      ), h.g.j.H (
        'line',
        {
          class: 'blocklyResizeLine',
          x1: c / 3,
          y1: c - 1,
          x2: c - 1,
          y2: c / 3,
        },
        this.Gf
      ), h.g.j.H (
        'line',
        {
          class: 'blocklyResizeLine',
          x1: 2 * c / 3,
          y1: c - 1,
          x2: c - 1,
          y2: 2 * c / 3,
        },
        this.Gf
      ))
    : (this.Gf = null);
  this.o.options.readOnly ||
    ((this.pr = h.ta (this.Dm, 'mousedown', this, this.wA)), this.Gf &&
      (this.qr = h.ta (this.Gf, 'mousedown', this, this.gD)));
  this.Ce.appendChild (a);
  return this.Ce;
};
b.ma = function () {
  return this.Ce;
};
b.wA = function (a) {
  var c = this.o.cg (a);
  if (c) {
    if (c.qh)
      throw Error (
        'Tried to call gesture.handleBubbleStart, but the gesture had already been started.'
      );
    c.jd || (c.jd = this);
    c.Dd = a;
  }
};
b.tl = function () {};
b.dd = function () {
  return !1;
};
b.gD = function (a) {
  var c = this.Ce.parentNode;
  c.lastChild !== this.Ce && c.appendChild (this.Ce);
  h.Da.qs ();
  h.g.Vk (a) ||
    (this.o.ds (
      a,
      new h.g.O (this.o.G ? -this.Xa : this.Xa, this.Zb)
    ), (h.Da.yg = h.ta (document, 'mouseup', this, h.Da.xA)), (h.Da.xg = h.ta (
      document,
      'mousemove',
      this,
      this.hD
    )), h.$b ());
  a.stopPropagation ();
};
b.hD = function (a) {
  this.lp = !1;
  var c = this.o;
  a = h.g.bl (a, y (c), Ma (c));
  a.x /= c.scale;
  a.y /= c.scale;
  c = h.g.O.sum (c.uv, a);
  fb (this, this.o.G ? -c.x : c.x, c.y);
  this.o.G && eb (this);
};
function hb (a, c, d) {
  var e = a.o.G ? a.Cb.x - c.x - a.Xa : c.x + a.Cb.x;
  c = c.y + a.Cb.y;
  return Math.max (
    0,
    Math.min (
      1,
      (Math.min (e + a.Xa, d.Bb + d.qb) - Math.max (e, d.Bb)) *
        (Math.min (c + a.Zb, d.Ib + d.Ab) - Math.max (c, d.Ib)) /
        (a.Xa * a.Zb)
    )
  );
}
function eb (a) {
  var c = a.Cb.x;
  c = a.o.G ? c - (a.Re + a.Xa) : c + a.Re;
  a.moveTo (c, a.Cg + a.Cb.y);
}
b.moveTo = function (a, c) {
  this.Ce.setAttribute ('transform', 'translate(' + a + ',' + c + ')');
};
b.Fg = function (a) {
  !a && this.Ew && this.Ew ();
};
function fb (a, c, d) {
  var e = 2 * h.Da.Lg;
  c = Math.max (c, e + 45);
  d = Math.max (d, e + 20);
  a.Xa = c;
  a.Zb = d;
  a.Dm.setAttribute ('width', c);
  a.Dm.setAttribute ('height', d);
  a.Gf &&
    (a.o.G
      ? a.Gf.setAttribute (
          'transform',
          'translate(' + 2 * h.Da.Lg + ',' + (d - e) + ') scale(-1 1)'
        )
      : a.Gf.setAttribute (
          'transform',
          'translate(' + (c - e) + ',' + (d - e) + ')'
        ));
  if (a.lp) {
    c = a.o.bd ();
    c.Bb /= a.o.scale;
    c.qb /= a.o.scale;
    c.Ib /= a.o.scale;
    c.Ab /= a.o.scale;
    d = -a.Xa / 4;
    if (!(a.Xa > c.qb)) {
      if (a.o.G) {
        e = a.Cb.x - d;
        var f = e - a.Xa;
        var g = c.Bb + c.qb, k = c.Bb + h.Ea.bc / a.o.scale;
      } else
        (f = d + a.Cb.x), (e = f + a.Xa), (k = c.Bb), (g =
          c.Bb + c.qb - h.Ea.bc / a.o.scale);
      a.o.G
        ? f < k ? (d = -(k - a.Cb.x + a.Xa)) : e > g && (d = -(g - a.Cb.x))
        : f < k ? (d = k - a.Cb.x) : e > g && (d = g - a.Cb.x - a.Xa);
    }
    f = d;
    d = -a.Zb / 4;
    if (!(a.Zb > c.Ab)) {
      e = a.Cb.y + d;
      g = e + a.Zb;
      k = c.Ib;
      var l = c.Ib + c.Ab - h.Ea.bc / a.o.scale, m = a.Cb.y;
      e < k ? (d = k - m) : g > l && (d = l - m - a.Zb);
    }
    k = d;
    g = a.rD.getBBox ();
    d = {x: f, y: -a.Zb - a.o.bb.W ().Tj};
    e = {x: -a.Xa - 30, y: k};
    k = {x: g.width, y: k};
    l = {x: f, y: g.height};
    f = g.width < g.height ? k : l;
    g = g.width < g.height ? l : k;
    k = hb (a, d, c);
    l = hb (a, e, c);
    m = hb (a, f, c);
    c = Math.max (k, l, m, hb (a, g, c));
    k == c
      ? ((a.Re = d.x), (a.Cg = d.y))
      : l == c
          ? ((a.Re = e.x), (a.Cg = e.y))
          : m == c
              ? ((a.Re = f.x), (a.Cg = f.y))
              : ((a.Re = g.x), (a.Cg = g.y));
  }
  eb (a);
  gb (a);
  a.gx && a.gx ();
}
function gb (a) {
  var c = [], d = a.Xa / 2, e = a.Zb / 2, f = -a.Re, g = -a.Cg;
  if (d == f && e == g) c.push ('M ' + d + ',' + e);
  else {
    g -= e;
    f -= d;
    a.o.G && (f *= -1);
    var k = Math.sqrt (g * g + f * f), l = Math.acos (f / k);
    0 > g && (l = 2 * Math.PI - l);
    var m = l + Math.PI / 2;
    m > 2 * Math.PI && (m -= 2 * Math.PI);
    var n = Math.sin (m), q = Math.cos (m), r = new h.g.hf (a.Xa, a.Zb);
    m = (r.width + r.height) / h.Da.ay;
    m = Math.min (m, r.width, r.height) / 4;
    r = 1 - h.Da.Xx / k;
    f = d + r * f;
    g = e + r * g;
    r = d + m * q;
    var t = e + m * n;
    d -= m * q;
    e -= m * n;
    n = l + a.pA;
    n > 2 * Math.PI && (n -= 2 * Math.PI);
    l = Math.sin (n) * k / h.Da.Gs;
    k = Math.cos (n) * k / h.Da.Gs;
    c.push ('M' + r + ',' + t);
    c.push (
      'C' + (r + k) + ',' + (t + l) + ' ' + f + ',' + g + ' ' + f + ',' + g
    );
    c.push (
      'C' + f + ',' + g + ' ' + (d + k) + ',' + (e + l) + ' ' + d + ',' + e
    );
  }
  c.push ('z');
  a.Lu.setAttribute ('d', c.join (' '));
}
b.je = function (a) {
  this.Dm.setAttribute ('fill', a);
  this.Lu.setAttribute ('fill', a);
};
b.F = function () {
  this.pr && h.Wa (this.pr);
  this.qr && h.Wa (this.qr);
  h.Da.qs ();
  h.g.j.removeNode (this.Ce);
  this.$f = !0;
};
b.er = function (a, c) {
  a ? a.Xh (c.x, c.y) : this.moveTo (c.x, c.y);
  this.Re = this.o.G ? this.Cb.x - c.x - this.Xa : c.x - this.Cb.x;
  this.Cg = c.y - this.Cb.y;
  gb (this);
};
b.Ma = function () {
  return new h.g.O (
    this.o.G ? -this.Re + this.Cb.x - this.Xa : this.Cb.x + this.Re,
    this.Cb.y + this.Cg
  );
};
h.h.Ze = function (a) {
  this.Fe = a.id;
  this.wb = a.B.id;
  this.group = h.h.Kb ();
  this.ac = h.h.ac;
};
h.g.object.S (h.h.Ze, h.h.Abstract);
h.h.Ze.prototype.La = function () {
  var a = h.h.Ze.v.La.call (this);
  this.Fe && (a.commentId = this.Fe);
  return a;
};
h.h.Ze.prototype.oa = function (a) {
  h.h.Ze.v.oa.call (this, a);
  this.Fe = a.commentId;
};
h.h.ei = function (a, c, d) {
  a && (h.h.ei.v.constructor.call (this, a), (this.Gw = c), (this.Hn = d));
};
h.g.object.S (h.h.ei, h.h.Ze);
b = h.h.ei.prototype;
b.type = h.h.Os;
b.La = function () {
  var a = h.h.ei.v.La.call (this);
  a.newContents = this.Hn;
  return a;
};
b.oa = function (a) {
  h.h.ei.v.oa.call (this, a);
  this.Hn = a.newValue;
};
b.ij = function () {
  return this.Gw == this.Hn;
};
b.run = function (a) {
  var c;
  (c = w (this).Km[this.Fe] || null)
    ? c.OH (a ? this.Hn : this.Gw)
    : console.warn ("Can't change non-existent comment: " + this.Fe);
};
h.h.$e = function (a) {
  a && (h.h.$e.v.constructor.call (this, a), (this.xml = a.ls ()));
};
h.g.object.S (h.h.$e, h.h.Ze);
h.h.$e.prototype.type = h.h.Yl;
h.h.$e.prototype.La = function () {
  var a = h.h.$e.v.La.call (this);
  a.xml = h.M.Zd (this.xml);
  return a;
};
h.h.$e.prototype.oa = function (a) {
  h.h.$e.v.oa.call (this, a);
  this.xml = h.M.Hg (a.xml);
};
h.h.$e.prototype.run = function (a) {
  h.h.Rs (this, a);
};
h.h.Rs = function (a, c) {
  var d = w (a);
  c
    ? ((c = h.g.xml.createElement ('xml')), c.appendChild (a.xml), h.M.ih (
        c,
        d
      ))
    : (d = d.Km[a.Fe] || null)
        ? d.F (!1, !1)
        : console.warn ("Can't uncreate non-existent comment: " + a.Fe);
};
h.h.af = function (a) {
  a && (h.h.af.v.constructor.call (this, a), (this.xml = a.ls ()));
};
h.g.object.S (h.h.af, h.h.Ze);
h.h.af.prototype.type = h.h.Ps;
h.h.af.prototype.La = function () {
  return h.h.af.v.La.call (this);
};
h.h.af.prototype.oa = function (a) {
  h.h.af.v.oa.call (this, a);
};
h.h.af.prototype.run = function (a) {
  h.h.Rs (this, !a);
};
h.h.Og = function (a) {
  a &&
    (h.h.Og.v.constructor.call (
      this,
      a
    ), (this.Ap = a), (this.lr = a.Vv ()), (this.Hh = null));
};
h.g.object.S (h.h.Og, h.h.Ze);
b = h.h.Og.prototype;
b.Mh = function () {
  if (!this.Ap)
    throw Error (
      'Tried to record the new position of a comment on the same event twice.'
    );
  this.Hh = this.Ap.Vv ();
  this.Ap = null;
};
b.type = h.h.Zl;
b.La = function () {
  var a = h.h.Og.v.La.call (this);
  this.Hh &&
    (a.newCoordinate = Math.round (this.Hh.x) + ',' + Math.round (this.Hh.y));
  return a;
};
b.oa = function (a) {
  h.h.Og.v.oa.call (this, a);
  a.newCoordinate &&
    ((a = a.newCoordinate.split (',')), (this.Hh = new h.g.O (
      Number (a[0]),
      Number (a[1])
    )));
};
b.ij = function () {
  return h.g.O.vf (this.lr, this.Hh);
};
b.run = function (a) {
  var c;
  if ((c = w (this).Km[this.Fe] || null)) {
    a = a ? this.Hh : this.lr;
    var d = c.Vv ();
    c.moveBy (a.x - d.x, a.y - d.y);
  } else console.warn ("Can't move non-existent comment: " + this.Fe);
};
h.Wl = function (a, c) {
  this.Jb = a;
  this.o = c;
  this.hh = null;
  this.$n = !1;
  this.Ve = this.Jb.Ma ();
  this.jh = h.g.vh () && c.Yc ? c.Yc : null;
};
h.Wl.prototype.F = function () {
  this.jh = this.o = this.Jb = null;
};
function ib (a, c, d) {
  d = a.oj (d);
  d = h.g.O.sum (a.Ve, d);
  a.Jb.er (a.jh, d);
  a.Jb.dd () &&
    ((a.hh = ta (a.o, c)), (a.$n = a.hh != h.Ts), (c = a.o.fc), a.$n
      ? (ua (a.Jb, !0), a.hh == h.to && c && va (c, !0))
      : (ua (a.Jb, !1), c && va (c, !1)));
}
function jb (a, c, d) {
  ib (a, c, d);
  c = a.oj (d);
  c = h.g.O.sum (a.Ve, c);
  a.Jb.moveTo (c.x, c.y);
  c = a.o.fc;
  a.$n
    ? (c && setTimeout (c.close.bind (c), 100), a.Ek (), a.Jb.F (!1, !0))
    : c && c.close ();
  a.$n || (a.jh && a.jh.Gm (a.o.Kf), a.Jb.Fg && a.Jb.Fg (!1), a.Ek ());
  a.o.Tb (!0);
  a.o.qa &&
    a.o.qa.eD (a.Jb.dd () ? 'blocklyToolboxDelete' : 'blocklyToolboxGrab');
  h.h.ka (!1);
}
h.Wl.prototype.Ek = function () {
  if (this.Jb.mw) {
    var a = new h.h.Og (this.Jb);
    a.lr = this.Ve;
    a.Mh ();
    h.h.Ia (a);
  }
};
h.Wl.prototype.oj = function (a) {
  a = new h.g.O (a.x / this.o.scale, a.y / this.o.scale);
  this.o.sn && a.scale (1 / this.o.options.Gd.scale);
  return a;
};
h.fk = function (a) {
  this.o = a;
  this.ux = new h.g.O (a.scrollX, a.scrollY);
};
h.fk.prototype.F = function () {
  this.o = null;
};
h.fk.prototype.ds = function () {
  h.selected && kb (h.selected);
  Na (this.o);
};
h.fk.prototype.ag = function (a) {
  a = h.g.O.sum (this.ux, a);
  this.o.scroll (a.x, a.y);
};
h.hm = function (a) {
  h.hm.v.constructor.call (this, a.o);
  this.Sb = a.Sb;
  this.aj = a.aj;
};
h.g.object.S (h.hm, h.fk);
h.hm.prototype.ag = function (a) {
  a = h.g.O.sum (this.ux, a);
  this.aj ? this.Sb.set (-a.x) : this.Sb.set (-a.y);
};
h.Hc = function (a) {
  this.name = a;
};
h.navigation = {};
h.navigation.lj = null;
h.navigation.ju = 1;
h.navigation.vm = 2;
h.navigation.ku = 3;
h.navigation.zu = 40;
h.navigation.gh = h.navigation.vm;
h.navigation.xa = {
  rd: 'previous',
  pd: 'next',
  Bo: 'in',
  No: 'out',
  Co: 'insert',
  Ko: 'mark',
  Vs: 'disconnect',
  bp: 'toolbox',
  vo: 'exit',
  ap: 'toggle_keyboard_nav',
  Ct: 'move workspace cursor up',
  zt: 'move workspace cursor down',
  At: 'move workspace cursor left',
  Bt: 'move workspace cursor right',
};
h.navigation.Sj = 'local_marker_1';
h.navigation.Mc = function () {
  return h.ua ().Mc (h.navigation.Sj);
};
h.navigation.Cv = function () {
  var a = h.ua ().qa;
  a &&
    ((h.navigation.gh = h.navigation.ku), h.navigation.ex (
      !1
    ), h.navigation.Mc ().Ra || h.navigation.Wq (), a.LH ());
};
h.navigation.Bv = function () {
  h.navigation.gh = h.navigation.ju;
  var a = h.ua ();
  var c = a.qa;
  a = c ? c.Z : F (a);
  h.navigation.Mc ().Ra || h.navigation.Wq ();
  a &&
    a.o &&
    ((a = a.o.pb (!0)), 0 < a.length &&
      ((a = a[0]), (a = h.w.wk (a)), G (h.navigation.Ui (), a)));
};
h.navigation.an = function () {
  h.$b ();
  var a = h.ua (), c = a.lb (), d = !!a.qa, e = a.pb (!0);
  h.navigation.ex (d);
  h.navigation.gh = h.navigation.vm;
  0 < e.length
    ? G (c, h.navigation.tq (e[0]))
    : ((a = h.w.Ni (a, new h.g.O (100, 100))), G (c, a));
};
h.navigation.Ui = function () {
  var a = h.ua (), c = null;
  a.ca && (c = (a = (c = a.qa) ? c.Z : F (a)) ? a.o.lb () : null);
  return c;
};
h.navigation.iC = function () {
  var a = h.ua (), c = F (a);
  if (c && c.isVisible ()) {
    var d = h.navigation.Ui ().Ra.ea;
    d.isEnabled ()
      ? ((c = lb (c, d)), c.Ca (), Sa (c, !0), G (
          a.lb (),
          h.w.rf (c)
        ), h.navigation.Aw () ||
          h.navigation.rc (
            'Something went wrong while inserting a block from the flyout.'
          ), h.navigation.an (), G (
          a.lb (),
          h.navigation.tq (c)
        ), h.navigation.dD ())
      : h.navigation.rc ("Can't insert a disabled block.");
  } else
    h.navigation.rc (
      'Trying to insert from the flyout when the flyout does not  exist or is not visible'
    );
};
h.navigation.ex = function (a) {
  h.navigation.Ui () && (h.navigation.Ui ().Ba (), a && F (h.ua ()).Ba ());
};
h.navigation.yC = function () {
  var a = h.navigation.Mc ().Ra, c = h.ua ().lb ().Ra;
  if (!a) return h.navigation.rc ('Cannot insert with no marked node.'), !1;
  if (!c) return h.navigation.rc ('Cannot insert with no cursor node.'), !1;
  a = a.ab ();
  c = c.ab ();
  return a == h.w.types.Wc
    ? (h.navigation.rc ('Should not have been able to mark a field.'), !1)
    : a == h.w.types.Vc
        ? (h.navigation.rc ('Should not have been able to mark a block.'), !1)
        : a == h.w.types.we
            ? (h.navigation.rc (
                'Should not have been able to mark a stack.'
              ), !1)
            : c == h.w.types.Wc
                ? (h.navigation.rc (
                    'Cannot attach a field to anything else.'
                  ), !1)
                : c == h.w.types.Ae
                    ? (h.navigation.rc (
                        'Cannot attach a workspace to anything else.'
                      ), !1)
                    : !0;
};
h.navigation.DC = function (a, c) {
  if (!a) return !1;
  if (a.Na)
    return h.navigation.rc ('Cannot move a shadow block to the workspace.'), !1;
  a.getParent () && x (a, !1);
  a.moveTo (c.ys);
  return !0;
};
h.navigation.Aw = function () {
  var a = h.navigation.Mc ().Ra, c = h.ua ().lb ().Ra;
  if (!h.navigation.yC ()) return !1;
  var d = a.ab (), e = c.ab (), f = c.ea, g = a.ea;
  if (a.fj && c.fj) return h.navigation.Wd (f, g);
  if (a.fj && (e == h.w.types.Vc || e == h.w.types.we))
    return h.navigation.kw (f, g);
  if (d == h.w.types.Ae) return (c = c ? c.R () : null), h.navigation.DC (c, a);
  h.navigation.rc ('Unexpected state in Blockly.navigation.modify_.');
  return !1;
};
h.navigation.cB = function (a, c) {
  var d = a.R (), e = c.R ();
  d.Dc () == e.Dc () &&
    (-1 < p (d, !1).indexOf (e)
      ? h.navigation.fn (c).disconnect ()
      : h.navigation.fn (a).disconnect ());
};
h.navigation.dr = function (a, c) {
  if (!a || !c) return !1;
  var d = a.R ();
  return mb (c, a) == h.ga.Xl
    ? (h.navigation.cB (a, c), B (c) || oa (d.Dc (), a, c), c.connect (a), !0)
    : !1;
};
h.navigation.fn = function (a) {
  var c = a.R ();
  return B (a) ? (c.P ? c.P : c.K ? c.K : null) : a;
};
h.navigation.Uv = function (a) {
  return B (a) ? a : a.na ? a.na : null;
};
h.navigation.Wd = function (a, c) {
  if (!a || !c) return !1;
  var d = h.navigation.fn (a),
    e = h.navigation.Uv (c),
    f = h.navigation.Uv (a),
    g = h.navigation.fn (c);
  if (
    (d && e && h.navigation.dr (d, e)) ||
    (f && g && h.navigation.dr (f, g)) ||
    h.navigation.dr (a, c)
  )
    return !0;
  try {
    nb (c, a);
  } catch (k) {
    h.navigation.rc ('Connection failed with error: ' + k);
  }
  return !1;
};
h.navigation.kw = function (a, c) {
  switch (c.type) {
    case h.Pd:
      if (h.navigation.Wd (a.U, c)) return !0;
      break;
    case h.Ka:
      if (h.navigation.Wd (a.P, c)) return !0;
      break;
    case h.Ya:
      if (h.navigation.Wd (a.K, c)) return !0;
      break;
    case h.Od:
      for (var d = 0; d < a.N.length; d++) {
        var e = a.N[d].connection;
        if (e && e.type === h.Ya && h.navigation.Wd (e, c)) return !0;
      }
      if (a.K && h.navigation.Wd (a.K, c)) return !0;
  }
  h.navigation.rc ('This block can not be inserted at the marked location.');
  return !1;
};
h.navigation.bB = function () {
  var a = h.ua (), c = a.lb ().Ra;
  if (c.fj) {
    var d = c.ea;
    d.isConnected ()
      ? ((c = B (d) ? d : d.na), (d = B (d) ? d.na : d), d.R ().Na
          ? h.navigation.Pq ('Cannot disconnect a shadow block')
          : (c.disconnect (), ob (d, c), ya (c.R ().Dc ()), (c = h.w.Je (
              c
            )), G (a.lb (), c)))
      : h.navigation.Pq ('Cannot disconnect unconnected connection');
  } else
    h.navigation.Pq (
      'Cannot disconnect blocks when the cursor is not on a connection'
    );
};
h.navigation.Wq = function () {
  G (h.navigation.Mc (), h.ua ().lb ().Ra);
};
h.navigation.dD = function () {
  var a = h.navigation.Mc ();
  G (a, null);
  a.Ba ();
};
h.navigation.Sh = function (a) {
  h.navigation.gh = a;
};
h.navigation.tq = function (a) {
  var c = a.P || a.K;
  return c ? h.w.Je (c) : h.w.rf (a);
};
h.navigation.EC = function (a) {
  var c = h.ua ();
  if (c && (c = c.lb ())) {
    var d = c.Ra;
    d = d ? d.R () : null;
    d === a
      ? d.getParent ()
          ? (a = d.P || d.K) && G (c, h.w.Je (a.na))
          : G (c, h.w.Ni (d.B, d.Ma ()))
      : d && -1 < Va (a, !1).indexOf (d) && G (c, h.w.Ni (d.B, d.Ma ()));
  }
};
h.navigation.xH = function (a) {
  var c = h.ua ().lb ();
  if (c) {
    var d = c.Ra;
    d = d ? d.R () : null;
    d === a && G (c, h.w.rf (d));
  }
};
h.navigation.mB = function () {
  h.ua ().Fc || ((h.ua ().Fc = !0), h.navigation.an ());
};
h.navigation.aB = function () {
  if (h.ua ().Fc) {
    var a = h.ua ();
    h.ua ().Fc = !1;
    a.lb ().Ba ();
    h.navigation.Mc ().Ba ();
    h.navigation.Ui () && h.navigation.Ui ().Ba ();
  }
};
h.navigation.Pq = function (a) {
  h.navigation.lj ? h.navigation.lj ('log', a) : console.log (a);
};
h.navigation.rc = function (a) {
  h.navigation.lj ? h.navigation.lj ('warn', a) : console.warn (a);
};
h.navigation.cH = function (a) {
  h.navigation.lj ? h.navigation.lj ('error', a) : console.error (a);
};
h.navigation.Kw = function (a) {
  a = h.sa.pa.lD (a);
  return (a = h.sa.pa.xB (a)) ? h.navigation.gd (a) : !1;
};
h.navigation.gd = function (a) {
  var c = h.ua ().options.readOnly, d = !1;
  h.ua ().Fc
    ? c
        ? -1 < h.navigation.Iz.indexOf (a) && (d = h.navigation.Yv (a))
        : (d = h.navigation.Yv (a))
    : a.name === h.navigation.xa.ap && (h.navigation.mB (), (d = !0));
  return d;
};
h.navigation.Yv = function (a) {
  return a.name == h.navigation.xa.bp || h.navigation.gh == h.navigation.ku
    ? h.navigation.GD (a)
    : a.name == h.navigation.xa.ap
        ? (h.navigation.aB (), !0)
        : h.navigation.gh == h.navigation.vm
            ? h.navigation.OD (a)
            : h.navigation.gh == h.navigation.ju ? h.navigation.uB (a) : !1;
};
h.navigation.uB = function (a) {
  var c = h.ua (), d = c.qa;
  if ((c = d ? d.Z : F (c)) && c.gd (a)) return !0;
  switch (a.name) {
    case h.navigation.xa.No:
      return h.navigation.Cv (), !0;
    case h.navigation.xa.Ko:
      return h.navigation.iC (), !0;
    case h.navigation.xa.vo:
      return h.navigation.an (), !0;
    default:
      return !1;
  }
};
h.navigation.GD = function (a) {
  var c = h.ua (), d = c.qa;
  return d && d.gd (a)
    ? !0
    : a.name === h.navigation.xa.bp
        ? (c.qa ? h.navigation.Cv () : h.navigation.Bv (), !0)
        : a.name === h.navigation.xa.Bo
            ? (h.navigation.Bv (), !0)
            : a.name === h.navigation.xa.vo ? (h.navigation.an (), !0) : !1;
};
h.navigation.Gn = function (a, c) {
  var d = h.ua ().lb (), e = h.ua ().lb ().Ra;
  if (e.ab () !== h.w.types.Ae) return !1;
  e = e.ys;
  G (
    d,
    h.w.Ni (
      h.ua (),
      new h.g.O (a * h.navigation.zu + e.x, c * h.navigation.zu + e.y)
    )
  );
  return !0;
};
h.navigation.OD = function (a) {
  if (h.ua ().lb ().gd (a)) return !0;
  switch (a.name) {
    case h.navigation.xa.Co:
      return h.navigation.Aw (), !0;
    case h.navigation.xa.Ko:
      return h.navigation.TB (), !0;
    case h.navigation.xa.Vs:
      return h.navigation.bB (), !0;
    case h.navigation.xa.Ct:
      return h.navigation.Gn (0, -1);
    case h.navigation.xa.zt:
      return h.navigation.Gn (0, 1);
    case h.navigation.xa.At:
      return h.navigation.Gn (-1, 0);
    case h.navigation.xa.Bt:
      return h.navigation.Gn (1, 0);
    default:
      return !1;
  }
};
h.navigation.TB = function () {
  var a = h.ua ().lb ().Ra, c = a.ab ();
  c == h.w.types.Wc
    ? ((a = a.ea), ha (a) && a.vl (void 0))
    : a.fj || c == h.w.types.Ae
        ? h.navigation.Wq ()
        : c == h.w.types.Vc
            ? h.navigation.rc ('Cannot mark a block.')
            : c == h.w.types.we && h.navigation.rc ('Cannot mark a stack.');
};
h.navigation.co = new h.Hc (h.navigation.xa.rd);
h.navigation.Bs = new h.Hc (h.navigation.xa.No);
h.navigation.bo = new h.Hc (h.navigation.xa.pd);
h.navigation.As = new h.Hc (h.navigation.xa.Bo);
h.navigation.Ox = new h.Hc (h.navigation.xa.Co);
h.navigation.Px = new h.Hc (h.navigation.xa.Ko);
h.navigation.Nx = new h.Hc (h.navigation.xa.Vs);
h.navigation.Ux = new h.Hc (h.navigation.xa.bp);
h.navigation.ao = new h.Hc (h.navigation.xa.vo);
h.navigation.Cs = new h.Hc (h.navigation.xa.ap);
h.navigation.Rx = new h.Hc (h.navigation.xa.At);
h.navigation.Sx = new h.Hc (h.navigation.xa.Bt);
h.navigation.Tx = new h.Hc (h.navigation.xa.Ct);
h.navigation.Qx = new h.Hc (h.navigation.xa.zt);
h.navigation.Iz = [
  h.navigation.co,
  h.navigation.Bs,
  h.navigation.As,
  h.navigation.bo,
  h.navigation.Cs,
];
h.C = {};
h.C.visible = !1;
h.C.Gi = !1;
h.C.lz = 50;
h.C.Cw = 0;
h.C.wl = 0;
h.C.Kq = 0;
h.C.Lq = 0;
h.C.aa = null;
h.C.fl = null;
h.C.Ht = 0;
h.C.It = 10;
h.C.Hz = 10;
h.C.Yy = 750;
h.C.Jo = 5;
h.C.Ua = null;
h.C.Fa = function () {
  h.C.Ua ||
    ((h.C.Ua = document.createElement ('div')), (h.C.Ua.className =
      'blocklyTooltipDiv'), (h.Nn || document.body).appendChild (h.C.Ua));
};
h.C.Fi = function (a) {
  a.BC = h.Xb (a, 'mouseover', null, h.C.UC);
  a.zC = h.Xb (a, 'mouseout', null, h.C.TC);
  a.addEventListener ('mousemove', h.C.Nw, !1);
};
h.C.rs = function (a) {
  a && (h.Wa (a.BC), h.Wa (a.zC), a.removeEventListener ('mousemove', h.C.Nw));
};
h.C.UC = function (a) {
  if (!h.C.Gi) {
    for (
      a = a.currentTarget;
      'string' != typeof a.me && 'function' != typeof a.me;

    )
      a = a.me;
    h.C.aa != a && (h.C.Ba (), (h.C.fl = null), (h.C.aa = a));
    clearTimeout (h.C.Cw);
  }
};
h.C.TC = function () {
  h.C.Gi ||
    ((h.C.Cw = setTimeout (function () {
      h.C.aa = null;
      h.C.fl = null;
      h.C.Ba ();
    }, 1)), clearTimeout (h.C.wl));
};
h.C.Nw = function (a) {
  if (h.C.aa && h.C.aa.me && !h.C.Gi)
    if (h.C.visible) {
      var c = h.C.Kq - a.pageX;
      a = h.C.Lq - a.pageY;
      Math.sqrt (c * c + a * a) > h.C.Hz && h.C.Ba ();
    } else
      h.C.fl != h.C.aa &&
        (clearTimeout (h.C.wl), (h.C.Kq = a.pageX), (h.C.Lq =
          a.pageY), (h.C.wl = setTimeout (h.C.tD, h.C.Yy)));
};
h.C.F = function () {
  h.C.aa = null;
  h.C.fl = null;
  h.C.Ba ();
};
h.C.Ba = function () {
  h.C.visible &&
    ((h.C.visible = !1), h.C.Ua && (h.C.Ua.style.display = 'none'));
  h.C.wl && clearTimeout (h.C.wl);
};
h.C.block = function () {
  h.C.Ba ();
  h.C.Gi = !0;
};
h.C.LD = function () {
  h.C.Gi = !1;
};
h.C.tD = function () {
  if (!h.C.Gi && ((h.C.fl = h.C.aa), h.C.Ua)) {
    h.C.Ua.textContent = '';
    for (var a = h.C.aa.me; 'function' == typeof a; )
      a = a ();
    a = h.g.Ja.Jx (a, h.C.lz);
    a = a.split ('\n');
    for (var c = 0; c < a.length; c++) {
      var d = document.createElement ('div');
      d.appendChild (document.createTextNode (a[c]));
      h.C.Ua.appendChild (d);
    }
    a = h.C.aa.G;
    c = document.documentElement.clientWidth;
    d = document.documentElement.clientHeight;
    h.C.Ua.style.direction = a ? 'rtl' : 'ltr';
    h.C.Ua.style.display = 'block';
    h.C.visible = !0;
    var e = h.C.Kq;
    e = a ? e - (h.C.Ht + h.C.Ua.offsetWidth) : e + h.C.Ht;
    var f = h.C.Lq + h.C.It;
    f + h.C.Ua.offsetHeight > d + window.scrollY &&
      (f -= h.C.Ua.offsetHeight + 2 * h.C.It);
    a
      ? (e = Math.max (h.C.Jo - window.scrollX, e))
      : e + h.C.Ua.offsetWidth > c + window.scrollX - 2 * h.C.Jo &&
          (e = c - h.C.Ua.offsetWidth - 2 * h.C.Jo);
    h.C.Ua.style.top = f + 'px';
    h.C.Ua.style.left = e + 'px';
  }
};
h.ki = function (a, c) {
  this.Bw = null;
  this.Bc = new h.g.O (0, 0);
  this.Fb = this.Hb = this.Aj = this.Bj = this.jd = null;
  this.Ep = c;
  this.Qk = this.xh = this.Rk = this.ph = !1;
  this.Dd = a;
  this.Z = this.bi = this.Be = this.Yf = this.Ln = this.Kn = null;
  this.qn = this.qh = this.Ou = !1;
  this.dw = !h.Fy;
};
b = h.ki.prototype;
b.F = function () {
  h.Touch.Hm ();
  h.C.LD ();
  this.Ep.Pb = null;
  this.Kn && h.Wa (this.Kn);
  this.Ln && h.Wa (this.Ln);
  this.Be && this.Be.F ();
  this.bi && this.bi.F ();
  this.Yf && this.Yf.F ();
};
function pb (a, c) {
  a.Bc = h.g.O.Ak (new h.g.O (c.clientX, c.clientY), a.Bw);
  if (a.ph) var d = !1;
  else (a.ph = h.g.O.vC (a.Bc) > (a.Z ? h.Ry : h.Ey)), (d = a.ph);
  if (d) {
    if (a.Ou)
      throw Error ('updateIsDragging_ should only be called once per gesture.');
    a.Ou = !0;
    if (a.jd) {
      a.Qk = !0;
      a.Yf = new h.Wl (a.jd, a.Fb);
      d = a.Yf;
      h.h.Kb () || h.h.ka (!0);
      d.o.Tb (!1);
      d.Jb.lp = !1;
      d.jh &&
        (d.Jb.moveTo (0, 0), d.jh.Xh (d.Ve.x, d.Ve.y), qb (d.jh, d.Jb.ma ()));
      d.Jb.Fg && d.Jb.Fg (!0);
      var e = d.o.qa;
      e && e.jA (d.Jb.dd () ? 'blocklyToolboxDelete' : 'blocklyToolboxGrab');
      ib (a.Yf, a.Dd, a.Bc);
      d = !0;
    } else d = !1;
    if (!d) {
      if (a.Hb)
        if (
          (a.Z
            ? (a.Hb && a.Hb.isEnabled ()
                ? ((d = !rb (a.Z)) ||
                    ((d = a.Bc), (d =
                      Math.atan2 (d.y, d.x) / Math.PI * 180), (e =
                      a.Z.jB), (d = (d < e && d > -e) ||
                      d < -180 + e ||
                      d > 180 - e
                      ? !0
                      : !1)), d
                    ? ((a.Fb = a.Z.Lb), sb (a.Fb), h.h.Kb () ||
                        h.h.ka (!0), (a.Aj = null), (a.Hb = lb (
                        a.Z,
                        a.Hb
                      )), a.Hb.select (), (d = !0))
                    : (d = !1))
                : (d = !1), (a.xh = d))
            : a.Hb.Pc () && (a.xh = !0), a.xh)
        ) {
          a.Be = new h.Mg (a.Hb, a.Fb);
          d = a.Be;
          e = a.Bc;
          var f = a.dw;
          h.h.Kb () || h.h.ka (!0);
          var g = new h.h.jc (d.$a, 'dragStart', null, p (d.$a, !1));
          h.h.Ia (g);
          d.o.sn && ya (d.$a);
          h.g.j.yl ();
          d.o.Tb (!1);
          h.Va.Pp ();
          if (d.$a.getParent () || (f && d.$a.U && d.$a.U.la ()))
            x (d.$a, f), (e = d.oj (e)), (e = h.g.O.sum (
              d.Ve,
              e
            )), d.$a.translate (e.x, e.y), h.Va.dB (d.$a);
          d.$a.Fg (!0);
          e = d.$a;
          e.Ml &&
            ((f = e.Ma ()), e.ma ().removeAttribute ('transform'), e.B.Yc.Xh (
              f.x,
              f.y
            ), (f = e.ma ()) && qb (e.B.Yc, f));
          (e = d.o.qa) &&
            e.jA (d.$a.dd () ? 'blocklyToolboxDelete' : 'blocklyToolboxGrab');
          sa (a.Be, a.Dd, a.Bc);
          d = !0;
        } else d = !1;
      else d = !1;
      if ((d = !d))
        if (a.Z) d = rb (a.Z);
        else if ((d = a.Fb)) (d = a.Fb), (d = d.options.Qb && d.options.Qb.ag);
      d &&
        ((a.bi = a.Z
          ? new h.hm (a.Z)
          : new h.fk (a.Fb)), (a.Rk = !0), a.bi.ds ());
    }
    h.sg ();
  }
  a.Dd = c;
}
b.Sp = function (a) {
  h.g.un (a)
    ? this.cancel ()
    : ((this.qh = !0), h.Va.Pp (), sb (this.Fb), this.Fb.sn &&
        this.Fb.resize (), h.$b (!!this.Z), La (
        this.Fb
      ), (this.Dd = a), h.C.block (), this.Hb &&
        (!this.Hb.fe && a.shiftKey && this.Hb.B.Fc
          ? G (this.Ep.lb (), h.navigation.tq (this.Hb))
          : this.Hb.select ()), h.g.Vk (a)
        ? Aa (this, a)
        : (('touchstart' != a.type.toLowerCase () &&
            'pointerdown' != a.type.toLowerCase ()) ||
            'mouse' == a.pointerType ||
            h.uC (a, this), (this.Bw = new h.g.O (
            a.clientX,
            a.clientY
          )), (this.dw = a.altKey || a.ctrlKey || a.metaKey), this.Fi (a)));
};
b.Fi = function (a) {
  this.Kn = h.ta (document, 'mousemove', null, this.Yi.bind (this));
  this.Ln = h.ta (document, 'mouseup', null, this.kn.bind (this));
  a.preventDefault ();
  a.stopPropagation ();
};
b.Yi = function (a) {
  pb (this, a);
  this.Rk
    ? this.bi.ag (this.Bc)
    : this.xh
        ? sa (this.Be, this.Dd, this.Bc)
        : this.Qk && ib (this.Yf, this.Dd, this.Bc);
  a.preventDefault ();
  a.stopPropagation ();
};
b.kn = function (a) {
  pb (this, a);
  h.sg ();
  if (this.qn) console.log ('Trying to end a gesture recursively.');
  else {
    this.qn = !0;
    if (this.Qk) jb (this.Yf, a, this.Bc);
    else if (this.xh) wa (this.Be, a, this.Bc);
    else if (this.Rk) {
      var c = this.bi;
      c.ag (this.Bc);
      Oa (c.o);
    } else if (this.jd && !this.ph)
      this.jd.oD && this.jd.oD (), this.jd.select && this.jd.select ();
    else if (tb (this)) {
      c = this.Bj;
      var d = this.Dd;
      ha (c) && c.vl (d);
      ub (this);
    } else
      !this.Aj || this.ph || tb (this)
        ? this.Aj ||
            this.jd ||
            this.Bj ||
            this.ph ||
            ((c = this.Ep), a.shiftKey && c.Fc
              ? ((d = h.g.kD (
                  c,
                  new h.g.O (a.clientX, a.clientY)
                )), (d = h.w.Ni (c, d)), G (c.lb (), d))
              : h.selected && kb (h.selected))
        : (this.Z && this.Z.Ei
            ? this.Hb.isEnabled () &&
                (h.h.Kb () || h.h.ka (!0), za (lb (this.Z, this.Hb)))
            : h.h.Ia (new h.h.jc (this.Aj, 'click', void 0, void 0)), ub (
            this
          ), h.h.ka (!1));
    a.preventDefault ();
    a.stopPropagation ();
    this.F ();
  }
};
b.cancel = function () {
  if (!this.qn) {
    h.sg ();
    if (this.Qk) jb (this.Yf, this.Dd, this.Bc);
    else if (this.xh) wa (this.Be, this.Dd, this.Bc);
    else if (this.Rk) {
      var a = this.bi;
      a.ag (this.Bc);
      Oa (a.o);
    }
    this.F ();
  }
};
function Aa (a, c) {
  a.Hb
    ? (ub (a), h.$b (!!a.Z), a.Hb.tl (c))
    : a.jd ? a.jd.tl (c) : a.Fb && !a.Z && (h.$b (), a.Fb.tl (c));
  c.preventDefault ();
  c.stopPropagation ();
  a.F ();
}
function vb (a, c, d) {
  if (a.qh)
    throw Error (
      'Tried to call gesture.handleWsStart, but the gesture had already been started.'
    );
  a.Fb || (a.Fb = d);
  a.Dd = c;
  a.Sp (c);
  a.Fb.Fc && h.navigation.Sh (h.navigation.vm);
}
function wb (a, c, d) {
  if (a.qh)
    throw Error (
      'Tried to call gesture.handleFlyoutStart, but the gesture had already been started.'
    );
  a.Z || (a.Z = d);
  vb (a, c, d.o);
}
function ub (a) {
  a.Hb && !a.Z && ya (a.Hb);
}
function xb (a, c) {
  a.Aj ||
    a.jd ||
    ((a.Aj = c), c.fe && c != c.Dc () ? yb (a, c.Dc ()) : yb (a, c));
}
function yb (a, c) {
  c.Na ? yb (a, c.getParent ()) : (a.Hb = c);
}
function tb (a) {
  return (a.Bj ? ha (a.Bj) : !1) && !a.ph && (!a.Z || !a.Z.Ei);
}
b.Oc = function () {
  return this.Rk || this.xh || this.Qk;
};
b.Vi = function () {
  return this.Be ? this.Be.Vi () : [];
};
h.ki.Bq = function () {
  for (var a = h.hb.getAll (), c = 0, d; (d = a[c]); c++)
    if (d.Pb) return !0;
  return !1;
};
h.md = function (a, c, d) {
  this.xx = this.Ex = this.Xe = null;
  this.pc = new h.g.hf (0, 0);
  this.s = this.cr = this.Wh = this.qc = this.Db = this.Lc = this.Ef = this.sf = null;
  d && this.lk (d);
  this.setValue (a);
  c && (this.Ex = c);
};
b = h.md.prototype;
b.name = void 0;
b.$f = !1;
b.zw = 50;
b.I = null;
b.lg = !0;
b.Jg = !0;
b.Su = null;
h.md.Ft = '\u00a0';
b = h.md.prototype;
b.Lj = !0;
b.cu = !1;
b.lk = function (a) {
  var c = a.tooltip;
  'string' == typeof c && (c = h.g.Sc (a.tooltip));
  c && this.ke (c);
};
b.W = function () {
  !this.s && this.I && this.I.B && this.I.B.ca && (this.s = this.I.B.bb.W ());
  return this.s;
};
b.R = function () {
  return this.I;
};
b.va = function () {
  this.Lc ||
    ((this.Lc = h.g.j.H ('g', {}, null)), this.isVisible () ||
      (this.Lc.style.display = 'none'), this.I
      .ma ()
      .appendChild (this.Lc), this.ln (), zb (this), this.ke (this.xx), h.C.Fi (
      Ab (this)
    ), (this.cr = h.ta (Ab (this), 'mousedown', this, this.wg)));
};
b.ln = function () {
  Bb (this);
  Cb (this);
};
function Bb (a) {
  a.Db = h.g.j.H (
    'rect',
    {
      rx: a.W ().em,
      ry: a.W ().em,
      x: 0,
      y: 0,
      height: a.pc.height,
      width: a.pc.width,
      class: 'blocklyFieldRect',
    },
    a.Lc
  );
}
function Cb (a) {
  a.qc = h.g.j.H ('text', {class: 'blocklyText'}, a.Lc);
  a.W ().wo && a.qc.setAttribute ('dominant-baseline', 'central');
  a.Wh = document.createTextNode ('');
  a.qc.appendChild (a.Wh);
}
b.F = function () {
  h.A.Nk (this);
  h.V.Nk (this);
  h.C.rs (Ab (this));
  this.cr && h.Wa (this.cr);
  h.g.j.removeNode (this.Lc);
  this.$f = !0;
};
function zb (a) {
  var c = a.Lc;
  a.Lj &&
    c &&
    (a.I.Ad ()
      ? (h.g.j.xb (c, 'blocklyEditableText'), h.g.j.Rc (
          c,
          'blocklyNonEditableText'
        ), (c.style.cursor = a.vy))
      : (h.g.j.xb (c, 'blocklyNonEditableText'), h.g.j.Rc (
          c,
          'blocklyEditableText'
        ), (c.style.cursor = '')));
}
function ha (a) {
  return !!a.I && a.I.Ad () && !!a.vl && 'function' === typeof a.vl;
}
b.isVisible = function () {
  return this.Jg;
};
b.cc = function (a) {
  if (this.Jg != a) {
    this.Jg = a;
    var c = this.ma ();
    c && (c.style.display = a ? 'block' : 'none');
  }
};
b.ma = function () {
  return this.Lc;
};
b.lc = function () {};
b.qj = function () {
  this.Wh && (this.Wh.nodeValue = Db (this));
  this.Cx ();
};
b.Cx = function () {
  var a = this.W (), c = this.Db ? this.W ().Mj : 0, d = 2 * c, e = a.fm, f = 0;
  this.qc && ((f = h.g.j.mq (this.qc, a.Qg, a.Rf, a.Qf)), (d += f));
  this.Db && (e = Math.max (e, a.at));
  this.pc.height = e;
  this.pc.width = d;
  Eb (this, c, f);
  Fb (this);
};
function Eb (a, c, d) {
  if (a.qc) {
    var e = a.W (), f = a.pc.height / 2;
    a.qc.setAttribute ('x', a.I.G ? a.pc.width - d - c : c);
    a.qc.setAttribute ('y', e.wo ? f : f - e.fm / 2 + e.dt);
  }
}
function Fb (a) {
  a.Db &&
    (a.Db.setAttribute ('width', a.pc.width), a.Db.setAttribute (
      'height',
      a.pc.height
    ), a.Db.setAttribute ('rx', a.W ().em), a.Db.setAttribute (
      'ry',
      a.W ().em
    ));
}
b.xf = function () {
  if (!this.isVisible ()) return new h.g.hf (0, 0);
  this.lg
    ? (this.qj (), (this.lg = !1))
    : this.Jg &&
        0 == this.pc.width &&
        (console.warn (
          'Deprecated use of setting size_.width to 0 to rerender a field. Set field.isDirty_ to true instead.'
        ), this.qj ());
  return this.pc;
};
function Db (a) {
  var c = Gb (a);
  if (!c) return h.md.Ft;
  c.length > a.zw && (c = c.substring (0, a.zw - 2) + '\u2026');
  c = c.replace (/\s/g, h.md.Ft);
  a.I && a.I.G && (c += '\u200f');
  return c;
}
function Gb (a) {
  if (a.rq) {
    var c = a.rq.call (a);
    if (null !== c) return String (c);
  }
  return String (a.getValue ());
}
function Hb () {
  throw Error ('setText method is deprecated');
}
b.Zk = function () {
  this.lg = !0;
  this.s = null;
};
function Ib (a) {
  a.lg = !0;
  a.I && a.I.ca && (a.I.Ca (), a.I.yc (), a.us ());
}
b.setValue = function (a) {
  if (null !== a) {
    var c = this.Tm (a);
    a = Jb (this, a, c);
    if (!(a instanceof Error)) {
      if ((c = this.Ex))
        if (((c = c.call (this, a)), (a = Jb (this, a, c)), a instanceof Error))
          return;
      c = this.getValue ();
      c !== a &&
        (this.I &&
          h.h.isEnabled () &&
          h.h.Ia (
            new h.h.di (this.I, 'field', this.name || null, c, a)
          ), this.Um (a), this.lg && Ib (this));
    }
  }
};
function Jb (a, c, d) {
  if (null === d) return a.lg && Ib (a), Error ();
  void 0 !== d && (c = d);
  return c;
}
b.getValue = function () {
  return this.Xe;
};
b.Tm = function (a) {
  return null === a || void 0 === a ? null : a;
};
b.Um = function (a) {
  this.Xe = a;
  this.lg = !0;
};
b.wg = function (a) {
  if (this.I && this.I.B && (a = this.I.B.cg (a))) {
    if (a.qh)
      throw Error (
        'Tried to call gesture.setStartField, but the gesture had already been started.'
      );
    a.Bj || (a.Bj = this);
  }
};
b.ke = function (a) {
  var c = Ab (this);
  c ? (c.me = a || '' === a ? a : this.I) : (this.xx = a);
};
function Ab (a) {
  return a.Su || a.ma ();
}
b.Le = function () {
  for (var a = null, c = this.I, d = c.N, e = 0; e < c.N.length; e++)
    for (var f = d[e], g = f.Sa, k = 0; k < g.length; k++)
      if (g[k] === this) {
        a = f;
        break;
      }
  return a;
};
b.Lv = function () {
  return !1;
};
b.gd = function () {
  return !1;
};
b.Hf = function (a) {
  a ? (this.Lc.appendChild (a), (this.sf = a)) : (this.sf = null);
};
b.Jf = function (a) {
  a ? (this.Lc.appendChild (a), (this.Ef = a)) : (this.Ef = null);
};
b.us = function () {
  var a = this.I.B;
  a.Fc && this.sf && a.lb ().draw ();
  a.Fc && this.Ef && a.Mc (h.navigation.Sj).draw ();
};
h.ad = {};
h.ad.Hl = {};
h.ad.register = function (a, c) {
  if ('string' != typeof a || '' == a.trim ())
    throw Error (
      'Invalid field type "' + a + '". The type must be a non-empty string.'
    );
  if (h.ad.Hl[a])
    throw Error ('Error: Field "' + a + '" is already registered.');
  if (!c || 'function' != typeof c.oa)
    throw Error ('Field "' + c + '" must have a fromJson function');
  a = a.toLowerCase ();
  h.ad.Hl[a] = c;
};
h.ad.unregister = function (a) {
  h.ad.Hl[a]
    ? delete h.ad.Hl[a]
    : console.warn (
        'No field mapping for type "' + a + '" found to unregister'
      );
};
h.ad.oa = function (a) {
  var c = h.ad.Hl[a.type.toLowerCase ()];
  return c
    ? c.oa (a)
    : (console.warn (
        'Blockly could not create a field of type ' +
          a.type +
          '. The field is probably not being registered. This could be because the file is not loaded, the field does not register itself (Issue #1584), or the registration is not being reached.'
      ), null);
};
h.g.km = {};
h.g.km.LC = 0;
h.g.km.LB = function () {
  return 'blockly:' + (h.g.km.LC++).toString (36);
};
h.tc = function () {
  this.hx = h.tc.hv;
  this.bj = null;
  this.zd = !1;
  this.Qc = this.aa = null;
  this.Ob = [];
  this.xp = {};
};
h.tc.hv = !1;
h.tc.Error = {
  jo: 'Component already rendered',
  St: 'Unable to set parent component',
  oy: 'Child component index out of bounds',
};
b = h.tc.prototype;
b.ub = function () {
  return this.bj || (this.bj = h.g.km.LB ());
};
b.xj = function (a) {
  if (this == a) throw Error (h.tc.Error.St);
  var c;
  if ((c = a && this.Qc && this.bj))
    c = (c = this.bj) ? this.Qc.xp[c] || null : null;
  if (c && this.Qc != a) throw Error (h.tc.Error.St);
  this.Qc = a;
};
b.getParent = function () {
  return this.Qc;
};
b.Fa = function () {
  this.aa = document.createElement ('div');
};
b.Ca = function (a) {
  this.qj (a);
};
b.qj = function (a, c) {
  if (this.zd) throw Error (h.tc.Error.jo);
  this.aa || this.Fa ();
  a ? a.insertBefore (this.aa, c || null) : document.body.appendChild (this.aa);
  (this.Qc && !this.Qc.zd) || this.Ym ();
};
b.Ym = function () {
  this.zd = !0;
  Kb (this, function (a) {
    !a.zd && a.aa && a.Ym ();
  });
};
b.Zm = function () {
  Kb (this, function (a) {
    a.zd && a.Zm ();
  });
  this.zd = !1;
};
b.F = function () {
  this.fB || ((this.fB = !0), this.Qp ());
};
b.Qp = function () {
  this.zd && this.Zm ();
  Kb (this, function (a) {
    a.F ();
  });
  this.aa && h.g.j.removeNode (this.aa);
  this.Qc = this.aa = this.xp = this.Ob = null;
};
function Lb (a, c) {
  var d = a.Ob.length;
  if (c.zd) throw Error (h.tc.Error.jo);
  if (0 > d || d > a.Ob.length) throw Error (h.tc.Error.oy);
  a.xp[c.ub ()] = c;
  if (c.getParent () == a) {
    var e = a.Ob.indexOf (c);
    -1 < e && a.Ob.splice (e, 1);
  }
  c.xj (a);
  a.Ob.splice (d, 0, c);
  c.zd && a.zd && c.getParent () == a
    ? ((a = a.aa), (d = a.childNodes[d] || null), d != c.aa &&
        a.insertBefore (c.aa, d))
    : (a.aa || a.Fa (), (d = a.Ob[d + 1] || null), c.qj (
        a.aa,
        d ? d.aa : null
      ));
}
function Mb (a, c) {
  if (a.zd) throw Error (h.tc.Error.jo);
  a.hx = c;
}
function Kb (a, c, d) {
  for (var e = 0; e < a.Ob.length; e++)
    c.call (d, a.Ob[e], e);
}
h.g.ib = {};
h.g.ib.Zx = 'aria-';
h.g.ib.Jz = 'role';
h.g.ib.Zj = {
  IE: 'grid',
  JE: 'gridcell',
  KE: 'group',
  mz: 'listbox',
  sz: 'menu',
  uz: 'menuitem',
  vz: 'menuitemcheckbox',
  Cz: 'option',
  iG: 'presentation',
  Vo: 'row',
  BG: 'tree',
  CG: 'treeitem',
};
h.g.ib.State = {
  Vx: 'activedescendant',
  $D: 'colcount',
  mE: 'expanded',
  QE: 'invalid',
  kz: 'label',
  UE: 'labelledby',
  YE: 'level',
  $F: 'orientation',
  hG: 'posinset',
  pG: 'rowcount',
  Xo: 'selected',
  sG: 'setsize',
  FG: 'valuemax',
  GG: 'valuemin',
};
h.g.ib.yj = function (a, c) {
  a.setAttribute (h.g.ib.Jz, c);
};
h.g.ib.Sh = function (a, c, d) {
  Array.isArray (d) && (d = d.join (' '));
  a.setAttribute (h.g.ib.Zx + c, d);
};
h.Sg = function () {
  h.tc.call (this);
  this.vr = null;
  this.yf = -1;
  this.Jn = this.En = this.Dn = this.qf = this.Fn = null;
};
h.g.object.S (h.Sg, h.tc);
b = h.Sg.prototype;
b.Fa = function () {
  var a = document.createElement ('div');
  a.id = this.ub ();
  this.aa = a;
  a.className = 'goog-menu goog-menu-vertical blocklyNonSelectable';
  a.tabIndex = 0;
  h.g.ib.yj (a, this.Qr || h.g.ib.Zj.sz);
};
b.focus = function () {
  var a = this.aa;
  a && (a.focus ({preventScroll: !0}), h.g.j.xb (a, 'focused'));
};
b.blur = function () {
  var a = this.aa;
  a && (a.blur (), h.g.j.Rc (a, 'focused'));
};
b.yj = function (a) {
  this.Qr = a;
};
b.Ym = function () {
  h.Sg.v.Ym.call (this);
  Kb (
    this,
    function (a) {
      if (a.zd) {
        var c = a.aa;
        c = c.id || (c.id = a.ub ());
        this.Ii || (this.Ii = {});
        this.Ii[c] = a;
      }
    },
    this
  );
  Nb (this);
};
b.Zm = function () {
  Ob (this, -1);
  h.Sg.v.Zm.call (this);
};
b.Qp = function () {
  h.Sg.v.Qp.call (this);
  this.Fn && (h.Wa (this.Fn), (this.Fn = null));
  this.qf && (h.Wa (this.qf), (this.qf = null));
  this.Dn && (h.Wa (this.Dn), (this.Dn = null));
  this.En && (h.Wa (this.En), (this.En = null));
  this.Jn && (h.Wa (this.Jn), (this.Jn = null));
};
function Nb (a) {
  var c = a.aa;
  a.Fn = h.ta (c, 'mouseover', a, a.XB, !0);
  a.qf = h.ta (c, 'click', a, a.SB, !0);
  a.Dn = h.ta (c, 'mouseenter', a, a.VB, !0);
  a.En = h.ta (c, 'mouseleave', a, a.WB, !0);
  a.Jn = h.ta (c, 'keydown', a, a.wq);
}
b.Ii = null;
function Pb (a, c) {
  if (a.Ii)
    for (var d = a.aa; c && c !== d; ) {
      var e = c.id;
      if (e in a.Ii) return a.Ii[e];
      c = c.parentNode;
    }
  return null;
}
function Qb (a) {
  (a = a.Ob[a.yf] || null) && a.If (!1);
}
function Ob (a, c) {
  var d = a.Ob[c] || null;
  d
    ? (d.If (!0), (a.yf = c))
    : -1 < a.yf && ((a.Ob[a.yf] || null).If (!1), (a.yf = -1));
  d && h.g.style.jx (d.aa, a.aa);
}
b.If = function (a) {
  Ob (this, this.Ob.indexOf (a));
};
function Rb (a) {
  Qb (a);
  Sb (
    a,
    function (c, d) {
      return (c + 1) % d;
    },
    a.yf
  );
}
function Tb (a) {
  Qb (a);
  Sb (
    a,
    function (c, d) {
      c--;
      return 0 > c ? d - 1 : c;
    },
    a.yf
  );
}
function Sb (a, c, d) {
  var e = a.Ob.length;
  d = c.call (a, 0 > d ? -1 : d, e);
  for (var f = 0; f <= e; ) {
    var g = a.Ob[d] || null;
    if (g && g.isEnabled ()) {
      Ob (a, d);
      break;
    }
    f++;
    d = c.call (a, d, e);
  }
}
b.XB = function (a) {
  if ((a = Pb (this, a.target)))
    a.isEnabled ()
      ? (this.Ob[this.yf] || null) !== a && (Qb (this), this.If (a))
      : Qb (this);
};
b.SB = function (a) {
  var c = this.vr;
  this.vr = null;
  if (
    !(c &&
      'number' === typeof a.clientX &&
      1 > h.g.O.Rp (c, new h.g.O (a.clientX, a.clientY)))
  ) {
    c = Pb (this, a.target);
    var d;
    if ((d = c)) c.isEnabled () && (c.If (!0), Ub (c)), (d = void 0);
    d && a.preventDefault ();
  }
};
b.VB = function () {
  this.focus ();
};
b.WB = function () {
  this.aa && (this.blur (), Qb (this), Ob (this, -1));
};
b.wq = function (a) {
  return 0 != this.Ob.length && Vb (this, a)
    ? (a.preventDefault (), a.stopPropagation (), !0)
    : !1;
};
function Vb (a, c) {
  var d = a.Ob[a.yf] || null;
  if (d && 'function' == typeof d.wq && d.wq (c)) return !0;
  if (c.shiftKey || c.ctrlKey || c.metaKey || c.altKey) return !1;
  switch (c.keyCode) {
    case h.g.gb.Ys:
      d && Ub (d);
      break;
    case h.g.gb.Wz:
      Tb (a);
      break;
    case h.g.gb.Dy:
      Rb (a);
      break;
    default:
      return !1;
  }
  return !0;
}
h.nm = function (a, c) {
  h.tc.call (this);
  this.dh = a;
  this.setValue (c);
  this.Xm = !0;
};
h.g.object.S (h.nm, h.tc);
b = h.nm.prototype;
b.Fa = function () {
  var a = document.createElement ('div');
  a.id = this.ub ();
  this.aa = a;
  a.className =
    'goog-menuitem goog-option ' +
    (this.Xm ? '' : 'goog-menuitem-disabled ') +
    (this.wp ? 'goog-option-selected ' : '') +
    (this.hx ? 'goog-menuitem-rtl ' : '');
  var c = document.createElement ('div');
  c.className = 'goog-menuitem-content';
  a.appendChild (c);
  if (this.ik) {
    var d = document.createElement ('div');
    d.className = 'goog-menuitem-checkbox';
  } else d = null;
  d && c.appendChild (d);
  c.appendChild (Wb (this));
  h.g.ib.yj (a, this.Qr || (this.ik ? h.g.ib.Zj.vz : h.g.ib.Zj.uz));
  h.g.ib.Sh (a, h.g.ib.State.Xo, (this.ik && this.wp) || !1);
};
function Wb (a) {
  a = a.dh;
  'string' === typeof a && (a = document.createTextNode (a));
  return a;
}
b.setValue = function (a) {
  this.Xe = a;
};
b.getValue = function () {
  return this.Xe;
};
b.yj = function (a) {
  this.Qr = a;
};
function Xb (a, c) {
  if (a.ik) {
    a.wp = c;
    var d = a.aa;
    d &&
      a.isEnabled () &&
      (c
        ? (h.g.j.xb (d, 'goog-option-selected'), h.g.ib.Sh (
            d,
            h.g.ib.State.Xo,
            !0
          ))
        : (h.g.j.Rc (d, 'goog-option-selected'), h.g.ib.Sh (
            d,
            h.g.ib.State.Xo,
            !1
          )));
  }
}
b.If = function (a) {
  var c = this.aa;
  c &&
    this.isEnabled () &&
    (a
      ? h.g.j.xb (c, 'goog-menuitem-highlight')
      : h.g.j.Rc (c, 'goog-menuitem-highlight'));
};
b.isEnabled = function () {
  return this.Xm;
};
b.Se = function (a) {
  this.Xm = a;
  (a = this.aa) &&
    (this.Xm
      ? h.g.j.Rc (a, 'goog-menuitem-disabled')
      : h.g.j.xb (a, 'goog-menuitem-disabled'));
};
function Ub (a) {
  a.ik && Xb (a, !a.wp);
  a.Fu && a.Fu.call (a.hA, a);
}
function Yb (a, c, d) {
  a.Fu = c;
  a.hA = d;
}
h.Pa = function (a, c, d) {
  'function' != typeof a && h.Pa.Dx (a);
  this.mj = a;
  this.gs = this.Fr = this.cn = null;
  a = this.mj;
  if (Array.isArray (a)) {
    for (var e = !1, f = 0; f < a.length; f++) {
      var g = a[f][0];
      'string' == typeof g
        ? (a[f][0] = h.g.Sc (g))
        : (null != g.alt && (a[f][0].alt = h.g.Sc (g.alt)), (e = !0));
    }
    if (!(e || 2 > a.length)) {
      e = [];
      for (f = 0; f < a.length; f++)
        e.push (a[f][0]);
      f = h.g.Ja.Zr (e);
      g = h.g.Ja.Uu (e, f);
      var k = h.g.Ja.Vu (e, f);
      (!g && !k) ||
        f <= g + k ||
        (g && (this.Fr = e[0].substring (0, g - 1)), k &&
          (this.gs = e[0].substr (1 - k)), (this.mj = h.Pa.oA (a, g, k)));
    }
  }
  this.sj = this.getOptions (!1)[0];
  h.Pa.v.constructor.call (this, this.sj[1], c, d);
  this.Cj = this.td = this.Ec = this.fd = this.Oh = null;
};
h.g.object.S (h.Pa, h.md);
h.Pa.oa = function (a) {
  return new h.Pa (a.options, void 0, a);
};
h.Pa.prototype.cu = !0;
h.Pa.XD = 25;
h.Pa.dF = 0.45;
h.Pa.bz = 5;
h.Pa.cz = 2 * h.Pa.bz;
h.Pa.Ql = h.g.userAgent.Pl ? '\u25bc' : '\u25be';
b = h.Pa.prototype;
b.vy = 'default';
b.ln = function () {
  !this.W ().ct || (this.W ().ct && !this.I.Na)
    ? Bb (this)
    : (this.Su = this.I.ma ());
  Cb (this);
  this.Ec = h.g.j.H ('image', {}, this.Lc);
  this.W ().Oy
    ? ((this.Cj = h.g.j.H (
        'image',
        {height: this.W ().Nj + 'px', width: this.W ().Nj + 'px'},
        this.Lc
      )), this.Cj.setAttributeNS (h.g.j.Xc, 'xlink:href', this.W ().Py))
    : ((this.td = h.g.j.H ('tspan', {}, this.qc)), this.td.appendChild (
        document.createTextNode (this.I.G ? h.Pa.Ql + ' ' : ' ' + h.Pa.Ql)
      ), this.I.G
        ? this.qc.insertBefore (this.td, this.Wh)
        : this.qc.appendChild (this.td));
  this.Db && h.g.j.xb (this.Db, 'blocklyDropdownRect');
};
b.vl = function (a) {
  var c = new h.Sg ();
  Mb (c, this.I.G);
  c.yj (h.g.ib.Zj.mz);
  var d = this.getOptions (!1);
  this.Oh = null;
  for (var e = 0; e < d.length; e++) {
    var f = d[e][0], g = d[e][1];
    if ('object' == typeof f) {
      var k = new Image (f.width, f.height);
      k.src = f.src;
      k.alt = f.alt || '';
      f = k;
    }
    f = new h.nm (f);
    f.yj (h.g.ib.Zj.Cz);
    Mb (f, this.I.G);
    f.setValue (g);
    f.ik = !0;
    Lb (c, f);
    Xb (f, g == this.Xe);
    g == this.Xe && (this.Oh = f);
    Yb (f, this.UB, this);
  }
  h.g.ib.Sh (c.aa, h.g.ib.State.Vx, this.Oh ? this.Oh.ub () : '');
  this.fd = c;
  this.fd.vr = a && 'number' === typeof a.clientX
    ? new h.g.O (a.clientX, a.clientY)
    : null;
  this.fd.Ca (h.A.GB ());
  h.g.j.xb (this.fd.aa, 'blocklyDropdownMenu');
  this.W ().Ny &&
    ((a = this.I.Na ? this.I.getParent ().lq () : this.I.lq ()), (c = this.I.Na
      ? this.I.getParent ().style.Ji
      : this.I.style.Ji), h.A.je (a, c));
  h.A.sD (this, this.lB.bind (this));
  this.fd.focus ();
  this.Oh && h.g.style.jx (this.Oh.aa, this.fd.aa);
  this.lc ();
};
b.lB = function () {
  this.fd && this.fd.F ();
  this.Oh = this.fd = null;
  this.lc ();
};
b.UB = function (a) {
  h.A.Nk (this, !0);
  this.setValue (a.getValue ());
};
h.Pa.oA = function (a, c, d) {
  for (var e = [], f = 0; f < a.length; f++) {
    var g = a[f][0], k = a[f][1];
    g = g.substring (c, g.length - d);
    e[f] = [g, k];
  }
  return e;
};
b = h.Pa.prototype;
b.getOptions = function (a) {
  return 'function' == typeof this.mj
    ? ((this.cn && a) ||
        ((this.cn = this.mj.call (this)), h.Pa.Dx (this.cn)), this.cn)
    : this.mj;
};
b.Tm = function (a) {
  for (var c = !1, d = this.getOptions (!0), e = 0, f; (f = d[e]); e++)
    if (f[1] == a) {
      c = !0;
      break;
    }
  return c
    ? a
    : (this.I &&
        console.warn (
          "Cannot set the dropdown's value to an unavailable option. Block type: " +
            this.I.type +
            ', Field name: ' +
            this.name +
            ', Value: ' +
            a
        ), null);
};
b.Um = function (a) {
  h.Pa.v.Um.call (this, a);
  a = this.getOptions (!0);
  for (var c = 0, d; (d = a[c]); c++)
    d[1] == this.Xe && (this.sj = d);
};
b.lc = function () {
  this.Db &&
    (this.Db.setAttribute ('stroke', this.I.style.Ji), this.fd
      ? this.Db.setAttribute ('fill', this.I.style.Ji)
      : this.Db.setAttribute ('fill', 'transparent'));
  this.I &&
    this.td &&
    (this.td.style.fill = this.I.Na ? this.I.style.Jm : this.I.style.ah);
};
b.qj = function () {
  this.Wh.nodeValue = '';
  this.Ec.style.display = 'none';
  var a = this.sj && this.sj[0];
  if (a && 'object' == typeof a) {
    this.Ec.style.display = '';
    this.Ec.setAttributeNS (h.g.j.Xc, 'xlink:href', a.src);
    this.Ec.setAttribute ('height', a.height);
    this.Ec.setAttribute ('width', a.width);
    var c = Number (a.height);
    a = Number (a.width);
    var d = !!this.Db, e = Math.max (d ? this.W ().bt : 0, c + h.Pa.cz);
    d = d ? this.W ().Mj : 0;
    var f = this.Cj
      ? Zb (this, a + d, e / 2 - this.W ().Nj / 2)
      : h.g.j.mq (this.td, this.W ().Qg, this.W ().Rf, this.W ().Qf);
    this.pc.width = a + f + 2 * d;
    this.pc.height = e;
    var g = 0;
    this.I.G
      ? this.Ec.setAttribute ('x', d + f)
      : ((g = a + f), this.qc.setAttribute (
          'text-anchor',
          'end'
        ), this.Ec.setAttribute ('x', d));
    this.Ec.setAttribute ('y', e / 2 - c / 2);
    Eb (this, g + d, a + f);
  } else
    (this.Wh.nodeValue = Db (this)), h.g.j.xb (
      this.qc,
      'blocklyDropdownText'
    ), this.qc.setAttribute ('text-anchor', 'start'), (e = !!this
      .Db), (c = Math.max (e ? this.W ().bt : 0, this.W ().fm)), (a = h.g.j.mq (
      this.qc,
      this.W ().Qg,
      this.W ().Rf,
      this.W ().Qf
    )), (e = e ? this.W ().Mj : 0), (d = 0), this.Cj &&
      (d = Zb (this, a + e, c / 2 - this.W ().Nj / 2)), (this.pc.width =
      a + d + 2 * e), (this.pc.height = c), Eb (this, e, a);
  Fb (this);
};
function Zb (a, c, d) {
  if (!a.Cj) return 0;
  var e = a.Db ? a.W ().Mj : 0, f = a.W ().Qy, g = a.W ().Nj;
  a.Cj.setAttribute (
    'transform',
    'translate(' + (a.I.G ? e : c + f) + ',' + d + ')'
  );
  return g + f;
}
b.rq = function () {
  if (!this.sj) return null;
  var a = this.sj[0];
  return 'object' == typeof a ? a.alt : a;
};
h.Pa.Dx = function (a) {
  if (!Array.isArray (a))
    throw TypeError ('FieldDropdown options must be an array.');
  if (!a.length)
    throw TypeError ('FieldDropdown options must not be an empty array.');
  for (var c = !1, d = 0; d < a.length; ++d) {
    var e = a[d];
    Array.isArray (e)
      ? 'string' != typeof e[1]
          ? ((c = !0), console.error (
              'Invalid option[' +
                d +
                ']: Each FieldDropdown option id must be a string. Found ' +
                e[1] +
                ' in: ',
              e
            ))
          : e[0] &&
              'string' != typeof e[0] &&
              'string' != typeof e[0].src &&
              ((c = !0), console.error (
                'Invalid option[' +
                  d +
                  ']: Each FieldDropdown option must have a string label or image description. Found' +
                  e[0] +
                  ' in: ',
                e
              ))
      : ((c = !0), console.error (
          'Invalid option[' +
            d +
            ']: Each FieldDropdown option must be an array. Found: ',
          e
        ));
  }
  if (c) throw TypeError ('Found invalid FieldDropdown options.');
};
h.Pa.prototype.gd = function (a) {
  if (this.fd) {
    if (a === h.navigation.co) return Tb (this.fd), !0;
    if (a === h.navigation.bo) return Rb (this.fd), !0;
  }
  return h.Pa.v.gd.call (this, a);
};
h.ad.register ('field_dropdown', h.Pa);
h.g.Rect = function (a, c, d, e) {
  this.top = a;
  this.bottom = c;
  this.left = d;
  this.right = e;
};
h.g.Rect.prototype.contains = function (a, c) {
  return a >= this.left && a <= this.right && c >= this.top && c <= this.bottom;
};
h.Wb = function (a) {
  this.o = a;
  this.eh = [];
  this.kh = null;
  if (!(0 >= this.o.options.Cn)) {
    a = new h.wc ({
      scrollbars: !0,
      parentWorkspace: this.o,
      rtl: this.o.G,
      oneBasedIndex: this.o.options.Mn,
      renderer: this.o.options.Kr,
      rendererOverrides: this.o.options.Lr,
    });
    if (this.o.rh) {
      a.cb = this.o.cb == h.Xg ? h.bk : h.Xg;
      if (!h.Ao) throw Error ('Missing require for Blockly.HorizontalFlyout');
      this.kh = new h.Ao (a);
    } else {
      a.cb = this.o.cb == h.Wg ? h.Rd : h.Wg;
      if (!h.$g) throw Error ('Missing require for Blockly.VerticalFlyout');
      this.kh = new h.$g (a);
    }
    E (this.o, this.OC.bind (this));
  }
};
b = h.Wb.prototype;
b.dk = 47;
b.Sl = 44;
b.ni = 16;
b.pz = 20;
b.vt = 20;
b.lm = 10;
b.Zo = 0;
b.$o = 32;
b.Wy = 0.1;
h.Wb.Yx = 80;
h.Wb.Fs = 4;
h.Wb.Jt = 0.4;
h.Wb.Bz = 0.8;
h.Wb.wt = 45;
b = h.Wb.prototype;
b.tn = !1;
b.$q = 0;
b.L = null;
b.Vn = null;
b.Mq = 0;
b.rg = 0;
b.tw = 0;
b.yx = 0;
b.Fa = function () {
  this.L = h.g.j.H ('g', {class: 'blocklyTrash'}, null);
  var a = String (Math.random ()).substring (2);
  var c = h.g.j.H ('clipPath', {id: 'blocklyTrashBodyClipPath' + a}, this.L);
  h.g.j.H ('rect', {width: this.dk, height: this.Sl, y: this.ni}, c);
  var d = h.g.j.H (
    'image',
    {
      width: h.ui.width,
      x: -this.Zo,
      height: h.ui.height,
      y: -this.$o,
      'clip-path': 'url(#blocklyTrashBodyClipPath' + a + ')',
    },
    this.L
  );
  d.setAttributeNS (h.g.j.Xc, 'xlink:href', this.o.options.Qn + h.ui.url);
  c = h.g.j.H ('clipPath', {id: 'blocklyTrashLidClipPath' + a}, this.L);
  h.g.j.H ('rect', {width: this.dk, height: this.ni}, c);
  this.Vn = h.g.j.H (
    'image',
    {
      width: h.ui.width,
      x: -this.Zo,
      height: h.ui.height,
      y: -this.$o,
      'clip-path': 'url(#blocklyTrashLidClipPath' + a + ')',
    },
    this.L
  );
  this.Vn.setAttributeNS (h.g.j.Xc, 'xlink:href', this.o.options.Qn + h.ui.url);
  h.ta (this.L, 'mouseup', this, this.click);
  h.Xb (d, 'mouseover', this, this.CC);
  h.Xb (d, 'mouseout', this, this.AC);
  this.hp ();
  return this.L;
};
b.va = function (a) {
  0 < this.o.options.Cn &&
    (h.g.j.dj (this.kh.Fa ('svg'), y (this.o)), this.kh.va (this.o));
  this.Zn = this.pz + a;
  va (this, !1);
  return this.Zn + this.Sl + this.ni;
};
b.F = function () {
  this.L && (h.g.j.removeNode (this.L), (this.L = null));
  this.o = this.Vn = null;
  clearTimeout (this.Mq);
};
b.position = function () {
  if (this.Zn) {
    var a = this.o.bd ();
    a &&
      ((this.tw = a.cb == h.Rd || (this.o.rh && !this.o.G)
        ? a.qb + a.kc - this.dk - this.vt - h.Ea.bc
        : this.vt + h.Ea.bc), (this.yx = a.cb == h.bk
        ? this.Zn
        : a.Ab + a.xc - (this.Sl + this.ni) - this.Zn), this.L.setAttribute (
        'transform',
        'translate(' + this.tw + ',' + this.yx + ')'
      ));
  }
};
b.dn = function () {
  if (!this.L) return null;
  var a = this.L.getBoundingClientRect (), c = a.top + this.$o - this.lm;
  a = a.left + this.Zo - this.lm;
  return new h.g.Rect (
    c,
    c + this.ni + this.Sl + 2 * this.lm,
    a,
    a + this.dk + 2 * this.lm
  );
};
function va (a, c) {
  a.tn != c && (clearTimeout (a.Mq), (a.tn = c), a.hp ());
}
b.hp = function () {
  var a = 1 / (h.Wb.Fs + 1);
  this.rg += this.tn ? a : -a;
  this.rg = Math.min (Math.max (this.rg, this.$q), 1);
  $b (this, this.rg * h.Wb.wt);
  this.L.style.opacity = h.Wb.Jt + this.rg * (h.Wb.Bz - h.Wb.Jt);
  this.rg > this.$q &&
    1 > this.rg &&
    (this.Mq = setTimeout (this.hp.bind (this), h.Wb.Yx / h.Wb.Fs));
};
function $b (a, c) {
  var d = a.o.cb == h.Wg || (a.o.rh && a.o.G);
  a.Vn.setAttribute (
    'transform',
    'rotate(' + (d ? -c : c) + ',' + (d ? 4 : a.dk - 4) + ',' + (a.ni - 2) + ')'
  );
}
b.close = function () {
  va (this, !1);
};
b.click = function () {
  if (this.eh.length) {
    for (var a = [], c = 0, d; (d = this.eh[c]); c++)
      a[c] = h.M.Hg (d);
    this.kh.show (a);
  }
};
b.CC = function () {
  this.eh.length && va (this, !0);
};
b.AC = function () {
  va (this, !1);
};
b.OC = function (a) {
  if (
    !(0 >= this.o.options.Cn) &&
    a.type == h.h.Js &&
    'shadow' != a.nr.tagName.toLowerCase ()
  ) {
    for (var c = (a = a.nr.cloneNode (!0)); c; ) {
      c.removeAttribute &&
        (c.removeAttribute ('x'), c.removeAttribute ('y'), c.removeAttribute (
          'id'
        ), c.removeAttribute ('disabled'), 'comment' == c.nodeName &&
          (c.removeAttribute ('h'), c.removeAttribute ('w'), c.removeAttribute (
            'pinned'
          )));
      var d = c.firstChild || c.nextSibling;
      if (!d)
        for (d = c.parentNode; d; ) {
          if (d.nextSibling) {
            d = d.nextSibling;
            break;
          }
          d = d.parentNode;
        }
      c = d;
    }
    a = h.M.Zd (a);
    if (-1 == this.eh.indexOf (a)) {
      for (this.eh.unshift (a); this.eh.length > this.o.options.Cn; )
        this.eh.pop ();
      this.$q = a = this.Wy;
      this.tn || $b (this, a * h.Wb.wt);
    }
  }
};
h.hc = Object.create (null);
h.ga = function (a, c) {
  this.I = a;
  this.type = c;
};
h.ga.Xl = 0;
h.ga.Wt = 1;
h.ga.Zt = 2;
h.ga.Yt = 3;
h.ga.Ut = 4;
h.ga.Vt = 5;
h.ga.Xt = 6;
b = h.ga.prototype;
b.na = null;
b.$f = !1;
b.nf = null;
b.Te = null;
b.x = 0;
b.y = 0;
b.Wd = function (a) {
  var c = this, d = c.R (), e = a.R ();
  a.isConnected () && a.disconnect ();
  if (c.isConnected ()) {
    var f = c.la (), g = c.Te;
    c.Te = null;
    if (f.Na) (g = h.M.Xf (f)), f.F (!1), (f = null);
    else if (c.type == h.Ya) {
      if (!f.K)
        throw Error ('Orphan block does not have an output connection.');
      var k = h.ga.rw (e, f);
      k && (f.K.connect (k), (f = null));
    } else if (c.type == h.Ka) {
      if (!f.P)
        throw Error ('Orphan block does not have a previous connection.');
      for (k = e; k.U; ) {
        var l = u (k);
        if (l && !l.Na) k = l;
        else {
          na (f.P, k.U) && (k.U.connect (f.P), (f = null));
          break;
        }
      }
    }
    if (f && (c.disconnect (), h.h.ac)) {
      var m = h.h.Kb ();
      setTimeout (function () {
        f.B &&
          !f.getParent () &&
          (h.h.ka (m), f.K ? f.K.In (c) : f.P && f.P.In (c), h.h.ka (!1));
      }, h.oo);
    }
    c.Te = g;
  }
  var n;
  h.h.isEnabled () && (n = new h.h.Ij (e));
  h.ga.OA (c, a);
  e.xj (d);
  n && (n.Mh (), h.h.Ia (n));
};
b.F = function () {
  if (this.isConnected ()) {
    this.Te = null;
    var a = this.la ();
    a.Na ? a.F (!1) : x (a);
  }
  this.$f = !0;
};
b.R = function () {
  return this.I;
};
function B (a) {
  return a.type == h.Ya || a.type == h.Ka;
}
b.isConnected = function () {
  return !!this.na;
};
function mb (a, c) {
  if (!c) return h.ga.Yt;
  if (B (a)) var d = a.I, e = c.R ();
  else (e = a.I), (d = c.R ());
  return d && d == e
    ? h.ga.Wt
    : c.type != h.pi[a.type]
        ? h.ga.Zt
        : d && e && d.B !== e.B
            ? h.ga.Vt
            : na (a, c) ? (d.Na && !e.Na ? h.ga.Xt : h.ga.Xl) : h.ga.Ut;
}
function nb (a, c) {
  switch (mb (a, c)) {
    case h.ga.Xl:
      break;
    case h.ga.Wt:
      throw Error ('Attempted to connect a block to itself.');
    case h.ga.Vt:
      throw Error ('Blocks not on same workspace.');
    case h.ga.Zt:
      throw Error ('Attempt to connect incompatible types.');
    case h.ga.Yt:
      throw Error ('Target connection is null.');
    case h.ga.Ut:
      throw Error (
        'Connection checks failed. ' +
          (a + ' expected ' + a.nf + ', found ' + c.nf)
      );
    case h.ga.Xt:
      throw Error ('Connecting non-shadow to shadow block.');
    default:
      throw Error ('Unknown connection failure: this should never happen!');
  }
}
b.on = function (a) {
  if (a.I.og () || mb (this, a) != h.ga.Xl) return !1;
  switch (a.type) {
    case h.Pd:
      return this.na || -1 != h.Ti.indexOf (a)
        ? (a = !1)
        : a.na
            ? ((a = a.la ()), (a = a.og () ? !(a.P && a.P.la ()) : !1))
            : (a = !0), a;
    case h.Od:
      if ((a.isConnected () && !a.la ().og ()) || this.isConnected ())
        return !1;
      break;
    case h.Ya:
      if (a.isConnected () && !a.la ().Pc () && !a.la ().Na) return !1;
      break;
    case h.Ka:
      if (a.isConnected () && !this.I.U && !a.la ().Na && a.la ().U) return !1;
      break;
    default:
      throw Error ('Unknown connection type in isConnectionAllowed');
  }
  return -1 != h.Ti.indexOf (a) ? !1 : !0;
};
b.In = function () {};
b.connect = function (a) {
  if (this.na != a) {
    nb (this, a);
    var c = h.h.Kb ();
    c || h.h.ka (!0);
    B (this) ? this.Wd (a) : a.Wd (this);
    c || h.h.ka (!1);
  }
};
h.ga.OA = function (a, c) {
  if (!a || !c) throw Error ('Cannot connect null connections.');
  a.na = c;
  c.na = a;
};
h.ga.uD = function (a, c) {
  for (var d = null, e = 0; e < a.N.length; e++) {
    var f = a.N[e].connection;
    if (f && f.type == h.Ya && na (c.K, f)) {
      if (d) return null;
      d = f;
    }
  }
  return d;
};
h.ga.rw = function (a, c) {
  for (var d; (d = h.ga.uD (a, c)); )
    if (((a = d.la ()), !a || a.Na)) return d;
  return null;
};
b = h.ga.prototype;
b.disconnect = function () {
  var a = this.na;
  if (!a) throw Error ('Source connection not connected.');
  if (a.na != this)
    throw Error ('Target connection not connected to source connection.');
  if (B (this)) {
    var c = this.I;
    var d = a.R ();
    a = this;
  } else (c = a.R ()), (d = this.I);
  var e = h.h.Kb ();
  e || h.h.ka (!0);
  this.Np (c, d);
  a.Or ();
  e || h.h.ka (!1);
};
b.Np = function (a, c) {
  var d;
  h.h.isEnabled () && (d = new h.h.Ij (c));
  this.na = this.na.na = null;
  c.xj (null);
  d && (d.Mh (), h.h.Ia (d));
};
b.Or = function () {
  var a = this.R (), c = this.Te;
  if (a.B && c && h.h.ac)
    if (((a = h.M.Si (c, a.B)), a.K)) this.connect (a.K);
    else if (a.P) this.connect (a.P);
    else
      throw Error ('Child block does not have output or previous statement.');
};
b.la = function () {
  return this.isConnected () ? this.na.R () : null;
};
function na (a, c) {
  if (!a.nf || !c.nf) return !0;
  for (var d = 0; d < a.nf.length; d++)
    if (-1 != c.nf.indexOf (a.nf[d])) return !0;
  return !1;
}
b.Jw = function () {
  !this.isConnected () ||
    (this.na && na (this, this.na)) ||
    x (B (this) ? this.la () : this.I);
};
b.tj = function (a) {
  a
    ? (Array.isArray (a) || (a = [a]), (this.nf = a), this.Jw ())
    : (this.nf = null);
};
b.Fw = function () {
  return [];
};
b.Le = function () {
  for (var a = null, c = this.I, d = c.N, e = 0; e < c.N.length; e++)
    if (d[e].connection === this) {
      a = d[e];
      break;
    }
  return a;
};
b.toString = function () {
  var a = this.I;
  if (a)
    if (a.K == this) var c = 'Output Connection of ';
    else if (a.P == this) c = 'Previous Connection of ';
    else if (a.U == this) c = 'Next Connection of ';
    else {
      c = null;
      for (var d = 0, e; (e = a.N[d]); d++)
        if (e.connection == this) {
          c = e;
          break;
        }
      if (c) c = 'Input "' + c.name + '" connection on ';
      else
        return console.warn (
          'Connection not actually connected to sourceBlock_'
        ), 'Orphan Connection';
    }
  else return 'Orphan Connection';
  d = a.type ? '"' + a.type + '" block' : 'Block';
  a.id && (d += ' (id="' + a.id + '")');
  return c + d;
};
h.ra = {};
h.ra.Hj = {};
h.ra.register = function (a, c) {
  if ('string' != typeof a || '' == a.trim ())
    throw Error ('Error: Invalid extension name "' + a + '"');
  if (h.ra.Hj[a])
    throw Error ('Error: Extension "' + a + '" is already registered.');
  if ('function' != typeof c)
    throw Error ('Error: Extension "' + a + '" must be a function');
  h.ra.Hj[a] = c;
};
h.ra.DH = function (a, c) {
  if (!c || 'object' != typeof c)
    throw Error ('Error: Mixin "' + a + '" must be a object');
  h.ra.register (a, function () {
    this.Ff (c);
  });
};
h.ra.EH = function (a, c, d, e) {
  var f = 'Error when registering mutator "' + a + '": ';
  h.ra.Pu (f, c.tf, 'domToMutation');
  h.ra.Pu (f, c.Ed, 'mutationToDom');
  var g = h.ra.Ru (c, f);
  if (d && 'function' != typeof d)
    throw Error ('Extension "' + a + '" is not a function');
  h.ra.register (a, function () {
    if (g) {
      if (!h.yz) throw Error (f + 'Missing require for Blockly.Mutator');
      this.nx (new h.yz (e || []));
    }
    this.Ff (c);
    d && d.apply (this);
  });
};
h.ra.unregister = function (a) {
  h.ra.Hj[a]
    ? delete h.ra.Hj[a]
    : console.warn (
        'No extension mapping for name "' + a + '" found to unregister'
      );
};
h.ra.apply = function (a, c, d) {
  var e = h.ra.Hj[a];
  if ('function' != typeof e)
    throw Error ('Error: Extension "' + a + '" not found.');
  if (d) h.ra.EA (a, c);
  else var f = h.ra.oq (c);
  e.apply (c);
  if (d) h.ra.BA ('Error after applying mutator "' + a + '": ', c);
  else if (!h.ra.HC (f, c))
    throw Error (
      'Error when applying extension "' +
        a +
        '": mutation properties changed when applying a non-mutator extension.'
    );
};
h.ra.Pu = function (a, c, d) {
  if (!c) throw Error (a + 'missing required property "' + d + '"');
  if ('function' != typeof c)
    throw Error (a + '" required property "' + d + '" must be a function');
};
h.ra.EA = function (a, c) {
  if (h.ra.oq (c).length)
    throw Error (
      'Error: tried to apply mutation "' +
        a +
        '" to a block that already has mutator functions.  Block id: ' +
        c.id
    );
};
h.ra.Ru = function (a, c) {
  var d = void 0 !== a.Bp, e = void 0 !== a.Gp;
  if (d && e) {
    if ('function' != typeof a.Bp)
      throw Error (c + 'compose must be a function.');
    if ('function' != typeof a.Gp)
      throw Error (c + 'decompose must be a function.');
    return !0;
  }
  if (d || e)
    throw Error (c + 'Must have both or neither of "compose" and "decompose"');
  return !1;
};
h.ra.BA = function (a, c) {
  if ('function' != typeof c.tf)
    throw Error (a + 'Applying a mutator didn\'t add "domToMutation"');
  if ('function' != typeof c.Ed)
    throw Error (a + 'Applying a mutator didn\'t add "mutationToDom"');
  h.ra.Ru (c, a);
};
h.ra.oq = function (a) {
  var c = [];
  void 0 !== a.tf && c.push (a.tf);
  void 0 !== a.Ed && c.push (a.Ed);
  void 0 !== a.Bp && c.push (a.Bp);
  void 0 !== a.Gp && c.push (a.Gp);
  return c;
};
h.ra.HC = function (a, c) {
  c = h.ra.oq (c);
  if (c.length != a.length) return !1;
  for (var d = 0; d < c.length; d++)
    if (a[d] != c[d]) return !1;
  return !0;
};
h.ra.QG = function (a, c) {
  var d = [];
  'object' == typeof document &&
    h.g.ix (function () {
      for (var e in c) h.g.Qu (c[e]);
    });
  return function () {
    this.type &&
      -1 == d.indexOf (this.type) &&
      (h.ra.CA (this, a, c), d.push (this.type));
    this.ke (
      function () {
        var e = String (Ya (this, a)), f = c[e];
        null == f
          ? -1 == d.indexOf (this.type) &&
              ((e =
                'No tooltip mapping for value ' + e + ' of field ' + a), null !=
                this.type &&
                (e += ' of block type ' + this.type), console.warn (e + '.'))
          : (f = h.g.Sc (f));
        return f;
      }.bind (this)
    );
  };
};
h.ra.CA = function (a, c, d) {
  var e = ba (a, c);
  if ('function' != typeof e.mj) {
    e = e.getOptions ();
    for (var f = 0; f < e.length; ++f) {
      var g = e[f][1];
      null == d[g] &&
        console.warn (
          'No tooltip mapping for value ' +
            g +
            ' of field ' +
            c +
            ' of block type ' +
            a.type
        );
    }
  }
};
h.ra.SG = function (a, c) {
  'object' == typeof document &&
    h.g.ix (function () {
      h.g.Qu (a);
    });
  return function () {
    this.ke (
      function () {
        var d = ba (this, c);
        return h.g.Sc (a).replace ('%1', d ? Gb (d) : '');
      }.bind (this)
    );
  };
};
h.ra.oB = function () {
  this.HD = this.me;
  this.ke (
    function () {
      var a = this.getParent ();
      return (a && qa (a) && a.me) || this.HD;
    }.bind (this)
  );
};
h.ra.register ('parent_tooltip_when_inline', h.ra.oB);
h.nd = function (a, c, d) {
  this.Fm = null;
  null == a && (a = '');
  h.nd.v.constructor.call (this, a, null, d);
  d || (this.Fm = c || null);
};
h.g.object.S (h.nd, h.md);
h.nd.oa = function (a) {
  var c = h.g.Sc (a.text);
  return new h.nd (c, void 0, a);
};
h.nd.prototype.Lj = !1;
h.nd.prototype.lk = function (a) {
  h.nd.v.lk.call (this, a);
  this.Fm = a['class'];
};
h.nd.prototype.ln = function () {
  Cb (this);
  this.Fm && h.g.j.xb (this.qc, this.Fm);
};
h.nd.prototype.Tm = function (a) {
  return null === a || void 0 === a ? null : String (a);
};
h.ad.register ('field_label', h.nd);
h.st = function (a, c, d, e) {
  if (a != h.cf && !c)
    throw Error ('Value inputs and statement inputs must have non-empty name.');
  this.type = a;
  this.name = c;
  this.I = d;
  this.connection = e;
  this.Sa = [];
};
b = h.st.prototype;
b.align = h.io;
b.Jg = !0;
b.R = function () {
  return this.I;
};
function I (a, c, d) {
  ac (a, a.Sa.length, c, d);
  return a;
}
function ac (a, c, d, e) {
  if (0 > c || c > a.Sa.length) throw Error ('index ' + c + ' out of bounds.');
  if (!(d || ('' == d && e))) return c;
  'string' == typeof d && (d = new h.nd (d));
  if (d.I) throw Error ('Field already bound to a block.');
  d.I = a.I;
  a.I.ca && d.va ();
  d.name = e;
  d.Fr && (c = ac (a, c, d.Fr));
  a.Sa.splice (c, 0, d);
  ++c;
  d.gs && (c = ac (a, c, d.gs));
  a.I.ca && (a.I.Ca (), a.I.yc ());
  return c;
}
b.isVisible = function () {
  return this.Jg;
};
b.cc = function (a) {
  var c = [];
  if (this.Jg == a) return c;
  for (
    var d = (this.Jg = a) ? 'block' : 'none', e = 0, f;
    (f = this.Sa[e]);
    e++
  )
    f.cc (a);
  if (this.connection) {
    if (a) c = bc (this.connection);
    else if (((e = this.connection), cc (e, !1), e.na))
      for ((e = p (e.la (), !1)), (f = 0); f < e.length; f++) {
        for (var g = e[f], k = g.ce (!0), l = 0; l < k.length; l++)
          cc (k[l], !1);
        g = ra (g);
        for (l = 0; l < g.length; l++)
          g[l].cc (!1);
      }
    if ((e = this.connection.la ()))
      (e.ma ().style.display = d), a || (e.ca = !1);
  }
  return c;
};
b.Zk = function () {
  for (var a = 0, c; (c = this.Sa[a]); a++)
    c.Zk ();
};
b.tj = function (a) {
  if (!this.connection) throw Error ('This input does not have a connection.');
  this.connection.tj (a);
};
b.va = function () {
  if (this.I.B.ca) for (var a = 0; a < this.Sa.length; a++) this.Sa[a].va ();
};
b.F = function () {
  for (var a = 0, c; (c = this.Sa[a]); a++)
    c.F ();
  this.connection && this.connection.F ();
  this.I = null;
};
h.Ul = function (a, c, d) {
  if (h.Generator && 'undefined' != typeof h.Generator.prototype[c])
    throw Error (
      'Block prototypeName "' +
        c +
        '" conflicts with Blockly.Generator members.'
    );
  this.id = d && !a.Cc (d) ? d : h.g.wf ();
  a.op[this.id] = this;
  this.P = this.U = this.K = null;
  this.N = [];
  this.zf = void 0;
  this.disabled = !1;
  this.me = '';
  this.contextMenu = !0;
  this.Pe = null;
  this.pf = [];
  this.wv = this.Dw = this.iv = !0;
  this.De = this.Na = !1;
  this.Vd = {text: null, Rw: !1, size: new h.g.hf (160, 80)};
  this.Mx = new h.g.O (0, 0);
  this.B = a;
  this.fe = a.Bf;
  this.G = a.G;
  this.Tk = !1;
  this.Me = void 0;
  if (c) {
    this.type = c;
    d = h.hc[c];
    if (!d || 'object' != typeof d)
      throw TypeError ('Unknown block type: ' + c);
    h.g.object.Ff (this, d);
  }
  a.Fj.push (this);
  a.ne[this.type] || (a.ne[this.type] = []);
  a.ne[this.type].push (this);
  'function' == typeof this.va && this.va ();
  this.hC = this.zf;
  if (h.h.isEnabled ()) {
    (a = h.h.Kb ()) || h.h.ka (!0);
    try {
      h.h.Ia (new h.h.Vl (this));
    } finally {
      a || h.h.ka (!1);
    }
  }
  if ('function' == typeof this.onchange) {
    if ((a = this.onchange) && 'function' != typeof a)
      throw Error ('onchange must be a function.');
    this.cl && db (this.B, this.cl);
    if ((this.onchange = a)) (this.cl = a.bind (this)), E (this.B, this.cl);
  }
};
b = h.Ul.prototype;
b.data = null;
b.$f = !1;
b.ud = '#000000';
b.Al = null;
b.F = function (a) {
  if (this.B) {
    this.cl && db (this.B, this.cl);
    x (this, a);
    h.h.isEnabled () && h.h.Ia (new h.h.ly (this));
    h.h.disable ();
    try {
      if (this.B) {
        $a (this.B, this);
        var c = this.B;
        c.ne[this.type].splice (c.ne[this.type].indexOf (this), 1);
        c.ne[this.type].length || delete c.ne[this.type];
        delete this.B.op[this.id];
        this.B = null;
      }
      h.selected == this && (h.selected = null);
      for (var d = this.pf.length - 1; 0 <= d; d--)
        this.pf[d].F (!1);
      d = 0;
      for (var e; (e = this.N[d]); d++)
        e.F ();
      this.N.length = 0;
      var f = this.ce (!0);
      d = 0;
      for (var g; (g = f[d]); d++)
        g.F ();
    } finally {
      h.h.enable (), (this.$f = !0);
    }
  }
};
function x (a, c) {
  if (a.K) {
    var d = null;
    a.K.isConnected () && ((d = a.K.na), a.K.disconnect ());
    if (d && c) {
      a: {
        c = null;
        for (var e = 0; e < a.N.length; e++) {
          var f = a.N[e].connection;
          if (f && f.type == h.Ya && f.na) {
            if (c) {
              a = null;
              break a;
            }
            c = f;
          }
        }
        a = c;
      }
      a &&
        a.isConnected () &&
        !a.la ().Na &&
        ((a = a.na), a.disconnect (), na (a, d) ? d.connect (a) : a.In (d));
    }
  } else
    a.P &&
      ((d = null), a.P.isConnected () &&
        ((d = a.P.na), a.P.disconnect ()), (e = u (a)), c &&
        e &&
        !e.Na &&
        ((a = a.U.na), a.disconnect (), d && na (d, a) && d.connect (a)));
}
b.ce = function () {
  var a = [];
  this.K && a.push (this.K);
  this.P && a.push (this.P);
  this.U && a.push (this.U);
  for (var c = 0, d; (d = this.N[c]); c++)
    d.connection && a.push (d.connection);
  return a;
};
b.xn = function () {
  for (var a = this.U; a; ) {
    var c = a.la ();
    if (!c) return a;
    a = c.U;
  }
  return null;
};
b.yc = function () {
  console.warn (
    'Not expected to reach Block.bumpNeighbours function. BlockSvg.bumpNeighbours was expected to be called instead.'
  );
};
b.getParent = function () {
  return this.Pe;
};
function dc (a) {
  do {
    var c = a;
    a = a.getParent ();
    if (!a) return null;
  } while (u (a) == c);
  return a;
}
function u (a) {
  return a.U && a.U.la ();
}
b.Dc = function () {
  var a = this;
  do {
    var c = a;
    a = c.Pe;
  } while (a);
  return c;
};
function Va (a, c) {
  if (!c) return a.pf;
  c = [];
  for (var d = 0, e; (e = a.N[d]); d++)
    e.connection && (e = e.connection.la ()) && c.push (e);
  (a = u (a)) && c.push (a);
  return c;
}
b.xj = function (a) {
  if (a != this.Pe) {
    if (this.Pe) {
      h.g.Cm (this.Pe.pf, this);
      if (this.P && this.P.isConnected ())
        throw Error ('Still connected to previous block.');
      if (this.K && this.K.isConnected ())
        throw Error ('Still connected to parent block.');
      this.Pe = null;
    } else $a (this.B, this);
    (this.Pe = a) ? a.pf.push (this) : this.B.Fj.push (this);
  }
};
function p (a, c) {
  var d = [a];
  a = Va (a, c);
  for (var e, f = 0; (e = a[f]); f++)
    d.push.apply (d, p (e, c));
  return d;
}
b.dd = function () {
  return this.iv && !this.Na && !(this.B && this.B.options.readOnly);
};
b.Pc = function () {
  return this.Dw && !this.Na && !(this.B && this.B.options.readOnly);
};
b.Ur = function (a) {
  this.Dw = a;
};
b.Xr = function (a) {
  this.Na = a;
};
b.og = function () {
  return this.Tk;
};
b.lx = function (a) {
  this.Tk = a;
};
b.Ad = function () {
  return this.wv && !(this.B && this.B.options.readOnly);
};
b.Tr = function (a) {
  this.wv = a;
  a = 0;
  for (var c; (c = this.N[a]); a++)
    for (var d = 0, e; (e = c.Sa[d]); d++)
      zb (e);
};
b.nq = function (a, c) {
  var d = this.ce (!0);
  a = a.ce (!0);
  if (d.length != a.length)
    throw Error ('Connection lists did not match in length.');
  for (var e = 0; e < a.length; e++)
    if (a[e] == c) return d[e];
  return null;
};
b.ke = function (a) {
  this.me = a;
};
b.lq = function () {
  return this.ud;
};
b.je = function (a) {
  this.ud = h.g.On (a).Mk;
};
b.Th = function (a) {
  this.Al = a;
};
function ba (a, c) {
  for (var d = 0, e; (e = a.N[d]); d++)
    for (var f = 0, g; (g = e.Sa[f]); f++)
      if (g.name == c) return g;
  return null;
}
function Wa (a) {
  for (var c = 0, d; (d = a.N[c]); c++)
    for (var e = 0; d.Sa[e]; e++);
  return [];
}
function Ya (a, c) {
  return (a = ba (a, c)) ? a.getValue () : null;
}
b.Rh = function (a, c) {
  if (a) {
    void 0 === c && (c = null);
    if (!this.P) {
      if (this.K)
        throw Error (
          'Remove output connection prior to adding previous connection.'
        );
      this.P = this.Yk (h.Pd);
    }
    this.P.tj (c);
  } else if (this.P) {
    if (this.P.isConnected ())
      throw Error (
        'Must disconnect previous statement before removing connection.'
      );
    this.P.F ();
    this.P = null;
  }
};
b.wj = function (a, c) {
  if (a)
    void 0 === c && (c = null), this.U || (this.U = this.Yk (h.Ka)), this.U.tj (
      c
    );
  else if (this.U) {
    if (this.U.isConnected ())
      throw Error (
        'Must disconnect next statement before removing connection.'
      );
    this.U.F ();
    this.U = null;
  }
};
b.Vr = function (a, c) {
  if (a) {
    void 0 === c && (c = null);
    if (!this.K) {
      if (this.P)
        throw Error (
          'Remove previous connection prior to adding output connection.'
        );
      this.K = this.Yk (h.Od);
    }
    this.K.tj (c);
  } else if (this.K) {
    if (this.K.isConnected ())
      throw Error ('Must disconnect output value before removing connection.');
    this.K.F ();
    this.K = null;
  }
};
b.Qh = function (a) {
  this.zf != a &&
    (h.h.Ia (new h.h.di (this, 'inline', null, this.zf, a)), (this.zf = a));
};
function qa (a) {
  if (void 0 != a.zf) return a.zf;
  for (var c = 1; c < a.N.length; c++)
    if (a.N[c - 1].type == h.cf && a.N[c].type == h.cf) return !1;
  for (c = 1; c < a.N.length; c++)
    if (a.N[c - 1].type == h.Ya && a.N[c].type == h.cf) return !0;
  return !1;
}
b.isEnabled = function () {
  return !this.disabled;
};
b.Se = function (a) {
  this.isEnabled () != a &&
    (h.h.Ia (
      new h.h.di (this, 'disabled', null, this.disabled, !a)
    ), (this.disabled = !a));
};
function ec (a) {
  for (a = dc (a); a; ) {
    if (a.disabled) return !0;
    a = dc (a);
  }
  return !1;
}
b.isCollapsed = function () {
  return this.De;
};
b.Eg = function (a) {
  this.De != a &&
    (h.h.Ia (new h.h.di (this, 'collapsed', null, this.De, a)), (this.De = a));
};
b.toString = function (a, c) {
  var d = [], e = c || '?';
  if (this.De) d.push (Gb (da (this, '_TEMP_COLLAPSED_INPUT').Sa[0]));
  else
    for (var f = 0, g; (g = this.N[f]); f++) {
      for (var k = 0, l; (l = g.Sa[k]); k++)
        d.push (Gb (l));
      g.connection &&
        ((g = g.connection.la ())
          ? d.push (g.toString (void 0, c))
          : d.push (e));
    }
  d = d.join (' ').trim () || '???';
  a && d.length > a && (d = d.substring (0, a - 3) + '...');
  return d;
};
function fc (a, c) {
  return a.lf (h.cf, c || '');
}
function gc (a, c) {
  var d = c.type ? 'Block "' + c.type + '": ' : '';
  if (c.output && c.previousStatement)
    throw Error (d + 'Must not have both an output and a previousStatement.');
  c.style && c.style.Me && ((a.Me = c.style.Me), (c.style = null));
  if (c.style && c.colour)
    throw Error (d + 'Must not have both a colour and a style.');
  if (c.style) {
    var e = c.style;
    try {
      a.Th (e);
    } catch (H) {
      console.warn (d + 'Style does not exist: ', e);
    }
  } else if ('colour' in c)
    if (void 0 === c.colour) console.warn (d + 'Undefined colour value.');
    else {
      e = c.colour;
      try {
        a.je (e);
      } catch (H) {
        console.warn (d + 'Illegal colour value: ', e);
      }
    }
  for (e = 0; void 0 !== c['message' + e]; ) {
    for (
      var f = a,
        g = c['args' + e] || [],
        k = c['lastDummyAlign' + e],
        l = d,
        m = h.g.FD (c['message' + e]),
        n = [],
        q = 0,
        r = [],
        t = 0;
      t < m.length;
      t++
    ) {
      var v = m[t];
      if ('number' == typeof v) {
        if (0 >= v || v > g.length)
          throw Error (
            'Block "' + f.type + '": Message index %' + v + ' out of range.'
          );
        if (n[v])
          throw Error (
            'Block "' + f.type + '": Message index %' + v + ' duplicated.'
          );
        n[v] = !0;
        q++;
        r.push (g[v - 1]);
      } else (v = v.trim ()) && r.push (v);
    }
    if (q != g.length)
      throw Error (
        'Block "' +
          f.type +
          '": Message does not reference all ' +
          g.length +
          ' arg(s).'
      );
    r.length &&
      ('string' == typeof r[r.length - 1] ||
        h.g.Ja.startsWith (r[r.length - 1].type, 'field_')) &&
      ((t = {type: 'input_dummy'}), k && (t.align = k), r.push (t));
    k = {LEFT: h.io, RIGHT: h.Ds, CENTRE: h.ho, CENTER: h.ho};
    g = [];
    for (t = 0; t < r.length; t++)
      if (((n = r[t]), 'string' == typeof n)) g.push ([n, void 0]);
      else {
        m = q = null;
        do
          if (((v = !1), 'string' == typeof n)) q = new h.nd (n);
          else
            switch (n.type) {
              case 'input_value':
                m = f.lf (h.Ya, n.name);
                break;
              case 'input_statement':
                m = f.lf (h.Ka, n.name);
                break;
              case 'input_dummy':
                m = fc (f, n.name);
                break;
              default:
                (q = h.ad.oa (n)), !q && n.alt && ((n = n.alt), (v = !0));
            }
        while (v);
        if (q) g.push ([q, n.name]);
        else if (m) {
          n.check && m.tj (n.check);
          n.align &&
            ((q = k[n.align.toUpperCase ()]), void 0 === q
              ? console.warn (l + 'Illegal align value: ', n.align)
              : ((n = m), (n.align = q), n.I.ca && n.I.Ca ()));
          for (n = 0; n < g.length; n++)
            I (m, g[n][0], g[n][1]);
          g.length = 0;
        }
      }
    e++;
  }
  void 0 !== c.inputsInline && a.Qh (c.inputsInline);
  void 0 !== c.output && a.Vr (!0, c.output);
  void 0 !== c.previousStatement && a.Rh (!0, c.previousStatement);
  void 0 !== c.nextStatement && a.wj (!0, c.nextStatement);
  void 0 !== c.tooltip && ((e = c.tooltip), (e = h.g.Sc (e)), a.ke (e));
  void 0 !== c.enableContextMenu &&
    ((e = c.enableContextMenu), (a.contextMenu = !!e));
  void 0 !== c.helpUrl && ((e = c.helpUrl), (e = h.g.Sc (e)), (a.$i = e));
  'string' == typeof c.extensions &&
    (console.warn (
      d +
        "JSON attribute 'extensions' should be an array of strings. Found raw string in JSON for '" +
        c.type +
        "' block."
    ), (c.extensions = [c.extensions]));
  void 0 !== c.mutator && h.ra.apply (c.mutator, a, !0);
  if (Array.isArray (c.extensions))
    for ((c = c.extensions), (d = 0); d < c.length; ++d)
      h.ra.apply (c[d], a, !1);
}
b.Ff = function (a, c) {
  if (void 0 !== c && 'boolean' != typeof c)
    throw Error ('opt_disableCheck must be a boolean if provided');
  if (!c) {
    c = [];
    for (var d in a)
      void 0 !== this[d] && c.push (d);
    if (c.length)
      throw Error ('Mixin will overwrite block members: ' + JSON.stringify (c));
  }
  h.g.object.Ff (this, a);
};
b.lf = function (a, c) {
  var d = null;
  if (a == h.Ya || a == h.Ka) d = this.Yk (a);
  a = new h.st (a, c, this, d);
  this.N.push (a);
  return a;
};
b.Jr = function (a, c) {
  for (var d = 0, e; (e = this.N[d]); d++)
    if (e.name == a) {
      e.F ();
      this.N.splice (d, 1);
      return;
    }
  if (!c) throw Error ('Input not found: ' + a);
};
function da (a, c) {
  for (var d = 0, e; (e = a.N[d]); d++)
    if (e.name == c) return e;
  return null;
}
function hc (a, c) {
  return (a = da (a, c)) && a.connection && a.connection.la ();
}
b.uj = function (a) {
  this.Vd.text != a &&
    (h.h.Ia (
      new h.h.di (this, 'comment', null, this.Vd.text, a)
    ), (this.Vd.text = a));
};
b.rl = function () {};
b.nx = function () {};
b.Ma = function () {
  return this.Mx;
};
b.moveBy = function (a, c) {
  if (this.Pe) throw Error ('Block has parent.');
  var d = new h.h.Ij (this);
  this.Mx.translate (a, c);
  d.Mh ();
  h.h.Ia (d);
};
b.Yk = function (a) {
  return new h.ga (this, a);
};
h.i = {};
h.i.rj = {};
h.i.Ll = !1;
h.i.register = function (a, c) {
  if (h.i.rj[a]) throw Error ('Renderer has already been registered.');
  h.i.rj[a] = c;
};
h.i.unregister = function (a) {
  h.i.rj[a]
    ? delete h.i.rj[a]
    : console.warn (
        'No renderer mapping for name "' + a + '" found to unregister'
      );
};
h.i.UH = function () {
  h.i.Ll = !0;
};
h.i.VH = function () {
  h.i.Ll = !1;
};
h.i.va = function (a, c, d) {
  if (!h.i.rj[a]) throw Error ('Renderer not registered: ', a);
  a = new h.i.rj[a] (a);
  a.va (c, d);
  return a;
};
h.Vj = function () {
  this.Kc = this.Ra = this.kb = null;
  this.type = 'marker';
};
function G (a, c) {
  var d = a.Ra;
  a.Ra = c;
  a.Kc && a.Kc.draw (d, a.Ra);
}
h.Vj.prototype.draw = function () {
  this.Kc && this.Kc.draw (this.Ra, this.Ra);
};
h.Vj.prototype.Ba = function () {
  this.Kc && this.Kc.Ba ();
};
h.Vj.prototype.F = function () {
  this.Kc && this.Kc.F ();
};
h.ii = function () {
  h.ii.v.constructor.call (this);
  this.type = 'cursor';
};
h.g.object.S (h.ii, h.Vj);
b = h.ii.prototype;
b.next = function () {
  var a = this.Ra;
  if (!a) return null;
  for (
    a = a.next ();
    a && a.next () && (a.ab () == h.w.types.pd || a.ab () == h.w.types.Vc);

  )
    a = a.next ();
  a && G (this, a);
  return a;
};
b.jg = function () {
  var a = this.Ra;
  if (!a) return null;
  if (a.ab () == h.w.types.rd || a.ab () == h.w.types.Ug) a = a.next ();
  (a = a.jg ()) && G (this, a);
  return a;
};
b.Id = function () {
  var a = this.Ra;
  if (!a) return null;
  for (
    a = a.Id ();
    a && a.Id () && (a.ab () == h.w.types.pd || a.ab () == h.w.types.Vc);

  )
    a = a.Id ();
  a && G (this, a);
  return a;
};
b.zg = function () {
  var a = this.Ra;
  if (!a) return null;
  (a = a.zg ()) && a.ab () == h.w.types.Vc && (a = a.Id () || a);
  a && G (this, a);
  return a;
};
b.gd = function (a) {
  if (this.Ra && this.Ra.ab () === h.w.types.Wc && this.Ra.ea.gd (a)) return !0;
  switch (a.name) {
    case h.navigation.xa.rd:
      return this.Id (), !0;
    case h.navigation.xa.No:
      return this.zg (), !0;
    case h.navigation.xa.pd:
      return this.next (), !0;
    case h.navigation.xa.Bo:
      return this.jg (), !0;
    default:
      return !1;
  }
};
h.gm = function () {
  h.gm.v.constructor.call (this);
};
h.g.object.S (h.gm, h.ii);
b = h.gm.prototype;
b.gd = function (a) {
  switch (a.name) {
    case h.navigation.xa.rd:
      return this.Id (), !0;
    case h.navigation.xa.pd:
      return this.next (), !0;
    default:
      return !1;
  }
};
b.next = function () {
  var a = this.Ra;
  if (!a) return null;
  (a = a.next ()) && G (this, a);
  return a;
};
b.jg = function () {
  return null;
};
b.Id = function () {
  var a = this.Ra;
  if (!a) return null;
  (a = a.Id ()) && G (this, a);
  return a;
};
b.zg = function () {
  return null;
};
h.i.RE = function () {};
h.g.Xn = {};
h.g.Xn.xf = function (a) {
  a = a.aa;
  var c = h.g.style.xf (a);
  c.height = a.scrollHeight;
  return c;
};
h.g.Xn.kA = function (a, c, d) {
  c.left += d.width;
  c.right += d.width;
  a.left += d.width;
  a.right += d.width;
};
h.wa = {};
h.wa.Om = null;
h.wa.aq = null;
h.wa.show = function (a, c, d) {
  h.V.show (h.wa, d, null);
  if (c.length) {
    var e = h.wa.aD (c, d);
    h.wa.Qe (e, a, d);
    setTimeout (function () {
      e.aa.focus ();
    }, 1);
    h.wa.Om = null;
  } else h.wa.Ba ();
};
h.wa.aD = function (a, c) {
  var d = new h.Sg ();
  Mb (d, c);
  for (var e = 0, f; (f = a[e]); e++) {
    var g = new h.nm (f.text);
    Mb (g, c);
    Lb (d, g);
    g.Se (f.enabled);
    f.enabled &&
      Yb (
        g,
        function () {
          h.wa.Ba ();
          this.Nb ();
        },
        f
      );
  }
  return d;
};
h.wa.Qe = function (a, c, d) {
  var e = h.g.QB ();
  c = {
    top: c.clientY + e.top,
    bottom: c.clientY + e.top,
    left: c.clientX + e.left,
    right: c.clientX + e.left,
  };
  h.wa.UA (a);
  var f = h.g.Xn.xf (a);
  d && h.g.Xn.kA (e, c, f);
  h.V.bD (e, c, f, d);
  a.aa.focus ();
};
h.wa.UA = function (a) {
  a.Ca (h.V.Ua);
  var c = a.aa;
  h.g.j.xb (c, 'blocklyContextMenu');
  h.ta (c, 'contextmenu', null, h.g.MC);
  a.focus ();
};
h.wa.Ba = function () {
  h.V.Nk (h.wa);
  h.wa.Om = null;
  h.wa.aq && (h.Wa (h.wa.aq), (h.wa.aq = null));
};
h.wa.UG = function (a, c) {
  return function () {
    h.h.disable ();
    try {
      var d = h.M.Si (c, a.B), e = a.Ma ();
      e.x = a.G ? e.x - h.ic : e.x + h.ic;
      e.y += 2 * h.ic;
      d.moveBy (e.x, e.y);
    } finally {
      h.h.enable ();
    }
    h.h.isEnabled () && !d.Na && h.h.Ia (new h.h.Vl (d));
    d.select ();
  };
};
h.wa.sA = function (a) {
  var c = p (a, !1).length, d = u (a);
  d && (c -= p (d, !1).length);
  return {
    text: 1 == c
      ? h.J.DELETE_BLOCK
      : h.J.DELETE_X_BLOCKS.replace ('%1', String (c)),
    enabled: !0,
    Nb: function () {
      h.h.ka (!0);
      a.F (!0, !0);
      h.h.ka (!1);
    },
  };
};
h.wa.uA = function (a) {
  return {
    enabled: !('function' == typeof a.$i ? !a.$i () : !a.$i),
    text: h.J.HELP,
    Nb: function () {
      a.showHelp ();
    },
  };
};
h.wa.tA = function (a) {
  var c = cb (a.B) ? bb (a.B, h.g.jq (a, !0)) : !0;
  return {
    text: h.J.DUPLICATE_BLOCK,
    enabled: c,
    Nb: function () {
      h.duplicate (a);
    },
  };
};
h.wa.rA = function (a) {
  var c = {enabled: !h.g.userAgent.te};
  a.Ee
    ? ((c.text = h.J.REMOVE_COMMENT), (c.Nb = function () {
        a.uj (null);
      }))
    : ((c.text = h.J.ADD_COMMENT), (c.Nb = function () {
        a.uj ('');
      }));
  return c;
};
h.wa.YG = function (a) {
  return {
    text: h.J.REMOVE_COMMENT,
    enabled: !0,
    Nb: function () {
      h.h.ka (!0);
      a.F (!0, !0);
      h.h.ka (!1);
    },
  };
};
h.wa.ZG = function (a) {
  return {
    text: h.J.DUPLICATE_COMMENT,
    enabled: !0,
    Nb: function () {
      h.duplicate (a);
    },
  };
};
h.wa.cI = function (a, c) {
  if (!h.Ci) throw Error ('Missing require for Blockly.WorkspaceCommentSvg');
  var d = {enabled: !h.g.userAgent.te};
  d.text = h.J.ADD_COMMENT;
  d.Nb = function () {
    var e = new h.Ci (a, h.J.WORKSPACE_COMMENT_DEFAULT_TEXT, h.Ci.Cy, h.Ci.Cy),
      f = aa (a).getBoundingClientRect ();
    f = new h.g.O (c.clientX - f.left, c.clientY - f.top);
    var g = h.g.Jk (a.ob);
    f = h.g.O.Ak (f, g);
    f.scale (1 / a.scale);
    e.moveBy (f.x, f.y);
    a.ca && (e.cj (), e.Ca (), e.select ());
  };
  return d;
};
h.rb = function (a, c) {
  h.rb.v.constructor.call (this, a, c);
  this.Ke = a.B.Mm[c];
  this.fv = a.B.Mm[h.pi[c]];
  this.Kh = new h.g.O (0, 0);
  this.Nf = h.rb.ye.xu;
};
h.g.object.S (h.rb, h.ga);
h.rb.ye = {xu: -1, ou: 0, Ai: 1};
b = h.rb.prototype;
b.F = function () {
  h.rb.v.F.call (this);
  this.Nf == h.rb.ye.Ai && ic (this.Ke, this, this.y);
};
b.R = function () {
  return h.rb.v.R.call (this);
};
b.la = function () {
  return h.rb.v.la.call (this);
};
function jc (a, c) {
  var d = a.x - c.x;
  a = a.y - c.y;
  return Math.sqrt (d * d + a * a);
}
function ob (a, c) {
  if (!a.I.B.Oc ()) {
    var d = a.I.Dc ();
    if (!d.fe) {
      var e = !1;
      if (!d.Pc ()) {
        d = c.R ().Dc ();
        if (!d.Pc ()) return;
        c = a;
        e = !0;
      }
      var f = h.selected == d;
      f || d.Am ();
      var g = c.x + h.ic + Math.floor (Math.random () * h.po) - a.x,
        k = c.y + h.ic + Math.floor (Math.random () * h.po) - a.y;
      e && (k = -k);
      d.G && (g = c.x - h.ic - Math.floor (Math.random () * h.po) - a.x);
      d.moveBy (g, k);
      f || d.ml ();
    }
  }
}
b.moveTo = function (a, c) {
  if (this.Nf == h.rb.ye.xu) {
    var d = this.Ke;
    d.tb.splice (kc (d, c), 0, this);
    this.Nf = h.rb.ye.Ai;
  } else
    this.Nf == h.rb.ye.Ai &&
      (ic (this.Ke, this, this.y), (d = this.Ke), d.tb.splice (
        kc (d, c),
        0,
        this
      ));
  this.x = a;
  this.y = c;
};
b.moveBy = function (a, c) {
  this.moveTo (this.x + a, this.y + c);
};
function lc (a, c) {
  a.moveTo (c.x + a.Kh.x, c.y + a.Kh.y);
}
function J (a, c, d) {
  a.Kh.x = c;
  a.Kh.y = d;
}
function mc (a) {
  var c = a.na.x - a.x, d = a.na.y - a.y;
  if (0 != c || 0 != d) {
    a = a.la ();
    var e = a.ma ();
    if (!e) throw Error ('block is not rendered.');
    e = h.g.ee (e);
    a
      .ma ()
      .setAttribute (
        'transform',
        'translate(' + (e.x - c) + ',' + (e.y - d) + ')'
      );
    xa (a, -c, -d);
  }
}
b.closest = function (a, c) {
  var d = this.fv;
  if (d.tb.length) {
    var e = this.y, f = this.x;
    this.x = f + c.x;
    this.y = e + c.y;
    var g = kc (d, this.y);
    c = null;
    for (
      var k = a, l, m = g - 1;
      0 <= m && Math.abs (d.tb[m].y - this.y) <= a;

    )
      (l = d.tb[m]), this.on (l, k) && ((c = l), (k = jc (l, this))), m--;
    for (; g < d.tb.length && Math.abs (d.tb[g].y - this.y) <= a; )
      (l = d.tb[g]), this.on (l, k) && ((c = l), (k = jc (l, this))), g++;
    this.x = f;
    this.y = e;
    a = {connection: c, Rn: k};
  } else a = {connection: null, Rn: a};
  return a;
};
function cc (a, c) {
  (c && a.Nf == h.rb.ye.Ai) ||
    (!c && a.Nf == h.rb.ye.ou) ||
    a.I.fe ||
    (c
      ? ((c = a.Ke), c.tb.splice (kc (c, a.y), 0, a), (a.Nf = h.rb.ye.Ai))
      : (a.Nf == h.rb.ye.Ai && ic (a.Ke, a, a.y), (a.Nf = h.rb.ye.ou)));
}
function bc (a) {
  cc (a, !0);
  var c = [];
  if (a.type != h.Ya && a.type != h.Ka) return c;
  if ((a = a.la ())) {
    if (a.isCollapsed ()) {
      var d = [];
      a.K && d.push (a.K);
      a.U && d.push (a.U);
      a.P && d.push (a.P);
    } else d = a.ce (!0);
    for (var e = 0; e < d.length; e++)
      c.push.apply (c, bc (d[e]));
    c.length || (c[0] = a);
  }
  return c;
}
b.on = function (a, c) {
  return jc (this, a) > c ? !1 : h.rb.v.on.call (this, a);
};
b.In = function (a) {
  ob (this, a);
};
b.Np = function (a, c) {
  h.rb.v.Np.call (this, a, c);
  a.ca && a.Ca ();
  c.ca && (Ta (c), c.Ca ());
};
b.Or = function () {
  var a = this.R (), c = this.Te;
  if (a.B && c && h.h.ac) {
    h.rb.v.Or.call (this);
    c = this.la ();
    if (!c)
      throw Error ("Couldn't respawn the shadow block that should exist here.");
    c.cj ();
    c.Ca (!1);
    a.ca && a.Ca ();
  }
};
b.Fw = function (a) {
  return nc (this.fv, this, a);
};
b.Wd = function (a) {
  h.rb.v.Wd.call (this, a);
  var c = this.R ();
  a = a.R ();
  c.ca && Ta (c);
  a.ca && Ta (a);
  c.ca && a.ca && (this.type == h.Ka || this.type == h.Pd ? a.Ca () : c.Ca ());
};
b.Jw = function () {
  !this.isConnected () ||
    (this.na && na (this, this.na)) ||
    (x (B (this) ? this.la () : this.I), this.I.yc ());
};
h.Tl = function () {
  h.Tl.v.constructor.call (this);
};
h.g.object.S (h.Tl, h.ii);
b = h.Tl.prototype;
b.next = function () {
  var a = this.Ra;
  if (!a) return null;
  (a = oc (this, a, this.vs)) && G (this, a);
  return a;
};
b.jg = function () {
  return this.next ();
};
b.Id = function () {
  var a = this.Ra;
  if (!a) return null;
  (a = pc (this, a, this.vs)) && G (this, a);
  return a;
};
b.zg = function () {
  return this.Id ();
};
function oc (a, c, d) {
  if (!c) return null;
  var e = c.jg () || c.next ();
  if (d (e)) return e;
  if (e) return oc (a, e, d);
  c = qc (a, c.zg ());
  return d (c) ? c : c ? oc (a, c, d) : null;
}
function pc (a, c, d) {
  if (!c) return null;
  var e = c.Id ();
  e = e ? rc (a, e) : c.zg ();
  return d (e) ? e : e ? pc (a, e, d) : null;
}
b.vs = function (a) {
  var c = !1;
  a = a && a.ab ();
  if (
    a == h.w.types.Ug ||
    a == h.w.types.ue ||
    a == h.w.types.Wc ||
    a == h.w.types.pd ||
    a == h.w.types.rd ||
    a == h.w.types.Ae
  )
    c = !0;
  return c;
};
function qc (a, c) {
  if (!c) return null;
  var d = c.next ();
  return d ? d : qc (a, c.zg ());
}
function rc (a, c) {
  if (!c.jg ()) return c;
  for (c = c.jg (); c.next (); )
    c = c.next ();
  return rc (a, c);
}
h.ep = function () {
  h.ep.v.constructor.call (this);
};
h.g.object.S (h.ep, h.Tl);
h.ep.prototype.vs = function (a) {
  a && a.ab ();
  return !1;
};
h.Oa = function (a, c, d) {
  this.L = h.g.j.H ('g', {}, null);
  this.L.Gl = '';
  this.style = sc (a.bb.W (), null);
  this.vb = a.bb.ww (this.L, this.style);
  this.ca = !1;
  this.B = a;
  this.P = this.U = this.K = null;
  this.Ml = h.g.vh () && !!a.Yc;
  var e = this.vb.Gb;
  e.me = this;
  h.C.Fi (e);
  h.Oa.v.constructor.call (this, a, c, d);
  this.L.dataset && (this.L.dataset.id = this.id);
};
h.g.object.S (h.Oa, h.Ul);
h.Oa.prototype.height = 0;
h.Oa.prototype.width = 0;
h.Oa.prototype.Uc = null;
h.Oa.PE = -1;
h.Oa.Ns = 'TEMP_COLLAPSED_WARNING_';
b = h.Oa.prototype;
b.cj = function () {
  if (!this.B.ca) throw TypeError ('Workspace is headless.');
  for (var a = 0, c; (c = this.N[a]); a++)
    c.va ();
  c = ra (this);
  for (a = 0; a < c.length; a++)
    c[a].RA ();
  this.lc ();
  A (this.vb, 'blocklyDraggable', this.Pc ());
  a = this.ma ();
  this.B.options.readOnly ||
    this.nB ||
    !a ||
    h.ta (a, 'mousedown', this, this.wg);
  this.nB = !0;
  a.parentNode || this.B.ob.appendChild (a);
};
b.select = function () {
  if (this.Na && this.getParent ()) this.getParent ().select ();
  else if (h.selected != this) {
    var a = null;
    if (h.selected) {
      a = h.selected.id;
      h.h.disable ();
      try {
        kb (h.selected);
      } finally {
        h.h.enable ();
      }
    }
    a = new h.h.jc (null, 'selected', a, this.id);
    a.wb = this.B.id;
    h.h.Ia (a);
    h.selected = this;
    this.Am ();
  }
};
function kb (a) {
  if (h.selected == a) {
    var c = new h.h.jc (null, 'selected', a.id, null);
    c.wb = a.B.id;
    h.h.Ia (c);
    h.selected = null;
    a.ml ();
  }
}
b.ge = null;
b.Ee = null;
b.kd = null;
function ra (a) {
  var c = [];
  a.ge && c.push (a.ge);
  a.Ee && c.push (a.Ee);
  a.kd && c.push (a.kd);
  return c;
}
b.xj = function (a) {
  var c = this.Pe;
  if (a != c) {
    h.g.j.yl ();
    h.Oa.v.xj.call (this, a);
    h.g.j.zl ();
    var d = this.ma ();
    if (!this.B.Hq && d) {
      var e = this.Ma ();
      a
        ? (a.ma ().appendChild (d), (a = this.Ma ()), xa (
            this,
            a.x - e.x,
            a.y - e.y
          ))
        : c && (this.B.ob.appendChild (d), this.translate (e.x, e.y));
      this.lc ();
    }
  }
};
b.Ma = function () {
  var a = 0, c = 0, d = this.Ml ? this.B.Yc.Kb () : null, e = this.ma ();
  if (e) {
    do {
      var f = h.g.ee (e);
      a += f.x;
      c += f.y;
      this.Ml &&
        this.B.Yc.$d.firstChild == e &&
        ((f = this.B.Yc.qq ()), (a += f.x), (c += f.y));
      e = e.parentNode;
    } while (e && e != this.B.ob && e != d);
  }
  return new h.g.O (a, c);
};
b.moveBy = function (a, c) {
  if (this.Pe) throw Error ('Block has parent.');
  var d = h.h.isEnabled ();
  if (d) var e = new h.h.Ij (this);
  var f = this.Ma ();
  this.translate (f.x + a, f.y + c);
  xa (this, a, c);
  d && (e.Mh (), h.h.Ia (e));
  Ua (this.B);
};
b.translate = function (a, c) {
  this.ma ().setAttribute ('transform', 'translate(' + a + ',' + c + ')');
};
b.moveTo = function (a) {
  var c = this.Ma ();
  this.moveBy (a.x - c.x, a.y - c.y);
};
b.er = function (a) {
  this.Ml
    ? this.B.Yc.Xh (a.x, a.y)
    : ((this.L.Gl = 'translate(' + a.x + ',' + a.y + ')'), this.L.setAttribute (
        'transform',
        this.L.Gl + this.L.xl
      ));
};
function tc (a) {
  if (a.B && !a.B.Oc () && !a.getParent () && !a.fe) {
    var c = a.B.wd;
    if (c && c.vD) {
      var d = c.bs, e = d / 2, f = a.Ma ();
      c = Math.round ((f.x - e) / d) * d + e - f.x;
      d = Math.round ((f.y - e) / d) * d + e - f.y;
      c = Math.round (c);
      d = Math.round (d);
      (0 == c && 0 == d) || a.moveBy (c, d);
    }
  }
}
function uc (a) {
  var c = a.Ma (), d = z (a);
  if (a.G) {
    a = c.x - d.width;
    var e = c.x;
  } else (a = c.x), (e = c.x + d.width);
  return new h.g.Rect (c.y, c.y + d.height, a, e);
}
b.Zk = function () {
  this.vb.Mi = this.B.bb.W ();
  for (var a = 0, c; (c = this.N[a]); a++)
    c.Zk ();
};
b.Eg = function (a) {
  if (this.De != a) {
    for (var c = [], d = 0, e; (e = this.N[d]); d++)
      c.push.apply (c, e.cc (!a));
    if (a) {
      e = ra (this);
      for (d = 0; d < e.length; d++)
        e[d].cc (!1);
      d = this.toString (h.py);
      I (fc (this, '_TEMP_COLLAPSED_INPUT'), d).va ();
      e = p (this, !0);
      if ((d = u (this))) (d = e.indexOf (d)), e.splice (d, e.length - d);
      d = 1;
      for (var f; (f = e[d]); d++)
        if (f.kd) {
          this.rl (h.J.COLLAPSED_WARNINGS_WARNING, h.Oa.Ns);
          break;
        }
    } else
      this.Jr ('_TEMP_COLLAPSED_INPUT'), this.kd &&
        (Hb (), Object.keys (this.kd.YH).length || this.rl (null));
    h.Oa.v.Eg.call (this, a);
    c.length || (c[0] = this);
    if (this.ca) for (d = 0; (f = c[d]); d++) f.Ca ();
  }
};
b.wg = function (a) {
  var c = this.B && this.B.cg (a);
  if (c) {
    if (c.qh)
      throw Error (
        'Tried to call gesture.handleBlockStart, but the gesture had already been started.'
      );
    xb (c, this);
    c.Dd = a;
  }
};
b.showHelp = function () {
  var a = 'function' == typeof this.$i ? this.$i () : this.$i;
  a && window.open (a);
};
function vc (a) {
  if (a.B.options.readOnly || !a.contextMenu) return null;
  var c = [];
  if (!a.fe) {
    a.dd () && a.Pc () && c.push (h.wa.tA (a));
    a.B.options.JA && !a.De && a.Ad () && c.push (h.wa.rA (a));
    if (a.Pc ())
      if (a.De)
        a.B.options.collapse &&
          ((d = {enabled: !0}), (d.text =
            h.J.EXPAND_BLOCK), (d.Nb = function () {
            a.Eg (!1);
          }), c.push (d));
      else {
        for (var d = 1; d < a.N.length; d++)
          if (a.N[d - 1].type != h.Ka && a.N[d].type != h.Ka) {
            d = {enabled: !0};
            var e = qa (a);
            d.text = e ? h.J.EXTERNAL_INPUTS : h.J.INLINE_INPUTS;
            d.Nb = function () {
              a.Qh (!e);
            };
            c.push (d);
            break;
          }
        a.B.options.collapse &&
          ((d = {enabled: !0}), (d.text =
            h.J.COLLAPSE_BLOCK), (d.Nb = function () {
            a.Eg (!0);
          }), c.push (d));
      }
    a.B.options.disable &&
      a.Ad () &&
      ((d = {
        text: a.isEnabled () ? h.J.DISABLE_BLOCK : h.J.ENABLE_BLOCK,
        enabled: !ec (a),
        Nb: function () {
          var f = h.h.Kb ();
          f || h.h.ka (!0);
          a.Se (!a.isEnabled ());
          f || h.h.ka (!1);
        },
      }), c.push (d));
    a.dd () && c.push (h.wa.sA (a));
  }
  c.push (h.wa.uA (a));
  a.VA && a.VA (c);
  return c;
}
b.tl = function (a) {
  var c = vc (this);
  c && c.length && (h.wa.show (a, c, this.G), (h.wa.Om = this));
};
function xa (a, c, d) {
  if (a.ca) {
    for (var e = a.ce (!1), f = 0; f < e.length; f++)
      e[f].moveBy (c, d);
    e = ra (a);
    for (f = 0; f < e.length; f++)
      e[f].LA ();
    for (f = 0; f < a.pf.length; f++)
      xa (a.pf[f], c, d);
  }
}
b.Fg = function (a) {
  if (a) {
    var c = this.ma ();
    c.Gl = '';
    c.xl = '';
    h.Ti = h.Ti.concat (this.ce (!0));
    h.g.j.xb (this.L, 'blocklyDragging');
  } else (h.Ti = []), h.g.j.Rc (this.L, 'blocklyDragging');
  for (c = 0; c < this.pf.length; c++)
    this.pf[c].Fg (a);
};
b.Ur = function (a) {
  h.Oa.v.Ur.call (this, a);
  A (this.vb, 'blocklyDraggable', a);
};
b.Tr = function (a) {
  h.Oa.v.Tr.call (this, a);
  a = ra (this);
  for (var c = 0; c < a.length; c++)
    zb (a[c]);
};
b.Xr = function (a) {
  h.Oa.v.Xr.call (this, a);
  this.lc ();
};
b.lx = function (a) {
  this.Tk != a &&
    (this.Tk = a) &&
    (this.je (this.B.bb.W ().Eo), A (this.vb, 'blocklyInsertionMarker', !0));
};
b.ma = function () {
  return this.L;
};
b.F = function (a, c) {
  if (this.B) {
    h.C.F ();
    h.C.rs (this.vb.Gb);
    h.g.j.yl ();
    var d = this.B;
    if (h.selected == this) {
      kb (this);
      var e = this.B;
      e.Pb && e.Pb.cancel ();
    }
    h.wa.Om == this && h.wa.Ba ();
    this.B.Fc && h.navigation.EC (this);
    c && this.ca && (x (this, a), h.Va.eB (this));
    this.ca = !1;
    if (this.Uc) {
      for (var f in this.Uc)
        clearTimeout (this.Uc[f]);
      this.Uc = null;
    }
    c = ra (this);
    for (e = 0; e < c.length; e++)
      c[e].F ();
    h.Oa.v.F.call (this, !!a);
    h.g.j.removeNode (this.L);
    Ua (d);
    this.L = null;
    h.g.j.zl ();
  }
};
b.lc = function () {
  this.vb.lc (this);
  for (var a = ra (this), c = 0; c < a.length; c++)
    a[c].lc ();
  for (a = 0; (c = this.N[a]); a++)
    for (var d = 0, e; (e = c.Sa[d]); d++)
      e.lc ();
};
function Ta (a) {
  var c = Va (a, !1);
  a.lc ();
  a = 0;
  for (var d; (d = c[a]); a++)
    Ta (d);
}
b.CB = function () {
  return this.Ee;
};
b.uj = function (a) {
  if (!h.Comment) throw Error ('Missing require for Blockly.Comment');
  this.Vd.text != a &&
    (h.Oa.v.uj.call (this, a), (a = null != a), !!this.Ee == a
      ? this.Ee.bI ()
      : (a
          ? (this.Ee = new h.Comment (this))
          : (this.Ee.F (), (this.Ee = null)), this.ca &&
          (this.Ca (), this.yc ())));
};
b.rl = function (a, c) {
  if (!h.Zz) throw Error ('Missing require for Blockly.Warning');
  this.Uc || (this.Uc = Object.create (null));
  var d = c || '';
  if (d) this.Uc[d] && (clearTimeout (this.Uc[d]), delete this.Uc[d]);
  else for (var e in this.Uc) clearTimeout (this.Uc[e]), delete this.Uc[e];
  if (this.B.Oc ()) {
    var f = this;
    this.Uc[d] = setTimeout (function () {
      f.B && (delete f.Uc[d], f.rl (a, d));
    }, 100);
  } else {
    this.fe && (a = null);
    c = dc (this);
    for (e = null; c; )
      c.isCollapsed () && (e = c), (c = dc (c));
    e && e.rl (h.J.COLLAPSED_WARNINGS_WARNING, h.Oa.Ns);
    c = !1;
    'string' == typeof a
      ? (this.kd || ((this.kd = new h.Zz (this)), (c = !0)), Hb ())
      : this.kd && !d
          ? (this.kd.F (), (c = !0))
          : this.kd &&
              ((c = Gb (this.kd)), Hb (), (e = Gb (this.kd)) ||
                this.kd.F (), (c = c != e));
    c && this.ca && (this.Ca (), this.yc ());
  }
};
b.nx = function (a) {
  this.ge && this.ge !== a && this.ge.F ();
  a && (a.NH (this), (this.ge = a), a.RA ());
  this.ca && (this.Ca (), this.yc ());
};
b.Se = function (a) {
  this.isEnabled () != a &&
    (h.Oa.v.Se.call (this, a), this.ca && !ec (this) && Ta (this));
};
b.If = function (a) {
  this.ca && this.vb.zx (a);
};
b.Am = function () {
  A (this.vb, 'blocklySelected', !0);
};
b.ml = function () {
  A (this.vb, 'blocklySelected', !1);
};
function ua (a, c) {
  A (a.vb, 'blocklyDraggingDelete', c);
}
b.lq = function () {
  return this.style.ah;
};
b.je = function (a) {
  h.Oa.v.je.call (this, a);
  a = wc (this.B.bb.W (), this.ud);
  this.vb.Th (a.style);
  this.style = a.style;
  this.Al = a.name;
  this.lc ();
};
b.Th = function (a) {
  var c = sc (this.B.bb.W (), a);
  this.Al = a;
  if (c)
    (this.Me = c.Me), this.vb.Th (c), (this.ud =
      c.ah), (this.style = c), this.lc ();
  else throw Error ('Invalid style name: ' + a);
};
function ya (a) {
  do {
    var c = a.ma (), d = c.parentNode, e = d.childNodes;
    e[e.length - 1] !== c && d.appendChild (c);
    a = a.getParent ();
  } while (a);
}
b.Rh = function (a, c) {
  h.Oa.v.Rh.call (this, a, c);
  this.ca && (this.Ca (), this.yc ());
};
b.wj = function (a, c) {
  h.Oa.v.wj.call (this, a, c);
  this.ca && (this.Ca (), this.yc ());
};
b.Vr = function (a, c) {
  h.Oa.v.Vr.call (this, a, c);
  this.ca && (this.Ca (), this.yc ());
};
b.Qh = function (a) {
  h.Oa.v.Qh.call (this, a);
  this.ca && (this.Ca (), this.yc ());
};
b.Jr = function (a, c) {
  h.Oa.v.Jr.call (this, a, c);
  this.ca && (this.Ca (), this.yc ());
};
b.lf = function (a, c) {
  a = h.Oa.v.lf.call (this, a, c);
  this.ca && (this.Ca (), this.yc ());
  return a;
};
function Sa (a, c) {
  a.P && cc (a.P, c);
  a.K && cc (a.K, c);
  if (a.U) {
    cc (a.U, c);
    var d = a.U.la ();
    d && Sa (d, c);
  }
  if (!a.De)
    for (d = 0; d < a.N.length; d++) {
      var e = a.N[d].connection;
      e && (cc (e, c), (e = e.la ()) && Sa (e, c));
    }
}
b.ce = function (a) {
  var c = [];
  if (a || this.ca)
    if (
      (this.K && c.push (this.K), this.P && c.push (this.P), this.U &&
        c.push (this.U), a || !this.De)
    ) {
      a = 0;
      for (var d; (d = this.N[a]); a++)
        d.connection && c.push (d.connection);
    }
  return c;
};
b.xn = function () {
  return h.Oa.v.xn.call (this);
};
b.nq = function (a, c) {
  return h.Oa.v.nq.call (this, a, c);
};
b.Yk = function (a) {
  return new h.rb (this, a);
};
b.yc = function () {
  if (this.B && !this.B.Oc ()) {
    var a = this.Dc ();
    if (!a.fe)
      for (var c = this.ce (!1), d = 0, e; (e = c[d]); d++) {
        e.isConnected () && B (e) && e.la ().yc ();
        for (var f = e.Fw (h.ic), g = 0, k; (k = f[g]); g++)
          (e.isConnected () && k.isConnected ()) ||
            (k.R ().Dc () != a && (B (e) ? ob (k, e) : ob (e, k)));
      }
  }
};
function za (a) {
  var c = h.h.Kb ();
  setTimeout (function () {
    h.h.ka (c);
    tc (a);
    h.h.ka (!1);
  }, h.oo / 2);
  setTimeout (function () {
    h.h.ka (c);
    a.yc ();
    h.h.ka (!1);
  }, h.oo);
}
function oa (a, c, d) {
  (c.type != h.Ka && c.type != h.Ya) || a.moveBy (d.x - c.x, d.y - c.y);
}
b.getParent = function () {
  return h.Oa.v.getParent.call (this);
};
b.Dc = function () {
  return h.Oa.v.Dc.call (this);
};
b.Ca = function (a) {
  h.g.j.yl ();
  this.ca = !0;
  this.B.bb.Ca (this);
  var c = this.Ma ();
  this.P && lc (this.P, c);
  this.K && lc (this.K, c);
  for (var d = 0; d < this.N.length; d++) {
    var e = this.N[d].connection;
    e && (lc (e, c), e.isConnected () && mc (e));
  }
  this.U && (lc (this.U, c), this.U.isConnected () && mc (this.U));
  !1 !== a && ((a = this.getParent ()) ? a.Ca (!0) : Ua (this.B));
  h.g.j.zl ();
  this.us ();
};
b.us = function () {
  this.B.Fc && this.vb.yk && this.B.lb ().draw ();
  this.B.Fc && this.vb.Xq && this.B.Mc (h.navigation.Sj).draw ();
};
b.Hf = function (a) {
  this.vb.Hf (a);
};
b.Jf = function (a) {
  this.vb.Jf (a);
};
function z (a) {
  var c = a.height, d = a.width, e = u (a);
  e &&
    ((e = z (e)), (a = a.B.bb.W ().Gt), (c += e.height - a), (d = Math.max (
      d,
      e.width
    )));
  return {height: c, width: d};
}
h.gi = function () {
  this.tb = [];
};
function xc (a, c, d) {
  if (!a.tb.length) return -1;
  var e = kc (a, d);
  if (e >= a.tb.length) return -1;
  d = c.y;
  for (var f = e; 0 <= f && a.tb[f].y == d; ) {
    if (a.tb[f] == c) return f;
    f--;
  }
  for (; e < a.tb.length && a.tb[e].y == d; ) {
    if (a.tb[e] == c) return e;
    e++;
  }
  return -1;
}
function kc (a, c) {
  if (!a.tb.length) return 0;
  for (var d = 0, e = a.tb.length; d < e; ) {
    var f = Math.floor ((d + e) / 2);
    if (a.tb[f].y < c) d = f + 1;
    else if (a.tb[f].y > c) e = f;
    else {
      d = f;
      break;
    }
  }
  return d;
}
function ic (a, c, d) {
  c = xc (a, c, d);
  if (-1 == c) throw Error ('Unable to find connection in connectionDB.');
  a.tb.splice (c, 1);
}
function nc (a, c, d) {
  function e (n) {
    var q = g - f[n].x, r = k - f[n].y;
    Math.sqrt (q * q + r * r) <= d && m.push (f[n]);
    return r < d;
  }
  var f = a.tb, g = c.x, k = c.y;
  a = 0;
  for (var l = (c = f.length - 2); a < l; )
    f[l].y < k ? (a = l) : (c = l), (l = Math.floor ((a + c) / 2));
  var m = [];
  c = a = l;
  if (f.length) {
    for (; 0 <= a && e (a); )
      a--;
    do
      c++;
    while (c < f.length && e (c));
  }
  return m;
}
h.gi.va = function () {
  var a = [];
  a[h.Ya] = new h.gi ();
  a[h.Od] = new h.gi ();
  a[h.Ka] = new h.gi ();
  a[h.Pd] = new h.gi ();
  return a;
};
h.Rg = function (a, c) {
  this.Xi = a;
  this.bs = c.spacing;
  this.uw = c.length;
  this.sC = (this.Nq = a.firstChild) && this.Nq.nextSibling;
  this.vD = c.snap;
};
h.Rg.prototype.Dg = 1;
h.Rg.prototype.F = function () {
  this.Xi = null;
};
h.Rg.prototype.update = function (a) {
  this.Dg = a;
  var c = this.bs * a || 100;
  this.Xi.setAttribute ('width', c);
  this.Xi.setAttribute ('height', c);
  c = Math.floor (this.bs / 2) + 0.5;
  var d = c - this.uw / 2, e = c + this.uw / 2;
  c *= a;
  d *= a;
  e *= a;
  yc (this.Nq, a, d, e, c, c);
  yc (this.sC, a, c, c, d, e);
};
function yc (a, c, d, e, f, g) {
  a &&
    (a.setAttribute ('stroke-width', c), a.setAttribute (
      'x1',
      d
    ), a.setAttribute ('y1', f), a.setAttribute ('x2', e), a.setAttribute (
      'y2',
      g
    ));
}
h.Rg.prototype.moveTo = function (a, c) {
  this.Xi.setAttribute ('x', a);
  this.Xi.setAttribute ('y', c);
  (h.g.userAgent.te || h.g.userAgent.Pg) && this.update (this.Dg);
};
h.Rg.Fa = function (a, c, d) {
  a = h.g.j.H (
    'pattern',
    {id: 'blocklyGridPattern' + a, patternUnits: 'userSpaceOnUse'},
    d
  );
  0 < c.length && 0 < c.spacing
    ? (h.g.j.H ('line', {stroke: c.colour}, a), 1 < c.length &&
        h.g.j.H ('line', {stroke: c.colour}, a))
    : h.g.j.H ('line', {}, a);
  return a;
};
h.Dt = function (a) {
  this.sf = this.Yd = null;
  this.Gh = {};
  this.o = a;
};
function zc (a, c) {
  var d = a.Gh[c];
  if (d) d.F (), delete a.Gh[c];
  else
    throw Error (
      'Marker with id ' +
        c +
        ' does not exist. Can only unregistermarkers that exist.'
    );
}
b = h.Dt.prototype;
b.lb = function () {
  return this.Yd;
};
b.Mc = function (a) {
  return this.Gh[a];
};
b.Sr = function (a) {
  this.Yd && this.Yd.Kc && this.Yd.Kc.F ();
  if ((this.Yd = a))
    (a = this.Yd), (a = new h.i.ef (
      this.o,
      this.o.bb.W (),
      a
    )), (this.Yd.Kc = a), this.Hf (this.Yd.Kc.Fa ());
};
b.Hf = function (a) {
  a ? (this.o.ob.appendChild (a), (this.sf = a)) : (this.sf = null);
};
b.Jf = function (a) {
  a
    ? this.o.ob &&
        (this.sf
          ? this.o.ob.insertBefore (a, this.sf)
          : this.o.ob.appendChild (a))
    : (this.Ef = null);
};
b.F = function () {
  for (var a = Object.keys (this.Gh), c = 0, d; (d = a[c]); c++)
    zc (this, d);
  this.Gh = null;
  this.Yd.F ();
  this.Yd = null;
};
h.nu = function (a, c) {
  this.o = a;
  this.Lf = c;
  this.Bl = [];
  this.Ge = Object.create (null);
};
b = h.nu.prototype;
b.dg = function () {
  return this.Lf;
};
b.ql = function (a) {
  var c = this.Lf;
  this.Lf = a;
  if ((a = aa (this.o)))
    c && h.g.j.Rc (a, c.ae ()), h.g.j.xb (a, this.Lf.ae ());
  for (c = 0; (a = this.Bl[c]); c++)
    Ac (a);
  c = 0;
  a = Object.keys (this.Ge);
  for (var d; (d = a[c]); c++)
    for (var e = 0, f; (f = this.Ge[d][e]); e++)
      f.element.style[f.propertyName] = (this.Lf && Pa (this.Lf, d)) || '';
  h.$b ();
};
b.subscribe = function (a, c, d) {
  this.Ge[c] || (this.Ge[c] = []);
  this.Ge[c].push ({element: a, propertyName: d});
  a.style[d] = (this.Lf && Pa (this.Lf, c)) || '';
};
b.unsubscribe = function (a) {
  if (a)
    for (var c = Object.keys (this.Ge), d = 0, e; (e = c[d]); d++) {
      for (var f = this.Ge[e], g = f.length - 1; 0 <= g; g--)
        f[g].element === a && f.splice (g, 1);
      this.Ge[e].length || delete this.Ge[e];
    }
};
b.F = function () {
  this.Ge = this.Bl = this.Lf = this.hd = null;
};
h.Ic = function (a, c) {
  h.Ic.v.constructor.call (this, a, c);
  this.rn = !1;
  this.Zc = Object.create (null);
  this.sx = this.il = 0;
  this.ow = this.rr = null;
};
h.g.object.S (h.Ic, h.ki);
h.Ic.eA = 5;
h.Ic.fA = 6;
b = h.Ic.prototype;
b.Sp = function (a) {
  this.ow = this.Fb.options.Ta && this.Fb.options.Ta.Dr;
  h.Ic.v.Sp.call (this, a);
  !this.qn && h.Touch.wn (a) && Bc (this, a);
};
b.Fi = function (a) {
  this.rr = h.ta (document, 'mousedown', null, this.YB.bind (this), !0);
  this.Kn = h.ta (document, 'mousemove', null, this.Yi.bind (this), !0);
  this.Ln = h.ta (document, 'mouseup', null, this.kn.bind (this), !0);
  a.preventDefault ();
  a.stopPropagation ();
};
b.YB = function (a) {
  !this.Oc () && h.Touch.wn (a) && (Bc (this, a), this.rn && h.sg ());
};
b.Yi = function (a) {
  if (this.Oc ()) h.Touch.$r (a) && h.Ic.v.Yi.call (this, a);
  else if (this.rn) {
    if (h.Touch.wn (a)) {
      this.Zc[h.Touch.hn (a)] = Cc (this, a);
      var c = Object.keys (this.Zc);
      if (this.ow && 2 === c.length) {
        c = Object.keys (this.Zc);
        c = h.g.O.Rp (this.Zc[c[0]], this.Zc[c[1]]) / this.sx;
        if (0 < this.il && Infinity > this.il) {
          var d = c - this.il;
          d = 0 < d ? d * h.Ic.eA : d * h.Ic.fA;
          var e = this.Fb, f = h.g.bl (a, y (e), Ma (e));
          e.zoom (f.x, f.y, d);
        }
        this.il = c;
        a.preventDefault ();
      } else h.Ic.v.Yi.call (this, a);
    }
    h.sg ();
  } else h.Ic.v.Yi.call (this, a);
};
b.kn = function (a) {
  if (h.Touch.wn (a) && !this.Oc ()) {
    var c = h.Touch.hn (a);
    this.Zc[c] && delete this.Zc[c];
    2 > Object.keys (this.Zc).length &&
      ((this.Zc = Object.create (null)), (this.il = 0));
  }
  !this.rn || this.Oc ()
    ? h.Touch.$r (a) && h.Ic.v.kn.call (this, a)
    : (a.preventDefault (), a.stopPropagation (), this.F ());
};
b.F = function () {
  h.Ic.v.F.call (this);
  this.rr && h.Wa (this.rr);
};
function Bc (a, c) {
  a.Zc[h.Touch.hn (c)] = Cc (a, c);
  var d = Object.keys (a.Zc);
  2 == d.length &&
    ((a.sx = h.g.O.Rp (
      a.Zc[d[0]],
      a.Zc[d[1]]
    )), (a.rn = !0), c.preventDefault ());
}
function Cc (a, c) {
  return a.Fb
    ? new h.g.O (
        c.pageX ? c.pageX : c.changedTouches[0].pageX,
        c.pageY ? c.pageY : c.changedTouches[0].pageY
      )
    : null;
}
h.Au = function (a) {
  this.zr = a;
  this.$j = Object.create (null);
};
b = h.Au.prototype;
b.Jq = null;
b.F = function () {
  this.$j = this.zr = null;
};
b.load = function (a, c) {
  if (a.length) {
    try {
      var d = new h.g.global.Audio ();
    } catch (l) {
      return;
    }
    for (var e, f = 0; f < a.length; f++) {
      var g = a[f], k = g.match (/\.(\w+)$/);
      if (k && d.canPlayType ('audio/' + k[1])) {
        e = new h.g.global.Audio (g);
        break;
      }
    }
    e && e.play && (this.$j[c] = e);
  }
};
b.preload = function () {
  for (var a in this.$j) {
    var c = this.$j[a];
    c.volume = 0.01;
    var d = c.play ();
    void 0 !== d ? d.then (c.pause).catch (function () {}) : c.pause ();
    if (h.g.userAgent.Qj || h.g.userAgent.qt) break;
  }
};
b.play = function (a, c) {
  var d = this.$j[a];
  d
    ? ((a = new Date ()), (null != this.Jq && a - this.Jq < h.Lz) ||
        ((this.Jq = a), (d = h.g.userAgent.Qj || h.g.userAgent.Pl
          ? d
          : d.cloneNode ()), (d.volume = void 0 === c ? 1 : c), d.play ()))
    : this.zr && this.zr.Jc.play (a, c);
};
h.Bu = function (a) {
  this.pk = a;
  this.Fa ();
};
b = h.Bu.prototype;
b.eb = null;
b.$d = null;
b.pk = null;
b.Fa = function () {
  this.eb ||
    ((this.eb = h.g.j.H (
      'svg',
      {
        xmlns: h.g.j.wm,
        'xmlns:html': h.g.j.xo,
        'xmlns:xlink': h.g.j.Xc,
        version: '1.1',
        class: 'blocklyWsDragSurface blocklyOverflowVisible',
      },
      null
    )), this.pk.appendChild (this.eb));
};
b.Xh = function (a, c) {
  a = a.toFixed (0);
  c = c.toFixed (0);
  this.eb.style.display = 'block';
  h.g.j.ol (this.eb, 'translate3d(' + a + 'px, ' + c + 'px, 0px)');
};
b.qq = function () {
  return h.g.ee (this.eb);
};
b.Gm = function (a) {
  if (!a)
    throw Error (
      "Couldn't clear and hide the drag surface: missing new surface."
    );
  var c = this.eb.childNodes[0], d = this.eb.childNodes[1];
  if (
    !(c &&
      d &&
      h.g.j.$v (c, 'blocklyBlockCanvas') &&
      h.g.j.$v (d, 'blocklyBubbleCanvas'))
  )
    throw Error (
      "Couldn't clear and hide the drag surface. A node was missing."
    );
  null != this.Gr ? h.g.j.dj (c, this.Gr) : a.insertBefore (c, a.firstChild);
  h.g.j.dj (d, c);
  this.eb.style.display = 'none';
  if (this.eb.childNodes.length) throw Error ('Drag surface was not cleared.');
  h.g.j.ol (this.eb, '');
  this.Gr = null;
};
h.Za = function (a, c, d) {
  h.Za.v.constructor.call (this, a);
  this.bd = a.bd || h.Za.PB;
  this.vj = a.vj || h.Za.qD;
  this.Mm = h.gi.va ();
  c && (this.Yc = c);
  d && (this.ai = d);
  this.Yn = !!this.ai && h.g.vh ();
  this.Ok = [];
  this.Jc = new h.Au (a.Gd);
  this.wd = this.options.vq ? new h.Rg (a.vq, a.Wv) : null;
  this.ed = new h.Dt (this);
  this.os = {};
  this.zv = {};
  h.$ && h.$.lh && Dc (this, h.Bi, h.$.lh);
  h.uu && h.uu.lh && Dc (this, h.Yz, h.uu.lh);
  h.Qa && h.Qa.lh && (Dc (this, h.Tt, h.Qa.lh), E (this, h.Qa.GC));
  this.ec = this.options.Gd
    ? this.options.Gd.ec
    : new h.nu (this, this.options.DD || h.jf.Pf);
  this.ec.Bl.push (this);
  this.bb = h.i.va (this.options.Kr || 'geras', this.dg (), this.options.Lr);
  this.tp = null;
  this.Fc = !1;
};
h.g.object.S (h.Za, h.hb);
b = h.Za.prototype;
b.Sn = null;
b.ca = !0;
b.Cf = !0;
b.Bf = !1;
b.sn = !1;
b.Nr = !0;
b.scrollX = 0;
b.scrollY = 0;
b.uv = null;
b.scale = 1;
b.fc = null;
b.yb = null;
b.Z = null;
b.qa = null;
b.Pb = null;
b.Yc = null;
b.ai = null;
b.Yn = !1;
b.pn = !1;
b.Fq = null;
b.sw = null;
b.Vh = null;
b.lw = null;
b.Gq = !0;
b.Hf = function (a) {
  this.ed.Hf (a);
};
b.Jf = function (a) {
  this.ed.Jf (a);
};
b.Mc = function (a) {
  return this.ed ? this.ed.Mc (a) : null;
};
b.lb = function () {
  return this.ed ? this.ed.lb () : null;
};
b.dg = function () {
  return this.ec.dg ();
};
b.ql = function (a) {
  a || (a = h.jf.Pf);
  this.ec.ql (a);
};
function Ac (a) {
  a.L && a.bb.Ir (a.L, a.dg ());
  Ec (
    D (a, !1).filter (function (d) {
      return void 0 !== d.Al;
    })
  );
  Fc (a);
  a.qa && a.qa.aI ();
  a.isVisible () && a.cc (!0);
  var c = new h.h.jc (null, 'theme', null, null);
  c.wb = a.id;
  h.h.Ia (c);
}
function Ec (a) {
  for (var c = 0, d; (d = a[c]); c++) {
    var e = d.Al;
    e && (d.Th (e), d.ge && d.ge.$H ());
  }
}
function Ma (a) {
  if (a.Gq) {
    var c = y (a).getScreenCTM ();
    c && ((a.lw = c.inverse ()), (a.Gq = !1));
  }
  return a.lw;
}
b.Kl = function () {
  this.Gq = !0;
};
b.isVisible = function () {
  return this.Cf;
};
function ia (a, c) {
  var d = 0, e = 0, f = 1;
  if (h.g.j.containsNode (a.ob, c) || h.g.j.containsNode (a.Kf, c)) f = a.scale;
  do {
    var g = h.g.ee (c);
    if (c == a.ob || c == a.Kf) f = 1;
    d += g.x * f;
    e += g.y * f;
    c = c.parentNode;
  } while (c && c != y (a));
  return new h.g.O (d, e);
}
function aa (a) {
  if (!a.Fq)
    for (var c = a.L; c; ) {
      if (
        -1 !=
        (' ' + (c.getAttribute ('class') || '') + ' ').indexOf (
          ' injectionDiv '
        )
      ) {
        a.Fq = c;
        break;
      }
      c = c.parentNode;
    }
  return a.Fq;
}
b.Fa = function (a) {
  this.L = h.g.j.H ('g', {class: 'blocklyWorkspace'}, null);
  a &&
    ((this.dc = h.g.j.H (
      'rect',
      {height: '100%', width: '100%', class: a},
      this.L
    )), 'blocklyMainBackground' == a && this.wd
      ? (this.dc.style.fill = 'url(#' + this.wd.Xi.id + ')')
      : this.ec.subscribe (this.dc, 'workspaceBackgroundColour', 'fill'));
  this.ob = h.g.j.H ('g', {class: 'blocklyBlockCanvas'}, this.L);
  this.Kf = h.g.j.H ('g', {class: 'blocklyBubbleCanvas'}, this.L);
  this.Bf ||
    (h.ta (this.L, 'mousedown', this, this.wg, !1, !0), h.ta (
      this.L,
      'wheel',
      this,
      this.WC
    ));
  if (this.options.Zv) {
    if (!h.Vz) throw Error ('Missing require for Blockly.Toolbox');
    this.qa = new h.Vz (this);
  }
  this.wd && this.wd.update (this.scale);
  Gc (this);
  this.ed.Sr (new h.ii ());
  a = this.ed;
  var c = h.navigation.Sj, d = new h.Vj ();
  a.Gh[c] && zc (a, c);
  var e = new h.i.ef (a.o, a.o.bb.W (), d);
  d.Kc = e;
  a.Jf (d.Kc.Fa ());
  a.Gh[c] = d;
  this.bb.Fa (this.L, this.dg ());
  return this.L;
};
b.F = function () {
  this.ca = !1;
  this.Pb && this.Pb.cancel ();
  this.L && (h.g.j.removeNode (this.L), (this.L = null));
  this.Kf = this.ob = null;
  this.qa && (this.qa.F (), (this.qa = null));
  this.Z && (this.Z.F (), (this.Z = null));
  this.fc && (this.fc.F (), (this.fc = null));
  this.yb && (this.yb.F (), (this.yb = null));
  this.ci && (this.ci.F (), (this.ci = null));
  this.Jc && (this.Jc.F (), (this.Jc = null));
  this.wd && (this.wd.F (), (this.wd = null));
  this.bb.F ();
  if (this.ec) {
    var a = this.ec, c = a.Bl.indexOf (this);
    if (0 > c)
      throw Error (
        "Cannot unsubscribe a workspace that hasn't been subscribed."
      );
    a.Bl.splice (c, 1);
    this.ec.unsubscribe (this.dc);
    this.options.Gd || (this.ec.F (), (this.ec = null));
  }
  this.ed && (this.ed.F (), (this.ed = null));
  h.Za.v.F.call (this);
  this.zv = this.os = this.Mm = null;
  this.options.Gd || ((a = y (this).parentNode) && h.g.j.removeNode (a));
  this.Sn && (h.Wa (this.Sn), (this.Sn = null));
};
b.gr = function (a, c) {
  return new h.Oa (this, a, c);
};
function Hc (a) {
  if (!h.Wb) throw Error ('Missing require for Blockly.Trashcan');
  a.fc = new h.Wb (a);
  var c = a.fc.Fa ();
  a.L.insertBefore (c, a.ob);
}
function Ic (a) {
  if (!h.gA) throw Error ('Missing require for Blockly.ZoomControls');
  a.ci = new h.gA (a);
  var c = a.ci.Fa ();
  a.L.appendChild (c);
}
function Jc (a) {
  var c = new h.wc ({
    parentWorkspace: a,
    rtl: a.G,
    oneBasedIndex: a.options.Mn,
    horizontalLayout: a.rh,
    renderer: a.options.Kr,
    rendererOverrides: a.options.Lr,
  });
  c.cb = a.options.cb;
  if (a.rh) {
    if (!h.Ao) throw Error ('Missing require for Blockly.HorizontalFlyout');
    a.Z = new h.Ao (c);
  } else {
    if (!h.$g) throw Error ('Missing require for Blockly.VerticalFlyout');
    a.Z = new h.$g (c);
  }
  a.Z.Ei = !1;
  a.Z.o.cc (!0);
  return a.Z.Fa ('svg');
}
function F (a, c) {
  return a.Z || c ? a.Z : a.qa ? F (a.qa) : null;
}
function Ua (a) {
  a.Nr && a.ca && (a.yb && a.yb.resize (), a.Kl ());
}
b.resize = function () {
  this.qa && this.qa.position ();
  this.Z && this.Z.position ();
  this.fc && this.fc.position ();
  this.ci && this.ci.position ();
  this.yb && this.yb.resize ();
  this.Kl ();
  Gc (this);
};
function sb (a) {
  var c = h.g.IB ();
  h.g.O.vf (a.sw, c) || ((a.sw = c), a.Kl (), Gc (a));
}
function y (a) {
  if (!a.tp)
    for (var c = a.L; c; ) {
      if ('svg' == c.tagName) {
        a.tp = c;
        break;
      }
      c = c.parentNode;
    }
  return a.tp;
}
b.translate = function (a, c) {
  if (this.Yn && this.pn) this.ai.Xh (a, c);
  else {
    var d = 'translate(' + a + ',' + c + ') scale(' + this.scale + ')';
    this.ob.setAttribute ('transform', d);
    this.Kf.setAttribute ('transform', d);
  }
  if (this.Yc) {
    d = this.Yc;
    var e = this.scale;
    d.Dg = e;
    d.$d.setAttribute (
      'transform',
      'translate(' + a.toFixed (0) + ',' + c.toFixed (0) + ') scale(' + e + ')'
    );
  }
  this.wd && this.wd.moveTo (a, c);
};
function Oa (a) {
  if (a.Yn) {
    a.pn = !1;
    var c = a.ai.qq ();
    a.ai.Gm (a.L);
    c = 'translate(' + c.x + ',' + c.y + ') scale(' + a.scale + ')';
    a.ob.setAttribute ('transform', c);
    a.Kf.setAttribute ('transform', c);
  }
}
function Na (a) {
  if (a.Yn && !a.pn) {
    a.pn = !0;
    var c = a.ob.previousSibling,
      d = parseInt (y (a).getAttribute ('width'), 10),
      e = parseInt (y (a).getAttribute ('height'), 10),
      f = h.g.ee (a.ob),
      g = a.ai,
      k = a.ob,
      l = a.Kf,
      m = a.scale;
    if (g.eb.childNodes.length) throw Error ('Already dragging a block.');
    g.Gr = c;
    k.setAttribute ('transform', 'translate(0, 0) scale(' + m + ')');
    l.setAttribute ('transform', 'translate(0, 0) scale(' + m + ')');
    g.eb.setAttribute ('width', d);
    g.eb.setAttribute ('height', e);
    g.eb.appendChild (k);
    g.eb.appendChild (l);
    g.eb.style.display = 'block';
    a.ai.Xh (f.x, f.y);
  }
}
b.Kk = function () {
  var a = this.bd ();
  return a ? a.qb / this.scale : 0;
};
b.cc = function (a) {
  this.Cf = a;
  if (this.L)
    if (
      (this.yb && this.yb.Ph (a), F (this) && F (this).Ph (a), (y (
        this
      ).style.display = a ? 'block' : 'none'), this.qa &&
        (this.qa.OE.style.display = a ? 'block' : 'none'), a)
    ) {
      a = D (this, !1);
      for (var c = a.length - 1; 0 <= c; c--)
        a[c].Zk ();
      this.Ca ();
      this.qa && this.qa.position ();
    } else h.$b (!0);
};
b.Ca = function () {
  for (var a = D (this, !1), c = a.length - 1; 0 <= c; c--)
    a[c].Ca (!1);
  if (this.Pb)
    for ((a = this.Pb.Vi ()), (c = 0); c < a.length; c++)
      a[c].Ca (!1);
  c = this.ed;
  c.o.Fc && c.sf && c.o.lb ().draw ();
};
function Kc (a, c) {
  var d = C;
  if (void 0 === c) {
    for (var e = 0, f; (f = d.Ok[e]); e++)
      f.If (!1);
    d.Ok.length = 0;
  }
  if ((f = a ? d.Cc (a) : null))
    (a = void 0 === c || c)
      ? -1 == d.Ok.indexOf (f) && d.Ok.push (f)
      : h.g.Cm (d.Ok, f), f.If (a);
}
function Lc (a) {
  var c = h.kk;
  if (a.ca && !(c.getElementsByTagName ('block').length >= ab (a)))
    if ((a.Pb && a.Pb.cancel (), 'comment' == c.tagName.toLowerCase ())) {
      h.h.disable ();
      try {
        h.Ci.setValue (c.textContent);
        var d = void 0;
        var e = parseInt (c.getAttribute ('x'), 10),
          f = parseInt (c.getAttribute ('y'), 10);
        isNaN (e) || isNaN (f) || (a.G && (e = -e), d.moveBy (e + 50, f + 50));
      } finally {
        h.h.enable ();
      }
      d.select ();
    } else
      a: {
        h.h.disable ();
        try {
          var g = h.M.Si (c, a), k = a.Mc (h.navigation.Sj).Ra;
          if (a.Fc && k && k.fj) {
            h.navigation.kw (g, k.ea);
            break a;
          }
          var l = parseInt (c.getAttribute ('x'), 10),
            m = parseInt (c.getAttribute ('y'), 10);
          if (!isNaN (l) && !isNaN (m)) {
            a.G && (l = -l);
            do {
              c = !1;
              var n = D (a, !1);
              d = 0;
              for (var q; (q = n[d]); d++) {
                var r = q.Ma ();
                if (1 >= Math.abs (l - r.x) && 1 >= Math.abs (m - r.y)) {
                  c = !0;
                  break;
                }
              }
              if (!c) {
                var t = g.ce (!1);
                d = 0;
                for (var v; (v = t[d]); d++)
                  if (v.closest (h.ic, new h.g.O (l, m)).connection) {
                    c = !0;
                    break;
                  }
              }
              c && ((l = a.G ? l - h.ic : l + h.ic), (m += 2 * h.ic));
            } while (c);
            g.moveBy (l, m);
          }
        } finally {
          h.h.enable ();
        }
        h.h.isEnabled () && !g.Na && h.h.Ia (new h.h.Vl (g));
        g.select ();
      }
}
function Fc (a) {
  (a = a.Bf ? a.Vh : a) && !a.Pb && a.qa && F (a.qa) && a.qa.CH ();
}
b.Nh = function (a, c) {
  h.Za.v.Nh.call (this, a, c);
  Fc (this);
};
b.Qi = function (a) {
  h.Za.v.Qi.call (this, a);
  Fc (this);
};
b.Xd = function (a, c, d) {
  a = h.Za.v.Xd.call (this, a, c, d);
  Fc (this);
  return a;
};
function Gc (a) {
  a.kv = a.fc && a.L.parentNode ? a.fc.dn () : null;
  a.jv = a.Z ? a.Z.dn () : a.qa ? a.qa.dn () : null;
}
function ta (a, c) {
  return a.kv && a.kv.contains (c.clientX, c.clientY)
    ? h.to
    : a.jv && a.jv.contains (c.clientX, c.clientY) ? h.Us : h.Ts;
}
b.wg = function (a) {
  var c = this.cg (a);
  c && vb (c, a, this);
};
b.ds = function (a, c) {
  a = h.g.bl (a, y (this), Ma (this));
  a.x /= this.scale;
  a.y /= this.scale;
  this.uv = h.g.O.Ak (c, a);
};
b.Oc = function () {
  return null != this.Pb && this.Pb.Oc ();
};
function Mc (a) {
  return (
    (a.options.Qb && a.options.Qb.scrollbars) ||
    (a.options.Qb && a.options.Qb.Kg) ||
    (a.options.Qb && a.options.Qb.ag) ||
    (a.options.Ta && a.options.Ta.controls) ||
    (a.options.Ta && a.options.Ta.Kg) ||
    (a.options.Ta && a.options.Ta.Dr)
  );
}
b.Pc = function () {
  return (
    (this.options.Qb && this.options.Qb.scrollbars) ||
    (this.options.Qb && this.options.Qb.Kg) ||
    (this.options.Qb && this.options.Qb.ag) ||
    (this.options.Ta && this.options.Ta.Kg) ||
    (this.options.Ta && this.options.Ta.Dr)
  );
};
b.WC = function (a) {
  if (h.ki.Bq ()) a.preventDefault (), a.stopPropagation ();
  else {
    var c = this.options.Ta && this.options.Ta.Kg,
      d = this.options.Qb && this.options.Qb.Kg;
    if (c || d) {
      var e = h.g.Qv (a);
      !c || (!a.ctrlKey && d)
        ? ((c = this.scrollX - e.x), (d = this.scrollY - e.y), a.shiftKey &&
            !e.x &&
            ((c = this.scrollX - e.y), (d = this.scrollY)), this.scroll (c, d))
        : ((e = -e.y / 50), (c = h.g.bl (a, y (this), Ma (this))), this.zoom (
            c.x,
            c.y,
            e
          ));
      a.preventDefault ();
    }
  }
};
function Ra (a) {
  var c = a.pb (!1);
  a = Qa (a, !1);
  c = c.concat (a);
  if (!c.length) return new h.g.Rect (0, 0, 0, 0);
  a = uc (c[0]);
  for (var d = 1; d < c.length; d++) {
    var e = uc (c[d]);
    e.top < a.top && (a.top = e.top);
    e.bottom > a.bottom && (a.bottom = e.bottom);
    e.left < a.left && (a.left = e.left);
    e.right > a.right && (a.right = e.right);
  }
  return a;
}
b.GA = function () {
  this.Tb (!1);
  h.h.ka (!0);
  for (var a = this.pb (!0), c = 0, d = 0, e; (e = a[d]); d++)
    if (e.Pc ()) {
      var f = e.Ma ();
      e.moveBy (-f.x, c - f.y);
      tc (e);
      c = e.Ma ().y + z (e).height + this.bb.W ().Tj;
    }
  h.h.ka (!1);
  this.Tb (!0);
};
b.tl = function (a) {
  function c (v) {
    if (v.dd ()) t = t.concat (p (v, !1));
    else {
      v = Va (v, !1);
      for (var H = 0; H < v.length; H++)
        c (v[H]);
    }
  }
  function d () {
    h.h.ka (g);
    var v = t.shift ();
    v && (v.B ? (v.F (!1, !0), setTimeout (d, 10)) : d ());
    h.h.ka (!1);
  }
  if (!this.options.readOnly && !this.Bf) {
    var e = [], f = this.pb (!0), g = h.g.wf (), k = this, l = {};
    l.text = h.J.UNDO;
    l.enabled = 0 < this.Yh.length;
    l.Nb = this.ss.bind (this, !1);
    e.push (l);
    l = {};
    l.text = h.J.REDO;
    l.enabled = 0 < this.ll.length;
    l.Nb = this.ss.bind (this, !0);
    e.push (l);
    this.Pc () &&
      ((l = {}), (l.text = h.J.CLEAN_UP), (l.enabled =
        1 < f.length), (l.Nb = this.GA.bind (this)), e.push (l));
    if (this.options.collapse) {
      for (var m = (l = !1), n = 0; n < f.length; n++)
        for (var q = f[n]; q; )
          q.isCollapsed () ? (l = !0) : (m = !0), (q = u (q));
      var r = function (v) {
        for (var H = 0, S = 0; S < f.length; S++)
          for (var ka = f[S]; ka; )
            setTimeout (ka.Eg.bind (ka, v), H), (ka = u (ka)), (H += 10);
      };
      m = {enabled: m};
      m.text = h.J.COLLAPSE_ALL;
      m.Nb = function () {
        r (!0);
      };
      e.push (m);
      l = {enabled: l};
      l.text = h.J.EXPAND_ALL;
      l.Nb = function () {
        r (!1);
      };
      e.push (l);
    }
    var t = [];
    for (n = 0; n < f.length; n++)
      c (f[n]);
    l = {
      text: 1 == t.length
        ? h.J.DELETE_BLOCK
        : h.J.DELETE_X_BLOCKS.replace ('%1', String (t.length)),
      enabled: 0 < t.length,
      Nb: function () {
        k.Pb && k.Pb.cancel ();
        2 > t.length
          ? d ()
          : h.confirm (
              h.J.DELETE_ALL_BLOCKS.replace ('%1', t.length),
              function (v) {
                v && d ();
              }
            );
      },
    };
    e.push (l);
    this.MA && this.MA (e, a);
    h.wa.show (a, e, this.G);
  }
};
function La (a) {
  if (a.options.Gd) La (a.options.Gd);
  else {
    h.Xk = a;
    document.activeElement && document.activeElement.blur ();
    try {
      y (a).focus ({preventScroll: !0});
    } catch (c) {
      try {
        y (a).parentNode.setActive ();
      } catch (d) {
        y (a).parentNode.focus ({preventScroll: !0});
      }
    }
  }
}
b.zoom = function (a, c, d) {
  d = Math.pow (this.options.Ta.jD, d);
  var e = this.scale * d;
  if (this.scale != e) {
    e > this.options.Ta.$k
      ? (d = this.options.Ta.$k / this.scale)
      : e < this.options.Ta.al && (d = this.options.Ta.al / this.scale);
    var f = this.ob.getCTM (), g = y (this).createSVGPoint ();
    g.x = a;
    g.y = c;
    g = g.matrixTransform (f.inverse ());
    a = g.x;
    c = g.y;
    f = f.translate (a * (1 - d), c * (1 - d)).scale (d);
    this.scrollX = f.e;
    this.scrollY = f.f;
    this.setScale (e);
  }
};
b.setScale = function (a) {
  this.options.Ta.$k && a > this.options.Ta.$k
    ? (a = this.options.Ta.$k)
    : this.options.Ta.al && a < this.options.Ta.al && (a = this.options.Ta.al);
  this.scale = a;
  h.$b (!1);
  this.Z && (this.Z.Hr (), Gc (this));
  this.wd && this.wd.update (this.scale);
  a = this.bd ();
  this.scrollX -= a.kc;
  this.scrollY -= a.xc;
  a.Bb += a.kc;
  a.Ib += a.xc;
  this.scroll (this.scrollX, this.scrollY);
  this.yb &&
    (this.Z
      ? (Fa (this.yb.xd, a), Ga (this.yb.Ld, a))
      : (Ia (this.yb.xd, a), Ka (this.yb.Ld, a)));
};
b.scroll = function (a, c) {
  h.$b (!0);
  var d = this.bd (), e = d.Ie + d.Ac - d.qb, f = d.vd + d.nc - d.Ab;
  a = Math.min (a, -d.Ac);
  c = Math.min (c, -d.nc);
  a = Math.max (a, -e);
  c = Math.max (c, -f);
  this.scrollX = a;
  this.scrollY = c;
  this.yb &&
    (Ba (this.yb.xd, -(a + d.Ac) * this.yb.xd.Rb), Ba (
      this.yb.Ld,
      -(c + d.nc) * this.yb.Ld.Rb
    ));
  a += d.kc;
  c += d.xc;
  this.translate (a, c);
};
h.Za.Jv = function (a) {
  var c = 0, d = 0;
  a && ((c = a.Kk ()), (d = a.Zb));
  return {width: c, height: d};
};
h.Za.FB = function (a, c) {
  return Mc (a) ? h.Za.EB (a, c) : h.Za.Hv (a);
};
h.Za.Hv = function (a) {
  var c = Ra (a), d = a.scale;
  a = c.top * d;
  var e = c.bottom * d, f = c.left * d;
  c = c.right * d;
  return {top: a, bottom: e, left: f, right: c, width: c - f, height: e - a};
};
h.Za.EB = function (a, c) {
  a = h.Za.Hv (a);
  var d = c.width;
  c = c.height;
  var e = d / 2,
    f = c / 2,
    g = Math.min (a.left - e, a.right - d),
    k = Math.min (a.top - f, a.bottom - c);
  return {
    left: g,
    top: k,
    height: Math.max (a.bottom + f, a.top + c) - k,
    width: Math.max (a.right + e, a.left + d) - g,
  };
};
h.Za.PB = function () {
  var a = h.Za.Jv (this.qa),
    c = h.Za.Jv (this.Z),
    d = h.BD (y (this)),
    e = {height: d.height, width: d.width};
  if (this.qa)
    if (this.cb == h.Xg || this.cb == h.bk) e.height -= a.height;
    else {
      if (this.cb == h.Rd || this.cb == h.Wg) e.width -= a.width;
    }
  else if (this.Z)
    if (this.cb == h.Xg || this.cb == h.bk) e.height -= c.height;
    else if (this.cb == h.Rd || this.cb == h.Wg) e.width -= c.width;
  var f = h.Za.FB (this, e), g = 0;
  this.qa && this.cb == h.Rd
    ? (g = a.width)
    : this.Z && this.cb == h.Rd && (g = c.width);
  var k = 0;
  this.qa && this.cb == h.Xg
    ? (k = a.height)
    : this.Z && this.cb == h.Xg && (k = c.height);
  return {
    vd: f.height,
    Ie: f.width,
    nc: f.top,
    Ac: f.left,
    Ab: e.height,
    qb: e.width,
    Ib: -this.scrollY,
    Bb: -this.scrollX,
    xc: k,
    kc: g,
    WH: d.height,
    XH: d.width,
    wx: a.width,
    ZH: a.height,
    eH: c.width,
    dH: c.height,
    cb: this.cb,
  };
};
h.Za.qD = function (a) {
  var c = this.bd ();
  'number' == typeof a.x && (this.scrollX = -c.Ie * a.x - c.Ac);
  'number' == typeof a.y && (this.scrollY = -c.vd * a.y - c.nc);
  this.translate (this.scrollX + c.kc, this.scrollY + c.xc);
};
b = h.Za.prototype;
b.Cc = function (a) {
  return h.Za.v.Cc.call (this, a);
};
b.pb = function (a) {
  return h.Za.v.pb.call (this, a);
};
b.Tb = function (a) {
  var c = !this.Nr && a;
  this.Nr = a;
  c && Ua (this);
};
b.clear = function () {
  this.Tb (!1);
  h.Za.v.clear.call (this);
  this.Tb (!0);
};
function Nc (a, c) {
  if ('function' != typeof c)
    throw TypeError ('Button callbacks must be functions.');
  a.zv.CREATE_VARIABLE = c;
}
function Dc (a, c, d) {
  if ('function' != typeof d)
    throw TypeError ('Toolbox category callbacks must be functions.');
  a.os[c] = d;
}
b.cg = function (a) {
  var c =
    'mousedown' == a.type || 'touchstart' == a.type || 'pointerdown' == a.type,
    d = this.Pb;
  return d
    ? c && d.qh
        ? (console.warn (
            'Tried to start the same gesture twice.'
          ), d.cancel (), null)
        : d
    : c ? (this.Pb = new h.Ic (a, this)) : null;
};
h.Pj = function (a) {
  a.bd = this.gn.bind (this);
  a.vj = this.mx.bind (this);
  this.o = new h.Za (a);
  this.o.Bf = !0;
  this.o.cc (this.Cf);
  this.G = !!a.G;
  this.Ej = a.cb;
  this.bq = [];
  this.Bn = [];
  this.hk = [];
  this.Gc = [];
  this.Cr = [];
  this.Dj = this.o.bb.W ().ym;
};
b = h.Pj.prototype;
b.Ei = !0;
b.Cf = !1;
b.bh = !0;
b.fb = 8;
b.Tf = h.Pj.prototype.fb;
b.Ty = 3 * h.Pj.prototype.Tf;
b.Uy = 3 * h.Pj.prototype.Tf;
b.Wo = 2;
b.Xa = 0;
b.Zb = 0;
b.jB = 70;
b.Fa = function (a) {
  this.L = h.g.j.H (a, {class: 'blocklyFlyout', style: 'display: none'}, null);
  this.dc = h.g.j.H ('path', {class: 'blocklyFlyoutBackground'}, this.L);
  this.L.appendChild (this.o.Fa ());
  this.o.ec.subscribe (this.dc, 'flyoutBackgroundColour', 'fill');
  this.o.ec.subscribe (this.dc, 'flyoutOpacity', 'fill-opacity');
  this.o.ed.Sr (new h.gm ());
  return this.L;
};
b.va = function (a) {
  this.Lb = a;
  this.o.Vh = a;
  this.Sb = new h.Ea (this.o, this.aj, !1, 'blocklyFlyoutScrollbar');
  this.Ba ();
  Array.prototype.push.apply (this.bq, h.ta (this.L, 'wheel', this, this.ND));
  this.Ei || ((this.$m = this.cq.bind (this)), E (this.Lb, this.$m));
  Array.prototype.push.apply (
    this.bq,
    h.ta (this.dc, 'mousedown', this, this.wg)
  );
  this.o.cg = this.Lb.cg.bind (this.Lb);
  this.o.Yr (this.Lb.Ha);
  a = this.o;
  a.pj = new h.fp (a);
};
b.F = function () {
  this.Ba ();
  h.Wa (this.bq);
  this.$m && (db (this.Lb, this.$m), (this.$m = null));
  this.Sb && (this.Sb.F (), (this.Sb = null));
  this.o &&
    (this.o.ec.unsubscribe (
      this.dc
    ), (this.o.Vh = null), this.o.F (), (this.o = null));
  this.L && (h.g.j.removeNode (this.L), (this.L = null));
  this.Lb = this.dc = null;
};
b.Kk = function () {
  return this.Xa;
};
b.isVisible = function () {
  return this.Cf;
};
b.cc = function (a) {
  var c = a != this.isVisible ();
  this.Cf = a;
  c && this.Jl ();
};
b.Ph = function (a) {
  var c = a != this.bh;
  this.bh = a;
  c && this.Jl ();
};
b.Jl = function () {
  var a = this.bh ? this.isVisible () : !1;
  this.L.style.display = a ? 'block' : 'none';
  this.Sb.Ph (a);
};
b.Ba = function () {
  if (this.isVisible ()) {
    this.cc (!1);
    for (var a = 0, c; (c = this.Gc[a]); a++)
      h.Wa (c);
    this.Gc.length = 0;
    this.Bg && (db (this.o, this.Bg), (this.Bg = null));
  }
};
b.show = function (a) {
  this.o.Tb (!1);
  this.Ba ();
  Oc (this);
  if ('string' == typeof a) {
    a = this.o.Vh.os[a] || null;
    if ('function' != typeof a)
      throw TypeError (
        "Couldn't find a callback function when opening a toolbox category."
      );
    a = a (this.o.Vh);
    if (!Array.isArray (a))
      throw TypeError ('Result of toolbox category callback must be an array.');
  }
  this.cc (!0);
  var c = [], d = [];
  this.Cr.length = 0;
  for (var e = this.aj ? this.Ty : this.Uy, f = 0, g; (g = a[f]); f++)
    if (g.tagName)
      switch (g.tagName.toUpperCase ()) {
        case 'BLOCK':
          var k = h.M.Si (g, this.o);
          k.isEnabled () || this.Cr.push (k);
          c.push ({type: 'block', block: k});
          g = parseInt (g.getAttribute ('gap'), 10);
          d.push (isNaN (g) ? e : g);
          break;
        case 'SEP':
          g = parseInt (g.getAttribute ('gap'), 10);
          !isNaN (g) && 0 < d.length ? (d[d.length - 1] = g) : d.push (e);
          break;
        case 'LABEL':
        case 'BUTTON':
          k = 'LABEL' == g.tagName.toUpperCase ();
          if (!h.Sy) throw Error ('Missing require for Blockly.FlyoutButton');
          g = new h.Sy (this.o, this.Lb, g, k);
          c.push ({type: 'button', button: g});
          d.push (e);
      }
  Pc (this, c, d);
  this.Gc.push (
    h.ta (this.dc, 'mouseover', this, function () {
      for (var l = this.o.pb (!1), m = 0, n; (n = l[m]); m++) n.ml ();
    })
  );
  this.aj ? (this.Zb = 0) : (this.Xa = 0);
  this.o.Tb (!0);
  this.Hr ();
  this.cq ();
  this.position ();
  this.Bg = this.Hr.bind (this);
  E (this.o, this.Bg);
};
function Oc (a) {
  for (var c = a.o.pb (!1), d = 0, e; (e = c[d]); d++)
    e.B == a.o && e.F (!1, !1);
  for (d = 0; d < a.Bn.length; d++)
    if ((c = a.Bn[d])) h.C.rs (c), h.g.j.removeNode (c);
  for (d = a.Bn.length = 0; (c = a.hk[d]); d++)
    c.F ();
  a.hk.length = 0;
  a.o.pj.clear ();
}
function Qc (a, c) {
  return function (d) {
    var e = a.Lb.cg (d);
    e && (xb (e, c), wb (e, d, a));
  };
}
b.wg = function (a) {
  var c = this.Lb.cg (a);
  c && wb (c, a, this);
};
function lb (a, c) {
  var d = null;
  h.h.disable ();
  var e = a.Lb.mh ();
  a.Lb.Tb (!1);
  try {
    var f = a.Lb;
    if (!c.ma ()) throw Error ('oldBlock is not rendered.');
    var g = h.M.Xf (c, !0);
    f.Tb (!1);
    var k = h.M.Si (g, f);
    if (!k.ma ()) throw Error ('block is not rendered.');
    var l = h.g.Jk (f.ob), m = h.g.Jk (a.o.ob), n = c.Ma ();
    n.scale (a.o.scale);
    var q = h.g.O.sum (m, n), r = h.g.O.Ak (q, l);
    r.scale (1 / f.scale);
    k.moveBy (r.x, r.y);
    d = k;
    h.$b ();
  } finally {
    h.h.enable ();
  }
  c = h.$.Fv (a.Lb, e);
  if (h.h.isEnabled ())
    for (h.h.ka (!0), h.h.Ia (new h.h.Md (d)), (e = 0); e < c.length; e++)
      h.h.Ia (new h.h.sd (c[e]));
  a.Ei ? a.Ba () : a.cq ();
  return d;
}
b.cq = function () {
  for (var a = this.o.pb (!1), c = 0, d; (d = a[c]); c++)
    if (-1 == this.Cr.indexOf (d))
      for (var e = bb (this.Lb, h.g.jq (d)); d; )
        d.Se (e), (d = u (d));
};
b.Hr = function () {
  this.Bg && db (this.o, this.Bg);
  this.o.scale = this.Lb.scale;
  for (var a = 0, c = this.o.pb (!1), d = 0, e; (e = c[d]); d++) {
    var f = z (e).width;
    e.K && (f -= this.Dj);
    a = Math.max (a, f);
  }
  for (d = 0; (e = this.hk[d]); d++)
    a = Math.max (a, e.width);
  a += 1.5 * this.Tf + this.Dj;
  a *= this.o.scale;
  a += h.Ea.bc;
  if (this.Xa != a) {
    for (d = 0; (e = c[d]); d++) {
      if (this.G) {
        f = e.Ma ().x;
        var g = a / this.o.scale - this.Tf;
        e.K || (g -= this.Dj);
        e.moveBy (g - f, 0);
      }
      e.Av &&
        ((f = e.Av), (g = e), (e = z (g)), f.setAttribute (
          'width',
          e.width
        ), f.setAttribute ('height', e.height), (g = g.Ma ()), f.setAttribute (
          'y',
          g.y
        ), f.setAttribute ('x', this.G ? g.x - e.width : g.x));
    }
    if (this.G)
      for (d = 0; (e = this.hk[d]); d++)
        (c = e.mH ().y), e.moveTo (
          a / this.o.scale - e.width - this.Tf - this.Dj,
          c
        );
    this.Xa = a;
    this.position ();
  }
  this.Bg && E (this.o, this.Bg);
};
function rb (a) {
  return a.Sb ? a.Sb.isVisible () : !1;
}
b.gd = function (a) {
  return this.o.lb ().gd (a);
};
h.V = {};
h.V.hd = null;
h.V.Sm = null;
h.V.ie = '';
h.V.le = '';
h.V.Fa = function () {
  h.V.Ua ||
    ((h.V.Ua = document.createElement ('div')), (h.V.Ua.className =
      'blocklyWidgetDiv'), (h.Nn || document.body).appendChild (h.V.Ua));
};
h.V.show = function (a, c, d) {
  h.V.Ba ();
  h.V.hd = a;
  h.V.Sm = d;
  a = h.V.Ua;
  a.style.direction = c ? 'rtl' : 'ltr';
  a.style.display = 'block';
  h.V.ie = h.ua ().bb.ae ();
  h.V.le = h.ua ().dg ().ae ();
  h.g.j.xb (a, h.V.ie);
  h.g.j.xb (a, h.V.le);
};
h.V.Ba = function () {
  if (h.V.isVisible ()) {
    h.V.hd = null;
    var a = h.V.Ua;
    a.style.display = 'none';
    a.style.left = '';
    a.style.top = '';
    h.V.Sm && h.V.Sm ();
    h.V.Sm = null;
    a.textContent = '';
    h.V.ie && (h.g.j.Rc (a, h.V.ie), (h.V.ie = ''));
    h.V.le && (h.g.j.Rc (a, h.V.le), (h.V.le = ''));
    La (h.ua ());
  }
};
h.V.isVisible = function () {
  return !!h.V.hd;
};
h.V.Nk = function (a) {
  h.V.hd == a && h.V.Ba ();
};
h.V.hl = function (a, c, d) {
  h.V.Ua.style.left = a + 'px';
  h.V.Ua.style.top = c + 'px';
  h.V.Ua.style.height = d + 'px';
};
h.V.bD = function (a, c, d, e) {
  var f = h.V.zA (a, c, d);
  a = h.V.yA (a, c, d, e);
  0 > f ? h.V.hl (a, 0, d.height + f) : h.V.hl (a, f, d.height);
};
h.V.yA = function (a, c, d, e) {
  if (e)
    return (c = Math.max (c.right - d.width, a.left)), Math.min (
      c,
      a.right - d.width
    );
  c = Math.min (c.left, a.right - d.width);
  return Math.max (c, a.left);
};
h.V.zA = function (a, c, d) {
  return c.bottom + d.height >= a.bottom ? c.top - d.height : c.bottom;
};
h.$g = function (a) {
  a.bd = this.gn.bind (this);
  a.vj = this.mx.bind (this);
  h.$g.v.constructor.call (this, a);
  this.aj = !1;
};
h.g.object.S (h.$g, h.Pj);
b = h.$g.prototype;
b.gn = function () {
  if (!this.isVisible ()) return null;
  try {
    var a = this.o.ob.getBBox ();
  } catch (f) {
    a = {height: 0, y: 0, width: 0, x: 0};
  }
  var c = this.Wo, d = this.Zb - 2 * this.Wo, e = this.Xa;
  this.G || (e -= this.Wo);
  return {
    Ab: d,
    qb: e,
    vd: a.height * this.o.scale + 2 * this.Tf,
    Ie: a.width * this.o.scale + 2 * this.Tf,
    Ib: -this.o.scrollY + a.y,
    Bb: -this.o.scrollX,
    nc: a.y,
    Ac: a.x,
    xc: c,
    kc: 0,
  };
};
b.mx = function (a) {
  var c = this.gn ();
  c &&
    ('number' == typeof a.y &&
      (this.o.scrollY = -c.vd * a.y), this.o.translate (
      this.o.scrollX + c.kc,
      this.o.scrollY + c.xc
    ));
};
b.position = function () {
  if (this.isVisible ()) {
    var a = this.Lb.bd ();
    if (a) {
      this.Zb = a.Ab;
      var c = this.Xa - this.fb,
        d = a.Ab - 2 * this.fb,
        e = this.Ej == h.Wg,
        f = c + this.fb;
      f = ['M ' + (e ? f : 0) + ',0'];
      f.push ('h', e ? -c : c);
      f.push (
        'a',
        this.fb,
        this.fb,
        0,
        0,
        e ? 0 : 1,
        e ? -this.fb : this.fb,
        this.fb
      );
      f.push ('v', Math.max (0, d));
      f.push (
        'a',
        this.fb,
        this.fb,
        0,
        0,
        e ? 0 : 1,
        e ? this.fb : -this.fb,
        this.fb
      );
      f.push ('h', e ? c : -c);
      f.push ('z');
      this.dc.setAttribute ('d', f.join (' '));
      c = this.Zb;
      a = this.Lb.cb == this.Ej
        ? a.wx
            ? this.Ej == h.Rd ? a.wx : a.qb - this.Xa
            : this.Ej == h.Rd ? 0 : a.qb
        : this.Ej == h.Rd ? 0 : a.qb + a.kc - this.Xa;
      this.L.setAttribute ('width', this.Xa);
      this.L.setAttribute ('height', c);
      'svg' == this.L.tagName
        ? h.g.j.ol (this.L, 'translate(' + a + 'px,0px)')
        : this.L.setAttribute ('transform', 'translate(' + a + ',0)');
      this.Sb &&
        ((this.Sb.wr = new h.g.O (a, 0)), this.Sb.resize (), Ea (
          this.Sb,
          this.Sb.Qe.x,
          this.Sb.Qe.y
        ));
    }
  }
};
b.ND = function (a) {
  var c = h.g.Qv (a);
  if (c.y) {
    var d = this.gn ();
    c = d.Ib - d.nc + c.y;
    c = Math.min (c, d.vd - d.Ab);
    c = Math.max (c, 0);
    this.Sb.set (c);
    h.V.Ba ();
  }
  a.preventDefault ();
  a.stopPropagation ();
};
function Pc (a, c, d) {
  a.o.scale = a.Lb.scale;
  for (var e = a.Tf, f = a.G ? e : e + a.Dj, g = 0, k; (k = c[g]); g++)
    if ('block' == k.type) {
      k = k.block;
      for (var l = p (k, !1), m = 0, n; (n = l[m]); m++)
        n.fe = !0;
      k.Ca ();
      n = k.ma ();
      l = z (k);
      m = k.K ? f - a.Dj : f;
      k.moveBy (m, e);
      var q = a, r = k, t = g;
      m = h.g.j.H (
        'rect',
        {
          'fill-opacity': 0,
          x: a.G ? m - l.width : m,
          y: e,
          height: l.height,
          width: l.width,
        },
        null
      );
      m.me = r;
      h.C.Fi (m);
      q.o.ob.insertBefore (m, r.ma ());
      r.Av = m;
      q.Bn[t] = m;
      q = a;
      q.Gc.push (h.ta (n, 'mousedown', null, Qc (q, k)));
      q.Gc.push (h.ta (m, 'mousedown', null, Qc (q, k)));
      q.Gc.push (h.Xb (n, 'mouseenter', k, k.Am));
      q.Gc.push (h.Xb (n, 'mouseleave', k, k.ml));
      q.Gc.push (h.Xb (m, 'mouseenter', k, k.Am));
      q.Gc.push (h.Xb (m, 'mouseleave', k, k.ml));
      e += l.height + d[g];
    } else
      'button' == k.type &&
        ((l = a), (m = k.button), (n = f), (q = e), (r = m.Fa ()), m.moveTo (
          n,
          q
        ), m.show (), l.Gc.push (h.ta (r, 'mousedown', l, l.wg)), l.hk.push (
          m
        ), (e += k.button.height + d[g]));
}
b.dn = function () {
  if (!this.L) return null;
  var a = this.L.getBoundingClientRect (), c = a.left;
  return this.Ej == h.Rd
    ? new h.g.Rect (-1e9, 1e9, -1e9, c + a.width)
    : new h.g.Rect (-1e9, 1e9, c, 1e9);
};
h.Ms = function (a) {
  this.pk = a;
  this.Fa ();
};
b = h.Ms.prototype;
b.eb = null;
b.$d = null;
b.pk = null;
b.Dg = 1;
b.Cl = null;
b.Fa = function () {
  this.eb ||
    ((this.eb = h.g.j.H (
      'svg',
      {
        xmlns: h.g.j.wm,
        'xmlns:html': h.g.j.xo,
        'xmlns:xlink': h.g.j.Xc,
        version: '1.1',
        class: 'blocklyBlockDragSurface',
      },
      this.pk
    )), (this.$d = h.g.j.H ('g', {}, this.eb)));
};
function qb (a, c) {
  if (a.$d.childNodes.length) throw Error ('Already dragging a block.');
  a.$d.appendChild (c);
  a.eb.style.display = 'block';
  a.Cl = new h.g.O (0, 0);
}
b.Xh = function (a, c) {
  this.Cl = new h.g.O (a * this.Dg, c * this.Dg);
  a = this.Cl.x;
  c = this.Cl.y;
  a = a.toFixed (0);
  c = c.toFixed (0);
  this.eb.style.display = 'block';
  h.g.j.ol (this.eb, 'translate3d(' + a + 'px, ' + c + 'px, 0px)');
};
b.qq = function () {
  var a = h.g.ee (this.eb);
  return new h.g.O (a.x / this.Dg, a.y / this.Dg);
};
b.Kb = function () {
  return this.$d;
};
b.Gm = function (a) {
  a
    ? a.appendChild (this.$d.firstChild)
    : this.$d.removeChild (this.$d.firstChild);
  this.eb.style.display = 'none';
  if (this.$d.childNodes.length) throw Error ('Drag group was not cleared.');
  this.Cl = null;
};
h.ld = {};
h.ld.Eq = !1;
h.ld.register = function (a) {
  if (h.ld.Eq) throw Error ('CSS already injected');
  Array.prototype.push.apply (h.ld.qo, a);
  a.length = 0;
};
h.ld.kg = function (a, c) {
  if (!h.ld.Eq) {
    h.ld.Eq = !0;
    var d = h.ld.qo.join ('\n');
    h.ld.qo.length = 0;
    a &&
      ((a = c.replace (/[\\/]$/, '')), (d = d.replace (
        /<<<PATH>>>/g,
        a
      )), (a = document.createElement ('style')), (a.id =
        'blockly-common-style'), (d = document.createTextNode (
        d
      )), a.appendChild (d), document.head.insertBefore (
        a,
        document.head.firstChild
      ));
  }
};
h.ld.Sr = function () {
  console.warn (
    'Deprecated call to Blockly.Css.setCursor. See https://github.com/google/blockly/issues/981 for context'
  );
};
h.ld.qo = [
  '.blocklySvg {',
  'background-color: #fff;',
  'outline: none;',
  'overflow: hidden;',
  'position: absolute;',
  'display: block;',
  '}',
  '.blocklyWidgetDiv {',
  'display: none;',
  'position: absolute;',
  'z-index: 99999;',
  '}',
  '.injectionDiv {',
  'height: 100%;',
  'position: relative;',
  'overflow: hidden;',
  'touch-action: none;',
  '}',
  '.blocklyNonSelectable {',
  'user-select: none;',
  '-ms-user-select: none;',
  '-webkit-user-select: none;',
  '}',
  '.blocklyWsDragSurface {',
  'display: none;',
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  '}',
  '.blocklyWsDragSurface.blocklyOverflowVisible {',
  'overflow: visible;',
  '}',
  '.blocklyBlockDragSurface {',
  'display: none;',
  'position: absolute;',
  'top: 0;',
  'left: 0;',
  'right: 0;',
  'bottom: 0;',
  'overflow: visible !important;',
  'z-index: 50;',
  '}',
  '.blocklyBlockCanvas.blocklyCanvasTransitioning,',
  '.blocklyBubbleCanvas.blocklyCanvasTransitioning {',
  'transition: transform .5s;',
  '}',
  '.blocklyTooltipDiv {',
  'background-color: #ffffc7;',
  'border: 1px solid #ddc;',
  'box-shadow: 4px 4px 20px 1px rgba(0,0,0,.15);',
  'color: #000;',
  'display: none;',
  'font-family: sans-serif;',
  'font-size: 9pt;',
  'opacity: .9;',
  'padding: 2px;',
  'position: absolute;',
  'z-index: 100000;',
  '}',
  '.blocklyDropDownDiv {',
  'position: absolute;',
  'left: 0;',
  'top: 0;',
  'z-index: 1000;',
  'display: none;',
  'border: 1px solid;',
  'border-color: #dadce0;',
  'background-color: #fff;',
  'border-radius: 2px;',
  'padding: 4px;',
  'box-shadow: 0px 0px 3px 1px rgba(0,0,0,.3);',
  '}',
  '.blocklyDropDownDiv.focused {',
  'box-shadow: 0px 0px 6px 1px rgba(0,0,0,.3);',
  '}',
  '.blocklyDropDownContent {',
  'max-height: 300px;',
  'overflow: auto;',
  'overflow-x: hidden;',
  '}',
  '.blocklyDropDownArrow {',
  'position: absolute;',
  'left: 0;',
  'top: 0;',
  'width: 16px;',
  'height: 16px;',
  'z-index: -1;',
  'background-color: inherit;',
  'border-color: inherit;',
  '}',
  '.blocklyDropDownButton {',
  'display: inline-block;',
  'float: left;',
  'padding: 0;',
  'margin: 4px;',
  'border-radius: 4px;',
  'outline: none;',
  'border: 1px solid;',
  'transition: box-shadow .1s;',
  'cursor: pointer;',
  '}',
  '.blocklyArrowTop {',
  'border-top: 1px solid;',
  'border-left: 1px solid;',
  'border-top-left-radius: 4px;',
  'border-color: inherit;',
  '}',
  '.blocklyArrowBottom {',
  'border-bottom: 1px solid;',
  'border-right: 1px solid;',
  'border-bottom-right-radius: 4px;',
  'border-color: inherit;',
  '}',
  '.blocklyResizeSE {',
  'cursor: se-resize;',
  'fill: #aaa;',
  '}',
  '.blocklyResizeSW {',
  'cursor: sw-resize;',
  'fill: #aaa;',
  '}',
  '.blocklyResizeLine {',
  'stroke: #515A5A;',
  'stroke-width: 1;',
  '}',
  '.blocklyHighlightedConnectionPath {',
  'fill: none;',
  'stroke: #fc3;',
  'stroke-width: 4px;',
  '}',
  '.blocklyPathLight {',
  'fill: none;',
  'stroke-linecap: round;',
  'stroke-width: 1;',
  '}',
  '.blocklySelected>.blocklyPathLight {',
  'display: none;',
  '}',
  '.blocklyDraggable {',
  'cursor: url("<<<PATH>>>/handopen.cur"), auto;',
  'cursor: grab;',
  'cursor: -webkit-grab;',
  '}',
  '.blocklyDragging {',
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',
  '.blocklyDraggable:active {',
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',
  '.blocklyBlockDragSurface .blocklyDraggable {',
  'cursor: url("<<<PATH>>>/handclosed.cur"), auto;',
  'cursor: grabbing;',
  'cursor: -webkit-grabbing;',
  '}',
  '.blocklyDragging.blocklyDraggingDelete {',
  'cursor: url("<<<PATH>>>/handdelete.cur"), auto;',
  '}',
  '.blocklyDragging>.blocklyPath,',
  '.blocklyDragging>.blocklyPathLight {',
  'fill-opacity: .8;',
  'stroke-opacity: .8;',
  '}',
  '.blocklyDragging>.blocklyPathDark {',
  'display: none;',
  '}',
  '.blocklyDisabled>.blocklyPath {',
  'fill-opacity: .5;',
  'stroke-opacity: .5;',
  '}',
  '.blocklyDisabled>.blocklyPathLight,',
  '.blocklyDisabled>.blocklyPathDark {',
  'display: none;',
  '}',
  '.blocklyInsertionMarker>.blocklyPath,',
  '.blocklyInsertionMarker>.blocklyPathLight,',
  '.blocklyInsertionMarker>.blocklyPathDark {',
  'fill-opacity: .2;',
  'stroke: none',
  '}',
  '.blocklyMultilineText {',
  'font-family: monospace;',
  '}',
  '.blocklyNonEditableText>text {',
  'pointer-events: none;',
  '}',
  '.blocklyFlyout {',
  'position: absolute;',
  'z-index: 20;',
  '}',
  '.blocklyText text {',
  'cursor: default;',
  '}',
  '.blocklySvg text, .blocklyBlockDragSurface text {',
  'user-select: none;',
  '-ms-user-select: none;',
  '-webkit-user-select: none;',
  'cursor: inherit;',
  '}',
  '.blocklyHidden {',
  'display: none;',
  '}',
  '.blocklyFieldDropdown:not(.blocklyHidden) {',
  'display: block;',
  '}',
  '.blocklyIconGroup {',
  'cursor: default;',
  '}',
  '.blocklyIconGroup:not(:hover),',
  '.blocklyIconGroupReadonly {',
  'opacity: .6;',
  '}',
  '.blocklyIconShape {',
  'fill: #00f;',
  'stroke: #fff;',
  'stroke-width: 1px;',
  '}',
  '.blocklyIconSymbol {',
  'fill: #fff;',
  '}',
  '.blocklyMinimalBody {',
  'margin: 0;',
  'padding: 0;',
  '}',
  '.blocklyHtmlInput {',
  'border: none;',
  'border-radius: 4px;',
  'height: 100%;',
  'margin: 0;',
  'outline: none;',
  'padding: 0;',
  'width: 100%;',
  'text-align: center;',
  'display: block;',
  'box-sizing: border-box;',
  '}',
  '.blocklyHtmlInput::-ms-clear {',
  'display: none;',
  '}',
  '.blocklyMainBackground {',
  'stroke-width: 1;',
  'stroke: #c6c6c6;',
  '}',
  '.blocklyMutatorBackground {',
  'fill: #fff;',
  'stroke: #ddd;',
  'stroke-width: 1;',
  '}',
  '.blocklyFlyoutBackground {',
  'fill: #ddd;',
  'fill-opacity: .8;',
  '}',
  '.blocklyMainWorkspaceScrollbar {',
  'z-index: 20;',
  '}',
  '.blocklyFlyoutScrollbar {',
  'z-index: 30;',
  '}',
  '.blocklyScrollbarHorizontal, .blocklyScrollbarVertical {',
  'position: absolute;',
  'outline: none;',
  '}',
  '.blocklyScrollbarBackground {',
  'opacity: 0;',
  '}',
  '.blocklyScrollbarHandle {',
  'fill: #ccc;',
  '}',
  '.blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyScrollbarHandle:hover {',
  'fill: #bbb;',
  '}',
  '.blocklyFlyout .blocklyScrollbarHandle {',
  'fill: #bbb;',
  '}',
  '.blocklyFlyout .blocklyScrollbarBackground:hover+.blocklyScrollbarHandle,',
  '.blocklyFlyout .blocklyScrollbarHandle:hover {',
  'fill: #aaa;',
  '}',
  '.blocklyInvalidInput {',
  'background: #faa;',
  '}',
  '.blocklyContextMenu {',
  'border-radius: 4px;',
  'max-height: 100%;',
  '}',
  '.blocklyDropdownMenu {',
  'border-radius: 2px;',
  'padding: 0 !important;',
  '}',
  '.blocklyWidgetDiv .blocklyDropdownMenu .goog-menuitem,',
  '.blocklyDropDownDiv .blocklyDropdownMenu .goog-menuitem {',
  'padding-left: 28px;',
  '}',
  '.blocklyWidgetDiv .blocklyDropdownMenu .goog-menuitem.goog-menuitem-rtl,',
  '.blocklyDropDownDiv .blocklyDropdownMenu .goog-menuitem.goog-menuitem-rtl {',
  'padding-left: 5px;',
  'padding-right: 28px;',
  '}',
  '.blocklyVerticalMarker {',
  'stroke-width: 3px;',
  'fill: rgba(255,255,255,.5);',
  'pointer-events: none',
  '}',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {',
  'background: url(<<<PATH>>>/sprites.png) no-repeat -48px -16px;',
  '}',
  '.blocklyWidgetDiv .goog-menu {',
  'background: #fff;',
  'border-color: transparent;',
  'border-style: solid;',
  'border-width: 1px;',
  'cursor: default;',
  'font: normal 13px Arial, sans-serif;',
  'margin: 0;',
  'outline: none;',
  'padding: 4px 0;',
  'position: absolute;',
  'overflow-y: auto;',
  'overflow-x: hidden;',
  'max-height: 100%;',
  'z-index: 20000;',
  'box-shadow: 0px 0px 3px 1px rgba(0,0,0,.3);',
  '}',
  '.blocklyWidgetDiv .goog-menu.focused {',
  'box-shadow: 0px 0px 6px 1px rgba(0,0,0,.3);',
  '}',
  '.blocklyDropDownDiv .goog-menu {',
  'cursor: default;',
  'font: normal 13px "Helvetica Neue", Helvetica, sans-serif;',
  'outline: none;',
  'z-index: 20000;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem,',
  '.blocklyDropDownDiv .goog-menuitem {',
  'color: #000;',
  'font: normal 13px Arial, sans-serif;',
  'list-style: none;',
  'margin: 0;',
  'min-width: 7em;',
  'border: none;',
  'padding: 6px 15px;',
  'white-space: nowrap;',
  'cursor: pointer;',
  '}',
  '.blocklyWidgetDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyWidgetDiv .goog-menu-noicon .goog-menuitem,',
  '.blocklyDropDownDiv .goog-menu-nocheckbox .goog-menuitem,',
  '.blocklyDropDownDiv .goog-menu-noicon .goog-menuitem {',
  'padding-left: 12px;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-content,',
  '.blocklyDropDownDiv .goog-menuitem-content {',
  'font-family: Arial, sans-serif;',
  'font-size: 13px;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-content {',
  'color: #000;',
  '}',
  '.blocklyDropDownDiv .goog-menuitem-content {',
  'color: #000;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-disabled,',
  '.blocklyDropDownDiv .goog-menuitem-disabled {',
  'cursor: inherit;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-content,',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-content {',
  'color: #ccc !important;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-disabled .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-menuitem-disabled .goog-menuitem-icon {',
  'opacity: .3;',
  'filter: alpha(opacity=30);',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-highlight ,',
  '.blocklyDropDownDiv .goog-menuitem-highlight {',
  'background-color: rgba(0,0,0,.1);',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-menuitem-icon {',
  'background-repeat: no-repeat;',
  'height: 16px;',
  'left: 6px;',
  'position: absolute;',
  'right: auto;',
  'vertical-align: middle;',
  'width: 16px;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
  'left: auto;',
  'right: 6px;',
  '}',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-option-selected .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-option-selected .goog-menuitem-icon {',
  'position: static;',
  'float: left;',
  'margin-left: -24px;',
  '}',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyWidgetDiv .goog-menuitem-rtl .goog-menuitem-icon,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-checkbox,',
  '.blocklyDropDownDiv .goog-menuitem-rtl .goog-menuitem-icon {',
  'float: right;',
  'margin-right: -24px;',
  '}',
  '.blocklyComputeCanvas {',
  'position: absolute;',
  'width: 0;',
  'height: 0;',
  '}',
  '.blocklyNoPointerEvents {',
  'pointer-events: none;',
  '}',
];
h.A = function () {};
h.A.rp = null;
h.A.hd = null;
h.A.Xw = null;
h.A.Rl = 16;
h.A.Ls = 1;
h.A.Hs = 12;
h.A.Qt = 16;
h.A.lo = 0.25;
h.A.ip = null;
h.A.Lh = null;
h.A.ie = '';
h.A.le = '';
h.A.Fa = function () {
  if (!h.A.qe) {
    var a = document.createElement ('div');
    a.className = 'blocklyDropDownDiv';
    (h.Nn || document.body).appendChild (a);
    h.A.qe = a;
    var c = document.createElement ('div');
    c.className = 'blocklyDropDownContent';
    a.appendChild (c);
    h.A.dh = c;
    c = document.createElement ('div');
    c.className = 'blocklyDropDownArrow';
    a.appendChild (c);
    h.A.td = c;
    h.A.qe.style.opacity = 0;
    h.A.qe.style.transition =
      'transform ' + h.A.lo + 's, opacity ' + h.A.lo + 's';
    a.addEventListener ('focusin', function () {
      h.g.j.xb (a, 'focused');
    });
    a.addEventListener ('focusout', function () {
      h.g.j.Rc (a, 'focused');
    });
  }
};
h.A.mD = function (a) {
  h.A.rp = a;
};
h.A.GB = function () {
  return h.A.dh;
};
h.A.HA = function () {
  h.A.dh.textContent = '';
  h.A.dh.style.width = '';
};
h.A.je = function (a, c) {
  h.A.qe.style.backgroundColor = a;
  h.A.qe.style.borderColor = c;
};
h.A.SH = function (a, c, d, e) {
  return h.A.ox (h.A.Ov (c), a, d, e);
};
h.A.sD = function (a, c) {
  h.A.Xw = !0;
  h.A.ox (h.A.Pv (a), a, c, void 0);
};
h.A.Ov = function (a) {
  var c = a.ma (), d = c.getBBox (), e = a.B.scale;
  a = d.height * e;
  d = d.width * e;
  c = h.g.style.oh (c);
  return new h.g.Rect (c.y, c.y + a, c.x, c.x + d);
};
h.A.Pv = function (a) {
  if (a.Db)
    (c = a.Db.getBoundingClientRect ()), (a = h.g.style.oh (a.Db)), (e =
      c.width), (c = c.height);
  else {
    var c = z (a.I), d = a.I.B.scale;
    a = h.g.style.oh (Ab (a));
    var e = c.width * d;
    c = c.height * d;
    h.g.userAgent.Vy
      ? ((a.x += 1.5 * d), (a.y += 1.5 * d))
      : h.g.userAgent.Pg ||
          h.g.userAgent.te ||
          ((a.x -= 0.5 * d), (a.y -= 0.5 * d));
    e += 1 * d;
    c += 1 * d;
  }
  return new h.g.Rect (a.y, a.y + c, a.x, a.x + e);
};
h.A.ox = function (a, c, d, e) {
  var f = a.left + (a.right - a.left) / 2, g = a.bottom;
  a = a.top;
  e && (a += e);
  e = c.R ();
  h.A.mD (y (e.B).parentNode);
  return h.A.show (c, e.G, f, g, f, a, d);
};
h.A.show = function (a, c, d, e, f, g, k) {
  h.A.hd = a;
  h.A.Lh = k || null;
  a = h.A.qe;
  a.style.direction = c ? 'rtl' : 'ltr';
  h.A.ie = h.ua ().bb.ae ();
  h.A.le = h.ua ().dg ().ae ();
  h.g.j.xb (a, h.A.ie);
  h.g.j.xb (a, h.A.le);
  return h.A.hl (d, e, f, g);
};
h.A.zB = function () {
  var a = h.g.style.oh (h.A.rp), c = h.g.style.xf (h.A.rp);
  return {
    left: a.x,
    right: a.x + c.width,
    top: a.y,
    bottom: a.y + c.height,
    width: c.width,
    height: c.height,
  };
};
h.A.MB = function (a, c, d, e) {
  var f = h.A.zB (), g = h.g.style.xf (h.A.qe);
  return c + g.height < f.bottom
    ? h.A.Nv (a, c, f, g)
    : e - g.height > f.top
        ? h.A.Mv (d, e, f, g)
        : c + g.height < document.documentElement.clientHeight
            ? h.A.Nv (a, c, f, g)
            : e - g.height > document.documentElement.clientTop
                ? h.A.Mv (d, e, f, g)
                : h.A.NB (a, f, g);
};
h.A.Nv = function (a, c, d, e) {
  a = h.A.pq (a, d.left, d.right, e.width);
  return {
    Cq: a.Ri,
    Dq: c,
    eq: a.Ri,
    fq: c + h.A.Qt,
    gk: a.gk,
    Ju: -(h.A.Rl / 2 + h.A.Ls),
    jp: !0,
    kp: !0,
  };
};
h.A.Mv = function (a, c, d, e) {
  a = h.A.pq (a, d.left, d.right, e.width);
  return {
    Cq: a.Ri,
    Dq: c - e.height,
    eq: a.Ri,
    fq: c - e.height - h.A.Qt,
    gk: a.gk,
    Ju: e.height - 2 * h.A.Ls - h.A.Rl / 2,
    jp: !1,
    kp: !0,
  };
};
h.A.NB = function (a, c, d) {
  a = h.A.pq (a, c.left, c.right, d.width);
  return {Cq: a.Ri, Dq: 0, eq: a.Ri, fq: 0, kp: !1};
};
h.A.pq = function (a, c, d, e) {
  var f = a;
  a = h.g.Cd.jk (c, a - e / 2, d - e);
  f -= h.A.Rl / 2;
  c = h.g.Cd.jk (h.A.Hs, f - a, e - h.A.Hs - h.A.Rl);
  return {gk: c, Ri: a};
};
h.A.isVisible = function () {
  return !!h.A.hd;
};
h.A.Nk = function (a, c) {
  h.A.hd === a && (c ? h.A.zq () : h.A.Ba ());
};
h.A.Ba = function () {
  var a = h.A.qe;
  a.style.transform = 'translate(0, 0)';
  a.style.opacity = 0;
  h.A.ip = setTimeout (function () {
    h.A.zq ();
  }, 1e3 * h.A.lo);
  h.A.Lh && (h.A.Lh (), (h.A.Lh = null));
};
h.A.zq = function () {
  if (h.A.isVisible ()) {
    h.A.ip && clearTimeout (h.A.ip);
    var a = h.A.qe;
    a.style.transform = '';
    a.style.left = '';
    a.style.top = '';
    a.style.opacity = 0;
    a.style.display = 'none';
    a.style.backgroundColor = '';
    a.style.borderColor = '';
    h.A.Lh && (h.A.Lh (), (h.A.Lh = null));
    h.A.HA ();
    h.A.hd = null;
    h.A.ie && (h.g.j.Rc (a, h.A.ie), (h.A.ie = ''));
    h.A.le && (h.g.j.Rc (a, h.A.le), (h.A.le = ''));
    La (h.ua ());
  }
};
h.A.hl = function (a, c, d, e) {
  a = h.A.MB (a, c, d, e);
  a.kp
    ? ((h.A.td.style.display = ''), (h.A.td.style.transform =
        'translate(' +
        a.gk +
        'px,' +
        a.Ju +
        'px) rotate(45deg)'), h.A.td.setAttribute (
        'class',
        a.jp
          ? 'blocklyDropDownArrow blocklyArrowTop'
          : 'blocklyDropDownArrow blocklyArrowBottom'
      ))
    : (h.A.td.style.display = 'none');
  c = Math.floor (a.Cq);
  d = Math.floor (a.Dq);
  e = Math.floor (a.eq);
  var f = Math.floor (a.fq), g = h.A.qe;
  g.style.left = c + 'px';
  g.style.top = d + 'px';
  g.style.display = 'block';
  g.style.opacity = 1;
  g.style.transform = 'translate(' + (e - c) + 'px,' + (f - d) + 'px)';
  return a.jp;
};
h.A.HH = function () {
  if (h.A.hd) {
    var a = h.A.hd, c = h.A.hd.R ();
    a = h.A.Xw ? h.A.Pv (a) : h.A.Ov (c);
    c = a.left + (a.right - a.left) / 2;
    h.A.hl (c, a.bottom, c, a.top);
  } else h.A.Ba ();
};
h.kg = function (a, c) {
  h.AA ();
  'string' == typeof a &&
    (a = document.getElementById (a) || document.querySelector (a));
  if (!a || !h.g.j.containsNode (document, a))
    throw Error ('Error: container is not in current document.');
  c = new h.wc (c || {});
  var d = document.createElement ('div');
  d.className = 'injectionDiv';
  d.tabIndex = 0;
  h.g.ib.Sh (d, h.g.ib.State.kz, h.J.WORKSPACE_ARIA_LABEL);
  a.appendChild (d);
  a = h.rk (d, c);
  var e = new h.Ms (d), f = new h.Bu (d), g = h.SA (a, c, e, f);
  h.sa.pa.pD (c.pa);
  h.fC (g);
  h.Xk = g;
  h.El (g);
  d.addEventListener ('focusin', function () {
    h.Xk = g;
  });
  return g;
};
h.rk = function (a, c) {
  a.setAttribute ('dir', 'LTR');
  h.tc.hv = c.G;
  h.ld.kg (c.ZB, c.Qn);
  a = h.g.j.H (
    'svg',
    {
      xmlns: h.g.j.wm,
      'xmlns:html': h.g.j.xo,
      'xmlns:xlink': h.g.j.Xc,
      version: '1.1',
      class: 'blocklySvg',
      tabindex: '0',
    },
    a
  );
  var d = h.g.j.H ('defs', {}, a);
  c.vq = h.Rg.Fa (String (Math.random ()).substring (2), c.Wv, d);
  return a;
};
h.SA = function (a, c, d, e) {
  c.Gd = null;
  var f = new h.Za (c, d, e);
  c = f.options;
  f.scale = c.Ta.zD;
  a.appendChild (f.Fa ('blocklyMainBackground'));
  h.g.j.xb (aa (f), f.bb.ae ());
  h.g.j.xb (aa (f), f.dg ().ae ());
  !c.Zv && c.Bh && ((d = Jc (f)), h.g.j.dj (d, a));
  c.cw && Hc (f);
  c.Ta && c.Ta.controls && Ic (f);
  f.ec.subscribe (a, 'workspaceBackgroundColour', 'background-color');
  f.translate (0, 0);
  c.readOnly ||
    f.Pc () ||
    E (f, function (g) {
      if (!f.Oc () && !f.Pc () && -1 != h.h.ky.indexOf (g.type)) {
        var k = Object.create (null), l = f.bd (), m = f.scale;
        k.G = f.G;
        k.Bb = l.Bb / m;
        k.Ib = l.Ib / m;
        k.Hx = (l.Bb + l.qb) / m;
        k.Gx = (l.Ib + l.Ab) / m;
        Mc (f)
          ? ((l = Ra (f)), (k.Ac = l.left), (k.nc = l.top), (k.cv =
              l.right), (k.$u = l.bottom))
          : ((k.Ac = l.Ac / m), (k.nc = l.nc / m), (k.cv =
              (l.Ac + l.Ie) / m), (k.$u = (l.nc + l.vd) / m));
        if (k.nc < k.Ib || k.$u > k.Gx || k.Ac < k.Bb || k.cv > k.Hx) {
          l = null;
          g && ((l = h.h.Kb ()), h.h.ka (g.group));
          switch (g.type) {
            case h.h.mo:
            case h.h.Ks:
              var n = f.Cc (g.Yb);
              n && (n = n.Dc ());
              break;
            case h.h.Yl:
            case h.h.Zl:
              n = f.Km[g.Fe] || null;
          }
          if (n) {
            m = uc (n);
            m.height = m.bottom - m.top;
            m.width = m.right - m.left;
            var q = k.Ib, r = k.Gx - m.height;
            r = Math.max (q, r);
            q = h.g.Cd.jk (q, m.top, r) - m.top;
            r = k.Bb;
            var t = k.Hx - m.width;
            k.G ? (r = Math.min (t, r)) : (t = Math.max (r, t));
            n.moveBy (h.g.Cd.jk (r, m.left, t) - m.left, q);
          }
          g &&
            (!g.group &&
              n &&
              console.log (
                'WARNING: Moved object in bounds but there was no event group. This may break undo.'
              ), null !== l && h.h.ka (l));
        }
      }
    });
  h.El (f);
  h.V.Fa ();
  h.A.Fa ();
  h.C.Fa ();
  return f;
};
h.fC = function (a) {
  var c = a.options, d = y (a);
  h.ta (d.parentNode, 'contextmenu', null, function (f) {
    h.g.un (f) || f.preventDefault ();
  });
  d = h.ta (window, 'resize', null, function () {
    h.$b (!0);
    h.El (a);
  });
  a.Sn = d;
  h.kg.qA ();
  if (c.Bh) {
    d = a.qa;
    var e = F (a, !0);
    d ? d.va () : e && (e.va (a), e.show (c.Bh.childNodes), e.Sb.set (0));
  }
  d = h.Ea.bc;
  c.cw && (d = a.fc.va (d));
  c.Ta && c.Ta.controls && a.ci.va (d);
  c.Qb && c.Qb.scrollbars
    ? ((a.yb = new h.xi (a)), a.yb.resize ())
    : a.vj ({x: 0.5, y: 0.5});
  c.aC && h.kg.tC (c.Qn, a);
};
h.kg.qA = function () {
  h.gB ||
    (h.ta (document, 'scroll', null, function () {
      for (var a = h.hb.getAll (), c = 0, d; (d = a[c]); c++) d.Kl && d.Kl ();
    }), h.ta (document, 'keydown', null, h.PC), h.Xb (
      document,
      'touchend',
      null,
      h.sg
    ), h.Xb (document, 'touchcancel', null, h.sg), h.g.userAgent.Qj &&
      h.ta (window, 'orientationchange', document, function () {
        h.El (h.ua ());
      }));
  h.gB = !0;
};
h.kg.tC = function (a, c) {
  function d () {
    for (; f.length; )
      h.Wa (f.pop ());
    e.preload ();
  }
  var e = c.Jc;
  e.load ([a + 'click.mp3', a + 'click.wav', a + 'click.ogg'], 'click');
  e.load (
    [a + 'disconnect.wav', a + 'disconnect.mp3', a + 'disconnect.ogg'],
    'disconnect'
  );
  e.load ([a + 'delete.mp3', a + 'delete.ogg', a + 'delete.wav'], 'delete');
  var f = [];
  f.push (h.ta (document, 'mousemove', null, d, !0));
  f.push (h.ta (document, 'touchstart', null, d, !0));
};
h.qd = function (a, c) {
  this.Fx = c || '';
  this.bx = Object.create (null);
  if (a)
    for ((a = a.split (',')), (c = 0); c < a.length; c++)
      this.bx[a[c]] = !0;
  this.reset ();
};
h.qd.uo = 'DEVELOPER_VARIABLE';
h.qd.prototype.reset = function () {
  this.Ke = Object.create (null);
  this.gv = Object.create (null);
  this.Ha = null;
};
h.qd.prototype.Yr = function (a) {
  this.Ha = a;
};
function Rc (a, c) {
  var d = h.D.Nl;
  if (c == h.Bi) {
    var e = a;
    d.Ha
      ? (e = (e = d.Ha.fg (e)) ? e.name : null)
      : (console.log (
          "Deprecated call to Blockly.Names.prototype.getName without defining a variable map. To fix, add the following code in your generator's init() function:\nBlockly.YourGeneratorName.variableDB_.setVariableMap(workspace.getVariableMap());"
        ), (e = null));
    e && (a = e);
  }
  e = a.toLowerCase () + '_' + c;
  var f = c == h.Bi || c == h.qd.uo ? d.Fx : '';
  if (e in d.Ke) return f + d.Ke[e];
  a
    ? ((a = encodeURI (a.replace (/ /g, '_')).replace (/[^\w]/g, '_')), -1 !=
        '0123456789'.indexOf (a[0]) && (a = 'my_' + a))
    : (a = h.J.UNNAMED_KEY || 'unnamed');
  for (var g = ''; d.gv[a + g] || a + g in d.bx; )
    g = g ? g + 1 : 2;
  a += g;
  d.gv[a] = !0;
  c = (c == h.Bi || c == h.qd.uo ? d.Fx : '') + a;
  d.Ke[e] = c.substr (f.length);
  return c;
}
h.qd.vf = function (a, c) {
  return a.toLowerCase () == c.toLowerCase ();
};
h.Qa = {};
h.Qa.Et = h.Tt;
h.Qa.Ay = 'x';
h.Qa.nA = function (a) {
  a = D (a, !1);
  for (var c = [], d = [], e = 0; e < a.length; e++)
    if (a[e].Wi) {
      var f = a[e].Wi ();
      f && (f[2] ? c.push (f) : d.push (f));
    }
  d.sort (h.Qa.Yw);
  c.sort (h.Qa.Yw);
  return [d, c];
};
h.Qa.Yw = function (a, c) {
  return a[0].toLowerCase ().localeCompare (c[0].toLowerCase ());
};
h.Qa.qB = function (a, c) {
  if (c.fe) return a;
  for (a = a || h.J.UNNAMED_KEY || 'unnamed'; !h.Qa.lC (a, c.B, c); ) {
    var d = a.match (/^(.*?)(\d+)$/);
    a = d ? d[1] + (parseInt (d[2], 10) + 1) : a + '2';
  }
  return a;
};
h.Qa.lC = function (a, c, d) {
  return !h.Qa.nC (a, c, d);
};
h.Qa.nC = function (a, c, d) {
  c = D (c, !1);
  for (var e = 0; e < c.length; e++)
    if (c[e] != d && c[e].Wi) {
      var f = c[e].Wi ();
      if (h.qd.vf (f[0], a)) return !0;
    }
  return !1;
};
h.Qa.FH = function (a) {
  a = a.trim ();
  var c = h.Qa.qB (a, this.R ()), d = this.getValue ();
  if (d != a && d != c) {
    a = D (this.R ().B, !1);
    for (var e = 0; e < a.length; e++)
      a[e].fD && a[e].fD (d, c);
  }
  return c;
};
h.Qa.lh = function (a) {
  function c (g, k) {
    for (var l = 0; l < g.length; l++) {
      var m = g[l][0], n = g[l][1], q = h.g.xml.createElement ('block');
      q.setAttribute ('type', k);
      q.setAttribute ('gap', 16);
      var r = h.g.xml.createElement ('mutation');
      r.setAttribute ('name', m);
      q.appendChild (r);
      for (m = 0; m < n.length; m++) {
        var t = h.g.xml.createElement ('arg');
        t.setAttribute ('name', n[m]);
        r.appendChild (t);
      }
      d.push (q);
    }
  }
  var d = [];
  if (h.hc.procedures_defnoreturn) {
    var e = h.g.xml.createElement ('block');
    e.setAttribute ('type', 'procedures_defnoreturn');
    e.setAttribute ('gap', 16);
    var f = h.g.xml.createElement ('field');
    f.setAttribute ('name', 'NAME');
    f.appendChild (
      h.g.xml.createTextNode (h.J.PROCEDURES_DEFNORETURN_PROCEDURE)
    );
    e.appendChild (f);
    d.push (e);
  }
  h.hc.procedures_defreturn &&
    ((e = h.g.xml.createElement ('block')), e.setAttribute (
      'type',
      'procedures_defreturn'
    ), e.setAttribute ('gap', 16), (f = h.g.xml.createElement (
      'field'
    )), f.setAttribute ('name', 'NAME'), f.appendChild (
      h.g.xml.createTextNode (h.J.PROCEDURES_DEFRETURN_PROCEDURE)
    ), e.appendChild (f), d.push (e));
  h.hc.procedures_ifreturn &&
    ((e = h.g.xml.createElement ('block')), e.setAttribute (
      'type',
      'procedures_ifreturn'
    ), e.setAttribute ('gap', 16), d.push (e));
  d.length && d[d.length - 1].setAttribute ('gap', 24);
  a = h.Qa.nA (a);
  c (a[0], 'procedures_callnoreturn');
  c (a[1], 'procedures_callreturn');
  return d;
};
h.Qa.Ax = function (a) {
  var c = [];
  var d = a.ne.procedures_mutatorarg
    ? a.ne.procedures_mutatorarg.slice (0)
    : [];
  for (var e = 0, f; (f = d[e]); e++)
    c.push (Ya (f, 'NAME'));
  d = h.g.xml.createElement ('xml');
  e = h.g.xml.createElement ('block');
  e.setAttribute ('type', 'procedures_mutatorarg');
  f = h.g.xml.createElement ('field');
  f.setAttribute ('name', 'NAME');
  c = h.g.xml.createTextNode (h.$.Ev (h.Qa.Ay, c));
  f.appendChild (c);
  e.appendChild (f);
  d.appendChild (e);
  if ((c = h.wc.Pw (d))) {
    if (!a.options.Bh)
      throw Error ("Existing toolbox is null.  Can't create new toolbox.");
    if (c.getElementsByTagName ('category').length) {
      if (!a.qa)
        throw Error ("Existing toolbox has no categories.  Can't change mode.");
      a.options.Bh = c;
      a.qa.GH (c);
    } else {
      if (!a.Z)
        throw Error ("Existing toolbox has categories.  Can't change mode.");
      a.options.Bh = c;
      a.Z.show (c.childNodes);
    }
  } else if (a.options.Bh) throw Error ("Can't nullify an existing toolbox.");
};
h.Qa.GC = function (a) {
  if (a.type == h.h.ck && 'mutatorOpen' == a.element && a.newValue) {
    a = h.hb.Hk (a.wb).Cc (a.Yb);
    var c = a.type;
    if ('procedures_defnoreturn' == c || 'procedures_defreturn' == c)
      (a = a.ge.o), h.Qa.Ax (a), E (a, h.Qa.FC);
  }
};
h.Qa.FC = function (a) {
  (a.type != h.h.mo && a.type != h.h.Js && a.type != h.h.gy) ||
    h.Qa.Ax (h.hb.Hk (a.wb));
};
h.Qa.AB = function (a, c) {
  var d = [];
  c = D (c, !1);
  for (var e = 0; e < c.length; e++)
    if (c[e].OB) {
      var f = c[e].OB ();
      f && h.qd.vf (f, a) && d.push (c[e]);
    }
  return d;
};
h.Qa.zH = function (a) {
  var c = h.h.ac, d = a.Wi ()[0], e = a.Ed (!0);
  a = h.Qa.AB (d, a.B);
  d = 0;
  for (var f; (f = a[d]); d++) {
    var g = f.Ed ();
    g = g && h.M.Zd (g);
    f.tf (e);
    var k = f.Ed ();
    k = k && h.M.Zd (k);
    g != k &&
      ((h.h.ac = !1), h.h.Ia (
        new h.h.di (f, 'mutation', null, g, k)
      ), (h.h.ac = c));
  }
};
h.Qa.hH = function (a, c) {
  c = c.pb (!1);
  for (var d = 0; d < c.length; d++)
    if (c[d].Wi) {
      var e = c[d].Wi ();
      if (e && h.qd.vf (e[0], a)) return c[d];
    }
  return null;
};
h.zm = function (a, c, d, e) {
  this.B = a;
  this.name = c;
  this.type = d || '';
  this.bj = e || h.g.wf ();
  h.h.Ia (new h.h.sd (this));
};
h.zm.prototype.ub = function () {
  return this.bj;
};
h.zm.KA = function (a, c) {
  a = a.name.toLowerCase ();
  c = c.name.toLowerCase ();
  return a < c ? -1 : a == c ? 0 : 1;
};
h.$ = {};
h.$.Et = h.Bi;
h.$.Iu = function (a) {
  var c = D (a, !1);
  a = Object.create (null);
  for (var d = 0; d < c.length; d++) {
    var e = Wa (c[d]);
    if (e)
      for (var f = 0; f < e.length; f++) {
        var g = e[f], k = g.ub ();
        k && (a[k] = g);
      }
  }
  c = [];
  for (k in a)
    c.push (a[k]);
  return c;
};
h.$.NG = function () {
  console.warn (
    'Deprecated call to Blockly.Variables.allUsedVariables. Use Blockly.Variables.allUsedVarModels instead.\nIf this is a major issue please file a bug on GitHub.'
  );
};
h.$.Es = {};
h.$.lA = function (a) {
  a = D (a, !1);
  for (var c = Object.create (null), d = 0, e; (e = a[d]); d++) {
    var f = e.iH;
    !f &&
      e.HB &&
      ((f = e.HB), h.$.Es[e.type] ||
        (console.warn (
          "Function getDeveloperVars() deprecated. Use getDeveloperVariables() (block type '" +
            e.type +
            "')"
        ), (h.$.Es[e.type] = !0)));
    if (f) for ((e = f ()), (f = 0); f < e.length; f++) c[e[f]] = !0;
  }
  return Object.keys (c);
};
h.$.lh = function (a) {
  var c = [], d = document.createElement ('button');
  d.setAttribute ('text', '%{BKY_NEW_VARIABLE}');
  d.setAttribute ('callbackKey', 'CREATE_VARIABLE');
  Nc (a, function (e) {
    h.$.ev (e.nH ());
  });
  c.push (d);
  a = h.$.tB (a);
  return (c = c.concat (a));
};
h.$.tB = function (a) {
  a = a.jn ('');
  var c = [];
  if (0 < a.length) {
    var d = a[a.length - 1];
    if (h.hc.variables_set) {
      var e = h.g.xml.createElement ('block');
      e.setAttribute ('type', 'variables_set');
      e.setAttribute ('gap', h.hc.math_change ? 8 : 24);
      e.appendChild (h.$.hq (d));
      c.push (e);
    }
    h.hc.math_change &&
      ((e = h.g.xml.createElement ('block')), e.setAttribute (
        'type',
        'math_change'
      ), e.setAttribute ('gap', h.hc.variables_get ? 20 : 8), e.appendChild (
        h.$.hq (d)
      ), (d = h.M.Hg (
        '<value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'
      )), e.appendChild (d), c.push (e));
    if (h.hc.variables_get) {
      a.sort (h.zm.KA);
      d = 0;
      for (var f; (f = a[d]); d++)
        (e = h.g.xml.createElement ('block')), e.setAttribute (
          'type',
          'variables_get'
        ), e.setAttribute ('gap', 8), e.appendChild (h.$.hq (f)), c.push (e);
    }
  }
  return c;
};
h.$.su = 'ijkmnopqrstuvwxyzabcdefgh';
h.$.wB = function (a) {
  return h.$.Ev (h.$.su.charAt (0), a.iq ());
};
h.$.Ev = function (a, c) {
  if (!c.length) return a;
  for (var d = h.$.su, e = '', f = d.indexOf (a); ; ) {
    for (var g = !1, k = 0; k < c.length; k++)
      if (c[k].toLowerCase () == a) {
        g = !0;
        break;
      }
    if (!g) return a;
    f++;
    f == d.length && ((f = 0), (e = Number (e) + 1));
    a = d.charAt (f) + e;
  }
};
h.$.ev = function (a, c, d) {
  function e (g) {
    h.$.Zw (h.J.NEW_VARIABLE_TITLE, g, function (k) {
      if (k) {
        var l = h.$.IC (k, a);
        if (l) {
          if (l.type == f)
            var m = h.J.VARIABLE_ALREADY_EXISTS.replace ('%1', l.name);
          else
            (m = h.J.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE), (m = m
              .replace ('%1', l.name)
              .replace ('%2', l.type));
          h.alert (m, function () {
            e (k);
          });
        } else a.Xd (k, f), c && c (k);
      } else c && c (null);
    });
  }
  var f = d || '';
  e ('');
};
h.$.Xd = h.$.ev;
h.$.$w = function (a, c) {
  function d (e) {
    var f = h.J.RENAME_VARIABLE_TITLE.replace ('%1', c.name);
    h.$.Zw (f, e, function (g) {
      if (g) {
        var k = h.$.JC (g, c.type, a);
        k
          ? ((k = h.J.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE
              .replace ('%1', k.name)
              .replace ('%2', k.type)), h.alert (k, function () {
              d (g);
            }))
          : a.Nh (c.ub (), g);
      }
    });
  }
  d ('');
};
h.$.Zw = function (a, c, d) {
  h.prompt (a, c, function (e) {
    e &&
      ((e = e.replace (/[\s\xa0]+/g, ' ').trim ()), e == h.J.RENAME_VARIABLE ||
        e == h.J.NEW_VARIABLE) &&
      (e = null);
    d (e);
  });
};
h.$.JC = function (a, c, d) {
  d = d.Ha.mh ();
  a = a.toLowerCase ();
  for (var e = 0, f; (f = d[e]); e++)
    if (f.name.toLowerCase () == a && f.type != c) return f;
  return null;
};
h.$.IC = function (a, c) {
  c = c.Ha.mh ();
  a = a.toLowerCase ();
  for (var d = 0, e; (e = c[d]); d++)
    if (e.name.toLowerCase () == a) return e;
  return null;
};
h.$.hq = function (a) {
  var c = h.g.xml.createElement ('field');
  c.setAttribute ('name', 'VAR');
  c.setAttribute ('id', a.ub ());
  c.setAttribute ('variabletype', a.type);
  a = h.g.xml.createTextNode (a.name);
  c.appendChild (a);
  return c;
};
h.$.lH = function (a, c, d, e) {
  var f = h.$.eg (a, c, d, e);
  f || (f = h.$.TA (a, c, d, e));
  return f;
};
h.$.eg = function (a, c, d, e) {
  var f = a.pj, g = null;
  if (c && ((g = a.fg (c)), !g && f && (g = f.fg (c)), g)) return g;
  if (d) {
    if (void 0 == e)
      throw Error ('Tried to look up a variable by name without a type');
    g = a.eg (d, e);
    !g && f && (g = f.eg (d, e));
  }
  return g;
};
h.$.TA = function (a, c, d, e) {
  var f = a.pj;
  d || (d = h.$.wB (a.Bf ? a.Vh : a));
  return f ? f.Xd (d, e, c) : a.Xd (d, e, c);
};
h.$.Fv = function (a, c) {
  a = a.mh ();
  var d = [];
  if (c.length != a.length)
    for (var e = 0; e < a.length; e++) {
      var f = a[e];
      -1 == c.indexOf (f) && d.push (f);
    }
  return d;
};
h.VERSION = 'uncompiled';
h.Xk = null;
h.selected = null;
h.Ti = [];
h.kk = null;
h.Im = null;
h.yp = null;
h.TG = null;
h.Nn = null;
h.BD = function (a) {
  return {width: a.Nu, height: a.Mu};
};
h.IH = function (a) {
  Ua (a);
};
h.El = function (a) {
  for (; a.options.Gd; )
    a = a.options.Gd;
  var c = y (a), d = c.parentNode;
  if (d) {
    var e = d.offsetWidth;
    d = d.offsetHeight;
    c.Nu != e && (c.setAttribute ('width', e + 'px'), (c.Nu = e));
    c.Mu != d && (c.setAttribute ('height', d + 'px'), (c.Mu = d));
    a.resize ();
  }
};
h.PC = function (a) {
  var c = h.Xk;
  if (c && !(h.g.un (a) || (c.ca && !c.isVisible ())))
    if (c.options.readOnly) h.navigation.Kw (a);
    else {
      var d = !1;
      if (a.keyCode == h.g.gb.Zs) h.$b (), h.navigation.gd (h.navigation.ao);
      else {
        if (h.navigation.Kw (a)) return;
        if (a.keyCode == h.g.gb.by || a.keyCode == h.g.gb.Kj) {
          a.preventDefault ();
          if (h.ki.Bq ()) return;
          h.selected && h.selected.dd () && (d = !0);
        } else if (a.altKey || a.ctrlKey || a.metaKey) {
          if (h.ki.Bq ()) return;
          h.selected &&
            h.selected.dd () &&
            h.selected.Pc () &&
            (a.keyCode == h.g.gb.ny
              ? (h.$b (), h.Cp (h.selected))
              : a.keyCode != h.g.gb.Cu ||
                  h.selected.B.Bf ||
                  (h.Cp (h.selected), (d = !0)));
          a.keyCode == h.g.gb.Xz
            ? h.kk &&
                ((a = h.Im), a.Bf && (a = a.Vh), h.yp &&
                  bb (a, h.yp) &&
                  (h.h.ka (!0), Lc (a), h.h.ka (!1)))
            : a.keyCode == h.g.gb.dA && (h.$b (), c.ss (a.shiftKey));
        }
      }
      d &&
        !h.selected.B.Bf &&
        (h.h.ka (!0), h.$b (), h.selected.F (!0, !0), h.h.ka (!1));
    }
};
h.Cp = function (a) {
  if (a.mw) var c = a.ls ();
  else {
    c = h.M.Xf (a, !0);
    h.M.YA (c);
    var d = a.Ma ();
    c.setAttribute ('x', a.G ? -d.x : d.x);
    c.setAttribute ('y', d.y);
  }
  h.kk = c;
  h.Im = a.B;
  h.yp = a.mw ? null : h.g.jq (a, !0);
};
h.duplicate = function (a) {
  var c = h.kk, d = h.Im;
  h.Cp (a);
  Lc (a.B);
  h.kk = c;
  h.Im = d;
};
h.AH = function (a) {
  h.g.un (a) || a.preventDefault ();
};
h.$b = function (a) {
  h.C.Ba ();
  h.V.Ba ();
  h.A.zq ();
  a ||
    ((a = h.ua ()), a.fc && a.fc.kh && a.fc.kh.Ba (), (a = a.qa) &&
      F (a) &&
      F (a).Ei &&
      a.VG ());
};
h.ua = function () {
  return h.Xk;
};
h.alert = function (a, c) {
  alert (a);
  c && c ();
};
h.confirm = function (a, c) {
  c (confirm (a));
};
h.prompt = function (a, c, d) {
  d (prompt (a, c));
};
h.rC = function (a) {
  return function () {
    gc (this, a);
  };
};
h.$G = function (a) {
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    if (d) {
      var e = d.type;
      null == e || '' === e
        ? console.warn (
            'Block definition #' +
              c +
              ' in JSON array is missing a type attribute. Skipping.'
          )
        : (h.hc[e] &&
            console.warn (
              'Block definition #' +
                c +
                ' in JSON array overwrites prior definition of "' +
                e +
                '".'
            ), (h.hc[e] = {va: h.rC (d)}));
    } else
      console.warn (
        'Block definition #' + c + ' in JSON array is ' + d + '. Skipping.'
      );
  }
};
h.ta = function (a, c, d, e, f, g) {
  function k (t) {
    var v = !f;
    t = h.Touch.wD (t);
    for (var H = 0, S; (S = t[H]); H++)
      if (!v || h.Touch.$r (S))
        h.Touch.nD (S), d ? e.call (d, S) : e (S), (l = !0);
  }
  var l = !1, m = [];
  if (h.g.global.PointerEvent && c in h.Touch.xe)
    for (var n = 0, q; (q = h.Touch.xe[c][n]); n++)
      a.addEventListener (q, k, !1), m.push ([a, q, k]);
  else if (
    (a.addEventListener (c, k, !1), m.push ([a, c, k]), c in h.Touch.xe)
  ) {
    var r = function (t) {
      k (t);
      var v = !g;
      l && v && t.preventDefault ();
    };
    for (n = 0; (q = h.Touch.xe[c][n]); n++)
      a.addEventListener (q, r, !1), m.push ([a, q, r]);
  }
  return m;
};
h.Xb = function (a, c, d, e) {
  function f (n) {
    d ? e.call (d, n) : e (n);
  }
  var g = [];
  if (h.g.global.PointerEvent && c in h.Touch.xe)
    for (var k = 0, l; (l = h.Touch.xe[c][k]); k++)
      a.addEventListener (l, f, !1), g.push ([a, l, f]);
  else if (
    (a.addEventListener (c, f, !1), g.push ([a, c, f]), c in h.Touch.xe)
  ) {
    var m = function (n) {
      if (n.changedTouches && 1 == n.changedTouches.length) {
        var q = n.changedTouches[0];
        n.clientX = q.clientX;
        n.clientY = q.clientY;
      }
      f (n);
      n.preventDefault ();
    };
    for (k = 0; (l = h.Touch.xe[c][k]); k++)
      a.addEventListener (l, m, !1), g.push ([a, l, m]);
  }
  return g;
};
h.Wa = function (a) {
  for (; a.length; ) {
    var c = a.pop ();
    c[0].removeEventListener (c[1], c[2], !1);
  }
};
h.oC = function (a) {
  return /^\s*-?\d+(\.\d+)?\s*$/.test (a);
};
h.pH = function (a) {
  return h.g.kb.hw (a);
};
h.AA = function () {
  h.mc ('LOGIC_HUE', ['Blocks', 'logic', 'HUE'], void 0);
  h.mc ('LOGIC_HUE', ['Constants', 'Logic', 'HUE'], 210);
  h.mc ('LOOPS_HUE', ['Blocks', 'loops', 'HUE'], void 0);
  h.mc ('LOOPS_HUE', ['Constants', 'Loops', 'HUE'], 120);
  h.mc ('MATH_HUE', ['Blocks', 'math', 'HUE'], void 0);
  h.mc ('MATH_HUE', ['Constants', 'Math', 'HUE'], 230);
  h.mc ('TEXTS_HUE', ['Blocks', 'texts', 'HUE'], void 0);
  h.mc ('TEXTS_HUE', ['Constants', 'Text', 'HUE'], 160);
  h.mc ('LISTS_HUE', ['Blocks', 'lists', 'HUE'], void 0);
  h.mc ('LISTS_HUE', ['Constants', 'Lists', 'HUE'], 260);
  h.mc ('COLOUR_HUE', ['Blocks', 'colour', 'HUE'], void 0);
  h.mc ('COLOUR_HUE', ['Constants', 'Colour', 'HUE'], 20);
  h.mc ('VARIABLES_HUE', ['Blocks', 'variables', 'HUE'], void 0);
  h.mc ('VARIABLES_HUE', ['Constants', 'Variables', 'HUE'], 330);
  h.mc ('VARIABLES_DYNAMIC_HUE', ['Constants', 'VariablesDynamic', 'HUE'], 310);
  h.mc ('PROCEDURES_HUE', ['Blocks', 'procedures', 'HUE'], void 0);
};
h.mc = function (a, c, d) {
  for (var e = 'Blockly', f = h, g = 0; g < c.length; ++g)
    (e += '.' + c[g]), f && (f = f[c[g]]);
  f &&
    f !== d &&
    ((a = (void 0 === d
      ? '%1 has been removed. Use Blockly.Msg["%2"].'
      : '%1 is deprecated and unused. Override Blockly.Msg["%2"].')
      .replace ('%1', e)
      .replace ('%2', a)), console.warn (a));
};
h.RH = function (a) {
  h.Nn = a;
};
var Sc = {
  ar: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
  be: '\u0431\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0456',
  'be-tarask': 'Tara\u0161kievica',
  bg: '\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438 \u0435\u0437\u0438\u043a',
  bn: '\u09ac\u09be\u0982\u09b2\u09be',
  br: 'Brezhoneg',
  cs: '\u010cesky',
  da: 'Dansk',
  de: 'Deutsch',
  el: '\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac',
  en: 'English',
  eo: 'Esperanto',
  es: 'Espa\u00f1ol',
  eu: 'Euskara',
  fa: '\u0641\u0627\u0631\u0633\u06cc',
  fi: 'Suomi',
  fo: 'F\u00f8royskt',
  fr: 'Fran\u00e7ais',
  gl: 'Galego',
  ha: 'Hausa',
  he: '\u05e2\u05d1\u05e8\u05d9\u05ea',
  hi: '\u0939\u093f\u0928\u094d\u0926\u0940',
  hu: 'Magyar',
  hy: '\u0570\u0561\u0575\u0565\u0580\u0567\u0576',
  ia: 'Interlingua',
  id: 'Bahasa Indonesia',
  ig: 'As\u1ee5s\u1ee5 Igbo',
  is: '\u00cdslenska',
  it: 'Italiano',
  ja: '\u65e5\u672c\u8a9e',
  kab: 'Taqbaylit',
  ko: '\ud55c\uad6d\uc5b4',
  lt: 'Lietuvi\u0173',
  lv: 'Latvie\u0161u',
  ms: 'Bahasa Melayu',
  my: '\u1019\u103c\u1014\u103a\u1019\u102c\u1005\u102c',
  nb: 'Norsk Bokm\u00e5l',
  nl: 'Nederlands, Vlaams',
  pl: 'Polski',
  pms: 'Piemont\u00e8is',
  pt: 'Portugu\u00eas',
  'pt-br': 'Portugu\u00eas Brasileiro',
  ro: 'Rom\u00e2n\u0103',
  ru: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
  sc: 'Sardu',
  sk: 'Sloven\u010dina',
  sl: 'Sloven\u0161\u010dina',
  sq: 'Shqip',
  sr: '\u0421\u0440\u043f\u0441\u043a\u0438',
  sv: 'Svenska',
  th: '\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22',
  ti: '\u1275\u130d\u122d\u129b',
  tr: 'T\u00fcrk\u00e7e',
  uk: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430',
  ur: '\u0627\u064f\u0631\u062f\u064f\u0648\u202c',
  vi: 'Ti\u1ebfng Vi\u1ec7t',
  yo: '\u00c8d\u00e8 Yor\u00f9b\u00e1',
  'zh-hans': '\u7b80\u4f53\u4e2d\u6587',
  'zh-hant': '\u6b63\u9ad4\u4e2d\u6587',
},
  Tc = 'ace ar fa he mzn ps ur'.split (' '),
  K = window.BlocklyGamesLang,
  Uc = window.BlocklyGamesLanguages,
  Vc = /\.html$/.test (window.location.pathname);
function Wc (a, c, d) {
  var e = Number;
  a = (a = window.location.search.match (new RegExp ('[?&]' + a + '=([^&]+)')))
    ? decodeURIComponent (a[1].replace (/\+/g, '%20'))
    : 'NaN';
  e = e (a);
  return isNaN (e) ? c : h.g.Cd.jk (c, e, d);
}
var L = Wc ('level', 1, 10);
function Xc () {
  document.title = document.getElementById ('title').textContent;
  document.dir = -1 != Tc.indexOf (K) ? 'rtl' : 'ltr';
  document.head.parentElement.setAttribute ('lang', K);
  var a = document.getElementById ('languageMenu');
  if (a) {
    for (var c = [], d = 0; d < Uc.length; d++) {
      var e = Uc[d];
      c.push ([Sc[e], e]);
    }
    c.sort (function (g, k) {
      return g[0] > k[0] ? 1 : g[0] < k[0] ? -1 : 0;
    });
    for (d = a.options.length = 0; d < c.length; d++) {
      var f = c[d];
      e = f[1];
      f = new Option (f[0], e);
      e == K && (f.selected = !0);
      a.options.add (f);
    }
    1 >= a.options.length && (a.style.display = 'none');
  }
  for (d = 1; 10 >= d; d++)
    (a = document.getElementById ('level' + d)), (c = !!Yc (d)), a &&
      c &&
      (a.className += ' level_done');
  (d = document.querySelector ('meta[name="viewport"]')) &&
    725 > screen.availWidth &&
    d.setAttribute (
      'content',
      'width=725, initial-scale=.35, user-scalable=no'
    );
  setTimeout (Zc, 1);
}
function Yc (a) {
  var c = $c;
  try {
    var d = window.localStorage[c + a];
  } catch (e) {}
  return d;
}
function M (a) {
  var c;
  (c = document.getElementById (a))
    ? ((c = c.textContent), (c = c.replace (/\\n/g, '\n')))
    : (c = null);
  return null === c ? '[Unknown message: ' + a + ']' : c;
}
function ad (a, c) {
  if (!a) throw TypeError ('Element not found: ' + a);
  'string' == typeof a && (a = document.getElementById (a));
  a.addEventListener ('click', c, !0);
  a.addEventListener ('touchend', c, !0);
}
function Zc () {
  if (!Vc) {
    window.GoogleAnalyticsObject = 'GoogleAnalyticsFunction';
    var a = function (d) {
      (a.q = a.q || []).push (arguments);
    };
    window.GoogleAnalyticsFunction = a;
    a.l = 1 * new Date ();
    var c = document.createElement ('script');
    c.async = 1;
    c.src = '//www.google-analytics.com/analytics.js';
    document.head.appendChild (c);
    a ('create', 'UA-50448074-1', 'auto');
    a ('send', 'pageview');
  }
}
h.g.u = {};
h.g.u.za = function (a, c) {
  return ' ' + a + ',' + c + ' ';
};
h.g.u.curve = function (a, c) {
  return ' ' + a + c.join ('');
};
h.g.u.moveTo = function (a, c) {
  return ' M ' + a + ',' + c + ' ';
};
h.g.u.moveBy = function (a, c) {
  return ' m ' + a + ',' + c + ' ';
};
h.g.u.lineTo = function (a, c) {
  return ' l ' + a + ',' + c + ' ';
};
h.g.u.line = function (a) {
  return ' l' + a.join ('');
};
h.g.u.T = function (a, c) {
  return ' ' + a + ' ' + c + ' ';
};
h.g.u.arc = function (a, c, d, e) {
  return a + ' ' + d + ' ' + d + ' ' + c + e;
};
h.i.bf = function () {
  this.ve = 0;
  this.Kz = 3;
  this.od = 5;
  this.yt = 8;
  this.vc = 10;
  this.lu = this.od;
  this.ak = 15;
  this.zi = 5;
  this.ym = 8;
  this.Az = 15;
  this.Gt = 4;
  this.xz = 12;
  this.Hy = 16;
  this.Gy = this.Ws = this.ak;
  this.fb = 8;
  this.Qz = this.Xj = 15;
  this.Pz = 0;
  this.iu = 20;
  this.ey = 4;
  this.Tz = this.od;
  this.Uz = this.vc;
  this.jy = this.od;
  this.iy = this.vc;
  this.Ol = !1;
  this.Nz = 15;
  this.Oz = 100;
  this.Mz = 15;
  this.Tj = 24;
  this.Jy = 14.5;
  this.Iy = this.ak + 11;
  this.Ly = 2;
  this.Ky = this.Tj;
  this.fu = h.g.u.moveBy (0, 0);
  this.gz = 12;
  this.hz = 6;
  this.Qg = 11;
  this.Rf = 'normal';
  this.Qf = 'sans-serif';
  this.dt = this.fm = -1;
  this.em = 4;
  this.at = 16;
  this.Mj = 5;
  this.My = '#fff';
  this.wo = !h.g.userAgent.te && !h.g.userAgent.Pg;
  this.bt = this.at;
  this.Oy = this.Ny = this.ct = !1;
  this.Qy = this.Mj;
  this.Nj = 12;
  this.Py =
    'data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43MSIgaGVpZ2h0PSI4Ljc5IiB2aWV3Qm94PSIwIDAgMTIuNzEgOC43OSI+PHRpdGxlPmRyb3Bkb3duLWFycm93PC90aXRsZT48ZyBvcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0xMi43MSwyLjQ0QTIuNDEsMi40MSwwLDAsMSwxMiw0LjE2TDguMDgsOC4wOGEyLjQ1LDIuNDUsMCwwLDEtMy40NSwwTDAuNzIsNC4xNkEyLjQyLDIuNDIsMCwwLDEsMCwyLjQ0LDIuNDgsMi40OCwwLDAsMSwuNzEuNzFDMSwwLjQ3LDEuNDMsMCw2LjM2LDBTMTEuNzUsMC40NiwxMiwuNzFBMi40NCwyLjQ0LDAsMCwxLDEyLjcxLDIuNDRaIiBmaWxsPSIjMjMxZjIwIi8+PC9nPjxwYXRoIGQ9Ik02LjM2LDcuNzlhMS40MywxLjQzLDAsMCwxLTEtLjQyTDEuNDIsMy40NWExLjQ0LDEuNDQsMCwwLDEsMC0yYzAuNTYtLjU2LDkuMzEtMC41Niw5Ljg3LDBhMS40NCwxLjQ0LDAsMCwxLDAsMkw3LjM3LDcuMzdBMS40MywxLjQzLDAsMCwxLDYuMzYsNy43OVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
  this.kl = String (Math.random ()).substring (2);
  this.Wm = '';
  this.$p = null;
  this.qv = '';
  this.xk = this.Fp = this.Lp = null;
  this.am = '#cc0a0a';
  this.mm = '#4286f4';
  this.cm = 100;
  this.yu = 5;
  this.bm = 10;
  this.wy = 2;
  this.yy = 4;
  this.Eo = '#000000';
  this.im = 0.2;
  this.du = {Gz: 1, oi: 2};
};
b = h.i.bf.prototype;
b.va = function () {
  this.mi = this.Sq ();
  this.oi = this.Tq ();
  this.wi = this.Vq ();
  this.Qo = this.Uq ();
  var a = this.fb,
    c = h.g.u.arc ('a', '0 0,0', a, h.g.u.za (-a, a)),
    d = h.g.u.arc ('a', '0 0,0', a, h.g.u.za (a, a));
  this.jm = {width: a, height: a, Ar: c, Pn: d};
  a = this.fb;
  c = h.g.u.moveBy (0, a) + h.g.u.arc ('a', '0 0,1', a, h.g.u.za (a, -a));
  d = h.g.u.arc ('a', '0 0,1', a, h.g.u.za (a, a));
  var e = h.g.u.arc ('a', '0 0,1', a, h.g.u.za (-a, -a)),
    f = h.g.u.arc ('a', '0 0,1', a, h.g.u.za (-a, a));
  this.Yj = {ps: c, ID: d, vA: f, qp: e, iD: a};
};
b.ql = function (a) {
  this.Wf = {};
  var c = a.Wf, d;
  for (d in c)
    this.Wf[d] = bd (c[d]);
  this.Qf = a.fontStyle && void 0 != a.fontStyle.family
    ? a.fontStyle.family
    : this.Qf;
  this.Rf = a.fontStyle && void 0 != a.fontStyle.weight
    ? a.fontStyle.weight
    : this.Rf;
  this.Qg = a.fontStyle && void 0 != a.fontStyle.size
    ? a.fontStyle.size
    : this.Qg;
  c = h.g.j.wC (this.Qg + 'pt', this.Rf, this.Qf);
  this.fm = c.height;
  this.dt = c.Td;
  this.am = Pa (a, 'cursorColour') || this.am;
  this.mm = Pa (a, 'markerColour') || this.mm;
  this.Eo = Pa (a, 'insertionMarkerColour') || this.Eo;
  this.im = Number (Pa (a, 'insertionMarkerOpacity')) || this.im;
  this.Ol = null != a.fs ? a.fs : this.Ol;
};
function wc (a, c) {
  var d = 'auto_' + c;
  a.Wf[d] || (a.Wf[d] = bd ({colourPrimary: c}));
  return {style: a.Wf[d], name: d};
}
function sc (a, c) {
  return (
    a.Wf[c || ''] ||
    (c && 0 == c.indexOf ('auto_')
      ? wc (a, c.substring (5)).style
      : bd ({colourPrimary: '#000000'}))
  );
}
function bd (a) {
  var c = {};
  a && h.g.object.Ff (c, a);
  a = h.g.On (c.colourPrimary || '#000');
  c.ah = a.Mk;
  c.colourSecondary
    ? (a = h.g.On (c.colourSecondary).Mk)
    : ((a = c.ah), (a = h.g.kb.np ('#fff', a, 0.6) || a));
  c.Jm = a;
  c.colourTertiary
    ? (a = h.g.On (c.colourTertiary).Mk)
    : ((a = c.ah), (a = h.g.kb.np ('#fff', a, 0.3) || a));
  c.Ji = a;
  c.Me = c.hat || '';
  return c;
}
b.F = function () {
  this.$p && h.g.j.removeNode (this.$p);
  this.Lp && h.g.j.removeNode (this.Lp);
  this.Fp && h.g.j.removeNode (this.Fp);
  this.xk = null;
};
b.Sq = function () {
  var a = this.gz,
    c = this.hz,
    d = h.g.u.line ([
      h.g.u.za (c, a / 4),
      h.g.u.za (2 * -c, a / 2),
      h.g.u.za (c, a / 4),
    ]);
  return {height: a, width: c, path: d};
};
b.Vq = function () {
  var a = this.Nz,
    c = this.Oz,
    d = h.g.u.curve ('c', [
      h.g.u.za (30, -a),
      h.g.u.za (70, -a),
      h.g.u.za (c, 0),
    ]);
  return {height: a, width: c, path: d};
};
b.Uq = function () {
  function a (g) {
    g = g ? -1 : 1;
    var k = -g, l = d / 2, m = h.g.u.za (c, g * l);
    return (
      h.g.u.curve ('c', [
        h.g.u.za (0, g * (l + 2.5)),
        h.g.u.za (-c, k * (l + 0.5)),
        h.g.u.za (-c, g * l),
      ]) + h.g.u.curve ('s', [h.g.u.za (c, 2.5 * k), m])
    );
  }
  var c = this.ym, d = this.ak, e = a (!0), f = a (!1);
  return {type: this.du.Gz, width: c, height: d, Hd: f, dl: e};
};
b.Tq = function () {
  function a (k) {
    return h.g.u.line ([
      h.g.u.za (k * e, d),
      h.g.u.za (3 * k, 0),
      h.g.u.za (k * e, -d),
    ]);
  }
  var c = this.Az, d = this.Gt, e = (c - 3) / 2, f = a (1), g = a (-1);
  return {type: this.du.oi, width: c, height: d, Ag: f, Qw: g};
};
function pa (a, c) {
  switch (c.type) {
    case h.Ya:
    case h.Od:
      return a.Qo;
    case h.Pd:
    case h.Ka:
      return a.oi;
    default:
      throw Error ('Unknown connection type');
  }
}
b.Fa = function (a, c, d) {
  d = this.kq (d);
  c = 'blockly-renderer-style-' + c;
  this.xk = document.getElementById (c);
  var e = d.join ('\n');
  this.xk
    ? (this.xk.firstChild.textContent = e)
    : ((d = document.createElement (
        'style'
      )), (d.id = c), (c = document.createTextNode (e)), d.appendChild (
        c
      ), document.head.insertBefore (
        d,
        document.head.firstChild
      ), (this.xk = d));
  a = h.g.j.H ('defs', {}, a);
  c = h.g.j.H ('filter', {id: 'blocklyEmbossFilter' + this.kl}, a);
  h.g.j.H (
    'feGaussianBlur',
    {in: 'SourceAlpha', stdDeviation: 1, result: 'blur'},
    c
  );
  d = h.g.j.H (
    'feSpecularLighting',
    {
      in: 'blur',
      surfaceScale: 1,
      specularConstant: 0.5,
      specularExponent: 10,
      'lighting-color': 'white',
      result: 'specOut',
    },
    c
  );
  h.g.j.H ('fePointLight', {x: -5e3, y: -1e4, z: 2e4}, d);
  h.g.j.H (
    'feComposite',
    {in: 'specOut', in2: 'SourceAlpha', operator: 'in', result: 'specOut'},
    c
  );
  h.g.j.H (
    'feComposite',
    {
      in: 'SourceGraphic',
      in2: 'specOut',
      operator: 'arithmetic',
      k1: 0,
      k2: 1,
      k3: 1,
      k4: 0,
    },
    c
  );
  this.Wm = c.id;
  this.$p = c;
  c = h.g.j.H (
    'pattern',
    {
      id: 'blocklyDisabledPattern' + this.kl,
      patternUnits: 'userSpaceOnUse',
      width: 10,
      height: 10,
    },
    a
  );
  h.g.j.H ('rect', {width: 10, height: 10, fill: '#aaa'}, c);
  h.g.j.H ('path', {d: 'M 0 0 L 10 10 M 10 0 L 0 10', stroke: '#cc0'}, c);
  this.qv = c.id;
  this.Lp = c;
  h.i.Xs &&
    ((a = h.g.j.H (
      'filter',
      {
        id: 'blocklyDebugFilter' + this.kl,
        height: '160%',
        width: '180%',
        y: '-30%',
        x: '-40%',
      },
      a
    )), (c = h.g.j.H ('feComponentTransfer', {result: 'outBlur'}, a)), h.g.j.H (
      'feFuncA',
      {type: 'table', tableValues: '0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'},
      c
    ), h.g.j.H (
      'feFlood',
      {'flood-color': '#ff0000', 'flood-opacity': 0.5, result: 'outColor'},
      a
    ), h.g.j.H (
      'feComposite',
      {
        in: 'outColor',
        in2: 'outBlur',
        operator: 'in',
        result: 'outGlow',
      },
      a
    ), (this.Fp = a));
};
b.kq = function (a) {
  return [
    a + ' .blocklyText, ',
    a + ' .blocklyFlyoutLabelText {',
    'font-family: ' + this.Qf + ';',
    'font-size: ' + this.Qg + 'pt;',
    'font-weight: ' + this.Rf + ';',
    '}',
    a + ' .blocklyText {',
    'fill: #fff;',
    '}',
    a + ' .blocklyNonEditableText>rect,',
    a + ' .blocklyEditableText>rect {',
    'fill: ' + this.My + ';',
    'fill-opacity: .6;',
    'stroke: none;',
    '}',
    a + ' .blocklyNonEditableText>text,',
    a + ' .blocklyEditableText>text {',
    'fill: #000;',
    '}',
    a + ' .blocklyFlyoutLabelText {',
    'fill: #000;',
    '}',
    a + ' .blocklyText.blocklyBubbleText {',
    'fill: #000;',
    '}',
    a + ' .blocklyEditableText:not(.editing):hover>rect {',
    'stroke: #fff;',
    'stroke-width: 2;',
    '}',
    a + ' .blocklyHtmlInput {',
    'font-family: ' + this.Qf + ';',
    'font-weight: ' + this.Rf + ';',
    '}',
    a + ' .blocklySelected>.blocklyPath {',
    'stroke: #fc3;',
    'stroke-width: 3px;',
    '}',
    a + ' .blocklyHighlightedConnectionPath {',
    'stroke: #fc3;',
    '}',
    a + ' .blocklyReplaceable .blocklyPath {',
    'fill-opacity: .5;',
    '}',
    a + ' .blocklyReplaceable .blocklyPathLight,',
    a + ' .blocklyReplaceable .blocklyPathDark {',
    'display: none;',
    '}',
    a + ' .blocklyInsertionMarker>.blocklyPath {',
    'fill-opacity: ' + this.im + ';',
    'stroke: none',
    '}',
  ];
};
h.i.ef = function (a, c, d) {
  this.o = a;
  this.yw = d;
  this.Qc = null;
  this.s = c;
  this.Oi = null;
  a = cd (this) ? this.s.am : this.s.mm;
  this.ud = d.kb || a;
};
h.i.ef.xy = 'blocklyCursor';
h.i.ef.qz = 'blocklyMarker';
h.i.ef.Xy = 0.75;
b = h.i.ef.prototype;
b.ma = function () {
  return this.L;
};
function cd (a) {
  return 'cursor' == a.yw.type;
}
b.Fa = function () {
  this.L = h.g.j.H ('g', {class: cd (this) ? h.i.ef.xy : h.i.ef.qz}, null);
  this.Ef = h.g.j.H ('g', {width: this.s.cm, height: this.s.yu}, this.L);
  this.tg = h.g.j.H (
    'rect',
    {width: this.s.cm, height: this.s.yu, style: 'display: none'},
    this.Ef
  );
  this.Fh = h.g.j.H (
    'rect',
    {class: 'blocklyVerticalMarker', rx: 10, ry: 10, style: 'display: none'},
    this.Ef
  );
  this.Eh = h.g.j.H ('path', {transform: '', style: 'display: none'}, this.Ef);
  this.Df = h.g.j.H (
    'path',
    {
      transform: '',
      style: 'display: none',
      fill: 'none',
      'stroke-width': this.s.yy,
    },
    this.Ef
  );
  if (cd (this)) {
    var a = {
      attributeType: 'XML',
      attributeName: 'fill',
      dur: '1s',
      values: this.ud + ';transparent;transparent;',
      repeatCount: 'indefinite',
    };
    h.g.j.H ('animate', a, this.tg);
    h.g.j.H ('animate', a, this.Eh);
    a.attributeName = 'stroke';
    h.g.j.H ('animate', a, this.Df);
  }
  dd (this);
  return this.L;
};
function ed (a, c) {
  cd (a)
    ? (a.Qc && a.Qc.Hf (null), c.Hf (a.ma ()))
    : (a.Qc && a.Qc.Jf (null), c.Jf (a.ma ()));
  a.Qc = c;
}
function fd (a, c) {
  if (c) {
    var d = c.width, e = c.height, f = e * h.i.ef.Xy, g = a.s.wy;
    if (c.P) {
      var k = pa (a.s, c.P);
      e = k;
      d =
        h.g.u.moveBy (-g, f) +
        h.g.u.T ('V', -g) +
        h.g.u.T ('H', a.s.Xj) +
        e.Ag +
        h.g.u.T ('H', d + 2 * g) +
        h.g.u.T ('V', f);
      a.Df.setAttribute ('d', d);
    } else
      c.K
        ? ((f = k = pa (a.s, c.K)), (d =
            h.g.u.moveBy (d, 0) +
            h.g.u.T ('h', -(d - f.width)) +
            h.g.u.T ('v', a.s.zi) +
            f.Hd +
            h.g.u.T ('V', e) +
            h.g.u.T ('H', d)), a.Df.setAttribute ('d', d))
        : ((d =
            h.g.u.moveBy (-g, f) +
            h.g.u.T ('V', -g) +
            h.g.u.T ('H', d + 2 * g) +
            h.g.u.T ('V', f)), a.Df.setAttribute ('d', d));
    a.o.G && a.Gk (a.Df);
    a.Oi = a.Df;
    ed (a, c);
    gd (a);
  }
}
function gd (a) {
  a.Ba ();
  a.Oi.style.display = '';
}
function hd (a, c, d, e) {
  a.tg.setAttribute ('x', c);
  a.tg.setAttribute ('y', d);
  a.tg.setAttribute ('width', e);
  a.Oi = a.tg;
}
function id (a, c, d, e, f) {
  a.Fh.setAttribute ('x', c);
  a.Fh.setAttribute ('y', d);
  a.Fh.setAttribute ('width', e);
  a.Fh.setAttribute ('height', f);
  a.Oi = a.Fh;
}
b.Gk = function (a) {
  a.setAttribute ('transform', 'scale(-1 1)');
};
b.Ba = function () {
  this.tg.style.display = 'none';
  this.Fh.style.display = 'none';
  this.Eh.style.display = 'none';
  this.Df.style.display = 'none';
};
b.draw = function (a, c) {
  if (c) {
    this.s = this.o.bb.W ();
    var d = cd (this) ? this.s.am : this.s.mm;
    this.ud = this.yw.kb || d;
    dd (this);
    if (c.ab () == h.w.types.Vc) fd (this, c.ea);
    else if (c.ab () == h.w.types.Ug) (d = c.ea.R ()), fd (this, d);
    else if (c.ea.type == h.Ya) {
      var e = c.ea;
      d = e.R ();
      var f = e.Kh.x, g = e.Kh.y;
      e = h.g.u.moveTo (0, 0) + pa (this.s, e).Hd;
      this.Eh.setAttribute ('d', e);
      this.Eh.setAttribute (
        'transform',
        'translate(' + f + ',' + g + ')' + (this.o.G ? ' scale(-1 1)' : '')
      );
      this.Oi = this.Eh;
      ed (this, d);
      gd (this);
    } else if (c.ea.type == h.Ka)
      (g = c.ea), (d = g.R ()), (f = 0), (g = g.Kh.y), (e = z (d).width), this.o
        .G && (f = -e), hd (this, f, g, e), ed (this, d), gd (this);
    else if (c.ab () == h.w.types.rd) (d = c.ea.R ()), fd (this, d);
    else if (c.ab () == h.w.types.Wc)
      (d = c.ea), (f = d.xf ().width), (g = d.xf ().height), id (
        this,
        0,
        0,
        f,
        g
      ), ed (this, d), gd (this);
    else if (c.ab () == h.w.types.Ae)
      (f = c.ys), (d = f.x), (f = f.y), this.o.G && (d -= this.s.cm), hd (
        this,
        d,
        f,
        this.s.cm
      ), ed (this, this.o), gd (this);
    else if (c.ab () == h.w.types.we) {
      d = c.ea;
      g = z (d);
      f = g.width + this.s.bm;
      g = g.height + this.s.bm;
      var k = (e = -this.s.bm / 2), l = -this.s.bm / 2;
      this.o.G && (k = -(f + e));
      id (this, k, l, f, g);
      ed (this, d);
      gd (this);
    }
    d = c.R ();
    a = new h.h.jc (d, cd (this) ? 'cursorMove' : 'markerMove', a, c);
    c.ab () == h.w.types.Ae && (a.wb = c.ea.id);
    h.h.Ia (a);
    c = this.Oi.childNodes[0];
    void 0 !== c && c.beginElement && c.beginElement ();
  } else this.Ba ();
};
function dd (a) {
  a.tg.setAttribute ('fill', a.ud);
  a.Fh.setAttribute ('stroke', a.ud);
  a.Eh.setAttribute ('fill', a.ud);
  a.Df.setAttribute ('stroke', a.ud);
  if (cd (a)) {
    var c = a.ud + ';transparent;transparent;';
    a.tg.firstChild.setAttribute ('values', c);
    a.Eh.firstChild.setAttribute ('values', c);
    a.Df.firstChild.setAttribute ('values', c);
  }
}
b.F = function () {
  this.L && h.g.j.removeNode (this.L);
};
h.i.m = {
  NONE: 0,
  Wc: 1,
  ft: 2,
  jt: 4,
  Yo: 8,
  Is: 16,
  ot: 32,
  $s: 64,
  ue: 128,
  mt: 256,
  gu: 512,
  sy: 1024,
  Po: 2048,
  Lo: 4096,
  Ez: 8192,
  so: 16384,
  Io: 32768,
  Ho: 65536,
  Uo: 131072,
  To: 262144,
  tt: 524288,
  Vo: 1048576,
  cp: 2097152,
  no: 4194304,
  nt: 8388608,
};
h.i.m.XE = h.i.m.Io | h.i.m.Ho;
h.i.m.oG = h.i.m.Uo | h.i.m.To;
h.i.m.jr = 16777216;
h.i.m.ab = function () {
  h.i.m.hasOwnProperty (void 0) ||
    ((h.i.m[void 0] = h.i.m.jr), (h.i.m.jr <<= 1));
  return h.i.m[void 0];
};
h.i.m.Af = function (a) {
  return a.type & h.i.m.Wc;
};
h.i.m.zh = function (a) {
  return a.type & h.i.m.ft;
};
h.i.m.gj = function (a) {
  return a.type & h.i.m.jt;
};
h.i.m.Bd = function (a) {
  return a.type & h.i.m.Yo;
};
h.i.m.sH = function (a) {
  return a.type & h.i.m.ot;
};
h.i.m.ng = function (a) {
  return a.type & h.i.m.ue;
};
h.i.m.Sk = function (a) {
  return a.type & h.i.m.$s;
};
h.i.m.mg = function (a) {
  return a.type & h.i.m.mt;
};
h.i.m.Ah = function (a) {
  return a.type & h.i.m.gu;
};
h.i.m.jj = function (a) {
  return a.type & h.i.m.Po;
};
h.i.m.qg = function (a) {
  return a.type & h.i.m.Lo;
};
h.i.m.pC = function (a) {
  return a.type & (h.i.m.Po | h.i.m.Lo);
};
h.i.m.pg = function (a) {
  return a.type & h.i.m.Ho;
};
h.i.m.pw = function (a) {
  return a.type & h.i.m.To;
};
h.i.m.Uk = function (a) {
  return a.type & h.i.m.Io;
};
h.i.m.tH = function (a) {
  return a.type & h.i.m.Uo;
};
h.i.m.rH = function (a) {
  return a.type & h.i.m.so;
};
h.i.m.nw = function (a) {
  return a.type & h.i.m.tt;
};
h.i.m.vH = function (a) {
  return a.type & h.i.m.Vo;
};
h.i.m.qH = function (a) {
  return a.type & h.i.m.Is;
};
h.i.m.vn = function (a) {
  return a.type & h.i.m.cp;
};
h.i.m.nn = function (a) {
  return a.type & h.i.m.no;
};
h.i.m.qC = function (a) {
  return a.type & (h.i.m.cp | h.i.m.no);
};
h.i.m.kC = function (a) {
  return a.type & h.i.m.nt;
};
h.i.Uf = function (a) {
  this.height = this.width = 0;
  this.type = h.i.m.NONE;
  this.Hi = this.Aa = 0;
  this.s = a;
  this.Fd = this.s.Xj;
};
h.i.ga = function (a, c) {
  h.i.ga.v.constructor.call (this, a);
  this.zc = c;
  this.shape = pa (this.s, c);
  this.yh = !!this.shape.isDynamic;
  this.type |= h.i.m.sy;
};
h.g.object.S (h.i.ga, h.i.Uf);
h.i.Oo = function (a, c) {
  h.i.Oo.v.constructor.call (this, a, c);
  this.type |= h.i.m.Ez;
  this.height = this.yh ? 0 : this.shape.height;
  this.Kd = this.width = this.yh ? 0 : this.shape.width;
  this.$c = this.s.zi;
  this.nk = 0;
};
h.g.object.S (h.i.Oo, h.i.ga);
h.i.Ro = function (a, c) {
  h.i.Ro.v.constructor.call (this, a, c);
  this.type |= h.i.m.Po;
  this.height = this.shape.height;
  this.width = this.shape.width;
};
h.g.object.S (h.i.Ro, h.i.ga);
h.i.Mo = function (a, c) {
  h.i.Mo.v.constructor.call (this, a, c);
  this.type |= h.i.m.Lo;
  this.height = this.shape.height;
  this.width = this.shape.width;
};
h.g.object.S (h.i.Mo, h.i.ga);
h.i.Rj = function (a, c) {
  h.i.Rj.v.constructor.call (this, a, c.connection);
  this.type |= h.i.m.ue;
  this.input = c;
  this.align = c.align;
  (this.Zf = c.connection && c.connection.la () ? c.connection.la () : null)
    ? ((a = z (this.Zf)), (this.mk = a.width), (this.Lm = a.height))
    : (this.Lm = this.mk = 0);
  this.$c = this.nk = 0;
};
h.g.object.S (h.i.Rj, h.i.ga);
h.i.Sf = function (a, c) {
  h.i.Sf.v.constructor.call (this, a, c);
  this.type |= h.i.m.mt;
  this.Zf
    ? ((this.width = this.mk), (this.height = this.Lm))
    : ((this.height = this.s.Iy), (this.width = this.s.Jy));
  this.Ki = this.yh ? this.shape.height (this.height) : this.shape.height;
  this.He = this.yh ? this.shape.width (this.height) : this.shape.width;
  this.Zf || (this.width += this.He * (this.yh ? 2 : 1));
  this.$c = this.yh ? this.shape.$c (this.Ki) : this.s.zi;
  this.nk = this.yh ? this.shape.nk (this.He) : 0;
};
h.g.object.S (h.i.Sf, h.i.Rj);
h.i.Vf = function (a, c) {
  h.i.Vf.v.constructor.call (this, a, c);
  this.type |= h.i.m.gu;
  this.height = this.Zf ? this.Lm + this.s.Pz : this.s.Ky;
  this.width = this.s.Qz + this.shape.width;
};
h.g.object.S (h.i.Vf, h.i.Rj);
h.i.dm = function (a, c) {
  h.i.dm.v.constructor.call (this, a, c);
  this.type |= h.i.m.$s;
  this.height = this.Zf ? this.Lm - this.s.zi - this.s.od : this.shape.height;
  this.width = this.shape.width + this.s.Ly;
  this.$c = this.s.zi;
  this.Ki = this.shape.height;
  this.He = this.shape.width;
};
h.g.object.S (h.i.dm, h.i.Rj);
h.i.Fo = function (a, c) {
  h.i.Fo.v.constructor.call (this, a);
  this.icon = c;
  this.isVisible = c.isVisible ();
  this.type |= h.i.m.jt;
  a = c.gH ();
  this.height = a.height;
  this.width = a.width;
};
h.g.object.S (h.i.Fo, h.i.Uf);
h.i.Go = function (a) {
  h.i.Go.v.constructor.call (this, a);
  this.type |= h.i.m.tt;
  this.height = this.s.mi.height;
  this.width = this.s.mi.width;
};
h.g.object.S (h.i.Go, h.i.Uf);
h.i.md = function (a, c) {
  h.i.md.v.constructor.call (this, a);
  this.xv = c;
  this.Ad = c.Lj;
  this.sB = c.Lv ();
  this.type |= h.i.m.Wc;
  a = this.xv.xf ();
  this.height = a.height;
  this.width = a.width;
};
h.g.object.S (h.i.md, h.i.Uf);
h.i.zo = function (a) {
  h.i.zo.v.constructor.call (this, a);
  this.type |= h.i.m.ft;
  this.height = this.s.wi.height;
  this.width = this.s.wi.width;
  this.Di = this.height;
};
h.g.object.S (h.i.zo, h.i.Uf);
h.i.yi = function (a, c) {
  h.i.yi.v.constructor.call (this, a);
  this.type = (c && 'left' != c ? h.i.m.Uo : h.i.m.Io) | h.i.m.so;
  this.width = this.height = this.s.ve;
};
h.g.object.S (h.i.yi, h.i.Uf);
h.i.sm = function (a, c) {
  h.i.sm.v.constructor.call (this, a);
  this.type = (c && 'left' != c ? h.i.m.To : h.i.m.Ho) | h.i.m.so;
  this.width = this.s.fb;
  this.height = this.s.fb / 2;
};
h.g.object.S (h.i.sm, h.i.Uf);
h.i.df = function (a, c) {
  h.i.df.v.constructor.call (this, a);
  this.type = this.type | h.i.m.Yo | h.i.m.ot;
  this.width = c;
  this.height = this.s.Mz;
};
h.g.object.S (h.i.df, h.i.Uf);
h.i.Vg = function (a) {
  this.type = h.i.m.Vo;
  this.elements = [];
  this.Aa = this.Mb = this.oe = this.minWidth = this.minHeight = this.width = this.height = 0;
  this.aw = this.Zi = this.xq = this.Eb = this.hg = !1;
  this.s = a;
  this.Fd = this.s.Xj;
  this.align = null;
};
h.i.Vg.prototype.measure = function () {
  throw Error ('Unexpected attempt to measure a base Row.');
};
function N (a) {
  for (var c = a.elements.length - 1, d; (d = a.elements[c]); c--)
    if (h.i.m.ng (d)) return d;
  return null;
}
h.i.Vg.prototype.Un = function () {
  return !0;
};
h.i.Vg.prototype.Ck = function () {
  return !0;
};
h.i.Zg = function (a) {
  h.i.Zg.v.constructor.call (this, a);
  this.type |= h.i.m.cp;
  this.Di = this.mf = 0;
  this.$B = !1;
  this.connection = null;
};
h.g.object.S (h.i.Zg, h.i.Vg);
h.i.Zg.prototype.yq = function (a) {
  var c = (a.Me ? 'cap' === a.Me : this.s.Ol) && !a.K && !a.P,
    d = a.P && a.P.la ();
  return !!a.K || c || (d ? u (d) == a : !1);
};
h.i.Zg.prototype.measure = function () {
  for (var a = 0, c = 0, d = 0, e = 0, f; (f = this.elements[e]); e++)
    (c += f.width), h.i.m.Bd (f) ||
      (h.i.m.zh (f) ? (d = Math.max (d, f.Di)) : (a = Math.max (a, f.height)));
  this.width = Math.max (this.minWidth, c);
  this.height = Math.max (this.minHeight, a) + d;
  this.mf = this.Di = d;
  this.oe = this.width;
};
h.i.Zg.prototype.Un = function () {
  return !1;
};
h.i.Zg.prototype.Ck = function () {
  return !1;
};
h.i.Ng = function (a) {
  h.i.Ng.v.constructor.call (this, a);
  this.type |= h.i.m.no;
  this.bw = !1;
  this.connection = null;
  this.Td = this.zk = 0;
};
h.g.object.S (h.i.Ng, h.i.Vg);
h.i.Ng.prototype.yq = function (a) {
  return !!a.K || !!u (a);
};
h.i.Ng.prototype.measure = function () {
  for (var a = 0, c = 0, d = 0, e = 0, f; (f = this.elements[e]); e++)
    (c += f.width), h.i.m.Bd (f) ||
      (h.i.m.qg (f)
        ? (d = Math.max (d, f.height))
        : (a = Math.max (a, f.height)));
  this.width = Math.max (this.minWidth, c);
  this.height = Math.max (this.minHeight, a) + d;
  this.zk = d;
  this.oe = this.width;
};
h.i.Ng.prototype.Un = function () {
  return !1;
};
h.i.Ng.prototype.Ck = function () {
  return !1;
};
h.i.xm = function (a, c, d) {
  h.i.xm.v.constructor.call (this, a);
  this.type = this.type | h.i.m.Yo | h.i.m.Is;
  this.width = d;
  this.height = c;
  this.Dv = !1;
  this.oe = 0;
  this.elements = [new h.i.df (this.s, d)];
};
h.g.object.S (h.i.xm, h.i.Vg);
h.i.xm.prototype.measure = function () {};
h.i.li = function (a) {
  h.i.li.v.constructor.call (this, a);
  this.type |= h.i.m.nt;
  this.Yu = 0;
};
h.g.object.S (h.i.li, h.i.Vg);
h.i.li.prototype.measure = function () {
  this.width = this.minWidth;
  this.height = this.minHeight;
  for (var a = 0, c = 0, d; (d = this.elements[c]); c++)
    (this.width += d.width), h.i.m.ng (d) &&
      (h.i.m.Ah (d)
        ? (a += d.mk)
        : h.i.m.Sk (d) && 0 != d.mk && (a += d.mk - d.He)), h.i.m.Bd (d) ||
      (this.height = Math.max (this.height, d.height));
  this.Yu = a;
  this.oe = this.width + a;
};
h.i.li.prototype.Ck = function () {
  return !this.hg && !this.Eb;
};
h.i.Qd = function (a, c) {
  this.ya = c;
  this.bb = a;
  this.s = this.bb.W ();
  this.K = c.K ? new h.i.Oo (this.s, c.K) : null;
  this.hj = qa (c) && !c.isCollapsed ();
  this.isCollapsed = c.isCollapsed ();
  this.og = c.og ();
  this.G = c.G;
  this.Gg = this.width = this.Gj = this.height = 0;
  this.rows = [];
  this.jw = [];
  this.fw = [];
  this.zb = new h.i.Zg (this.s);
  this.jb = new h.i.Ng (this.s);
  this.Tn = this.Kd = 0;
};
b = h.i.Qd.prototype;
b.measure = function () {
  var a = !!this.ya.P,
    c = (this.ya.Me ? 'cap' === this.ya.Me : this.s.Ol) && !this.K && !a;
  this.zb.yq (this.ya)
    ? this.zb.elements.push (new h.i.yi (this.s))
    : this.zb.elements.push (new h.i.sm (this.s));
  c
    ? ((a = new h.i.zo (this.s)), this.zb.elements.push (a), (this.zb.mf =
        a.Di))
    : a &&
        ((this.zb.$B = !0), (this.zb.connection = new h.i.Ro (
          this.s,
          this.ya.P
        )), this.zb.elements.push (this.zb.connection));
  this.ya.N.length && this.ya.N[0].type == h.Ka && !this.ya.isCollapsed ()
    ? (this.zb.minHeight = this.s.Uz)
    : (this.zb.minHeight = this.s.Tz);
  this.zb.elements.push (new h.i.yi (this.s, 'right'));
  this.rows.push (this.zb);
  a = new h.i.li (this.s);
  this.jw.push (a);
  var d = ra (this.ya);
  if (d.length) {
    c = 0;
    for (var e; (e = d[c]); c++) {
      var f = new h.i.Fo (this.s, e);
      this.isCollapsed && e.XG ? this.fw.push (f) : a.elements.push (f);
    }
  }
  e = null;
  for (c = 0; (d = this.ya.N[c]); c++)
    if (d.isVisible ()) {
      !e ||
        (d.type != h.Ka &&
          e.type != h.Ka &&
          ((d.type != h.Ya && d.type != h.cf) || this.hj)) ||
        (this.rows.push (a), (a = new h.i.li (this.s)), this.jw.push (a));
      for (e = 0; (f = d.Sa[e]); e++)
        a.elements.push (new h.i.md (this.s, f, d));
      this.Hu (d, a);
      e = d;
    }
  this.isCollapsed && ((a.aw = !0), a.elements.push (new h.i.Go (this.s)));
  (a.elements.length || a.Zi) && this.rows.push (a);
  this.Er ();
  this.rows.push (this.jb);
  this.Gu ();
  a = this.rows;
  this.rows = [];
  for (c = 0; c < a.length; c++)
    this.rows.push (a[c]), c != a.length - 1 &&
      this.rows.push (jd (this, a[c], a[c + 1]));
  for (e = d = c = a = 0; (f = this.rows[e]); e++)
    f.measure (), (c = Math.max (c, f.width)), f.Eb &&
      (a = Math.max (a, f.width - N (f).width)), (d = Math.max (d, f.oe));
  this.Gg = a;
  this.width = c;
  for (e = 0; (f = this.rows[e]); e++)
    f.Eb && (f.Gg = this.Gg);
  this.Gj = Math.max (c, d);
  this.K &&
    ((this.Kd = this.K.width), (this.width += this.K.width), (this.Gj += this.K.width));
  this.gp ();
  this.yv ();
};
b.Er = function () {
  this.jb.bw = !!this.ya.U;
  this.jb.minHeight = this.ya.N.length &&
    this.ya.N[this.ya.N.length - 1].type == h.Ka
    ? this.s.iy
    : this.s.jy;
  this.jb.yq (this.ya)
    ? this.jb.elements.push (new h.i.yi (this.s))
    : this.jb.elements.push (new h.i.sm (this.s));
  this.jb.bw &&
    ((this.jb.connection = new h.i.Mo (
      this.s,
      this.ya.U
    )), this.jb.elements.push (this.jb.connection));
  this.jb.elements.push (new h.i.yi (this.s, 'right'));
};
b.Hu = function (a, c) {
  this.hj && a.type == h.Ya
    ? (c.elements.push (new h.i.Sf (this.s, a)), (c.xq = !0))
    : a.type == h.Ka
        ? (c.elements.push (new h.i.Vf (this.s, a)), (c.Eb = !0))
        : a.type == h.Ya
            ? (c.elements.push (new h.i.dm (this.s, a)), (c.hg = !0))
            : a.type == h.cf &&
                ((c.minHeight = Math.max (
                  c.minHeight,
                  a.R () && a.R ().Na ? this.s.Gy : this.s.Ws
                )), (c.Zi = !0));
  null == c.align && (c.align = a.align);
};
b.Gu = function () {
  for (var a = 0, c; (c = this.rows[a]); a++) {
    var d = c.elements;
    c.elements = [];
    c.Un () && c.elements.push (new h.i.df (this.s, this.nh (null, d[0])));
    if (d.length) {
      for (var e = 0; e < d.length - 1; e++)
        c.elements.push (d[e]), c.elements.push (
          new h.i.df (this.s, this.nh (d[e], d[e + 1]))
        );
      c.elements.push (d[d.length - 1]);
      c.Ck () &&
        c.elements.push (new h.i.df (this.s, this.nh (d[d.length - 1], null)));
    }
  }
};
b.nh = function (a, c) {
  if (!a && c && h.i.m.Ah (c)) return this.s.iu;
  if (a && h.i.m.ng (a) && !c) {
    if (h.i.m.Sk (a)) return this.s.ve;
    if (h.i.m.mg (a)) return this.s.vc;
    if (h.i.m.Ah (a)) return this.s.ve;
  }
  return a && h.i.m.Uk (a) && c && (h.i.m.jj (c) || h.i.m.qg (c))
    ? c.Fd
    : a && h.i.m.pg (a) && c && (h.i.m.jj (c) || h.i.m.qg (c))
        ? c.Fd - this.s.fb
        : this.s.od;
};
b.gp = function () {
  for (var a = 0, c; (c = this.rows[a]); a++)
    if (c.Eb) kd (this, c);
    else {
      var d = this.Ik (c) - c.width;
      0 < d && ld (c, d);
      h.i.m.qC (c) && (c.oe = c.width);
    }
};
b.Ik = function () {
  return this.width - this.Kd;
};
function ld (a, c) {
  a: {
    var d = 0;
    for (var e; (e = a.elements[d]); d++)
      if (h.i.m.Bd (e)) {
        d = e;
        break a;
      }
    d = null;
  }
  a: {
    e = a.elements.length - 1;
    for (var f; (f = a.elements[e]); e--)
      if (h.i.m.Bd (f)) {
        e = f;
        break a;
      }
    e = null;
  }
  if (a.hg || a.Eb) a.oe += c;
  a.align == h.io
    ? (e.width += c)
    : a.align == h.ho
        ? ((d.width += c / 2), (e.width += c / 2))
        : a.align == h.Ds ? (d.width += c) : (e.width += c);
  a.width += c;
}
function kd (a, c) {
  var d = N (c), e = c.width - d.width, f = a.Gg;
  e = f - e;
  0 < e && ld (c, e);
  e = c.width;
  f = a.Ik (c);
  d.width += f - e;
  d.height = Math.max (d.height, c.height);
  c.width += f - e;
  c.oe = Math.max (c.width, a.Gg + c.Yu);
}
function jd (a, c, d) {
  a = new h.i.xm (a.s, a.Sv (c, d), a.width - a.Kd);
  c.Eb && (a.Dv = !0);
  d.Eb && (a.BH = !0);
  return a;
}
b.Sv = function () {
  return this.s.od;
};
b.Kv = function (a, c) {
  return h.i.m.Bd (c)
    ? a.Mb + c.height / 2
    : h.i.m.nn (a)
        ? ((a = a.Mb + a.height - a.zk), h.i.m.qg (c)
            ? a + c.height / 2
            : a - c.height / 2)
        : h.i.m.vn (a)
            ? h.i.m.zh (c) ? a.mf - c.height / 2 : a.mf + c.height / 2
            : a.Mb + a.height / 2;
};
function md (a, c) {
  for (var d = c.Aa, e = 0, f; (f = c.elements[e]); e++)
    h.i.m.Bd (f) && (f.height = c.height), (f.Aa = d), (f.Hi = a.Kv (
      c,
      f
    )), (d += f.width);
}
b.yv = function () {
  for (var a = 0, c = 0, d = 0, e; (e = this.rows[d]); d++)
    (e.Mb = c), (e.Aa = this.Kd), (c += e.height), (a = Math.max (
      a,
      e.oe
    )), md (this, e);
  this.K &&
    this.ya.U &&
    this.ya.U.isConnected () &&
    (a = Math.max (a, z (this.ya.U.la ()).width));
  this.Gj = a + this.Kd;
  this.height = c;
  this.Tn = this.zb.mf;
  this.jb.Td = c - this.jb.zk;
};
h.i.uc = function (a, c) {
  this.ya = a;
  this.ba = c;
  a.Ma ();
  this.mn = this.Ga = '';
  this.s = c.bb.W ();
};
b = h.i.uc.prototype;
b.draw = function () {
  nd (this);
  od (this);
  pd (this);
  this.ya.vb.Wr (this.Ga + '\n' + this.mn);
  this.ba.G && this.ya.vb.gq ();
  h.i.Ll && this.ya.Mr.kB (this.ya, this.ba);
  qd (this);
};
function qd (a) {
  a.ya.height = a.ba.height;
  a.ya.width = a.ba.Gj;
}
function nd (a) {
  for (var c = 0, d; (d = a.ba.fw[c]); c++)
    d.icon.cC.setAttribute ('display', 'none');
}
function od (a) {
  a.Yp ();
  for (var c = 1; c < a.ba.rows.length - 1; c++) {
    var d = a.ba.rows[c];
    d.aw ? a.Bk (d) : d.Eb ? a.Xp (d) : d.hg ? a.Zp (d) : a.vv (d);
  }
  a.Up ();
  a.Wp ();
}
b.Yp = function () {
  var a = this.ba.zb, c = a.elements, d = this.ba.zb;
  if (d.connection) {
    var e = d.Aa + d.Fd;
    J (d.connection.zc, this.ba.G ? -e : e, 0);
  }
  this.Ga += h.g.u.moveBy (a.Aa, this.ba.Tn);
  for (d = 0; (e = c[d]); d++)
    h.i.m.pg (e)
      ? (this.Ga += this.s.Yj.ps)
      : h.i.m.pw (e)
          ? (this.Ga += this.s.Yj.ID)
          : h.i.m.jj (e)
              ? (this.Ga += e.shape.Ag)
              : h.i.m.zh (e)
                  ? (this.Ga += this.s.wi.path)
                  : h.i.m.Bd (e) && (this.Ga += h.g.u.T ('h', e.width));
  this.Ga += h.g.u.T ('v', a.height);
};
b.Bk = function (a) {
  this.Ga += this.s.mi.path + h.g.u.T ('v', a.height - this.s.mi.height);
};
b.Zp = function (a) {
  var c = N (a);
  this.Tw (a);
  var d = 'function' == typeof c.shape.Hd ? c.shape.Hd (c.height) : c.shape.Hd;
  this.Ga += h.g.u.T ('H', c.Aa + c.width) + d + h.g.u.T ('v', a.height - c.Ki);
};
b.Xp = function (a) {
  var c = N (a);
  this.Ga +=
    h.g.u.T ('H', c.Aa + c.Fd + c.shape.width) +
    (c.shape.Qw + h.g.u.T ('h', -(c.Fd - this.s.jm.width)) + this.s.jm.Ar) +
    h.g.u.T ('v', a.height - 2 * this.s.jm.height) +
    this.s.jm.Pn +
    h.g.u.T ('H', a.Aa + a.width);
  this.Ww (a);
};
b.vv = function (a) {
  this.Ga += h.g.u.T ('V', a.Mb + a.height);
};
b.Up = function () {
  var a = this.ba.jb, c = a.elements;
  this.Vw ();
  for (var d = 0, e = '', f = c.length - 1, g; (g = c[f]); f--)
    h.i.m.qg (g)
      ? (e += g.shape.Qw)
      : h.i.m.Uk (g)
          ? (e += h.g.u.T ('H', a.Aa))
          : h.i.m.pg (g)
              ? (e += this.s.Yj.qp)
              : h.i.m.pw (g)
                  ? ((e += this.s.Yj.vA), (d = this.s.Yj.iD))
                  : h.i.m.Bd (g) && (e += h.g.u.T ('h', -1 * g.width));
  this.Ga += h.g.u.T ('V', a.Td - d);
  this.Ga += e;
};
b.Wp = function () {
  var a = this.ba.K;
  if (this.ba.K) {
    var c = this.ba.Kd + this.ba.K.nk;
    J (this.ya.K, this.ba.G ? -c : c, this.ba.K.$c);
  }
  a &&
    ((c = a.$c + a.height), (a = 'function' == typeof a.shape.dl
      ? a.shape.dl (a.height)
      : a.shape.dl), (this.Ga += h.g.u.T ('V', c) + a));
  this.Ga += 'z';
};
function pd (a) {
  for (var c = 0, d; (d = a.ba.rows[c]); c++)
    for (var e = 0, f; (f = d.elements[e]); e++)
      if (h.i.m.mg (f)) a.Vp (f);
      else if (h.i.m.gj (f) || h.i.m.Af (f)) {
        var g = a;
        if (h.i.m.Af (f)) var k = f.xv.ma ();
        else h.i.m.gj (f) && (k = f.icon.cC);
        var l = f.Hi - f.height / 2, m = f.Aa, n = '';
        g.ba.G &&
          ((m = -(m + f.width)), f.sB && ((m += f.width), (n = 'scale(-1 1)')));
        h.i.m.gj (f)
          ? (k.setAttribute ('display', 'block'), k.setAttribute (
              'transform',
              'translate(' + m + ',' + l + ')'
            ), f.icon.LA ())
          : k.setAttribute ('transform', 'translate(' + m + ',' + l + ')' + n);
        g.ba.og && k.setAttribute ('display', 'none');
      }
}
b.Vp = function (a) {
  var c = a.width, d = a.height, e = a.$c, f = a.Ki + e;
  this.mn +=
    h.g.u.moveTo (a.Aa + a.He, a.Hi - d / 2) +
    h.g.u.T ('v', e) +
    a.shape.Hd +
    h.g.u.T ('v', d - f) +
    h.g.u.T ('h', c - a.He) +
    h.g.u.T ('v', -d) +
    'z';
  this.Uw (a);
};
b.Uw = function (a) {
  var c = a.Hi - a.height / 2;
  if (a.zc) {
    var d = a.Aa + a.He + a.nk;
    this.ba.G && (d *= -1);
    J (a.zc, d, c + a.$c);
  }
};
b.Ww = function (a) {
  var c = N (a);
  if (c.zc) {
    var d = a.Aa + a.Gg + c.Fd;
    this.ba.G && (d *= -1);
    J (c.zc, d, a.Mb);
  }
};
b.Tw = function (a) {
  var c = N (a);
  if (c.zc) {
    var d = a.Aa + a.width;
    this.ba.G && (d *= -1);
    J (c.zc, d, a.Mb);
  }
};
b.Vw = function () {
  var a = this.ba.jb;
  if (a.connection) {
    var c = a.connection, d = c.Aa;
    J (c.zc, this.ba.G ? -d : d, a.Td);
  }
};
h.i.ff = function (a, c, d) {
  this.Mi = d;
  this.We = a;
  this.Gb = h.g.j.H ('path', {class: 'blocklyPath'}, this.We);
  this.style = c;
  this.Xq = this.yk = null;
};
b = h.i.ff.prototype;
b.Wr = function (a) {
  this.Gb.setAttribute ('d', a);
};
b.gq = function () {
  this.Gb.setAttribute ('transform', 'scale(-1 1)');
};
b.Hf = function (a) {
  a ? (this.We.appendChild (a), (this.yk = a)) : (this.yk = null);
};
b.Jf = function (a) {
  a
    ? (this.yk
        ? this.We.insertBefore (a, this.yk)
        : this.We.appendChild (a), (this.Xq = a))
    : (this.Xq = null);
};
b.lc = function (a) {
  this.Gb.setAttribute ('stroke', this.style.Ji);
  this.Gb.setAttribute ('fill', this.style.ah);
  this.Bx (a.Na);
  this.ts (!a.isEnabled () || ec (a));
};
b.Th = function (a) {
  this.style = a;
};
function A (a, c, d) {
  d ? h.g.j.xb (a.We, c) : h.g.j.Rc (a.We, c);
}
b.zx = function (a) {
  a
    ? this.Gb.setAttribute ('filter', 'url(#' + this.Mi.Wm + ')')
    : this.Gb.setAttribute ('filter', 'none');
};
b.Bx = function (a) {
  a &&
    (this.Gb.setAttribute ('stroke', 'none'), this.Gb.setAttribute (
      'fill',
      this.style.Jm
    ));
};
b.ts = function (a) {
  A (this, 'blocklyDisabled', a);
  a && this.Gb.setAttribute ('fill', 'url(#' + this.Mi.qv + ')');
};
h.i.gf = function (a) {
  this.name = a;
  this.yr = this.s = null;
};
b = h.i.gf.prototype;
b.ae = function () {
  return this.name + '-renderer';
};
b.va = function (a, c) {
  this.s = this.Rq ();
  c && ((this.yr = c), h.g.object.Ff (this.s, c));
  this.s.ql (a);
  this.s.va ();
};
b.Fa = function (a, c) {
  this.s.Fa (a, this.name + '-' + c.name, '.' + this.ae () + '.' + c.ae ());
};
b.Ir = function (a, c) {
  var d = this.W ();
  d.F ();
  this.s = this.Rq ();
  this.yr && h.g.object.Ff (this.s, this.yr);
  this.s.kl = d.kl;
  this.s.ql (c);
  this.s.va ();
  this.Fa (a, c);
};
b.F = function () {
  this.s && this.s.F ();
};
b.Rq = function () {
  return new h.i.bf ();
};
b.xw = function (a) {
  return new h.i.Qd (this, a);
};
b.vw = function (a, c) {
  return new h.i.uc (a, c);
};
b.ww = function (a, c) {
  return new h.i.ff (a, c, this.s);
};
b.W = function () {
  return this.s;
};
b.Ca = function (a) {
  if (h.i.Ll && !a.Mr) {
    if (!h.i.Xs)
      throw Error ('Missing require for Blockly.blockRendering.Debug');
    var c = new h.i.Xs (this.W ());
    a.Mr = c;
  }
  c = this.xw (a);
  c.measure ();
  this.vw (a, c).draw ();
};
h.X = {};
h.X.bf = function () {
  h.X.bf.v.constructor.call (this);
  this.wo = !1;
  this.Ub = 1;
  this.rz = 30;
};
h.g.object.S (h.X.bf, h.i.bf);
h.X.bf.prototype.kq = function (a) {
  return h.X.bf.v.kq
    .call (this, a)
    .concat ([
      a + ' .blocklyInsertionMarker>.blocklyPathLight,',
      a + ' .blocklyInsertionMarker>.blocklyPathDark {',
      'fill-opacity: ' + this.im + ';',
      'stroke: none',
      '}',
    ]);
};
h.X.ht = function (a) {
  this.ba = a;
  this.Pk = this.Y = '';
  this.Vb = this.ba.G;
  a = a.bb;
  this.s = a.W ();
  this.cd = a.cd;
  this.Nc = this.cd.OFFSET;
  this.xr = this.cd.Fz;
  this.ej = this.cd.fz;
  this.jl = this.cd.Qo;
  this.NC = this.cd.oi;
  this.yD = this.cd.wi;
  this.qw = this.cd.mi;
};
h.X.ht.prototype.Bk = function (a) {
  this.ba.G &&
    (this.Y += this.qw.Ag + h.g.u.T ('v', a.height - this.qw.height - this.Nc));
};
function rd (a, c) {
  var d = c.Aa + c.width - a.Nc;
  c.Dv && (a.Y += h.g.u.T ('H', d));
  a.Vb &&
    ((a.Y += h.g.u.T ('H', d)), c.height > a.Nc &&
      (a.Y += h.g.u.T ('V', c.Mb + c.height - a.Nc)));
}
h.X.Sf = function (a, c) {
  h.X.Sf.v.constructor.call (this, a, c);
  this.Zf && ((this.width += this.s.Ub), (this.height += this.s.Ub));
};
h.g.object.S (h.X.Sf, h.i.Sf);
h.X.Vf = function (a, c) {
  h.X.Vf.v.constructor.call (this, a, c);
  this.Zf && (this.height += this.s.Ub);
};
h.g.object.S (h.X.Vf, h.i.Vf);
h.X.Qd = function (a, c) {
  h.X.Qd.v.constructor.call (this, a, c);
};
h.g.object.S (h.X.Qd, h.i.Qd);
b = h.X.Qd.prototype;
b.Er = function () {
  h.X.Qd.v.Er.call (this);
  (this.ya.N.length && this.ya.N[this.ya.N.length - 1].type == h.Ka) ||
    (this.jb.minHeight = this.s.od - this.s.Ub);
};
b.Hu = function (a, c) {
  this.hj && a.type == h.Ya
    ? (c.elements.push (new h.X.Sf (this.s, a)), (c.xq = !0))
    : a.type == h.Ka
        ? (c.elements.push (new h.X.Vf (this.s, a)), (c.Eb = !0))
        : a.type == h.Ya
            ? (c.elements.push (new h.i.dm (this.s, a)), (c.hg = !0))
            : a.type == h.cf &&
                ((c.minHeight = Math.max (
                  c.minHeight,
                  this.s.Ws
                )), (c.Zi = !0));
  this.hj || null != c.align || (c.align = a.align);
};
b.Gu = function () {
  for (var a = !1, c = 0, d; (d = this.rows[c]); c++)
    d.hg && (a = !0);
  for (c = 0; (d = this.rows[c]); c++) {
    var e = d.elements;
    d.elements = [];
    d.Un () && d.elements.push (new h.i.df (this.s, this.nh (null, e[0])));
    if (e.length) {
      for (var f = 0; f < e.length - 1; f++) {
        d.elements.push (e[f]);
        var g = this.nh (e[f], e[f + 1]);
        d.elements.push (new h.i.df (this.s, g));
      }
      d.elements.push (e[e.length - 1]);
      d.Ck () &&
        ((g = this.nh (e[e.length - 1], null)), a &&
          d.Zi &&
          (g += this.s.ym), d.elements.push (new h.i.df (this.s, g)));
    }
  }
};
b.nh = function (a, c) {
  if (!a)
    return c && h.i.m.Af (c) && c.Ad
      ? this.s.od
      : c && h.i.m.mg (c)
          ? this.s.yt
          : c && h.i.m.Ah (c) ? this.s.iu : this.s.vc;
  if (!h.i.m.ng (a) && (!c || h.i.m.Ah (c)))
    return h.i.m.Af (a) && a.Ad
      ? this.s.od
      : h.i.m.gj (a)
          ? 2 * this.s.vc + 1
          : h.i.m.zh (a)
              ? this.s.ve
              : h.i.m.pC (a)
                  ? this.s.vc
                  : h.i.m.pg (a)
                      ? this.s.xz
                      : h.i.m.nw (a) ? this.s.ve : this.s.vc;
  if (h.i.m.ng (a) && !c) {
    if (h.i.m.Sk (a)) return this.s.ve;
    if (h.i.m.mg (a)) return this.s.vc;
    if (h.i.m.Ah (a)) return this.s.ve;
  }
  if (!h.i.m.ng (a) && c && h.i.m.ng (c)) {
    if (h.i.m.Af (a) && a.Ad) {
      if (h.i.m.mg (c) || h.i.m.Sk (c)) return this.s.Kz;
    } else {
      if (h.i.m.mg (c) || h.i.m.Sk (c)) return this.s.yt;
      if (h.i.m.Ah (c)) return this.s.vc;
    }
    return this.s.vc - 1;
  }
  if (h.i.m.gj (a) && c && !h.i.m.ng (c)) return this.s.vc;
  if (h.i.m.mg (a) && c && h.i.m.Af (c)) return c.Ad ? this.s.od : this.s.vc;
  if (h.i.m.Uk (a) && c) {
    if (h.i.m.zh (c)) return this.s.ve;
    if (h.i.m.jj (c)) return c.Fd;
    if (h.i.m.qg (c)) return (a = (this.G ? 1 : -1) * this.s.Ub / 2), c.Fd + a;
  }
  if (h.i.m.pg (a) && c) {
    if (h.i.m.jj (c)) return c.Fd - this.s.fb;
    if (h.i.m.qg (c))
      return (a = (this.G ? 1 : -1) * this.s.Ub / 2), c.Fd - this.s.fb + a;
  }
  return (h.i.m.Af (a) && c && h.i.m.Af (c) && a.Ad == c.Ad) ||
    (c && h.i.m.nw (c))
    ? this.s.vc
    : this.s.od;
};
b.Sv = function (a, c) {
  return h.i.m.vn (a) && h.i.m.nn (c)
    ? this.s.Hy
    : h.i.m.vn (a) || h.i.m.nn (c)
        ? this.s.ve
        : a.hg && c.hg
            ? this.s.vc
            : !a.Eb && c.Eb
                ? this.s.ey
                : (a.Eb && c.Eb) || (!a.Eb && c.Zi) || a.Zi
                    ? this.s.vc
                    : this.s.od;
};
b.Kv = function (a, c) {
  if (h.i.m.Bd (c)) return a.Mb + c.height / 2;
  if (h.i.m.nn (a))
    return (a = a.Mb + a.height - a.zk), h.i.m.qg (c)
      ? a + c.height / 2
      : a - c.height / 2;
  if (h.i.m.vn (a))
    return h.i.m.zh (c) ? a.mf - c.height / 2 : a.mf + c.height / 2;
  var d = a.Mb;
  h.i.m.Af (c) || h.i.m.gj (c)
    ? ((d += c.height / 2), (a.xq || a.Eb) &&
        c.height + this.s.lu <= a.height &&
        (d += this.s.lu))
    : (d = h.i.m.mg (c) ? d + c.height / 2 : d + a.height / 2);
  return d;
};
b.gp = function () {
  if (this.hj) {
    for (
      var a = 0, c = null, d = this.rows.length - 1, e;
      (e = this.rows[d]);
      d--
    )
      (e.ir = a), h.i.m.kC (e) &&
        (e.Eb && kd (this, e), c && c.Eb && e.width < c.width
          ? (e.ir = c.width)
          : (a = e.width), (c = e));
    for (d = a = 0; (e = this.rows[d]); d++)
      e.Eb
        ? (a = this.Ik (e))
        : h.i.m.Bd (e)
            ? (e.width = Math.max (a, e.ir))
            : ((a = Math.max (a, e.ir) - e.width), 0 < a && ld (e, a), (a =
                e.width));
  } else h.X.Qd.v.gp.call (this);
};
b.Ik = function (a) {
  return this.hj && a.Eb
    ? this.Gg + this.s.rz + this.Kd
    : h.X.Qd.v.Ik.call (this, a);
};
b.yv = function () {
  for (var a = 0, c = 0, d = 0, e; (e = this.rows[d]); d++) {
    e.Mb = c;
    e.Aa = this.Kd;
    c += e.height;
    a = Math.max (a, e.oe);
    var f = c - this.zb.Di;
    e == this.jb &&
      f < this.s.Tj &&
      ((f = this.s.Tj - f), (this.jb.height += f), (c += f));
    md (this, e);
  }
  this.K &&
    this.ya.U &&
    this.ya.U.isConnected () &&
    (a = Math.max (a, z (this.ya.U.la ()).width - this.s.Ub));
  this.jb.Td = c - this.jb.zk;
  this.Gj = a + this.Kd + this.s.Ub;
  this.width += this.s.Ub;
  this.height = c + this.s.Ub;
  this.Tn = this.zb.mf;
};
h.X.uc = function (a, c) {
  h.X.uc.v.constructor.call (this, a, c);
  this.Ne = new h.X.ht (c);
};
h.g.object.S (h.X.uc, h.i.uc);
b = h.X.uc.prototype;
b.draw = function () {
  nd (this);
  od (this);
  pd (this);
  var a = this.ya.vb;
  a.Wr (this.Ga + '\n' + this.mn);
  var c = this.Ne;
  a.Uh.setAttribute ('d', c.Y + '\n' + c.Pk);
  this.ba.G && a.gq ();
  h.i.Ll && this.ya.Mr.kB (this.ya, this.ba);
  qd (this);
};
b.Yp = function () {
  var a = this.Ne, c = this.ba.zb;
  a.Y += h.g.u.moveBy (c.Aa, a.ba.Tn);
  for (var d = 0, e; (e = c.elements[d]); d++)
    h.i.m.Uk (e)
      ? (a.Y += a.cd.fu)
      : h.i.m.pg (e)
          ? (a.Y += a.xr.ps (a.Vb))
          : h.i.m.jj (e)
              ? (a.Y += a.NC.Ag)
              : h.i.m.zh (e)
                  ? (a.Y += a.yD.path (a.Vb))
                  : h.i.m.Bd (e) &&
                      0 != e.width &&
                      (a.Y += h.g.u.T ('H', e.Aa + e.width - a.Nc));
  a.Y += h.g.u.T ('H', c.Aa + c.width - a.Nc);
  rd (this.Ne, this.ba.zb);
  h.X.uc.v.Yp.call (this);
};
b.Bk = function (a) {
  this.Ne.Bk (a);
  h.X.uc.v.Bk.call (this, a);
};
b.Zp = function (a) {
  var c = this.Ne, d = N (a);
  if (c.Vb) {
    var e = a.height - d.Ki;
    c.Y +=
      h.g.u.moveTo (d.Aa + d.width - c.Nc, a.Mb) +
      c.jl.Hd (c.Vb) +
      h.g.u.T ('v', e);
  } else c.Y += h.g.u.moveTo (d.Aa + d.width, a.Mb) + c.jl.Hd (c.Vb);
  h.X.uc.v.Zp.call (this, a);
};
b.Xp = function (a) {
  var c = this.Ne, d = N (a);
  if (c.Vb) {
    var e = a.height - 2 * c.ej.height;
    c.Y +=
      h.g.u.moveTo (d.Aa, a.Mb) +
      c.ej.Ar (c.Vb) +
      h.g.u.T ('v', e) +
      c.ej.Pn (c.Vb) +
      h.g.u.lineTo (a.width - d.Aa - c.ej.width, 0);
  } else
    c.Y +=
      h.g.u.moveTo (d.Aa, a.Mb + a.height) +
      c.ej.Pn (c.Vb) +
      h.g.u.lineTo (a.width - d.Aa - c.ej.width, 0);
  h.X.uc.v.Xp.call (this, a);
};
b.vv = function (a) {
  rd (this.Ne, a);
  this.Ga += h.g.u.T ('H', a.Aa + a.width) + h.g.u.T ('V', a.Mb + a.height);
};
b.Up = function () {
  var a = this.Ne, c = this.ba.jb;
  if (a.Vb) a.Y += h.g.u.T ('V', c.Td - a.Nc);
  else {
    var d = a.ba.jb.elements[0];
    h.i.m.Uk (d)
      ? (a.Y += h.g.u.moveTo (c.Aa + a.Nc, c.Td - a.Nc))
      : h.i.m.pg (d) &&
          ((a.Y += h.g.u.moveTo (c.Aa, c.Td)), (a.Y += a.xr.qp ()));
  }
  h.X.uc.v.Up.call (this);
};
b.Wp = function () {
  var a = this.Ne, c = a.ba.K;
  c &&
    ((c = c.$c + c.height), a.Vb
      ? (a.Y += h.g.u.moveTo (a.ba.Kd, c))
      : ((a.Y += h.g.u.moveTo (
          a.ba.Kd + a.Nc,
          a.ba.jb.Td - a.Nc
        )), (a.Y += h.g.u.T ('V', c))), (a.Y += a.jl.dl (a.Vb)));
  a.Vb ||
    ((c = a.ba.zb), (a.Y = h.i.m.pg (c.elements[0])
      ? a.Y + h.g.u.T ('V', a.xr.height)
      : a.Y + h.g.u.T ('V', c.mf + a.Nc)));
  h.X.uc.v.Wp.call (this);
};
b.Vp = function (a) {
  var c = this.Ne,
    d = c.Nc,
    e = a.Aa + a.He,
    f = a.Hi - a.height / 2,
    g = a.width - a.He,
    k = f + d;
  if (c.Vb) {
    f = a.$c - d;
    var l = a.height - (a.$c + a.Ki) + d;
    c.Pk +=
      h.g.u.moveTo (e - d, k) +
      h.g.u.T ('v', f) +
      c.jl.Hd (c.Vb) +
      h.g.u.T ('v', l) +
      h.g.u.T ('h', g);
  } else
    c.Pk +=
      h.g.u.moveTo (a.Aa + a.width + d, k) +
      h.g.u.T ('v', a.height) +
      h.g.u.T ('h', -g) +
      h.g.u.moveTo (e, f + a.$c) +
      c.jl.Hd (c.Vb);
  h.X.uc.v.Vp.call (this, a);
};
b.Uw = function (a) {
  var c = a.Hi - a.height / 2;
  if (a.zc) {
    var d = a.Aa + a.He + this.s.Ub;
    this.ba.G && (d *= -1);
    J (a.zc, d, c + a.$c + this.s.Ub);
  }
};
b.Ww = function (a) {
  var c = N (a);
  if (c.zc) {
    var d = a.Aa + a.Gg + c.Fd;
    d = this.ba.G ? -1 * d : d + this.s.Ub;
    J (c.zc, d, a.Mb + this.s.Ub);
  }
};
b.Tw = function (a) {
  var c = N (a);
  if (c.zc) {
    var d = a.Aa + a.width + this.s.Ub;
    this.ba.G && (d *= -1);
    J (c.zc, d, a.Mb);
  }
};
b.Vw = function () {
  var a = this.ba.jb;
  if (a.connection) {
    var c = a.connection, d = c.Aa;
    J (c.zc, (this.ba.G ? -d : d) + this.s.Ub / 2, a.Td + this.s.Ub);
  }
};
h.X.gt = function (a) {
  this.Li = a;
  this.OFFSET = 0.5;
  this.fu = h.g.u.moveBy (this.OFFSET, this.OFFSET);
};
b = h.X.gt.prototype;
b.va = function () {
  this.fz = sd (this);
  this.Fz = td (this);
  this.Qo = this.Uq ();
  this.oi = this.Tq ();
  this.mi = this.Sq ();
  this.wi = this.Vq ();
};
function sd (a) {
  var c = a.Li.fb;
  a = a.OFFSET;
  var d = (1 - Math.SQRT1_2) * (c + a) - a,
    e =
      h.g.u.moveBy (d, d) +
      h.g.u.arc ('a', '0 0,0', c, h.g.u.za (-d - a, c - d)),
    f = h.g.u.arc ('a', '0 0,0', c + a, h.g.u.za (c + a, c + a)),
    g =
      h.g.u.moveBy (d, -d) +
      h.g.u.arc ('a', '0 0,0', c + a, h.g.u.za (c - d, d + a));
  return {
    width: c + a,
    height: c,
    Ar: function (k) {
      return k ? e : '';
    },
    Pn: function (k) {
      return k ? f : g;
    },
  };
}
function td (a) {
  var c = a.Li.fb;
  a = a.OFFSET;
  var d = (1 - Math.SQRT1_2) * (c - a) + a,
    e =
      h.g.u.moveBy (d, d) +
      h.g.u.arc ('a', '0 0,1', c - a, h.g.u.za (c - d, -d + a)),
    f =
      h.g.u.moveBy (a, c) +
      h.g.u.arc ('a', '0 0,1', c - a, h.g.u.za (c, -c + a)),
    g = -d,
    k =
      h.g.u.moveBy (d, g) +
      h.g.u.arc ('a', '0 0,1', c - a, h.g.u.za (-d + a, -g - c));
  return {
    height: c,
    ps: function (l) {
      return l ? e : f;
    },
    qp: function () {
      return k;
    },
  };
}
b.Uq = function () {
  var a = this.Li.ym,
    c = this.Li.ak,
    d = h.g.u.moveBy (-2, -c + 3.4) + h.g.u.lineTo (-0.45 * a, -2.1),
    e =
      h.g.u.T ('v', 2.5) +
      h.g.u.moveBy (0.97 * -a, 2.5) +
      h.g.u.curve ('q', [h.g.u.za (0.05 * -a, 10), h.g.u.za (0.3 * a, 9.5)]) +
      h.g.u.moveBy (0.67 * a, -1.9) +
      h.g.u.T ('v', 2.5),
    f =
      h.g.u.T ('v', -1.5) +
      h.g.u.moveBy (-0.92 * a, -0.5) +
      h.g.u.curve ('q', [h.g.u.za (-0.19 * a, -5.5), h.g.u.za (0, -11)]) +
      h.g.u.moveBy (0.92 * a, 1),
    g = h.g.u.moveBy (-5, c - 0.7) + h.g.u.lineTo (0.46 * a, -2.1);
  return {
    width: a,
    height: c,
    dl: function (k) {
      return k ? d : f;
    },
    Hd: function (k) {
      return k ? e : g;
    },
  };
};
b.Tq = function () {
  return {Ag: h.g.u.T ('h', this.OFFSET) + this.Li.oi.Ag};
};
b.Sq = function () {
  return {
    Ag: h.g.u.lineTo (5.1, 2.6) +
      h.g.u.moveBy (-10.2, 6.8) +
      h.g.u.lineTo (5.1, 2.6),
    height: 12,
    width: 10.2,
  };
};
b.Vq = function () {
  var a = this.Li.wi.height,
    c =
      h.g.u.moveBy (25, -8.7) +
      h.g.u.curve ('c', [
        h.g.u.za (29.7, -6.2),
        h.g.u.za (57.2, -0.5),
        h.g.u.za (75, 8.7),
      ]),
    d =
      h.g.u.curve ('c', [
        h.g.u.za (17.8, -9.2),
        h.g.u.za (45.3, -14.9),
        h.g.u.za (75, -8.7),
      ]) + h.g.u.moveTo (100.5, a + 0.5);
  return {
    path: function (e) {
      return e ? c : d;
    },
  };
};
h.X.ff = function (a, c, d) {
  this.Mi = d;
  this.We = a;
  this.Dl = h.g.j.H (
    'path',
    {class: 'blocklyPathDark', transform: 'translate(1,1)'},
    this.We
  );
  this.Gb = h.g.j.H ('path', {class: 'blocklyPath'}, this.We);
  this.Uh = h.g.j.H ('path', {class: 'blocklyPathLight'}, this.We);
  this.zp = '#000000';
  this.style = c;
};
h.g.object.S (h.X.ff, h.i.ff);
b = h.X.ff.prototype;
b.Wr = function (a) {
  this.Gb.setAttribute ('d', a);
  this.Dl.setAttribute ('d', a);
};
b.gq = function () {
  this.Gb.setAttribute ('transform', 'scale(-1 1)');
  this.Uh.setAttribute ('transform', 'scale(-1 1)');
  this.Dl.setAttribute ('transform', 'translate(1,1) scale(-1 1)');
};
b.lc = function (a) {
  this.Uh.style.display = '';
  this.Dl.style.display = '';
  this.Uh.setAttribute ('stroke', this.style.Ji);
  this.Dl.setAttribute ('fill', this.zp);
  h.X.ff.v.lc.call (this, a);
  this.Gb.setAttribute ('stroke', 'none');
};
b.Th = function (a) {
  this.style = a;
  this.zp = h.g.kb.np ('#000', this.style.ah, 0.2) || this.zp;
};
b.zx = function (a) {
  a
    ? (this.Gb.setAttribute (
        'filter',
        'url(#' + this.Mi.Wm + ')'
      ), (this.Uh.style.display = 'none'))
    : (this.Gb.setAttribute ('filter', 'none'), (this.Uh.style.display =
        'inline'));
};
b.Bx = function (a) {
  a &&
    ((this.Uh.style.display = 'none'), this.Dl.setAttribute (
      'fill',
      this.style.Jm
    ), this.Gb.setAttribute ('stroke', 'none'), this.Gb.setAttribute (
      'fill',
      this.style.Jm
    ));
};
b.ts = function (a) {
  h.X.ff.v.ts.call (this, a);
  a && this.Gb.setAttribute ('stroke', 'none');
};
h.X.gf = function (a) {
  h.X.gf.v.constructor.call (this, a);
  this.cd = null;
};
h.g.object.S (h.X.gf, h.i.gf);
b = h.X.gf.prototype;
b.va = function (a, c) {
  h.X.gf.v.va.call (this, a, c);
  this.cd = new h.X.gt (this.W ());
  this.cd.va ();
};
b.Ir = function (a, c) {
  h.X.gf.v.Ir.call (this, a, c);
  this.cd.va ();
};
b.Rq = function () {
  return new h.X.bf ();
};
b.xw = function (a) {
  return new h.X.Qd (this, a);
};
b.vw = function (a, c) {
  return new h.X.uc (a, c);
};
b.ww = function (a, c) {
  return new h.X.ff (a, c, this.W ());
};
h.i.register ('geras', h.X.gf);
h.J.ADD_COMMENT = 'Add Comment';
h.J.CANNOT_DELETE_VARIABLE_PROCEDURE =
  "Can't delete the variable '%1' because it's part of the definition of the function '%2'";
h.J.CLEAN_UP = 'Clean up Blocks';
h.J.COLLAPSED_WARNINGS_WARNING = 'Collapsed blocks contain warnings.';
h.J.COLLAPSE_ALL = 'Collapse Blocks';
h.J.COLLAPSE_BLOCK = 'Collapse Block';
h.J.DELETE_ALL_BLOCKS = 'Delete all %1 blocks?';
h.J.DELETE_BLOCK = 'Delete Block';
h.J.DELETE_VARIABLE_CONFIRMATION = "Delete %1 uses of the '%2' variable?";
h.J.DELETE_X_BLOCKS = 'Delete %1 Blocks';
h.J.DISABLE_BLOCK = 'Disable Block';
h.J.DUPLICATE_BLOCK = 'Duplicate';
h.J.DUPLICATE_COMMENT = 'Duplicate Comment';
h.J.ENABLE_BLOCK = 'Enable Block';
h.J.EXPAND_ALL = 'Expand Blocks';
h.J.EXPAND_BLOCK = 'Expand Block';
h.J.EXTERNAL_INPUTS = 'External Inputs';
h.J.HELP = 'Help';
h.J.INLINE_INPUTS = 'Inline Inputs';
h.J.NEW_VARIABLE = 'Create variable...';
h.J.NEW_VARIABLE_TITLE = 'New variable name:';
h.J.PROCEDURES_DEFNORETURN_PROCEDURE = 'do something';
h.J.REDO = 'Redo';
h.J.REMOVE_COMMENT = 'Remove Comment';
h.J.RENAME_VARIABLE = 'Rename variable...';
h.J.RENAME_VARIABLE_TITLE = "Rename all '%1' variables to:";
h.J.UNDO = 'Undo';
h.J.UNNAMED_KEY = 'unnamed';
h.J.VARIABLE_ALREADY_EXISTS = "A variable named '%1' already exists.";
h.J.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE =
  "A variable named '%1' already exists for another type: '%2'.";
h.J.WORKSPACE_ARIA_LABEL = 'Blockly Workspace';
h.J.WORKSPACE_COMMENT_DEFAULT_TEXT = 'Say something...';
h.J.PROCEDURES_DEFRETURN_PROCEDURE = h.J.PROCEDURES_DEFNORETURN_PROCEDURE;
var BlocklyStorage = {}, ud = null, vd = null, wd = null;
function xd () {
  var a = ud ();
  yd ('xml=' + encodeURIComponent (a), zd);
}
var Ad = {};
function yd (a, c) {
  Ad['/storage'] && Ad['/storage'].abort ();
  Ad['/storage'] = new XMLHttpRequest ();
  Ad['/storage'].onload = function () {
    200 === this.status
      ? c && c.call (this)
      : Bd (M ('Games_httpRequestError') + '\nXHR status: ' + this.status);
    Ad['/storage'] = null;
  };
  Ad['/storage'].open ('POST', '/storage');
  Ad['/storage'].setRequestHeader (
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  Ad['/storage'].send (a);
}
function zd () {
  window.location.hash = this.responseText.trim ();
  Bd (M ('Games_linkAlert').replace ('%1', window.location.href));
  wd = ud ();
}
function Cd () {
  var a = this.responseText.trim ();
  a.length
    ? vd (a)
    : Bd (M ('Games_hashError').replace ('%1', window.location.hash));
  wd = ud ();
}
function Bd (a) {
  if ('object' === typeof O) {
    var c = document.getElementById ('linkButton');
    O.AD (c, a);
  } else alert (a);
}
var C = null, Dd = '', Ed = '';
function Fd () {
  Xc ();
  var a = document.getElementById ('linkButton');
  a && (Vc ? (a.style.display = 'none') : ((ud = Gd), (vd = Hd), ad (a, xd)));
  (a = document.getElementById ('languageMenu')) &&
    a.addEventListener ('change', Id, !0);
}
function Jd () {
  var a =
    '<xml><block movable="' +
    (1 != L) +
    '" type="maze_moveForward" x="70" y="70"></block></xml>';
  if (!Vc && 1 < window.location.hash.length)
    yd ('key=' + encodeURIComponent (window.location.hash.substring (1)), Cd);
  else {
    var c = null;
    try {
      c = window.sessionStorage.Oq;
    } catch (e) {}
    c && delete window.sessionStorage.Oq;
    var d = Yc (L);
    (a = c || d || a) && Hd (a);
  }
}
function Hd (a) {
  a = h.M.Hg (a);
  C.clear ();
  h.M.ih (a, C);
  a = C;
  a.Yh.length = 0;
  a.ll.length = 0;
  h.h.IA ();
}
function Gd () {
  var a = h.M.Ix (!0);
  if (1 == C.pb (!1).length && a.querySelector) {
    var c = a.querySelector ('block');
    c && (c.removeAttribute ('x'), c.removeAttribute ('y'));
  }
  return h.M.Zd (a);
}
function Kd () {
  'object' == typeof BlocklyStorage &&
    null !== wd &&
    wd != Gd () &&
    ((window.location.hash = ''), (wd = null));
}
function Ld (a) {
  var c = document.getElementById ('toolbox');
  c && (a.toolbox = c);
  a.media = 'third-party/blockly/media/';
  a.oneBasedIndex = !1;
  C = h.kg ('blockly', a);
  E (C, Kd);
}
function Md () {
  window.location = (Vc ? 'index.html' : './') + '?lang=' + K;
}
function Id () {
  window.sessionStorage && (window.sessionStorage.Oq = Gd ());
  var a = document.getElementById ('languageMenu');
  a = encodeURIComponent (a.options[a.selectedIndex].value);
  var c = window.location.search;
  c = 1 >= c.length
    ? '?lang=' + a
    : /[?&]lang=[^&]*/.test (c)
        ? c.replace (/([?&]lang=)[^&]*/, '$1' + a)
        : c.replace (/\?/, '?lang=' + a + '&');
  window.location =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    c;
}
function Nd () {
  10 > L
    ? (window.location =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?lang=' +
        K +
        '&level=' +
        (L + 1))
    : Md ();
}
function Od (a) {
  if (a) {
    var c = a.match (/^block_id_([^']+)$/);
    c && (a = c[1]);
  }
  Kc (a, void 0);
}
function Pd (a) {
  a = a.replace (/(,\s*)?'block_id_[^']+'\)/g, ')');
  return a.replace (/\s+$/, '');
}
function Qd (a) {
  if (
    ('click' == a.type && 'touchend' == Rd && Sd + 2e3 > Date.now ()) ||
    (Rd == a.type && Sd + 400 > Date.now ())
  )
    return a.preventDefault (), a.stopPropagation (), !0;
  Rd = a.type;
  Sd = Date.now ();
  return !1;
}
var Rd = null, Sd = 0;
function Td () {
  setTimeout (function () {
    var a = document.createElement ('script');
    a.type = 'text/javascript';
    a.src = 'third-party/JS-Interpreter/compressed.js';
    document.head.appendChild (a);
  }, 1);
}
function Ud () {
  setTimeout (function () {
    var a = document.createElement ('link');
    a.rel = 'stylesheet';
    a.type = 'text/css';
    a.href = 'common/prettify.css';
    document.head.appendChild (a);
    a = document.createElement ('script');
    a.type = 'text/javascript';
    a.src = 'common/prettify.js';
    document.head.appendChild (a);
  }, 1);
}
var O = {
  wh: !1,
  nv: null,
  Qm: null,
  ul: function (a, c, d, e, f, g) {
    function k () {
      O.wh &&
        ((l.style.visibility =
          'visible'), (l.style.zIndex = 10), (m.style.visibility = 'hidden'));
    }
    if (!a) throw TypeError ('Content not found: ' + a);
    O.wh && O.yd (!1);
    h.ua () && h.$b (!0);
    O.wh = !0;
    O.nv = c;
    O.Qm = g;
    var l = document.getElementById ('dialog');
    g = document.getElementById ('dialogShadow');
    var m = document.getElementById ('dialogBorder'), n;
    for (n in f)
      l.style[n] = f[n];
    e &&
      ((g.style.visibility =
        'visible'), (g.style.opacity = 0.3), (g.style.zIndex = 9), (e = document.createElement (
        'div'
      )), (e.id = 'dialogHeader'), l.appendChild (e), (O.Hp = h.Xb (
        e,
        'mousedown',
        null,
        O.ZA
      )));
    l.appendChild (a);
    a.className = a.className.replace ('dialogHiddenContent', '');
    d && c ? (O.An (c, !1, 0.2), O.An (l, !0, 0.8), setTimeout (k, 175)) : k ();
  },
  ov: 0,
  pv: 0,
  ZA: function (a) {
    O.Kp ();
    if (!h.g.Vk (a)) {
      var c = document.getElementById ('dialog');
      O.ov = c.offsetLeft - a.clientX;
      O.pv = c.offsetTop - a.clientY;
      O.Jp = h.Xb (document, 'mouseup', null, O.Kp);
      O.Ip = h.Xb (document, 'mousemove', null, O.$A);
      a.stopPropagation ();
    }
  },
  $A: function (a) {
    var c = document.getElementById ('dialog'), d = O.ov + a.clientX;
    a = O.pv + a.clientY;
    a = Math.max (a, 0);
    a = Math.min (a, window.innerHeight - c.offsetHeight);
    d = Math.max (d, 0);
    d = Math.min (d, window.innerWidth - c.offsetWidth);
    c.style.left = d + 'px';
    c.style.top = a + 'px';
  },
  Kp: function () {
    O.Jp && (h.Wa (O.Jp), (O.Jp = null));
    O.Ip && (h.Wa (O.Ip), (O.Ip = null));
  },
  yd: function (a) {
    function c () {
      e.style.zIndex = -1;
      e.style.visibility = 'hidden';
      document.getElementById ('dialogBorder').style.visibility = 'hidden';
    }
    if (O.wh) {
      O.Kp ();
      O.Hp && (h.Wa (O.Hp), (O.Hp = null));
      O.wh = !1;
      O.Qm && O.Qm ();
      O.Qm = null;
      var d = !1 === a ? null : O.nv;
      a = document.getElementById ('dialog');
      var e = document.getElementById ('dialogShadow');
      e.style.opacity = 0;
      d && a
        ? (O.An (a, !1, 0.8), O.An (d, !0, 0.2), setTimeout (c, 175))
        : c ();
      a.style.visibility = 'hidden';
      a.style.zIndex = -1;
      for (
        (d = document.getElementById ('dialogHeader')) &&
        d.parentNode.removeChild (d);
        a.firstChild;

      )
        (d = a.firstChild), (d.className +=
          ' dialogHiddenContent'), document.body.appendChild (d);
    }
  },
  An: function (a, c, d) {
    function e () {
      f.style.width = g.width + 'px';
      f.style.height = g.height + 'px';
      f.style.left = g.x + 'px';
      f.style.top = g.y + 'px';
      f.style.opacity = d;
    }
    if (a) {
      var f = document.getElementById ('dialogBorder'), g = O.Gv (a);
      c
        ? ((f.className = 'dialogAnimate'), setTimeout (e, 1))
        : ((f.className = ''), e ());
      f.style.visibility = 'visible';
    }
  },
  Gv: function (a) {
    var c = h.g.style.oh (a);
    c = {x: c.x, y: c.y};
    a.getBBox
      ? ((a = a.getBBox ()), (c.height = a.height), (c.width = a.width))
      : ((c.height = a.offsetHeight), (c.width = a.offsetWidth));
    return c;
  },
  AD: function (a, c) {
    var d = document.getElementById ('containerStorage');
    d.textContent = '';
    c = c.split ('\n');
    for (var e = 0; e < c.length; e++) {
      var f = document.createElement ('p');
      f.appendChild (document.createTextNode (c[e]));
      d.appendChild (f);
    }
    d = document.getElementById ('dialogStorage');
    O.ul (d, a, !0, !0, {width: '50%', left: '25%', top: '5em'}, O.vx);
    O.qx ();
  },
  Eu: function () {
    if (!Yc (L))
      if (O.wh || C.Oc ()) setTimeout (O.Eu, 15e3);
      else {
        var a = document.getElementById ('dialogAbort'),
          c = document.getElementById ('abortCancel');
        c.addEventListener ('click', O.yd, !0);
        c.addEventListener ('touchend', O.yd, !0);
        c = document.getElementById ('abortOk');
        c.addEventListener ('click', Md, !0);
        c.addEventListener ('touchend', Md, !0);
        O.ul (
          a,
          null,
          !1,
          !0,
          {width: '40%', left: '30%', top: '3em'},
          function () {
            document.body.removeEventListener ('keydown', O.Du, !0);
          }
        );
        document.body.addEventListener ('keydown', O.Du, !0);
      }
  },
  NA: function () {
    var a = document.getElementById ('dialogDone');
    if (C) {
      var c = document.getElementById ('dialogLinesText');
      c.textContent = '';
      var d = Ed;
      d = Pd (d);
      var e = d.replace (/\/\/[^\n]*/g, '');
      e = e.replace (/\/\*.*\*\//g, '');
      e = e.replace (/[ \t]+\n/g, '\n');
      e = e.replace (/\n+/g, '\n');
      e = e.trim ();
      e = e.split ('\n').length;
      var f = document.getElementById ('containerCode');
      f.textContent = d;
      'function' == typeof prettyPrintOne &&
        ((d = f.innerHTML), (d = prettyPrintOne (d, 'js')), (f.innerHTML = d));
      d = 1 == e
        ? M ('Games_linesOfCode1')
        : M ('Games_linesOfCode2').replace ('%1', String (e));
      c.appendChild (document.createTextNode (d));
    }
    d = 10 > L
      ? M ('Games_nextLevel').replace ('%1', String (L + 1))
      : M ('Games_finalLevel');
    c = document.getElementById ('doneCancel');
    c.addEventListener ('click', O.yd, !0);
    c.addEventListener ('touchend', O.yd, !0);
    c = document.getElementById ('doneOk');
    c.addEventListener ('click', Nd, !0);
    c.addEventListener ('touchend', Nd, !0);
    O.ul (
      a,
      null,
      !1,
      !0,
      {width: '40%', left: '30%', top: '3em'},
      function () {
        document.body.removeEventListener ('keydown', O.Xu, !0);
      }
    );
    document.body.addEventListener ('keydown', O.Xu, !0);
    document.getElementById ('dialogDoneText').textContent = d;
  },
  mv: function (a) {
    !O.wh ||
      (13 != a.keyCode && 27 != a.keyCode && 32 != a.keyCode) ||
      (O.yd (!0), a.stopPropagation (), a.preventDefault ());
  },
  qx: function () {
    document.body.addEventListener ('keydown', O.mv, !0);
  },
  vx: function () {
    document.body.removeEventListener ('keydown', O.mv, !0);
  },
  Xu: function (a) {
    if (13 == a.keyCode || 27 == a.keyCode || 32 == a.keyCode)
      O.yd (!0), a.stopPropagation (), a.preventDefault (), 27 != a.keyCode &&
        Nd ();
  },
  Du: function (a) {
    if (13 == a.keyCode || 27 == a.keyCode || 32 == a.keyCode)
      O.yd (!0), a.stopPropagation (), a.preventDefault (), 27 != a.keyCode &&
        Md ();
  },
};
window.BlocklyDialogs = O;
O.hideDialog = O.yd;
h.Generator = function (a) {
  this.KC = a;
};
h.Generator.Et = 'generated_function';
b = h.Generator.prototype;
b.kt = null;
b.tm = null;
b.um = null;
b.dz = '  ';
b.qy = 60;
b.rm = [];
function Vd (a, c) {
  return c + a.replace (/(?!\n$)\n/g, '\n' + c);
}
function Wd (a, c) {
  if (!c) return '';
  if (!c.isEnabled ()) return Wd (a, u (c));
  var d = a[c.type];
  if ('function' != typeof d)
    throw Error (
      'Language "' +
        a.KC +
        '" does not know how to generate  code for block type "' +
        c.type +
        '".'
    );
  d = d.call (c, c);
  if (Array.isArray (d)) {
    if (!c.K)
      throw TypeError ('Expecting string from statement block: ' + c.type);
    return [a.Rr (c, d[0], void 0), d[1]];
  }
  if ('string' == typeof d)
    return a.tm && !c.hs && (d = Xd (a.tm, c) + d), a.um &&
      !c.hs &&
      (d += Xd (a.um, c)), a.Rr (c, d, void 0);
  if (null === d) return '';
  throw SyntaxError ('Invalid code generated: ' + d);
}
function Yd (a, c, d) {
  var e = h.D;
  if (isNaN (d))
    throw TypeError ('Expecting valid order from block: ' + a.type);
  var f = hc (a, c);
  if (!f) return '';
  c = Wd (e, f);
  if ('' === c) return '';
  if (!Array.isArray (c))
    throw TypeError ('Expecting tuple from value block: ' + f.type);
  a = c[0];
  c = c[1];
  if (isNaN (c))
    throw TypeError ('Expecting valid order from value block: ' + f.type);
  if (!a) return '';
  f = !1;
  var g = Math.floor (d), k = Math.floor (c);
  if (g <= k && (g != k || (0 != g && 99 != g)))
    for ((f = !0), (g = 0); g < e.rm.length; g++)
      if (e.rm[g][0] == d && e.rm[g][1] == c) {
        f = !1;
        break;
      }
  f && (a = '(' + a + ')');
  return a;
}
function Zd (a, c) {
  var d = h.D;
  a = hc (a, c);
  c = Wd (d, a);
  if ('string' != typeof c)
    throw TypeError ('Expecting code from statement block: ' + (a && a.type));
  c && (c = Vd (c, d.dz));
  return c;
}
function Xd (a, c) {
  c = c.id.replace (/\$/g, '$$$$');
  return a.replace (/%1/g, "'" + c + "'");
}
b.So = '';
function $d (a, c) {
  a.So += c + ',';
}
b.va = function () {};
b.Rr = function (a, c) {
  return c;
};
b.finish = function (a) {
  return a;
};
b.kx = function (a) {
  return a;
};
h.D = new h.Generator ('JavaScript');
$d (
  h.D,
  'break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,enum,implements,interface,let,package,private,protected,public,static,await,null,true,false,arguments,' +
    Object.getOwnPropertyNames (h.g.global).join (',')
);
h.D.CF = 0;
h.D.UF = 1.1;
h.D.qm = 1.2;
h.D.pm = 2;
h.D.RF = 3;
h.D.LF = 3;
h.D.FF = 4.1;
h.D.XF = 4.2;
h.D.Pt = 4.3;
h.D.Lt = 4.4;
h.D.WF = 4.5;
h.D.YF = 4.6;
h.D.MF = 4.7;
h.D.DF = 4.8;
h.D.PF = 5;
h.D.Nt = 5.1;
h.D.NF = 5.2;
h.D.TF = 5.3;
h.D.Ot = 6.1;
h.D.om = 6.2;
h.D.HF = 7;
h.D.VF = 8;
h.D.QF = 8;
h.D.SF = 8;
h.D.OF = 9;
h.D.EF = 10;
h.D.IF = 11;
h.D.GF = 12;
h.D.Kt = 13;
h.D.Mt = 14;
h.D.KF = 15;
h.D.BF = 16;
h.D.ZF = 17;
h.D.JF = 18;
h.D.Dz = 99;
h.D.rm = [
  [h.D.pm, h.D.qm],
  [h.D.pm, h.D.pm],
  [h.D.qm, h.D.qm],
  [h.D.qm, h.D.pm],
  [h.D.Lt, h.D.Lt],
  [h.D.Nt, h.D.Nt],
  [h.D.om, h.D.om],
  [h.D.Kt, h.D.Kt],
  [h.D.Mt, h.D.Mt],
];
h.D.va = function (a) {
  h.D.Pm = Object.create (null);
  h.D.vB = Object.create (null);
  h.D.Nl ? h.D.Nl.reset () : (h.D.Nl = new h.qd (h.D.So));
  h.D.Nl.Yr (a.Ha);
  for (var c = [], d = h.$.lA (a), e = 0; e < d.length; e++)
    c.push (Rc (d[e], h.qd.uo));
  a = h.$.Iu (a);
  for (e = 0; e < a.length; e++)
    c.push (Rc (a[e].ub (), h.Bi));
  c.length && (h.D.Pm.variables = 'var ' + c.join (', ') + ';');
};
h.D.finish = function (a) {
  var c = [], d;
  for (d in h.D.Pm)
    c.push (h.D.Pm[d]);
  delete h.D.Pm;
  delete h.D.vB;
  h.D.Nl.reset ();
  return c.join ('\n\n') + '\n\n\n' + a;
};
h.D.kx = function (a) {
  return a + ';\n';
};
h.D.cD = function (a) {
  a = a.replace (/\\/g, '\\\\').replace (/\n/g, '\\\n').replace (/'/g, "\\'");
  return "'" + a + "'";
};
h.D.yH = function (a) {
  return a.split (/\n/g).map (h.D.cD).join (" + '\\n' +\n");
};
h.D.Rr = function (a, c, d) {
  var e = '';
  if (!a.K || !a.K.na) {
    var f = a.Vd.text;
    f && ((f = h.g.Ja.Jx (f, h.D.qy - 3)), (e += Vd (f + '\n', '// ')));
    for (var g = 0; g < a.N.length; g++)
      if (a.N[g].type == h.Ya) {
        var k = a.N[g].connection.la ();
        if (k) {
          f = [];
          k = p (k, !0);
          for (var l = 0; l < k.length; l++) {
            var m = k[l].Vd.text;
            m && f.push (m);
          }
          f.length && f.push ('');
          (f = f.join ('\n')) && (e += Vd (f, '// '));
        }
      }
  }
  a = a.U && a.U.la ();
  d = d ? '' : Wd (h.D, a);
  return e + c + d;
};
h.D.fH = function (a, c, d, e, f) {
  d = d || 0;
  f = f || h.D.Dz;
  a.B.options.Mn && d--;
  var g = a.B.options.Mn ? '1' : '0';
  a = 0 < d
    ? Yd (a, c, h.D.om) || g
    : 0 > d
        ? Yd (a, c, h.D.Ot) || g
        : e ? Yd (a, c, h.D.Pt) || g : Yd (a, c, f) || g;
  if (h.oC (a)) (a = Number (a) + d), e && (a = -a);
  else {
    if (0 < d) {
      a = a + ' + ' + d;
      var k = h.D.om;
    } else 0 > d && ((a = a + ' - ' + -d), (k = h.D.Ot));
    e && ((a = d ? '-(' + a + ')' : '-' + a), (k = h.D.Pt));
    k = Math.floor (k);
    f = Math.floor (f);
    k && f >= k && (a = '(' + a + ')');
  }
  return a;
};
h.se = function (a, c, d, e, f, g, k) {
  if (!a) throw Error ('Src value of an image field is required');
  a = h.g.Sc (a);
  d = Number (h.g.Sc (d));
  c = Number (h.g.Sc (c));
  if (isNaN (d) || isNaN (c))
    throw Error (
      'Height and width values of an image field must cast to numbers.'
    );
  if (0 >= d || 0 >= c)
    throw Error (
      'Height and width values of an image field must be greater than 0.'
    );
  this.Gk = !1;
  this.Bm = '';
  h.se.v.constructor.call (this, a || '', null, k);
  k || ((this.Gk = !!g), (this.Bm = h.g.Sc (e) || ''));
  this.pc = new h.g.hf (c, d + h.se.cA);
  this.dC = d;
  this.qf = null;
  'function' == typeof f && (this.qf = f);
  this.Ec = null;
};
h.g.object.S (h.se, h.md);
h.se.oa = function (a) {
  return new h.se (a.src, a.width, a.height, void 0, void 0, void 0, a);
};
h.se.cA = 1;
b = h.se.prototype;
b.Lj = !1;
b.lg = !1;
b.lk = function (a) {
  h.se.v.lk.call (this, a);
  this.Gk = !!a.flipRtl;
  this.Bm = h.g.Sc (a.alt) || '';
};
b.ln = function () {
  this.Ec = h.g.j.H (
    'image',
    {height: this.dC + 'px', width: this.pc.width + 'px', alt: this.Bm},
    this.Lc
  );
  this.Ec.setAttributeNS (h.g.j.Xc, 'xlink:href', this.Xe);
  this.qf && (this.Ec.style.cursor = 'pointer');
};
b.Cx = function () {};
b.Tm = function (a) {
  return 'string' != typeof a ? null : a;
};
b.Um = function (a) {
  this.Xe = a;
  this.Ec && this.Ec.setAttributeNS (h.g.j.Xc, 'xlink:href', String (this.Xe));
};
b.Lv = function () {
  return this.Gk;
};
b.vl = function () {
  this.qf && this.qf (this);
};
b.rq = function () {
  return this.Bm;
};
h.ad.register ('field_image', h.se);
var ae = {}, P, be, ce, Q, R, T, ee;
h.hc.maze_moveForward = {
  va: function () {
    gc (this, {
      message0: M ('Maze_moveForward'),
      previousStatement: null,
      nextStatement: null,
      colour: 290,
      tooltip: M ('Maze_moveForwardTooltip'),
    });
  },
};
h.D.maze_moveForward = function (a) {
  return "moveForward('block_id_" + a.id + "');\n";
};
h.hc.maze_turn = {
  va: function () {
    var a = [
      [M ('Maze_turnLeft'), 'turnLeft'],
      [M ('Maze_turnRight'), 'turnRight'],
    ];
    a[0][0] += ' \u21ba';
    a[1][0] += ' \u21bb';
    this.je (290);
    I (fc (this), new h.Pa (a), 'DIR');
    this.Rh (!0);
    this.wj (!0);
    this.ke (M ('Maze_turnTooltip'));
  },
};
h.D.maze_turn = function (a) {
  return Ya (a, 'DIR') + "('block_id_" + a.id + "');\n";
};
h.hc.maze_if = {
  va: function () {
    var a = [
      [M ('Maze_pathAhead'), 'isPathForward'],
      [M ('Maze_pathLeft'), 'isPathLeft'],
      [M ('Maze_pathRight'), 'isPathRight'],
    ];
    a[1][0] += ' \u21ba';
    a[2][0] += ' \u21bb';
    this.je (210);
    I (fc (this), new h.Pa (a), 'DIR');
    I (this.lf (h.Ka, 'DO'), M ('Maze_doCode'));
    this.ke (M ('Maze_ifTooltip'));
    this.Rh (!0);
    this.wj (!0);
  },
};
h.D.maze_if = function (a) {
  var c = Ya (a, 'DIR') + "('block_id_" + a.id + "')";
  a = Zd (a, 'DO');
  return 'if (' + c + ') {\n' + a + '}\n';
};
h.hc.maze_ifElse = {
  va: function () {
    var a = [
      [M ('Maze_pathAhead'), 'isPathForward'],
      [M ('Maze_pathLeft'), 'isPathLeft'],
      [M ('Maze_pathRight'), 'isPathRight'],
    ];
    a[1][0] += ' \u21ba';
    a[2][0] += ' \u21bb';
    this.je (210);
    I (fc (this), new h.Pa (a), 'DIR');
    I (this.lf (h.Ka, 'DO'), M ('Maze_doCode'));
    I (this.lf (h.Ka, 'ELSE'), M ('Maze_elseCode'));
    this.ke (M ('Maze_ifelseTooltip'));
    this.Rh (!0);
    this.wj (!0);
  },
};
h.D.maze_ifElse = function (a) {
  var c = Ya (a, 'DIR') + "('block_id_" + a.id + "')", d = Zd (a, 'DO');
  a = Zd (a, 'ELSE');
  return 'if (' + c + ') {\n' + d + '} else {\n' + a + '}\n';
};
h.hc.maze_forever = {
  va: function () {
    this.je (120);
    I (I (fc (this), M ('Maze_repeatUntil')), new h.se (U.zn, 12, 16));
    I (this.lf (h.Ka, 'DO'), M ('Maze_doCode'));
    this.Rh (!0);
    this.ke (M ('Maze_whileTooltip'));
  },
};
h.D.maze_forever = function (a) {
  var c = Zd (a, 'DO');
  h.D.kt && (c = h.D.kt.replace (/%1/g, "'block_id_" + a.id + "'") + c);
  return 'while (notDone()) {\n' + c + '}\n';
};
var fe = fe || {};
function ge (a, c) {
  function d () {}
  d.prototype = c.prototype;
  a.v = c.prototype;
  a.prototype = new d ();
  a.prototype.constructor = a;
  a.PG = function (e, f, g) {
    return c.prototype[f].apply (e, Array.prototype.slice.call (arguments, 2));
  };
}
if (!he) {
  var he, ie = '';
  'undefined' !== typeof navigator &&
    navigator &&
    'string' == typeof navigator.userAgent &&
    (ie = navigator.userAgent);
  var je = 0 == ie.indexOf ('Opera');
  he = {
    wH: {ME: 'ScriptEngine' in window},
    AF: je,
    te: !je && -1 != ie.indexOf ('MSIE'),
    wu: !je && -1 != ie.indexOf ('WebKit'),
  };
}
if (!ke) var ke = {};
if (!le) var le = {};
if (!me) var me = {};
if (!ne) var ne = {};
if (!oe) var oe = {};
if (!pe) var pe = {};
var qe = fe.zy ? {JH: !0} : {}, re = fe.zy ? {KH: !0} : {};
function se () {
  throw Error ('Do not instantiate directly');
}
se.prototype.av = null;
se.prototype.toString = function () {
  return this.content;
};
function te (a) {
  if (null != a)
    switch (a.av) {
      case 1:
        return 1;
      case -1:
        return -1;
      case 0:
        return 0;
    }
  return null;
}
function ue () {
  se.call (this);
}
ge (ue, se);
ue.prototype.bv = qe;
function V (a) {
  return null != a && a.bv === qe
    ? a
    : ve (String (String (a)).replace (we, xe), te (a));
}
var ve = (function (a) {
  function c () {}
  c.prototype = a.prototype;
  return function (d, e) {
    var f = new c ();
    f.content = String (d);
    void 0 !== e && (f.av = e);
    return f;
  };
}) (ue),
  ye = {
    '\x00': '&#0;',
    '"': '&quot;',
    '&': '&amp;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;',
    '\t': '&#9;',
    '\n': '&#10;',
    '\x0B': '&#11;',
    '\f': '&#12;',
    '\r': '&#13;',
    ' ': '&#32;',
    '-': '&#45;',
    '/': '&#47;',
    '=': '&#61;',
    '`': '&#96;',
    '\u0085': '&#133;',
    '\u00a0': '&#160;',
    '\u2028': '&#8232;',
    '\u2029': '&#8233;',
  };
function xe (a) {
  return ye[a];
}
var we = /[\x00\x22\x26\x27\x3c\x3e]/g;
function ze () {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyDialogs.hideDialog(true)">OK</button></div>';
}
function Ae () {
  var a = 'skin=' + V (Be),
    c =
      '<table width="100%"><tr><td><h1><span id="title">' +
      ((Vc
        ? '<a href="index.html?lang=' + V (K) + '">'
        : '<a href="./?lang=' + V (K) + '">') +
        'Blockly Games</a> : ' +
        V ('Maze') +
        '</span>');
  if (L) {
    a = '' + (a ? V (a) : '');
    for (var d = ' &nbsp; ', e = 1; 11 > e; e++) {
      var f = '?lang=' + V (K) + '&level=' + V (e) + (a ? '&' + V (a) : '');
      d +=
        ' ' +
        (e == L
          ? '<span class="level_number level_done" id="level' +
              V (e) +
              '">' +
              V (e) +
              '</span>'
          : 10 == e
              ? '<a class="level_number" id="level' +
                  V (e) +
                  '" href="' +
                  V (f) +
                  '">' +
                  V (e) +
                  '</a>'
              : '<a class="level_dot" id="level' +
                  V (e) +
                  '" href="' +
                  V (f) +
                  '"></a>');
    }
    a = d;
  } else a = '';
  return (
    '<div style="display: none"><span id="Games_name">Blockly Games</span><span id="Games_puzzle">Puzzle</span><span id="Games_maze">Maze</span><span id="Games_bird">Bird</span><span id="Games_turtle">Turtle</span><span id="Games_movie">Movie</span><span id="Games_music">Music</span><span id="Games_pondTutor">Pond Tutor</span><span id="Games_pond">Pond</span><span id="Games_genetics">Genetics</span><span id="Games_linesOfCode1">You solved this level with 1 line of JavaScript:</span><span id="Games_linesOfCode2">You solved this level with %1 lines of JavaScript:</span><span id="Games_nextLevel">Are you ready for level %1?</span><span id="Games_finalLevel">Are you ready for the next challenge?</span><span id="Games_submitTitle">Title:</span><span id="Games_linkTooltip">Save and link to blocks.</span><span id="Games_runTooltip">Run the program you wrote.</span><span id="Games_runProgram">Run Program</span><span id="Games_resetTooltip">Stop the program and reset the level.</span><span id="Games_resetProgram">Reset</span><span id="Games_help">Help</span><span id="Games_dialogOk">OK</span><span id="Games_dialogCancel">Cancel</span><span id="Games_catLogic">Logic</span><span id="Games_catLoops">Loops</span><span id="Games_catMath">Math</span><span id="Games_catText">Text</span><span id="Games_catLists">Lists</span><span id="Games_catColour">Colour</span><span id="Games_catVariables">Variables</span><span id="Games_catProcedures">Functions</span><span id="Games_httpRequestError">There was a problem with the request.</span><span id="Games_linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="Games_hashError">Sorry, \'%1\' doesn\'t correspond with any saved program.</span><span id="Games_xmlError">Could not load your saved file. Perhaps it was created with a different version of Blockly?</span><span id="Games_submitted">Thank you for this program!  If our staff of trained monkeys like it, they will publish it to the gallery within a couple of days.</span><span id="Games_listVariable">list</span><span id="Games_textVariable">text</span><span id="Games_breakLink">Once you start editing JavaScript, you can\'t go back to editing blocks. Is this OK?</span><span id="Games_blocks">Blocks</div></div><div style="display: none"><span id="Maze_moveForward">move forward</span><span id="Maze_turnLeft">turn left</span><span id="Maze_turnRight">turn right</span><span id="Maze_doCode">do</span><span id="Maze_elseCode">else</span><span id="Maze_helpIfElse">If-else blocks will do one thing or the other.</span><span id="Maze_pathAhead">if path ahead</span><span id="Maze_pathLeft">if path to the left</span><span id="Maze_pathRight">if path to the right</span><span id="Maze_repeatUntil">repeat until</span><span id="Maze_moveForwardTooltip">Moves the player forward one space.</span><span id="Maze_turnTooltip">Turns the player left or right by 90 degrees.</span><span id="Maze_ifTooltip">If there is a path in the specified direction, then do some actions.</span><span id="Maze_ifelseTooltip">If there is a path in the specified direction, then do the first block of actions. Otherwise, do the second block of actions.</span><span id="Maze_whileTooltip">Repeat the enclosed actions until finish point is reached.</span><span id="Maze_capacity0">You have %0 blocks left.</span><span id="Maze_capacity1">You have %1 block left.</span><span id="Maze_capacity2">You have %2 blocks left.</span></div>' +
    (c +
      a +
      '</h1></td><td id="header_cta" class="farSide"><select id="languageMenu"></select>&nbsp;<button id="linkButton" title="Save and link to blocks."><img src="common/1x1.gif" class="link icon21"></button>&nbsp;' +
      ('<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button>'
        .bv === re
        ? 'zSoyz'
        : '<button id="pegmanButton"><img src="common/1x1.gif"><span id="pegmanButtonArrow"></span></button>') +
      '</td></tr></table><div id="visualization"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgMaze" width="400px" height="400px"><g id="look"><path d="M 0,-15 a 15 15 0 0 1 15 15" /><path d="M 0,-35 a 35 35 0 0 1 35 35" /><path d="M 0,-55 a 55 55 0 0 1 55 55" /></g></svg><div id="capacityBubble"><div id="capacity"></div></div></div><table width="400"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><td><button id="runButton" class="primary" title="Makes the player do what the blocks say."><img src="common/1x1.gif" class="run icon21"> Run Program</button><button id="resetButton" class="primary" style="display: none" title="Put the player back at the start of the maze."><img src="common/1x1.gif" class="stop icon21"> Reset</button></td></tr></table><xml id="toolbox" xmlns="https://developers.google.com/blockly/xml"><block type="maze_moveForward"></block><block type="maze_turn"><field name="DIR">turnLeft</field></block><block type="maze_turn"><field name="DIR">turnRight</field></block>') +
    ((2 < L
      ? '<block type="maze_forever"></block>' +
          (6 == L
            ? '<block type="maze_if"><field name="DIR">isPathLeft</field></block>'
            : 6 < L
                ? '<block type="maze_if"></block>' +
                    (8 < L ? '<block type="maze_ifElse"></block>' : '')
                : '')
      : '') +
      '</xml><div id="blockly"></div><div id="pegmanMenu"></div><div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div><div id="dialogDone" class="dialogHiddenContent"><div style="font-size: large; margin: 1em;">Congratulations!</div><div id="dialogLinesText" style="font-size: large; margin: 1em;"></div><pre id="containerCode"></pre><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"><button id="doneCancel">Cancel</button><button id="doneOk" class="secondary">OK</button></div></div><div id="dialogAbort" class="dialogHiddenContent">This level is extremely difficult. Would you like to skip it and go onto the next game? You can always come back later.<div class="farSide" style="padding: 1ex 3ex 0"><button id="abortCancel">Cancel</button><button id="abortOk" class="secondary">OK</button></div></div><div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>') +
    (ze () + '</div>') +
    (1 == L
      ? '<div id="dialogHelpStack" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Stack a couple of \'move forward\' blocks together to help me reach the goal.</td><td valign="top"><img src="maze/help_stack.png" class="mirrorImg" height=63 width=136></td></tr></table></div><div id="dialogHelpOneTopBlock" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>On this level, you need to stack together all of the blocks in the white workspace.<div id="sampleOneTopBlock" class="readonly"></div></td></tr></table></div><div id="dialogHelpRun" class="dialogHiddenContent"><table><tr><td>Run your program to see what happens.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>'
      : 2 == L
          ? '<div id="dialogHelpReset" class="dialogHiddenContent"><table><tr><td>Your program didn\'t solve the maze. Press \'Reset\' and try again.</td><td rowspan=2><img src="common/help.png"></td></tr><tr><td><div><img src="maze/help_run.png" class="mirrorImg" height=27 width=141></div></td></tr></table></div>'
          : 3 == L || 4 == L
              ? (3 == L
                  ? '<div id="dialogHelpRepeat" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>Reach the end of this path using only two blocks. Use \'repeat\' to run a block more than once.</td><td><img src="common/help.png"></td></tr></table></div>'
                  : '') +
                  '<div id="dialogHelpCapacity" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>You have used up all the blocks for this level. To create a new block, you first need to delete an existing block.</td></tr></table></div><div id="dialogHelpRepeatMany" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>You can fit more than one block inside a \'repeat\' block.</td><td><img src="common/help.png"></td></tr></table></div>'
              : 5 == L
                  ? '<div id="dialogHelpSkins" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td width="95%">Choose your favourite player from this menu.</td><td><img src="maze/help_up.png"></td></tr></table></div>'
                  : 6 == L
                      ? '<div id="dialogHelpIf" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td>An \'if\' block will do something only if the condition is true. Try turning left if there is a path to the left.</td><td><img src="common/help.png"></td></tr></table></div>'
                      : 7 == L
                          ? '<div id="dialogHelpMenu" class="dialogHiddenContent"><table><tr><td><img src="maze/help_up.png"></td><td id="helpMenuText">Click on %1 in the \'if\' block to change its condition.</td><td><img src="common/help.png"></td></tr></table></div>'
                          : 9 == L
                              ? '<div id="dialogHelpIfElse" class="dialogHiddenContent"><table><tr><td><img src="maze/help_down.png"></td><td>If-else blocks will do one thing or the other.</td><td><img src="common/help.png"></td></tr></table></div>'
                              : 10 == L
                                  ? '<div id="dialogHelpWallFollow" class="dialogHiddenContent"><table><tr><td><img src="common/help.png"></td><td>&nbsp;</td><td>Can you solve this complicated maze? Try following the left-hand wall. Advanced programmers only!' +
                                      ze () +
                                      '</td></tr></table></div>'
                                  : '')
  );
}
var $c = 'maze';
Nd = function () {
  10 > L
    ? (window.location =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?lang=' +
        K +
        '&level=' +
        (L + 1) +
        '&skin=' +
        Be)
    : Md ();
};
var Ce = [void 0, Infinity, Infinity, 2, 5, 5, 5, 5, 10, 7, 10][L],
  De = [
    {
      zj: 'maze/pegman.png',
      js: 'maze/tiles_pegman.png',
      zn: 'maze/marker.png',
      background: !1,
      Qq: '#000',
      ws: ['maze/win.mp3', 'maze/win.ogg'],
      Dp: ['maze/fail_pegman.mp3', 'maze/fail_pegman.ogg'],
      Nm: 1,
    },
    {
      zj: 'maze/astro.png',
      js: 'maze/tiles_astro.png',
      zn: 'maze/marker.png',
      background: 'maze/bg_astro.jpg',
      Qq: '#fff',
      ws: ['maze/win.mp3', 'maze/win.ogg'],
      Dp: ['maze/fail_astro.mp3', 'maze/fail_astro.ogg'],
      Nm: 2,
    },
    {
      zj: 'maze/panda.png',
      js: 'maze/tiles_panda.png',
      zn: 'maze/marker.png',
      background: 'maze/bg_panda.jpg',
      Qq: '#000',
      ws: ['maze/win.mp3', 'maze/win.ogg'],
      Dp: ['maze/fail_panda.mp3', 'maze/fail_panda.ogg'],
      Nm: 3,
    },
  ],
  Be = Wc ('skin', 0, De.length),
  U = De[Be],
  W = [
    void 0,
    [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 1, 3, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 3, 0, 0, 0],
      [0, 0, 2, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 1, 1, 1, 1, 3, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 3, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 2, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 2, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 3, 0, 1, 0, 0],
      [0, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 0, 0],
      [0, 2, 1, 1, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [3, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 2, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 3, 0, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0, 0, 1, 0],
      [0, 2, 1, 1, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  ][L],
  Ee = W.length,
  Fe = W[0].length,
  Ge = 50 * Fe,
  He = 50 * Ee,
  X = 0,
  Y = [],
  Ie = {
    10010: [4, 0],
    10001: [3, 3],
    11e3: [0, 1],
    10100: [0, 2],
    11010: [4, 1],
    10101: [3, 2],
    10110: [0, 0],
    10011: [2, 0],
    11001: [4, 2],
    11100: [2, 3],
    11110: [1, 1],
    10111: [1, 0],
    11011: [2, 1],
    11101: [1, 2],
    11111: [2, 2],
    null0: [4, 3],
    null1: [3, 0],
    null2: [3, 1],
    null3: [0, 3],
    null4: [1, 3],
  };
function Je () {
  function a (m, n) {
    return 0 > m || m >= Fe || 0 > n || n >= Ee
      ? '0'
      : 0 == W[n][m] ? '0' : '1';
  }
  var c = document.getElementById ('svgMaze'), d = 50 * Math.max (Ee, Fe);
  c.setAttribute ('viewBox', '0 0 ' + d + ' ' + d);
  h.g.j.H (
    'rect',
    {height: He, width: Ge, fill: '#F1EEE7', 'stroke-width': 1, stroke: '#CCB'},
    c
  );
  if (U.background) {
    var e = h.g.j.H ('image', {height: He, width: Ge, x: 0, y: 0}, c);
    e.setAttributeNS (h.g.j.Xc, 'xlink:href', U.background);
  }
  for (var f = (d = 0); f < Ee; f++)
    for (var g = 0; g < Fe; g++) {
      var k =
        a (g, f) + a (g, f - 1) + a (g + 1, f) + a (g, f + 1) + a (g - 1, f);
      Ie[k] ||
        (k = '00000' == k && 0.3 < Math.random ()
          ? 'null0'
          : 'null' + Math.floor (1 + 4 * Math.random ()));
      e = Ie[k][0];
      k = Ie[k][1];
      var l = h.g.j.H ('clipPath', {id: 'tileClipPath' + d}, c);
      h.g.j.H ('rect', {height: 50, width: 50, x: 50 * g, y: 50 * f}, l);
      e = h.g.j.H (
        'image',
        {
          height: 200,
          width: 250,
          'clip-path': 'url(#tileClipPath' + d + ')',
          x: 50 * (g - e),
          y: 50 * (f - k),
        },
        c
      );
      e.setAttributeNS (h.g.j.Xc, 'xlink:href', U.js);
      d++;
    }
  h.g.j
    .H ('image', {id: 'finish', height: 34, width: 20}, c)
    .setAttributeNS (h.g.j.Xc, 'xlink:href', U.zn);
  d = h.g.j.H ('clipPath', {id: 'pegmanClipPath'}, c);
  h.g.j.H (
    'rect',
    {
      id: 'clipRect',
      height: 52,
      width: 49,
    },
    d
  );
  h.g.j
    .H (
      'image',
      {
        id: 'pegman',
        height: 52,
        width: 1029,
        'clip-path': 'url(#pegmanClipPath)',
      },
      c
    )
    .setAttributeNS (h.g.j.Xc, 'xlink:href', U.zj);
}
function Ke (a) {
  if (!((a && a.type == h.h.ck) || C.Oc () || 1 == X || Yc (L))) {
    a = -1 != Tc.indexOf (K);
    var c = h.M.Zd (h.M.Ix ()), d = C.Z.o.pb (!0), e = null, f = null, g = null;
    if (1 == L)
      2 > D (C).length
        ? ((e = document.getElementById ('dialogHelpStack')), (g = {
            width: '370px',
            top: '130px',
          }), (g[a ? 'right' : 'left'] = '215px'), (f = d[0].ma ()))
        : ((d = C.pb (!0)), 1 < d.length
            ? ((e = '<xml>;<block type="maze_moveForward" x="10" y="10">;<next>;<block type="maze_moveForward"></block>;</next>;</block>;</xml>'.split (
                ';'
              )), (f = document.getElementById (
                'sampleOneTopBlock'
              )), f.firstChild ||
                ((f = h.kg (f, {
                  rtl: -1 != Tc.indexOf (K),
                  readOnly: !0,
                })), 'string' != typeof e && (e = e.join ('')), h.M.ih (
                  h.M.Hg (e),
                  f
                )), (e = document.getElementById (
                'dialogHelpOneTopBlock'
              )), (g = {width: '360px', top: '120px'}), (g[
                a ? 'right' : 'left'
              ] =
                '225px'), (f = d[0].ma ()))
            : 0 == X &&
                ((e = document.getElementById ('dialogHelpRun')), (g = {
                  width: '360px',
                  top: '410px',
                }), (g[a ? 'right' : 'left'] =
                  '400px'), (f = document.getElementById ('runButton'))));
    else if (2 == L)
      0 != X &&
        'none' == document.getElementById ('runButton').style.display &&
        ((e = document.getElementById ('dialogHelpReset')), (g = {
          width: '360px',
          top: '410px',
        }), (g[a ? 'right' : 'left'] = '400px'), (f = document.getElementById (
          'resetButton'
        )));
    else if (3 == L)
      -1 == c.indexOf ('maze_forever') &&
        (0 == ab (C)
          ? ((e = document.getElementById ('dialogHelpCapacity')), (g = {
              width: '430px',
              top: '310px',
            }), (g[a ? 'right' : 'left'] =
              '50px'), (f = document.getElementById ('capacityBubble')))
          : ((e = document.getElementById ('dialogHelpRepeat')), (g = {
              width: '360px',
              top: '360px',
            }), (g[a ? 'right' : 'left'] = '425px'), (f = d[3].ma ())));
    else if (4 == L)
      if (
        0 == ab (C) &&
        (-1 == c.indexOf ('maze_forever') || 1 < C.pb (!1).length)
      )
        (e = document.getElementById ('dialogHelpCapacity')), (g = {
          width: '430px',
          top: '310px',
        }), (g[a ? 'right' : 'left'] = '50px'), (f = document.getElementById (
          'capacityBubble'
        ));
      else {
        c = !0;
        for (var k = D (C), l = 0; l < k.length; l++) {
          var m = k[l];
          if ('maze_forever' == m.type) {
            for (var n = 0; m; )
              (m = Va (m)), (m = m.length ? m[0] : null), n++;
            if (2 < n) {
              c = !1;
              break;
            }
          }
        }
        c &&
          ((e = document.getElementById ('dialogHelpRepeatMany')), (g = {
            width: '360px',
            top: '360px',
          }), (g[a ? 'right' : 'left'] = '425px'), (f = d[3].ma ()));
      }
    else if (5 == L)
      0 != Be ||
        Le.iA ||
        ((e = document.getElementById ('dialogHelpSkins')), (g = {
          width: '360px',
          top: '60px',
        }), (g[a ? 'left' : 'right'] = '20px'), (f = document.getElementById (
          'pegmanButton'
        )));
    else if (6 == L)
      -1 == c.indexOf ('maze_if') &&
        ((e = document.getElementById ('dialogHelpIf')), (g = {
          width: '360px',
          top: '430px',
        }), (g[a ? 'right' : 'left'] = '425px'), (f = d[4].ma ()));
    else if (7 == L) {
      if (!Ke.gC) {
        k = document.createElement ('span');
        k.className = 'helpMenuFake';
        l = [M ('Maze_pathAhead'), M ('Maze_pathLeft'), M ('Maze_pathRight')];
        n = h.g.Ja.Uu (l);
        m = h.g.Ja.Vu (l);
        k.textContent =
          (m ? l[0].slice (n, -m) : l[0].substring (n)) + ' ' + h.Pa.Ql;
        n = document.getElementById ('helpMenuText');
        l = n.textContent;
        n.textContent = '';
        m = l.split (/%\d/);
        for (l = 0; l < m.length; l++)
          n.appendChild (document.createTextNode (m[l])), l != m.length - 1 &&
            n.appendChild (k.cloneNode (!0));
        Ke.gC = !0;
      }
      -1 == c.indexOf ('isPathRight') &&
        ((e = document.getElementById ('dialogHelpMenu')), (g = {
          width: '360px',
          top: '430px',
        }), (g[a ? 'right' : 'left'] = '425px'), (f = d[4].ma ()));
    } else
      9 == L &&
        -1 == c.indexOf ('maze_ifElse') &&
        ((e = document.getElementById ('dialogHelpIfElse')), (g = {
          width: '360px',
          top: '305px',
        }), (g[a ? 'right' : 'left'] = '425px'), (f = d[5].ma ()));
    e
      ? e.parentNode != document.getElementById ('dialog') &&
          O.ul (e, f, !0, !1, g, null)
      : O.yd (!1);
  }
}
function Le (a) {
  var c = document.getElementById ('pegmanMenu');
  'block' == c.style.display
    ? Me (a)
    : Qd (a) ||
        ((a = document.getElementById ('pegmanButton')), a.classList.add (
          'buttonHover'
        ), (c.style.top = a.offsetTop + a.offsetHeight + 'px'), (c.style.left =
          a.offsetLeft + 'px'), (c.style.display = 'block'), (ae.Br = h.Xb (
          document.body,
          'mousedown',
          null,
          Me
        )), (c = document.getElementById ('dialogHelpSkins')) &&
          'dialogHiddenContent' != c.className &&
          O.yd (!1), (Le.iA = !0));
}
function Me (a) {
  Qd (a) ||
    ((document.getElementById ('pegmanMenu').style.display =
      'none'), document
      .getElementById ('pegmanButton')
      .classList.remove ('buttonHover'), ae.Br && (h.Wa (ae.Br), delete ae.Br));
}
function Ne (a) {
  for (var c = 0; c < Y.length; c++)
    clearTimeout (Y[c]);
  Y = [];
  Q = be.x;
  R = be.y;
  a
    ? ((T = 2), Oe (!1), Y.push (
        setTimeout (function () {
          P = 100;
          Pe ([Q, R, 4 * T - 4]);
          T++;
        }, 5 * P)
      ))
    : ((T = 1), Z (Q, R, 4 * T));
  c = document.getElementById ('finish');
  c.setAttribute ('x', 50 * (ce.x + 0.5) - c.getAttribute ('width') / 2);
  c.setAttribute ('y', 50 * (ce.y + 0.6) - c.getAttribute ('height'));
  c = document.getElementById ('look');
  c.style.display = 'none';
  c.parentNode.appendChild (c);
  a = c.getElementsByTagName ('path');
  c = 0;
  for (var d; (d = a[c]); c++)
    d.setAttribute ('stroke', U.Qq);
}
function Qe (a) {
  if (!Qd (a))
    if ((O.yd (!1), 1 == L && 1 < C.pb (!1).length && 1 != X && !Yc (L))) Ke ();
    else {
      a = document.getElementById ('runButton');
      var c = document.getElementById ('resetButton');
      c.style.minWidth || (c.style.minWidth = a.offsetWidth + 'px');
      a.style.display = 'none';
      c.style.display = 'inline';
      Ne (!1);
      Re ();
    }
}
function Se (a) {
  Qd (a) ||
    ((document.getElementById ('runButton').style.display =
      'inline'), (document.getElementById ('resetButton').style.display =
      'none'), Kc (null), Ne (!1), Ke ());
}
function Te (a, c) {
  var d = function (e) {
    Ue (0, e);
  };
  a.setProperty (c, 'moveForward', a.createNativeFunction (d));
  d = function (e) {
    Ue (2, e);
  };
  a.setProperty (c, 'moveBackward', a.createNativeFunction (d));
  d = function (e) {
    Ve (0, e);
  };
  a.setProperty (c, 'turnLeft', a.createNativeFunction (d));
  d = function (e) {
    Ve (1, e);
  };
  a.setProperty (c, 'turnRight', a.createNativeFunction (d));
  d = function (e) {
    return We (0, e);
  };
  a.setProperty (c, 'isPathForward', a.createNativeFunction (d));
  d = function (e) {
    return We (1, e);
  };
  a.setProperty (c, 'isPathRight', a.createNativeFunction (d));
  d = function (e) {
    return We (2, e);
  };
  a.setProperty (c, 'isPathBackward', a.createNativeFunction (d));
  d = function (e) {
    return We (3, e);
  };
  a.setProperty (c, 'isPathLeft', a.createNativeFunction (d));
  a.setProperty (
    c,
    'notDone',
    a.createNativeFunction (function () {
      return Q != ce.x || R != ce.y;
    })
  );
}
function Re () {
  if ('Interpreter' in window) {
    ee = [];
    h.selected && kb (h.selected);
    var a = h.D;
    var c = C;
    c ||
      (console.warn (
        'No workspace specified in workspaceToCode call.  Guessing.'
      ), (c = h.ua ()));
    var d = [];
    a.va (c);
    c = c.pb (!0);
    for (var e = 0, f; (f = c[e]); e++) {
      var g = Wd (a, f);
      Array.isArray (g) && (g = g[0]);
      g &&
        (f.K &&
          ((g = a.kx (g)), a.tm && !f.hs && (g = Xd (a.tm, f) + g), a.um &&
            !f.hs &&
            (g += Xd (a.um, f))), d.push (g));
    }
    d = d.join ('\n');
    d = a.finish (d);
    d = d.replace (/^\s+\n/, '');
    d = d.replace (/\n\s+$/, '\n');
    Ed = a = d = d.replace (/[ \t]+\n/g, '\n');
    Dd = Gd ();
    X = 0;
    a = new Interpreter (a, Te);
    try {
      for (d = 1e4; a.step (); )
        if (0 == d--) throw Infinity;
      X = Q != ce.x || R != ce.y ? -1 : 1;
    } catch (k) {
      Infinity === k ? (X = 2) : !1 === k ? (X = -2) : ((X = -2), alert (k));
    }
    1 == X ? ((P = 100), ee.push (['finish', null])) : (P = 150);
    Ne (!1);
    Y.push (setTimeout (Xe, 100));
  } else setTimeout (Re, 250);
}
function Xe () {
  var a = ee.shift ();
  if (a) {
    Od (a[1]);
    switch (a[0]) {
      case 'north':
        Pe ([Q, R - 1, 4 * T]);
        R--;
        break;
      case 'east':
        Pe ([Q + 1, R, 4 * T]);
        Q++;
        break;
      case 'south':
        Pe ([Q, R + 1, 4 * T]);
        R++;
        break;
      case 'west':
        Pe ([Q - 1, R, 4 * T]);
        Q--;
        break;
      case 'look_north':
        Ye (0);
        break;
      case 'look_east':
        Ye (1);
        break;
      case 'look_south':
        Ye (2);
        break;
      case 'look_west':
        Ye (3);
        break;
      case 'fail_forward':
        Ze (!0);
        break;
      case 'fail_backward':
        Ze (!1);
        break;
      case 'left':
        Pe ([Q, R, 4 * T - 4]);
        T = $e (T - 1);
        break;
      case 'right':
        Pe ([Q, R, 4 * T + 4]);
        T = $e (T + 1);
        break;
      case 'finish':
        Oe (!0), window.localStorage &&
          (window.localStorage[$c + L] = Dd), setTimeout (O.NA, 1e3);
    }
    Y.push (setTimeout (Xe, 5 * P));
  } else Od (null), Ke ();
}
function af (a) {
  if (
    'dialogHiddenContent' != document.getElementById ('dialogDone').className
  ) {
    var c = document.getElementById ('pegSpin'),
      d = O.Gv (c),
      e = a.clientX - (d.x + d.width / 2 - window.pageXOffset);
    a = h.g.Cd.ED (
      Math.atan ((a.clientY - (d.y + d.height / 2 - window.pageYOffset)) / e)
    );
    e = Math.round ((0 < e ? a + 90 : a + 270) / 360 * 16);
    16 == e && (e = 15);
    c.style.backgroundPosition = 49 * -e + 'px 0px';
  }
}
function Pe (a) {
  var c = [Q, R, 4 * T],
    d = [(a[0] - c[0]) / 4, (a[1] - c[1]) / 4, (a[2] - c[2]) / 4];
  Z (c[0] + d[0], c[1] + d[1], bf (c[2] + d[2]));
  Y.push (
    setTimeout (function () {
      Z (c[0] + 2 * d[0], c[1] + 2 * d[1], bf (c[2] + 2 * d[2]));
    }, P)
  );
  Y.push (
    setTimeout (function () {
      Z (c[0] + 3 * d[0], c[1] + 3 * d[1], bf (c[2] + 3 * d[2]));
    }, 2 * P)
  );
  Y.push (
    setTimeout (function () {
      Z (a[0], a[1], bf (a[2]));
    }, 3 * P)
  );
}
function Ze (a) {
  var c = 0, d = 0;
  switch (T) {
    case 0:
      d = -1;
      break;
    case 1:
      c = 1;
      break;
    case 2:
      d = 1;
      break;
    case 3:
      c = -1;
  }
  a || ((c = -c), (d = -d));
  if (1 == U.Nm) {
    c /= 4;
    d /= 4;
    var e = bf (4 * T);
    Z (Q + c, R + d, e);
    C.Jc.play ('fail', 0.5);
    Y.push (
      setTimeout (function () {
        Z (Q, R, e);
      }, P)
    );
    Y.push (
      setTimeout (function () {
        Z (Q + c, R + d, e);
        C.Jc.play ('fail', 0.5);
      }, 2 * P)
    );
    Y.push (
      setTimeout (function () {
        Z (Q, R, e);
      }, 3 * P)
    );
  } else {
    var f = 10 * (Math.random () - 0.5), g = (Math.random () - 0.5) / 2;
    c += (Math.random () - 0.5) / 4;
    d += (Math.random () - 0.5) / 4;
    c /= 8;
    d /= 8;
    var k = 0;
    3 == U.Nm && (k = 0.01);
    Y.push (
      setTimeout (function () {
        C.Jc.play ('fail', 0.5);
      }, 2 * P)
    );
    a = function (m) {
      return function () {
        Z (Q + c * m, R + d * m, bf (4 * T + g * m), f * m);
        d += k;
      };
    };
    for (var l = 1; 100 > l; l++)
      Y.push (setTimeout (a (l), P * l / 2));
  }
}
function Oe (a) {
  var c = bf (4 * T);
  Z (Q, R, 16);
  a && C.Jc.play ('win', 0.5);
  P = 150;
  Y.push (
    setTimeout (function () {
      Z (Q, R, 18);
    }, P)
  );
  Y.push (
    setTimeout (function () {
      Z (Q, R, 16);
    }, 2 * P)
  );
  Y.push (
    setTimeout (function () {
      Z (Q, R, c);
    }, 3 * P)
  );
}
function Z (a, c, d, e) {
  var f = document.getElementById ('pegman');
  f.setAttribute ('x', 50 * a - 49 * d + 1);
  f.setAttribute ('y', 50 * (c + 0.5) - 26 - 8);
  e
    ? f.setAttribute (
        'transform',
        'rotate(' + e + ', ' + (50 * a + 25) + ', ' + (50 * c + 25) + ')'
      )
    : f.setAttribute ('transform', 'rotate(0, 0, 0)');
  c = document.getElementById ('clipRect');
  c.setAttribute ('x', 50 * a + 1);
  c.setAttribute ('y', f.getAttribute ('y'));
}
function Ye (a) {
  var c = Q, d = R;
  switch (a) {
    case 0:
      c += 0.5;
      break;
    case 1:
      c += 1;
      d += 0.5;
      break;
    case 2:
      c += 0.5;
      d += 1;
      break;
    case 3:
      d += 0.5;
  }
  c *= 50;
  d *= 50;
  var e = 90 * a - 45;
  a = document.getElementById ('look');
  a.setAttribute (
    'transform',
    'translate(' + c + ', ' + d + ') rotate(' + e + ' 0 0) scale(.4)'
  );
  c = a.getElementsByTagName ('path');
  a.style.display = 'inline';
  for (d = 0; (a = c[d]); d++)
    cf (a, P * d);
}
function cf (a, c) {
  Y.push (
    setTimeout (function () {
      a.style.display = 'inline';
      setTimeout (function () {
        a.style.display = 'none';
      }, 2 * P);
    }, c)
  );
}
function $e (a) {
  a = Math.round (a) % 4;
  0 > a && (a += 4);
  return a;
}
function bf (a) {
  a = Math.round (a) % 16;
  0 > a && (a += 16);
  return a;
}
function Ue (a, c) {
  if (!We (a, null))
    throw (ee.push (['fail_' + (a ? 'backward' : 'forward'), c]), !1);
  switch ($e (T + a)) {
    case 0:
      R--;
      var d = 'north';
      break;
    case 1:
      Q++;
      d = 'east';
      break;
    case 2:
      R++;
      d = 'south';
      break;
    case 3:
      Q--, (d = 'west');
  }
  ee.push ([d, c]);
}
function Ve (a, c) {
  a ? (T++, ee.push (['right', c])) : (T--, ee.push (['left', c]));
  T = $e (T);
}
function We (a, c) {
  switch ($e (T + a)) {
    case 0:
      var d = W[R - 1] && W[R - 1][Q];
      var e = 'look_north';
      break;
    case 1:
      d = W[R][Q + 1];
      e = 'look_east';
      break;
    case 2:
      d = W[R + 1] && W[R + 1][Q];
      e = 'look_south';
      break;
    case 3:
      (d = W[R][Q - 1]), (e = 'look_west');
  }
  c && ee.push ([e, c]);
  return 0 !== d && void 0 !== d;
}
window.addEventListener ('load', function () {
  function a () {
    l.style.top = Math.max (10, m.offsetTop - window.pageYOffset) + 'px';
    l.style.left = k ? '10px' : '420px';
    l.style.width = window.innerWidth - 440 + 'px';
  }
  function c (n) {
    return function () {
      window.sessionStorage && (window.sessionStorage.Oq = Gd ());
      location =
        location.protocol +
        '//' +
        location.host +
        location.pathname +
        '?lang=' +
        K +
        '&level=' +
        L +
        '&skin=' +
        n;
    };
  }
  document.body.innerHTML = Ae ();
  Fd ();
  document.querySelector ('#pegmanButton>img').style.backgroundImage =
    'url(' + U.zj + ')';
  for (
    var d = document.getElementById ('pegmanMenu'), e = 0;
    e < De.length;
    e++
  ) if (e != Be) {
      var f = document.createElement ('div'),
        g = document.createElement ('img');
      g.src = 'common/1x1.gif';
      g.style.backgroundImage = 'url(' + De[e].zj + ')';
      f.appendChild (g);
      d.appendChild (f);
      h.Xb (f, 'mousedown', null, c (e));
    }
  h.Xb (window, 'resize', null, Me);
  d = document.getElementById ('pegmanButton');
  h.Xb (d, 'mousedown', null, Le);
  d = document.getElementById ('pegmanButtonArrow');
  e = document.createTextNode (h.Pa.Ql);
  d.appendChild (e);
  var k = -1 != Tc.indexOf (K),
    l = document.getElementById ('blockly'),
    m = document.getElementById ('visualization');
  window.addEventListener ('scroll', function () {
    a (null);
    h.El (C);
  });
  window.addEventListener ('resize', a);
  a (null);
  Ld ({
    maxBlocks: Ce,
    rtl: k,
    trashcan: !0,
    zoom: {startScale: 1 + (1 - L / 10) / 3},
  });
  C.Jc.load (U.ws, 'win');
  C.Jc.load (U.Dp, 'fail');
  $d (
    h.D,
    'moveForward,moveBackward,turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft'
  );
  Je ();
  Jd ();
  for (
    d = 0;
    d < Ee;
    d++
  ) for (e = 0; e < Fe; e++) 2 == W[d][e] ? (be = {x: e, y: d}) : 3 == W[d][e] && (ce = {x: e, y: d});
  Ne (!0);
  E (C, function () {
    var n = ab (C), q = document.getElementById ('capacity');
    if (Infinity == n) q.style.display = 'none';
    else {
      q.style.display = 'inline';
      q.innerHTML = '';
      n = Number (n);
      var r = document.createElement ('span');
      r.className = 'capacityNumber';
      r.appendChild (document.createTextNode (n));
      n = (0 == n
        ? M ('Maze_capacity0')
        : 1 == n ? M ('Maze_capacity1') : M ('Maze_capacity2')).split (/%\d/);
      for (var t = 0; t < n.length; t++)
        q.appendChild (document.createTextNode (n[t])), t != n.length - 1 &&
          q.appendChild (r.cloneNode (!0));
    }
  });
  document.body.addEventListener ('mousemove', af, !0);
  ad ('runButton', Qe);
  ad ('resetButton', Se);
  1 == L && ((h.ic *= 2), (h.Qs = h.ic));
  10 == L
    ? Yc (L) ||
        ((d = document.getElementById ('dialogHelpWallFollow')), O.ul (
          d,
          null,
          !1,
          !0,
          {width: '30%', left: '35%', top: '12em'},
          O.vx
        ), O.qx (), setTimeout (O.Eu, 3e5))
    : setTimeout (function () {
        E (C, Ke);
        Ke ();
      }, 5e3);
  d = document.getElementById ('dialogDoneButtons');
  e = document.createElement ('img');
  e.id = 'pegSpin';
  e.src = 'common/1x1.gif';
  e.style.backgroundImage = 'url(' + U.zj + ')';
  d.parentNode.insertBefore (e, d);
  Td ();
  Ud ();
});
