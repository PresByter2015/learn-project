import Orders from '@/types/order';
import request from '../utils/request/index';
// 订单-列表
interface PageF {
    page: number
    status: number
}

export const getOrderList = (params: PageF = { page: 1, status: 0 }): Promise<Orders.OrderListObjectData> => {
    const { page = 1, status = 0 } = params;
    return request.post(
        {
            url: 'order/list',
            data: {
                'page': page,

                'status': status,

            }
        }
    );
};

// 订单-下单
interface OrderItem {
    skuId: number
    version: number
    quantity: number
}
interface OrderObject {
    comment: string
    orderItem: OrderItem

}
export interface AddOrder {
    addressId: number
    order: OrderObject

}
// eslint-disable-next-line import/prefer-default-export

export const addOrder = ({ addressId = 0, order = {} as OrderObject }: AddOrder) => {
    return request.post(
        {
            url: 'order/add',
            data: {
                addressId: addressId,
                order: order
            }
        }
    );
};
//结算信息
interface ItemDetailObject {
    skuId: number


}
// eslint-disable-next-line import/prefer-default-export
export const getItemDetail = ({ skuId = 0 }: ItemDetailObject) => {
    return request.post(
        {
            url: 'order/balance',
            data: {
                skuId: skuId,

            }
        }
    );
};
//预支付
interface PrePayObject {
    openId: string
    balanceId: string
    appId: string
    payType: number

}
// eslint-disable-next-line import/prefer-default-export
export const prePay = ({ openId = '', balanceId = '', appId = '', payType = 0 }: PrePayObject) => {
    return request.post(
        {
            url: 'pay/prePay',
            headers: {
                // Accept: 'application/json',
            },
            data: {
                openId: openId,
                balanceId: balanceId,
                appId: appId,
                payType: payType
            }
        }
    );
};
//确认支付
interface PayConfirmingObject {
    trade: string
}
// eslint-disable-next-line import/prefer-default-export
export const payConfirming = ({ trade = '' }: PayConfirmingObject) => {
    return request.post(
        {
            url: 'pay/confirming',
            data: {
                trade: trade,


            }
        }
    );
};
//确认支付
interface PayResultObject {
    balanceId: string
}
// eslint-disable-next-line import/prefer-default-export
export const payResult = ({ balanceId = '' }: PayResultObject) => {
    return request.post(
        {
            url: 'pay/result',
            data: {
                balanceId: balanceId,


            }
        }
    );
};
//查询默认地址

// eslint-disable-next-line import/prefer-default-export
export const defaultAddress = () => {
    return request.post(
        {
            url: 'user/address/default',
            data: {



            }
        }
    );
};

//确认收货
interface OrderIdObject {
    orderId: string


}
// eslint-disable-next-line import/prefer-default-export
export const confirmOrderApi = ({ orderId = '' }: OrderIdObject) => {
    return request.post(
        {
            url: 'order/confirm',
            data: {

                orderId: orderId,

            }
        }
    );
};
//取消订单
// eslint-disable-next-line import/prefer-default-export
export const delectOrderApi = ({ orderId = '' }: OrderIdObject) => {
    return request.post(
        {
            url: 'order/close',
            data: {

                orderId: orderId,

            }
        }
    );
};
//订单详情
// eslint-disable-next-line import/prefer-default-export
export const orderDetail = (params: OrderIdObject = { orderId: '' }): Promise<Orders.OrderDetailObjectData> => {
    const { orderId = '' } = params;
    return request.post(
        {
            url: 'order/detail',
            data: {

                orderId: orderId,

            }
        }
    );
};
//申请退款

interface RefundObject {
    refundType: number
    quantity: number
    amount: number
    reason: string
    orderItemId: number
    explain: string
    mobile: string
    pictures: string[]

}
// eslint-disable-next-line import/prefer-default-export
export const refundApply = (params: RefundObject = { refundType: 0, quantity: 0, amount: 0, reason: '', orderItemId: 1, explain: '', mobile: '', pictures: [''] }): Promise<Orders.OrderDetailObjectData> => {
    const { refundType = 0, quantity = 0, amount = 0, reason = '', orderItemId = 1, explain = '', mobile = '', pictures = [''] } = params;
    return request.post(
        {
            url: 'refund/apply',
            data: {
                refundType: refundType,
                quantity: quantity,
                amount: amount,
                reason: reason,
                orderItemId: orderItemId,
                explain: explain,
                mobile: mobile,
                pictures: pictures,
            }
        }
    );
};
// 物流详情
interface LogisticsObject {
    logisticsNo: string

}

// eslint-disable-next-line import/prefer-default-export
export const logisticsDetail = (params: LogisticsObject = { logisticsNo: '' }): Promise<Orders.ShipCompanyObject> => {
    const { logisticsNo = '' } = params;
    return request.post(
        {
            url: 'logistics/detail',
            data: {
                'logisticsNo': logisticsNo,



            }
        }
    );
};
// 售后列表
interface RefundList {
    page: number

}
// eslint-disable-next-line import/prefer-default-export
export const getRefundList = (params: RefundList = { page: 1 }) => {
    const { page = 1 } = params;
    return request.post(
        {
            url: 'refund/list',
            data: {
                'page': page,



            }
        }
    );
};
// 售后详情
interface RefundDetailList {
    refundId: number

}
// eslint-disable-next-line import/prefer-default-export
export const getRefundDetail = (params: RefundDetailList = { refundId: 1 }): Promise<Orders.OrderRefundDetailObject> => {
    const { refundId = 1 } = params;
    return request.post(
        {
            url: 'refund/detail',
            data: {
                'refundId': refundId,



            }
        }
    );
};
// 物流公司

// eslint-disable-next-line import/prefer-default-export

export const getShipCompanies = (): Promise<Orders.PostalObject> => {

    return request.post(
        {
            url: 'logistics/shipCompanies',
            data: {

            }
        }
    );
};
// 买家发出退货
interface LogisticsReturnsObject {
    refundId: number
    shipmentCompanyId: number
    logisticsNo: string
}
// eslint-disable-next-line import/prefer-default-export
export const logisticsReturns = (params: LogisticsReturnsObject = { refundId: 1, shipmentCompanyId: 1, logisticsNo: '' }) => {
    const { refundId = 1, shipmentCompanyId = 1, logisticsNo = '' } = params;
    return request.post(
        {
            url: 'logistics/returns',
            data: {
                refundId: refundId,
                shipmentCompanyId: shipmentCompanyId,
                logisticsNo: logisticsNo
            }
        }
    );
};
// 取消退款

// eslint-disable-next-line import/prefer-default-export
export const refundCancel = (params: RefundDetailList = { refundId: 1 }) => {
    const { refundId = 1 } = params;
    return request.post(
        {
            url: 'refund/cancel',
            data: {
                'refundId': refundId,



            }
        }
    );
};

// 付款成功
interface BannerPicObject {
    location: number

}
// eslint-disable-next-line import/prefer-default-export
export const bannerPic = (params: BannerPicObject = { location: 5 }) => {
    const { location = 1 } = params;
    return request.post(
        {
            url: 'banner/list',
            data: {
                'location': location,
            }
        }
    );
};