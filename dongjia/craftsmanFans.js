/**
 *～╭════╮┌═══════════┐
 * ╭╯开车║ ▁▂▃▅▆▇  |  ~~~
 * ╰⊙═⊙╯╰══⊙══════⊙══╯
 * @description: 匠人锁粉
 * @author: PresByter
 * @date  : 2020/05/18 17:12:48
 * @file  : carftsmanFans.js
 */

SyApp.H5init(function() {
  // 右上角 分享
  // SyApp.base = {
  //   title: "东家五周年 | 点击收取你的独特回忆",
  //   shareDesc: "匠心传承，感谢有你",
  //   shareLink: SyApp.util.getNoShareParamUrl(),
  //   pic: "https://file.idongjia.cn/T3VmVTBbYT1RXrhCrK.jpg",
  //   noParam: true
  // };

  SyApp.Vue = new Vue({
    el: "#syapp",
    data() {
      return {
        canvas: null,
        ctx: null,
        isLoading: true,
        userInfo: {
          uid: 11,
          avatar: "",
          username: "东家的忠实小粉丝",
          qrcode: "", //微信小程序 二维码
          couponAmount: 666, //优惠券 金额
          totalAmount: 1, //总金额
          todayAmount: 1, //今日金额
          inviterCount: 1 //邀请人数
        },
        tabbarList: [
          {
            title: "已获奖励",
            id: "1",
            page: 1,
            limit: 20
          },
          {
            title: "已邀好友",
            id: "2",
            page: 1,
            limit: 20
          }
        ],
        resDataList: [],
        resFansList: [],
        isTabbarId: "1",
        initload: false,
        page: 1,
        isDisabled: false,
        isPopup: false,
        isFooter: false
      };
    },
    filters: {
      thousands: function(val) {
        return val >= 10000 ? `${(val / 10000) | 0}W` : val;
      },
      formatYMD(val) {
        return SyApp.util.getYMD(val, "ymdhm");
      },
      formatName(val) {
        return `${val.substr(0, 1)}**`;
      }
    },
    watch: {
      isPopup(val) {
        // val && this.handleClosePopup();
        // val && this.handlePopup ();
      },
      isTabbarId(val) {
        // const checked = this.tabbarList.filter (v => v.id === val);
        // this.toggleTab (checked[0]);
      }
    },
    methods: {
      // 加载更多
      loadMore(id) {
        // this.isLoading = true;
        const checked = this.tabbarList.filter(v => v.id === this.isTabbarId);
        this.isDisabled = true;
        this.isTabbarId === "2"
          ? this.getFansList(
              {
                page: checked[0].page++,
                limit: 20
              },
              res => {
                this.isDisabled = false;
                if (res.code === 0) {
                  // this.isLoading = false;
                }
              }
            )
          : this.getReward(
              {
                page: checked[0].page++,
                limit: 20
              },
              res => {
                this.isDisabled = false;
                if (res.code === 0) {
                  // this.isLoading = false;
                }
              }
            );
      },
      // 切换 已获奖励/已邀好友
      toggleTab(val) {
        // console.log (this.resDataList);
        // this.isTabbarId === '2' ? this.getFansList () : this.getReward ();
      },
      // 绘制canvas
      handleClosePopup(e) {
        const bk = "https://file.idongjia.cn/T3CFd_BmVT1RCvBVdK.png";
        const { avatar, qrcode, username, couponAmount = 666 } = this.userInfo;
        const nickname =
          username.length > 4 ? `${username.substr(0, 4)}...` : username;
        const centerDis = new Map([
          [1, 158],
          [2, 150],
          [3, 142],
          [4, 134]
        ]);
        const canvas = this.$refs.djcanvas;
        canvas.width = 336;
        canvas.height = 610;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 336, 610);
        ctx.save(); // 保存默认的状态
        // 背景图
        const bkImg = new Image();
        bkImg.setAttribute("crossOrigin", "Anonymous");
        bkImg.src = "https://file.idongjia.cn/T3CFd_BmVT1RCvBVdK.png";
        // 小程序二维码
        const qrcodeImg = new Image();
        qrcodeImg.setAttribute("crossOrigin", "Anonymous");
        qrcodeImg.src = qrcode;
        // qrcodeImg.src = 'syui/img/20191219/qr.png';
        qrcodeImg.onload = () => {
          // ctx.save(); // 保存默认的状态
          ctx.drawImage(qrcodeImg, 225, 495, 90, 90);
          // ctx.restore(); // 还原到上次保存的默认状态
        };
        // 头像
        const avatarImg = new Image();
        avatarImg.setAttribute("crossOrigin", "Anonymous");
        avatarImg.src = avatar;
        // avatarImg.src = 'syui/img/20191219/qr.png';
        // avatarImg.onload = () => {
        //   ctx.restore(); // 保存默认的状态
        //   // 头像
        //   ctx.arc(168, 300, 22, 0, 2 * Math.PI);
        //   ctx.clip();
        //   ctx.drawImage(avatarImg, 138, 275, 60, 60);
        //   ctx.save(); // 还原到上次保存的默认状态
        // };
        bkImg.onload = () => {
          // 通过arc来绘制一个圆形区域
          // 圆心坐标，半径，起始角度
          // ctx.arc (35, 35, 25, 0, 2 * Math.PI);
          // ctx.clip ();
          // ctx.drawImage (bkImg, 0, 0, 100, 100);

          ctx.restore(); // 还原到上次保存的默认状态
          // 背景图
          ctx.drawImage(bkImg, 0, 0, 336, 475);
          // 二维码
          // ctx.drawImage(qrcodeImg, 225, 495, 90, 90);
          ctx.save(); // 保存默认的状态
          // 头像
          ctx.arc(168, 300, 22, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(avatarImg, 138, 275, 60, 60);
          // ------------------
          avatarImg.onload = () => {
            // ctx.restore (); // 保存默认的状态
            // 头像
            ctx.arc(168, 300, 22, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(avatarImg, 138, 275, 60, 60);
            // ctx.save (); // 还原到上次保存的默认状态
          };
          // ------------------
          ctx.restore(); // 还原到上次保存的默认状态
          // 文字 😁😃😄
          ctx.fillStyle = "#FFEAC3";
          ctx.font = "16px serif";
          // 1-158 2-150 3-142 4-134
          const locX = centerDis.get(nickname.length) || centerDis.get(4);
          ctx.fillText(`${nickname}`, locX, 345);
          ctx.font = "13px serif";
          ctx.fillText(`送您${couponAmount}元新人专享红包， `, 100, 367);
          ctx.fillText(`和他一起鉴赏东方美物，守护匠心传承`, 60, 385);
          ctx.save(); // 保存默认的状态
        };

        ctx.font = "18px PingFangSC-Medium,PingFang SC";
        ctx.fillStyle = "#333";
        ctx.fillText(`百万臻品，东家精选`, 20, 530);
        ctx.font = "14px PingFangSC-Medium,PingFang SC";
        ctx.fillStyle = "#666";
        ctx.fillText(`长按扫描二维码领取专享礼包`, 20, 560);
      },
      // 打开弹窗 获取微信 小程序二维码
      async handlePopup(cb) {
        const userInfo = this.userInfo;
        this.isLoading = true;
        const { uid } = this.userInfo;
        const res = await SyApp.msg.djAjax({
          url: "/apife/qrcode",
          data: {
            type: 11,
            scene: `u=${uid}&commission`,
            page: "pages/home"
          },
          type: "POST",
          apiVer: "v3",
          dataType: "json",
          isJson: !0,
          done: (t, res) => {
            if (t && res.code === 0) {
              const { res: data } = res;
              const qrcode = data.id || data.id || '"T3yyDTBCAT1RCvBVdK.jpg"';
              this.userInfo = Object.assign({}, userInfo, {
                qrcode: this.getImg(qrcode, "m")
              });
              cb && cb(res);
              this.isPopup = true;
            } else {
              SyApp.ui.toast(res.msg);
            }
            this.isLoading = false;
          }
        });
      },
      // 保存图片
      handleSavePic() {
        const djcanvas = this.$refs.djcanvas;
        // console.log (djcanvas.toDataURL ('image/jpeg'));
        const canvasBase64 = djcanvas.toDataURL("image/png");
        let blob = this.dataURItoBlob(canvasBase64);
        this.doAjaxUpload(blob, data => {
          SyApp.util.gotoPageBind("saveImage", {
            picture: data.id
          });
        });
        // const alink = document.createElement("a");
        // alink.href = canvasBase64;
        // alink.download = "dongjia.jpg";
        // alink.click();
      },
      // 上传图片
      doAjaxUpload(blob, cb) {
        let xhrObject = new XMLHttpRequest();
        let postUrl = SyApp.util.api(
          "/file/upload/?suffix=." +
            blob.type.replace("image/", "") +
            "&simple_name=1"
        );
        xhrObject.open("POST", postUrl);
        xhrObject.timeout = 60000;
        xhrObject.ontimeout = function() {
          SyApp.ui.toast("上传图片等待超时，请重试");
        };

        xhrObject.onreadystatechange = function() {
          let isJson = false,
            data;
          try {
            data = JSON.parse(xhrObject.responseText);
            isJson = true;
          } catch (e) {
            data = xhrObject.responseText;
          }

          if (xhrObject.readyState === 4) {
            if (xhrObject.status !== 200) {
              SyApp.ui.toast(xhrObject.statusText);
            } else {
              // 上传成功，获取图片地址
              cb && cb(data);
            }
          }
        };

        xhrObject.send(blob);
      },
      dataURItoBlob(dataURI) {
        let byteString = "";
        if (dataURI.split(",")[0].indexOf("base64") >= 0)
          byteString = atob(dataURI.split(",")[1]);
        else byteString = unescape(dataURI.split(",")[1]);
        let mimeString = dataURI
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
      },
      // 详细规则
      getDetailRules() {
        // 站内 跳转 都用 7 （包括云梯）
        SyApp.util.gotoPageBind(7, "https://m.idongjia.cn/128538");
      },
      // 邀请微信好友
      shareWx() {
        // 唤起App分享
        const { username, uid, couponAmount } = this.userInfo;
        const addr = JSON.stringify({
          mediaType: 1,
          title: `好友@${username}送你￥${couponAmount}新人专享礼包`,
          picture: "https://file.idongjia.cn/T39yK_B7DT1RCvBVdK.png",
          platforms: ["WEIXIN"],
          minApp: {
            minAppId: "wx40a83f77b7943c67",
            path: `pages/home?u=${uid}&commission`,
            picture: "https://file.idongjia.cn/T39yK_B7DT1RCvBVdK.png"
          },
          mode: 1
        });
        SyApp.util.gotoPageBind(1005, addr);
      },
      // 提现
      getCash() {
        SyApp.util.gotoPageBind(75);
      },
      // 检测 窗口滚动
      handleScroll() {
        const rules = this.$refs.rules;
        const top = rules.getBoundingClientRect().top;
        if (top > 0) {
          this.isFooter = false;
        } else if (top < 0) {
          this.isFooter = true;
        }
      },
      // 获取系统图片目录 size: l m s
      // 文档：uiloop/syui/sydoc/main/source/syH5.html
      getImg(pic = "", size = "m") {
        return SyApp.util.getImgUrl(SyApp.FILE_SERVER + pic, size);
      },
      // 防抖
      debounce(fn, delay) {
        let timer = null;
        return function() {
          if (timer !== null) {
            clearTimeout(timer);
          }
          timer = setTimeout(fn, delay);
        };
      },
      // 已经获得奖励 列表
      async getReward(
        payload = {
          page: 1,
          limit: 20
        },
        cb
      ) {
        await SyApp.msg.djAjax({
          url: "/v4/lock/fans/reward/record",
          data: payload,
          type: "POST",
          apiVer: "v3",
          dataType: "json",
          isJson: !0,
          done: (t, res) => {
            t && res.code === 0
              ? (this.resDataList = this.resDataList.concat(res.res))
              : SyApp.ui.toast(res.msg);
            cb && cb(res);
          }
        });
      },
      // 已邀好友
      async getFansList(
        payload = {
          page: 1,
          limit: 20
        },
        cb
      ) {
        await SyApp.msg.djAjax({
          url: "/v4/craftsman/locked-fans/list",
          data: payload,
          type: "POST",
          apiVer: "v3",
          dataType: "json",
          isJson: !0,
          done: (t, res) => {
            if (t && res.code === 0) {
              const { res: data } = res;
              const rafdata = data.map(v => {
                return {
                  ledgerAmount: 0,
                  ledgerTime: v.createTime,
                  userId: v.customerId,
                  userName: v.name
                };
              });
              this.resFansList = this.resFansList.concat(rafdata);
            } else {
              SyApp.ui.toast(res.msg);
            }
            cb && cb(res);
          }
        });
      },
      async init() {
        // 获取 订单 人数 一邀请 人 等接口
        const res1 = await SyApp.msg.djAjax({
          url: "/v4/lock/fans/rebate",
          data: {},
          type: "POST",
          apiVer: "v3",
          dataType: "json",
          isJson: !0,
          done: (t, res) => {
            t && res.code === 0
              ? (this.userInfo = Object.assign({}, this.userInfo, {
                  totalAmount: res.res.totalAmount, //总金额
                  todayAmount: res.res.todayAmount, //今日金额
                  inviterCount: res.res.inviterCount //邀请人数
                }))
              : SyApp.ui.toast(res.msg);
          }
        });
        // 用户信息
        const res2 = await SyApp.msg.djAjax({
          url: "/v4/user/token/userinfo",
          data: {},
          type: "POST",
          apiVer: "v3",
          dataType: "json",
          isJson: !0,
          done: (t, res) => {
            t && res.code === 0
              ? (this.userInfo = Object.assign({}, this.userInfo, {
                  //TODO:一旦使用结构 就报错 ...userInfo,
                  uid: res.res.uid,
                  avatar: this.getImg(res.res.avatar, "m"),
                  username: res.res.username
                }))
              : SyApp.ui.toast(res.msg);
          }
        });
        // 已获得奖励
        // this.getReward ({
        //   page: 1,
        //   limit: 20,
        // });
        // 获得 优惠券 金额
        // TODO:优惠券是动态的，暂时 不知道是否写死。
        await SyApp.msg.djAjax({
          url: "/v4/coupon/newer/totalAmount",
          data: {},
          type: "POST",
          apiVer: "v3",
          dataType: "json",
          isJson: !0,
          done: (t, res) => {
            if (t && res.code === 0) {
              const { res: data } = res;
              this.userInfo = Object.assign({}, this.userInfo, {
                couponAmount: data.totalAmount || 666
              });
              // this.isPopup = true;
            } else {
              SyApp.ui.toast(res.msg || "出错啦！！");
            }
            this.isLoading = false;
          }
        });
        this.isLoading = false;
      }
    },
    created() {
      this.$nextTick(() => {
        this.init();
      });
    },
    mounted() {
      this.$nextTick(() => {
        // this.init ();
      });
      //监听页面滚动事件
      window.addEventListener("scroll", this.debounce(this.handleScroll, 300));
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    }
  });
});
