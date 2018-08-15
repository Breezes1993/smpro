<template>
  <div>

    <div class="pad-top-big">
      <p class="te-cen text-sm">加载中...</p>
    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        verifyCode: -1
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
        this.initCheckParFn();
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

      }
    }
  }
</script>
