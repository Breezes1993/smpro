<template>
  <div>

    <div class="pad-sm">
      <div class="bg-white pad-sm">
        <div class="flexBox te-cen">
          <div class="flexAuto b-r1">
            <p class="text-999">今日核销</p>
            <p class="pad-top-xs text-secondary text-lgx">{{show1}}</p>
          </div>
          <div class="flexAuto b-r1">
            <p class="text-999">昨日核销</p>
            <p class="pad-top-xs text-secondary text-lgx">{{show2}}</p>
          </div>
          <div class="flexAuto">
            <p class="text-999">总核销</p>
            <p class="pad-top-xs text-secondary text-lgx">{{show3}}</p>
          </div>
        </div>
      </div>
    </div>

    <p class="pad-sm text-999">最新核销</p>

    <div class="bg-white">

      <div class="pad-sm b-b1" v-for="(item,index) in veryArr" :key="index" :wx:key="index">

        <div class="flexBox ver-cen">
          <div class="flex25">
            <img :src="item.wechatimg" class="block mar0A round" style="width: 122rpx;height: 122rpx;">
          </div>
          <div class="flexAuto">

            <p class="pad-right-sm">使用人：{{item.name}}</p>

            <p class="text-lg text-Bold">{{item.ticketname}}</p>

            <p class="text-xs text-999">{{item.usertime}}</p>

          </div>
          <div class="flex25 te-cen">
            <p class="text-warning">已核销</p>
          </div>

        </div>

      </div>


    </div>

    <div class="pad-top-big" v-if="veryArr.length==0">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">暂无核销记录</p>
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
        curPage: 1,
        isEmpty: false,
        veryArr: [],
        show1: 0,
        show2: 0,
        show3: 0,
      }
    },
    onLoad(o) {
      this.initInfoFn();
    },
    onUnload() {
      let _this = this;
      _this.veryArr = [];
      _this.curPage = 1;
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.initInfoFn();
      }
    },
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_verify_history,
          data: {page: _this.curPage},
          cb: _this.callBackInit,
          noStatus: true
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        if (o.status == 1) {
          _this.show1 = o.todaynum;
          _this.show2 = o.yesterdaynum;
          _this.show3 = o.allnum;

          for (let i = 0, len = o.data.length; i < len; i++) {
            _this.veryArr.push(o.data[i]);
          }

          _this.isEmpty = (o.data.length == 0);
        }
      }
    }
  }
</script>
