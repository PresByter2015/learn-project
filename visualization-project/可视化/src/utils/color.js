// export default {
//   // 判断颜色值是否合法
//   isValid(color) {
//     return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
//   }
// }

export function ColorValid(color) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

export function hex2rgb(hex, opacity = 1) {
  if (!hex) {
    return hex;
  }

  hex = hex.replace('#', '0x');
  let r = hex >> 16;
  let g = hex >> 8 & 0xFF;
  let b = hex & 0xFF;

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

export function parseRgba(color) {
  if (!color) {
    return color;
  }
  let hex = '';
  let alpha = 1;

  color = color.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d?\.?\d*)[\s+]?/i
  );

  if (color && color.length === 5) {
    hex = '#' +
      ('0' + parseInt(color[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(color[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(color[3], 10).toString(16)).slice(-2);
    alpha = color[4];
  }

  return {
    color: hex,
    alpha: alpha * 100
  };
}

export function rgb2hex(color) {
  if (!color) {
    return color;
  }
  color = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

  return (color && color.length === 4)
    ? '#' +
    ('0' + parseInt(color[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(color[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(color[3], 10).toString(16)).slice(-2)
    : '';
}

export function isHex(str) {
  return str.charAt(0) === '#' && /^#[\d|a-z|A-Z]{6}$/g.test(str);
}

export default {
  hex2rgb,
  rgb2hex,
  isHex,
  parseRgba,
  isRGBA(color) {
    if (typeof color !== 'string') {
      return color;
    }
    return color && color.substr(0, 4) === 'rgba';
  },

  parse(color, type = 'rgba') {
    if (type === 'rgba') {
      return parseRgba(color);
    }
  }
};
