var express = require('express');
// var bodyParser = require('body-parser');


var app = express();



 app.use(express.static(__dirname + '/../client'));
 app.use(express.static(__dirname + '/../node_modules'));

app.get('/', function (req, res) {
 res.render('index.html')
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
