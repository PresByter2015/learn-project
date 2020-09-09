declare namespace Goods {

    export interface RootObject {
        code: number
        msg: string
    }

    // 收藏 商品列表
    export interface CollectGoodsListData extends RootObject {
        res: CollectGoodsListItemData[]
    }
    export interface CollectGoodsListItemData {
        id: number
        title: string
        cover: string
        originPrice: number
        price: number
        sellCount: number
    }


    // 商品详情
    export interface GoodsDetailResData extends RootObject {
        res: GoodsDetailRes
    }
    export interface GoodsDetailRes {
        id: number
        title: string
        detail: string
        slogan: string
        status: number
        sellCount: number
        originPrice: number
        price: number
        totalStock: number
        itemCollect: boolean
        coverPictureList: CoverPictureList[]
        detailPictureList: CoverPictureList[]
        attributeList: AttributeList[]
        serviceList: ServiceList[]
        properties: Property[]
        skuList: SkuList[]
    }

    export interface SkuList {
        id: number
        propertyValues: PropertyValue[]
        price: number
        originPrice: number
        stock: number
        cover: string
    }

    export interface PropertyValue {
        name: string
        id: string
        propertyId: string
    }

    export interface Property {
        id: number
        name: string
        values: Value[]
    }

    export interface Value {
        name: string
        id: string
    }

    export interface ServiceList {
        name: string
        icon: string
        desc: string
    }

    export interface AttributeList {
        relationId: number
        attributeName: string
        values: string[]
    }

    export interface CoverPictureList {
        mediaUrl: string
        width: number
        height: number
    }
    // SKU 组件传值 的 基本属性
    export interface SkuProps {
        properties: Property[]
        skuList: SkuList[]
        skuedInit: SkuList
        tempSkued: TempSkued
        // setSkued: Function
        // setSkuedvalue: Function
        // [key: string]: any
    }
    export interface TempSkued {
        [key: number]: PropertyValue
    }
}
export default Goods;