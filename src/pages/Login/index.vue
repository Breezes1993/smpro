<template>
  <div>

    <div class="pad-top-xs">
      <div class="pad-hov-sm pad-ver-xs bg-white">

        <div class="pad-bottom-xs b-b1">
          <input type="text" placeholder="请输入店联系人" maxlength="30" v-model="name">
        </div>
        <div class="flexBox ver-cen pad-ver-xs b-b1">
          <div class="flexAuto">
            <input type="number" placeholder="请输入联系人手机号" maxlength="11" v-model="tel">
          </div>
          <div class="flex33" v-if="!isCounting">
            <p class="btn btn-danger btn-xs btn-radius block" @click="getSms">获取验证码</p>
          </div>
          <div class="flex33" v-if="isCounting">
            <p class="btn btn-danger btn-xs btn-radius block">{{countDown}}秒后重新发送</p>
          </div>
        </div>
        <div class="pad-top-xs">
          <input type="text" placeholder="请输入手机验证码" maxlength="10" @input="inputFn($event,3)">
        </div>

      </div>
    </div>

    <div class="pad-sm">
      <p class="btn btn-danger block btn-radius" @click="sureSingleSub">保存</p>
    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        name: '',
        tel: '',
        telCode: '',
        isCounting: false,
        countDown: 60,
      }
    },
    onLoad() {
      this.tel = store.state.mobile;
      this.name = store.state.name;
    },
    methods: {
      getSms() {
        let _this = this;
        if (_this.tel.length == 11) {
          let o = {
            url: Api.url_join_tel_code,
            data: {mobile: _this.tel},
            cb: _this.callBackSms
          };
          store.commit('reqInfo', o);
        } else {
          wx.showToast({
            title: '请输入正确的手机号码',
            icon: 'none',
            duration: 1000
          });
        }
      },
      callBackSms(o) {
        let _this = this;
        wx.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 1000
        });
        _this.codeAlert = true;
        return _this.countDFn();
      },
      countDFn() {
        let _this = this;
        _this.isCounting = true;
        _this.countDown -= 1;
        if (_this.countDown < 1) {
          _this.isCounting = false;
          _this.countDown = 60;
          return;
        }
        setTimeout(() => {
          return _this.countDFn();
        }, 1000)
      },
      sureSingleSub() {
        let _this = this;

        if (_this.name.trim().length == 0) {
          wx.showToast({
            title: '请输入联系人',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.tel.trim().length != 11) {
          wx.showToast({
            title: '请输入联系人手机号',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.telCode.trim().length == 0) {
          wx.showToast({
            title: '请输入手机验证码',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        let o = {
          url: Api.url_join_contactinfo,
          data: {
            name: _this.name,
            mobile: _this.tel,
            code: _this.telCode
          },
          cb: _this.callBackCont
        };
        store.commit('reqInfo', o);
      },
      callBackCont(o) {
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1500
        });

        store.state.mobile = this.tel;
        store.state.name = this.name;

        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      },
      inputFn(e, way) {
        let _this = this;
        way = parseInt(way);
        switch (way) {
          case 1:
            _this.name = e.target.value;
            break;
          case 2:
            _this.tel = e.target.value;
            break;
          case 3:
            _this.telCode = e.target.value;
            break;
          default:
            break;
        }
      },
    }
  }
</script>
