var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({secret: 'local',
    resave: true,
    saveUninitialized: true}
));
// add process.env.SESSION_SECRET to secret
/*app.use(session(
    {
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));*/

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', function(req,res) {
    console.log(req.session);
    res.send(req.session);
});

app.set('view engine', 'ejs');
require('./utilities/filelist.js');

app.use(app.express.static(__dirname + '/public'));
require('./assignment/app.js'); // assignment work
require('./project/app.js'); // project work

app.listen(process.env.PORT || 3000);