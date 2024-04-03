import { itemArray, store } from "./localData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: itemArray,
    showId: 0,
    showDialog: false,
    buttons: [{ text: 'Success!' }],
    checkboxItems: [
      { name: 'Pickup At The Shop', value: 'pickup', checked: false },
      { name: 'Will you pay in cash?', value: 'cash', checked: false }
    ],
    error: false,
    errText: "",
    submitDisabled: false,
    errors: {
      fName: "",
      lName: "",
      addressLine1: "",
      suburb: "",
      postcode: "",
    },
    dirty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    this.setData({
      items: itemArray
    })
  },
  checkBoxChange: function (e) {
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems,
      [`formData.checkbox`]: e.detail.value
    });
  },
  SaveDetails: function (event) {
    const formData = event.detail.value;
    
    if (!(Object.entries(this.data.errors).find((it => it[1].trim() !== "" ))) && (itemArray.length > 0) && this.data.dirty) {
      const checkboxItems = this.data.checkboxItems;
      const items = this.data.items;
      const self = this;
      wx.request({
        url: 'http://localhost:4000/orders',
        method: 'POST',

        data: {
          "paid": checkboxItems[1].checked,
          "discount": 0, //TODO get discount
          "pickup": checkboxItems[0].checked,
          "items": items,
          "address": {
            "streetLine1": formData.addressLine1,
            "streetLine2": formData.addressLine1,
            "suburb": formData.suburb,
            "postcode": parseInt(formData.postcode)
          },
          "customer": {
            "first_name": formData.fname,
            "last_name": formData.lname,
            "open_id": store.openId
          },
          "status": "pending"
        },
        success: (res) => {
          console.log("Success: ");
          const items = this.data.items;
          wx.request({
            url: 'http://localhost:4000/meats',
            method: 'PUT',
            data: {
              "items": items
            },
            success: (res) => {
              console.log("Success")
            },
            fail: (err) => {
              console.log(err)
            }
          })
          itemArray.length = 0;
          self.setData({
            showId: res.data.id,
            showDialog: true,
            error: false
          });
        },
        fail: (err) => {
          console.log("Fail: ", err)
          self.setData({
            error: true,
            errText: "There seems There seems to be an error within our API. Please try again tomorrow"
          })
        }
      });
    } else {
      this.setData({
        error: true,
        errText: "Please put something in your cart first and fill in all required fields"
      })
    }

  },
  requireValidate: function(e){
    var field = e.currentTarget.dataset.field;
    var label = e.currentTarget.dataset.label;
    if(e.detail.value.trim().length <= 0 ) {
      this.setData({
        errors: {...this.data.errors, 
          [field]: `${label} is required`}
      })
    }
  },
  cleanUpValidation: function(e) {
    var field = e.currentTarget.dataset.field;
    this.setData({
      errors: {...this.data.errors, [field]: ""},
      errText: "",
      dirty: true
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  tapDialogButton: function () {
    wx.navigateTo({
      url: '/pages/index',
    })
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