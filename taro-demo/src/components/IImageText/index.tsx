import React,{ CSSProperties, ComponentType } from "react";
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { EventProps, ITouchEvent } from '@tarojs/components/types/common';
import IText, { TextPropsObject } from "@/components/IText";
import IImage, { ImagePropsObject } from "@/components/IImage";

import './imagetext.scss';

/**
 * @description: 图片和文本组件的封装 组件封装的className 失效；行内样式 style 可以成功
 * @author: PresByter
 * @date   : 2020/07/07 15:38:04
 * @latest : 2020/07/07 15:38:04
 * @return {ReactNode} 返回结果描述 e.g. ReactNode
 */
export type TextsNames = "top" | "bottom"

export interface ImageTextPropsObject {
    textmode?: TextsNames // 默认是 bottom;文字分别位于 图片的 上 下 左 右； 
    style?: CSSProperties | string
    /** 图片可以跳转的路由：目前仅限在小程序页面 */
    href?: string
    src?: string //图片路径
    content?: string //文本内容；当不传值的时候，默认不显示。

    textItem?: TextPropsObject // 详细设置 文本属性；参数参照：IText 的参数
    imgItem?: ImagePropsObject // 详细设置 图片属性；参数参照：IImage 的参数
    onClick?: EventProps["onClick"]
    [key: string]: any
}

const IImageText: ComponentType<ImageTextPropsObject> = (params: ImageTextPropsObject) => {
    const {
        textmode = 'bottom',
        style = "",
        href = "",
        src = "https://file.idongjia.cn/T3zQETBCDT1R4cSCrK.png",
        content = "",
        onClick,
        imgItem = {},
        textItem = {
            style: {
                color: '#333',
                fontSize: '28rpx',
                fontWeight: 400
            }
        }
    } = params;
    const handleClickNavigator = (e: ITouchEvent) => {
        if (onClick) {
            onClick && onClick(e);
        } else {
            // TODO:记得 封装 跳转路径函数
            href !== "" && Taro.navigateTo({ url: href });
        }
    };
    const styled = typeof style === "string" ? style : { ...style };

    return (
        <View className='dj-itxt' style={styled} onClick={handleClickNavigator}>
            {textmode === 'top' && content && <IText {...textItem} content={content} />}
            <IImage
              {...imgItem}
              src={src}
            />
            {textmode === 'bottom' && content && <IText {...textItem} content={content} />}
        </View>
    );
};
export default IImageText;
