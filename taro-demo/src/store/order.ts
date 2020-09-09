import { observable, computed, action } from 'mobx';
// import Taro, { createContext } from '@tarojs/taro';
import { createContext } from 'react';


export interface orderObject {
    status: number

}

class orderStore {
    @observable ordersData: orderObject = { status: 0 } as orderObject

    @computed get statusNum() {
        return this.ordersData.status;
    }


    @action.bound
    setOrderData(data) {

        console.log(data)
        this.ordersData = ({
            status: data.status,
        });
    }
}

export default createContext(new orderStore());
// export default orderStore;