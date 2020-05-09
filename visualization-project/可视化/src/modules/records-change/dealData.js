import WindowModel from 'models/window'
import { packEdge, packEdgeSetting } from './dealEdge'
/**
 * 处理改动 分配数据并更新
 */
export function DealChange(windowId, widgets, changeData) {
  return new Promise(resolve => {
    let saveWidgets = []
    let deleteWidgets = []

    for (let key in changeData) {
      let widgetid = key
      if (changeData[key].widgetDelete) {
        //删除部件
        //若为不曾保存进后端的部件 删除后则不传
        if (changeData[key].buuid) {
          let updateObj = {
            fuuid: widgetid,
            buuid: changeData[key].buuid
          }
          deleteWidgets.push(updateObj)
        }
      } else if (widgets[widgetid]) {
        if (changeData[key].widgetAdd) {
          //新增部件
          let updateObj = {
            fuuid: widgetid
          }

          saveWidgets.push(Object.assign(updateObj, packEdge(widgets[widgetid])))
        } else {
          //更新部件
          let updateObj = {
            fuuid: widgetid,
            buuid: widgets[widgetid].buuid
          }

          if (changeData[key].widgetSetting) {
            //部件配置
            let widgetSetting = widgets[widgetid].setting
            updateObj.setting = widgetSetting
          }

          if (changeData[key].grapherSetting) {
            //图形配置
            let grapherData = []
            let grapherChange = changeData[key].grapherSetting
            let chart = widgets[widgetid].chart.option

            if (widgets[widgetid].chart.setting) {
              chart = widgets[widgetid].chart.setting
            }

            for (let type in grapherChange) {
              let grapherValue = {}//更新后端的value

              if (grapherChange[type]) {
                grapherValue = chart[type]

                //X轴
                if (type === 'xAxis') {
                  grapherValue.data = chart[type].data
                }

                grapherData.push({
                  key: type,
                  value: grapherValue
                })
              }
            }

            updateObj.grapherSetting = grapherData
          }

          if (changeData[key].dataSetting) {
            //数据配置
            let data = widgets[widgetid].dataSetting
            updateObj.dataSetting = data
            updateObj.chart = widgets[widgetid].chart//数据配置更新时图表的opiton会有更新,所以chart也需要保存
          }

          if (changeData[key].widgetPosition) {
            //部件位移
            let widgetCol = widgets[widgetid].col
            let widgetRow = widgets[widgetid].row
            updateObj.col = widgetCol
            updateObj.row = widgetRow
          }

          if (changeData[key].styleSetting) {
            //更新图形配置
            let grapherData = []
            let grapherChange = changeData[key].styleSetting
            let styleSetting = widgets[widgetid].styleSetting

            for (let type in grapherChange) {
              grapherData.push({
                key: type,
                value: styleSetting[type]
              })
            }

            updateObj.grapherSetting = grapherData
          }

          if (changeData[key].widgetSize) {
            //部件大小
            let widgetSizeX = widgets[widgetid].sizex
            let widgetSizeY = widgets[widgetid].sizey
            updateObj.sizex = widgetSizeX
            updateObj.sizey = widgetSizeY
          }

          //记录线
          if (changeData[key].edgeSetting) {
            updateObj = Object.assign(updateObj, packEdgeSetting(widgets[widgetid]))
          }

          saveWidgets.push(updateObj)
        }
      }
    }

    if (saveWidgets.length > 0 || deleteWidgets.length > 0) {
      saveWindow(Object.assign({
        windowId: windowId,
        saveWidgets: saveWidgets,
        deleteWidgets: deleteWidgets }))
        .then(res => {
          resolve(res)
        }, () => {})
    } else {
      //较之之前没有任何修改,不发送请求,给用户一个假的"保存成功"
      resolve({ errCode: 200 })
    }

  })
}

/**
 * 增、删、改同一个接口更新 保存窗口
 */
function saveWindow(data) {
  return WindowModel.saveWidgets(data).then(res => {
    return res
  })
}
