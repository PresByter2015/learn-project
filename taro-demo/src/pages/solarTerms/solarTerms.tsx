import React, { useState, useCallback, } from 'react';
import Taro, { Config, useDidShow, useShareAppMessage, useTabItemTap } from '@tarojs/taro';
import { View, Text, Block, Canvas, Image, Icon } from '@tarojs/components';
import { observer } from 'mobx-react';
import { solarTermsInfo, solarTermsBanner } from '@/api/solarTerms';
// import Store from '@/store/todo'
import yuyuanTrack from '@/utils/eventTracking';
import { USER_SPECICAL_INFO } from '@/config/index';
import tip from '@/utils/tip';
import routers from '@/utils/routers';
import IImage from '@/components/IImage';
import IIcon from '@/components/IIcon';
import IPopup from '@/components/IPopup';
import { addUrlPrefix, isLogin } from "@/utils/tool";
import SolarTermsTime from '@/types/solarTerms';
import { getQrcodeMore } from '@/api/tool';
import setCCBehavior from '@/utils/behavior';

import StMultipleImages from './component/StMultipleImages';
import ShareBtn from './component/ShareBtn';
import './solarTerms.scss';

const MIN_CANVAS_WIDTH = 500;

const SolarTerms = () => {
    const [imgInfo, setImgInfo] = useState({ width: 200, height: 300, addrType: 0, addr: '', path: '', origionFile: '', preview: '' });
    const [qrcode, setQrcode] = useState({ width: 200, height: 300, path: '', origionFile: '', preview: '' });
    const [show, setShow] = useState(false);
    const [share, setShare] = useState(false);
    const [template, setTemplate] = useState([]);
    const handleRoute = (url = "", params = {}) => {
        yuyuanTrack({ type: 'home2', label: '节气_节气大图' });
        const { type } = params;
        if (type === 0) {
            return false;
        }
        routers({
            url,
            params
        });
    };
    useTabItemTap(() => {
        yuyuanTrack({ type: 'home2', label: '节气_底部tab' });
    });
    useDidShow(() => {
        // 商品详情 必须参数：{ path: 'pages/transfer/transfer', scene: 'type=5&id=86' }  不要传addr
        // 节气    必须参数：{ path: 'pages/solarTerms/solarTerms', scene: 'type=3' }
        // 好券量取 必须参数：{ path: 'pages/transfer/transfer', scene: 'type=1&addr=reccp&id=86' }
        getQrcodeMore({ path: 'pages/solarTerms/solarTerms', scene: 'type=3' }).then(res => {
            // getQrcodeMore({ path: 'pages/transfer/transfer', scene: 'type=1&addr=reccp&id=86&source=yuyuan&storecode=1011YHATC08888&param1=param1&param2=param2' }).then(res => {
            // getQrcodeMore({  path: 'pages/transfer/transfer', scene: 'addr=reccp&type=1&id=102&from=coupon&param1=0038459553342&param2=001000194223' }).then(res => {
            if (res.code === 0) {
                // console.log(addUrlPrefix(res.res[0].mediaUrl));
                // const files = 'http://lixing-develop.oss-cn-hangzhou.aliyuncs.com/large_file/1572745536930.jpg'
                const files = addUrlPrefix(res.res);
                Taro.getImageInfo({
                    src: files as '',
                    success: (fileres) => {
                        const { width, height, path } = fileres;
                        setQrcode({ ...qrcode, width, height, path, origionFile: files as '' });
                    }
                });
            }
        });
        solarTermsInfo().then((res: SolarTermsTime.SolarTermsTemplate) => {
            // console.log(res.res);
            res.code == 0 && setTemplate(res.res as []);
        });
        solarTermsBanner().then(res => {
            if (res.code === 0 && res.res.length > 0) {
                // console.log(addUrlPrefix(res.res[0].mediaUrl));
                const { addrType = 0, addr = '' } = res.res[0];
                // const files = 'http://lixing-develop.oss-cn-hangzhou.aliyuncs.com/large_file/1572745536930.jpg'
                const files = addUrlPrefix(res.res[0].mediaUrl);
                setImgInfo({ ...imgInfo, addrType, addr, origionFile: files as '' });
                Taro.getImageInfo({
                    src: files as '',
                    success: (fileres) => {
                        const { width, height, path } = fileres;
                        if (MIN_CANVAS_WIDTH > width) {
                            setImgInfo({ ...imgInfo, addrType, addr, width: MIN_CANVAS_WIDTH, height: height / width * MIN_CANVAS_WIDTH, path, origionFile: files as '' });
                            return false;
                        }
                        setImgInfo({ ...imgInfo, addrType, addr, width, height, path, origionFile: files as '' });

                    }
                });
            }
        });
    });
    const handleShare = async (type = 'show') => {
        if (type === 'show') {
            isLogin() ? Taro.hideTabBar().then(() => {
                setShare(true);
            }) : routers({
                url: '/pages/login/login',
            });
        } else if (type === 'hide') {
            setShare(false);
            await Taro.showTabBar();
        }
    };
    const handleCloseImage = () => {
        setShow(false);
        setTimeout(() => {
            Taro.showTabBar();
        }, 0);
    };
    const handleDrawImage = () => {
        // 关掉底部弹窗
        setShare(!share);

        tip.loading();
        if (imgInfo.preview !== '') {
            setShow(true);
            tip.loaded();
            return false;
        }
        const ctx = Taro.createCanvasContext('myCanvas');
        // ctx.translate(0, 200)
        ctx.arc(50, -50, 50, 0, 2 * Math.PI);
        ctx.setFillStyle('#ffffff');
        ctx.fillRect(0, 0, imgInfo.width, imgInfo.height + 120);

        ctx.drawImage(imgInfo.path, 0, 0, imgInfo.width, imgInfo.height);
        ctx.drawImage(qrcode.path, imgInfo.width - 120, imgInfo.height + 20, 80, 80);
        ctx.setFillStyle('#000000');
        ctx.setFontSize(40);
        ctx.fillText('東+ 格调生活', 40, imgInfo.height + 70);
        ctx.stroke();
        ctx.draw(true, () => {
            Taro.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: imgInfo.width,
                height: imgInfo.height + 120,
                destWidth: imgInfo.width * 4,
                destHeight: (imgInfo.height + 120) * 4,
                canvasId: 'myCanvas',
                success(res2) {
                    console.log(res2.tempFilePath);
                    setImgInfo({ ...imgInfo, preview: res2.tempFilePath });
                    setShow(true);
                    tip.loaded();
                    // Taro.previewImage({
                    //     current: res2.tempFilePath, // 当前显示图片的http链接
                    //     urls: [res2.tempFilePath], // 需要预览的图片http链接列表
                    //     success: function () {
                    //         console.log("预览成功啦");
                    //     }
                    // });

                    // Taro.saveImageToPhotosAlbum({
                    //     filePath: res2.tempFilePath,
                    //     success: (res3) => {
                    //         console.log(res3);
                    //     }
                    // })

                }
            });
        });
    };
    const handleSaveImage = useCallback(() => {
        // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        try {
            // const userInfo = Taro.getStorageSync(USER_SPECICAL_INFO);
            // setBehavior({ action: 9, phone: userInfo.mobile }).then(res => {
            //     console.log(res);
            // });
            setCCBehavior(9);
            // console.log(res.windowWidth);
            // console.log(res.windowHeight);
            // console.log(res.language);
            // console.log(res.platform);//android｜devtools
        } catch (e) {
            console.log(e);
        }
        Taro.getSetting({
            success: function (res) {
                // console.log(res.authSetting['scope.writePhotosAlbum']);
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    Taro.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: function () {
                            Taro.saveImageToPhotosAlbum({
                                filePath: imgInfo.preview,
                                success: (res3) => {
                                    console.log(res3);
                                    tip.toast('海报已保存至相册！');
                                    setShow(false);
                                    Taro.showTabBar();

                                }
                            }).catch(err => {
                                console.log(err);
                                tip.toast('取消保存图片');
                            });
                        },
                        fail: () => {
                            tip.toast('请在右上角设置中授权图片权限！');
                        }
                    });
                } else {
                    Taro.saveImageToPhotosAlbum({
                        filePath: imgInfo.preview,
                        success: (res3) => {
                            console.log(res3);
                            setShow(false);
                            tip.toast('海报已保存至相册！');
                            Taro.showTabBar();

                        }
                    }).catch(err => {
                        console.log(err);
                        tip.toast('取消保存图片');
                    });
                }
            }
        }).catch(err2 => {
            console.log(err2);
        });

    }, [imgInfo]);
    useShareAppMessage(res => {
        const { origionFile = '' } = imgInfo;
        const userinfo = Taro.getStorageSync(USER_SPECICAL_INFO);
        Taro.showShareMenu({
            withShareTicket: true,
            // menus: ['shareAppMessage', 'shareTimeline']
        });
        setCCBehavior(9);
        if (res.from === 'button') {
            // 来自页面内转发按钮
            // 关掉底部弹窗
            setShare(!share);
        }
        return {
            title: `${userinfo.name || ''}给你分享了一张节气海报`,
            path: `/pages/solarTerms/solarTerms`,
            // TODO:测试卡片跳转
            // path: `pages/transfer/transfer?addr=reccp&type=1&id=102&from=coupon`,
            imageUrl: origionFile,
            success: (res2) => {
                console.log('useShareAppMessage', res2); // data
            }
        };
    });
    return (
        <Block>
            <View className='st-banner'>
                {/* <IImage mode='widthFix' src={imgInfo.path} ></IImage> */}
                <IImage mode='widthFix' src={imgInfo.origionFile} onClick={handleRoute.bind(this, '/pages/transfer/transfer', { addr: imgInfo.addr, type: imgInfo.addrType })} ></IImage>
                <Image onClick={handleShare.bind(this, 'show')} className='st-share' mode='widthFix' src='https://file.idongjia.cn/T3eCA_BXhT1RCvBVdK.png'></Image>
            </View>
            <View className='st-popup' style={`display:${show ? 'flex' : 'none'}`}>
                <View className='st-popup-img' style='width:590rpx;'>
                    <Icon type='cancel' color='#ffffff' size='30' onClick={handleCloseImage.bind(this)} className='st-popup-cancel'></Icon>
                    <Image src={`${imgInfo.preview}`} style='width:590rpx;border-radius: 8px;' mode='widthFix'></Image>
                </View>
                <View className='st-popup-save' style='width:590rpx;' onClick={handleSaveImage.bind(this)}>
                    <IIcon type='download' color='#fff' size='20'></IIcon>
                    <Text style='font-family:sxc;margin-left:20rpx;' >保存图片到相册</Text>
                </View>
            </View>
            <Canvas className='st-canvas' style={`width: ${imgInfo.width}px; height: ${imgInfo.height + 120}px;border:1px solid #000;`} canvasId='myCanvas' />
            {/* <Canvas style={`width: 800rpx; height: 740rpx;border:1px solid #000;`} canvasId='myCanvas' /> */}
            {template.map((item: SolarTermsTime.SolarTermsTemplateItem) => (
                <Block key={JSON.stringify(item)}>
                    <View className='st-title'><IIcon type='solar' size='24'></IIcon><Text style='margin-left:6rpx;font-family:sxc'>{item.title}</Text></View>
                    <View className='st-content'>{item.content}</View>
                    <StMultipleImages
                        splits={item.type}
                        gap={14}
                        imagesLists={item.pictures.map(child => ({
                            ...child,
                            height: '328rpx',
                            src: child.mediaUrl,
                            id: child.mediaUrl,
                        })) as []}
                    ></StMultipleImages>
                    <View style='height:12rpx'></View>
                </Block >
            ))}
            <IPopup
                close={false}
                visible={share}
                onCancel={handleShare.bind(this, 'hide')}
                renderContent={
                    <ShareBtn onShare={handleDrawImage.bind(this)} onCancel={handleShare.bind(this, 'hide')}></ShareBtn>
                }
                height='326rpx'
            ></IPopup >
        </Block >
    );
};
export default observer(SolarTerms);

// SolarTerms.config = {
//     navigationBarTitleText: '東+节气'
// } as Config;
