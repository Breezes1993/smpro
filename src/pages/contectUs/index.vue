<template>
  <div>

    <div class="pad-top-big">

      <button class="wid70 mar0A pad-top-lg pad-bottom-lg bg-white rad6" style="line-height: unset"
              open-type="contact">
        <div class="flexBox ver-cen">
          <div class="flex33 te-right">
            <img src="/static/img/account/service.png" style="width: 100rpx;height: 100rpx;">
          </div>
          <div class="flexAuto te-left">
            <p class="pad-left-sm text-lg text-666">在线客服</p>
          </div>
        </div>
      </button>


      <div class="pad-top-big">

        <div class="wid70 mar0A pad-top-lg pad-bottom-lg bg-white rad6" @click="callFn">
          <div class="flexBox ver-cen">
            <div class="flex33 te-right">
              <img src="/static/img/account/service_call.png" style="width: 100rpx;height: 100rpx;">
            </div>
            <div class="flexAuto">
              <p class="pad-left-sm text-lg">联系电话</p>
            </div>
          </div>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      callFn() {
        wx.makePhoneCall({
          phoneNumber: '0592-5226672'
        })
      }
    }
  }
</script>
