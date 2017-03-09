function find_average(x) {
  var sum = 0;
  var n = x.length; 
  for (var i = 0; i < n; ++i)
    sum = sum + x[i];
  return sum / n;
}
