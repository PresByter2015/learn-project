import React, { useState, useContext, useEffect } from 'react';
import Taro, { Config, useDidShow, useDidHide, useReachBottom, useRouter } from '@tarojs/taro';
import { View, Button, Text, Block } from '@tarojs/components';
import { observer } from 'mobx-react';
import { getOrderList } from '@/api/order.ts';
import Tabs from '@/components/Tabs';
import routers from '@/utils/routers';
import Orders from '@/types/order';
import IImage from "@/components/IImage";
import Pay from '@/utils/requestPay.ts';
import {
    dateFormat
} from '@/utils/util';
import { getOrderStatus } from "@/utils/orderStatus";
import './ordersList.scss';
import Store from '@/store/order';
let interval;
const OrderList = () => {

    const { ordersData: ordersData, setOrderData } = useContext(Store) as any;
    const [orderData, setOrderList] = useState([]);
    const [orderStatus, setOrderStatus] = useState(0);
    const [timeData, seTimeData] = useState([] as string[]);
    const [pageNum, setPageNum] = useState(1);
    const [endLoad, setEndLoad] = useState(false);
    const [activeId, setActiveId] = useState(0);
    const [leave, setLeave] = useState(false)
    const querys = useRouter();


    const interFun = (data, id) => {
        let countDownNum = 0;
        let timeList = [] as string[]
        data.map((item) => {



            item.order.remainTime -= 1000;
            if (item.order.remainTime < 1000) {//倒计时结束，改变状态
                // orderList(pageNum,id);
            } else {
                countDownNum++;
            }
            const hour = parseInt(item.order.remainTime / 1000 / 60 / 60 + ''),
                min = parseInt((item.order.remainTime - (hour * 3600000)) / 1000 / 60 + ''),
                sec = parseInt(parseInt((item.order.remainTime - (hour * 3600000) - (min * 60000)) + '') / 1000 + '');
            item.order.countDownTime = hour + ':' + min + ':' + sec;
            timeList.push(item.order.countDownTime)
            /*item.countDownTime = (hour?hour+':':'')+((!min&&!hour)?'':min+':')+sec;*/
            //console.log(parseInt(item.countDownTimeSTP/1000));

        });
        if (countDownNum > 0) {//还存在倒计时
            console.log('计时器计数中');
        } else {//所有倒数计时的状态都已经改变(已无倒计时)则停止计时器
            console.log('计时器停止计数');
            if (interval) {

                clearInterval(interval);

            }
            return false;
        }
        console.log(timeList)
        seTimeData(timeList)
    }
    const orderList = (page, id) => {
        getOrderList({ page: page || 1, status: id || 0 }).then((res: Orders.OrderListObjectData) => {
            console.log(res.res);
            clearInterval(interval);
            // for(var i = 1; i < timeData.length+1; i++) {
            //     clearInterval(i);
            // }
            console.log(pageNum);
            if (res.code === 1000001) {
                routers({
                    url: '/pages/login/login'
                });
                return false;
            }
            if (res.code == 0) {
                let dataList = [];
                if (page == 1) {
                    dataList = [...res.res] as [];
                } else {
                    if (leave) {
                        dataList = [...orderData] as []

                    } else {
                        dataList = [...orderData, ...res.res] as []
                    }

                }
                console.log(dataList);
                if (dataList && dataList.length > 0) {
                    interval = setInterval(function () {
                        interFun(dataList, id);
                    }, 1000);


                    setOrderList([...dataList] as []);
                } else {
                    setEndLoad(true);
                    setOrderList([]);
                }
                if (res.res.length < 10) {
                    setEndLoad(true);
                }

            } else {
                setEndLoad(false);
                setOrderList([]);

            }

        });
    };
    const gotoDetail = (id) => {

        routers({
            url: '/pages/orders/orderDetails/orderDetails?id=' + id,
        });
    };
    const tabs = [
        { id: 0, name: "全部" },
        { id: 1, name: "待付款 " },
        { id: 2, name: "待发货" },
        { id: 3, name: "待收货 " },
        { id: 6, name: "已完成" },
    ];

    //支付
    const gotoPay = (id, balanceId) => {
        Pay.getPrePay(id, balanceId, 'orderList')
    }

    //tab切换
    const tabChange = (id) => {
        setOrderData({ status: id })
        setOrderStatus(id)
        setEndLoad(false);
        console.log(id);
        orderList(1, id);
    };

    useDidShow(() => {

        console.log(ordersData)
        console.log(querys.params)
        console.log(pageNum)
        let status = ordersData.status
        setOrderStatus(ordersData.status)
        setActiveId(status);
        orderList(pageNum, status);

    });
    useDidHide(() => {
        console.log('hide');
        clearInterval(interval);
        setLeave(true)
    });
    useEffect(() => {
        return () => {
            console.log('离开');
            clearInterval(interval);
        };
    }, []);
    useReachBottom(() => {
        if (!endLoad) {
            orderList(pageNum + 1, orderStatus);
            setPageNum(pageNum + 1);
        }

        console.log('到底了');
    });
    return (
        <Block>
            <View className='tabsList'>
                <Tabs tabs={tabs} activeId={activeId} onClick={tabChange}>
                </Tabs>
            </View>
            {
                orderData.length == 0 ? <View className='no_data'>
                    <IImage src='https://file-test.idongjia.cn/T3mFhTBXWT1RCvBVdK.png'></IImage>
                    <View className='tip'>还没有订单哦～</View>
                </View> : <View>
                        {
                            orderData.map((items: Orders.OrderDetailObject, index) => {
                                return (
                                    <View className='itemCard' key={items.order && items.order.id}>
                                        <View className='cardTitle'>
                                            <Text className='time'>
                                                {dateFormat(items.order.createTime, 'yyyy-MM-dd hh:mm:ss')}
                                            </Text>
                                            <Text className='status'>
                                                {getOrderStatus(items.order.status)}
                                            </Text>

                                        </View>
                                        <View className='cardContent' onClick={() => gotoDetail(items.order.id)}>
                                            <View className='itemPic'>
                                                <IImage src={items.orderItems[0].cover} />
                                            </View>

                                            <View className='itemDetail'>
                                                <View className='title'>
                                                    {items.orderItems[0].title}
                                                </View>
                                                <View className='nature'>
                                                    {items.orderItems[0].skuProperty}
                                                </View>
                                                <View className='price'>
                                                    <View className='actual'>
                                                        ￥{(items.orderItems[0].realpay / items.orderItems[0].quantity / 100).toFixed(2)}
                                                        {
                                                            items.orderItems[0].realpay == items.orderItems[0].price ? '' : <View className='original'>￥{(items.orderItems[0].price / items.orderItems[0].quantity / 100).toFixed(2)}</View>
                                                        }
                                                    </View>
                                                    <View className='count'>x{items.orderItems[0].quantity}</View>
                                                </View>
                                            </View>

                                        </View>
                                        <View className='realPrice'>
                                            <View className='name'>

                                                实付款：
                                </View>
                                            <View className='num'>

                                                ￥{(items.order.realpay / 100).toFixed(2)}
                                            </View>

                                        </View>
                                        <View className='cardBorder'>

                                        </View>
                                        {
                                            items.order.status == 1 ? <View className='cardAction'>
                                                {
                                                    items.order.remainTime > 0 ? <View className='countDownTime' >距订单取消<View className='time'>{timeData[index]}</View></View> : ""
                                                }
                                                <Button className='actionBtn' onClick={() => gotoPay(items.order.id,items.order.balanceId)}>去付款</Button>
                                            </View> : ''
                                        }


                                    </View>
                                );
                            })
                        }
                    </View>
            }
            {
                endLoad ? <View className='noData'>
                    <View className='border'></View>
                    <View className='text'>已经到底了哦</View>
                    <View className='border'></View>
                </View> : ''
            }



        </Block >
    );
};
export default observer(OrderList);

// OrderList.config = {
//     navigationBarTitleText: '我的订单'
// } as Config;
