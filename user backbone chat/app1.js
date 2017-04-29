function go2MainPage() {
    window.location='file:///home/seydazimovnurbol/Desktop/user%20backbone%20chat/login.html';
}

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

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return day + ' ' + monthNames[monthIndex] + ' ' + year +
          ', '+ hours + ':' + minutes + ":" + seconds;
}

var User = Backbone.Model.extend({
  defaults: {
    userID: '',
    name: '',
    status: '',
    lastVisit: ''
  }
});

var myAccountPos = -1;

function getExistence(name) {
  var all = space.get('users');
  for (var i = 0; i < all.length; ++i) {
    if (name == all[i].name) {
      all[i].lastVisit = formatDate(new Date()),
      all[i].lastVisitInt = +new Date();
      myAccountPos = i;
      return true;
    }
  }
  return false;
}

var Users = Backbone.Collection.extend({});

var users = new Users;

var UserView = Backbone.View.extend({
  model: new User(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.users-list-template').html());
  },
  events: {
    'click .edit-user': 'edit',
    'click .send-user': 'send',
    'click .update-user': 'update'
  },
  edit: function() {
    $('.edit-user').hide();
    $('.send-user').hide();
    this.$('.update-user').show();

    var name = this.$('.name').html();
    var status = this.$('.status').html();

    oldName = name;
    this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
    this.$('.status').html('<input type="text" class="form-control status-update" value="' + status + '">');
  },
  send: function() {
    var name = this.$('.name').html();
    var receiverID = this.$('.userID').html();
    space.set('receiverID', receiverID);

    window.location='file:///home/seydazimovnurbol/Desktop/user%20backbone%20chat/messenger.html';
  },
  update: function() {
    var curName = $('.name-update').val();
    if (getExistence(curName)) {
      alert('try another name. this user already exist !!!');
    }
    else {
      this.model.set('name', $('.name-update').val());
      this.model.set('status', $('.status-update').val());
      space.set('users', users);
    }
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var UsersView = Backbone.View.extend({
  model: users,
  el: $('.users-list'),
  initialize: function() {
      var self = this;
      this.model.on('add', this.render, this);
      this.model.on('change', function() {
        setTimeout(function() { self.render(); }, 30);
      }, this);
      this.model.on('remove', this.render, this);
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(user) {
      self.$el.append((new UserView({ model: user})).render().$el);
    });
    return this;
  }
});

var usersView = new UsersView();
var all;

$(document).ready(function() {

  console.log('ready');

  var myAccount = space.get('myAccount');
  var exist;

  if (space.get('users')) {
    exist = getExistence(myAccount);
    var all = space.get('users');
    if (exist) {
      all[myAccountPos].lastVisit = formatDate(new Date()),
      all[myAccountPos].lastVisitInt = +new Date();
      space.set('authorID', all[myAccountPos].userID);
    }

    if (!exist) alert('created new user.');
    else alert('welcome, ' + myAccount + ' !');

    all.sort(function(a, b) {
      return parseFloat(a.lastVisitInt) - parseFloat(b.lastVisitInt);
    });
    for (var i = 0; i < all.length; ++i) {
      var user = new User({
        userID: all[i].userID,
        name: all[i].name,
        status: all[i].status,
        lastVisit: all[i].lastVisit,
        lastVisitInt: all[i].lastVisitInt
      });
      users.add(user);
    }
  }

  if (!exist) {
    var lastID = space.get('lastID', lastID);
    space.set('lastID', lastID + 1);
    space.set('authorID', lastID + 1);
    var user = new User({
      userID: lastID,
      name: myAccount,
      status: 'online',
      lastVisit: formatDate(new Date()),
      lastVisitInt: +new Date()
    });
    users.add(user);
  }
  space.set('users', users);

  document.getElementById("authorID").innerHTML = myAccount;

  chatID = space.get('authorID') + 'total';
  console.log(chatID);
  if (!space.get(chatID))
    space.set(chatID, 0);

  document.getElementById("chatCount").innerHTML = space.get(chatID);

  $('.add-user').on('click', function() {
    // create new user
    var lastID = space.get('lastID', lastID);
    space.set('lastID', lastID + 1);
    var user = new User({
      userID: lastID,
      name: $('.name-input').val(),
      status: 'online',
      lastVisit: formatDate(new Date()),
      lastVisitInt: +new Date()
    });

    $('.name-input').val('');

    console.log(user.toJSON());
    users.add(user);
    space.set('users', users);
    all = space.get('users');
    for (var i = 0; i < all.length; ++i)
      console.log(all[i].name);
  })
  $('.search-user').on('click', function() {
    while (users.length > 0) {
      var last = users.pop();
      console.log(last);
    }
    var searchInput = $('.search-input').val();
    console.log(searchInput);
    var all = space.get('users');
    all.sort(function(a, b) {
      return parseFloat(a.lastVisitInt) - parseFloat(b.lastVisitInt);
    });
    for (var i = 0; i < all.length; ++i) {
      if (all[i].name.includes(searchInput)) {
        var user = new User({
          userID: all[i].userID,
          name: all[i].name,
          status: all[i].status,
          lastVisit: all[i].lastVisit,
          lastVisitInt: all[i].lastVisitInt
        });
        users.add(user);
      }
    }
  })

})
