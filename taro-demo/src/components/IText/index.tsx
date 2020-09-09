import React,{ CSSProperties, ComponentType } from "react"
import Taro from '@tarojs/taro'
import { TextProps } from '@tarojs/components/types/Text'
import { Text } from '@tarojs/components'
import "./text.scss"

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
const modesMap: Map<string, { writingMode: StyleTypes }> = new Map([
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

const IText: ComponentType<TextPropsObject> = (props: TextPropsObject) => {
    const { content = "", mode = "htb", style = "", selectable = false, decode = false, space = "nbsp" } = props
    const modeStyle = modesMap.get(mode) || modesMap.get('htb')
    const styled = typeof style === "string" ? `${style};writing-mode:${modeStyle && modeStyle.writingMode};` : { ...style, ...modeStyle }

    return (
        <Text
          style={styled}
          selectable={selectable}
          decode={decode}
          space={space}
        >{content}</Text>
    );
}
export default IText
