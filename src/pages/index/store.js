// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import defImg from '../../../static/img/defstore.png'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    debug: false,
    doMain: 'https://www.zhongxiangliquan.com/index.php',
    getSessionUrl: '/home/program/userinfo',
    // getSessionUrl: '/home/program/cs_userinfo',
    userInfo: '',
    defStore: defImg,
    hasOpened: 1,
    mobile: 1,
    name: false,
    openId: 1,
    session_key: '',
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
    updateState(state, obj) {
      for (let key in obj){
        let keys = key.split(".");
        if (keys.length === 2) {
          state[keys[0]][keys[1]] = obj[key];
        } else if (keys.length === 3) {
          state[keys[0]][keys[1]][keys[2]] = obj[key];
        } else {
          state[key] = obj[key];
        }
      }
    },
    // updateState(state, obj) {
    //   /**
    //    * 通过循环设置 key的内容
    //    * @param stateObj 当前循环的对象
    //    * @param objValue 需要设置的值
    //    * @param keys keys的数组
    //    * @param length keys的长度
    //    */
    //   let setState = function (stateObj, objValue, keys, length) {
    //     if (length > 1) {
    //       length = length - 1;
    //       setState(stateObj[keys[keys.length - length - 1]], objValue, keys, length);
    //     } else {
    //       stateObj[keys[keys.length - length]] = objValue;
    //     }
    //   };
    //   for (let key in obj) {
    //     let keys = key.split('.');
    //     let keysLength = keys.length;
    //     setState(state, obj[key], keys, keysLength);
    //   }
    // },
    getUserInfoFn(state, obj) {
      (state.debug) ? console.log("getUserInfoFn") : '';
      let cb = obj.cb;
      let _this = this;
      let that = obj.that;
      console.log("testgniodgnio:", _this, _this.session_key);
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
                  (state.debug)&&console.log("成功",info);
                  _this.state.userInfo = info.userInfo;
                  wx.login({
                    success: res => {
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      // return cb();
                      wx.showLoading({mask: true});
                      // TODO 参数新增一个商户id字段，从store获取，从分享进来的用户，带入id
                      let o = {
                        url: state.getSessionUrl,
                        data: {
                          code: res.code,
                          nickName: info.userInfo.nickName,
                          avatarUrl: info.userInfo.avatarUrl,
                          shop_id: obj.shop_id || ""
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
              wx.hideLoading();
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
      if (info.userInfo) {
        state.userInfo = info.userInfo;
      } else {
        wx.showModal({
          title: '提示',
          content: '您已拒绝小程序获取用户信息！',
          success: function (res) {
          }
        });
        return;
      }
      
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
              avatarUrl: info.userInfo.avatarUrl,
              shop_id: obj.shop_id || ""
            },
            cb: cb,
            isGetSession: true
          };
          store.commit('reqInfo', o);
        }
      })
    },
    getInfo: (state, o) => {
      (state.debug) ? console.log("getInfo",o) : '';
      let _store = this;
      let hasRetry = o.hasRetry || false;
      let url = state.doMain;
      url = url + o.url;
      let mOpenId = wx.getStorageSync('openId') || state.openId;
      let mSessionKey = wx.getStorageSync('session_key') || state.session_key;
      // console.log("mOpenId:", mOpenId, "mSessionKey", mSessionKey, "state.openId", state.openId, "state.session_key", state.session_key);
      if (o.url.indexOf('?') != -1) {
        url += "&openid=" + mOpenId + "&session_key=" + mSessionKey;
      } else {
        url += "?openid=" + mOpenId + "&session_key=" + mSessionKey;
      }
      let that = o.that;
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
                    if (got.msg == '用户不存在') {
                      // wx.showModal({
                      //   title: '测试',
                      //   content: 'wx.getStorageSync:' + wx.getStorageSync('openId') + ", wx.getStorageSync:" +  wx.getStorageSync('session_key') + ",state.session_key:" + state.session_key + ", state.openId:" + state.openId,
                      //   success: function (res) {
                      //     if (res.confirm) {
                      //     } else if (res.cancel) {
                      //     }
                      //   }
                      // });
                      if (!hasRetry) {
                        o.hasRetry = true;
                        _store.a.commit("getInfo", o);
                      }
                    }
                  }
                  if (o.hideLoading){
                    that.isLoading = false;
                  }
                  if (o.doEmpty){
                    that.isEmpty = true;
                  }
                  wx.hideLoading();
                  break;
              }
            }
          }
        }
      });
    },
    reqInfo: (state, o) => {
      (state.debug) ? console.log("reqInfo",o) : '';
      if (o.mask) {
        wx.showLoading({mask: true});
      }
      let hasRetry = o.hasRetry || false;
      let _store = this;
      let d = o.data;
      let mOpenId = wx.getStorageSync('openId') || state.openId;
      let mSessionKey = wx.getStorageSync('session_key') || state.session_key;
      // console.log("mOpenId:", mOpenId, "mSessionKey", mSessionKey);
      if (!o.isGetSession) {
        d.openid = mOpenId;
        d.session_key = mSessionKey;
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
                    wx.setStorageSync("session_key", got.data.session_key);
                    wx.setStorageSync("openId", got.data.openid);
                    wx.setStorageSync("endTime", got.data.overduetime);
                    wx.setStorageSync("vip", got.data.vip);
                    wx.setStorageSync("shopid", got.data.shopid);
                    wx.setStorageSync("hasOpened", got.data.relation);
                    state.session_key = got.data.session_key;
                    state.openId = got.data.openid;
                    state.hasOpened = got.data.relation;
                    state.isVip = (got.data.vip == 1);
                    state.vip = got.data.vip;
                    state.isShowHX = (got.data.isstaff == 1);
                    state.IDCard = got.data.cardnum;
                    state.endTime = got.data.overduetime;
                    state.mobile = got.data.mobile;
                    state.name = got.data.name;
                    state.shopId = got.data.shopid;
                  }
                  getApp().globalData.store = {};
                  getApp().globalData.store.state = state;
                  return o.cb(got);
                  break;
                case 2:
                  if (got.msg == '用户不存在') {
                    if (!hasRetry) {
                      o.hasRetry = true;
                      _store.a.commit("reqInfo", o);
                    } else {
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
                  //   wx.showModal({
                  //     title: '测试',
                  //     content: 'wx.getStorageSync:' + wx.getStorageSync('openId') + ", wx.getStorageSync:" +  wx.getStorageSync('session_key') + ",state.session_key:" + state.session_key + ", state.openId:" + state.openId,
                  //     success: function (res) {
                  //       if (res.confirm) {
                  //       } else if (res.cancel) {
                  //       }
                  //     }
                  //   });
                  }
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
    },
    initStore: (state, o) => {
      (state.debug) ? console.log("initStore") : '';
      console.log(Number(state.session_key));
      if(Number(state.session_key)===1||Number(state.openId)===1){
        // store.replaceState(o);
      }
    },
    initUserInfo: (state, o) => {
      if(!state.session_key||Number(state.openId)===1){
        (state.debug) && console.log("if");
        wx.showLoading({mask: true});
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            state.tempObj.tempLola.latitude = res.latitude;
            state.tempObj.tempLola.longitude = res.longitude;
          }
        });
        // let obj = {that:this,cb:cb};
        store.commit('getUserInfoFn', o);
      } else {
        (state.debug) && console.log("else");
        o.cb();
      }
    }

  }
})
Vue.prototype.$store = store
export default store
