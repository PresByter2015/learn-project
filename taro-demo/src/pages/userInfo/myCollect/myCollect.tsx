import React, { useState, } from 'react';
import Taro, { Config, useDidShow, useReachBottom } from '@tarojs/taro';
import { View, Text, Block, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import { goodsCollectList, goodsCollect } from '@/api/goods';
import { sliceDotNum } from '@/utils/tool';
import Empty from '@/assets/images/empty.png';
import Touches from '@/utils/touches';
import Goods from '@/types/goods';
import IImage from '@/components/IImage';
import IIcon from '@/components/IIcon';
import router from '@/utils/routers';
import './myCollect.scss';

export interface ListItem extends Goods.CollectGoodsListItemData {
    left?: number
}
const DELETE_BTN_WIDTH = 100; //删除按钮 宽度
const MyCollect = () => {
    const [startX, setStartX] = useState(0);
    const [goodsCollectDtaList, setGoodsCollectDtaList] = useState([] as Goods.CollectGoodsListItemData[]);
    const [goodsPayload, setGoodsPayload] = useState({ limit: 0, page: 0 });

    const getGoodsCollectList = ({ page = 1, limit = 20 }, cb?) => {
        goodsCollectList({ page, limit }).then((res: Goods.CollectGoodsListData) => {
            // console.log(res.res);
            setGoodsPayload({ limit, page });
            cb && cb(res);
        });
    };
    useDidShow(() => {
        getGoodsCollectList({ page: 1, limit: 20 }, (res: Goods.CollectGoodsListData) => {
            res.code === 0 && setGoodsCollectDtaList([...res.res] as []);
        });
        // console.log(validType('Datea', new Date()));
    });
    const handleDelete = (id = -99) => {
        // console.log(id);
        Taro.showModal({
            title: '',
            content: '是否将该商品从 我的收藏列表中移除',
            cancelColor: '#A9AFB8',
            confirmColor: '#E7831D',
            success: (res0) => {
                if (res0.confirm) {
                    goodsCollect({ itemId: id, collect: false }).then(res => {
                        res.code === 0 && getGoodsCollectList({ page: 1, limit: 20 }, (res2: Goods.CollectGoodsListData) => {
                            res2.code === 0 && setGoodsCollectDtaList([...res2.res] as []);
                        });
                    });
                } else if (res0.cancel) {
                    console.log('用户点击取消');
                }
            }
        });

    };
    const renderPrice = (price = 0) => {
        // FIXME:价格修改：UI稿上默认显示 两位 小数，删除  改成有小数就显示，没有就不填 
        return (<Text>¥{parseInt(price / 100 || 0 + '').toFixed(0)}<Text style='font-size:22rpx'>{sliceDotNum(price / 100)}</Text></Text>);
        // return (<Text>¥{parseInt(price / 100 || 0 + '').toFixed(0)}<Text style='font-size:22rpx'>{(price / 100).toFixed(2).substr(-3)}</Text></Text>);
    };
    /**
   * @desc 开始滑动
   */
    const touchS = (e) => { // touchstart
        const startX = Touches.getClientX(e);
        startX && setStartX(startX);
    };
    /**
     * @desc 滑动时
     */
    const touchM = (e) => { // touchmove
        const addressList = Touches.touchM(e, goodsCollectDtaList, startX);
        addressList && setGoodsCollectDtaList(addressList);
    };
    /**
     * @desc 滑动结束
     */
    const touchE = (e) => { // touchend
        const width = DELETE_BTN_WIDTH; // 定义操作列表宽度
        const addressList = Touches.touchE(e, goodsCollectDtaList, startX, width);
        addressList && setGoodsCollectDtaList(addressList);
    };
    const handleRoute = (id: number) => {
        router({
            url: '/pages/goods/goodsDetails/goodsDetails',
            params: { id: id }
        });
    };
    useReachBottom(() => {
        const { limit, page } = goodsPayload;
        // console.log(goodsPayload);
        const sum = limit * page;
        if (goodsCollectDtaList.length === sum) {
            // console.log('+++');
            getGoodsCollectList({ "limit": 20, "page": page + 1 }, (res) => {
                const result = [...goodsCollectDtaList, ...res.res];
                res.code === 0 && setGoodsCollectDtaList(result as Goods.CollectGoodsListItemData[]);
            });
        } else if (goodsCollectDtaList.length < sum) {
            // console.log('---');
            Taro.showToast({ title: '已经到底了哦', icon: 'none' });
        }
    });
    return (
        <Block>
            {goodsCollectDtaList.map((item: ListItem, index: number) => (
                <View className='mc-box' key={item.id}>
                    <View
                        data-index={index}
                        onTouchStart={touchS}
                        onTouchMove={touchM}
                        onTouchEnd={touchE}
                        onClick={handleRoute.bind(this, item.id)}
                        className='item-info'
                        style={`left:${item.left}rpx`}
                    >
                        <IImage src={item.cover} style={{
                            width: '122rpx',
                            height: '122rpx',
                            borderRadius: '4rpx',
                            border: '1rpx solid rgba(221,221,221,1)'
                        }}
                        ></IImage>
                        <View className='item-text'>
                            <Text className='l1eps'>{item.title}</Text>
                            {renderPrice(item.price)}
                        </View>
                    </View>
                    <View className='item-oper mainbkColor'>
                        <View className='item-oper-btn' onClick={handleDelete.bind(this, item.id)}>
                            <IIcon color='#ffffff' type='delete' size='26'></IIcon>
                        </View>
                    </View>
                </View>
            ))
            }
            {goodsCollectDtaList.length === 0 &&
                <View className='empty'>
                    <Image mode='widthFix' style='width:340rpx;margin-bottom:60rpx' src={Empty}></Image>
                    <View>您的收藏夹是空的哟！</View>
                </View>
            }
        </Block >
    );
};
export default observer(MyCollect);

// MyCollect.config = {
//     navigationBarTitleText: '收藏夹'
// } as Config;
