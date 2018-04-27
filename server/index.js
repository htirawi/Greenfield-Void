const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const helper = require('./helpers/helpers.js');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const path = require('path');
const socketIO = require('socket.io')

const app = express();


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('client',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'/views')))
app.use(express.static(__dirname + '/../node_modules'));
app.use( express.static(__dirname + '/../build' ));

app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var curRoom= 'Public'

app.use(session({
	secret: 'shhh, it\'s aa secret',
	resave : false,
	saveUninitialized:true
	
}));

app.get('/', function (req, res) {
	res.render('index.html')

});

app.get('/video', function (req, res) {
	res.render('video.html')

});


app.get('/index1',function (req, res) {
	if(helper.isLoggedIn(req)){
		res.render("index1")
	}
	else{
		res.render("index")
	}

})
;
//Finding messages for a spesfic room
app.get('/messages',function(req, res){
	db.Room.findOne({roomname:curRoom}, function(err,data){
		res.send(data)
	})

})

//Creating a room 
app.post('/createroom', function(req,res) {
	var name = req.body.roomname
	db.saveRoom({'roomname':name})
	res.send("done")
});

//Getting created rooms
app.get('/createroom', function(req,res) {
	db.Room.find({},function(err, data){
		res.send(data)
	})
	
});

//Joining room , checking if it exist or not then saving if it doesnt exist before
app.post('/joinroom', function(req,res) {
	var name = req.body.roomname
	db.Room.findOne({roomname:name},function(err,room){
		if ( room === null  ) {
			res.status(404).send('room is not found')}
			else {
				var x = req.session.user.user
				if(room.members.indexOf(x) === -1){
					room.members.push(x)
					db.saveRoom(room)
				}
			}

		})

	db.User.findOne({user:req.session.user.user},function(err,user){
		user.currentRoom=req.body.roomname
		db.save(user)
	})
	curRoom=name
})





//Showing members who joined the room 
app.get('/showmembers', function(req,res) {
	db.User.find({},function(err, data){
		var arr = []
		for(var i=0; i<data.length; i++){
			if(data[i].online === true){
				arr.push(data[i])
			}
		}
		res.send(arr)
	})
	
});

//Showing friends that you added 
app.get('/showfriends', function(req,res) {
	var x = req.session.user.user
	db.User.findOne({user:x},function(err,user){
		res.send(user.friends)
	})
});


app.get('/getusername', function(req,res) {
	var x = req.session.user.user
	db.User.findOne({user:x},function(err,user){
		res.send(user)
		
	})
});

//adding friends to a spesfic user, checking if it exist or not 
app.post('/addfriend', function(req,res) {	
	var name = req.body.name
	db.User.findOne({user:name},function(err,user){
		if ( user === null  ) {
			res.status(404).send('user is not found')
		}else if(req.session.user.user === name){
			res.status(404).send("you can't add your self")

		}else {
			var x = req.session.user.user
			db.User.findOne({user:x},function(err,user1){
				if(user1.friends.indexOf(name) === -1){
					user1.friends.push(name)
					db.save(user1)
				}
			})}

		})
	
});


//Signing in , checking if username and password match and creating a session
app.post('/signin', function(req,res) {
	var username = req.body.username;
	var password = req.body.password;

	db.User.findOne({user:username},function(err,user){
		if (err){console.log(err)}
			else if(!user){res.status(404).send('user is not found')}
				else{
					helper.comparePassword(password,user,function(error,match){
						if(match){
							db.User.findOne({user:username},function(err,user){
								user.online=true
								user.currentRoom='Public'
								db.save(user)

							}).then(function(){
								helper.createSession(req,res,user)

								db.Room.findOne({roomname:'Public'},function(err,room){
									if(room.members.indexOf(username) === -1){	
										room.members.push(username)
										db.saveRoom(room)}

									})})
						} else{
							console.log(match)
							res.status(404).send('wrong password')
						}
					})
				}
			})
});


//Saving a new user if it didnt exsist before 
app.post('/signup', function(req,res) {
	var name = req.body.username
	var password = req.body.password
	var email = req.body.email
	var obj = {'user':name , 'password':password,'email':email,'online':true ,'currentRoom':'Public'}

	db.User.findOne({user:name},function(err,user){
		if (err){console.log(err)}
			else if(name=== "" || name === null || name === undefined){
				res.status(404).send('enter a valid name')	
			}
			else if(!user){
				helper.hash(obj)
				res.send('you can sign in now')
			}
			else{
				res.status(404).send('username is used')
			}
		})

});

//Logging out , destroying the session
app.get('/logout', function(req, res) {
	var x = req.session.user.user
	db.User.findOne({user:x},function(err,user){
		user.online=false
		db.save(user)
	}).then(function(){
		req.session.destroy(function() {
			res.redirect('/');
		})

	})

	
})


var port = process.env.PORT || 3000;

const server = app
.use((req, res) => res.render('index') )
.listen(port, () => console.log(`Listening on ${ port }`));



var io = socketIO(server)

//listen to connection
io.on('connection',function(socket){
	

//listen to new msg
socket.on('new_msg',function(data){
	
		//we user sockets because we need to send message to all connected sockets.
		console.log('socket',data)
		io.sockets.emit('new_msg',data);
		var user = data.username
		var room =  data.room 
		var message = data.msg
		db.Room.findOne({roomname:room},function(err,room1){
			
			room1.messages.push({'username':user, 'message':message})
			db.saveRoom(room1)
			
		})
		curRoom = room;
	})
//typing listener , not in use 
socket.on('typing',function(data){
	socket.broadcast.emit('typing', {username:socket.username})
})
});

