const express = require('express');
const bodyParser = require('body-parser');
const db = require('database/index.js')


const app = express();




app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

app.get('/', function (req, res) {
 res.render('index.html')
});

app.post('/signin', function(req,res) {


});

app.post('/signup', function(req,res) {


});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

