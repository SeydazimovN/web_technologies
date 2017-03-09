var nextPerm;
var nextPerm2;
var nextPerm3;

function nextPermutation(array, x) {
    var i = array.length - 1;
    while (i > 0 && array[i - 1] >= array[i])
        i--;
    if (i <= 0)
        return false;
    var j = array.length - 1;
    while (array[j] <= array[i - 1])
        j--;
    var temp = array[i - 1];
    array[i - 1] = array[j];
    array[j] = temp;
    
    j = array.length - 1;
    while (i < j) {
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        i++; j--;
    }
    if (x == 1) nextPerm = array;
    if (x == 2) nextPerm2 = array;    
    if (x == 3) nextPerm3 = array;
    
    return true;
}

function getClues(p1, p2, p3, p4) {
  var res = [];
  var T = [p1, p2, p3, p4];
  for (var y = 0; y < 4; ++y) {
    var mx = -1, cntSky = 0;
    for (var x = 0; x < 4; ++x) {
      if (T[x][y] > mx) {
        cntSky++;
        mx = T[x][y];
      }
    }
    res.push(cntSky);
  }
  for (var x = 0; x < 4; ++x) {
    var mx = -1, cntSky = 0;
    for (var y = 3; y >= 0; --y) {
      if (T[x][y] > mx) {
        cntSky++;
        mx = T[x][y];
      }      
    }
    res.push(cntSky);
  }
  for (var y = 3; y >= 0; --y) {
    var mx = -1, cntSky = 0;
    for (var x = 3; x >= 0; --x) {
      if (T[x][y] > mx) {
        cntSky++;
        mx = T[x][y];
      }      
    }
    res.push(cntSky);
  }  

  for (var x = 3; x >= 0; --x) {
    var mx = -1, cntSky = 0;
    for (var y = 0; y < 4; ++y) {
      if (T[x][y] > mx) {
        cntSky++;
        mx = T[x][y];
      }      
    }
    res.push(cntSky);
  }  
  return res;
}

function solvePuzzle (clues) {
  nextPerm = [1, 2, 3, 4];
  var cnt = 0;
  var perm = [1, 2, 3, 4];
  do {
    perm = nextPerm;
    var perm2 = [1, 2, 3, 4];
    nextPerm2 = perm2;
    do {
      perm2 = nextPerm2;
      var perm3 = [1, 2, 3, 4];
      nextPerm3 = perm3;
      do {
        perm3 = nextPerm3;
        
        // do it man!
        cnt += 1;
        
        var bad = false;
        for (var i = 0; i < 4; ++i) {
          if (perm[i] == perm2[i] || perm[i] == perm3[i] || perm2[i] == perm3[i])
            bad = true;
        }
        
        if (bad == false) {
          var perm4 = [];
          for (var i = 0; i < 4; ++i) 
          for (var c = 1; c <= 4; ++c) {
            if (perm[i] != c && perm2[i] != c && perm3[i] != c)
              perm4.push(c);  
          }
          
          var clues1 = getClues(perm, perm2, perm3, perm4);
          var dobry = true;
          for (var i = 0; i < 16; ++i)
          {
            if (clues[i] == 0) continue;
            if (clues1[i] != clues[i]) dobry = false;
          }
          if (dobry) {
            console.log("print");
            console.log([perm, perm2, perm3, perm4]);
            console.log(clues);
            return [perm, perm2, perm3, perm4];
          }
        }
      
      } while (nextPermutation(perm3, 3));
    }  while (nextPermutation(perm2, 2));
    // console.log(perm);
  }  while (nextPermutation(perm, 1));
  console.log("here");
  console.log(cnt);
  return clues;
}
