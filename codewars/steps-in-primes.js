function isprime(x) {
  for (var i = 2; i * i <= x; ++i)
    if (x % i == 0) return false;
  return true;
}
function step(g, m, n) {
    for (var i = m; i <= n; ++i) {
      if (isprime(i) && isprime(i + g)) {
        return [i, i + g];
      }
    }
    return null;
}