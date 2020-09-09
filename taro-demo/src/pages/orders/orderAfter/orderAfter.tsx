import React, { useState, } from 'react'
import Taro, { Config, useDidShow, useReachBottom, useDidHide } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import { observer } from 'mobx-react';
import Orders from '@/types/order';
import { getRefundList } from '@/api/order.ts';
import { dateFormat } from '@/utils/util';
import IImage from "@/components/IImage";
import routers from '@/utils/routers';
import { getOrderRefundStatus } from "@/utils/orderStatus";
import yuyuanTrack from '@/utils/eventTracking';

import './orderAfter.scss';

const OrderAfter = () => {
    const [refundData, setData] = useState([]);
    const [endLoad, setEndLoad] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [leave, setLeave] = useState(false);

    const refundList = (page) => {
        getRefundList({ page: page || 1 }).then((res: Orders.OrderRefundObjectData) => {
            console.log(res.res);

            if (res.code == 0) {
                let dataList = [];

                if (page == 1) {
                    dataList = [...res.res] as [];
                } else {
                    if (leave) {
                        dataList = [...refundData] as [];

                    } else {
                        dataList = [...refundData, ...res.res] as [];
                    }

                }

                if (res.res.length < 10) {
                    setEndLoad(true);
                }
                setData([...dataList] as []);

            } else {



            }

        });
    };
    const gotoDetail = (id) => {
        routers({
            url: '/pages/orders/orderAfterDetail/orderAfterDetail?id=' + id,
        });
        yuyuanTrack({ type: 'Post-SaleList', label: '订单售后列表_查看售后单详情' });
    };
    useDidShow(() => {
        console.log(leave);
        refundList(pageNum);
    });

    useDidHide(() => {
        console.log('hide');
        setLeave(true);

    });
    useReachBottom(() => {
        if (!endLoad) {
            refundList(pageNum + 1);
            setPageNum(pageNum + 1);
        }

        console.log('到底了');
    });
    return (
        <Block>
            {
                refundData.length == 0 ? <View className='no_order'>
                    <IImage src='https://file-test.idongjia.cn/T3mFhTBXWT1RCvBVdK.png'></IImage>
                    <View className='tip'>还没有售后哦～</View>
                </View> : <View>
                        {
                            refundData.map((items: Orders.ResRefund) => {
                                return (
                                    <View className='afterCard' key={items.refund.id} onClick={() => gotoDetail(items.refund.id)}>
                                        <View className='cardTitle'>
                                            <Text className='time'>
                                                {dateFormat(items.refund.createTime, 'yyyy-MM-dd hh:mm:ss')}
                                            </Text>
                                            <Text className='status'>
                                                {getOrderRefundStatus(items.refund.status)}
                                            </Text>
                                        </View>
                                        <View className='cardContent' >
                                            <View className='itemPic'>
                                                <IImage src={items.orderItem.cover} />
                                            </View>

                                            <View className='itemDetail'>
                                                <View className='title'>
                                                    {items.orderItem.title}
                                                </View>
                                                <View className='nature'>
                                                    {items.orderItem.skuProperty}
                                                </View>
                                                <View className='price'>

                                                    <View className='actual'>
                                                        ￥{(items.refund.amount / items.refund.quantity / 100).toFixed(2)}
                                                    </View>

                                                    <View className='count'>x{items.refund.quantity}</View>
                                                </View>
                                            </View>

                                        </View>
                                        <View className='orderType'>
                                            {items.refund.refundType == 0 ? '仅退款' : '退货退款'}
                                        </View>
                                    </View>
                                );
                            })
                        }
                        {
                            endLoad ? <View className='noData'>
                                <View className='border'></View>
                                <View className='text'>已经到底了哦</View>
                                <View className='border'></View>
                            </View> : ''
                        }
                    </View>
            }

        </Block >
    );
};
export default observer(OrderAfter);

// OrderAfter.config = {
//     navigationBarTitleText: '售后列表'
// } as Config;
