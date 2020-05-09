import $ from 'jquery';

/**
 * Widget
 */
class Widget {
  constructor(elem, options) {
    this.elem = elem[0];
    this.$elem = $(elem) || $('<div class="widget"></div>');
    this.option = options;
    this.id = options.uid;

    if (options.position) {
      this.$elem.css(options.position);
      this.position = Object.assign({}, options.position, {
        width: this.$elem.width(),
        height: this.$elem.height()
      });
    }

    if (options.uid) {
      this.uid = options.uid;
    }

    this.grid = options.grid;
    this.coords = options.coords;
  }

  setOption(opts) {
    Object.assign(this.option, opts);
  }

  getOption(type) {
    return this.option[type];
  }

  updateCoords(data) {
    if (data.coords) {
      let coords = Object.assign({}, data.coords);
      delete coords.el;
      Object.assign(this.coords, coords);
    }

    if (data.grid) {
      Object.assign(this.grid, data.grid);
    }
  }
}

export default Widget;
