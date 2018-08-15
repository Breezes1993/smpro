<template>
  <div>

    <div class="shade bg-white">
      <div class="pad-top-big">
        <div class="te-cen">
          <icon type="info" size="90" color="rgb(15,174,255)"></icon>
          <p class="pad-top-lg">是否绑定核销员?</p>
        </div>
        <div class="pad-top-big">
          <div class="wid45 mar0A">
            <p class="btn btn-danger block btn-radius">确定</p>
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
    mounted() {
      this.$nextTick(() => {
        this.initInfoFn();
      })
    },
    methods: {
      initInfoFn() {

      }

    }
  }
</script>
