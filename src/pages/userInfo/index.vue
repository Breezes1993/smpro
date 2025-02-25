<template>
  <div>

    <div class="pad-top-xs">
      <div class="pad-hov-sm pad-ver-xs bg-white">
        <button open-type="chooseAvatar" @chooseavatar="bindchooseavatar" class="img-btn">
          <img :src="avatarUrl" class="block round" style="width: 140rpx;height: 140rpx" @click="toUserInfo">
        </button>
        <div class="pad-bottom-xs b-b1">
          <input type="nickname" placeholder="请输入昵称" maxlength="30" v-model="nickName">
        </div>

      </div>
    </div>

    <div class="pad-sm">
      <p class="btn btn-danger block btn-radius" @click="save">保存</p>
    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        nickName: '',
        avatarUrl: '',
        userInfo: {}
      }
    },
    onLoad() {
      this.initUserInfo();
    },
    methods: {
      initUserInfo() {
        this.userInfo = store.state.userInfo;
        this.nickName = store.state.nickName || this.userInfo.nickName;
        this.avatarUrl = store.state.avatarUrl || this.userInfo.avatarUrl;
      },
      uploadImg(path) {
        wx.uploadFile({
          url: store.state.doMain + Api.url_upload,
          filePath: path,
          name: 'file',
          formData: {
            openid: store.state.openId,
            session_key: store.state.session_key
          },
          success: (res)  => {
            let data = res.data;
            wx.hideLoading();
            if (data) {
              data = JSON.parse(data);
            }
            this.setUserInfo({ avatarUrl: data.data });
            return data.data;
          },
          fail: () => {
            wx.hideLoading();
          }
        });
      },
      async setUserInfo(data) {
        let o = {
          url: store.state.getSessionUrl,
          data: {
            code: (await wx.login()).code,
            nickName: data.nickName || this.nickName,
            avatarUrl: data.avatarUrl || this.avatarUrl,
          },
          cb: this.initUserInfo,
          isGetSession: true
        };
        store.commit('reqInfo', o);
      },
      bindchooseavatar(res) {
        wx.showLoading({mask: true});
        this.uploadImg(res.target.avatarUrl);
      },
      async save() {
        let o = {
          url: store.state.getSessionUrl,
          data: {
            code: (await wx.login()).code,
            nickName: this.nickName,
            avatarUrl: this.avatarUrl
          },
          cb: () => {
            wx.navigateBack({
              delta: 1
            })
          },
          isGetSession: true
        };
        store.commit('reqInfo', o);
      }
    }
  }
</script>
<style scoped>
.img-btn {
  background-color: #fff;
  border-radius: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.img-btn::after {
  border: none;
}
</style>