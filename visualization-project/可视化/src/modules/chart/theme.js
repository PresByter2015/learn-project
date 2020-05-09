import Themes from './themes/index';
import { chartDefaultSize } from './config';
import { deepCopy } from 'utils/serialize';

let PARSED_CATEGORY = {};

export default {
  getSize(type) {
    let size = chartDefaultSize[type];
    if (!size) {
      size = {
        x: 34,
        y: 22
      };
    }

    return { sizex: size.x, sizey: size.y };
  },

  get(type, theme) {
    let ret;

    for (let key in PARSED_CATEGORY) {
      let cate = PARSED_CATEGORY[key];

      // 过滤，获取 type, theme 相同的成员
      cate.themes.forEach(item => {
        if (!ret && item.type === type && item.theme === theme) {
          ret = item;
        }
      });
    }

    if (ret) {
      return deepCopy(ret);
    } else {
      console.warn(`Can't found type: ${type} theme: ${theme} data.`);
    }
  },

  getOption(type, theme) {
    let chart = this.get(type, theme);
    return chart.option;
  },

  /**
   * 解析分类
   */
  parseCategory: function (config) {
    if (Object.keys(PARSED_CATEGORY).length) {
      return PARSED_CATEGORY;
    }

    Object.keys(config).forEach(key => {
      console.log();
      console.log(key);
      let cate = config[key];
      let { themes } = cate;
     
      
      PARSED_CATEGORY[key] = Object.assign({}, cate, {
        themes: add(themes)
      });
    });
    console.log(PARSED_CATEGORY);
    return PARSED_CATEGORY;

    function add(items) {
      let ary = [];

      items && items.map(item => {
        // console.log(item.type);
        let all = Themes.get(item.type);
        console.log(all);

        for (let k in all) {
          ary.push(Object.assign({}, item, { theme: k }, all[k]));
        }
      });
      console.log(ary);
      return ary;
    }
  },

  parseChartManual: function (type, theme) {
    theme = theme || 'basic';
    let all = Themes.get(type) || {};
    let ret = Object.assign({ klass: type, type: type }, { theme: theme }, all[theme]);
    if (ret) {
      //必须新对象，否则相同的部件会共享同一份图形配置
      return deepCopy(ret);
    } else {
      console.warn(`Can't found type: ${type} theme: ${theme} data.`);
    }
  }
};
