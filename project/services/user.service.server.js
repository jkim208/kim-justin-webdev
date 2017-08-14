var app = require('../../express');
var userModel = require('../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get   ('/api/petStory/user', isAdmin, findAllUsers);
app.get   ('/api/petStory/user/:userId', findUserById);
app.get   ('/api/petStory/username', findUserByUsername);
app.post  ('/api/petStory/user', createUser);
app.put   ('/api/petStory/user/:userId', updateUser);
app.delete('/api/petStory/unregister', unregister);
app.delete('/api/petStory/user/:userId', isAdmin, adminDeleteUser);

app.post  ('/api/petStory/login', passport.authenticate('local'), login);
app.post  ('/api/petStory/logout', logout);
app.post  ('/api/petStory/register', register);
app.get  ('/api/petStory/loggedin', loggedin);
app.get   ('/api/petStory/checkLoggedIn', checkLoggedIn);
app.get   ('/api/petStory/checkAdmin', checkAdmin);

var googleConfig = {
    clientID     : '386426203323-p70hs55elrjktfd60t66pikr1akm64hv.apps.googleusercontent.com',// process.env.GOOGLE_CLIENT_ID,
    clientSecret : '4j4ythbj32t0ohDCTrXQV6Od', //process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : 'http://localhost:3000/auth/google/callback' //process.env.GOOGLE_CALLBACK_URL
};

if(process.env.MLAB_USERNAME_WEBDEV) {
    googleConfig.callbackURL = "http://kim-justin-webdev.herokuapp.com/auth/google/callback"
}

app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/petStory/index.html#!/profile',
        failureRedirect: '/petStory/index.html#!/login'
    }));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
}

function checkLoggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user._doc.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);

    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                    res.send(status);
                });
        });
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function unregister(req, res) { // aka Unregister self
    userModel
        .deleteUser(req.user._id)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function adminDeleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function(status) {
            res.sendStatus(200);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user){
            res.json(user);
        });
}

function findUserByUsername(req, res) {
    var username = req.query['username'];

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user != null) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllUsers(req,res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password) { //skip find all users if credentials provided
        return findUserByCredentials(req,res);
    }

    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })

}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user._doc.roles.indexOf('ADMIN') > -1) {
        next(); // properly authenticated
    } else {
        res.sendStatus(401);
    }
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
