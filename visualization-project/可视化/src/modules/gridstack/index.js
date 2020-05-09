/*
 * jquery.gridster
 * https://github.com/ducksboard/gridster.js
 *
 * Copyright (c) 2012 ducksboard
 * Licensed under the MIT licenses.
 */
/* eslint-disable */
import './index.css';

const $ = require('jquery');

// const debug = require('modules/debug')('gridstack');
import Draggable from './draggable';
import Coords from './coords';
// import Collision from './collision';
import StyleSheet from './style-sheet';
import GridStackResizeable from './resizeable';
import { throttle, delay, isRectOverlap } from './utils';
import Widget from './widget';

const defaults = {
  widget: {
    selector: '.widget',
    margins: [0, 0]
  },
  widgetBaseDimensions: [400, 225],
  extra_rows: 0,
  extra_cols: 0,
  max_sizex: false,
  autogrow_cols: false,
  autogenerateStylesheet: true,
  draggable: {
    items: '.gs-w',
    distance: 4,
    ignore_dragging: Draggable.defaults.ignore_dragging.slice(0)
  },
  resize: {
    enabled: false,
    axes: ['both'],
    handle_append_to: '',
    handle_class: 'gs-control-point',
    max_size: [Infinity, Infinity],
    min_size: [1, 1]
  }
};

/**
 * GridStack
 */
class GridStack {
  constructor(el, options) {
    this.options = $.extend(true, {}, defaults, options);

    this.widgets = {};
    this.$el = $(el);
    this.$wrapper = this.$el.parent();
    this.$widgets = this.$el.find(this.options.widget.selector);
    this.$changed = $([]);

    this.containerWidth = options.width;
    this.containerHeight = options.height;

    this.widgetWidth = (this.options.widget.margins[0] * 2) +
      this.options.widgetBaseDimensions[0];
    this.widgetHeight = (this.options.widget.margins[1] * 2) +
      this.options.widgetBaseDimensions[1];

    // 最小单元格的尺寸
    this.cellOptions = {
      width: this.widgetWidth,
      height: this.widgetHeight
    };

    this.options.maxCols = this.options.cols;
    this.options.minCols = this.options.cols;
    this.options.maxRows = this.options.rows;
    this.options.minRows = this.options.rows;

    this.$wrapper.addClass('ready');
    this.options.resize.enabled && this.setup_resize();
    this.generate_grid_and_stylesheet();
    this.setDomGridWidth(this.options.width);
    this.setDomGridHeight(this.options.height);

    this.initWidgets();
    this.initDraggable();
    this.initResizable();

    $(window).bind('resize.gridster', throttle(this.recalculate_faux_grid.bind(this), 200));
  }

  setDomGridHeight(height) {
    // this.$el.css('height', this.containerHeight)
    this.containerHeight = height;
    return this;
  }

  setDomGridWidth(width) {
    this.container_width = width;
    // this.$el.css('width', this.containerWidth)
    return this;
  }

  redraw(opts) {
    this.setDomGridWidth(opts.width);
    this.setDomGridHeight(opts.height);

    this.widgetWidth = (this.options.widget.margins[0] * 2) + opts.widgetBaseDimensions[0];
    this.widgetHeight = (this.options.widget.margins[1] * 2) + opts.widgetBaseDimensions[1];

    let widgetWidth = this.widgetWidth;
    let widgetHeight = this.widgetHeight;

    // 最小单元格的尺寸
    this.cellOptions = {
      width: this.widgetWidth,
      height: this.widgetHeight
    };

    this.styleSheet.render({
      baseWidth: opts.widgetBaseDimensions[0],
      baseHeight: opts.widgetBaseDimensions[1]
    });

    this.draggable.resize({
      width: opts.width,
      height: opts.height
    });

    this.resizeable.setOption(Object.assign({}, opts, { widgetWidth, widgetHeight }));
  }

  initDraggable() {
    let self = this;
    let draggable_options = $.extend(true, {},
      this.options.draggable, {
        offset_left: this.options.widget.margins[0],
        offset_top: this.options.widget.margins[1],
        container_width: this.cols * this.widgetWidth,
        limit: true,
        start(event, ui) {
          self.$widgets.filter('.player-revert').removeClass('player-revert');
          self.$player = $(this);
          self.$helper = $(ui.$helper);
          self.helper = !self.$helper.is(self.$player);
          self.onStartDrag.call(self, event, ui);
          self.$el.trigger('gridster:dragstart');
        },
        stop: (event, ui) => {
          this.onDragStop.call(this, event, ui);
          this.$el.trigger('gridster:dragstop');
        },
        drag: throttle((event, ui) => {
          this.onDrag.call(this, event, ui);
          this.$el.trigger('gridster:drag');
        }, 60)
      });

    this.draggable = this.$el.drag(draggable_options);
    return this;
  }

  /**
   * Bind resize events to get resize working.
   *
   * @method resizable
   * @return {Class} Returns instance of gridster Class.
   */
  initResizable() {
    let options = this.options;
    options.onResize = (widget, sizex, sizey) => {
      this.resizeWidget(widget, sizex, sizey);
    };
    options.widgetWidth = this.widgetWidth;
    options.width = this.container_width;
    options.widgetHeight = this.widgetHeight;
    options.height = this.containerHeight;

    this.resizeable = new GridStackResizeable(this.$el, options);

    return this;
  }

  initWidgets() {
    let widgetsCoords = this.$widgets.map((i, widget) => {
      return this.domToCoords($(widget));
    });

    let changes = widgetsCoords.map((i, wgd) => {
      return this.registerWidget(wgd) || null;
    });

    if (changes.length) {
      this.$el.trigger('gridster:positionschanged');
    }

    return this;
  }

  enable() {
    this.draggable.enable();
    return this;
  }

  disable() {
    this.$wrapper.find('.player-revert').removeClass('player-revert');
    this.draggable.disable();
    return this;
  }

  disableResize() {
    this.$el.addClass('gs-resize-disabled');
    this.resizeable.disable();
    return this;
  }

  enableResize() {
    this.$el.removeClass('gs-resize-disabled');
    this.resizeable.enable();
    return this;
  }

  // 获取与组件重叠的其他组件
  getCrossedWidget(id) {
    if (!(id in this.widgets)) {
      return [];
    }

    let ary = [];
    let contrastWidget = this.widgets[id];

    for (let key in this.widgets) {
      if (key !== id) {
        let widget = this.widgets[key];

        //原先用的coords计算有问题,换成getBoundingClientRect
        let contrastRect = contrastWidget.$elem[0].getBoundingClientRect();
        let widgetRect = widget.$elem[0].getBoundingClientRect();
        contrastWidget.rect = {
          x1: contrastRect.left,
          x2: contrastRect.right,
          y1: contrastRect.top,
          y2: contrastRect.bottom
        };
        widget.rect = {
          x1: widgetRect.left,
          x2: widgetRect.right,
          y1: widgetRect.top,
          y2: widgetRect.bottom
        };

        if (isRectOverlap(contrastWidget.rect, widget.rect)) {
          ary.push(widget);
        }
      }
    }
    return ary;
  }

  getWidget(id) {
    return this.widgets[id];
  }

  // 获取组件的坐标
  getWidgetPosition(position, size) {
    let elRect = this.$el[0].getBoundingClientRect();
    let left = position.left - elRect.left;
    let top = position.top - elRect.top;

    let row = Math.floor(top / this.cellOptions.height);
    let col = Math.floor(left / this.cellOptions.width);

    return this.getCorrectColRow(col, row, size.sizex, size.sizey);
  }

