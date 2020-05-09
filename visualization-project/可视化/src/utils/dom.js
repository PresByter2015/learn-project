import $ from 'jquery';

let body = $('body');
let timer = null;

body.on('mousemove', () => {
  clearTimeout(timer);
  body.addClass('mousemove');

  timer = setTimeout(() => {
    body.removeClass('mousemove');
  }, 3000);
});

export default {
  body,
  container: $('#app')
};
