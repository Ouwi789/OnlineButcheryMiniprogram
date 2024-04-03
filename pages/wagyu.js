// pages/wagyu/wagyu.js
import {itemArray, fetchMeatArrayData} from "./localData"
Page({
  /**
   * Page initial data
   */
  data: {
    price: 0,
    showDialog: false,
    buttons: [{text: 'Success!'}],
    image: 'url',
    actualPrice: 0,
    meat: {},
    kg: 0,
    display: false,
    images: [],
    soldOut: false,

  },
  roundToNearestFiveCents(number) {
    return Math.round(number * 20) / 20;
  },
  sliderKgChange: function(event){
    this.setData({
      price: this.roundToNearestFiveCents(this.data.actualPrice * event.detail.value),
      kg: event.detail.value
    })
  },
  changeItemArray: function(array, quantity){
    let inArray = false;
    for(let i = 0; i < array.length; i++){
      if(array[i].id === this.data.meat.id){
        if(quantity === 0){
          array.splice(i, 1)
          return
        } else {
          array[i].kg = quantity;
          inArray = true;
          break;
        }
      }
    }
    if(!inArray){
      array.push({
        name: this.data.meat.name, 
        id: this.data.meat.id,
        kg: quantity,
        price: this.data.price,
        discount: 0
      })
    }
  },
  directToPurchase: function(){
    this.changeItemArray(itemArray, this.data.kg)
    wx.navigateTo({
      url: '/pages/purchaseDetails',
    })
  },
  addToCart:function(){
    this.changeItemArray(itemArray, this.data.kg)
    this.setData({
      showDialog: true
    })
  },
  tapDialogButton:function(){
    wx.navigateTo({
      url: '/pages/index',
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
  async onShow() {
    try {
      const meatArray = await fetchMeatArrayData();
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      var options = currentPage.options;
      this.setData({
        image: meatArray[options.itemId-1].image,
        actualPrice: meatArray[options.itemId-1].price,
        meat: meatArray[options.itemId-1],
        display: meatArray[options.itemId-1].amount <= 0 && meatArray[options.itemId-1].display,
        soldOut: meatArray[options.itemId-1].amount <= 0
      })
      this.setData({
        images: this.data.image.split(",")
      })
    } catch(e) {
      console.log(e)
    }
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  async onHide() {
    try {
      const meatArray = await fetchMeatArrayData();
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      var options = currentPage.options;
      this.setData({
        image: meatArray[options.itemId-1].image,
        actualPrice: meatArray[options.itemId-1].price,
        meat: meatArray[options.itemId-1],
        display: meatArray[options.itemId-1].amount <= 0 && meatArray[options.itemId-1].display,
        soldOut: meatArray[options.itemId-1].amount <= 0
      })
      this.setData({
        images: [image]
      })
    } catch(e) {
      console.log(e)
    }
    
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