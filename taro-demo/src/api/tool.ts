/**
 * @description:  
 * @author: PresByter
 * @date   : 2020/08/05 15:52:25
 * @latest : 2020/08/05 15:52:25
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70260643
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70262710
 * @see https://help.aliyun.com/document_detail/92883.html?spm=5176.11065259.1996646101.searchclickresult.3b4f1d2cG5Q0M9
 */
import Tools from '@/types/tools';
import { CC_BASE_URL } from '@/config/index';
import request from '../utils/request/index';
/**
 * @description: 获取 STS token  ylw
 * @author: PresByter
 * @date   : 2020/08/05 15:53:33
 * @latest : 2020/08/05 15:53:33
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f16b8d0a950745d4868f3df
 */
export const getSts = ({ fileCount, isPublic } = { isPublic: 1, fileCount: 1 }): Promise<Tools.ToolsTotalRes> => {
    return request.post(
        {
            url: 'file/oss/sts',
            data: {
                isPublic,                //类型：String  件是否可以公共读，传0或1
                fileCount               //类型：Number  必有字段  备注：上传的文件数量，允许的最大值为20
            }
        }
    );
};
/**
 * @description:  获取小程序码，适用于需要的码数量较少的业务场景 ylw
 * @author: PresByter
 * @date   : 2020/08/13 18:10:03
 * @latest : 2020/08/13 18:10:03
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f34ec3ca950745d4868f47b
 * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.get.html
 */
export const getQrcode = ({ path, width, autoColor, isHyaline, lineColor }: Tools.QrcodePayload =
    { width: '280', path: '/page/index/index', autoColor: false, isHyaline: false, lineColor: { "r": 0, "g": 0, "b": 0 } }): Promise<any> => {
    return request.post(
        {
            url: 'wxmp/qrcode',
            data: {
                width,
                path,
                'line_color': lineColor,
                'is_hyaline': isHyaline,
                'auto_color': autoColor,
            }
        }
    );
};
/**
 * @description: 获取小程序码，适用于需要的码数量极多的业务场景 
 * @author: PresByter
 * @date   : 2020/08/14 09:59:55
 * @latest : 2020/08/14 09:59:55
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f34ec59a950745d4868f47c
 * @see https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/qr-code/wxacode.getUnlimited.html
 */
export const getQrcodeMore = (params: Tools.QrcodePayload =
    { scene: '1011', width: '280', path: 'page/index/index', autoColor: false, isHyaline: false, lineColor: { "r": 0, "g": 0, "b": 0 } }): Promise<any> => {
    const { scene = '1011', width = '280', path = 'page/index/index', autoColor = false, isHyaline = false, lineColor = { "r": 0, "g": 0, "b": 0 } } = params;
    return request.post(
        {
            url: 'wxmp/qrcode/unlimited',
            data: {
                scene,
                width,
                page: path,
                'line_color': lineColor,
                'is_hyaline': isHyaline,
                'auto_color': autoColor,
            }
        }
    );
};
/**
 * @description: 获取原始的小程序码 scene 值 
 * @author: PresByter
 * @date   : 2020/08/31 14:27:19
 * @latest : 2020/08/31 14:27:19
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f4c6c5aa950745d4868f4d0
 */
export const getDecryptParams = (params: { md5: string; } =
    { md5: '', }): Promise<Tools.DecryptParamsRes> => {
    const { md5 = '', } = params;
    return request.post(
        {
            url: 'wxmp/qrcode/unshorten/scene',
            data: {
                md5
            }
        }
    );
};
/**
 * @description: 会员行为接口 
 * @author: PresByter
 * @date   : 2020/08/19 14:51:10
 * @latest : 2020/08/19 14:51:10
 * @param {number[]} nums 参数描述 e.g. 
 *  1注册
    2完善信息
    3消费
    4充值
    5导购获客
    6导购核销
    7登录
    8签到
    9分享
 * @see https://www.yuque.com/office/yuque/0/2020/xlsx/152341/1597740584790-d5183ee8-689a-4c9f-877a-8229afc88c28.xlsx?from=https%3A%2F%2Fwww.yuque.com%2Fpresbyter%2Fvcsbys%2Fqhg6s3
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70259312
 */
export type BehaviorAction = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export const setBehavior = ({ phone, action } = { action: '', phone: '' }): Promise<Tools.ToolsTotalRes> => {
    return request.post(
        {
            baseUrl: CC_BASE_URL,
            url: 'crm-dongplus/remote/member/behavior',
            data: {
                phone,               //类型：Number  必有字段  备注：上传的文件数量，允许的最大值为20
                code: action,                //类型：String  件是否可以公共读，传0或1
            }
        }
    );
};