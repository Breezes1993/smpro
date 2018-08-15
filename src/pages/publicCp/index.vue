<template>
  <div>

    <div v-if="hasOpened">

      <div class="bg-white pad-left-sm">

        <div class="flexBox pad-ver-sm ver-cen b-b1">
          <div class="flex25">
            <p>优惠券类型:</p>
          </div>
          <div class="flexAuto">
            <picker @change="pickerChange($event,1)" :value="pickerIndex" :range="typeArr" range-key="name">
              <view class="picker">
                {{typeArr[pickerIndex].name}}
              </view>
            </picker>
          </div>
          <div class="flex8">
            <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1" v-if="curCpType==3">
          <div class="flex25">
            <p>券名称:</p>
          </div>
          <div class="flexAuto">
            <input type="text" class="block" placeholder="请输入优惠券名称" maxlength="20" @input="inpFn($event,2)">
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1" v-if="curCpType==1">
          <div class="flex25">
            <p>优惠金额:</p>
          </div>
          <div class="flexAuto">
            <input type="digit" class="block" placeholder="请输入优惠金额" maxlength="20" @input="inpFn($event,3)">
          </div>
          <div class="flex8">
            <p>元</p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1" v-if="curCpType==2">
          <div class="flex25">
            <p>优惠折扣:</p>
          </div>
          <div class="flexAuto">
            <input type="digit" class="block" placeholder="请输入优惠折扣" maxlength="20" @input="inpFn($event,4)">
          </div>
          <div class="flex8">
            <p>折</p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1">
          <div class="flex25">
            <p>优惠条件:</p>
          </div>
          <div class="flexAuto">
            <input type="text" class="block" placeholder="请输入优惠条件,不填则为无门槛" maxlength="20" @input="inpFn($event,5)">
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1">
          <div class="flex25">
            <p>每人可领:</p>
          </div>
          <div class="flexAuto">
            <input type="number" class="block" placeholder="请输入每人最多可领数量" maxlength="20" v-model="userInp.limitNum">
          </div>
          <div class="flex8">
            <p>张</p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1">
          <div class="flex25">
            <p>发放数量:</p>
          </div>
          <div class="flexAuto">
            <input type="number" class="block" placeholder="请输入数量" maxlength="20" @input="inpFn($event,6)">
          </div>
          <div class="flex8">
            <p>张</p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1">
          <div class="flex25">
            <p>有效日期类型:</p>
          </div>
          <div class="flexAuto te-cen">
            <p @click="dateType=1">
              <icon type="success" class="ver-mid" size="20"
                    :color="(dateType!=1) ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
              <span class="ver-mid pad-left-xs">指定时间段</span>
            </p>
          </div>
          <div class="flexAuto te-cen">
            <p @click="dateType=2">
              <icon type="success" class="ver-mid" size="20"
                    :color="(dateType!=2) ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
              <span class="ver-mid pad-left-xs">领取后开始计算</span>
            </p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen" v-if="dateType==1">
          <div class="flex25">
            <p>有效日期:</p>
          </div>
          <div class="flexAuto" @click="openDateAlert(1)">
            <p class="col-bbb">{{showDate1}}</p>
          </div>
          <div class="flex8">
            <p>至</p>
          </div>
          <div class="flexAuto" @click="openDateAlert(2)">
            <p class="col-bbb">{{showDate2}}</p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen b-b1" v-if="dateType==2">
          <div class="flex25">
            <p>有效日期:</p>
          </div>
          <div class="flexAuto">
            <p @click="startDay=1">
              <icon type="success" class="ver-mid" size="20"
                    :color="(startDay!=1) ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
              <span class="ver-mid pad-left-xs">当天生效</span>
            </p>
          </div>
          <div class="flexAuto">
            <p @click="startDay=2">
              <icon type="success" class="ver-mid" size="20"
                    :color="(startDay!=2) ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
              <span class="ver-mid pad-left-xs">第二天生效</span>
            </p>
          </div>
        </div>

        <div class="flexBox pad-ver-sm ver-cen" v-if="dateType==2">
          <div class="flex25">
            <p>有效天数:</p>
          </div>
          <div class="flexAuto">
            <input type="number" class="block" placeholder="请输入有效天数" maxlength="20" @input="inpFn($event,7)">
          </div>
          <div class="flex8">
            <p>天</p>
          </div>
        </div>

      </div>

      <!--<div class="pad-top-sm">
        <div class="bg-white pad-left-sm">

          <div class="flexBox pad-ver-sm ver-cen b-b1">
            <div class="flex25">
              <p>优惠券类型:</p>
            </div>
            <div class="flexAuto">
              <picker @change="pickerChange($event,2)" :value="pickerIndex2" :range="typeArr2">
                <view class="picker">
                  {{typeArr2[pickerIndex2]}}
                </view>
              </picker>
            </div>
            <div class="flex8">
              <img src="/static/img/allow_r_gray.png" class="block mar0A" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1">
            <div class="flex25">
              <p>领取金额:</p>
            </div>
            <div class="flexAuto">
              <input type="number" class="block" placeholder="领取金额（设置0则为免费领取）" maxlength="20">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen">
            <div class="flex25">
              <p>分享领取:</p>
            </div>
            <div class="flexAuto">
              <input type="number" class="block" placeholder="分享领取的分享数量" maxlength="20">
            </div>
          </div>

        </div>
      </div>-->

      <p class="pad-sm">使用须知</p>

      <div class="pad-sm bg-white" v-show="!dateAlert">
      <textarea class="block" style="height: 150rpx;" maxlength="100" placeholder="说明"
                @input="inpFn($event,1)"></textarea>
        <p class="te-right"><span class="text-danger">{{userInp.info.length}}</span>/100</p>
      </div>

      <div class="pad-sm">
        <p>
          <icon type="success" class="ver-mid" size="20" @click="agree=!agree"
                :color="!agree ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
          <span class="ver-mid pad-left-xs" @click="agree=!agree">我已阅读并同意</span>
          <span class="ver-mid pad-left-xs text-danger" @click="getAgreeFn">《优惠券发布协议》</span>
        </p>
      </div>

      <div class="pad-sm">
        <p class="btn btn-danger block btn-radius" @click="sureSubFn">发布</p>
      </div>

    </div>

    <div class="pad-top-big" v-if="!hasOpened">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">您暂未开通门店，成功开通门店方能发布券</p>

      <div class="pad-top-big">

        <div class="pad-hov-sm pad-bottom-sm">
          <p class="btn btn-danger block btn-radius" @click="toJoin">前往开通</p>
        </div>

      </div>
    </div>

    <div class="shade dark" v-if="infoAlert">
      <div class="pad-top-big">
        <div class="wid70 mar0A overHid rad6">
          <p class="pad-sm text-white bg-red te-cen">优惠券发布协议</p>
          <div class="pad-sm bg-white scrollAble" style="height: 400rpx">
            <p v-html="agreementInfo" class="contentShow"></p>
          </div>
          <div class="pad-ver-xs bg-white te-cen">
            <div class="wid30 mar0A">
              <p class="btn btn-danger btn-xs block btn-radius" @click="infoAlert=false">确定</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shade dark" v-show="dateAlert">

      <div class="fixBot">
        <div class="bg-white pad-sm te-cen">
          <div class="flexBox ver-cen">
            <div class="flex25">
              <p class="btn btn-def block btn-xs btn-radius" @click="dateAlert=false">取消</p>
            </div>
            <div class="flexAuto">
              <p>{{year}}年{{month}}月{{day}}日</p>
            </div>
            <div class="flex25">
              <p class="btn btn-danger block btn-xs btn-radius" @click="sureDateFn">确定</p>
            </div>
          </div>
          <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value1"
                       @change="changeDate">
            <picker-view-column>
              <view v-for="(item,index) in years" :key="index" :wx:key="index" style="line-height: 50px">{{item}}年
              </view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="(item,index) in months" :key="index" :wx:key="index" style="line-height: 50px">{{item}}月
              </view>
            </picker-view-column>
            <picker-view-column>
              <view v-for="(item,index) in days" :key="index" :wx:key="index" style="line-height: 50px">{{item}}日</view>
            </picker-view-column>
          </picker-view>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import store from "../index/store"
  import Api from '../../../static/js/apis'

  export default {
    data() {
      return {
        curId: -1,
        pickerIndex: 0,
        pickerIndex2: 0,
        typeArr: [{name: '代金券', type: 1}, {name: '折扣券', type: 2}, {name: '通用券', type: 3}],
        typeArr2: ['付费领取+分享领取', '仅付费领取', '仅分享领取'],
        dateAlert: false,
        dateStatus: 1,
        showDate1: '开始日期',
        showDate2: '结束日期',
        years: [],
        months: [],
        days: [],
        value1: [0, 0, 0],
        year: 2018,
        month: 1,
        day: 1,
        agree: true,
        infoAlert: false,
        userInp: {
          info: '',
          cardName: '',
          cutMoney: '',
          cutRange: '',
          condition: '无门槛',
          cpNum: '',
          cardLimTime: '',
          limitNum: 1
        },
        hasOpened: false,
        curCpType: 1,//当前券类型
        dateType: 1,//当前时间类型
        startDay: 1,//开始天数 1为当天 2为第二天
        agreementInfo: ''
      }
    },
    onLoad(o) {
      this.curId = o.id;
      this.userInp.condition = '无门槛';
      this.userInp.info = '';
    },
    onShow() {
      this.hasOpened = (store.state.hasOpened == 1);
    },
    onUnload() {
      this.curId = -1;
      this.userInp.condition = '无门槛';
      this.userInp.info = '';
    },
    methods: {
      pickerChange(e, type) {
        let _this = this;
        type = parseInt(type);
        switch (type) {
          case 1:
            _this.pickerIndex = e.target.value;
            _this.curCpType = _this.typeArr[_this.pickerIndex].type;
            break;
          case 2:
            _this.pickerIndex2 = e.target.value;
            break;
          default:
            break;
        }
      },
      sureDateFn() {
        let _this = this;
        _this.dateAlert = false;
        let mon = (_this.month < 10) ? '0' + _this.month : _this.month;
        let day = (_this.day < 10) ? '0' + _this.day : _this.day;
        if (_this.dateStatus == 1) {
          _this.showDate1 = _this.year + '-' + mon + '-' + day;
        } else {
          _this.showDate2 = _this.year + '-' + mon + '-' + day;
        }
      },
      initLocalDate() {
        let _this = this;
        let date = new Date();
        let years = [];
        let months = [];
        let days = [];
        let now = date.getFullYear();

        for (let i = now, len = now + 3; i < len; i++) {
          years.push(i)
        }
        for (let i = 1; i <= 12; i++) {
          months.push(i)
        }
        for (let i = 1; i <= 31; i++) {
          days.push(i)
        }
        _this.years = years.slice(0);
        _this.months = months.slice(0);
        _this.days = days.slice(0);
        _this.dateAlert = true;
      },
      changeDate(e) {
        let _this = this;
        let val = e.target.value;
        _this.value1 = val;
        _this.year = _this.years[val[0]];
        _this.month = _this.months[val[1]];
        let date = new Date(_this.year, _this.month, 0);
        let arr = [];
        let limit = date.getDate();
        for (let i = 1; i <= limit; i++) {
          arr.push(i)
        }
        _this.days = arr.slice(0);
        _this.day = _this.days[val[2]];
      },
      openDateAlert(n) {
        let _this = this;
        _this.dateAlert = true;
        _this.dateStatus = parseInt(n);
        return _this.initLocalDate();
      },
      inpFn(e, n) {
        let _this = this;
        n = parseInt(n);
        switch (n) {
          case 1:
            _this.userInp.info = e.target.value;
            break;
          case 2:
            _this.userInp.cardName = e.target.value;
            break;
          case 3:
            _this.userInp.cutMoney = e.target.value;
            break;
          case 4:
            _this.userInp.cutRange = e.target.value;
            break;
          case 5:
            _this.userInp.condition = e.target.value;
            break;
          case 6:
            _this.userInp.cpNum = e.target.value;
            break;
          case 7:
            _this.userInp.cardLimTime = e.target.value;
            break;
          default:
            break;
        }
      },
      toJoin() {
        wx.navigateTo({
          url: '/pages/join/main'
        })
      },
      sureSubFn() {
        let _this = this;

        switch (_this.curCpType) {
          case 1:
            if (_this.userInp.cutMoney.length == 0) {
              wx.showToast({
                title: '请输入优惠金额',
                icon: 'none',
                duration: 1000
              });
              return;
            }

            break;
          case 2:

            if (_this.userInp.cutRange.length == 0) {
              wx.showToast({
                title: '请输入优惠折扣',
                icon: 'none',
                duration: 1000
              });
              return;
            }

            break;
          case 3:

            if (_this.userInp.cardName.length == 0) {
              wx.showToast({
                title: '请输入优惠券名称',
                icon: 'none',
                duration: 1000
              });
              return;
            }

            break;
          default:
            break;
        }

        if (_this.userInp.limitNum < 1) {
          wx.showToast({
            title: '每人可领数量需大于等于1',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.userInp.cpNum.length == 0) {
          wx.showToast({
            title: '请输入发放数量',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        switch (_this.dateType) {
          case 1:

            if (_this.showDate1 == '开始日期') {
              wx.showToast({
                title: '请选择开始日期',
                icon: 'none',
                duration: 1000
              });
              return;
            }

            if (_this.showDate2 == '结束日期') {
              wx.showToast({
                title: '请选择结束日期',
                icon: 'none',
                duration: 1000
              });
              return;
            }

            break;
          case 2:

            if (_this.userInp.cardLimTime.length == 0) {
              wx.showToast({
                title: '请输入有效天数',
                icon: 'none',
                duration: 1000
              });
              return;
            }

            break;
          default:
            break;
        }

        if (!_this.agree) {
          wx.showToast({
            title: '请阅读并同意协议',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        wx.showModal({
          title: '提示',
          content: '优惠券发布后，只能修改发放数量，其它信息无法修改，确定发布吗？',
          success: function (res) {
            if (res.confirm) {
              return _this.sendPublic();
            } else if (res.cancel) {
            }
          }
        })
      },
      sendPublic() {
        let _this = this;
        let o = {
          url: Api.url_card_public,
          data: {
            shopid: _this.curId,
            type: _this.curCpType,
            condition: _this.userInp.condition,
            num: _this.userInp.cpNum,
            datetype: _this.dateType,
            info: _this.userInp.info,
            collarmax: _this.userInp.limitNum
          },
          cb: _this.callBackPB
        };

        switch (_this.curCpType) {
          case 1:
            o.data.money = _this.userInp.cutMoney;
            break;
          case 2:
            o.data.money = _this.userInp.cutRange;
            break;
          case 3:
            o.data.name = _this.userInp.cardName;
            break;
          default:
            break;
        }

        switch (_this.dateType) {
          case 1:
            o.data.starttime = _this.showDate1;
            o.data.endtime = _this.showDate2;
            break;
          case 2:
            o.data.runtype = _this.startDay;
            o.data.rundays = _this.userInp.cardLimTime;
            break;
          default:
            break;
        }

        store.commit('reqInfo', o);
      },
      callBackPB(o) {
        wx.showToast({
          title: o.msg,
          icon: 'success',
          duration: 2000
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      },
      getAgreeFn() {
        let _this = this;
        if (_this.agreementInfo.length == 0) {
          let o = {
            url: Api.url_help_agreement + "?title=优惠券发布协议",
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
