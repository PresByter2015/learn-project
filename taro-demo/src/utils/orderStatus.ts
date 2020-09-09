

export function getOrderStatus (orderstatus) {
    const statusText = {
      0: '订单关闭',  //已取消
      1: '待付款',    //下单
      2: '待付款',    //付款确认中
      3: '待发货',    //已付款
      4: '待收货',    //已发货
      5: '已完成',    //已确认收货
      6: '已完成',    //已评价
      7: '待付款',    //付款失败
      8: '待发货'     //订单付款状态待外部确认
    }
    return statusText[orderstatus];
  };
// REFUND_CLOSED(0,"未申请"),
// REFUND_CREATE(1,"仅退款退款中"),
// REFUND_APPROVED(2,"仅退款匠人已同意"),
// REFUND_REJECT(3,"仅退款匠人已拒绝"),
// REFUND_NEED_MANNUL(4,"待人工处理"),
// REFUND_SUCCESS(5,"仅退款退款已到账"),

// RETURN_CREATED(6,"退货退款中"),
// RETURN_ALLOWED(7,"退货退款匠人已同意,等待买家发送退货"),
// RETURN_DISALLOWED(8,"退货退款匠人已拒绝"),
// RETURN_SEND(9,"退货退款买家已发货"),
// RETURN_APPROVED(10,"退货退款匠人已确认收退货"),
// RETURN_REJECT(11,"退货退款匠人已拒绝收退货"),
// RETURN_SUCCESS(12,"退货退款已到账");
  export function getOrderRefundStatus (orderstatus) {
    const statusText = {
      0: '售后已取消',  
      1: '待商家审核',   
      2: '退款到账中',    
      3: '商家拒绝申请',   
      4: '待商家审核',    
      5: '退款成功',    
      6: '待商家审核',    
      7: '待买家处理',    
      8: '商家拒绝申请',    
      9: '待商家验货',    
      10: '退款到账中',   
      11: '商家拒绝签收',    
      12: '退货退款成功',     
    }
    return statusText[orderstatus];
  };
  export function getOrderRefundTip (orderstatus,closeType) {
    const statusText = {
      0: closeType==1?'申请已撤销':'售后已取消',  
      1: '已提交退款申请，请等待商家审核',   
      2: '商家已同意退款，退款到账中',    
      3: '商家拒绝申请，您可以联系客服处理',   
      4: '已提交退款申请，请等待商家审核',    
      5: '退款成功',    
      6: '已提交退货退款申请，请等待商家审核',    
      7: '已同意退款申请，请寄回商品并上传物流单号',    
      8: '商家拒绝了退货退款申请',    
      9: '请等待商家收货并退款',    
      10: '商家已收货，退款到账中',   
      11: '商家拒绝签收，您可以联系客服处理',    
      12: '退款成功',     
    }
    return statusText[orderstatus];
  };
  