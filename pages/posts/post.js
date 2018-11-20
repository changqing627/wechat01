var postsData=require('../../data/post_data')

Page({

  data: { 
    collected:''

  },

  onLoad: function (options) {
    
    this.setData({
      post_key: postsData.postList
    })
  },
  onPostTap:function (event){
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url:'post-detail/post-detail?id='+postId
    })
  }

 

})