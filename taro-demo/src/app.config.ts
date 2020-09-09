export default {
  pages: [
    'pages/index/index',
    'pages/solarTerms/solarTerms',
    'pages/myInfo/myInfo',
    'pages/login/login',
    'pages/transfer/transfer',
    'pages/webView/webView',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '東+',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "./assets/images/home0.png",
        "selectedIconPath": "./assets/images/home1.png",
        "text": "市集"
      },
      {
        "pagePath": "pages/solarTerms/solarTerms",
        "iconPath": "./assets/images/st0.png",
        "selectedIconPath": "./assets/images/st1.png",
        "text": "東+节气"
      },
      {
        "pagePath": "pages/myInfo/myInfo",
        "iconPath": "./assets/images/my0.png",
        "selectedIconPath": "./assets/images/my1.png",
        "text": "我的"
      }
    ],
    "color": "#666666",
    "selectedColor": "#E7831D",
    "backgroundColor": "#fff",
    "borderStyle": "black",
    "position": "bottom"
  },
  /**
     * TODO:由于分包加载 会造成进入商品详情页等 会出现加载资源 导致耗时卡顿，这是一个bug。等待 牛逼的开发解决
     * @see https://jira.idongjia.cn/browse/DPLUS-136?filter=11540
     */
    "subPackages": [
      {
        "root": "pages/goods",
        "pages": [
          "goodsDetails/goodsDetails",
          // "purchase/purchase"
        ]
      },
      {
        "root": "pages/orders",
        "pages": [
          "orderDetails/orderDetails",
          "ordersList/ordersList",
          "orderRefund/orderRefund",
          "orderConfirm/orderConfirm",
          "orderPostal/orderPostal",
          "payResult/payResult",
          "orderAfter/orderAfter",
          "orderAfterDetail/orderAfterDetail",
          "orderPostalEdit/orderPostalEdit"
        ]
      },
      {
        "root": "pages/userInfo",
        "pages": [
          "myCollect/myCollect",
          // "perfectInfo/perfectInfo",
          "protocols/protocols",
          "address/address",
          "addressEdit/addressEdit"
          // "coupon/coupon"
        ]
      }
    ],
    "networkTimeout": {
      "request": 10000,
      "connectSocket": 10000,
      "uploadFile": 10000,
      "downloadFile": 10000
    },
    // "debug": process.env.NODE_ENV === 'development',
    "debug": false,
}
