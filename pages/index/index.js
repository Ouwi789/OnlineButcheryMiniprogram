//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    images: [{
      src: 'https://cdn.shopify.com/s/files/1/0365/9327/0916/products/wagyu-fullblood-scotch-fillet-steak-marble-score-9-stone-axe-300g-vics-meat-668742_1400x.jpg?v=1658117888'
    }, {
      src: 'https://awmgroup.com.au/wp-content/uploads/2016/05/lamb-leg.png'
    }, {
      src: 'https://www.thehappychickencoop.com/wp-content/uploads/2022/01/white-striping-in-chicken-meat.jpg'
    }],
    searchSrc: 'https://cdn.icon-icons.com/icons2/2066/PNG/512/search_icon_125165.png',
    categorySrc: 'https://thenounproject.com/api/private/icons/323575/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABjjteH2eBWNz9IRYUIEUZT2d1C_BSCnn0jyi0z8-KcjTg7YqDV1W5GL2pnkP11kQbRdDW6d2WAmsftqwvICJfdDQbVGw%3D%3D',
    imageArray: [{
      //TODO seperate image src with positioning of top and left
      src: 'a', top: 55, left: 5
    }, {
      src:'b', top: 55, left: 37.5
    }, {
      src:'c', top:55, left: 69.5
    }, {
      src:'d', top:75, left:5
    }, {
      src:'e', top:75, left:37.5
    }, {
      src:'f', top:75, left:69.5
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  directToPurchase: function(){
    wx.navigateTo({
      url: '/pages/purchasePage/purchasePage',
    })
  },
  directToCategory: function(){
    wx.navigateTo({
      url: '/pages/category/category',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
