<template>
  <div>

    <div class="pad-sm shade bg-ccc scrollAble">

      <div class="pad-top-lg">

        <div class="pad-sm bg-white te-cen b-b1 dash">

          <p class="text-danger"><span class="text-lg text-Bold">{{cpInfo.ticketname}}</span></p>

          <div class="te-cen pad-top-sm">
            <img :src="imgHead+cpInfo.qrimg" style="height: 300rpx;width: 300rpx;">
          </div>

          <div class="pad-top-sm">
            <div class="wid65 mar0A">
              <p class="btn btn-danger btn-radius btn-xs block">收银员扫码核销</p>
            </div>
          </div>

        </div>

        <div class="pad-hov-sm pad-bottom-sm bg-white">

          <p class="pad-ver-sm b-b1">{{cpInfo.describe}}</p>

          <div class="pad-ver-sm ver-cen b-b1">
            <p>有效期：{{cpInfo.starttime}} 至 {{cpInfo.endtime}}</p>
          </div>

          <div class="pad-ver-sm b-b1">

            <p class="text-333 text-Bold pad-bottom-xs">使用须知</p>
            <p v-for="(item,index) in cpInfo.knowledge" :key="index" :wx:key="index">
              <span class="text-999">•</span> {{item}}
            </p>

          </div>

          <div class="flexBox pad-top-sm ver-cen" @click="toStore(cpInfo.shopid)">
            <div class="flexAuto">
              <p class="ell">门店：{{cpInfo.shopname}}</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

        </div>

      </div>

      <!--<p class="btn btn-danger block" @click="toCheck">测试观看（绑定核销员 页面）</p>-->
      <!--<p class="btn btn-danger block" @click="toStoreComm()">测试观看（评论 页面）</p>-->

    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        curId: -1,
        cpInfo: '',
        imgHead: 'data:image/png;base64,',
        tempLogo: '',
        timer: null
      }
    },
    onLoad(o) {
      this.curId = o.id;
      clearTimeout(this.timer);
    },
    onUnload() {
      this.cpInfo = '';
      clearTimeout(this.timer);
    },
    mounted() {
      this.$nextTick(() => {
        this.initInfoFn();
      })
    },
    methods: {
      toCheck() {
        wx.navigateTo({
          url: '/pages/checkVerification/main'
        })
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_user_usecp,
          data: {ticketid: _this.curId},
          cb: _this.callBackInit
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.cpInfo = o.data;
        _this.tempLogo = o.data.logo;
        _this.cpInfo.qrimg = decodeURI(_this.cpInfo.codeimg);

        wx.setNavigationBarTitle({
          title: _this.cpInfo.ticketname
        });
        return _this.reCheckFn();
      },
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      toStoreComm() {
        let _this = this;
        store.state.tempObj.tempLogo = _this.tempLogo;
        wx.navigateTo({
          url: '/pages/storeComm/main' + '?id=' + _this.cpInfo.shopid + '&cid=' + _this.curId
        })
      },
      reCheckFn() {
        let _this = this;
        let o = {
          url: Api.url_user_check_use,
          data: {id: _this.curId},
          cb: _this.callBackRC
        };
        store.commit('reqInfo', o);
      },
      callBackRC(o) {
        let _this = this;
        if (o.data == 1) {
          clearTimeout(_this.timer);
          _this.timer = setTimeout(() => {
            return _this.reCheckFn();
          }, 3000);
        } else if (o.data == 2) {
          clearTimeout(_this.timer);
          return _this.toStoreComm();
        } else {
          wx.showToast({
            title: o.msg,
            icon: 'none',
            duration: 1000
          });
        }
      }
    }
  }
</script>
