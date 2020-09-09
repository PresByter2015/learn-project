import React, { useState, } from 'react';
import Taro, { Config, useDidShow, useRouter, useReachBottom, useShareAppMessage } from '@tarojs/taro';
import { View, Button, Block, Canvas } from '@tarojs/components';
import { observer } from 'mobx-react';
import IIcon from '@/components/IIcon';
import Orders from '@/types/order';
import { bannerPic, orderDetail } from '@/api/order';
import IImage from "@/components/IImage";
import routers from '@/utils/routers';
import Goods from '@/types/goods';
import { LOGO, FILE_HOST } from '@/config/index';
import { addUrlPrefix } from "@/utils/tool";
import { getQrcodeMore } from '@/api/tool';
import IGoodsList from '@/components/IGoodsList';
import { paySuccessRecommendList } from '@/api/goods';
import setCCBehavior from '@/utils/behavior';
import yuyuanTrack from '@/utils/eventTracking';

import './payResult.scss';

interface RecommendObject {
  mediaUrl: string
  description: string
  addr: string
  addrType: string
}
const PayResult = () => {
  const params = useRouter();
  const [orderItemsData, setorderItemsData] = useState({} as Orders.OrderItemsObject);
  const [shareShow, setShare] = useState(true);
  const [qrcode, setQrcode] = useState({ width: 140, height: 120, path: '', origionFile: '', preview: '' });
  const [recommend, setRecommend] = useState({} as RecommendObject);
  const [codeData, setCodeData] = useState({} as RecommendObject);
  const [pixelRatio, setPixelRatio] = useState(1);
  const [canvasShow, setCanvasShow] = useState(false);
  const [goodsListData, setGoodsListData] = useState([] as Goods.CollectGoodsListItemData[]);
  const [goodsPayload, setGoodsPayload] = useState({ limit: 0, page: 0 });
  // 推荐 商品列表
  const getGoodsRecommendList = ({ limit, page, itemId } = { "limit": 20, "page": 1, 'itemId': '' }, cb?) => {
    paySuccessRecommendList({ limit, page, itemId }).then((res: Goods.CollectGoodsListData) => {
      setGoodsPayload({ limit, page });
      cb && cb(res);
    });
  };

  // 推荐图
  const getBannerPic = () => {

    bannerPic({ location: 3 }).then(res => {
      console.log(res.res);
      if (res.code == 0) {
        setRecommend(res.res[Math.floor((Math.random() * res.res.length))]);
      }

    });
  };
  //二维码
  const getCodePic = () => {
    bannerPic({ location: 5 }).then(res => {
      console.log(res.res);
      if (res.code == 0) {
        setCodeData(res.res[0]);
      }
    });
  };
  //订单详情
  const getOrderData = () => {
    orderDetail({ orderId: params.params.id }).then(res => {
      console.log(res.res);
      if (res.code == 0) {
        getGoodsRecommendList({ "limit": 20, "page": 1, 'itemId': res.res.orderItems[0].itemId + '' }, res1 => {
          res1.code === 0 && setGoodsListData(res1.res || [] as Goods.CollectGoodsListItemData[]);
        });
        setorderItemsData(res.res.orderItems[0]);

        getQrcodeMore({ path: 'pages/transfer/transfer', scene: `type=5&id=${res.res.orderItems[0].itemId}` }).then(resl => {
          if (resl.code === 0) {
            const files = addUrlPrefix(resl.res);
            Taro.getImageInfo({
              src: files as '',
              success: (fileres) => {
                const { width, height, path } = fileres;
                setQrcode({ ...qrcode, width, height, path, origionFile: files as '' });
              }
            });
          }
        });
      }

    });
  };
  const saveImage = (path, type) => {
    console.log(path);
    const filePath = path;
    Taro.saveImageToPhotosAlbum({
      filePath
    }).then(() => {
      console.log('保存成功');
      Taro.showToast({
        title: type == 'pic' ? '已保存到相册' : '二维码已保存',
        icon: 'success',
        duration: 1000
      }).finally(() => {
        setCCBehavior(9);
      });
    }).catch(err => {
      console.log(err);
    });
  };
  const gotoHome = () => {
    routers({
      url: '/pages/index/index',
    });
    yuyuanTrack({ type: 'paySuccess', label: '付款成功页_去首页看看' });
  };
  const gotoOrder = () => {
    routers({
      url: '/pages/orders/orderDetails/orderDetails?id=' + params.params.id,
    });
    yuyuanTrack({ type: 'paySuccess', label: '付款成功页_查看订单' });
  };
  const gotoBanner = (url = "", fparams = {}) => {
    const { type } = fparams;
    if (type === 0) {
      return false;
    }
    routers({
      url,
      params: fparams
    });
    // routers({
    //   url: recommend.addr,
    // });
  };

  const downloadFile = async (data) => {
    let imgPath;
    if (typeof data == 'function') {
      imgPath = data();
    }
    if (typeof data == 'string') {
      imgPath = data;
    }
    if (data instanceof Promise) {
      imgPath = await data;
    }
    if (imgPath) {
      return Taro.downloadFile({
        url: imgPath
      });
    } else {
      return '';
    }
  };
  // 生成图片
  const setImageAuth = (path, type) => {
    Taro.getSetting({
      success: (res) => {
        console.log(res.authSetting['scope.writePhotosAlbum'], res.authSetting['scope.writePhotosAlbum']);
        if (res.authSetting['scope.writePhotosAlbum'] || res.authSetting['scope.writePhotosAlbum'] !== false) {
          console.log('有相册权限');
          saveImage(path, type);
        } else {
          console.log('无相册权限');
        }
      }
    });
  };
  const getImagePic = () => {
    setTimeout(() => {
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375,
        height: 521,
        destWidth: 375 * pixelRatio,
        destHeight: 521 * pixelRatio,
        canvasId: 'canvasView',
        success(res) {
          console.log(res.tempFilePath);
          setImageAuth(res.tempFilePath, 'pic');
        },
        fail: (error) => {
          console.log(error);

        },
      });
    }, 1000);
  };

  const drawCanvasPic = (arr) => {
    const ctx = Taro.createCanvasContext('canvasView');
    const goodsText = orderItemsData.title;
    console.log(goodsText.length);
    const goodsPrice = '￥' + orderItemsData.realpay / 100;
    const goodsActivityPrice = '￥' + orderItemsData.price / 100;
    const pics = {
      logo: arr[0].tempFilePath,
      canvasBg: arr[1].tempFilePath,
      banner: arr[2].tempFilePath,
      goodsPic: arr[3].tempFilePath,
    };
    console.log(pics);
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 375, 521);
    ctx.drawImage(pics.banner, 33, 20, 310, 286);
    ctx.drawImage(pics.goodsPic, 33, 316, 100, 100);
    ctx.setFillStyle('#EDEDED');
    ctx.fillRect(133, 316, 210, 100);
    ctx.setFillStyle('#222222');
    ctx.setFontSize(13);
    if (goodsText.length > 13) {
      ctx.fillText(goodsText.substring(0, 13), 139, 340);
      ctx.fillText(goodsText.substring(13), 139, 360);
    } else {
      ctx.fillText(goodsText, 139, 340);
    }
    ctx.setFillStyle('#B6162A');
    ctx.setFontSize(14);
    ctx.fillText(goodsPrice, 137, 380);
    ctx.setFillStyle('#999999');
    if (orderItemsData.realpay != orderItemsData.price) {
      ctx.setFontSize(12);
      ctx.fillText(goodsActivityPrice, 175 + (goodsPrice.length - 1) * 2, 380);
      ctx.setStrokeStyle('#999999');
      ctx.moveTo(178, 375);
      ctx.lineTo(208, 375);
      ctx.stroke();
    }


    ctx.drawImage(pics.logo, 33, 460, 20, 20);
    ctx.setFillStyle('#666666');
    ctx.setFontSize(12);
    ctx.fillText('长按识别 发现东方美物', 33, 500);
    console.log(qrcode);
    ctx.drawImage(qrcode.path, 260, 450, 60, 60);
    ctx.draw(true, getImagePic);
    setCanvasShow(true);
  };

  // 二维码
  const getImageCode = () => {
    setTimeout(() => {
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375,
        height: 521,
        destWidth: 375 * pixelRatio,
        destHeight: 521 * pixelRatio,
        canvasId: 'canvasCode',
        success(res) {
          console.log(res.tempFilePath);
          setImageAuth(res.tempFilePath, 'code');
        }
      });
    }, 50);
  };
  const drawCanvasCode = (arr) => {
    const ctx = Taro.createCanvasContext('canvasCode');
    const pics = {
      codePic: arr[0].tempFilePath,
    };
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 375, 521);
    ctx.drawImage(pics.codePic, 82, 210, 210, 80);
    ctx.draw(true, getImageCode);
    setCanvasShow(true);
  };
  //分享图片
  const downImage = (type) => {
    const logo = 'https://file.idongjia.cn/T3.bhvB5AT1RCvBVdK.png';
    const canvasBg = 'https://file.idongjia.cn/T3YhLTBjZT1RXrhCrK.jpg';
    const banner = FILE_HOST + recommend.mediaUrl;
    const goodsPic = FILE_HOST + orderItemsData.cover;
    const codeWeixin = FILE_HOST + codeData.mediaUrl;
    // let codePic = qrcode.path
    let arr = [] as string[];
    if (type == 'pic') {
      arr = [logo, canvasBg, banner, goodsPic];
    } else {
      arr = [codeWeixin];
    }
    console.log(arr);
    const promiseArr = arr.map(function (item) {

      console.log(downloadFile(item));
      return downloadFile(item);
    });
    console.log(promiseArr);
    Promise.all(promiseArr).then(posts => {
      if (type == 'pic') {
        drawCanvasPic(posts);
      } else {
        drawCanvasCode(posts);
      }

    }).catch(err => {
      console.log(err);
      //console.log(err,'下载失败')
    });
  };
  // code 保存二维码  pic 保存图片到相册
  const drawImage = (type) => {
    downImage(type);
    if (type === 'code') {
      yuyuanTrack({ type: 'paySuccess', label: '付款成功页_保存二维码' });
    } else if (type === 'pic') {
      yuyuanTrack({ type: 'paySuccess', label: '付款成功页_保存分享卡片到相册' });
    }
  };
  //复制
  const copyEvents = () => {
    Taro.setClipboardData({
      data: codeData.description,
      success: () => {
        Taro.showToast({
          title: '微信号已复制',
          icon: 'success',
          duration: 1000
        });
        yuyuanTrack({ type: 'paySuccess', label: '付款成功页_复制微信号' });
      }
    });
  };
  const shareClose = () => {
    setShare(false);
    Taro.requestSubscribeMessage({
      tmplIds: ['8ziFWVC6s2LtWMs186Qi-7dGRSbTVrhzt5h8Wy4P8hQ'],
      complete: function (res) {
        console.log(res);
      }
    });
  };

  useDidShow(() => {
    Taro.getSystemInfo().then(res => {
      console.log(res.pixelRatio);
      setPixelRatio(res.pixelRatio);
    });
    getBannerPic();
    getOrderData();
    getCodePic();

  });
  //转发
  useShareAppMessage(() => {
    setCCBehavior(9);
    yuyuanTrack({ type: 'paySuccess', label: '付款成功页_分享商品' });
    return {
      title: `${orderItemsData.title} ¥${(orderItemsData.price / 100) || 0}起`,
      path: `/pages/goods/goodsDetails/goodsDetails?id=${orderItemsData.itemId}`,
      imageUrl: `${FILE_HOST}${orderItemsData.cover}` || LOGO,
      success: (res2) => {
        console.log('useShareAppMessage', res2); // data
        // setCCBehavior(9);
      }

    };
  });
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
      <View className='payResult'>
        <View className='icon'>
          <IImage src='https://file.idongjia.cn/T3mZ__B7DT1RCvBVdK.png'></IImage>

          <View className='goto'>
            <Button onClick={gotoOrder} style={{ marginRight: '30rpx' }}>查看订单</Button>
            <Button onClick={gotoHome}>回到首页</Button>
          </View>
        </View>
        <View className='action'>
          <View className='pic' onClick={() => gotoBanner('/pages/transfer/transfer', { addr: codeData.addr, type: codeData.addrType, id: codeData.addr })}>
            <IImage src={codeData.mediaUrl}></IImage>
          </View>
          {/* <View className='tip'>
                        <View className='title'>添加微信领福利</View>
                        <View className='text'>
                        1.添加官方微信 
                        
                        </View>
                        <View className='text'>
                         
                        2.加入福利群 
                       
                        </View>
                        <View className='text'>
                       
                        3.领取社群专属福利
                        </View>
                    </View> */}
          <View className='btn'>
            <View className='weixin' onClick={copyEvents}>
              <IIcon type='wexin2' color='#ffffff' size='22' ></IIcon>
                            复制微信号
                          </View>
            <View className='code' onClick={() => drawImage('code')}>
              <IIcon type='xiazai1' color='#ffffff' size='22' ></IIcon>
                          保存二维码
                        </View>
          </View>
        </View>
        <View className='share' style={{ display: shareShow ? 'block' : 'none' }}>
          <View className='share-modal-content'>
            <View className='closIcon' onClick={shareClose}>
              <IIcon type='guanbi' color='#ffffff' size='26' ></IIcon>
            </View>

            <View className='banner' onClick={() => gotoBanner('/pages/transfer/transfer', { addr: recommend.addr, type: recommend.addrType, id: recommend.addr })}>
              <IImage src={recommend.mediaUrl}></IImage>
            </View>
            <View className='goods'>
              <View className='pic'>
                <IImage src={orderItemsData.cover} />
              </View>
              <View className='detail'>
                <View className='title'>{orderItemsData.title}</View>

                <View className='price'>
                  ￥{(orderItemsData.realpay / 100).toFixed(2)}
                  {
                    orderItemsData.realpay == orderItemsData.price ? '' : <View className='activityPrice'>￥{(orderItemsData.price / 100).toFixed(2)}</View>
                  }

                </View>
              </View>
            </View>
            <View className='shareBtn'>
              <Button className='cardShare' style="font-family:'sxc';" openType='share'>分享美物给好友</Button>
              <View className='picShare' onClick={() => drawImage('pic')}>
                <View className='picShareBox'>
                  <View className='icon'>
                    <IIcon type='xiazai1' color='#ffffff' size='20' ></IIcon>
                  </View>

                  <View className='text' style="font-family:'sxc';">
                    保存图片到相册
                                </View>
                </View>

              </View>

            </View>
            <View className='bottomIcon'>
              <View className='logoBox'>
                <View className='logo'>
                  <IImage src='https://file.idongjia.cn/T3.bhvB5AT1RCvBVdK.png'></IImage>
                  <View className='logoText'>東+小程序</View>
                </View>
                <View className='text'>长按识别 发现东方美物</View>
              </View>
              <View className='codePic'>
                <IImage src={qrcode.origionFile}></IImage>
              </View>
            </View>
          </View>
        </View>
        <View className='canvasContent' style={{ display: canvasShow ? '' : 'none' }}>
          <Canvas canvasId='canvasView' style={{ width: pixelRatio * 375 + 'px', height: pixelRatio * 521 + 'px' }} ></Canvas>
        </View>
        <View className='canvasContent' style={{ display: canvasShow ? '' : 'none' }}>
          <Canvas canvasId='canvasCode' style={{ width: pixelRatio * 375 + 'px', height: pixelRatio * 521 + 'px' }} ></Canvas>
        </View>
      </View>
      <View className='dj-goods-title' style="font-family:'sxc';">猜你喜欢</View>
      <IGoodsList isSell data={goodsListData} onClick={yuyuanTrack.bind(this, { type: 'paySuccess', label: '付款成功页_猜你喜欢' })}></IGoodsList>
    </Block >
  );
};
export default observer(PayResult);

// PayResult.config = {
//   navigationBarTitleText: '付款成功'
// } as Config;
