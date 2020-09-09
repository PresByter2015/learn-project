import React, { ComponentType } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Button, Block } from '@tarojs/components';
// import { ImagePropsObject } from "@/components/IImage";
// import { addUrlPrefix } from "@/utils/tool";
// import routers from '@/utils/routers';
import IIcon from '@/components/IIcon';
import './shareBtn.scss';

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

const ShareBtn: ComponentType<any> = (props: any) => {
    // const splitsCloumns = typeof style === "string" ? `grid-template-columns:repeat(${parseInt(splits as "")}, 1fr)` : { gridTemplateColumns: `repeat(${parseInt(splits as "")}, 1fr)` };
    // const gapCloumns = typeof style === "string" ? `grid-column-gap:${parseInt(gap as "")}rpx` : { gridColumnGap: `${parseInt(gap as "")}rpx` };
    // const styled = typeof style === "string" ? `${style};${splitsCloumns};${gapCloumns}` : { ...(splitsCloumns as {}), ...(gapCloumns as {}), ...style };
    // handleRoute.bind(this, '/pages/transfer/transfer', { addr: item.addr, type: item.addrType })
    const handleCancel = () => {
        Taro.showTabBar();
        props.onCancel && props.onCancel();
    };
    const handleShare = () => {
        props.onShare && props.onShare();
    };
    return (
        <Block>
            <View className='st-icons'>
                <Button className='nobtn st-icon' openType='share' onClick={() => Taro.showTabBar()} style='margin-right: 80rpx;'>
                    <View className='st-icon-item' style='background:#3CB034' >
                        <IIcon type='wexin2' color='#fff' size='30'></IIcon>
                    </View>
                    <Text style='color:#999'>分享给好友</Text>
                </Button>
                <Button className='nobtn st-icon' style='margin-left: 80rpx;' onClick={handleShare.bind(this)}>
                    <View className='st-icon-item' style='background:#E7831D' >
                        <IIcon type='img' color='#fff' size='28'></IIcon>
                    </View>
                    <Text style='color:#999'>生成海报</Text>
                </Button>
            </View>
            <View className='st-cancel rbt' onClick={handleCancel.bind(this)}>
                取消
            </View>
        </Block>
    );
};
export default ShareBtn;
