<template>
  <scroll-view scroll-y="true"  :style="'height: '+screenHeight+'px'" enable-back-to-top="true" lower-threshold="100" @scrolltolower="scrolltolower">

    
    <div class="pad-sm bg-white">
      <div class="flexBox text-sm">
        <div class="flexBox flexAuto flex15 ver-cen">
          <div class="flexAuto" @click="toSelectCity(mCity)">
            <p>{{mCity}}</p>
          </div>
          <div class="flex4">
            <img src="/static/img/icon_down.png" class="block" style="width: 19rpx;height: 19rpx;">
          </div>
          <div class="flex4">
            <img src="/static/img/allow_r_white.png" class="block" style="width: 19rpx;height: 19rpx;">
          </div>
        </div>
        <div class="flexAuto">
          <div class="pad-right-sm">
            <div class="bg-a5 rad500 pad-ver-xs pad-hov-xs" @click="openLocationFn">
              <div class="flexBox ver-cen">
                <div class="flex8">
                  <img src="/static/img/position.png" class="block" style="width: 40rpx;height: 40rpx;">
                </div>
                <div class="flexAuto">
                  <p class="ell te-cen text-white">{{curAddress}}</p>
                </div>
                <div class="flex8">
                  <img src="/static/img/allow_r_white.png" class="block" style="width: 38rpx;height: 38rpx;">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flexAuto">
          <p class="bg-ed pad-ver-xs rad500 pad-left-sm" @click="toSearch">
            <icon type="search" size="19" class="ver-mid"></icon>
            <span class="ver-mid text-999 pad-hov-xs">搜索</span>
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <swiper indicator-dots autoplay="true" interval="3000" duration="300" style="height: 360rpx;">
        <block v-for="(item,index) in imgArr" :key="index" :wx:key="index">
          <swiper-item>
            <div class="pad-hov-xs">
              <img :src="item.image" class="block" style="border-radius: 12px;" mode="widthFix"
                   @click="bannerJump(item.type,item.url)">
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="pad-sm bg-white">
      <div class="flexBox te-cen changeLine">
        <div class="flex25 pad-bottom-xs" v-for="(item,index) in cateArr" :key="index" :wx:key="index"
             @click="changeCate(item.id,item.name)" :class="{cantClick:item.id==curCate}">
          <img :src="item.image" class="block mar0A" style="height: 100rpx;width: 100rpx;">
          <p class="pad-top-xs">{{item.name}}</p>
        </div>
        <!--<div class="flexAuto">
          <img src="/static/img/btn1.png" class="block mar0A" style="height: 100rpx;width: 100rpx;">
          <p class="pad-top-xs">超市美食</p>
        </div>
        <div class="flexAuto">
          <img src="/static/img/btn1.png" class="block mar0A" style="height: 100rpx;width: 100rpx;">
          <p class="pad-top-xs">生活服务</p>
        </div>
        <div class="flexAuto">
          <img src="/static/img/btn1.png" class="block mar0A" style="height: 100rpx;width: 100rpx;">
          <p class="pad-top-xs">时尚购物</p>
        </div>-->
      </div>
    </div>

    <div class="pad-ver-sm">
      <div class="bg-white pad-hov-xs pad-ver-xs">
        <div class="flexBox ver-cen">
          <div class="flex8">
            <img src="/static/img/notice.png" class="block" style="width: 50rpx;height: 50rpx;">
          </div>
          <div class="flexAuto">

            <swiper autoplay="true" interval="3000" duration="300" vertical style="height: 42rpx;">
              <block v-for="(item,index) in textArr" :key="index" :wx:key="index">
                <swiper-item>
                  <p class="ell text-sm text-333" @click="toStore(item.id)">• 恭喜【<span
                    class="text-danger"> {{item.name}}</span> 】入驻</p>
                </swiper-item>
              </block>
            </swiper>

          </div>
          <div class="flex25">
            <p class="btn btn-danger block btn-radius btn-xs" @click="toUpdate" v-if="hasO==3">我要修改</p>
            <p class="btn btn-danger block btn-radius btn-xs" @click="toJoin" v-if="hasO==2">我要入驻</p>
            <p class="btn btn-danger block btn-radius btn-xs" v-if="hasO==1">已入驻</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white pad-sm">
      <div class="wid70 mar0A">
        <div class="flexBox ver-cen">
          <div class="flex25">
            <p class="b-b1" style="padding-top: 1px"></p>
          </div>
          <div class="flexAuto te-cen text-sm">
            <p>附近 <span class="text-danger">{{showCate}}</span> 商家</p>
          </div>
          <div class="flex25">
            <p class="b-b1" style="padding-top: 1px"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="pad-hov-sm pad-bottom-xs b-b1 bg-white">
      <div class="flexBox ver-cen te-cen text-sm">
        <div class="flexAuto b-r1" @click="changeTabFn(1)" :class="{cantClick:curTab==1}">
          <p class="pad-ver-xs" :class="{'text-Bolder':curTab==1}">离我最近</p>
        </div>
        <div class="flexAuto b-r1" @click="changeTabFn(2)" :class="{cantClick:curTab==2}">
          <p class="pad-ver-xs" :class="{'text-Bolder':curTab==2}">有券商户</p>
        </div>
        <div class="flexAuto" @click="changeTabFn(3)" :class="{cantClick:curTab==3}">
          <p class="pad-ver-xs" :class="{'text-Bolder':curTab==3}">火爆排名</p>
        </div>
      </div>
    </div>

    <div class="pad-bottom-sm">
      <div class="bg-white text-sm">

        <div class="pad-sm b-b1" v-for="(item,index) in storeArr" @click="toStore(item.id)" :key="index"
             :wx:key="index"><!-- v-show="item.category==curCate"-->
          <div class="flexBox">
            <div class="flex25">
              <div class="posReal">
                <!-- <img :src="item.logo" class="block" style="width: 170rpx;height: 170rpx;" @error="setDefImg(index)"> -->
                <img :src="item.logo" class="block" style="width: 170rpx;height: 170rpx;" @error="setDefImg(index)">

                <img src="/static/img/ossmHead.png" style="width: 150rpx;height: 150rpx;" class="ossmhead block" v-if="item.top>0">
              </div>
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
                         v-else-if="item.evaluate>=1.1&&item.evaluate<2">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-else-if="item.evaluate>=2.1&&item.evaluate<3">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-else-if="item.evaluate>=3.1&&item.evaluate<4">
                    <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-else-if="item.evaluate>=4.1&&item.evaluate<5">
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
                    <p class="btn btn-waring btn-lit btn-radius" v-else-if="item.typefrom==2">折</p>
                    <p class="btn btn-waring btn-lit btn-radius" v-else-if="item.typefrom==3">通</p>
                  </div>
                  <div class="flexAuto">
                    <p class="pad-left-xs ell">{{item.quanname}}</p>
                  </div>
                  <div class="flexAuto">
                    <p class="ell text-999">{{item.describe || ''}}</p>
                  </div>
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
        <p class="pad-top-xs">厦门中企信科技有限公司</p>
      </div>

    </div>
   
    <div class="drawer_screen" bindtap="powerDrawer" data-statu="close" v-show="showModalStatus"></div>

    <div :animation="animationData" class="drawer_box" v-show="showModalStatus">
      <div class="drawer_title">提示</div>
      <div class="drawer_content">
        <div class="top grid content">
          <label class="">请先获取用户信息！</label>
        </div>
      </div>
      <div class="btn_ok" @click="powerDrawer('close')" >
        <button @click="canUse" @getuserinfo='getUserInfo' open-type='getUserInfo'>确定</button>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import store from './store'
  import Api from '../../../static/js/apis'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        curTab: 1,
        curRate: 3.6,
        curAddress: '当前地址',
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
        storeArr2: [],
        curPage: 1,
        isEmpty: false,
        cateArr: [],
        curCate: -1,
        showCate: '',
        hasO: 1,
        verifyCode: -1,
        showModalStatus: false,
        screenHeight: 800,
        mCity: '厦门'
      }
    },
    onShareAppMessage: function (res) {
      return {
        title: '众享礼券',
        path: '/pages/index/main'
      }
    },
    created() {
      //console.log("store",store)
      let _this = this;
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          _this.pos.la = res.latitude;
          _this.pos.lo = res.longitude;
          store.state.tempObj.tempLola.latitude = res.latitude;
          store.state.tempObj.tempLola.longitude = res.longitude;
        }
      });
      _this.curPage = 1;
      // return;
      let obj = {that:this,cb:_this.initCateFn}
      //console.log("先执行这里吗？",obj)
      store.commit('getUserInfoFn', obj);
    },
    onLoad(o) {
      let _this = this;
      var sysInfo = wx.getSystemInfoSync();
      this.screenHeight = sysInfo.screenHeight;
      //console.log("首页",o);
      //console.log("_this",_this);
      _this.verifyCode = o.scene || -1;
      getApp().globalData.store = store;
      wx.navigateTo({
        url: "/pages/index2/main"
      })
    },
    onPageScroll(res){
      // console.log("onPageScroll",res)
    },
    onReachBottom() {
      return;
      console.log('----------------------');
      console.log('onReachBottom');
      let _this = this;
      //console.log("进入onReachBottom",_this.isEmpty+"",_this.isLoading+"")
      if (!_this.isEmpty&&!_this.isLoading) {
        console.log('进入');
        _this.isLoading = true;
        //console.log("执行")
        _this.curPage++;
        _this.initInfoFn();
      }
      console.log('onReachBottom');
    },
    mounted() {
      this.$nextTick(() => {
        this.initJoinNews();
        this.initAnimat();
      })
    },
    methods: {
      scrolltolower(){
        console.log('-------scroll--------');
        console.log('onReachBottom');
        let _this = this;
        //console.log("进入onReachBottom",_this.isEmpty+"",_this.isLoading+"")
        if (!_this.isEmpty&&!_this.isLoading) {
          console.log('进入');
          _this.isLoading = true;
          //console.log("执行")
          _this.curPage++;
          _this.initInfoFn();
        }
        console.log('onReachBottom');
      },
      initInfoFn() {
        console.log('initInfoFn');
        //console.log("initInfoFn");
        let _this = this;
        _this.hasO = store.state.hasOpened;
        let o = {
          url: Api.url_index_near,
          data: {
            longitude: _this.pos.lo,
            latitude: _this.pos.la,
            page: _this.curPage,
            type: _this.curCate,
            order: _this.curTab
          },
          cb: _this.callBackInit,
          noStatus: true
        };
        setTimeout(function(){
          store.commit('reqInfo', o);
        },500)
        
        console.log('initInfoFn');
      },
      callBackInit(o) {
        console.log('callBackInit');
        let _this = this;
        switch (o.status) {
          case 1:
            let arr = o.data || [];
            for (let i = 0, len = arr.length; i < len; i++) {
              let num = arr[i].distance || 0;
              num = parseFloat(num).toFixed(2);
              num = (num > 1000) ? (num / 1000).toFixed(2) + 'km' : parseInt(num) + 'm';
              arr[i].disShow = num;
              delete arr[i].distance;
              delete arr[i].latitude;
              delete arr[i].longitude;
              delete arr[i].category;
              delete arr[i].describe;
              // delete arr[i].address;
              // delete arr[i].disShow;
              // delete arr[i].evaluate;
              // delete arr[i].id;
              // delete arr[i].logo;
              // delete arr[i].name;
              // delete arr[i].popularity;
              // delete arr[i].quanname;
              // delete arr[i].telphone;
              // delete arr[i].top;
              // delete arr[i].typefrom;
              // _this.storeArr.push(JSON.parse(JSON.stringify(arr[i])));
            }
            // _this.storeArr.splice(_this.storeArr.length,0,...arr);
            // _this.storeArr = JSON.parse(JSON.stringify(_this.storeArr));
            _this.storeArr = [..._this.storeArr,...arr];
            _this.isEmpty = (arr.length === 0);
            _this.curAddress = o.address;
            break;
          default:
            _this.isEmpty = true;
            break;
        }
        _this.isLoading = false;
        console.log('callBackInit');
      },
      initCateFn() {
        //console.log("initCateFn");
        let _this = this;
        let o = {
          url: Api.url_index_cate,
          data: {},
          cb: _this.callBackCate
        };
        store.commit('getInfo', o);
      },
      callBackCate(o) {
        //console.log("callBackCate",o);
        let _this = this;
        _this.cateArr = o.data;
        if (o.data.length > 0) {
          _this.curCate = o.data[0].id;
          _this.showCate = o.data[0].name;
        }
        return _this.initBannerFn();
      },
      initBannerFn() {
        //console.log("initBannerFn");
        let _this = this;
        let o = {
          url: Api.url_index_banner,
          data: {},
          cb: _this.callBackBan
        };
        store.commit('getInfo', o);
      },
      callBackBan(o) {
        //console.log("callBackBan");
        let _this = this;
        _this.imgArr = o.data;
        /*if (_this.verifyCode == -1) {
          return _this.initInfoFn();
        } else {
          return _this.sendVerify();
        }*/
        return _this.initInfoFn();
      },
      changeCate(cate, name) {
        let _this = this;
        _this.curCate = cate;
        _this.curPage = 1;
        _this.isEmpty = false;
        _this.storeArr = [];
        _this.showCate = name;
        _this.initInfoFn();
      },
      changeTabFn(tab) {
        let _this = this;
        _this.curTab = tab;
        _this.curPage = 1;
        _this.isEmpty = false;
        _this.storeArr = []
        _this.initInfoFn();
      },
      initJoinNews() {
        let _this = this;
        let o = {
          url: Api.url_index_join_news,
          data: {},
          cb: _this.callBackJoin
        };
        store.commit('getInfo', o)
      },
      callBackJoin(o) {
        this.textArr = o.data;
      },
      openLocationFn() {
        let _this = this;
        wx.chooseLocation({
          success: function (res) {
            _this.curAddress = res.name;
            _this.pos.la = res.latitude;
            _this.pos.lo = res.longitude;
            _this.curPage = 1;
            _this.storeArr = [];
            _this.isEmpty = false;
            _this.initInfoFn();
          }
        })
      },
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      toSelectCity(mCity) {
        wx.navigateTo({
          url: "/pages/selectCity/main" + '?city=' + mCity
        })
      },
      bannerJump(type, id) {
        let ty = parseInt(type);
        switch (ty) {
          case 1:
            if (id) {
              wx.navigateTo({
                url: '/pages/storeInfo/main' + '?id=' + id
              });
            }
            break;
          case 2:
            if (id) {
              store.state.tempObj.tempUrl = id;
              wx.navigateTo({
                url: '/pages/webVPage/main'
              });
            }
            break;
          default:
            break;
        }

      },
      toJoin() {
        wx.navigateTo({
          url: '/pages/join/main'
        })
      },
      toUpdate() {
        wx.navigateTo({
          url: '/pages/join/main' + '?type=edit' + '&id=' + store.state.shopid
        });
      },
      toSearch() {
        let _this = this;
        store.state.tempObj.tempLola.longitude = _this.pos.lo;
        store.state.tempObj.tempLola.latitude = _this.pos.la;
        wx.navigateTo({
          url: '/pages/search/main'
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
            //console.log(res)
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
      /*sendVerify() {
        let _this = this;
        let o = {
          url: Api.url_verify_bestuff,
          data: {verify: _this.verifyCode},
          cb: _this.callBackVerify,
          mask: true,
          noStatus: true
        };
        store.commit('reqInfo', o);
      },
      callBackVerify(o) {
        let _this = this;
        wx.showModal({
          title: '提示',
          content: o.msg,
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        });
        return _this.initInfoFn();
      }*/
      powerDrawer: function(currentStatu) {
        //console.log("12312")
        this.util(currentStatu)
      },
      util: function(currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({
          duration: 200, //动画时长
          timingFunction: "linear", //线性
          delay: 0 //0则不延迟
        });

        // 第2步：这个动画实例赋给当前的动画实例
        this.animation = animation;

        // 第3步：执行第一组动画
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存

        this.animationData = animation.export();

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function() {
          // 执行第二组动画
          animation.opacity(1).rotateX(0).step();
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
          this.animationData = animation

          //关闭
          if (currentStatu == "close") {
              this.showModalStatus = false;
          }
        }.bind(this), 0)

        // 显示
        if (currentStatu == "open") {
          this.setData({
            showModalStatus: true
          });
        }
      },
      getUserInfo(e){
        let obj = {
          e: e,
          that: this,
          cb: this.initCateFn
        }
        store.commit("getUserInfoBtn",obj);
      },
      canUse(){
        if(wx.canIUse('button.open-type.getUserInfo')){
          // 用户版本可用
        }else{
          wx.showModal({
            title: '提示',
            content: '请先升级版本！',
            showCancel: false
          });
        }
      }
    }
  }
</script>
