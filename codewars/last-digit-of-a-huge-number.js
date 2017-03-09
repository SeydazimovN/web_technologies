function lastDigit(x){
  // console.log(x);
  if (x.length == 0) return 1;
  var res = x[x.length - 1];
  for (var i = x.length - 2; i >= 0; --i) {
    x[i] %= 100;
    if (res == 1) res = x[i]; 
    else if (res == 0) res = 1;
    else if (res >= 4) res = Math.pow(x[i], 4) * Math.pow(x[i], res % 4);
    else res = Math.pow(x[i], res);
  }
  return res % 10;
}

