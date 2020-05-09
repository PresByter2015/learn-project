/**
 * Symbol with ripple effect
 * @module echarts/chart/helper/EffectSymbol
 */
// define(function (require) {


let symbolUtil = require('echarts/lib/util/symbol');

let EFFECT_RIPPLE_NUMBER = 3;

function updateRipplePath(rippleGroup, effectCfg) {
  rippleGroup.eachChild(function(ripplePath) {
    ripplePath.attr({
      z: effectCfg.z,
      zlevel: effectCfg.zlevel,
      style: {
        stroke: effectCfg.brushType === 'stroke' ? effectCfg.color : null,
        fill: effectCfg.brushType === 'fill' ? effectCfg.color : null
      }
    });
  });
}

function initEffect(effectCfg, effectGroup, itemModel) {
  let color = effectCfg.color;
  effectGroup.traverse(function(ripplePath) {
    ripplePath.attr({
      fill: color
    });
  });
  effectCfg.rippleScale = itemModel.get('rippleEffect.scale');
  effectCfg.brushType = itemModel.get('rippleEffect.brushType');
  effectCfg.period = itemModel.get('rippleEffect.period') * 1000;
}

function startEffectAnimation(effectCfg, effectGroup) {
  let symbolType = effectCfg.symbolType;
  let color = effectCfg.color;
  let rippleGroup = effectGroup;

  for (let i = 0; i < EFFECT_RIPPLE_NUMBER; i++) {
    let ripplePath = symbolUtil.createSymbol(
      symbolType, -0.5, -0.5, 1, 1, color
    );
    ripplePath.attr({
      style: {
        strokeNoScale: true
      },
      z2: 99,
      silent: true,
      scale: [1, 1]
    });

    let delay = -i / EFFECT_RIPPLE_NUMBER * effectCfg.period + effectCfg.effectOffset;
    // TODO Configurable effectCfg.period
    ripplePath.animate('', true)
      .when(effectCfg.period, {
        scale: [effectCfg.rippleScale, effectCfg.rippleScale]
      })
      .delay(delay)
      .start();
    ripplePath.animateStyle(true)
      .when(effectCfg.period, {
        opacity: 0
      })
      .delay(delay)
      .start();

    rippleGroup.add(ripplePath);
  }

  updateRipplePath(rippleGroup, effectCfg);
};

/**
 * Update effect symbol
 */
function updateEffectAnimation(effectCfg, oldEffectCfg, effectGroup) {
  let rippleGroup = effectGroup;

  // Must reinitialize effect if following configuration changed
  let DIFFICULT_PROPS = ['effectType', 'symbolType', 'period', 'rippleScale'];
  for (let i = 0; i < DIFFICULT_PROPS.length; i++) {
    let propName = DIFFICULT_PROPS[i];
    if (oldEffectCfg[propName] !== effectCfg[propName]) {
      return true;
    }
  }

  updateRipplePath(rippleGroup, effectCfg);
};


module.exports = {
  initEffect: initEffect,
  startEffectAnimation: startEffectAnimation,
  updateEffectAnimation: updateEffectAnimation
}
