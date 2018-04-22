const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const helper = require('./helpers/helpers.js');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

var path = require('path');

const app = express();


app.set('view engine', 'html');
app.set('client',path.join(__dirname,'views'))
app.engine('html', require('ejs').renderFile);
app.use(bodyParser())
app.use(express.static(path.join(__dirname,'/views')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//app.use(express.static(__dirname + '/../views'));
app.use(express.static(__dirname + '/../node_modules'));

app.use(session({
	secret: 'shhh, it\'s aa secret',
	resave : false,
	saveUninitialized:true
}));

app.get('/', function (req, res) {
 res.render('index.html')

 
});



app.post('/signin', function(req,res) {
	
	var username = req.body.username;
	var password = req.body.password;
	console.log(username)
	
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
    
	var obj = {'user':name ,'password':password,'email':email}

	helper.hash(obj)
	res.send()

});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

