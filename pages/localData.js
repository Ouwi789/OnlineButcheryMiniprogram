

export let wagyuData = {
  kg: 0
}
export let itemArray = []
export let displayArray = [{
  images: [{
    src: 'https://cdn.shopify.com/s/files/1/0365/9327/0916/products/wagyu-fullblood-scotch-fillet-steak-marble-score-9-stone-axe-300g-vics-meat-668742_1400x.jpg?v=1658117888'
  }, {
    src: 'https://awmgroup.com.au/wp-content/uploads/2016/05/lamb-leg.png'
  }, {
    src: 'https://www.thehappychickencoop.com/wp-content/uploads/2022/01/white-striping-in-chicken-meat.jpg'
  }],
  name: 'Wagyu', 
  c: wagyuData.kg,
}, {
  images: 0, src: 'b', name: 'idk', price: 10, c: 0
}]
// TODO use a proper state management tool
export const store = {
  openId: ""
}
export function fetchMeatArrayData() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://localhost:4000/meats`,
      method: 'GET',
      //TODO error handle the backend
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      },
    });
  });
}
