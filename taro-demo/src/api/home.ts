/**
* @description: 小程序 首页 数据 
* @author: PresByter
* @date  : 2020/07/22 10:54:52
* @file  : home.ts
* @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70259286
*/
import { HomeInfoObject, HomeGoodsObject, HomeBannerObject, BannerLoc } from '@/types/home';
import request from '../utils/request/index';
/**
 * @description: 首页资源查询 hzx
 * @author: PresByter
 * @date   : 2020/07/22 10:58:02
 * @latest : 2020/07/22 10:58:02
 * @return {HomeInfoObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d5a92a950745d4868f335
 */
export const homeInfo = (): Promise<HomeInfoObject> => {
    return request.post(
        {
            url: 'home/info',
        }
    );
};
/**
 * @description: 首页市集商品列表 hzx
 * @author: PresByter
 * @date   : 2020/07/22 11:08:33
 * @latest : 2020/07/22 11:08:33
 * @param {number[]} nums 参数描述 e.g. 
 * @return {HomeGoodsObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d5d48a950745d4868f336
 */
export const homeGoodslist = (params = { limit: 10, page: 1 }): Promise<HomeGoodsObject> => {
    const { limit = 10, page = 1 } = params;
    return request.post(
        {
            url: 'recommend/item/list/home',
            data: {
                limit,
                page
            }
        }
    );
};
/**
 * @description: banner列表 
 * @author: PresByter
 * @date   : 2020/07/22 15:29:44
 * @latest : 2020/07/22 15:29:44
 * @param {number[]} nums //类型：Number  备注：位置。1首页，2市集腰封，3节气大图，4积分签到，5订单完成页面，6商品分享页 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d78b7a950745d4868f343
 */
export interface HomeBannerParams {
    location: BannerLoc
}
export const homeBannerlist = (params: HomeBannerParams = { location: 1 }): Promise<HomeBannerObject> => {
    const { location = 1 } = params;
    return request.post(
        {
            url: 'banner/list',
            data: {
                location
            }
        }
    );
};