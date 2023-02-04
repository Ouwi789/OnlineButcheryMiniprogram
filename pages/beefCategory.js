// pages/beefCategory.js
Page({

  /**
   * Page initial data
   */
  data: {
    imageArray: [{
      //TODO seperate image src with positioning of top and left
      src: 'https://cdn.shopify.com/s/files/1/0365/9327/0916/products/wagyu-fullblood-scotch-fillet-steak-marble-score-9-stone-axe-300g-vics-meat-668742_1400x.jpg?v=1658117888', 
      methodName: 'sendToWagyu'
    }]
  },
  sendToWagyu: function(itemId){
    wx.navigateTo({
      url: `/pages/wagyu?itemId=${itemId}`,
      events: {
        // Adds a listener for the specified event to get the data sent to the current page by the open page
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // Transfer data to the open page via the event channel
        res.eventChannel.emit('acceptDataFromOpenerPage', itemId)
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
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