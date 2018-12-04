<template>
  <div>

    <div class="pad-sm bg-white b-b1">
      <div class="flexBox ver-cen">
        <div class="flex25">
          <img :src="userInfo.avatarUrl" class="block round" style="width: 140rpx;height: 140rpx">
          <!--<open-data type="userAvatarUrl" class="block round" style="width: 140rpx;height: 140rpx"></open-data>-->
        </div>
        <div class="flexAuto">
          <p>{{userInfo.nickName}}</p>
          <p class="pad-top-xs">ID：{{IDCard}}</p>
          <p class="pad-top-xs" @click="jumpFn(13)">
            <span class="text-success" v-if="!mobile">绑定手机号</span>
            <span v-if="mobile">TEL：{{mobile}}</span>
          </p>
        </div>
        <div class="flex33 te-right">
          <p class="text-danger" style="visibility: hidden">VIP</p>
          <!-- <p class="text-danger pad-top-xs" @click="jumpFn(9)" v-if="!isVip">去升级VIP</p> -->
          <p class="text-danger pad-top-xs" @click="toOpenVipCustomer" v-if="vip === 2">开通会员</p>
          <p class="text-danger pad-top-xs" v-if="vip === 1">VIP商户</p>
          <p class="text-danger pad-top-xs" v-if="vip === 3">VIP会员</p>
          <p class="pad-top-xs text-danger" v-if="endTime!=false">{{endTime}} 到期</p>
        </div>
      </div>
    </div>

    <div class="pad-bottom-xs" v-for="(item,index) in storeArr" :key="index" :wx:key="index">
      <div class="pad-ver-sm bg-white">
        <div class="flexBox te-cen">

          <!--<div class="flexAuto b-r1" @click="jumpFn(1)">
            <img src="/static/img/account/tab1.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">我领的券</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(2)">
            <img src="/static/img/account/tab2.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">门店管理</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(3)">
            <img src="/static/img/account/tab3.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">优惠发放</p>
          </div>

          <div class="flexAuto" @click="jumpFn(4)">
            <img src="/static/img/account/tab4.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">发放管理</p>
          </div>-->

          <div class="flexAuto b-r1" @click="jumpFn(2,item.id)">
            <img src="/static/img/account/tab2.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs" v-if="storeNum==1">门店管理</p>
            <p class="pad-top-xs" v-if="storeNum>1">{{item.name}}</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(4,item.id,item.examine)" v-if="item.id!=0">
            <img src="/static/img/account/tab4.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">优惠券管理</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(5,item.id)" v-if="item.id!=0">
            <img src="/static/img/account/line1.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">添加核销员</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(0,item.id,item.examine)" v-if="item.id!=0">
            <img src="/static/img/account/tab3.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">资讯发布</p>
          </div>


          <div class="flexAuto b-r1" @click="jumpFn(11)" v-if="item.id==0">
            <img src="/static/img/account/tab4.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">优惠券管理</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(11)" v-if="item.id==0">
            <img src="/static/img/account/line1.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">添加核销员</p>
          </div>

          <div class="flexAuto b-r1" @click="jumpFn(11)" v-if="item.id==0">
            <img src="/static/img/account/tab3.png" style="width: 50rpx;height: 50rpx;">
            <p class="pad-top-xs">资讯发布</p>
          </div>

        </div>
      </div>
    </div>

    <!--<div class="pad-top-sm">
      <div class="bg-white pad-left-sm">

        <div class="flexBox pad-ver-sm ver-cen" @click="jumpFn(5)">
          <div class="flex8">
            <img src="/static/img/account/line1.png" class="block" style="width: 40rpx;height: 40rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">添加核销员</p>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

      </div>
    </div>-->

    <div class="pad-top-xs" v-if="isShowHX">
      <div class="bg-white pad-left-sm">

        <div class="flexBox pad-ver-sm ver-cen" @click="jumpFn(12)">
          <div class="flex8">
            <img src="/static/img/account/tab5.png" class="block" style="width: 45rpx;height: 45rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">我核销的券</p>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

      </div>
    </div>

    <div class="pad-top-xs">
      <div class="bg-white pad-left-sm">

        <div class="flexBox pad-ver-sm ver-cen" @click="jumpFn(1)">
          <div class="flex8">
            <img src="/static/img/account/tab1.png" class="block" style="width: 45rpx;height: 45rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">我领的券</p>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

      </div>
    </div>

    <div class="pad-top-sm">
      <div class="bg-white pad-left-sm">

        <div class="flexBox pad-ver-sm ver-cen b-b1" @click="jumpFn(6)">
          <div class="flex8">
            <img src="/static/img/account/line2.png" class="block" style="width: 40rpx;height: 40rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">帮助中心</p>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1" @click="jumpFn(7)">
          <div class="flex8">
            <img src="/static/img/account/line3.png" class="block" style="width: 40rpx;height: 40rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">关注我们</p>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1" @click="jumpFn(8)">
          <div class="flex8">
            <img src="/static/img/account/line4.png" class="block" style="width: 40rpx;height: 40rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell">联系我们</p>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen">
          <div class="flex8">
            <img src="/static/img/account/icon_setting.png" class="block" style="width: 40rpx;height: 40rpx;">
          </div>
          <div class="flexAuto">
            <button class="ell none-button" open-type="openSetting">权限管理</button>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

      </div>
    </div>

    <div class="shade dark" v-if="qrAlert">
      <div class="pad-top-big">
        <div class="wid70 mar0A overHid bg-white rad6">
          <div class="pad-sm">
            <p class="te-cen">点击保存二维码添加微信</p>

            <div class="pad-ver-sm" @click="saveImg">
              <img src="/static/img/aboutus.jpg" class="block mar0A" style="width: 380rpx;height: 380rpx;">
            </div>

          </div>

          <p class="btn btn-def block" @click="qrAlert=false">确定</p>

        </div>
      </div>
    </div>
    <div class="drawer_screen" @click="powerDrawer('close')" v-show="showModalStatus"></div>

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
  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        userInfo: '',
        mobile: false,
        qrAlert: false,
        storeArr: [],
        storeNum: 1,
        isVip: false,
        vip: 2,
        isShowHX: false,
        IDCard: 0,
        endTime: false,
        showModalStatus: false
      }
    },
    created() {

    },
    onShow() {
      console.log("替换store");
      // if(Number(store.state.session_key)===1||Number(store.state.openId)===1){
      //   store.replaceState(JSON.parse(JSON.stringify(getApp().globalData.store.state)));
      // }
      console.log(getApp().globalData)
      if(getApp().globalData.store){
        store.commit('initStore',getApp().globalData.store.state);  
      }
      store.commit('initUserInfo',{that:this,cb:this.initShow});
    },
    methods: {
      initShow() {
        this.initInfoFn();
        this.initShopFn();
      },
      initInfoFn() {
        let _this = this;
        _this.userInfo = store.state.userInfo;
        _this.mobile = store.state.mobile;
      },
      jumpFn(n, id, canDo) {
        let _this = this;
        n = parseInt(n);
        switch (n) {
          case 0:
            wx.navigateTo({
              url: '/pages/manageNews/main' + '?id=' + id + '&do=' + canDo
            });
            break;
          case 1:
            wx.switchTab({
              url: '/pages/myCoupon/main' + '?id=' + id
            });
            break;
          case 2:
            if (id == 0) {
              wx.navigateTo({
                url: '/pages/join/main'
              });
            } else {
              wx.navigateTo({
                url: '/pages/join/main' + '?type=edit' + '&id=' + id
              });
            }
            break;
          case 3:
            wx.navigateTo({
              url: '/pages/publicCp/main' + '?id=' + id
            });
            break;
          case 4:
            wx.navigateTo({
              url: '/pages/manageCoupon/main' + '?id=' + id + '&do=' + canDo
            });
            break;
          case 5:
            wx.navigateTo({
              url: '/pages/addVerifyer/main' + '?id=' + id
            });
            break;
          case 6:
            wx.navigateTo({
              url: '/pages/helpCenter/main'
            });
            break;
          case 7:
            _this.qrAlert = true;
            break;
          case 8:
            wx.navigateTo({
              url: '/pages/contectUs/main'
            });
          // case 9:
          //   wx.navigateTo({
          //     url: '/pages/'
          //   });
          //   break;
          case 9:

            /*if (store.state.hasOpened == 2) {

              wx.showModal({
                title: '温馨提示',
                content: '成功开通门店后方能升级VIP',
                success: function (res) {
                  if (res.confirm) {

                    wx.navigateTo({
                      url: '/pages/join/main'
                    })

                  } else if (res.cancel) {
                  }
                }
              })

            } else {
              wx.navigateTo({
                url: '/pages/openVIP/main' + '?id=' + id
              })
            }*/

            wx.navigateTo({
              url: '/pages/openVIP/main' + '?id=' + id
            })

            break;
          case 11:

            wx.navigateTo({
              url: '/pages/noticePage/main'
            });

            break;
          case 12:

            wx.navigateTo({
              url: '/pages/verifyRecords/main'
            });

            break;
          case 13:

            wx.navigateTo({
              url: '/pages/Login/main'
            });

            break;
          default:
            break;
        }
      },
      saveImg() {
        let _this = this;
        wx.saveImageToPhotosAlbum({
          filePath: '/static/img/aboutus.jpg',
          success(res) {
            _this.qrAlert = false;
            wx.showToast({
              title: '图片已保存成功',
              icon: 'none',
              duration: 1000
            });
          }
        })
      },
      initShopFn() {
        let _this = this;
        _this.isVip = store.state.isVip;
        _this.isShowHX = store.state.isShowHX;
        _this.IDCard = store.state.IDCard;
        _this.vip = wx.getStorageSync("vip") || store.state.vip || 2;
        _this.endTime = wx.getStorageSync("endTime") || store.state.endTime || false;
        let o = {
          url: Api.url_account_store_list,
          data: {},
          cb: _this.callBackShop
        };
        store.commit('reqInfo', o);
      },
      callBackShop(o) {
        let _this = this;
        this.storeArr = o.data || [];
        this.storeNum = parseInt(o.num) || 1;
      },
      toOpenVipCustomer() {
        wx.navigateTo({
          url: '/pages/openVIPCustomer/main'
        })
      },


      powerDrawer: function(currentStatu) {
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
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
          this.setData({
            showModalStatus: true
          });
        }
      },
      getUserInfo(e){
        console.log("getUserInfo");
        let obj = {
          e: e,
          that: this,
          cb: () => {
            return this.initShow();
          }
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
