function Dictionary(words) {
  this.words = words;
}

var str;

var N = 44;
var f = new Array(N);
for (var i = 0; i < N; i++)
  f[i] = new Array(N);

var minAct = 999999;
var otv = -1;

var a, b;

function eq(v, u) {
	if (!v || !u) return 0;
	return (a[v - 1] != b[u - 1]);
} 

var inf = 999999;

function getmin(x, y, z) {
  if (x <= y && x <= z) return x;
  if (y <= z && y <= z) return x;
  return z;  
}

function get(v, u) {
	if (f[v][u] != -1) return f[v][u]; 
	var f1, f2, f3;
	f1 = f2 = f3 = inf;
	
	if (v == 0) f1 = u;
	else f1 = get(v - 1, u) + 1;

	if (u == 0) f2 = v;
	else f2 = get(v, u - 1) + 1;
	
	if (u > 0 && v > 0) f3 = get(v - 1, u - 1) + eq(v - 1, u - 1);
	
	f[v][u] = getmin(f1, f2, f3);
	return f[v][u];
}

function pschek(x) {
  for (var i = 0; i < N; ++i) for (var j = 0; j < N; ++j)
    f[i][j] = -1;
  f[0][0] = 0;
	a = str[x];
	var n = a.length;
	var m = b.length;
	var res = get(n, m);
	if (res < minAct) {
		minAct = res;
		otv = x;
	}
}

Dictionary.prototype.findMostSimilar = function(term) {
  // TODO: this is your task ;)
  minAct = inf;
  otv = -1;
  b = term;
  str = this.words;
  for (var i = 0; i < str.length; ++i)
    pschek(i);
  console.log(str[otv]);
  return str[otv];
}
