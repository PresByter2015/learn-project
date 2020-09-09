import React, { useState } from 'react';
import Taro, { Config, useDidShow, useRouter } from '@tarojs/taro'
import { View, Button, Block, Input, PickerView, PickerViewColumn } from '@tarojs/components'
import { observer } from 'mobx-react'
import { getShipCompanies, logisticsReturns } from '@/api/order'
import IIcon from '@/components/IIcon'
import Orders from '@/types/order'
import routers from '@/utils/routers'
import './orderPostalEdit.scss'
import tips from '@/utils/tip';

const OrderPostalEdit = () => {

    const params = useRouter()
    const [postalList, setData] = useState([] as Orders.PostalRes[])
    const [showpup, setShowpup] = useState(false)
    const [selectPostal, setSelectPostal] = useState({} as Orders.PostalRes)
    const [postalId, setPostalId] = useState('')
    const [postalName, setPostalName] = useState('')
    //物流公司
    const shipCompanies = () => {
        getShipCompanies().then((res: Orders.PostalObject) => {
            console.log(res.res)
            if (res.code == 0) {
                setData([...res.res] as [])


            }

        })
    }
    const selectShowpup = () => {
        setShowpup(true)
        setSelectPostal(postalList[0])
        setPostalName(postalList[0].name)
    }
    const canselPup = () => {
        setShowpup(false)
    }
    const postalChange = (e) => {
        console.log(e.detail.value)
        console.log(postalList)
        setSelectPostal(postalList[e.detail.value])
        setPostalName(postalList[e.detail.value[0]].name)
    }
    //提交    
    const save = () => {
        if (postalId == '') {
            tips.toast('请填写物流单号');

            return
        }
        if (!selectPostal.id) {
            tips.toast('请选择物流公司');

            return
        }
        logisticsReturns({
            refundId: parseInt(params.params.id),
            shipmentCompanyId: selectPostal.id,
            logisticsNo: postalId
        }).then(res => {
            console.log(res.res)
            if (res.code == 0) {

                routers({
                    url: '/pages/orders/orderAfterDetail/orderAfterDetail?id=' + params.params.id,
                })
            }

        })
    }
    useDidShow(() => {

        shipCompanies()
    })
    return (
        <Block>


            <View>
                <View className='postalItem'>
                    <View className='title' style={{ marginTop: '4rpx' }}>物流单号</View>
                    <View className='content'>
                        <Input maxlength={20} onInput={(e) => setPostalId(e.detail.value)} placeholder='填写物流单号' placeholderStyle='font-size:30rpx;color:#cccccc'></Input>
                    </View>
                </View>
                <View className='postalItem' onClick={selectShowpup}>
                    <View className='title'>物流公司</View>
                    <View className='content'>

                        {postalName == '' ? <View className='default'>点击选择物流公司</View> : postalName}
                    </View>
                    <View className='icon'>
                        <IIcon type='right' size='20' color='#666666'></IIcon>
                    </View>
                </View>
                <View>
                    <Button onClick={save} className='save'>提交</Button>
                </View>
                <View className='postalSelect' style={{ display: showpup ? '' : 'none' }}>
                    <View className='selectContent'>
                        <View className='title'>
                            <View className='cancel' onClick={canselPup}>取消</View>
                            <View className='text'>
                                {selectPostal.name ? selectPostal.name : '点击选择物流公司'}

                            </View>
                            <View className='confirm' onClick={canselPup}>确定</View>
                        </View>
                        <View className='content'>
                            <PickerView indicatorStyle='height: 42px;' style='width: 100%; height: 200px;' onChange={postalChange}>
                                <PickerViewColumn>
                                    {postalList.map((item: Orders.PostalRes) => {
                                        return (
                                            <View style={{ lineHeight: '42px' }}>{item.name}</View>
                                        );
                                    })}
                                </PickerViewColumn>
                            </PickerView>
                        </View>
                    </View>
                </View>
            </View>
        </Block >
    )
}
export default observer(OrderPostalEdit)

// OrderPostalEdit.config = {
//     navigationBarTitleText: '填写物流信息'
// } as Config
