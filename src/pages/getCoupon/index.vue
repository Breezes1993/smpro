<template>
  <div>

    <div class="pad-sm shade bg-ccc scrollAble">

      <p class="te-right">
        <img src="/static/img/main.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
        <span class="ver-mid pad-left-xs text-white" @click="goHome">回到首页</span>
      </p>

      <div class="pad-top-lg">
        <div class="pad-top-lg">

          <div class="pad-sm bg-white te-cen b-b1 dash">
            <div>
              <img :src="storeInfo.logo" style="width: 150rpx;height: 150rpx;margin-top: -90rpx;">

            </div>

            <p>{{storeInfo.name}}</p>

            <p class="pad-top-sm text-lg pad-right-xs text-danger">{{cpInfo.name}}</p>

            <div class="text-999 pad-top-xs">

              <p>{{cpInfo.describe}}</p>

              <p class="pad-top-xs">剩余{{cpInfo.num}}张</p>

            </div>

            <div class="pad-top-sm">
              <div class="pad-hov-xs m-flex">
                <button style="line-height:1.6;" class="btn btn-danger btn-radius btn-xs" @click="getCpFn">立即领取</button>
                <button style="line-height:1.6;" class="btn btn-danger btn-radius btn-xs" open-type="share">直接转发</button>
              </div>
            </div>

          </div>

          <div class="pad-sm bg-white">

            <div class="text-999 b-b1 pad-bottom-sm">
              <p>• 同一张券仅可领取1次</p>
              <p>• {{cpInfo.timeinfo}}</p>
            </div>

            <div class="pad-ver-sm b-b1">

              <p class="text-333 text-Bold pad-bottom-xs">使用须知</p>

              <p v-for="(item,index) in cpInfo.knowledge" :key="index" :wx:key="index">
                <span class="text-999">•</span> {{item}}
              </p>

            </div>

            <div class="flexBox pad-ver-sm ver-cen b-b1" @click="backToStore">
              <div class="flexAuto">
                <p class="ell">欢迎光临本店，浏览更多优惠</p>
              </div>
              <div class="flex8 te-right">
                <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
              </div>
            </div>

            <div class="pad-top-sm ver-cen" @click="callStore">
              <div>
                <p class="ell">联系电话：{{storeInfo.telphone}}</p>
              </div>
            </div>

          </div>

          <div class="pad-top-lg">
            <div class="wid40 mar0A">
              <p class="btn btn-def block rad500" @click="toMyCp">我的优惠券</p>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!--<div class="shade dark" v-if="shareAlert">
      <div class="pad-top-big">
        <div class="wid80 mar0A bg-white overHid">
          <p class="pad-ver-sm te-cen">分享到1个微信群，即可免费领券</p>
          <button open-type="share" class="bg-white te-cen text-success">立即分享</button>
        </div>
      </div>
    </div>-->

  </div>
</template>

<script>
import Api from "../../../static/js/apis";
import store from "../index/store";

export default {
  data() {
    return {
      curId: -1,
      storeInfo: "",
      cpInfo: ""
    };
  },
  onLoad(o) {
    let _this = this;
    _this.curId = o.id;
    _this.curSid = o.sid;
  },
  onUnload() {
    let _this = this;
    _this.curId = -1;
    _this.storeInfo = "";
    _this.cpInfo = "";
  },
  onShow() {
    this.initInfoFn();
  },
  onShareAppMessage(res) {
    let _this = this;
    if (res.from === "button") {
      // 来自页面内转发按钮
    }
    return {
      title: _this.cpInfo.name,
      imageUrl: _this.storeInfo.logo,
      path:
        "/pages/getCoupon/main" + "?id=" + _this.curId + "&sid=" + _this.curSid,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    };
  },
  methods: {
    initInfoFn() {
      let _this = this;
      let o = {
        url: Api.url_store_info + "?id=" + _this.curSid,
        data: {},
        cb: _this.callBackInit
      };
      store.commit("getInfo", o);
    },
    callBackInit(o) {
      let _this = this;
      _this.storeInfo = o.data;
      for (let i = 0, len = o.ticket.length; i < len; i++) {
        if (_this.curId == o.ticket[i].id) {
          _this.cpInfo = o.ticket[i];
          break;
        }
      }
      wx.setNavigationBarTitle({
        title: _this.storeInfo.name
      });
    },
    toMyCp() {
      wx.switchTab({
        url: "/pages/myCoupon/main"
      });
    },
    goHome() {
      wx.switchTab({
        url: "/pages/index/main"
      });
    },
    backToStore() {
      wx.reLaunch({
        url: "/pages/storeInfo/main" + "?id=" + this.curSid
      });
    },
    getCpFn() {
      let _this = this;
      let o = {
        url: Api.url_store_user_getCp,
        data: { ticketid: _this.curId },
        cb: _this.callBackGetCp
      };
      store.commit("reqInfo", o);
    },
    callBackGetCp(o) {
      wx.showToast({
        title: o.msg,
        icon: "none",
        duration: 1000
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1000);
    },
    callStore() {
      let _this = this;
      wx.makePhoneCall({
        phoneNumber: _this.storeInfo.telphone
      });
    }
  }
};
</script>

