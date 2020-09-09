import React from 'react'
import Taro, { Config, useRouter, useDidShow } from '@tarojs/taro';
import { View, Button, Text, Block } from '@tarojs/components';
import { observer } from 'mobx-react';
import { wxmpLogin, authWithMobile } from '@/api/auth';
import routers from '@/utils/routers';
import { USER_SPECICAL_INFO } from '@/config/index';
// import { setBehavior } from '@/api/tool';
// import setCCBehavior from '@/utils/behavior';

import tip from '@/utils/tip';
import './login.scss';

const Login = () => {
    const query = useRouter();
    // const [loginCode, setLoginCode] = useState('');

    const handleLogin = async (e) => {
        // TODO: dpfrom 来确定 跳转来源，目前判断从 优惠券 进入
        /**
         * coupon 从 优惠券 进入
         * transfer 二维码进入
         */
        const { params: { dpfrom = '', ...rest } } = query;

        // console.log('login----rest', rest);

        const endParamsUrl = Object.keys(rest).map(item => (`${item}=${rest[item]}`)).join('&');
        const url = `/pages/transfer/transfer?${endParamsUrl}`;
        Taro.checkSession({
            success() {
                //session_key 未过期，并且在本生命周期一直有效
                console.log('success');
            },
            fail() {
                console.log('fail');
                // session_key 已经失效，需要重新执行登录流程
                // wx.login(); //重新登录
            }
        });
        if (e.detail.encryptedData) {
            Taro.login({
                success: async (res2) => {
                    if (res2.code) {
                        // console.log(e.detail);
                        //发起网络请求
                        const tokenres = await authWithMobile({ code: res2.code, wxPhoneNumber: e.detail, registerSrc: rest });
                        // console.log(tokenres);
                        if (tokenres.code === 0) {
                            Taro.setStorageSync(USER_SPECICAL_INFO, tokenres.res);
                            dpfrom === 'coupon' && tip.toast('领取成功，请到红包卡券查看');
                            // setBehavior({ action: 1, phone: tokenres.res.mobile });
                            // setCCBehavior(1, tokenres.res.mobile);
                            if (dpfrom === 'transfer') {
                                // tip.toast('领取成功，请到红包卡券查看');
                                Taro.redirectTo({
                                    url
                                });
                                return false;
                            }
                            Taro.navigateBack({
                                delta: 1
                            });
                        }
                    } else {
                        console.log('登录失败！' + res2.errMsg);
                    }
                }
            });
        } else {
            tip.toast('微信手机号授权失败，用户可点击登录/注册按钮再次唤起微信授权');
        }
    };
    const handleRegister = (e) => {
        // TODO: dpfrom 来确定 跳转来源，目前判断从 优惠券 进入
        /**
         * coupon 从 优惠券 进入
         * transfer 二维码进入
         */
        const { params: { dpfrom = '', ...rest } } = query;
        const endParamsUrl = Object.keys(rest).map(item => (`${item}=${rest[item]}`)).join('&');
        const url = `/pages/transfer/transfer?${endParamsUrl}`;

        Taro.login({
            // Taro.login({
            success: async (res) => {
                if (res.code) {
                    console.log(e.detail);
                    //发起网络请求
                    const resl = await wxmpLogin({ code: res.code });
                    // console.log('login', resl);
                    if (resl.code === 1010103) {//未注册 未登陆
                        if (e.detail.encryptedData) {
                            Taro.login({
                                success: async (res2) => {
                                    if (res2.code) {
                                        // console.log(e.detail);
                                        //发起网络请求
                                        const tokenres = await authWithMobile({ code: res2.code, wxPhoneNumber: e.detail });
                                        // console.log(tokenres);
                                        if (tokenres.code === 0) {
                                            Taro.setStorageSync(USER_SPECICAL_INFO, tokenres.res);
                                            dpfrom === 'coupon' && tip.toast('领取成功，请到红包卡券查看');
                                            // setBehavior({ action: 1, phone: tokenres.res.mobile });
                                            // setCCBehavior(1, tokenres.res.mobile);
                                            if (dpfrom === 'transfer') {
                                                tip.toast('领取成功，请到红包卡券查看');
                                                Taro.redirectTo({
                                                    url
                                                });
                                                return false;
                                            }

                                            Taro.navigateBack({
                                                delta: 1
                                            });
                                        }
                                    } else {
                                        console.log('登录失败！' + res2.errMsg);
                                    }
                                }
                            });
                        } else {
                            tip.toast('微信手机号授权失败，用户可点击登录/注册按钮再次唤起微信授权');
                        }

                    } else if (resl.code === 0) {
                        //已注册 未登陆
                        Taro.setStorageSync(USER_SPECICAL_INFO, resl.res);

                        // setCCBehavior(7, resl.res.mobile);
                        if (dpfrom === 'transfer') {
                            Taro.redirectTo({
                                url
                            });
                            return false;
                        } else {
                            Taro.navigateBack({
                                delta: 1
                            });
                        }
                    }

                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
    };
    const getPhoneNumber = (e: any) => {
        // console.log('手机号', query.params);
        const systemInfo = Taro.getSystemInfoSync();

        // TODO:测试专用,注册可以在手机上完成，登陆走一下流程
        if (systemInfo.platform === 'devtools') {
            handleLogin(e);
            return false;
        }
        e.detail.encryptedData && handleLogin(e);


    };
    const handleRoute = () => {
        Taro.navigateBack({
            delta: 1
        }).catch(() => {
            Taro.redirectTo({
                url: '/pages/index/index'
            });
        });
    };
    useDidShow(() => {
        // Taro.login().then(res => {
        //     console.log(res.errMsg.search('ok'));
        //     (res.errMsg.search('ok') !== -1) && setLoginCode(res.code);
        // });
    });
    return (
        <Block>
            <View className='login-box'>
                <View className='login-title' style="font-family:'sxc';">您好！欢迎来到 </View>
                <View className='login-title' style="font-family:'sxc';">東+会员平台</View>
                <View className='login-content'>体验东方生活美学，</View>
                <View className='login-content'>解锁全新升级会员权益福利～ </View>
                <View className='login-content'>可以获得新人礼包！</View>
                <View className='login-btn-box'>
                    <Button className='login-btn mainbkColor' openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>登录/注册</Button>
                    <Button className='login-brow' onClick={handleRoute.bind(this)}>再逛逛</Button>
                </View>
                <View className='login-rules'>注册或登录即表示您同意我们的 <Text className='login-rules-entry' onClick={routers.bind(this, { url: '/pages/userInfo/protocols/protocols', params: { type: '2' } })}>服务条款、隐私政策</Text></View>
            </View>
        </Block >
    );
};
export default observer(Login);

// Login.config = {
//     navigationBarTitleText: '東+会员小程序'
// } as Config;
