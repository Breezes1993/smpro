<template>
  <div>

    <div class="bg-white pad-sm">
      <div class="wid70 mar0A">
        <div class="flexBox ver-cen">
          <div class="flex25">
            <p class="b-b1" style="padding-top: 1px"></p>
          </div>
          <div class="flexAuto te-cen text-sm">
            <p>评论</p>
          </div>
          <div class="flex25">
            <p class="b-b1" style="padding-top: 1px"></p>
          </div>
        </div>
      </div>
    </div>

    <div>

      <div class="pad-sm bg-white b-t1" v-for="(item,index) in commArr" :key="index" :wx:key="index">
        <div class="flexBox">

          <div class="flex15">
            <img :src="item.wechatimg" class="block" style="width: 100rpx;height: 100rpx;">
          </div>

          <div class="flexAuto">
            <div class="pad-left-sm">

              <p>
                <span class="text-333">{{item.name}}</span>
                <span class="text-xs pull-right text-999">{{item.time}}</span>
              </p>

              <div>
                <div class="pad-ver-xs">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score>=1" @click="item.score=1">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score>=2" @click="item.score=2">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score>=3" @click="item.score=3">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score>=4" @click="item.score=4">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score==5" @click="item.score=5">

                  <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score==0" @click="item.score=1">
                  <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score<2" @click="item.score=2">
                  <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score<3" @click="item.score=3">
                  <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score<4" @click="item.score=4">
                  <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.score<5" @click="item.score=5">
                  <span class="text-warning ver-mid pad-left-xs">{{item.score}}分</span>
                </div>
              </div>

              <p>{{item.content}}</p>

              <div class="flexBox changeLine pad-top-xs" @click="seeImgFn(item.evaluateimg)">

                <div class="flex33 pad-bottom-xs" v-for="(item2,index2) in item.evaluateimg" :key="index2"
                     :wx:key="index2">
                  <div class="pad-right-xs">
                    <img :src="item2" class="block" style="width: 170rpx;height: 170rpx;">
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      <p class="pad-sm bg-white b-t1 te-cen" v-if="isEmpty">已经到底了</p>

    </div>


  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        curRate: 3,
        curPage: 1,
        curId: -1,
        commArr: [],
        isEmpty: false
      }
    },
    onLoad(o) {
      this.curId = o.id || -1;
      this.initInfoFn();
    },
    onUnload() {
      this.commArr = [];
      this.curId = -1;
      this.curPage = 1;
      this.isEmpty = false;
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.initInfoFn();
      }
    },
    methods: {
      seeImgFn(arr) {
        wx.previewImage({
          current: arr[0], // 当前显示图片的http链接
          urls: arr // 需要预览的图片http链接列表
        })
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_store_load_common,
          data: {
            shopid: _this.curId,
            page: _this.curPage,
          },
          cb: _this.callBackInit,
          mask: true,
          noStatus: true
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        for (let i = 0, len = o.data.length; i < len; i++) {
          _this.commArr.push(o.data[i]);
        }
        if (_this.commArr.length > 0) {
          _this.isEmpty = (o.data.length < 5);
        }
      }
    }
  }
</script>
