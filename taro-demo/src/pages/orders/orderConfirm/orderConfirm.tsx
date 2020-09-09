import React, { useState, useContext, } from 'react';
import Taro, { Config, useDidShow, useRouter } from '@tarojs/taro';
import { View, Button, Block, Input, Textarea, Text } from '@tarojs/components';
import { observer } from 'mobx-react';
import { getItemDetail, defaultAddress } from '@/api/order';
import IIcon from '@/components/IIcon';
import Store1 from '@/store/address';
import Pay from '@/utils/requestPay';
import routers from '@/utils/routers';
import Orders from '@/types/order';
import tip from '@/utils/tip';
import IImage from '@/components/IImage';
import yuyuanTrack from '@/utils/eventTracking';
import './OrderConfirm.scss';

const OrderConfirm = () => {
    const params = useRouter();
    const [goodCount, setCount] = useState(1);
    const [postal, setPostal] = useState(false);
    const { orderAddressesData: AddressesChecked } = useContext(Store1) as any;
    const [platform, setPlatform] = useState('');
    const [comment, setComment] = useState('');
    const [addressDetail, setAddress] = useState({ id: 1, name: '', mobile: '', regionPathNames: [], place: '' });
    const [orderItem, setOrderItem] = useState({} as Orders.OrderBalanceItem);
    //商品详情
    const getDetail = () => {
        getItemDetail({ skuId: parseInt(params.params.id) }).then(res => {
            if (res.code === 1000001) {
                routers({
                    url: '/pages/login/login'
                });
                return false;
            }
            if (res.code == 1030302016) {
                tip.toast(res.msg);
                setTimeout(() => {
                    Taro.navigateBack({
                        delta: 1
                    });
                }, 1000);
            }
            console.log(Taro.getCurrentPages()[Taro.getCurrentPages().length - 2].route + '?id=' + Taro.getCurrentPages()[Taro.getCurrentPages().length - 2].options.id);
            setOrderItem(res.res.orderItem);
        });
    };
    //下单
    const gotoPay = () => {
        if (addressDetail.regionPathNames.length < 1) {
            tip.toast(`请完善收货信息`);
            return;
        }
        if (goodCount > orderItem.stock) {
            tip.toast(`库存数量不足，仅能购买${orderItem.stock}件`);
            return;
        }
        yuyuanTrack({ type: 'payOrder', label: '确认订单_立即付款弹窗' });
        Pay.gotoPay(orderItem.version, goodCount, parseInt(params.params.id), addressDetail.id, comment, 'confirm');
    };
    //默认地址
    const getDefaultAddress = () => {
        defaultAddress().then(res => {
            console.log(res.res);
            let address;
            if (res.res) {
                if (AddressesChecked.address) {

                    address = {
                        id: AddressesChecked.id,
                        name: AddressesChecked.name,
                        mobile: AddressesChecked.mobile,
                        regionPathNames: [...AddressesChecked.regionPathNames],
                        place: AddressesChecked.regionPathNames.join('') + AddressesChecked.address
                    };
                } else {
                    address = {
                        id: res.res.id,
                        name: res.res.name,
                        mobile: res.res.mobile,
                        place: res.res.regionPathNames.join('') + res.res.address,
                        regionPathNames: [res.res.regionPathNames],
                    };
                }
                setAddress(address);
                setPostal(true);
            }
        });
    };
    //商品数量

    const quantityChange = (val) => {
        console.log(val);
        // debugger;
        console.log(orderItem);
        if (val < 1) {
            tip.toast(`很抱歉，该商品至少购买1件`);
            setCount(1);

        } else if (orderItem.stock < val) {
            tip.toast(`库存数量不足，仅能购买${orderItem.stock}件`);
            setCount(orderItem.stock);
        } else {
            setCount(val);
        }
    };
    const quantitySet = (val) => {
        console.log(val);
        setCount(parseInt(val));

    };
    //编辑地址
    const gotoAddress = () => {
        routers({
            url: '/pages/userInfo/address/address'
        });
    };
    const addAddress = () => {
        routers({
            url: '/pages/userInfo/addressEdit/addressEdit'
        });
    };
    //备注
    const connentChange = e => {
        console.log(e.detail.value);
        setComment(e.detail.value);
    };
    useDidShow(() => {
        const res = Taro.getSystemInfoSync();
        console.log(params.params);
        if (res.platform == 'ios') {
            setPlatform('ios');
        } else {
            setPlatform('android');
        }
        setCount(parseInt(params.params.num) || 1);
        getDetail();
        getDefaultAddress();
    });


    return (
        <Block>
            <View>
                {
                    postal ? <View className='address' onClick={gotoAddress}>
                        <View className='icon'>
                            <IIcon type='location' size='24' color='#666666'></IIcon>
                        </View>
                        <View className='detail'>
                            <View className='consignee'>
                                <View className='name'>收货人：{addressDetail.name}</View>
                                <View className='phone'>
                                    {addressDetail.mobile}
                                    <View className='goto'>
                                        <IIcon type='right' size='24' color='#666666'></IIcon>
                                    </View>
                                </View>
                            </View>
                            <View className='place'>
                                收货地址：{addressDetail.place}
                            </View>
                        </View>
                    </View> : <View className='no_address' onClick={addAddress}>
                            <View className='icon'>
                                <IIcon type='location' size='30' color='#666666'></IIcon>
                            </View>
                            <View className='tip'>设置收货信息</View>
                            <View className='goto'><IIcon type='right' size='26' color='#666666'></IIcon></View>
                        </View>
                }
                <View className='itemCard'>

                    <View className='cardContent' >
                        <View className='itemPic'>
                            <IImage src={orderItem.cover}></IImage>
                        </View>

                        <View className='itemDetail'>
                            <View className='title'>
                                {orderItem.title}
                            </View>
                            <View className='nature'>
                                {orderItem.skuProperty}
                            </View>
                            <View className='price'>
                                <View className='actual'>
                                    ￥{(orderItem.realpay / 100).toFixed(2)}
                                    {
                                        orderItem.realpay == orderItem.price ? '' : <View className='original'>￥{(orderItem.price / 100).toFixed(2)}</View>
                                    }
                                </View>
                                <View className='count'>x1</View>
                            </View>
                        </View>
                    </View>
                    <View className='buyNumber'>
                        <View className='title'>购买数量：</View>
                        <View className='numberBox'>
                            <View className='subtract' style={{ pointerEvents: goodCount < 1 ? 'none' : 'auto', background: goodCount < 1 ? '#CCCCCC' : '#FFFFFF' }} onClick={() => quantityChange(goodCount - 1)}>-</View>
                            <View className='number'>
                                <Input type='number' style={{ marginTop: platform == 'android' ? '0' : '6rpx' }} onBlur={(e) => quantityChange(+e.detail.value)} onInput={(e) => quantitySet(+e.detail.value)} value={`${goodCount}`} ></Input>
                            </View>
                            <View className='add' onClick={() => quantityChange(goodCount + 1)}>+</View>
                        </View>
                    </View>
                    <View className='remark'>
                        <View className='remarkTitle'>
                            订单备注:
                                </View>

                    </View>
                    <View className='remarkTextarea'>
                        <Textarea onInput={connentChange} maxlength={100} placeholder='有什么想对商家说的可以写在这里哦～' placeholderStyle='font-size:28rpx;color:#999999'></Textarea>

                    </View>
                </View>
                <View className='payment'>
                    <View className='priceConfirm'>
                        <View>
                            <View>实付款：</View>


                        </View>
                        <View className='price'>
                            ￥{(goodCount * orderItem.realpay / 100).toFixed(2)}<Text className='subTip'>（免运费）</Text>
                        </View>
                    </View>
                    <View className='buyBtn'>
                        <Button onClick={gotoPay}>立即付款</Button>
                    </View>
                </View>
            </View>
        </Block >
    );
};
export default observer(OrderConfirm);

// OrderConfirm.config = {
//     navigationBarTitleText: '确认订单'
// } as Config;
