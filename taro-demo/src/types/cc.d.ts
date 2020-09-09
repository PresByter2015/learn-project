declare namespace CCApi {
    export interface RootObject {
        state: number
        errmsg?: string
        errcode?: any
        total: number
    }
    export interface MemberInfo extends RootObject {
        data: MemberInfoData
    }
    // 个人页面用户信息
    export interface MemberInfoData {
        phone: string
        accountNo: string
        openId: string
        name: string
        birthday: string
        gender: number
        email?: any
        weight?: any
        height?: any
        province: string
        city: string
        region: string
        address?: any
        nick: string
        avatar: string
        level: string
        levelName: string
        levelId: string
        discount?: any
        validMonth?: any
        levelPercent?: any
        usableCouponCount: number
        usablePoint: number
        guideId?: any
        guideStoreCode?: any
        growthValue: number
        constellation?: any
        ageRange?: any
        job?: any
        interest?: any
        uid: string
        industryMemberId: string
        freezePoint: number
    }

    export interface UserCenterResData extends MemberInfoData {
        name: string
        avatar: string
        userId?: number
        needWxUserInfo?: boolean
        mobile?: string
        countryCode?: string
        background?: string
        collectCount: number
    }
    // 个人页面 优惠券信息
    export interface CouponInfo extends RootObject {
        data: CouponInfoDatum[]
    }

    export interface CouponInfoDatum {
        id: number
        couponName: string
        couponCode: string
        couponStatus?: any
        discount: number
        desc: string
        couponType: number
        value: number
        buildChannelId: number
        buildChannelName: string
        thumb: string
        putChannelId: number
        putGroupId: number
        isHave: string
        isConsume: number
        credit: number
        isLimitLevel: number
        limitMemberLevels: string
        levelIcon?: any
        minLevelId: number
        startTimeUnx: number
        startTime?: any
        endTimeUnx: number
        endTime?: any
        total: number
    }
}
export default CCApi;
