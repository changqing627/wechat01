var app=getApp();
var util=require('../../../util/until')
Page({
  data: {
    movies:{},
    requestUrl:"",
    totalCount:0,
    isEmpty:true,
  },

  onLoad: function(options) {
    var category = options.category;
    this.setData({
      categorytitle: category
    })
    var dataUrl="";
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters"
        break;
      case '即将播放':
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
        break;
      case '豆瓣Top250':
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break;
    }
    this.data.requestUrl=dataUrl;
    // this.setdata({requestUrl:dataUrl})
    util.http(dataUrl, this.processDoubanData)

  }, 

  onScrollLower:function (event){
    var nextUrl=this.data.requestUrl+'?start='+this.data.totalCount+'&count=20'
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading();

  },
  onPullDownRefresh:function (event){
    var refreshUrl=this.data.requestUrl+"?star=0&count=20";
    this.data.movies={};
    this.data.isEmpty=true;
    util.http(refreshUrl,this.processDoubanData);
    wx.showNavigationBarLoading();
   
  },

  processDoubanData: function (moviesDouban){

    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.original_title
      if (title.length >= 6) {
        title = title.slice(0, 6) + '...'
      }
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }
      var totalMovies={}
      
      // 如果要绑定新加载的数据，那么就合并在一起
      if(!this.data.isEmpty){
        totalMovies=this.data.movies.concat(movies);
      }else{
        totalMovies=movies;
        this.data.isEmpty=false;
      }
    this.setData({ 
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()

  },
  onReady: function(options) {
    wx.setNavigationBarTitle({
      title: this.data.categorytitle
    })
  }


})