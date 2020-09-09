import { HttpError } from "../types/config";

const DJenv = new Map<string, string>([
    ['regress', '-regress'],
    ['test', '-test'],
    ['production', ''],
    ['dev', '-dev'],
    ['default', '-dev'],
]);
const useDJEnv = DJenv.get(process.env.API_ENV);
// FIXME: 东家 正式 CC test环境
// 豫园 相关 请求 地址
const CCenv = new Map<string, string>([
    ['regress', 'https://crm-api.yuyuantm.com.cn/'],
    ['test', 'https://test-crm-api.yuyuantm.com.cn/api/'],
    ['production', 'https://test-crm-api.yuyuantm.com.cn/api/'],
    // ['production', 'https://crm-api.yuyuantm.com.cn/'],
    ['dev', 'https://crm-api-dev2.chiefclouds.cn/'],
    ['default', 'https://crm-api-dev2.chiefclouds.cn/'],
]);
const useCCEnv = CCenv.get(process.env.API_ENV) || DJenv.get('default');

// 豫园 相关 H5 地址
const CCH5env = new Map<string, string>([
    ['regress', 'https://crm-dongplus.yuyuantm.com.cn/#/'],
    ['test', 'https://test-h5dongplus.yuyuantm.com.cn/#/'],
    ['production', 'https://test-h5dongplus.yuyuantm.com.cn/#/'],
    // ['production', 'https://crm-dongplus.yuyuantm.com.cn/#/'],
    ['dev', 'https://h5dongplus-dev.chiefclouds.cn/#/'],
    ['default', 'https://h5dongplus-dev.chiefclouds.cn/#/'],
]);
const useCCH5Env = CCH5env.get(process.env.API_ENV) || DJenv.get('default');

// 文件前缀
export const FILE_HOST = `https://img${useDJEnv}.dongplus.cn/`;

// 小程序 appid
export const APPID = () => ('wx34a17cc62c2a2670');

// 请求接口的 基础域名
export const BASE_URL = `https://api${useDJEnv}.dongplus.cn/api/`;

// 豫园 相关 请求 地址
export const CC_BASE_URL = useCCEnv;

// 豫园 相关 H5 地址
export const CC_H5_BASE_URL = useCCH5Env;

// 小程序默认首页 鉴权失败之后，跳到此页面
export const HOME_PATH = '/pages/index/index';

// 公司 logo
export const LOGO = 'https://file.idongjia.cn/T3zQETBCDT1R4cSCrK.png';
// 用户头像 灰1  黄2
export const USER_AVATER1 = 'https://dp-img-dev.idongjia.cn/357d982967e54f0d9fa15d05834831e3.png';
export const USER_AVATER2 = 'https://dp-img-dev.idongjia.cn/e6751b0334d9463aa82ad17af8c3ec3c.png';

/**
 * 用户 存放 openid 的字段
 * @type {String}
 */
export const OPEN_ID = "openid";
/**
 * 用户code 存放 token 的字段
 * @type {String}
 */
export const USER_SPECICAL_INFO = "userSpecialInfo";

/**
 * 用户信息
 * @type {String}
 */
export const USER_INFO = "userInfo";

/**
 * 系统信息
 * @type {String}
 */
export const SYSTEM_INFO = "systemInfo";

export const CITY_CODE = "cityCode";
// 公共样式
export const DJ_STYLE = {
    djColor: '#E7831D',
    djBrandColor: '#CEB187'
};
export const SEL_CLASS_CODE = "selClassCode";
export const CITY_LAST_UPDATE_TIME = "cityLastUpdateTime";
export const TABS = "tabs";
export const TABS_EXPIRE = "tabsExpire";
export const DEVICENUMBER = "deviceNumber";

// 小程序状态码
export const HTTP_ERROR: HttpError = {
    '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    '401': '用户没有权限（令牌、用户名、密码错误）。',
    '403': '用户得到授权，但是访问是被禁止的。',
    '404': '请求不存在',
    '406': '请求的格式不可得。',
    '410': '请求的资源被永久删除，且不会再得到的。',
    '422': '当创建一个对象时，发生一个验证错误。',
    '500': '服务器发生错误，请检查服务器。',
    '502': '网关错误。',
    '503': '服务不可用，服务器暂时过载或维护。',
    '504': '网关超时。',
};
