<template>
  <div>

    <div class="pad-hov-sm pad-ver-xs bg-white">
      <div class="pad-hov-xs pad-ver-xs overHid rad500 searchBorder">
        <input type="text" class="block te-cen" v-model="searchInp" placeholder="搜索" confirm-type="search"
               @confirm="searchFn">
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

    <div class="bg-white text-sm pad-ver-xs pad-hov-smb2 posReal" v-for="(fasetSelect,fsIndex) in fasetSelects" v-bind:key="fasetSelect.name+fsIndex">
      <div class="pad-ver-xs pad-hov-xs text-lg text-Bolder">
        <span class="fs-tag"></span>
        <p style="margin-left:10rpx;">{{fasetSelect.name}}</p>
      </div>
      <div class="flexBox changeLine pad-ver-xs pad-hov-xs">
        <span @click="clickItem(fasetSelect.type,item.itemName)" class="fs-item" v-for="(item,itemIndex) in fasetSelect.items" v-bind:key="item.itemName+itemIndex">{{item.itemName}}</span>
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
        }]
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
          cb: _this.callBackSearch
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


      clickItem(type,searchName){
        wx.navigateTo({
          url: "/pages/searchResult/main" + '?searchName=' + searchName + '&searchType=' + type
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
          element.items.push({itemName:"不限"});
        });
        this.$set(this,"fasetSelects",res.data.fasetSelects);
      }
    }
  }
</script>