  getCorrectColRow(col, row, sizex, sizey) {
    if (row < 0) {
      row = 0;
    }
    if (row >= this.options.rows - sizey) {
      row = this.options.rows - sizey + 1;
    }

    if (col < 0) {
      col = 0;
    }
    if (col >= this.options.cols - sizex) {
      col = this.options.cols - sizex + 1;
    }

    return { col, row };
  }

  // 克隆组件
  cloneWidget(data) {
  }

  setWidgetsZIndex(zIndexs) {
    for (let uid in zIndexs) {
      this.widgets[uid].setOption({ zIndex: zIndexs[uid] });
    }
  }

  /**
   * Destroy this gridster by removing any sign of its presence, making it easy to avoid memory leaks
   *
   * @method destroy
   * @param {Boolean} remove If true, remove gridster from DOM.
   * @return {Object} Returns the instance of the GridStack class.
   */
  destroy(remove) {
    this.$el.removeData('gridster');
    // remove bound callback on window resize
    $(window).unbind('.gridster');

    if (this.draggable) {
      this.draggable.destroy();
    }

    if (this.resizeable) {
      this.resizeable.destroy();
    }

    if (this.styleSheet) {
      this.styleSheet.destroy();
      this.styleSheet = null;
    }

    remove && this.$el.remove();
    return this;
  }

  getCoordsWithSize(size) {
    let col = Math.ceil((this.options.cols - size.x) / 2);
    let row = Math.ceil((this.options.rows - size.y) / 2);
    return { col, row };
  }

  generateStylesheet(opts) {
    opts || (opts = {});
    opts.cols || (opts.cols = this.cols);
    opts.rows || (opts.rows = this.rows);

    if (!this.styleSheet) {
      this.styleSheet = new StyleSheet({
        cols: opts.cols,
        rows: opts.rows,
        margins: this.options.widget.margins
      });
    }

    this.styleSheet.render({
      baseWidth: this.options.widgetBaseDimensions[0],
      baseHeight: this.options.widgetBaseDimensions[1]
    });
  }

  addWidget(sizex = 1, sizey = 1, html, col, row, max_size, min_size) {
    let pos;

    if (!col & !row) {
      pos = this.nextPosition(sizex, sizey);
    } else {
      pos = {
        col: col,
        row: row,
        sizex: sizex,
        sizey: sizey
      };

      this.empty_cells(col, row, sizex, sizey);
    }

    return new Promise(resolve => {
      setTimeout(() => {
        let $w = this.$el.find(html);
        this.$widgets = this.$widgets.add($w);
        this.registerWidget($w);
        this.add_faux_rows(pos.sizey);
        this.add_faux_cols(pos.sizex);

        this.draggable.set_limits(this.cols * this.widgetWidth);
        resolve();
      }, 1000);
    });
  }

  // 向上移动组件
  moveWidgetUp(id, col, row) {
    let widget = this.widgets[id];

    widget.updateCoords({
      grid: { col, row }
    });
  }

  // 移动组件
  moveWidget(id, col, row, sizex, sizey, dir) {
    let { cols, rows } = this.options;

    if (dir === 'up') {
      row = row - 1;

      if (row <= 0) {
        row = 1;
      }
    }

    if (dir === 'down') {
      row = row + 1;
      if (row > rows - sizey) {
        row = rows - sizey + 1;
      }
    }

    if (dir === 'left') {
      col = col - 1;

      if (col <= 0) {
        col = 1;
      }
    }

    if (dir === 'right') {
      col += 1;

      if (col > cols - sizex) {
        col = cols - sizex + 1;
      }
    }

    return { col, row };
  }

}

GridStack.defaults = defaults;

/** Instance Methods **/
let fn = GridStack.prototype;

/**
 * Add a new widget to the grid.
 *
 * @method add_widget
 * @param {String|HTMLElement} html The string representing the HTML of the widget
 *  or the HTMLElement.
 * @param {Number} [sizex] The nº of rows the widget occupies horizontally.
 * @param {Number} [sizey] The nº of columns the widget occupies vertically.
 * @param {Number} [col] The column the widget should start in.
 * @param {Number} [row] The row the widget should start in.
 * @param {Array} [max_size] max_size Maximun size (in units) for width and height.
 * @param {Array} [min_size] min_size Minimum size (in units) for width and height.
 * @return {HTMLElement} Returns the jQuery wrapped HTMLElement representing.
 *  the widget that was just created.
 */

/**
 * Append the resize handle into a widget.
 *
 * @method add_resize_handle
 * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
 *  representing the widget.
 * @return {HTMLElement} Returns instance of gridster Class.
 */
fn.add_resize_handle = function ($w) {
  // let append_to = this.options.resize.handle_append_to;
  // $(this.resize_handle_tpl).appendTo(append_to ? $(append_to, $w) : $w);
  return this;
};

/**
 * Change the size of a widget. Width is limited to the current grid width.
 *
 * @method resizeWidget
 * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
 *  representing the widget.
 * @param {Number} sizex The number of columns that will occupy the widget.
 *  By default <code>sizex</code> is limited to the space available from
 *  the column where the widget begins, until the last column to the right.
 * @param {Number} sizey The number of rows that will occupy the widget.
 * @param {Function} [callback] Function executed when the widget is removed.
 * @return {HTMLElement} Returns $widget.
 */
fn.resizeWidget = function ($widget, sizex, sizey, callback) {
  let wgd = $widget.coords().grid;
  let col = wgd.col;
  // let row = wgd.row;
  let maxCols = this.options.cols;
  let old_sizey = wgd.sizey;
  let old_col = wgd.col;
  // let new_col = old_col;

  sizex || (sizex = wgd.sizex);
  sizey || (sizey = wgd.sizey);

  if (maxCols !== Infinity) {
    sizex = Math.min(sizex, maxCols - col + 1);
  }

  if (sizey > old_sizey) {
    this.add_faux_rows(Math.max(sizey - old_sizey, 0));
  }

  let player_rcol = (col + sizex - 1);
  if (player_rcol > this.cols) {
    this.add_faux_cols(player_rcol - this.cols);
  }

  let new_grid_data = {
    col: wgd.col,
    row: wgd.row,
    sizex: sizex,
    sizey: sizey
  };

  this.mutateWidgetInGridmap($widget, wgd, new_grid_data);

  if (callback) {
    callback.call(this, new_grid_data.sizex, new_grid_data.sizey);
  }

  return $widget;
};

/**
 * Mutate widget dimensions and position in the grid map.
 *
 * @method mutateWidgetInGridmap
 * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
 *  representing the widget to mutate.
 * @param {Object} wgd Current widget grid data (col, row, sizex, sizey).
 * @param {Object} new_wgd New widget grid data.
 * @return {HTMLElement} Returns instance of gridster Class.
 */
