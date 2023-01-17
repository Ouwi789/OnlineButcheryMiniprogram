import data from "./wagyu.js";
Page({

  /**
   * Page initial data
   */
  data: {
    //FIXME 
    a: data.kg,
    addDisabled: false,
    minusDisabled: false,
    
    itemArray: [{
      src: 'https://cdn.shopify.com/s/files/1/0365/9327/0916/products/wagyu-fullblood-scotch-fillet-steak-marble-score-9-stone-axe-300g-vics-meat-668742_1400x.jpg?v=1658117888', name: 'Wagyu', price: 5, c: data.kg
    }, {
      src: 'b', name: 'idk', price: 10, c: 0
    }]
  },

  /**
   * Lifecycle function--Called when page load
   */
  addKg: function(){
    if(data.kg <= 1){
      this.setData({
        minusDisabled: false
      })
    }
    if(data.kg >= 15){
      this.setData({
        addDisabled: true
      })
    } else {
      data.kg += 1;
    }
    this.setData({
      'itemArray[0].c': data.kg
    })
    
  },
  minusKg: function(){
    if(data.kg >= 15){
      this.setData({
        addDisabled: false
      })
    }
    if(data.kg <= 1){
      this.setData({
        minusDisabled: true
      })
    } else {
      data.kg -= 1;
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
    this.setData({
      'itemArray[0].c': data.kg
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