declare namespace Orders {
    export interface RootObject {
        code: number
        msg: string
    }
    export interface TabItem {
        id: number
        name: string
    }
    //订单列表
    export interface OrderListObjectData extends RootObject {
        res: OrderDetailObject[]
    }
    // 订单详情
    export interface OrderDetailObjectData extends RootObject {
        res: OrderDetailObject
    }
    export interface OrderDetailObject {
        order: OrderObject
        orderItems: OrderItemsObject[]
    }
    export interface OrderObject {
        id: string
        balanceId: string
        price: number
        realpay: number
        payType: number
        closeType: number
        comment: string
        remainTime: number
        status: number
        quantity: number
        createTime: number
        closeTime: number
        payTime: number
        sendTime: number
        confirmTime: number
        platformSubsidy: number
        maxChangedAmount: number
        reducedOrder: boolean
        discount: number
        reduceAmount: number
        receiverAddress: string
        receiverMobile: string
        receiverName: string
        maxFreightAmount: number
        freightAmount: number
        countDownTime: string
        logisticsNo: string
    }
    
    export interface OrderItemsObject {
        id: number
        price: number
        refund: number
        quantity: number
        title: string
        cover: string
        realpay: number
        itemId: number
        refundId: number
        services: OrderSeiviceObject[]
        skuProperty: string
        itemTitle: string
    }
    export interface OrderSeiviceObject {
        icon: string
        name: string
    }
    

    //退款详情
    export interface Refund {
        id: number
        amount: number
        quantity: number
        status: number
        refundType: number
        createTime: number
        
    }
    
    export interface RefundItem {
        title: string
        cover: string
        skuProperty: string
        orderItemId: number
    }
    
    
    export interface ResRefund {
        refund: Refund
        orderItem: RefundItem
    }
    export interface OrderRefundObjectData extends RootObject {
        res: ResRefund[]
    }
    export interface RefundDetail {
        id: number
        orderId: string
        refundType: number
        amount: number
        platformSubsidy: number
        remainTime: number
        quantity: number
        reason: string
        refundPictures: string[]
        comment: string
        status: number
        createTime: number
        refundAgain: boolean
        rejectTime: number
        freightRefundAmount: number
        closeType: number
        rejectReason: string
      }
      
      /*Logistics*/
      export interface LogisticsDetail {
        logisticsNo: string
        refundReceiverAddress: string
        refundReceiverMobile: string
        refundReceiverName: string
      }
      
      /*OrderItem*/
      export interface OrderItemDetail {
        id: number
        title: string
        cover: string
        price: number
        realpay: number
        quantity: number
      }
    export interface ResRefundDetail {
        refund: RefundDetail
        logistics: LogisticsDetail
        orderItem: OrderItemDetail
    }
    export interface OrderRefundDetailObject extends RootObject {
        res: ResRefundDetail
    }
    export interface PostalRes {
        id: number
        name: string
        picture: string
      }
      
     
      export interface PostalObject extends RootObject{
       
        res: PostalRes[]
      }

      //物流详情
      /*ShipCompany*/
export interface ShipCompany {
    name: string
    icon: string
    no: string
  }
  
  /*TrackList*/
  export interface TrackList {
    status: string
    time: string
    detail: string
  }
  
  /*Res*/
  export interface ShipCompanyRes {
    status: string
    updateTime: string
    no: string
    shipCompany: ShipCompany
    trackList: TrackList[]
  }
  
  /*tsModel3*/
  export interface ShipCompanyObject extends RootObject{
       
    res: ShipCompanyRes
  }
 //订单结算信息
 export interface OrderBalanceItem {
  itemId: number
  cover: string
  price: number
  realpay: number
  status: number
  stock: number
  skuProperty: string
  title: string
  version: number
}

  
}
export default Orders;