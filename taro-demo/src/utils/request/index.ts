import Taro from '@tarojs/taro';
import { BASE_URL, HTTP_ERROR, USER_SPECICAL_INFO } from "@/config/index";
import { isHasHttpUrl } from "../tool";
import config from './defaultConfig';
import configMethods from './configMethods';
import refreshToken from './refreshToken';
/**
 * @description 项目默认是json数据类型，post请求方式
 */
interface Params {
    url: string
    baseUrl?: string
    data?: Record<string, any>
    options?: any
    headers?: any
}
/**
 * @description:  请求接口 封装
 * @author: PresByter
 * @date   : 2020/07/29 09:42:57
 * @latest : 2020/07/29 09:42:57
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70261832
 */

export default {
    request(options: any) {
        // TODO:暂时去掉所有 loading 效果
        // Taro.showLoading({
        //     title: '加载中',
        // });
        const { url, data, method, baseUrl, headers } = options;
        const BASEURL: string = baseUrl || BASE_URL;
        const reqUrl: string = isHasHttpUrl(url) ? url : `${BASEURL}${url}`;

        let contentType = "application/json";
        contentType = options.contentType || contentType;
        return new Promise((resolve, reject) => {
            const params: any = {
                url: reqUrl,
                data: data,
                method: method || 'GET',
                header: {
                    'Content-Type': contentType,
                    ...config,
                    Authorization: 'Dp ' + configMethods.getToken(),
                    'X-Device-Id': configMethods.getDeviceId(),
                    Sign: configMethods.getSign(data),
                    ...headers,
                }
            };

            Taro.request(params).then((res) => {
                // Taro.hideLoading();
                const { statusCode, data: result } = res;

                if (statusCode >= 200 && statusCode < 300) {
                    // 鉴权失败，登陆失效 state 1000001
                    const { code } = result;

                    if (configMethods.idDj(reqUrl) && code === 1000001) {
                        // FIXME:重新获取用户信息-dj
                        Taro.getStorageSync(USER_SPECICAL_INFO) && refreshToken();
                        // 跳转 登陆页面 拦截
                        // const path = getCurrentPageUrl();
                        // if (path !== HOME_PATH) {
                        //     Taro.navigateTo({
                        //         url: HOME_PATH
                        //     });
                        // }
                        // return false
                    }
                    if (configMethods.idDj(reqUrl) && code !== 0) {
                        Taro.showToast({
                            title: result.msg || '未知错误',
                            icon: 'none',
                            duration: 1500
                        });
                        return resolve(result);
                    }
                    return resolve(result);
                } else {
                    if (statusCode === 401) {
                        // Taro.setStorageSync("app_token", "");
                        // const path = getCurrentPageUrl();
                        // if (path !== HOME_PATH) {
                        //     Taro.navigateTo({
                        //         url: HOME_PATH
                        //     });
                        // }
                    } else {
                        throw new Error(HTTP_ERROR[statusCode]);
                    }
                }
            }).catch(err => {
                Taro.hideLoading();
                // const msg = `服务器正在维护中!${HTTP_ERROR[statusCode]}`
                reject(err);
                if (err) throw new Error(err);
            });
        });
    },
    get(rest: Params) {
        return this.request({ ...rest });
    },
    post(rest: Params) {
        return this.request({ ...rest, method: 'POST' });
    },
    put(rest: Params) {
        return this.request({ ...rest, method: 'PUT' });
    },
    delete(rest: Params) {
        return this.request({ ...rest, method: 'DELETE' });
    }
};
