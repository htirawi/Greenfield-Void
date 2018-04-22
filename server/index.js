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


app.get('/index1',function (req, res) {

	
	if(helper.isLoggedIn(req)){
		res.render("index1")
	}
	else{
		res.render("index")
	}

	})
	;




app.post('/signin', function(req,res) {
	
	var username = req.body.username;
	var password = req.body.password;
	console.log(username)
		//var user = new db.User({'user':username,'password':password});
		db.User.findOne({user:username},function(err,user){
			if (err){console.log(err)}
				else if(!user){console.log('user not found')}
					else{
						helper.comparePassword(password,function(match){
							if(match){
								
								helper.createSession(req,res,user)
							}else{
								res.redirect('/signin')
							}
						})
					}
				})
		
		

	});



app.post('/signup', function(req,res) {
	var name = req.body.username
	var password = req.body.password
	var email = req.body.email


	var obj = {'user':name , 'password':password,'email':email}

	
	db.User.findOne({user:name},function(err,user){
		if (err){console.log(err)}
			else if(name=== "" || name === null || name === undefined){
				console.log('enter a valid name')
				res.status(404).send('error')
			}
			else if(!user){helper.hash(obj)}
				
				else{
					console.log('username is used')
			}
	 
	

	})

});
	






app.listen(3000, function() {
	console.log('listening on port 3000!');
});