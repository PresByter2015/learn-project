import React, { ComponentType, CSSProperties } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Block } from '@tarojs/components';
import { ImagePropsObject } from "@/components/IImage";
import { addUrlPrefix } from "@/utils/tool";
import routers from '@/utils/routers';
import yuyuanTrack from '@/utils/eventTracking';
import './StMultipleImages.scss';

/**
 * 多张图片组件的封装
 * @description: 多张图片组件的封装 ,参考的是 gird 布局，可以使用style自定义布局样式
 * @author: PresByter
 * @date   : 2020/07/06 14:41:27
 * @latest : 2020/07/06 14:41:27
 * @param {ImagePropsListItemDatum[]} params 参数描述 e.g. 
 * @return {ComponentType} 返回结果描述 e.g. 
 * @see http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
 */

export interface MultipleImagesPropsObject {
    mode?: TextsNames // 默认是 bottom;文字分别位于 图片的 上 下  
    splits?: number | string // 分隔符 默认是：2
    gap?: number | string // 两张图文之间的间隙 默认是 10
    style?: CSSProperties | string
    imagesLists?: ImagePropsListItemDatum[]
    // [key: string]: any //防止 溢出的参数 存在
}
export interface ImagePropsListItemDatum extends ImagePropsObject {
    id: string
    title?: string
    height?: string
    // href?: string  // 需要设置跳转，请在image 上设置
}
export type TextsNames = "top" | "bottom"

const StMultipleImages: ComponentType<MultipleImagesPropsObject> = (props: MultipleImagesPropsObject) => {
    const { style = "", mode = 'bottom', gap = 10, splits = '2', imagesLists = [] } = props;
    const splitsCloumns = typeof style === "string" ? `grid-template-columns:repeat(${parseInt(splits as "")}, 1fr)` : { gridTemplateColumns: `repeat(${parseInt(splits as "")}, 1fr)` };
    const gapCloumns = typeof style === "string" ? `grid-column-gap:${parseInt(gap as "")}rpx` : { gridColumnGap: `${parseInt(gap as "")}rpx` };
    const styled = typeof style === "string" ? `${style};${splitsCloumns};${gapCloumns}` : { ...(splitsCloumns as {}), ...(gapCloumns as {}), ...style };
    const handleNavi = (val) => {
        // handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType })
        yuyuanTrack({ type: 'home2', label: '节气_模板商品' });
        const url = `/pages/transfer/transfer`;
        routers({
            url: url,
            params: { addr: val.itemId, id: val.itemId, type: val.addrType, login: false }
        });
    };
    return (
        <View className={`dj-imgs-box `} style={styled}>
            {imagesLists.map((item: ImagePropsListItemDatum) => (
                <View key={item.id} className='dj-imgs-item' onClick={handleNavi.bind(this, item)}>
                    {mode === 'top' && item.title && <Block>
                        <Text className='dj-imgs-content'>{item.title}</Text>
                        <Text className='dj-imgs-price'>¥{item.price / 100}</Text>
                    </Block>}
                    <Image
                        style={`height:100%;width:100%;height:${item.height};`}
                        className={`dj-img `}
                        src={addUrlPrefix(item.src) as ""}
                    // lazyLoad={lazyLoad}
                    // showMenuByLongpress={showMenuByLongpress}
                    // webp={webp}
                    // mode={mode}
                    // onClick={e => handleClickNavigator({ ...e, src: addUrlPrefix(src) })}
                    // onError={onError && onError}
                    // onLoad={onLoad && onLoad}
                    />
                    {mode === 'bottom' && item.title && <Block>
                        <Text className='dj-imgs-content'>{item.title}</Text>
                        <Text className='dj-imgs-price'>¥{item.price / 100}</Text>
                    </Block>}
                </View>
            ))}
        </View>
    );
};
export default StMultipleImages;
