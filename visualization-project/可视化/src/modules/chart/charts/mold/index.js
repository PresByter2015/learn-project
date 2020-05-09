import Chart from '../chart'
import $ from 'jquery'
import eventEmitter from 'src/views/editor/event'
import DataPoller from './data-poller'
import { hex2rgb } from 'utils/color'

class Mold extends Chart {
  constructor(option, el, theme, extra, scale) {
    super(option, el, theme)
    this.$el = $(this.el)
    this.scale = scale

    this.$el.addClass('mold-option')

    this._poller = new DataPoller()
    this._rule = {}
    this._isInner = extra.isInner
    this._content = extra.content
    this._name = extra.name
    let $svg = null
    if (this._isInner) {
      $svg = $(this._content)
        .css({
          width: '100%',
          height: '100%'
        })
      $svg.addClass('mold-svg')
    } else {
      $svg = $('<div class="content"></div>')
        .css({
          width: '100%',
          height: '100%'
        })
    }

    this.$el.html('').append($svg)

    const parent = this.$el.parents('.chart')
    parent && parent.css({ overflow: 'visible' })

    const showName = $(`<p class='mold-name'>${this._name}</p>`)
      .css({
        width: '100%',
        marginBottom: 0,
        textAlign: 'center'
      })

    this.$el.append(showName)

    eventEmitter.on('isCheckStatus', (data) => {
      this._flag = data.flag
      this._poller.fetchData(data.flag, data.activeId, this.setRangeData.bind(this)) //bind(this)是为了不丢失this指向
    })
  }

  setRangeData(data) {
    if (data && data.length) {
      this._data = data;
      this.render()
    } else {
      //When state request failed is falseData
      this._data = [{
        'state': 'object.available',
        'value': 'on'
      }];
      this.render();
    }
  }

  setRenderShowStyle(show = false) {
    this._show = show
    this.render()
  }

  setSelectTypeStyle(type) {
    this._flag = type.tag
    this._selectType = type && type.value;
    this._rule = {};
  }

  setIndexStyle(data) {
    //When select
    if (data.rule.select) {
      this._rule = data.rule.select
      this.render()
    }
    //When slider
    if (data.rule.slider) {
      this._rule = data.rule.slider;
      this.render()
    }
  }

  setMoldColorStyle(option) {
    const keys = Object.keys(option);
    keys.forEach(k => {
      const color = option[k].color;
      const opacity = option[k].opacity;
      const rgba = hex2rgb(color, opacity);
      $(this.$el).find(`.huishe-vison-${k}`).css({
        fill: rgba
      })
    })
  }

  calcStyle(rule, data) {
    const style = {}
    if (rule && data && Array.isArray(rule) && Array.isArray(data)) {
      const sourceValue = data[0] && data[0].value;
      //If value === String
      if (isNaN(sourceValue * 1)) {
        rule.map((item) => {
          if (item.value === sourceValue) {
            style.color = item.color
          }
        });
      } else {
        //If value === Number
        //valueList sort
        let valueList = rule.map((item) => item.value).sort((a, b)=> a - b);
        //colorList
        let colorList = rule.map((item) => item.color);
        //When valueList[lastIndex] === undefined valueList[lastIndex] = 100
        for (let i = 0; i < valueList.length; i++) {
          if (!valueList[i]) {
            valueList[i] = 100
          }
        }
        //valueList mapping color
        valueList.map((item, i)=> {
          if (item > sourceValue) {
            if (style.color) {
              return
            } else {
              style.color = colorList[i]
            }
          }
        });
      }
    }
    return style
  }

  setMoldBase(data) {
    if (!data.name) {
      data.name = ''
    }
    let moldDom = this.$el.find('.mold-name')[0];
    let svg = this.$el.find('.mold-svg');
    let svgWidth = svg.attr('width');
    let svgHeight = svg.attr('height');
    moldDom.innerText = data.name;
    moldDom.style.fontSize = data.nameSize + 'px';
    moldDom.style.fontWeight = data.nameWeight;
    moldDom.style.textDecoration = data.nameText;
    moldDom.style.color = data.textColor;
    moldDom.style.position = 'relative';
    let domRect = moldDom.getBoundingClientRect()
    $(moldDom).css({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    });
    switch (data.position) {
      case 'top' :
        moldDom.style.top = -svgHeight + 20 - domRect.height * this.scale + 'px';
        break;
      case 'bottom' :
        moldDom.style.bottom = svgHeight + domRect.height * this.scale + 'px';
        break;
      case 'left' :
        moldDom.style.left = -svgWidth / 2 - 20 - domRect.width * this.scale + 'px';
        moldDom.style.top = -svgHeight / 2 - domRect.height / 2 * this.scale + 'px';
        break;
      case 'right' :
        moldDom.style.left = svgWidth / 2 + 20 + domRect.width * this.scale + 'px';
        moldDom.style.top = -svgHeight / 2 - domRect.height / 2 * this.scale + 'px';
        break
    }
  }

  setMoldBaseName(data) {
    if (!data) {
      console.log('This data is undefined')
    } else {
      let moldDom = this.$el.find('.mold-name')[0];
      moldDom.innerText = data.activeOption;
    }
  }

  render() {
    const parent = this.$el.parents('.widget')
    const { _show = false, _data = [], _rule } = this
    const rule = this.calcStyle(_rule, _data)
    const calcStyle = _show ? `0 0 100px ${rule.color || '#0f0'}` : `0 0 0 ${rule.color || '#0f0'}`
    parent && parent.css({ 'box-shadow': calcStyle })
  }

}

export default Mold
