import React, { useState, useContext, } from 'react';
import Taro, { Config, useDidShow, usePullDownRefresh, useTabItemTap } from '@tarojs/taro';
import { View, Button, Text, Block, Image, RichText } from '@tarojs/components';
import { observer } from 'mobx-react';
import { userCenter, userCCInfo, userCenterBk, orderNums, userCCcoupon } from '@/api/mine';
import { setUserInfo } from '@/api/auth';
import CCApi from '@/types/cc';
import Mine from '@/types/mine';
import { isLogin, addUrlPrefix } from "@/utils/tool";
import routers from '@/utils/routers';
import IIcon from '@/components/IIcon';
import yuyuanTrack from '@/utils/eventTracking';
// import { USER_AVATER1, USER_AVATER2 } from '@/config/index';
import { USER_SPECICAL_INFO } from '@/config/index';
import USER_AVATER1 from '@/assets/images/avatar0.png';
import USER_AVATER2 from '@/assets/images/avatar1.png';
import SH from '@/assets/images/sh.png';
import DZF from '@/assets/images/dzf.png';
import DFH from '@/assets/images/dfh.png';
import DSH from '@/assets/images/dsh.png';
import YWC from '@/assets/images/ywc.png';
import Vip2 from '@/assets/images/vip2.png';
import Vip1 from '@/assets/images/vip1.png';
import coupon from '@/assets/images/coupon.png';
import Store from '@/store/order';
import './myInfo.scss';

