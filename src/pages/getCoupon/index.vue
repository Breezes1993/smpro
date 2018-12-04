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
                <form report-submit="true" @submit="toGetCp" @reset="formReset">
                  <button style="line-height:1.6;" class="btn btn-danger btn-radius btn-xs" form-type="submit">立即领取</button>
                </form>
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



    <div class="drawer_screen" @click="powerDrawer('close')" v-show="showModalStatus"></div>

    <div :animation="animationData" class="drawer_box" v-show="showModalStatus">
      <div class="drawer_title">提示</div>
      <div class="drawer_content">
        <div class="top grid content">
          <label class="">请先获取用户信息！</label>
        </div>
      </div>
      <div class="btn_ok" @click="powerDrawer('close')" >
        <button @click="canUse" @getuserinfo='getUserInfo' open-type='getUserInfo'>确定</button>
      </div>
    </div>

    <div class="drawer_screen" @click="powerDrawer2('close')" v-show="showModalStatus2"></div>
    <div :animation="animationData" class="drawer_box" v-show="showModalStatus2">
      <div class="drawer_title">温馨提示</div>
      <div class="drawer_content">
        <div class="top grid content">
          <label class="">{{modalStatus2Info}}</label>
        </div>
      </div>
      <div class="btn_ok flexBox ver-cen no-radius" @click="powerDrawer2('close')" >
        <button class="flexAuto" style="color:#000;" @click="powerDrawer2('close')">取消</button>
        <button class="flexAuto" @click="toVip">确定</button>
      </div>
    </div>

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
      cpInfo: "",
      showModalStatus: false,
      modalStatus2Info: "",
      formId: ""
    };
  },
  onLoad(o) {
    let _this = this;
    _this.curId = o.id;
    _this.curSid = o.sid;
    console.log("curId", _this.curId, "curSid", _this.curSid)
  },
  onUnload() {
    let _this = this;
    _this.curId = -1;
    _this.storeInfo = "";
    _this.cpInfo = "";
  },
  onShow() {
    store.commit('initUserInfo',{that:this,cb:this.initInfoFn});
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
    toGetCp(e) {
      let _this = this;
      _this.formId = e.target.formId;
      let freeStoreTime = wx.getStorageSync("freeStoreTime") || {};
      let freeDiff = new Date().getTime() - (freeStoreTime[_this.curSid] || 0);
      let o = {
        url: Api.url_store_confirm_coupon,
        data: {
          free_shop_id: freeDiff < 1000 * 60 * 60 ? _this.curSid : '',
          shop_id: _this.curSid
        },
        cb: _this.callBackConfirmCp,
        noStatus: true
      };
      store.commit('reqInfo', o);
    },
    callBackConfirmCp(o) {
      if (o.data === 1) {
        this.getCpFn();
      } else {
        this.modalStatus2Info = o.msg;
        this.showModalStatus2 = true;
      }
    },
    toVip() {
      wx.navigateTo({
        url: '/pages/openVIPCustomer/main'
      })
    },
    getCpFn() {
      let _this = this;
      let o = {
        url: Api.url_store_user_getCp,
        data: { 
          ticketid: _this.curId,
          formId: _this.formId
        },
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
    },

    powerDrawer2: function(currentStatu) {
      console.log("12312")
      this.util2(currentStatu)
    },
    util2: function(currentStatu) {
      /* 动画部分 */
      // 第1步：创建动画实例 
      var animation = wx.createAnimation({
        duration: 200, //动画时长
        timingFunction: "linear", //线性
        delay: 0 //0则不延迟
      });

      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;

      // 第3步：执行第一组动画
      animation.opacity(0).rotateX(-100).step();

      // 第4步：导出动画对象赋给数据对象储存

      this.animationData = animation.export();

      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function() {
        // 执行第二组动画
        animation.opacity(1).rotateX(0).step();
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.animationData = animation

        //关闭
        if (currentStatu == "close") {
            this.showModalStatus2 = false;
        }
      }.bind(this), 200)

      // 显示
      if (currentStatu == "open") {
        this.setData({
          showModalStatus2: true
        });
      }
    },
    powerDrawer: function(currentStatu) {
        this.util(currentStatu)
    },
    util: function(currentStatu) {
      /* 动画部分 */
      // 第1步：创建动画实例 
      var animation = wx.createAnimation({
        duration: 200, //动画时长
        timingFunction: "linear", //线性
        delay: 0 //0则不延迟
      });

      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;

      // 第3步：执行第一组动画
      animation.opacity(0).rotateX(-100).step();

      // 第4步：导出动画对象赋给数据对象储存

      this.animationData = animation.export();

      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function() {
        // 执行第二组动画
        animation.opacity(1).rotateX(0).step();
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.animationData = animation

        //关闭
        if (currentStatu == "close") {
            this.showModalStatus = false;
        }
      }.bind(this), 200)

      // 显示
      if (currentStatu == "open") {
        this.setData({
          showModalStatus: true
        });
      }
    },
    getUserInfo(e){
      console.log("getUserInfo");
      let obj = {
        e: e,
        that: this,
        cb: () => {
          return this.initInfoFn();
        }
      }
      store.commit("getUserInfoBtn",obj);
    },
    canUse(){
      if(wx.canIUse('button.open-type.getUserInfo')){
        // 用户版本可用
      }else{
        wx.showModal({
          title: '提示',
          content: '请先升级版本！',
          showCancel: false
        });
      }
    }
  }
};
</script>

