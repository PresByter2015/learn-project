declare namespace Mine {
    export interface RootObject {
        code: number
        msg: string
    }
    // 用户个人中心，我的页面
    export interface UserCenterResObject extends RootObject {
        res: UserCenterResData
    }

    export interface UserCenterResData {
        name: string
        avatar: string
        userId?: number
        needWxUserInfo?: boolean
        mobile?: string
        countryCode?: string
        background?: string
        collectCount: number
    }
    //  请求用户信息
    export interface UserInfoPayload {
        iv: string
        userInfo: UserInfo
        signature: string
        rawData: string
        encryptedData: string
    }
    export interface UserInfo {
        avatarUrl: string
        city: string
        country: string
        gender: number
        language: string
        nickName: string
        province: string
    }
    // 用户 单数 显示
    interface UserOrdeNumsResObject extends RootObject {
        res: UserOrdeNums
    }

    interface UserOrdeNums {
        waitPayedCount: number
        waitDeliveryCount: number
        waitReceiveCount: number
    }
}
export default Mine;
