var mongoose = require('mongoose');
var followSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}, // userId of user that is following
    usernameFollower: String, // follower's username
    username: String, // user being followed
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:"PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "follow"});
module.exports = followSchema;