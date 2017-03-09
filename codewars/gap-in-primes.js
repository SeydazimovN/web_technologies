function prime(x) {
  for (var i = 2; i < x; ++i)
    if (x % i == 0) return false;
  return true;
}
function gap(g, m, n) {
    var a = -1, b = -1;
    for (var i = m; i <= n; ++i) {
      if (prime(i) == true) {
        b = i;
        if (a != -1) {
          if (b - a == g) break;
        }
        a = b;
      }
    }
    return (b - a == g) ? [a, b] : null;
}