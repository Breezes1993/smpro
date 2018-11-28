<template>
  <div>

    <div class="posReal">
      <div class="abRight m-flex m-flex-column height100">
        <button class="store-button" open-type="share" @click="sotreBtn(1)">直接转发</button>
        <button class="store-button" @click="sotreBtn(2)">生成海报</button>
        <button class="store-button" @click="sotreBtn(3)">返回首页</button>
      </div>
      <swiper indicator-dots autoplay interval="3000" duration="300" style="height: 400rpx">
        <!-- @change="swiperChange"-->
        <!--:style="{height:imgHArr[current]+'rpx'}"-->
        <block v-for="(item,index) in imgArr" :key="index" :wx:key="index">
          <swiper-item>
            <img :src="item.imageurl" class="block" mode="aspectFill" style="height: 400rpx"/><!-- @load="imageLoad"-->
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="pad-sm bg-white te-cen">
      <p class="text-666"><span class="text-Bold">{{storeInfo.name}}</span><!--（休闲娱乐）--></p>
    </div>

    <div class="pad-ver-xs bg-white">
      <div class="flexBox ver-cen">
        <div class="flexAuto te-cen">

          <img src="/static/img/star-full.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate>=1">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate>=2">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate>=3">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate>=4">
          <img src="/static/img/star-full.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate==5">
          <img src="/static/img/star-half.png" class="ver-mid" style="width: 36rpx;height: 36rpx;"
               v-if="curRate>=1.1&&curRate<2">
          <img src="/static/img/star-half.png" class="ver-mid" style="width: 36rpx;height: 36rpx;"
               v-if="curRate>=2.1&&curRate<3">
          <img src="/static/img/star-half.png" class="ver-mid" style="width: 36rpx;height: 36rpx;"
               v-if="curRate>=3.1&&curRate<4">
          <img src="/static/img/star-half.png" class="ver-mid" style="width: 36rpx;height: 36rpx;"
               v-if="curRate>=4.1&&curRate<5">

          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate==0">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate==0">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate==0">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate==0">
          <img src="/static/img/star-empty.png" class="ver-mid" style="width: 36rpx;height: 36rpx;" v-if="curRate==0">

          <span class="ver-mid text-warning pad-left-xs">{{curRate || '暂无评分'}}</span>

        </div>
        <div class="flex33">
          <p class="text-999 pad-left-sm">人气：{{storeInfo.popularity}}</p>
        </div>
      </div>
    </div>

    <div class="flexBox bg-white te-cen b-b1">
      <div class="flexAuto" @click="curTab=1">
        <span class="inb pad-hov-sm pad-ver-xs b-b1 b-border-b-white" :class="{actTab:curTab==1}">抢券</span>
      </div>
      <div class="flexAuto" @click="curTab=2">
        <span class="inb pad-hov-sm pad-ver-xs b-b1 b-border-b-white" :class="{actTab:curTab==2}">评论</span>
      </div>
    </div>

    <div class="pad-bottom-xs" v-show="curTab==1">

      <div class="pad-bottom-sm" v-if="ticketList.length>0">
        <div>
          <div class="pad-sm pad-bottom-0" v-for="(item,index) in ticketList" :key="index" :wx:key="index">
            <div class="flexBox ver-cen bg-white">
              <div class="flex25">
                <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
                <img :src="storeInfo.logo" class="ver-mid rad500"
                     style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
              </div>
              <div class="flexAuto">
                <p class="ell text-999">{{item.describe}}</p>
                <div class="pad-ver-xs">
                  <p class="ell text-333 text-lg text-Bolder">{{item.name}}</p>
                </div>
                <p class="ell text-999 text-xs">{{item.timeinfo}}</p>
              </div>
              <div class="flex25">
                <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
                <p class="btn btn-danger btn-xs btn-radius" @click="toGetCp(item.id)">立即领取</p>
              </div>
            </div>
          </div>
        </div>

       <!-- <div class="pad-top-sm te-cen" v-if="ticketList.length===0">
          <img src="/static/img/noCp.png" style="width: 256rpx;height: 180rpx;">
          <p class="text-999 pad-top-lg">该商户暂时没券可领哦！</p>
        </div>-->
      </div>

      <!--<div class="pad-sm">
        <div class="flexBox ver-cen bg-white">
          <div class="flex25">
            <img src="/static/img/cpleft.png" class="ver-mid" style="width: 17rpx;height: 200rpx;">
            <img src="/static/img/btn1.png" class="ver-mid rad500"
                 style="width: 100rpx;height: 100rpx;margin-left:30rpx;">
          </div>
          <div class="flexAuto">
            <p class="ell text-999">报名即可抵50现金，每人只限一张一张一张一张一张</p>
            <p class="ell text-danger pad-ver-xs"><span class="text-333 text-lg text-Bolder">50.00</span> 元</p>
            <p class="ell text-999 text-xs">有效期：2018-04-10至2018-12-31</p>
          </div>
          <div class="flex25">
            <img src="/static/img/cpcen.png" class="ver-mid" style="width: 25rpx;height: 200rpx;">
            <p class="btn btn-def btn-xs btn-radius">领取过了</p>
          </div>
        </div>
      </div>-->

      <div class="bg-white">
        <div class="pad-hov-xs">

          <div class="pad-ver-sm b-b1"
               v-if="storeInfo.iswifi==1|storeInfo.isparking==1|storeInfo.isalipay==1|storeInfo.iswechat==1">
            <div class="flexBox ver-cen te-cen">
              <div class="flexAuto" v-if="storeInfo.iswifi==1">
                <img src="/static/img/wifi.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">WiFi</span>
              </div>
              <div class="flexAuto" v-if="storeInfo.isparking==1">
                <img src="/static/img/pcar.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">停车位</span>
              </div>
              <div class="flexAuto" v-if="storeInfo.isalipay==1">
                <img src="/static/img/alipay.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">支付宝</span>
              </div>
              <div class="flexAuto" v-if="storeInfo.iswechat==1">
                <img src="/static/img/wxpay.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">微信支付</span>
              </div>
            </div>
          </div>

          <!--<div class="flexBox pad-ver-sm ver-cen b-b1" v-if="storeInfo.evaluatenum!=0" @click="toCommonList">
            <div class="flex8">
              <img src="/static/img/tab-common.png" class="block" style="width: 30rpx;height: 30rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">消费评价</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>-->

          <div class="flexBox pad-ver-sm ver-cen b-b1" @click="openLocat">
            <div class="flex8">
              <img src="/static/img/position_gray.png" class="block" style="width: 30rpx;height: 30rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">{{storeInfo.address}}</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1">
            <div class="flex8">
              <icon type="waiting" size="16" color="#8a8a8a" class="ver-mid"></icon>
            </div>
            <!-- <div class="flexAuto">
              <p class="ell">营业时间：
                {{(storeInfo.businessstart>=10) ? storeInfo.businessstart : "0"+storeInfo.businessstart}}:00
                - {{(storeInfo.businessend>=10) ? storeInfo.businessend : "0"+storeInfo.businessend}}:00</p>
            </div> -->
            <div class="flexAuto">
              <p class="ell">营业时间：
                {{businessStartCmp}} - {{businessEndCmp}}</p>
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" v-if="false">
            <div class="flex8">
              <icon type="waiting" size="16" color="#8a8a8a" class="ver-mid"></icon>
            </div>
            <div class="flexAuto">
              <p class="ell">人均消费：{{storeInfo.avgConsumer}}</p>
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" @click="callStore">
            <div class="flex8">
              <img src="/static/img/tel.png" class="block" style="width: 30rpx;height: 30rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">{{storeInfo.telphone}}</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" @click="infoAlert=true">
            <div class="flex8">
              <img src="/static/img/shop.png" class="block" style="width: 36rpx;height: 36rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">门店简介</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

        </div>
      </div>

      <div class="bg-white pad-sm">
        <div style="width: 70%;margin: 0 auto">
          <div class="flexBox ver-cen">
            <div class="flex25">
              <p class="b-b1" style="padding-top: 1px"></p>
            </div>
            <div class="flexAuto te-cen text-sm">
              <p>门店图片</p>
            </div>
            <div class="flex25">
              <p class="b-b1" style="padding-top: 1px"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="pad-hov-sm pad-bottom-xs bg-white">

        <div v-for="(item,index) in detailImgs" :wx:key="index" :key="index">
          <img :src="item.imageurl" class="block" mode="widthFix">
        </div>

      </div>

      <div class="pad-sm bg-white te-cen">
        <p class="text-999">点击图中小程序码进行识别，即可进入门店</p>
        <div class="pad-ver-xs mar0A" style="width: 45%" @click="seeQRCode">
          <img :src="imgHead+qrCodeImg" class="block mar0A" mode="widthFix">
        </div>
        <p><span class="text-danger">{{storeInfo.name}}</span> 专属小程序码</p>
      </div>

    </div>

    <div v-show="curTab==2">

      <!--<div class="flexBox bg-white pad-sm ver-cen b-b1" v-if="storeInfo.evaluatenum!=0" @click="toCommonList">
        <div class="flex8">
          <img src="/static/img/tab-common.png" class="block" style="width: 30rpx;height: 30rpx;">
        </div>
        <div class="flexAuto">
          <p class="ell">消费评价</p>
        </div>
        <div class="flex8 te-right">
          <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
        </div>
      </div>-->

      <div class="te-cen" v-if="storeInfo.evaluatenum==0">

        <div class="pad-ver-sm">
          <img src="/static/img/nocomms.png" class="block mar0A" style="width: 130rpx;height: 130rpx;">
        </div>

        <p class="text-999">暂无评论</p>
      </div>

      <div>

        <div class="pad-sm bg-white b-t1" v-for="(item,index) in commArr" :key="index" :wx:key="index">
          <div class="flexBox">

            <div class="flex15">
              <img :src="item.wechatimg" class="block" style="width: 100rpx;height: 100rpx;">
            </div>

            <div class="flexAuto">
              <div class="pad-left-sm">

                <p>
                  <span class="text-333">{{item.name}}</span>
                  <span class="text-xs pull-right text-999">{{item.time}}</span>
                </p>

                <div>
                  <div class="pad-ver-xs">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score>=1" @click="item.score=1">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score>=2" @click="item.score=2">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score>=3" @click="item.score=3">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score>=4" @click="item.score=4">
                    <img src="/static/img/star-full.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score==5" @click="item.score=5">

                    <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score==0" @click="item.score=1">
                    <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score<2" @click="item.score=2">
                    <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score<3" @click="item.score=3">
                    <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score<4" @click="item.score=4">
                    <img src="/static/img/star-empty.png" class="ver-mid" style="width: 30rpx;height: 30rpx;"
                         v-if="item.score<5" @click="item.score=5">
                    <span class="text-warning ver-mid pad-left-xs">{{item.score}}分</span>
                  </div>
                </div>

                <p>{{item.content}}</p>

                <div class="flexBox changeLine pad-top-xs" @click="seeImgFn(item.evaluateimg)">

                  <div class="flex33 pad-bottom-xs" v-for="(item2,index2) in item.evaluateimg" :key="index2"
                       :wx:key="index2">
                    <div class="pad-right-xs">
                      <img :src="item2" class="block" style="width: 170rpx;height: 170rpx;">
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

        <p class="pad-sm bg-white b-t1 te-cen" v-if="isEmpty">已经到底了</p>

      </div>

     <!-- <div class="bg-white">
        <div class="pad-hov-xs">

          <div class="pad-ver-sm b-b1"
               v-if="storeInfo.iswifi==1|storeInfo.isparking==1|storeInfo.isalipay==1|storeInfo.iswechat==1">
            <div class="flexBox ver-cen te-cen">
              <div class="flexAuto" v-if="storeInfo.iswifi==1">
                <img src="/static/img/wifi.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">WiFi</span>
              </div>
              <div class="flexAuto" v-if="storeInfo.isparking==1">
                <img src="/static/img/pcar.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">停车位</span>
              </div>
              <div class="flexAuto" v-if="storeInfo.isalipay==1">
                <img src="/static/img/alipay.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">支付宝</span>
              </div>
              <div class="flexAuto" v-if="storeInfo.iswechat==1">
                <img src="/static/img/wxpay.png" class="ver-mid" style="width: 40rpx;height: 40rpx;">
                <span class="pad-left-xs ver-mid">微信支付</span>
              </div>
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" v-if="storeInfo.evaluatenum!=0" @click="toCommonList">
            <div class="flex8">
              <img src="/static/img/tab-common.png" class="block" style="width: 30rpx;height: 30rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">消费评价</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" @click="openLocat">
            <div class="flex8">
              <img src="/static/img/position_gray.png" class="block" style="width: 30rpx;height: 30rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">{{storeInfo.address}}</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1">
            <div class="flex8">
              <icon type="waiting" size="16" color="#8a8a8a" class="ver-mid"></icon>
            </div>
            <div class="flexAuto">
              <p class="ell">营业时间：
                {{(storeInfo.businessstart>=10) ? storeInfo.businessstart : "0"+storeInfo.businessstart}}:00
                - {{(storeInfo.businessend>=10) ? storeInfo.businessend : "0"+storeInfo.businessend}}:00</p>
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" @click="callStore">
            <div class="flex8">
              <img src="/static/img/tel.png" class="block" style="width: 30rpx;height: 30rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">{{storeInfo.telphone}}</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

          <div class="flexBox pad-ver-sm ver-cen b-b1" @click="infoAlert=true">
            <div class="flex8">
              <img src="/static/img/shop.png" class="block" style="width: 36rpx;height: 36rpx;">
            </div>
            <div class="flexAuto">
              <p class="ell">门店简介</p>
            </div>
            <div class="flex8 te-right">
              <img src="/static/img/allow_r_gray.png" class="ver-mid" style="width: 30rpx;height: 30rpx;">
            </div>
          </div>

        </div>
      </div>

      <div class="bg-white pad-sm">
        <div style="width: 70%;margin: 0 auto">
          <div class="flexBox ver-cen">
            <div class="flex25">
              <p class="b-b1" style="padding-top: 1px"></p>
            </div>
            <div class="flexAuto te-cen text-sm">
              <p>门店图片</p>
            </div>
            <div class="flex25">
              <p class="b-b1" style="padding-top: 1px"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="pad-hov-sm pad-bottom-xs bg-white">

        <div v-for="(item,index) in detailImgs" :wx:key="index" :key="index">
          <img :src="item.imageurl" class="block" mode="widthFix">
        </div>

      </div>

      <div class="pad-sm bg-white te-cen">
        <p class="text-999">点击图中小程序码进行识别，即可进入门店</p>
        <div class="pad-ver-xs mar0A" style="width: 45%" @click="seeQRCode">
          <img :src="imgHead+qrCodeImg" class="block mar0A" mode="widthFix">
        </div>
        <p><span class="text-danger">{{storeInfo.name}}</span> 专属小程序码</p>
      </div>-->

    </div>

    <div class="shade dark" v-if="infoAlert">
      <div class="pad-top-big">
        <div class="wid70 mar0A overHid rad6">
          <p class="pad-sm text-white bg-red te-cen">门店简介</p>
          <div class="pad-sm bg-white scrollAble" style="height: 400rpx">
            <rich-text :nodes="storeInfo.introduction"></rich-text>
          </div>
          <div class="pad-ver-xs bg-white te-cen">
            <div class="wid30 mar0A">
              <p class="btn btn-danger btn-xs block btn-radius" @click="infoAlert=false">确定</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="fixRight">
      <div class="pad-bottom-sm">
        <div class="rad500 pad-ver-xs pad-hov-xs bg-green" @click="toCommon">
          <img src="/static/img/commons.png" class="block" style="width: 50rpx;height: 50rpx;">
        </div>
      </div>

      <div class="pad-bottom-sm">
        <div class="rad500 pad-ver-xs pad-hov-xs bg-aq" @click="shareAlert=true">
          <img src="/static/img/share.png" class="block" style="width: 50rpx;height: 50rpx;">
        </div>
      </div>

      <div>
        <div class="rad500 pad-ver-xs pad-hov-xs bg-red" @click="backFn">
          <img src="/static/img/back.png" class="block" style="width: 50rpx;height: 50rpx;">
        </div>
      </div>

    </div>-->

    <!--<div class="shade dark" v-if="shareAlert">
      <div class="fixBot">
        <div class="bg-gray pad-sm">
          <div class="flexBox te-cen">
            <div class="flexAuto">
              <button class="bg-white inb pad-ver-xs pad-hov-xs round overHid" open-type="share">
                <img src="/static/img/share2.png" class="block mar0A round" style="height: 60rpx;width: 60rpx;">
              </button>
              <p class="pad-top-xs">分享给朋友</p>
            </div>
            <div class="flexAuto">
              <div class="bg-white inb pad-ver-xs pad-hov-xs round" @click="shareImgAlert=true">
                <img src="/static/img/share1.png" class="block mar0A round" style="height: 60rpx;width: 60rpx;">
              </div>
              <p class="pad-top-xs">分享商家海报</p>
            </div>
          </div>
        </div>
        <p class="btn btn-def block btn-white" @click="shareAlert=false">关闭</p>
      </div>
    </div>-->

    <!--<div class="shade dark" v-if="shareImgAlert">
      <div class="shareImgZone pad-sm bg-white rad6">
        <p class="te-right">
          <icon type="clear" size="20" color="#a8a8a8" @click="shareImgAlert=false"></icon>
        </p>

        <div class="pad-hov-sm">
          <div class="top-shadow flexBox te-cen ver-cen" style="height: 750rpx;">
            <div class="flexAuto">
              <img src="/static/img/banner1.png" class="wid95 round">
            </div>
          </div>
        </div>

        <div class="pad-sm">
          <p class="btn btn-danger block btn-radius" @click="saveToAlb">保存图片</p>
        </div>

        <p class="text-999 te-cen">保存至相册可以分享到朋友圈</p>

      </div>
    </div>-->


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

    <div class="drawer_screen" @click="powerDrawer2('close')" v-show="showModalStatus2"></div>
    <div :animation="animationData" class="drawer_box" v-show="showModalStatus2">
      <div class="drawer_title">提示</div>
      <div class="drawer_content">
        <div class="top grid content">
          <label class="">您现在是新手，需要升级VIP会员</label>
          <label class="">立即前往升级？</label>
        </div>
      </div>
      <div class="btn_ok flexBox ver-cen no-radius" @click="powerDrawer2('close')" >
        <button class="flexAuto" style="color:#000;" @click="powerDrawer2('close')">取消</button>
        <button class="flexAuto" @click="toVip">确定</button>
      </div>
    </div>

  </div>
