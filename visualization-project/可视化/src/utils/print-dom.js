import $ from 'jquery';
// import html2canvas from 'html2canvas'
import html2canvas from 'modules/html2canvas';

// import rasterizeHTML from 'rasterizehtml'

/**
 * 获取一个jquery对象的长宽和位置，包含滚动条的长度， getBoundingClientRect()得到的结果是
 * 不包含被滚动条隐藏起来的部分，它永远是相对于浏览器视区最左上角的偏移
 * @param  {jqueryDOM} $elem
 * @return {Object} {width:xxx, height:xxx, left:xxx, top:xxx}
 */
function getRect($elem) {
  return $.extend({
    width: $elem.width(),
    height: $elem.height()
  }, $elem.offset());
}

function drawImage(ctx, p, referenceCounting) {
  referenceCounting.acquire();
  let image = new Image();
  image.src = p.src;
  image.onload = function () {

    if (!p.zoomType || p.zoomType !== 'covered') {
      /**
       * 缩放到覆盖 cover
       * A为宽高比，A(a) < A(target)，宽度铺满，反之高度铺满
       */
      let crop; //等比裁剪
      if (image.width / image.height < p.dWidth / p.dHeight) {
        crop = {
          width: image.width,
          height: image.width * p.dHeight / p.dWidth
        };
      } else {
        crop = {
          width: image.height * p.dWidth / p.dHeight,
          height: image.height
        };
      }
      ctx.drawImage(image, p.sx, p.sy, crop.width, crop.height, p.dx, p.dy, p.dWidth, p.dHeight);
    } else {
      /**
       * 还需要一种缩放到被覆盖，并居中 (covered)
       */
      let target; //目标尺寸
      if (image.width / image.height > p.dWidth / p.dHeight) {
        target = {
          width: p.dWidth,
          height: p.dWidth * image.height / image.width
        };
        p.dy += (p.dHeight - target.height) / 2;
      } else {
        target = {
          width: p.dHeight * image.width / image.height,
          height: p.dHeight
        };
        p.dx += (p.dWidth - target.width) / 2;
      }
      ctx.drawImage(image, p.sx, p.sy, image.width, image.height, p.dx, p.dy, target.width, target.height);
    }
    referenceCounting.release();
  };
}

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
  /**
   * 该方法用于绘制类似css中背景图属性的cover效果
   *
   * offsetX,offsetY设置为0.5时即相当于css的background-position为center
   *
   * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
   *
   * If image and context are only arguments rectangle will equal canvas
   */
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) {
    offsetX = 0;
  }
  if (offsetY < 0) {
    offsetY = 0;
  }
  if (offsetX > 1) {
    offsetX = 1;
  }
  if (offsetY > 1) {
    offsetY = 1;
  }

  let iw = img.width,
    ih = img.height,
    r = Math.min(w / iw, h / ih),
    nw = iw * r,   // new prop. width
    nh = ih * r,   // new prop. height
    cx, cy, cw, ch, ar = 1;

  // decide which gap to fill
  if (nw < w) {
    ar = w / nw;
  }
  // updated
  if (Math.abs(ar - 1) < 1e-14 && nh < h) {
    ar = h / nh;
  }
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) {
    cx = 0;
  }
  if (cy < 0) {
    cy = 0;
  }
  if (cw > iw) {
    cw = iw;
  }
  if (ch > ih) {
    ch = ih;
  }

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}


