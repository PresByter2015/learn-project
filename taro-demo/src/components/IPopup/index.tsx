import React,{ ComponentType, ReactNode } from "react";
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import "./popup.scss";

/**
 * @description: 底部弹窗 
 * @author: PresByter
 * @date   : 2020/07/15 17:01:24
 * @latest : 2020/07/16 09:59:32
 */
export interface PopupPropsObject {
    title?: string // 标题文本，不设置或者设置为空，咋消失
    height?: string // 弹窗的高度
    renderContent?: ReactNode //自定义 填充的 内容
    visible: boolean // 是否显示
    close?: boolean // 是否显示 X 
    onCancel?: (event: any) => any // 点击close 触发的事件
    [key: string]: any
}

const IPopup: ComponentType<PopupPropsObject> = (props: PopupPropsObject) => {
    const { title = "", height = "60vh", onCancel, visible = false, close = true } = props;
    const handleCancel = (e: ITouchEvent | any) => {
        e.stopPropagation();
        if (onCancel) {
            onCancel && onCancel(e);
        }
    };
    return (
        <View className='dj-popup' style={{ display: visible ? 'block' : 'none' }} >
            <View className={`dj-popup-main ${visible ? 'dj-popup-active' : 'dj-popup-invalid'}`}>
                {close && <Text className='dj-popup-close' style={{ bottom: height }} onClick={handleCancel.bind(this)}>×</Text>}
                <View className='dj-popup-content' style={{ height: height }}>
                    {title !== '' && <View className='dj-popup-title rbb'>{title}</View >}
                    {props.renderContent}
                </View>
                <View style='height:100vh;background:rgba(0, 0, 0, 0.5)' onClick={handleCancel.bind(this)}></View>
            </View>
        </View>
    );
};
export default IPopup;
