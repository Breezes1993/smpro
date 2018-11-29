<template>
  <div>

    <div>
      <img :src="vipBaseInfo.vipimg" class="block wid100" mode="widthFix">
    </div>

    <div class="pad-top-sm">
      <div class="bg-white b-t1 b-t-red">
        <div>
          <div class="wid40 mar0A">
            <p class="btn btn-danger block btn-xs rad6-bottom">vip会员专项特权</p>
          </div>
        </div>

        <div class="pad-left-sm pad-ver-sm">
          <div class="flexBox ver-cen">
            <div class="flex8">
              <img src="/static/img/account/icon_vip.png" class="block" style="width: 60rpx;height: 60rpx;">
            </div>
            <div class="flexAuto">
              <!--<p class="pad-left-xs">vip商户可同时发布10种优惠券！</p>-->
              <p class="pad-left-xs">{{vipBaseInfo.viptext || '无'}}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="pad-top-sm" style="padding-bottom: 106rpx;">
      <div class="bg-white b-t1 b-t-red">
        <div class="pad-bottom-sm">
          <div class="wid40 mar0A">
            <p class="btn btn-danger block btn-xs rad6-bottom">直接购买</p>
          </div>
        </div>

        <div class="pad-sm b-t1" @click="curWay=item.id" v-for="(item,index) in vipArr" :key="index" :wx:key="index">
          <div class="flexBox ver-cen">
            <div class="flex8">
              <icon type="success" class="ver-mid" size="20"
                    :color="(curWay==item.id) ? 'rgb(244,68,68)' : 'rgb(240,240,240)'"></icon>
            </div>
            <div class="flexAuto">
              <p class="pad-left-sm">{{item.openmoney}}元，可以置顶{{item.opentime}}天</p>
            </div>
          </div>
        </div>

        <p class="pad-ver-xs text-999 b-t1 te-cen">
          我已阅读并同意
          <span class="text-danger b-b1" @click="getAgreeFn"
                style="margin-left: 10rpx;border-bottom-color: #dd514c">优惠券发布协议</span>
        </p>

      </div>
    </div>

    <div class="fixBot">
      <div class="bg-white">
        <div class="flexBox ver-cen te-cen pad-ver-xs">
          <div class="flex25" @click="changeTab(1)">
            <img src="/static/img/tabs/tab1.png" class="block mar0A" style="width: 40rpx;height: 40rpx;">
            <p>附近的券</p>
          </div>

          <div class="flexAuto">
            <p class="btn btn-danger btn-radius block" @click="getWxInfo">立即开通</p>
          </div>

          <div class="flex25" @click="changeTab(2)">
            <img src="/static/img/tabs/tab3.png" class="block mar0A" style="width: 40rpx;height: 40rpx;">
            <p>我的</p>
          </div>

        </div>
      </div>
    </div>

    <div class="shade dark" v-if="showAlert">
      <div class="pad-top-big">
        <div class="wid70 mar0A overHid rad6">
          <p class="pad-sm text-white bg-red te-cen">优惠券发布协议</p>
          <div class="pad-sm bg-white scrollAble" style="height: 400rpx">
            <p v-html="agreementInfo" class="contentShow"></p>
          </div>
          <div class="pad-ver-xs bg-white te-cen">
            <div class="wid30 mar0A">
              <p class="btn btn-danger btn-xs block btn-radius" @click="showAlert=false">确定</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        curWay: 1,
        showAlert: false,
        agreementInfo: '',
        vipArr: [],
        vipBaseInfo: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initInfoFn();
      })
    },
    methods: {
      changeTab(n) {
        n = parseInt(n);
        switch (n) {
          case 1:
            wx.switchTab({
              url: '/pages/index/main'
            });
            break;
          case 2:
            wx.switchTab({
              url: '/pages/account/main'
            });
            break;
          default:
            break;
        }
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_vip_loadlist,
          data: {},
          cb: _this.callBackInit,
          mask: true
        };
        store.commit('getInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.vipArr = o.data || [];
        _this.curWay = _this.vipArr[0].id;
        _this.vipBaseInfo = o.info;
      },
      getWxInfo() {
        let _this = this;
        let item = '';
        for (let i = 0, len = _this.vipArr.length; i < len; i++) {
          if (_this.vipArr[i].id == _this.curWay) {
            item = _this.vipArr[i];
            break;
          }
        }

        let o = {
          url: Api.url_vip_pay,
          data: {
            money: item.openmoney,
            daysnum: item.opentime,
          },
          cb: _this.callWXP,
          mask: true
        };
        store.commit('reqInfo', o);
      },
      callWXP(obj) {
        let _this = this;
        let o = obj.data;
        wx.requestPayment({
          'timeStamp': o.timeStamp,
          'nonceStr': o.nonceStr,
          'package': o.package,
          'signType': o.signType,
          'paySign': o.paySign,
          'success': function (res) {
            _this.feeBackFn(1, o.ordernum);
          },
          'fail': function (res) {
            _this.feeBackFn(2, o.ordernum);
          }
        })
      },
      getAgreeFn() {
        let _this = this;
        let o = {
          url: Api.url_help_agreement + "?title=优惠券发布协议",
          data: {},
          cb: _this.callBackAG
        };
        store.commit('getInfo', o);
      },
      callBackAG(o) {
        let _this = this;
        _this.showAlert = true;
        _this.agreementInfo = o.data.content;
      },
      feeBackFn(type, oid) {
        let _this = this;
        let o = {
          url: Api.url_vip_pay_feeback,
          data: {
            state: type,
            order: oid
          },
          cb: _this.callBackFB
        };
        store.commit('reqInfo', o);
      },
      callBackFB(o) {
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1500
        });
        if (o.data) {
          store.state.endTime = o.data;
        }
      }
    }
  }
</script>
