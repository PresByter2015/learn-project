/**
 * @description: 上传图片封装
 * @author: PresByter
 * @date   : 2020/08/06 10:45:55
 * @latest : 2020/08/06 10:45:55
 * @param {string[]} nums 上传文件路径的 参数 e.g.
 * @return {string[]} 返回文件路径参数 e.g.
 * @see https://help.aliyun.com/document_detail/31988.html?spm=5176.10695662.1996646101.searchclickresult.332b3a7adEMOCp
 * @see https://help.aliyun.com/document_detail/92883.html?spm=5176.11065259.1996646101.searchclickresult.3b4f1d2cG5Q0M9
 * @see https://cf.idongjia.cn/pages/viewpage.action?pageId=70260643
 * @see http://172.16.254.186:11000/html/web/controller/share/share.html#5f16b8d0a950745d4868f3df
 */
import Crypto from 'crypto-js';
import { Base64 } from 'js-base64';
import Taro from '@tarojs/taro';
import { getSts } from '@/api/tool'
import { FILE_HOST } from "@/config/index"

// 计算签名。
export function computeSignature(accessKeySecret: string, canonicalString: string): string {
    return Crypto.enc.Base64.stringify(Crypto.HmacSHA1(canonicalString, accessKeySecret));
}
export interface UploadPayload {
    file: string
    maxSize?: string | number;//z最大上传 尺寸 默认是 10M
    progress?: UploadFunc;
    success?: UploadFunc;
    fail?: UploadFunc;
}
export interface UploadFunc {
    (params: any): void;
}
// 单个文件上传
const handleUpload = async ({ file = '', maxSize = 10, progress, success, fail }: UploadPayload) => {
    const res = await getSts()
    const { bucketName, keyPrefixes, endpoint, accessKeySecret, expiration, accessKeyId, securityToken: securityTokenres } = res.res
    const policyText = {
        expiration: expiration, // 设置policy过期时间。
        conditions: [
            // 限制上传大小。
            // ["content-length-range", 1, 1024 * 1024 * 1024],//现在  1024 M
            ["content-length-range", 1, Number(maxSize) * 1024 * 1024],//现在  1024 M
        ],
    };
    const hosts = `https://${bucketName}.${endpoint}`
    const policy = Base64.encode(JSON.stringify(policyText));
    const signature = computeSignature(accessKeySecret, policy);
    const ossAccessKeyId = accessKeyId;
    const fileType = file.replace(/.+\./, "")
    const key = `${keyPrefixes[0]}.${fileType}`;
    const securityToken = securityTokenres;
    const filePath = file; // 待上传文件的文件路径。

    const uploadTask = Taro.uploadFile({
        url: hosts, // 开发者服务器的URL。
        filePath: filePath,
        name: 'file', // 必须填file。
        formData: {
            key,
            policy,
            OSSAccessKeyId: ossAccessKeyId,
            signature,
            'x-oss-security-token': securityToken, // 使用STS签名时必传。
            'success_action_status': '200',
        },
        success: (res) => {
            
            if (res.statusCode === 200) {
                
                console.log('上传成功');
            }
            console.log(`${FILE_HOST}${key}`)
            success && success({ ...res, file: `${FILE_HOST}${key}` })
        },
        fail: err => {
            // console.log(err);
            fail && fail(err)
        }
    });
    uploadTask.progress((res) => {
        progress && progress({ ...res, file: `${FILE_HOST}${key}` })
        // console.log('上传进度', res.progress)
        // console.log('已经上传的数据长度', res.totalBytesSent)
        // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    });
}
export default handleUpload