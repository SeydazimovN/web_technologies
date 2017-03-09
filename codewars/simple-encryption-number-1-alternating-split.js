function encrypt(text, n) {
  if (text == "" || text == null)
    return text;
  while (n > 0) {
    var res = "";
    for (var i = 1; i < text.length; i += 2) 
      res += text[i];
    for (var i = 0; i < text.length; i += 2) 
      res += text[i];
    text = res;
    n --;
  }
  return text;
}

function decrypt(text, n) {
  if (text == "" || text == null)
    return text;
  while (n > 0) {
    var res = "";
    var len = parseInt(text.length / 2);
    var x = 0, y = len;
    
    for (var i = 0; i < text.length; i++) {
        if (i % 2) {
          res += text[x];
          x++;
        }
        else {
          res += text[y];
          y++;
        }
    } 
    text = res;
    n --;
  }
  return text;
}
