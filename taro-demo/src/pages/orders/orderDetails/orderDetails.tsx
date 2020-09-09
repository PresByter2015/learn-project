import React, { useState, useContext, useEffect } from 'react';
import Taro, { Config, useDidShow, useRouter, useReachBottom, useDidHide, } from '@tarojs/taro';
import { View, Button, Text, Block } from '@tarojs/components';
import { observer } from 'mobx-react';
import { orderDetail, confirmOrderApi, delectOrderApi, logisticsDetail } from '@/api/order.ts';
import IIcon from '@/components/IIcon';
import routers from '@/utils/routers';
import IModal from '@/components/IModal';
import IGoodsList from '@/components/IGoodsList';
import { paySuccessRecommendList } from '@/api/goods';
import Orders from '@/types/order';
import IImage from "@/components/IImage";
import { dateFormat } from '@/utils/util';
import Goods from '@/types/goods';
import { getOrderRefundStatus } from "@/utils/orderStatus";
import { getRemainDay } from '@/utils/remainTime';
import Store from '@/store/order';
import Pay from '@/utils/requestPay.ts';
import yuyuanTrack from '@/utils/eventTracking';
import './orderDetails.scss';

let interval;
const OrderDetail = () => {
    const params = useRouter();
    // const [orderData, setData] = useState({} as Orders.OrderDetailObject);
    const [orderDetailData, setOrdersData] = useState({} as Orders.OrderObject);
    const [orderItemsData, setorderItemsData] = useState({} as Orders.OrderItemsObject);
    const { ordersData: ordersData } = useContext(Store) as any;
    const [affirmShow, setAffirmModal] = useState(false);
    const [cancelShow, setCancelModal] = useState(false);
    const [countDownTime, setCountDownTime] = useState('');
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState(0);
    const [closeType, setCloseType] = useState(0);
    const [postalDetail, setPostalDetail] = useState({} as Orders.ShipCompanyRes);
    const [goodsListData, setGoodsListData] = useState([] as Goods.CollectGoodsListItemData[]);
    const [goodsPayload, setGoodsPayload] = useState({ limit: 0, page: 0 });

    // 推荐 商品列表
    const getGoodsRecommendList = ({ limit, page, itemId } = { "limit": 20, "page": 1, 'itemId': '' }, cb?) => {
        paySuccessRecommendList({ limit, page, itemId }).then((res: Goods.CollectGoodsListData) => {
            setGoodsPayload({ limit, page });
            cb && cb(res);
        });
    };
    //物流详情
    const getLogisticsDetail = (id) => {
        logisticsDetail({ logisticsNo: id }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setPostalDetail(res.res);
            }
        });
    };
    //订单详情
    const getOrderData = () => {
        orderDetail({ orderId: params.params.id }).then(res => {
            console.log(res.res);
            if (res.code == 0) {

                setOrdersData(res.res.order);
                getGoodsRecommendList({ "limit": 20, "page": 1, 'itemId': res.res.orderItems[0].itemId + '' }, res => {
                    res.code === 0 && setGoodsListData(res.res || [] as Goods.CollectGoodsListItemData[]);
                });
                setorderItemsData(res.res.orderItems[0]);
                const interFun = function () {
                    let countDownNum = 0;
                    res.res.order.remainTime -= 1000;
                    if (res.res.order.remainTime < 1000) {//倒计时结束，改变状态

                    } else {
                        countDownNum++;
                    }
                    const hour = parseInt(res.res.order.remainTime / 1000 / 60 / 60 + ''),
                        min = parseInt((res.res.order.remainTime - (hour * 3600000)) / 1000 / 60 + ''),
                        sec = parseInt(parseInt((res.res.order.remainTime - (hour * 3600000) - (min * 60000)) + '') / 1000 + '');
                    // res.res.order.countDownTime = hour + ':' + min + ':' + sec;
                    setCountDownTime(hour + ':' + min + ':' + sec);
                    if (countDownNum > 0) {//还存在倒计时
                        console.log('计时器计数中');
                    } else {//所有倒数计时的状态都已经改变(已无倒计时)则停止计时器
                        console.log('计时器停止计数');
                        // setOrderStatus(0)
                        // setCloseType(2)
                        if (interval) {
                            clearInterval(interval);
                        }
                        return false;
                    }
                    console.log(res.res);

                };
                if (res.res.order.status == 1 && res.res.order.remainTime > 0) {
                    interFun();
                    interval = setInterval(function () {
                        interFun();
                    }, 1000);
                }

                // setData(res.res);
                setOrderStatus(res.res.order.status);
                setCloseType(res.res.order.closeType);
                if (res.res.order.logisticsNo) {
                    getLogisticsDetail(res.res.order.logisticsNo);
                }

            }

        });
    };

    //退款
    const gotoRefund = () => {
        routers({
            url: '/pages/orders/orderRefund/orderRefund?id=' + orderDetailData.id,
        });
        yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_申请退款' });
    };
    //退款详情-售后
    const gotoRefundDetail = (id) => {
        routers({
            url: '/pages/orders/orderAfterDetail/orderAfterDetail?id=' + id,
        });
        yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_售后详情' });
    };

    //支付
    const gotoPay = () => {
        // Pay.getPrePay(orderDetailData.balanceId, 'orderDetail');
        Pay.getPrePay(orderId,orderDetailData.balanceId, 'orderDetail');
    };
    //确认收货
    const confirmGoods = () => {
        confirmOrderApi({ orderId: orderId }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setAffirmModal(false);
                getOrderData();
                yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_确认收货弹窗确认' });
            }

        });
    };

    //取消订单
    const delectOrder = () => {
        delectOrderApi({ orderId: orderId }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setCancelModal(false);
                getOrderData();
                yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_取消订单' });
            }
        });
    };

    // 查看 物流信息
    const gotopostal = (logisticsNo) => {
        // console.log(logisticsNo);
        routers({
            url: '/pages/orders/orderPostal/orderPostal?logisticsNo=' + logisticsNo,
        });
        yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_物流信息' });
    };
    //复制
    const copyEvents = () => {
        Taro.setClipboardData({
            data: orderId,
            success: () => {
                Taro.getClipboardData({
                    success: (res) => {
                        console.log(res); // data
                    }
                });
            }
        }).finally(() => {
            yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_复制订单编号' });
        });
    };
    const getOrderStatus = (orderstatus, orderCloseType) => {
        // let statusText = {
        //   0: '售后已取消',
        //   1: '待商家审核',
        //   2: '退款到账中',
        //   3: '商家拒绝申请',
        //   4: '匠人已发货',
        //   5: '退款成功',
        //   6: '待商家审核',
        //   7: '待买家处理',
        //   8: '商家拒绝申请',
        //   9: '待商家验货',
        //   10: '退款到账中',
        //   11: '商家拒绝签收',
        //   12: '退货退款成功'
        // }
        const closeText = {
            1: '用户取消订单',
            2: '超时未付款，订单已取消',
            5: '已退款，订单关闭',
        };
        const statusText = {
            1: '等待买家付款',
            3: '买家已付款，等待商家发货',
            4: '商家已发货',
            5: '买家已收货',
            7: '超时未付款，订单已取消',
            8: '已退款，订单关闭',
        };
        if (orderstatus == 0) {
            return closeText[orderCloseType];
        } else {
            return statusText[orderstatus];
        }
    };

    useDidShow(() => {
        console.log(ordersData);
        setOrderId(params.params.id);
        getOrderData();
    });
    useDidHide(() => {
        console.log('hide');
        clearInterval(interval);
    });
    useEffect(() => {
        return () => {
            console.log('离开');
            clearInterval(interval);
        };
    }, []);
    useReachBottom(() => {
        const { limit, page } = goodsPayload;
        const sum = limit * page;
        if (goodsListData.length === sum) {
            getGoodsRecommendList({ "limit": 20, "page": page + 1, 'itemId': orderItemsData.itemId + '' }, (res) => {
                const result = [...goodsListData, ...res.res];
                res.code === 0 && setGoodsListData(result as Goods.CollectGoodsListItemData[]);
            });
        } else if (goodsListData.length < sum) {
            Taro.showToast({ title: '已经到底了哦', icon: 'none' });
        }
    });
    return (
        <Block>

            <View>

                <View className='orderStatus'>
                    <View className='status'>{getOrderStatus(orderStatus, closeType)}</View>
                    {
                        orderStatus === 1 && orderDetailData.remainTime > 0 ? <View className='timeStatus'>
                            剩余 <Text className='time'>{countDownTime}</Text> 逾期订单将自动取消
                    </View> : orderStatus === 4 && orderDetailData.remainTime > 0 ? <View className='timeStatus'>
                                剩余{getRemainDay(orderDetailData.remainTime)}自动确认收货
                    </View> : ''
                    }


                </View>


                {
                    orderStatus == 5 || orderStatus == 4 ? <View className='postal' onClick={() => gotopostal(orderDetailData.logisticsNo)}>
                        {/* <View className='icon'>
                        <Image  src=''></Image>
                    </View> */}
                        {
                            postalDetail.trackList.length > 0 ? <View className='detail'>
                                <View className='firm'>
                                    {postalDetail.trackList[0].detail}
                                </View>
                                <View className='time'>
                                    {postalDetail.trackList[0].time}
                                </View>
                            </View> : <View className='noPostal'>暂无物流信息</View>
                        }

                        <View className='goto'>
                            <IIcon type='right' size='25' color='#666666'></IIcon>
                        </View>
                    </View> : ''
                }

                <View className='address'>
                    <View className='icon'>
                        <IIcon type='location' size='26' color='#666666'></IIcon>
                    </View>
                    <View className='consignee'>
                        <Text className='name'>收货人：{orderDetailData.receiverName}</Text>
                        <Text className='phone'>{orderDetailData.receiverMobile}</Text>
                    </View>
                    <View className='place'>
                        收货地址：{orderDetailData.receiverAddress}
                    </View>
                </View>
                <View className='itemCard'>

                    <View className='cardContent' >
                        <View className='itemPic'>
                            <IImage src={orderItemsData.cover} />
                        </View>

                        <View className='itemDetail'>
                            <View className='title'>
                                {orderItemsData.title}
                            </View>
                            <View className='nature'>

                                {orderItemsData.skuProperty}
                            </View>
                            <View className='price'>

                                <View className='actual'>
                                    ￥{(orderItemsData.realpay / 100 / orderItemsData.quantity).toFixed(2)}
                                    {
                                        orderItemsData.realpay == orderItemsData.price ? '' : <View className='original'>￥{(orderItemsData.price / 100 / orderItemsData.quantity).toFixed(2)}</View>
                                    }

                                </View>

                                <View className='count'>x{orderItemsData.quantity}</View>
                            </View>
                        </View>

                    </View>
                    {
                        orderItemsData.refund == 0 ? orderStatus == 3 || orderStatus == 4 ? <View className='cardAction'>
                            <Button className='actionBtn' onClick={gotoRefund}>申请退款</Button>
                        </View> : '' : <View className='cardAction'><Button className='actionBtn' onClick={() => gotoRefundDetail(orderItemsData.refundId)}>{getOrderRefundStatus(orderItemsData.refund)}</Button></View>
                    }



                    <View className='totalPrice'>
                        <View className='name'>
                            商品总价：
                            </View>
                        <View className='num'>
                            ￥{(orderItemsData.price / 100).toFixed(2)}
                        </View>

                    </View>
                    <View className='realPrice'>
                        <View className='name'>
                            实付款：
                            </View>
                        <View className='num'>

                            ￥{(orderDetailData.realpay / 100).toFixed(2)}
                        </View>

                    </View>


                    <View className='service'>
                        <View className='icon'>
                            <IIcon size='20' type='kefu' color='#333'></IIcon>
                        </View>
                        <Button openType='contact' onClick={yuyuanTrack.bind(this, { type: 'payOrderDetail', label: '订单详情页_联系客服' })}>联系客服</Button>

                    </View>
                    <View className='orderDetail'>
                        {
                            orderDetailData.comment == '' ? '' : <View className='item' >
                                订单留言：{orderDetailData.comment}
                            </View>
                        }

                        <View className='number item' >
                            订单编号：{orderDetailData.id}
                            <View className='copy' onClick={copyEvents}>复制</View>
                        </View>

                        <View className='item' >
                            下单时间：{dateFormat(orderDetailData.createTime, 'yyyy-MM-dd hh:mm:ss')}
                        </View>
                        {
                            orderStatus == 0 && orderDetailData.closeTime ? <View className='item'>
                                关闭时间：{dateFormat(orderDetailData.closeTime, 'yyyy-MM-dd hh:mm:ss')}
                            </View> : ''
                        }
                        {
                            orderStatus !== 1 && orderStatus !== 0 ? <View className='item'>
                                付款时间：{dateFormat(orderDetailData.payTime, 'yyyy-MM-dd hh:mm:ss')}
                            </View> : ''
                        }
                        {
                            (orderStatus == 4 || orderStatus == 5) && orderDetailData.sendTime ? <View className='item'>
                                发货时间：{dateFormat(orderDetailData.sendTime, 'yyyy-MM-dd hh:mm:ss')}
                            </View> : ''
                        }
                        {
                            orderStatus == 5 ? <View className=''>
                                收货时间：{dateFormat(orderDetailData.closeTime, 'yyyy-MM-dd hh:mm:ss')}
                            </View> : ''
                        }

                    </View>

                </View>
                <View className='orderAction'>
                    {
                        orderStatus === 1 ? <Button onClick={() => setCancelModal(true)} className='cancelBtn'>
                            取消订单
                </Button> : ''
                    }
                    {
                        orderStatus === 1 ? <Button onClick={gotoPay} className='actionBtn '>
                            去支付
                </Button> : ''
                    }
                    {
                        orderStatus === 4 ? <Button onClick={() => setAffirmModal(true)} className='actionBtn'>
                            确认收货</Button> : ''
                    }
                </View>

                <IModal
                    visible={affirmShow}
                    onCancel={() => setAffirmModal(false)}
                    onConfirm={confirmGoods}
                    confirmBtn='确认收货'
                    titleShow={false}
                    renderContent={<View><View style={{ marginBottom: '10rpx' }}>确认收到货了吗？</View><View>请收到商品检查无误后再确认收货</View></View>}
                >
                </IModal>

                <IModal
                    visible={cancelShow}
                    onConfirm={() => { setCancelModal(false); yuyuanTrack({ type: 'payOrderDetail', label: '订单详情页_取消订单弹窗确认' }); }}
                    onCancel={() => delectOrder()}
                    confirmBtn='再想想'
                    cancelBtn='取消订单'
                    titleShow={false}
                    renderContent={<View><View style={{ marginBottom: '10rpx' }}>订单已生成，确认取消订单吗？</View><View>喜欢的商品可能会被抢空哦</View></View>}
                >

                </IModal>
                {
                    orderStatus !== 1 ? <View>
                        <View className='dj-goods-title' style="font-family:'sxc';">猜你喜欢</View>
                        <IGoodsList data={goodsListData} isSell onClick={yuyuanTrack.bind(this, { type: 'payOrderDetail', label: '订单详情页_猜你喜欢' })}></IGoodsList>
                    </View> : ''
                }
            </View>



            <View style='height:120rpx;width:100vw'></View>
        </Block >
    );
};
export default observer(OrderDetail);

// OrderDetail.config = {
//     navigationBarTitleText: '订单详情'
// } as Config;
