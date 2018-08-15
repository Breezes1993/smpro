<template>
  <div>

    <div class="pad-top-big">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">您暂未开通门店</p>

      <div class="pad-top-big">

        <div class="pad-hov-sm pad-bottom-sm">
          <p class="btn btn-danger block btn-radius" @click="toJoin">前往开通</p>
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
    methods: {
      toJoin() {
        wx.navigateTo({
          url: '/pages/join/main'
        })
      }
    }
  }
</script>
