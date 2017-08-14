var mongoose = require('mongoose');
var petSchema = mongoose.Schema({
   _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    status: String,
    breed: String,
    sex: String,
    age: String,
    state: String,
    width: String,
    url: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "pet"});
module.exports = petSchema;