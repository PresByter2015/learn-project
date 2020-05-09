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
        stroke: effectCfg.color,
        fill: null
      }
    });
  });
}

function initEffect(effectCfg, effectGroup) {
  let color = effectCfg.color;
  effectGroup.attr('scale', 2);
  effectGroup.traverse(function(ripplePath) {
    ripplePath.attr({
      stroke: color,
      fill: null
    });
  });
  effectCfg.rippleScale = 30;
  // effectCfg.brushType = 'stroke';
  effectCfg.period = 2 * 1000;
}

function startEffectAnimation(effectCfg, effectGroup) {
  let symbolType = effectCfg.symbolType;
  let color = effectCfg.color;
  let rippleGroup = effectGroup;

  let randomTime = Math.random() * effectCfg.period; // 每个点两次动画间隔时间
  
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

    let delay = -i / 10 * effectCfg.period + effectCfg.effectOffset; // 两圈间隔
    // TODO Configurable effectCfg.period
    ripplePath.animate('', true)
      .when(randomTime, {
        scale: [0, 0]
      })
      .when(randomTime + effectCfg.period / 2, {
        scale: [effectCfg.rippleScale, effectCfg.rippleScale]
      })
      .when(randomTime + effectCfg.period, {
        scale: [0, 0]
      })
      .delay(delay)
      .start();
    ripplePath.animateStyle(true)
      .when(0, {
        opacity: 0
      })
      .when(randomTime, {
        opacity: 1
      })
      .when(randomTime + effectCfg.period / 2, {
        opacity: 0
      })
      .when(randomTime + effectCfg.period, {
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
