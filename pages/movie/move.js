var util=require('../../util/until.js')
var app=getApp();
Page({
  data:{
    inTheaters:{},
    comingsoon:{},
    top250:{}
  },
  onLoad:function (){
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" +"?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映")
    this.getMovieListData(comingSoonUrl,"comingsoon","即将播放")
    this.getMovieListData(top250Url,"top250","豆瓣Top250")
  },
  onTapMore:function (event){
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'moreMovie/moreMovie?category=' + category
    })
  },
  getMovieListData: function (url, settedkey, categoryTitle){
    var that=this;
    wx.request({
      url: url,
      data: {},
      dataType: 'json',
      method: 'get',
      header:{
        "Content-Type":"json"
      },
      success: function (res) {
      
        that.processDoubanData(res.data,settedkey,categoryTitle)
      },
      fail: function (res) {
        console.log('fail')
      }
    })
  },
  processDoubanData: function (moviesDouban, settedkey, categoryTitle){
    var movies=[];
    for (var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx]
      var title = subject.original_title
      if(title.length>=6){
        title=title.slice(0,6)+'...'
      }
      var temp={
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp)
    }

    var readyData={};
    readyData[settedkey] = { movies: movies, categoryTitle: categoryTitle};
    this.setData(readyData)
  }



})