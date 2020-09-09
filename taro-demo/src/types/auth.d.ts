export interface RootObject {
    code: number
    msg: string
}
// 微信小程序授权登录
export interface LoginResObject extends RootObject {
    res: LoginResData
}

export interface LoginResData {
    mobile: string
    avatar: string
    name: string
    token: string
    secret: string
    userId: number
    countryCode: string
    openId: string
}
// 微信小程序授权登录/注册并绑手机号
export interface LoginNumberPayload {
    wxPhoneNumber: WxPhoneNumber
    code: string
    wxUserInfo?: WxUserInfo
    registerSrc?: RegisterSrc
}

export interface WxUserInfo {
    iv: string
    userInfo: UserInfo
    signature: string
    rawData: string
    encryptedData: string
}
export interface RegisterSrc {
    from?: string
    source?: string
    storecode?: string
    param1?: string
    param2?: string
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

export interface WxPhoneNumber {
    iv: string
    encryptedData: string
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
// 提交用户授权的微信用户信息
export interface UserInfoPayload {
    code: string
    wxUserInfo: WxUserInfo
}