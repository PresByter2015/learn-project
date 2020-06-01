SyApp.util = {
  /**
     * @method uuid 去除URL中share=0活着shared=0的参数
     * @member SyApp.util
     * @return {String} [_url=location.href] URL
     * 
     *		@example
     *		SyApp.util.uuid() // d6bb21aa-a2ab-28ac-d4c5-9eb89cb87776
     *		SyApp.util.uuid() // a5d083cc-d288-dc93-f792-c3e369f3a4d4
     *		SyApp.util.uuid() // 5a807d53-8db6-9929-7864-e3503deb8ada
     * 
     */
  getNoShareParamUrl: function (_url) {
    var url = _url || location.href;
    return url
      .replace (/share(d)?=0/, '')
      .replace ('?&', '?')
      .replace ('&&', '&');
  },
  /**
     * @method uuid 生成uuid
     * @member SyApp.util
     * @return {String} uuid (一个随机的字符串)
     * 
     *		@example
     *		SyApp.util.uuid() // d6bb21aa-a2ab-28ac-d4c5-9eb89cb87776
     *		SyApp.util.uuid() // a5d083cc-d288-dc93-f792-c3e369f3a4d4
     *		SyApp.util.uuid() // 5a807d53-8db6-9929-7864-e3503deb8ada
     * 
     */
  uuid: function () {
    function S4 () {
      return (((1 + Math.random ()) * 0x10000) | 0).toString (16).substring (1);
    }
    return (
      S4 () +
      S4 () +
      '-' +
      S4 () +
      '-' +
      S4 () +
      '-' +
      S4 () +
      '-' +
      S4 () +
      S4 () +
      S4 ()
    );
  },
  /**
     * @method isOldVerApp 比较版本是否更低
     * @member SyApp.util
     * @param {String} version 目标比较版本
     * @param {String} checkVer 被比较版本
     * @return {Boolean} 判断version版本号是否比checkVer版本号小
     * 
     *		@example
     *		SyApp.util.isOldVerApp('4.7.1','4.7.4') //true
     *		SyApp.util.isOldVerApp(SyApp.appVer,'4.7.4') //app内判断当前版本号与固定版号的大小
     *
     */
  isOldVerApp: function (version, checkVer) {
    if (!version || !checkVer) {
      return null;
    }

    if (version === checkVer) {
      return false;
    }

    var versionArr = version.split ('.');
    var checkVerArr = checkVer.split ('.');

    var len = Math.min (versionArr.length, checkVerArr.length);

    for (var i = 0; i < len; i++) {
      if (parseInt (versionArr[i]) > parseInt (checkVerArr[i])) {
        return false;
      }
      if (parseInt (versionArr[i]) < parseInt (checkVerArr[i])) {
        return true;
      }
    }
    if (versionArr.length > checkVerArr.length) {
      return false;
    }
    if (versionArr.length < checkVerArr.length) {
      return true;
    }

    return false;
  },
  /**
     * @method api 标准化输出api的url
     * @member SyApp.util
     * @param {String} url 接口url
     * @return {String} 标出处理，输出正确url
     * 
     *		@example
     *		SyApp.util.api('v3/add') // https://m.idongjia.cn/v3/add
     *		SyApp.util.api('/v3/add') // https://m.idongjia.cn/v3/add
     * 
     */
  api: function (url) {
    if (url.indexOf ('http') === 0) return url;
    var hasSlish = url.indexOf ('/') === 0;

    return SyApp.H5_HOST + (hasSlish ? url.substring (1) : url);
  },
  /**
     * @method eventHijack H5页面中仅判断是否阻止冒泡。云梯后台重载了该方法（在sy4Builder.js中），全部不阻止冒泡以便最顶层捕获事件（需要传递事件来判断点击事件），并添加对应模块的选中样式。
     * @member SyApp.util
     * @param {Object} event 时间对象
     * @param {Boolean} hasPrevent 是否阻止冒泡
     * 
     */
  eventHijack: function (event, hasPrevent) {
    event.stopPropagation ();
    if (hasPrevent) event.preventDefault ();
  },
  /**
     *     
     * @method weichatSdkInit 微信sdk 整合初始化方法;
     * @member SyApp.util
     * @param base
     * 	SyApp.base.title 选填，没有使用页面的title<br/>
     *  SyApp.base.pic 分享的图片，如果里面有http 直接使用，否则会去调用图片服务器+300*300<br/>
     *  SyApp.base.shareDesc 分享出去的内容<br/>
     *  SyApp.base.shareLink 自定义分享出去的链接<br/>
     *  SyApp.base.jsApiList 需要使用到的api，见微信sdk<br/>
     *  SyApp.base.weixinEvents 需要监听的事件<br/>
     *  SyApp.base.noWxShare 隐藏右上角菜单（true或者不传）
     */
  weichatSdkInit: function () {
    //如果是微信内打开，并且有必要参数，整合微信sdk
    if (
      (!SyApp.isWeixin && !SyApp.isXcx) || //既不是微信也不是小程序
      (SyApp.isWeixin && !SyApp.isXcx && !SyApp.sys.appId) //是微信但是没有appId
    ) {
      return;
    }

    SyApp.util.load ('//res.wx.qq.com/open/js/jweixin-1.3.2.js', function () {
      //小程序不需要config
      if (SyApp.isXcx) {
        wx.miniProgram.getEnv (function (res) {
          wx.loaded = true;
        });
        return;
      }

      var jsApiList = SyApp.base.jsApiList || [];

      //图片预览
      jsApiList.push ('previewImage');

      //shareFun顺序  1 微信，2 微信朋友圈，3 qq，5 qq空间, 6 腾讯微博
      //http://cf.idongjia.cn/pages/viewpage.action?pageId=7865644
      var sharePrefix = 'onMenuShare';
      var shareFuns = {
        AppMessage: 1,
        Timeline: 2,
        QQ: 3,
        QZone: 5,
        Weibo: 6,
      };

      for (var key in shareFuns) {
        jsApiList.push (sharePrefix + key);
      }
      wx.config ({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: SyApp.sys.appId, // 必填，公众号的唯一标识
        timestamp: SyApp.sys.timestamp, // 必填，生成签名的时间戳
        nonceStr: SyApp.sys.nonceStr, // 必填，生成签名的随机串
        signature: SyApp.sys.signature, // 必填，签名，见附录1
        jsApiList: jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready (function () {
        if (SyApp.base.noWxShare) {
          wx.hideOptionMenu ();
        } else {
          var _rsc = new Date ().getTime ();
          SyApp.base.pic = SyApp.base.pic || SyApp.LOGO;

          var shareLink;
          // 在分享链接中加rsc和u参数，部分需要支付的页面会导致链接未注册bug
          if (SyApp.base.noParam) {
            shareLink = SyApp.base.shareLink;
          } else {
            shareLink = SyApp.util.setURLParam (
              'rsc',
              _rsc,
              SyApp.base.shareLink
            );
            shareLink = SyApp.util.setPathParam (
              'u',
              SyApp.syAuth && SyApp.syAuth.UID ? SyApp.syAuth.UID : null,
              shareLink
            );
          }

          var share = {
            imgUrl: SyApp.base.pic.indexOf ('http') != -1
              ? SyApp.base.pic
              : SyApp.FILE_SERVER + SyApp.base.pic + '_300x300',
            desc: $ (
              '<i>' + (SyApp.base.shareDesc || '东家APP') + '</i>'
            ).text (),
            // link: SyApp.util.setURLParam('rsc', _rsc, SyApp.base.shareLink)
            link: shareLink,
          };

          if (SyApp.base.title) share.title = SyApp.base.title;

          //分享成功打点
          share.success = function (e) {
            var tag = e.errMsg || false;

            if (tag) tag = tag.replace (':ok', '').replace (sharePrefix, '');

            SyApp.util.hitPoint (null, 'share', {
              rsc: _rsc,
              shareId: location.href,
              shareType: shareFuns[tag] || 1, //如果没有匹配，默认为微信
            });
          };

          //监听， 如：wx.onMenuShareAppMessage(share);
          for (var key in shareFuns) {
            wx[sharePrefix + key] (share);
          }
          wx.loaded = true;

          SyApp.base.weixinEvents && SyApp.base.weixinEvents ();
        } //end if(SyApp.base.noWxShare)
      });
    });
  },
  // 设置时间控制
  setAtTimeCtrl: function () {
    if (
      SyApp.getSysTime () &&
      SyApp.base.starttm &&
      SyApp.getSysTime () < SyApp.base.starttm
    ) {
      SyApp.sys.isStart = false;
    }
  },
  //分享用url 格式化
  getFormatUrl: function (url, _title, _desc, _pic) {
    if (!SyApp.isInDjApp) return url;

    _title = _title || '东家';
    _desc = _desc || '';
    var v = SyApp.util.getURLParam ('v') || new Date ().getTime ();

    url += url.indexOf ('?') != -1 ? '&' : '?';
    url +=
      'share=0&djtitle=' +
      encodeURIComponent (_title) +
      '&djdesc=' +
      encodeURIComponent (_desc) +
      '&v=' +
      v;
    if (_pic) url += '&djpic=' + _pic;

    url = this.navUrl (url);

    return encodeURIComponent (url);
  },
  /**
     * @method getURLParam 获取当前URL的某个search参数
     * @member SyApp.util
     * @param {String} name 要查询的字段名
     * @return {String} 对应name的值
     * 
     *		@example
     *		//若当前URL为  https://m.idongjia.cn//h5/page?id=123&uid=222
     *		
     *		SyApp.util.getURLParam('id') //123
     *		SyApp.util.getURLParam('uid') //222
     *
     */
  getURLParam: function (name) {
    var locString = String (location.href.replace (location.hash, ''));
    var rs = new RegExp ('(^|)' + name + '=([^\&]*)(\&|$)', 'gi').exec (
      locString
    ),
      tmp;
    return (tmp = rs) ? tmp[2].replace ('#', '') : '';
  },

  /**
     * @method setURLParam 为URL的search参数添加字段
     * @member SyApp.util
     * @param {String} key 新增的字段名
     * @param {String} value  对应的值
     * @param {String} [_url=location.href] 要修改的URL
     * @return {String} 修改后的URL
     * 
     *		@example
     *		//若当前URL为  https://m.idongjia.cn//h5/page?id=123&uid=222
     *		
     *		SyApp.util.setURLParam('iid','333') //https://m.idongjia.cn/test/h5/newcomerActivity?id=123&uid=222&iid=333
     *
     */
  setURLParam: function (key, value, _url) {
    _url = _url || location.href;

    var k = key + '=';
    var reg = new RegExp ('([\?&])' + k + '[\\d\\w]*');
    var kv = k + value;

    //如果已经存在则只是修改
    if (_url.indexOf (k) !== -1) {
      return _url.replace (reg, '$1' + kv);
    }
    //url 里面不存在则追加
    return _url + (_url.indexOf ('?') === -1 ? '?' : '&') + kv;
  },

  /**
     * @method getPathParam 返回URL path中的参数（以 - 符号分隔）
     * @member SyApp.util
     * @param {String} [_name] 要查询的字段名
     * @return {String} 对应name的值
     * 
     *		@example
     *		//若当前URL为  https://m.idongjia.cn//h5/page/a-111/b-222?c=333
     *		
     *		SyApp.util.getPathParam() //b-222     不填默认返回path中的最后一段
     *		SyApp.util.getPathParam('a') //111
     *		SyApp.util.getPathParam('b') //222
     *
     */
  getPathParam: function (_name) {
    if (_name) {
      var res = location.pathname.match (new RegExp (_name + '-\\w+'));
      res = res && res.length > 0 ? res[0] : '';
      res = res.split ('-');

      return res.length > 0 ? res[1] : '';
    } else if (location.pathname.length > 1) {
      var paths = location.pathname.split ('/');
      var len = paths.length;

      for (var i = len - 1; i > 0; i--) {
        if (paths[i]) return paths[i];
      }

      return '';
    }
  },

  /**
     * @method setPathParam 为URL的search参数添加字段
     * @member SyApp.util
     * @param {String} key 新增的字段名
     * @param {String} value  对应的值
     * @param {String} [_url=location.href] 要修改的URL
     * @return {String} 修改后的URL
     * 
     *		@example
     *		//若当前URL为  https://m.idongjia.cn//h5/page/a-111/b-222?c=333
     *		
     *		SyApp.util.setPathParam('d','444') //https://m.idongjia.cn//h5/page/d-444/a-111/b-222?c=333
     *
     */
  setPathParam: function (key, value, _url) {
    _url = _url || location.href;
    var splitStr = false, host, hostMatch, kv = key + '-' + value;

    _url = _url.replace (/(\?|#)/, function (s) {
      splitStr = s + s + s;
      return splitStr;
    });

    host = splitStr ? _url.split (splitStr)[0] : _url;

    if (!value) {
      //删除path中的参数
      if ((hostMatch = host.match (new RegExp ('/' + key + '-[^\/]*')))) {
        host = host.replace (hostMatch[0], '');
      }
      return host + (splitStr ? splitStr[0] + _url.split (splitStr)[1] : '');
    }
    if ((hostMatch = host.match (new RegExp (key + '-[^\/]*')))) {
      host = host.replace (hostMatch[0], kv);
    } else if ((hostMatch = host.match (/h5[-\/][^\/]*/))) {
      host = host.replace (hostMatch[0], hostMatch[0] + '/' + kv);
    } else {
      host = host + (host[host.length] === '/' ? '' : '/') + kv;
    }

    return host + (splitStr ? splitStr[0] + _url.split (splitStr)[1] : '');
  },
  //如果是绑定click 事件触发，isEventFire 为true 会去check 时候开始
  openH5Url: function (djtype, djaddr, _isEventFire) {
    djtype = !djtype ? false : String (djtype);

    //时间控制的type，再没有开始活动前提示，  timeCtrlLink popup禁止跳转 [12 结算页]
    if (!SyApp.sys.isStart && SyApp.sys.timeCtrlLink.indexOf (djtype) != -1) {
      if (_isEventFire) {
        SyApp.onNoStart ();
        return false;
      }
      return 'javascript:SyApp.onNoStart()';
    }

    var noHandle = 'javascript:;';

    if (!djtype) return noHandle;

    //app内
    if (SyApp.isInDjApp) {
      //没有addr的type
      if (SyApp.sys.noAddrType.indexOf (djtype) !== -1) {
        return '/?djtype=' + djtype + '&djaddr=0';
        //直接走配置URL
      } else if (djaddr) {
        //app内嵌使用
        if (String (djaddr).indexOf ('?') != -1) {
          //解决%%不能被decode的bug
          djaddr = djaddr.replace (/%%/g, '%25%');

          //避免2次encodeURIComponent，先解放可能存在的encode
          try {
            djaddr = decodeURIComponent (djaddr);
          } catch (e) {}

          djaddr = encodeURIComponent (djaddr);
        }
        return '/?djtype=' + djtype + '&djaddr=' + djaddr;
      }
      //小程序内
    } else if (SyApp.isXcx) {
      var data = {djtype: djtype, djaddr: djaddr};
      data = JSON.stringify (data);
      data = {
        url: '/pages/web/activity-transfer?data=' + encodeURIComponent (data),
      };
      if (_isEventFire) {
        wx.miniProgram.navigateTo (data);
      } else {
        data = JSON.stringify (data);
        return (
          "javascript:SyApp.navigateToXcx('" + encodeURIComponent (data) + "')"
        );
      }
      //H5浏览器内
    } else {
      //内部URL
      if (SyApp.sys.outLink[djtype]) {
        var url = SyApp.sys.outLink[djtype].replace ('#addr#', djaddr);
        return this.navUrl (url);
        //直接走配置URL
      } else if (SyApp.sys.innerLink.indexOf (djtype) != -1) {
        return this.navUrl (
          djaddr ? djaddr.replace ('share=', 'out=') : djaddr
        );
        //下载URL
      } else {
        return SyApp.APP_DOWNLOAD_URL;
      }
    }

    return noHandle;
  },
  openGroupAddrH5Url: function (djtype, appAddr, h5Addr, _isEventFire) {
    var djaddr = SyApp.isInDjApp ? appAddr : h5Addr;
    return this.openH5Url (djtype, djaddr, _isEventFire);
  },
  gotoPageOldHandler: function (djtype, djaddr, _h5addr) {
    //4.7.3版本以前的通讯协议
    var url = _h5addr
      ? SyApp.util.openGroupAddrH5Url (djtype, djaddr, _h5addr, true)
      : SyApp.util.openH5Url (djtype, djaddr, true);
    if (url) location.href = url;
  },
  /*
    _h5addr: 如果h5 跳转的url app中 addr不一致的情况可以使用。 app 走addr  h5 走 _h5addr
    */

  /**
     * @method gotoPageBind 
     * H5与APP交互的方法入口<br>
     * 具体行为参见：[H5与APP通讯协议](http://cf.idongjia.cn/pages/viewpage.action?pageId=12289457)
     * @member SyApp.util
     * @param {String} djtype 行为类型
     * @param {String | Object} djaddr  对应的参数
     * @param {String | Object} [_h5addr]  若App内参数与APP外不同，对应APP内的传参
     * @param {Function} [_callback]  APP执行完对应的行为之后执行的callback
     *
     */
  gotoPageBind: function (djtype, djaddr, _h5addr, _callback) {
    if (SyApp.isInDjApp) {
      //h5与高版本app通讯协议
      var addr = SyApp.isInDjApp && djaddr ? djaddr : _h5addr;
      var result = SyApp.util.gotoPageBindCheckParam (djtype, addr);
      SyApp.msg.sentAction2App (result.action, result.data, _callback);
    } else {
      this.gotoPageOldHandler (djtype, djaddr, _h5addr);
    }
  },
  gotoPageBindCheckParam: function (action, data) {
    //高版本app校验传参
    switch (String (action)) {
      case '1005':
        try {
          if (typeof data == 'string') {
            data = JSON.parse (data);
          }
          if (SyApp.isAndroid) {
            //安卓兼容方案
            data.shareLink = data.url;
          }
          if (!(data.title && data.content && data.image && data.url)) {
            console.warn ('H5分享必填字段：title、content、image、url');
          }
        } catch (e) {}
        return {action: action, data: data};
        break;
      default:
        return {action: action, data: data};
    }
  },

  /**
     * @method navUrl 
     * URL 中有部分传参数需要传递的，使用 navUrl 实现<br>
     * 站外访问时，当URL search参数中有v、odid、rsc的时候会传递参数（或者直接跳转对应的URL）<br>
     * 站内访问时，直接返回对应的URL（或者直接跳转）
     * @member SyApp.util
     * @param {String} url 待包装的URL
     * @param {Boolean} [_justGo]  是否立即跳转
     * @return {String} 修改后的URL
     * 
     *		@example
     *		//若当前URL为  https://m.idongjia.cn//h5/page/a-111/b-222?odid=333&rsc=4444&d=555
     *		
     *		//站内
     *		SyApp.util.navUrl('https://m.idongjia.cn//h5/nextPage') //https://m.idongjia.cn//h5/nextPage
     *		SyApp.util.navUrl('https://m.idongjia.cn//h5/nextPage',true) //在当前webview中跳转https://m.idongjia.cn//h5/nextPage  （注意：这里不是新打开webview的跳转）
     *
     *		//站外
     *		SyApp.util.navUrl('https://m.idongjia.cn//h5/nextPage') //https://m.idongjia.cn//h5/nextPage?odid=333&rsc=4444
     *		SyApp.util.navUrl('https://m.idongjia.cn//h5/nextPage',true) //直接跳转https://m.idongjia.cn//h5/nextPage?odid=333&rsc=4444
     *		
     */
  navUrl: function (url, _justGo) {
    //验证时去掉url参数
    var urlCk = url.split ('#');
    urlCk = urlCk[0].split ('?');

    //判断是否需要加SyApp.H5_HOST做前缀
    var reg = new RegExp ('^http|^\/\/|^javascript|^dongjia:|' + location.host);
    url = urlCk[0] && !urlCk[0].match (reg) ? SyApp.H5_HOST + url : url;

    if (SyApp.isInDjApp || !url) {
      if (_justGo) location.href = url;
      else return url;
    }

    var param = {}, str = [];
    if (url.indexOf ('v=') === -1) param.t = this.getURLParam ('v');

    //渠道订单来源细分项Id
    if (url.indexOf ('odid=') === -1) param.odid = this.getURLParam ('odid');

    if (url.indexOf ('rsc=') === -1) param.rsc = this.getURLParam ('rsc');

    for (var k in param) {
      if (param[k]) str.push (k + '=' + param[k]);
    }

    if (str.length > 0) {
      url += (url.indexOf ('?') === -1 ? '?' : '&') + str.join ('&');
    }

    if (_justGo) location.href = url;
    else return url;
  },

  /**
     * @method getYMD 时间格式输出
     * @member SyApp.util
     * @param {String} dateTimeStamp 待转换的13位时间戳
     * @param {String} [_type] 
     * 转换类型: <br>
     * false|空  --> 默认  12-21 21:12 <br>
     * 'ymdhm'   -->  2017-12-12 12:12 <br>
     * 'm.dh:m'  -->  3.12号 21:12 <br>
     * 'ymd'    -->  2017年12月21日 <br>
     * 'm-d'    -->  12-21 <br>
     * 'm.d-h:m' <br>
     * 'y.m.d' <br>
     * 'ymdhmToday' <br>
     * 'mdhmChiness' <br>
     * 'dhmChiness' <br>
     * @return {String} 转换后的时间
     * 
     *		@example
     *		SyApp.util.getYMD(1541482751608);          //	"11-06 13:39"
     *		SyApp.util.getYMD(1541482751608,'ymdhm');  //	"2018-11-06 13:39"
     *		SyApp.util.getYMD(1541482751608,'m.dh:m');  //	"11.06号 13:39"	
     *
     */
  getYMD: function (dateTimeStamp, _type) {
    var _now = new Date (dateTimeStamp);
    var year = _now.getFullYear ();
    var month = _now.getMonth () + 1;
    month = month < 10 ? '0' + month : month;
    var date = _now.getDate ();
    date = date < 10 ? '0' + date : date;
    var hour = _now.getHours ();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = _now.getMinutes ();
    minute = minute < 10 ? '0' + minute : minute;
    var seconds = _now.getSeconds ();
    seconds = seconds < 10 ? '0' + seconds : seconds;

    switch (_type) {
      case 'ymdhm':
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
        break;
      case 'ymdhmToday':
        var today = new Date ();
        var yeargap = _now.getFullYear () - today.getFullYear ();
        var monthgap = _now.getMonth () - today.getMonth ();
        var dategap = _now.getDate () - today.getDate ();
        if (yeargap === 0 && monthgap === 0 && dategap === 0) {
          return '今日 ' + hour + ':' + minute;
        } else if (yeargap === 0 && monthgap === 0 && dategap === 1) {
          return '明日 ' + hour + ':' + minute;
        } else {
          var datetimeStr = month + '-' + date + ' ' + hour + ':' + minute;
          if (yeargap === 0) {
            return datetimeStr;
          } else {
            return year + '-' + datetimeStr;
          }
        }
        break;
      case 'mdhmChiness':
        var today = new Date ();
        var yeargap = _now.getFullYear () - today.getFullYear ();
        var monthgap = _now.getMonth () - today.getMonth ();
        var dategap = _now.getDate () - today.getDate ();
        if (yeargap === 0 && monthgap === 0 && dategap === 0) {
          return '今日 ' + hour + ':' + minute;
        } else if (
          yeargap === 0 &&
          ((monthgap === 0 && dategap === 1) ||
            (monthgap === 1 && dategap < 0 && _now.getDate () === 1))
        ) {
          return '明日 ' + hour + ':' + minute;
        } else {
          return month + '月' + date + '日 ' + hour + ':' + minute;
        }
        break;
      case 'dhmChiness':
        var today = new Date ();
        var yeargap = _now.getFullYear () - today.getFullYear ();
        var monthgap = _now.getMonth () - today.getMonth ();
        var dategap = _now.getDate () - today.getDate ();
        if (yeargap === 0 && monthgap === 0 && dategap === 0) {
          return '今日' + hour + ':' + minute;
        } else if (
          (_now.getTime () - today.getTime () < 86400000 &&
            _now.getTime () - today.getTime () > 0) ||
          (yeargap === 0 && monthgap === 0 && dategap === 1)
        ) {
          return '明日' + hour + ':' + minute;
        } else {
          return date + '号' + hour + ':' + minute;
        }
        break;
      case 'm.dh:m':
        return month + '.' + date + '号' + ' ' + hour + ':' + minute;
      case 'm.d-h:m':
        return month + '月' + date + '号' + ' ' + hour + ':' + minute;
      case 'ymd':
        return year + '年' + month + '月' + date + '日';
      case 'y.m.d':
        return year + '.' + month + '.' + date;
      case 'y/m/d':
        return year + '/' + month + '/' + date;
      case 'm-d':
        return month + '-' + date;
      case 'HH:mm:ss':
        return hour + ':' + minute + ':' + seconds;
      default:
        return month + '-' + date + ' ' + hour + ':' + minute;
    }
  },

  /**
     * @method getDHM 时间差值计算
     * @member SyApp.util
     * @param {String} diffValue 大于0的时间差值(单位：毫秒)
     * @param {String} [_type] 
     * 转换类型: <br>
     * 
     * 1.'maxdays' <br>
     *	(_ts不传)<br>
     *	用于未来距现在的时间差<br>
     *	最多显示两个单位<br>
     *	大于一天显示：XX天XX小时<br>
     *	小于一天显示：XX小时XX分<br>
     *	小于一小显示：XX分<br>
     * 	小于一分钟显示：1分<br>
     * 
     *	2.'1day'、'overyear' <br>
     *	（_ts传过去某个时间点的时间戳）<br>
     *	用于过去和现在的时间差（diffValue传入对应的时间差）<br>
     *	小于5分钟显示：最新<br>
     *	小于1小时显示：XX分钟前<br>
     *	小于一天显示：XX小时前<br>
     *	大于一天显示：<br>
     *	MM-DD XX:XX   ('1day')、<br>
     *	YYYY年MM月DD日   （'overyear'）<br>
     *
     *	3.'7day'<br>
     *	（_ts传过去某个时间点的时间戳）<br>
     * 	用于过去和现在的时间差（diffValue传入对应的时间差）<br>
     *	大于1年显示：YYYY年MM月DD日<br>
     *	大于7天显示：MM-DD<br>
     *	大于1天显示：XX天前<br>
     *	大于1小时显示：XX小时前<br>
     *	小于1小时显示：最新<br>
     *
     *	4.'hours'<br>
     *  (去掉大于一天部分的数据)<br>
     *	显示：XX小时<br>
     *
     *	5.'allhours'<br>
     *	（所有的差值的小时）<br>
     *	显示：XX小时<br>
     *
     *	6.'mm:ss'<br>
     *	显示：XX:XX<br>
     * @param {String} [_ts]  13位时间戳，某些条件下输出ymd
     * @return {String} 转换后的时间差值
     */
  getDHM: function (diffValue, _type, _ts) {
    var millisecond = 1000;
    var minute = millisecond * 60;
    var hour = minute * 60;
    var day = hour * 24;
    // var halfamonth = day * 15;
    var month = day * 30;
    var year = month * 12;

    var yearC = diffValue > year ? parseInt (diffValue / year) : 0;
    // var monthC = diffValue>month?parseInt(diffValue/month):0;
    var dayC = parseInt (diffValue / day);
    var hourC = parseInt (diffValue / hour);
    var minC = parseInt (diffValue / minute);
    var secC = parseInt (diffValue / millisecond);

    switch (_type) {
      case 'maxdays':
        if (diffValue < 0) return '1分内';

        if (dayC >= 1) {
          var hourC = (diffValue - dayC * day) / hour;
          hourC = hourC > 0 ? hourC : 0;

          return dayC + '天' + parseInt (hourC) + '小时';
        } else if (hourC >= 1) {
          var minC = (diffValue - hourC * hour) / minute;
          minC = minC > 0 ? minC : 0;

          return hourC + '小时' + parseInt (minC) + '分';
        } else if (minC >= 1) {
          return minC + '分';
        } else {
          return '1分钟';
        }
      case '1day':
      case 'overyear':
        if (diffValue >= 0 && yearC < 1) {
          if (dayC >= 1) {
            return this.getYMD (_ts, _type === 'overyear' ? 'ymd' : null);
          } else if (hourC >= 1) {
            return hourC + '小时前';
          } else if (minC >= 5) {
            return minC + '分钟前';
          }
        }
      case '7day':
        //1day, overyear < 0 也走这里
        if (diffValue < 0) return this.getYMD (_ts);
        if (yearC >= 1) return this.getYMD (_ts, 'ymd');

        if (dayC >= 7) {
          return this.getYMD (_ts, 'm-d');
        } else if (dayC >= 1) {
          return dayC + '天前';
        } else if (hourC >= 1) {
          return parseInt (hourC) + '小时前';
        }

        return '最新';
      case 'allhours':
        return (diffValue / hour).toFixed (1) + '小时';
      case 'hours':
        return ((diffValue - dayC * day) / hour).toFixed (1) + '小时';
      case 'mm:ss':
        return (
          (minC > 9 ? minC : '0' + minC) + ':' + (secC > 9 ? secC : '0' + secC)
        );
    }
  },

  /**
     * @method getSubString 
     * 字符串截取<br>
     * （兼容emjio表情截取，若截取之后的字符串长度小于原字符串长度，会在截取之后的字符串尾部加上"..."）
     * @member SyApp.util
     * @param {String} val 待截取的字符串
     * @param {Number} length 截取长度
     * @return {String} 截取后的字符串
     * 
     *		@example
     *		SyApp.util.getSubString('abcdefg',7);          //	"abcdefg"
     *		SyApp.util.getSubString('abcdefg',3);  //	"abc...
     *		SyApp.util.getSubString('😂😄😯',2);  //	"😂😄...""
     *
     */
  getSubString: function (val, length) {
    if (!val) {
      return '';
    } else {
      var rsAstralRange = '\\ud800-\\udfff',
        rsZWJ = '\\u200d',
        rsVarRange = '\\ufe0e\\ufe0f',
        rsComboMarksRange = '\\u0300-\\u036f',
        reComboHalfMarksRange = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange = '\\u20d0-\\u20ff',
        rsComboRange =
          rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
      var reHasUnicode = RegExp (
        '[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']'
      );

      var rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsOptVar = '[' + rsVarRange + ']?',
        rsCombo = '[' + rsComboRange + ']',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        reOptMod = rsModifier + '?',
        rsAstral = '[' + rsAstralRange + ']',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsOptJoin =
          '(?:' +
          rsZWJ +
          '(?:' +
          [rsNonAstral, rsRegional, rsSurrPair].join ('|') +
          ')' +
          rsOptVar +
          reOptMod +
          ')*',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsSymbol =
          '(?:' +
          [
            rsNonAstral + rsCombo + '?',
            rsCombo,
            rsRegional,
            rsSurrPair,
            rsAstral,
          ].join ('|') +
          ')';
      var reUnicode = RegExp (
        rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq,
        'g'
      );
      var strArr = reHasUnicode.test (val)
        ? val.match (reUnicode) || []
        : val.split ('');
      if (strArr.length < length + 1) {
        return val;
      } else {
        var result = strArr.slice (0, length);
        return result.join ('') + '...';
      }
    }
  },

  /**
     * @member SyApp.util
     * @method updateShareBar 
     * 通知APP更新右上角分享按钮<br>
     * （适用于新通讯协议起始版本之后的app）
     * 
     *		@example
     *		SyApp.base.tittle = 'newTittle';
     *		SyApp.base.pic = 'XXXX.jpg';
     *		SyApp.base.desc = 'newDesc';
     *		SyApp.util.updateShareBar();  //	更新APP右上角的分享文案和图片
     * 
     */
  updateShareBar: function () {
    if (!SyApp.isInDjApp) {
      return;
    }
    SyApp.util.gotoPageBind ('showShareBtn');
  },

  /**
     * @method hitPoint 
     * 打点通用方法<br>
     * 
     *（优先选择的打点字符	SyApp.hitPoint = {pid: xx, eid: xx, additional: xx, referid:xx} ）
     *
     * @member SyApp.util
     * @param {String} [_pid=location.href]  被打点的链接，或者id
     * @param {String} [_eid="view"]  事件id, _pid存在，eid 没有的情况下，默认为 view
     * @param {String} [_additional]  外加信息
     * @param {String} [_referid]  上一次页面
     * @param {Boolean} [_ignoreAppHp]  true--APP内H5自己打点而不是让APP去打点，默认走APP打点
     * @param {String} [_apiUrl="log/record"]  打点的URL
     */

  /*
        逻辑：
        1， app内部，定义了 _pid 或者 _eid，  djtype=1011 打点，此时app 会打2次点。 因为本身的url 还会被打一次
        2， app内部，无  _pid、 _eid， url 会被app打一次
        3， app 外部， 生产环境， ajax 打点
    */
  hitPoint: function (
    _pid,
    _eid,
    _additional,
    _referid,
    _ignoreAppHp,
    _noActivity,
    _apiUrl
  ) {
    if (!_eid) {
      //deeplink第一次进入页面的打点（SyApp.deeplink.viewHitPoint）不传eid，默认为view，其他打点都得传eid
      _pid = SyApp.hitPoint.pid || _pid;
      _eid = SyApp.hitPoint.eid || _eid;
      _noActivity = SyApp.hitPoint.noActivity || _noActivity;
    }
    _pid = _pid || location.href;

    var rsc = this.getURLParam ('rsc');

    if (rsc) {
      _additional = _additional ? _additional : {};
      _additional.rsc = rsc;
    }

    if (SyApp.isInDjApp && (_pid || _eid) && !_ignoreAppHp) {
      _eid = _pid && !_eid ? 'view' : _eid;

      var addr = {
        pid: _pid,
        eid: _eid,
        additional: _additional,
        referid: _referid,
      };
      addr = JSON.stringify (addr);
      SyApp.msg.sentAction2App ('1011', addr);
    } else if (!SyApp.isInDjApp || _ignoreAppHp) {
      var h5DjUUID = this.getURLParam ('dn');
      var h5DjUUIDCookie = SyApp.store.cookie.get ('H5DjUUID');
      if (!h5DjUUIDCookie) {
        h5DjUUID = h5DjUUID ? h5DjUUID : SyApp.util.uuid ();
        SyApp.store.cookie.set ('H5DjUUID', h5DjUUID);
      } else if (!h5DjUUID) {
        h5DjUUID = h5DjUUIDCookie;
      }

      var browser = 'other';
      browser = SyApp.isQQ ? 'qq' : browser;
      browser = SyApp.isWeixin ? 'wx' : browser;
      browser = SyApp.isUC ? 'uc' : browser;
      browser = SyApp.isWeibo ? 'weibo' : browser;
      var time = new Date ().getTime ();
      var param = {
        platform: SyApp.isXcx ? 6 : 5,
        deviceNumber: h5DjUUID,
        events: [
          {
            milliseconds: time,
            pid: (_noActivity ? '' : 'activity_') + _pid,
            additional: _additional,
            eid: _eid || 'view',
            referid: _referid || document.referrer,
            browser: browser,
            time: parseInt (time / 1000),
          },
        ],
      };
      if (SyApp.syAuth && SyApp.syAuth.UID) {
        param.events[0].uid = SyApp.syAuth.UID;
      }
      //把屏幕宽高和手机系统版本的信息放在请求的外部
      if (_additional && _additional.screenHeight && _additional.screenWidth) {
        param.resolution =
          _additional.screenWidth + '*' + _additional.screenHeight;
        param.systemVersion = _additional.osVersion &&
          _additional.osVersion.length > 0
          ? _additional.osVersion
          : 'unknown';
        delete _additional.screenHeight;
        delete _additional.screenWidth;
        delete _additional.osVersion;
      }

      _apiUrl = SyApp.hitPoint.apiUrl || _apiUrl || 'log/record';

      SyApp.msg.ajax ({
        type: 'POST',
        url: _apiUrl,
        contentType: 'application/json',
        data: JSON.stringify (param),
        done: function (status, data) {
          if (!status || !data.code === 0) {
            console.log ('log record fail');
          }
        },
      });
    }
  },

  /**
     * @method load 加载一个资源
     * @member SyApp.util
     * @param {String} src  加载资源的地址
     * @param {Function} [_callback]  加载完成之后的回调函数
     * @param {Boolean} [_iscss]  加载的资源是否是样式表
     */
  load: function (src, _callback, _iscss) {
    var se = document.createElement (_iscss ? 'link' : 'script');
    if (_iscss) {
      se.rel = 'stylesheet';
      se.href = src;
    } else {
      //现代浏览器用 'async', ie9-用 'defer'; 都支持默认 async
      se.async = true;
      se.defer = true;
      se.src = src;
    }
    se.onload = function () {
      _callback && _callback ();
    };

    document.getElementsByTagName ('head')[0].appendChild (se);
  },
  /**
     * @method gotoH5 
     * 站外跳转到APP内当前页的对应页面,若未安装app则跳转下载页
     * @member SyApp.util
     */
  gotoH5: function () {
    //底部的下载浮层跳转  
    SyApp.deeplink.downloadHitPoint (); //点击打开app按钮进行打点
    SyApp.util.gotoH5Fun (
      SyApp.deeplink.param.djtype,
      SyApp.deeplink.param.djaddr
    ); //执行跳转
  },

  /**
     * @method gotoH5Fun 
     * H5在站外打开app内对应页面,若未安装app则打开下载页面<br>
     * 对应跳转类型参见SyApp.util.gotoPageBind内链接
     * @member SyApp.util
     * @param {String} [_type]  跳转类型
     * @param {Function} [_addr]  跳转参数
     */
  gotoH5Fun: function (_type, _addr) {
    //在移动端h5打开app,若未安装app则打开下载页面，addr和type直接输入
    var search = '', url = SyApp.APP_DOWNLOAD_URL;
    if (_type) {
      search += '?djtype=' + _type;
      _addr && (search += '&djaddr=' + _addr);
    }
    if (SyApp.isIOS) {
      url += search;

      SyApp.util.navUrl (url, true);
      return;
    } else if (SyApp.isAndroid) {
      if (SyApp.isWeixin) {
        //直接跳应用宝地址，应用宝打开，应用宝打开传参数无效，只能打开app首页，故直接跳转不设置5秒超时
        SyApp.util.navUrl (url, true);
      } else {
        url = url.replace ('https://', 'dongjia://');
        url += search;

        SyApp.util.navUrl (url, true);
        setTimeout (function () {
          SyApp.util.navUrl (SyApp.APP_DOWNLOAD_URL, true);
        }, 5000);
      }
    } else {
      SyApp.util.navUrl (SyApp.APP_DOWNLOAD_URL, true);
    }
  },
}; //end util
