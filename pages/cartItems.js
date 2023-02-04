import {wagyuData, meatArray} from "./mockData";
//TODO let purchase details page gather information from cart to know what item is being bought
Page({

  /**
   * Page initial data
   */
  data: {
    //FIXME 
    addDisabled: false,
    minusDisabled: false,
    itemArray: meatArray
  },

  /**
   * Lifecycle function--Called when page load
   */
  sendToPurchase: function(){
    wx.navigateTo({
      url: '/pages/purchaseDetails',
    })
  },
  addKg: function(){
    if(wagyuData.kg <= 1){
      this.setData({
        minusDisabled: false
      })
    }
    if(wagyuData.kg >= 15){
      this.setData({
        addDisabled: true
      })
    } else {
      wagyuData.kg += 1;
      meatArray[0].c = wagyuData.kg
    }
    this.setData({
      'itemArray[0].c': wagyuData.kg
    })
  },
  minusKg: function(){
    if(wagyuData.kg >= 15){
      this.setData({
        addDisabled: false
      })
    }
    if(wagyuData.kg <= 1){
      this.setData({
        minusDisabled: true
      })
    } else {
      wagyuData.kg -= 1;
      meatArray[0].c = data.kg
    }
    this.setData({
      'itemArray[0].c': data.kg
    })
  },
  onLoad(options) {
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    //FIXME find a better way then refreshing
    meatArray[0].c = wagyuData.kg
    this.setData({
      itemArray: meatArray,
      'itemArray[0].c': wagyuData.kg
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
  
})