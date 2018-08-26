<template>
  <div>

    <div class="pad-top-sm" v-for="(item,index) in infoArr" :key="index" :wx:key="index">
      <div class="bg-white pad-top-sm pad-hov-sm pad-bottom-xs">

        <div class="flexBox ver-cen">
          <div class="flex15">
            <img :src="item.logo" class="block round" style="height: 100rpx;width: 100rpx;">
          </div>
          <div class="flexAuto">
            <div class="pad-left-sm">
              <p class="text-sm">{{item.shopname}}</p>
              <p class="text-sm text-999 pad-top-xs">{{item.time}}</p>
            </div>
          </div>
          <div class="flex8">
            <p class="btn btn-danger btn-lit btn-radius" v-if="item.typefrom==1" @click="toStore(item.shopid)">券</p>
            <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==2" @click="toStore(item.shopid)">折</p>
            <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==3" @click="toStore(item.shopid)">通</p>
          </div>
        </div>

        <div class="pad-top-xs">
          <p class="text-lg text-333">{{item.content}}</p>
        </div>

        <div class="flexBox changeLine pad-top-xs b-b1" @click="seeImgFn(item.inforimg)">

          <div class="flex33 pad-bottom-xs" v-for="(item2,index2) in item.inforimg" :key="index2" :wx:key="index2"
               v-if="item.onlyone==2">
            <div class="pad-right-xs">
              <img :src="item2.imgurl" class="block" style="width: 210rpx;height: 210rpx;">
            </div>
          </div>

          <div class="flexAuto pad-bottom-xs" v-for="(item2,index2) in item.inforimg" :key="index2" :wx:key="index2"
               v-if="item.onlyone==1">
            <div>
              <img :src="item2.imgurl" class="block" mode="widthFix" style="max-height: 694rpx;">
            </div>
          </div>

        </div>

        <div class="flexBox ver-cen pad-top-xs te-cen">
          <div class="flexAuto" @click="openLocal(item.latitude,item.longitude,item.shopname)">
            <img src="/static/img/news/newsicon3.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
            <span class="ver-mid inb pad-left-xs"
                  style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 150rpx;">{{item.address}}</span>
          </div>

          <div class="flexAuto">
            <img src="/static/img/news/newsicon1.png" class="ver-mid" style="width: 35rpx;height: 35rpx;">
            <span class="ver-mid pad-left-xs">{{item.browsenum}}</span>
          </div>

          <div class="flexAuto" v-if="!item.hasZaned" @click="zanFn(item.id)">
            <img src="/static/img/news/newsicon2.png" class="ver-mid" style="width: 35rpx;height: 35rpx;">
            <span class="ver-mid pad-left-xs">{{item.fabulous}}</span>
          </div>
          <div class="flexAuto" v-if="item.hasZaned">
            <img src="/static/img/news/hasZan.png" class="ver-mid" style="width: 35rpx;height: 35rpx;">
            <span class="ver-mid pad-left-xs" style="color: #ff071f">{{item.fabulous}}</span>
          </div>

        </div>

      </div>
    </div>

    <p class="pad-sm bg-white b-t1 te-cen" v-if="isEmpty">已经到底了</p>

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
        infoArr: [],
        isEmpty: false,
        isSeeImg: false,
        hasZan: false,
        tempArr: {}
      }
    },
    mounted(){
      console.log("替换store",JSON.stringify(store.state),JSON.stringify(getApp().globalData.store.state));
      if(Number(store.state.session_key)===1||Number(store.state.openId)===1){
        store.replaceState(JSON.parse(JSON.stringify(getApp().globalData.store.state)));
      }
      let _this = this;
      _this.initInfoFn();
    },
    onLoad() {

    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.initInfoFn();
      }
    },
    onPullDownRefresh() {
      let _this = this;
      _this.isSeeImg = false;
      _this.infoArr = [];
      _this.curPage = 1;
      _this.isEmpty = false;
      _this.initInfoFn();
    },
    onShareAppMessage: function (res) {
      return {
        title: '众享礼券',
        path: '/pages/News/main'
      }
    },
    methods: {
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_user_news_load,
          data: {page: _this.curPage},
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
      },
      openLocal(la, lo, name) {
        wx.openLocation({
          latitude: parseFloat(la),
          longitude: parseFloat(lo),
          scale: 28,
          name: name
        })
      },
      seeImgFn(arr) {
        let _this = this;
        _this.isSeeImg = true;
        let array = [];
        for (let i = 0, len = arr.length; i < len; i++) {
          array.push(arr[i].imgurl);
        }
        wx.previewImage({
          current: arr[0].imgurl, // 当前显示图片的http链接
          urls: array // 需要预览的图片http链接列表
        })
      },
      zanFn(id) {
        let _this = this;
        let o = {
          url: Api.url_news_zan,
          data: {id: id},
          cb: _this.callBackZan
        };
        _this.curId = id;
        let arr = _this.infoArr.slice(0);
        for (let i = 0, len = arr.length; i < len; i++) {
          if (id == arr[i].id) {
            arr[i].fabulous++;
            arr[i].hasZaned = true;
            break;
          }
        }
        _this.infoArr = arr.slice(0);
        store.commit('reqInfo', o);
      },
      callBackZan(o) {
        let _this = this;
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1000
        });

        _this.tempArr[_this.curId] = {time: new Date().valueOf()};

        wx.setStorage({
          key: "zanTime",
          data: JSON.stringify(_this.tempArr)
        })
      }
    }
  }
</script>
