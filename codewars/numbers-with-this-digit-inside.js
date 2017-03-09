function good(x, d) {
  var dobry = false;
  while (x > 0) {
    if (x % 10 == d) 
      dobry = true;
    x = x / 10;
    x = parseInt(x, 10);
  }  
  return dobry;
}

function numbersWithDigitInside(x, d) {
  var cnt = 0, sum = 0, res = 1;
  for (var i = 1; i <= x; ++i) {
    if (good(i, d)) {
      cnt = cnt + 1;
      sum = sum + i;
      res = res * i;
    }
  }
  if (cnt == 0) res = 0;
  return [cnt, sum, res];
}
