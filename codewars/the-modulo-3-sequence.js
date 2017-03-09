function sequence(n){
  n = (n - 1) % 8;
  var a = new Array(100);
  a[1] = 0;
  a[2] = 1;
  for (var i = 3; i <= 50; ++i) {
    a[i] = (a[i - 1] + a[i - 2]) % 3;
    // console.log(a[i]);
  }
  return a[n + 1];
}