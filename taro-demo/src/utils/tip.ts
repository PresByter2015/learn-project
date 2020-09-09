/**
 * @description: 提示与加载工具类 
 * @author: PresByter
 * @date  : 2020/06/28 17:12:41
 * @latest : 2020/07/10 10:22:50
 */

import Taro from '@tarojs/taro'

export type TipsIcon = "none" | "success" | "loading" | undefined
interface Ishare {
    title: string | undefined
    path: string | undefined
    desc: string | undefined
    success(): void
}
interface Toast {
    title?: string
    duration?: number
    icon?: TipsIcon
    mask?: boolean
}
interface Itips {
    isLoading?: boolean
    success(title?: string, duration?: number): void
    confirm<T>(text: string, payload?: T, title?: string): Promise<T>
    toast(params?: string | Toast): void
    alert(title?: string): void
    error(title?: string, onHide?: () => void): void
    loading(title?: string): void
    loaded(title?: string): void
    share(title: string | undefined, url: string | undefined, desc: string | undefined): Ishare
}
class Tips implements Itips {
    public isLoading = false
    public constructor() {
        this.isLoading = false
        this.toast = this.toast.bind(this);
    }
    /**
     * 弹出提示框
     */

    public success(title = '成功', duration = 500) {
        setTimeout(() => {
            Taro.showToast({
                title: title,
                icon: 'success',
                mask: true,
                duration: duration
            })
        }, 300)
        if (duration > 0) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve && resolve()
                }, duration)
            })
        }
    }

    /**
     * 弹出确认窗口
     */
    public confirm<T>(text: string, payload?: T, title = '提示'): Promise<T> {
        return new Promise((resolve, reject) => {
            Taro.showModal({
                title: title,
                content: text,
                showCancel: true,
                confirmColor: '#000000',
                success: res => {
                    if (res.confirm) {
                        resolve(payload)
                    } else if (res.cancel) {
                        reject(payload)
                    }
                },
                fail: () => {
                    reject(payload)
                }
            })
        })
    }
    /**
     * 提示框
     */
    public toast(params: string | Toast) {
        if (typeof params === 'string') {
            setTimeout(() => {
                Taro.showToast({
                    title: params,
                    icon: 'none',
                    mask: true,
                    duration: 1500
                })
            }, 300)
        } else {
            const { title = '提示', duration = 1500, icon = 'none' as TipsIcon, mask = true } = params
            setTimeout(() => {
                Taro.showToast({
                    title,
                    icon,
                    mask,
                    duration
                })
            }, 300)
        }
    }

    /**
     * 警告框
     */
    public alert(title = '警告') {
        Taro.showToast({
            title: title,
            image: '/assets/images/alert.png',
            mask: true,
            duration: 1500
        })
    }

    /**
     * 错误框
     */

    public error(title = '错误', onHide: () => void) {
        Taro.showToast({
            title: title,
            image: '/assets/images/error.png',
            mask: true,
            duration: 1000
        })
        // 隐藏结束回调
        if (onHide) {
            setTimeout(() => {
                onHide()
            }, 500)
        }
    }

    /**
     * 弹出加载提示
     */
    public loading(title = '加载中') {
        if (this.isLoading) {
            return
        }
        this.isLoading = true
        Taro.showLoading({
            title: title,
            mask: true
        })
    }

    /**
     * 加载完毕
     */
    public loaded() {
        if (this.isLoading) {
            this.isLoading = false
            Taro.hideLoading()
        }
    }

    public share(title: string | undefined, url: string | undefined, desc: string | undefined): Ishare {
        return {
            title: title,
            path: url,
            desc: desc,
            success: () => {
                this.toast('分享成功')
            }
        }
    }
}

/**
 * 静态变量，是否加载中
 */
// Tips.isLoading = false
const myTips: Itips = new Tips()
// export default new Tips()
export default myTips