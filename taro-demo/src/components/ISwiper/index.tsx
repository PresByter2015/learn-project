import React,{ CSSProperties, ComponentType } from "react"
import Taro, { } from '@tarojs/taro'
import { Swiper, Block, SwiperItem } from '@tarojs/components'
import { SwiperProps } from '@tarojs/components/types/Swiper'
import IImage, { ImagePropsObject } from "@/components/IImage"

import './swiper.scss'

/**
 * @description: 轮播图插件封装 
 * @author: PresByter
 * @date   : 2020/07/02 11:48:44
 * @latest : 2020/07/03 10:04:18
 * @see https://nervjs.github.io/taro/docs/components/viewContainer/swiper
 */
export interface SwiperPropsObject extends SwiperProps {
    style?: CSSProperties | string
    swiperItemLists?: SwiperItemBaseDatum[]
    [key: string]: any //防止 溢出的参数 存在
}
export interface SwiperItemBaseDatum extends ImagePropsObject {
    // id?: string
    // src?: string
    // href?: string  // 需要设置跳转，请在image 上设置
    itemId?: string // 对应 SwiperItem 的item-id；如果没有特别指定，默认是 SwiperItem 的id

}
const ISwiper: ComponentType<SwiperPropsObject> = ({
    indicatorDots = false,
    indicatorColor = '#999',
    indicatorActiveColor = '#333',
    autoplay = true,
    current = 0,
    currentItemId = "",
    interval = 3000,
    duration = 1000,
    circular = true,
    vertical = false,
    previousMargin = "0px",
    nextMargin = "0px",
    displayMultipleItems = 1,
    skipHiddenItemLayout = false,
    easingFunction = "default",
    onChange,
    onTransition,
    onAnimationFinish,

    style = 'height:300px',
    className = "",
    swiperItemLists = []
}: SwiperPropsObject) => {
    return (
        <Block>
            <Swiper
              className={`dj-swiper ${className}`}
              style={style}
              indicatorColor={indicatorColor}
              indicatorActiveColor={indicatorActiveColor}
              vertical={vertical}
              circular={circular}
              indicatorDots={indicatorDots}
              autoplay={autoplay}
              current={current}
              currentItemId={currentItemId}
              interval={interval}
              duration={duration}
              previousMargin={previousMargin}
              nextMargin={nextMargin}
              displayMultipleItems={displayMultipleItems}
              skipHiddenItemLayout={skipHiddenItemLayout}
              easingFunction={easingFunction}
              onChange={onChange && onChange}
              onTransition={onTransition && onTransition}
              onAnimationFinish={onAnimationFinish && onAnimationFinish}
            >
                {swiperItemLists.map((item: SwiperItemBaseDatum) => (
                    <SwiperItem key={item.id} itemId={item.itemId ? item.itemId : item.id}>
                        <IImage {...item} src={item.mediaUrl} style='height:100%'></IImage>
                    </SwiperItem>
                ))}
            </Swiper>
        </Block >
    )
}
export default ISwiper
