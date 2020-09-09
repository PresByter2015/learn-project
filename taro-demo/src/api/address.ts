import request from '@/utils/request/index'
import { AddressListRes, AddressDefaultRes, RootObject, AddressDefaultPayload, AddressAddPayload, RegionObject } from "@/types/address"
/**
 * @description: 收货地址： ylw 
 * @author: PresByter
 * @date  : 2020/07/23 11:35:44
 * @file  : address.ts
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70258701
 */
/**
 * @description: 查询用户全部地址 ylw 
 * @author: PresByter
 * @date   : 2020/07/23 11:37:25
 * @latest : 2020/07/23 11:37:25
 * @return {AddressListRes} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef712a950745d4868f3b2
 */
export const addressList = (): Promise<AddressListRes> => {
    return request.post(
        {
            url: 'user/address/list',
            data: {}
        }
    );
}
/**
 * @description: 查询用户默认地址 ylw
 * @author: PresByter
 * @date   : 2020/07/23 11:43:14
 * @latest : 2020/07/23 11:43:14
 * @return {AddressDefaultRes} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef712a950745d4868f3b3
 */
export const addressDefault = (): Promise<AddressDefaultRes> => {
    return request.post(
        {
            url: 'user/address/default',
            data: {}
        }
    );
}
/**
 * @description: 修改用户默认地址 ylw 
 * @author: PresByter
 * @date   : 2020/07/23 11:48:24
 * @latest : 2020/07/23 11:48:24
 * @param {AddressDefaultPayload} nums 参数描述 e.g. 
 * @return {RootObject} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef712a950745d4868f3b0
 */
export const addressDefaultUpdate = ({ id = -999 }: AddressDefaultPayload): Promise<RootObject> => {
    return request.post(
        {
            url: 'user/address/default/update',
            data: {
                id
            }
        }
    );
}
/**
 * @description: 添加用户地址 ylw 
 * @author: PresByter
 * @date   : 2020/07/23 13:40:55
 * @latest : 2020/07/23 13:40:55
 * @param {AddressAddPayload} nums 参数描述 e.g. 
 * @return {AddressDefaultRes} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef712a950745d4868f3b4
 */
export const addressAdd = ({
    code = '',
    address = '',
    mobile = '',
    name = '',
}: AddressAddPayload): Promise<AddressDefaultRes> => {
    return request.post(
        {
            url: 'user/address/add',
            data: {
                code,
                address,
                mobile,
                name,
            }
        }
    );
}
/**
 * @description: 修改用户地址 ylw 
 * @author: PresByter
 * @date   : 2020/07/23 13:48:40
 * @latest : 2020/07/23 13:48:40
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef711a950745d4868f3af
 */
export const addressUpdate = ({
    id = -999,
    code = '',
    address = '',
    mobile = '',
    name = '',
}: AddressAddPayload): Promise<RootObject> => {
    return request.post(
        {
            url: 'user/address/update',
            data: {
                id,
                code,
                address,
                mobile,
                name,
            }
        }
    );
}
/**
 * @description: 删除用户地址 ylw 
 * @author: PresByter
 * @date   : 2020/07/23 13:52:47
 * @latest : 2020/07/23 13:52:47
 * @param {number[]} nums 参数描述 e.g. 
 * @return {boolean} 返回结果描述 e.g. 
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef712a950745d4868f3b1
 */
export const addressDelete = ({ id = -999 }: AddressDefaultPayload = { id: -999 }): Promise<RootObject> => {
    return request.post(
        {
            url: 'user/address/delete',
            data: {
                id
            }
        }
    );
}
/**
 * @description: 获取省市区信息 ylw 
 * @author: PresByter
 * @date   : 2020/07/23 14:01:20
 * @latest : 2020/07/23 14:01:20
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f0ef41aa950745d4868f3ad
 */
export const regionList = ({ parent } = { parent: '0' }): Promise<RegionObject> => {
    return request.post(
        {
            url: 'region/list',
            data: {
                parent
            }
        }
    );
}