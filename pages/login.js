import {store} from "./localData"
export async function getUserOpenId() {
  wx.login({
    success: function(res) {
      if (res.code) {
        // Code retrieval successful, send the code to your server-side API
        const loginCode = res.code;
        // Call your server-side API to exchange the code for session information and OpenID
        wx.request({
          url: 'http://localhost:4000/login',
          method: 'POST',
          data: {
            code: loginCode
          },
          success: function(response) {
            // Handle the response and extract the OpenID
            store.openId = response.data.openid;
            // Perform further operations with the OpenID
          },
          fail: function(error) {
            console.log('Request failed: ');
            console.log(error);
          }
        });
      } else {
        // Code retrieval failed
        console.log('wx.login failed: ' + res.errMsg);
      }
    },
    fail: function() {
      // wx.login failed
      console.log('wx.login failed');
    }
  });
}
