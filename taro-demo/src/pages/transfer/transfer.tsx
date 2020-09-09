/**
 * @description: 跳转协议 ;/pages/transfer?type=<type>&addr=<addr>&src=<source>&login=<boolean>
 * @author: PresByter
 * @date   : 2020/07/13 15:40:39
 * @latest : 2020/07/13 15:40:39
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70257818
 */
import React, { ComponentType } from 'react'
// import { ComponentType } from 'react';
import Taro, { Config, useDidShow, useRouter, useDidHide } from '@tarojs/taro';
import { Block } from '@tarojs/components';
import { observer } from 'mobx-react';
import tip from '@/utils/tip';
// import routers from '@/utils/routers';
import { isLogin, getParamsUrlFormat } from "@/utils/tool";
import { getDecryptParams } from '@/api/tool';

const addrTypes = new Map<string, string>([
    ['1', '/pages/webView/webView'],// - 跳转h5页面，addr省略域名，由小程序端使用固定域名拼接
    ['2', '/pages/index/index'],// - 首页
    ['3', '/pages/solarTerms/solarTerms'],// - 节气页
    ['4', '/pages/myInfo/myInfo'],// - 我的
    ['5', '/pages/goods/goodsDetails/goodsDetails'],// - 商品详情页
    ['6', '/pages/orders/orderConfirm/orderConfirm'],// - 下单页
    ['7', '/pages/orders/ordersList/ordersList'],// - 订单列表页
    ['8', '/pages/orders/orderDetails/orderDetails'],// - 订单详情页
]);
// FIXME:是否对H5地址加锁
const h5Path = new Set([
    '',//我的积分页面
    'IntegralRules',//积分规则
    'IntegralSubsidiary',//积分明细
    'IntegralTransform',//积分转换
    'reccp',//好券领取
    'perfectInformation',//完善信息
    'rankTheRightsAndInterests',//等级权益
    'myCoupon',//我的优惠券
    'couponDetail',//优惠券详情
    'historicalCoupons',//历史优惠券
    'rankTheRightsAndInterestsDetails',//等级权益详情页
    'growthValueRule',//成长值规则
    'cashCardVoucher',//兑换卡券
]);
const Transfer = () => {
    // const [showpup, setShowpup] = useState(false)
    const router = useRouter();
    // 获取场景值
    const scenes = Taro.getLaunchOptionsSync();

    const allParams = { ...router.params, ...scenes.query };

    console.log('scenes', { ...router.params, ...scenes.query });
    console.log('scenes--all', { ...scenes });

    const redirectTo = (url = '', addr = '') => {
        // const tempUrl = url.search('id=') === -1 ? `${url}&id=${addr}` : url;
        Taro.redirectTo({
            // url: `${url}&id=${addr}`
            // url: tempUrl
            url
        });
    };
    const reLaunch = (url = '') => {
        Taro.reLaunch({
            url: url
        });
    };

    const naviTypes = new Map<string, any>([
        ['1', redirectTo],// - 跳转h5页面，addr省略域名，由小程序端使用固定域名拼接
        ['2', reLaunch],// - 首页
        ['3', reLaunch],// - 节气页
        ['4', reLaunch],// - 我的
        ['5', redirectTo],// - 商品详情页
        ['6', redirectTo],// - 下单页
        ['7', redirectTo],// - 订单列表页
        ['8', redirectTo],// - 订单详情页
    ]);
    const handleRoute = (params) => {
        const { type = '', addr = '', dpfrom = 'transfer', login = 'false', ...rest } = params;
        const endParamsUrl = Object.keys(rest).map(item => (`${item}=${rest[item]}`)).join('&');
        const url = `${addrTypes.get(type)}?addr=${addr}&${endParamsUrl}`;
        // console.log('url', url);

        if (login === 'true' && !isLogin()) {//强制登陆
            Taro.redirectTo({
                url: `/pages/login/login?type=${type}&addr=${addr}&dpfrom=transfer&${endParamsUrl}`
            });
            return false;
        }
        if (type === '1' && !isLogin()) {//跳转到 H5之前 用户必须登陆。
            Taro.redirectTo({
                url: `/pages/login/login?type=${type}&addr=${addr}&dpfrom=transfer&${endParamsUrl}`
            });
            return false;
        }
        // 跳转 订单 所有页面要跳转 登陆
        if (['6', '7', '8'].includes(type) && !isLogin()) {
            Taro.redirectTo({
                url: `/pages/login/login?type=${type}&addr=${addr}&dpfrom=transfer&${endParamsUrl}`
            });
            return false;
        }

        if (!naviTypes.get(type)) {
            tip.toast('参数错误！');
            Taro.navigateBack({
                delta: 1
            });
            return false;
        }

        naviTypes.get(type) && naviTypes.get(type)(url, addr);
        // routers({
        //     url,
        //     params: { id: addr }
        // });
    };
    useDidShow(async () => {
        tip.loading();
        // TODO: 需要对；豫园 和 登陆 进行 鉴权 处理。
        /**
         * src: 来源，按照豫园来源字段配置，注册作为用户来源传入
         * login:  是否强制登录，会先进入登录页面登录后，再进入对应页面
         * type: 参见下表
         * addr: 需要传的参数，参见下表
         */

        if (allParams.hasOwnProperty('scene')) {
            // 二维码进入
            const { scene = '' } = allParams;
            const payload = decodeURIComponent(`${scene}`);
            console.log('payload', payload);
            payload.length === 32 ? getDecryptParams({ md5: payload }).then(res => {
                // console.log(getParamsUrlFormat(res.res));
                res.code === 0 && handleRoute(getParamsUrlFormat(res.res));
            }) : handleRoute(getParamsUrlFormat(payload));
            return;
        } else if (allParams.hasOwnProperty('dpfrom')) {
            // 普通路由进入 
            handleRoute(allParams);
        } else {
            handleRoute(allParams);
        }


    });

    useDidHide(() => {
        tip.loaded();
    });

    return (
        <Block>
        </Block >
    );
};
export default observer(Transfer) as ComponentType;

// Transfer.config = {
//     navigationBarTitleText: ''
// } as Config;
