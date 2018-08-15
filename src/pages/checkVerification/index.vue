<template>
  <div>

    <div class="shade bg-white">

      <div class="pad-top-big">
        <div class="te-cen">
          <icon type="info" size="90" color="rgb(15,174,255)"></icon>
          <p class="pad-top-lg">是否进行核销?</p>
        </div>
        <div class="pad-top-big">
          <div class="wid45 mar0A">
            <p class="btn btn-danger block btn-radius" @click="initInfoFn()">确定</p>
          </div>
        </div>
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
        noticeText: '',
      }
    },
    onLoad(o) {
      console.log(o)
      this.curId = o.scene || -1;
    },
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_verify_ticket,
          data: {
            verify: _this.curId
          },
          cb: _this.callBackInit,
          mask: true,
          noStatus: true
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        wx.showModal({
          title: '提示',
          content: o.msg,
          complete: function (res) {
            wx.reLaunch({
              url: '/pages/index/main'
            })
          }
        })
      },
    }
  }
</script>
