<template>
  <div>
    <div class="pad-top-xs" v-for="(item,index) in infoArr" :key="index" :wx:key="index">
      <div class="bg-white pad-top-xs pad-hov-sm pad-bottom-xs flexBox ver-cen">
        <div class="flexAuto">
          <p>{{item.infoTypeTitle}}</p>
          <p>付费时间：{{item.payTime}}</p>
          <p>到期时间：{{item.endTime}}</p>
        </div>
        <div class="flex33 te-right text-xl text-400">
          <span>{{item.price}}</span>
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
        infoArr: [{
          infoTypeTitle: "季度会员",
          infoType: 1,
          payTime: "2018-12-04 17:51:11",
          endTime: "2018-12-04 17:51:11",
          price: "9.9",
        }, {
          infoTypeTitle: "年度会员",
          infoType: 2,
          payTime: "2018-12-04 17:51:11",
          endTime: "2018-12-04 17:51:11",
          price: "15.9",
        }]
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
          url: Api.url_user_news_load,
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
        for (let i = 0, len = o.data.length; i < len; i++) {
          _this.infoArr.push(o.data[i]);
        }
        _this.isEmpty = (o.data.length < 10);
        let arr = _this.infoArr.slice(0);
        for (let i = 0, len = arr.length; i < len; i++) {
          if (_this.tempArr[arr[i].id]) {
            let old = new Date();
            old.setTime(_this.tempArr[arr[i].id].time);
            let now = new Date();
            let oldTime = old.getFullYear() + "-" + (old.getMonth() + 1) + "-" + old.getDate();
            let nowTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
            arr[i].hasZaned = (oldTime == nowTime);
          }
        }
        _this.infoArr = arr.slice(0);
        wx.stopPullDownRefresh();
      }
    }
  }
</script>
