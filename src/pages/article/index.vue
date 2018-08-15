<template>
  <div>

    <div class="bg-white">

      <p class="pad-sm text-Bold text-lg">{{artInfo.title}}</p>

      <div class="pad-hov-sm pad-ver-xs text-999 text-sm">
        <span class="text-secondary">{{artInfo.author}}</span>
        <!--<span class="articleBadge">原创</span>-->
        <span class="pad-left-xs">{{artInfo.showTime}}</span>
        <!--<span class="pad-left-xs">无言组</span>-->

      </div>

      <div class="pad-hov-sm pad-top-xs">

        <!--<img :src="artInfo.image" class="block" mode="widthFix">-->

        <!--<div class="contentShow">
          {{artInfo.content}}
        </div>-->

        <div v-html="artInfo.content"></div>

      </div>

      <div class="flexBox pad-sm bg-white text-999">
        <div class="flexAuto">
          <p>阅读 {{artInfo.browsenum}}</p>
        </div>
        <div class="flexAuto">
          <p @click="awesomeFn">
            <img src="/static/img/art/agree.png" class="ver-mid" style="width: 28rpx;height: 28rpx;" v-if="!awesome">
            <img src="/static/img/art/agree_1.png" class="ver-mid" style="width: 28rpx;height: 28rpx;" v-if="awesome">
            <span class="ver-mid pad-left-xs">{{artInfo.fabulousnum}}</span>
          </p>
        </div>
        <div class="flexAuto te-right">
          <p>投诉</p>
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
        awesome: false,
        curId: -1,
        artInfo: ''
      }
    },
    onLoad(o) {
      this.curId = o.id;
      this.artInfo = '';
    },
    mounted() {
      this.$nextTick(() => {
        this.initInfoFn();
      })
    },
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_art_detail,
          data: {id: _this.curId},
          cb: _this.callBackInit
        };
        store.commit('getInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.artInfo = o.data;

        if (_this.artInfo.url) {
          store.state.tempObj.tempUrl = _this.artInfo.url;
          wx.redirectTo({
            url: '/pages/webVPage/main'
          });
          return;
        }

        wx.setNavigationBarTitle({
          title: _this.artInfo.title
        });
        let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        _this.artInfo.content = _this.artInfo.content.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
          return arrEntities[t];
        });
        _this.artInfo.content = _this.artInfo.content.replace(new RegExp(/<img /g), "<img style='width:100%;display:block' ");

        _this.artInfo.showTime = _this.forMateTime(_this.artInfo.time)
      },
      forMateTime(t) {
        let d = new Date(t * 1000);
        let m = ((d.getMonth() + 1) < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        let day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
        let h = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
        let min = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
        let sec = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
        return d.getFullYear() + '-' + m + '-' + day /*+ ' ' + h + ':' + min + ':' + sec*/;
      },
      awesomeFn() {
        let _this = this;
        _this.awesome = !_this.awesome;
      }
    }
  }
</script>
