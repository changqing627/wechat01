
var postsData = require('../../../data/post_data')
var app=getApp();
Page({
  data:{
    isPlayMusic:false
  },
  onLoad:function (option){
   
    var postId=option.id;
 
    var postsDate = postsData.postList[postId] 
    this.setData({currentPostId:postId})
    this.setData({
      postsDetail: postsDate
    })

    var postsCollected=wx.getStorageSync('post_collect');
    if(postsCollected){
      var collectId=postsCollected[postId]
      if(collectId){
        this.setData({ conllected: collectId })
      }
    }else{
      var postsCollected={};
      postsCollected[postId]=false;
      wx.setStorageSync('post_collect',postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentId === postId){
      this.setData({ isPlayMusic:true})
    }
    this.setMusicMonitor();
   
  },
  setMusicMonitor:function (){
    var that = this;
    wx.onBackgroundAudioPause(function () {
      that.setData({ isPlayMusic: false })
      app.globalData.g_isPlayingMusic=false;
      app.globalData.g_currentId = null
    })
    wx.onBackgroundAudioPlay(function () {
      that.setData({ isPlayMusic: true })
      app.globalData.g_isPlayingMusic=true;
      app.globalData.g_currentId = that.data.currentPostId;
    })
  },
  onCollectedTap:function (event){
    var postsCollected=wx.getStorageSync('post_collect');
    var collectId = postsCollected[this.data.currentPostId]
    collectId=!collectId;
    postsCollected[this.data.currentPostId]=collectId;
    
    this.showModal(postsCollected, collectId);
    // wx.showToast({
    //   title:collectId?'收藏成功':'收藏失败'
    // })
   
  },
  showModal: function (postsCollected, collectId) {
    var that=this;
    wx.showModal({
      title: '收藏文字',
      content: collectId?'收藏文章吗？':'取消收藏的文字吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确定',
      confirmColor: '#3cc51f',
      success: function (res) {
        if(res.confirm){
          wx.setStorageSync('post_collect', postsCollected)
          that.setData({ conllected: collectId })
        }

      },
      fail: function () { },
      complete: function (){}
      })
  },
  showToast: function (postsCollected, collectId){
    wx.setStorageSync('post_collect', postsCollected)
    this.setData({ conllected: collectId })

    wx.showToast({
      title:collectId?'收藏成功':'收藏失败'
    })

  },
  onShareTap:function (event){
    var itemList=['分享到微信','分享到QQ','分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      itemColor:'#405f80',
      success:function (res){  
          wx.showModal({
            title: '用户' + itemList[res.tapIndex],
            content:'用户是否取消'+res.cancel+'现在还不支持'
          })
        
      },
      fail:function (){

      },
      complete:function (){}
    })
  },

  onMusicTap:function (event){
    var isPlayMusic=this.data.isPlayMusic;
    if(isPlayMusic){
      wx.pauseBackgroundAudio();
      this.setData({ isPlayMusic:false});

    }else{

      wx.playBackgroundAudio({
        dataUrl: postsData.postList[this.data.currentPostId].music.url,
        title: postsData.postList[this.data.currentPostId].music.title,
        coverImgUrl: postsData.postList[this.data.currentPostId].music.coverImg,
        success: function () { },
        fail: function () { },
        complete: function () { }
      })

      this.setData({isPlayMusic:true})

    }
   
  }


 
}) 