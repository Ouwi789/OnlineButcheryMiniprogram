// pages/wagyu/wagyu.js
import {wagyuData, meatArray, displayArray} from "./mockData"
Page({
  /**
   * Page initial data
   */
  
  data: {
    price: 0,
    showDialog: false,
    buttons: [{text: '确认'}],
    meatToShow: 0,
    images: []
  },
  sliderKgChange: function(event){
    wagyuData.kg = event.detail.value
    this.setData({
      price: 5 * event.detail.value,
    })
    
  },
  directToPurchase: function(){
    wx.navigateTo({
      url: '/pages/purchaseDetails',
    })
  },
  addToCart:function(){
    this.setData({
      showDialog: true
    })
  },
  tapDialogButton:function(){
    wx.navigateTo({
      url: '/pages/index',
    })
  },
  copyData: function(a, b){
    this.setData({
      a: b
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad() {
    
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
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var options = currentPage.options;
    this.setData({
      meatToShow: options.itemId,
      images: displayArray[options.itemId].images
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