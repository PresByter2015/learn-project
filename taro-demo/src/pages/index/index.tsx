import React, { Component, useState } from 'react'
import { View, Swiper, SwiperItem, Text, ScrollView, Block, Image } from '@tarojs/components'
import Taro, { Config, useReachBottom, useDidShow, usePullDownRefresh, useTabItemTap } from '@tarojs/taro';
import Goods from '@/types/goods';
// import { OPEN_ID } from '@/config/index';
// import setCCBehavior from '@/utils/behavior';
import yuyuanTrack from '@/utils/eventTracking';
import routers from '@/utils/routers';
import { addUrlPrefix, isLogin } from "@/utils/tool";
// import IIcon from "@/components/IIcon"
import IFont from "@/components/IFont";
import IImage from "@/components/IImage";
import IGoodsList from "@/components/IGoodsList";
import dot1 from '@/assets/images/dot1.png';
import dot2 from '@/assets/images/dot2.png';
import coupon from '@/assets/images/coupon.png';
import { homeInfo, homeGoodslist } from '@/api/home';
import { HomeInfoObject, HomeGoodsObject, HomeBanner, HomeRes } from '@/types/home';
// import { observer, inject } from 'mobx-react'
import './index.scss';

const Index = () => {
  const [swpindex, setSwpindex] = useState(0);
  const [goodsPayload, setGoodsPayload] = useState({ limit: 10, page: 1, count: 100 });
  const [goodsListData, setGoodsListData] = useState([] as Goods.CollectGoodsListItemData[]);
  const [homeInfoData, sethomeInfoData] = useState<HomeRes>({} as HomeRes);

  const handleRoute = (url = "", params = {}, homeFrom = '') => {
    yuyuanTrack({ type: 'home1', label: homeFrom });
    // yuyuanTrack({ type: 'home1', label: '市集_顶部轮播图' });
    // yuyuanTrack({ type: 'home1', label: '市集_热卖商品' });
    // yuyuanTrack({ type: 'home1', label: '市集_腰封' });
    const { type } = params;
    if (type === 0) {
      return false;
    }
    routers({
      url,
      params
    });
  };
  const getHomeGoodslist = ({ limit, page } = { "limit": 10, "page": 1 }, cb?) => {
    homeGoodslist({ limit, page }).then((res: HomeGoodsObject) => {
      setGoodsPayload({ limit, page, count: res.res.count });
      cb && cb(res);
    });
  };
  useTabItemTap(() => {
    yuyuanTrack({ type: 'home1', label: '市集_底部市集tab' });
  });
  useDidShow(() => {

    homeInfo().then((res: HomeInfoObject) => {
      const results = {
        marketBanners: addUrlPrefix(res.res['marketBanners'] || [], 'mediaUrl'),
        banners: addUrlPrefix(res.res['banners'] || [], 'mediaUrl', 'w_1500'),
        hotItems: addUrlPrefix(res.res['hotItems'] || [], 'cover'),
      };
      // console.log(results);
      res.code === 0 && sethomeInfoData(results as HomeRes);
    });

    const { limit, page, count } = goodsPayload;
    if (limit * page >= count) {
      return false;
    }
    getHomeGoodslist({ "limit": 10, "page": 1 }, (res: HomeGoodsObject) => {
      res.code === 0 && setGoodsListData(res.res.items || [] as Goods.CollectGoodsListItemData[]);
    });
  });
  useReachBottom(() => {
    // FIXME:分页刷新：上划加载刷新，10个商品一分页
    const { limit, page, count } = goodsPayload;
    if (limit * page >= count) {
      Taro.showToast({ title: '已经到底了哦', icon: 'none' });
      return false;
    }
    getHomeGoodslist({ "limit": 10, "page": page + 1 }, (res: HomeGoodsObject) => {
      const result = [...goodsListData, ...res.res.items];
      res.code === 0 && setGoodsListData(result as Goods.CollectGoodsListItemData[]);
    });

  });
  usePullDownRefresh(async () => {
    homeInfo().then((res: HomeInfoObject) => {
      const results = {
        marketBanners: addUrlPrefix(res.res['marketBanners'] || [], 'mediaUrl'),
        banners: addUrlPrefix(res.res['banners'] || [], 'mediaUrl', 'w_1500'),
        hotItems: addUrlPrefix(res.res['hotItems'] || [], 'cover'),
      };
      // console.log(results);
      res.code === 0 && sethomeInfoData(results as HomeRes);
      Taro.stopPullDownRefresh();
    });

    getHomeGoodslist({ "limit": 10, "page": 1 }, (res: HomeGoodsObject) => {
      res.code === 0 && setGoodsListData(res.res.items || [] as Goods.CollectGoodsListItemData[]);
      Taro.stopPullDownRefresh();
    });
  });

  return (
    <Block>
      {homeInfoData && homeInfoData.banners && homeInfoData.banners.length > 0 &&
        <View className='swp-box'>
          <Swiper
            style='height:340rpx'
            onChange={e => setSwpindex(e.detail.current)}
            autoplay
            interval={3000}
            circular
          >
            {homeInfoData.banners.map((item: HomeBanner) => (
              <SwiperItem key={item.id}>
                {/* <IImage onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr, })} src={item.mediaUrl} style='height:100%'></IImage> */}
                <Image
                  onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr, }, '市集_顶部轮播图')}
                  src={addUrlPrefix(item.mediaUrl) as ''}
                  style='height:340rpx;width:100vw'
                ></Image>
              </SwiperItem>
            ))}
          </Swiper>
          <View className='swp-dot'>
            {homeInfoData.banners.map((item: HomeBanner, index: number) => (
              <Image key={item.id} style='width:16rpx;height:16rpx;margin: 0 7rpx;' src={` ${index === swpindex ? dot1 : dot2}`}></Image>
            ))}
          </View>
        </View>
      }
      {homeInfoData && homeInfoData.marketBanners && homeInfoData.marketBanners.length > 0 && (
        <Block>
          <View className='gs-title' style='margin-top:0'>
            <IFont content='节气精选好物'></IFont>
            {/* <Text className='gs-more' onClick={handleRoute.bind(this, '/pages/solarTerms/solarTerms')}>查看更多</Text> */}
          </View>
          {/* <View className='gs-solar'>
            {homeInfoData && homeInfoData.marketBanners && homeInfoData.marketBanners.slice(0, 1).map(item => (
              <View
                key={item.id}
                className='gs-solar-item gs-solar-item-1'
                style={`background-image: url(${item.mediaUrl});`}
                onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr })}
              ></View>
              <Image
                key={item.id}
                className='gs-solar-item gs-solar-item-1'
                style='width:100%;heigth:100%'
                src={item.mediaUrl}
                // mode='widthFix'
                onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr })}
              ></Image>
            ))}
            {homeInfoData && homeInfoData.marketBanners && homeInfoData.marketBanners.slice(1).map(item => (
              <View className='gs-solar-item' key={item.id} onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr })} >
                <View style={`width:132rpx;height:132rpx;background:#ddd;background-image:url(${item.mediaUrl});background-size : 100% 100%;border-radius: 8rpx; `}></View>
                <Image src={item.mediaUrl} style='width:100%;border-radius: 8rpx;' mode='widthFix'></Image>
                <View className='gs-more l1eps' style='width:132rpx;color:#333;margin-top:12rpx'>{item.description}</View>
              </View>
            ))}
          </View> */}
          <View className='m-container'>
            {homeInfoData && homeInfoData.marketBanners && homeInfoData.marketBanners.slice(0, 1).map(item => (
              // <View
              //   key={item.id}
              //   className='gs-solar-item gs-solar-item-1'
              //   style={`background-image: url(${item.mediaUrl});`}
              //   onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr }, '市集_腰封')}
              // ></View>
              <Image
                key={item.id}
                className='gs-solar-item gs-solar-item-1'
                style='width:100%;heigth:100%'
                src={item.mediaUrl}
                // mode='widthFix'
                onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr })}
              ></Image>
            ))}
            <View className='m-rest'>
              {homeInfoData && homeInfoData.marketBanners && homeInfoData.marketBanners.slice(1).map(item => (
                <View className='gs-solar-item' key={item.id} onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType, id: item.addr }, '市集_腰封')} >
                  {/* <View style={`width:132rpx;height:132rpx;background:#ddd;background-image:url(${item.mediaUrl});background-size : 100% 100%;border-radius: 8rpx; `}></View> */}
                  <Image src={item.mediaUrl} style='width:100%;border-radius: 8rpx;' mode='widthFix'></Image>
                  <View className='gs-more l1eps' style='width:132rpx;color:#333;margin-top:12rpx'>{item.description}</View>
                </View>
              ))}
            </View>
          </View>
        </Block>)
      }
      {homeInfoData && homeInfoData.hotItems && homeInfoData.hotItems.length > 0 &&
        <Block>
          <View className='gs-title'>热卖商品</View>
          <View style='padding:0 0 0 40rpx;background-color: #fff;'>
            <ScrollView
              scrollX
              scrollWithAnimation
              enable-flex
              // onScroll={e => console.log(e.detail)}
              className='scroll-box'
            >
              {homeInfoData && homeInfoData.hotItems && homeInfoData.hotItems.map((item) => (
                <View className={`scroll-item `} style='display: inline-block' onClick={handleRoute.bind(this, '/pages/goods/goodsDetails/goodsDetails', { id: item.id }, '市集_热卖商品')} key={item.id}>
                  <IImage src={item.cover} mode='widthFix' size='w_1500' style='height:550rpx;width:460rpx;border-radius: 8rpx 8rpx 0 0;'></IImage>
                  <View className='scroll-item-ct' style='width:424rpx'>
                    <View className='l1eps' style='margin-right:10rpx'>{item.title}</View>
                    <Text className='scroll-item-price'>¥{item.price / 100}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </Block>
      }

      {!isLogin() && <Image src={coupon} onClick={handleRoute.bind(this, '/pages/login/login', { dpfrom: 'coupon' })} style='width:100vw;margin-top: 12rpx;' mode='widthFix'></Image>}
      {/* <Navigator className='red' url='/pages/login/login'>跳转到 login 页面</Navigator> */}
      {goodsListData.length > 0 && <Block>
        <View className='gs-title' style='margin-top: 0rpx;'>格调生活</View>
        <IGoodsList data={goodsListData} onClick={yuyuanTrack.bind(this, { type: 'home1', label: '市集_商品瀑布流' })}></IGoodsList>
      </Block>}
    </Block>
  );
};

export default Index
