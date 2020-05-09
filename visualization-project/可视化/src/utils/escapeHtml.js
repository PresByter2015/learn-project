/**
 * EscapeHtml
 */
export function EscapeHtml(str) {
  if (str !== '' && typeof str === 'string') {
    return str.replace(/[&<> ]/g, function (word) {
      let otags = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        ' ': '&nbsp;'
      };
      return otags[word] || word;
    });
  } else if (typeof str === 'number') {
    return str;
  } else {
    return '';
  }
}
