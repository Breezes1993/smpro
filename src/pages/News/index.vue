<template>
  <div>
    <scroll-view scroll-x="true"  class="bg-white text-sm posReal" style="margin-top:30rpx;" 
      v-for="(fasetSelect,fsIndex) in fasetSelects" 
      v-bind:key="fasetSelect.name+fsIndex"
      v-if="fasetSelect.type === '02'" v-show="false">
      <div class="flexBox pad-ver-xs pad-hov-xs" style="overflow-x: auto;">
        <span @click="clickItem(item)" :class="'fs-item2 ' + (item.isSelect===true?'fs-select':'')" style="color:#000;flex-shrink:0;" v-for="(item,itemIndex) in fasetSelect.items" v-bind:key="item.itemName+itemIndex">{{item.itemName}}</span>
      </div>
    </scroll-view>
    <div class="pad-top-sm" v-for="(item,index) in infoArr" :key="index" :wx:key="index">
      <div class="bg-white pad-top-sm pad-hov-sm pad-bottom-xs">

        <div class="flexBox ver-cen">
          <div class="flex15" @click="toStore(item.shopid)">
            <img :src="item.logo" class="block round" style="height: 100rpx;width: 100rpx;">
          </div>
          <div class="flexAuto">
            <div class="pad-left-sm">
              <p class="text-sm" @click="toStore(item.shopid)">{{item.shopname}}</p>
              <p class="text-sm text-999 pad-top-xs">{{item.time}}</p>
            </div>
          </div>
          <div class="flex8">
            <p class="btn btn-danger btn-lit btn-radius" v-if="item.typefrom==1" @click="toStore(item.shopid)">券</p>
            <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==2" @click="toStore(item.shopid)">折</p>
            <p class="btn btn-waring btn-lit btn-radius" v-if="item.typefrom==3" @click="toStore(item.shopid)">通</p>
          </div>
        </div>

        <div class="pad-top-xs">
          <p class="text-lg text-333">{{item.content}}</p>
        </div>

        <div class="flexBox changeLine pad-top-xs b-b1" @click="seeImgFn(item.inforimg)">

          <div class="flex33 pad-bottom-xs" v-for="(item2,index2) in item.inforimg" :key="index2" :wx:key="index2"
               v-if="item.onlyone==2">
            <div class="pad-right-xs">
              <img :src="item2.imgurl" class="block" style="width: 210rpx;height: 210rpx;">
            </div>
          </div>

          <div class="flexAuto pad-bottom-xs" v-for="(item2,index2) in item.inforimg" :key="index2" :wx:key="index2"
               v-if="item.onlyone==1">
            <div>
              <img :src="item2.imgurl" class="block" mode="widthFix" style="max-height: 694rpx;">
            </div>
          </div>

        </div>

        <div class="flexBox ver-cen pad-top-xs te-cen">
          <div class="flexAuto" @click="openLocal(item.latitude,item.longitude,item.shopname)">
            <img src="/static/img/news/newsicon3.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
            <span class="ver-mid inb pad-left-xs"
                  style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;width: 150rpx;">{{item.address}}</span>
          </div>

          <div class="flexAuto">
            <img src="/static/img/news/newsicon1.png" class="ver-mid" style="width: 35rpx;height: 35rpx;">
            <span class="ver-mid pad-left-xs">{{item.browsenum}}</span>
          </div>

          <div class="flexAuto" v-if="!item.hasZaned" @click="zanFn(item.id)">
            <img src="/static/img/news/newsicon2.png" class="ver-mid" style="width: 35rpx;height: 35rpx;">
            <span class="ver-mid pad-left-xs">{{item.fabulous}}</span>
          </div>
          <div class="flexAuto" v-if="item.hasZaned">
            <img src="/static/img/news/hasZan.png" class="ver-mid" style="width: 35rpx;height: 35rpx;">
            <span class="ver-mid pad-left-xs" style="color: #ff071f">{{item.fabulous}}</span>
          </div>

        </div>

      </div>
    </div>

    <p class="pad-sm bg-white b-t1 te-cen" v-if="isEmpty">已经到底了</p>

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
    data() {
      return {
        curId: -1,
        curPage: 1,
        infoArr: [],
        isEmpty: false,
        isSeeImg: false,
        hasZan: false,
        tempArr: {},
        showModalStatus: false,
        fasetSelects: []
      }
    },
    mounted(){
      console.log("替换store");
      if(getApp().globalData.store){
        store.commit('initStore',getApp().globalData.store.state);  
      }
      // if(Number(store.state.session_key)===1||Number(store.state.openId)===1){
      //   store.replaceState(JSON.parse(JSON.stringify(getApp().globalData.store.state)));
      // }
      store.commit('initUserInfo',{that:this,cb:this.initInfoFn});
      this.initFastSelect();
      
    },
    onLoad() {

    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty) {
        _this.curPage++;
        return _this.initInfoFn();
      }
    },
    onPullDownRefresh() {
      let _this = this;
      _this.isSeeImg = false;
      _this.infoArr = [];
      _this.curPage = 1;
      _this.isEmpty = false;
      _this.initInfoFn();
    },
    onShareAppMessage: function (res) {
      return {
        title: '众享礼券',
        path: '/pages/News/main'
      }
    },
    methods: {
      toStore(id) {
        wx.navigateTo({
          url: '/pages/storeInfo/main' + '?id=' + id
        })
      },
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_user_news_load,
          data: {page: _this.curPage},
          cb: _this.callBackInit
        };
        wx.getStorage({
          key: "zanTime",
          success: function (res) {
            _this.tempArr = JSON.parse(res.data) || {};
          }
        });
        store.commit('reqInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        for (let i = 0, len = o.data.length; i < len; i++) {
          _this.infoArr.push(o.data[i]);
        }
        _this.isEmpty = (o.data.length < 10);
        let arr = _this.infoArr.slice(0);
        for (let i = 0, len = arr.length; i < len; i++) {
          if (_this.tempArr[arr[i].id]) {
            let old = new Date();
            old.setTime(_this.tempArr[arr[i].id].time);
            let now = new Date();
            let oldTime = old.getFullYear() + "-" + (old.getMonth() + 1) + "-" + old.getDate();
            let nowTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
            arr[i].hasZaned = (oldTime == nowTime);
          }
        }
        _this.infoArr = arr.slice(0);
        wx.stopPullDownRefresh();
      },
      openLocal(la, lo, name) {
        wx.openLocation({
          latitude: parseFloat(la),
          longitude: parseFloat(lo),
          scale: 28,
          name: name
        })
      },
      seeImgFn(arr) {
        let _this = this;
        _this.isSeeImg = true;
        let array = [];
        for (let i = 0, len = arr.length; i < len; i++) {
          array.push(arr[i].imgurl);
        }
        wx.previewImage({
          current: arr[0].imgurl, // 当前显示图片的http链接
          urls: array // 需要预览的图片http链接列表
        })
      },
      zanFn(id) {
        let _this = this;
        let o = {
          url: Api.url_news_zan,
          data: {id: id},
          cb: _this.callBackZan
        };
        _this.curId = id;
        let arr = _this.infoArr.slice(0);
        for (let i = 0, len = arr.length; i < len; i++) {
          if (id == arr[i].id) {
            arr[i].fabulous++;
            arr[i].hasZaned = true;
            break;
          }
        }
        _this.infoArr = arr.slice(0);
        store.commit('reqInfo', o);
      },
      callBackZan(o) {
        let _this = this;
        wx.showToast({
          title: o.msg,
          icon: 'none',
          duration: 1000
        });

        _this.tempArr[_this.curId] = {time: new Date().valueOf()};

        wx.setStorage({
          key: "zanTime",
          data: JSON.stringify(_this.tempArr)
        })
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
            return this.initInfoFn();
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
        // TODO 需要修改成类型
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
        this.infoArr = [];
        this.curPage = 1;
        this.isEmpty = false;
        this.initInfoFn();
      }
    }
  }
</script>