interface MyInfo extends CCApi.UserCenterResData, Mine.UserOrdeNums { }
interface OrderNumsType {
    waitPayedCount: number
    waitDeliveryCount: number
    waitReceiveCount: number
}
const ORDER_STATUS = new Map<number, string>([
    [0, '我的_全部订单'],
    [1, '我的_待付款'],
    [2, '我的_待发货'],
    [3, '我的_待收货'],
    [6, '我的_已完成'],
]);
const MyInfo = () => {
    const { setOrderData } = useContext(Store) as any;
    const [background, setBackground] = useState('');
    const [orderNumsData, setOrderNumsData] = useState({ waitPayedCount: 0, waitDeliveryCount: 0, waitReceiveCount: 0, } as OrderNumsType);
    const [wxUserInfo, setWxUserInfo] = useState({} as MyInfo);
    // const [ccUserInfo, setCcUserInfo] = useState({} as MyInfo);
    const [couponList, setCouponList] = useState([] as CCApi.CouponInfoDatum[]);
    // app.accountId('set', 'user', 'openid', '{openid}');
    useTabItemTap(() => {
        yuyuanTrack({ type: 'home3', label: '我的_底部tab' });
    });
    useDidShow(async () => {
        userCenterBk().then(res => {
            res.code === 0 && setBackground(res.res.background as '');
        });
        // FIXME:这里用户信息 以 东家为准
        if (isLogin()) {
            // Taro.showLoading({
            //     title: '加载中',
            // });
            const userInfoData = await userCenter();
            const userOrderData = await orderNums();
            setOrderNumsData({ ...userOrderData.res });
            setWxUserInfo({ ...wxUserInfo, ...userInfoData.res, ...userOrderData.res } as MyInfo);
            try {

                const userCCData = await userCCInfo({ Phone: userInfoData && userInfoData.res && userInfoData.res.mobile as '' });
                const userCCcouponData = await userCCcoupon({ phone: userInfoData && userInfoData.res && userInfoData.res.mobile as '' });
                userCCcouponData.state == 1 && setCouponList(userCCcouponData.data);

                setWxUserInfo({ ...wxUserInfo, ...userCCData.data, ...userInfoData.res, ...userOrderData.res } as MyInfo);
                Taro.hideLoading();
            } catch (error) {

            }

        }
    });
    // 用户状态
    const myStatus = (needWxUserInfo: boolean) => {
        // const { needWxUserInfo } = wxUserInfo
        // console.log('wxUserInfo', isLogin() && needWxUserInfo);
        // 注册-未登录
        if (isLogin() && needWxUserInfo) {
            return '1';
        }
        // 注册-已登陆
        else if (isLogin() && !needWxUserInfo) {
            return '2';
        }
        // 未注册
        else {
            return '0';
        }
    };
    // 用户头像
    const myAvater = () => {
        const { avatar, needWxUserInfo = false } = wxUserInfo;
        const type = myStatus(needWxUserInfo);
        return type === '0' ? USER_AVATER1 : type === '1' ? USER_AVATER2 : (addUrlPrefix(avatar) || USER_AVATER2);
    };
    const handleRoute = (url = "", params = {}, label = '') => {
        // yuyuanTrack({ type: 'home3', label: label });

        isLogin() ? routers({
            url,
            params
        }) : routers({
            url: '/pages/login/login',
            params
        });
        // console.log('label', typeof label,);
        typeof label === 'string' && label !== '' && yuyuanTrack({ type: 'home3', label: label });
    };
    // 授权用户信息
    const handleAvaterRoute = (e) => {
        const usrInfo = Taro.getStorageSync(USER_SPECICAL_INFO);
        const { errMsg } = e.detail;
        errMsg.search('ok') !== -1 && wxUserInfo.needWxUserInfo && Taro.login().then(loginRes => {
            // console.log(loginRes);
            setUserInfo({ code: loginRes.code, wxUserInfo: e.detail }).then(async (res) => {
                // console.log(res);
                if (res.code === 0) {
                    // 更新缓存
                    Taro.setStorageSync(USER_SPECICAL_INFO, { ...usrInfo, ...res.res });
                    const userInfoData = await userCenter();
                    setWxUserInfo({ ...wxUserInfo, ...userInfoData.res } as MyInfo);
                    const userCCData = await userCCInfo({ Phone: userInfoData && userInfoData.res && userInfoData.res.mobile as '' });
                    setWxUserInfo({ ...wxUserInfo, ...userCCData.data, ...userInfoData.res } as MyInfo);
                }

            });
        });
        errMsg.search('fail') !== -1 && Taro.showToast({ title: '授权失败！', icon: 'none' });

    };
    const gotoOrderList = (id: number) => {
        setOrderData({ status: id });
        isLogin() ? routers({
            url: '/pages/orders/ordersList/ordersList',
            params: { id }
        }) : routers({
            url: '/pages/login/login',
        });
        yuyuanTrack({ type: 'home3', label: ORDER_STATUS.get(id) });
    };
    usePullDownRefresh(async () => {
        // Taro.showLoading({
        //     title: '加载中',
        // });
        const userInfoData = await userCenter();
        const userOrderData = await orderNums();
        setOrderNumsData({ ...userOrderData.res });
        setWxUserInfo({ ...wxUserInfo, ...userInfoData.res, ...userOrderData.res } as MyInfo);
        try {
            const userCCData = await userCCInfo({ Phone: userInfoData && userInfoData.res && userInfoData.res.mobile as '' });
            const userCCcouponData = await userCCcoupon({ phone: userInfoData && userInfoData.res && userInfoData.res.mobile as '' });
            userCCcouponData.state == 1 && setCouponList(userCCcouponData.data);
            setWxUserInfo({ ...wxUserInfo, ...userCCData.data, ...userInfoData.res, ...userOrderData.res } as MyInfo);
            Taro.hideLoading();
            Taro.stopPullDownRefresh();
        } catch (error) {
            Taro.stopPullDownRefresh();
        }
    });
    // H5 跳转
    const handleRouteToH5 = (params = {}, label = '') => {
        if (isLogin()) {
            const { uid = '' } = wxUserInfo;
            if (uid === '') {
                Taro.showToast({ title: '信息获取失败，请重试', icon: 'none' });
                return false;
            }
            yuyuanTrack({ type: 'home3', label: label });
            routers({
                // url: typeof url === 'string' ? url : "/pages/webView/webView",
                url: "/pages/webView/webView",
                params: { type: '1', ...params }
            });
        } else {
            routers({
                url: '/pages/login/login',
                params
            });
        }
    };
    // 渲染 红点
    const renderDot = (num: number) => {
        return (num > 0 ? <View className='my-order-dot'>{num > 99 ? '···' : num}</View> : null);
    };
    // 渲染 头像 权限
    const renderAvater = () => {
        if (isLogin() && !wxUserInfo.needWxUserInfo) {
            // 登陆 已授权
            return (<Image className='my-avater' src={myAvater()} ></Image>);
        } else if (isLogin() && wxUserInfo.needWxUserInfo) {
            // 登陆 未授权
            return (<Button className='nobtn' openType='getUserInfo' onGetUserInfo={handleAvaterRoute}>
                <Image className='my-avater' src={myAvater()} ></Image>
            </Button>);
        } else if (!isLogin()) {
            // 未登陆
            return (<Image className='my-avater' src={myAvater()} onClick={() => routers({
                url: '/pages/login/login',
            })}
            ></Image>);
        }
    };
    const comptuedTitle = (title: string) => {
        return `<p class="my-usecp-txt l2eps" style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;white-space: pre-wrap;">${title}</p>`;
    };
    return (
        <Block>
            {/* <Image src='https://img.dongplus.cn/5a90c1c968d21e133e262c601579452f.jpeg?x-oss-process=image/resize,w_375'></Image> */}
            <View className='my-box'>
                {/* <View className='my-box-bk' style={`background-image: url(${addUrlPrefix(background as '')});`}></View> */}
                <View className='my-box-bk' style={{
                    backgroundImage:`url(${addUrlPrefix(background as '')})`,
                }}></View>
                <View className='my-navbar'></View>
                <View className='my-box-top'>
                    {/* {isLogin() ? <Button className='nobtn' openType='getUserInfo' onGetUserInfo={handleAvaterRoute}>
                        <Image className='my-avater' src={myAvater()} ></Image>
                    </Button> : <Image className='my-avater' src={myAvater()} onClick={() => routers({
                        url: '/pages/login/login',
                    })}
                    ></Image>
                    } */}
                    {renderAvater()}
                    <View className='my-info'>
                        {isLogin() ? <View className='my-info-detail'>
                            <Text className='l1eps' style='max-width:360rpx'>{wxUserInfo.name}</Text>
                            <Image className='my-level-logo' src={Vip1}></Image>
                            <Text className='my-level'>{wxUserInfo.levelName}</Text>
                            <IIcon size='14' type='edit' color='#ffffff' onClick={handleRouteToH5.bind(this, { addr: 'perfectInformation' })}></IIcon>
                        </View> : <View className='my-info-detail' onClick={handleRoute.bind(this, '/pages/login/login')}>
                                点击登录注册
                            </View>}
                        {isLogin() ? <Block>
                            {wxUserInfo.accountNo ? <Text className='my-info-id'>ID:{wxUserInfo.accountNo}</Text> : null}
                            {wxUserInfo.growthValue ? <Text className='my-info-val'>成长值:{wxUserInfo.growthValue || 0}</Text> : null}
                        </Block> : <Text className='my-info-val' onClick={handleRoute.bind(this, '/pages/login/login')}>显示更多精彩</Text>}

                    </View>
                </View>
                <View className='my-box-center'>
                    <View className='my-item' onClick={handleRouteToH5.bind(this, { addr: '' }, '我的_我的积分')}>
                        <Text className='my-item-num'>{isLogin() ? wxUserInfo.usablePoint || 0 : '-'}</Text>
                        <Text className='my-item-name'>我的积分</Text>
                    </View>
                    <View className='my-item' onClick={handleRouteToH5.bind(this, { addr: 'myCoupon' }, '我的_我的优惠券')}>
                        <Text className='my-item-num'>{isLogin() ? wxUserInfo.usableCouponCount || 0 : '-'}</Text>
                        <Text className='my-item-name'>我的优惠券</Text>
                    </View>
                    <View className='my-item' onClick={handleRoute.bind(this, '/pages/userInfo/myCollect/myCollect', { from: 'home' }, '我的_我的收藏')}>
                        <Text className='my-item-num'>{isLogin() ? wxUserInfo.collectCount || 0 : '-'}</Text>
                        <Text className='my-item-name'>我的收藏</Text>
                    </View>
                </View>
                {(isLogin() && wxUserInfo.uid !== '') ? <View className='my-box-bottom' onClick={handleRouteToH5.bind(this, { addr: 'rankTheRightsAndInterests' })}>
                    <View className='my-box-cotent'>
                        <Image className='my-order-img' src={Vip2}></Image>
                        <Text style='margin-left:20rpx'>东+您已拥有价值3888的权益</Text>
                    </View>
                    <IIcon type='right' color='#ffffff' size='26'></IIcon>
                </View> : <View className='my-box-bottom' style='padding:0' ></View>
                }
            </View>
            <View className='my-bar'>
                <View className='my-title' style="font-family:'sxc';">我的订单</View>
                <View className='my-more' onClick={gotoOrderList.bind(this, 0)}>查看全部</View>
            </View>
            <View className='my-order'>
                <View className='my-order-l'>
                    <View className='my-order-item' onClick={gotoOrderList.bind(this, 1)}>
                        <Image className='my-order-img' src={DZF}></Image>
                        <Text className='my-order-text'>待付款</Text>
                        {renderDot(orderNumsData.waitPayedCount)}
                        {/* {orderNumsData.waitPayedCount > 0 ? <View className='my-order-dot'>{orderNumsData.waitPayedCount > 99 ? '···' : orderNumsData.waitPayedCount}</View> : null} */}
                    </View>
                    <View className='my-order-item' onClick={gotoOrderList.bind(this, 2)}>
                        <Image className='my-order-img' src={DFH}></Image>
                        <Text className='my-order-text'>待发货</Text>
                        {renderDot(orderNumsData.waitDeliveryCount)}
                        {/* {orderNumsData.waitDeliveryCount > 0 ? <View className='my-order-dot'>{orderNumsData.waitDeliveryCount > 99 ? '···' : orderNumsData.waitDeliveryCount}</View> : null} */}

                    </View>
                    <View className='my-order-item' onClick={gotoOrderList.bind(this, 3)}>
                        <Image className='my-order-img' src={DSH}></Image>
                        <Text className='my-order-text'>待收货</Text>
                        {renderDot(orderNumsData.waitReceiveCount)}
                        {/* {orderNumsData.waitReceiveCount > 0 ? <View className='my-order-dot'>{orderNumsData.waitReceiveCount > 99 ? '···' : orderNumsData.waitReceiveCount}</View> : null} */}

                    </View>
                    <View className='my-order-item' onClick={gotoOrderList.bind(this, 6)}>
                        <Image className='my-order-img' src={YWC}></Image>
                        <Text className='my-order-text'>已完成</Text>
                    </View>
                    <View className='my-order-item' onClick={handleRoute.bind(this, '/pages/orders/orderAfter/orderAfter')}>
                        <Image className='my-order-img' src={SH}></Image>
                        <Text className='my-order-text'>售后</Text>
                    </View>
                </View>
                {/* <View className='my-order-line'></View>
                <View className='my-order-r' onClick={handleRoute.bind(this, '/pages/orders/orderAfter/orderAfter')}>
                    <Image className='my-order-img' src={SH}></Image>
                    <Text className='my-order-text'>售后</Text>
                </View> */}
            </View>
            {!isLogin() && <View className='my-coupon'>
                <Image src={coupon} onClick={handleRoute.bind(this, '/pages/login/login', { dpfrom: 'coupon' })} style='border-radius:10rpx;width:100%' mode='widthFix'></Image>
            </View>}

            {couponList.length > 0 && <View className='my-usecp' onClick={handleRouteToH5.bind(this, { addr: 'reccp' }, '我的_好券领取')}>
                <View className='my-usecp-in'>进入领取</View>
                <View style="font-family:'sxc';">更多惊喜好礼 尽在好券领取</View>
                <View className='my-usecp-list'>
                    {couponList.map(item => (
                        <View key={item.id} className='my-usecp-item'>
                            {/* <View className='my-usecp-picbox' style='width:36px;height:36px'> */}
                            <View className='my-usecp-picbox'>
                                <Image className='my-usecp-pic' src={item.thumb}></Image>
                            </View>
                            {/* <View className='my-usecp-txt l2eps' style='max-width:180rpx'>大海俄代恶化大额的话{item.couponName}</View> */}
                            <RichText nodes={comptuedTitle(item.couponName)}></RichText>
                        </View>
                    ))}
                </View>
            </View>}

            <View className='my-bar' style='margin-top:12rpx'>
                <View className='my-title'>功能列表</View>
            </View>

            <View className='my-bar rbb' onClick={handleRoute.bind(this, '/pages/userInfo/address/address', { from: 'home' }, '我的_收货地址')}>
                <View className='my-title-m'>收货地址</View>
                <IIcon type='right' color='#666666' size='24'></IIcon>
            </View>
            <View className='my-bar rbb' >
                <Button className='nobtn my-kefu' openType='contact' onClick={() => yuyuanTrack({ type: 'home3', label: '我的_客服' })}>
                    <View className='my-title-m'>東+客服</View>
                    <IIcon type='right' color='#666666' size='24'></IIcon>
                </Button>
            </View>
            <View className='my-bar rbb' onClick={routers.bind(this, { url: '/pages/userInfo/protocols/protocols', params: { type: '1', f: 'home', addr: 'www', i: 123 } })}>
                <View className='my-title-m'>关于東+</View>
                <IIcon type='right' color='#666666' size='24'></IIcon>
            </View>
            {/* <View onClick={() => {
                routers({
                    url: "/pages/transfer/transfer",
                    params: { type: '1', addr: 'reccp', id: '79' }
                });
            }}
            >测试跳转59，76，79</View> */}
        </Block >
    );
};
export default observer(MyInfo);

// MyInfo.config = {
//     navigationBarTitleText: '我的',
//     "navigationBarBackgroundColor": "#CEB187",
//     navigationStyle: 'custom',
//     enablePullDownRefresh: true,
//     backgroundTextStyle: 'dark'
// } as Config;
