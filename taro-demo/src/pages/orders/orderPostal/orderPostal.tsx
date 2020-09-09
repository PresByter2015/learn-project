import React, { useState, } from 'react';
import Taro, { Config, useDidShow, useRouter } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import { observer } from 'mobx-react'
import { logisticsDetail } from '@/api/order.ts'

import './orderPostal.scss'
import Orders from '@/types/order'

const OrderPostal = () => {
    const params = useRouter()
    const [postalDetail, setPostalDetail] = useState({} as Orders.ShipCompanyRes)
    //物流详情
    const getLogisticsDetail = (id) => {

        logisticsDetail({ logisticsNo: id }).then(res => {
            console.log(res.res)
            if (res.code == 0) {
                setPostalDetail(res.res)
            }
        })
    }
    //复制
    const copyEvents = () => {
        Taro.setClipboardData({
            data: postalDetail.shipCompany.no,
            success: () => {
                Taro.getClipboardData({
                    success: (res) => {
                        console.log(res); // data
                    }
                });
            }
        });
    };
    useDidShow(() => {
        console.log(params)
        getLogisticsDetail(params.params.logisticsNo)
    })
    return (
        <Block>


            <View>
                <View className='postalStatus'>
                    {
                        postalDetail.shipCompany.name ? <View>
                            <View className='postalDetail'>
                                <View className='name'>
                                    {postalDetail.shipCompany.name}
                                </View>
                                <View className='number'>
                                    运单编号： {postalDetail.shipCompany.no}
                                    <View className='copy' onClick={copyEvents}>复制</View>
                                </View>
                                <View className='status'>
                                    物流状态： {postalDetail.status}
                                </View>
                            </View>
                        </View> : <View className='noPostal'>暂无物流信息</View>
                    }

                </View>
                {
                    postalDetail.trackList.length > 0 ? <View className='postalProcess'>
                        <View className='title'>
                            物流跟踪
                   </View>

                        <View className='process'>
                            <View className='detail'>
                                {
                                    postalDetail.trackList.map((items: Orders.TrackList) => {
                                        return (
                                            <View className='detailBox'>
                                                <View className='stringBox'>
                                                    <View className='string'>
                                                        <View className='circle'></View>
                                                        <View className='border'></View>
                                                    </View>


                                                </View>

                                                <View className='content'>
                                                    <View>{items.status}：{items.detail}</View>
                                                    <View className='time'>{items.time}</View>
                                                </View>

                                            </View>

                                        )
                                    })
                                }
                            </View>
                        </View>



                    </View> : ''
                }



            </View>
        </Block >
    )
}
export default observer(OrderPostal)

// OrderPostal.config = {
//     navigationBarTitleText: '物流详情'
// } as Config
