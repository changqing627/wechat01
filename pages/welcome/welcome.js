Page({
  onTap: function(event) {
    // wx.navigateTo({
    //   url:'../posts/post'
    // })
  
    wx.switchTab({
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