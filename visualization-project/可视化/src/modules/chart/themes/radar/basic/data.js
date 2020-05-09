import intl from 'src/intl'  
export default { 
  radar: [{
    indicator: [
      { 
        name: intl.formatMessage({ id: 'pc server', defaultMessage: 'PC服务器' }), 
        max: 300 
      },
      { 
        name: intl.formatMessage({ id: 'minicomputer', defaultMessage: '小型机' }), 
        max: 100 
      },
      { 
        name: intl.formatMessage({ id: 'virtual machine', defaultMessage: '虚拟机' }), 
        max: 250 
      },
      { 
        name: intl.formatMessage({ id: 'storage device', defaultMessage: '存储设备' }), 
        max: 100 
      },
      { 
        name: intl.formatMessage({ id: 'database', defaultMessage: '数据库' }), 
        max: 200 
      },
      { 
        name: intl.formatMessage({ id: 'middleware', defaultMessage: '中间件' }), 
        max: 150 
      }]
  }],
  series: [
    {
      name: intl.formatMessage({ id: 'number of planning equipment', defaultMessage: '规划设备数' }),
      value: [294, 89, 138, 97, 143, 103]
    },
    {
      name: intl.formatMessage({ id: 'actual number of devices', defaultMessage: '实际设备数' }),
      value: [279, 91, 232, 81, 170, 132]
    }
  ]
}
