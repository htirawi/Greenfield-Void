const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const helper = require('./helpers/helpers.js')


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

// app.use(cookieParser('this is top secret'));
// app.use(session({
//   secret: 'this is top secret',
//   resave: false,
//   saveUninitialized: true
// }));

app.use(session({
	secret: 'shhh, it\'s aa secret',
	resave : false,
	saveUninitialized:true
}));

app.get('/', function (req, res) {
 res.render('index.html')
});

app.post('/signin', function(req,res) {
	//console.log(req.body.username)
	var username = req.body.username;
	var password = req.body.password;
	var user = new db.User({'user':username,'password':password});
	db.User.findOne({user:user.user},function(err,user){
		if (err){console.log(err)}
		else if(!user){console.log('user not found')}
			// else{
			// 	db.comparePassword(password,function(match){
			// 		if(match){
			// 		helper.createSession(req,res,user)
			// 	}else{
			// 		res.redirect('/signin')
			// 	}
			// 	})
			// }
	})
	
	//res.send()

});



app.post('/signup', function(req,res) {
	var name = req.body.username
	var password = req.body.password
    var email = req.body.email
	var obj = {'user':name , 'password':password,'email':email}
	//console.log(obj)
	db.save(obj)

});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

