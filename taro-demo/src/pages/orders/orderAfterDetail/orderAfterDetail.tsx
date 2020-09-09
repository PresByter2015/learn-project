import React, { useState, } from 'react';
import Taro, { Config, useRouter, useDidShow } from '@tarojs/taro';
import { View, Button, Block, } from '@tarojs/components';
import { observer } from 'mobx-react';
import { getRefundDetail, refundCancel, logisticsDetail } from '@/api/order';
import IIcon from '@/components/IIcon';
import routers from '@/utils/routers';
import Orders from '@/types/order';
import IModal from '@/components/IModal';
import { dateFormat } from '@/utils/util';
import { getOrderRefundTip } from "@/utils/orderStatus";
import { getRemainDay } from '@/utils/remainTime';
import yuyuanTrack from '@/utils/eventTracking';
import './orderAfterDetail.scss';

const OrderAfterDetail = () => {

    const params = useRouter();
    const [refundData, setData] = useState({} as Orders.ResRefundDetail);
    const [refundDetailData, setRefundDetailData] = useState({} as Orders.RefundDetail);
    const [modalShow, setShowModal] = useState(false);
    const [postalDetail, setPostalDetail] = useState({} as Orders.ShipCompanyRes);


    //物流详情
    const getLogisticsDetail = (id) => {

        logisticsDetail({ logisticsNo: id }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setPostalDetail(res.res);
            }

        });
    };
    //退款详情
    const refundDetail = () => {
        getRefundDetail({ refundId: parseInt(params.params.id) }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setData(res.res);
                setRefundDetailData(res.res.refund);

                if (res.res.logistics.logisticsNo) {
                    getLogisticsDetail(res.res.logistics.logisticsNo);
                }
            }

        });
    };
    //退款撤销
    const refundClose = () => {
        refundCancel({ refundId: parseInt(params.params.id) }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setShowModal(false);
                refundDetail();
                yuyuanTrack({ type: 'Post-SaleDetail', label: '售后详情页_撤销申请确认弹窗' });
            }

        });
    };
    // 跳转 售后详情-填写物流单号
    const gotoPostal = (id) => {
        routers({
            url: '/pages/orders/orderPostalEdit/orderPostalEdit?id=' + id,
        });
        yuyuanTrack({ type: 'Post-SaleDetail', label: '售后详情页_填写物流单号' });
    };
    const gotoPostalDetail = (logisticsNo) => {
        routers({
            url: '/pages/orders/orderPostal/orderPostal?logisticsNo=' + logisticsNo,
        });
        yuyuanTrack({ type: 'Post-SaleDetail', label: '售后详情页_退货物流信息' });
    };

    //复制
    const copyEventsOrderId = () => {
        Taro.setClipboardData({
            data: refundDetailData.orderId,
            success: () => {
                Taro.getClipboardData({
                    success: (res) => {
                        console.log(res); // data
                    }
                });
            }
        });
    };
    const copyEvents = () => {
        Taro.setClipboardData({
            data: refundData.logistics.refundReceiverMobile,
            success: () => {
                Taro.getClipboardData({
                    success: (res) => {
                        console.log(res); // data
                    }
                });
            }
        });
    };
    //退款
    const gotoRefund = (id, status) => {
        routers({
            url: '/pages/orders/orderRefund/orderRefund?id=' + id + '&status=' + status,
        });
    };
    useDidShow(() => {
        console.log(params);

        if (params.params.inform == 'true') {
            Taro.requestSubscribeMessage({
                tmplIds: ['JG8S_-CSeCiNfIjU6u6Jvm5PtPeIzzo8OjPm0gU4b0M'],
                complete: function (res) {
                    console.log(res);


                }
            });
        }

        refundDetail();
    });
    return (
        <Block>
            <View>
                <View className='afterStatus'>

                    <View className='status'>{getOrderRefundTip(refundDetailData.status, refundDetailData.closeType)}</View>
                    {
                        refundDetailData.status == 0 ? <View className='timeStatus'>
                            {
                                refundDetailData.closeType == 0 ? '您已撤销此次退货退款申请，若问题仍未解决，您可以在有效期内（确认收货前）再次申请' : '因为您超过3天未处理，此次售后申请已自动取消；您可以在有效期内（确认收货前）再次申请'
                            }
                        </View> : ''
                    }
                    {
                        (refundDetailData.status == 1 || refundDetailData.status == 6) && refundDetailData.remainTime > 0 ? <View className='timeStatus'>
                            剩余{getRemainDay(refundDetailData.remainTime)}申请将自动审核通过
                           </View> : ''
                    }
                    {
                        refundDetailData.status == 9 && refundDetailData.remainTime > 0 ? <View className='timeStatus'>
                            剩余{getRemainDay(refundDetailData.remainTime)}自动确认收货并退款
                           </View> : ''
                    }
                    {
                        refundDetailData.status == 7 && refundDetailData.remainTime > 0 ? <View className='timeStatus'>
                            剩余{getRemainDay(refundDetailData.remainTime)}自动取消售后申请
                           </View> : ''
                    }
                    {refundDetailData.status == 3 || refundDetailData.status == 8 || refundDetailData.status == 11 ? <View className='status'>
                        拒绝原因：{refundDetailData.rejectReason}
                    </View> : ''
                    }
                    {refundDetailData.status == 5 || refundDetailData.status == 10 || refundDetailData.status == 12 || refundDetailData.status == 2 ? <View className='amount'>
                        ￥{refundDetailData.amount / 100}
                    </View> : ''
                    }
                </View>
                {
                    refundDetailData.status === 7 ? <View>
                        <View className='step'>
                            <View className='title'>
                                退货步骤
                            </View>
                            <View className='stepDetail'>
                                1.寄回商品，并记录快递号码
                            </View>
                            <View className='stepDetail'>
                                2.及时填写退货快递单号
                            </View>
                        </View>
                        <View className='address'>
                            <View className='addressItem'>
                                <View className='title'>
                                    退货地址
                                </View>
                                <View className='content'>
                                    {refundData.logistics.refundReceiverAddress}
                                </View>
                            </View>
                            <View className='addressItem'>
                                <View className='title'>收货人</View>
                                <View className='content'>{refundData.logistics.refundReceiverName}</View>
                            </View>
                            <View className='addressItem'>
                                <View className='title'>联系电话</View>
                                <View className='content'>{refundData.logistics.refundReceiverMobile}<View className='copy' onClick={copyEvents}>复制</View></View>
                            </View>


                        </View>

                    </View> : ''
                }
                {
                    refundDetailData.status == 9 || refundDetailData.status == 10 ? <View className='postal' onClick={() => gotoPostalDetail(refundData.logistics.logisticsNo)}>
                        {
                            postalDetail.trackList.length > 0 ? <View className='detail'>
                                <View className='title'>退货物流信息</View>
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
                {/* {
                   refundDetailData.status==9||refundDetailData.status==10?<View className='refundPostal' onClick={()=>gotoPostalDetail(refundData.logistics.logisticsNo)}>
                   <View className='title'>退货物流信息</View>
                   <View className='content'>
                       您已填写物流单号（{refundData.logistics.logisticsNo}）
                       <View className='icon'>
                           <IIcon type='right' size='20' color='#666666'></IIcon>
                       </View>
                      
                   </View>
               </View>:''
               } */}

                <View className='service'>
                    <View className='icon'>
                        <IIcon size='20' type='kefu' color='#333'></IIcon>
                    </View>
                    <Button openType='contact'>


                        联系客服
                                </Button>
                </View>
                <View className='afterDetail'>
                    <View className='title'>售后信息</View>
                    <View className='item'>退款类型：{refundDetailData.refundType == 0 ? '仅退款' : '退货退款'}</View>
                    <View className='item'>退款原因：{refundDetailData.reason}</View>
                    <View className='item'>退款金额：￥{(refundDetailData.amount / 100).toFixed(2)}</View>

                    {
                        refundDetailData.refundType == 0 ? '' : <View className='item'>
                            退货数量：{refundDetailData.quantity}
                        </View>
                    }
                    {
                        refundDetailData.comment ? <View className='item'>
                            退款说明：{refundDetailData.comment}
                        </View> : ''
                    }

                    <View className='item'>商品名称：{refundData.orderItem.title}</View>
                    <View className='item'>订单编号：{refundDetailData.orderId}<View className='copy' onClick={copyEventsOrderId}>复制</View></View>
                    <View className='item'>申请时间：{dateFormat(refundDetailData.createTime, 'yyyy-MM-dd hh:mm:ss')}</View>
                </View>

                <View className='action'>
                    {
                        refundDetailData.status == 1 || refundDetailData.status == 6 || refundDetailData.status == 7 ? <View className='actionBtn repealBtn' onClick={() => { setShowModal(true); yuyuanTrack({ type: 'Post-SaleDetail', label: '售后详情页_撤销申请' }); }}>
                            撤销申请
                   </View> : ''
                    }

                    {
                        (refundDetailData.status == 0 || refundDetailData.status == 3 || refundDetailData.status == 8 || refundDetailData.status == 11) && refundDetailData.refundAgain ? <View className='actionBtn repealBtn' onClick={() => gotoRefund(refundDetailData.orderId, refundDetailData.status)}>
                            再次申请
                    </View> : ''
                    }

                    {
                        refundDetailData.status == 7 ? <View className='actionBtn postalBtn' onClick={() => gotoPostal(params.params.id)}>
                            我已寄出
                        <View className='gotoPostal'>点击填写订单编号</View>
                        </View> : ''
                    }

                </View>
                <IModal
                    visible={modalShow}
                    onCancel={() => setShowModal(false)}
                    onConfirm={refundClose}
                    confirmBtn='确认撤销'
                    cancelBtn='暂不撤销'
                    titleShow={false}
                    renderContent={<View><View style={{ marginBottom: '10rpx' }}>退款撤销后将关闭售后</View><View>确认要撤销吗？</View></View>}
                >
                </IModal>
            </View>
        </Block >
    );
};
export default observer(OrderAfterDetail);

// OrderAfterDetail.config = {
//     navigationBarTitleText: '售后详情'
// } as Config;
