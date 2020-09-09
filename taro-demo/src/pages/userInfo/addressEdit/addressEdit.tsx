import React, { useState, useContext, } from 'react';
import Taro, { Config, useDidShow, useRouter } from '@tarojs/taro';
import { View, Input, Text, Block, PickerView, PickerViewColumn, Textarea } from '@tarojs/components';
import { observer } from 'mobx-react';
import { regionList, addressAdd, addressUpdate } from '@/api/address';
import { RegionDataObject } from "@/types/address";
import Store from '@/store/address';
import { validMobile } from '@/utils/tool';
// import routers from '@/utils/routers'
import tips from '@/utils/tip';
import IPopup from '@/components/IPopup';
import IIcon from '@/components/IIcon';
import './addressEdit.scss';

export interface AddressObject {
    id?: number
    name: string
    code: string
    address: string
    mobile: string
    createTime?: number
    fullRegion?: string
    userId?: string
    isDefault?: boolean
}
const addressDefault: AddressObject = {
    id: -999,
    name: '',
    code: '',
    address: '',
    mobile: '',
    fullRegion: '点击选择',
    userId: '',
};
const Address = () => {
    const { editAddresses, setEditAddresses } = useContext(Store) as any;
    const param = useRouter();
    const [platform, setPlatform] = useState('');
    const [showpup, setShowpup] = useState(false);
    const [formData, setFormData] = useState(addressDefault);
    const [code, setCode] = useState([0, 0, 0]);
    const [provincesList, setProvincesList] = useState([] as RegionDataObject[]);
    const [citysList, setCitysList] = useState([] as RegionDataObject[]);
    const [areasList, setAreasList] = useState([] as RegionDataObject[]);


    // 编辑页面 重新渲染 函数
    const handleRender = () => {
        // console.log('show', param, editAddresses);
        const { regionPathNames = [] } = editAddresses;
        setFormData({ ...formData, ...editAddresses, fullRegion: regionPathNames ? regionPathNames.join(' ') : '' });
    };
    const handleCheckedMobile = (phone: string) => {
        if (validMobile(phone)) {
            setFormData({ ...formData, mobile: phone });
        } else {
            // tips.toast('手机号格式不正确');
            setFormData({ ...formData, mobile: phone });
        }
    };
    // Province and city area
    useDidShow(async () => {
        const { params: { type } } = param;
        const res = Taro.getSystemInfoSync();
        console.log(res);
        if (res.platform == 'ios') {
            setPlatform('ios');
        } else {
            setPlatform('android');
        }
        // 10  1001
        const provinces = await regionList({ parent: "" });
        provinces.code == 0 && setProvincesList(provinces.res);

        const citys = await regionList({ parent: "10" });
        citys.code == 0 && setCitysList(citys.res);

        if (type && type === 'edit') {
            handleRender();
        }
    });
    const onChange = async (e: any) => {
        const checked: number[] = e.detail.value;
        // console.log(checked, code);
        if (checked[0] !== code[0]) {// 省 发生 变化
            const citys = await regionList({ parent: provincesList[checked[0]].code });
            citys.code == 0 && setCitysList(citys.res);
            if (citys.res.length === 0) {
                setAreasList([]);
            } else {
                const areas = await regionList({ parent: citys.res[0].code });
                areas.code == 0 && setAreasList(areas.res);
            }
            setCode([checked[0], 0, 0]);
            return false;
        }
        if (checked[1] !== code[1]) {// 市 发生 变化
            const areas = await regionList({ parent: citysList[checked[1]].code });
            areas.code == 0 && setAreasList(areas.res);
            setCode([checked[0], checked[1], 0]);
            return false;
        }
        if (checked[2] !== code[2]) {// 区 发生 变化
            setCode([checked[0], checked[1], checked[2]]);
            return false;
        }

        // setCode(checked)
    };
    const onSubmitArea = () => {
        const provinceName = (provincesList[code[0]].name) || '';
        const citysName = (citysList[code[1]] && citysList[code[1]].name) || '';
        const areaName = (areasList[code[2]] && areasList[code[2]].name) || '';
        const fullRegion = [provinceName, citysName, areaName].filter(v => v !== '');
        setFormData({
            ...formData,
            fullRegion: fullRegion.join('-'),
            code: areasList.length > 0 ? areasList[code[2]].code : citysList.length > 0 ? citysList[code[1]].code : provincesList[code[0]].code
        });
        setShowpup(false);
    };
    const onSubmit = () => {
        const { params: { type = '' } } = param;
        const {
            id = -999,
            code = '',
            address = '',
            mobile = '',
            name = '',
        } = formData;
        if (name.trim() === '') {
            tips.toast('请填写收货人');
            return false;
        }
        if (mobile.trim() === '') {
            tips.toast('请输入手机号');
            return false;
        }
        // if (!validMobile(mobile)) {
        if (mobile.length > 11) {
            tips.toast('手机号格式不正确');
            return false;
        }
        if (code.trim() === '') {
            tips.toast('请选择所在地区');
            return false;
        }
        if (address.trim() === '') {
            tips.toast('请填写收货地址');
            return false;
        }

        type !== 'edit' ? addressAdd({ code, address, mobile, name }).then(res => {
            if (res.code === 0) {
                tips.toast('增加成功！');
                setTimeout(() => {
                    setEditAddresses({});
                    Taro.navigateBack({
                        delta: 1
                    });
                }, 1000);
            }
        }) : addressUpdate({ id, code, address, mobile, name }).then(res => {
            if (res.code === 0) {
                tips.toast('修改成功！');
                setTimeout(() => {
                    setEditAddresses({});
                    Taro.navigateBack({
                        delta: 1
                    });
                }, 1000);
            }
        });
    };


    return (
        <Block>
            <View className='addr-input rbb rbt'>
                <Text space='ensp' className='addr-input-label'>收 货 人</Text>
                <Input
                    placeholderClass='addr-input-phc'
                    className='addr-input-content'
                    type='text'
                    placeholder='请填写收货人的姓名'
                    maxlength={20}
                    value={formData.name}
                    onBlur={e => setFormData({ ...formData, name: e.detail.value })}
                    onInput={e => setFormData({ ...formData, name: e.detail.value })}
                />
            </View>
            <View className='addr-input rbb'>
                <Text className='addr-input-label'>手机号码</Text>
                <Input
                    placeholderClass='addr-input-phc'
                    className='addr-input-content'
                    type='number'
                    placeholder='请填写收货人手机号'
                    maxlength={11}
                    value={formData.mobile}
                    onBlur={e => handleCheckedMobile(e.detail.value)}
                    onInput={e => handleCheckedMobile(e.detail.value)}

                />
            </View>
            <View className='addr-input rbb'>
                <Text className='addr-input-label'>所在地区</Text>
                <View className={`${formData['fullRegion'] === '点击选择' ? 'addr-input-phc' : 'addr-input-content'}`}
                    style='margin-left: 20rpx;'
                    onClick={() => setShowpup(!showpup)}
                >
                    <Text>{formData['fullRegion']}</Text>
                    <IIcon type='right' color='#999999' size='18'></IIcon>
                </View>
            </View>
            <View className='addr-input' style={{ alignItems: 'start' }}>
                <Text className='addr-input-label'>收货地址</Text>
            </View>
            <Textarea
                style={{ alignItems: 'start', padding: '4rpx' }}
                placeholderClass='addr-input-phc'
                className='addr-input-content'
                //   type='text'
                placeholder='详细地址（如街道、小区、乡镇、村）'
                maxlength={100}
                value={formData.address}
                onBlur={e => setFormData({ ...formData, address: e.detail.value })}
                onInput={e => setFormData({ ...formData, address: e.detail.value })}
            />
            <IPopup
                visible={showpup}
                onCancel={() => setShowpup(!showpup)}
                renderContent={
                    <Block>
                        <View className='addr-picker-btn' style='padding-top: 5px;padding-bottom: 5px;'>
                            <View onClick={setShowpup.bind(this, !showpup)}>取消</View>
                            <View onClick={onSubmitArea.bind(this)} style='color:#07C160'>确定</View>
                        </View>
                        <PickerView
                            style='width: 100%; height: 200px;'
                            value={code}
                            indicatorClass='addr-picker'
                            onChange={onChange}
                        >
                            <PickerViewColumn>
                                {provincesList.map(item => {
                                    return (
                                        <View className='addr-picker' key={item.code}>{item.name}</View>
                                    );
                                })}
                            </PickerViewColumn>
                            <PickerViewColumn>
                                {citysList.map(item => {
                                    return (
                                        <View className='addr-picker' key={item.code}>{item.name}</View>
                                    );
                                })}
                            </PickerViewColumn>
                            <PickerViewColumn>
                                {areasList.map(item => {
                                    return (
                                        <View className='addr-picker' key={item.code}>{item.name}</View>
                                    );
                                })}
                            </PickerViewColumn>
                        </PickerView>

                    </Block>
                }
                title='请选择所在地区'
                height='300px'
            ></IPopup>
            <View className='addr-blank'></View>
            <View className='addr-submit mainbkColor' style="font-family:'sxc';" onClick={onSubmit.bind(this)}>保存并使用</View>
        </Block >
    );
};
export default observer(Address);

// Address.config = {
//     navigationBarTitleText: '收货地址'
// } as Config;
