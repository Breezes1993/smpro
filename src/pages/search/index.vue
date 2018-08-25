<template>
  <div>

    <div class="pad-hov-sm pad-ver-xs bg-white">
      <div class="pad-hov-xs pad-ver-xs overHid rad500 searchBorder">
        <input type="text" class="block te-cen" v-model="searchInp" placeholder="搜索" confirm-type="search"
               @confirm="searchFn" v-on:input ="inputFunc">
      </div>
    </div>

    <!-- <div class="bg-white pad-hov-xs pad-ver-xs text-xs" v-if="kwArr.length>0"> -->
    <div class="bg-white pad-hov-xs pad-ver-xs text-xs" v-if="false">

      <span class="kwOne" v-for="(item,index) in kwArr" :key="index" :wx:key="index"
            @click="subSearchFn(item)">{{item}}</span>

      <div class="te-cen">
        <div class="pad-hov-xs pad-ver-xs inb round bg-red" @click="delKwFn">
          <img src="/static/img/del.png" class="ver-mid round" style="width: 50rpx;height: 50rpx;">
        </div>
      </div>
    </div>

    <div class="bg-white text-sm pad-ver-xs pad-hov-smb2 posReal" v-show="!showResult" v-for="(fasetSelect,fsIndex) in fasetSelects" v-bind:key="fasetSelect.name+fsIndex">
      <div class="pad-ver-xs pad-hov-xs text-lg text-Bolder">
        <span class="fs-tag"></span>
        <p style="margin-left:10rpx;">{{fasetSelect.name}}</p>
      </div>
      <div class="flexBox changeLine pad-ver-xs pad-hov-xs">
        <span @click="clickItem(fasetSelect,item.itemName)" class="fs-item" v-for="(item,itemIndex) in fasetSelect.items" v-bind:key="item.itemName+itemIndex">{{item.itemName}}</span>
      </div>
    </div>
    <div class="bg-white text-sm" v-show="showResult">

      <div class="pad-sm b-t1" v-for="(item,index) in resultArr" @click="toStore(item.id)" :key="index"
           :wx:key="index">
        <div class="flexBox">
          <div class="flex25">
            <img :src="item.logo" class="block" style="width: 170rpx;height: 170rpx;" @error="setDefImg(index)">
          </div>
          <div class="flexAuto">
            <div class="pad-left-sm">

              <div class="flexBox ver-cen">
                <div class="flexAuto">
                  <p class="ell">{{item.name}}</p>
                </div>
                <div class="flexAuto te-right">
                  <p class="text-danger">
                    <img src="/static/img/hot.png" class="ver-mid" style="width: 36rpx;height: 36rpx;">
                    <span class="ver-mid pad-left-xs">人气 {{item.popularity || 0}}</span>
                  </p>
                </div>
              </div>

              <div class="flexBox ver-cen pad-top-xs singleLine">
                <div class="flexAuto">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=1">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=2">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=3">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=4">
                  <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate==5">
                  <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=1.1&&item.evaluate<2">
                  <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=2.1&&item.evaluate<3">
                  <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=3.1&&item.evaluate<4">
                  <img src="/static/img/star-half.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                       v-if="item.evaluate>=4.1&&item.evaluate<5">
                  <span class="text-warning ver-mid pad-left-xs">{{item.evaluate}}分</span>
                </div>
                <div class="flexAuto te-right">
                  <img src="/static/img/position_gray.png" class="ver-mid" style="width: 36rpx;height: 36rpx;">
                  <span class="ver-mid pad-left-xs">{{item.disShow}}</span>
                </div>
              </div>

              <p class="ell text-999 pad-top-xs">{{item.address}}</p>
              <div class="flexBox ver-cen pad-top-xs" v-if="item.typefrom>0">
                <div class="flex8">
                  <p class="btn btn-danger btn-lit btn-radius" v-if="item.typefrom==1">金</p>
                  <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==2">折</p>
                  <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==3">通</p>
                </div>
                <div class="flexAuto">
                  <p class="pad-left-xs ell">{{item.quanname}}</p>
                </div>
                <!--<div class="flexAuto">
                  <p class="ell text-999">满5000以上可以可以可以可以可以</p>
                </div>-->
              </div>
              <!--<div class="flexBox ver-cen pad-top-xs">
                <div class="flex8">
                  <p class="btn btn-danger btn-lit btn-radius">金</p>
                </div>
                <div class="flexAuto">
                  <p class="pad-left-xs">642.00代金券</p>
                </div>
                <div class="flexAuto">
                  <p class="ell text-999">满5000以上可以可以可以可以可以</p>
                </div>
              </div>-->

            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="pad-top-big" v-if="resultArr.length==0&&showResult">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">暂无此{{name}}店铺</p>
    </div>
  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        kwArr: [],
        searchInp: '',
        lastInp: '',
        curPage: 1,
        isEmpty: false,
        resultArr: [],

        fasetSelects: [{
          name: "商圈",
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
          name: "行业",
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
          },]
        }],
        showResult: false
      }
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.searchFn();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initHis();
        this.initFastSelect();
      })
    },
    methods: {
      initHis() {
        let _this = this;
        wx.getStorage({
          key: 'keyword',
          success: function (res) {
            _this.kwArr = JSON.parse(res.data)
          }
        })
      },
      setKw() {
        let _this = this;
        for (let i = 0, len = _this.kwArr.length; i < len; i++) {
          if (_this.searchInp == _this.kwArr[i]) {
            return;
          }
        }
        _this.kwArr.push(_this.searchInp);
        wx.setStorage({
          key: "keyword",
          data: JSON.stringify(_this.kwArr)
        })
      },
      delKwFn() {
        let _this = this;
        wx.showModal({
          title: '',
          content: '确定删除历史？',
          success: function (res) {
            if (res.confirm) {
              _this.kwArr = [];
              wx.removeStorage({
                key: 'keyword',
                success: function (res) {
                }
              })
            } else if (res.cancel) {
            }
          }
        })

      },
      inputFunc(event){
        console.log("inputFunc",event);
        if(event.mp.detail.value.length===0){
          this.showResult = false;
        }
      },
      searchFn() {
        let _this = this;
        if (_this.searchInp.length == 0) {
          wx.showToast({
            title: '请输入需要查找的内容',
            icon: 'none',
            duration: 1000
          });
          return;
        }
        this.showResult = true;
        _this.setKw();
        return _this.subSearchFn();
      },
      subSearchFn(kw) {
        console.log("subSearchFn",kw)
        
        let _this = this;
        let search = _this.searchInp;
        if (kw) {
          search = kw;
          _this.searchInp = kw
        }
        let o = {
          url: Api.url_index_near + "?title=" + search
          + "&longitude=" + store.state.tempObj.tempLola.longitude
          + "&latitude=" + store.state.tempObj.tempLola.latitude
          + "&page=" + _this.curPage,
          data: {},
          cb: _this.callBackSearch,
          hideAlert: true
        };

        if (_this.lastInp != _this.searchInp) {
          _this.resultArr = [];
          _this.curPage = 1;
          _this.isEmpty = false;
        } else {
          return;
        }

        store.commit('getInfo', o);
      },
      callBackSearch(o) {
        let _this = this;
        let arr = o.data || [];
        for (let i = 0, len = arr.length; i < len; i++) {
          let num = arr[i].distance || 0;
          num = parseFloat(num).toFixed(2);
          num = (num > 1000) ? (num / 1000).toFixed(2) + 'km' : parseInt(num) + 'm';
          arr[i].disShow = num;
          _this.resultArr.push(arr[i]);
        }
        _this.lastInp = _this.searchInp;
        _this.isEmpty = (o.data.length < 5);
      },
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      setDefImg(index) {
        this.storeArr[index].src = store.state.defStore;
      },


      clickItem(fasetSelect,searchName){
        let type = fasetSelect.type;
        let name = fasetSelect.name;
        wx.navigateTo({
          url: "/pages/searchResult/main" + '?searchName=' + searchName + '&searchType=' + type + '&name=' + name
        });
      },
      initFastSelect() {
        let o = {
          url: Api.url_fastselect,
          data: {},
          cb: this.fastCallBack
        };
        store.commit("getInfo", o);
      },
      fastCallBack(res){
        console.log("获取faseselect",res);
        res.data.fasetSelects.forEach(element=>{
          element.items.splice(0,0,{itemName:"不限"});
        });
        this.$set(this,"fasetSelects",res.data.fasetSelects);
      }
    }
  }
</script>
