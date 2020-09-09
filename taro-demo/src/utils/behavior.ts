/**
 * @description: CC 会员行为接口 
 * @author: PresByter
 * @date   : 2020/08/26 14:41:02
 * @latest : 2020/08/26 14:41:02
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://www.yuque.com/office/yuque/0/2020/xlsx/152341/1598423692639-c20415ab-0f22-44cf-91fe-d10d247cdc56.xlsx?from=https%3A%2F%2Fwww.yuque.com%2Fpresbyter%2Fvcsbys%2Fqhg6s3
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70259312
 */
import Taro from '@tarojs/taro';
import { USER_SPECICAL_INFO } from '@/config/index';
import { setBehavior } from '@/api/tool';

export interface ActionItem {
    action: string
    name: string
    type: number
}
const actions = new Map<number, ActionItem>([
    [1, { action: 'ADD_POINT_REGIST_UPGRADE', name: '注册', type: 1 }],
    [2, { action: 'ADD_POINT_IMPROVE_INFO', name: '完善信息', type: 2 }],
    [3, { action: 'ADD_POINT_ORDER', name: '消费', type: 3 }],
    [4, { action: 'ADD_POINT_ADD_CREDIT', name: '充值', type: 4 }],
    [5, { action: 'ADD_POINT_GUIDE_INVITE', name: '导购获客', type: 5 }],
    [6, { action: 'ADD_POINT_GUIDE_VERIFY', name: '导购核销', type: 6 }],
    [7, { action: 'ADD_POINT_LOGIN', name: '登录', type: 7 }],
    [8, { action: 'ADD_POINT_CHECKIN', name: '签到', type: 8 }],
    [9, { action: 'ADD_POINT_SHARE', name: '分享', type: 9 }],
]);


const setCCBehavior = (type: number, phone?: string) => {
    const userInfo = Taro.getStorageSync(USER_SPECICAL_INFO);
    // console.log('userInfo', userInfo);
    const actionsVal = actions.get(type);
    const payload = { action: actionsVal.action, phone: phone || userInfo.mobile };
    try {
        setBehavior(payload);
    } catch (error) {
        console.log(error);
    }

};
export default setCCBehavior;