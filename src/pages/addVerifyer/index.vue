<template>
  <div>

    <div class="bg-red pad-top-lg pad-bottom-lg">
      <div class="pad-top-lg">
        <div>
          <img :src="imgHead+qrCode" class="block mar0A" style="width: 280rpx;height: 280rpx;">
        </div>
        <p class="te-cen text-white pad-top-sm">扫一扫，添加核销员</p>
      </div>
    </div>

    <p class="pad-sm bg-white">核销员</p>

    <div class="bg-white">

      <div class="pad-hov-sm pad-ver-xs b-t1" v-for="(item,index) in verArr" :key="index" :wx:key="index">
        <div class="flexBox ver-cen">
          <div class="flex15">
            <img :src="item.wechatimg" class="block" style="width: 80rpx;height: 80rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">{{item.name}}</p>
          </div>
          <div class="flex15">
            <p class="btn btn-danger btn-xs btn-radius block" @click="openDel(item.id)">删除</p>
          </div>
        </div>
      </div>

    </div>


    <div class="pad-top-big" v-if="verArr.length==0">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">暂无添加核销员</p>
    </div>


    <!--<p class="pad-sm bg-red text-white" @click="toCheck">测试观看（绑定核销员 页面）</p>-->

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        verArr: [],
        imgHead: 'data:image/png;base64,',
        qrCode: '',
        curId: -1,
        timer: null,
      }
    },
    onLoad(o) {
      this.curId = o.id;
    },
    onShow() {
      this.initInfoFn();
      clearTimeout(this.timer);
    },
    onUnload() {
      this.qrCode = '';
      this.verArr = [];
      this.curId = -1;
      clearTimeout(this.timer);
    },
    methods: {
      openDel(id) {
        let _this = this;

        wx.showModal({
          title: '提示',
          content: '确定删除此核销员吗？',
          success: function (res) {
            if (res.confirm) {
              return _this.delVer(id);
            } else if (res.cancel) {
            }
          }
        })

      },
      delVer(id) {
        let _this = this;
        let o = {
          url: Api.url_manage_stuff_del,
          data: {
            shopid: _this.curId,
            staffid: id,
          },
          cb: _this.callBackDel,
          mask: true
        };
        store.commit('reqInfo', o);
      },
      callBackDel(o) {
        let _this = this;
        wx.showModal({
          title: '提示',
          content: o.msg,
          complete: function (res) {
            return _this.initInfoFn();
          }
        })
      },
      toCheck() {
        wx.navigateTo({
          url: '/pages/checkVerifyer/main'
        })
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_manage_stuff,
          data: {shopid: _this.curId},
          cb: _this.callBackInit,
          mask: true
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.qrCode = decodeURI(o.codeimg);
        _this.verArr = o.data;
        return _this.reFlashFn();
      },
      reFlashFn() {
        let _this = this;
        let o = {
          url: Api.url_manage_stuff_reflash,
          data: {shopid: _this.curId},
          cb: _this.callBackRF
        };
        store.commit('reqInfo', o);
      },
      callBackRF(o) {
        let _this = this;
        _this.verArr = o.data;
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function () {
          return _this.reFlashFn();
        }, 5000)
      }
    }
  }
</script>
