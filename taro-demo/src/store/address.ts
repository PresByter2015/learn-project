/**
 * @description: 收货地址 store 
 * @author: PresByter
 * @date   : 2020/08/05 14:15:35
 * @latest : 2020/08/05 14:15:35
 * @see 
 */
import { observable, computed, action } from 'mobx'
import { createContext } from 'react';
// import { createContext } from '@tarojs/taro';
import { AddressListData } from '@/types/address'

export interface AddressesChecked extends AddressListData {
    num: number
    mainCover: string //商品主图
}
// TODO: 暂未 将 省市区信息 加入缓存
class AddressesStore {
    // 用于 订单 地址使用
    @observable orderAddressesData: AddressesChecked = { num: 0, id: -99 } as AddressesChecked
    // 用于 修改 地址使用
    @observable editAddressesData: AddressesChecked = { num: 0, id: -99 } as AddressesChecked

    @computed get editAddresses() {
        return this.editAddressesData
    }
    @computed get orderAddresses() {
        return this.orderAddressesData
    }

    @action.bound
    setEditAddresses(data: AddressesChecked) {
        this.editAddressesData = ({
            ...this.editAddressesData, ...data
        })
    }

    @action.bound
    setOrderAddresses(data: AddressesChecked) {
        this.orderAddressesData = ({
            ...this.orderAddressesData, ...data
        })
    }
}

export default createContext(new AddressesStore())