console.log (device.encode ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')) ;



device.decode = function (w) {  
  var f = new Array(4444);
function u(x) {
  var res = "";
  res += x;
  var a = x;
  var codeA = res.charCodeAt(0);  
  return codeA;
}
var g = "bdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqHa";

var len = g.length;
function nextA(x, range) {
  var mine = String.fromCharCode(x);
  for (var i = 0; i < g.length; ++i) {
    if (g[i] == mine) {
      var pos = i - range;
      pos = pos % len;
      if (pos < 0) pos += len;
      return g[pos];
    }
  }
}

for (var i = 97; i < 97 + 26; ++i)
    f[i] = i;
  for (var i = 48; i <= 48 + 9; ++i)
    f[i] = i;
  for (var i = 65; i < 65 + 26; ++i)
    f[i] = i;    
  f[u(' ')] = u(' ');
  f[u('?')] = u('?');
  f[u('.')] = u('.');
  f[u(',')] = u(',');
  var res = "";
  for (var i = 0; i < w.length; ++i) {
    // if (bad(w[i])) {res += "-"; continue;}
    if (w[i] == '-') {res += "-"; continue;} 
    var v = w[i];
    var nu = nextA(f[u(v)], i + 1);
    var d = f[u(nu)];
    var myAString = String.fromCharCode(d);
    res += myAString;
  }
  console.log("# " + w);
  console.log("$ " + res);  
  return res;
  return w ; 
}
