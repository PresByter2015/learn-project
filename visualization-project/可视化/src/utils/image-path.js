/**
 * prefix [ '' | '/show' ]
 * url [ '/upload/example.png' | 'assets/src/assets/example.png' | 'data:image/png;base64,iVBORw0KGgo...']
 * @param  {[type]} prefix [description]
 * @param  {[type]} url    [description]
 * @return {[type]}        [description]
 */
function imagePath(prefix, url) {
  if (url && url !== '') {
    if (/data:image\/[^;]+;base64/.test(url)) {
      return url;
    } else if (url[0] === '/') {
      return prefix + url;
    } else {
      return prefix + '/' + url;
    }
  } else {
    return '';
  }
}

export { imagePath };
