import React from 'react';
import Taro from '@tarojs/taro';
import { ComponentType } from "react";
import { Text } from '@tarojs/components';
import { EventProps } from '@tarojs/components/types/common';

import './icon.scss';

export interface IconPropsObject {
    color?: string
    type?: string
    size?: string
    onClick?: EventProps["onClick"]
    [key: string]: any
}

const IIcon: ComponentType<IconPropsObject> = (props: IconPropsObject) => {
    const { size = '40', type = "like", color = "#333333", onClick } = props;
    const sized = parseInt(size) * 2;
    return (
        <Text onClick={onClick && onClick} className={`dj-icon-base iconfont icon-${type}`} style={{ fontSize: `${sized}rpx`, color: color }}></Text>
    );
};
export default IIcon;
IIcon.defaultProps = {
    size: '40', type: "like", color: "#333333"
};