fn.mutateWidgetInGridmap = function ($widget, wgd, new_wgd) {
  // let old_sizex = wgd.sizex;
  let old_sizey = wgd.sizey;

  let old_cells_occupied = this.get_cells_occupied(wgd);
  let new_cells_occupied = this.get_cells_occupied(new_wgd);

  let empty_cols = [];
  $.each(old_cells_occupied.cols, function (i, col) {
    if ($.inArray(col, new_cells_occupied.cols) === -1) {
      empty_cols.push(col);
    }
  });

  let occupied_cols = [];
  $.each(new_cells_occupied.cols, function (i, col) {
    if ($.inArray(col, old_cells_occupied.cols) === -1) {
      occupied_cols.push(col);
    }
  });

  let empty_rows = [];
  $.each(old_cells_occupied.rows, function (i, row) {
    if ($.inArray(row, new_cells_occupied.rows) === -1) {
      empty_rows.push(row);
    }
  });

  let occupied_rows = [];
  $.each(new_cells_occupied.rows, function (i, row) {
    if ($.inArray(row, old_cells_occupied.rows) === -1) {
      occupied_rows.push(row);
    }
  });

  this.remove_from_gridmap(wgd);

  if (occupied_cols.length) {
    let cols_to_empty = [
      new_wgd.col, new_wgd.row, new_wgd.sizex, Math.min(old_sizey, new_wgd.sizey), $widget
    ];
    this.empty_cells.apply(this, cols_to_empty);
  }

  if (occupied_rows.length) {
    let rows_to_empty = [new_wgd.col, new_wgd.row, new_wgd.sizex, new_wgd.sizey, $widget];
    this.empty_cells.apply(this, rows_to_empty);
  }

  // not the same that wgd = new_wgd;
  wgd.col = new_wgd.col;
  wgd.row = new_wgd.row;
  wgd.sizex = new_wgd.sizex;
  wgd.sizey = new_wgd.sizey;

  $widget.removeClass('player-revert');

  //update coords instance attributes
  $widget.data('coords').update({
    width: (new_wgd.sizex * this.options.widgetBaseDimensions[0] +
      ((new_wgd.sizex - 1) * this.options.widget.margins[0]) * 2),
    height: (new_wgd.sizey * this.options.widgetBaseDimensions[1] +
      ((new_wgd.sizey - 1) * this.options.widget.margins[1]) * 2)
  });

  $widget.attr({
    'data-col': new_wgd.col,
    'data-row': new_wgd.row,
    'data-sizex': new_wgd.sizex,
    'data-sizey': new_wgd.sizey
  });

  if (empty_cols.length) {
    let cols_to_remove_holes = [
      empty_cols[0], new_wgd.row,
      empty_cols.length,
      Math.min(old_sizey, new_wgd.sizey),
      $widget
    ];

    this.remove_empty_cells.apply(this, cols_to_remove_holes);
  }

  if (empty_rows.length) {
    let rows_to_remove_holes = [
      new_wgd.col, new_wgd.row, new_wgd.sizex, new_wgd.sizey, $widget
    ];
    this.remove_empty_cells.apply(this, rows_to_remove_holes);
  }

  // this.move_widget_up($widget);

  return this;
};

/**
 * Move down widgets in cells represented by the arguments col, row, sizex,
 * sizey
 *
 * @method empty_cells
 * @param {Number} col The column where the group of cells begin.
 * @param {Number} row The row where the group of cells begin.
 * @param {Number} sizex The number of columns that the group of cells
 * occupy.
 * @param {Number} sizey The number of rows that the group of cells
 * occupy.
 * @param {HTMLElement} $exclude Exclude widgets from being moved.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.empty_cells = function (col, row, sizex, sizey, $exclude) {
  let $nexts = this.widgets_below({
    col: col,
    row: row - sizey,
    sizex: sizex,
    sizey: sizey
  });

  $nexts.not($exclude).each((i, w) => {
    let wgd = $(w).coords().grid;
    if (!(wgd.row <= (row + sizey - 1))) {
      return;
    }
    let diff = (row + sizey) - wgd.row;
    this.move_widget_down($(w), diff);
  });

  return this;
};

/**
 * Move up widgets below cells represented by the arguments col, row, sizex,
 * sizey.
 *
 * @method remove_empty_cells
 * @param {Number} col The column where the group of cells begin.
 * @param {Number} row The row where the group of cells begin.
 * @param {Number} sizex The number of columns that the group of cells
 * occupy.
 * @param {Number} sizey The number of rows that the group of cells
 * occupy.
 * @param {HTMLElement} exclude Exclude widgets from being moved.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.remove_empty_cells = function (col, row, sizex, sizey, exclude) {
  let $nexts = this.widgets_below({
    col: col,
    row: row,
    sizex: sizex,
    sizey: sizey
  });

  $nexts.not(exclude).each((i, widget) => {
    this.move_widget_up($(widget), sizey);
  });

  return this;
};

/**
 * Get the most left column below to add a new widget.
 *
 * @method nextPosition
 * @param {Number} sizex The nº of rows the widget occupies horizontally.
 * @param {Number} sizey The nº of columns the widget occupies vertically.
 * @return {Object} Returns a grid coords object representing the future
 *  widget coords.
 */
fn.nextPosition = function (sizex, sizey) {
  sizex || (sizex = 1);
  sizey || (sizey = 1);
  let ga = this.gridmap;
  let cols_l = ga.length;
  let valid_pos = [];
  let rows_l;

  for (let c = 1; c < cols_l; c++) {
    rows_l = ga[c].length;
    for (let r = 1; r <= rows_l; r++) {
      let can_move_to = this.can_move_to({
        sizex: sizex,
        sizey: sizey
      }, c, r);

      if (can_move_to) {
        valid_pos.push({
          col: c,
          row: r,
          sizey: sizey,
          sizex: sizex
        });
      }
    }
  }

  if (valid_pos.length) {
    return valid_pos[0];
  }
  return false;
};

/**
 * Convert widgets from DOM elements to "widget grid data" Objects.
 *
 * @method domToCoords
 * @param {HTMLElement} $widget The widget to be converted.
 */
fn.domToCoords = function ($widget) {
  return {
    'col': parseInt($widget.attr('data-col'), 10),
    'row': parseInt($widget.attr('data-row'), 10),
    'sizex': parseInt($widget.attr('data-sizex'), 10) || 1,
    'sizey': parseInt($widget.attr('data-sizey'), 10) || 1,
    'max_sizex': parseInt($widget.attr('data-max-sizex'), 10) || false,
    'max_sizey': parseInt($widget.attr('data-max-sizey'), 10) || false,
    'min_sizex': parseInt($widget.attr('data-min-sizex'), 10) || false,
    'min_sizey': parseInt($widget.attr('data-min-sizey'), 10) || false,
    'el': $widget
  };
};

/**
 * Creates the grid coords object representing the widget an add it to the
 * mapped array of positions.
 *
 * @method registerWidget
 * @param {HTMLElement|Object} $el jQuery wrapped HTMLElement representing
 *  the widget, or an "widget grid data" Object with (col, row, el ...).
 * @return {Boolean} Returns true if the widget final position is different
 *  than the original.
 */
fn.registerWidget = function ($el) {
  let isDOM = !$.isPlainObject($el);
  let wgd = isDOM ? this.domToCoords($el) : $el;
  let posChanged = false;
  isDOM || ($el = wgd.el);

  // attach Coord object to player data-coord attribute
  $el.data('coords', $el.coords());
  // Extend Coord object with grid position info
  $el.data('coords').grid = wgd;

  this.options.resize.enabled && this.add_resize_handle($el);

  let coords = Object.assign({}, $el.coords().coords);
  let grid = Object.assign({}, $el.coords().grid);
  delete coords.el;
  delete grid.el;
  let uid = $el.data('id');
  let zIndex = $el.css('z-index');

  this.widgets[uid] = new Widget($el, { uid, grid, coords, zIndex });
  return posChanged;
};

/**
 * Update in the mapped array of positions the value of cells represented by
 * the grid coords object passed in the `grid_data` param.
 *
 * @param {Object} grid_data The grid coords object representing the cells
 *  to update in the mapped array.
 * @param {HTMLElement|Boolean} value Pass `false` or the jQuery wrapped
 *  HTMLElement, depends if you want to delete an existing position or add
 *  a new one.
 * @method update_widget_position
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.update_widget_position = function (grid_data, value) {
  this.for_each_cell_occupied(grid_data, function (col, row) {
    if (!this.gridmap[col]) {
      return this;
    }
    this.gridmap[col][row] = value;
  });
  return this;
};

/**
 * Remove a widget from the mapped array of positions.
 *
 * @method remove_from_gridmap
 * @param {Object} grid_data The grid coords object representing the cells
 *  to update in the mapped array.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.remove_from_gridmap = function (grid_data) {
  return this.update_widget_position(grid_data, false);
};

/**
 * Setup things required for resizing. Like build templates for drag handles.
 *
 * @method setup_resize
 * @return {Class} Returns instance of gridster Class.
 */
