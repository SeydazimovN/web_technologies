var spiralize = function(size) {
  var N = size;
  var a = new Array(N);
  for (var i = 0; i < N; ++i) {
    a[i] = new Array(N);
    for (var j = 0; j < N; ++j)
      a[i][j] = 0;
  }
  var x, y, cnt;
  function up() {
  	while(true) {
  		a[x][y] = 1;
  		if (a[x - 2][y] == 1) break;
  		cnt++; x--;
  	}
  }
  function down() {
  	while(true) {
  		a[x][y] = 1;
  		if (a[x + 2][y] == 1) break;
  		cnt++; x++;
  	}
  }
  function left() {
  	while(true) {
  		a[x][y] = 1;
  		if (a[x][y - 2] == 1) break;
  		cnt++; y--;
  	}
  }
  function right() {
  	while(true) {
  		a[x][y] = 1;
  		if (a[x][y + 2] == 1) break;
  		cnt++; y++;
  	}
  }
  
	for (var i = 0; i < N; ++i)
	{
		a[0][i] = 1;
		a[i][N - 1] = 1;
		a[N - 1][i] = 1;
	}
	
	x = N-1, y = 0;
	while (true) {
		cnt++;
		cnt = 0; up(); if (cnt < 2) break;
		cnt = 0; right(); if (cnt < 2) break;
		cnt = 0; down(); if (cnt < 2) break;
		cnt = 0; left(); if (cnt < 2) break;	
	}
  
  return a;  
}
