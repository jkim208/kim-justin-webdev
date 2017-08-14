var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now()},
    roles: [{type: String, default: 'USER', enum: ['USER', 'SHELTER', 'ADMIN']}],
    websites: [
        {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}
    ],
    pets: [
        {type: mongoose.Schema.Types.ObjectId, ref:"PetModel"}
    ],
    follows: [
        {type: mongoose.Schema.Types.ObjectId, ref:"FollowModel"}
    ],
    email: String,
    phone: String,
    shelterName: String,
    google: {
        id:    String,
        token: String
    }
}, {collection: "user"});
module.exports = userSchema;