export interface RootObject {
    code: number
    msg: string
}
// 首页资源查询
export interface HomeInfoObject extends RootObject {
    res: HomeRes
}

export interface HomeRes {
    banners: HomeBanner[] // 轮播图
    hotItems: HotItem[] //热卖
    // solarTermsBanner: HomeBanner
    marketBanners: HomeBanner[] // 节气精选好物
}

export interface HotItem {
    // supplyPrice: number
    // retailPrice: number
    // mediaUrl: string
    // title: string
    // addr: string
    // addrType: number

    id: number
    title: string
    cover: string
    price: number
    originPrice: number
    sellCount: number
}

export interface HomeBanner {
    id: number
    bannerId: number
    mediaUrl: string
    description: string
    addrType: number
    addr: string
    weight: number
    isDeleted: number
    createTime: number
    updateTime: number
    creatorId: number
    modifierId: number
}

// 首页市集商品列表
export interface HomeGoodsObject extends RootObject {
    res: HomeGoodsRes
}

export interface HomeGoodsRes {
    items: HomeGoodsItem[]
    count: number
}

export interface HomeGoodsItem {
    title: string
    cover: string
    price: number
    originPrice: number
    id: number
    sellCount: number
}
/**
 * banner列表
 * @description 位置。1首页，2市集腰封，3节气大图，4积分签到，5订单完成页面，6商品分享页
 */
export type BannerLoc = 1 | 2 | 3 | 4 | 5 | 6
export interface HomeBannerObject extends RootObject {
    res: BannerItem
}
export interface BannerItem {
    addr: string
    mediaUrl: string
    addrType: number
}