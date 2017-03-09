function validatePIN (pin) {
  var len = pin.length;
  if (len != 4 && len != 6)
    return false;
  var res = true;
  for (var i = 0; i < len; ++i) {
    if ('0' <= pin[i] && pin[i] <= '9') 
      continue;
    res = false;
  }
  return res;
}
