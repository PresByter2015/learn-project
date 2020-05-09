// define(function (require) {

let SymbolDraw = require('echarts/lib/chart/helper/SymbolDraw');
let EffectSymbol = require('../helper/EffectSymbol');

require('echarts/lib/echarts').extendChartView({

  type: 'effectScatter',

  init: function () {
    this._symbolDraw = new SymbolDraw(EffectSymbol);
  },

  render: function (seriesModel) {
    let data = seriesModel.getData();
    let effectSymbolDraw = this._symbolDraw;
    effectSymbolDraw.updateData(data);
    this.group.add(effectSymbolDraw.group);
  },

  updateLayout: function () {
    this._symbolDraw.updateLayout();
  },

  remove: function (ecModel, api) {
    this._symbolDraw && this._symbolDraw.remove(api);
  }
});
// });
