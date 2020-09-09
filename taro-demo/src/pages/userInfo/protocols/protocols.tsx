import React, { useEffect, useState, } from 'react';
import Taro, { Config, useRouter, useDidShow, useDidHide } from '@tarojs/taro';
import { View, RichText } from '@tarojs/components';
import { observer } from 'mobx-react';
// import configMethods from '@/utils/request/configMethods'
// import Store from '../../store/todo'
import rules from './userRules';
import aboutUs from './aboutUs';
import './protocols.scss';

// const ProtocolsData = new Map([]);
const Protocols = () => {
    const params = useRouter().params;
    const type = params.type;
    const [num, setNum] = useState(1);
    const translateToken = (val: string) => {
        const tokens = new Map<string, string>([
            ['scene', 'scene'],
            ['se', 'scene'],
            ['f', 'from'],
            ['from', 'from'],
            ['id', 'id'],
            ['i', 'id'],
            ['type', 'type'],
            ['t', 'type'],
            ['addr', 'addr'],
            ['adr', 'addr'],
            ['ar', 'addr'],
            ['src', 'src'],
            ['sc', 'src'],
            ['login', 'login'],
            ['lg', 'login'],
            ['source', 'source'],
            ['sr', 'source'],
            ['storecode', 'storecode'],
            ['stc', 'storecode'],
            ['param1', 'param1'],
            ['p1', 'param1'],
            ['param2', 'param2'],
            ['p2', 'param2'],
            ['param3', 'param3'],
            ['p3', 'param3'],
            ['param4', 'param4'],
            ['p4', 'param4'],
        ]);
        return tokens.get(val) || val;
    };
    useDidHide(() => {
        console.log('useDidHide');
    });
    useDidShow(() => {
        const { ...rest } = params;
        // console.log(type2, rest);
        // 1af4e30ac4d141eebbbdc6b2f54b9038.png
        console.log(Object.keys(rest).map(item => (`${translateToken(item)}=${rest[item]}`)).join('&'));

    });
    // 1 关于东+
    // 2 東+服务协议及隐私政策
    useEffect(() => {
        // console.log(rules);
        Taro.setNavigationBarTitle({
            title: type === '1' ? '关于東+' : '東+服务协议及隐私政策'
        });
        return () => {
            // 清除订阅
            // subscription.unsubscribe();
        };
    }, [type]);

    const handleMessage = (e: any) => {
        console.log(e);
        Taro.navigateTo({
            url: '/pages/transfer/transfer?type=1&addr=goodCouponToReceive&src=&login=false&id=40'
        });
    };
    const handleNum = (val: number) => {
        console.log(val);

        setNum(val);
    };
    return (
        <View className='protocols'>
            {/* {type === '1' && <Block>
                <Text onClick={handleMessage.bind(this)}>关于东+</Text>
                <Input
                  style={{ border: "1px solid #333" }}
                  type='number'
                  value={`${num}`}
                  onKeyboardHeightChange={handleNum.bind(this, num)}
                  onBlur={e => handleNum(+e.detail.value || 1)}
                  onInput={e => handleNum(+e.detail.value || 1)}
                  onConfirm={e => handleNum(+e.detail.value || 1)}
                ></Input>
            </Block>} */}
            {type === '1' && <RichText nodes={aboutUs}></RichText>}
            {type === '2' && <RichText nodes={rules}></RichText>}
        </View >
    );
};
export default observer(Protocols);

// Protocols.config = {
//     navigationBarTitleText: '用户协议'
// } as Config;
