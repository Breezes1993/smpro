<template>
  <div>
    <canvas canvasId="mycamvas" :style="'width:100%;height:'+canvasHeight+';'"></canvas>
    <!-- <img v-if="!tempFilePath" :style="'width:100%;height:'+canvasHeight" :src="tempFilePath"/> -->
    <div style="width:100%;height:128rpx;"></div>
    <cover-view class="save-image">
      <cover-view @click="saveImage"  hoverClass="hover">保存图片</cover-view>
    </cover-view>

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
import a from "../../utils/canvasUtils.js";
import store from '../index/store'
export default {
  data() {
    return {
      name: "ss",
      curId: "1",
      canvasHeight: "900px",
      shareInfo: {},
      imgHead: 'data:image/png;base64,',
      tempFilePath: "",
      showModalStatus: false
    };
  },
  onLoad(o) {},
  onUnload() {},
  onReachBottom() {},
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      _this.shareInfo = wx.getStorageSync("shareInfo");
      store.commit('initUserInfo',{that:_this,cb:_this.drawCanvas});
      // _this.drawCanvas();
    });
  },
  methods: {
    drawCanvas: function() {
      console.log(this);
      wx.showLoading({
        title: '海报生成中',
      });
      let _this = this;
      let canvasHeight = 40;
      var sysInfo = wx.getSystemInfoSync();
      let topImgWith = sysInfo.screenWidth - 40;
      let topImgHeight = 0;
      let shareInfo = _this.shareInfo;
      shareInfo.storeInfo.logo = shareInfo.storeInfo.logo.replace(
        /http:/,
        "https:"
      );
      shareInfo.imgTop.imageurl = shareInfo.imgTop.imageurl.replace(
        /http:/,
        "https:"
      );
      shareInfo.qrCodeImg = shareInfo.qrCodeImg.replace(
        /http:/,
        "https:"
      );
      const ctx = wx.createCanvasContext("mycamvas");
      // ctx.fillRect(0, 0, topImgWith, 500);
      new Promise(function(resolve, reject) {
        let promiseArray = [];
        promiseArray.push(
          new Promise((resolve, reject) => {
            wx.getImageInfo({
              src: shareInfo.imgTop.imageurl || "",
              success: function(res) {
                resolve(res);
              },
              faile: function(msg) {
                console.log("顶部图片失败", msg);
                reject(msg);
              }
            });
          })
        );
        promiseArray.push(
          new Promise((resolve, reject) => {
            wx.getImageInfo({
              src: shareInfo.storeInfo.logo || "",
              success: function(res) {
                resolve(res);
              },
              faile: function(msg) {
                console.log("logo失败", msg);
                reject(msg);
              }
            });
          })
        );
        console.log(" store.state.userInfo.avatarUrl", store.state.userInfo.avatarUrl)
        promiseArray.push(new Promise((resolve,reject)=>{
          wx.getImageInfo({
            src: store.state.userInfo.avatarUrl || "",
            success: function(res){
              resolve(res);
            },
            faile: function(msg){
                console.log("头像失败", msg);
                reject(msg);
            }
          });
        }));
        promiseArray.push(
          new Promise((resolve, reject) => {
            let isBack = false;
            wx.getImageInfo({
              src: shareInfo.qrCodeImg || "",
              success: function(res) {
                console.log("获取二维码",res,shareInfo.qrCodeImg)
                isBack = true;
                resolve(res);
              },
              faile: function(msg) {
                console.log("二维码失败", msg);
                isBack = true;
                reject(msg);
              }
            });
            setTimeout(function(){
              if(!isBack){
                console.log("timeout")
                resolve({});
              }
            },8000);
          })
        );
        Promise.all(promiseArray)
          .then(function(pmRes) {
            let roundRectHeight = _this.mDrawCanvas(pmRes,ctx,false);
            _this.canvasHeight = (roundRectHeight+40) + "px";
            // ctx.clearRect(10, 10, sysInfo.screenWidth, roundRectHeight)
            // ctx.fillStyle = '#fff';
            // ctx.fillRect(0,0,sysInfo.screenWidth,roundRectHeight+40);
            _this.roundRect(ctx, 10, 10, sysInfo.screenWidth - 20, roundRectHeight, 10);
            _this.mDrawCanvas(pmRes,ctx,true);
            ctx.draw(true, function() {
              console.log("绘制图形");
            });

            resolve();
          })
          .catch(function(msg) {
            reject(msg);
            console.log(msg);
          });
      })
        .then(function() {
          return new Promise(function(resolve, reject) {
            resolve();
          });
        })
        .then(function() {
          console.log("最后");
          wx.hideLoading();
        })
        .catch(function(msg) {
          console.log(msg);
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          });
          wx.hideLoading();
        });

      console.log("sysinfo", sysInfo);
      console.log(" _this.", _this);
    },
    roundRect: function(ctx, x, y, w, h, r, strokeStyle, fillStyle, isAlph) {
      //这个代码有bug，在android机器上会出现路线错误。
      // ctx.save();
      // console.log("fillStyle"+fillStyle);
      // ctx.fillStyle = fillStyle || "#fff";
      // if (w < 2 * r) {
      //   r = w / 2;
      // }
      // if (h < 2 * r) {
      //   r = h / 2;
      // }
      // ctx.beginPath();
      // // ctx.setStrokeStyle(strokeStyle || "#fff");
      // ctx.strokeStyle = strokeStyle || "#fff";
      // ctx.setLineWidth(1);
      // ctx.moveTo(x + r, y);
      // ctx.arcTo(x + w, y, x + w, y + h, r);
      // ctx.arcTo(x + w, y + h, x, y + h, r);
      // ctx.arcTo(x, y + h, x, y, r);
      // ctx.arcTo(x, y, x + w, y, r);
      // ctx.stroke();
      // console.log("isAlph",isAlph);
      // isAlph || ctx.fill();
      // ctx.closePath();
      // ctx.draw(true);
      ctx.beginPath();
      ctx.fillStyle = fillStyle || "#fff";
      ctx.strokeStyle = strokeStyle || "#fff";
      ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5 );
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      // ctx.lineTo(x + w, y + r);
      ctx.arc(x + w - r, y + r, r, Math.PI * 1.5 , Math.PI * 2 );
      ctx.lineTo(x + w, y + h - r);
      // ctx.lineTo(x + w - r, y + h);
      ctx.arc(x + w - r, y + h - r, r, 0 , Math.PI * 0.5 );
      ctx.lineTo(x + r, y + h);
      // ctx.lineTo(x, y + h - r);
      ctx.arc(x + r, y + h - r, r, Math.PI * 0.5 , Math.PI);
      ctx.lineTo(x, y + r);
      // ctx.lineTo(x + r, y);
      ctx.stroke();
      isAlph || ctx.fill();
      ctx.closePath();
    },
    roundImg: function(
      ctx,
      avatarurl_width,
      avatarurl_heigth,
      avatarurl_x,
      avatarurl_y,
      path
    ) {
      // var avatarurl_width = 86; //绘制的头像宽度
      // var avatarurl_heigth = 86; //绘制的头像高度
      // var avatarurl_x = arcPointX; //绘制的头像在画布上的位置
      // var avatarurl_y = arcPointY; //绘制的头像在画布上的位置
      ctx.save();
      ctx.beginPath(); //开始绘制
      //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      ctx.arc(avatarurl_x, avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
      ctx.drawImage(
        path,
        avatarurl_x - avatarurl_width / 2,
        avatarurl_y - avatarurl_heigth / 2,
        avatarurl_width,
        avatarurl_heigth
      ); // 推进去图片，必须是https图片
      ctx.closePath();
      ctx.restore();
    },
    drawDashedLine: function(ctx, x1, y1, x2, y2, dashLength, strokeStyle) {
      //传入参数：上下文，起点，终点，虚线间隔
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = strokeStyle || "#E4E4E4";
      dashLength = dashLength === undefined ? 5 : dashLength; //运用三元表达式实现默认参数
      var deltaX = x2 - x1; //水平长度
      var deltaY = y2 - y1; //垂直长度
      var numDashes = Math.floor(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength
      ); //虚线数量
      for (var i = 0; i < numDashes; ++i) {
        ctx[i % 2 === 0 ? "moveTo" : "lineTo"](
          x1 + deltaX / numDashes * i,
          y1 + deltaY / numDashes * i
        ); //(deltaX/numDashed)是指虚线的长度
      }
      ctx.stroke();
      ctx.closePath();
    },
    mFillText(
      ctx,
      canvasHeight,
      text,
      fillStyle,
      fontSize,
      measureWidth,
      textX,
      isCenter,
      centerWidth,
      canDraw
    ) {
      let addHeight = 0;
      //"地址：" + shareInfo.storeInfo.address,"#7F7F7F",16,topImgWith - 40,(topImgWith - ctx.measureText(element).width) / 2 + 20
      // let text = "地址：" + shareInfo.storeInfo.address;
      ctx.fillStyle = fillStyle;
      ctx.setFontSize(fontSize);
      let textRow = this.canvasTextChangeLine(ctx, text, measureWidth);
      textRow.forEach((element, indx) => {
        canDraw&&ctx.fillText(
          element,
          isCenter === true
            ? (centerWidth - ctx.measureText(element).width) / 2 + textX
            : textX, //+20表示左边的marigin
          canvasHeight + addHeight
        );
        addHeight = addHeight + 20;
        console.log("canvasHeight", canvasHeight);
      });
      return addHeight;
    },
    canvasTextChangeLine: function(ctx, text, textMaxLength) {
      var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      for (var a = 0; a < chr.length; a++) {
        if (ctx.measureText(temp).width < textMaxLength) {
          temp += chr[a];
        } else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);
      return row;
    },
    mDrawCanvas: function(pmRes,ctx,canDraw){
      let _this = this;
      let canvasHeight = 40;
      var sysInfo = wx.getSystemInfoSync();
      let topImgWith = sysInfo.screenWidth - 40;
      let topImgHeight = 0;
      let shareInfo = _this.shareInfo;
      let res = pmRes[0];
      console.log("顶部图片属性", res);
      //将商户图片画入canvas
      let scalVal = res.width / topImgWith;
      topImgHeight = res.height / scalVal;
      canvasHeight = canvasHeight + topImgHeight;
      console.log("canvasHeight", canvasHeight);
      canDraw&&ctx.drawImage(res.path, 20, 20, topImgWith, res.height / scalVal);
      // let scalVal = res.width / topImgWith;
      // topImgHeight = 220;
      // let topImgRealHeight = res.height / scalVal;
      // canvasHeight = canvasHeight + topImgHeight;
      // console.log("canvasHeight", canvasHeight);
      // ctx.save();
  	  // ctx.beginPath();
      // ctx.rect(20, 20, topImgWith, topImgHeight);
      // ctx.clip();
      // ctx.drawImage(res.path, 20, 20 - (topImgRealHeight-topImgHeight)/2, topImgWith, res.height / scalVal);
      // ctx.restore();
      
      //绘制空白圆形区域
      if(canDraw){
        let arcPointX = 20 + topImgWith / 2;
        let arcPointY = 20 + topImgHeight;
        ctx.beginPath();
        ctx.arc(arcPointX, arcPointY, 45, 0, 2 * Math.PI);
        ctx.setFillStyle("#fff");
        ctx.fill();
        ctx.closePath();
        //绘制圆形logo
        _this.roundImg(ctx, 86, 86, arcPointX, arcPointY, pmRes[1].path);
      }
      canvasHeight = canvasHeight + 86 / 2;
      console.log("canvasHeight", canvasHeight);

      //绘制商户名称
      console.log("canvasHeight", canvasHeight);
      ctx.fillStyle = "#000";
      ctx.setFontSize(18);
      canDraw&&ctx.fillText(
        shareInfo.storeInfo.name,
        (topImgWith - ctx.measureText(shareInfo.storeInfo.name).width) /
          2 +
          20 -
          0.5, //+20表示左边的marigin
        canvasHeight
      );
      canDraw&&ctx.fillText(
        shareInfo.storeInfo.name,
        (topImgWith - ctx.measureText(shareInfo.storeInfo.name).width) /
          2 +
          20, //+20表示左边的marigin
        canvasHeight - 0.5
      );
      canvasHeight = canvasHeight + 30;

      //绘制商户地址
      canvasHeight =
        canvasHeight +
        _this.mFillText(
          ctx,
          canvasHeight,
          "地址：" + shareInfo.storeInfo.address,
          "#7F7F7F",
          14,
          topImgWith - 40,
          20,
          true,
          topImgWith,
          canDraw
        );

      //绘制营业时间
      let business =
        "营业时间：" +
        shareInfo.storeInfo.businessstart +
        ":00-" +
        shareInfo.storeInfo.businessstart +
        ":00";
      canvasHeight =
        canvasHeight +
        _this.mFillText(
          ctx,
          canvasHeight,
          business,
          "#7F7F7F",
          14,
          topImgWith - 40,
          20,
          true,
          topImgWith,
          canDraw
        );

      //绘制电话
      let telphone = "电话：" + shareInfo.storeInfo.telphone;
      canvasHeight =
        canvasHeight +
        _this.mFillText(
          ctx,
          canvasHeight,
          telphone,
          "#7F7F7F",
          14,
          topImgWith - 60,
          20,
          true,
          topImgWith,
          canDraw
        );

      //代金券
      console.log("代金券列表", JSON.stringify(shareInfo.ticketList));
      let ticketRoundHeight = canvasHeight;
      if(shareInfo.ticketList.length>0){
        canvasHeight = canvasHeight + 30;
      }
      let ticketHeight = 0;
      // shareInfo.ticketList[1] = shareInfo.ticketList[0];
      shareInfo.ticketList.forEach((element, index) => {
        //绘制每一个礼券
        
        //绘制代金券
        canDraw&&ctx.setFontSize(16);
        canDraw&&ctx.setFillStyle("#ED5759");
        canDraw&&ctx.fillText(
          element.name,
          40, //+20表示左边的marigin
          canvasHeight + ticketHeight
        );
        ticketHeight = ticketHeight + 20;
        canDraw&&ctx.setFontSize(12);
        //绘制描述
        // ctx.setFillStyle("#7F7F7F");
        // ctx.fillText(
        //   "使用条件："+element.describe,
        //   40, //+20表示左边的marigin
        //   canvasHeight + ticketHeight
        // );
        // ticketHeight = ticketHeight + 20;
        ticketHeight = ticketHeight + _this.mFillText(
          ctx,
          canvasHeight + ticketHeight,
          "使用条件："+element.describe,
          "#7F7F7F",
          13,
          topImgWith - 100 - 40,
          40,
          false,
          "",
          canDraw
        );
        
        //绘制有效期
        let ticketTextHeight = _this.mFillText(
          ctx,
          canvasHeight + ticketHeight,
          element.timeinfo,
          "#7F7F7F",
          13,
          topImgWith - 100 - 40,
          40,
          false,
          "",
          canDraw
        );
        ticketHeight =
          ticketHeight +
          ticketTextHeight;
        console.log("ticketTextHeight",ticketTextHeight);
        console.log((ticketTextHeight<30?30:ticketTextHeight)+40)
        //绘制领取按钮
        console.log("按钮x",canvasHeight + ticketHeight - ((ticketTextHeight<30?ticketTextHeight*1.5:ticketTextHeight)+40))
        canDraw&&_this.roundRect(
          ctx,
          topImgWith - 100 + 20,
          canvasHeight + ticketHeight - ((ticketTextHeight<30?ticketTextHeight*1.5:ticketTextHeight)+35),//当无换行需要向上移居中
          80,
          40,
          0,
          "#ED5759",
          "#ED5759"
        );
        //绘制领取按钮文字
        canDraw&&ctx.setFontSize(12);
        canDraw&&ctx.setFillStyle("#fff");
        canDraw&&ctx.fillText(
          "立即领取",
          topImgWith - 100 + 20 + 17,
          canvasHeight + 25 + ticketHeight - ((ticketTextHeight<30?ticketTextHeight*1.5:ticketTextHeight)+35),
        );
        //绘制虚线
        if(shareInfo.ticketList.length!==(index+1)){
          canDraw&&_this.drawDashedLine(
            ctx,
            40,
            canvasHeight + ticketHeight - 5,
            topImgWith,
            canvasHeight + ticketHeight - 5,
            2
          );
          ticketHeight = ticketHeight + 20;
        }
      });
      if(shareInfo.ticketList.length>0){
        canDraw&&_this.roundRect(
          ctx,
          20,
          ticketRoundHeight,
          topImgWith,
          ticketHeight + 30,
          10,
          "#E6C34E",
          "",
          true
        );
        console.log("ticketHeight", ticketHeight);
        canvasHeight = canvasHeight + ticketHeight;
      }

      //绘制小程序二维码  
      canvasHeight = canvasHeight + 22;
      let qrImgWidth = sysInfo.screenWidth*0.55;
      if(pmRes[3].path){
        canDraw&&ctx.drawImage(pmRes[3].path,sysInfo.screenWidth /2-qrImgWidth/2,canvasHeight,qrImgWidth,qrImgWidth);
        canvasHeight = canvasHeight + qrImgWidth;
      }

      canvasHeight = canvasHeight + 12;
      //绘制小程序分享人头像
      let userImgWidth = 30;
      let bottomText = store.state.userInfo.nickName + " 为你推荐好店";
      canDraw&&ctx.setFontSize(16)
      let bottomTextWidth = ctx.measureText(bottomText).width;
      canDraw&&ctx.drawImage(pmRes[2].path||"",(sysInfo.screenWidth-bottomTextWidth-userImgWidth)/2,canvasHeight+10,userImgWidth,userImgWidth);
      canvasHeight = canvasHeight + userImgWidth;


      //绘制小程序分享人名称
      canDraw&&ctx.setFillStyle("#7F7F7F");
      canDraw&&ctx.fillText(bottomText,(sysInfo.screenWidth-bottomTextWidth-userImgWidth)/2+userImgWidth+10,canvasHeight);
      canvasHeight = canvasHeight + 20;
      return canvasHeight;
    },
    saveImage: function(){
      wx.showLoading({
        title: '保存图片中...',
      });
      let _this = this;
      var sysInfo = wx.getSystemInfoSync();
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: sysInfo.screenWidth,
        height: _this.canvasHeight,
        destWidth: sysInfo.screenWidth * 3,
        destHeight: _this.canvasHeight * 3,
        canvasId: 'mycamvas',
        success: function(res) {
          console.log("get tempfilepath(success) is:", res);
          console.log("_this.canvasHeight",_this.canvasHeight)
          _this.tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: _this.tempFilePath,
            success(res) {
              wx.showToast({
                title: "保存卡片成功！",
              });
              wx.hideLoading();
              console.log("save photo is success")
            },
            fail: function() {
              wx.showToast({
                title: "保存卡片失败！",
                icon: 'none',
              });
              wx.hideLoading();
              console.log("save photo is fail")
            }
          });
        },
        fail: function() {
          console.log('get tempfilepath is fail')
          wx.showToast({
            title: "保存卡片失败！",
          });
          wx.hideLoading();
        }
      });
    },


    powerDrawer: function(currentStatu) {
      //console.log("12312")
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
      }.bind(this), 0)

      // 显示
      if (currentStatu == "open") {
        this.setData({
          showModalStatus: true
        });
      }
    },
    getUserInfo(e){
      let obj = {
        e: e,
        that: this,
        cb: this.drawCanvas
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
};
</script>
