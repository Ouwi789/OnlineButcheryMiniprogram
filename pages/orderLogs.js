import { store } from "./localData"
Page ({
  data: {
    orders: [],
    hide: true,
    error: false,
    errText: "",
  },
  
  GetOrderLog: function() {
    const self=this;
      wx.request({
        url: `http://localhost:4000/user/${store.openId}/orders`,
        method: 'GET',
        //TODO error handle the backend
        success (res) {
          if(res.statusCode === 200){
            const updatedOrders = res.data.map(order => {
              const showPaid = order.paid ? "Yes" : "No";
              const showPickup = order.pickup ? "Yes" : "No";
              const buttonDisabled = order.status == "deleted" ? true : false
              console.log(`Order ID: ${order.id}, Status: ${order.status}, Button Disabled: ${buttonDisabled}`);
              return {
                ...order,
                showPaid,
                showPickup,
                buttonDisabled
              };
            });
          
            self.setData({
              orders: updatedOrders,
              hide: false,
              error: false,
            });
          }
        },
        fail (err) {
          self.setData({
            error: true,
            errText: "There is a current issue with our API, please try tomorrow."
          })
        },
      });
  },
  OrderItems: function(event) {
    var arg1 = event.currentTarget.dataset.arg1;
    wx.navigateTo({
      url: `/pages/orderLogItems?orderId=${arg1}`
    })
  }
})