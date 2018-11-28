<template>
  <div>
    <div class="drawer_screen" @click="powerDrawer('close')" ></div>

    <div :animation="animationData" class="drawer_box">
      <div class="drawer_title">title</div>
      <div class="drawer_content">
        <div class="top grid content">
          <label class="">info</label>
        </div>
      </div>
      <div class="btn_ok" @click="powerDrawer('close')" >
        <button v-if="dialogType === 'userInfo'" @click="canUse" @getuserinfo='getUserInfo' open-type='getUserInfo'>确定</button>
        <button v-else @click="onConfirm">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../../pages/index/store";
export default {
  name: "dialog",
  directives: {},
  components: {},
  data() {
    return {
      animationData: '',
      showModalStatus: false
    };
  },
  props: ['dialogType', 'title', 'obj'],
  computed: {},
  watch: {},
  methods: {
    powerDrawer: function(currentStatu) {
      console.log("12312")
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
            this.obj.showModalStatus = false;
        }
      }.bind(this), 200)

      // 显示
      if (currentStatu == "open") {
        this.setData({
          "obj.showModalStatus": true
        });
      }
    },
    getUserInfo(e){
      this.$emit("getUserInfo", e);
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
    },
    onConfirm() {
      this.$emit("onConfirm");
    }
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {}
};
</script>
<style lang='postcss'>
</style>
