<template>
  <div>

    <div style="padding-bottom: 132rpx;">

      <div class="pad-top-xs" v-for="(item,index) in infoArr" :key="index" :wx:key="index">
        <div class="bg-white pad-top-sm pad-hov-sm pad-bottom-xs">

          <div class="flexBox ver-cen">
            <div class="flex15">
              <img :src="logo" class="block round" style="height: 100rpx;width: 100rpx;">
            </div>
            <div class="flexAuto">
              <div class="pad-left-sm">
                <p class="text-sm">{{storeName}}</p>
                <p class="text-sm text-999 pad-top-xs">{{item.showTime}}</p>
              </div>
            </div>
            <div class="flex8">
              <img src="/static/img/art/del.png" class="block" style="width: 50rpx;height: 50rpx;"
                   @click="delOne(item.id)">
            </div>
          </div>

          <div class="pad-top-xs">
            <p class="text-lg text-333">{{item.content}}</p>
          </div>

          <div class="flexBox changeLine pad-top-xs b-b1" @click="seeImgFn(item.inforimg)">

            <div class="flex33 pad-bottom-xs" v-for="(item2,index2) in item.inforimg" :key="index2" :wx:key="index2"
                 v-if="item.inforimg.length>1">
              <div class="pad-right-xs">
                <img :src="item2.imgurl" class="block" style="width: 210rpx;height: 210rpx;">
              </div>
            </div>

            <div class="flexAuto pad-bottom-xs" v-for="(item2,index2) in item.inforimg" :key="index2" :wx:key="index2"
                 v-if="item.inforimg.length==1">
              <div>
                <img :src="item2.imgurl" class="block" mode="widthFix">
              </div>
            </div>

          </div>

          <div class="flexBox ver-cen pad-top-xs te-cen">
            <!--<div class="flexAuto">
              <img src="/static/img/art/map.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
              <span class="ver-mid inb pad-left-xs"
                    style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 150rpx;">店名店名店名店名</span>
            </div>-->

            <div class="flexAuto">
              <img src="/static/img/news/newsicon1.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
              <span class="ver-mid pad-left-xs">{{item.browsenum}}</span>
            </div>

            <div class="flexAuto">
              <img src="/static/img/news/newsicon2.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
              <span class="ver-mid pad-left-xs">{{item.fabulous}}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="pad-top-big te-cen" v-if="infoArr.length==0">
        <img src="/static/img/nocomms.png" style="width: 150rpx;height: 150rpx;">
        <p class="pad-top-xs text-999">您暂无发布资讯哦！</p>
      </div>

      <p class="pad-sm bg-white b-t1 te-cen" v-if="isEmpty">已经到底了</p>

    </div>

    <div class="fixBot">

      <div class="pad-hov-sm pad-ver-xs bg-white b-t1">
        <p class="btn btn-danger block btn-radius" @click="toPublicNews">发布资讯</p>
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
        curId: -1,
        curPage: 1,
        infoArr: [],
        isEmpty: false,
        logo: '',
        storeName: '',
        canDo: 1
      }
    },
    onUnload() {
      this.curPage = 1;
      this.infoArr = [];
      this.isEmpty = false;
      this.logo = '';
      this.storeName = '';
    },
    onLoad(o) {
      this.curId = o.id;
      this.canDo = o.do;
    },
    onShow() {
      this.curPage = 1;
      this.infoArr = [];
      this.isEmpty = false;
      this.initInfoFn()
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.initInfoFn();
      }
    },
    methods: {
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      delOne(id) {
        let _this = this;
        wx.showModal({
          title: '',
          content: '确定删除该条资讯？',
          success: function (res) {
            if (res.confirm) {
              return _this.subDelFn(id)
            } else if (res.cancel) {
            }
          }
        })
      },
      toPublicNews() {
        let _this = this;
        if (_this.canDo == 1) {
          wx.navigateTo({
            url: '/pages/publicNews/main' + '?id=' + _this.curId
          })
        } else {
          wx.showToast({
            title: '您的帐号已到期或已被停用，请联系管理员。',
            icon: 'none',
            duration: 1000
          });
        }
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_news_loadlist,
          data: {
            shopid: _this.curId,
            page: _this.curPage,
          },
          cb: _this.callBackInit,
          mask: true,
          noStatus: true
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.logo = o.logo;
        _this.storeName = o.name;
        for (let i = 0, len = o.data.length; i < len; i++) {
          o.data[i].showTime = _this.forMateTime(o.data[i].time);
          _this.infoArr.push(o.data[i]);
        }
        if (_this.infoArr.length > 0) {
          _this.isEmpty = (o.data.length < 5);
        }
      },
      forMateTime(t) {
        let d = new Date(t * 1000);
        let m = ((d.getMonth() + 1) < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        let day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
        let h = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
        let min = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
        let sec = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
        return d.getFullYear() + '-' + m + '-' + day + ' ' + h + ':' + min + ':' + sec;
      },
      subDelFn(id) {
        let _this = this;
        let o = {
          url: Api.url_news_delone,
          data: {inforid: id},
          cb: _this.callBackDel,
          mask: true
        };
        store.commit('reqInfo', o);
      },
      callBackDel(o) {
        let _this = this;
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1000
        });
        _this.curPage = 1;
        _this.infoArr = [];
        _this.isEmpty = false;
        _this.initInfoFn()
      },
      seeImgFn(arr) {
        let array = [];
        for (let i = 0, len = arr.length; i < len; i++) {
          array.push(arr[i].imgurl);
        }
        wx.previewImage({
          current: arr[0].imgurl, // 当前显示图片的http链接
          urls: array // 需要预览的图片http链接列表
        })
      }
    }
  }
</script>
