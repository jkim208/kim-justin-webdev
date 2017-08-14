var app = require('../../express');
var followModel = require('../models/follow/follow.model.server.js');

app.get     ('/api/petStory/user/:userId/follow', findAllFollowsForUser);
app.post    ('/api/petStory/user/:userId/username/:username/follow', createFollow);
app.get     ('/api/petStory/follow/:followId', findFollowById);
app.delete  ('/api/petStory/follow/:followId', deleteFollow);

app.get     ('/api/petStory/searchUsers/:searchTerm', searchUsers);
app.get ('/api/petStory/followers/:username', findFollowers);

function findFollowers(req,res) {
    var username = req.params['username'];

    followModel
        .findFollowers(username) // finds all records where 'username' appears as followed
        .then(function(followers) {
            res.json(followers);
        });
}

function searchUsers(req,res) {
    var searchTerm = req.params['searchTerm'];

    followModel
        .searchUsers(searchTerm)
        .then(function(users) {
            res.json(users);
        });
}

function findAllFollowsForUser(req,res) {
    var userId = req.params['userId'];

    followModel
        .findAllFollowsForUser(userId)
        .then(function(follows) {
            res.json(follows);
        });
}

function createFollow(req,res) {
    var follow = req.body;
    var userId = req.params['userId'];
    var usernameFollower = req.params['username'];

    followModel
        .createFollowForUser(userId, usernameFollower, follow)
        .then(function(follow) {
            res.json(follow);
        });
}

function findFollowById(req, res) {
    var followId = req.params['followId'];

    followModel
        .findFollowById(followId)
        .then(function (follow) {
            if(follow){
                res.json(follow);
            } else{
                res.sendStatus(404);
            }
        });
}

function deleteFollow(req, res) {
    var followId = req.params['followId'];

    return followModel
        .findFollowById(followId)
        .then(function (follow) {
            var userId = follow._user;

            return followModel
                .deleteFollow(userId, followId)
                .then(function (status) {
                    res.sendStatus(200);
                })

        });
}