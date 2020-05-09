import { throttle, delay } from './utils';

/**
 * Resizeable
 */

/* eslint-disable */
class GridStackResizeable {
  constructor(el, options) {
    this.$el = el;
    this.options = options;

    this.drag = this.$el.drag({
      items: '.' + this.options.resize.handle_class,
      offset_left: this.options.widget.margins[0],
      width: this.options.width,
      move_element: false,
      resize: true,
      limit: true, // this.options.autogrow_cols ? false : true,
      start: this.onStartResize.bind(this),
      stop: (event, ui) => {
        delay(() => {
          this.onStopResize(event, ui);
        }, 120);
      },
      drag: throttle(this.onResize.bind(this), 60)
    });
  }

  setOption(opts) {
    Object.assign(this.options, opts);
    this.drag.resize(opts);
  }

  /**
   * This function is executed every time a widget starts to be resized.
   *
   * @method on_start_resize
   * @param {Event} event The original browser event
   * @param {Object} ui A prepared ui object with useful drag-related data
   */
  onStartResize(event, ui) {
    // this.$resized_widget = ui.$player.closest('.gs-w');
    this.$resized_widget = ui.$player.parents('.widget');
    let col = this.$resized_widget.attr('data-col');
    let row = this.$resized_widget.attr('data-row');
    this.resizeInitial = { col, row };

    this.resize_coords = this.$resized_widget.coords();
    this.resize_wgd = this.resize_coords.grid;
    this.resize_initial_width = this.resize_coords.coords.width;
    this.resize_initial_height = this.resize_coords.coords.height;
    this.resize_initial_sizex = this.resize_coords.grid.sizex;
    this.resize_initial_sizey = this.resize_coords.grid.sizey;
    this.resize_initial_col = this.resize_coords.grid.col;
    this.resize_initial_row = this.resize_coords.grid.row;
    this.resize_last_sizex = this.resize_initial_sizex;
    this.resize_last_sizey = this.resize_initial_sizey;

    this.resize_max_sizex = Math.min(this.resize_wgd.max_sizex ||
      this.options.resize.max_size[0],
      this.options.maxCols - this.resize_initial_col + 1);
    this.resize_max_sizey = this.resize_wgd.max_sizey ||
      this.options.resize.max_size[1];

    this.resize_min_sizex = (this.resize_wgd.min_sizex ||
      this.options.resize.min_size[0] || 1);
    this.resize_min_sizey = (this.resize_wgd.min_sizey ||
      this.options.resize.min_size[1] || 1);

    // this.resize_initial_last_col = this.getHighestOccupiedCell().col;

    this.resize_dir = {
      right: ui.$player.is('.' + this.resize_handle_class + '-x'),
      bottom: ui.$player.is('.' + this.resize_handle_class + '-y')
    };

    this.$resized_widget.css({
      'min-width': this.options.widgetBaseDimensions[0],
      'min-height': this.options.widgetBaseDimensions[1]
    });

    this.$resized_widget.addClass('resizing');

    if (this.options.resize.start) {
      this.options.resize.start.call(this, event, ui, this.$resized_widget);
    }

    this.$el.trigger('gridster:resizestart');
    this.isResizeStart = true;
  }

  /**
   * This function is executed every time a widget stops being resized.
   *
   * @method on_stop_resize
   * @param {Event} event The original browser event
   * @param {Object} ui A prepared ui object with useful drag-related data
   */
  onStopResize(event, ui) {
    this.$resized_widget
      .removeClass('resizing')
      .css({
        'width': '',
        'height': ''
      });

    delay(() => {

      if (this.options.resize.stop) {
        this.options.resize.stop.call(this, event, ui, this.$resized_widget);
      }

      // let sizex = this.$resized_widget.attr('data-sizex');
      // let sizey = this.$resized_widget.attr('data-sizey');
      // console.log(`组件改变尺寸 id ${this.$resized_widget.attr('data-id')} 为 sizex:${sizex}, sizey:${sizey}`)

      this.$el.trigger('gridster:resizestop');
    }, 300);

    if (this.options.autogrow_cols) {
      this.draggable.set_limits(this.cols * this.widgetWidth);
    }
  }

