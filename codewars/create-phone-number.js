function createPhoneNumber(numbers){
  var d = "(";
  for (var i = 0; i < 3; ++i) 
    d += String(numbers[i]);
  d += ") ";
  for (var i = 3; i < 6; ++i)
    d += String(numbers[i]);
  d += "-";
  for (var i = 6; i < 10; ++i)
    d += String(numbers[i]);  
  return d;
}