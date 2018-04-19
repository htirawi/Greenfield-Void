const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const session = require('express-session')
const cookieParser = require('cookie-parser');


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

app.get('/', function (req, res) {
 res.render('index.html')
});

app.post('/signin', function(req,res) {


});

app.post('/signup', function(req,res) {
	var name = req.body.username
	var password = req.body.password
    var email = req.body.email
	var obj = {'user':name , 'password':password,'email':email}
	console.log(obj)
	db.save(obj)

});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

