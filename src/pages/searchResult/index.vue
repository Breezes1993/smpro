<template>
  <div>

    <div class="pad-hov-sm pad-ver-xs bg-white text-Bolder text-lg pad-bottom-m">{{searchName||'不限'}}</div>

    <scroll-view scroll-x="true"  class="bg-white text-sm posReal" style="margin-top:30rpx;" 
      v-for="(fasetSelect,fsIndex) in fasetSelects" 
      v-bind:key="fasetSelect.name+fsIndex"
      v-if="fasetSelect.type !== searchType">
      <div class="flexBox pad-ver-xs pad-hov-xs" style="overflow-x: auto;">
        <span @click="clickItem(item)" :class="'fs-item2 ' + (item.isSelect===true?'fs-select':'')" style="color:#000;flex-shrink:0;" v-for="(item,itemIndex) in fasetSelect.items" v-bind:key="item.itemName+itemIndex">{{item.itemName}}</span>
      </div>
    </scroll-view>

    <div class="bg-white text-sm">

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
    <!-- <div style="height:40px;width:100%;" v-show="!isLoading&&!isEmpty"></div> -->
    <div class="te-cen b-t1" v-show="isLoading">
      <div class="pad-ver-xs bg-white">
        <img src="/static/img/reflash.png" class="ver-mid" style="height: 60rpx;width: 60rpx;"
              :animation="animationD">
        <span class="pad-left-sm ver-mid">加载更多...</span>
      </div>
    </div>

    <p class="pad-sm te-cen bg-white b-t1" v-if="isEmpty">已经到底了</p>

    <div class="te-cen pad-top-sm text-999 text-sm" v-show="resultArr.length!==0">
      <div>
        <img src="/static/img/comLogo.png" class="ver-mid" style="width: 70rpx;height: 70rpx;">
        <span class="pad-left-xs ver-mid">众享礼券</span>
      </div>
      <p class="pad-top-xs">厦门中企信科技有限公司</p>
    </div>
    <div class="pad-top-big" v-if="resultArr.length==0&&!isLoading">
      <div>
        <img src="/static/img/nocomms.png" class="block mar0A" style="width: 200rpx;height: 200rpx;">
      </div>
      <p class="pad-top-lg te-cen text-999">{{searchType==='01'?(clickName==='不限'?'':'此分类')+'暂无'+searchName+'店铺入驻':(clickName==='不限'?'':'此商圈')+'暂无'+searchName+'店铺入驻'}}</p>
      <!-- <p class="pad-top-lg te-cen text-999">{{'此'+name+'暂无'+searchName+'店铺入驻'}}</p> -->
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
        isLoading: false,
        animation: {},
        animationD: '',
        rotateNum: 0,
        resultArr: [],

        searchType: '01',
        searchName: "",
        clickName: "不限",
        name:"",
        fasetSelects: []
        // [{
        //   name: "商圈",
        //   type: "01",
        //   items:[{
        //     itemName: "不限"
        //   },{
        //     itemName: "SM城市"
        //   },{
        //     itemName: "中山路"
        //   },{
        //     itemName: "中华城"
        //   },{
        //     itemName: "沙坡尾"
        //   },{
        //     itemName: "火车站"
        //   },{
        //     itemName: "排挡"
        //   },]
        // },{
        //   name: "行业",
        //   type: "02",
        //   items:[{
        //     itemName: "不限"
        //   },{
        //     itemName: "SM城市"
        //   },{
        //     itemName: "中山路"
        //   },{
        //     itemName: "中华城"
        //   },{
        //     itemName: "沙坡尾"
        //   },{
        //     itemName: "火车站"
        //   },{
        //     itemName: "排挡"
        //   },{
        //     itemName: "香港"
        //   },]
        // }]
      }
    },
    onLoad(o) {
      (store.state.debug)&&console.log("onload,option",o);
      this.clickName = "不限";
      this.curPage = 1;
      this.searchInp = '';
      if(!o){
        return;
      }
      this.lastInp='';
      this.searchInp='';
      this.resultArr = [];
      if(o.searchType){
        this.searchType = o.searchType;
      }
      if(o.searchName) {
        this.searchName = o.searchName;
      }
      this.name = o.name;
      this.subSearchFn();

    },
    onReachBottom() {
      let _this = this;
      (store.state.debug)&&console.log("onreach");
      if (!_this.isEmpty && !_this.isLoading) {
        _this.isLoading = true;
        (store.state.debug)&&console.log("isLoading",_this.isLoading,"isEmpty",_this.isEmpty)
        _this.curPage++;
        _this.$nextTick(() => {
          return _this.searchFn(_this.searchInp);
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initHis();
        this.initFastSelect();
        this.initAnimat();
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
      searchFn(searchInp) {
        let _this = this;
        _this.setKw();
        return _this.subSearchFn(searchInp,true);
      },
      subSearchFn(searchName,isOnReach) {
        // wx.showLoading({mask: false});
        let _this = this;
        _this.isLoading = true;
        searchName = searchName === '不限' ? '' : searchName;
        _this.searchName = _this.searchName === '不限' ? '' : _this.searchName;
        (store.state.debug)&&console.log("subSearchFn",searchName);
        let kw = searchName;
        let search = "";
        if (kw||kw==='') {
          search = kw;
          // _this.searchName = kw;
          _this.searchInp = kw;
        }
        let name = _this.searchType==='01' ? _this.searchName : search;
        let name2 = _this.searchType==='01' ? search : _this.searchName;
        let searchCondition = "?trading_area=" + name + "&industry=" + name2;


        if (_this.lastInp != _this.searchInp) {
          _this.resultArr = [];
          _this.curPage = 1;
          _this.isEmpty = false;
        } else if(!searchName||isOnReach){
          
        }else{
          _this.isLoading = false;
          return;
        }

        let o = {
          // url: Api.url_index_near + "?name=" + search + "&from=" + _this.searchType
          url: Api.url_index_near + searchCondition
          + "&longitude=" + store.state.tempObj.tempLola.longitude
          + "&latitude=" + store.state.tempObj.tempLola.latitude
          + "&page=" + _this.curPage,
          data: {},
          cb: _this.callBackSearch,
          hideAlert: true,
          that:_this,
          hideLoading: true,
          doEmpty: true
        };

        _this.isEmpty = false;
        (store.state.debug)&&console.log("执行了return 2")
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
        _this.isLoading = false;
        // wx.hideLoading();
      },
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      setDefImg(index) {
        this.resultArr[index].src = store.state.defStore;
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
        (store.state.debug)&&console.log("获取faseselect",res);
        res.data.fasetSelects.forEach(element=>{
          element.items.splice(0,0,{itemName:"不限",isSelect: true});
        });
        this.$set(this,"fasetSelects",res.data.fasetSelects);
      },
      clickItem(item){
        if(this.isLoading){
          this.isLoading = false;
          return;
        }
        let name = item.itemName;
        this.clickName = name;
        (store.state.debug)&&console.log(JSON.stringify(this.fasetSelects))
        this.fasetSelects.forEach(element=>{
          element.items.forEach(elementItem=>{
            (store.state.debug)&&console.log(JSON.stringify(elementItem));
            delete elementItem.isSelect;
          })
        })
        this.$set(item,"isSelect",true);
        this.curPage = 1;
        this.subSearchFn(name);
      },
      initAnimat() {
        let _this = this;
        _this.animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'linear',
          delay: 0,
          transformOrigin: '50% 50% 0',
          success: function (res) {
            //console.log(res)
          }
        });
        setInterval(() => {
          _this.rotateNum++;
          _this.animation.rotate(180 * _this.rotateNum).step();
          _this.animationD = _this.animation.export();
          if (_this.rotateNum >= Number.MAX_VALUE) {
            _this.rotateNum = 0;
          }
        }, 500)
      },
    }
  }
</script>
