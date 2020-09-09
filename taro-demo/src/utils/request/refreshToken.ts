/**
 * @description: 刷新token 
 * @author: PresByter
 * @date   : 2020/08/10 09:41:21
 * @latest : 2020/08/10 09:41:21
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f30b5d5a950745d4868f472
 */
import { USER_SPECICAL_INFO } from '@/config/index';
import { getRefresh } from '@/api/auth';
import Taro from '@tarojs/taro';
import { isLogin } from "@/utils/tool";

const refreshToken = () => {
    const userInfo = Taro.getStorageSync(USER_SPECICAL_INFO);
    isLogin() && getRefresh({ secret: userInfo.secret }).then(resl => {
        // resl.code === 0 && Taro.setStorageSync(USER_SPECICAL_INFO, { ...userInfo, ...resl.res })
        if (resl.code === 0 && resl.res) {
            Taro.setStorageSync(USER_SPECICAL_INFO, { ...userInfo, ...resl.res });
        }else{
            Taro.setStorageSync(USER_SPECICAL_INFO, {});
        }
    });

};

export default refreshToken;