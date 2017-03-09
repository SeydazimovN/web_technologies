function Reversed(x) {
  var res = "";
  for (var i = 0; i < x.length; ++i)
    res = res + x[x.length - i - 1];
  return res;
}
function addBinary(a,b) {
  var x = a + b;
  var res = "";
  
  while (x > 0) {
    res = res + String(x % 2);
    x = parseInt(x / 2);
  }
  return Reversed(res);
}