Component({
  ready: function() {
    let _this = this;
    // _this.setData({
    //   "store.state": getApp().globalData.store.state
    // });
    var sysInfo = wx.getSystemInfoSync();
    this.setData({
      screenHeight: sysInfo.screenHeight
    });
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        _this.setData({
          "pos.la": res.latitude,
          "pos.lo": res.longitude,
          "store.state.tempObj.tempLola.latitude": res.latitude,
          "store.state.tempObj.tempLola.longitude": res.longitude
        });
      }
    });
    this.initCateFn();
    this.initJoinNews();
  },
  properties: {
    hasO: {
      type: Number,
      value: 2,
      observer: function(newVal, oldVal, changedPath) {
        console.log("hasO", newVal);
        this.setData({
          hasO: newVal
        })
     }
    }
  },
  data: {
    mCity: '厦门',
    curTab: 1,
    curRate: 3.6,
    curAddress: '当前地址',
    animation: {},
    animationD: '',
    rotateNum: 0,
    isLoading: true,
    imgArr: [],
    textArr: [],
    pos: {
      lo: 118.129281,
      la: 24.490659
    },
    storeArr: [],
    storeArr2: [],
    curPage: 1,
    isEmpty: false,
    cateArr: [],
    curCate: -1,
    showCate: '',
    // hasO: 2,
    verifyCode: -1,
    showModalStatus: false,
    screenHeight: 800,
    store: {
      state: {
        debug: false,
        doMain: 'https://www.zhongxiangliquan.com/index.php',
        getSessionUrl: '/home/program/userinfo',
        userInfo: '',
        defStore: '/static/img/defstore.png',
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
      }
    }
  },
  methods: {
    scrolltolower() {
      console.log('-------scroll--------');
      console.log('onReachBottom');
      let _this = this;
      //console.log("进入onReachBottom",_this.isEmpty+"",_this.isLoading+"")
      if (!_this.data.isEmpty && !_this.data.isLoading) {
        // console.log('进入');
        //console.log("执行")
        _this.setData({
          isLoading: true,
          curPage: _this.data.curPage + 1
        });
        _this.initInfoFn();
      }
      console.log('onReachBottom');
    },
    initInfoFn() {
      let _this = this;
      _this.setData({
        hasO: wx.getStorageSync("hasOpened") || _this.data.store.state.hasOpened
      });
      let o = {
        url: "/home/program/nearshop",
        data: {
          longitude: _this.data.pos.lo,
          latitude: _this.data.pos.la,
          page: _this.data.curPage,
          type: _this.data.curCate,
          order: _this.data.curTab
        },
        cb: _this.callBackInit,
        noStatus: true
      };
      setTimeout(function() {
        _this.reqInfo(o);
      }, 500);
    },
    callBackInit(o) {
      let _this = o._this;
      switch (o.status) {
        case 1:
          let arr = o.data || [];
          for (let i = 0, len = arr.length; i < len; i++) {
            let num = arr[i].distance || 0;
            num = parseFloat(num).toFixed(2);
            num = (num > 1000) ? (num / 1000).toFixed(2) + 'km' : parseInt(num) + 'm';
            arr[i].disShow = num;
            delete arr[i].distance;
            delete arr[i].latitude;
            delete arr[i].longitude;
            delete arr[i].category;
            delete arr[i].describe;
            // delete arr[i].address;
            // delete arr[i].disShow;
            // delete arr[i].evaluate;
            // delete arr[i].id;
            // delete arr[i].logo;
            // delete arr[i].name;
            // delete arr[i].popularity;
            // delete arr[i].quanname;
            // delete arr[i].telphone;
            // delete arr[i].top;
            // delete arr[i].typefrom;
            // _this._this.data.storeArr.push(JSON.parse(JSON.stringify(arr[i])));
          }
          _this.setData({
            storeArr: _this.data.storeArr.concat(arr),
            isEmpty: (arr.length === 0),
            curAddress: o.address
          });
          break;
        default:
          _this.setData({
            isEmpty: true
          });
          break;
      }
      _this.setData({
        isLoading: false
      });
    },
    initCateFn() {
      //console.log("initCateFn");
      let _this = this;
      let o = {
        url: "/home/program/shopcategory",
        data: {},
        cb: _this.callBackCate
      };
      _this.getInfo(o);
    },
    callBackCate(o) {
      //console.log("callBackCate",o);
      let _this = o._this;
      _this.setData({
        cateArr: o.data
      });
      if (o.data.length > 0) {
        _this.setData({
          curCate: o.data[0].id,
          showCate: o.data[0].name
        });
      }
      return _this.initBannerFn();
    },
    initBannerFn() {
      //console.log("initBannerFn");
      let _this = this;
      let o = {
        url: "/home/program/advertisement",
        data: {},
        cb: _this.callBackBan
      };
      _this.getInfo(o);
    },
    callBackBan(o) {
      //console.log("callBackBan");
      let _this = o._this;
      _this.setData({
        imgArr: o.data
      });
      return _this.initInfoFn();
    },
    changeCate(res) {
      let cate = res.currentTarget.dataset.id;
      let name = res.currentTarget.dataset.name;
      let _this = this;
      _this.setData({
        curCate: cate,
        curPage: 1,
        isEmpty: false,
        storeArr: [],
        showCate: name
      });
      _this.initInfoFn();
    },
    changeTabFn(res) {
      let tab = res.currentTarget.dataset.tab;
      let _this = this;
      _this.setData({
        curTab: tab,
        curPage: 1,
        isEmpty: false,
        storeArr: []
      });
      _this.initInfoFn();
    },
    initJoinNews() {
      let _this = this;
      let o = {
        url: "/home/program/joinshop",
        data: {},
        cb: _this.callBackJoin
      };
      _this.getInfo(o)
    },
    callBackJoin(o) {
      let _this = o._this;
      _this.setData({
        textArr: o.data
      });
    },
    openLocationFn() {
      let _this = this;
      wx.chooseLocation({
        success: function(res) {
          _this.setData({
            curAddress: res.name,
            "pos.la": res.latitude,
            "pos.lo": res.longitude,
            curPage: 1,
            storeArr: [],
            isEmpty: false
          });

          _this.initInfoFn();
        }
      })
    },
    toStore(res) {
      wx.navigateTo({
        url: '/pages/storeInfo/main' + '?id=' + res.currentTarget.dataset.id
      })
    },
    toSelectCity(res) {
      console.log(res.currentTarget.dataset);
      wx.navigateTo({
        url: "/pages/selectCity/main" + '?city=' + res.currentTarget.dataset.mCity
      })
    },
    bannerJump(res) {
      let _this = this;
      let type = res.currentTarget.dataset.type;
      let id = res.currentTarget.dataset.id;
      let ty = parseInt(type);
      switch (ty) {
        case 1:
          if (id) {
            wx.navigateTo({
              url: '/pages/storeInfo/main' + '?id=' + id
            });
          }
          break;
        case 2:
          if (id) {
            _this.setData({
              "store.state.tempObj.tempUrl": id
            });
            wx.navigateTo({
              url: '/pages/webVPage/main'
            });
          }
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
    toUpdate() {
      wx.navigateTo({
        url: '/pages/join/main' + '?type=edit' + '&id=' + wx.getStorageSync("shopid") + "&hasOpened=3"
      });
    },

    toSearch() {
      let _this = this;
      _this.setData({
        "store.state.tempObj.tempLola.longitude": _this.data.pos.lo,
        "store.state.tempObj.tempLola.latitude": _this.data.pos.la
      });
      wx.navigateTo({
        url: '/pages/search/main'
      })
    },
    getInfo(o) {
      let _this = this;
      (_this.data.store.state.debug) ? console.log("getInfo", o): '';
      let url = _this.data.store.state.doMain;
      url = url + o.url;
      // if (o.url.indexOf('?') != -1) {
      //   url += "&openid=" + _this.data.store.state.openId + "&session_key=" + _this.data.store.state.session_key;
      // } else {
      //   url += "?openid=" + _this.data.store.state.openId + "&session_key=" + _this.data.store.state.session_key;
      // }
      let mOpenId = wx.getStorageSync('openId') || _this.data.store.state.openId;
      let mSessionKey = wx.getStorageSync('session_key') || _this.data.store.state.session_key;
      if (o.url.indexOf('?') != -1) {
        url += "&openid=" + mOpenId + "&session_key=" + mSessionKey;
      } else {
        url += "?openid=" + mOpenId + "&session_key=" + mSessionKey;
      }

      wx.request({
        url: url,
        data: o.data,
        dataType: 'JSON',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data) {
            let got = ''
            try {
              got = JSON.parse(res.data);
            } catch (msg) {
              console.log(msg)
              got = {};
              got.msg = res.statusCode + '';
            }
            got._this = _this;
            (_this.data.store.state.debug) ? console.log(got): '';
            if (o.noStatus) {
              return o.cb(got, o.resolve);
            } else {
              switch (got.status) {
                case 1:
                  return o.cb(got, o.resolve);
                  break;
                default:
                  if (!o.hideAlert) {
                    wx.showModal({
                      title: '提示',
                      content: got.msg,
                      success: function(res) {
                        if (res.confirm) {} else if (res.cancel) {}
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
    },
    reqInfo(o) {
      let _this = this;
      (_this.data.store.state.debug) ? console.log("reqInfo", o): '';
      if (o.mask) {
        wx.showLoading({
          mask: true
        });
      }
      let d = o.data;
      // if (!o.isGetSession) {
      //   d.openid = _this.data.store.state.openId;
      //   d.session_key = _this.data.store.state.session_key;
      // }
      let mOpenId = wx.getStorageSync('openId') || _this.data.store.state.openId;
      let mSessionKey = wx.getStorageSync('session_key') || _this.data.store.state.session_key;
      if (!o.isGetSession) {
        d.openid = mOpenId;
        d.session_key = mSessionKey;
      }
      (_this.data.store.state.debug) ? console.log("reqInfoData", d): '';
      wx.request({
        url: _this.data.store.state.doMain + o.url,
        data: d,
        method: 'POST',
        dataType: 'JSON',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          if (res.data) {
            let got = JSON.parse(res.data);
            new Promise(function(resolve, reject) {
              got = JSON.parse(res.data);
              resolve();
            }).catch(function(msg) {
              console.log(msg);
            });
            got._this = _this;
            (_this.data.store.state.debug) ? console.log(got): '';
            wx.hideLoading();
            if (o.noStatus) {
              return o.cb(got);
            } else {
              switch (got.status) {
                case 1:
                  if (o.isGetSession) {
                    wx.hideLoading();
                    console.log("got.data", got.data);
                    wx.setStorageSync("session_key", got.data.session_key);
                    wx.setStorageSync("openId", got.data.openid);
                    wx.setStorageSync("endTime", got.data.overduetime);
                    wx.setStorageSync("vip", got.data.vip);
                    wx.setStorageSync("shopid", got.data.shopid);
                    wx.setStorageSync("hasOpened", got.data.relation);
                    _this.setData({
                      "store.state.session_key": got.data.session_key,
                      "store.state.openId": got.data.openid,
                      "store.state.hasOpened": got.data.relation,
                      "store.state.isVip": (got.data.vip == 1),
                      "state.vip": got.data.vip,
                      "store.state.isShowHX": (got.data.isstaff == 1),
                      "store.state.IDCard": got.data.cardnum,
                      "store.state.endTime": got.data.overduetime,
                      "store.state.mobile": got.data.mobile,
                      "store.state.name": got.data.name,
                      "store.state.shopId": got.data.shopid
                    });
                    getApp().globalData.store = _this.data.store;
                  }
                  return o.cb(got);
                  break;
                default:
                  wx.showModal({
                    title: '提示',
                    content: got.msg,
                    success: function(res) {
                      if (res.confirm) {} else if (res.cancel) {}
                    }
                  });
                  break;
              }
            }
          }
        },
        fail: function(err) {
          wx.hideLoading();
        }
      })
    }
  }
});