fn.setup_resize = function () {
  this.resize_handle_class = this.options.resize.handle_class;
  // let axes = this.options.resize.axes;
  // let handle_tpl = '<span class="' + this.resize_handle_class + ' ' +
  //   this.resize_handle_class + '-{type}" />';

  // this.resize_handle_tpl = $.map(axes, function (type) {
  //   return handle_tpl.replace('{type}', type);
  // }).join('');

  if ($.isArray(this.options.draggable.ignore_dragging)) {
    this.options.draggable.ignore_dragging.push('.' + this.resize_handle_class);
    this.options.draggable.ignore_dragging.push('.node-connect-point');
  }

  return this;
};

/**
 * This function is executed when the player begins to be dragged.
 *
 * @method onStartDrag
 * @param {Event} event The original browser event
 * @param {Object} ui A prepared ui object with useful drag-related data
 */
fn.onStartDrag = function (event, ui) {
  // this.$helper.add(this.$player).add(this.$wrapper).addClass('dragging');
  this.highest_col = this.getHighestOccupiedCell().col;

  this.$player.addClass('player');
  this.player_grid_data = this.$player.coords().grid;
  this.placeholder_grid_data = $.extend({}, this.player_grid_data);

  /*
  let pgd_sizex = this.player_grid_data.sizex;
  let cols_diff = this.cols - this.highest_col;

  if (this.options.autogrow_cols && cols_diff <= pgd_sizex) {
    this.add_faux_cols(Math.min(pgd_sizex - cols_diff, 1));
  }
  */

  let colliders = this.faux_grid;
  let coords = this.$player.data('coords').coords;

  if (this.player_grid_data) {
    this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);
  }
  if (this.placeholder_grid_data) {
    this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data);
  }

  this.last_cols = [];
  this.last_rows = [];

  // see jquery.collision.js
  this.collision_api = this.$helper.collision && this.$helper.collision(colliders);

  this.$preview_holder = $('<' + this.$player.get(0).tagName + ' />', {
    'class': 'preview-holder',
    'data-row': this.$player.attr('data-row'),
    'data-col': this.$player.attr('data-col'),
    css: {
      width: coords.width,
      height: coords.height
    }
  }).appendTo(this.$el);

  if (this.options.draggable.start) {
    this.options.draggable.start.call(this, event, ui);
  }
};

/**
 * This function is executed when the player is being dragged.
 *
 * @method onDrag
 * @param {Event} event The original browser event
 * @param {Object} ui A prepared ui object with useful drag-related data
 */
fn.onDrag = function (event, ui) {
  //break if dragstop has been fired
  if (this.$player === null) {
    return false;
  }

  // let abs_offset = {
  //   left: ui.position.left + this.baseX,
  //   top: ui.position.top + this.baseY
  // };

  if (this.helper && this.$player) {
    this.$player.css({
      'left': ui.position.left,
      'top': ui.position.top
    });
  }

  if (this.options.draggable.drag) {
    this.options.draggable.drag.call(this, event, ui);
  }
};

/**
 * This function is executed when the player stops being dragged.
 *
 * @method onDragStop
 * @param {Event} event The original browser event
 * @param {Object} ui A prepared ui object with useful drag-related data
 */
fn.onDragStop = function (event, ui) {
  this.$helper.add(this.$player).add(this.$wrapper)
    .removeClass('dragging');

  let { left, top } = ui.position;
  ui.position.left = ui.position.left + this.baseX;
  ui.position.top = ui.position.top + this.baseY;

  let col = Math.floor(left / this.cellOptions.width);
  let row = Math.floor(top / this.cellOptions.height);
  col += 1;
  row += 1;

  /*
   let col = this.player_grid_data.col
   let row = this.player_grid_data.row
   */
  this.$player.addClass('player-revert').removeClass('player')
    .attr({ 'data-col': col, 'data-row': row })
    .css({ 'left': '', 'top': '' });

  // this.$changed = this.$changed.add(this.$player);

  // this.cells_occupied_by_player = this.get_cells_occupied(
  // this.placeholder_grid_data);
  // this.set_cells_player_occupies(this.placeholder_grid_data.col, row);

  this.$player.coords().grid.row = row;
  this.$player.coords().grid.col = col;

  if (this.options.draggable.stop) {
    this.options.draggable.stop.call(this, event, ui, {
      id: this.$player.data('id'),
      row, col
    });
  }

  this.$preview_holder.remove();

  // debug.log(`移动组件 id ${this.$player.attr('data-id')} 到 col:${col}, row:${row}`)

  let uid = this.$player.data('id');

  this.widgets[uid].updateCoords({
    grid: { col, row },
    coords: this.$player.coords().coords
  });

  this.$player = null;
  this.$helper = null;
  this.placeholder_grid_data = {};
  this.player_grid_data = {};
  this.cells_occupied_by_placeholder = {};
  this.cells_occupied_by_player = {};

  if (this.options.autogrow_cols) {
    this.draggable.set_limits(this.cols * this.widgetWidth);
  }
};

/**
 * Sorts an Array of grid coords objects (representing the grid coords of
 * each widget) in descending way.
 *
 * @method manage_movements
 * @param {jQuery} $widgets A jQuery collection of HTMLElements
 *  representing the widgets you want to move.
 * @param {Number} to_col The column to which we want to move the widgets.
 * @param {Number} to_row The row to which we want to move the widgets.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.manage_movements = function ($widgets, to_col, to_row) {
  $.each($widgets, $.proxy(function (i, w) {
    let wgd = w;
    let $w = wgd.el;
    let can_go_widget_up = this.can_go_widget_up(wgd);

    if (can_go_widget_up) {
      //target CAN go up
      //so move widget up
      this.move_widget_to($w, can_go_widget_up);
      this.set_placeholder(to_col, can_go_widget_up + wgd.sizey);
    } else {
      //target can't go up
      let can_go_player_up = this.can_go_player_up(
        this.player_grid_data);

      if (!can_go_player_up) {
        // target can't go up
        // player cant't go up
        // so we need to move widget down to a position that dont
        // overlaps player
        let y = (to_row + this.player_grid_data.sizey) - wgd.row;

        this.move_widget_down($w, y);
        this.set_placeholder(to_col, to_row);
      }
    }
  }, this));

  return this;
};

/**
 * Determines if there is a widget in the row and col given. Or if the
 * HTMLElement passed as first argument is the player.
 *
 * @method is_player
 * @param {Number|HTMLElement} col_or_el A jQuery wrapped collection of
 * HTMLElements.
 * @param {Number} [row] The column to which we want to move the widgets.
 * @return {Boolean} Returns true or false.
 */
fn.is_player = function (col_or_el, row) {
  if (row && !this.gridmap[col_or_el]) {
    return false;
  }
  let $w = row ? this.gridmap[col_or_el][row] : col_or_el;
  return $w && ($w.is(this.$player) || $w.is(this.$helper));
};

/**
 * Determines if the widget that is being dragged is currently over the row
 * and col given.
 *
 * @method is_player_in
 * @param {Number} col The column to check.
 * @param {Number} row The row to check.
 * @return {Boolean} Returns true or false.
 */
fn.is_player_in = function (col, row) {
  let c = this.cells_occupied_by_player || {};
  return $.inArray(col, c.cols) >= 0 && $.inArray(row, c.rows) >= 0;
};

/**
 * Determines if the placeholder is currently over the row and col given.
 *
 * @method is_placeholder_in
 * @param {Number} col The column to check.
 * @param {Number} row The row to check.
 * @return {Boolean} Returns true or false.
 */
