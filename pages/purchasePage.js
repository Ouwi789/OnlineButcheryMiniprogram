function searchItems(query) {
  const itemArray = [
    {name: 'wagyu', src: 'https://cdn.shopify.com/s/files/1/0365/9327/0916/products/wagyu-fullblood-scotch-fillet-steak-marble-score-9-stone-axe-300g-vics-meat-668742_1400x.jpg?v=1658117888', link: 0},
    {name: 'idk', src: 'b', link: 1}
  ];
  return itemArray.filter(item => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
}
Page({

  /**
   * 页面的初始数据
  */
  data: {
    searchResults: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sendToWagyu: function(event){
    var arg1 = event.currentTarget.dataset.arg1;
    wx.navigateTo({
      
      //${itemId}
      url: `/pages/wagyu?itemId=${arg1}`
    })
  },
  purchaseMeat: function(){
    wx.navigateTo({
      url: '/pages/purchaseDetails',
    })
  },
  
  findMeat: function(event){
    const query = event.detail.value;
    this.setData({
      searchResults: searchItems(query),
    });
  },
  
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})