import React,{ CSSProperties, ComponentType } from "react";
import Taro from '@tarojs/taro';
import { Image } from '@tarojs/components';
import { addUrlPrefix } from "@/utils/tool";
import { EventProps, ITouchEvent } from '@tarojs/components/types/common';
import { ImageProps } from '@tarojs/components/types/Image';

import './image.scss';

/**
 * 图片组件的封装
 * @description: 图片组件的封装，组件封装的className 失效；行内样式 style 可以成功
 * @author: PresByter
 * @date   : 2020/07/01 18:08:13
 * @latest : 2020/07/07 14:19:32
 * @see https://taro-docs.jd.com/taro/docs/components/media/image
 */

export interface ImagePropsObject extends ImageProps {
    // src?: string
    /** 图片可以跳转的路由：目前仅限在小程序页面 */
    href?: string
    size?: string // 图片展示 的 大小
    style?: CSSProperties | string
    onClick?: EventProps["onClick"]
    [key: string]: any
}

const IImage: ComponentType<ImagePropsObject> = (params: ImagePropsObject) => {
    const {
        // src = "https://file.idongjia.cn/T3zQETBCDT1R4cSCrK.png",
        src = "",
        href = "",
        size = "w_750",
        style = "",
        lazyLoad = true,
        showMenuByLongpress = false,
        webp = false,
        mode = "scaleToFill",
        onClick, // 默认：是跳转方式
        onError,
        onLoad,
    } = params;
    const handleClickNavigator = (e: ITouchEvent | any) => {
        if (onClick) {
            onClick && onClick(e);
        } else {
            // TODO:记得 封装 跳转路径函数
            href !== "" && Taro.navigateTo({ url: href });
        }
    };

    const styled = typeof style === "string" ? style : { ...style };

    // console.log('IImage', styled);

    return (
        <Image
          style={styled}
          className={`dj-img `}
          src={addUrlPrefix(src, '', size) as ""}
          lazyLoad={lazyLoad}
          showMenuByLongpress={showMenuByLongpress}
          webp={webp}
          mode={mode}
          onClick={e => handleClickNavigator({ ...e, src: addUrlPrefix(src) })}
          onError={onError && onError}
          onLoad={onLoad && onLoad}
        />
    );
};
export default IImage;