fn.is_placeholder_in = function (col, row) {
  let c = this.cells_occupied_by_placeholder || {};
  return this.is_placeholder_in_col(col) && $.inArray(row, c.rows) >= 0;
};

/**
 * Determines if the placeholder is currently over the column given.
 *
 * @method is_placeholder_in_col
 * @param {Number} col The column to check.
 * @return {Boolean} Returns true or false.
 */
fn.is_placeholder_in_col = function (col) {
  let c = this.cells_occupied_by_placeholder || [];
  return $.inArray(col, c.cols) >= 0;
};

/**
 * Determines if the cell represented by col and row params is empty.
 *
 * @method is_empty
 * @param {Number} col The column to check.
 * @param {Number} row The row to check.
 * @return {Boolean} Returns true or false.
 */
fn.is_empty = function (col, row) {
  if (typeof this.gridmap[col] !== 'undefined') {
    return typeof this.gridmap[col][row] !== 'undefined' && this.gridmap[col][row] === false;
  }
  return true;
};

/**
 * Determines if the cell represented by col and row params is occupied.
 *
 * @method is_occupied
 * @param {Number} col The column to check.
 * @param {Number} row The row to check.
 * @return {Boolean} Returns true or false.
 */
fn.is_occupied = function (col, row) {
  if (!this.gridmap[col]) {
    return false;
  }

  return this.gridmap[col][row];
};

/**
 * Determines if there is a widget in the cell represented by col/row params.
 *
 * @method is_widget
 * @param {Number} col The column to check.
 * @param {Number} row The row to check.
 * @return {Boolean|HTMLElement} Returns false if there is no widget,
 * else returns the jQuery HTMLElement
 */
fn.is_widget = function (col, row) {
  let cell = this.gridmap[col];
  if (!cell) {
    return false;
  }

  cell = cell[row];

  if (cell) {
    return cell;
  }

  return false;
};

/**
 * Determines if there is a widget in the cell represented by col/row
 * params and if this is under the widget that is being dragged.
 *
 * @method is_widget_under_player
 * @param {Number} col The column to check.
 * @param {Number} row The row to check.
 * @return {Boolean} Returns true or false.
 */
fn.is_widget_under_player = function (col, row) {
  if (this.is_widget(col, row)) {
    return this.is_player_in(col, row);
  }
  return false;
};

/**
 * Get widgets overlapping with the player or with the object passed
 * representing the grid cells.
 *
 * @method get_widgets_under_player
 * @return {HTMLElement} Returns a jQuery collection of HTMLElements
 */
fn.get_widgets_under_player = function (cells) {
  cells || (cells = this.cells_occupied_by_player || {
    cols: [],
    rows: []
  });
  let $widgets = $([]);

  $.each(cells.cols, $.proxy(function (i, col) {
    $.each(cells.rows, $.proxy(function (i, row) {
      if (this.is_widget(col, row)) {
        $widgets = $widgets.add(this.gridmap[col][row]);
      }
    }, this));
  }, this));

  return $widgets;
};

/**
 * Put placeholder at the row and column specified.
 *
 * @method set_placeholder
 * @param {Number} col The column to which we want to move the
 *  placeholder.
 * @param {Number} row The row to which we want to move the
 *  placeholder.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.set_placeholder = function (col, row) {
  let phgd = $.extend({}, this.placeholder_grid_data);
  let $nexts = this.widgets_below({
    col: phgd.col,
    row: phgd.row,
    sizey: phgd.sizey,
    sizex: phgd.sizex
  });

  // Prevents widgets go out of the grid
  let right_col = (col + phgd.sizex - 1);
  if (right_col > this.cols) {
    col = col - (right_col - col);
  }

  let moved_down = this.placeholder_grid_data.row < row;
  let changed_column = this.placeholder_grid_data.col !== col;

  this.placeholder_grid_data.col = col;
  this.placeholder_grid_data.row = row;

  this.cells_occupied_by_placeholder = this.get_cells_occupied(
    this.placeholder_grid_data);

  this.$preview_holder.attr({
    'data-row': row,
    'data-col': col
  });

  if (moved_down || changed_column) {
    $nexts.each($.proxy(function (i, widget) {
      this.move_widget_up(
        $(widget), this.placeholder_grid_data.col - col + phgd.sizey);
    }, this));
  }

  let $widgets_under_ph = this.get_widgets_under_player(
    this.cells_occupied_by_placeholder);

  if ($widgets_under_ph.length) {
    $widgets_under_ph.each($.proxy(function (i, widget) {
      let $w = $(widget);
      this.move_widget_down(
        $w, row + phgd.sizey - $w.data('coords').grid.row);
    }, this));
  }

};

/**
 * Determines whether the player can move to a position above.
 *
 * @method can_go_player_up
 * @param {Object} widget_grid_data The actual grid coords object of the
 *  player.
 * @return {Number|Boolean} If the player can be moved to an upper row
 *  returns the row number, else returns false.
 */
fn.can_go_player_up = function (widget_grid_data) {
  let p_bottom_row = widget_grid_data.row + widget_grid_data.sizey - 1;
  let result = true;
  let upper_rows = [];
  let min_row = 10000;
  let $widgets_under_player = this.get_widgets_under_player();

  /* generate an array with columns as index and array with upper rows
   * empty as value */
  this.for_each_column_occupied(widget_grid_data, function (tcol) {
    let grid_col = this.gridmap[tcol];
    let r = p_bottom_row + 1;
    upper_rows[tcol] = [];

    while (--r > 0) {
      if (this.is_empty(tcol, r) || this.is_player(tcol, r) ||
        this.is_widget(tcol, r) &&
        grid_col[r].is($widgets_under_player)
      ) {
        upper_rows[tcol].push(r);
        min_row = r < min_row ? r : min_row;
      } else {
        break;
      }
    }

    if (upper_rows[tcol].length === 0) {
      result = false;
      return true; //break
    }

    upper_rows[tcol].sort(function (a, b) {
      return a - b;
    });
  });

  if (!result) {
    return false;
  }

  return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
};

/**
 * Determines whether a widget can move to a position above.
 *
 * @method can_go_widget_up
 * @param {Object} widget_grid_data The actual grid coords object of the
 *  widget we want to check.
 * @return {Number|Boolean} If the widget can be moved to an upper row
 *  returns the row number, else returns false.
 */
fn.can_go_widget_up = function (widget_grid_data) {
  let p_bottom_row = widget_grid_data.row + widget_grid_data.sizey - 1;
  let result = true;
  let upper_rows = [];
  let min_row = 10000;

  /* generate an array with columns as index and array with topmost rows
   * empty as value */
  this.for_each_column_occupied(widget_grid_data, function (tcol) {
    let grid_col = this.gridmap[tcol];
    upper_rows[tcol] = [];

    let r = p_bottom_row + 1;
    // iterate over each row
    while (--r > 0) {
      if (this.is_widget(tcol, r) && !this.is_player_in(tcol, r)) {
        if (!grid_col[r].is(widget_grid_data.el)) {
          break;
        }
      }

      if (!this.is_player(tcol, r) && !this.is_placeholder_in(tcol, r) && !this.is_player_in(tcol, r)) {
        upper_rows[tcol].push(r);
      }

      if (r < min_row) {
        min_row = r;
      }
    }

    if (upper_rows[tcol].length === 0) {
      result = false;
      return true; //break
    }

    upper_rows[tcol].sort(function (a, b) {
      return a - b;
    });
  });

  if (!result) {
    return false;
  }

  return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
};

