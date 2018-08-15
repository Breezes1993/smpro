<template>
  <div>

    <div class="pad-sm bg-white" style="padding-bottom: 0">
      <div class="flexBox ver-cen">
        <!--<div class="flex15">
          <p class="">杭州 <img src="/static/img/arrow_d.png" class="ver-mid" style="width: 15rpx;height: 15rpx;"></p>
        </div>-->
        <div class="flexAuto">
          <div class="pad-ver-xs rad500 bg-gray overHid">
            <input type="text" class="block bg-gray te-cen" placeholder="请输入关键字"
                   @confirm="searchFn" confirm-type="search" @input="inputFn">
          </div>
        </div>
        <div class="flex8 te-right" @click="searchFn">
          <icon type="search" size="19" class="ver-mid"></icon>
        </div>
      </div>
    </div>

    <div class="bg-white pad-ver-xs">

      <div class="pad-hov-sm pad-top-sm" v-for="(item,index) in artList" :key="index" :wx:key="index"
           @click="toArticle(item.id,item.url)">
        <img :src="item.image" class="block rad6" mode="widthFix">
        <p class="te-cen pad-top-xs ell">{{item.title}}</p>
      </div>

    </div>

    <p class="pad-sm te-cen bg-white b-t1" v-if="isEmpty">已经到底了</p>


  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from '../index/store'

  export default {
    data() {
      return {
        curPage: 1,
        artList: [],
        isEmpty: false,
        searchInp: '',
        isSearch: false
      }
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.loadListFn();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.loadListFn();
      })
    },
    methods: {
      loadListFn() {
        let _this = this;
        let o = {
          url: Api.url_art_list,
          data: {page: _this.curPage},
          cb: _this.callBackLL,
          noStatus: true
        };
        if (_this.isSearch) {
          o.data.title = _this.searchInp;
        }
        store.commit('reqInfo', o);
      },
      callBackLL(o) {
        let _this = this;
        switch (o.status) {
          case 1:
            for (let i = 0, len = o.data.length; i < len; i++) {
              _this.artList.push(o.data[i])
            }
            break;
          case 2:
            _this.isEmpty = true;
            break;
          default:
            break;
        }
      },
      toArticle(id, url) {
        if (url) {
          store.state.tempObj.tempUrl = url;
          wx.navigateTo({
            url: '/pages/webVPage/main'
          });
          return;
        } else {
          wx.navigateTo({
            url: '/pages/article/main' + '?id=' + id
          })
        }
      },
      inputFn(e) {
        let _this = this;
        _this.searchInp = e.target.value;
        if (e.target.value.length === 0) {
          _this.curPage = 1;
          _this.artList = [];
          _this.searchInp = '';
          _this.isEmpty = false;
          _this.isSearch = false;
          _this.loadListFn();
        }
      },
      searchFn() {
        let _this = this;
        if (_this.searchInp.trim().length > 0) {
          _this.curPage = 1;
          _this.artList = [];
          _this.isEmpty = false;
          _this.isSearch = true;
          return _this.getSearch();
        } else {
          wx.showToast({
            title: '请输入需要查找的内容',
            icon: 'none',
            duration: 1000
          });
        }
      },
      getSearch() {
        let _this = this;
        let o = {
          url: Api.url_art_list + "?title=" + _this.searchInp + "&page=" + _this.curPage,
          data: {},
          cb: _this.callBackLL,
          noStatus: true
        };
        store.commit('getInfo', o);
      },
    }
  }
</script>
