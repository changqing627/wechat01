Page({
  onTap: function() {
    // wx.navigateTo({
    //   url:'../posts/post'
    // })
    wx.redirectTo({
      url: '../posts/post'
    })
  },
  onLoad: function() {
    // console.log('hellow this is onLoad')
  },
  onHide: function() {
    // console.log('hellow this is onHide')
  }
})