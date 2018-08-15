<template>
  <div>

    <div class="pad-sm">

      <div class="pad-bottom-sm" v-for="(item,index) in helpArr" :key="index" :wx:key="index">
        <div class="bg-white overHid rad6">

          <div class="pad-hov-sm pad-ver-xs" @click="curTab=item.id">
            <div class="flexBox ver-cen">
              <div class="flexAuto">
                <p class="ell">{{item.title}}</p>
              </div>
              <div class="flex8 te-right">
                <img src="/static/img/account/menu.png" class="ver-cen" style="width: 50rpx;height: 50rpx;">
              </div>
            </div>
          </div>

          <div class="pad-sm b-t1" v-if="curTab==item.id">
            <p v-html="item.content" class="contentShow"></p>
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
        curTab: -1,
        helpArr: ['', '', '']
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initInfoFn();
      })
    },
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_help_info,
          data: {},
          cb: _this.callBackInit
        };
        store.commit('getInfo', o);
      },
      callBackInit(o) {
        this.helpArr = o.data;
      }
    }
  }
</script>
