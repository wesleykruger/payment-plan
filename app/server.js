// var express = require('express'),
// app = express();

// app.use(express.static(__dirname));
// app.get('/', function(req, res) {
//     res.sendfile('app/index.html', {root: __dirname })
// });
// var server = app.listen(process.env.PORT || 5000);

'use strict'

var express = require('express');

// App
var app = express();
app.set('port', (process.env.PORT || 5000));

// your angular-project folder
console.log(__dirname)
app.use('/', express.static(__dirname));

app.listen(app.get('port'), function() {
  console.log("running: port", app.get('port'));
});

// var express = require('express');
// var app = express();

// app.use(express.static("app")); // myApp will be the same folder name.
// app.get('/', function (req, res,next) {
//  res.redirect('/'); 
// });
// app.listen(8080, 'localhost');
// console.log("MyProject Server is Listening on port 8080");