import {itemArray} from "./localData";
//TODO let purchase details page gather information from cart to know what item is being bought
Page({

  /**
   * Page initial data
   */
  data: {
    //FIXME 
    addDisabled: false,
    minusDisabled: false,
    itemArray: itemArray
  },

  /**
   * Lifecycle function--Called when page load
   */
  sendToPurchase: function(){
    wx.navigateTo({
      url: '/pages/purchaseDetails',
    })
  },
  locateIndexOfArray: function(array, id){
    for(let i = 0; i < array.length; i++){
      if(array[i].id === id){
        return i
      }
    }
    return -1
  },
  addKg: function(event){
    var arg1 = parseInt(event.currentTarget.dataset.arg1);
    var index = this.locateIndexOfArray(itemArray, arg1)
    if(!(itemArray[index].kg >= 15)){
      itemArray[index].kg += 1;
    }
    this.setData({
      itemArray: itemArray
    })
  },
  minusKg: function(event){
    var arg1 = parseInt(event.currentTarget.dataset.arg1);
    var index = this.locateIndexOfArray(itemArray, arg1)
    if(!(itemArray[index].kg <= 1)){
      itemArray[index].kg -= 1;
    }
    this.setData({
      itemArray: itemArray
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
   this.setData({
    itemArray: itemArray
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