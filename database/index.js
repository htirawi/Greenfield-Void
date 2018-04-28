var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Users');
//mongoose.connect('mongodb://voidteam:hackerspace@ds161529.mlab.com:61529/chatbuddy');
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});
// creating a public room at the start 
db.once('open', function() {
  console.log('mongoose connected successfully');
  saveRoom({'roomname':'Public' })
});



var userSchema = mongoose.Schema({
  user    : { type:String, unique : true },
  email   : String,
  friends : [String],
  messages: [String],
  password: String,
  online: Boolean,
  currentRoom:String,
  private: [{to : String , message: [String]}],

  
});


var roomSchema = mongoose.Schema({
 roomname : { type:String , unique:true},
 members: [String],
 messages : [{username:String, message:String}],
});

var User = mongoose.model('User', userSchema);
var Room = mongoose.model('Room', roomSchema);



var saveRoom = function(data) {
  var room = new Room(data)
  room.save()
}


var save = function(data) {
  var user = new User(data)
  user.save()
}


module.exports.save = save
module.exports.saveRoom = saveRoom
module.exports.User = User
module.exports.Room = Room