/**
 * Search a valid row for the widget represented by `widget_grid_data' in
 * the `upper_rows` array. Iteration starts from row specified in `min_row`.
 *
 * @method get_valid_rows
 * @param {Object} widget_grid_data The actual grid coords object of the
 *  player.
 * @param {Array} upper_rows An array with columns as index and arrays
 *  of valid rows as values.
 * @param {Number} min_row The upper row from which the iteration will start.
 * @return {Number|Boolean} Returns the upper row valid from the `upper_rows`
 *  for the widget in question.
 */
fn.get_valid_rows = function (widget_grid_data, upper_rows, min_row) {
  let p_top_row = widget_grid_data.row;
  let p_bottom_row = widget_grid_data.row + widget_grid_data.sizey - 1;
  let sizey = widget_grid_data.sizey;
  let r = min_row - 1;
  let valid_rows = [];

  while (++r <= p_bottom_row) {
    let common = true;
    $.each(upper_rows, function (col, rows) {
      if ($.isArray(rows) && $.inArray(r, rows) === -1) {
        common = false;
      }
    });

    if (common === true) {
      valid_rows.push(r);
      if (valid_rows.length === sizey) {
        break;
      }
    }
  }

  let new_row = false;
  if (sizey === 1) {
    if (valid_rows[0] !== p_top_row) {
      new_row = valid_rows[0] || false;
    }
  } else {
    if (valid_rows[0] !== p_top_row) {
      new_row = this.get_consecutive_numbers_index(valid_rows, sizey);
    }
  }

  return new_row;
};

fn.get_consecutive_numbers_index = function (arr, sizey) {
  let max = arr.length;
  let result = [];
  let first = true;
  let prev = -1; // or null?

  for (let i = 0; i < max; i++) {
    if (first || arr[i] === prev + 1) {
      result.push(i);
      if (result.length === sizey) {
        break;
      }
      first = false;
    } else {
      result = [];
      first = true;
    }

    prev = arr[i];
  }

  return result.length >= sizey ? arr[result[0]] : false;
};

/**
 * Get widgets overlapping with the player.
 *
 * @method get_widgets_overlapped
 * @return {jQuery} Returns a jQuery collection of HTMLElements.
 */
fn.get_widgets_overlapped = function () {
  // let $w;
  let $widgets = $([]);
  let used = [];
  let rows_from_bottom = this.cells_occupied_by_player.rows.slice(0);
  rows_from_bottom.reverse();

  $.each(this.cells_occupied_by_player.cols, $.proxy(function (i, col) {
    $.each(rows_from_bottom, $.proxy(function (i, row) {
      // if there is a widget in the player position
      if (!this.gridmap[col]) {
        return true;
      } //next iteration
      let $w = this.gridmap[col][row];
      if (this.is_occupied(col, row) && !this.is_player($w) &&
        $.inArray($w, used) === -1
      ) {
        $widgets = $widgets.add($w);
        used.push($w);
      }

    }, this));
  }, this));

  return $widgets;
};

/**
 * Move a widget to a specific row. The cell or cells must be empty.
 * If the widget has widgets below, all of these widgets will be moved also
 * if they can.
 *
 * @method move_widget_to
 * @param {HTMLElement} $widget The jQuery wrapped HTMLElement of the
 * widget is going to be moved.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.move_widget_to = function ($widget, row) {
  let self = this;
  let widget_grid_data = $widget.coords().grid;
  // let diff = row - widget_grid_data.row;
  let $next_widgets = this.widgets_below($widget);

  let can_move_to_new_cell = this.can_move_to(
    widget_grid_data, widget_grid_data.col, row, $widget);

  if (can_move_to_new_cell === false) {
    return false;
  }

  this.remove_from_gridmap(widget_grid_data);
  widget_grid_data.row = row;
  $widget.attr('data-row', row);
  this.$changed = this.$changed.add($widget);

  $next_widgets.each(function (i, widget) {
    let $w = $(widget);
    let wgd = $w.coords().grid;
    let can_go_up = self.can_go_widget_up(wgd);
    if (can_go_up && can_go_up !== wgd.row) {
      self.move_widget_to($w, can_go_up);
    }
  });

  return this;
};

/**
 * Move up the specified widget and all below it.
 *
 * @method move_widget_up
 * @param {HTMLElement} $widget The widget you want to move.
 * @param {Number} [y_units] The number of cells that the widget has to move.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.move_widget_up = function ($widget, y_units) {
  let el_grid_data = $widget.coords().grid;
  let actual_row = el_grid_data.row;
  let moved = [];
  // let can_go_up = true;
  y_units || (y_units = 1);

  if (!this.can_go_up($widget)) {
    return false;
  } //break;

  this.for_each_column_occupied(el_grid_data, function (col) {
    // can_go_up
    if ($.inArray($widget, moved) === -1) {
      let widget_grid_data = $widget.coords().grid;
      let next_row = actual_row - y_units;
      next_row = this.can_go_up_to_row(widget_grid_data, col, next_row);

      if (!next_row) {
        return true;
      }

      let $next_widgets = this.widgets_below($widget);

      this.remove_from_gridmap(widget_grid_data);
      widget_grid_data.row = next_row;
      $widget.attr('data-row', widget_grid_data.row);
      this.$changed = this.$changed.add($widget);

      moved.push($widget);

      $next_widgets.each($.proxy(function (i, widget) {
        this.move_widget_up($(widget), y_units);
      }, this));
    }
  });

};

/**
 * Move down the specified widget and all below it.
 *
 * @method move_widget_down
 * @param {jQuery} $widget The jQuery object representing the widget
 *  you want to move.
 * @param {Number} y_units The number of cells that the widget has to move.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.move_widget_down = function ($widget, y_units) {
  let el_grid_data, actual_row, moved, y_diff;

  if (y_units <= 0) {
    return false;
  }

  el_grid_data = $widget.coords().grid;
  actual_row = el_grid_data.row;
  moved = [];
  y_diff = y_units;

  if (!$widget) {
    return false;
  }

  if ($.inArray($widget, moved) === -1) {
    let widget_grid_data = $widget.coords().grid;
    let next_row = actual_row + y_units;
    let $next_widgets = this.widgets_below($widget);

    this.remove_from_gridmap(widget_grid_data);

    $next_widgets.each($.proxy(function (i, widget) {
      let $w = $(widget);
      let wd = $w.coords().grid;
      let tmp_y = this.displacement_diff(
        wd, widget_grid_data, y_diff);

      if (tmp_y > 0) {
        this.move_widget_down($w, tmp_y);
      }
    }, this));

    widget_grid_data.row = next_row;
    this.update_widget_position(widget_grid_data, $widget);
    $widget.attr('data-row', widget_grid_data.row);
    this.$changed = this.$changed.add($widget);

    moved.push($widget);
  }
};

/**
 * Check if the widget can move to the specified row, else returns the
 * upper row possible.
 *
 * @method can_go_up_to_row
 * @param {Number} widget_grid_data The current grid coords object of the
 *  widget.
 * @param {Number} col The target column.
 * @param {Number} row The target row.
 * @return {Boolean|Number} Returns the row number if the widget can move
 *  to the target position, else returns false.
 */
fn.can_go_up_to_row = function (widget_grid_data, col, row) {
  // let ga = this.gridmap;
  let result = true;
  let urc = []; // upper_rows_in_columns
  let actual_row = widget_grid_data.row;
  let r;

  /* generate an array with columns as index and array with
   * upper rows empty in the column */
  this.for_each_column_occupied(widget_grid_data, function (tcol) {
    // let grid_col = ga[tcol];

    urc[tcol] = [];
    r = actual_row;

    while (r--) {
      if (this.is_empty(tcol, r) && !this.is_placeholder_in(tcol, r)) {
        urc[tcol].push(r);
      } else {
        break;
      }
    }

    if (!urc[tcol].length) {
      result = false;
      return true;
    }

  });

  if (!result) {
    return false;
  }

  /* get common rows starting from upper position in all the columns
   * that widget occupies */
  r = row;
  for (r = 1; r < actual_row; r++) {
    let common = true;

    for (let uc = 0, ucl = urc.length; uc < ucl; uc++) {
      if (urc[uc] && $.inArray(r, urc[uc]) === -1) {
        common = false;
      }
    }

    if (common === true) {
      result = r;
      break;
    }
  }

  return result;
};

