function prime(x) {
  for (var d = 2; d < x; ++d)
    if (x % d == 0) return false;
  return true;
}
function sumOfDivided(lst) {
  var t = [];
  for (var d = 2; d <= 10000; ++d) {
    if (!prime(d)) continue; 
    s = 0;
    var dobry = false;
    for (var i = 0; i < lst.length; ++i) {
      var x = lst[i];
      if (x % d == 0) {
        s += x;
        dobry = true;
      }
    }
    if (dobry) t.push([d, s]);
  }
  return t;
}
 