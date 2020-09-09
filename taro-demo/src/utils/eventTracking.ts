/**
 * @description: 用户埋点 
 * @author: PresByter
 * @date   : 2020/09/07 14:19:20
 * @latest : 2020/09/07 14:19:20
 * @param {String} type 类型
 * @param {String} oper 操作
 * @param {String} label 标签
 * @param {String} value 价值
 * @see https://www.yuque.com/presbyter/vcsbys/sbl1c5
 */
import Taro from '@tarojs/taro';
// openid 已经在 app.ts 中 埋点。
const yuyuanTrack = ({
    track = 'track',
    event = 'event',
    type = '',
    oper = 'Click',
    label = '',
    value = '',
}) => {
    try {
        const app = Taro.getApp();
        // app.yuyuan('set', 'user', 'openid', Taro.getStorageSync(OPEN_ID));
        // app.yuyuan('track','event','类型','操作','标签','价值'); //事件类型，类型、操作、标签、价值
        // app.yuyuan('track', 'event', 'home', 'Click', '市集顶部轮播图', '');
        app.yuyuan(track, event, type, oper, label, value);
    } catch (error) {
        console.log(error);
    }
};
export default yuyuanTrack;