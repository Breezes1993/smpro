<template>
  <div>

    <div class="fixTop">
      <div class="flexBox bg-white te-cen b-b1">
        <div class="flexAuto" @click="curTab=1">
          <span class="inb pad-hov-sm pad-ver-xs b-b1 b-border-b-white" :class="{actTab:curTab==1}">可用优惠券</span>
        </div>
        <div class="flexAuto" @click="curTab=2">
          <span class="inb pad-hov-sm pad-ver-xs b-b1 b-border-b-white" :class="{actTab:curTab==2}">失效优惠券</span>
        </div>
      </div>
    </div>

    <div class="pad-bottom-sm" style="padding-top: 68rpx;">

      <div v-show="curTab==1">

        <div class="pad-hov-sm pad-top-sm"
             v-for="(item,index) in cpArr" :key="index" :wx:key="index" v-if="item.state==1|item.state==3">
          <!--<div class="overHid"
               :data-index="index" @touchstart="touchstart" @touchmove="touchmove"
               :class="{'touch-move-active':item.isTouchMove}">-->
          <div class="overHid">

            <div class="tempChange bg-white">
              <div class="inb wid20">
                <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
                <img :src="item.logo" class="ver-mid"
                     style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
              </div>
              <div class="inb wid40">
                <p class="ell text-danger">{{item.shopname}}</p>
                <p class="ell text-999">{{item.describe || '无门槛'}}</p>

                <p class="ell" v-if="item.typefrom==1">
                  <span class="text-333 text-lgx text-Bolder">{{item.ticketname}}</span>元</p>
                <p class="ell" v-if="item.typefrom==2">
                  <span class="text-333 text-lgx text-Bolder">{{item.ticketname}}</span>折</p>
                <p class="ell text-lgx text-Bolder" v-if="item.typefrom==3">{{item.ticketname}}</p>

                <p class="ell text-999 text-xs">{{item.starttime}}至{{item.endtime}}有效</p>
              </div>
              <div class="inb wid25">
                <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
                <p class="btn btn-danger btn-xs btn-radius pad-hov-smb" v-if="item.state==1" @click="toVerify(item.id)">
                  立即使用</p>
                <p class="btn btn-waring btn-xs btn-radius pad-hov-smb2" v-if="item.state==3"> 未 生 效 </p>
              </div>
              <div class="inb wid15 tempDel bg-red">
                <p class="btn btn-danger block pad-top-lg pad-bottom-lg" @click="delFn(item.id)">删除</p>
              </div>
            </div>

          </div>

        </div>

        <div class="pad-top-big te-cen" v-if="hasOn">
          <img src="/static/img/noCp.png" style="width: 256rpx;height: 180rpx;">
          <p class="text-999 pad-top-lg">您暂时还没有可用的券哦！</p>
        </div>

      </div>

      <div v-show="curTab==2">

        <!--<div class="pad-hov-sm pad-top-sm"
             v-for="(item,index) in cpArr" :key="index" :wx:key="index" v-if="item.state==2">
          <div class="overHid"
               :data-index="index" @touchstart="touchstart" @touchmove="touchmove"
               :class="{'touch-move-active':item.isTouchMove}">

            <div class="tempChange bg-white">
              <div class="inb wid20">
                <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
                <img src="/static/img/btn1.png" class="ver-mid rad500"
                     style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
              </div>
              <div class="inb wid40">
                <p class="ell text-danger">{{item.name}}</p>
                <p class="ell text-999 text-xs">{{item.describe || '无门槛'}}</p>
                <p class="ell text-danger" v-if="item.typefrom==1"><span class="text-333 text-lg text-Bolder">{{item.discount}}</span>
                  元</p>
                <p class="ell text-danger" v-if="item.typefrom==2"><span class="text-333 text-lg text-Bolder">{{item.discount}}</span>
                  折</p>
                <p class="ell text-999 text-xs">{{item.timeinfo}}</p>
              </div>
              <div class="inb wid25">
                <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
                <span class="pad-hov-smb pad-ver-xs bg-a5 rad500 ver-mid text-white">过期失效</span>
              </div>
              <div class="inb wid15 tempDel bg-red">
                <p class="btn btn-danger block pad-top-lg pad-bottom-lg" @click="delFn(item.id)">删除</p>
              </div>
            </div>

          </div>

        </div>-->

        <div class="pad-hov-sm pad-top-sm"
             v-for="(item,index) in cpArr" :key="index" :wx:key="index" v-if="item.state==2|item.state==4">
          <!--<div class="overHid"
               :data-index="index" @touchstart="touchstart" @touchmove="touchmove"
               :class="{'touch-move-active':item.isTouchMove}">-->
          <div class="overHid">

            <div class="tempChange bg-white">
              <div class="inb wid20">
                <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
                <img :src="item.logo" class="ver-mid"
                     style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
              </div>
              <div class="inb wid40">
                <p class="ell text-danger">{{item.shopname}}</p>
                <p class="ell text-999">{{item.describe || '无门槛'}}</p>

                <p class="ell" v-if="item.typefrom==1">
                  <span class="text-333 text-lgx text-Bolder">{{item.ticketname}}</span>元</p>
                <p class="ell" v-if="item.typefrom==2">
                  <span class="text-333 text-lgx text-Bolder">{{item.ticketname}}</span>折</p>
                <p class="ell text-lgx text-Bolder" v-if="item.typefrom==3">{{item.ticketname}}</p>

                <p class="ell text-999 text-xs">{{item.starttime}}至{{item.endtime}}有效</p>
              </div>
              <div class="inb wid25">
                <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
                <span class="pad-hov-smb pad-ver-xs bg-a5 rad500 ver-mid text-white">{{item.state==2?"已使用":"已过期"}}</span>
              </div>
              <div class="inb wid15 tempDel bg-red">
                <p class="btn btn-danger block pad-top-lg pad-bottom-lg" @click="delFn(item.id)">删除</p>
              </div>
            </div>

          </div>

        </div>

        <div class="pad-top-big te-cen" v-if="hasOff">
          <img src="/static/img/noCp.png" style="width: 256rpx;height: 180rpx;">
          <p class="text-999 pad-top-lg">您暂时还没有失效的券哦！</p>
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
        curTab: 1,
        cpArr: [],
        startX: 0,
        startY: 0,
        hasOn: true,
        hasOff: true,
        showModalStatus: false
      }
    },
    onShow() {
      console.log("替换store");
      // if(Number(store.state.session_key)===1||Number(store.state.openId)===1){
      //   store.replaceState(JSON.parse(JSON.stringify(getApp().globalData.store.state)));
      // }
      if(getApp().globalData.store){
        store.commit('initStore',getApp().globalData.store.state);  
      }
      store.commit('initUserInfo',{that:this,cb:this.initCpFn});
    },
    methods: {
      toVerify(id) {
        wx.navigateTo({
          url: '/pages/verification/main' + '?id=' + id
        })
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
          url: Api.url_mycoupon_load,
          data: {},
          cb: _this.callBackInit
        };
        store.commit('reqInfo', o)
      },
      callBackInit(o) {
        let _this = this;
        let arr = o.data || [];
        for (let i = 0, len = arr.length; i < len; i++) {
          arr[i].isTouchMove = false;
          switch (parseInt(arr[i].state)) {
            case 1:
              _this.hasOn = false;
              break;
            case 2:
              _this.hasOff = false;
              break;
            default:
              break;
          }
        }
        _this.cpArr = arr.slice(0);
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
            return this.initCpFn();
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
