import React, { useState, useEffect, useContext } from 'react';
import Taro, { Config, } from '@tarojs/taro';
import { View, Button, Text, Block, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import { wxmpLogin, authWithMobile } from '@/api/auth';
import Store from '@/store/todo';
import routers from '@/utils/routers';

const Tempalte = (props: any) => {
    const [count, setCount] = useState(0);
    const [wxUserInfo, setWxUserInfo] = useState({});
    const { todos, toggle, add, completedCount, total } = useContext(Store) as any;
    const list = todos.map((todo, index) => {
        const { title, key, completed } = todo;
        return (
            <View
                key={key}
                onClick={() => toggle(index)}
                className={completed ? 'completed' : 'un-completed'}
            >
                {title}
            </View>
        );
    });
    useEffect(() => {
        // console.log('props', props);
        // console.log(validType('Datea', new Date()));
        // console.log(formatTime(new Date().valueOf()));
        // const subscription = props.source.subscribe();
        return () => {
            // 清除订阅
            // subscription.unsubscribe();
        };
    }, [props]);
    const getUserInfos = (e: any) => {
        Taro.login({
            success: async (res) => {
                if (res.code) {
                    console.log(e.detail);
                    setWxUserInfo(e.detail);
                    //发起网络请求
                    const resl = await wxmpLogin({ code: res.code, wxUserInfo: e.detail });
                    console.log(resl);
                    // const tokenres = await authWithMobile({ code: res.code, wxUserInfo: e.detail })
                    // console.log(tokenres);

                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });
        console.log((e.detail));
    };
    const getPhoneNumber = (e: any) => {
        console.log(e.detail);
        Taro.login({
            success: async (res) => {
                if (res.code) {
                    // console.log(e.detail);
                    //发起网络请求
                    // const resl = await wxmpLogin({ code: res.code, wxUserInfo: e.detail })
                    // console.log(resl);
                    const tokenres = await authWithMobile({ code: res.code, wxUserInfo: wxUserInfo });
                    console.log(tokenres);
                    tokenres.code === 0 && Taro.setStorageSync("USER_SPECICAL_INFO", tokenres.res);

                } else {
                    console.log('登录失败！' + res.errMsg);
                }
            }
        });

    };
    const handleRoute = (url = "") => {
        routers({
            url: url,
            params: { id: count }
        });
    };
    return (
        <Block>
            <View>模版-页面</View>
            <Button onClick={handleRoute.bind(this, '/pages/goods/goodsDetails/goodsDetails')}>商品详情页面 页面</Button>
            请输入商品id：<Input placeholder='请输入跳转商品的id' type='number' value={`${count}`} onInput={e => {
                setCount(+e.detail.value);
            }}
            ></Input>
            <Button onClick={handleRoute.bind(this, '/pages/myIntegral/myIntegral')}>myIntegral 页面</Button>
            <Button onClick={handleRoute.bind(this, '/pages/demo/index')}>demo 页面</Button>
            <View>{list}</View>
            {/* <RichText>发大水发大\n水范德萨富士达</RichText> */}
            <Text style='white-space: pre-wrap!important;word-wrap: break-word!important;'> 已完成：{completedCount} / {total}n水范
            德萨富士达n水
            范德萨富士达</Text>
            <Button onClick={add}>添加</Button>
            <View>Tempalte</View>
            <Button openType='getUserInfo' onGetUserInfo={getUserInfos}>获取用户信息</Button>
            <Button openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>获取用户手机号</Button>
            <Text>Count {count}</Text>
            <Button onClick={setCount.bind(this, 0)}>Reset</Button>
            <Button onClick={setCount.bind(this, (prevCount: number) => prevCount + 1)}>+</Button>
            <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
            <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
        </Block >
    );
};
export default observer(Tempalte);

Tempalte.config = {
    navigationBarTitleText: '模版页面'
} as Config;
