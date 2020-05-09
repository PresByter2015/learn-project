export function hex2rgb(hex, opacity = 100) {
  if (Array.isArray(hex)) { // to avoid sth error
    hex = hex[0];
  }
  if (!hex) {
    return hex;
  }
  if (hex.substr(0, 1) !== '#') {
    hex = '#' + hex;
  }
  hex = hex.replace('#', '0x');
  if (hex.length !== 8) {
    //颜色值只有三位的情况
    let str1 = hex.substr(2, 1);
    let str2 = hex.substr(3, 1);
    let str3 = hex.substr(4, 1);
    hex = '0x' + str1.repeat(2) + str2.repeat(2) + str3.repeat(2);
  }
  let r = hex >> 16;
  let g = hex >> 8 & 0xFF;
  let b = hex & 0xFF;
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}
