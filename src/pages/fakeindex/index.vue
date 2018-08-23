<template>
  <div>

    <div class="pad-top-xs">
      <div class="bg-white pad-sm">
        <div class="wid70 mar0A">
          <div class="flexBox ver-cen">
            <div class="flex25">
              <p class="b-b1" style="padding-top: 1px"></p>
            </div>
            <div class="flexAuto te-cen text-sm">
              <p>附近 <span class="text-danger">推荐</span> 商家</p>
            </div>
            <div class="flex25">
              <p class="b-b1" style="padding-top: 1px"></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="padding-bottom: 105rpx;">
      <div class="bg-white text-sm">

        <div class="pad-sm b-b1" v-for="(item,index) in storeArr" @click="toStore(item.id)" :key="index"
             :wx:key="index">
          <div class="flexBox">
            <div class="flex25">
              <img :src="item.logo" class="block" style="width: 170rpx;height: 170rpx;" @error="setDefImg(index)">
            </div>
            <div class="flexAuto">
              <div class="pad-left-sm">

                <div class="flexBox ver-cen">
                  <div class="flexAuto">
                    <p class="ell">{{item.name}}</p>
                  </div>
                  <div class="flexAuto te-right">
                    <p class="text-danger">
                      <img src="/static/img/hot.png" class="ver-mid" style="width: 36rpx;height: 36rpx;">
                      <span class="ver-mid pad-left-xs">人气 {{item.popularity || 0}}</span>
                    </p>
                  </div>
                </div>

                <div class="flexBox ver-cen pad-top-xs singleLine">
                  <div class="flexAuto">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=1">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=2">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=3">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=4">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate==5">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=1.1&&item.evaluate<2">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=2.1&&item.evaluate<3">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=3.1&&item.evaluate<4">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.evaluate>=4.1&&item.evaluate<5">
                    <span class="text-warning ver-mid pad-left-xs">{{item.evaluate}}分</span>
                  </div>
                  <div class="flexAuto te-right">
                    <img src="/static/img/position_gray.png" class="ver-mid" style="width: 36rpx;height: 36rpx;">
                    <span class="ver-mid pad-left-xs">{{item.disShow}}</span>
                  </div>
                </div>

                <p class="ell text-999 pad-top-xs">{{item.address}}</p>

                <div class="flexBox ver-cen pad-top-xs" v-if="item.typefrom>0">
                  <div class="flex8">
                    <p class="btn btn-danger btn-lit btn-radius" v-if="item.typefrom==1">金</p>
                    <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==2">折</p>
                    <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==3">通</p>
                  </div>
                  <div class="flexAuto">
                    <p class="pad-left-xs ell">{{item.quanname}}</p>
                  </div>
                  <!--<div class="flexAuto">
                    <p class="ell text-999">满5000以上可以可以可以可以可以</p>
                  </div>-->
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="te-cen" v-show="isLoading">
        <div class="pad-ver-xs bg-white">
          <img src="/static/img/reflash.png" class="ver-mid" style="height: 60rpx;width: 60rpx;"
               :animation="animationD">
          <span class="pad-left-sm ver-mid">加载更多...</span>
        </div>
      </div>

      <p class="pad-sm te-cen bg-white b-t1" v-if="isEmpty">已经到底了</p>

      <div class="te-cen pad-top-sm text-999 text-sm">
        <div>
          <img src="/static/img/comLogo.png" class="ver-mid" style="width: 70rpx;height: 70rpx;">
          <span class="pad-left-xs ver-mid">众享礼券</span>
        </div>
        <p class="pad-top-xs">厦门中企信科2技有限公司</p>
      </div>

    </div>

    <div class="fixBot">
      <div class="flexBox ver-cen te-cen pad-top-xs bg-white b-t1">
        <div class="flexAuto" @click="swTab(1)">
          <img src="/static/img/tabs/tab1.png" class="block mar0A" style="width: 55rpx;height: 55rpx;">
          <p class="text-xs">附近的券</p>
        </div>
        <div class="flexAuto" @click="swTab(2)">
          <img src="/static/img/tabs/tab4.png" class="block mar0A" style="width: 55rpx;height: 55rpx;">
          <p class="text-xs">资讯动态</p>
        </div>
        <div class="flexAuto" @click="swTab(3)">
          <img src="/static/img/tabs/tab2.png" class="block mar0A" style="width: 55rpx;height: 55rpx;">
          <p class="text-xs">我的券</p>
        </div>
        <div class="flexAuto" @click="swTab(4)">
          <img src="/static/img/tabs/tab3.png" class="block mar0A" style="width: 55rpx;height: 55rpx;">
          <p class="text-xs">个人中心</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import store from '../index/store'
  import Api from '../../../static/js/apis'

  export default {
    data() {
      return {
        curId: -1,
        curTab: 1,
        animation: {},
        animationD: '',
        rotateNum: 0,
        isLoading: true,
        imgArr: [],
        textArr: [],
        pos: {
          lo: 118.129281,
          la: 24.490659
        },
        storeArr: [],
        curPage: 1,
        isEmpty: false,
        cateArr: [],
        curCate: -1,
      }
    },
    onLoad(o) {
      let _this = this;
      console.log(o);
      _this.curId = o.id;
      _this.initInfoFn();
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        _this.initInfoFn();
      }
    },
    onUnload() {
      this.storeArr = [];
      this.curPage = 1;
      this.isEmpty = false;
    },
    mounted() {
      this.$nextTick(() => {
        this.initAnimat();
      })
    },
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_fakeindex_load,
          data: {
            id: _this.curId,
            longitude: store.state.tempObj.tempLola.longitude || _this.pos.lo,
            latitude: store.state.tempObj.tempLola.latitude || _this.pos.la,
            page: _this.curPage
          },
          cb: _this.callBackInit,
          noStatus: true
        };
        _this.isLoading = true;
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        switch (o.status) {
          case 1:
            let arr = o.data || [];
            for (let i = 0, len = arr.length; i < len; i++) {
              let num = arr[i].distance || 0;
              num = parseFloat(num).toFixed(2);
              num = (num > 1000) ? (num / 1000).toFixed(2) + 'km' : parseInt(num) + 'm';
              arr[i].disShow = num;
              _this.storeArr.push(arr[i])
            }
            _this.isEmpty = (arr.length === 0);
            _this.curAddress = o.address;
            break;
          default:
            _this.isEmpty = true;
            break;
        }
        _this.isLoading = false;
      },
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      initAnimat() {
        let _this = this;
        _this.animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'linear',
          delay: 0,
          transformOrigin: '50% 50% 0',
          success: function (res) {
            console.log(res)
          }
        });
        setInterval(() => {
          _this.rotateNum++;
          _this.animation.rotate(180 * _this.rotateNum).step();
          _this.animationD = _this.animation.export();
          if (_this.rotateNum >= Number.MAX_VALUE) {
            _this.rotateNum = 0;
          }
        }, 500)
      },
      setDefImg(index) {
        this.storeArr[index].src = store.state.defStore;
      },
      swTab(tab) {
        tab = parseInt(tab);
        let url = '';
        switch (tab) {
          case 1:
            url = '/pages/index/main';
            break;
          case 2:
            url = '/pages/News/main';
            break;
          case 3:
            url = '/pages/myCoupon/main';
            break;
          case 4:
            url = '/pages/account/main';
            break;
          default:
            break;
        }
        wx.switchTab({
          url: url
        });
      }
    }
  }
</script>
