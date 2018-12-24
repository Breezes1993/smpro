<template>
  <div>
    <div class="pad-top-xs" v-for="(item,index) in infoArr" :key="index" :wx:key="index">
      <div class="bg-white pad-top-xs pad-hov-sm pad-bottom-xs flexBox ver-cen">
        <div class="flexAuto">
          <p class="text-lgx text-Bold">{{item.info}}</p>
          <p>付费时间：{{item.start}}</p>
          <p>到期时间：{{item.end}}</p>
        </div>
        <div class="flex33 te-right text-xl text-400">
          <span>{{item.money}}</span>
        </div>
      </div>
    </div>
    <div class="pad-top-big" v-if="infoArr.length === 0">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">暂无此消费记录</p>
    </div>
  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        infoArr: []
      }
    },
    mounted(){
     
    },
    onLoad() {
      this.initInfoFn();
    },
    onShareAppMessage: function (res) {
      return {
        title: '众享礼券',
        path: '/pages/index/main'
      }
    },
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_account_user_order,
          data: {},
          cb: _this.callBackInit
        };
        wx.getStorage({
          key: "zanTime",
          success: function (res) {
            _this.tempArr = JSON.parse(res.data) || {};
          }
        });
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.infoArr = o.data;
      }
    }
  }
</script>
