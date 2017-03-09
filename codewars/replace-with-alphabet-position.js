function alphabetPosition(text) {
  var res = "";
  for (var i = 0; i < text.length; ++i) {
      var x = text[i].charCodeAt();
      
      if (65 <= x && x < 65 + 26) 
        x += 32;
      if (97 <= x && x < 97 + 26) {
        var cur = x - 97 + 1;
        if (res.length > 0) res += " ";
        res = res + cur;
      }
  }
  return res;
}