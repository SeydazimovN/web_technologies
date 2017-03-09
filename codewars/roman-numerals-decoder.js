var rom = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
var val = [1, 5, 10, 50, 100, 500, 1000];

function f(x) {
    for (var i = 0; i < 7; ++i) 
      if (rom[i] == x) return val[i];
}
function pos(x) {
    for (var i = 0; i < 7; ++i) 
      if (rom[i] == x) return i;
}

function solution(a){
  // complete the solution by transforming the 
  // string roman numeral into an integer  
  var sum = 0;
  for (var i = 0; i < a.length; ++i) {
    if (i + 1 < a.length && pos(a[i]) < pos(a[i + 1])) {
      sum += f(a[i + 1]) - f(a[i]); 
      ++i;
    }
    else sum += f(a[i]);
  }
  return sum;
}
