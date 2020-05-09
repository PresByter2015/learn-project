export const PRODUCT_ID = 1007;

/**
 * 默认单元格配置
 */
export const Grids = {
  '4:3': {
    cols: 128,
    rows: 96,
    padding: 0,
    _width: 1920,
    _height: 1440
  },
  '16:9': {
    cols: 128,
    rows: 72,
    padding: 0,
    _width: 1920,
    _height: 1080
  },
  '25:9': {
    cols: 200,
    rows: 72,
    padding: 0,
    _width: 1920,
    _height: 1080
  }
};

let gridKey = '16:9';
export const Grid = Object.assign(Grids[gridKey], {
  ratio: gridKey
});

export const GridPanelPadding = 10;
