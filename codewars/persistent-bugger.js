function persistence(num) {
   var cnt = 0;
   while (num > 9) {
     var res = 1;
     while (num > 0) {
       res = res * (num % 10);
       num = parseInt(num / 10);
     }
     num = res;
     cnt++;
   }
   return cnt;
}