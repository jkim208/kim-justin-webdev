var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
   _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModelA"},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:"PageModelA"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "website"});
module.exports = websiteSchema;