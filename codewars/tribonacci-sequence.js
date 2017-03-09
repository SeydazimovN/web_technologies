function tribonacci(a,n){
  for (var i = 3; i < n; ++i) {
    a[i] = a[i - 1] + a[i - 2] + a[i - 3];
  }
  while (a.length > n) a.pop();
  return a;
 
}