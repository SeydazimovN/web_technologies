var space = {
  get: function(key){
    return JSON.parse(localStorage.getItem(key));
  },

  set: function(key, val){
    var tmp = JSON.stringify(val);
    localStorage.setItem(key, tmp);
  },

  remove: function(key){
    localStorage.removeItem(key);
  },

  clear: function(){
    localStorage.clear();
  }
};

$(document).ready(function() {

  $('.login-user').on('click', function() {
    var accountName = $('.login-input').val();
    console.log("account " + accountName);

    $('.login-input').val('');

    space.set('myAccount', accountName);

    // alert('all things are good!');
    window.location='file:///home/seydazimovnurbol/Desktop/final%20project/messenger.html';
  })
  
  $('.reset-all').on('click', function() {
    localStorage.clear();
    localStorage.setItem('lastID', 100);
    alert('All settings have been reset');
  })
})
