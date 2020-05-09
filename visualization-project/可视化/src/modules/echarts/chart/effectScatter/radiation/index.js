/**
 * Symbol with ripple effect
 * @module echarts/chart/helper/EffectSymbol
 */
// define(function (require) {


let symbolUtil = require('echarts/lib/util/symbol');

function updateRadiationPath(radiationGroup, effectCfg) {
  radiationGroup.eachChild(function(path) {
    path.attr({
      z: effectCfg.z,
      zlevel: effectCfg.zlevel,
      style: {
        fill: effectCfg.color,
        shadowColor: effectCfg.color
      }
    });
  });
}

function initEffect(effectCfg, effectGroup, itemModel) {
  let color = effectCfg.color;
  effectGroup.traverse(function(path) {
    path.attr({
      fill: color
    });
  });
  effectCfg.radiationScale = 1;
  effectCfg.period = (itemModel.get('radiationEffect.period') || 4) * 1000;
}

function startEffectAnimation(effectCfg, effectGroup) {
  let symbolType = effectCfg.symbolType;
  let color = effectCfg.color;

  let path = symbolUtil.createSymbol(
    symbolType, -0.5, -0.5, 1, 1, color
  );
  path.attr({
    style: {
      strokeNoScale: true,
      shadowBlur: 10,
      shadowColor: color
    },
    z2: 99,
    silent: true,
    scale: [0, 0]
  });

  let randomTime = Math.random() * effectCfg.period;

  let delay = -1 / effectCfg.period + effectCfg.effectOffset;
  // TODO Configurable effectCfg.period
  path.animate('', true)
    .when(randomTime, {
      scale: [0, 0]
    })
    .when(randomTime + effectCfg.period / 3, {
      scale: [0, 0]
    })
    .when(randomTime + effectCfg.period / 2, {
      scale: [effectCfg.radiationScale, effectCfg.radiationScale]
    })
    .when(randomTime + effectCfg.period * 5 / 6, {
      scale: [effectCfg.radiationScale, effectCfg.radiationScale]
    })
    .when(randomTime + effectCfg.period, {
      scale: [0, 0]
    })
    .delay(delay)
    .start();
  path.animate('', true)
    .when(effectCfg.period, {
      rotation: Math.PI * 2
    })
    .delay(delay)
    .start();

  effectGroup.add(path);
  updateRadiationPath(effectGroup, effectCfg);

};

/**
 * Update effect symbol
 */
function updateEffectAnimation(effectCfg, oldEffectCfg, effectGroup) {

  // Must reinitialize effect if following configuration changed
  let DIFFICULT_PROPS = ['effectType', 'symbolType', 'period', 'radiationScale'];
  for (let i = 0; i < DIFFICULT_PROPS.length; i++) {
    let propName = DIFFICULT_PROPS[i];
    if (oldEffectCfg[propName] !== effectCfg[propName]) {
      return true;
    }
  }

  updateRadiationPath(effectGroup, effectCfg)
};


module.exports = {
  initEffect: initEffect,
  startEffectAnimation: startEffectAnimation,
  updateEffectAnimation: updateEffectAnimation
}
