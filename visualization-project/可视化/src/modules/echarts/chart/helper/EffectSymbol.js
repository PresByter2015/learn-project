/**
 * Symbol with ripple effect
 * @module echarts/chart/helper/EffectSymbol
 */


let zrUtil = require('zrender/lib/core/util');
let graphic = require('echarts/lib/util/graphic');
let numberUtil = require('echarts/lib/util/number');
let Symbol = require('echarts/lib/chart/helper/Symbol');
let Group = graphic.Group;

const animationEffects = (function() {
  let effects = {};

  const rippleEffect = require('../effectScatter/ripple');
  const radiationEffect = require('../effectScatter/radiation');
  const raindropEffect = require('../effectScatter/raindrop');

  registerAnimationEffect('ripple', rippleEffect);
  registerAnimationEffect('radiation', radiationEffect);
  registerAnimationEffect('raindrop', raindropEffect);

  function registerAnimationEffect(effectType, clazz) {
    effects[effectType] = clazz;
  }

  function getAnimationEffect(effectType) {
    return effects[effectType] || rippleEffect
  }

  return {
    register: registerAnimationEffect,
    get: getAnimationEffect
  }
})()
  

function normalizeSymbolSize(symbolSize) {
  if (!zrUtil.isArray(symbolSize)) {
    symbolSize = [+symbolSize, +symbolSize];
  }
  return symbolSize;
}

/**
     * @constructor
     * @param {module:echarts/data/List} data
     * @param {number} idx
     * @extends {module:zrender/graphic/Group}
     */
function EffectSymbol(data, idx) {
  Group.call(this);

  let symbol = new Symbol(data, idx);
  let effectGroup = new Group();
  this.add(symbol);
  this.add(effectGroup);

  effectGroup.beforeUpdate = function () {
    this.attr(symbol.getScale());
  };
  this.updateData(data, idx);
}

let effectSymbolProto = EffectSymbol.prototype;

effectSymbolProto.stopEffectAnimation = function () {
  this.childAt(1).removeAll();
};

effectSymbolProto.startEffectAnimation = function (effectCfg) {
  let effect = animationEffects.get(effectCfg.effectType);
  let effectGroup = this.childAt(1);
  effect.startEffectAnimation(effectCfg, effectGroup);
};

/**
     * Update effect symbol
     */
effectSymbolProto.updateEffectAnimation = function (effectCfg) {
  let effect = animationEffects.get(effectCfg.effectType);
  let oldEffectCfg = this._effectCfg;
  let effectGroup = this.childAt(1);
  if (effect.updateEffectAnimation(effectCfg, oldEffectCfg, effectGroup)) {
    this.stopEffectAnimation();
    this.startEffectAnimation(effectCfg);
  }
};

/**
     * Highlight symbol
     */
effectSymbolProto.highlight = function () {
  this.trigger('emphasis');
};

/**
     * Downplay symbol
     */
effectSymbolProto.downplay = function () {
  this.trigger('normal');
};

/**
     * Update symbol properties
     * @param  {module:echarts/data/List} data
     * @param  {number} idx
     */
effectSymbolProto.updateData = function (data, idx) {
  let seriesModel = data.hostModel;

  this.childAt(0).updateData(data, idx);

  let effectGroup = this.childAt(1);
  let itemModel = data.getItemModel(idx);
  let symbolType = data.getItemVisual(idx, 'symbol');
  let symbolSize = normalizeSymbolSize(data.getItemVisual(idx, 'symbolSize'));
  let color = data.getItemVisual(idx, 'color');

  effectGroup.attr('scale', symbolSize);

  let symbolOffset = itemModel.getShallow('symbolOffset');
  if (symbolOffset) {
    let pos = effectGroup.position;
    pos[0] = numberUtil.parsePercent(symbolOffset[0], symbolSize[0]);
    pos[1] = numberUtil.parsePercent(symbolOffset[1], symbolSize[1]);
  }
  effectGroup.rotation = (itemModel.getShallow('symbolRotate') || 0) * Math.PI / 180 || 0;

  let effectCfg = {};

  effectCfg.showEffectOn = seriesModel.get('showEffectOn');
  effectCfg.effectOffset = idx / data.count();
  effectCfg.z = itemModel.getShallow('z') || 0;
  effectCfg.zlevel = itemModel.getShallow('zlevel') || 0;
  effectCfg.symbolType = symbolType;
  effectCfg.color = color;
  effectCfg.effectType = itemModel.getShallow('effectType');

  let effect = animationEffects.get(effectCfg.effectType);
  effect.initEffect(effectCfg, effectGroup, itemModel);

  this.off('mouseover').off('mouseout').off('emphasis').off('normal');

  if (effectCfg.showEffectOn === 'render') {
    this._effectCfg
      ? this.updateEffectAnimation(effectCfg)
      : this.startEffectAnimation(effectCfg);

    this._effectCfg = effectCfg;
  }
  else {
    // Not keep old effect config
    this._effectCfg = null;

    this.stopEffectAnimation();
    let symbol = this.childAt(0);
    let onEmphasis = function () {
      symbol.trigger('emphasis');
      if (effectCfg.showEffectOn !== 'render') {
        this.startEffectAnimation(effectCfg);
      }
    };
    let onNormal = function () {
      symbol.trigger('normal');
      if (effectCfg.showEffectOn !== 'render') {
        this.stopEffectAnimation();
      }
    };
    this.on('mouseover', onEmphasis, this)
      .on('mouseout', onNormal, this)
      .on('emphasis', onEmphasis, this)
      .on('normal', onNormal, this);
  }

  this._effectCfg = effectCfg;
};

effectSymbolProto.fadeOut = function (cb) {
  this.off('mouseover').off('mouseout').off('emphasis').off('normal');
  cb && cb();
};

zrUtil.inherits(EffectSymbol, Group);

module.exports = EffectSymbol;
