var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({ secret: 'test'}));
// add process.env.SESSION_SECRET to secret

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', function(req,res) {
    console.log(req.session);
    res.send(req.session);
});

app.get('/api/session/:name/:value', function(req,res) {
    var name = req.params.name;
    var value = req.params.value;

    var obj = {
        name:value
    };

    req.session[name] = obj;

    console.log(req.session);

    res.send(req.session);
});

app.set('view engine', 'ejs');
require('./utilities/filelist.js');

app.use(app.express.static(__dirname + '/public'));
require('./assignment/app.js');

app.listen(process.env.PORT || 3000);