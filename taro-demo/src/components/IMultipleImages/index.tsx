import React,{ ComponentType, CSSProperties, ReactNode } from "react";
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import IImage, { ImagePropsObject } from "@/components/IImage";
import { addUrlPrefix } from "@/utils/tool";
import './imultipleimages.scss';

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
    [key: string]: any //防止 溢出的参数 存在
}
export interface ImagePropsListItemDatum extends ImagePropsObject {
    renderContent?: ReactNode //自定义 填充的 内容
    id: string
    title?: string
    height?: string

    // href?: string  // 需要设置跳转，请在image 上设置
}
export type TextsNames = "top" | "bottom"

const IMultipleImages: ComponentType<MultipleImagesPropsObject> = (props: MultipleImagesPropsObject) => {
    const { style = "", mode = 'bottom', gap = 10, splits = '2', imagesLists = [] } = props;
    const splitsCloumns = typeof style === "string" ? `grid-template-columns:repeat(${parseInt(splits as "")}, 1fr)` : { gridTemplateColumns: `repeat(${parseInt(splits as "")}, 1fr)` };
    const gapCloumns = typeof style === "string" ? `grid-column-gap:${parseInt(gap as "")}rpx` : { gridColumnGap: `${parseInt(gap as "")}rpx` };
    const styled = typeof style === "string" ? `${style};${splitsCloumns};${gapCloumns}` : { ...(splitsCloumns as {}), ...(gapCloumns as {}), ...style };

    return (
        <View className={`dj-imgs-box `} style={styled}>
            {imagesLists.map((item: ImagePropsListItemDatum) => (
                <View key={item.id} className='dj-imgs-item'>
                    {mode === 'top' && item.content && <Text>{item.content}</Text>}
                    {mode === 'top' && item.renderContent}
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
                    {mode === 'bottom' && item.content && <Text>{item.content}</Text>}
                    {mode === 'bottom' && item.renderContent}
                </View>
            ))}
        </View>
    );
};
export default IMultipleImages;
