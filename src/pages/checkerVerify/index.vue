<template>
  <div>

    <div class="pad-top-big">
      <p class="te-cen text-sm">加载中...</p>
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
        verifyCode: -1,
        showModalStatus: false
      }
    },
    onLoad(o) {
      let _this = this;
      console.log(o);
      _this.verifyCode = o.scene || -1;
      if (_this.verifyCode == -1) {
        wx.switchTab({
          url: '/pages/index/main'
        });
      }
    },
    onUnload() {
      this.verifyCode = -1;
    },
    mounted() {
      this.$nextTick(() => {
        store.commit('initUserInfo',{that:this,cb:this.initCheckParFn});
      })
    },
    methods: {
      initCheckParFn() {
        let _this = this;
        if (_this.verifyCode == -1) {
          wx.switchTab({
            url: '/pages/index/main'
          });
          return;
        }
        setTimeout(() => {
          return _this.sendVerify();
        }, 2000)
      },
      sendVerify() {
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
            wx.switchTab({
              url: '/pages/index/main'
            });
          }
        });

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
        let _this = this;
        let obj = {
          e: e,
          that: this,
          cb: () => {
            return _this.initCheckParFn();
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
