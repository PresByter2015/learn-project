import WindowModel from 'models/window'
import Chart from 'modules/chart/cache'

function saveWindow(data) {
  return WindowModel.saveWidgets(data).then(res => {
    return res
  })
}

export function saveTemplate(windowId, widgets) {
  return new Promise(resolve => {
    let saveWidgets = []

    for (let i in widgets) {
      let obj = {
        fuuid: i
      }

      Object.assign(obj, widgets[i])

      let chart = Chart.get(i)
      chart.toJSON()
      //文本组件 保存为模板时获取下option上的数据并赋值
      if (chart.type === 'text') {
        obj.chart.option = chart.option
        obj.styleSetting.text = chart.option.title.text
      }

      saveWidgets.push(obj)
    }

    saveWindow(
      Object.assign({
        windowId: windowId,
        saveWidgets: saveWidgets
      })
    ).then(res => {
      resolve(res)
    }, () => {})
  })
}
