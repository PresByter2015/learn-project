declare namespace SolarTermsTime {
    export interface RootObject {
        code: number
        msg: string
    }
    export interface SolarTermsBanner extends RootObject {
        res: SolarTermsBannerItem[]
    }

    export interface SolarTermsBannerItem {
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

    export interface SolarTermsTemplate extends RootObject {
        res: SolarTermsTemplateItem[]
    }

    export interface SolarTermsTemplateItem {
        title: string
        content: string
        type: number
        pictures: SolarTermsTemplateItemPicture[]
    }

    export interface SolarTermsTemplateItemPicture {
        itemId: number
        addrType: number
        mediaUrl: string
        price: number
        title: string
    }
}

export default SolarTermsTime;