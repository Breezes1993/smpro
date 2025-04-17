<template>
  <div>

    <div class="pad-sm">
      <div class="bg-white pad-sm">
        <p class="text-999">今日领取数量</p>
        <div class="pad-top-lg pad-bottom-lg te-cen">
          <p class="text-secondary"><span class="text-xl text-Bold">{{todayNum}}</span>人</p>
        </div>
        <div class="flexBox te-cen">
          <div class="flexAuto b-r1">
            <p class="text-999">浏览量</p>
            <p class="pad-top-xs text-warning">{{cpInfo.browsenum}}</p>
          </div>
          <div class="flexAuto b-r1">
            <p class="text-999">领取量</p>
            <p class="pad-top-xs text-warning">{{cpInfo.receivenum}}</p>
          </div>
          <div class="flexAuto">
            <p class="text-999">已核销</p>
            <p class="pad-top-xs text-warning">{{cpInfo.verificationnum}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pad-hov-sm" v-if="!needHide">
      <div class="bg-white pad-sm">
        <p class="text-999">剩余（张）</p>

        <div class="flexBox ver-cen">
          <div class="flexAuto">
            <p class="text-warning text-xl">{{totalNum}}</p>
          </div>
          <div class="flexAuto te-right">
            <span class="text-secondary inb" @click="edit=!edit">
              <img src="/static/img/account/edit.png" class="ver-mid" style="height: 33rpx;width: 33rpx;">
              <span class="ver-mid">编辑</span>
            </span>
            <span class="inb text-999 pad-hov-xs ver-mid">|</span>
            <span class="text-secondary inb ver-mid" @click="downFn">下架</span>
          </div>
        </div>

        <div class="flexBox ver-cen pad-top-xs b-t1" v-if="edit">
          <div class="flex25">
            <p>发放数量</p>
          </div>
          <div class="flexAuto">
            <input type="number" class="block" placeholder="请输入需要修改" maxlength="20" v-model="editNum">
          </div>
          <div class="flex8">
            <p>张</p>
          </div>
          <div class="flex25">
            <p class="btn btn-danger btn-xs block btn-radius" @click="editNumFn">确定</p>
          </div>
        </div>

      </div>
    </div>

    <p class="pad-sm text-999">最新核销</p>

    <div class="bg-white">

      <div class="pad-sm b-b1" v-for="(item,index) in veryArr" :key="index" :wx:key="index">
        <div class="flexBox ver-cen">
          <div class="flex25">
            <img :src="item.userimg" class="block mar0A" style="width: 122rpx;height: 122rpx;">
          </div>
          <div class="flexAuto">

            <div class="pad-bottom-xs">
              <span class="pad-right-sm">ID:{{item.usercardnum}}</span>

              <span class="adminCheck">{{item.username}}</span>
              <!-- <span class="pad-right-sm">{{item.username}}</span>

              <span class="adminCheck">{{item.verificationname}}</span> -->

            </div>

            <p class="text-xs text-999">{{item.usertime}}</p>

          </div>
          <div class="flex25 te-cen">
            <p class="text-warning">已核销</p>
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
        edit: false,
        editNum: '',
        curId: -1,
        cpInfo: '',
        todayNum: 0,
        totalNum: 0,
        veryArr: [],
        needHide: true
      }
    },
    onLoad(o) {
      this.curId = o.id;
      this.needHide = (o.way);
      console.log(o.way)
    },
    onShow() {
      this.initCpInfo()
    },
    onUnload() {
      let _this = this;
      _this.veryArr = [];
    },
    methods: {
      initCpInfo() {
        let _this = this;
        _this.cpInfo = store.state.tempObj.manOne;
        let o = {
          url: Api.url_manage_coupon_info_one,
          data: {ticketid: _this.curId},
          cb: _this.callBackInit
        };
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.todayNum = o.todaynum;
        _this.totalNum = o.num;
        _this.veryArr = o.data;
      },
      editNumFn() {
        let _this = this;

        if (_this.editNum < 1) {
          wx.showToast({
            title: '请输入大于等于1的数字',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        let o = {
          url: Api.url_manage_coupon_editnum,
          data: {
            ticketid: _this.curId,
            ticketnum: _this.editNum
          },
          cb: _this.callBackEdit
        };
        store.commit('reqInfo', o);
      },
      callBackEdit(o) {
        let _this = this;
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          _this.edit = false;
          _this.veryArr = [];
          return _this.initCpInfo();
        }, 1000)
      },
      downFn() {
        let _this = this;
        wx.showModal({
          title: '提示',
          content: '下架优惠券后，用户无法再领取，但已被用户领取的优惠券可正常使用。下架后不能直接再上架，如有需要请重新发布，确认下架吗？',
          success: function (res) {
            if (res.confirm) {
              return _this.cancelFn();
            } else if (res.cancel) {
            }
          }
        })

      },
      cancelFn() {
        let _this = this;
        let o = {
          url: Api.url_manage_coupon_cancel,
          data: {ticketid: _this.curId},
          cb: _this.callBackCC
        };
        store.commit('reqInfo', o);
      },
      callBackCC(o) {
        wx.showToast({
          title: o.msg,
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
</script>