  /**
   * This function is executed when a widget is being resized.
   *
   * @method onResize
   * @param {Event} event The original browser event
   * @param {Object} ui A prepared ui object with useful drag-related data
   */
  onResize(event, ui) {
    if (!this.isResizeStart) {
      return false;
    }

    let rel_x = (ui.pointer.diff_left);
    let rel_y = (ui.pointer.diff_top);

    let wbd_x = this.options.widgetBaseDimensions[0];
    let wbd_y = this.options.widgetBaseDimensions[1];
    let margin_x = this.options.widget.margins[0];
    let margin_y = this.options.widget.margins[1];
    let max_sizex = this.resize_max_sizex;
    let min_sizex = this.resize_min_sizex;
    let max_sizey = this.resize_max_sizey;
    let min_sizey = this.resize_min_sizey;
    let autogrow = this.options.autogrow_cols;
    let width;
    let height;
    let max_width = Infinity;
    let max_height = Infinity;

    // console.log(rel_x, rel_y, wbd_x, wbd_y, margin_x, margin_y, max_sizex, max_sizey)

    let inc_units_x = Math.ceil((rel_x / (wbd_x + margin_x * 2)) - 0.2);
    let inc_units_y = Math.ceil((rel_y / (wbd_y + margin_y * 2)) - 0.2);

    let sizex = Math.max(1, this.resize_initial_sizex + inc_units_x);
    let sizey = Math.max(1, this.resize_initial_sizey + inc_units_y);

    // 水平方向限制
    let maxCols = (this.options.width / this.options.widgetWidth) -
      this.resize_initial_col + 1;
    let limit_width = ((maxCols * this.options.widgetWidth) - margin_x * 2);

    sizex = Math.max(Math.min(sizex, max_sizex), min_sizex);
    sizex = Math.min(maxCols, sizex);
    width = (max_sizex * wbd_x) + ((sizex - 1) * margin_x * 2);
    max_width = Math.min(width, limit_width);
    let min_width = (min_sizex * wbd_x) + ((sizex - 1) * margin_x * 2);

    // 垂直方向限制
    let maxRows = (this.options.height / this.options.widgetHeight) -
      this.resize_initial_row + 1;
    let limitHeight = ((maxRows * this.options.widgetHeight) - margin_y * 2);

    sizey = Math.max(Math.min(sizey, max_sizey), min_sizey);
    sizey = Math.min(maxRows, sizey);
    height = (max_sizey * wbd_y) + ((sizey - 1) * margin_y * 2);
    max_height = Math.min(height, limitHeight);
    let min_height = (min_sizey * wbd_y) + ((sizey - 1) * margin_y * 2);

    if (this.resize_dir.right) {
      sizey = this.resize_initial_sizey;
    } else if (this.resize_dir.bottom) {
      sizex = this.resize_initial_sizex;
    }

    // 设置正确的 width height
    let css_props = {};
    if (!this.resize_dir.bottom) {
      css_props.width = Math.max(
        Math.min(this.resize_initial_width + rel_x, max_width),
        min_width);
    }

    if (!this.resize_dir.right) {
      css_props.height = Math.max(
        Math.min(this.resize_initial_height + rel_y, max_height),
        min_height);
    }

    // this.$resized_widget.css(css_props);  // fix #790：不需要手动计算width，height，让它随内容大小自适应

    if (sizex !== this.resize_last_sizex || sizey !== this.resize_last_sizey) {
      this.options.onResize(this.$resized_widget, sizex, sizey);
    }

    if (this.options.resize.resize) {
      this.options.resize.resize.call(this, event, ui, this.$resized_widget);
    }

    this.$el.trigger('gridster:resize');

    this.resize_last_sizex = sizex;
    this.resize_last_sizey = sizey;
  }

  disable() {
  }

  enable() {
  }

  destroy() {
  }
}

export default GridStackResizeable;
/* eslint-enable */
