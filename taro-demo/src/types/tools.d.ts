declare namespace Tools {
    export interface RootObject {
        code: number
        msg: string
    }
    // 阿里云直传 图片 返回值
    export interface ToolsTotalRes extends RootObject {
        res: ToolsBaseRes
    }

    export interface ToolsBaseRes {
        requestId: string
        expiration: string
        accessKeyId: string
        accessKeySecret: string
        securityToken: string
        bucketName: string
        endpoint: string
        keyPrefixes: string[]
    }
    // 获取小程序二维码 参数
    export interface QrcodePayload {
        scene?: string
        path: string
        width?: number | string
        autoColor?: boolean
        lineColor?: Linecolor
        isHyaline?: boolean
    }

    export interface Linecolor {
        r: number
        g: number
        b: number
    }
    // 解密 短参数
    export interface DecryptParamsRes extends RootObject {
        res: string
    }
}
export default Tools;
