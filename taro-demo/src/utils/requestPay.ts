import Taro from '@tarojs/taro';
import { addOrder, prePay, payResult, payConfirming } from '@/api/order';
import routers from '@/utils/routers';
import {
    USER_SPECICAL_INFO, APPID
} from '@/config/index';
import setCCBehavior from '@/utils/behavior';

const Info = Taro.getStorageSync(USER_SPECICAL_INFO) || {};
let orderId = '';
let consfirmText = null;
let balanceId = '';
export default {

    gotoPay(version, num, skuId, addressId, comment, consfirm) {

        consfirmText = consfirm;
        console.log(consfirmText);
        const self = this;
        const order = {                //类型：Object  必有字段  备注：订单信息
            "comment": comment,                //类型：String  可有字段  备注：下单备注
            "orderItem": {                //类型：Object  必有字段  备注：订单项信息
                "skuId": skuId,                //类型：Number  必有字段  备注：商品SKU ID
                "version": version,                //类型：Number  必有字段  备注：商品版本号
                "quantity": num               //类型：Number  必有字段  备注：购买数量
            }
        };
        addOrder({ addressId: addressId, order: order }).then(res => {
            console.log(res.res);
            balanceId = res.res.balanceId;
            self.getPrePay(res.res.orderId,res.res.balanceId, consfirm);
            orderId = res.res.orderId;
        });


    },
    payResult() {
        payResult({ balanceId: balanceId }).then(res => {
            console.log(consfirmText);

            setCCBehavior(3);

            if (res.res.status == 1) {

                console.log(consfirmText == 'confirm');
                routers({
                        url: '/pages/orders/payResult/payResult?id=' + orderId,
                    });

            } else if (res.res.status == 2) {
                routers({
                    url: '/pages/orders/payResult/payResult?id=' + orderId,
                });
            } else {
                routers({
                    url: '/pages/orders/payResult/payResult?id=' + orderId,
                });
            }
        });
    },
    payConfirm(postData) {
        const self = this;
        payConfirming({ trade: postData.trade }).then(res => {
            console.log(res.res);
            if (res.code == 0) {
                self.payResult();
            }
        });
    },
    getPrePay(id,balanceId, confirm) {
        const self = this;
        orderId = id
        console.log(consfirmText);
        consfirmText = confirm;
        balanceId = balanceId;
        prePay({ openId: Info.openId, balanceId: balanceId, appId: APPID(), payType: 7 }).then(res => {
            console.log(res.res);

            const postData = res.res;
            Taro.requestPayment({
                timeStamp: postData.timeStamp,
                nonceStr: postData.nonceStr,
                package: postData.package,
                signType: 'MD5',
                paySign: postData.paySign,
                success: () => {
                    this.payConfirm(postData);
                },
                fail: function () {
                    if (consfirmText == 'confirm') {
                        routers({
                            url: '/pages/orders/orderDetails/orderDetails?id=' + orderId,
                        });
                    }
                },
            });
        });
    }
};
