  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/Users');
  var db = mongoose.connection;

  db.on('error', function() {
    console.log('mongoose connection error');
  });

  db.once('open', function() {
    console.log('mongoose connected successfully');
  });



  var userSchema = mongoose.Schema({
    user    : { type:String, unique : true },
    email   : String,
    friends : String,
    Messages: [],
    password: String,
    members : [],
  });

  var User = mongoose.model('User', userSchema);



  


  var save = function(data) {

  	var user = new User (data)
  	user.save()
  }


module.exports.save = save
module.exports.User = User
