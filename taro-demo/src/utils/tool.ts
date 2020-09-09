import Taro from "@tarojs/taro";
import { FILE_HOST, USER_SPECICAL_INFO } from "@/config/index";
/**
 * @description: 格式化 字符串 参数 
 * @author: PresByter
 * @date   : 2020/09/01 17:53:06
 * @latest : 2020/09/01 17:53:06
 * @param {string}} url 参数描述 e.g. 
 * @return {any} 返回结果描述 e.g. 
 * @see 
 */
export const getParamsUrlFormat = (url = ''): { [key: string]: string; } => {
    let obj = {};
    const paramsArr = url.split('&');
    for (let i = 0; i < paramsArr.length; i++) {
        const item = paramsArr[i].split('=');
        obj = { ...{ [item[0]]: item[1] }, ...obj };
    }
    return obj;
};
/**
 * @description:  价格 裁剪
 * @author: PresByter
 * @date   : 2020/08/28 19:17:50
 * @latest : 2020/08/28 19:17:50
 * @see 
 */
export const sliceDotNum = (str: string | number): string => {
    return `${str}`.indexOf(".") === -1 ? '' : `${str}`.substring(`${str}`.indexOf("."));
};
/**
 * @description:  是否登陆
 * @author: PresByter
 * @date   : 2020/08/03 16:46:39
 * @latest : 2020/08/03 16:46:39
 * @return {boolean} 返回结果描述 e.g. true：登陆  false：未登陆 
 */
export const isLogin = (): boolean => {
    const Info = Taro.getStorageSync(USER_SPECICAL_INFO) || {};
    return Info.token !== undefined;
};
/**
 * @description: 获取当前页url 
 * @author: PresByter
 * @date  : 2020/06/23 14:13:19
 * @return {string}
 */
export const getCurrentPageUrl = (): string => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    return currentPage.route;
};
const formatNumber = (n: number): string => {
    const ns = n.toString();
    return ns[1] ? ns : '0' + ns;
};
/**
 * @description:时间格式化  
 * @author: PresByter
 * @date  : 2020/06/23 14:13:59
 * @param {number} timestamp e.g. 1592892899291
 * @return {string} e.g. 2020-06-23 14:14:27
 */
export const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};
/**
 * @description: 验证数据类型 
 * @author: PresByter
 * @date  : 2020/06/24 17:56:22
 * @param {string} type 需要判断的数据类型 e.g. string
 * @param {any} data 需要判断的数据 e.g. '23233232'
 * @return {boolean} 返回结果描述 e.g. true
 */
export const validType = (str: string, data: any): boolean | void => {
    const types = new Map([
        ['DATE', '[object Date]'],
        ['SYMBOL', '[object Symbol]'],
        ['SET', '[object Set]'],
        ['MAP', '[object Map]'],
        ['FUNCTION', '[object Function]'],
        ['STRING', '[object String]'],
        ['ARRAY', '[object Array]'],
        ['OBJECT', '[object Object]'],
        ['NULL', '[object Null]'],
        ['NUMBER', '[object Number]'],
        ['UNDEFINED', '[object Undefined]'],
    ]);
    const msg = '请输入 正确的数据类型，如：Date，sting,function,array 等';
    return types.get(str.toUpperCase()) ? types.get(str.toUpperCase()) === Object.prototype.toString.call(data) : console.warn(msg);
};
/**
 * @description: 是否是含有 https｜http 的路径 
 * @author: PresByter
 * @date  : 2020/07/01 14:23:20
 * @param {string} url 需要验证的url e.g. https://www.sss.com.cn
 * @return {boolean} 返回结果描述 e.g. true
 */
export const isHasHttpUrl = (url: string): boolean => {
    const absoluteUrlReg = /^(https?:)\/\//;
    return !!url.match(absoluteUrlReg);
};
/**
 * @description: 补全图片文件前缀 
 * @author: PresByter
 * @date  : 2020/07/01 11:39:33
 * @param {any[]} arr 参数描述 e.g. 
 * @param {string} type 参数描述 e.g. 'key'
 * @param {string} size 参数描述 e.g. '_300x300'
 * @return {any[]} 返回结果描述 e.g. 
 * @see https://help.aliyun.com/document_detail/44688.html?spm=5176.doc44686.6.924.t5CtYr
 */
export type DataImgSource = any[] | string
export const addUrlPrefix = (arr: DataImgSource, type = "", size = 'w_375') => {
    if (validType('array', arr) && arr.length > 0) {
        if (type === "") {
            return (arr as []).map((v: string) => {
                return isHasHttpUrl(v) ? v : `${FILE_HOST}${v}${size}?x-oss-process=image/resize,${size}`;
            });
        } else {
            return (arr as []).map((v: object) => {
                return { ...v, [type]: isHasHttpUrl(v[type]) ? v[type] : `${FILE_HOST}${v[type]}?x-oss-process=image/resize,${size}` };
            });
        }
    } else if (validType('string', arr) && arr !== '' && typeof arr === 'string') {
        return isHasHttpUrl(arr) ? arr : `${FILE_HOST}${arr}?x-oss-process=image/resize,${size}`;
    } else {
        return arr;
    }
};

/**
 * @description: 随机生成 DeviceId  
 * @author: PresByter
 * @date  : 2020/06/28 14:57:43
 * @return {string} 返回结果描述 e.g. 634b4f17-0603-f19c-f067-945a7874ec8c
 */
export const uuid = (): string => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +
        S4());
};
/* 用户名 */
export function validUsername(str: string) {
    const regex = /^[a-zA-Z]\w{4,17}$/;
    return regex.test(str);
}

/* 密码 */
export function validPassword(str: string) {
    const regex = /^(?![^a-zA-Z]+$)(?!\D+$)(?![a-zA-Z0-9]+$).{6,16}$/;
    return regex.test(str);
}

/* 手机号 */
export function validMobile(str: string) {
    const regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    return regex.test(str);
}

/* 合法uri */
export function validateURL(textval: string) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

/* 验证邮箱 */
export function validateEmail(email: string) {
    const re = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    return re.test(email);
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait = 500, immediate = true) {
    let timeout;
    // return function () {
    //     // 5、每次当用户点击/输入的时候，把前一个定时器清除
    //     clearTimeout(timeout);
    //     // 6、然后创建一个新的 setTimeout，
    //     // 这样就能保证点击按钮后的 interval 间隔内
    //     // 如果用户还点击了的话，就不会执行 fn 函数
    //     timeout = setTimeout(() => {
    //         func.call(this, arguments);
    //     }, wait);
    // }
    // let timeout;
    return function () {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
    };
}
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait = 500, type = 1) {
    let previous = 0;
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        if (type === 1) {
            const now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        }
    };
}