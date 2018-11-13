
var postsData = require('../../../data/post_data')
Page({
  onLoad:function (option){
    var postId=option.id;
 
    var postsDate = postsData.postList[postId] 
    this.setData({postId:postId})
    this.setData({
      postsDetail: postsDate
    })

    var postsCollected=wx.getStorageSync('post_Collected');
    this.setData({ conllected: postsCollected})
    var collectAll = {};
      if(postsCollected){
        var collectId=this.data.postId;
        collectAll[collectId] = true;
        this.setData({ 'post_Collected': collectAll[collectId]})
        
      }else{
        
        collectAll[collectId]=false;
        wx.setStorageSync('post_Collected', collectAll[collectIdd])
      }
   
  },
  onCollectedTap:function (event){
     var postStyle=wx.getStorageSync('post_Collected')
     postStyle=!postStyle
    console.log(postStyle)
    wx.setStorageSync('post_Collected', postStyle)
    var collectboolean=wx.getStorageSync('post_Collected');
    this.setData({ 'conllected': collectboolean})
    
      
  }
 
}) 