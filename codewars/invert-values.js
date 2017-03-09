function invert(x) {
  function func(d) {
    if (d <= 0) return Math.abs(d);
    return d = -d; 
  }
  console.log(x);
  var res = [];
  for (var i = 0; i < x.length; ++i) 
     res.push(func(x[i]));
   return res;
}