function printDOM(elem, cb) {
  let $grid = $(elem);
  let gridRect = getRect($grid);

  /**
   * "background-image", "background-position-x", "background-position-y",
   * "background-size", "background-repeat-x", "background-repeat-y",
   * "background-attachment", "background-origin", "background-clip",
   * "background-color", "width", "overflow-x", "overflow-y"
   * @type {[type]}
   */
    // let cssProperties = Array.prototype.slice.call($grid[0].style);
  let gridStyle = $grid[0].style;

  let $screenshot = $('<canvas width="' + gridRect.width + '" height="' + gridRect.height + '">');
  $screenshot.hide();
  $screenshot.appendTo('body');

  let ctx = $screenshot[0].getContext('2d');

  // $screenshot.clearCanvas();
  // 引用计数
  let waitDrawComplete = (function () {
    let i = 0;
    return {
      acquire: function () {
        i++;
      },
      release: function () {
        i--;
        if (i === 0) {
          let src = $screenshot[0].toDataURL();
          $screenshot.remove();
          cb(src);
        }
      }
    };
  }());

  let match = /url *\( *['"]([\w-\/\.]*)['"] *\)/.exec(gridStyle.backgroundImage);
  // if (match !== null) {
  //   let backgroundImageSrc = match[1];
  //   drawImage(ctx, {
  //     sx: 0,
  //     sy: 0,
  //     dx: 0,
  //     dy: 0,
  //     dWidth: gridRect.width,
  //     dHeight: gridRect.height,
  //     src: backgroundImageSrc
  //   }, waitDrawComplete);
  // }

  if (gridStyle.backgroundColor) {
    //背景色
    ctx.beginPath();
    // waitDrawComplete.acquire();
    ctx.rect(0, 0, gridRect.width, gridRect.height);
    ctx.fillStyle = gridStyle.backgroundColor;
    ctx.fill();
    // waitDrawComplete.release();
  } else if (match !== null) {
    //背景图
    if (gridStyle.backgroundImage.indexOf('url') !== -1 && match[1] !== '') {
      //上传了背景图的场景
      let img = new Image;
      let offsetsX = 0.5;
      let offsetsY = 0.5;
      // waitDrawComplete.acquire();
      img.onload = draw;
      img.src = match[1];

      function draw() {
        drawImageProp(ctx, this, 0, 0, gridRect.width, gridRect.height, offsetsX, offsetsY);
        // waitDrawComplete.release();
      }
    } else if (match[1] === '') {
      //选择了背景图 但未上传图片(即背景图为空)
      ctx.beginPath();
      // waitDrawComplete.acquire();
      ctx.rect(0, 0, gridRect.width, gridRect.height);
      ctx.fillStyle = 'transparent';
      ctx.fill();
      // waitDrawComplete.release();
    }
  }

  let charts = $grid.find('.chart');
  if (charts.length > 0) {
    charts.each(function () {
      let type = $(this).data('chart-klass');
      if (type === 'globe') {
        //地球仪
        let pos = getRect($(this));
        drawImage(ctx, {
          zoomType: 'covered',
          sx: 0,
          sy: 0,
          dx: pos.left - gridRect.left,
          dy: pos.top - gridRect.top,
          dWidth: pos.width,
          dHeight: pos.height,
          src: '/public/images/screen/globe.png'
        }, waitDrawComplete);
      } else if (type === 'ci') {
        //关系图
        let pos = getRect($(this));
        drawImage(ctx, {
          zoomType: 'covered',
          sx: 0,
          sy: 0,
          dx: pos.left - gridRect.left,
          dy: pos.top - gridRect.top,
          dWidth: pos.width,
          dHeight: pos.height,
          src: '/public/images/screen/ci.png'
        }, waitDrawComplete);
      } else {
        let pos = getRect($(this));
        let widget = $(this).parents('.widget').eq(0);
        let isActive = false;  //记录部件截图前是否选中
        //截图前 去掉部件选中状态
        if (widget.hasClass('active')) {
          isActive = true;
          widget.removeClass('active');
        }
        waitDrawComplete.acquire();
        html2canvas(widget[0]).then(function (canvas) {
          drawImage(ctx, {
            sx: 0,
            sy: 0,
            dx: pos.left - gridRect.left,
            dy: pos.top - gridRect.top,
            dWidth: canvas.width,
            dHeight: canvas.height,
            src: canvas.toDataURL()
          }, waitDrawComplete);
          waitDrawComplete.release();
        });

        if (isActive) {
          widget.addClass('active');
        }

        // const elem = $(this).parents('.widget')[0];
        // const html = (new XMLSerializer).serializeToString(elem);

        // rasterizeHTML.drawHTML(html)
        //   .then(function(d) {
        //     const image = d.image;
        //     const p = {
        //       sx: 0,
        //       sy: 0,
        //       dx: pos.left - gridRect.left,
        //       dy: pos.top - gridRect.top
        //     }
        //     ctx.drawImage(image, p.sx, p.sy, image.width, image.height, p.dx, p.dy, image.width, image.height);
        //     waitDrawComplete.release();
        //   }, function(e) {
        //     //console.log('draw text module error:' + e);
        //     waitDrawComplete.release();
        //   })
      }
    });
  } else {
    //删除完所有部件
    waitDrawComplete.acquire();
    waitDrawComplete.release();
  }
}

module.exports = printDOM;
