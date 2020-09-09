/**
 * @description: 多个文件上传
 * @author: PresByter
 * @date   : 2020/08/06 15:11:16
 * @latest : 2020/08/06 15:11:16
 * @param {string[]} nums 参数描述 e.g.
 * @return {void} 返回结果描述 e.g.
 * @see
 */
import handleUpload from './index'
const multUpload = ((arr: string[] = []) => {
    console.log(arr);
    const len = arr.length
    let i = 0, temp = Array.from({ length: len }, () => ({ index: 0 }))
    while (i < len) {
        temp[i]['index'] = i
        // temp[i]['value'] = arr[i]
        // temp[i]['status'] = () => {
        //     let j = 0
        //     return () => {
        //         // let timer = 
        //         setTimeout(() => {
        //             j++
        //             console.log('j', j);
        //         }, 1000)
        //         // j > i && clearTimeout(timer)
        //     }
        //     // setTimeout(() => {
        //     //     j++
        //     //     console.log('j', j);
        //     // }, 1000)
        // }
        return handleUpload({
            file: arr[i],
            progress: res => {
                console.log('progress', i, res);
            },
            success: res => {
                i++
                console.log('success', i, res);
                temp[i]['file'] = res.file
            },
            fail: res => {
                console.log('fail', res);
            },
        })
    }
    return temp
})
export default multUpload