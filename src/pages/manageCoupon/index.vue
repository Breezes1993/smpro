<template>
  <div>

    <div class="fixTop">
      <div class="flexBox bg-white te-cen b-b1">
        <div class="flexAuto" @click="curTab=1">
          <span class="inb pad-hov-sm pad-ver-xs b-b1 b-border-b-white" :class="{actTab:curTab==1}">可用卡券</span>
        </div>
        <div class="flexAuto" @click="curTab=2">
          <span class="inb pad-hov-sm pad-ver-xs b-b1 b-border-b-white" :class="{actTab:curTab==2}">下架卡券</span>
        </div>
      </div>
    </div>

    <div style="padding-top: 68rpx;padding-bottom: 132rpx;">

      <div v-show="curTab==1">

        <p class="pad-hov-sm pad-ver-xs te-cen text-999" v-if="!cpArrOn">温馨提示：向左测滑可以下架卡券~</p>

        <div class="pad-hov-sm pad-top-sm"
             v-for="(item,index) in cpArr" :key="index" :wx:key="index" v-if="item.isoverdue==2">
          <div class="overHid"
               :data-index="index" @touchstart="touchstart" @touchmove="touchmove"
               :class="{'touch-move-active':item.isTouchMove}">

            <div class="tempChange bg-white">
              <div class="inb wid20">
                <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
                <img :src="cpLogo" class="ver-mid rad500"
                     style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
              </div>
              <div class="inb wid40">
                <p class="ell text-danger">{{item.describe || '无门槛'}}</p>
                <!--<p class="ell text-999 text-xs">{{item.name}}</p>-->
                <p class="ell text-danger" v-if="item.typefrom==1"><span class="text-333 text-lg text-Bolder">{{item.discount}}</span>
                  元</p>
                <p class="ell text-danger" v-if="item.typefrom==2"><span class="text-333 text-lg text-Bolder">{{item.discount}}</span>
                  折</p>
                <p class="ell text-danger" v-if="item.typefrom==3"><span class="text-333 text-lg text-Bolder">{{item.name}}</span>
                </p>
                <p class="ell text-999 text-xs">{{item.timeinfo}}</p>
              </div>
              <div class="inb wid25">
                <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
                <p class="btn btn-danger btn-xs btn-radius pad-hov-smb" @click="toSee(item)">查看数据</p>
              </div>
              <div class="inb wid15 tempDel bg-red">
                <p class="btn btn-danger block pad-top-lg pad-bottom-lg" @click="downFn(item.id)">下架</p>
              </div>
            </div>

          </div>

        </div>

        <div class="pad-top-big te-cen" v-if="cpArrOn">
          <img src="/static/img/noCp.png" style="width: 256rpx;height: 180rpx;">
          <p class="text-999 pad-top-lg">您暂时还没有可用的券哦！</p>
        </div>

      </div>

      <div v-show="curTab==2">

        <!--<p class="pad-hov-sm pad-ver-xs te-cen text-999">温馨提示：向左测滑可以删除卡券~</p>-->

        <div class="pad-hov-sm pad-top-sm"
             v-for="(item,index) in cpArr" :key="index" :wx:key="index" v-if="item.isoverdue==1">
          <!--<div class="overHid"
               :data-index="index" @touchstart="touchstart" @touchmove="touchmove"
               :class="{'touch-move-active':item.isTouchMove}">-->

          <div class="overHid">

            <div class="tempChange bg-white">
              <div class="inb wid20">
                <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
                <img :src="cpLogo" class="ver-mid rad500"
                     style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
              </div>
              <div class="inb wid40">
                <p class="ell text-danger">{{item.describe || '无门槛'}}</p>
                <!--<p class="ell text-999 text-xs">{{item.name}}</p>-->
                <p class="ell text-danger" v-if="item.typefrom==1"><span class="text-333 text-lg text-Bolder">{{item.discount}}</span>
                  元</p>
                <p class="ell text-danger" v-if="item.typefrom==2"><span class="text-333 text-lg text-Bolder">{{item.discount}}</span>
                  折</p>
                <p class="ell text-danger" v-if="item.typefrom==3"><span class="text-333 text-lg text-Bolder">{{item.name}}</span>
                </p>
                <p class="text-999 text-xs">{{item.timeinfo}}</p>
              </div>
              <div class="inb wid25">
                <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
                <span class="pad-hov-sm pad-ver-xs bg-a5 rad500 ver-mid text-white"
                      @click="toSee(item,true)">下架失效</span>
              </div>
              <div class="inb wid15 tempDel bg-red">
                <p class="btn btn-danger block pad-top-lg pad-bottom-lg" @click="downFn(item.id)">下架</p>
              </div>
            </div>

          </div>

        </div>

        <div class="pad-top-big te-cen" v-if="cpArrOff">
          <img src="/static/img/noCp.png" style="width: 256rpx;height: 180rpx;">
          <p class="text-999 pad-top-lg">您暂时还没有失效的券哦！</p>
        </div>

      </div>

    </div>

    <div class="fixBot">
      <div class="pad-sm">
        <p class="btn btn-danger block btn-radius" @click="toPublic">优惠发放</p>
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
        curId: -1,
        curTab: 1,
        cpArr: [],
        cpArrOn: false,
        cpArrOff: false,
        startX: 0,
        startY: 0,
        cpLogo: '',
        canDo: 1
      }
    },
    onLoad(o) {
      this.curId = o.id;
      this.canDo = o.do;
    },
    onShow() {
      this.initCpFn();
    },
    methods: {
      toSee(item, timeout) {
        store.state.tempObj.manOne = item;
        if (timeout) {
          wx.navigateTo({
            url: '/pages/manageDetail/main' + '?id=' + item.id + '&way=1'
          })
        } else {
          wx.navigateTo({
            url: '/pages/manageDetail/main' + '?id=' + item.id
          })
        }
      },
      touchstart(e) {
        //开始触摸时 重置所有删除
        let _this = this;
        _this.cpArr.forEach(function (v, i) {
          if (v.isTouchMove)//只操作为true的
            v.isTouchMove = false;
        });
        _this.startX = e.clientX;
        _this.startY = e.clientY;
      },
      //滑动事件处理
      touchmove(e) {
        let _this = this,
          index = e.currentTarget.dataset.index,//当前索引
          startX = _this.startX,//开始X坐标
          startY = _this.startY,//开始Y坐标
          touchMoveX = e.clientX,//滑动变化坐标
          touchMoveY = e.clientY,//滑动变化坐标

          angle = _this.angle({X: startX, Y: startY}, {X: touchMoveX, Y: touchMoveY});
        let arr = _this.cpArr.slice(0);
        _this.cpArr.forEach(function (v, i) {
          v.isTouchMove = false;
          if (Math.abs(angle) > 30) return;
          if (i == index) {
            v.isTouchMove = !(touchMoveX > startX) //右滑
          }
        });
        _this.cpArr = arr;
      },
      angle(start, end) {
        let _X = end.X - start.X,
          _Y = end.Y - start.Y;
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
      },
      delFn(index) {
        let _this = this;
        _this.cpArr.splice(index, 1);
      },
      initCpFn() {
        let _this = this;
        let o = {
          url: Api.url_manage_coupon_load,
          data: {shopid: _this.curId},
          cb: _this.callBackInit
        };
        store.commit('reqInfo', o)
      },
      callBackInit(o) {
        let _this = this;
        let arr = o.data || [];
        _this.cpLogo = o.img;
        for (let i = 0, len = arr.length; i < len; i++) {
          arr[i].isTouchMove = false;
          switch (parseInt(arr[i].isoverdue)) {
            case 1:
              _this.cpArrOn = false;
              break;
            case 2:
              _this.cpArrOff = false;
              break;
            default:
              break;
          }
        }
        _this.cpArr = arr.slice(0);
      },
      downFn(id) {
        let _this = this;
        wx.showModal({
          title: '提示',
          content: '下架优惠券后，用户无法再领取，但已被用户领取的优惠券可正常使用。下架后不能直接再上架，如有需要请重新发布，确认下架吗？',
          success: function (res) {
            if (res.confirm) {
              return _this.cancelFn(id);
            } else if (res.cancel) {
            }
          }
        })

      },
      cancelFn(id) {
        let _this = this;
        let o = {
          url: Api.url_manage_coupon_cancel,
          data: {ticketid: id},
          cb: _this.callBackCC
        };
        store.commit('reqInfo', o);
      },
      callBackCC(o) {
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      },
      toPublic() {
        let _this = this;
        if (_this.canDo == 1) {
          wx.navigateTo({
            url: '/pages/publicCp/main' + '?id=' + this.curId
          });
        } else {
          wx.showToast({
            title: '您的帐号已到期或已被停用，请联系管理员。',
            icon: 'none',
            duration: 1000
          });
        }
      }
    }
  }
</script>
