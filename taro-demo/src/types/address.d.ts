export interface RootObject {
    code: number
    msg: string
}
// 查询用户全部地址
export interface AddressListRes extends RootObject {
    res: AddressListData[];
}

export interface AddressListData {
    // code: string;
    fullRegion?: string;
    // isDefault: boolean;
    // userId: number;
    // address: string;
    // mobile: string;
    // createTime: number;
    // id: number;
    // name: string;

    id: number;
    userId: number;
    vendorId?: any;
    name: string;
    mobile: string;
    address: string;
    code: string;
    type: number;
    isDefault: boolean;
    isDeleted: boolean;
    createTime: number;
    updateTime: number;
    regionPathCodes: string[];
    regionPathNames: string[];
}
// 查询用户 默认 地址
export interface AddressDefaultRes extends RootObject {
    res: AddressListData;
    msg: string;
    code: number;
}
//修改用户默认地址
export interface AddressDefaultPayload {
    id: number;
}
//添加用户地址 && 修改用户地址
export interface AddressAddPayload {
    id?: number;
    code: string;
    address: string;
    mobile: string;
    name: string;
}
// 获取省市区信息

export interface RegionObject extends RootObject {
    res: RegionDataObject[];
}

export interface RegionDataObject {
    name: string;
    code: string;
    parent: string;
    prefix: string;
}
