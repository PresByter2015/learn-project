import React, { ComponentType, ReactNode } from "react";
import Taro from '@tarojs/taro';
import { View, CoverView } from '@tarojs/components';
import "./index.scss";

/**
 * @description: 底部弹窗 
 * @author: wanglihua
 * @date   : 2020/07/25 
 */
export interface ModalPropsObject {
    title?: string // 标题
    titleShow?: boolean
    renderContent?: ReactNode //自定义 填充的 内容
    visible: boolean // 是否显示
    cancelBtn?: string // 左边按钮
    confirmBtn?: string // 右边按钮
    onCancel?: (event: any) => any // 点击左边按钮 触发的事件
    onConfirm?: (event: any) => any // 点击右边 触发的事件
}

const IModal: ComponentType<ModalPropsObject> = (props: ModalPropsObject) => {
    const { title = "", titleShow = true, onConfirm, onCancel, cancelBtn = "取消", confirmBtn = "确定", visible = false } = props;
    return (
        <View className='dj-modal' style={{ display: visible ? 'block' : 'none' }}>
            <View className='dj-modal-content'>
                <View className='dj-modal-content-title' style={{ display: titleShow ? 'block' : 'none' }}>{title}</View>
                <View className='dj-modal-content-context'>
                    {props.renderContent}
                </View>
                <View className='dj-modal-content-btn'>
                    <View className='cancelBtn' onClick={onCancel}>
                        {cancelBtn}
                    </View>
                    <View className='confirmBtn' onClick={onConfirm}>
                        {confirmBtn}
                    </View>
                </View>
            </View>
        </View>
    );
};
export default IModal;
