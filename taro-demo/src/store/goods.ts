/**
 * @description: 商品详情store 
 * @author: PresByter
 * @date   : 2020/08/04 10:26:18
 * @latest : 2020/08/04 10:26:18
 * @see 
 */
import { observable, computed, action } from 'mobx';
// import { createContext } from '@tarojs/taro';
import { createContext } from 'react';
import Goods from '@/types/goods';

export interface GoodsChecked extends Goods.SkuList {
    num: number
    mainCover: string //商品主图
}

class GoodsStore {
    @observable Goods: GoodsChecked = { num: 0, id: -99 } as GoodsChecked

    @computed get totalnum() {
        return this.Goods.num;
    }

    // @computed get completedCount() {
    //     return this.Goodss.filter(item => item.completed).length
    // }

    @action.bound
    setGoodsChecked(data: GoodsChecked) {
        this.Goods = ({
            ...this.Goods, ...data
        });
    }
}

export default createContext(new GoodsStore());