</template>

<script>
  import Api from '../../../static/js/apis'
  import store from "../index/store";

  export default {
    computed: {
      businessStartCmp() {
        if (!this.storeInfo.businessstart) return "01:00";
        let type = typeof this.storeInfo.businessstart;
        if (type === 'string') {
          let splits = this.storeInfo.businessstart.split(":");
          if (splits.length === 1) {
            return Number(splits) <= 9 ? "0" + splits + ":00" : splits + ":00";
          } else {
            return this.storeInfo.businessstart;
          }
        } else if (type === 'number') {
          return this.storeInfo.businessstart <= 9 ? "0" + this.storeInfo.businessstart + ":00" : this.storeInfo.businessstart + ":00";
        }
      },
      businessEndCmp() {
        if (!this.storeInfo.businessend) return "01:00";
        let type = typeof this.storeInfo.businessend;
        if (type === 'string') {
          let splits = this.storeInfo.businessend.split(":");
          if (splits.length === 1) {
            return Number(splits) <= 9 ? "0" + splits + ":00" : splits + ":00";
          } else {
            return this.storeInfo.businessend;
          }
        } else if (type === 'number') {
          return this.storeInfo.businessend <= 9 ? "0" + this.storeInfo.businessend + ":00" : this.storeInfo.businessend + ":00";
        }
      }
    },
    data() {
      return {
        curId: -1,
        curRate: 0,
        curTab: 1,
        storeInfo: '',
        infoAlert: false,
        shareAlert: false,
        shareImgAlert: false,
        imgArr: [],
        // imgHArr: [],
        // current: 0,
        detailImgs: [],
        ticketList: [],
        qrCodeImg: '',
        imgHead: 'data:image/png;base64,',
        curPage: 1,
        commArr: [],
        isEmpty: false,
        showModalStatus: false,
        showModalStatus2: false
      }
    },
    onLoad(o) {
      let _this = this;
      console.log("商户",o);
      _this.curId = o.id;
      if (o.scene) {
        _this.curId = o.scene;
      }
      _this.curTab = 1;
    },
    onUnload() {
      let _this = this;
      _this.storeInfo = '';
      _this.imgArr = [];
      _this.detailImgs = [];
      _this.ticketList = [];
      // _this.imgHArr = [];
      // _this.current = 0;
      _this.commArr = [];
      _this.curId = -1;
      _this.curPage = 1;
      _this.isEmpty = false;
    },
    onReachBottom() {
      let _this = this;
      if (!_this.isEmpty && _this.curTab==2) {
        _this.curPage++;
        return _this.initInfoCommFn();
      }
    },
    mounted() {
      this.$nextTick(() => {
        if(getApp().globalData.store){
          console.log("执行了这里");
          store.commit('initStore',getApp().globalData.store.state);  
        }
        store.commit('initUserInfo',{
          shop_id: this.curId,
          that:this,
          cb:()=>wx.hideLoading()
        });
        this.initInfoFn();
        
      })
    },
    onShareAppMessage: function (res) {
      let _this = this;
      return {
        title: _this.storeInfo.name,
        path: '/pages/storeInfo/main' + '?id=' + _this.curId
      }
    },
    /*onShareAppMessage: function (res) {
      let _this = this;
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '商家名123',
        path: '/pages/storeInfo/main' + '?id=' + _this.curId,
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    },*/
    methods: {
      initInfoFn() {
        let _this = this;
        let o = {
          url: Api.url_store_info + "?id=" + _this.curId,
          data: {},
          cb: _this.callBackInit
        };
        store.commit('getInfo', o);
      },
      callBackInit(o) {
        let _this = this;
        _this.storeInfo = o.data;
        _this.curRate = _this.storeInfo.evaluate;
        _this.storeInfo.introduction = decodeURI(_this.storeInfo.introduction);
        // _this.storeInfo.introduction = decodeURIComponent(_this.storeInfo.introduction);
        // let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '+': ' '};
        // _this.storeInfo.introduction = _this.storeInfo.introduction.replace(/&(lt|gt|nbsp|amp|quot|'+');/ig, function (all, t) {
        //   return arrEntities[t];
        // });
        _this.imgArr = o.banner || [];
        _this.detailImgs = o.indoor || [];
        _this.ticketList = o.ticket || [];
        // _this.curTab = (_this.ticketList.length > 0) ? 1 : 2;

        _this.storeInfo.introduction = _this.storeInfo.introduction.replace(new RegExp(/font-family: " microsoft="" yahei",="" "hiragino="" sans="" gb";"="/g), "");

        wx.setNavigationBarTitle({
          title: _this.storeInfo.name
        });
        _this.qrCodeImg = o.codeimg;
        _this.shop_img = o.shop_img;
        return _this.initInfoCommFn();
      },
      openLocat() {
        let _this = this;
        wx.openLocation({
          latitude: parseFloat(_this.storeInfo.latitude),
          longitude: parseFloat(_this.storeInfo.longitude),
          scale: 28,
          name: _this.storeInfo.name,
          address: _this.storeInfo.address
        })
      },
      callStore() {
        let _this = this;
        wx.makePhoneCall({
          phoneNumber: _this.storeInfo.telphone
        })
      },
      seeQRCode() {
        let _this = this;
        wx.previewImage({
          current: _this.imgHead + _this.qrCodeImg,
          urls: [_this.imgHead + _this.qrCodeImg]
        })
      },
      backFn() {
        wx.navigateBack({
          delta: 1
        })
      },
      /*toCommon() {
        wx.navigateTo({
          url: '/pages/storeComm/main' + '?id=' + this.curId
        })
      },*/
      saveToAlb() {
        wx.saveImageToPhotosAlbum({
          filePath: '/static/img/btn1.png',
          success(res) {
          }
        })
      },
      toGetCp(id) {
        let _this = this;
        this.showModalStatus2 = true;
        return;
        /*let cpOne = "";
        for (let i = 0, len = _this.ticketList.length; i < len; i++) {
          if (id == _this.ticketList[i].id) {
            cpOne = _this.ticketList[i];
            break;
          }
        }
        store.state.tempObj.getCp = {
          storeLogo: _this.storeInfo.logo,
          storeName: _this.storeInfo.name,
          storeId: _this.storeInfo.id,
          curCp: cpOne
        };*/

        wx.navigateTo({
          url: '/pages/getCoupon/main' + '?id=' + id + '&sid=' + _this.storeInfo.id
        })
      },
      toVip() {
        wx.navigateTo({
          url: '/pages/openVIPCustomer/main' + '?id=' + id + '&sid=' + _this.storeInfo.id
        })
      },
      toCommonList() {
        wx.navigateTo({
          url: '/pages/commonList/main' + '?id=' + this.curId
        })
      },
      /*swiperChange(e) {
        this.current = e.target.current;
      },
      imageLoad(e) {
        //获取图片真实宽度
        let _this = this;
        var imgwidth = e.target.width,
          imgheight = e.target.height,
          //宽高比
          ratio = imgwidth / imgheight;
        //计算的高度值
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight;
        //把每一张图片的高度记录到数组里
        _this.imgHArr.push(imgheight)
      },*/
      seeImgFn(arr) {
        wx.previewImage({
          current: arr[0], // 当前显示图片的http链接
          urls: arr // 需要预览的图片http链接列表
        })
      },
      initInfoCommFn() {
        let _this = this;
        let o = {
          url: Api.url_store_load_common,
          data: {
            shopid: _this.curId,
            page: _this.curPage,
          },
          cb: _this.callBackInitComm,
          mask: true,
          noStatus: true
        };
        store.commit('reqInfo', o);
      },
      callBackInitComm(o) {
        let _this = this;
        for (let i = 0, len = o.data.length; i < len; i++) {
          _this.commArr.push(o.data[i]);
        }
        if (_this.commArr.length > 0) {
          _this.isEmpty = (o.data.length < 5);
        }
      },
      sotreBtn(index){
        let _this = this;
        if(index === 1){

        }else if(index === 2){
          let shareInfo = {
            imgTop: (_this.imgArr&&_this.imgArr.length>0)?_this.imgArr[0]:"",
            storeInfo: _this.storeInfo,
            ticketList: _this.ticketList,
            qrCodeImg: _this.shop_img
          }
          wx.setStorageSync("shareInfo",shareInfo);
          wx.navigateTo({
            url: "/pages/shareCard/main?curId="+this.curId
          })
        }else if(index === 3){
          // wx.navigateBack({
          //   delta: 1
          // });
          wx.reLaunch({
            url: "/pages/index/main"
          });
        }
      },





      powerDrawer: function(currentStatu) {
        console.log("12312")
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
      powerDrawer2: function(currentStatu) {
        console.log("12312")
        this.util2(currentStatu)
      },
      util2: function(currentStatu) {
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
              this.showModalStatus2 = false;
          }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
          this.setData({
            showModalStatus2: true
          });
        }
      },
      getUserInfo(e){
        console.log("getUserInfo");
        let obj = {
          e: e,
          shop_id: this.curId,
          that: this,
          cb: () => wx.hideLoading()
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

