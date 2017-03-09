function get(x, unit) {
  var res = "";
  if (unit == 0) {
    if (x == 4) return "IV";
    if (x == 9) return "IX";
    else {
      if (x >= 5) res += "V", x -= 5;
      while (x > 0) res += "I", x--;
      return res;
    }
  }
  if (unit == 1) {
    if (x == 4) return "XL";
    if (x == 9) return "XC";
    else {
      if (x >= 5) res += "L", x -= 5;
      while (x > 0) res += "X", x--;
      return res;
    }    
  }
  if (unit == 2) {
    if (x == 4) return "CD";
    if (x == 9) return "CM";
    else {
      if (x >= 5) res += "D", x -= 5;
      while (x > 0) res += "C", x--;
      return res;
    }  
  }
  if (unit == 3) {
    while (x > 0) res += "M", x--;
    return res;
  }
}

function solution(number){
  // convert the number to a roman numeral
  var sn = 0;
  var s = new Array(44);
  while (number > 0) {
    var x = number % 10;
    s[sn] = get(x, sn);
    sn++;
    number /= 10;
    number = parseInt(number, 10);
  }
  var res = "";
  for (var i = sn - 1; i >= 0; --i)
    res = res + s[i];
  return res;
}
