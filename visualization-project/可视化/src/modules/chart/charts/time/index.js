import Echarts from '../echarts'
import moment from 'moment'
const $ = require('jquery')
import urls from 'config/urls'
import http from 'modules/http'
import intl from 'src/intl'

let langMap = {
  'cn': () => { return 'zh-cn' },
  'en': () => { return 'en' }
}

const timeUrl = urls.get('time')
const getServerTimeStep = 0.5 * 3600 //和server端校验时间的周期

class Time extends Echarts {
  constructor(el ,option) {
    super(el, option)
    this.$el = $(this.el)
    this.$container = $('<div class="container"></div>')
      .css({
        width: '100%',
        height: '100%',
        display: 'table',
        overflow: 'hidden'
      })
    this.$main = $('<div class="main"></div>')
      .css({
        width: '100%',
        height: '100%',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'table-cell',
      })
    this.$container.append(this.$main)
    this.$el.html('').append(this.$container)
    this.style.set('clock', 0)
    this.style.set('url', timeUrl)
    this._formatter = this.option.formatter
    this._timeStampDiff = 0
    this.getTimeDiff()

    let area = intl.locale || 'en'
    area = area.toLowerCase()
    if (area.includes('zh') || area.includes('cn')) {
      area = langMap['cn']()
    } else {
      area = langMap['en']()
    }

    this._area = area
  }

  setFormatterStyle(formatter) {
    this._formatter = formatter
    this.setData()
  }

  getTimeDiff() {
    let { url = timeUrl } = this.style.style
    http.get(url).then((res) => {
      if (res.errCode === 200) {
        let { data } = res
        let serverTimeStamp = (data.time) / (Math.pow(10, 6)) //因为返回的是纳秒，需要转换成毫秒
        let clientTimeStamp = new Date().getTime()
        this._timeStampDiff = serverTimeStamp - clientTimeStamp
      }
    })
  }

  setData(data = Date.now()) {
    let formatter = this._formatter
    let time = null
    if (formatter && formatter.includes('week')) {
      formatter = formatter.replace('week', '')
      let week = this.showWeek(data)
      if (formatter.includes('YYYY')) {
        time = moment((+data)).format(formatter) + week
      } else {
        time = week
      }
    } else {
      time = moment((+data)).format(formatter)
    }
    this.$main.text(time)
  }

  setClockStyle() {
    let i = 0
    let getNow = () => {
      i += 1
      if (i % getServerTimeStep === 0) {
        i = 0
        this.getTimeDiff()
      }
      let time = Date.now() + this._timeStampDiff
      this.setData(time)
      setTimeout(getNow, 1000)
    }
    setTimeout(getNow, 1000)
  }

  showWeek(data) {
    moment.locale(this._area)
    return moment(+data).format('dddd')
  }

  setTextStyleStyle(style) {
    style.fontSize = +style.fontSize + 'px'
    style.fontWeight = (typeof style.fontWeight === 'boolean') ? 
      (style.fontWeight ? 'bold' : 'normal') : style.fontWeight
    if (style) {
      for (let rule in style) {
        this.$main[0].style[rule] = style[rule]
      }
    }
  }

  setBorderStyleStyle(style) {
    let borderStyle = `${style.width}px solid ${style.color}`
    this.$el[0].style.border = borderStyle
  }

  resize({ width, height }) {
    this.$el.css({ width, height })
  }


}

export default Time
