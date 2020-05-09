import zrender from 'zrender'
import Path from 'zrender/src/tool/path'

/**
 *     1
 *    ----
 * 0 | 3  | 2
 *    ----
 * 4 | 5  | 6
 *    ----
 */
const numeralMap = {
  0: [1, 1, 1, 0, 1, 1, 1 ],
  1: [0, 0, 1, 0, 0, 0, 1 ],
  2: [0, 1, 1, 1, 1, 1, 0 ],
  3: [0, 1, 1, 1, 0, 1, 1 ],
  4: [1, 0, 1, 1, 0, 0, 1 ],
  5: [1, 1, 0, 1, 0, 1, 1 ],
  6: [1, 1, 0, 1, 1, 1, 1 ],
  7: [0, 1, 1, 0, 0, 0, 1 ],
  8: [1, 1, 1, 1, 1, 1, 1 ],
  9: [1, 1, 1, 1, 0, 1, 1 ]
}

/**
 *
 */
/* eslint-disable max-len */
const points = [
  '0.6382 1.25603333 2.50753333 3.12536667 2.50753333 6.864 0.6382 8.73333333 0.0151 8.11023333 0.0151 1.87913333',
  '8.73866667 0.6329 6.86933333 2.50223333 3.13063333 2.50223333 1.2613 0.6329 1.8844 0.0098 8.11556667 0.0098',
  '9.9849 8.1102 9.3618 8.73333333 7.49246667 6.864 7.49246667 3.12533333 9.3618 1.256 9.9849 1.8791',
  '3.13066667 7.4871 6.86933333 7.4871 8.11556667 8.73333333 6.86933333 9.97956667 3.13063333 9.97956667 1.88443333 8.73333333',
  '0.6382 8.73333333 2.50753333 10.6026667 2.50753333 14.3413 0.6382 16.2106333 0.0151 15.5875333 0.0151 9.35643333',
  '1.88443333 17.4568667 1.26133333 16.8337667 3.13066667 14.9644333 6.86933333 14.9644333 8.73866667 16.8337667 8.11556667 17.4568667',
  '9.3618 16.2106333 7.49246667 14.3413 7.49246667 10.6026667 9.3618 8.73333333 9.9849 9.35643333 9.9849 15.5875333'
]
/* eslint-enabled */

/**
 * 数字
 */
class LED {
  constructor(num, option = {}) {
    this.option = option
    this.width = this.option.style.font.size / 2 + 4
    this.height = this.option.style.font.size / 2 * 3

    this.el = document.createElement('div')
    this.el.style.width = this.width + 'px'
    this.el.style.height = this.height + 'px'

    this.num = num
    this.zr = zrender.init(this.el)

    this.render(this.num)
  }

  // 将points变为二维数组
  getArr(point) {
    let str = point

    let ary = []

    let ary1 = str.split(' ')

    for (let i = 0, len =  ary1.length; i < len; i += 2) {
      ary.push([
        ary1[i],
        ary1[i + 1]
      ])
    }
    return ary
  }

  // 解析二维数组
  ParsePath(data) {
    let m = {}

    if (Array.isArray(data[0])) {
      m.x = data[0][0]
      m.y = data[0][1]
    } else {
      m = data[0]
    }

    let l = data.slice(1).map(item => {
      if (Array.isArray(item)) {
        return `L${item[0]},${item[1]}`
      }
      return `L${item.x},${item.y}`
    })

    return `M ${m.x} ${m.y}, ${l.join(', ')}`
  }

  isValid(num) {
    return num in numeralMap
  }

  setStyle(style) {
    this.option.style.font = style

    // this.render(this.num)
  }

  render(num) {
    if (!this.isValid(num)) {
      return
    }

    numeralMap[num].forEach((val, i) => {
      let getPoint = this.getArr(points[i])

      getPoint = getPoint.map(item => {
        item[0] = item[0] * this.width / 10
        item[1] = item[1] * this.height / 18
        return item
      })

      let d = this.ParsePath(getPoint)

      if (val) {
        let shape = Path.createFromString(d, {
          style: {
            brushType : 'both',
            fill : this.option.style.font.color || '#fff',
            lineWidth : 1,
          },
        })
        if (this.option.style.font.bold) {
          shape.setStyle({
            stroke: this.option.style.font.color || '#fff'
          })
        }

        this.zr.add(shape)
      }
    })

    this.num = num
  }
}

export default LED
