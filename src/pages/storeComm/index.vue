<template>
  <div>

    <div class="pad-sm bg-white">
      <div class="flexBox ver-cen">
        <div class="flex25">
          <img :src="storeLogo" class="block mar0A" style="width: 120rpx;height: 120rpx;">
        </div>
        <div class="flex25">
          <p class="te-cen">相关描述</p>
        </div>

        <div class="flexAuto">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate>=1" @click="curRate=1">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate>=2" @click="curRate=2">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate>=3" @click="curRate=3">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate>=4" @click="curRate=4">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate==5" @click="curRate=5">

          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate==0" @click="curRate=1">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate<2" @click="curRate=2">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate<3" @click="curRate=3">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate<4" @click="curRate=4">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 40rpx;height: 40rpx;"
               v-if="curRate<5" @click="curRate=5">
          <span class="text-warning ver-mid pad-left-xs">{{curRate}}分</span>
        </div>

      </div>
    </div>

    <div class="pad-ver-sm">
      <div class="pad-sm bg-white">
        <textarea placeholder="请输入您宝贵的建议" class="block text-lg" style="height: 120rpx;" maxlength="100"
                  @input="inputFn"></textarea>
        <p class="te-right"><span class="text-danger">{{sugInp.length}}</span>/100</p>
      </div>
    </div>

    <div class="bg-white pad-sm">
      <p class="text-999"><span class="text-666">上传图片：</span>最多上传9张图片(此项可为空)</p>
      <div class="pad-top-xs">
        <div class="flexBox changeLine te-cen ver-cen">
          <!--<div class="flex33" style="height: 190rpx;margin-bottom: 20rpx;" v-for="(item,index) in selImgArr"
               :key="index" :wx:key="index">
            <img :src="item" class="wid95 block mar0A" style="height: 190rpx;">
          </div>
          <div class="flex33" style="height: 190rpx;" @click="chooseFn">
            <img src="/static/img/img-add.png" class="block mar0A" style="width: 189rpx;height: 189rpx;">
          </div>-->

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

    <div class="pad-sm">
      <p class="btn btn-danger block btn-radius" @click="subComFn">发布评论</p>
    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        curId: -1,
        cardId: -1,
        curRate: 5,
        sugInp: '',
        selImgArr: [],
        storeLogo: '',
        gotCommId: -1
      }
    },
    onLoad(o) {
      this.curId = o.id;
      this.cardId = o.cid;
      this.storeLogo = store.state.tempObj.tempLogo;
    },
    onUnload() {
      this.selImgArr = [];
      this.storeLogo = '';
      wx.reLaunch({
        url: '/pages/fakeindex/main' + "?id=" + this.cardId
      })
    },
    methods: {
      inputFn(e) {
        let _this = this;
        _this.sugInp = e.target.value;
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
      subComFn() {
        let _this = this;

        if (_this.sugInp.length == 0) {
          wx.showToast({
            title: '请输入评论',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        let o = {
          url: Api.url_user_common_send,
          data: {
            shopid: _this.curId,
            content: _this.sugInp,
            score: _this.curRate
          },
          cb: _this.callBackSub
        };
        store.commit('reqInfo', o);
      },
      callBackSub(o) {
        let _this = this;
        _this.gotCommId = o.data;
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
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/fakeindex/main' + "?id=" + _this.curId
            })
          }, 1000)
        }
      },
      uploadImg(index) {
        let _this = this;
        wx.showLoading({mask: true});
        wx.uploadFile({
          url: store.state.doMain + Api.url_user_common_send_img,
          filePath: _this.selImgArr[index],
          name: 'file',
          formData: {
            evaluateid: _this.gotCommId,
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
                  wx.reLaunch({
                    url: '/pages/fakeindex/main' + "?id=" + _this.curId
                  })
                }, 1000)
              }
            }
          }
        })

      },
    }
  }
</script>
