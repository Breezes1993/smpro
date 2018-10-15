<template>
  <div class="pad-sm bg-white text-sm" style="margin-top:10rpx;">
    <div class="col-999 pad-ver-xs">你所在的地区</div>
    <div class="flexBox pad-ver-xs">
      <div class="ver-cen city-box">
        <p class="pad-ver-xs pad-hov-xs">厦门</p>
      </div>
    </div>
    <div class="col-999 pad-ver-xs">热门城市</div>
    <div class="flexBox pad-ver-xs" style="justify-content:space-between;">
      <div class="ver-cen city-box" v-for="city in cityList" :key="city">
        <p class="pad-ver-xs pad-hov-xs">{{city}}</p>
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
        cityList: ["厦门","北京","上海"]
      }
    },
    onLoad(o) {
      console.log(o);
    },
    mounted() {
      this.$nextTick(() => {
      })
    },
    methods: {
    }
  }
</script>
