function iqTest(x){
  var odd = 0, even = 0;
  var oddPos = -1, evenPos = -1;
  var sum = 0;
  x = x.split(' ').map(Number);
  for (var i = 0; i < x.length; ++i) {
    sum = sum + x[i];
    if(x[i] % 2 != 0) {
      odd ++;
      oddPos = i + 1;
    }
    else {
      even ++;
      evenPos = i + 1;
    }
  }
  return (odd == 1) ? oddPos : evenPos;
}
