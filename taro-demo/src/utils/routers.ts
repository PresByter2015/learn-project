import Taro from '@tarojs/taro';
import { HOME_PATH } from "@/config/index";

export interface RouterOptions {
    url: string
    homepath?: string
    params?: any
}
/**
* @description: 小程序 路由的 二次封装。 
* @author: PresByter
* @date  : 2020/07/13 18:21:58
* @latest : 2020/07/13 18:39:46
* @file  : routers.ts
* @param {string} url 要跳转的路径;必传值 e.g. 
* @param {string} homepath 设置为最初的首页，默认是当前的路径调用的最初路径/ config 路径下的 配置首页; e.g. 
* @param {any} params 路由跳转所带的参数; e.g. 
* @return {void} 返回结果描述 e.g. 
* @see https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
* @see https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html#%E9%A1%B5%E9%9D%A2%E6%A0%88
*/
function restRoute(options: RouterOptions = { url: "", params: {} }) {  //只是判断路径的最后一个参数值
    const { url = "", homepath = HOME_PATH, params = {} } = options;
    if (url === "") {
        // Taro.showToast({
        //     title: '没有设置跳转路径',
        //     icon: 'success',
        //     duration: 2000
        // });
        return false;
    }

    /**
     * 获取当前页面的页面栈;
     * 获得的路径为 pages/index/index 不能作为路由进行跳转；
     * 若进行跳转；需要在前面加 / 即：/pages/index/index
     */
    const pagesStacks = Taro.getCurrentPages();
    const firstPages = homepath || HOME_PATH || pagesStacks[0].route;


    let paramsStr = '?' + Object.keys(params).map(item => (`${item}=${params[item]}`)).join('&');
    const level = pagesStacks.length - 1; //处于层级数-1
    const distPath = url.replace(/^(\/?pages)|(\.\.\/)/g, ''); //要跳转的层级; 去掉相对路径 ../ | pages
    const tempUrl = paramsStr.search('dpfrom=') === -1 ? `&dpfrom=${distPath.split('/')[distPath.split('/').length - 1]}` : '';
    // console.log(distPath.split('/')[distPath.split('/').length - 1], paramsStr.search('dpfrom='));
    paramsStr = `${paramsStr}${tempUrl}`;
    /** 1.返回-首页; */
    if (firstPages.search(distPath) !== -1) { //返回-首页
        Taro.reLaunch({
            url: url + paramsStr,
        });
        return false;
    }
    /**2.曾经跳转过的路径 */
    for (let i = level; i >= 0; i--) { //取出每个路由的最后的参数
        const peRoute = pagesStacks[i].route;
        if (peRoute.search(distPath) !== -1) {  //曾经跳转过的路径
            if (level - i) { //返回上几层
                Taro.navigateBack({
                    delta: level - i
                });
                return false;
            } else { //跳转到本层
                Taro.redirectTo({
                    url: url + paramsStr,
                });
                return false;
            }
        }
    }
    /**3.没有跳转过的层级 */
    if (pagesStacks.length === 10) { //超出10层自动关闭最后一个页面
        Taro.redirectTo({
            url: url + paramsStr
        });
    } else {
        Taro.navigateTo({
            url: url + paramsStr,
        }).catch(() => {
            Taro.switchTab({
                url: url + paramsStr
            });

        });
    }
}
export default restRoute;