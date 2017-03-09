var d = [];
var ans = null;
var back = false;
function rec(last, sum, cnt) {
  if (sum == 0) {
    ans = d;
    back = true;
    return;
  }
  if (last < 1)
    return;
  for (var x = last; x >= 0; --x) {
  if (back) return;
    if (sum - x * x >= 0) {
      d[cnt] = x;
      rec(x - 1, sum - x * x, cnt + 1);
    }
  }
}
function decompose(n) {
  d = [];
  ans = null;
  back = false;
  rec(n - 1, n * n, 0);
  var comp = function(a, b) { return a < b ? -1 : 1; };
  if (ans != null) {
    ans.sort(comp); 
    while (ans.length > 0 && ans[0] == 0) ans.shift();
    if (ans.length == 0) ans = null;
  }
  return ans;
}
