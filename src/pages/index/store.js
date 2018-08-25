// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import defImg from '../../../static/img/defstore.png'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    debug: true,
    doMain: 'https://www.zhongxiangliquan.com/index.php',
    getSessionUrl: '/home/program/userinfo',
    userInfo: '',
    defStore: defImg,
    hasOpened: 1,
    mobile: 1,
    name: false,
    openId: 1,
    session_key: 1,
    isVip: false,
    isShowHX: false,
    endTime: false,
    IDCard: 0,
    tempObj: {
      getCp: '',
      manOne: '',
      tempUrl: '',
      tempLola: {
        longitude: '',
        latitude: '',
      },
      tempLogo: '',
      showModalStatus: true
    }
  },
  mutations: {
    getUserInfoFn(state, obj) {
      (state.debug) ? console.log("getUserInfoFn") : '';
      let cb = obj.cb;
      let _this = this;
      let that = obj.that;
      
      if (_this.session_key) {
        (state.debug) ? console.log("直接get",_this.session_key) : '';
        typeof cb == "function" && cb(_this.session_key)
      } else {
        (state.debug) ? console.log("setting") : '';
        (state.debug) ? console.log(getApp()) : '';
        wx.getSetting({
          success: function(res){
            (state.debug) ? console.log("setting,res",res) : '';
            if (res.authSetting['scope.userInfo']) {
              // 调用登录接口
              wx.getUserInfo({
                withCredentials: false,
                success: info => {
                  console.log("成功",info);
                  _this.state.userInfo = info.userInfo;
                  wx.login({
                    success: res => {
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      // return cb();
                      wx.showLoading({mask: true});
                      let o = {
                        url: state.getSessionUrl,
                        data: {
                          code: res.code,
                          nickName: info.userInfo.nickName,
                          avatarUrl: info.userInfo.avatarUrl
                        },
                        cb: cb,
                        isGetSession: true
                      };
                      store.commit('reqInfo', o);
                    }
                  })
                },
                fail: info => {
                  (state.debug) ? console.log("失败",info) : '';
                }
              });
            }else{
              (state.debug) ? console.log("弹出确认用户信息界面！",that) : '';
              that.showModalStatus = true;
              
            }
          }
        })
      }
    },
    getUserInfoBtn: (state, obj) => {
      (state.debug) ? console.log(obj) : '';
      let e = obj.e;
      let cb = obj.cb;
      let info = e.target;
      (state.debug) ? console.log("用户信息btn",e) : '';
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // return cb();
          wx.showLoading({mask: true});
          let o = {
            url: state.getSessionUrl,
            data: {
              code: res.code,
              nickName: info.userInfo.nickName,
              avatarUrl: info.userInfo.avatarUrl
            },
            cb: cb,
            isGetSession: true
          };
          store.commit('reqInfo', o);
        }
      })
    },
    getInfo: (state, o) => {
      (state.debug) ? console.time('getInfo') : '';
      (state.debug) ? console.log("getInfo",o) : '';
      let url = state.doMain;
      url = url + o.url;
      if (o.url.indexOf('?') != -1) {
        url += "&openid=" + state.openId + "&session_key=" + state.session_key;
      } else {
        url += "?openid=" + state.openId + "&session_key=" + state.session_key;
      }
      
      wx.request({
        url: url,
        data: o.data,
        dataType: 'JSON',
        header: {"Content-Type": "application/x-www-form-urlencoded"},
        success: function (res) {
          if (res.data) {
            let got=''
            try{
              got = JSON.parse(res.data);
            }catch(msg){
              console.log(msg)
              got = {};
              got.msg = res.statusCode + '';
            }
            (state.debug) ? console.log(got) : '';
            if (o.noStatus) {
              return o.cb(got,o.resolve);
            } else {
              switch (got.status) {
                case 1:
                  return o.cb(got,o.resolve);
                  break;
                default:
                  if (!o.hideAlert) {
                    wx.showModal({
                      title: '提示',
                      content: got.msg,
                      success: function (res) {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                      }
                    });
                  }
                  wx.hideLoading();
                  break;
              }
            }
          }
        }
      });
      (state.debug) ? console.timeEnd('getInfo') : '';
    },
    reqInfo: (state, o) => {
      (state.debug) ? console.log("reqInfo",o) : '';
      if (o.mask) {
        wx.showLoading({mask: true});
      }
      let d = o.data;
      if (!o.isGetSession) {
        d.openid = state.openId;
        d.session_key = state.session_key;
      }
      (state.debug) ? console.log("reqInfoData",d) : '';
      wx.request({
        url: state.doMain + o.url,
        data: d,
        method: 'POST',
        dataType: 'JSON',
        header: {"Content-Type": "application/x-www-form-urlencoded"},
        success: function (res) {
          if (res.data) {
            let got = JSON.parse(res.data);
            new Promise(function(resolve,reject){
              got = JSON.parse(res.data);
              resolve();
            }).catch(function(msg){
              console.log(msg);
            });
            (state.debug) ? console.log(got) : '';
            wx.hideLoading();
            if (o.noStatus) {
              return o.cb(got);
            } else {
              switch (got.status) {
                case 1:
                  if (o.isGetSession) {
                    wx.hideLoading();
                    state.session_key = got.data.session_key;
                    state.openId = got.data.openid;
                    state.hasOpened = got.data.relation;
                    state.isVip = (got.data.vip == 1);
                    state.isShowHX = (got.data.isstaff == 1);
                    state.IDCard = got.data.cardnum;
                    state.endTime = got.data.overduetime;
                    state.mobile = got.data.mobile;
                    state.name = got.data.name;
                  }
                  return o.cb(got);
                  break;
                default:
                  wx.showModal({
                    title: '提示',
                    content: got.msg,
                    success: function (res) {
                      if (res.confirm) {
                      } else if (res.cancel) {
                      }
                    }
                  });
                  break;
              }
            }
          }
        },
        fail: function (err) {
          wx.hideLoading();
        }
      })
    }

  }
})
Vue.prototype.$store = store
export default store
