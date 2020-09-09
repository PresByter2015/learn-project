import React from 'react';
import Taro from '@tarojs/taro';
import { ComponentType } from "react";
import { Text, View, RichText, Image } from '@tarojs/components';
import { EventProps } from '@tarojs/components/types/common';
// import IImage from "@/components/IImage";
import { HomeGoodsItem } from '@/types/home';
import { addUrlPrefix } from "@/utils/tool";
// import router from '@/utils/routers';
import './goodsList.scss';

export interface GoodsPropsObject {
    data?: HomeGoodsItem[]
    isSell?: boolean
    onClick?: EventProps["onClick"]
    [key: string]: any
}

const GAP = 20; // 商品之间的间隙
const IMG_WIDTH = (750 - GAP - 40 * 2) / 2;

const IGoodsList: ComponentType<GoodsPropsObject> = (props: GoodsPropsObject) => {
    const { data = [], isSell = false, onClick } = props;

    const handleRoute = (id = "") => {
        try {
            onClick && onClick(id);
        } catch (error) {
            console.log(error);
        }
        /**
         * TODO:测试要求返回商品详情，会出现小程序爆栈 问题，已经提出该问题。
         * @see https://jira.idongjia.cn/browse/DPLUS-171?filter=11540
         */
        Taro.navigateTo({
            url: `/pages/goods/goodsDetails/goodsDetails?id=${id}`
        }).catch(() => {
            Taro.redirectTo({
                url: `/pages/goods/goodsDetails/goodsDetails?id=${id}`
            });
        });
        // router({
        //     url: '/pages/goods/goodsDetails/goodsDetails',
        //     params: { id: id }
        // });
    };
    const comptuedTitle = (title: string) => {
        return `<p class="dj-gsl-item-title" style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;white-space: pre-wrap;">${title}</p>`;
    };
    const sliceDotNum = (str: string | number) => {
        return `${str}`.indexOf(".") === -1 ? '' : `${str}`.substring(`${str}`.indexOf("."));
    };
    // FIXME:价格修改：UI稿上默认显示 两位 小数，删除  改成有小数就显示，没有就不填
    const renderPrice = (price = 0) => {
        return (<Text className='dj-gsl-item-price'>¥{parseInt(price / 100 || 0 + '').toFixed(0)}<Text style='font-size:24rpx'>{sliceDotNum(price / 100)}</Text></Text>);
        // return (<Text className='dj-gsl-item-price'>¥{parseInt(price / 100 || 0+'').toFixed(0)}<Text style='font-size:24rpx'>{(price / 100).toFixed(2).substr(-3)}</Text></Text>);
    };
    const computedSellCount = (num: number) => {
        return num >= 10000 ? `${parseInt(num / 10000 + '')}.${parseInt(num % 10000 / 1000 + '')}万` : `${num}`;
    };
    return (
        <View className='dj-gsl-box'>
            {data.map((v: HomeGoodsItem, index: number) => (
                <View
                  key={v.id} className={`dj-gsl-item `}
                  onClick={handleRoute.bind(this, v.id)}
                  style={{
                        marginRight: `${(index + 1) % 2 === 1 ? GAP / 2 : 0}rpx`,
                        marginLeft: `${(index + 1) % 2 === 0 ? GAP / 2 : 0}rpx`,
                        marginTop: '20rpx',
                        marginBottom: '20rpx',
                        minWidth: `${IMG_WIDTH}rpx`,
                        maxWidth: `${IMG_WIDTH}rpx`,
                    }}
                >
                    <View>
                        {/* <IImage src={v.cover} style='min-width:328rpx;height:340rpx;border-radius: 8px;'></IImage> */}
                        <Image
                          style='width:100%;height:340rpx;border-radius: 8rpx;'
                          src={addUrlPrefix(v.cover) as ""}
                          mode='widthFix'
                        />
                        {/* <View className='dj-gsl-item-title' style='width:100rpx'>{v.title}</View> */}
                        <RichText nodes={comptuedTitle(v.title)}></RichText>
                    </View>
                    <View className='dj-gsl-price'>
                        <Text>
                            {/* <Text className='dj-gsl-item-price'>¥{(v.promotionPrice ? v.promotionPrice : v.originPrice) / 100}</Text> */}
                            {renderPrice(v.price ? v.price : v.originPrice)}
                            {/* {v.price !== v.originPrice && <Text className='dj-gsl-item-aprice'>¥{(v.originPrice / 100).toFixed(2)}</Text>} */}
                            {v.price !== v.originPrice && <Text className='dj-gsl-item-aprice'>¥{(v.originPrice / 100)}</Text>}
                        </Text>
                        {/* {isSell && <Text className='dj-gsl-item-sell'>{v.sellCount}人已买</Text>} */}
                        {isSell && <Text className='dj-gsl-item-sell'>{computedSellCount(v.sellCount)}人已买</Text>}
                    </View>
                </View>
            ))}

        </View>
    );
};
export default IGoodsList;
IGoodsList.defaultProps = {
    isSell: false, data: []
};