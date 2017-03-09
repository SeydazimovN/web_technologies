String.prototype.camelCase=function(){
  var x = this;
  var res = x.split(' ');
  var d = "";
  for(var i = 0; i < res.length; ++i) {
    if (res[i].length > 0) {
      res[i] = res[i][0].toUpperCase() + res[i].slice(1)
      d = d + res[i];
    }
  }
  return d;
}