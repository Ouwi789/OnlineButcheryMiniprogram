// pages/beefCategory.js
import {fetchMeatArrayData} from './localData'
Page({

  /**
   * Page initial data
   */
  data: {
    imageArray: [],
    error: false,
    errText: ""
  },
  sendToWagyu: function(event){
    var arg1 = event.currentTarget.dataset.arg1;
    wx.navigateTo({
      //${itemId}
      url: `/pages/wagyu?itemId=${arg1}`
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
  createBeefArray(newArray, wholeArray, type){
    if(type == "Other"){
      for(let i = 0; i < wholeArray.length; i++){
        if(wholeArray[i].description != "Beef" && wholeArray[i].description != "Chicken" && wholeArray[i].description != "Duck" && wholeArray[i].description != "Pork" && wholeArray[i].description != "Lamb"){
          newArray.push(wholeArray[i]);
        }
      }
    } else {
      for(let i = 0; i < wholeArray.length; i++){
        if(wholeArray[i].description == type){
          newArray.push(wholeArray[i]);
        }
      }
    }
  },
 async onShow() {
  try {
    const meatArray = await fetchMeatArrayData();
    const imageArray = [];
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var options = currentPage.options;
    this.createBeefArray(imageArray, meatArray, options.category);
    this.setData({
      imageArray: imageArray,
      error: false
    });
  } catch (error) {
    console.error('Error occurred while fetching or processing the data:', error);
    this.setData({
      error: true,
      errText: "There seems to be an error within our API. Please try again tomorrow."
    })
  }
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