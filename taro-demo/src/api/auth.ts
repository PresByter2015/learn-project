import { CC_BASE_URL } from '@/config/index';
import { LoginResObject, LoginNumberPayload, WxUserInfo, WxPhoneNumber, UserCenterResObject, UserInfoPayload, RegisterSr } from '@/types/auth';
import CCApi from '@/types/cc';
import request from '../utils/request/index';
/**
 * @description: 东plus 小程序端 REST 接口 用户登录注册：
 * @author: PresByter
 * @date   : 2020/07/23 10:19:32
 * @latest : 2020/07/23 10:19:32
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70258701
 */

// H5 微信小程序授权登录
interface LoginPayloadData {
    code: string
}
/**
 * @description: 获取openid 
 * @author: PresByter
 * @date   : 2020/07/31 17:53:07
 * @latest : 2020/07/31 17:53:07
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f23e91aa950745d4868f442
 */
export const getOpenid = ({ code = '' }: LoginPayloadData = { code: '' }): Promise<LoginResObject> => {
    return request.post(
        {
            url: 'user/wxmp/code2openid',
            data: {
                code,//微信用户登录凭证，wx.login 返回的 code
            }
        }
    );
};
/**
 * @description: 微信小程序授权登录 ylw
 * @author: PresByter
 * @date   : 2020/07/23 10:18:48
 * @latest : 2020/07/23 10:18:48
 * @param {RootObject}  参数描述 e.g. 
 * @return {LoginResObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d9f72a950745d4868f367
 */
export const wxmpLogin = ({ code = '' }: LoginPayloadData = { code: '' }): Promise<LoginResObject> => {
    return request.post(
        {
            url: 'user/wxmp/login',
            data: {
                code,//微信用户登录凭证，wx.login 返回的 code
            }
        }
    );
};
/**
 * @description: 微信小程序授权登录 /注册并绑手机号 ylw
 * @author: PresByter
 * @date   : 2020/07/23 10:35:42
 * @latest : 2020/09/04 13:49:46
 * @param {LoginNumberPayload}  参数描述 e.g. 
 * @return {LoginResObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d9f72a950745d4868f368
 */
export const authWithMobile = ({ code = '', wxPhoneNumber = {} as WxPhoneNumber, registerSrc = {} as RegisterSr }: LoginNumberPayload): Promise<LoginResObject> => {
    const { encryptedData = '', iv = '' } = wxPhoneNumber;
    const { from = '', source = '', storecode = '', param1 = '', param2 = '', } = registerSrc;
    return request.post(
        {
            url: 'user/wxmp/auth-mobile',
            data: {
                code: code,
                // wxUserInfo: wxUserInfo,
                wxPhoneNumber: { encryptedData, iv },
                registerSrc: {
                    from,
                    source,
                    storecode,
                    param1,
                    param2,
                }
            }
        }
    );
};
/**
 * @description: 刷新 token ylw
 * @author: PresByter
 * @date   : 2020/08/10 11:17:49
 * @latest : 2020/08/10 11:17:49
 * @param {string} secret 参数描述 e.g. 
 * @return {Promise} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f30b5d5a950745d4868f472
 */
export const getRefresh = ({ secret = '' } = { secret: '' }): Promise<UserCenterResObject> => {
    return request.post(
        {
            url: 'user/token/refresh',
            data: { secret }
        }
    );
};
/**
 * @description: 用户个人中心，我的页面  ylw
 * @author: PresByter
 * @date   : 2020/07/23 11:07:34
 * @latest : 2020/07/23 11:07:34
 * @return {UserCenterResObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d9f72a950745d4868f36a
 */
export const userCenter = (): Promise<UserCenterResObject> => {
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
export const userCenterBk = (): Promise<UserCenterResObject> => {
    return request.post(
        {
            url: 'wxmp/configuration',
            data: {}
        }
    );
};
/**
 * @description: 提交用户授权的微信用户信息  ylw
 * @author: PresByter
 * @date   : 2020/07/23 11:19:50
 * @latest : 2020/07/23 11:19:50
 * @param {UserInfoPayload} nums 参数描述 e.g. 
 * @return {UserCenterResObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0d9f72a950745d4868f369
 */
export const setUserInfo = ({ code = '', wxUserInfo = {} as WxUserInfo }: UserInfoPayload): Promise<UserCenterResObject> => {
    return request.post(
        {
            url: 'user/wxmp/userInfo',
            data: {
                code,
                wxUserInfo
            }
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