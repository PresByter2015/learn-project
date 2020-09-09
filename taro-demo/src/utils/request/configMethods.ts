import Taro from '@tarojs/taro'
import { Base64 } from 'js-base64';
import md5 from 'md5'
import {
    DEVICENUMBER,
    USER_SPECICAL_INFO,
    // CC_BASE_URL,  //豫园
    BASE_URL  //东家
} from '@/config/index'
import { uuid } from "@/utils/tool"
/**
 * @description: request支持函数库 
 * @author: PresByter
 * @date  : 2020/07/01 11:28:13
 * @latest : 2020/08/10 10:00:55
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70261832
 */

class ConfigMethods {
    // 获取token
    public getToken() {
        const Info = Taro.getStorageSync(USER_SPECICAL_INFO) || {}
        return Info.token || '2c06705c5465a1a1181a3d44fa669468'
    }
    // 获取设备id
    public getDeviceId() {
        const deviceNumber = Taro.getStorageSync(DEVICENUMBER);
        const Info = Taro.getStorageSync(USER_SPECICAL_INFO) || {}
        return Info.deviceId || deviceNumber || uuid()
    }
    /**
     * @description: 获取签名 
     * @author: PresByter
     * @date  : 2020/07/01 11:29:26
     * @param {any} data 发送请求所携带的参数 e.g. {"page":1,"tid":23}
     * @return {string} 返回结果描述 e.g. B6ADFC7A60B266A494B902083AC76E3E
     */
    public getSign(data: any): string {
        let str = this.getToken() + (typeof (data) === 'string' ? data : JSON.stringify(
            data))
        str = Base64.encode(str)
        str = md5(str)
        return str.toUpperCase()
    }
    /**
     * @description: 分别 处理 豫园/东家 请求响应
     * @author: PresByter
     * @date   : 2020/08/10 15:28:42
     * @latest : 2020/08/10 15:28:42
     * @param {number[]} nums 参数描述 e.g. 
     * @return {boolean} 返回结果描述 e.g. true 是东家/  false 豫园
     * @see 
     */
    public idDj(url: string): boolean {
        return url.search(BASE_URL) !== -1 ? true : false
    }
}
export default new ConfigMethods()