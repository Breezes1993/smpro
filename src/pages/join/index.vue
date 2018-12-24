<template>
  <div>

    <div class="pad-hov-sm pad-ver-xs bg-white">
      <div class="ver-cen">
        <div @click="chooseImg(0)">
          <img :src="storeLogo" class="block mar0A" style="width: 172rpx;height: 172rpx;">
        </div>
        <!--<div class="flexAuto">
          <div class="pad-left-xs">
            <div class="pad-bottom-xs b-b1">
              &lt;!&ndash;<input type="text" placeholder="请输入店联系人" v-if="hasOpened==2" @input="inputFn($event,1)">&ndash;&gt;
              <input type="text" placeholder="请输入店联系人" v-model="name">
            </div>
            <div class="flexBox ver-cen pad-ver-xs">
              <div class="flexAuto">
                &lt;!&ndash;<input type="number" placeholder="请输入联系人手机号" maxlength="11" v-if="hasOpened==2"
                       @input="inputFn($event,2)">&ndash;&gt;
                <input type="number" placeholder="请输入联系人手机号" maxlength="11" v-model="tel">
              </div>
              <div class="flex33" v-if="!isCounting">
                <p class="btn btn-danger btn-xs btn-radius block" @click="getSms">获取验证码</p>
              </div>
              <div class="flex33" v-if="isCounting">
                <p class="btn btn-danger btn-xs btn-radius block">{{countDown}}秒后重新发送</p>
              </div>
            </div>
            <div class="pad-ver-xs b-t1" v-if="codeAlert">
              <div class="flexBox ver-cen">
                <div class="flexAuto">
                  <input type="text" placeholder="请输入手机验证码" maxlength="10" @input="inputFn($event,6)">
                </div>
                <div class="flex33">
                  <p class="btn btn-danger btn-xs btn-radius block" @click="sureSingleSub">确认</p>
                </div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>

    <div class="pad-ver-sm">
      <div class="pad-sm bg-white te-cen">
        <p class="text-333">门店位置</p>
        <p class="text-999">{{curAddress}}</p>

        <div class="pad-top-sm wid25 mar0A">
          <p class="btn btn-success btn-xs block btn-radius" @click="openChooseLocal">定位</p>
        </div>
      </div>
    </div>

    <div class="pad-hov-sm bg-white">

      <div class="flexBox pad-ver-sm b-b1 ver-cen">
        <div class="flex25">
          <p>门店名称:</p>
        </div>
        <div class="flexAuto">
          <input type="text" maxlength="50" placeholder="请输入店铺名称" v-if="hasOpened==2" @input="inputFn($event,3)">
          <input type="text" maxlength="50" placeholder="请输入店铺名称" v-if="hasOpened==1" v-model="storeName">
        </div>
      </div>

      <div class="flexBox pad-ver-sm b-b1 ver-cen">
        <div class="flex25">
          <p>门店电话:</p>
        </div>
        <div class="flexAuto">
          <input type="number" maxlength="11" placeholder="请输入店铺电话" v-if="hasOpened==2" @input="inputFn($event,4)">
          <input type="number" maxlength="11" placeholder="请输入店铺电话" v-if="hasOpened==1" v-model="storeTel">
        </div>
      </div>

      <div class="flexBox pad-ver-sm b-b1 ver-cen">
        <div class="flex25">
          <p>营业时间:</p>
        </div>
        <div class="flexAuto">
          <div class="flexBox ver-cen te-cen">

            <div class="flexAuto">
              <picker @change="dateChange($event,1)" :value="startValue" :range="dateArr">
                <view class="picker">
                  {{startValueCmp}}
                </view>
              </picker>
            </div>

            <div class="flex8">
              <p class="te-cen">至</p>
            </div>

            <div class="flexAuto">
              <picker @change="dateChange($event,2)" :value="endValue" :range="dateArr">
                <view class="picker">
                  {{endValueCmp}}
                </view>
              </picker>
            </div>

          </div>
        </div>
      </div>
      
      <div class="flexBox pad-ver-sm b-b1 ver-cen">
        <div class="flex25">
          <p>人均消费:</p>
        </div>
        <div class="flexAuto">
          <input type="number" maxlength="5" placeholder="请输入人均消费" v-if="hasOpened==2" @input="inputFn($event,7)">
          <input type="number" maxlength="5" placeholder="请输入人均消费" v-if="hasOpened==1" v-model="consumption">
        </div>
      </div>

      <div :class="'flexBox pad-ver-sm ver-cen ' + (pickerIndex===0?'b-b1':'')">
        <div class="flex25">
          <p>所属行业:</p>
        </div>
        <div class="flexAuto">
          <picker @change="pickerChange" :value="pickerIndex" :range="typeArr" range-key="name">
            <view class="picker">
              {{typeArr[pickerIndex].name}}
            </view>
          </picker>
        </div>
      </div>
      <div :class="'bg-white flexBox pad-ver-xs ' + ((fsIndex+1)===fasetSelects.length?'':'b-b1')" 
        v-for="(fasetSelect,fsIndex) in fasetSelects" 
        v-bind:key="fasetSelect.name+fsIndex">
        <div class="pad-ver-xs" style="flex-shrink:0;">
          <p>{{fasetSelect.name}}:</p>
        </div>
        <div class="flexBox changeLine" style="padding-left:15rpx;">
          <span @click="clickItem(item,fasetSelect)" :class="'fs-item2 ' + (item.isSelect===true?'fs-select':'')" v-for="(item,itemIndex) in fasetSelect.items" v-bind:key="item.itemName+itemIndex">{{item.itemName}}</span>
        </div>
      </div>
    </div>


    <div class="pad-ver-sm">
      <div class="pad-sm bg-white">
        <div class="flexBox">
          <div class="flex25">
            <p>店内设施：</p>
          </div>
          <div class="flexAuto">
            <div class="flexBox">
              <div class="flexAuto" @click="deviceFn(1)">
                <icon type="success" class="ver-mid" size="20"
                      :color="!device.has1 ? 'rgb(240,240,240)': 'rgb(244,68,68)'"></icon>
                <span class="ver-mid pad-left-xs">WiFi</span>
              </div>
              <div class="flexAuto" @click="deviceFn(2)">
                <icon type="success" class="ver-mid" size="20"
                      :color="!device.has2 ? 'rgb(240,240,240)': 'rgb(244,68,68)'"></icon>
                <span class="ver-mid pad-left-xs">停车位</span>
              </div>
            </div>

            <div class="flexBox pad-top-xs">
              <div class="flexAuto" @click="deviceFn(3)">
                <icon type="success" class="ver-mid" size="20"
                      :color="!device.has3 ? 'rgb(240,240,240)': 'rgb(244,68,68)'"></icon>
                <span class="ver-mid pad-left-xs">支付宝支付</span>
              </div>
              <div class="flexAuto" @click="deviceFn(4)">
                <icon type="success" class="ver-mid" size="20"
                      :color="!device.has4 ? 'rgb(240,240,240)': 'rgb(244,68,68)'"></icon>
                <span class="ver-mid pad-left-xs">微信支付</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="pad-sm bg-white">
      <div class="flexBox">
        <div class="flex25">
          <p class="text-333">门店简介：</p>
        </div>
        <div class="flexAuto">
          <textarea placeholder="请输入文本" class="block" style="height: 120rpx;" maxlength="100"
                    @input="inputFn($event,5)" v-if="hasOpened==2"></textarea>
          <textarea placeholder="请输入文本" class="block" style="height: 120rpx;" maxlength="100"
                    v-if="hasOpened==1" v-model="storeInfo"></textarea>
          <p class="te-right"><span class="text-danger">{{storeInfo.length}}</span>/100</p>
        </div>
      </div>
    </div>

    <div class="pad-ver-sm">
      <div class="pad-sm bg-white">
        <p class="text-999"><span class="text-333">轮播图片：</span> 上传3张图片</p>

        <div class="flexBox changeLine ver-cen pad-top-xs">
          <div class="flex33" style="height: 190rpx;margin-bottom: 20rpx;" v-for="(item,index) in bannerArr"
               :key="index" :wx:key="index">
            <icon type="clear" size="18" color="rgb(200,200,200)" @click="delPic(1,index,item.id)"
                  style="margin-bottom: -30rpx;" class="pull-right"></icon>
            <img :src="item.img" class="wid90 block" style="height: 206rpx;">
          </div>
          <div class="flex33" style="height: 190rpx;" @click="chooseImg(1)" v-if="bannerArr.length<3">
            <img src="/static/img/img-add.png" class="block mar0A" style="width: 206rpx;height: 206rpx;">
          </div>
        </div>
        <p class="te-right text-999"><span class="text-danger">{{bannerArr.length}}</span>/3</p>

      </div>
    </div>

    <div class="pad-sm bg-white">
      <p class="text-999"><span class="text-333">门店图片：</span> 为保证显示效果，建议至少上传3张图片</p>

      <div class="flexBox changeLine te-cen ver-cen pad-top-xs">
        <div class="flex33" style="height: 190rpx;margin-bottom: 20rpx;" v-for="(item,index) in detailArr"
             :key="index" :wx:key="index">
          <icon type="clear" size="18" color="rgb(200,200,200)" @click="delPic(2,index,item.id)"
                style="margin-bottom: -30rpx;" class="pull-right"></icon>
          <img :src="item.img" class="wid90 block" style="height: 206rpx;">
        </div>
        <div class="flex33" style="height: 190rpx;" @click="chooseImg(2)" v-if="detailArr.length<9">
          <img src="/static/img/img-add.png" class="block mar0A" style="width: 206rpx;height: 206rpx;">
        </div>
      </div>
      <p class="te-right text-999"><span class="text-danger">{{detailArr.length}}</span>/9</p>

    </div>

    <div class="pad-sm">
      <p>
        <icon type="success" class="ver-mid" size="20" @click="agree=!agree"
              :color="!agree ? 'rgb(210,210,210)': 'rgb(244,68,68)'"></icon>
        <span class="ver-mid pad-left-xs" @click="agree=!agree">我已阅读并同意</span>
        <span class="ver-mid pad-left-xs text-danger" @click="getAgreeFn">《商户入驻协议》</span>
      </p>
    </div>

    <div class="pad-sm">
      <p class="btn btn-danger block btn-radius" @click="subMitSure">{{(hasOpened==1) ? '保存' : '开通门店'}} </p>
    </div>

    <div class="shade dark" v-if="infoAlert">
      <div class="pad-top-big">
        <div class="wid70 mar0A overHid rad6">
          <p class="pad-sm text-white bg-red te-cen">商户入驻协议</p>
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

    <div class="drawer_screen" @click="powerDrawer('close')" v-show="showModalStatus"></div>

    <div :animation="animationData" class="drawer_box" v-show="showModalStatus">
      <div class="drawer_title">提示</div>
      <div class="drawer_content">
        <div class="top grid content">
          <label class="">请先获取用户信息！</label>
        </div>
      </div>
      <div class="btn_ok" @click="powerDrawer('close')" >
        <button @click="canUse" @getuserinfo='getUserInfo' open-type='getUserInfo'>确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    computed: {
      startValueCmp() {
        if (!this.startValue) return "01:00";
        let type = typeof this.startValue;
        if (type === 'string') {
          let splits = this.startValue.split(":");
          if (splits.length === 1) {
            return Number(splits) <= 9 ? "0" + splits + ":00" : splits + ":00";
          } else {
            return this.startValue;
          }
        } else if (type === 'number') {
          return this.startValue <= 9 ? "0" + this.startValue + ":00" : this.startValue + ":00";
        }
      },
      endValueCmp() {
        if (!this.endValue) return "01:00";
        let type = typeof this.endValue;
        if (type === 'string') {
          let splits = this.endValue.split(":");
          if (splits.length === 1) {
            return Number(splits) <= 9 ? "0" + splits + ":00" : splits + ":00";
          } else {
            return this.endValue;
          }
        } else if (type === 'number') {
          return this.endValue <= 9 ? "0" + this.endValue + ":00" : this.endValue + ":00";
        }
      }
    },
    data() {
      return {
        curId: -1,
        isChoose: false,
        infoAlert: false,
        codeAlert: false,
        isCounting: false,
        countDown: 60,
        curAddress: '请定位您的位置信息,定位后可再进行编辑',
        longitude: '',
        latitude: '',
        typeArr: [{name: '1', id: '1'}],
        pickerIndex: 0,
        dateArr: [],
        startIndex: 0,
        endIndex: 2,
        startValue: '',
        endValue: '',
        device: {
          has1: false,
          has2: false,
          has3: false,
          has4: false,
        },
        storeInfo: '',
        storeLogo: '/static/img/logoDef.png',
        bannerArr: [],
        bannerSort: 0,
        detailArr: [],
        detailSort: 0,
        agree: true,
        name: '',
        tel: '',
        tempTel: '',
        storeName: '',
        storeTel: '',
        telCode: '',
        hasOpened: 2,
        agreementInfo: '',
        consumption: '',

        fasetSelects: [{
          name: "所在商圈",
          type: "01",
          items:[{
            itemName: "不限"
          },{
            itemName: "SM城市"
          },{
            itemName: "中山路"
          },{
            itemName: "中华城"
          },{
            itemName: "沙坡尾"
          },{
            itemName: "火车站"
          },{
            itemName: "排挡"
          },]
        },{
          name: "行业类别",
          type: "02",
          items:[{
            itemName: "不限"
          },{
            itemName: "SM城市"
          },{
            itemName: "中山路"
          },{
            itemName: "中华城"
          },{
            itemName: "沙坡尾"
          },{
            itemName: "火车站"
          },{
            itemName: "排挡"
          },{
            itemName: "香港"
          },]
        }],
        showModalStatus: false
      }
    },
    onLoad(o) {
      this.curId = o.id || -1;
      this.hasOpened = o.hasOpened || 2;
      console.log("替换store");
      console.log(getApp().globalData)
      if(getApp().globalData.store){
        store.commit('initStore',getApp().globalData.store.state);
      }
      store.commit('initUserInfo',{that:this,cb:this.initOnload});
    },
    onUnload() {
      let _this = this;
      _this.codeAlert = false;
      _this.storeLogo = '/static/img/logoDef.png';
      _this.name = '';
      _this.tel = '';
      _this.telCode = '';
      _this.latitude = '';
      _this.longitude = '';
      _this.curAddress = '请定位您的位置信息,定位后可再进行编辑';
      _this.storeName = '';
      _this.storeTel = '';
      _this.consumption = '';
      _this.device.has1 = false;
      _this.device.has2 = false;
      _this.device.has3 = false;
      _this.device.has4 = false;
      _this.isChoose = false;
      _this.storeInfo = '';
      _this.bannerArr = [];
      _this.detailArr = [];
      _this.curId = -1;
      _this.hasOpened = 2;
      // wx.switchTab({
      //   url: '/pages/account/main'
      // })
    },
    methods: {
      initOnload() {
        let _this = this;
        _this.initDateArr();
        _this.initCateFn();
        _this.initFastSelect().then(function(){
          console.log("进入resolve")
          if (_this.curId && _this.curId !== -1) {
            _this.hasOpened = 1;
            store.commit('initUserInfo',{that:_this,cb:_this.loadAlready});
            console.log("_this.hasOpened=" + _this.hasOpened, "o.id=" + _this.curId)
          }
        }).catch(function(msg){
          console.log("进入reject",msg);
        });
      },
      openChooseLocal() {
        let _this = this;
        wx.chooseLocation({
          success: function (res) {
            _this.curAddress = res.address;
            _this.longitude = res.longitude;
            _this.latitude = res.latitude;
          }
        })
      },
      pickerChange(e) {
        console.log("pickerChange",e);
        this.pickerIndex = Number(e.target.value);
        // this.$set(this,"pickerIndex",Number(e.target.value))
        this.pickerName = this.typeArr[e.target.value].name;
      },
      dateChange(e, way) {
        let _this = this;
        switch (way) {
          case 1:
            _this.startValue = _this.dateArr[e.target.value];
            break;
          case 2:
            _this.endValue = _this.dateArr[e.target.value];
            break;
          default:
            break;
        }
      },
      initDateArr() {
        let _this = this;
        let arr = [];
        for (let i = 1; i <= 24; i++) {
          let num = (i < 10) ? '0' + i : i;
          arr.push(num + ":00");
          i !== 24 && arr.push(num + ":30");
        }
        _this.dateArr = arr.slice(0);
        _this.codeAlert = false;
      },
      deviceFn(type) {
        let _this = this;
        switch (type) {
          case 1:
            _this.device.has1 = !_this.device.has1;
            break;
          case 2:
            _this.device.has2 = !_this.device.has2;
            break;
          case 3:
            _this.device.has3 = !_this.device.has3;
            break;
          case 4:
            _this.device.has4 = !_this.device.has4;
            break;
          default:
            break;
        }
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
            _this.storeName = e.target.value;
            break;
          case 4:
            _this.storeTel = e.target.value;
            break;
          case 5:
            _this.storeInfo = e.target.value;
            break;
          case 6:
            _this.telCode = e.target.value;
            break;
          case 7:
            _this.consumption = e.target.value;
            break;
          default:
            break;
        }
      },
      chooseImg(way) {
        let _this = this;
        let num = 1;
        _this.isChoose = true;
        switch (way) {
          case 0:
            num = 1;
            break;
          case 1:
            num = 3 - _this.bannerArr.length;
            break;
          case 2:
            num = 9 - _this.detailArr.length;
            break;
          default:
            break;
        }
        wx.chooseImage({
          count: num, // 默认9
          sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            switch (way) {
              case 0:
                _this.storeLogo = res.tempFilePaths[0];
                break;
              case 1:
                for (let i = 0, len = res.tempFilePaths.length; i < len; i++) {
                  _this.bannerArr.push({img: res.tempFilePaths[i], id: -1})
                }
                break;
              case 2:
                for (let i = 0, len = res.tempFilePaths.length; i < len; i++) {
                  _this.detailArr.push({img: res.tempFilePaths[i], id: -1})
                }
                break;
              default:
                break;
            }
            switch (way) {
              case 1:
                for (let i = 0, len = _this.bannerArr.length; i < len; i++) {
                  if (!_this.bannerArr[i].isLoad) {
                    _this.upLoadF(1, i);
                    _this.bannerArr[i].isLoad = true;
                  }
                }
                break;
              case 2:
                for (let i = 0, len = _this.detailArr.length; i < len; i++) {
                  if (!_this.detailArr[i].isLoad) {
                    _this.upLoadF(2, i);
                    _this.detailArr[i].isLoad = true;
                  }
                }
                break;
              case 0:

                if (_this.hasOpened == 1) {
                  return _this.upLoadF(3, 0);
                }

                break;
              default:
                break;
            }
          }
        })
      },
      delPic(way, index, id) {
        let _this = this;
        way = parseInt(way);
        switch (way) {
          case 1:
            _this.bannerArr.splice(index, 1);
            break;
          case 2:
            _this.detailArr.splice(index, 1);
            break;
          default:
            break;
        }
        return _this.imgDelFn(id);
      },
      initCateFn() {
        let _this = this;
        let o = {
          url: Api.url_index_cate,
          data: {},
          cb: _this.callBackCate
        };
        store.commit('getInfo', o);
      },
      callBackCate(o) {
        let _this = this;
        if (o.data instanceof Array) {
          _this.typeArr = o.data.sort(function(a, b) {
            return a.id>b.id;
          })
        } else {
          let tmpArrays = [];
          console.log(o.data);
          for (let key in o.data) {
            console.log(key);
            tmpArrays.push(o.data[key]);
          }
          _this.typeArr = tmpArrays;
        }
        return _this.initImg();
      },
      upLoadF(type, index) {
        console.log("开始")
        let _this = this;
        type = parseInt(type);
        let files = [];
        let d = {};
        let url = '';
        wx.showLoading({mask: true});
        switch (type) {
          case 0:
            if (_this.hasOpened == 1) {
              return _this.editSubFn();
            }
            files = [{img: _this.storeLogo}];
            // let start = _this.dateArr[_this.startIndex].split(':')[0];
            // let end = _this.dateArr[_this.endIndex].split(':')[0];
            let start = _this.startValue;
            let end = _this.endValue;
            d = {
              name: _this.name,
              tel: _this.tel,
              mobile: _this.tel,
              code: _this.telCode,
              latitude: _this.latitude,
              longitude: _this.longitude,
              location: _this.curAddress,
              storename: _this.storeName,
              storetel: _this.storeTel,
              consumption: _this.consumption,
              starttime: start,
              endtime: end,
              storetype: _this.typeArr[_this.pickerIndex].id,
              iswifi: (_this.device.has1) ? 1 : 2,
              isparking: (_this.device.has2) ? 1 : 2,
              isalipay: (_this.device.has3) ? 1 : 2,
              iswxpay: (_this.device.has4) ? 1 : 2,
              storeinfo: _this.storeInfo,
              openid: store.state.openId,
              session_key: store.state.session_key,
              isadd: 1
            };
            if (_this.hasOpened == 1) {
              d.shopid = _this.curId;
              d.isadd = 2;
            }
            let tmpSelect = [];
            _this.fasetSelects.forEach(element=>{
              let tmpElement = JSON.parse(JSON.stringify(element));
              tmpElement.items=[];
              element.items.forEach(elementItem=>{
                if(elementItem.isSelect){
                  tmpElement.items.push(elementItem);
                }
              });
              tmpSelect.push(tmpElement);
            });
            console.log("tmpSelect",tmpSelect);
            d.fasetSelects = JSON.stringify(tmpSelect);
            url = Api.url_join_upload_text;
            break;
          case 1:
            files = _this.bannerArr;
            d = {
              openid: store.state.openId,
              session_key: store.state.session_key,
              type: type,
              isadd: 1
            };
            url = Api.url_join_upload_img;
            if (_this.hasOpened == 1) {
              d.shopid = _this.curId;
              d.isadd = 2;
            }
            break;
          case 2:
            files = _this.detailArr;
            d = {
              openid: store.state.openId,
              session_key: store.state.session_key,
              type: type,
              isadd: 1
            };
            url = Api.url_join_upload_img;
            if (_this.hasOpened == 1) {
              d.shopid = _this.curId;
              d.isadd = 2;
            }
            break;
          case 3:
            files = [{img: _this.storeLogo}];
            d = {
              openid: store.state.openId,
              session_key: store.state.session_key,
              shopid: _this.curId,
              type: 3
            };
            url = Api.url_join_upload_img;
            break;
          default:
            break;
        }
        switch (type) {
          case 1:
            d.sort = ++_this.bannerSort;
            break;
          case 2:
            d.sort = ++_this.detailSort;
            break;
        }
        console.log("d",d);
        // if(type===0){
        //   wx.hideLoading();
        //   return;
        // }
        // wx.getFileSystemManager().readFile({
        //   filePath: files[parseInt(index)].img, //选择图片返回的相对路径
        //   encoding: 'base64', //编码格式
        //   success: res => { //成功的回调
        //     console.log('data:image/png;base64,' + res.data)
        //   }
        // })
        wx.uploadFile({
          url: store.state.doMain + url,
          filePath: files[parseInt(index)].img,
        name: 'file',
          formData: d,
          success: function (res) {
            console.log("商户注册,",res);
            let data = res.data;
            wx.hideLoading();
            if (data) {
              data = JSON.parse(data);
              _this.isChoose = false;
              switch (type) {
                case 0:
                  wx.showToast({
                    title: data.msg,
                    icon: data.status===1?'success':'none',
                    duration: 2000
                  });
                  wx.setStorageSync("hasOpened", 3);
                  wx.setStorageSync("shopid", data.data);
                  store.commit("updateState", {
                    hasOpened: 3,
                    shopid: data.data
                  });
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/index/main'
                    });
                  }, 1500);
                  break;
                case 1:
                  _this.bannerArr[index].id = data.data;
                  wx.showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 500
                  });
                  break;
                case 2:
                  _this.detailArr[index].id = data.data;
                  wx.showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 500
                  });
                  break;
                case 3:
                  wx.showToast({
                    title: data.msg,
                    icon: 'none',
                    duration: 500
                  });
                  break;
                default:
                  break;
              }
            }
          }
        })
      },
      subMitSure() {
        let _this = this;
        if (_this.storeLogo == '/static/img/logoDef.png') {
          wx.showToast({
            title: '请上传logo',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        /*if (_this.name.length < 1) {
          wx.showToast({
            title: '请输入联系人',
            icon: 'none',
            duration: 1000
          });
          return;
        }*/

        /*if (_this.telCode.length < 1) {
          if (_this.tel != _this.tempTel) {
            wx.showToast({
              title: '请输入短信验证码',
              icon: 'none',
              duration: 1000
            });
            return;
          }
        }*/

        /*if (_this.tel.length != 11) {
          wx.showToast({
            title: '请输入联系人电话',
            icon: 'none',
            duration: 1000
          });
          return;
        }*/

        if (_this.curAddress == '请定位您的位置信息,定位后可再进行编辑') {
          wx.showToast({
            title: '请选择店铺地址',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.storeName.length < 1) {
          wx.showToast({
            title: '请填写店铺名称',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.storeTel.length < 1) {
          wx.showToast({
            title: '请填写店铺电话',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.consumption.length < 1) {
          wx.showToast({
            title: '请填写人均消费',
            icon: 'none',
            duration: 1000
          });
        }

        if (_this.storeInfo.length < 1) {
          wx.showToast({
            title: '请填写店铺简介',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.bannerArr.length == 0) {
          wx.showToast({
            title: '请上传轮播图片',
            icon: 'none',
            duration: 1000
          });
          return;
        }

        if (_this.detailArr.length == 0) {
          wx.showToast({
            title: '请上传门店图片',
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
        return _this.upLoadF(0, 0)
      },
      imgDelFn(id) {
        let _this = this;
        let o = {
          url: Api.url_join_upload_img_del,
          data: {id: id},
          cb: _this.callBackDel,
          mask: true
        };

        store.commit('reqInfo', o);
      },
      callBackDel(o) {
        wx.showToast({
          title: '删除成功！',
          icon: 'success',
          duration: 1000
        });
      },
      initImg() {
        let _this = this;
        let o = {
          url: Api.url_join_loadimg,
          data: {isadd: 1},
          cb: _this.callBackLI,
          noStatus: true,
          mask: true
        };
        if (_this.curId != -1) {
          o.data.shopid = _this.curId;
          o.data.isadd = 2;
        }
        store.commit('reqInfo', o);
      },
      callBackLI(o) {
        let _this = this;
        _this.bannerArr = [];
        _this.detailArr = [];
        for (let i = 0, len = o.data.length; i < len; i++) {
          switch (parseInt(o.data[i].type)) {
            case 1:
              _this.bannerArr.push({img: o.data[i].imageurl, id: o.data[i].id, isLoad: true})
              break;
            case 2:
              _this.detailArr.push({img: o.data[i].imageurl, id: o.data[i].id, isLoad: true})
              break;
            default:
              break;
          }
        }
        if (o.user) {
          _this.tel = o.user.mobile || '';
          _this.tempTel = o.user.mobile || '';
          _this.name = o.user.contactname || '';
        }
      },
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
      loadAlready() {
        let _this = this;
        let o = {
          url: Api.url_join_load_opened,
          data: {shopid: _this.curId},
          cb: _this.callBackAlready,
          mask: true
        };
        store.commit('reqInfo', o);
      },
      callBackAlready(o) {
        let _this = this;
        _this.storeLogo = o.data.logo;
        _this.name = o.data.contacts;
        _this.tel = o.data.contactstel || o.data.mobile;

        _this.tempTel = o.data.contactstel || o.data.mobile;

        _this.curAddress = o.data.address;
        _this.storeName = o.data.name;
        _this.storeTel = o.data.telphone;
        _this.pickerIndex = parseInt(o.data.category) - 1;
        _this.device.has1 = (o.data.iswifi == 1);
        _this.device.has2 = (o.data.isparking == 1);
        _this.device.has3 = (o.data.isalipay == 1);
        _this.device.has4 = (o.data.iswechat == 1);
        _this.latitude = o.data.latitude;
        _this.longitude = o.data.longitude;
        _this.storeInfo = o.data.introduction;
        _this.consumption = o.data.consumption;
        o.data.fasetSelects.forEach(oElement=>{
          _this.fasetSelects.forEach(tElement=>{
            if(oElement.type === tElement.type){
              oElement.items.forEach(oElementItem=>{
                tElement.items.forEach(tElementItem=>{
                  if(oElementItem.itemName === tElementItem.itemName){
                    tElementItem.isSelect = true;
                  }
                })
              });
            }
          })
        });
        _this.fasetSelects = JSON.parse(JSON.stringify( _this.fasetSelects));
        // let op = (o.data.businessstart <= 9) ? '0' + o.data.businessstart : o.data.businessstart;
        // let ed = (o.data.businessend <= 9) ? '0' + o.data.businessend : o.data.businessend;
        // for (let i = 0, len = _this.dateArr.length; i < len; i++) {
        //   let start = _this.dateArr[i].split(':')[0];
        //   let end = _this.dateArr[i].split(':')[0];
        //   if (op == start) {
        //     _this.startIndex = i;
        //   } else if (ed == end) {
        //     _this.endIndex = i;
        //   }
        // }
        _this.startValue = o.data.businessstart || "01:00";
        _this.endValue = o.data.businessend || "01:00";
        _this.bannerSort = o.banner_num;
        _this.detailSort = o.detail_num;
        return _this.callBackLI({data: o.img});
      },
      editSubFn() {
        let _this = this;
        // let start = _this.dateArr[_this.startIndex].split(':')[0];
        // let end = _this.dateArr[_this.endIndex].split(':')[0];
        let start = _this.startValue;
        let end = _this.endValue;
        let o = {
          url: Api.url_join_edit_opened,
          data: {
            shopid: _this.curId,
            name: _this.name,
            tel: _this.tel,
            mobile: _this.tel,
            latitude: _this.latitude,
            longitude: _this.longitude,
            location: _this.curAddress,
            storename: _this.storeName,
            storetel: _this.storeTel,
            consumption: _this.consumption,
            starttime: start,
            endtime: end,
            storetype: _this.typeArr[_this.pickerIndex].id,
            iswifi: (_this.device.has1) ? 1 : 2,
            isparking: (_this.device.has2) ? 1 : 2,
            isalipay: (_this.device.has3) ? 1 : 2,
            iswxpay: (_this.device.has4) ? 1 : 2,
            storeinfo: _this.storeInfo,
            openid: store.state.openId,
            session_key: store.state.session_key,
          },
          cb: _this.callBackEdit
        };
        if (_this.tel != _this.tempTel) {
          o.data.code = _this.telCode;
        }
        let tmpSelect = [];
        _this.fasetSelects.forEach(element=>{
          let tmpElement = JSON.parse(JSON.stringify(element));
          tmpElement.items=[];
          element.items.forEach(elementItem=>{
            if(elementItem.isSelect){
              tmpElement.items.push(elementItem);
            }
          });
          tmpSelect.push(tmpElement);
        });
        console.log("tmpSelect",tmpSelect);
        o.data.fasetSelects = JSON.stringify(tmpSelect);
        store.commit('reqInfo', o);
      },
      callBackEdit(o) {
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/account/main'
          });
        }, 1000)
      },
      getAgreeFn() {
        let _this = this;
        if (_this.agreementInfo.length == 0) {
          let o = {
            url: Api.url_help_agreement + "?title=商户入驻协议",
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
      },
      clickItem(item,fasetSelect){
        let type = fasetSelect.type;
        console.log("选中")
        let _this = this;
        let canChange = true;
        item.isSelect||_this.fasetSelects.forEach(element=>{
          if(element.type === type){
            let selectNums = 1;
            let maxNum = type === '01' ? 1 : 3;
            element.items.forEach(elementItem=>{
              if(elementItem.isSelect){
                if(selectNums>=maxNum){
                  wx.showToast({
                    title: fasetSelect.name + "不得超过" + maxNum + "个",
                    icon: 'none',
                    duration: 1500
                  });
                  canChange = false;
                  return;
                }
                selectNums++;
              }
            })
          }
        });
        console.log("执行选中/取消选中",item.isSelect+'');
        canChange&&this.$set(item,"isSelect",!item.isSelect);
        console.log("执行选中/取消选中",item.isSelect+'');
      },




      initFastSelect() {
        let _this = this;
        return new Promise(function(resolve,reject){
          let o = {
            url: Api.url_fastselect,
            data: {},
            cb: _this.fastCallBack,
            resolve: resolve
          };
          store.commit("getInfo", o);
        });
      },
      fastCallBack(res,resolve){
        console.log("获取faseselect",res);
        this.$set(this,"fasetSelects",res.data.fasetSelects);
        resolve();
      },

      powerDrawer: function(currentStatu) {
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
              this.showModalStatus = false;
          }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
          this.setData({
            showModalStatus: true
          });
        }
      },
      getUserInfo(e){
        console.log("getUserInfo");
        let obj = {
          e: e,
          that: this,
          cb: () => {
            return this.loadAlready();
          }
        }
        store.commit("getUserInfoBtn",obj);
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
      }
    }
  }
</script>
