function findOdd(A) {
  comp = function(a, b) { return a < b ? -1 : 1; }
  A.sort(comp);
  var cur = A[0];
  var cnt = 1;
  var d = null;
  for (var i = 1; i < A.length; ++i) {
    if (cur == A[i]) cnt++;
    else {
      if (cnt % 2 != 0) d = A[i - 1];
      cur = A[i];
      cnt = 1;
    }
  }
  if (cnt % 2 != 0) d = A[A.length - 1];
  return d;
}
