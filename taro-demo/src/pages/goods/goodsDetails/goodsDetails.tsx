import React, { useState, useEffect, useCallback, useContext, } from 'react'
import Taro, { Config, useRouter, useDidShow, useShareAppMessage, usePageScroll, useReachBottom } from '@tarojs/taro';
import { View, Text, Swiper, Block, SwiperItem, Button, Image } from '@tarojs/components';
// import { observer } from '@tarojs/mobx';
import { observer } from 'mobx-react';
import { LOGO, FILE_HOST } from '@/config/index';
import { goodsDetailApi, goodsCollect, goodsRecommendList } from '@/api/goods';
import { getItemDetail } from '@/api/order';
import yuyuanTrack from '@/utils/eventTracking';
import tip from '@/utils/tip';
import Store from '@/store/goods';
import Goods from '@/types/goods';
import IImage from "@/components/IImage";
import IIcon from "@/components/IIcon";
import IPopup from '@/components/IPopup';
import IGoodsList from '@/components/IGoodsList';
import { addUrlPrefix, isLogin, sliceDotNum } from '@/utils/tool';
import dot1 from '@/assets/images/dot1.png';
import dot2 from '@/assets/images/dot2.png';
// import { DJ_STYLE } from '@/config/index'
// import { setBehavior } from '@/api/tool';
import setCCBehavior from '@/utils/behavior';

import SKU from './SKU';
import './goodsDetails.scss';
// import data from './data'

