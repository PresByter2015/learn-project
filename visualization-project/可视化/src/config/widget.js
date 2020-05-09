const defaultSetting = {
  title: '',
  zIndex: 0,
  fontSize: 12,
  textColor: '#ffffff',
  textColorOpacity: 100,
  borderColor: '',
  borderColorOpacity: 100,
  borderSize: 1,
  backgroundType: 1,
  backgroundColor: '',
  backgroundOpacity: 100,
  backgroundImage: ''
};

const defaultTitles = {};
/*
const defaultTitles = {
  // 表格
  table: {
    basic: {
      title: '网络攻击排名'
    }
  },

  // 滚动计数器
  counter: {
    basic: {
      title: '累计访问用户'
    }
  }
}
*/

export default {
  getDefaultSetting(type, theme) {

    // 获取组件的配置
    if (type && theme && type in defaultTitles) {
      return Object.assign({}, defaultSetting, defaultTitles[type][theme] || {});
    }

    return defaultSetting;
  }
};
