import React, { useState, useEffect, } from 'react';
import Taro, { Config, useRouter, useDidShow, useDidHide } from '@tarojs/taro';
import { Block, WebView } from '@tarojs/components';
import { observer } from 'mobx-react';
import { CC_H5_BASE_URL, USER_SPECICAL_INFO } from '@/config/index';
import configMethods from '../../utils/request/configMethods';
// import Store from '../../store/todo'

const h5PathTitle = new Map<string, string>([
    ['', '我的积分页面'],//
    ['IntegralRules', '积分规则'],//
    ['IntegralSubsidiary', '积分明细'],//
    ['IntegralTransform', '积分转换'],//
    ['reccp', '好券领取'],//
    ['perfectInformation', '完善信息'],//
    ['rankTheRightsAndInterests', '等级权益'],//
    ['myCoupon', '我的优惠券'],//
    ['couponDetail', '优惠券详情'],//
    ['historicalCoupons', '历史优惠券'],//
    ['rankTheRightsAndInterestsDetails', '等级权益详情页'],//
    ['growthValueRule', '成长值规则'],//
    ['cashCardVoucher', '兑换卡券'],//
]);

const WebViewPage = () => {
    const params = useRouter();
    const [weburl, setWeburl] = useState<string>('');

    useDidShow(() => {
        const { addr, ...rest } = params.params;
        const userInfo = Taro.getStorageSync(USER_SPECICAL_INFO);
        // Taro.setNavigationBarTitle({
        //     title: '网页'
        // })
        const endParamsUrl = Object.keys(rest).map(item => (`${item}=${rest[item]}`)).join('&');
        // FIXME:https://h5dongplus-dev.chiefclouds.cn/#/myCoupon?token=fd2a75ed82a6423591f13664312ad7ef&DeviceId=1234&phone=18811222233
        // 在 真机上 始终跳转同一个页面 问题
        // 1. url 加上 时间戳  &t=${new Date().getTime()}
        // 2. 返回当前页面的时候 清空所有的 url 连接
        // 
        const weburltemp = `${CC_H5_BASE_URL}${addr}?token=${configMethods.getToken()}&deviceid=${configMethods.getDeviceId()}&t=${new Date().getTime()}&phone=${userInfo.mobile}&${endParamsUrl}`;
        console.log('webview', weburltemp, params.params);
        setWeburl(weburltemp);

    });
    useDidHide(() => {
        setWeburl('');
    });
    useEffect(() => {
        return () => {
            setWeburl('');
            // console.log('关闭webview');
        };
    }, []);
    const handleMessage = (e: any) => {
        console.log(e);
    };

    return (
        <Block>
            <WebView src={weburl} onMessage={handleMessage} onLoad={handleMessage} />
        </Block >
    );
};
export default observer(WebViewPage);

// WebView.config = {
//     navigationBarTitleText: ''
// } as Config;
