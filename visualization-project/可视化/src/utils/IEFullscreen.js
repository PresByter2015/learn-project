import browser from 'utils/browser';

let isIEFullscreen = false;

/**
 * @return {boolean}
 */
export function IEFullscreen(Fullscreen, exitFullscreen) {
  //IE11以下监听
  if (browser.msie && browser.versionNumber < 11) {
    document.addEventListener('keydown', function (e) {
      e = e || window.event || arguments.callee.caller.arguments[0];
      //捕捉F11键盘动作
      if (e && e.keyCode === 122) {
        isIEFullscreen = !isIEFullscreen;
        if (isIEFullscreen) {
          document.body.className += ' fullscreen';
          if (Fullscreen) {
            Fullscreen();
          }
        } else {
          document.body.className = document.body.className.replace('fullscreen', '');
          if (exitFullscreen) {
            exitFullscreen();
          }
        }
      }
    });
  }

  return isIEFullscreen;
}

export function isIEFullscreen() {
  return isIEFullscreen;
}
