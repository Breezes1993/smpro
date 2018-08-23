<template>
  <div>
    <canvas canvasId="mycamvas" :style="';width:100%;height:'+canvasHeight+';'"></canvas>
    <!-- <img v-if="!tempFilePath" :style="'width:100%;height:'+canvasHeight" :src="tempFilePath"/> -->
    <div style="width:100%;height:128rpx;"></div>
    <cover-view class="save-image">
      <cover-view @click="saveImage"  hoverClass="hover">保存图片</cover-view>
    </cover-view>
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
      tempFilePath: ""
    };
  },
  onLoad(o) {},
  onUnload() {},
  onReachBottom() {},
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      _this.shareInfo = wx.getStorageSync("shareInfo");
      _this.drawCanvas();
    });
  },
  onShareAppMessage: function(res) {
    let _this = this;
    return {
      title: _this.name,
      path: "/pages/storeInfo/main" + "?id=" + _this.curId
    };
  },
  methods: {
    drawCanvas: function() {
      console.log(this);
      wx.showLoading({
        title: '卡片生成中',
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
            wx.getImageInfo({
              src: shareInfo.qrCodeImg || "",
              success: function(res) {
                console.log("获取二维码",res,shareInfo.qrCodeImg)
                resolve(res);
              },
              faile: function(msg) {
                console.log("二维码失败", msg);
                reject(msg);
              }
            });
          })
        );
        Promise.all(promiseArray)
          .then(function(pmRes) {
            let roundRectHeight = _this.mDrawCanvas(pmRes,ctx);
            _this.canvasHeight = (roundRectHeight+40) + "px";
            ctx.clearRect(10, 10, sysInfo.screenWidth, roundRectHeight)
            _this.roundRect(ctx, 10, 10, sysInfo.screenWidth - 20, roundRectHeight, 10);
            _this.mDrawCanvas(pmRes,ctx);
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
      centerWidth
    ) {
      let addHeight = 0;
      //"地址：" + shareInfo.storeInfo.address,"#7F7F7F",16,topImgWith - 40,(topImgWith - ctx.measureText(element).width) / 2 + 20
      // let text = "地址：" + shareInfo.storeInfo.address;
      ctx.fillStyle = fillStyle;
      ctx.setFontSize(fontSize);
      let textRow = this.canvasTextChangeLine(ctx, text, measureWidth);
      textRow.forEach((element, indx) => {
        ctx.fillText(
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
    mDrawCanvas: function(pmRes,ctx){
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
      ctx.drawImage(res.path, 20, 20, topImgWith, res.height / scalVal);
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
      let arcPointX = 20 + topImgWith / 2;
      let arcPointY = 20 + topImgHeight;
      ctx.beginPath();
      ctx.arc(arcPointX, arcPointY, 45, 0, 2 * Math.PI);
      ctx.setFillStyle("#fff");
      ctx.fill();
      ctx.closePath();

      //绘制圆形logo
      _this.roundImg(ctx, 86, 86, arcPointX, arcPointY, pmRes[1].path);
      canvasHeight = canvasHeight + 86 / 2;
      console.log("canvasHeight", canvasHeight);

      //绘制商户名称
      console.log("canvasHeight", canvasHeight);
      ctx.fillStyle = "#000";
      ctx.setFontSize(18);
      ctx.fillText(
        shareInfo.storeInfo.name,
        (topImgWith - ctx.measureText(shareInfo.storeInfo.name).width) /
          2 +
          20 -
          0.5, //+20表示左边的marigin
        canvasHeight
      );
      ctx.fillText(
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
          16,
          topImgWith - 40,
          20,
          true,
          topImgWith
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
          16,
          topImgWith - 40,
          20,
          true,
          topImgWith
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
          16,
          topImgWith - 60,
          20,
          true,
          topImgWith
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
        ctx.setFontSize(12);
        //绘制代金券
        ctx.setFillStyle("#ED5759");
        ctx.fillText(
          element.name,
          40, //+20表示左边的marigin
          canvasHeight + ticketHeight
        );
        ticketHeight = ticketHeight + 20;
        //绘制描述
        ctx.setFillStyle("#7F7F7F");
        ctx.fillText(
          element.describe,
          40, //+20表示左边的marigin
          canvasHeight + ticketHeight
        );
        ticketHeight = ticketHeight + 20;
        //绘制有效期
        let ticketTextHeight = _this.mFillText(
          ctx,
          canvasHeight + ticketHeight,
          element.timeinfo,
          "#7F7F7F",
          13,
          topImgWith - 130 - 40,
          40,
          false
        );
        ticketHeight =
          ticketHeight +
          ticketTextHeight;
        console.log("ticketTextHeight",ticketTextHeight);
        console.log((ticketTextHeight<30?30:ticketTextHeight)+40)
        //绘制领取按钮
        console.log("按钮x",canvasHeight + ticketHeight - ((ticketTextHeight<30?ticketTextHeight*1.5:ticketTextHeight)+40))
        _this.roundRect(
          ctx,
          topImgWith - 130 + 20,
          canvasHeight + ticketHeight - ((ticketTextHeight<30?ticketTextHeight*1.5:ticketTextHeight)+40),//当无换行需要向上移居中
          100,
          40,
          0,
          "#ED5759",
          "#ED5759"
        );
        //绘制领取按钮文字
        ctx.setFontSize(13);
        ctx.setFillStyle("#fff");
        ctx.fillText(
          "立即领取",
          topImgWith - 130 + 20 + 25,
          canvasHeight + 25 + ticketHeight - ((ticketTextHeight<30?ticketTextHeight*1.5:ticketTextHeight)+40),
        );
        //绘制虚线
        if(shareInfo.ticketList.length!==(index+1)){
          _this.drawDashedLine(
            ctx,
            40,
            canvasHeight + ticketHeight - 10,
            topImgWith - 40,
            canvasHeight + ticketHeight - 10,
            2
          );
          ticketHeight = ticketHeight + 10;
        }
      });
      if(shareInfo.ticketList.length>0){
        _this.roundRect(
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
      canvasHeight = canvasHeight + 10;
      let qrImgWidth = 100;
      ctx.drawImage(pmRes[3].path,sysInfo.screenWidth /2-qrImgWidth/2,canvasHeight,qrImgWidth,qrImgWidth);
      canvasHeight = canvasHeight + qrImgWidth;

      //绘制小程序分享人头像
      let userImgWidth = 20;
      let bottomText = store.state.userInfo.nickName + " 为你推荐好店";
      let bottomTextWidth = ctx.measureText(bottomText).width;
      ctx.drawImage(pmRes[2].path||"",(sysInfo.screenWidth-bottomTextWidth-userImgWidth)/2,canvasHeight+5,userImgWidth,userImgWidth);
      canvasHeight = canvasHeight + userImgWidth;


      //绘制小程序分享人名称
      ctx.setFillStyle("#7F7F7F");
      ctx.fillText(bottomText,(sysInfo.screenWidth-bottomTextWidth-userImgWidth)/2+userImgWidth+10,canvasHeight);
      canvasHeight = canvasHeight + 30;
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
    }
  }
};
</script>
