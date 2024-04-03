import { fetchMeatArrayData } from "./localData.js"

async function searchItems(query) {
  const itemArray = await fetchMeatArrayData();
  return itemArray.filter(item => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });
}
Page({

  /**
   * 页面的初始数据
  */
  data: {
    searchResults: [],
    error: false,
    errText: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sendToWagyu: function (event) {
    var arg1 = event.currentTarget.dataset.arg1;
    wx.navigateTo({

      //${itemId}
      url: `/pages/wagyu?itemId=${arg1}`
    })
  },
  purchaseMeat: function () {
    wx.navigateTo({
      url: '/pages/purchaseDetails',
    })
  },
  findMeat: async function (event) {
    const self = this;
    try {
      const query = event.detail.value;
      const searchResults = await searchItems(query);
      self.setData({
        searchResults: searchResults,
        error: false
      });
    } catch (err) {
      self.setData({
        error: true,
        errText: "There seems to be an error within our API. Please try again tomorrow."
      })
    }

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