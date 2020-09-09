import CCApi from '@/types/cc';
import Mine from '@/types/mine';
import { CC_BASE_URL } from '@/config/index';
import request from '../utils/request/index';

/**
 * @description: 我的页面接口 
 * @author: PresByter
 * @date   : 2020/08/17 15:44:26
 * @latest : 2020/08/17 15:44:26
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70258701
 */
/**
 * @description: 用户个人中心，我的页面  ylw
 * @author: PresByter
 * @date   : 2020/07/23 11:07:34
 * @latest : 2020/07/23 11:07:34
 * @return {UserCenterResObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d9f72a950745d4868f36a
 */
export const userCenter = (): Promise<Mine.UserCenterResObject> => {
    return request.post(
        {
            url: 'user/center',
            data: {}
        }
    );
};
/**
 * @description:  用户个人中心，我的页面 背景图 ylw
 * @author: PresByter
 * @date   : 2020/08/12 17:49:37
 * @latest : 2020/08/12 17:49:37
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f334e19a950745d4868f478
 */
export const userCenterBk = (): Promise<Mine.UserCenterResObject> => {
    return request.post(
        {
            url: 'wxmp/configuration',
            data: {}
        }
    );
};
/**
 * @description:  订单数目显示
 * @author: PresByter
 * @date   : 2020/08/17 15:44:47
 * @latest : 2020/08/17 15:44:47
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d13b2a950745d4868f318
 */
export const orderNums = (): Promise<Mine.UserOrdeNumsResObject> => {
    return request.post(
        {
            url: 'order/statistics',
            data: {}
        }
    );
};
 /**
 * @description: CC 用户信息   
 * @author: PresByter
 * @date   : 2020/08/07 16:42:57
 * @latest : 2020/08/07 16:42:57
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70259312
 */
export const userCCInfo = ({ Phone = '' } = { Phone: '' }): Promise<CCApi.MemberInfo> => {
    return request.post(
        {
            baseUrl: CC_BASE_URL,
            url: 'crm-dongplus/remote/member/info',
            data: {
                phone: Phone
            }
        }
    );
};
/**
 * @description: 吸粉优惠券信息查询 
 * @author: PresByter
 * @date   : 2020/08/18 11:42:17
 * @latest : 2020/08/18 11:42:17
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://www.yuque.com/office/yuque/0/2020/xlsx/152341/1597282285611-123723c4-a5af-46c0-b07f-086115c91ad0.xlsx?from=https%3A%2F%2Fwww.yuque.com%2Fpresbyter%2Fvcsbys%2Fqhg6s3
 */
export const userCCcoupon = ({ phone = '' } = { phone: '' }): Promise<CCApi.CouponInfo> => {
    return request.post(
        {
            baseUrl: CC_BASE_URL,
            url: 'crm-dongplus/datasync/coupon/feature',
            data: {
                phone: phone
            }
        }
    );
};