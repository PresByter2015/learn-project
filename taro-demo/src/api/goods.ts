import Goods from '@/types/goods';
import request from '../utils/request/index';
/**
 * @description: 商品详情页，收藏，商品列表 
 * @author: PresByter
 * @date  : 2020/07/22 15:26:27
 * @file  : goods.ts
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70257102
 */
/**
 * @description: 商品详情  gxl
 * @author: PresByter
 * @date   : 2020/07/17 16:18:40
 * @latest : 2020/07/22 10:51:05
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f09971ea950745d4868f2d1
 */
export const goodsDetailApi = (params = { itemId: '' }): Promise<Goods.GoodsDetailResData> => {
    const { itemId = '' } = params;
    return request.post(
        {
            url: 'item/detail',
            data: {
                itemId,
            }
        }
    );
};


export interface GoodsCollectPayloadObject {
    itemId: number
    collect: boolean
}
/**
 * @description:  商品收藏 操作 gxl
 * @author: PresByter
 * @date   : 2020/07/17 16:27:31
 * @latest : 2020/07/22 10:51:05
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ea0d7a950745d4868f3aa
 */
export const goodsCollect = (params: GoodsCollectPayloadObject = { itemId: 0, collect: false }): Promise<Goods.RootObject> => {
    const { itemId = 0, collect = false } = params;
    return request.post(
        {
            url: 'item/collect',
            data: {
                itemId,
                collect,
            }
        }
    );
};

export interface PageF {
    page: number
    limit: number
    itemId?: string
}
/**
 * @description:  商品收藏 列表 gxl
 * @author: PresByter
 * @date   : 2020/07/17 16:28:00
 * @latest : 2020/07/22 10:51:44
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ede72a950745d4868f3ab
 */
export const goodsCollectList = (params: PageF = { page: 1, limit: 10 }): Promise<Goods.CollectGoodsListData> => {
    const { page = 1, limit = 10 } = params;
    return request.post(
        {
            url: 'item/user/collect/list',
            data: {
                page,
                limit,
            }
        }
    );
};
/**
 * @description: 商品详情页推荐商品列表 hzx
 * @author: PresByter
 * @date   : 2020/07/22 15:15:30
 * @latest : 2020/07/22 15:15:30
 * @param {PageF} params 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d750fa950745d4868f33a
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70259286
 */
export const goodsRecommendList = (params: PageF = { page: 1, limit: 10, itemId: '' }): Promise<Goods.CollectGoodsListData> => {
    const { page = 1, limit = 10, itemId = '' } = params;
    return request.post(
        {
            url: 'recommend/item/list/item_detail',
            data: {
                page,
                limit,
                itemId
            }
        }
    );
};
/**
 * TODO: deleted 废弃
 * @description: 订单推荐商品列表 
 * @author: PresByter
 * @date   : 2020/08/19 16:54:05
 * @latest : 2020/08/19 16:54:05
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f3ce731a950745d4868f49e
 */
export const orderDetailsRecommendList = (params: PageF = { page: 1, limit: 10, itemId: '' }): Promise<Goods.CollectGoodsListData> => {
    const { page = 1, limit = 10, itemId = '' } = params;
    return request.post(
        {
            url: 'recommend/item/list/order',
            data: {
                page,
                limit,
                itemId
            }
        }
    );
};
/**
 * @description: 支付页推荐商品列表 
 * @author: PresByter
 * @date   : 2020/08/19 16:59:30
 * @latest : 2020/08/19 16:59:30
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d7567a950745d4868f33b
 */
export const paySuccessRecommendList = (params: PageF = { page: 1, limit: 10, itemId: '' }): Promise<Goods.CollectGoodsListData> => {
    const { page = 1, limit = 10, itemId = '' } = params;
    return request.post(
        {
            url: 'recommend/item/list/pay',
            data: {
                page,
                limit,
                itemId
            }
        }
    );
};
