import format from './format'
/**
 * @desc 把数组类型的数据转成对象形式
 *
 * 源数据格式:
 * [{
 *  分类: '周一',
 *  邮件营销: 120,
 *  联盟广告: 220,
 *  视频广告: 150,
 * }]
 *
 * 处理后的数据格式
 *
 * {
 *    "分类": {
 *      "name": "分类",
 *      "data": [ "周一" ]
 *    },
 *    "邮件营销": {
 *      "name": "邮件营销",
 *      "data": [ 120 ]
 *    },
 *    "联盟广告": {
 *      "name": "联盟广告",
 *      "data": [ 220 ]
 *    },
 *    "视频广告": {
 *      "name": "视频广告",
 *      "data": [ 150 ]
 *    }
 * }
 *
 */
export default function(aryData) {
  let dict = {}
  let keys = []

  if (!aryData) {
    return dict
  }

  if (Array.isArray(aryData)) {
    if (aryData.length === 0) {
      return dict
    }

    keys = Object.keys(aryData[0])
  }

  /**
   * 构造基本的数据结构
   * {
   *    name: {
   *      name: name,
   *      data: []
   *    }
   * }
   */
  keys.forEach(key => {
    dict[key] = {
      name: key,
      data: []
    }
  })

  // 循环数据，填充
  aryData.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key in dict) {
        // 格式化数据
        let val = item[key]
        val = format(val)

        dict[key].data.push(val)
      }
    })
  })

  return dict
}
