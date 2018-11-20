function converToStarsArray(stars){
  var num=stars.toString().substring(0,1);
  var array=[];
  for(var i=1; i<=5; i++){
    if(i<=num){
      array.push(1);
    }else{
      array.push(0)
    }
  }
  return array;
}

function http(url,callBack) {
  
  wx.request({
    url: url,
    data: {},
    dataType: 'json',
    method: 'get',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data)
      // that.processDoubanData(res.data, settedkey, categoryTitle)
    },
    fail: function (res) {
      console.log('fail')
    }
  })
}

module.exports={
  convertToStarsArray: converToStarsArray,
  http:http
}