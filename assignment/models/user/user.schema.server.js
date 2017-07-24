var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now()},
    websites: [
        {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}
    ],
    email: String,
    phone: String
}, {collection: "user"});
module.exports = userSchema;