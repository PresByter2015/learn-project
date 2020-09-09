/**
 * @description: 节气页数据 hzx
 * @author: PresByter
 * @date   : 2020/08/12 14:50:34
 * @latest : 2020/08/12 14:50:34
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70257742
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70259286
 */
import SolarTermsTime from '@/types/solarTerms';
import request from '../utils/request/index';
/**
 * @description: 节气页资源查询  
 * @author: PresByter
 * @date   : 2020/08/12 14:52:08
 * @latest : 2020/08/12 14:52:08
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d7616a950745d4868f33c
 */
export const solarTermsInfo = (): Promise<SolarTermsTime.SolarTermsTemplate> => {
    return request.post(
        {
            url: 'solar_terms/search',
            data: {}
        }
    );
};
/**
 * @description: banner列表 
 * @author: PresByter
 * @date   : 2020/07/22 15:29:44
 * @latest : 2020/07/22 15:29:44
 * @param {number} location //类型：Number  备注：位置。1首页，2市集腰封，3节气大图，4积分签到，5订单完成页面，6商品分享页 e.g. 
 * @return {} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d78b7a950745d4868f343
 */
export const solarTermsBanner = ({ location = 3 } = { location: 3 }): Promise<SolarTermsTime.SolarTermsBanner> => {
    // const { location = 3 } = params
    return request.post(
        {
            url: 'banner/list',
            data: {
                location
            }
        }
    );
};