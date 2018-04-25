const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const helper = require('./helpers/helpers.js');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const path = require('path');

const app = express();


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('client',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'/views')))
app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


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

app.post('/createroom', function(req,res) {
	var name = req.body.roomname
	db.saveRoom({'roomname':name})
	res.send("done")
});

app.get('/createroom', function(req,res) {
	db.Room.find({},function(err, data){
		res.send(data)
	})
	
});


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

app.get('/showfriends', function(req,res) {
	var x = req.session.user.user
	db.User.findOne({user:x},function(err,user){
		res.send(user.friends)
		console.log(user.friends)
	})
});


app.post('/addfriend', function(req,res) {
	
	var name = req.body.name
	db.User.findOne({user:name},function(err,user){
		var x = req.session.user.user
		console.log(name,x)
		db.User.findOne({user:x},function(err,user1){
		if(user1.friends.indexOf(name) === -1){
			user1.friends.push(name)
			db.save(user1)
		}
	})

	})
	
});


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
									db.save(user)
								}).then(function(){
									helper.createSession(req,res,user)

								})
						}else{
							console.log(match)
							res.status(404).send('wrong password')
						}
					})
				}
			})
});


app.post('/signup', function(req,res) {
	var name = req.body.username
	var password = req.body.password
	var email = req.body.email
	var obj = {'user':name , 'password':password,'email':email,'online':true}

	db.User.findOne({user:name},function(err,user){
		if (err){console.log(err)}
			else if(name=== "" || name === null || name === undefined){
				res.status(404).send('enter a valid name')	
			}
			else if(!user){
				helper.hash(obj)
			}
			else{
				res.status(404).send('username is used')
			}
		})

});


app.get('/logout', function(req, res) {
	var x = req.session.user.user
	db.User.findOne({user:x},function(err,user){
		user.online=false
		db.save(user)
	}).then(function(){
		req.session.destroy(function() {
			res.redirect('/');
		});

	})

	
})

app.listen(3000, function() {
	console.log('listening on port 3000!');
});