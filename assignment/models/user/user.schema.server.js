var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstName: String,
    lastName: String,
    dateCreated: {type: Date, default: Date.now()},
    websites: [
        {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModelA"}
    ],
    email: String,
    phone: String,
    facebook: {
        id:    String,
        token: String
    }
}, {collection: "user"});
module.exports = userSchema;