import { deepCopy } from 'utils/serialize'

const positionMap = {
  top: {
    top: 'top',
    right: '5%',
    orient: 'horizontal'
  },
  right: {
    left: 'right',
    top: 'middle',
    orient: 'vertical'
  },
  bottom: {
    top: 'bottom',
    right: '5%',
    orient: 'horizontal'
  },
  left: {
    left: 'left',
    top: 'middle',
    orient: 'vertical'
  }
}

export default function setLegendStyle(legendStyle) {
  legendStyle = deepCopy(legendStyle)
  let { legend } = this.option
  if (legendStyle.position) {
    delete legend.top
    delete legend.right
    delete legend.bottom
    delete legend.left
    delete legend.orient

    let position = positionMap[legendStyle.position]
    Object.assign(legend, position)
    delete legendStyle.position
  }

  Object.assign(legend, legendStyle)

  // 改变 legend 的时候，需要处理下 grid 的位置
  this.setGridStyle(this.option)
}
