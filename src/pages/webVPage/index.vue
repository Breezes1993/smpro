<template>
  <div>
    <web-view :src="navPath"></web-view>
  </div>
</template>

<script>
  import store from "../index/store";

  export default {
    data() {
      return {
        navPath: ''
      }
    },
    onShow() {
      if(getApp().globalData.store){
        store.commit('initStore',getApp().globalData.store.state);  
      }
      this.initInfoFn();
    },
    methods: {
      initInfoFn() {
        let _this = this;
        _this.navPath = store.state.tempObj.tempUrl;
        console.log(_this.navPath)
      }
    }
  }
</script>
