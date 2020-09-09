import React, { useState, useContext } from 'react';
import Taro, { Config, useDidShow, useRouter, } from '@tarojs/taro';
import { View, Text, Block, RichText } from '@tarojs/components';
import { observer } from 'mobx-react';
import { addressDefaultUpdate, addressList, addressDelete } from '@/api/address';
import Store from '@/store/address';
import routers from '@/utils/routers';
import IIcon from '@/components/IIcon';
import IImage from "@/components/IImage";
// import tip from '@/utils/tip'
import { AddressListRes, AddressListData } from '@/types/address';
import './address.scss';

const Address = () => {
    const [addressDatasList, setaddressDatasList] = useState([] as AddressListData[]);
    const param = useRouter();
    // const [wxUserInfo, setWxUserInfo] = useState({})
    const { setOrderAddresses, setEditAddresses } = useContext(Store) as any;

    const handleGetAddressList = () => {
        addressList().then((res: AddressListRes) => {
            res.code === 0 && setaddressDatasList(res.res);
        });
    };

    const comptuedTitle = (title: string) => {
        return `<p class="dj-gsl-item-title" style="display: -webkit-box;overflow: hidden;text-overflow: ellipsis;word-wrap: break-word;white-space: normal !important;-webkit-line-clamp: 2;-webkit-box-orient: vertical;white-space: pre-wrap;">${title}</p>`;
    };
    useDidShow(() => {
        handleGetAddressList();
    });
    // 设置 默认 收货地址 地址
    const handleAddressDefaultUpdate = (id = -99) => {
        addressDefaultUpdate({ id }).then(res => {
            res.code === 0 && handleGetAddressList();
        });
    };
    // 删除 收货地址
    const handleDelete = (id: number) => {
        Taro.showModal({
            title: '确认要删除该收货地址？',
            showCancel: true,
            confirmColor: '#E7831D',
            cancelColor: '#A9AFB8',
        }).then(res => {
            if (res.confirm) {
                addressDelete({ id }).then(res => {
                    res.code === 0 && handleGetAddressList();
                });
            } else if (res.cancel) {
                // tip.toast('取消删除！')
            }
        });

    };
    // 跳转
    const handleRoute = (url = "", params = {}) => {
        routers({
            url: url,
            params: params
        });
    };
    // 选择 收货地址
    const selectAddress = (id: number) => {
        const { params } = param;
        if (params.from !== 'home') {
            const checkedAddress = addressDatasList.filter(v => v.id === id);
            // console.log('☑️选中收货地址，返回');
            setOrderAddresses(checkedAddress[0]);
            Taro.navigateBack({
                delta: 1
            });
        }
    };
    // 编辑 收货地址
    const handleEditAddress = (id: number) => {
        const checkedAddress = addressDatasList.filter(v => v.id === id);
        // console.log(checkedAddress[0]);
        setEditAddresses(checkedAddress[0]);
        routers({
            url: '/pages/userInfo/addressEdit/addressEdit',
            params: { type: 'edit' }
        });

    };
    return (
        <Block>
            <View style='height:1px'></View>
            {
                addressDatasList.length == 0 ? <View className='no_data'>
                    <IImage src='https://file-test.idongjia.cn/T3mFhTBXWT1RCvBVdK.png'></IImage>
                    <View className='tip'>还没有添加地址哦～</View>
                </View> : ''
            }

            {addressDatasList.map((item: AddressListData) => (
                <View key={item.id} className='addr-item'>
                    <View onClick={selectAddress.bind(this, item.id)} className='addr-item-name'>
                        <Text className='l1eps'>{item.name}</Text>
                        <Text className='addr-item-tel'>{item.mobile}</Text>
                    </View>
                    {/* <View onClick={selectAddress.bind(this, item.id)} className='addr-item-detail l2eps'>{`${item.regionPathNames ? item.regionPathNames.join('') : ''}${item.address}`}</View> */}
                    <RichText onClick={selectAddress.bind(this, item.id)} className='addr-item-detail l2eps' nodes={comptuedTitle(`${item.regionPathNames ? item.regionPathNames.join('') : ''}${item.address}`)}></RichText>

                    <View className='addr-item-btn'>
                        <View className='addr-item-btnl' onClick={handleAddressDefaultUpdate.bind(this, item.id)}>
                            <IIcon size='18' type={`${item.isDefault ? 'success' : 'circle'}`} color={`${item.isDefault ? '#C63535' : '#666666'}`} />
                            <Text space='nbsp'> 默认地址</Text>
                        </View>
                        <View>
                            <Text onClick={handleEditAddress.bind(this, item.id)}>编辑</Text>
                            {!item.isDefault && <Block>
                                <Text style='color:#ccc'>｜</Text>
                                <Text onClick={handleDelete.bind(this, item.id)}>删除</Text>
                            </Block>}
                        </View>
                    </View>
                </View>
            ))}

            <View className='addr-blank'></View>
            <View onClick={handleRoute.bind(this, '/pages/userInfo/addressEdit/addressEdit')} className='addr-submit mainbkColor' style="font-family:'sxc';">添加收货地址</View>
        </Block >
    );
};
export default observer(Address);

// Address.config = {
//     navigationBarTitleText: '收货地址管理'
// } as Config;
