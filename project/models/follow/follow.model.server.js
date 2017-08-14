var mongoose = require('mongoose');
var followSchema = require('./follow.schema.server');
var followModel = mongoose.model('FollowModel', followSchema);
var userModel = require('../user/user.model.server');

followModel.createFollowForUser = createFollowForUser;
followModel.findAllFollowsForUser = findAllFollowsForUser;
followModel.deleteFollow = deleteFollow;
followModel.findFollowById = findFollowById;

followModel.deletePage = deletePage;
followModel.addPage = addPage;

followModel.searchUsers = searchUsers;
followModel.findFollowers = findFollowers;

module.exports = followModel;

// find all instances where 'username' appears in follow
function findFollowers(username) {
    return followModel.find({username: username});
}

function searchUsers(searchTerm) {
    return userModel
        .searchUsers(searchTerm);
}

function deleteFollow(userId, followId) {
    return followModel
        .remove({_id: followId})
        .then(function (status) {
            return userModel
                .deleteFollow(userId, followId);
        });
}

function createFollowForUser(userId, usernameFollower, follow) {
    follow._user = userId;
    follow.usernameFollower = usernameFollower;
    follow._id = null; //need to reset id since we get it from an existing user._id
    return followModel
        .create(follow)
        .then(function (follow) {
            return userModel
                .addFollow(userId, follow._id);
        });
}

function findAllFollowsForUser(userId) {
    return followModel.find({_user:userId});
}

function findFollowById(followId){
    return followModel.findById(followId);
}

function addPage(followId, pageId) {
    return followModel
        .findById(followId)
        .then(function (follow) {
            follow.pages.push(pageId);
            return follow.save();
        });
}

function deletePage(followId, pageId) {
    return followModel
        .findById(followId)
        .then(function (follow) {
            var index = follow.pages.indexOf(pageId);
            follow.pages.splice(index, 1);
            return follow.save();
        });
}