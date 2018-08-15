<template>
  <div>

    <p class="pad-sm">资讯内容</p>

    <div class="pad-bottom-sm">
      <div class="pad-sm bg-white">
        <textarea placeholder="请输入内容" class="block text-lg" style="height: 350rpx;" maxlength="140"
                  @input="inputFn"></textarea>
        <p class="te-right"><span class="text-danger">{{newsInp.length}}</span>/140</p>
      </div>
    </div>

    <div>

      <div class="bg-white pad-sm">
        <p class="text-999"><span class="text-666">资讯配图：</span>为保证显示效果，建议至少上传1张图片</p>
        <div class="pad-top-xs">
          <div class="flexBox changeLine te-cen ver-cen">

            <div class="flex33" style="height: 190rpx;margin-bottom: 20rpx;" v-for="(item,index) in selImgArr"
                 :key="index" :wx:key="index">
              <icon type="clear" size="18" color="rgb(200,200,200)" @click="delPic(index)"
                    style="margin-bottom: -30rpx;" class="pull-right"></icon>
              <img :src="item" class="wid90 block" style="height: 206rpx;">
            </div>
            <div class="flex33" style="height: 190rpx;" @click="chooseFn" v-if="selImgArr.length<9">
              <img src="/static/img/img-add.png" class="block mar0A" style="width: 206rpx;height: 206rpx;">
            </div>

          </div>
          <p class="te-right text-999"><span class="text-danger">{{selImgArr.length}}</span>/9</p>
        </div>
      </div>

    </div>

    <div class="pad-top-xs">

      <p class="pad-hov-sm">
        <icon type="success" class="ver-mid" size="20" @click="agree=!agree"
              :color="!agree ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
        <span class="ver-mid pad-left-xs" @click="agree=!agree">我已阅读并同意</span>
        <span class="ver-mid pad-left-xs text-danger" @click="getAgreeFn">《资讯发布协议》</span>
      </p>

      <div class="pad-sm">
        <p class="btn btn-danger block btn-radius" @click="subNews">发布资讯</p>
      </div>
    </div>

    <div class="shade dark" v-if="infoAlert">
      <div class="pad-top-big">
        <div class="wid70 mar0A overHid rad6">
          <p class="pad-sm text-white bg-red te-cen">资讯发布协议</p>
          <div class="pad-sm bg-white scrollAble" style="height: 400rpx">
            <p v-html="agreementInfo" class="contentShow">
              内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </p>
          </div>
          <div class="pad-ver-xs bg-white te-cen">
            <div class="wid30 mar0A">
              <p class="btn btn-danger btn-xs block btn-radius" @click="infoAlert=false">确定</p>
            </div>
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
        newsInp: '',
        selImgArr: [],
        infoAlert: false,
        agree: true,
        curId: -1,
        gotNewsId: -1,
        agreementInfo: ''
      }
    },
    onUnload() {
      this.selImgArr = []
    },
    onLoad(o) {
      this.curId = o.id || -1;
    },
    methods: {
      inputFn(e) {
        let _this = this;
        _this.newsInp = e.target.value;
      },
      chooseFn() {
        let _this = this;
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            _this.selImgArr = res.tempFilePaths;
          }
        })
      },
      delPic(index) {
        let _this = this;
        _this.selImgArr.splice(index, 1);
      },
      uploadImg(index) {
        let _this = this;
        wx.showLoading({mask: true});
        wx.uploadFile({
          url: store.state.doMain + Api.url_news_uploadimg,
          filePath: _this.selImgArr[index],
          name: 'file',
          formData: {
            inforid: _this.gotNewsId,
            shopid: _this.curId,
            session_key: store.state.session_key,
            openid: store.state.openId
          },
          success: function (res) {
            let data = res.data;
            wx.hideLoading();
            if (data) {
              data = JSON.parse(data);
              if (index == _this.selImgArr.length - 1) {
                wx.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 1000
                });
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              }
            }
          }
        })

      },
      subNews() {
        let _this = this;

        if (_this.newsInp.length == 0) {
          wx.showToast({
            title: '请输入内容',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (!_this.agree) {
          wx.showToast({
            title: '请阅读并同意协议',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        let o = {
          url: Api.url_news_addinfo,
          data: {
            shopid: _this.curId,
            content: _this.newsInp
          },
          cb: _this.callBackSub,
          mask: true
        };
        store.commit('reqInfo', o);
      },
      callBackSub(o) {
        let _this = this;
        _this.gotNewsId = o.data;
        if (_this.selImgArr.length > 0) {
          for (let i = 0, len = _this.selImgArr.length; i < len; i++) {
            _this.uploadImg(i);
          }
        } else {
          wx.showToast({
            title: o.msg,
            icon: 'none',
            duration: 1000
          });
        }
      },
      getAgreeFn() {
        let _this = this;
        if (_this.agreementInfo.length == 0) {
          let o = {
            url: Api.url_help_agreement + "?title=资讯发布协议",
            data: {},
            cb: _this.callBackAG
          };
          store.commit('getInfo', o);
        } else {
          _this.infoAlert = true;
        }
      },
      callBackAG(o) {
        let _this = this;
        _this.infoAlert = true;
        _this.agreementInfo = o.data.content;
      }
    }
  }
</script>
