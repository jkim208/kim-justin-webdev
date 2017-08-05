var app = require('../../express');
var userModel = require('../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get   ('/api/assignment/user', findUserByCredentials);
app.get   ('/api/assignment/user/:userId', findUserById);
app.get   ('/api/assignment/username', findUserByUsername);
app.post  ('/api/assignment/user', createUser);
app.put   ('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/assignment/register', register);
app.get  ('/api/assignment/loggedin', loggedin);

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET
};

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));

if(process.env.MLAB_USERNAME_WEBDEV) {
    facebookConfig.callbackURL = "http://kim-justin-webdev.herokuapp.com/auth/facebook/callback"
} else {
    facebookConfig.callbackURL = "http://localhost:3000/auth/facebook/callback"
}

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var newFacebookUser = {
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        username: profile.name.givenName + profile.name.familyName,
                        email: profile.emails[0].value,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
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
                console.log(user, password)
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
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

function deleteUser(req, res) {
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
