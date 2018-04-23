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
    messages: [],
    password: String,
    
  });


  var roomSchema = mongoose.Schema({
   rooms : { type:String , unique:true},
   members: [],
   Messages : [],
  });

  var User = mongoose.model('User', userSchema);

  var Room = mongoose.model('Room', userSchema);



  var saveRoom = function(data) {

    var room = new Room (data)
    room.save()
  }


  var save = function(data) {

  	var user = new User (data)
  	user.save()
  }


module.exports.save = save
module.exports.saveRoom = saveRoom
module.exports.User = User
module.exports.Room = Room
