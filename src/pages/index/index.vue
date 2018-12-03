<template>
  <view>
    <custom-index :hasO="hasO" />

    <div class="drawer_screen"  v-show="showModalStatus"></div>
<!-- @click="powerDrawer('close')" -->
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
  </view>
</template>

<script>
  import store from './store'
  // import Api from '../../../static/js/apis'
  export default {
    data() {
      return {
        hasO: 2,
        // curTab: 1,
        // curRate: 3.6,
        // curAddress: '当前地址',
        // animation: {},
        // animationD: '',
        // rotateNum: 0,
        // isLoading: true,
        // imgArr: [],
        // textArr: [],
        // pos: {
        //   lo: 118.129281,
        //   la: 24.490659
        // },
        // storeArr: [],
        // storeArr2: [],
        // curPage: 1,
        // isEmpty: false,
        // cateArr: [],
        // curCate: -1,
        // showCate: '',
        // hasO: 2,
        // verifyCode: -1,
        showModalStatus: false,
        // screenHeight: 800,
        // mCity: '厦门'
      }
    },
    onShareAppMessage: function (res) {
      return {
        title: '众享礼券',
        path: '/pages/index/main'
      }
    },
    onShow: function() {
      console.log("parentOnshow");
      this.hasO = wx.getStorageSync("hasOpened") || store.state.hasOpened;
    },
    created() {
      //console.log("store",store)
      let _this = this;
      // wx.getLocation({
      //   type: 'gcj02',
      //   success: function (res) {
      //     _this.pos.la = res.latitude;
      //     _this.pos.lo = res.longitude;
      //     store.state.tempObj.tempLola.latitude = res.latitude;
      //     store.state.tempObj.tempLola.longitude = res.longitude;
      //   }
      // });
      // _this.curPage = 1;
      // // return;
      let obj = {that:this,cb:(res) => {
        _this.hasO = res.data.relation;
      }}
      store.commit('getUserInfoFn', obj);
    },
    // onLoad(o) {
      // let _this = this;
      // var sysInfo = wx.getSystemInfoSync();
      // this.screenHeight = sysInfo.screenHeight;
      // //console.log("首页",o);
      // //console.log("_this",_this);
      // _this.verifyCode = o.scene || -1;
      // getApp().globalData.store = store;
    // },
    // onPageScroll(res){
      // console.log("onPageScroll",res)
    // },
    // onReachBottom() {
      // return;
      // console.log('----------------------');
      // console.log('onReachBottom');
      // let _this = this;
      // //console.log("进入onReachBottom",_this.isEmpty+"",_this.isLoading+"")
      // if (!_this.isEmpty&&!_this.isLoading) {
      //   console.log('进入');
      //   _this.isLoading = true;
      //   //console.log("执行")
      //   _this.curPage++;
      //   _this.initInfoFn();
      // }
      // console.log('onReachBottom');
    // },
    // mounted() {
      // this.$nextTick(() => {
      //   this.initJoinNews();
      //   this.initAnimat();
      // })
    // },
    methods: {
    //   scrolltolower(){
    //     console.log('-------scroll--------');
    //     console.log('onReachBottom');
    //     let _this = this;
    //     //console.log("进入onReachBottom",_this.isEmpty+"",_this.isLoading+"")
    //     if (!_this.isEmpty&&!_this.isLoading) {
    //       console.log('进入');
    //       _this.isLoading = true;
    //       //console.log("执行")
    //       _this.curPage++;
    //       _this.initInfoFn();
    //     }
    //     console.log('onReachBottom');
    //   },
    //   initInfoFn() {
    //     console.log('initInfoFn');
    //     //console.log("initInfoFn");
    //     let _this = this;
    //     _this.hasO = wx.setStorageSync("hasOpened") || store.state.hasOpened;
    //     let o = {
    //       url: Api.url_index_near,
    //       data: {
    //         longitude: _this.pos.lo,
    //         latitude: _this.pos.la,
    //         page: _this.curPage,
    //         type: _this.curCate,
    //         order: _this.curTab
    //       },
    //       cb: _this.callBackInit,
    //       noStatus: true
    //     };
    //     setTimeout(function(){
    //       store.commit('reqInfo', o);
    //     },500)
        
    //     console.log('initInfoFn');
    //   },
    //   callBackInit(o) {
    //     console.log('callBackInit');
    //     let _this = this;
    //     switch (o.status) {
    //       case 1:
    //         let arr = o.data || [];
    //         for (let i = 0, len = arr.length; i < len; i++) {
    //           let num = arr[i].distance || 0;
    //           num = parseFloat(num).toFixed(2);
    //           num = (num > 1000) ? (num / 1000).toFixed(2) + 'km' : parseInt(num) + 'm';
    //           arr[i].disShow = num;
    //           delete arr[i].distance;
    //           delete arr[i].latitude;
    //           delete arr[i].longitude;
    //           delete arr[i].category;
    //           delete arr[i].describe;
    //           // delete arr[i].address;
    //           // delete arr[i].disShow;
    //           // delete arr[i].evaluate;
    //           // delete arr[i].id;
    //           // delete arr[i].logo;
    //           // delete arr[i].name;
    //           // delete arr[i].popularity;
    //           // delete arr[i].quanname;
    //           // delete arr[i].telphone;
    //           // delete arr[i].top;
    //           // delete arr[i].typefrom;
    //           // _this.storeArr.push(JSON.parse(JSON.stringify(arr[i])));
    //         }
    //         // _this.storeArr.splice(_this.storeArr.length,0,...arr);
    //         // _this.storeArr = JSON.parse(JSON.stringify(_this.storeArr));
    //         _this.storeArr = [..._this.storeArr,...arr];
    //         _this.isEmpty = (arr.length === 0);
    //         _this.curAddress = o.address;
    //         break;
    //       default:
    //         _this.isEmpty = true;
    //         break;
    //     }
    //     _this.isLoading = false;
    //     console.log('callBackInit');
    //   },
    //   initCateFn() {
    //     //console.log("initCateFn");
    //     let _this = this;
    //     let o = {
    //       url: Api.url_index_cate,
    //       data: {},
    //       cb: _this.callBackCate
    //     };
    //     store.commit('getInfo', o);
    //   },
    //   callBackCate(o) {
    //     //console.log("callBackCate",o);
    //     let _this = this;
    //     _this.cateArr = o.data;
    //     if (o.data.length > 0) {
    //       _this.curCate = o.data[0].id;
    //       _this.showCate = o.data[0].name;
    //     }
    //     return _this.initBannerFn();
    //   },
    //   initBannerFn() {
    //     //console.log("initBannerFn");
    //     let _this = this;
    //     let o = {
    //       url: Api.url_index_banner,
    //       data: {},
    //       cb: _this.callBackBan
    //     };
    //     store.commit('getInfo', o);
    //   },
    //   callBackBan(o) {
    //     //console.log("callBackBan");
    //     let _this = this;
    //     _this.imgArr = o.data;
    //     /*if (_this.verifyCode == -1) {
    //       return _this.initInfoFn();
    //     } else {
    //       return _this.sendVerify();
    //     }*/
    //     return _this.initInfoFn();
    //   },
    //   changeCate(cate, name) {
    //     let _this = this;
    //     _this.curCate = cate;
    //     _this.curPage = 1;
    //     _this.isEmpty = false;
    //     _this.storeArr = [];
    //     _this.showCate = name;
    //     _this.initInfoFn();
    //   },
    //   changeTabFn(tab) {
    //     let _this = this;
    //     _this.curTab = tab;
    //     _this.curPage = 1;
    //     _this.isEmpty = false;
    //     _this.storeArr = []
    //     _this.initInfoFn();
    //   },
    //   initJoinNews() {
    //     let _this = this;
    //     let o = {
    //       url: Api.url_index_join_news,
    //       data: {},
    //       cb: _this.callBackJoin
    //     };
    //     store.commit('getInfo', o)
    //   },
    //   callBackJoin(o) {
    //     this.textArr = o.data;
    //   },
    //   openLocationFn() {
    //     let _this = this;
    //     wx.chooseLocation({
    //       success: function (res) {
    //         _this.curAddress = res.name;
    //         _this.pos.la = res.latitude;
    //         _this.pos.lo = res.longitude;
    //         _this.curPage = 1;
    //         _this.storeArr = [];
    //         _this.isEmpty = false;
    //         _this.initInfoFn();
    //       }
    //     })
    //   },
    //   toStore(id) {
    //     wx.navigateTo({
    //       url: '/pages/storeInfo/main' + '?id=' + id
    //     })
    //   },
    //   toSelectCity(mCity) {
    //     wx.navigateTo({
    //       url: "/pages/selectCity/main" + '?city=' + mCity
    //     })
    //   },
    //   bannerJump(type, id) {
    //     let ty = parseInt(type);
    //     switch (ty) {
    //       case 1:
    //         if (id) {
    //           wx.navigateTo({
    //             url: '/pages/storeInfo/main' + '?id=' + id
    //           });
    //         }
    //         break;
    //       case 2:
    //         if (id) {
    //           store.state.tempObj.tempUrl = id;
    //           wx.navigateTo({
    //             url: '/pages/webVPage/main'
    //           });
    //         }
    //         break;
    //       default:
    //         break;
    //     }

    //   },
    //   toJoin() {
    //     wx.navigateTo({
    //       url: '/pages/join/main'
    //     })
    //   },
    //   toUpdate() {
    //     wx.navigateTo({
    //       url: '/pages/join/main' + '?type=edit' + '&id=' + wx.getStorageSync("shopid") || store.state.shopId
    //     });
    //   },
    //   toSearch() {
    //     let _this = this;
    //     store.state.tempObj.tempLola.longitude = _this.pos.lo;
    //     store.state.tempObj.tempLola.latitude = _this.pos.la;
    //     wx.navigateTo({
    //       url: '/pages/search/main'
    //     })
    //   },
    //   initAnimat() {
    //     let _this = this;
    //     _this.animation = wx.createAnimation({
    //       duration: 500,
    //       timingFunction: 'linear',
    //       delay: 0,
    //       transformOrigin: '50% 50% 0',
    //       success: function (res) {
    //         //console.log(res)
    //       }
    //     });
    //     setInterval(() => {
    //       _this.rotateNum++;
    //       _this.animation.rotate(180 * _this.rotateNum).step();
    //       _this.animationD = _this.animation.export();
    //       if (_this.rotateNum >= Number.MAX_VALUE) {
    //         _this.rotateNum = 0;
    //       }
    //     }, 500)
    //   },
    //   setDefImg(index) {
    //     this.storeArr[index].src = store.state.defStore;
    //   },
    //   /*sendVerify() {
    //     let _this = this;
    //     let o = {
    //       url: Api.url_verify_bestuff,
    //       data: {verify: _this.verifyCode},
    //       cb: _this.callBackVerify,
    //       mask: true,
    //       noStatus: true
    //     };
    //     store.commit('reqInfo', o);
    //   },
    //   callBackVerify(o) {
    //     let _this = this;
    //     wx.showModal({
    //       title: '提示',
    //       content: o.msg,
    //       success: function (res) {
    //         if (res.confirm) {
    //         } else if (res.cancel) {
    //         }
    //       }
    //     });
    //     return _this.initInfoFn();
    //   }*/
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
    //   getUserInfo(e){
    //     let obj = {
    //       e: e,
    //       that: this,
    //       cb: this.initCateFn
    //     }
    //     store.commit("getUserInfoBtn",obj);
    //   },
    //   canUse(){
    //     if(wx.canIUse('button.open-type.getUserInfo')){
    //       // 用户版本可用
    //     }else{
    //       wx.showModal({
    //         title: '提示',
    //         content: '请先升级版本！',
    //         showCancel: false
    //       });
    //     }
    //   }
    }
  }
</script>
