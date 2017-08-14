var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
   _website: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModelA"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref:"WidgetModelA"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "page"});
module.exports = pageSchema;