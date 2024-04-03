import { store } from "./localData"
Page({
  data: {
    orderItems: [],
    totalPrice: 0,
    error: false,
    errText: "",
    orderId: 0,
    buttonText: "Delete Order",
    buttonDisabed: false,
  },
  onShow() {
    var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var options = currentPage.options;
    const self = this;
    wx.request({
      url: `http://localhost:4000/order/${options.orderId}/orderItems`,
      method: 'GET',
      success (res) {
        self.setData({
          orderItems: res.data,
          totalPrice: res.data.map(it => it.price * it.amount).reduce((r, c) => r + c),
          error: false,
          orderId: options.orderId
        })
      },
      fail (err) {
        console.log("Error: ", err)
        self.setData({
          error: true,
          errText: "There seems to be an error within our API. Please try again tomorrow."
        })
      }
  })
  },
  deleteOrder() {
    const self = this
    wx.request({
      url: `http://localhost:4000/user/${store.openId}/orders/${this.data.orderId}`,
      method: 'PUT',
      success (res) {
        self.setData({
          buttonText: "Success!",
          buttonDisabled: true
        })
      },
      fail(err) {
        console.log("Error: ", err)
        self.setData({
          error: true,
          errText: "There was a problem with deleting the order. Please try again tomorrow."
        })
      }
    })
  }
})