function highAndLow(numbers){
  var res = numbers.split(' ').map(Number);
  comp = function(a, b) { return a < b ? -1 : 1; }
  res.sort(comp);
  var x = res[0];
  var y = res[res.length - 1];
  return y.toString() + " " + x.toString();
}