fn.displacement_diff = function (widget_grid_data, parent_bgd, y_units) {
  let actual_row = widget_grid_data.row;
  let diffs = [];
  let parent_max_y = parent_bgd.row + parent_bgd.sizey;

  this.for_each_column_occupied(widget_grid_data, function (col) {
    let temp_y_units = 0;

    for (let r = parent_max_y; r < actual_row; r++) {
      if (this.is_empty(col, r)) {
        temp_y_units = temp_y_units + 1;
      }
    }

    diffs.push(temp_y_units);
  });

  let max_diff = Math.max.apply(Math, diffs);
  y_units = (y_units - max_diff);

  return y_units > 0 ? y_units : 0;
};

/**
 * Get widgets below a widget.
 *
 * @method widgets_below
 * @param {HTMLElement} $el The jQuery wrapped HTMLElement.
 * @return {jQuery} A jQuery collection of HTMLElements.
 */
fn.widgets_below = function ($el) {
  let el_grid_data = $.isPlainObject($el) ? $el : $el.coords().grid;
  let self = this;
  // let ga = this.gridmap;
  let next_row = el_grid_data.row + el_grid_data.sizey - 1;
  let $nexts = $([]);

  this.for_each_column_occupied(el_grid_data, function (col) {
    self.for_each_widget_below(col, next_row, function (tcol, trow) {
      if (!self.is_player(this) && $.inArray(this, $nexts) === -1) {
        $nexts = $nexts.add(this);
        return true; // break
      }
    });
  });

  return $nexts;
};

/**
 * Remove from the array of mapped positions the reference to the player.
 *
 * @method empty_cells_player_occupies
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.empty_cells_player_occupies = function () {
  this.remove_from_gridmap(this.placeholder_grid_data);
  return this;
};

fn.can_go_up = function ($el) {
  let el_grid_data = $el.coords().grid;
  let initial_row = el_grid_data.row;
  let prev_row = initial_row - 1;
  // let ga = this.gridmap;
  // let upper_rows_by_column = [];

  let result = true;
  if (initial_row === 1) {
    return false;
  }

  this.for_each_column_occupied(el_grid_data, function (col) {
    // let $w = this.is_widget(col, prev_row);

    if (this.is_occupied(col, prev_row) ||
      this.is_player(col, prev_row) ||
      this.is_placeholder_in(col, prev_row) ||
      this.is_player_in(col, prev_row)
    ) {
      result = false;
      return true; //break
    }
  });

  return result;
};

/**
 * Check if it's possible to move a widget to a specific col/row. It takes
 * into account the dimensions (`sizey` and `sizex` attrs. of the grid
 *  coords object) the widget occupies.
 *
 * @method can_move_to
 * @param {Object} widget_grid_data The grid coords object that represents
 *  the widget.
 * @param {Object} col The col to check.
 * @param {Object} row The row to check.
 * @param {Number} [max_row] The max row allowed.
 * @return {Boolean} Returns true if all cells are empty, else return false.
 */
fn.can_move_to = function (widget_grid_data, col, row, max_row) {
  // let ga = this.gridmap;
  let $w = widget_grid_data.el;
  let future_wd = {
    sizey: widget_grid_data.sizey,
    sizex: widget_grid_data.sizex,
    col: col,
    row: row
  };
  let result = true;

  //Prevents widgets go out of the grid
  let right_col = col + widget_grid_data.sizex - 1;
  if (right_col > this.cols) {
    return false;
  }

  if (max_row && max_row < row + widget_grid_data.sizey - 1) {
    return false;
  }

  this.for_each_cell_occupied(future_wd, function (tcol, trow) {
    let $tw = this.is_widget(tcol, trow);
    if ($tw && (!widget_grid_data.el || $tw.is($w))) {
      result = false;
    }
  });

  return result;
};

/**
 * Given the leftmost column returns all columns that are overlapping
 *  with the player.
 *
 * @method get_targeted_columns
 * @param {Number} [from_col] The leftmost column.
 * @return {Array} Returns an array with column numbers.
 */
fn.get_targeted_columns = function (from_col) {
  let max = (from_col || this.player_grid_data.col) +
    (this.player_grid_data.sizex - 1);
  let cols = [];
  for (let col = from_col; col <= max; col++) {
    cols.push(col);
  }
  return cols;
};

/**
 * Given the upper row returns all rows that are overlapping with the player.
 *
 * @method get_targeted_rows
 * @param {Number} [from_row] The upper row.
 * @return {Array} Returns an array with row numbers.
 */
fn.get_targeted_rows = function (from_row) {
  let max = (from_row || this.player_grid_data.row) +
    (this.player_grid_data.sizey - 1);
  let rows = [];
  for (let row = from_row; row <= max; row++) {
    rows.push(row);
  }
  return rows;
};

/**
 * Get all columns and rows that a widget occupies.
 *
 * @method get_cells_occupied
 * @param {Object} el_grid_data The grid coords object of the widget.
 * @return {Object} Returns an object like `{ cols: [], rows: []}`.
 */
fn.get_cells_occupied = function (el_grid_data) {
  let cells = {
    cols: [],
    rows: []
  };
  let i;
  if (arguments[1] instanceof $) {
    el_grid_data = arguments[1].coords().grid;
  }

  for (i = 0; i < el_grid_data.sizex; i++) {
    let col = el_grid_data.col + i;
    cells.cols.push(col);
  }

  for (i = 0; i < el_grid_data.sizey; i++) {
    let row = el_grid_data.row + i;
    cells.rows.push(row);
  }

  return cells;
};

