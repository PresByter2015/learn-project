import configMethods from './configMethods'
 
export default {
    'X-Client': 'DPMP',//dong plus mini program
    // Platform: 'WEB',// @latest : 2020/07/29 09:52:33 X-Client 已经可以区分了，Platform 不用传了（ylw）
    Authorization: 'Dp ' + configMethods.getToken(),
    'X-Device-Id': configMethods.getDeviceId(),
    Sign: ''
}