export interface PopupTypes {
    service: boolean
    sku: boolean
    share: boolean
}
const popupDatas: PopupTypes = {
    share: true,
    service: false,
    sku: false
};
// const mockdata: Goods.GoodsDetailResData = data
let timeout: NodeJS.Timeout;
const GoodsDetails = () => {
    const params = useRouter();
    const { setGoodsChecked } = useContext(Store) as any;
    const [goodsPayload, setGoodsPayload] = useState({ limit: 0, page: 0 });
    const [goodsListData, setGoodsListData] = useState([] as Goods.CollectGoodsListItemData[]);
    const [swiperIndex, setSwiperIndex] = useState(0);
    const [goodsDetail, setGoodsDetail] = useState({ price: 0, originPrice: 0 } as Goods.GoodsDetailRes);
    const [skuPropsData, setSkuPropsData] = useState({} as Goods.SkuProps);
    const [showpup, setShowpup] = useState(popupDatas);

    const handleItemCollect = () => {
        if (!isLogin()) {
            // 去授权
            Taro.navigateTo({
                url: '/pages/login/login'
            });
            return false;
        }
        const { itemCollect, id } = goodsDetail;
        const payload = { itemId: id, collect: !itemCollect };
        goodsCollect(payload).then(res => {
            if (res.code === 0) {
                tip.toast(itemCollect ? '取消收藏成功' : '已加入收藏');
                setGoodsDetail({ ...goodsDetail, itemCollect: !itemCollect });
            }
            // res.code === 0 && setGoodsDetail({ ...goodsDetail, itemCollect: !itemCollect })
        });
        yuyuanTrack({ type: 'commodityDetail', label: '商品详情_收藏按钮' });

    };
    const handlePreviewImage = useCallback((current: string, arr = []) => {
        Taro.previewImage({
            current: addUrlPrefix(current, '', 'w_1500') as '', // 当前显示图片的http链接
            urls: arr.map(v => addUrlPrefix(v.mediaUrl, '', 'w_1500')) as string[] // 需要预览的图片http链接列表
        });
    }, []);
    // 查看 商品 状态
    const computedStatus = (stock = 1, status = 4, type?: string): string => {
        if (type === 'color') {
            return status !== 4 ? '#999999' : stock === 0 ? '#999999' : "";
        } else {
            return status !== 4 ? '商品已下架' : stock === 0 ? '商品已售罄' : '立即购买';
        }
    };
    // 推荐 商品列表
    const getGoodsRecommendList = ({ limit, page } = { "limit": 20, "page": 1 }, cb?) => {
        Taro.showLoading({
            title: '加载中',
        });
        goodsRecommendList({ limit, page, itemId: params.params.addr ? params.params.addr : params.params.id }).then((res: Goods.CollectGoodsListData) => {
            setGoodsPayload({ limit, page });
            cb && cb(res);
            Taro.hideLoading();
        });
    };

    useDidShow(() => {

        goodsDetailApi({ itemId: params.params.addr ? params.params.addr : params.params.id }).then(res => {
            res.code === 0 && setGoodsDetail({ ...res.res });
            Taro.setNavigationBarTitle({ title: '' });
        });
        getGoodsRecommendList({ "limit": 20, "page": 1 }, res => {
            res.code === 0 && setGoodsListData(res.res || [] as Goods.CollectGoodsListItemData[]);
        });
    });

    useReachBottom(() => {
        const { limit, page } = goodsPayload;
        // console.log(goodsPayload);
        const sum = limit * page;
        if (goodsListData.length === sum) {
            getGoodsRecommendList({ "limit": 20, "page": page + 1 }, (res) => {
                const result = [...goodsListData, ...res.res];
                res.code === 0 && setGoodsListData(result as Goods.CollectGoodsListItemData[]);
            });
        } else if (goodsListData.length < sum) {
            Taro.showToast({ title: '已经到底了哦', icon: 'none' });
        }
    });
    const handleBuy = useCallback(async () => {
        const { properties = [], skuList = [], totalStock = 0, coverPictureList = [], status = 4 } = goodsDetail;
        if (totalStock === 0) {
            // 已售罄
            return false;
        }
        if (status !== 4) {
            // 商品已下架
            return false;
        }
        // 设置 商品 主图
        setGoodsChecked({ mainCover: coverPictureList[0].mediaUrl || '' });
        if (properties.length === 0) {

            // 后端下单 必须要SKU id
            setGoodsChecked({ ...skuList[0] });
            // 未登陆
            if (!isLogin()) {
                // 去授权
                Taro.navigateTo({
                    url: '/pages/login/login'
                });
                return false;
            }
            // 预请求 查看 库存
            const isEmptyRes = await getItemDetail({ skuId: skuList[0].id });
            if (isEmptyRes.code == 1030302016) {
                tip.toast(isEmptyRes.msg);
                return false;
            }
            // 直接去购买
            Taro.navigateTo({
                url: `/pages/orders/orderConfirm/orderConfirm?id=${skuList[0].id}&num=1`
            });
            yuyuanTrack({ type: 'commodityDetail', label: '商品详情_立即购买' });

        } else {
            // 打开 类型弹窗
            // 初始值
            const skuedInit = skuList.filter(v => v.stock > 0)[0] || {};

            const tempSkued = {};
            skuedInit.propertyValues.forEach(item => {
                tempSkued[item.propertyId] = item;
            });
            // console.log('skuedInit', skuedInit);
            // console.log('tempSkued', tempSkued);
            setSkuPropsData({ skuedInit, tempSkued, properties, skuList });
            setShowpup({ ...showpup, sku: !showpup['sku'] });
            yuyuanTrack({ type: 'commodityDetail', label: '商品详情_选择规格' });
        }
    }, [goodsDetail, setGoodsChecked, showpup]);
    useShareAppMessage(res => {
        const { title = '东家精选', id = -999, price = 0, coverPictureList = [] } = goodsDetail;
        Taro.showShareMenu({
            withShareTicket: true,
            // menus: ['shareAppMessage', 'shareTimeline']
        });
        // const userinfo = Taro.getStorageSync(USER_SPECICAL_INFO);
        Taro.showShareMenu({
            withShareTicket: true,
            // menus: ['shareAppMessage', 'shareTimeline']
        });
        // setBehavior({ action: 9, phone: userinfo.mobile || '' }).then(() => {
        // });
        setCCBehavior(9);
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        /**
         * TODO:  微信控制 分享商品的标题的长短 开发无法控制，已被当bug提出。等待 牛逼的开发解决
         * @see https://jira.idongjia.cn/browse/DPLUS-173
         * @see https://jira.idongjia.cn/browse/DPLUS-175
         */
        return {
            title: `${title} ¥${(price / 100) || 0}起`,
            path: `/pages/goods/goodsDetails/goodsDetails?id=${id}`,
            imageUrl: `${FILE_HOST}${coverPictureList[0].mediaUrl}` || LOGO,
            success: (res2) => {
                console.log('useShareAppMessage', res2); // data
            }
        };
    });
    usePageScroll(() => {
        (showpup['share']) && setShowpup({ ...showpup, share: false });
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            (!showpup['share']) && setShowpup({ ...showpup, share: true });
        }, 1000);
    });
    useEffect(() => {
        return () => {
            // console.log('will unmount');
            clearTimeout(timeout);
        };
    }, []);
    return (
        <Block>
            <View className='swiper-box'>
                <Swiper
                    style='height:750rpx'
                    circular
                    indicatorDots={false}
                    autoplay
                    onChange={e => setSwiperIndex(e.detail.current)}
                >
                    {goodsDetail.coverPictureList && goodsDetail.coverPictureList.map((item) => (
                        <SwiperItem key={item.mediaUrl}>
                            <IImage style='height:750rpx' size='w_1500' onClick={handlePreviewImage.bind(this, item.mediaUrl, goodsDetail.coverPictureList)} src={item.mediaUrl}></IImage>
                        </SwiperItem>
                    ))}
                </Swiper>
                <View className='swiper-dot'>
                    {goodsDetail.coverPictureList && goodsDetail.coverPictureList.map((item, index: number) => (
                        <Image key={item.mediaUrl} style='width:16rpx;height:16rpx;margin: 0 7rpx;' src={` ${index === swiperIndex ? dot1 : dot2}`}></Image>
                    ))}
                </View>
            </View>
            {/* // FIXME:价格修改：UI稿上默认显示 两位 小数，删除  改成有小数就显示，没有就不填 */}
            <View className='gs-price'>
                <View className='gs-price-l'>
                    <Text className='mainColor gs-oprice'>
                        <Text className='gs-signprice'>¥</Text>
                        {parseInt(goodsDetail.price / 100 + '').toFixed(0) || 0}
                        {/* <Text className='gs-qiprice'>{(goodsDetail.price / 100).toFixed(2).substr(-3)}{goodsDetail.properties.length > 0 ? '起' : ''}</Text> */}
                        <Text className='gs-qiprice'>{sliceDotNum(goodsDetail.price / 100)}{goodsDetail.properties && goodsDetail.properties.length > 0 ? '起' : ''}</Text>
                    </Text>
                    {/* <Text className='gs-aprice'>¥{(goodsDetail.originPrice / 100).toFixed(2)}</Text> */}
                    {/* {goodsDetail.price !== goodsDetail.originPrice && <Text className='gs-aprice'>¥{(goodsDetail.originPrice / 100).toFixed(2)}</Text>} */}
                    {goodsDetail.price !== goodsDetail.originPrice && <Text className='gs-aprice'>¥{(goodsDetail.originPrice / 100)}</Text>}
                </View>
                <Text className='gs-sloganr'>{goodsDetail.sellCount >= 10000 ? `${parseInt(goodsDetail.sellCount / 10000 + '')}.${parseInt(goodsDetail.sellCount % 10000 / 1000 + '')}万` : goodsDetail.sellCount}人已买</Text>
            </View>
            <View className='gs-title'>{goodsDetail.title}</View>
            <View className='gs-slogan'>
                <Text className='gs-sloganl'>{goodsDetail.slogan}</Text>
                {/* <Text className='gs-sloganr'>{goodsDetail.sellCount}人已买</Text> */}
            </View>
            <View className='gs-service'>
                <Text>服务</Text>
                <View className='gs-service-content' onClick={() => {
                    setShowpup({ ...showpup, service: !showpup['service'] });
                    yuyuanTrack({ type: 'commodityDetail', label: '商品详情_服务' });
                }}
                >
                    <Text className=' '>
                        {goodsDetail.serviceList && goodsDetail.serviceList.map((item, index) =>
                            <Text key={item.name}>{item.name}{index !== goodsDetail.serviceList.length - 1 && <Text> • </Text>}</Text>
                        )}
                    </Text>
                    <IIcon type='right' size='28' color='#333'></IIcon>
                </View>
            </View>
            <View className='gs-detail' style="font-family:'sxc';">图文详情</View>
            <View className='gs-detail-content'>
                {goodsDetail.attributeList && goodsDetail.attributeList.map(item =>
                    <View key={item.relationId} className='gs-detail-item rbb'>
                        <Text className='gs-detail-iteml'>{item.attributeName}</Text>
                        <Text className='gs-detail-itemr'>{item.values.join('，')}</Text>
                    </View>
                )}
            </View>
            <View className='gs-detail-text'>
                <Text className='gs-detail-text-inner'>{goodsDetail.detail}</Text>
            </View>
            <View className='gs-detail-pic'>
                {goodsDetail.detailPictureList && goodsDetail.detailPictureList.map(item =>
                    // <IImage
                    //   style='heigth:100%;margin-top:-12rpx'
                    //   mode='widthFix'
                    //   size='w_1500'
                    //   key={item.mediaUrl}
                    //   src={item.mediaUrl}
                    //   onClick={handlePreviewImage.bind(this, item.mediaUrl, goodsDetail.detailPictureList)}
                    // ></IImage>
                    <Image
                        style='heigth:100%;width:100%;margin-top:-12rpx'
                        mode='widthFix'
                        key={item.mediaUrl}
                        src={addUrlPrefix(item.mediaUrl, '', 'w_1500') as ''}
                        onClick={handlePreviewImage.bind(this, item.mediaUrl, goodsDetail.detailPictureList)}
                    ></Image>
                    // addUrlPrefix
                )}
            </View>
            <Image className='gs-tohome' mode='widthFix' src='https://file.idongjia.cn/T38C__B4CT1RCvBVdK.png' onClick={
                () => {
                    Taro.reLaunch({
                        url: '/pages/index/index'
                    });
                    yuyuanTrack({ type: 'commodityDetail', label: '商品详情_首页引流资源位' });
                }
            }
            ></Image>

            <View className='gs-title-bar'>爆品抢购</View>
            <IGoodsList data={goodsListData} isSell onClick={yuyuanTrack.bind(this, { type: 'commodityDetail', label: '商品详情_爆品推荐' })}></IGoodsList>

            <View className='gs-blank'></View>
            <View className='gs-opr'>
                <View className='gs-opr-fn'>
                    <View className='gs-opr-fnitem' onClick={handleItemCollect}>
                        <IIcon size='20' color={goodsDetail.itemCollect ? '#B6162A' : '#333'} type={goodsDetail.itemCollect ? 'like' : 'like2'}></IIcon>
                        <Text>{goodsDetail.itemCollect ? '已收藏' : '收藏'}</Text>
                    </View>
                    <Button className='gs-opr-fnitem' openType='contact' onClick={() => {
                        yuyuanTrack({ type: 'commodityDetail', label: '商品详情_联系客服' });
                    }}
                    >
                        <IIcon size='20' type='kefu' color='#333'></IIcon>
                        <Text>客服</Text>
                    </Button>
                </View>
                <View
                    className='gs-opr-btn mainbkColor'
                    style={`background-color:${computedStatus(goodsDetail.totalStock, goodsDetail.status, 'color')}`}
                    onClick={() => handleBuy()}
                >{computedStatus(goodsDetail.totalStock, goodsDetail.status)}</View>
            </View>

            {isLogin() ? <Button className='gs-share' openType='share' style={`display:${showpup['share'] ? 'flex' : 'none'}`}>
                <IIcon size='23' type='share' color='#fff'></IIcon>
                <Text>分享</Text>
            </Button> : <Button onClick={() => Taro.navigateTo({
                url: '/pages/login/login'
            })} className='gs-share' style={`display:${showpup['share'] ? 'flex' : 'none'}`}
            >
                    <IIcon size='23' type='share' color='#fff'></IIcon>
                    <Text>分享</Text>
                </Button>}

            <IPopup
                visible={showpup['service']}
                onCancel={setShowpup.bind(this, { ...showpup, service: !showpup['service'] })}
                renderContent={
                    <Block>
                        {goodsDetail.serviceList && goodsDetail.serviceList.map((item) =>
                            <View key={item.name} className='gs-service-p'>
                                <Text className='gs-service-name'>{item.name}</Text>
                                <Text className='gs-service-desc'>{item.desc}</Text>
                            </View>
                        )}
                    </Block>
                }
                title='服务说明'
                height='50vh'
            ></IPopup>

            <IPopup
                visible={showpup['sku']}
                onCancel={() => setShowpup({ ...showpup, sku: !showpup['sku'] })}
                renderContent={
                    <SKU {...skuPropsData}></SKU>
                }
                height='1000rpx'
            ></IPopup >

        </Block >
    );
};
export default observer(GoodsDetails);

// GoodsDetails.config = {
//     navigationBarTitleText: '商品详情',
//     navigationBarBackgroundColor: '#fff',
//     navigationBarTextStyle: 'black'
// } as Config;
