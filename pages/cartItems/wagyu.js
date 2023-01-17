// pages/wagyu/wagyu.js
var data = {
  kg: 0
}
Page({
  /**
   * Page initial data
   */
  
  data: {
    price: 0,
    showDialog: false,
    buttons: [{text: '确认'}],
    images: [{
      src: 'https://cdn.shopify.com/s/files/1/0365/9327/0916/products/wagyu-fullblood-scotch-fillet-steak-marble-score-9-stone-axe-300g-vics-meat-668742_1400x.jpg?v=1658117888'
    }, {
      src: 'https://awmgroup.com.au/wp-content/uploads/2016/05/lamb-leg.png'
    }, {
      src: 'https://www.thehappychickencoop.com/wp-content/uploads/2022/01/white-striping-in-chicken-meat.jpg'
    }],
  },
  sliderKgChange: function(event){
    this.data.price = 5
    data.kg = event.detail.value
    console.log(data.kg)
    this.setData({
      price: this.data.price * event.detail.value,
      
    })
  },
  directToPurchase: function(){
    wx.navigateTo({
      url: '/pages/purchaseDetails/purchaseDetails',
    })
  },
  addToCart:function(){
    this.setData({
      showDialog: true
    })
  },
  tapDialogButton:function(){
    wx.navigateTo({
      url: '/pages/index/index',
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
export default data;