/**
 * Iterate over the cells occupied by a widget executing a function for
 * each one.
 *
 * @method for_each_cell_occupied
 * @param {Object} el_grid_data The grid coords object that represents the
 *  widget.
 * @param {Function} callback The function to execute on each column
 *  iteration. Column and row are passed as arguments.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.for_each_cell_occupied = function (grid_data, callback) {
  this.for_each_column_occupied(grid_data, function (col) {
    this.for_each_row_occupied(grid_data, function (row) {
      callback.call(this, col, row);
    });
  });
  return this;
};

/**
 * Iterate over the columns occupied by a widget executing a function for
 * each one.
 *
 * @method for_each_column_occupied
 * @param {Object} el_grid_data The grid coords object that represents
 *  the widget.
 * @param {Function} callback The function to execute on each column
 *  iteration. The column number is passed as first argument.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.for_each_column_occupied = function (el_grid_data, callback) {
  for (let i = 0; i < el_grid_data.sizex; i++) {
    let col = el_grid_data.col + i;
    callback.call(this, col, el_grid_data);
  }
};

/**
 * Iterate over the rows occupied by a widget executing a function for
 * each one.
 *
 * @method for_each_row_occupied
 * @param {Object} el_grid_data The grid coords object that represents
 *  the widget.
 * @param {Function} callback The function to execute on each column
 *  iteration. The row number is passed as first argument.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.for_each_row_occupied = function (el_grid_data, callback) {
  for (let i = 0; i < el_grid_data.sizey; i++) {
    let row = el_grid_data.row + i;
    callback.call(this, row, el_grid_data);
  }
};

fn._traversing_widgets = function (type, direction, col, row, callback) {
  let ga = this.gridmap;
  if (!ga[col]) {
    return;
  }

  let cr, max;
  let action = type + '/' + direction;
  if (arguments[2] instanceof $) {
    let el_grid_data = arguments[2].coords().grid;
    col = el_grid_data.col;
    row = el_grid_data.row;
    callback = arguments[3];
  }

  let matched = [];
  let trow = row;

  let methods = {
    'for_each/above': function () {
      while (trow--) {
        if (trow > 0 && this.is_widget(col, trow) &&
          $.inArray(ga[col][trow], matched) === -1
        ) {
          cr = callback.call(ga[col][trow], col, trow);
          matched.push(ga[col][trow]);
          if (cr) {
            break;
          }
        }
      }
    },
    'for_each/below': function () {
      for (trow = row + 1, max = ga[col].length; trow < max; trow++) {
        if (this.is_widget(col, trow) &&
          $.inArray(ga[col][trow], matched) === -1
        ) {
          cr = callback.call(ga[col][trow], col, trow);
          matched.push(ga[col][trow]);
          if (cr) {
            break;
          }
        }
      }
    }
  };

  if (methods[action]) {
    methods[action].call(this);
  }
};

/**
 * Iterate over each widget above the column and row specified.
 *
 * @method for_each_widget_above
 * @param {Number} col The column to start iterating.
 * @param {Number} row The row to start iterating.
 * @param {Function} callback The function to execute on each widget
 *  iteration. The value of `this` inside the function is the jQuery
 *  wrapped HTMLElement.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.for_each_widget_above = function (col, row, callback) {
  this._traversing_widgets('for_each', 'above', col, row, callback);
  return this;
};

/**
 * Iterate over each widget below the column and row specified.
 *
 * @method for_each_widget_below
 * @param {Number} col The column to start iterating.
 * @param {Number} row The row to start iterating.
 * @param {Function} callback The function to execute on each widget
 *  iteration. The value of `this` inside the function is the jQuery wrapped
 *  HTMLElement.
 * @return {Class} Returns the instance of the GridStack Class.
 */
fn.for_each_widget_below = function (col, row, callback) {
  this._traversing_widgets('for_each', 'below', col, row, callback);
  return this;
};

/**
 * Returns the highest occupied cell in the grid.
 *
 * @method getHighestOccupiedCell
 * @return {Object} Returns an object with `col` and `row` numbers.
 */
fn.getHighestOccupiedCell = function () {
  let r;
  let gm = this.gridmap;
  let rl = gm[1].length;
  let rows = [], cols = [];
  // let row_in_col = [];
  for (let c = gm.length - 1; c >= 1; c--) {
    for (r = rl - 1; r >= 1; r--) {
      if (this.is_widget(c, r)) {
        rows.push(r);
        cols.push(c);
        break;
      }
    }
  }

  return {
    col: Math.max.apply(Math, cols),
    row: Math.max.apply(Math, rows)
  };
};

/**
 * Generates a faux grid to collide with it when a widget is dragged and
 * detect row or column that we want to go.
 *
 * @method generate_faux_grid
 * @param {Number} rows Number of columns.
 * @param {Number} cols Number of rows.
 * @return {Object} Returns the instance of the GridStack class.
 */
fn.generate_faux_grid = function (rows, cols) {
  this.faux_grid = [];
  this.gridmap = [];
  let col;
  let row;
  for (col = cols; col > 0; col--) {
    this.gridmap[col] = [];
    for (row = rows; row > 0; row--) {
      this.add_faux_cell(row, col);
    }
  }
  return this;
};

/**
 * Add cell to the faux grid.
 *
 * @method add_faux_cell
 * @param {Number} row The row for the new faux cell.
 * @param {Number} col The col for the new faux cell.
 * @return {Object} Returns the instance of the GridStack class.
 */
fn.add_faux_cell = function (row, col) {
  let coords = new Coords([{
    left: this.baseX + ((col - 1) * this.widgetWidth),
    top: this.baseY + (row - 1) * this.widgetHeight,
    width: this.widgetWidth,
    height: this.widgetHeight,
    col: col,
    row: row,
    original_col: col,
    original_row: row
  }]);

  if (!$.isArray(this.gridmap[col])) {
    this.gridmap[col] = [];
  }

  this.gridmap[col][row] = false;
  this.faux_grid.push(coords);

  return this;
};

/**
 * Add rows to the faux grid.
 *
 * @method add_faux_rows
 * @param {Number} rows The number of rows you want to add to the faux grid.
 * @return {Object} Returns the instance of the GridStack class.
 */
fn.add_faux_rows = function (rows) {
  let actual_rows = this.rows;
  let max_rows = actual_rows + (rows || 1);

  for (let r = max_rows; r > actual_rows; r--) {
    for (let c = this.cols; c >= 1; c--) {
      this.add_faux_cell(r, c);
    }
  }

  this.rows = max_rows;

  if (this.options.autogenerateStylesheet) {
    this.generateStylesheet();
  }

  return this;
};

/**
 * Add cols to the faux grid.
 *
 * @method add_faux_cols
 * @param {Number} cols The number of cols you want to add to the faux grid.
 * @return {Object} Returns the instance of the GridStack class.
 */
fn.add_faux_cols = function (cols) {
  let actual_cols = this.cols;
  let maxCols = actual_cols + (cols || 1);
  maxCols = Math.min(maxCols, this.options.maxCols);

  for (let c = actual_cols + 1; c <= maxCols; c++) {
    for (let r = this.rows; r >= 1; r--) {
      this.add_faux_cell(r, c);
    }
  }

  this.cols = maxCols;

  if (this.options.autogenerateStylesheet) {
    this.generateStylesheet();
  }

  return this;
};

/**
 * Recalculates the offsets for the faux grid. You need to use it when
 * the browser is resized.
 *
 * @method recalculate_faux_grid
 * @return {Object} Returns the instance of the GridStack class.
 */
fn.recalculate_faux_grid = function () {
  let aw = this.$wrapper.width();
  this.baseX = ($(window).width() - aw) / 2;
  this.baseY = this.$wrapper.offset().top;

  $.each(this.faux_grid, $.proxy(function (i, coords) {
    this.faux_grid[i] = coords.update({
      left: this.baseX + (coords.data.col - 1) * this.widgetWidth,
      top: this.baseY + (coords.data.row - 1) * this.widgetHeight
    });
  }, this));

  return this;
};

/**
 * Calculate columns and rows to be set based on the configuration
 *  parameters, grid dimensions, etc ...
 *
 * @method generate_grid_and_stylesheet
 * @return {Object} Returns the instance of the GridStack class.
 */
fn.generate_grid_and_stylesheet = function () {
  let aw = this.$wrapper.width();
  let maxCols = this.options.maxCols;

  let cols = Math.floor(aw / this.widgetWidth) +
    this.options.extra_cols;

  let actual_cols = this.$widgets.map(function () {
    return $(this).attr('data-col');
  }).get();

  //needed to pass tests with phantomjs
  actual_cols.length || (actual_cols = [0]);

  let minCols = Math.max.apply(Math, actual_cols);

  this.cols = Math.max(minCols, cols, this.options.minCols);

  if (maxCols !== Infinity && maxCols >= minCols && maxCols < this.cols) {
    this.cols = maxCols;
  }

  // get all rows that could be occupied by the current widgets
  let max_rows = this.options.extra_rows;
  this.$widgets.each(function (i, w) {
    max_rows += (+$(w).attr('data-sizey'));
  });

  this.rows = Math.max(max_rows, this.options.minRows);

  this.baseX = ($(window).width() - aw) / 2;
  this.baseY = this.$wrapper.offset().top;

  if (this.options.autogenerateStylesheet) {
    this.generateStylesheet();
  }

  return this.generate_faux_grid(this.rows, this.cols);
};

export default GridStack;
