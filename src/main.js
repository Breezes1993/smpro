import Vue from 'vue'
import App from './App'
import '../static/css/base.css'
import '../static/css/common.css'
import '../static/css/modal.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/myCoupon/main',
      'pages/account/main',
      'pages/search/main',
      'pages/searchResult/main',
      'pages/Login/main',

      'pages/News/main',
      'pages/manageNews/main',
      'pages/publicNews/main',

      'pages/discovery/main',
      'pages/article/main',
      'pages/webVPage/main',

      'pages/join/main',
      'pages/storeInfo/main',
      'pages/storeComm/main',
      'pages/commonList/main',
      'pages/getCoupon/main',
      'pages/shareCard/main',//生成海报

      'pages/verification/main',
      'pages/checkVerification/main',
      'pages/checkerVerify/main',

      'pages/publicCp/main',
      'pages/manageCoupon/main',
      'pages/manageDetail/main',
      'pages/verifyRecords/main',

      'pages/addVerifyer/main',
      'pages/checkVerifyer/main',

      'pages/helpCenter/main',
      'pages/contectUs/main',

      'pages/openVIP/main',
      'pages/cunsumerRecord/main',

      'pages/noticePage/main',
      'pages/fakeindex/main',

      'pages/selectCity/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '众享礼券',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      backgroundColor: '#ffffff',
      selectedColor: '#dd514c',
      list: [
        {
          pagePath: "pages/index/main",
          text: "附近的券",
          iconPath: '/static/img/tabs/tab2.png',
          selectedIconPath: '/static/img/tabs/tab1-1.png'
        },
        {
          pagePath: "pages/News/main",
          text: "资讯动态",
          iconPath: '/static/img/tabs/tab4.png',
          selectedIconPath: '/static/img/tabs/tab4-1.png'
        },
        {
          pagePath: "pages/myCoupon/main",
          text: "我的券",
          iconPath: '/static/img/tabs/tab2.png',
          selectedIconPath: '/static/img/tabs/tab2-1.png'
        },
        {
          pagePath: "pages/account/main",
          text: "个人中心",
          iconPath: '/static/img/tabs/tab3.png',
          selectedIconPath: '/static/img/tabs/tab3-1.png'
        }
      ]
    }
  }
}
