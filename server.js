require('use-strict');
var express = require('express');
var app = express();

app.set('views', __dirname + '/templates');
app.engine('html', require('ejs').renderFile);

app.configure(function () {
  // app.use('/media', express.static(__dirname + '/media'));
  app.use(express.static(__dirname + '/js'));
});

app.get('/', function (req, res) {
    res.render('promise.html');
});

app.get('/:id/user', function (req, res) {
    res.json({'fullname': 'Steve Jobs', 'email': 'steve@apple.com'});
});

app.get('/posts', function (req, res) {
    res.json({'authod_name': 'Steve Jobs', 'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'});
});

app.get('/ads', function (req, res) {
    res.json({'ad1': 'iPod', 'ad2': 'iTunes', 'ad3': 'iPad'});
});

app.get('/error', function (req, res) {
    res.send(500, 'Something broke!');

});

app.get('/:id/error', function (req, res) {
    res.send(500, 'Something broke while getting the user!');

});


var server = app.listen(2903, function () {
    console.log('Listening on port %d', server.address().port);
});
