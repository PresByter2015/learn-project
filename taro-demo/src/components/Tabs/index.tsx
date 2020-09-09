import React, { ComponentType, useState, useEffect } from "react";
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
// import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import Orders from '@/types/order';

import './index.scss';

export interface TabsPropsObject {
    tabs?: Orders.TabItem[]
    activeId?: number
    onClick?: (id) => any // 点击Tab的事件
}


const Tabs: ComponentType<TabsPropsObject> = (props: TabsPropsObject) => {
    const { tabs = [], activeId = '', onClick } = props;
    const [scrollLeft, setScrollLeft] = useState(0);
    const [id, setId] = useState(0);

    const handelTabbar = (acid: number, index: number) => {
        const unitWidth = 200;
        const deviceWidth = 375;
        setId(acid);
        // index <= 2 && setScrollLeft(unitWidth*index)
        setScrollLeft(unitWidth * index <= deviceWidth ? 0 : unitWidth * index / 2);
        if (onClick) {
            onClick && onClick(acid);
        }
        console.log(index, scrollLeft);

        console.log(props);
    };
    useEffect(() => {
        setId(activeId as 0);
    }, [activeId]);
    return (
        // <ScrollView 
        //   className='itemList'
        //   scrollX
        //   style='white-space: nowrap;'
        //         //   scrollIntoView={id}

        //   scrollLeft={scrollLeft}
        //   scrollWithAnimation
        //   onScroll={e => console.log(e.detail)}
        // >
        //        {tabs.map((item, index) => (
        //             <View onClick={() => handelTabbar(item.id, index)} className={`scroll-item ${item.id === id ? 'scroll-item-active' : ''}`} key={item.id} id={item.id}>{item.name}</View>
        //         ))}
        // </ScrollView>
        <View
            className='itemList'
            style='white-space: nowrap;'
        //   scrollIntoView={id}

        >
            {tabs.map((item, index) => (
                <View onClick={() => handelTabbar(item.id, index)} className={`scroll-item ${item.id === id ? 'scroll-item-active' : ''}`} key={item.id} id={item.id + ''}>{item.name}</View>
            ))}
        </View>
    );
};
export default Tabs;
