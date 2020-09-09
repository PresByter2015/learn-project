import React, { useState, } from 'react';
import Taro, { Config, useDidShow, useRouter } from '@tarojs/taro';
import { View, Button, Image, Block, Textarea, PickerView, PickerViewColumn, Input } from '@tarojs/components';
import { observer } from 'mobx-react';
import IIcon from '@/components/IIcon';
import Orders from '@/types/order';
import { refundApply, orderDetail } from '@/api/order';
import upload from '@/utils/uploadFile';
import routers from '@/utils/routers';
import tips from '@/utils/tip';
import yuyuanTrack from '@/utils/eventTracking';
import './orderRefund.scss';

const OrderRefund = () => {
    const params = useRouter();
    const [orderData, setData] = useState({} as Orders.OrderDetailObject);
    const [showpup, setShowpup] = useState(false);
    const [explain, setExplain] = useState('');
    const [reason, setReason] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState(1);
    const [uploadBtn, setUploadBtn] = useState(true);
    const [uploaderList, setUploaderList] = useState([] as string[]);
    const [picList, setPicList] = useState([] as string[]);
    const canselPup = () => {
        setShowpup(false);
    };
    const showPup = () => {
        setShowpup(true);
        setReason('多拍、错拍、不想要');
    };
    const getOrderData = (id) => {
        orderDetail({ orderId: id }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                setQuantity(res.res.orderItems[0].quantity);
                setAmount(res.res.orderItems[0].realpay);
                setMobile(res.res.order.receiverMobile);
                setData(JSON.parse(JSON.stringify(res.res)));
            }

        });
    };
    const reasonList = ['多拍、错拍、不想要',
        '与商家协商一致退款',
        '未收到货、空包裹、商家发错货',
        '不喜欢、效果不好',
        '商品与描述不一致',
        '商品的质量问题',
        '其他'
    ];
    const reasonChange = (e) => {
        console.log(e.detail.value);
        setReason(reasonList[e.detail.value[0]]);
    };
    const orderExplain = (e) => {
        console.log(e.detail.value);
        setExplain(e.detail.value);
    };
    //上传凭证
    const uploadImage = () => {

        Taro.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
        }).then(res => {

            const selectPicList = [] as string[];
            const pathFn = (res) => {
                selectPicList.push(res.file.split('/')[3]);
                console.log(picList);

                console.log(selectPicList);
                setPicList([...picList, ...selectPicList] as string[]);
            };
            if (uploaderList.length + res.tempFilePaths.length > 9) {
                tips.toast('最多上传9张图片');
                return;
            }
            res.tempFilePaths.map((item) => {
                const params = {
                    file: item,
                    success: pathFn
                };
                upload(params);
            });


            if (res.tempFilePaths.length == 9) {
                setUploadBtn(false);
            }

            setUploaderList([...uploaderList, ...res.tempFilePaths]);

        });

    };
    const picDelect = (index) => {
        console.log('删除');
        const uploaderArr = uploaderList;
        uploaderArr.splice(index, 1);
        console.log(uploaderArr);
        setUploaderList([...uploaderArr]);
        const picArr = picList;
        if (uploaderArr.length < 9) {
            setUploadBtn(true);
        }
        picArr.splice(index, 1);
        console.log(picArr);
        setPicList([...picArr]);
    };
    //商品数量

    const quantityChange = (val) => {

        if (val == 0 || !val) {
            tips.toast('退货数量不可为0');
            setQuantity(1);
            return;
        }
        if (val > orderData.orderItems[0].quantity) {
            tips.toast('退货数量不能超过' + orderData.orderItems[0].quantity);
            setQuantity(orderData.orderItems[0].quantity);
            return;
        }
        setQuantity(val);
        console.log(orderData.orderItems[0].realpay);
        setAmount(val * (orderData.orderItems[0].realpay / orderData.orderItems[0].quantity));
    };
    //提交
    const goRefundApply = () => {
        console.log(picList);

        if (reason == '') {
            tips.toast('请选择退款原因');
            return;
        }
        if (quantity == 0) {
            tips.toast('请填写退货数量');
            return;
        }
        if (amount == 0) {
            tips.toast('退货数量不可为0');
            return;
        }
        if (mobile == '') {
            tips.toast('请填写退款金额');
            return;
        }
        refundApply({
            refundType: orderData.order.status == 3 ? 0 : 1,
            quantity: quantity,
            amount: amount,
            reason: reason,
            orderItemId: orderData.orderItems[0].id,
            explain: explain,
            mobile: mobile,
            pictures: picList,
        }).then(res => {
            if (res.code == 0) {
                Taro.requestSubscribeMessage({
                    tmplIds: ['JG8S_-CSeCiNfIjU6u6Jvm5PtPeIzzo8OjPm0gU4b0M'],
                    complete: function (res) {
                        console.log(res);
                    }
                });
                routers({
                    url: '/pages/orders/orderAfterDetail/orderAfterDetail?id=' + res.res + '&inform=' + true,
                });
                yuyuanTrack({ type: 'applyReturn', label: '申请退款页_提交' });
            }

        });
    };

    const amountChange = (e) => {
        console.log(e.detail.value);
        if (e.detail.value == 0 || !e.detail.value) {
            tips.toast('退款金额不可为0');
            return;
        }
        if (e.detail.value > orderData.orderItems[0].realpay / 100) {
            tips.toast('退款金额不能大于' + orderData.orderItems[0].realpay / 100 + '元');
            return;
        }
        setAmount(e.detail.value * 100);
    };
    const mobileChange = (e) => {

        if (e.detail.value.length > 11) {
            tips.toast('手机号格式不正确');
            return false;
        }
        setMobile(e.detail.value);
    };

    useDidShow(() => {
        getOrderData(params.params.id);
    });
    return (
        <Block>
            <View>
                <View className='refundDetail'>
                    <View className='detailList'>
                        <View className='title'>
                            退款类型
                    </View>
                        <View className='context'>
                            {orderData.order.status == 3 ? '仅退款' : '退货退款'}
                        </View>
                    </View>
                    <View className='detailList'>
                        <View className='title'>
                            退款数量
                    </View>
                        <View className='context'>
                            {
                                orderData.order.status == 3 ? quantity : <View className='numberBox'>
                                    <View className='subtract' style={{ pointerEvents: quantity < 1 ? 'none' : 'auto', background: quantity < 1 ? '#CCCCCC' : '#FFFFFF' }} onClick={() => quantityChange(quantity - 1)}>-</View>
                                    <View className='number'>
                                        <Input type='number' onBlur={(e) => quantityChange(+e.detail.value)} onInput={(e) => setQuantity(parseInt(e.detail.value))} value={`${quantity}`} ></Input>
                                    </View>
                                    <View className='add' onClick={() => quantityChange(quantity + 1)}>+</View>
                                </View>
                            }


                        </View>
                    </View>
                    <View className='detailList'>
                        <View className='title'>
                            退款金额
                    </View>
                        <View className='context'>
                            {amount / 100}
                            {/* {
                            orderData.order.status==3?amount/100:<View className='contextInput'>
                                <Input onInput={(e)=>amountChange(e)} value={`${amount/100}`}  ></Input>
                            </View>
                        } */}

                        </View>
                    </View>

                    <View className='detailList'>
                        <View className='title'>
                            联系电话
                    </View>
                        <View className='context'>
                            <View className='contextInput'>
                                <Input
                                    type='number'
                                    maxlength={11}
                                    onInput={(e) => mobileChange(e)} value={mobile}
                                ></Input>
                            </View>

                        </View>
                    </View>
                </View>
                <View className='reason'>
                    <View className='reasonList' onClick={showPup}>
                        <View className='title'>
                            退款原因
                    </View>
                        <View className='context'>

                            {reason == '' ? <View className='default'>请选择退款原因</View> : reason}
                        </View>
                        <View className='goto'>
                            <IIcon type='right' size='20' color='#666666'></IIcon>
                        </View>
                    </View>
                    <View className='reasonList'>
                        <View className='title'>
                            退款说明
                    </View>

                    </View>
                    <View className='reasonTip'>
                        {
                            showpup ? <View className='reasonTextarea'>请填写退款说明，方便平台为你更快处理问题</View> : <Textarea
                                onInput={orderExplain} maxlength={100} placeholder='请填写退款说明，方便平台为你更快处理问题' placeholderStyle='font-size:30rpx;color:#cccccc'
                            >

                            </Textarea>
                        }


                    </View>
                </View>
                <View className='proof'>
                    <View className='title'>
                        添加凭证（最多9张）
                </View>
                    <View className='pic'>


                        <View className='ui_uploader_item'>
                            {
                                uploaderList.map((items, index) => {
                                    return <View className='ui_uploader_pic'> <Image src={items}></Image><View className='picDelect' onClick={() => picDelect(index)}><IIcon type='jiandiao' color='#999999' size='22' ></IIcon></View></View>;
                                })
                            }
                            <View className='ui_uploader' style={{ display: uploadBtn ? '' : 'none' }} onClick={uploadImage}>
                                <IIcon type='addTodo-nav' size='30' color='#999999'></IIcon>
                            </View>
                        </View>

                    </View>
                    <View className='tip'>
                        退款方式：原路退回（预计2-10个工作日退至原支付方）
                </View>
                </View>
                <View>
                    <Button onClick={goRefundApply} className='save'>确认提交</Button>
                </View>
                <View>

                </View>
                <View className='postalSelect' style={{ display: showpup ? '' : 'none' }}>
                    <View className='selectContent'>
                        <View className='title'>
                            <View className='cancel' onClick={canselPup}>取消</View>
                            <View className='text'>点击选择申请原因</View>
                            <View className='confirm' onClick={canselPup}>确定</View>
                        </View>
                        <View className='content'>
                            <PickerView indicatorStyle='height: 42px;' style='width: 100%; height: 200px;' onChange={reasonChange}>
                                <PickerViewColumn>
                                    {reasonList.map(item => {
                                        return (
                                            <View style={{ lineHeight: '42px' }}>{item}</View>
                                        );
                                    })}
                                </PickerViewColumn>
                            </PickerView>
                        </View>
                    </View>
                </View>
            </View>

        </Block >
    );
};
export default observer(OrderRefund);

// OrderRefund.config = {
//     navigationBarTitleText: '申请退款'
// } as Config;
