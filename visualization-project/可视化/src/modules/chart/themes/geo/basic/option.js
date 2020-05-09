function defaultGeo() {
  return {
    map: 'china',
    label: {
      emphasis: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    itemStyle: {
      normal: {
        color: '#13487b',
        opacity: 1,
        borderWidth: 1,
        borderColor: '#2079b1'
      },
      emphasis: {
        color: '#3448e0',
        borderWidth: 0
      }
    }
  }
}

function defaultVisualMap() {
  return {
    type: 'continuous',
    min: 0,
    max: 200,
    inRange: {
      color: ['#afdef4', '#19a7f4']
    },
    textStyle: {
      color: '#60aae2'
    },
    text: ['高','低'], // 文本，默认为数值文本
    calculable: true
  }
}

//有style说明有[图形配置]项会影响到series中
function defaultHotSerie(name, data, style) {
  return {
    name: name,
    type: 'map',
    mapType: 'china',
    roam: false,
    showLegendSymbol: false,
    itemStyle: {
      normal: {
        borderWidth: 1,
        borderColor: '#c0e4f5'
      },
      emphasis: {
        areaColor: '#3448e0',
        borderWidth: 0
      }
    },
    label: {
      normal: {
        show: style ? style.series.label.normal.show : false,
        textStyle: {
          color: style ? style.series.label.normal.textStyle.color : '#0facdb',
          fontSize: style ? style.series.label.normal.textStyle.fontSize : 12,
          opacity: 1
        }
      },
      emphasis: {
        textStyle: {
          color: '#fff'
        }
      }
    },
    data: data
  }
}

function defaultScatterSerie(name, data, style) {
  return {
    name: name,
    type: (style && style.series.effectType) ? 'effectScatter' : 'scatter',
    effectType: style ? style.series.effectType : null,
    coordinateSystem: 'geo',
    label: {
      normal: {
        show: style ? style.series.label.normal.show : true,
        formatter: '{b}',
        position: 'right',
        textStyle: {
          color: style ? style.series.label.normal.textStyle.color : '#0facdb',
          fontSize: style ? style.series.label.normal.textStyle.fontSize : 12,
          opacity: 1
        }
      }
    },
    symbolSize: function (val) {
      return Math.log(val[2]) * 5
    },
    symbol: style ? style.series.symbol : 'circle',
    itemStyle: {
      normal: {
        color: style ? style.series.itemStyle.normal.color : '#0cabf3',
        opacity: (style && style.series.effectType) ? 0 : 1
      }
    },
    data: data
  }
}

function defaultLinesSeries(name, dataLines, dataPoints, style) {
  return [{
    name: name,
    type: 'lines',
    zlevel: 1,
    effect: {
      show: true,
      period: 3,
      trailLength: 0.7,
      color: style ? style.series.lineStyle.normal.color : '#ffeb10',
      symbolSize: 3
    },
    lineStyle: {
      normal: {
        color: style ? style.series.lineStyle.normal.color : '#ffeb10',
        width: 0, //细
        curveness: style ? style.series.lineStyle.normal.curveness : 0.2
      }
    },
    data: dataLines
  }, {
    name: name,
    type: 'lines',
    zlevel: 2,
    effect: {
      show: true,
      period: 3,
      trailLength: 0,
      symbol: 'circle',
      symbolSize: 3
    },
    lineStyle: {
      normal: {
        color: style ? style.series.lineStyle.normal.color : '#ffeb10',
        width: style ? style.series.lineStyle.normal.width : 1,
        opacity: 0.4,
        curveness: style ? style.series.lineStyle.normal.curveness : 0.2
      }
    },
    data: dataLines
  }, {
    name: name,
    type: 'effectScatter',
    effectType: 'ripple',
    coordinateSystem: 'geo',
    zlevel: 2,
    label: {
      normal: {
        show: style ? style.series.label.normal.show : true,
        formatter: '{b}',
        position: 'right',
        textStyle: {
          color: style ? style.series.label.normal.textStyle.color : '#0facdb',
          fontSize: style ? style.series.label.normal.textStyle.fontSize : 12,
          opacity: 1
        }
      }
    },
    itemStyle: {
      normal: {
        color: '#70c3fb'
      },
      emphasis: {
        
      }
    },
    data: dataPoints
  }]
}

export { defaultGeo, defaultVisualMap, defaultHotSerie, defaultScatterSerie, defaultLinesSeries }
