import React, { CSSProperties, ComponentType, useEffect } from "react";
// import Taro, { useEffect } from '@tarojs/taro';
import { TextProps } from '@tarojs/components/types/Text';
import { Text } from '@tarojs/components';
import "./font.scss";

/**
 * @description: 小程序 Text 封装 
 * @author: PresByter
 * @date   : 2020/07/07 11:45:44
 * @latest : 2020/07/07 11:45:44
 * @param {props} props 参数描述 e.g. 
 * @return {ReactNode} 返回结果描述 e.g. 
 * @see https://taro-docs.jd.com/taro/docs/components/base/text
 */
export type SpacesNames = "ensp" | "emsp" | "nbsp"
export type ModesNames = "htb" | "vlr" | "vrl"
export type StyleTypes = "horizontal-tb" | "vertical-lr" | "vertical-rl" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "sideways-lr" | "sideways-rl"
const modesMap: Map<string, { writingMode: StyleTypes; }> = new Map([
    ['htb', { writingMode: "horizontal-tb" }],//默认：水平方向，从上到下 
    ['vlr', { writingMode: "vertical-lr" }],//垂直方向，从左向右
    ['vrl', { writingMode: "vertical-rl" }],//垂直方向，从右向左
]);

export interface TextPropsObject extends TextProps {
    mode?: ModesNames
    content?: string
    style?: CSSProperties | string
    selectable?: boolean
    decode?: boolean
    space?: SpacesNames
    [key: string]: any
}

const IFont: ComponentType<TextPropsObject> = (props: TextPropsObject) => {
    const { content = "", mode = "htb", style = "", selectable = false, decode = false, space = "nbsp" } = props;
    const modeStyle = modesMap.get(mode) || modesMap.get('htb');
    const styled = typeof style === "string" ? `${style};font-family:'sxc';writing-mode:${modeStyle && modeStyle.writingMode};` : { ...style, ...modeStyle, fontFamily: 'sxc' };
    useEffect(() => {
        // Taro.loadFontFace({
        //     global: true,
        //     family: 'sxc',
        //     source: 'url("http://lixing-develop.oss-cn-hangzhou.aliyuncs.com/large_file/1595841698782.ttf")',
        //     // source: 'url("http://lixing-develop.oss-cn-hangzhou.aliyuncs.com/large_file/1596191639568.otf")',
        //     success(res) {
        //         console.log(res.status);
        //         // self.setData({ loaded: true })
        //     },
        //     fail: function (res) {
        //         console.log(res.status);
        //     },
        //     complete: function (res) {
        //         console.log(res.status);
        //     }
        // });
    }, []);
    return (
        <Text
            style={styled}
            selectable={selectable}
            decode={decode}
            space={space}
        >{content}</Text>
    );
};
export default IFont;
