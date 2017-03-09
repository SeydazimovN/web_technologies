function loop_size(node){  
  var a = [];
  for (var i = 0; i < 20000; ++i) {
    a.push(node);
    node = node.getNext();
  }
  for (var i = 1; i < 20000; ++i) {
    for (var j = i - 1; j >= 0; --j) 
      if (a[i] == a[j]) {
        return i - j;
      }
  }  
  return 5;
}
