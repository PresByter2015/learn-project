import React, { useState, useEffect, useCallback, useContext } from 'react';
import Taro from '@tarojs/taro';
import { ComponentType } from "react";
import { Text, View, Block, ScrollView, Input } from '@tarojs/components';
// import { EventProps } from '@tarojs/components/types/common'
import Store from '@/store/goods';
import IImage from "@/components/IImage";
import Goods from '@/types/goods';
import { isLogin } from '@/utils/tool';
import routers from '@/utils/routers';
import tip from '@/utils/tip';
import { DJ_STYLE } from '@/config/index';
import { getItemDetail } from '@/api/order';

import './sku.scss';

export interface CheckedSku {
    id: string
    value: Goods.PropertyValue
}
const SKU: ComponentType<Goods.SkuProps> = (props: Goods.SkuProps) => {
    const { properties = [], skuList = [], tempSkued = {}, skuedInit = {} } = props;
    const { setGoodsChecked } = useContext(Store) as any;
    // 初始值

    // 基本赋值
    const [skued, setSkued] = useState(tempSkued as Goods.TempSkued); // 设置默认选项
    const [skuedvalue, setSkuedvalue] = useState(skuedInit as Goods.SkuList); //设置默认选项的相关数据
    const [num, setNum] = useState(1);

    useEffect(() => {
        // console.log(DJ_STYLE.djColor);

        setSkuedvalue(skuedInit as Goods.SkuList);
        setSkued(tempSkued);
    }, [skuedInit, tempSkued]);
    // 查找 选中 的 数据
    const ckeckedSku = (payload) => {
        // const { skuList = [] } = props
        const sqls = Object.values(payload).map((v: Goods.PropertyValue) => v.id).sort().join('');
        const skuchecked = skuList.filter(item => {
            const equalsqls = item.propertyValues.map(v => v.id).sort().join('');
            return sqls === equalsqls;
        });
        return skuchecked[0] || {};
    };
    const handleSku = (e: CheckedSku, stock: number) => {
        // 库存 为0 不可选择
        if (stock === 0) {
            return false;
        }
        const { id, value } = e;
        const payload = { ...skued };
        payload[id] = value;
        // 设置 暂存 选择
        setSkued(payload);
        // 去查找
        if (properties.length === Object.keys(payload).length) {
            setSkuedvalue(ckeckedSku(payload));
            setNum(1);
            // console.log('sqls', 'sqls', stock, ckeckedSku(payload));
        }
    };
    // 数量
    const handleNum = useCallback((val: number) => {
        // console.log('val', val, skuedvalue);//stock
        const { stock = 0 } = skuedvalue;

        if (val < 1) {
            setNum(1);
            tip.toast(`很抱歉，该商品至少购买1件`);
        } else if (stock < val) {
            setNum(stock);
            tip.toast(`很抱歉，该商品每位用户最多购买${stock}件`);
        } else {
            setNum(val);
        }

    }, [skuedvalue]);

    // 去下单
    const handleBuy = async () => {
        setGoodsChecked({ ...skuedvalue, num: num });
        // 未登陆
        if (!isLogin()) {
            // 去授权
            Taro.navigateTo({
                url: '/pages/login/login'
            });
            return false;
        }
        // 预请求 查看 库存
        const isEmptyRes = await getItemDetail({ skuId: skuedvalue.id });
        if (isEmptyRes.code == 1030302016) {
            tip.toast(isEmptyRes.msg);
            return false;
        }
        routers({
            url: `/pages/orders/orderConfirm/orderConfirm?id=${skuedvalue.id}&num=${num}`,
        });
    };
    return (
        <View className='sku-box'>
            <View className='sku-box-h'>
                <IImage style='height:172rpx;width:172rpx' src={skuedvalue.cover}></IImage>
                <View className='sku-box-hr'>
                    <View className='sku-box-hprice'>
                        <Text className='sku-price' style={`color:${DJ_STYLE.djColor}`}>¥{(skuedvalue.price) / 100 || 0}</Text>
                        {skuedvalue.price !== skuedvalue.originPrice && <Text className='sku-aprice'>¥{(skuedvalue.originPrice / 100).toFixed(2)}</Text>}
                    </View>
                    <View className='sku-box-hcheck'>
                        <Text className='sku-box-hrw'>已选择：</Text>
                        <Text className='sku-box-hrw'>{skuedvalue.propertyValues && skuedvalue.propertyValues.map(v => v.name).join(' ')}</Text>
                    </View>
                </View>
            </View>
            <ScrollView
                scrollY
                scrollWithAnimation
                style='height:600rpx'
            >
                {properties.map(item => <Block key={item.id}>
                    <View className='sku-sec-itemname'>{item.name}</View>
                    {item.values && item.values.map((child) =>
                        <View
                            onClick={handleSku.bind(this, { id: item.id, value: child }, ckeckedSku({ ...skued, [item && item.id]: child }).stock || 0)}
                            className={`sku-sec-item ${skued[item.id] && skued[item.id].id === child.id && 'sku-sec-active'} 
                      ${(ckeckedSku({ ...skued, [item && item.id]: child }).stock || 0) === 0 && 'sku-sec-empty'}
                      `}
                            key={child.id}
                        >{child.name}</View>
                    )}
                </Block>)}
                <View className='sku-sec-name'>数量</View>
                <View className='sku-num'>
                    <Text className='sku-num-dec' style={`color:${num == 1 ? '#dddddd' : '#999999'}`} onClick={handleNum.bind(this, num - 1)}>-</Text>
                    <Input
                        className='sku-num-def'
                        onBlur={e => handleNum(+e.detail.value || 1)}
                        onInput={e => setNum(+e.detail.value || 0)}
                        cursorSpacing={20}
                        type='number'
                        value={`${num}` || '1'}
                    />
                    <Text className='sku-num-add' style={`color:${num == skuedvalue.stock ? '#dddddd' : '#999999'}`} onClick={handleNum.bind(this, num + 1)}>+</Text>
                </View>
            </ScrollView>
            <View style='height:100rpx'></View>
            <View className='sku-btn-box'>
                <View className='sku-btn' style={`font-family:sxc;background-color:${DJ_STYLE.djColor}`} onClick={handleBuy}>确定</View>
            </View>
        </View>
    );
};

SKU.defaultProps = {
    properties: [],
    skuList: [],
    skuedInit: {
        id: -999,
        propertyValues: [],
        // price: 0,
        price: 0,
        originPrice: 0,
        stock: 0,
        cover: '',
    },
    tempSkued: {}
};
// export default Taro.memo(SKU);
export default SKU;