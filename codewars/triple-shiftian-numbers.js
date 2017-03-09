function tripleShiftian(base,x){
  var T = new Array(5555);
  T[0] = base[0];
  T[1] = base[1];
  T[2] = base[2];
  for (var n = 3; n <= x; ++n) {
    T[n] = 4 * T[n-1] - 5 * T[n-2] + 3 * T[n-3]; 
  }
  return T[x];
}